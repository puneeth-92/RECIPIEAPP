const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const recipeRoutes = require("./routes/recipe");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

app.use("/recipes", recipeRoutes);

app.get("/", (req, res) => {
  res.send("Recipie backend running");
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});