import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AddRecipe.css";
import Loading from "../components/Loading/Loading";

export default function AddRecipe() {
    const navigate = useNavigate();
    const [image, setImage] = useState(null);
    const [submitting, setSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        videoUrl: "",
        prepTime: "",
        category: "Other",
        servings: "",
        ingredients: "",
        instructions: ""
    });

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
        data.append("category", formData.category);
        data.append("servings", formData.servings);
        data.append("ingredients", JSON.stringify(formData.ingredients.split(",")));
        data.append("instructions", JSON.stringify(formData.instructions.split("\n")));
        if (image) data.append("image", image);

        fetch("http://localhost:5001/recipes", {
        method: "POST",
        credentials: "include",
        body: data
        }).then(() => navigate("/recipes"));
    }
    if (submitting) {
        return <Loading />;
    }
    return (
        <div className="add-recipe">
        <h2 className="add-title">Add Recipe</h2>

        <form className="add-form" onSubmit={handleSubmit}>
            <input
                className="add-input"
                name="title"
                placeholder="Recipe title"
                value={formData.title}
                onChange={handleChange}
                required
            />

            <textarea
                className="add-textarea"
                name="description"
                placeholder="Short description"
                value={formData.description}
                onChange={handleChange}
            />

            <input
                className="add-file"
                type="file"
                accept="image/*"
                onChange={e => setImage(e.target.files[0])}
            />

            <input
                className="add-input"
                type="number"
                name="prepTime"
                placeholder="Prep time (minutes)"
                value={formData.prepTime}
                onChange={handleChange}
            />

            <select
            className="add-select"
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
                className="add-textarea"
                name="ingredients"
                placeholder="Ingredients (comma separated)"
                value={formData.ingredients}
                onChange={handleChange}
            />
            <input
                className="add-input"
                type="number"
                name="servings"
                placeholder="Servings"
                value={formData.servings}
                onChange={handleChange}
            />
            <textarea
                className="add-textarea"
                name="instructions"
                placeholder="Instructions (one step per line)"
                value={formData.instructions}
                onChange={handleChange}
            />
            <input
                className="add-input"
                name="videoUrl"
                placeholder="YouTube video link (optional)"
                value={formData.videoUrl}
                onChange={handleChange}
            />

            <button className="add-btn" type="submit">Add Recipe</button>
        </form>
        </div>
    );
    }