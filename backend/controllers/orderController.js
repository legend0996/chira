const pool = require("../config/db");
const generateOrderCode = require("../utils/generateCode");
const sendEmail = require("../utils/sendEmail");

// CREATE ORDER
exports.createOrder = async (req, res) => {
  const {
    customer_name,
    phone,
    email,
    service_id,
    amount,
    payment_status,
    formData,
  } = req.body;

  try {
    // GENERATE CODE
    const code = await generateOrderCode(payment_status === "paid");

    // INSERT ORDER
    const orderResult = await pool.query(
      `INSERT INTO orders 
      (order_code, customer_name, phone, email, service_id, amount, payment_status, status) 
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *`,
      [
        code,
        customer_name,
        phone,
        email,
        service_id,
        amount,
        payment_status,
        payment_status === "paid" ? "Payment Confirmed" : "Order Received",
      ],
    );

    const order = orderResult.rows[0];

    // SAVE FORM DATA
    if (formData) {
      for (let key in formData) {
        await pool.query(
          "INSERT INTO order_data (order_id, field_name, value) VALUES ($1,$2,$3)",
          [order.id, key, formData[key]],
        );
      }
    }

    // SEND EMAIL
    await sendEmail(
      email,
      "Order Received",
      `Dear ${customer_name},

Your order has been received successfully.

Tracking Code: ${code}
Service ID: ${service_id}
Amount: KES ${amount}

You can track your order anytime.

Thank you for choosing Chira Tech.`,
    );

    res.json({
      message: "Order created",
      order,
      tracking_code: code,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error creating order" });
  }
};

// GET ALL ORDERS
exports.getOrders = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM orders ORDER BY created_at DESC",
    );

    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error fetching orders" });
  }
};

// TRACK ORDER
exports.trackOrder = async (req, res) => {
  const { code } = req.params;

  try {
    const result = await pool.query(
      "SELECT * FROM orders WHERE order_code=$1",
      [code],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Order not found" });
    }

    const order = result.rows[0];

    const data = await pool.query(
      "SELECT field_name, value FROM order_data WHERE order_id=$1",
      [order.id],
    );

    const comments = await pool.query(
      "SELECT * FROM comments WHERE order_id=$1 ORDER BY created_at DESC",
      [order.id],
    );

    const files = await pool.query("SELECT * FROM files WHERE order_id=$1", [
      order.id,
    ]);

    res.json({
      order,
      formData: data.rows,
      comments: comments.rows,
      files: files.rows,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error tracking order" });
  }
};

// UPDATE STATUS + EMAIL
exports.updateStatus = async (req, res) => {
  const { id } = req.params;
  const { status, comment } = req.body;

  try {
    // UPDATE STATUS
    await pool.query("UPDATE orders SET status=$1 WHERE id=$2", [status, id]);

    // ADD COMMENT
    if (comment) {
      await pool.query("INSERT INTO comments (order_id, text) VALUES ($1,$2)", [
        id,
        comment,
      ]);
    }

    // GET ORDER FOR EMAIL
    const orderResult = await pool.query("SELECT * FROM orders WHERE id=$1", [
      id,
    ]);

    const order = orderResult.rows[0];

    // SEND EMAIL
    await sendEmail(
      order.email,
      "Order Update",
      `Dear ${order.customer_name},

Your order (${order.order_code}) has been updated.

Current Status: ${status}

${comment ? "Comment: " + comment : ""}

Thank you for choosing Chira Tech.`,
    );

    res.json({ message: "Order updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error updating order" });
  }
};
// GENERATE RECEIPT
exports.getReceipt = async (req, res) => {
  const { code } = req.params;

  try {
    const result = await pool.query(
      "SELECT * FROM orders WHERE order_code=$1",
      [code],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Receipt not found" });
    }

    const order = result.rows[0];

    const receipt = {
      company: "CHIRA TECH",
      receipt_number: order.order_code,
      date: order.created_at,
      customer_name: order.customer_name,
      phone: order.phone,
      service_id: order.service_id,
      amount: order.amount,
      payment_status: order.payment_status,
      status: order.status,
      contact: "0796211297",
      message: "Thank you for choosing Chira Tech",
    };

    res.json(receipt);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error generating receipt" });
  }
};
