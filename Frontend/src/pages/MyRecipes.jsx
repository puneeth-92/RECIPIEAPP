import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import RecipeCard from "../components/RecipeCard/RecipeCard";
import Loading from "../components/Loading/Loading";
import "./AllRecipes.css";

export default function MyRecipes() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5001/recipes/myrecipes", {
      credentials: "include"
    })
      .then(res => {
        if (res.status === 401) {
          navigate("/login");
          return;
        }
        return res.json();
      })
      .then(data => {
        if (data) {
          setRecipes(data);
          setLoading(false);
        }
      })
      .catch(() => setLoading(false));
  }, [navigate]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="all-recipes">
      <h2 className="page-title">My Recipes</h2>

      <div className="recipes-grid">
        {recipes.length === 0 ? (
          <p>No recipes found</p>
        ) : (
          recipes.map(recipe => (
            <RecipeCard key={recipe._id} recipe={recipe} />
          ))
        )}
      </div>
    </div>
  );
}