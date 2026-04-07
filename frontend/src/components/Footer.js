import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div
      style={{
        marginTop: "40px",
        padding: "20px",
        background: "#111",
        color: "#fff",
        textAlign: "center",
      }}
    >
      <p>© {new Date().getFullYear()} Chira Tech. All rights reserved.</p>

      <Link to="/terms" style={{ color: "#f59e0b" }}>
        Terms & Conditions
      </Link>
    </div>
  );
};

export default Footer;
