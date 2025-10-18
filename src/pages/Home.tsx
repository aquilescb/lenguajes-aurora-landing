import Hero from "../components/Home/Hero/Hero";
import SomosAurora from "../components/Home/SomosAurora/SomosAurora";
import Disponibilidad from "../components/Home/Disponibilidad/Disponibilidad";

export default function Home() {
  return (
    <div className="text-center pt-20">
      <Hero />
      <SomosAurora />
      <Disponibilidad />
    </div>
  );
}
