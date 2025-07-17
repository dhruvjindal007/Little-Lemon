import React, { useState } from 'react';

function Signup() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Account created successfully!');
  };

  const handleGoogleSignup = () => {
    alert('Signed up with Google (simulated)');
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '400px', margin: 'auto' }}>
      <h2>Create Account</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
          style={inputStyle}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          style={inputStyle}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          style={inputStyle}
        />
        <button type="submit" style={buttonStyle}>Sign Up</button>
      </form>

      <div style={dividerStyle}>OR</div>

      <button onClick={handleGoogleSignup} style={googleButtonStyle}>
        Sign Up with Google
        <img src="https://img.icons8.com/color/512/google-logo.png" alt="Google Logo" style={{
          width: "20px",
          height: "20px",
          marginLeft: "8px",
          verticalAlign: "middle",
          backgroundColor:'white'
        }}></img>
      </button>
    </div>
  );
}

const inputStyle = {
  display: 'block',
  width: '100%',
  padding: '10px',
  marginBottom: '15px',
  fontSize: '16px',
};

const buttonStyle = {
  padding: '10px 20px',
  fontSize: '16px',
  backgroundColor: '#007bff',
  color: '#fff',
  border: 'none',
  cursor: 'pointer',
  width: '100%',
};

const dividerStyle = {
  textAlign: 'center',
  margin: '20px 0',
  fontWeight: 'bold',
  color: '#666',
};

const googleButtonStyle = {
  padding: '10px 20px',
  fontSize: '16px',
  backgroundColor: '#4285F4',
  color: '#fff',
  border: 'none',
  cursor: 'pointer',
  width: '100%',
};

export default Signup;
