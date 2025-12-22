import { Routes, Route } from "react-router-dom";

import Navbar from "./components/NavBar/Navbar";
import Hero from "./components/Hero/hero";
import Footer from "./components/Footer/Footer";
import AllRecipes from "./pages/AllRecipes";

export default function App() {
  return (
    <>
      <Navbar />

      <main className="main">
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/recipes" element={<AllRecipes />} />
        </Routes>
      </main>

      <Footer />
    </>
  );
}