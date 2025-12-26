const express = require("express");
const router = express.Router();
const multer = require("multer");
const Recipe = require("../models/Recipe");
const cloudinary = require("../config/cloudinary");
const upload = multer({ storage: multer.memoryStorage() });
const requireAuth = require("../middleware/requireAuth");


router.post("/",requireAuth, upload.single("image"), async (req, res) => {
  try {
    let imageUrl;

    if (req.file) {
      const result = await cloudinary.uploader.upload(
        `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`,
        { folder: "recipes" }
      );
      imageUrl = result.secure_url;
    }

    const recipe = new Recipe({
      title: req.body.title,
      description: req.body.description,
      videoUrl: req.body.videoUrl,
      prepTime: req.body.prepTime,
      category: req.body.category,
      ingredients: JSON.parse(req.body.ingredients),
      instructions: JSON.parse(req.body.instructions),
      image: { url: imageUrl }
    });

    await recipe.save();
    res.status(201).json(recipe);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.put("/:id", requireAuth,upload.single("image"), async (req, res) => {
  let updatedData = {
    title: req.body.title,
    description: req.body.description,
    videoUrl: req.body.videoUrl,
    prepTime: req.body.prepTime,
    category: req.body.category,
    ingredients: JSON.parse(req.body.ingredients),
    instructions: JSON.parse(req.body.instructions)
  };

  if (req.file) {
    const result = await cloudinary.uploader.upload(
      `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`,
      { folder: "recipes" }
    );
    updatedData.image = { url: result.secure_url };
  }

  const recipe = await Recipe.findByIdAndUpdate(
    req.params.id,
    updatedData,
    { new: true }
  );

  res.json(recipe);
});


router.get("/", async (req, res) => {
  try {
    const recipes = await Recipe.find().sort({ createdAt: -1 });
    res.json(recipes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }
    res.json(recipe);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete("/:id",requireAuth, async (req, res) => {
  try {
    const recipe = await Recipe.findByIdAndDelete(req.params.id);
    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }
    res.json({ message: "Recipe deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
module.exports = router;