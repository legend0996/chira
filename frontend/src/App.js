import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// CLIENT PAGES
import Services from "./pages/Services";
import Order from "./pages/Order";
import Track from "./pages/Track";
import Home from "./pages/Home";
import Terms from "./pages/Terms";
import WhatsAppButton from "./components/WhatsAppButton";

// ADMIN PAGES
import Dashboard from "./admin/Dashboard";
import AdminOrders from "./admin/AdminOrders";
import OrderDetails from "./admin/OrderDetails";
import AdminServices from "./admin/AdminServices";
import Analyze from "./admin/analyze"; // ✅ your file name
import Login from "./admin/Login";
function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* MAIN CONTENT */}
        <div style={{ flex: 1 }}>
          <Routes>
            {/* CLIENT */}
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/order/:id" element={<Order />} />
            <Route path="/track" element={<Track />} />
            <Route path="/terms" element={<Terms />} />
            {/* ADMIN */}
            <Route path="/admin" element={<Dashboard />} />
            <Route path="/admin/orders" element={<AdminOrders />} />
            <Route path="/admin/orders/:id" element={<OrderDetails />} />
            <Route path="/admin/services" element={<AdminServices />} />
            <Route path="/admin/analytics" element={<Analyze />} />{" "}
            <Route path="/admin/login" element={<Login />} />
            {/* ✅ FIXED */}
          </Routes>
        </div>

        {/* FOOTER */}
        <Footer />
      </div>
      <WhatsAppButton />
    </BrowserRouter>
  );
}

export default App;
