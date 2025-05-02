import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const Singlecard = () => {
  const [data, setData] = useState([]);
  const [quantities, setQuantities] = useState([]);
  const { dservice } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`https://food-order-system-backend.onrender.com/subservice/${dservice}`)
      .then((res) => {
        setData(res.data || []);
        setQuantities(Array((res.data || []).length).fill(0));
      })
      .catch(console.log);
  }, [dservice]);

  const updateQuantity = (i, delta) => {
    setQuantities(q => q.map((val, idx) => (idx === i ? Math.max(0, val + delta) : val)));
  };

  const handleAddToCart = (index) => {
    const item = data[index];
    const quantity = quantities[index];
    if (quantity > 0) {
      axios.post("https://food-order-system-backend.onrender.com/cart", {
        subservice: item.subservice,
        price: item.price,
        quantity,
        total: item.price * quantity,
        hotelname: item.hotelname,
        image: item.image,
      })
        .then(() => {
          alert("Item added to cart!");
          navigate("/");
        })
        .catch(console.error);
    }
  };

  return (
    <div style={{ backgroundColor: "#f6f6f6", padding: "30px" }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Menu</h2>
      <div style={{ display: "flex", gap: "20px", justifyContent: "center", flexWrap: "wrap" }}>
        {data.map((item, i) => {
          const qty = quantities[i];
          return (
            <div key={i} style={cardStyle}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
                <div>
                  <div style={{ fontWeight: "bold" }}>By {item.hotelname}</div>
                  <div style={{ fontSize: 13, color: "#777" }}>⭐ {item.rating} · {item.time} MINS</div>
                </div>
                <div style={{ fontSize: 20, color: "#999" }}>➔</div>
              </div>
              <div style={{ marginBottom: 10 }}>
                <div style={{ fontSize: 16, fontWeight: 600 }} className="d-inline">{item.subservice}</div>
                <div style={{ fontSize: 15, fontWeight: "bold" }} className="d-inline float-end">₹{item.price}</div>
              </div>
              <div style={{ marginBottom: 10 }}>
                <button style={detailsBtn}>More Details ➤</button>
              </div>
              <div style={{ position: "relative" }}>
                <img src={item.image} alt={item.subservice} style={{ width: "100%", height: 150, objectFit: "cover", borderRadius: 10 }} />
                <div style={{ position: "absolute", bottom: 10, left: "50%", transform: "translateX(-50%)" }}>
                  {qty === 0 ? (
                    <button onClick={() => updateQuantity(i, 1)} style={addBtn}>ADD</button>
                  ) : (
                    <div style={counterBox}>
                      <button onClick={() => updateQuantity(i, -1)} style={counterBtn}>−</button>
                      <span style={{ fontWeight: "bold", fontSize: 16 }}>{qty}</span>
                      <button onClick={() => updateQuantity(i, 1)} style={counterBtn}>+</button>
                    </div>
                  )}
                </div>
              </div>
              <div className="my-3 ms-5">
                <button className="btn btn-success" onClick={() => handleAddToCart(i)}>Add to cart</button>
              </div>
              {item.customisable && <div style={{ textAlign: "right", fontSize: 13, color: "#777", marginTop: 5 }}>Customisable</div>}
            </div>
          );
        })}
      </div>
    </div>
  );
};

const cardStyle = { backgroundColor: "#fff", borderRadius: "20px", width: 260, padding: 20, boxShadow: "0 4px 12px rgba(0,0,0,0.1)" };
const detailsBtn = { padding: "5px 12px", border: "1px solid #ccc", borderRadius: "20px", fontSize: 14, cursor: "pointer", backgroundColor: "#fff" };
const addBtn = { padding: "6px 20px", border: "none", borderRadius: "12px", backgroundColor: "#eaffea", color: "#007f00", fontWeight: "bold", cursor: "pointer" };
const counterBox = { display: "flex", alignItems: "center", backgroundColor: "#eaffea", borderRadius: "12px", padding: "5px 12px" };
const counterBtn = { background: "none", border: "none", fontSize: 20, color: "#007f00", cursor: "pointer", padding: "0 10px" };

export default Singlecard;
