import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

export default function Navbar({ user, setUser }) {
  const navigate = useNavigate();

  function handleLogout() {
    fetch(`${import.meta.env.VITE_API_URL}/auth/logout`, {
      method: "POST",
      credentials: "include"
    }).then(() => {
      setUser(null);
      window.location.href = "/login";
    });
  }

  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="logo">
          <Link to="/">RECIPIE</Link>
        </div>

        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/recipes">All Recipes</Link></li>

          {user && (
            <>
              <li><Link to="/add-recipe">Add Recipe</Link></li>
              <li><Link to="/myrecipes">My Recipes</Link></li>
            </>
          )}
        </ul>

        {user ? (
          <button className="auth-btn" onClick={handleLogout}>Logout</button>
        ) : (
          <button className="auth-btn" onClick={() => navigate("/login")}>
            Login
          </button>
        )}
      </div>
    </nav>
  );
}