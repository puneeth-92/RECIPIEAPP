import { Link } from "react-router-dom";
import "./RecipeCard.css";
import ImageLoader from "../ImageLoader/ImageLoader";
export default function RecipeCard({ recipe }) {
  return (
    <Link to={`/recipes/${recipe._id}`} className="recipe-link">
      <div className="recipe-card">
      <ImageLoader
        src={recipe.image.url}
        alt={recipe.title}
      />

        <div className="recipe-content">
          <h3>{recipe.title}</h3>
          <p className="recipe-desc">{recipe.description}</p>

          <div className="recipe-meta">
            <span>{recipe.category}</span>
            <span>{recipe.prepTime} min</span>
          </div>
        </div>
      </div>
    </Link>
  );
}