import React, { useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";

const services = [
  { id: 1, name: "Paybill Setup", price: 2999 },
  { id: 2, name: "Till Name Change", price: 300 },
  { id: 3, name: "Business Registration", price: 1500 },
  { id: 4, name: "Business Profile Consultation", price: 300 },
  { id: 5, name: "HELB Application", price: 300 },
  { id: 6, name: "KUCCPS Application", price: 1800 },
  { id: 7, name: "KRA PIN Registration", price: 200 },
  { id: 8, name: "KRA Returns Filing", price: 500 },
  { id: 9, name: "eCitizen Services", price: 150 },
  { id: 10, name: "M-Pesa Statement Request", price: 200 },
  { id: 11, name: "Netflix Subscription", price: 500 },
];

const Order = () => {
  const { id } = useParams();
  const service = services.find((s) => s.id === parseInt(id));

  const [formData, setFormData] = useState({});
  const [files, setFiles] = useState({});
  const [loading, setLoading] = useState(false);

  const [customer, setCustomer] = useState({
    name: "",
    phone: "",
    email: "",
  });

  const handleChange = (e, label) => {
    setFormData({ ...formData, [label]: e.target.value });
  };

  const handleFile = (e, label) => {
    setFiles({ ...files, [label]: e.target.files[0] });
  };

  // 🔥 FIELDS
  const getFields = () => {
    switch (service.id) {
      case 1:
        return ["Business Name", "Business Type", "ID Number"];
      case 2:
        return ["Till Number", "Store Number", "Nominated Number"];
      case 3:
        return ["Proposed Business Name", "Owner Name", "ID Number"];
      case 4:
        return ["Business Name", "Description"];
      case 5:
        return ["Full Name", "ID Number", "Institution"];
      case 6:
        return ["Full Name", "KCSE Index", "Course"];
      case 7:
        return ["Full Name", "ID Number", "DOB"];
      case 8:
        return ["KRA PIN", "Email"];
      case 9:
        return ["Full Name", "ID Number", "Service Type"];
      case 10:
        return ["Phone Number", "Period"];
      case 11:
        return ["Netflix Email"];
      default:
        return [];
    }
  };

  const getFileFields = () => {
    if (service.id === 1) {
      return [
        "ID Front",
        "ID Back",
        "KRA Certificate",
        "Business Certificate",
        "Bank Letter",
      ];
    }
    if (service.id === 2) {
      return ["ID Front", "ID Back", "KRA Certificate", "Business Certificate"];
    }
    return [];
  };

  // 🔥 VALIDATION
  const validateForm = () => {
    if (!customer.name || !customer.phone || !customer.email) {
      alert("Fill all customer details");
      return false;
    }

    for (let f of getFields()) {
      if (!formData[f]) {
        alert(`Fill ${f}`);
        return false;
      }
    }

    for (let f of getFileFields()) {
      if (!files[f]) {
        alert(`Upload ${f}`);
        return false;
      }
    }

    return true;
  };

  // 🔥 FINAL CREATE ORDER (FORM + FILES TOGETHER)
  const createOrder = async () => {
    try {
      const data = new FormData();

      data.append("customer_name", customer.name);
      data.append("phone", customer.phone);
      data.append("email", customer.email);
      data.append("service_id", id);
      data.append("amount", service.price);
      data.append("payment_status", "unpaid");

      data.append("formData", JSON.stringify(formData));

      Object.keys(files).forEach((key) => {
        data.append("files", files[key]);
        data.append("fileLabels", key);
      });

      const res = await API.post("/orders", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Order created! Code: " + res.data.order.order_code);
      return res.data.order;
    } catch (err) {
      console.log(err);
      alert("Error creating order");
    }
  };

  const handlePayLater = async () => {
    if (!validateForm()) return;

    if (loading) return;
    setLoading(true);

    await createOrder();

    setLoading(false);
  };

  const handlePayNow = async () => {
    if (!validateForm()) return;

    if (loading) return;
    setLoading(true);

    const order = await createOrder();

    if (!order) {
      setLoading(false);
      return;
    }

    try {
      await API.post("/payments/pay-now", {
        order_id: order.id,
        phone: customer.phone,
        amount: service.price,
      });

      alert("STK push sent 📲 Check your phone");
    } catch (err) {
      console.log(err);
      alert("Payment failed");
    }

    setLoading(false);
  };

  if (!service) return <p>Service not found</p>;

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>
      <h2>{service.name}</h2>

      <div style={card}>
        <h3>Customer Details</h3>

        <input
          style={input}
          placeholder="Full Name"
          onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
        />

        <input
          style={input}
          placeholder="Phone (2547XXXXXXXX)"
          onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
        />

        <input
          style={input}
          placeholder="Email"
          onChange={(e) => setCustomer({ ...customer, email: e.target.value })}
        />
      </div>

      <div style={card}>
        <h3>Service Details</h3>

        {getFields().map((field, i) => (
          <input
            key={i}
            style={input}
            placeholder={field}
            onChange={(e) => handleChange(e, field)}
          />
        ))}
      </div>

      {getFileFields().length > 0 && (
        <div style={card}>
          <h3>Upload Documents</h3>

          {getFileFields().map((f, i) => (
            <div key={i}>
              <label>{f}</label>
              <input type="file" onChange={(e) => handleFile(e, f)} />
            </div>
          ))}
        </div>
      )}

      <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
        <button style={btnLight} onClick={handlePayLater}>
          {loading ? "Processing..." : "Pay Later"}
        </button>

        <button style={btnPrimary} onClick={handlePayNow}>
          {loading ? "Processing..." : "Pay Now"}
        </button>
      </div>
    </div>
  );
};

// 🎨 STYLES
const card = {
  background: "#fff",
  padding: "20px",
  borderRadius: "12px",
  marginTop: "20px",
  boxShadow: "0 5px 15px rgba(0,0,0,0.08)",
};

const input = {
  width: "100%",
  padding: "10px",
  marginBottom: "10px",
  borderRadius: "8px",
  border: "1px solid #ddd",
};

const btnPrimary = {
  flex: 1,
  padding: "12px",
  background: "#4f46e5",
  color: "#fff",
  border: "none",
  borderRadius: "8px",
};

const btnLight = {
  flex: 1,
  padding: "12px",
  background: "#eee",
  border: "none",
  borderRadius: "8px",
};

export default Order;
