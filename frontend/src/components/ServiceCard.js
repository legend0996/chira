import React from "react";
import { useNavigate } from "react-router-dom";

const ServiceCard = ({ service }) => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        borderRadius: "15px",
        padding: "15px",
        width: "240px",
        background: "#fff",
        boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
        transition: "0.3s",
        cursor: "pointer",
        textAlign: "center",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
    >
      {/* IMAGE */}
      <img
        src={service.image}
        alt={service.name}
        style={{
          width: "100%",
          height: "140px",
          objectFit: "cover",
          borderRadius: "10px",
        }}
      />

      {/* TITLE */}
      <h3 style={{ marginTop: "10px" }}>{service.name}</h3>

      {/* PRICE */}
      <p
        style={{
          fontWeight: "bold",
          color: "#4f46e5",
          marginBottom: "10px",
        }}
      >
        KES {service.price}
      </p>

      {/* BUTTON */}
      <button
        style={{
          padding: "10px",
          width: "100%",
          borderRadius: "8px",
          border: "none",
          background: "linear-gradient(135deg, #4f46e5, #f59e0b)",
          color: "#fff",
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
