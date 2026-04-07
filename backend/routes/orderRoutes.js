const express = require("express");
const router = express.Router();
const pool = require("../config/db");
const multer = require("multer");
const fs = require("fs");

// ================= MULTER =================
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// ================= CREATE ORDER =================
router.post("/", upload.array("files"), async (req, res) => {
  const {
    customer_name,
    phone,
    email,
    service_id,
    amount,
    payment_status,
    formData,
    fileLabels,
  } = req.body;

  try {
    // 🔥 PARSE FORM DATA SAFELY
    const parsedFormData = formData ? JSON.parse(formData) : {};

    const orderResult = await pool.query(
      `INSERT INTO orders 
      (customer_name, phone, email, service_id, amount, payment_status, status, formdata)
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
      RETURNING *`,
      [
        customer_name,
        phone,
        email,
        service_id,
        amount,
        payment_status,
        "Order Received",
        parsedFormData,
      ],
    );

    const order = orderResult.rows[0];

    // 🔥 SAVE FILES
    if (req.files && req.files.length > 0) {
      for (let i = 0; i < req.files.length; i++) {
        await pool.query(
          `INSERT INTO files (order_id, file_path, label)
           VALUES ($1,$2,$3)`,
          [
            order.id,
            req.files[i].path,
            Array.isArray(fileLabels) ? fileLabels[i] : fileLabels,
          ],
        );
      }
    }

    res.json({ order });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Order creation failed" });
  }
});

// ================= GET SINGLE ORDER (🔥 REQUIRED) =================
router.get("/:id", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM orders WHERE id=$1", [
      req.params.id,
    ]);

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: "Fetch failed" });
  }
});

// ================= TRACK =================
router.get("/track/:code", async (req, res) => {
  const { code } = req.params;

  try {
    const result = await pool.query(
      "SELECT * FROM orders WHERE order_code=$1",
      [code],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: "Tracking failed" });
  }
});

// ================= RECEIPT =================
router.get("/receipt/:code", async (req, res) => {
  const { code } = req.params;

  try {
    const result = await pool.query(
      "SELECT * FROM orders WHERE order_code=$1",
      [code],
    );

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: "Receipt error" });
  }
});

// ================= GET ALL =================
router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM orders ORDER BY id DESC");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: "Fetch failed" });
  }
});

// ================= UPDATE =================
router.put("/:id", async (req, res) => {
  const { status, payment_status } = req.body;

  try {
    await pool.query(
      "UPDATE orders SET status=$1, payment_status=$2 WHERE id=$3",
      [status, payment_status, req.params.id],
    );

    res.json({ message: "Updated successfully" });
  } catch (err) {
    res.status(500).json({ error: "Update failed" });
  }
});

// ================= DELETE (🔥 IMPROVED) =================
router.delete("/:id", async (req, res) => {
  try {
    // 🔥 GET FILE PATHS
    const files = await pool.query(
      "SELECT file_path FROM files WHERE order_id=$1",
      [req.params.id],
    );

    // 🔥 DELETE FILES FROM DISK
    files.rows.forEach((f) => {
      if (fs.existsSync(f.file_path)) {
        fs.unlinkSync(f.file_path);
      }
    });

    // DELETE DB RECORDS
    await pool.query("DELETE FROM files WHERE order_id=$1", [req.params.id]);
    await pool.query("DELETE FROM orders WHERE id=$1", [req.params.id]);

    res.json({ message: "Order deleted" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Delete failed" });
  }
});

// ================= ANALYTICS =================
router.get("/analytics/summary", async (req, res) => {
  try {
    const totalOrders = await pool.query("SELECT COUNT(*) FROM orders");

    const totalRevenue = await pool.query(
      "SELECT COALESCE(SUM(amount),0) FROM orders WHERE payment_status='paid'",
    );

    const paid = await pool.query(
      "SELECT COUNT(*) FROM orders WHERE payment_status='paid'",
    );

    const unpaid = await pool.query(
      "SELECT COUNT(*) FROM orders WHERE payment_status='unpaid'",
    );

    const daily = await pool.query(`
      SELECT DATE(created_at) as date, COUNT(*) as count
      FROM orders
      GROUP BY DATE(created_at)
      ORDER BY date DESC
      LIMIT 7
    `);

    res.json({
      totalOrders: totalOrders.rows[0].count,
      totalRevenue: totalRevenue.rows[0].coalesce,
      paid: paid.rows[0].count,
      unpaid: unpaid.rows[0].count,
      daily: daily.rows,
    });
  } catch (err) {
    res.status(500).json({ error: "Analytics failed" });
  }
});

module.exports = router;
