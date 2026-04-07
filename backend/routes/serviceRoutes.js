const express = require("express");
const router = express.Router();

const {
  createService,
  getServices,
} = require("../controllers/serviceController");

const pool = require("../config/db");

// CREATE SERVICE
router.post("/", createService);

// GET ALL SERVICES
router.get("/", getServices);

// ✅ UPDATE PRICE (NEW)
router.put("/:id", async (req, res) => {
  const { price } = req.body;

  try {
    await pool.query("UPDATE services SET price=$1 WHERE id=$2", [
      price,
      req.params.id,
    ]);

    res.json({ message: "Price updated" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to update price" });
  }
});

module.exports = router;
