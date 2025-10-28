import { useState } from "react";
import SelectorHabReserva from "../components/Reservar/SelectorHabReserva";
import { crearReserva, type ReservaData } from "../api/reservar";
import { obtenerUbicacionCompleta } from "../api/ubicacion";
import Modal from "../components/ModalReserva";
import { sendReservationEmail } from "../components/Consultas/EmailJS";
const ROOM_LABEL: Record<string, string> = {
   parejas_estandar: "Parejas Estándar",
   parejas_suite: "Parejas Suite",
   parejas_suit: "Parejas Suite",
   cuadruple_estandar: "Cuádruple Estándar",
   cuadruple_suite: "Cuádruple Suite",
   familiar_estandar: "Familiar Estándar",
   familiar_suite: "Familiar Suite",
};

const roomLabel = (code?: string) =>
   code
      ? ROOM_LABEL[code] ??
        code.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
      : "";

export default function Reservar() {
   const [cardFlip, setCardFlip] = useState(false);
   const [tipoHabitacionId, setTipoHabitacionId] = useState<number | null>(
      null
   );
   const [isSubmitting, setIsSubmitting] = useState(false);
   const [modal, setModal] = useState<{
      isOpen: boolean;
      type: "success" | "error";
      title: string;
      message: string;
   }>({
      isOpen: false,
      type: "success",
      title: "",
      message: "",
   });
   const [cardData, setCardData] = useState({
      nombre: "",
      apellido: "",
      email: "",
      telefono: "",
      fecha_inicio: "",
      fecha_fin: "",
      observaciones: "",
      cardNumber: "",
      cardName: "",
      expiry: "",
      cvc: "",
   });

   const [cvcVisible, setCvcVisible] = useState(false);

   const formatCardNumber = (value: string) => {
      // Quitar todo lo que no sea dígito
      const digits = value.replace(/\D/g, "").slice(0, 19); // hasta 19 por si querés AMEX
      // Agrupar de a 4 (funciona bien para la mayoría)
      return digits.replace(/(.{4})/g, "$1 ").trim();
   };

   const formatExpiry = (value: string) => {
      // Quitar no dígitos y limitar a 4 chars (MMAA)
      const digits = value.replace(/\D/g, "").slice(0, 4);
      if (digits.length <= 2) return digits;
      return digits.slice(0, 2) + "/" + digits.slice(2);
   };

   const handleGenericChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;

      if (name === "cardNumber") {
         setCardData((prev) => ({
            ...prev,
            cardNumber: formatCardNumber(value),
         }));
         return;
      }

      if (name === "expiry") {
         setCardData((prev) => ({ ...prev, expiry: formatExpiry(value) }));
         return;
      }

      if (name === "cvc") {
         // solo números, hasta 4 dígitos
         const digits = value.replace(/\D/g, "").slice(0, 4);
         setCardData((prev) => ({ ...prev, cvc: digits }));
         return;
      }

      // resto fields normales
      setCardData((prev) => ({ ...prev, [name]: value }));
   };

   const closeModal = () => {
      setModal({ ...modal, isOpen: false });
   };

   const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      console.log("tipoHabitacionId:", tipoHabitacionId);

      if (!tipoHabitacionId) {
         setModal({
            isOpen: true,
            type: "error",
            title: "Faltan datos",
            message:
               "Por favor selecciona un tipo de habitación antes de continuar.",
         });
         return;
      }

      setIsSubmitting(true);

      try {
         const ubicacionData = await obtenerUbicacionCompleta();
         console.log("Ubicación obtenida:", ubicacionData);

         const ubicacionString =
            ubicacionData.success && ubicacionData.ubicacion
               ? ubicacionData.ubicacion
               : "Ubicación no disponible";

         const reservaData: ReservaData = {
            nombre: cardData.nombre,
            apellido: cardData.apellido,
            email: cardData.email,
            telefono: cardData.telefono,
            tipo_habitacion_id: tipoHabitacionId,
            fecha_inicio: cardData.fecha_inicio,
            fecha_fin: cardData.fecha_fin,
            observaciones: cardData.observaciones,
            cardName: cardData.cardName,
            cardNumber: cardData.cardNumber.replace(/\s/g, ""), // mandar sin espacios
            cvc: cardData.cvc,
            expiry: cardData.expiry,
            ubicacion: ubicacionString,
         };

         const result = await crearReserva(reservaData);

         if (result.success && result.data) {
            setModal({
               isOpen: true,
               type: "success",
               title: "¡Reserva Confirmada!",
               message: `Detalles de tu reserva:
          
                  • Número de Reserva: ${result.data.reservaId}
                  • Habitación: ${result.data.habitacion.nombre} (${roomLabel(
                  result.data.habitacion.tipo
               )})
                  • Fechas: ${result.data.fechas.inicio} al ${
                  result.data.fechas.fin
               }
                  • Estado: ${result.data.estado}

                  ${result.message}`,
            });
            try {
               await sendReservationEmail({
                  to_email: cardData.email,
                  to_name: `${cardData.nombre} ${cardData.apellido}`.trim(),
                  hotel_name: "Aurora Hotel",
                  reservation_id: result.data.reservaId,
                  room_label: roomLabel(result.data.habitacion.tipo),
                  room_number: result.data.habitacion.nombre,
                  checkin_date: result.data.fechas.inicio,
                  checkout_date: result.data.fechas.fin,
               });
            } catch (e) {
               console.warn("No se pudo enviar email de confirmación:", e);
            }
            setCardData({
               nombre: "",
               apellido: "",
               email: "",
               telefono: "",
               fecha_inicio: "",
               fecha_fin: "",
               observaciones: "",
               cardNumber: "",
               cardName: "",
               expiry: "",
               cvc: "",
            });
            setTipoHabitacionId(null);
         } else {
            setModal({
               isOpen: true,
               type: "error",
               title: "Error en la Reserva",
               message: result.message,
            });
         }
      } catch (error) {
         console.error("Error en el proceso de reserva:", error);
         setModal({
            isOpen: true,
            type: "error",
            title: "Error en la Reserva",
            message:
               "Ocurrió un error inesperado. Por favor intenta nuevamente.",
         });
      } finally {
         setIsSubmitting(false);
      }
   };

   return (
      <div className="min-h-screen bg-white flex items-center justify-center pt-35 pb-20 px-4">
         <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl overflow-hidden">
            <div className="grid md:grid-cols-2">
               {/* ---- Formulario ---- */}
               <form onSubmit={handleSubmit} className="p-8 space-y-4">
                  <h2 className="text-3xl font-bold text-(--nav-dark) mb-6">
                     Reservar Habitación
                  </h2>

                  <div className="grid grid-cols-2 gap-4">
                     <input
                        type="text"
                        name="nombre"
                        placeholder="Nombre"
                        value={cardData.nombre}
                        onChange={handleGenericChange}
                        className="border p-3 rounded-lg w-full"
                        required
                     />
                     <input
                        type="text"
                        name="apellido"
                        placeholder="Apellido"
                        value={cardData.apellido}
                        onChange={handleGenericChange}
                        className="border p-3 rounded-lg w-full"
                        required
                     />
                  </div>

                  <input
                     type="email"
                     name="email"
                     placeholder="Email"
                     value={cardData.email}
                     onChange={handleGenericChange}
                     className="border p-3 rounded-lg w-full"
                     required
                  />
                  <input
                     type="tel"
                     name="telefono"
                     placeholder="Teléfono"
                     value={cardData.telefono}
                     onChange={handleGenericChange}
                     className="border p-3 rounded-lg w-full"
                     required
                  />

                  <div className="space-y-4">
                     <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                           Tipo de Habitación *
                        </label>
                        <div className="w-full">
                           <SelectorHabReserva
                              value={tipoHabitacionId}
                              onChange={(id) => {
                                 console.log(
                                    "Reservar - recibiendo onChange:",
                                    id
                                 );
                                 setTipoHabitacionId(id);
                              }}
                           />
                        </div>
                     </div>
                     <input
                        type="text"
                        name="observaciones"
                        placeholder="Observaciones (opcional)"
                        value={cardData.observaciones}
                        onChange={handleGenericChange}
                        className="border p-3 rounded-lg w-full"
                     />
                  </div>

                  <div className="grid grid-cols-2 gap-4 mt-4">
                     <label className="flex flex-col text-sm">
                        Fecha inicio
                        <input
                           type="date"
                           name="fecha_inicio"
                           value={cardData.fecha_inicio}
                           onChange={handleGenericChange}
                           className="border p-3 rounded-lg w-full"
                           required
                        />
                     </label>
                     <label className="flex flex-col text-sm">
                        Fecha fin
                        <input
                           type="date"
                           name="fecha_fin"
                           value={cardData.fecha_fin}
                           onChange={handleGenericChange}
                           className="border p-3 rounded-lg w-full"
                           required
                        />
                     </label>
                  </div>

                  {/* ---- Datos de Tarjeta ---- */}
                  <h3 className="text-xl font-semibold text-(--nav-dark) mt-6 mb-2">
                     Datos de Tarjeta
                  </h3>

                  {/* ---- Tarjeta ---- */}
                  <div className="relative w-full h-52 [perspective:1000px]">
                     <div
                        className={`absolute inset-0 transition-transform duration-500 [transform-style:preserve-3d] ${
                           cardFlip ? "[transform:rotateY(180deg)]" : ""
                        }`}
                     >
                        {/* Frente */}
                        <div
                           className="absolute inset-0 rounded-xl p-6 text-white bg-gradient-to-br from-[var(--nav-dark)] to-[#1f2b3a]
                 shadow-xl [backface-visibility:hidden] [transform:rotateY(0deg)]"
                        >
                           {/* Marca + chip */}
                           <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                 <div className="w-9 h-6 rounded-sm bg-gradient-to-br from-gray-200 to-gray-400 shadow-inner" />
                                 <div className="text-[10px] tracking-wide opacity-60">
                                    CONTACTLESS
                                 </div>
                              </div>
                              <span className="text-xs opacity-90">VISA</span>
                           </div>

                           {/* Número */}
                           <div className="mt-6 text-2xl tracking-widest font-medium">
                              {cardData.cardNumber || "#### #### #### ####"}
                           </div>

                           {/* Nombre + Vencimiento */}
                           <div className="mt-6 flex items-end justify-between text-sm">
                              <div>
                                 <p className="opacity-70 text-[11px]">
                                    Titular
                                 </p>
                                 <p className="font-semibold">
                                    {cardData.cardName || "NOMBRE DEL TITULAR"}
                                 </p>
                              </div>
                              <div className="text-right">
                                 <p className="opacity-70 text-[11px]">Vence</p>
                                 <p className="font-semibold">
                                    {cardData.expiry || "MM/AA"}
                                 </p>
                              </div>
                           </div>

                           {/* Microtexto decorativo */}
                           <div className="mt-4 text-[9px] opacity-40 tracking-wider">
                              AURORA HOTEL • CARD • SECURE • AURORA HOTEL • CARD
                              • SECURE
                           </div>
                        </div>

                        {/* Dorso */}
                        <div
                           className="absolute inset-0 rounded-xl p-6 text-white bg-[#1f2b3a] shadow-xl
                 [backface-visibility:hidden] [transform:rotateY(180deg)]"
                        >
                           {/* Banda magnética */}
                           <div className="h-9 w-full bg-gradient-to-b from-gray-700 to-gray-900 rounded-sm mb-5" />
                           {/* Franja de firma + CVC */}
                           <div className="flex items-center justify-between gap-3">
                              <div
                                 className="flex-1 bg-white/95 h-8 rounded-sm border border-gray-300
                        shadow-inner px-2 flex items-center text-[10px] text-gray-500"
                              >
                                 Firma autorizada
                              </div>
                              <div
                                 className="bg-white text-black h-8 min-w-16 px-3 rounded-sm flex items-center justify-center
                        font-semibold tracking-widest border border-gray-300"
                              >
                                 {cvcVisible
                                    ? cardData.cvc || "000"
                                    : cardData.cvc
                                    ? "•".repeat(cardData.cvc.length)
                                    : "•••"}
                              </div>
                           </div>
                           .{/* Marca al dorso */}
                           <div className="mt-4 text-right text-xs opacity-90">
                              VISA
                           </div>
                        </div>
                     </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mt-4">
                     <input
                        type="text"
                        name="cardNumber"
                        placeholder="Número de tarjeta"
                        value={cardData.cardNumber}
                        onChange={handleGenericChange}
                        className="border p-3 rounded-lg w-full"
                        maxLength={23} // incluye espacios
                        required
                        onFocus={() => setCardFlip(false)} // enfocar muestra frente
                     />
                     <input
                        type="text"
                        name="cardName"
                        placeholder="Nombre en la tarjeta"
                        value={cardData.cardName}
                        onChange={handleGenericChange}
                        className="border p-3 rounded-lg w-full"
                        required
                        onFocus={() => setCardFlip(false)}
                     />
                  </div>

                  <div className="grid grid-cols-2 gap-4 relative">
                     <input
                        type="text"
                        name="expiry"
                        placeholder="MM/AA"
                        value={cardData.expiry}
                        onChange={handleGenericChange}
                        className="border p-3 rounded-lg w-full"
                        required
                        onFocus={() => setCardFlip(false)}
                     />

                     {/* CVC con ojo */}
                     <div className="relative">
                        <input
                           type={cvcVisible ? "text" : "password"}
                           name="cvc"
                           placeholder="CVC"
                           value={cardData.cvc}
                           onChange={handleGenericChange}
                           className="border p-3 rounded-lg w-full pr-12"
                           maxLength={4}
                           required
                           onFocus={() => {
                              // al enfocar CVC mostramos dorso
                              setCardFlip(true);
                           }}
                           onBlur={() => {
                              // al salir ocultamos dorso
                              setCardFlip(false);
                           }}
                        />
                        <button
                           type="button"
                           onClick={() => setCvcVisible((v) => !v)}
                           className="absolute right-2 top-1/2 -translate-y-1/2 text-sm opacity-80 px-2 py-1 rounded"
                           aria-label={
                              cvcVisible ? "Ocultar CVC" : "Mostrar CVC"
                           }
                        ></button>
                     </div>
                  </div>

                  <button
                     type="submit"
                     disabled={isSubmitting}
                     className={`w-full font-semibold py-3 rounded-lg mt-6 transition-all ${
                        isSubmitting
                           ? "bg-gray-400 cursor-not-allowed"
                           : "bg-(--nav-dark) text-white hover:bg-[#374151] cursor-pointer"
                     }`}
                  >
                     {isSubmitting
                        ? "Procesando reserva..."
                        : "Confirmar Reserva"}
                  </button>
               </form>

               {/* ---- Imagen lateral ---- */}
               <div className="hidden md:flex items-center justify-center bg-gradient-to-br from-orange-100 to-amber-200">
                  <img
                     src="/hero-2.jpg"
                     alt="Habitación"
                     className="w-full h-full object-cover"
                  />
               </div>
            </div>
         </div>

         {/* Modal */}
         <Modal
            isOpen={modal.isOpen}
            onClose={closeModal}
            type={modal.type}
            title={modal.title}
            message={modal.message}
         />
      </div>
   );
}
