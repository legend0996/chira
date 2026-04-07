import React from "react";
import { FaWhatsapp } from "react-icons/fa";

const WhatsAppButton = () => {
  const phone = "254796211297"; // your number

  const message = encodeURIComponent(
    "Hi Chira Tech 👋, I am interested in your services. Tell me more.",
  );

  const url = `https://wa.me/${phone}?text=${message}`;

  return (
    <a href={url} target="_blank" rel="noreferrer" style={btn}>
      <FaWhatsapp size={28} />
    </a>
  );
};

const btn = {
  position: "fixed",
  bottom: "20px",
  right: "20px",
  background: "#25D366",
  color: "#fff",
  width: "60px",
  height: "60px",
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  boxShadow: "0 5px 15px rgba(0,0,0,0.3)",
  zIndex: 1000,
};

export default WhatsAppButton;
