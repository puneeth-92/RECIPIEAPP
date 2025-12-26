import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Loading from "../components/Loading/Loading";
import "./EditRecipe.css";

export default function EditRecipe() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    videoUrl: "",
    prepTime: "",
    servings: "",
    category: "Other",
    ingredients: "",
    instructions: ""
  });

  useEffect(() => {
    fetch(`http://localhost:5001/recipes/${id}`)
      .then(res => res.json())
      .then(data => {
        setFormData({
          title: data.title || "",
          description: data.description || "",
          videoUrl:data.videoUrl||"",
          prepTime: data.prepTime || "",
          servings: data.servings || "",
          category: data.category || "Other",
          ingredients: data.ingredients.join(", "),
          instructions: data.instructions.join("\n")
        });
        setLoading(false);
      });
  }, [id]);

  function handleChange(e) {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);

    const data = new FormData();
    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("videoUrl", formData.videoUrl);
    data.append("prepTime", formData.prepTime);
    data.append("servings", formData.servings);
    data.append("category", formData.category);
    data.append("ingredients", JSON.stringify(formData.ingredients.split(",")));
    data.append("instructions", JSON.stringify(formData.instructions.split("\n")));
    if (image) data.append("image", image);

    fetch(`http://localhost:5001/recipes/${id}`, {
      method: "PUT",
      credentials: "include",
      body: data
    }).then(() => navigate(`/recipes/${id}`));
  }

  if (loading || submitting) {
    return <Loading />;
  }

  return (
    <div className="edit-recipe">
      <h2 className="edit-title">Edit Recipe</h2>

      <form className="edit-form" onSubmit={handleSubmit}>
        <input
          className="edit-input"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Recipe title"
          required
        />

        <textarea
          className="edit-textarea"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
        />

        <input
          className="edit-file"
          type="file"
          accept="image/*"
          onChange={e => setImage(e.target.files[0])}
        />

        <input
          className="edit-input"
          type="number"
          name="prepTime"
          value={formData.prepTime}
          onChange={handleChange}
          placeholder="Prep time (minutes)"
        />

        <input
          className="edit-input"
          type="number"
          name="servings"
          value={formData.servings}
          onChange={handleChange}
          placeholder="Servings"
        />

        <select
          className="edit-select"
          name="category"
          value={formData.category}
          onChange={handleChange}
        >
          <option value="Breakfast">Breakfast</option>
          <option value="Lunch">Lunch</option>
          <option value="Dinner">Dinner</option>
          <option value="Snack">Snack</option>
          <option value="Dessert">Dessert</option>
          <option value="Other">Other</option>
        </select>

        <textarea
          className="edit-textarea"
          name="ingredients"
          value={formData.ingredients}
          onChange={handleChange}
          placeholder="Ingredients (comma separated)"
        />

        <textarea
          className="edit-textarea"
          name="instructions"
          value={formData.instructions}
          onChange={handleChange}
          placeholder="Instructions (one per line)"
        />
        <input
          className="add-input"
          name="videoUrl"
          placeholder="YouTube video link (optional)"
          value={formData.videoUrl}
          onChange={handleChange}
        />

        <button className="edit-btn" type="submit">
          Update Recipe
        </button>
      </form>
    </div>
  );
}