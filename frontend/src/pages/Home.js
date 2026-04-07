import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div style={{ padding: "20px" }}>
      {/* HERO */}
      <div
        style={{
          background: "linear-gradient(135deg, #4f46e5, #f59e0b)",
          padding: "60px 20px",
          borderRadius: "20px",
          color: "#fff",
          textAlign: "center",
        }}
      >
        <h1>Chira Tech Services</h1>
        <p>
          We provide fast, secure, and reliable digital services to help you
          handle applications, registrations, and online processes with ease.
        </p>

        <button
          style={{
            marginTop: "20px",
            padding: "10px 20px",
            borderRadius: "10px",
            border: "none",
            cursor: "pointer",
          }}
          onClick={() => navigate("/services")}
        >
          Get Started
        </button>
      </div>

      {/* SERVICES PREVIEW */}
      <div style={{ marginTop: "40px", textAlign: "center" }}>
        <h2>Popular Services</h2>

        <p style={{ maxWidth: "600px", margin: "10px auto" }}>
          Explore some of our most requested services designed to make your
          digital processes simple, fast, and stress-free.
        </p>

        <button
          style={{
            marginTop: "10px",
            padding: "10px 20px",
            borderRadius: "10px",
            border: "none",
            background: "#4f46e5",
            color: "#fff",
            cursor: "pointer",
          }}
          onClick={() => navigate("/services")}
        >
          View All Services
        </button>
      </div>

      {/* WHY CHIRA TECH */}
      <div style={{ marginTop: "50px", textAlign: "center" }}>
        <h2>Why Choose Chira Tech</h2>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "20px",
            marginTop: "20px",
          }}
        >
          <div style={card}>
            <h4>⚡ Fast & Efficient</h4>
            <p>
              We handle your requests quickly and professionally, ensuring
              timely delivery without unnecessary delays.
            </p>
          </div>

          <div style={card}>
            <h4>🔐 Secure Payments</h4>
            <p>
              All transactions are processed safely through M-Pesa with full
              transparency and security.
            </p>
          </div>

          <div style={card}>
            <h4>📞 Reliable Support</h4>
            <p>
              Our team is always available to guide you and ensure a smooth
              service experience from start to finish.
            </p>
          </div>
        </div>
      </div>

      {/* CALL TO ACTION */}
      <div
        style={{
          marginTop: "50px",
          padding: "40px",
          textAlign: "center",
          background: "#111",
          color: "#fff",
          borderRadius: "20px",
        }}
      >
        <h2>Ready to Get Started?</h2>
        <p>
          Choose a service and let us handle the process for you quickly and
          professionally.
        </p>

        <button
          style={{
            marginTop: "15px",
            padding: "10px 20px",
            borderRadius: "10px",
            border: "none",
            background: "#f59e0b",
            cursor: "pointer",
          }}
          onClick={() => navigate("/services")}
        >
          Start Now
        </button>
      </div>
    </div>
  );
};

const card = {
  width: "250px",
  padding: "20px",
  borderRadius: "12px",
  background: "#fff",
  boxShadow: "0 5px 15px rgba(0,0,0,0.08)",
};

export default Home;
