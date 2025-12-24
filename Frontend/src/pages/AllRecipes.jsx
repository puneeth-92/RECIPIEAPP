import { useEffect, useState } from "react";
import RecipeCard from "../components/RecipeCard/RecipeCard";
import Loading from "../components/Loading/Loading";
import "./AllRecipes.css";

export default function AllRecipes() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5001/recipes")
      .then(res => res.json())
      .then(data => {
        setRecipes(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return <Loading />; 
  }

  return (
    <div className="all-recipes">
      <h2 className="page-title">All Recipes</h2>

      <div className="recipes-grid">
        {recipes.map(recipe => (
          <RecipeCard key={recipe._id} recipe={recipe} />
        ))}
      </div>
    </div>
  );
}