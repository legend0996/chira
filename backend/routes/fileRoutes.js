const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const pool = require("../config/db");

// 📂 STORAGE CONFIG
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueName =
      Date.now() + "-" + file.originalname.replace(/\s+/g, "_");
    cb(null, uniqueName);
  },
});

// 📌 FILE FILTER (ONLY ALLOW IMAGES + PDF)
const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png", "application/pdf"];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only JPG, PNG, PDF allowed"), false);
  }
};

// 🚀 UPLOAD CONFIG
const upload = multer({
  storage,
  fileFilter,
});

// 📤 UPLOAD ROUTE
router.post("/upload", upload.single("file"), async (req, res) => {
  const { order_id, label } = req.body;

  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  try {
    await pool.query(
      "INSERT INTO files (order_id, file_path, label) VALUES ($1,$2,$3)",
      [order_id, req.file.path, label],
    );

    res.json({
      message: "File uploaded successfully",
      file: req.file.filename,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Upload failed" });
  }
});

module.exports = router;
