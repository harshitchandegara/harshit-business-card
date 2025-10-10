// src/App.jsx
import React from 'react';
import './App.css'; // You can style via this file or inline styles

function App() {
  const logoBase64 = "data:image/png;base64, ..."; // I'll give you a real base64 snippet below

  return (
    <div className="card-container">
      <img
        src={logoBase64}
        alt="Larsen & Toubro Logo"
        className="logo"
      />
      <h1 className="name">Harshit Chandegara</h1>
      <h2 className="role">Manager – Proposal</h2>
      <p className="company">Larsen & Toubro (Water & Effluent Treatment Business)</p>
      <p className="placeholder">Digital Business Card – Under Development</p>
    </div>
  );
}

export default App;
