import { FaFacebook, FaTwitter } from "react-icons/fa";

function Footer() {
  return (
    <footer className="footer" style={footerStyle}>
      <hr style={dividerStyle} />
      <div style={columnsContainerStyle}>
        {/* Leftmost column */}
        <div style={columnStyle}>
          <h4 style={headingStyle}>Doormat Information</h4>
          <p>About Us</p>
          <p>Privacy Policy</p>
          <p>Terms of Service</p>
          <p style={{ ...copyrightStyle, marginTop: '30px' }}>
            &copy; {new Date().getFullYear()} Little Lemon. All rights reserved.
          </p>
        </div>

        {/* Middle column */}
        <div style={columnStyle}>
          <h4 style={headingStyle}>Contacts</h4>
          <p>Email: abc@gmail.com</p>
          <p>Phone: +91 123 456 7890</p>
          <p>Address: Main Street, Bangalore</p>
        </div>

        {/* Rightmost column */}
        <div style={columnStyle}>
          <h4 style={headingStyle}>Social Media Links</h4>
          <ul style={listStyle}>
            <li>
              <a href="https://facebook.com" style={linkStyle}>
                Facebook <FaFacebook />
              </a>
            </li>
            <li>
              <a href="https://twitter.com" style={linkStyle}>
                Twitter <FaTwitter />
              </a>
            </li>
            <li>
              <a href="https://instagram.com" style={linkStyle}>
                Instagram
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png"
                  alt="Instagram"
                  style={{
                    width: "20px",
                    height: "20px",
                    marginLeft: "8px",
                    verticalAlign: "middle",
                  }}
                />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

// Inline styles
const footerStyle = {
  backgroundColor: "#f8f9fa",
  padding: "20px",
  marginTop: "30px",
  fontFamily: "Arial, sans-serif",
};

const dividerStyle = {
  margin: "10px auto",
  width: "80%",
  borderColor: "#ccc",
};

const columnsContainerStyle = {
  display: "flex",
  justifyContent: "space-between",
  maxWidth: "1000px",
  margin: "0 auto",
  flexWrap: "wrap",
};

const columnStyle = {
  flex: "1",
  padding: "10px",
  minWidth: "220px",
};

const headingStyle = {
  fontSize: "18px",
  fontWeight: "bold",
  marginBottom: "10px",
};

const listStyle = {
  listStyleType: "none",
  padding: 0,
  margin: "20px 0 0 0",
};

const linkStyle = {
  textDecoration: "none",
  color: "#007bff",
  display: "inline-flex",
  alignItems: "center",
  gap: "6px",
  marginBottom: "10px",
};

const copyrightStyle = {
  fontSize: "14px",
  color: "#666",
};

export default Footer;
