import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-[#111827] text-white flex max-h-90">
      <div className="w-1/2 pl-20 pt-8">
        <div className="flex items-center space-x-4 mb-10">
          <img src="/logo-blanco.png" alt="Logo" className="h-15"/>
          <h2 className="text-4xl font-bold">Somos Aurora</h2>
        </div>
        <div className="flex flex-col space-y-4 text-2xl">
          <a href="/">Hotel</a>
          <a href="#somos-aurora">Somos Aurora</a>
          <a href="#disponibilidad">Disponibilidad</a>
          <a href="/reservar">Reservar</a>
        </div>
      </div>
      <img src="/hero-1.jpg" alt="Imagen" className="w-1/2 object-cover"/>
    </footer>
  );
}
