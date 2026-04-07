import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";

const OrderDetails = () => {
  const { id } = useParams();

  const [order, setOrder] = useState(null);
  const [files, setFiles] = useState([]);

  useEffect(() => {
    fetchOrder();
    fetchFiles();
  }, []);

  // 📦 GET ORDER
  const fetchOrder = async () => {
    try {
      const res = await API.get(`/orders/${id}`);
      setOrder(res.data);
    } catch (err) {
      console.log(err);
      alert("Failed to load order");
    }
  };

  // 📂 GET FILES
  const fetchFiles = async () => {
    try {
      const res = await API.get(`/files/${id}`);
      setFiles(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // ✅ UPDATE STATUS
  const updateStatus = async (status) => {
    try {
      await API.put(`/orders/${id}`, { status });
      alert("Status updated");
      fetchOrder();
    } catch (err) {
      console.log(err);
      alert("Failed to update status");
    }
  };

  // 💳 CONFIRM PAYMENT
  const confirmPayment = async () => {
    try {
      await API.put(`/orders/${id}`, {
        payment_status: "paid",
        status: "Payment Confirmed",
      });

      alert("Payment confirmed");
      fetchOrder();
    } catch (err) {
      console.log(err);
      alert("Failed to confirm payment");
    }
  };

  // 🔥 DELETE ORDER (FIXED)
  const deleteOrder = async () => {
    if (!window.confirm("Are you sure you want to delete this order?")) return;

    try {
      await API.delete(`/orders/${id}`);
      alert("Order deleted");
      window.location.href = "/admin";
    } catch (err) {
      console.log(err);
      alert("Delete failed");
    }
  };

  if (!order) return <p style={{ padding: "20px" }}>Loading...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Order Details</h2>

      {/* CUSTOMER */}
      <div style={card}>
        <h3>Customer</h3>
        <p>
          <b>Name:</b> {order.customer_name}
        </p>
        <p>
          <b>Phone:</b> {order.phone}
        </p>
        <p>
          <b>Email:</b> {order.email}
        </p>
      </div>

      {/* SERVICE */}
      <div style={card}>
        <h3>Service Info</h3>
        <p>
          <b>Service ID:</b> {order.service_id}
        </p>
        <p>
          <b>Amount:</b> KES {order.amount}
        </p>
        <p>
          <b>Status:</b> {order.status}
        </p>
        <p>
          <b>Payment:</b> {order.payment_status}
        </p>
      </div>

      {/* FORM DATA */}
      <div style={card}>
        <h3>Submitted Details</h3>

        {order.formdata &&
          Object.entries(order.formdata).map(([key, value]) => (
            <p key={key}>
              <b>{key}:</b> {value}
            </p>
          ))}
      </div>

      {/* FILES */}
      <div style={card}>
        <h3>Uploaded Documents</h3>

        {files.length === 0 && <p>No files uploaded</p>}

        <div style={fileGrid}>
          {files.map((f, i) => {
            const fileUrl = `http://localhost:5000/${f.file_path}`;
            const isImage = f.file_path.match(/\.(jpg|jpeg|png|webp)$/i);
            const isPDF = f.file_path.match(/\.pdf$/i);

            return (
              <div key={i} style={fileCard}>
                <p style={{ fontWeight: "bold" }}>{f.label}</p>

                {isImage && (
                  <img
                    src={fileUrl}
                    alt="doc"
                    style={{
                      width: "100%",
                      height: "150px",
                      objectFit: "cover",
                      borderRadius: "8px",
                    }}
                  />
                )}

                {isPDF && <p>📄 PDF Document</p>}

                <a href={fileUrl} target="_blank" rel="noreferrer">
                  <button style={btnView}>View</button>
                </a>
              </div>
            );
          })}
        </div>
      </div>

      {/* ACTIONS */}
      <div style={{ marginTop: "20px", display: "flex", gap: "10px" }}>
        <button style={btn} onClick={() => updateStatus("In Progress")}>
          Start Work
        </button>

        <button style={btn} onClick={() => updateStatus("Completed")}>
          Mark Completed
        </button>

        <button style={btnGreen} onClick={confirmPayment}>
          Confirm Payment
        </button>

        {/* 🔥 DELETE BUTTON */}
        <button style={{ ...btn, background: "red" }} onClick={deleteOrder}>
          Delete Order
        </button>
      </div>
    </div>
  );
};

// STYLES
const card = {
  background: "#fff",
  padding: "20px",
  borderRadius: "10px",
  marginBottom: "20px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
};

const fileGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
  gap: "15px",
};

const fileCard = {
  background: "#fff",
  padding: "10px",
  borderRadius: "10px",
  boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
  textAlign: "center",
};

const btnView = {
  marginTop: "10px",
  padding: "8px",
  width: "100%",
  background: "#4f46e5",
  color: "#fff",
  border: "none",
  borderRadius: "6px",
};

const btn = {
  padding: "10px 15px",
  borderRadius: "8px",
  border: "none",
  background: "#4f46e5",
  color: "#fff",
};

const btnGreen = {
  padding: "10px 15px",
  borderRadius: "8px",
  border: "none",
  background: "green",
  color: "#fff",
};

export default OrderDetails;
