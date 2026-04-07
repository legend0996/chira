const pool = require("../config/db");

const generateOrderCode = async (isPaid = true) => {
  const now = new Date();
  const month = String(now.getMonth() + 1).padStart(2, "0");

  const result = await pool.query(
    "SELECT COUNT(*) FROM orders WHERE DATE_TRUNC('month', created_at) = DATE_TRUNC('month', CURRENT_DATE)",
  );

  let count = parseInt(result.rows[0].count) + 1;

  const number = String(count).padStart(3, "0");

  if (isPaid) {
    return `CHIRA-${month}-${number}`;
  } else {
    return `UNPAID-${month}-${number}`;
  }
};

module.exports = generateOrderCode;
