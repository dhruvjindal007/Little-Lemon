import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { MapPin } from "lucide-react";
import { useEffect, useState } from "react";

// Fix for missing marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

function About() {
  const position = [51.505, -0.09];
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    setTimeout(() => setFadeIn(true), 100);
  }, []);

  return (
    <div style={{ ...aboutPageStyle, opacity: fadeIn ? 1 : 0, transition: "opacity 0.8s ease" }}>
      <header style={headerStyle}>
        <h1>About Us</h1>
        <p style={taglineStyle}>
          Discover our story and what drives us. At Little Lemon, our mission is to bring people together through exceptional food and a welcoming atmosphere. Rooted in values of quality, integrity, and community, we strive to create unforgettable dining experiences for every guest. Visit us and become part of our journey—where passion for flavors meets a love for connection.
        </p>
      </header>

      <section style={sectionStyle}>
        <h2 style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <MapPin size={24} color="#ffcd00" /> Find Us
        </h2>
        <div style={mapContainerStyle}>
          <MapContainer
            center={position}
            zoom={13}
            scrollWheelZoom={false}
            style={{ height: "400px", width: "100%" }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            />
            <Marker position={position}>
              <Popup>
                <strong>Little Lemon Restaurant</strong><br />
                🍽 Open 10AM - 10PM<br />
                📞 +44 20 1234 5678<br />
                <a href="https://goo.gl/maps/example" target="_blank" rel="noreferrer">
                  Get Directions →
                </a>
              </Popup>
            </Marker>
          </MapContainer>
        </div>
      </section>
    </div>
  );
}

// Styles
const aboutPageStyle = {
  fontFamily: "Arial, sans-serif",
  lineHeight: "1.6",
  color: "#333",
  padding: "20px",
  maxWidth: "900px",
  margin: "0 auto",
};

const headerStyle = {
  textAlign: "center",
  marginBottom: "30px",
};

const taglineStyle = {
  fontStyle: "italic",
  color: "#555",
};

const sectionStyle = {
  marginBottom: "20px",
};

const mapContainerStyle = {
  margin: "20px 0",
  borderRadius: "12px",
  overflow: "hidden",
  boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
};

export default About;
