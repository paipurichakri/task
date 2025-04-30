import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Items = () => {
  const [data, setData] = useState([]);
  const [quantities, setQuantities] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:4000/subservice")
      .then((res) => {
        setData(res.data);
        setQuantities(Array(res.data.length).fill(0));
      })
      .catch(console.log);
  }, []);

  const updateQuantity = (i, delta) => {
    setQuantities(q => q.map((qty, idx) => idx === i ? Math.max(0, qty + delta) : qty));
  };

  const handleAddToCart = (i) => {
    const item = data[i];
    const qty = quantities[i];
    if (qty === 0) return alert("Please increase quantity before adding to cart.");

    const payload = { serviceId: item._id, subservice: item.subservice, service: item.service, hotelname: item.hotelname, price: item.price, quantity: qty, totalPrice: item.price * qty, image: item.image };
    axios.post("http://localhost:4000/cart", payload)
      .then(() => {
        alert("Item added to cart!");
        navigate("/");
      })
      .catch(() => alert("Failed to add item to cart."));
  };

  const totalItems = quantities.reduce((sum, q) => sum + q, 0);

  return (
    <div style={{ backgroundColor: "#f6f6f6", padding: "30px" }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Menu</h2>
      <div style={{ textAlign: "center", marginBottom: "20px", fontWeight: "bold" }}>🛒 Total Items: {totalItems}</div>
      <div style={{ display: "flex", gap: "30px", justifyContent: "center", flexWrap: "wrap" }}>
        {data.map((item, i) => (
          <div key={i} style={cardStyle}>
            <div style={{ marginBottom: 10 }}>
              <strong>By {item.hotelname}</strong>
              <div style={{ fontSize: 13, color: "#777" }}>⭐ {item.rating} · {item.time} MINS</div>
            </div>
            <div style={{ marginBottom: 10 }}>
              <h6>{item.service}</h6>
              <div style={{ fontSize: 20, fontWeight: 600 }} className="d-inline">{item.subservice}</div>
              <div style={{ fontSize: 20, fontWeight: "bold" }} className="d-inline float-end">₹{item.price}</div>
            </div>
            <div style={{ position: "relative" }}>
              <img src={item.image} alt={item.name} style={imageStyle} />
              <div style={buttonContainerStyle}>
                {quantities[i] === 0 ? (
                  <button onClick={() => updateQuantity(i, 1)} style={btnStyle}>ADD</button>
                ) : (
                  <div style={counterBox}>
                    <button onClick={() => updateQuantity(i, -1)} style={counterBtn}>−</button>
                    <span style={{ fontWeight: "bold", fontSize: 16 }}>{quantities[i]}</span>
                    <button onClick={() => updateQuantity(i, 1)} style={counterBtn}>+</button>
                  </div>
                )}
              </div>
            </div>
            <div className="mt-2 text-center">
              <button className="btn btn-success" onClick={() => handleAddToCart(i)} disabled={quantities[i] === 0}>Add to cart</button>
            </div>
            {item.customisable && <div style={customisableStyle}>Customisable</div>}
          </div>
        ))}
      </div>
    </div>
  );
};

const cardStyle = { backgroundColor: "#fff", borderRadius: 20, width: 280, padding: 20, boxShadow: "0 4px 10px rgba(0,0,0,0.1)" };
const btnStyle = { padding: "6px 20px", border: "none", borderRadius: "12px", backgroundColor: "#eaffea", color: "#007f00", fontWeight: "bold", cursor: "pointer" };
const imageStyle = { width: "100%", height: 170, objectFit: "cover", borderRadius: 10 };
const buttonContainerStyle = { position: "absolute", bottom: 10, left: "50%", transform: "translateX(-50%)" };
const counterBox = { display: "flex", alignItems: "center", backgroundColor: "#eaffea", borderRadius: "12px", padding: "5px 12px" };
const counterBtn = { background: "none", border: "none", fontSize: 20, color: "#007f00", cursor: "pointer", padding: "0 10px" };
const customisableStyle = { textAlign: "right", fontSize: 13, color: "#777", marginTop: 5 };

export default Items;
