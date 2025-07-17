import { useState } from "react";

function Login() {
  const [username, setUsername] = useState("");  // 🔁 use username instead of email
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!username || !password) {
      setError("Please fill in both fields.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:8000/auth/token/login/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: username,     // ✅ send username here
          password: password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("authToken", data.auth_token);
        alert("Login successful!");
        window.location.href = "http://localhost:3000";
      } else {
        setError(data.non_field_errors ? data.non_field_errors[0] : "Invalid credentials");
      }
    } catch (error) {
      setError("Something went wrong. Try again.");
    }

    setLoading(false);
  };

  return (
    <div style={pageStyle}>
      <header style={headerStyle}>
        <h1>Login</h1>
      </header>

      <section style={formSectionStyle}>
        <form onSubmit={handleSubmit}>
          <div style={inputGroupStyle}>
            <label htmlFor="username" style={labelStyle}>Username:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={inputStyle}
              required
            />
          </div>

          <div style={inputGroupStyle}>
            <label htmlFor="password" style={labelStyle}>Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={inputStyle}
              required
            />
          </div>

          {error && <p style={errorStyle}>{error}</p>}

          <button type="submit" style={buttonStyle} disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </section>

      <footer style={footerStyle}>
        <p>Don't have an account? <a href="/signup" style={linkStyle}>Sign Up</a></p>
      </footer>
    </div>
  );
}

// Styles (unchanged)
const pageStyle = { textAlign: "center", padding: "20px", maxWidth: "400px", margin: "0 auto" };
const headerStyle = { marginBottom: "30px" };
const formSectionStyle = { marginBottom: "20px" };
const inputGroupStyle = { marginBottom: "15px", textAlign: "left" };
const labelStyle = { display: "block", fontWeight: "bold" };
const inputStyle = { width: "100%", padding: "10px", marginTop: "5px", borderRadius: "5px", border: "1px solid #ccc" };
const errorStyle = { color: "red", fontSize: "14px", marginTop: "10px" };
const buttonStyle = { backgroundColor: "#007bff", color: "#fff", padding: "12px", cursor: "pointer", width: "100%" };
const footerStyle = { marginTop: "20px" };
const linkStyle = { color: "#007bff", textDecoration: "none" };

export default Login;
