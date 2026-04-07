const express = require("express");
const router = express.Router();

const { payNow, mpesaCallback } = require("../controllers/paymentController");

router.post("/pay-now", payNow);
router.post("/callback", mpesaCallback);

module.exports = router;
