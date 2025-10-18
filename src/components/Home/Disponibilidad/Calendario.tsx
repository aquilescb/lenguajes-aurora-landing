import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

type Reserva = {
  fecha_inicio: string;
  fecha_fin: string;
};

type Disponibilidad = {
  tipo_id: number;
  nombre_tipo: string;
  reservas: Reserva[];
};

type Props = {
  tipoId: number | null;
};

export default function Calendario({ tipoId }: Props) {
  const [data, setData] = useState<Disponibilidad | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!tipoId) return;
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/reservas/disponibilidad/${tipoId}`);
        const json = await res.json();
        setData(json);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [tipoId]);

  console.log("Tipo ID seleccionado:", data);
  if (!tipoId) return <p className="mt-10 mb-8 text-center text-2xl text-gray-500">Por favor seleccione un tipo de habitación</p>;
  if (loading) return <p className="mt-10 mb-8 text-center text-2xl text-gray-500">Cargando calendario...</p>;
  if (!data) return null;

  // Generamos un Set con las fechas reservadas (YYYY-MM-DD)
  const diasOcupados = new Set<string>();
  data.reservas.forEach((r) => {
    const inicio = new Date(r.fecha_inicio);
    const fin = new Date(r.fecha_fin);
    for (let d = new Date(inicio); d <= fin; d.setDate(d.getDate() + 1)) {
      diasOcupados.add(d.toISOString().split("T")[0]);
    }
  });

  return (
    <div className="mt-8 p-6 w-fit mx-auto">
        <h2 className="text-2xl font-semibold text-center mb-4 text-gray-800">
            Calendario de disponibilidad
        </h2>
        <div className="scale-150 text-[#111827]">
            <Calendar
            locale="es-ES"
            tileClassName={({ date }) => {
                const iso = date.toISOString().split("T")[0];
                return diasOcupados.has(iso)
                ? "text-white rounded-md"
                : "bg-white text-[#111827]";
            }}
            tileDisabled={({ date }) =>
                diasOcupados.has(date.toISOString().split("T")[0])
            }
            />
        </div>
        <div className="flex justify-center gap-4 mt-25 text-sm text-gray-700">
            <div className="flex items-center gap-2">
                <span className="w-4 h-4 bg-[#f0f0f0] rounded-md" /> Ocupado
            </div>
            <div className="flex items-center gap-2">
              <span className="w-4 h-4 bg-white border border-gray-300 rounded-md" /> Disponible
           </div>
        </div>
    </div>
  );
}
