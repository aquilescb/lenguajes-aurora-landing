import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Reservar from "./pages/Reservar";
import Consultas from "./pages/Consultas";

export default function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/reservar" element={<Reservar />} />
        <Route path="/consultas" element={<Consultas />} />
      </Routes>
      <Footer />
    </Router>
  );
}
