"use client";

import { useEffect, useMemo, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./Calendario.css"; // 👈 importa tu CSS

type Reserva = { fecha_inicio: string; fecha_fin: string };
type Disponibilidad = {
   tipo_id: number;
   nombre_tipo: string;
   reservas: Reserva[];
};
type Props = { tipoId: number | null };

const toLocalISO = (d: Date) =>
   `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
      d.getDate()
   ).padStart(2, "0")}`;

export default function Calendario({ tipoId }: Props) {
   const [data, setData] = useState<Disponibilidad | null>(null);
   const [loading, setLoading] = useState(false);
   const [err, setErr] = useState<string | null>(null);

   useEffect(() => {
      if (!tipoId) return;
      (async () => {
         setLoading(true);
         setErr(null);
         try {
            const res = await fetch(`/api/reservas/disponibilidad/${tipoId}`);
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            const json = (await res.json()) as Disponibilidad;
            setData(json ?? null);
         } catch (e) {
            console.error(e);
            setErr("No se pudo cargar la disponibilidad.");
            setData(null);
         } finally {
            setLoading(false);
         }
      })();
   }, [tipoId]);

   /** 👇 SIEMPRE se llama: devuelve Set vacío si no hay data */
   const diasOcupados = useMemo(() => {
      const set = new Set<string>();
      if (!data) return set;
      for (const r of data.reservas) {
         const ini = new Date(r.fecha_inicio);
         const fin = new Date(r.fecha_fin);
         for (
            let d = new Date(ini);
            d <= fin;
            d = new Date(d.getFullYear(), d.getMonth(), d.getDate() + 1)
         ) {
            set.add(toLocalISO(d));
         }
      }
      return set;
   }, [data]);

   const todayISO = toLocalISO(new Date());

   // ====== UI ======
   if (!tipoId)
      return (
         <p className="mt-10 mb-8 text-center text-slate-500 text-lg">
            Seleccioná un tipo de habitación y aparecera un calendario
         </p>
      );

   if (loading)
      return (
         <div className="mt-8 mx-auto w-fit">
            <div className="h-6 mb-3 w-80 md:w-96 rounded bg-slate-200 animate-pulse" />
            <div className="h-[380px] w-[380px] md:h-[440px] md:w-[440px] lg:h-[520px] lg:w-[520px] rounded-2xl bg-slate-100 animate-pulse" />
         </div>
      );

   if (err) return <p className="mt-8 text-center text-red-600">{err}</p>;
   if (!data) return null;

   return (
      <div className="mt-6 w-full max-w-lg md:max-w-xl lg:max-w-2xl mx-auto">
         <div className="rounded-2xl border border-slate-200 bg-white shadow-[0_12px_36px_rgba(2,8,23,0.12)] overflow-hidden">
            <Calendar
               locale="es-ES"
               prev2Label={null}
               next2Label={null}
               className="aurora-cal"
               tileClassName={({ date }) => {
                  const iso = toLocalISO(date);
                  if (diasOcupados.has(iso)) return "tile is-ocupado";
                  if (iso === todayISO) return "tile is-hoy";
                  return "tile";
               }}
               tileDisabled={({ date }) => diasOcupados.has(toLocalISO(date))}
               showNeighboringMonth={false}
            />
         </div>

         <div className="flex justify-center gap-6 mt-4 text-sm text-slate-700">
            <div className="flex items-center gap-2">
               <span className="w-4 h-4 rounded-md bg-sky-200 border border-sky-300" />{" "}
               Ocupado
            </div>
            <div className="flex items-center gap-2">
               <span className="w-4 h-4 rounded-md bg-white border border-slate-300" />{" "}
               Disponible
            </div>
            <div className="flex items-center gap-2">
               <span className="w-4 h-4 rounded-md bg-white border-2 border-[#0F1B2B]" />{" "}
               Hoy
            </div>
         </div>
      </div>
   );
}
