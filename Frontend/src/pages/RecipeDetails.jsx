import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Loading from "../components/Loading/Loading";
import ImageLoader from "../components/ImageLoader/ImageLoader";
import "./RecipeDetails.css";

export default function RecipeDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [recipe, setRecipe] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const [showVideo, setShowVideo] = useState(false);
  const [videoLoading, setVideoLoading] = useState(false);

  function getEmbedUrl(url) {
    if (!url) return null;

    const regex =
      /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([^?&]+)/;

    const match = url.match(regex);
    return match
      ? `https://www.youtube.com/embed/${match[1]}?mute=1`
      : null;
  }

  useEffect(() => {
    fetch(`http://localhost:5001/recipes/${id}`)
      .then(res => res.json())
      .then(data => {
        setRecipe(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  useEffect(() => {
    fetch("http://localhost:5001/auth/me", {
      credentials: "include"
    })
      .then(res => (res.ok ? res.json() : null))
      .then(data => setCurrentUser(data));
  }, []);

  function handleDelete() {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this recipe?"
    );
    if (!confirmDelete) return;

    fetch(`http://localhost:5001/recipes/${id}`, {
      method: "DELETE",
      credentials: "include"
    })
      .then(res => {
        if (!res.ok) throw new Error();
        navigate("/recipes");
      })
      .catch(() => alert("Failed to delete recipe"));
  }

  if (loading) return <Loading />;
  if (!recipe) return <h2>Recipe not found</h2>;

  return (
    <div className="recipe-details">
      <ImageLoader
        src={recipe.image.url}
        alt={recipe.title}
        variant="details"
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

      {recipe.videoUrl ? (
        <button
          className="video-btn"
          onClick={() => {
            setShowVideo(prev => !prev);
            setVideoLoading(true);
          }}
        >
          {showVideo ? "Hide Video" : "Watch Video"}
        </button>
      ) : (
        <p className="no-video">No video available</p>
      )}

      {showVideo && getEmbedUrl(recipe.videoUrl) && (
        <div className="video-container">
          {videoLoading && <Loading />}

          <iframe
            src={getEmbedUrl(recipe.videoUrl)}
            title="Recipe Video"
            onLoad={() => setVideoLoading(false)}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{ display: videoLoading ? "none" : "block" }}
          />
        </div>
      )}

      {currentUser && recipe.owner === currentUser._id && (
        <div className="details-actions">
          <button
            className="edit-btn"
            onClick={() => navigate(`/recipes/${id}/edit`)}
          >
            Edit Recipe
          </button>

          <button
            className="delete-btn"
            onClick={handleDelete}
          >
            Delete Recipe
          </button>
        </div>
      )}
    </div>
  );
}