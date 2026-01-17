import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";

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
import Loading from "./components/Loading/Loading";
import NotFound from "./pages/Notfound";

export default function App() {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/auth/me`, {
      credentials: "include"
    })
      .then(res => (res.ok ? res.json() : null))
      .then(data => {
        setUser(data);
        setAuthLoading(false);
      })
      .catch(() => setAuthLoading(false));
  }, []);

  if (authLoading) {
    return <Loading />;
  }

  return (
    <>
      <Navbar user={user} setUser={setUser} />

      <main className="main">
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/signup" element={<Signup setUser={setUser} />} />
          <Route path="/recipes" element={<AllRecipes />} />
          <Route path="/recipes/:id" element={<RecipeDetails user={user} />} />
          <Route path="/recipes/:id/edit" element={<EditRecipe user={user} />} />
          <Route path="/myrecipes" element={user ? <MyRecipes /> : <Login />} />
          <Route path="/add-recipe" element={user ? <AddRecipe /> : <Login />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <Footer />
    </>
  );
}