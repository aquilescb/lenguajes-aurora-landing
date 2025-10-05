import { useEffect, useState } from "react";
import { getTiposHabitacion, type TipoHabitacion } from "../../../api/habitaciones";

export default function SelectorHab() {
  const [tipos, setTipos] = useState<TipoHabitacion[]>([]);
  const [selected, setSelected] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const data = await getTiposHabitacion();
      setTipos(data);
      setLoading(false);
    })();
  }, []);

  return (
    <div className="flex flex-col items-center">
      {loading ? (
        <div className="w-64 h-10 rounded-md bg-gray-200 animate-pulse" />
      ) : tipos.length === 0 ? (
        <p className="text-gray-500">No hay tipos de habitación disponibles.</p>
      ) : (
        <select
          value={selected}
          onChange={(e) => setSelected(e.target.value)}
          className="border border-gray-400 rounded-md px-4 py-2 w-100 text-center focus:outline-none focus:ring-2 focus:ring-blue-500 text-[#111827]"
        >
          <option value="">Seleccionar tipo de habitación</option>
          {tipos.map((t) => (
            <option key={t.id} value={t.id}>
              {t.nombre} — Capacidad: {t.capacidad} — ${t.precio_noche}
            </option>
          ))}
        </select>
      )}
    </div>
  );
}
