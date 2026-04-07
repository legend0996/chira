import React from "react";
import { useNavigate } from "react-router-dom";

const ServiceCard = ({ service }) => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        borderRadius: "12px",
        padding: "10px",
        width: "100%", // ✅ FULL WIDTH (IMPORTANT)
        background: "#fff",
        boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
        transition: "0.2s",
        cursor: "pointer",
        textAlign: "center",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
    >
      {/* IMAGE */}
      <img
        src={service.image}
        alt={service.name}
        style={{
          width: "100%",
          height: "110px", // ✅ slightly smaller for mobile
          objectFit: "cover",
          borderRadius: "10px",
        }}
      />

      {/* TITLE */}
      <h3
        style={{
          marginTop: "8px",
          fontSize: "15px", // ✅ better mobile size
        }}
      >
        {service.name}
      </h3>

      {/* PRICE */}
      <p
        style={{
          fontWeight: "bold",
          color: "#4f46e5",
          marginBottom: "8px",
          fontSize: "14px",
        }}
      >
        KES {service.price}
      </p>

      {/* BUTTON */}
      <button
        style={{
          padding: "8px",
          width: "100%",
          borderRadius: "8px",
          border: "none",
          background: "linear-gradient(135deg, #4f46e5, #f59e0b)",
          color: "#fff",
          fontSize: "13px",
          cursor: "pointer",
        }}
        onClick={() => navigate(`/order/${service.id}`)}
      >
        Apply Now
      </button>
    </div>
  );
};

export default ServiceCard;
