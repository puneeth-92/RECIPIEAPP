import { useState } from "react";
import "./Navbar.css";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="logo">RECIPIE</div>

        <ul className={`nav-links ${open ? "open" : ""}`}>
          <li>Home</li>
          <li>All Recipes</li>
          <li>Add Recipe</li>
          <li>My Recipes</li>
        </ul>

        <button className="auth-btn">Login/Register</button>

        <div className="hamburger" onClick={() => setOpen(!open)}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </nav>
  );
}