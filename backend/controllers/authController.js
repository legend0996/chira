const pool = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// LOGIN ADMIN
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await pool.query("SELECT * FROM admins WHERE email=$1", [
      email,
    ]);

    if (result.rows.length === 0) {
      return res.status(400).json({ message: "Admin not found" });
    }

    const admin = result.rows[0];

    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Wrong password" });
    }

    const token = jwt.sign({ id: admin.id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.json({
      token,
      admin: {
        id: admin.id,
        name: admin.name,
        email: admin.email,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};
