// components/Home/Disponibilidad/Disponibilidad.tsx
import { useEffect, useState } from "react";
import SelectorHab from "./SelectorHab";
import Calendario from "./Calendario";
import { motion, AnimatePresence } from "framer-motion";
type Props = {
   tipoSeleccionado?: number | null;
   onTipoChange?: (id: number | null) => void;
};

export default function Disponibilidad({
   tipoSeleccionado,
   onTipoChange,
}: Props) {
   const [localTipo, setLocalTipo] = useState<number | null>(
      tipoSeleccionado ?? null
   );

   // sincroniza si cambia desde arriba
   useEffect(() => {
      if (tipoSeleccionado !== undefined) setLocalTipo(tipoSeleccionado);
   }, [tipoSeleccionado]);

   const handleSelect = (id: number | null) => {
      if (onTipoChange) onTipoChange(id);
      else setLocalTipo(id);
   };

   return (
      <section className="bg-white flex flex-col items-center py-14 px-4 overflow-hidden">
         <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="max-w-4xl w-full text-center"
            id="disponibilidad"
         >
            <h2 className="text-4xl md:text-5xl text-[#111827] font-semibold mb-8 flex items-center justify-center gap-3">
               Calendario de disponibilidad
            </h2>

            {/* selector con micro fade */}
            <AnimatePresence mode="wait">
               <motion.div
                  key={localTipo ?? "none"}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.3 }}
                  className="mb-6"
               >
                  <SelectorHab value={localTipo} onChange={handleSelect} />
               </motion.div>
            </AnimatePresence>

            {/* calendario animado */}
            <motion.div
               key={localTipo ?? "calendar"}
               initial={{ opacity: 0, y: 15 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.5, delay: 0.1 }}
               className="mx-auto w-fit rounded-2xl p-3 transition-transform duration-200"
            >
               <Calendario tipoId={localTipo ?? null} />
            </motion.div>

            <motion.a
               href="/reservar"
               whileHover={{ scale: 1.03 }}
               whileTap={{ scale: 0.97 }}
               transition={{ type: "spring", stiffness: 260, damping: 18 }}
               className="mt-8 inline-flex items-center justify-center gap-2 rounded-full
                   bg-[var(--cta-blue)] hover:bg-blue-600 px-6 py-3 text-white font-semibold 
                   hover:brightness-110 shadow-[0_8px_24px_rgba(17,24,39,0.2)]"
            >
               Reservar
            </motion.a>
         </motion.div>
      </section>
   );
}
