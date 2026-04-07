import React, { useEffect, useState } from "react";
import ServiceCard from "../components/ServiceCard";
import API from "../services/api";

// IMAGES (KEEP THESE)
import paybillImg from "../pages/paybill.png";
import tillImg from "../pages/tillnamechange.png";
import businessRegImg from "../pages/brs.png";
import profileImg from "../pages/profile business.png";
import helbImg from "../pages/helb.png";
import kuccpsImg from "../pages/kuccps.png";
import kraPinImg from "../pages/kra registration.png";
import kraReturnsImg from "../pages/returns kra.png";
import ecitizenImg from "../pages/ecitizen.png";
import mpesaImg from "../pages/mpesa statement.png";
import netflixImg from "../pages/netflix.png";

// 🔥 MAP IMAGES TO NAMES
const images = {
  "Paybill Setup": paybillImg,
  "Till Name Change": tillImg,
  "Business Registration": businessRegImg,
  "Business Profile Consultation": profileImg,
  "HELB Application": helbImg,
  "KUCCPS Application": kuccpsImg,
  "KRA PIN Registration": kraPinImg,
  "KRA Returns Filing": kraReturnsImg,
  "eCitizen Services": ecitizenImg,
  "M-Pesa Statement Request": mpesaImg,
  "Netflix Subscription": netflixImg,
};

const Services = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const res = await API.get("/services");

      // 🔥 Attach images dynamically
      const data = res.data.map((s) => ({
        ...s,
        image: images[s.name],
      }));

      setServices(data);
    } catch (err) {
      console.log(err);
      alert("Failed to load services");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      {/* HERO */}
      <div style={{ textAlign: "center", marginBottom: "30px" }}>
        <h1 style={{ fontSize: "28px", color: "#4f46e5" }}>
          Digital Services Made Easy
        </h1>
        <p style={{ color: "#666" }}>
          We provide fast, secure, and reliable solutions to help you complete
          important processes quickly and without stress.
        </p>
      </div>

      {/* SERVICES */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "20px",
        }}
      >
        {services.map((s) => (
          <ServiceCard key={s.id} service={s} />
        ))}
      </div>
    </div>
  );
};

export default Services;
