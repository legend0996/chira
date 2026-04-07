require("dotenv").config();
const express = require("express");
const cors = require("cors");

const pool = require("./config/db");

// ROUTES
const authRoutes = require("./routes/authRoutes");
const serviceRoutes = require("./routes/serviceRoutes");
const orderRoutes = require("./routes/orderRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const fileRoutes = require("./routes/fileRoutes");
const adminRoutes = require("./routes/adminRoutes");

const app = express();

// MIDDLEWARE
app.use(cors());
app.use(express.json());

// API ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/files", fileRoutes);
app.use("/uploads", express.static("uploads"));
app.use("/api/admin", adminRoutes);

// ROOT TEST
app.get("/", (req, res) => {
  res.send("API is running...");
});

// DATABASE TEST
app.get("/test-db", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

// 404 HANDLER
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// SERVER START
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
