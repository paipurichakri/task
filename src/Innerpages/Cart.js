import React, { useEffect, useState } from "react";
import axios from "axios";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:4000/cart")
      .then((res) => setCartItems(res.data))
      .catch((err) => console.error("Failed to fetch cart items:", err));
  }, []);

  return (
    <div>
      <h3 className="text-center mt-4">All the Orders</h3>
      <div style={containerStyle}>
        {cartItems.map((item, index) => (
          <div key={index} style={cardStyle}>
            <div style={topSection}>
              <strong>By {item.hotelname}</strong>
              <div style={{ fontSize: 13, color: "#555" }}>⭐ 4.4 · 30-35 MINS</div>
            </div>
            <img src={item.image} alt={item.subservice} style={imageStyle} />
            <div style={itemInfo}>
              <div style={itemTitle}>{item.subservice}</div>
              <div style={itemPrice}>₹{item.price}</div>
            </div>
            <div className="ms-4">
            <button className="btn btn-success my-2 ms-5">
              Order Confirmed <span style={tickStyle}>✅</span>
            </button>
            </div>
            {item.customisable && <div style={customisableStyle}>Customisable</div>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cart;

const containerStyle = { display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "20px", padding: "20px" };
const cardStyle = { backgroundColor: "#fff", borderRadius: 15, padding: 15, boxShadow: "0 4px 12px rgba(0,0,0,0.08)", position: "relative" };
const topSection = { marginBottom: 10, borderBottom: "1px dotted #ccc", paddingBottom: 5 };
const imageStyle = { width: "100%", height: 150, objectFit: "cover", borderRadius: 10 };
const itemInfo = { marginTop: 10, display: "flex", justifyContent: "space-between", alignItems: "center" };
const itemTitle = { fontWeight: 600, fontSize: 16 };
const itemPrice = { fontWeight: "bold", fontSize: 16 };
const customisableStyle = { textAlign: "right", fontSize: 13, color: "#777", marginTop: 5 };
const tickStyle = { marginLeft: "8px", fontSize: "18px", color: "white" };
