const pool = require("../config/db");

// CREATE SERVICE
exports.createService = async (req, res) => {
  const { name, price, fields } = req.body;

  try {
    const serviceResult = await pool.query(
      "INSERT INTO services (name, price) VALUES ($1, $2) RETURNING *",
      [name, price],
    );

    const service = serviceResult.rows[0];

    for (let field of fields) {
      await pool.query(
        "INSERT INTO service_fields (service_id, label, type, required) VALUES ($1, $2, $3, $4)",
        [service.id, field.label, field.type, field.required],
      );
    }

    res.json({ message: "Service created", service });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error creating service" });
  }
};

// GET ALL SERVICES
exports.getServices = async (req, res) => {
  try {
    const services = await pool.query("SELECT * FROM services");

    for (let service of services.rows) {
      const fields = await pool.query(
        "SELECT * FROM service_fields WHERE service_id=$1",
        [service.id],
      );

      service.fields = fields.rows;
    }

    res.json(services.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error fetching services" });
  }
};
