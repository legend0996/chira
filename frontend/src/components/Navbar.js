import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [time, setTime] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().toLocaleTimeString("en-KE", {
        timeZone: "Africa/Nairobi",
      });
      setTime(now);
    }, 1000);

    return () => clearInterval(interval); // ✅ FIX memory leak
  }, []);

  return (
    <div
      style={{
        height: "80px", // ✅ CONTROL HEIGHT HERE
        padding: "0 20px",
        background: "linear-gradient(135deg, #4f46e5, #f59e0b)",
        color: "#fff",
        borderRadius: "0 0 20px 20px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      {/* LEFT: LOGO */}
      <div>
        <h2 style={{ margin: 0 }}>⚡ Chira Tech</h2>
        <small>Nairobi Time: {time}</small>
      </div>

      {/* RIGHT: NAV LINKS */}
      <div>
        <Link to="/" style={linkStyle}>
          Home
        </Link>
        <Link to="/services" style={linkStyle}>
          Services
        </Link>
        <Link to="/track" style={linkStyle}>
          Track
        </Link>
      </div>
    </div>
  );
};

const linkStyle = {
  color: "#fff",
  marginLeft: "20px",
  textDecoration: "none",
  fontWeight: "500",
};

export default Navbar;
