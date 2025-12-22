import { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="logo">
          <Link to="/">RECIPIE</Link>
        </div>

        <ul className={`nav-links ${open ? "open" : ""}`}>
          <li>
            <Link to="/" onClick={() => setOpen(false)}>Home</Link>
          </li>
          <li>
            <Link to="/recipes" onClick={() => setOpen(false)}>All Recipes</Link>
          </li>
          <li>
            <Link to="/add-recipe" onClick={() => setOpen(false)}>Add Recipe</Link>
          </li>
          <li>
            <Link to="/my-recipes" onClick={() => setOpen(false)}>My Recipes</Link>
          </li>
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