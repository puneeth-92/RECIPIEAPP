import Navbar from "./components/NavBar/Navbar";
import Hero from "./components/Hero/hero";
import Footer from "./components/Footer/Footer";

export default function App() {
  return (
    <>
      <Navbar />
      <main className="main">
        <Hero />
      </main>
      <Footer />
    </>
  );
}