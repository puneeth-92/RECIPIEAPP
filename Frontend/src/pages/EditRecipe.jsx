import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Loading from "../components/Loading/Loading";
import "./EditRecipe.css";

export default function EditRecipe() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    prepTime: "",
    category: "",
    ingredients: "",
    instructions: "",
    imageUrl: ""
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:5001/recipes/${id}`)
      .then(res => res.json())
      .then(data => {
        setFormData({
            title: data.title || "",
            description: data.description || "",
            prepTime: data.prepTime || "",
            category: data.category || "",
            ingredients: data.ingredients.join(", "),
            instructions: data.instructions.join("\n"),
            imageUrl: data.image?.url || ""
        });
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  function handleChange(e) {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    const updatedRecipe = {
      ...formData,
      prepTime: Number(formData.prepTime),
      ingredients: formData.ingredients.split(",").map(i => i.trim()),
      instructions: formData.instructions.split("\n").map(i => i.trim()),
      image: {
        url: formData.imageUrl
      }
    };

    fetch(`http://localhost:5001/recipes/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(updatedRecipe)
    }).then(() => {
      navigate(`/recipes/${id}`);
    });
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="edit-recipe">
      <h2>Edit Recipe</h2>

      <form onSubmit={handleSubmit} className="edit-form">
        <input
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            placeholder="Image URL"
        />
        <input
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Title"
          required
        />

        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
        />

        <input
          name="prepTime"
          value={formData.prepTime}
          onChange={handleChange}
          placeholder="Prep Time (min)"
          type="number"
        />

        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
        >
          <option value="">Select category</option>
          <option value="Breakfast">Breakfast</option>
          <option value="Lunch">Lunch</option>
          <option value="Dinner">Dinner</option>
          <option value="Snack">Snack</option>
          <option value="Dessert">Dessert</option>
          <option value="Other">Other</option>
        </select>

        <textarea
          name="ingredients"
          value={formData.ingredients}
          onChange={handleChange}
          placeholder="Ingredients (comma separated)"
        />

        <textarea
          name="instructions"
          value={formData.instructions}
          onChange={handleChange}
          placeholder="Instructions (one per line)"
        />

        <button type="submit">Update Recipe</button>
      </form>
    </div>
  );
}