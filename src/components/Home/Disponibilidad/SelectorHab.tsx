// components/Home/Disponibilidad/SelectorHab.tsx
import { useEffect, useState } from "react";
import {
   getTiposHabitacion,
   type TipoHabitacion,
} from "../../../api/habitaciones";

type Props = {
   value?: number | null;
   onChange?: (id: number | null) => void;
};

export default function SelectorHab({ value, onChange }: Props) {
   const [tipos, setTipos] = useState<TipoHabitacion[]>([]);
   const [selected, setSelected] = useState<string>("");
   const [loading, setLoading] = useState(true);

   useEffect(() => {
      if (value === null || value === undefined) return;
      setSelected(value ? String(value) : "");
   }, [value]);

   useEffect(() => {
      const fetchTipos = async () => {
         const data = await getTiposHabitacion();
         setTipos(data);
         setLoading(false);
      };
      fetchTipos();
   }, []);

   const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      const val = e.target.value;
      setSelected(val);
      onChange?.(val ? parseInt(val) : null);
   };

   if (loading) {
      return (
         <div className="w-72 h-11 rounded-xl bg-slate-200 animate-pulse mx-auto" />
      );
   }

   if (tipos.length === 0) {
      return (
         <p className="text-slate-500">
            No hay tipos de habitación disponibles.
         </p>
      );
   }

   const selectId = "tipoHabitacion";

   return (
      <div className="flex justify-center">
         {/* Label para nombre accesible (no visible) */}
         <label htmlFor={selectId} className="sr-only">
            Seleccionar tipo de habitación
         </label>

         <select
            id={selectId}
            name="tipoHabitacion"
            value={selected}
            onChange={handleSelectChange}
            title="Seleccionar tipo de habitación" // opcional: ayuda a algunas herramientas
            className="border border-slate-300 rounded-xl px-4 py-2.5 w-[400px] text-center focus:outline-none focus:ring-2 focus:ring-sky-500 text-[#111827] bg-white shadow-sm"
            aria-describedby={`${selectId}-hint`} // opcional
         >
            <option value="">Seleccionar tipo de habitación</option>
            {tipos.map((t) => (
               <option key={t.id} value={t.id}>
                  {t.nombre} — Capacidad: {t.capacidad} — ${t.precio_noche}
               </option>
            ))}
         </select>

         {/* Texto auxiliar opcional para lectores de pantalla */}
         <span id={`${selectId}-hint`} className="sr-only">
            Abrí la lista y elegí un tipo de habitación.
         </span>
      </div>
   );
}
