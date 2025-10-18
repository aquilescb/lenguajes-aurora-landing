import { useEffect, useState } from "react";
import { getTiposHabitacion, type TipoHabitacion } from "../../api/habitaciones";

type Props = {
  onChange?: (id: number | null) => void;
};

export default function SelectorHabReserva({ onChange }: Props) {
  const [tipos, setTipos] = useState<TipoHabitacion[]>([]);
  const [selected, setSelected] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTipos = async () => {
      const data = await getTiposHabitacion();
      setTipos(data);
      setLoading(false);
    };
    fetchTipos();
  }, []);

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelected(value);
    onChange?.(value ? parseInt(value) : null);
  };

  return (
    <div className="w-full">
      {loading ? (
        <div className="w-full h-12 rounded-lg bg-gray-200 animate-pulse border" />
      ) : tipos.length === 0 ? (
        <div className="border p-3 rounded-lg w-full text-gray-500 text-center">
          No hay tipos de habitación disponibles
        </div>
      ) : (
        <select
          value={selected}
          onChange={handleSelectChange}
          className="border p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
          required
        >
          <option value="">Seleccionar tipo de habitación</option>
          {tipos.map((t) => (
            <option key={t.id} value={t.id}>
              {t.nombre} — {t.capacidad} personas — ${t.precio_noche}/noche
            </option>
          ))}
        </select>
      )}
    </div>
  );
}