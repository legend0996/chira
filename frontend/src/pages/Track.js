import React, { useState } from "react";
import API from "../services/api";

const Track = () => {
  const [code, setCode] = useState("");
  const [data, setData] = useState(null);

  const track = async () => {
    try {
      const res = await API.get(`/orders/track/${code}`);
      setData(res.data);
    } catch {
      alert("Not found");
    }
  };

  return (
    <div>
      <h2>Track Order</h2>

      <input
        placeholder="Enter code"
        onChange={(e) => setCode(e.target.value)}
      />

      <button onClick={track}>Track</button>

      {data && (
        <div>
          <h3>Status: {data.order.status}</h3>
          <p>Payment: {data.order.payment_status}</p>
        </div>
      )}
    </div>
  );
};

export default Track;
