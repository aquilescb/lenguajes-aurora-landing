// src/components/Habitaciones/RoomTypesGrid.tsx
import { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import {
   BedDouble,
   Wifi,
   Tv,
   Bath,
   CalendarPlus,
   Crown,
   Wine,
   Car,
   Coffee,
   Sun,
} from "lucide-react";
import {
   getTiposHabitacion,
   type TipoHabitacion,
} from "../../../api/habitaciones";

type Props = { onPick: (tipoId: number) => void };

// === slides locales para mapear imágenes por nombre ===
const ROOM_SLIDES: { id: number; name: string; image: string; alt: string }[] =
   [
      {
         id: 1,
         name: "Parejas Estandar",
         image: "/tiposhab/Pareja Estandar.jpeg",
         alt: "Pareja Estandar",
      },
      {
         id: 2,
         name: "Parejas Suit",
         image: "/tiposhab/Pareja suit.jpg",
         alt: "Pareja Suit",
      },
      {
         id: 3,
         name: "Familiar Estandar",
         image: "/tiposhab/Familiar Estandar.png",
         alt: "Familiar Estandar",
      },
      {
         id: 4,
         name: "Familiar Suit",
         image: "/tiposhab/Familiar Suit.jpeg",
         alt: "Familiar Suite",
      },
      {
         id: 5,
         name: "Cuadruple Estandar",
         image: "/tiposhab/Cuadruple Estandar.jpg",
         alt: "Cuadruple Estandar",
      },
      {
         id: 6,
         name: "Cuadruple Suit",
         image: "/tiposhab/Cuadruple Suit.jpg",
         alt: "Cuadruple Suit",
      },
   ];

function Badge({
   icon,
   label,
   variant = "std",
}: {
   icon: React.ReactNode;
   label: string;
   variant?: "std" | "vip";
}) {
   const base =
      "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs transition";
   const std =
      "border border-white/10 bg-white/10 text-white/85 backdrop-blur-md";
   const vip =
      "bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-900 shadow-[0_0_12px_rgba(245,158,11,0.35)]";
   return (
      <span className={`${base} ${variant === "vip" ? vip : std}`}>
         {icon}
         <span className="font-medium">{label}</span>
      </span>
   );
}

function ShimmerCard() {
   return (
      <div className="relative h-72 rounded-2xl overflow-hidden">
         <div className="absolute inset-0 bg-gradient-to-b from-slate-800/40 to-slate-700/40" />
         <div className="h-full w-full bg-[linear-gradient(110deg,#1f2937_8%,#374151_18%,#1f2937_33%)] bg-[length:200%_100%] animate-[shimmer_1.2s_infinite]" />
      </div>
   );
}

/** Card con tilt 3D sutil en hover */
function TiltCard({
   children,
   className,
}: {
   children: React.ReactNode;
   className?: string;
}) {
   const ref = useRef<HTMLDivElement | null>(null);
   const x = useMotionValue(0);
   const y = useMotionValue(0);

   const rotateX = useTransform(y, [-50, 50], [8, -8]);
   const rotateY = useTransform(x, [-50, 50], [-8, 8]);

   function handleMove(e: React.MouseEvent) {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const px = e.clientX - rect.left;
      const py = e.clientY - rect.top;
      x.set((px / rect.width) * 100 - 50);
      y.set((py / rect.height) * 100 - 50);
   }
   function reset() {
      x.set(0);
      y.set(0);
   }

   return (
      <motion.div
         ref={ref}
         onMouseMove={handleMove}
         onMouseLeave={reset}
         style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
         className={className}
      >
         {children}
      </motion.div>
   );
}

export default function RoomTypesGrid({ onPick }: Props) {
   const [tipos, setTipos] = useState<TipoHabitacion[]>([]);
   const [loading, setLoading] = useState(true);

   useEffect(() => {
      (async () => {
         const data = await getTiposHabitacion();
         setTipos(data);
         setLoading(false);
      })();
   }, []);
   const DEFAULT_AMENITIES = [
      { label: "Wi-Fi", icon: <Wifi className="h-3.5 w-3.5" /> },
      { label: "Smart TV", icon: <Tv className="h-3.5 w-3.5" /> },
      { label: "Baño privado", icon: <Bath className="h-3.5 w-3.5" /> },
   ];

   const AMENITIES_BY_TYPE: Record<
      string,
      { label: string; icon: React.ReactNode; variant?: "std" | "vip" }[]
   > = {
      // === Parejas ===
      "parejas estandar": [
         ...DEFAULT_AMENITIES,
         {
            label: "Café de cortesía",
            icon: <Coffee className="h-3.5 w-3.5" />,
         },
      ],
      "parejas suit": [
         ...DEFAULT_AMENITIES,
         {
            label: "Buffer Service",
            icon: <Wine className="h-3.5 w-3.5" />,
            variant: "vip",
         },
         {
            label: "Jacuzzi",
            icon: <Bath className="h-3.5 w-3.5" />,
            variant: "vip",
         },
         {
            label: "Vista al Mar",
            icon: <Sun className="h-3.5 w-3.5" />,
            variant: "vip",
         },
      ],

      // === Familiar ===
      "familiar estandar": [
         ...DEFAULT_AMENITIES,
         { label: "Vista al Mar", icon: <Sun className="h-3.5 w-3.5" /> },
      ],
      "familiar suit": [
         ...DEFAULT_AMENITIES,
         {
            label: "Sala de estar",
            icon: <BedDouble className="h-3.5 w-3.5" />,
            variant: "vip",
         },
         {
            label: "Pileta Privada",
            icon: <Crown className="h-3.5 w-3.5" />,
            variant: "vip",
         },
      ],

      // === Cuádruple ===
      "cuadruple estandar": [
         ...DEFAULT_AMENITIES,
         { label: "Kit de playa", icon: <Sun className="h-3.5 w-3.5" /> },
      ],
      "cuadruple suit": [
         ...DEFAULT_AMENITIES,
         {
            label: "Vista al Mar",
            icon: <Sun className="h-3.5 w-3.5" />,
            variant: "vip",
         },
         {
            label: "Buffet en la playa",
            icon: <Crown className="h-3.5 w-3.5" />,
            variant: "vip",
         },
      ],
   };

   const normalize = (s: string) => s.trim().toLowerCase();

   return (
      <section id="habitaciones" className="mx-auto max-w-6xl px-4 pt-10 pb-2">
         {/* título con sparkles */}
         <div className="relative flex items-center justify-center">
            <motion.h2
               initial={{ opacity: 0, y: 12 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 0.45 }}
               className="text-3xl md:text-4xl font-semibold text-white text-center"
            >
               Tipos de habitación
            </motion.h2>
         </div>

         {loading ? (
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
               {Array.from({ length: 6 }).map((_, i) => (
                  <ShimmerCard key={i} />
               ))}
            </div>
         ) : tipos.length === 0 ? (
            <p className="mt-6 text-center text-slate-300">
               No hay habitaciones disponibles por el momento.
            </p>
         ) : (
            <motion.div
               initial="hidden"
               whileInView="show"
               viewport={{ once: true, amount: 0.2 }}
               variants={{
                  hidden: {},
                  show: { transition: { staggerChildren: 0.06 } },
               }}
               className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
               {tipos.map((t) => {
                  const slide = ROOM_SLIDES.find((s) => s.name === t.nombre);
                  const img = slide?.image;
                  const alt = slide?.alt ?? t.nombre;
                  const normName = normalize(t.nombre);
                  const amenities =
                     AMENITIES_BY_TYPE[normName] ?? DEFAULT_AMENITIES;

                  return (
                     <motion.article
                        key={t.id}
                        variants={{
                           hidden: { opacity: 0, y: 18, scale: 0.985 },
                           show: {
                              opacity: 1,
                              y: 0,
                              scale: 1,
                              transition: { duration: 0.45, ease: "easeOut" },
                           },
                        }}
                        className="group relative rounded-2xl overflow-hidden"
                     >
                        {/* Glow dinámico del borde */}
                        <div className="absolute inset-0 rounded-2xl bg-[radial-gradient(120%_120%_at_0%_0%,rgba(59,130,246,0.22),transparent_50%),radial-gradient(120%_120%_at_100%_100%,rgba(168,85,247,0.22),transparent_50%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                        <TiltCard className="relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-[2px] shadow-[0_12px_36px_rgba(2,8,23,0.20)] hover:shadow-[0_16px_48px_rgba(2,8,23,0.35)] transition">
                           {/* imagen */}
                           <div className="relative h-44 overflow-hidden">
                              {img ? (
                                 <img
                                    src={img}
                                    alt={alt}
                                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.06]"
                                    loading="lazy"
                                 />
                              ) : (
                                 <div className="h-full w-full grid place-items-center bg-slate-800 text-slate-300">
                                    Sin imagen
                                 </div>
                              )}
                           </div>

                           {/* contenido */}
                           <div className="p-4">
                              {/* header */}
                              <div className="flex items-start justify-between gap-3">
                                 <h3 className="text-[1.05rem] font-semibold text-white">
                                    {t.nombre}
                                 </h3>
                                 <span className="hidden sm:inline-flex items-center gap-1 rounded-md border border-white/10 bg-white/10 px-2 py-1 text-xs text-white/85">
                                    <BedDouble className="h-3.5 w-3.5" />
                                    {t.capacidad} pers.
                                 </span>
                              </div>

                              <p className="mt-1 text-sm text-white/70 line-clamp-2">
                                 {t.descripcion ||
                                    "Habitación confortable equipada para tu descanso."}
                              </p>

                              {/* amenities */}
                              <div className="mt-3 flex flex-wrap items-center gap-2">
                                 {amenities.map((a, i) => (
                                    <Badge
                                       key={i}
                                       icon={a.icon}
                                       label={a.label}
                                       variant={a.variant ?? "std"}
                                    />
                                 ))}
                              </div>

                              {/* CTA */}
                              <div className="mt-4 flex flex-col sm:flex-row sm:items-center gap-3">
                                 <button
                                    onClick={() => {
                                       onPick(t.id);
                                       document
                                          .getElementById("disponibilidad")
                                          ?.scrollIntoView({
                                             behavior: "smooth",
                                             block: "start",
                                          });
                                    }}
                                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2
               rounded-2xl bg-[var(--cta-blue)] px-5 py-2.5
               text-sm font-semibold text-white
               shadow-[0_8px_20px_rgba(88,155,255,0.25)]
               transition-transform duration-150
               hover:translate-y-[-1px] hover:brightness-110 active:scale-[0.98]
               focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
                                 >
                                    <CalendarPlus className="size-4" />
                                    <span>Ver disponibilidad</span>
                                 </button>
                                 {/* Precio verde, grande, sin animación */}
                                 <span
                                    className="inline-flex select-none items-center gap-1.5 rounded-2xl
               bg-emerald-500/95 text-white shadow-[0_0_14px_rgba(16,185,129,0.35)]
               px-4 py-2
               text-base sm:text-lg font-bold"
                                 >
                                    <span className="tabular-nums">
                                       {"$" + t.precio_noche.toLocaleString()}
                                    </span>
                                    <span className="text-white/90 font-medium text-sm sm:text-base">
                                       /noche
                                    </span>
                                 </span>

                                 {/* micro indicador al hover */}
                                 <motion.span
                                    initial={{ opacity: 0 }}
                                    whileHover={{ opacity: 1 }}
                                    className="hidden sm:inline text-xs text-white/60"
                                 ></motion.span>
                              </div>
                           </div>
                        </TiltCard>
                     </motion.article>
                  );
               })}
            </motion.div>
         )}
      </section>
   );
}

/* ===== Tailwind keyframes (si no usás v4 con @theme) =====
Agrega en tu CSS global si no tenés shimmer:


*/
