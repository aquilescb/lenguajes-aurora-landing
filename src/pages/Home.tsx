// pages/Home.tsx
import { useState } from "react";
import Hero from "../components/Home/Hero/Hero";
import SomosAurora from "../components/Home/SomosAurora/SomosAurora";
import Disponibilidad from "../components/Home/Disponibilidad/Disponibilidad";
import RoomTypesGrid from "../components/Home/Habitaciones/RoomTypesGrid";

export default function Home() {
   const [tipoSeleccionado, setTipoSeleccionado] = useState<number | null>(
      null
   );

   return (
      <div className="text-center pt-20">
         <Hero
            respectReducedMotion={false}
            intervalMs={3600}
            panSec={4}
            fadeSec={0.8}
         />
         <SomosAurora />
         <RoomTypesGrid onPick={setTipoSeleccionado} />
         <Disponibilidad
            tipoSeleccionado={tipoSeleccionado}
            onTipoChange={setTipoSeleccionado}
         />
      </div>
   );
}
