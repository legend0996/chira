const pool = require("../config/db");
const axios = require("axios");

// 🔐 GET ACCESS TOKEN
const getAccessToken = async () => {
  const auth = Buffer.from(
    process.env.MPESA_CONSUMER_KEY + ":" + process.env.MPESA_CONSUMER_SECRET,
  ).toString("base64");

  const res = await axios.get(
    "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials",
    {
      headers: {
        Authorization: `Basic ${auth}`,
      },
    },
  );

  return res.data.access_token;
};

// 💳 STK PUSH (PAY NOW)
exports.payNow = async (req, res) => {
  const { order_id, phone, amount } = req.body;

  try {
    const token = await getAccessToken();

    const timestamp = new Date()
      .toISOString()
      .replace(/[-:.TZ]/g, "")
      .slice(0, 14);

    const password = Buffer.from(
      process.env.MPESA_SHORTCODE + process.env.MPESA_PASSKEY + timestamp,
    ).toString("base64");

    const stkRes = await axios.post(
      "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest",
      {
        BusinessShortCode: process.env.MPESA_SHORTCODE,
        Password: password,
        Timestamp: timestamp,
        TransactionType: "CustomerPayBillOnline",
        Amount: amount,
        PartyA: phone,
        PartyB: process.env.MPESA_SHORTCODE,
        PhoneNumber: phone,
        CallBackURL: process.env.MPESA_CALLBACK_URL,
        AccountReference: order_id.toString(), // IMPORTANT
        TransactionDesc: "Chira Tech Payment",
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    res.json({
      message: "STK Push sent",
      data: stkRes.data,
    });
  } catch (err) {
    console.error("STK ERROR:", err.response?.data || err);
    res.status(500).json({ error: "STK failed" });
  }
};

// 📩 M-PESA CALLBACK
exports.mpesaCallback = async (req, res) => {
  try {
    const data = req.body;

    console.log("MPESA CALLBACK:", JSON.stringify(data));

    const callback = data.Body.stkCallback;

    const resultCode = callback.ResultCode;

    if (resultCode === 0) {
      const metadata = callback.CallbackMetadata.Item;

      const amount = metadata.find((i) => i.Name === "Amount")?.Value;
      const mpesa_code = metadata.find(
        (i) => i.Name === "MpesaReceiptNumber",
      )?.Value;
      const phone = metadata.find((i) => i.Name === "PhoneNumber")?.Value;

      const order_id = callback.MerchantRequestID; // temporary mapping

      // SAVE PAYMENT
      await pool.query(
        `INSERT INTO payments (order_id, amount, phone, mpesa_code, status)
         VALUES ($1,$2,$3,$4,$5)`,
        [order_id, amount, phone, mpesa_code, "success"],
      );

      // UPDATE ORDER
      await pool.query(
        "UPDATE orders SET payment_status=$1, status=$2 WHERE id=$3",
        ["paid", "Payment Confirmed", order_id],
      );
    }

    res.json({ message: "Callback received" });
  } catch (err) {
    console.error("CALLBACK ERROR:", err);
    res.status(500).json({ error: "Callback error" });
  }
};
