import React, { useState } from "react";
import API from "../services/api";

const Login = () => {
  const [form, setForm] = useState({ username: "", password: "" });

  const handleLogin = async () => {
    try {
      const res = await API.post("/admin/login", form);

      localStorage.setItem("adminToken", res.data.token);

      window.location.href = "/admin";
    } catch (err) {
      alert("Invalid login");
    }
  };

  return (
    <div style={box}>
      <h2>Admin Login</h2>

      <input
        placeholder="Username"
        onChange={(e) => setForm({ ...form, username: e.target.value })}
        style={input}
      />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setForm({ ...form, password: e.target.value })}
        style={input}
      />

      <button style={btn} onClick={handleLogin}>
        Login
      </button>
    </div>
  );
};

const box = {
  maxWidth: "400px",
  margin: "100px auto",
  padding: "20px",
  background: "#fff",
  borderRadius: "10px",
};

const input = {
  width: "100%",
  padding: "10px",
  marginBottom: "10px",
};

const btn = {
  width: "100%",
  padding: "10px",
  background: "#4f46e5",
  color: "#fff",
  border: "none",
};

export default Login;
