const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const recipeSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },

    description: String,

    ingredients: [String],

    instructions: [String],

    prepTime: Number,

    servings: {
      type: Number,
      default: 1,
    },

    category: {
      type: String,
      enum: ["Breakfast", "Lunch", "Dinner", "Snack", "Dessert", "Other"],
      default: "Other",
    },

    image: {
      url: {
        type: String,
        default:
          "https://images.unsplash.com/photo-1670058124043-4f55e08d0f8f?auto=format&fit=crop&q=60&w=900",
        set: (v) =>
          v === ""
            ? "https://images.unsplash.com/photo-1670058124043-4f55e08d0f8f?auto=format&fit=crop&q=60&w=900"
            : v,
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Recipe", recipeSchema);