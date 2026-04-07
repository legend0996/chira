const express = require("express");
const router = express.Router();

// simple login (you can upgrade later)
router.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (username === "admin" && password === "1234") {
    return res.json({ token: "admin-token" });
  }

  res.status(401).json({ message: "Invalid credentials" });
});

module.exports = router;
