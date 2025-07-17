import React from "react";
import "./styles.css";
import { menuItems } from "./menuData"; // ✅ Import the shared data

function MenuPage() {
  return (
    <div className="menu-page">
      <h1 className="menu-title">Our Menu</h1>
      {menuItems.map((category, index) => (
        <div key={index} className="menu-category">
          <h2 className="category-title">{category.category}</h2>
          <div className="menu-items">
            {category.items.map((item, idx) => (
              <div key={idx} className="menu-item">
                <h3 className="item-name">{item.name}</h3>
                <p className="item-description">{item.description}</p>
                <p className="item-price">{item.price}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default MenuPage;
