import React, { useState } from "react";
import "./styles.css";

function OrderOnlinePage() {
  const menuItems = [
    { id: 1, name: "Bruschetta", price: 299 },
    { id: 2, name: "French Fries", price: 299 },
    { id: 3, name: "Crispy Veg Spring Rolls", price: 199 },
    { id: 4, name: "Margherita Pizza", price: 759 },
    { id: 5, name: "Penne Arrabbiata", price: 499 },
    { id: 6, name: "Vegetable Stir-Fry", price: 259 },
    { id: 7, name: "Paneer Tikka Masala", price: 459 },
    { id: 8, name: "Tiramisu", price: 299 },
    { id: 9, name: "Molten Chocolate Lava Cake", price: 159 },
    { id: 10, name: "Chocolate Chip Cookies", price: 99 },
    { id: 11, name: "Lemonade", price: 129 },
  ];

  const DELIVERY_FEE = 50;
  const GST_PERCENT = 0.18;
  const [cart, setCart] = useState([]);
  const [tipAmount, setTipAmount] = useState(0);

  const addToCart = (item) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.id === item.id);
      if (existingItem) {
        return prevCart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      return [...prevCart, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (itemId) => {
    setCart((prevCart) =>
      prevCart
        .map((cartItem) =>
          cartItem.id === itemId
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
        )
        .filter((cartItem) => cartItem.quantity > 0)
    );
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const total = calculateTotal();
  const gstAmount = total * GST_PERCENT;
  const finalTotal = total + DELIVERY_FEE + gstAmount + tipAmount;

  return (
    <div className="order-online-page">
      <h1 className="order-title">Order Online</h1>

      <div className="order-section">
        <h2>Menu</h2>
        <div className="order-items">
          {menuItems.map((item) => (
            <div key={item.id} className="menu-item">
              <h3 className="item-name">{item.name}</h3>
              <p className="item-price">₹{item.price.toFixed(2)}</p>
              <button className="add-to-cart-btn" onClick={() => addToCart(item)}>
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="cart-section">
        <h2>Cart</h2>
        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <div className="cart-items">
            {cart.map((item) => (
              <div key={item.id} className="cart-item">
                <h3 className="item-name">{item.name}</h3>
                <p className="item-quantity">Quantity: {item.quantity}</p>
                <p className="item-price">
                  Subtotal: ₹{(item.price * item.quantity).toFixed(2)}
                </p>
                <button
                  className="remove-from-cart-btn"
                  onClick={() => removeFromCart(item.id)}
                >
                  Remove One
                </button>
              </div>
            ))}

            <div style={{ marginTop: "10px" }}>
              <label>
                <strong>Enter Tip (₹):</strong>{" "}
                <input
                  type="number"
                  min="0"
                  value={tipAmount}
                  onChange={(e) => setTipAmount(Number(e.target.value))}
                  style={{ width: "80px" }}
                />
              </label>
            </div>

            <p className="cart-total">
              <strong>Subtotal:</strong> ₹{total.toFixed(2)}<br />
              <strong>Delivery Fee:</strong> ₹{DELIVERY_FEE}<br />
              <strong>Delivery Tip:</strong> ₹{tipAmount.toFixed(2)}<br />
              <strong>GST (18%):</strong> ₹{gstAmount.toFixed(2)}<br />
            </p>

            <p className="total-price">
              <strong>Total Payable:</strong> ₹{finalTotal.toFixed(2)}
            </p>

            <button
              className="place-order-btn"
              onClick={() => {
                const confirmed = window.confirm("Are you sure you want to place the order?");
                if (confirmed) {
                  alert("Order placed successfully!");
                  // Optionally clear the cart or redirect user here
                } else {
                  alert("Order not placed.");
                }
              }}
            >
              Place Order
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default OrderOnlinePage;
