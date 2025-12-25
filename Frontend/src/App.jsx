import { Routes, Route } from "react-router-dom";

import Navbar from "./components/NavBar/Navbar";
import Hero from "./components/Hero/hero";
import Footer from "./components/Footer/Footer";
import AllRecipes from "./pages/AllRecipes";
import RecipeDetails from "./pages/RecipeDetails";
import EditRecipe from "./pages/EditRecipe";
import AddRecipe from "./pages/AddRecipe";
export default function App() {
  return (
    <>
      <Navbar />

      <main className="main">
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/recipes" element={<AllRecipes />} />
          <Route path="/recipes/:id" element={<RecipeDetails />} />
          <Route path="/recipes/:id/edit" element={<EditRecipe />} />
          <Route path="/add-recipe" element={<AddRecipe />} />
        </Routes>
      </main>

      <Footer />
    </>
  );
}