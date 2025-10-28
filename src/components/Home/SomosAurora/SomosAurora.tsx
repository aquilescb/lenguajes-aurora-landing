"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import {
   Sparkles,
   Star,
   BedDouble,
   MapPin,
   Coffee,
   Wifi,
   Bath,
   ConciergeBell,
   LayoutGrid,
} from "lucide-react";
import { useRef } from "react";

const fadeIn = (delay = 0) => ({
   hidden: { opacity: 0, y: 14 },
   show: { opacity: 1, y: 0, transition: { duration: 0.6, delay } },
});

export default function SomosAurora() {
   const sectionRef = useRef<HTMLDivElement | null>(null);
   const { scrollYProgress } = useScroll({
      target: sectionRef,
      offset: ["start end", "end start"],
   });
   // parallax sutil para el glow de fondo
   const glowY = useTransform(scrollYProgress, [0, 1], [-20, 20]);

   const stats = [
      {
         label: "Puntuación huéspedes",
         value: 4.9,
         suffix: "/5",
         icon: Star,
         accent: "text-yellow-300",
         halo: "bg-yellow-500/15",
      },
      {
         label: "Total de Habitaciones",
         value: 400,
         icon: BedDouble,
         accent: "text-[var(--cta-blue)]",
         halo: "bg-sky-500/15",
      },
      {
         label: "Tipos de Habitaciones",
         value: 6,
         icon: LayoutGrid, // alternativa: KeyRound, Layers, Shapes
         accent: "text-pink-300",
         halo: "bg-pink-500/15",
      },
   ];

   const amenities = [
      { icon: <Wifi className="size-4" />, text: "Wi-Fi Gratis" },
      { icon: <Coffee className="size-4" />, text: "Desayuno Libre" },
      { icon: <Bath className="size-4" />, text: "Spa & Sauna" },
      { icon: <ConciergeBell className="size-4" />, text: "Comida 24/7" },
      { icon: <MapPin className="size-4" />, text: "Ubicación privilegiada" },
   ];

   return (
      <section
         ref={sectionRef}
         className="relative overflow-clip bg-[#0F1B2B] text-white py-24 md:py-28"
      >
         {/* Decor superior gradiente */}
         <div className="pointer-events-none absolute inset-x-0 -top-24 h-24 bg-gradient-to-b from-[#0A1524] to-transparent opacity-70" />

         {/* Orbes/glow de fondo */}
         <motion.div
            style={{ y: glowY }}
            className="absolute -top-24 -right-20 size-[38rem] rounded-full bg-sky-500/10 blur-3xl"
         />
         <div className="absolute -bottom-32 -left-28 size-[32rem] rounded-full bg-indigo-500/10 blur-3xl" />

         <div
            className="relative max-w-6xl mx-auto px-6 md:px-12"
            id="somos-aurora"
         >
            {/* Headline */}
            <motion.h2
               variants={fadeIn(0)}
               initial="hidden"
               whileInView="show"
               viewport={{ once: true, amount: 0.6 }}
               className="text-center text-4xl md:text-5xl font-bold tracking-tight"
            >
               Somos <span className="text-[var(--cta-blue)]">Aurora</span>
            </motion.h2>

            <motion.p
               variants={fadeIn(0.08)}
               initial="hidden"
               whileInView="show"
               viewport={{ once: true, amount: 0.6 }}
               className="mx-auto mt-4 max-w-2xl text-center text-white/70"
            >
               Un hotel pensado para quienes viajan con propósito: diseño
               cálido, servicio impecable y una calma que se siente desde el
               primer paso. Descubrí un refugio moderno entre naturaleza y
               ciudad.
            </motion.p>

            {/* Cuerpo */}
            <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
               {/* Texto + CTAs + stats */}
               <motion.div
                  variants={fadeIn(0.12)}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.45 }}
                  className="space-y-7"
               >
                  <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-white/80">
                     <Sparkles className="size-4 text-[var(--cta-blue)]" />
                     Experiencias que brillan de noche y de día
                  </div>

                  <div className="space-y-5 text-white/90">
                     <p className="leading-relaxed">
                        En Aurora, cada detalle está curado: aromas suaves, luz
                        pensada para descansar y una atención que se anticipa a
                        lo que vas a necesitar. Es ese lugar al que querés
                        volver.
                     </p>
                     <p className="leading-relaxed">
                        Nos rodea un entorno único: mañanas de sol que se filtra
                        entre verdes y un cielo nocturno perfecto para cerrar el
                        día con un buen vino. Elegancia sin exceso, comodidad
                        sin compromiso.
                     </p>
                  </div>

                  {/* Stats */}
                  <div className="    mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5 text-center w-full max-w-3xl mx-auto">
                     {stats.map((s, i) => {
                        const Icon = s.icon;
                        return (
                           <motion.div
                              key={s.label}
                              initial={{ opacity: 0, y: 8 }}
                              whileInView={{ opacity: 1, y: 0 }}
                              viewport={{ once: true, amount: 0.5 }}
                              transition={{ duration: 0.5, delay: 0.08 * i }}
                              whileHover={{ y: -2 }}
                              className="          relative flex flex-col items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-4 py-5 sm:py-6 backdrop-blur-md"
                           >
                              {/* glow del icono */}
                              <div
                                 className={`absolute -right-6 -top-6 size-20 rounded-full blur-2xl ${s.halo}`}
                              />
                              <div className="flex items-center gap-3">
                                 <div className="grid size-9 place-items-center rounded-xl border border-white/10 bg-white/10">
                                    <Icon className={`size-5 ${s.accent}`} />
                                 </div>
                                 <div>
                                    <div className="text-2xl md:text-3xl font-bold tracking-tight leading-none">
                                       <motion.span
                                          initial={{ opacity: 0 }}
                                          whileInView={{ opacity: 1 }}
                                          transition={{ duration: 0.5 }}
                                       >
                                          {s.value}
                                       </motion.span>
                                       {s.suffix && (
                                          <span className="text-white/70">
                                             {s.suffix}
                                          </span>
                                       )}
                                    </div>
                                    <div className="text-xs text-white/60">
                                       {s.label}
                                    </div>
                                 </div>
                              </div>
                           </motion.div>
                        );
                     })}
                  </div>

                  {/* Marquee amenities */}
                  <div
                     aria-hidden
                     className="relative mt-2 overflow-hidden rounded-xl border border-white/10 bg-white/5"
                  >
                     <motion.div
                        initial={{ x: 0 }}
                        animate={{ x: ["0%", "-50%"] }}
                        transition={{
                           duration: 18,
                           repeat: Infinity,
                           ease: "linear",
                        }}
                        className="flex min-w-[200%] gap-6 py-3 px-4"
                     >
                        {[...amenities, ...amenities].map((a, idx) => (
                           <div
                              key={idx}
                              className="flex items-center gap-2 text-sm text-white/80"
                           >
                              <div className="grid place-items-center rounded-full bg-white/10 p-1">
                                 {a.icon}
                              </div>
                              {a.text}
                           </div>
                        ))}
                     </motion.div>
                     <div className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-[#0F1B2B] to-transparent" />
                     <div className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-[#0F1B2B] to-transparent" />
                  </div>
               </motion.div>

               {/* Collage imágenes con hover/tilt */}
               <motion.div
                  variants={fadeIn(0.18)}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.45 }}
                  className="relative"
               >
                  {/* Glow marco */}
                  <div className="absolute -inset-6 rounded-[28px] bg-sky-500/10 blur-2xl" />
                  <div className="relative grid grid-cols-2 gap-4">
                     {/* Principal */}
                     <motion.div
                        whileHover={{ scale: 1.02, rotate: -0.2 }}
                        transition={{
                           type: "spring",
                           stiffness: 220,
                           damping: 18,
                        }}
                        className="col-span-2"
                     >
                        <img
                           src="/hero-3.jpg"
                           alt="Lobby Aurora"
                           className="w-full h-auto rounded-3xl object-cover shadow-[0_20px_50px_rgba(2,8,23,0.65)] border border-white/10"
                           style={{ aspectRatio: "16/10" }}
                        />
                     </motion.div>

                     {/* Secundarias */}
                     <motion.img
                        whileHover={{ scale: 1.025, rotate: 0.6 }}
                        transition={{
                           type: "spring",
                           stiffness: 220,
                           damping: 18,
                        }}
                        src="/hero-4.jpg"
                        alt="Suite con vista"
                        className="w-full h-auto rounded-2xl object-cover shadow-[0_12px_32px_rgba(2,8,23,0.5)] border border-white/10"
                        style={{ aspectRatio: "4/3" }}
                     />
                     <motion.img
                        whileHover={{ scale: 1.025, rotate: -0.6 }}
                        transition={{
                           type: "spring",
                           stiffness: 220,
                           damping: 18,
                        }}
                        src="/hero-5.jpg"
                        alt="Terraza al atardecer"
                        className="w-full h-auto rounded-2xl object-cover shadow-[0_12px_32px_rgba(2,8,23,0.5)] border border-white/10"
                        style={{ aspectRatio: "4/3" }}
                     />
                  </div>
               </motion.div>
            </div>
         </div>
      </section>
   );
}
