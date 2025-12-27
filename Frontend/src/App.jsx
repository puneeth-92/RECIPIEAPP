import { Routes, Route } from "react-router-dom";

import Navbar from "./components/NavBar/Navbar";
import Hero from "./components/Hero/Hero";
import Footer from "./components/Footer/Footer";
import AllRecipes from "./pages/AllRecipes";
import RecipeDetails from "./pages/RecipeDetails";
import EditRecipe from "./pages/EditRecipe";
import AddRecipe from "./pages/AddRecipe";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import MyRecipes from "./pages/MyRecipes";
import NotFound from "./pages/Notfound";

export default function App() {
  return (
    <>
      <Navbar />

      <main className="main">
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/recipes" element={<AllRecipes />} />
          <Route path="/recipes/:id" element={<RecipeDetails />} />
          <Route path="/recipes/:id/edit" element={<EditRecipe />} />
          <Route path="/myrecipes" element={<MyRecipes />} />
          <Route path="/add-recipe" element={<AddRecipe />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <Footer />
    </>
  );
}