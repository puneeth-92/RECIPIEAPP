import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/auth/me`, {
      credentials: "include"
    })
      .then(res => (res.ok ? res.json() : null))
      .then(data => {
        setUser(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  function handleLogout() {
    fetch(`${import.meta.env.VITE_API_URL}/auth/logout`, {
      method: "POST",
      credentials: "include"
    }).then(() => {
      setUser(null);
      setOpen(false);
      navigate("/login");
    });
  }

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

          {user && (
            <>
              <li>
                <Link to="/add-recipe" onClick={() => setOpen(false)}>Add Recipe</Link>
              </li>
              <li>
                <Link to="/myrecipes" onClick={() => setOpen(false)}>My Recipes</Link>
              </li>
            </>
          )}

          {!loading && (
            <li className="mobile-only">
              {user ? (
                <button onClick={handleLogout}>Logout</button>
              ) : (
                <button
                  onClick={() => {
                    setOpen(false);
                    navigate("/login");
                  }}>Login</button>
              )}
            </li>
          )}
        </ul>

        {!loading && (
          user ? (
            <button className="auth-btn" onClick={handleLogout}>Logout</button>
          ) : (
            <button className="auth-btn" onClick={() => navigate("/login")}>
              Login
            </button>
          )
        )}

        <div className="hamburger" onClick={() => setOpen(!open)}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </nav>
  );
}