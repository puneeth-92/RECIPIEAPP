const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const cookieParser = require("cookie-parser");

const recipeRoutes = require("./routes/recipe");
const authRoutes = require("./routes/auth");

app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://recipie-app-lake.vercel.app"
  ],
  credentials: true
}));
app.use(cookieParser());
app.use(express.json());

mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

app.use("/recipes", recipeRoutes);
app.use("/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("Recipie backend running");
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});