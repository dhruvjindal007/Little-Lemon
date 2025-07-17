import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Chatbot from "./Chatbot";


function HomePage() {
  const [menuItems, setMenuItems] = useState([]);
  const [fetchError, setFetchError] = useState(false);
  const navigate = useNavigate();

  // Fetch menu items from Django API
  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/menu-items/", {
      method: "GET",
      headers: {
        Authorization: "Bearer 5aa70cca2767a99091e083f2aca73e6dc5512ba5",
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) throw new Error("Network response was not ok");
        return response.json();
      })
      .then((data) => {
        setMenuItems(data);
        setFetchError(false);
      })
      .catch((error) => {
        console.error("Fetch Error:", error);
        setFetchError(true);
      });
  }, []);

  const testimonials = [
    { text: "Absolutely loved the food and service! 10/10 experience.", author: "John D." },
    { text: "Best family restaurant with amazing ambiance and flavors!", author: "Sarah L." },
    { text: "Highly recommended for food lovers looking for something special.", author: "Alex R." },
    { text: "A delightful experience with fantastic dishes!", author: "Emma W." }
  ];

  const specials = [
    {
      title: "Chef's Signature Delight",
      description: "Prepared with the freshest ingredients daily by our head chef — a true taste of authenticity.",
      img: "https://sportinglegends.com.au/wp-content/uploads/2025/05/file.jpeg-1746602992.jpeg",
      quote: "Each bite was like a flavor explosion. Easily the best dish I've had all year!",
      author: "Priya"
    },
    {
      title: "Exotic Dessert Medley",
      description: "A perfect fusion of fruits, cream, and magic — ideal for finishing a memorable meal.",
      img: "https://img.freepik.com/premium-photo/skillfully-crafted-tropical-fruit-medley-flaky-puff-pastry-concept-tropical-fruit-medley-flaky-puff-pastry-artisan-dessert-exotic-flavor-colorful-presentation_864588-245889.jpg",
      quote: "Sweet, rich, and refreshing. The dessert was pure bliss!",
      author: "Aryan"
    },
    {
      title: "Family Feast Platter",
      description: "Perfectly portioned for sharing — enjoy a variety of dishes in one delicious spread.",
      img: "https://i.pinimg.com/736x/8f/96/26/8f962645e58502ea49191ee7277f2519.jpg",
      quote: "The perfect dinner with family — warm service and unforgettable taste!",
      author: "Meera"
    }
  ];

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-text">
          <h1>Welcome to Little Lemon</h1>
          <p>
            Your favorite family-friendly exotic restaurant, renowned for serving the finest, most delectable dishes in town!
            Whether you're craving a mouthwatering appetizer, a savory main course, or a delightful dessert, our menu is curated
            to take your taste buds on a culinary journey across the globe.
          </p>
          <button className="cta-button" onClick={() => navigate("/booking")}>
            Reserve a Table
          </button>
        </div>
        <div className="hero-image">
          <img
            src="https://i.pinimg.com/736x/50/9e/94/509e94878532da6edb5cb5485a903cea.jpg"
            alt="Delicious food served at Little Lemon"
          />
        </div>
      </section>

      {/* Specials Swiper */}
      <section className="special-dish-swiper">
        <h2>Our Special Dishes</h2>
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 3500 }}
          loop={true}
        >
          {specials.map((dish, idx) => (
            <SwiperSlide key={idx}>
              <div className="special-card">
                <img src={dish.img} alt={dish.title} />
                <h3>{dish.title}</h3>
                <p>{dish.description}</p>
                <blockquote>"{dish.quote}" — {dish.author}</blockquote>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <h2>Why Choose Us?</h2>
        <div className="features">
          <div className="feature">
            <h3>Fresh Ingredients</h3>
            <p>We take pride in using the freshest and highest quality ingredients to create every dish.</p>
            <img src="https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGNoZWZ8ZW58MHx8MHx8fDA%3D" alt="Fresh ingredients" />
          </div>
          <div className="feature">
            <h3>Family-Friendly</h3>
            <p>Our restaurant is the perfect place to gather with family and friends, offering a warm and inviting atmosphere.</p>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFZvlc9cgoIkyEsQe05p_GN6LsAVyoUgIRrQ&s" alt="Family gathering" />
          </div>
          <div className="feature">
            <h3>Exotic Dishes</h3>
            <p>Indulge in a delightful fusion of flavors crafted to tantalize your taste buds.</p>
            <img src="https://cdn.create.vista.com/api/media/small/606307644/stock-photo-french-blueberry-raspberry-tart-white-ceramic-plate-top-view-food" alt="Exotic dessert" />
          </div>
        </div>
      </section>

      {/* Menu Section */}
      <section className="menu-items-section">
        <h2>Explore Our Menu</h2>
        {fetchError ? (
          <p className="error-text">Unable to load menu items. Please try again later.</p>
        ) : (
          <div className="menu-grid">
            {menuItems.map((item) => (
              <div key={item.id} className="menu-card">
                <h3>{item.name}</h3>
                <p>{item.description}</p>
                <p className="price">₹{item.price}</p>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Testimonials */}
      <section className="testimonials-section">
        <h2>What Our Customers Say</h2>
        <div className="testimonial-container">
          <Swiper
            slidesPerView={1}
            spaceBetween={30}
            centeredSlides={true}
            modules={[Navigation, Pagination, Autoplay]}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 3000 }}
            loop={true}
            className="testimonials-slider"
          >
            {testimonials.map((testimonial, index) => (
              <SwiperSlide key={index} className="testimonial-slide">
                <p className="testimonial-text">"{testimonial.text}"</p>
                <p className="testimonial-author">- {testimonial.author}</p>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>
      {/* Chatbot Section */}
      <section className="chatbot-section">
        <h2>Need Help? Chat with Us!</h2>
        <Chatbot />
      </section>
    </div>
  );
}

export default HomePage;
