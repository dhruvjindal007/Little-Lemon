import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix for missing marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

function About() {
  const position = [51.505, -0.09]; // Coordinates for London

  return (
    <div style={aboutPageStyle}>
      <header style={headerStyle}>
        <h1>About Us</h1>
        <p style={taglineStyle}>
        Discover our story and what drives us. At Little Lemon, our mission is to bring people together through exceptional food and a welcoming atmosphere. Rooted in values of quality, integrity, and community, we strive to create unforgettable dining experiences for every guest. Visit us and become part of our journey—where passion for flavors meets a love for connection.
        </p>
      </header>

      <section style={sectionStyle}>
        <h2>Find Us</h2>
        <div style={mapContainerStyle}>
          <MapContainer
            center={position}
            zoom={13}
            scrollWheelZoom={false}
            style={{ height: "400px", width: "100%" }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={position}>
              <Popup>We are here! Visit us anytime.</Popup>
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
  maxWidth: "800px",
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
  borderRadius: "8px",
  overflow: "hidden",
  boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
};

const linkStyle = {
  color: "#007bff",
  textDecoration: "none",
};

export default About;
