import { useState } from "react";
import SelectorHab from "./SelectorHab";
import Calendario from "./Calendario";

export default function Disponibilidad() {
  const [tipoSeleccionado, setTipoSeleccionado] = useState<number | null>(null);

  return (
    <section className="bg-white flex flex-col items-center justify-start py-20 px-4">
      <div className="max-w-4xl w-full text-center text-white" id="disponibilidad">
        <h1 className="text-5xl text-[#111827] font-semibold mb-10">Disponibilidad</h1>
        <SelectorHab onChange={setTipoSeleccionado}/>
        <Calendario tipoId={tipoSeleccionado} />
        <a href="/reservar" className="mt-4 bg-[#111827] text-xl text-white py-3 px-8 rounded-md cursor-pointer inline-block">Reservar</a>
      </div>
    </section>
  );
}
