import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./Navbar.css";

export default function Navbar({ user, setUser }) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  function handleLogout() {
    fetch(`${import.meta.env.VITE_API_URL}/auth/logout`, {
      method: "POST",
      credentials: "include"
    }).then(() => {
      setUser(null);
      setOpen(false);
      window.location.href = "/login";
    });
  }

  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="logo">
          <Link to="/" onClick={() => setOpen(false)}>RECIPIE</Link>
        </div>

        <ul className={`nav-links ${open ? "open" : ""}`}>
          <li>
            <Link to="/" onClick={() => setOpen(false)}>Home</Link>
          </li>

          <li>
            <Link to="/recipes" onClick={() => setOpen(false)}>
              All Recipes
            </Link>
          </li>

          {user && (
            <>
              <li>
                <Link to="/add-recipe" onClick={() => setOpen(false)}>
                  Add Recipe
                </Link>
              </li>

              <li>
                <Link to="/myrecipes" onClick={() => setOpen(false)}>
                  My Recipes
                </Link>
              </li>
            </>
          )}

          <li className="mobile-only">
            {user ? (
              <button onClick={handleLogout}>Logout</button>
            ) : (
              <button
                onClick={() => {
                  setOpen(false);
                  navigate("/login");
                }}
              >
                Login
              </button>
            )}
          </li>
        </ul>

        {user ? (
          <button className="auth-btn" onClick={handleLogout}>
            Logout
          </button>
        ) : (
          <button className="auth-btn" onClick={() => navigate("/login")}>
            Login
          </button>
        )}

        <div className="hamburger" onClick={() => setOpen(!open)}>
          <span />
          <span />
          <span />
        </div>
      </div>
    </nav>
  );
}