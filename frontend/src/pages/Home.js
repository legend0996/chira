import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div style={{ padding: "15px" }}>
      {/* HERO */}
      <div
        style={{
          background: "linear-gradient(135deg, #4f46e5, #f59e0b)",
          padding: "25px 15px",
          borderRadius: "16px",
          color: "#fff",
          textAlign: "center",
        }}
      >
        <h1 style={{ fontSize: "22px" }}>Chira Tech Services</h1>

        <p style={{ fontSize: "14px", marginTop: "10px" }}>
          We provide fast, secure, and reliable digital services to help you
          handle applications, registrations, and online processes with ease.
        </p>

        <button style={btnPrimary} onClick={() => navigate("/services")}>
          Get Started
        </button>
      </div>

      {/* SERVICES PREVIEW */}
      <div style={{ marginTop: "30px", textAlign: "center" }}>
        <h2 style={{ fontSize: "20px" }}>Popular Services</h2>

        <p style={{ fontSize: "14px", marginTop: "8px" }}>
          Explore our most requested services designed to make your digital
          processes simple and stress-free.
        </p>

        <button style={btnPrimary} onClick={() => navigate("/services")}>
          View All Services
        </button>
      </div>

      {/* WHY CHIRA TECH */}
      <div style={{ marginTop: "40px", textAlign: "center" }}>
        <h2 style={{ fontSize: "20px" }}>Why Choose Chira Tech</h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
            gap: "12px",
            marginTop: "15px",
          }}
        >
          <div style={card}>
            <h4 style={title}>⚡ Fast & Efficient</h4>
            <p style={text}>
              We handle your requests quickly and professionally, ensuring fast
              delivery without delays.
            </p>
          </div>

          <div style={card}>
            <h4 style={title}>🔐 Secure Payments</h4>
            <p style={text}>
              All payments are processed safely through M-Pesa with full
              transparency.
            </p>
          </div>

          <div style={card}>
            <h4 style={title}>📞 Reliable Support</h4>
            <p style={text}>
              Our support team is always available to guide you and assist at
              every step.
            </p>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div
        style={{
          marginTop: "40px",
          padding: "25px 15px",
          textAlign: "center",
          background: "#111",
          color: "#fff",
          borderRadius: "16px",
        }}
      >
        <h2 style={{ fontSize: "20px" }}>Ready to Get Started?</h2>

        <p style={{ fontSize: "14px", marginTop: "8px" }}>
          Choose a service and let us handle everything for you quickly and
          professionally.
        </p>

        <button style={btnSecondary} onClick={() => navigate("/services")}>
          Start Now
        </button>
      </div>
    </div>
  );
};

// 🎨 STYLES
const card = {
  padding: "15px",
  borderRadius: "12px",
  background: "#fff",
  boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
  textAlign: "center",
};

const title = {
  fontSize: "14px",
  marginBottom: "6px",
};

const text = {
  fontSize: "12px",
  color: "#555",
};

const btnPrimary = {
  marginTop: "12px",
  padding: "10px",
  width: "100%",
  borderRadius: "8px",
  border: "none",
  background: "#4f46e5",
  color: "#fff",
  fontSize: "14px",
  cursor: "pointer",
};

const btnSecondary = {
  marginTop: "12px",
  padding: "10px",
  width: "100%",
  borderRadius: "8px",
  border: "none",
  background: "#f59e0b",
  color: "#fff",
  fontSize: "14px",
  cursor: "pointer",
};

export default Home;
