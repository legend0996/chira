import React, { useEffect, useState } from "react";
import API from "../services/api";

const Analyze = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const res = await API.get("/orders/analytics/summary");
      setData(res.data);
    } catch (err) {
      console.log(err);
      alert("Failed to load analytics");
    }
  };

  if (!data) return <p style={{ padding: "20px" }}>Loading analytics...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Analytics Dashboard 📊</h2>

      {/* CARDS */}
      <div style={grid}>
        <div style={card}>
          <h3>Total Orders</h3>
          <p>{data.totalOrders}</p>
        </div>

        <div style={card}>
          <h3>Total Revenue</h3>
          <p>KES {data.totalRevenue}</p>
        </div>

        <div style={card}>
          <h3>Paid Orders</h3>
          <p>{data.paid}</p>
        </div>

        <div style={card}>
          <h3>Unpaid Orders</h3>
          <p>{data.unpaid}</p>
        </div>
      </div>

      {/* DAILY ORDERS */}
      <div style={{ marginTop: "30px" }}>
        <h3>Orders (Last 7 Days)</h3>

        {data.daily.map((d, i) => (
          <div key={i} style={dayRow}>
            <span>{d.date}</span>
            <span>{d.count} orders</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// 🎨 STYLES
const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
  gap: "20px",
  marginTop: "20px",
};

const card = {
  background: "#fff",
  padding: "20px",
  borderRadius: "12px",
  textAlign: "center",
  boxShadow: "0 5px 15px rgba(0,0,0,0.08)",
};

const dayRow = {
  display: "flex",
  justifyContent: "space-between",
  padding: "10px",
  borderBottom: "1px solid #eee",
};

export default Analyze;
