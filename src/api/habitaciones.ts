export type TipoHabitacion = {
  id: number;
  nombre: string;
  capacidad: number;
  descripcion: string;
  precio_noche: number;
  cantidad: number;
};

export async function getTiposHabitacion(): Promise<TipoHabitacion[]> {
  try {
    const res = await fetch('/api/habitaciones/tipos/lista');
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const raw = await res.json();

    const tipos: TipoHabitacion[] = raw.map((t: any) => ({
      id: Number(t.id),
      nombre: String(t.nombre).replace(/_/g, ' ').replace(/\b\w/g, (l: string) => l.toUpperCase()),
      capacidad: Number(t.capacidad),
      descripcion: String(t.descripcion ?? ''),
      precio_noche: parseFloat(t.precio_noche), // viene como string "100.00"
      cantidad: Number(t.cantidad),
    }));

    // si querés ocultar las que no tienen habitaciones activas:
    return tipos.filter(t => t.cantidad > 0);
  } catch (err) {
    console.error('getTiposHabitacion error:', err);
    return [];
  }
}
