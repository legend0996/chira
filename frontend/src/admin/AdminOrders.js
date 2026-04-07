import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await API.get("/orders");
      setOrders(res.data);
    } catch (err) {
      console.log(err);
      alert("Failed to load orders");
    }
  };

  // 🔍 FILTER
  const filtered = orders.filter(
    (o) =>
      o.customer_name?.toLowerCase().includes(search.toLowerCase()) ||
      o.phone?.includes(search),
  );

  return (
    <div style={{ padding: "20px" }}>
      <h2>All Orders</h2>

      {/* SEARCH */}
      <input
        placeholder="Search by name or phone..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={input}
      />

      {/* ORDERS */}
      {filtered.map((o) => (
        <div
          key={o.id}
          style={card}
          onClick={() => navigate(`/admin/orders/${o.id}`)}
        >
          <p>
            <b>Code:</b> {o.order_code}
          </p>
          <p>
            <b>Name:</b> {o.customer_name}
          </p>
          <p>
            <b>Phone:</b> {o.phone}
          </p>
          <p>
            <b>Status:</b> {o.status}
          </p>
          <p>
            <b>Payment:</b> {o.payment_status}
          </p>
        </div>
      ))}
    </div>
  );
};

// STYLES
const input = {
  width: "100%",
  padding: "10px",
  marginBottom: "20px",
  borderRadius: "8px",
  border: "1px solid #ddd",
};

const card = {
  padding: "15px",
  borderRadius: "10px",
  marginBottom: "15px",
  background: "#fff",
  boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
  cursor: "pointer",
};

export default AdminOrders;
