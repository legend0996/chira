import React, { useState, useEffect } from "react";
import AdminOrders from "./AdminOrders";
import AdminServices from "./AdminServices";
import Analyze from "./analyze";

const Dashboard = () => {
  const [tab, setTab] = useState("orders");

  // 🔐 PROTECT ADMIN
  useEffect(() => {
    const token = localStorage.getItem("adminToken");

    if (!token) {
      window.location.href = "/admin/login";
    }
  }, []);

  const renderContent = () => {
    switch (tab) {
      case "orders":
        return <AdminOrders />;
      case "services":
        return <AdminServices />;
      case "analytics":
        return <Analyze />;
      default:
        return <AdminOrders />;
    }
  };

  return (
    <div style={{ display: "flex" }}>
      {/* SIDEBAR */}
      <div style={sidebar}>
        <h2 style={{ color: "#fff" }}>Admin Panel</h2>

        <button style={btn(tab === "orders")} onClick={() => setTab("orders")}>
          Orders
        </button>

        <button
          style={btn(tab === "services")}
          onClick={() => setTab("services")}
        >
          Services
        </button>

        <button
          style={btn(tab === "analytics")}
          onClick={() => setTab("analytics")}
        >
          Analytics
        </button>
      </div>

      {/* MAIN CONTENT */}
      <div style={content}>{renderContent()}</div>
    </div>
  );
};

// 🎨 STYLES
const sidebar = {
  width: "220px",
  minHeight: "100vh",
  background: "#111827",
  padding: "20px",
  display: "flex",
  flexDirection: "column",
  gap: "10px",
};

const content = {
  flex: 1,
  padding: "20px",
  background: "#f9fafb",
};

const btn = (active) => ({
  padding: "12px",
  border: "none",
  borderRadius: "8px",
  background: active ? "#4f46e5" : "#374151",
  color: "#fff",
  cursor: "pointer",
  textAlign: "left",
});

export default Dashboard;
