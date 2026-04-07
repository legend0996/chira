import React, { useEffect, useState } from "react";
import API from "../services/api";

const AdminServices = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const res = await API.get("/services");
      setServices(res.data);
    } catch (err) {
      console.log(err);
      alert("Failed to load services");
    }
  };

  const handleChange = (id, value) => {
    setServices((prev) =>
      prev.map((s) => (s.id === id ? { ...s, price: value } : s)),
    );
  };

  const updatePrice = async (id, price) => {
    try {
      await API.put(`/services/${id}`, { price });
      alert("Price updated");
    } catch (err) {
      console.log(err);
      alert("Failed to update price");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Manage Services</h2>

      {services.map((s) => (
        <div key={s.id} style={card}>
          <p>
            <b>{s.name}</b>
          </p>

          <input
            type="number"
            value={s.price}
            onChange={(e) => handleChange(s.id, e.target.value)}
            style={input}
          />

          <button style={btn} onClick={() => updatePrice(s.id, s.price)}>
            Save
          </button>
        </div>
      ))}
    </div>
  );
};

// STYLES
const card = {
  padding: "15px",
  borderRadius: "10px",
  marginBottom: "15px",
  background: "#fff",
  boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
};

const input = {
  padding: "8px",
  marginRight: "10px",
  borderRadius: "6px",
  border: "1px solid #ddd",
};

const btn = {
  padding: "8px 12px",
  background: "#4f46e5",
  color: "#fff",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
};

export default AdminServices;
