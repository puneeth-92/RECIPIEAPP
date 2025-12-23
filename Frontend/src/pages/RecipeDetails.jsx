import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Loading from "../components/Loading/Loading";
import "./RecipeDetails.css";

export default function RecipeDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:5001/recipes/${id}`)
      .then(res => res.json())
      .then(data => {
        setRecipe(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading) {
    return <Loading />;
  }

  if (!recipe) {
    return <h2>Recipe not found</h2>;
  }

  return (
    <div className="recipe-details">
      <img
        src={recipe.image?.url}
        alt={recipe.title}
        className="details-image"
      />

      <h1>{recipe.title}</h1>
      <p className="details-desc">{recipe.description}</p>

      <div className="details-meta">
        <span>{recipe.category}</span>
        <span>{recipe.prepTime} min</span>
        <span>{recipe.servings} servings</span>
      </div>

      <h3>Ingredients</h3>
      <ul>
        {recipe.ingredients.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>

      <h3>Instructions</h3>
      <ol>
        {recipe.instructions.map((step, index) => (
          <li key={index}>{step}</li>
        ))}
      </ol>

      <div className="details-actions">
        <button
          className="edit-btn"
          onClick={() => navigate(`/recipes/${id}/edit`)}
        >
          Edit Recipe
        </button>
      </div>
    </div>
  );
}