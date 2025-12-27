import { useNavigate } from "react-router-dom";

export default function HeroText() {
  const navigate = useNavigate();

  function handleGetStarted() {
    fetch("http://localhost:5001/auth/me", {
      credentials: "include"
    })
      .then(res => {
        if (res.ok) {
          navigate("/recipes");
        } else {
          navigate("/login");
        }
      })
      .catch(() => navigate("/login"));
  }

  return (
    <div className="hero-text">
      <h1>Turn Everyday Cooking into a Celebration</h1>
      <p>
        Dive into a colorful collection of easy-to-follow recipes that mix
        creativity with flavor. From beginner-friendly snacks to gourmet
        desserts, discover dishes that spark joy and passion for home cooking.
      </p>
      <button className="cta-btn" onClick={handleGetStarted}>
        Get Started
      </button>
    </div>
  );
}