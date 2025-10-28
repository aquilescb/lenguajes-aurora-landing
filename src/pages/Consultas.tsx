import { useState } from "react";
import { crearConsulta, type ConsultaData } from "../api/consulta";
import { obtenerUbicacionCompleta } from "../api/ubicacion";
import ConsultaResultModal from "../components/ModalConsulta";

export default function Consultas() {
   const [isSubmitting, setIsSubmitting] = useState(false);
   const [modalOpen, setModalOpen] = useState(false);
   const [modal, setModal] = useState<{
      type: "success" | "error";
      title: string;
      message: string;
   }>({ type: "success", title: "", message: "" });

   const [consultaData, setConsultaData] = useState({
      nombre: "",
      apellido: "",
      email: "",
      telefono: "",
      mensaje: "",
   });

   const handleChange = (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
   ) => {
      setConsultaData({ ...consultaData, [e.target.name]: e.target.value });
   };

   const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setIsSubmitting(true);

      try {
         const ubicacionData = await obtenerUbicacionCompleta();
         const ubicacionString =
            ubicacionData.success && ubicacionData.ubicacion
               ? ubicacionData.ubicacion
               : "Ubicación no disponible";

         const datosConsulta: ConsultaData = {
            nombre: consultaData.nombre,
            apellido: consultaData.apellido,
            email: consultaData.email,
            telefono: consultaData.telefono || undefined,
            texto: consultaData.mensaje,
            ubicacion: ubicacionString,
         };

         const resultado = await crearConsulta(datosConsulta);

         if (resultado.success) {
            setModal({
               type: "success",
               title: "¡Consulta enviada!",
               message:
                  "Gracias por contactarte con Aurora Hotel.\nNos pondremos en contacto a la brevedad al email proporcionado.",
            });
            setModalOpen(true);
            // limpiar
            setConsultaData({
               nombre: "",
               apellido: "",
               email: "",
               telefono: "",
               mensaje: "",
            });
         } else {
            setModal({
               type: "error",
               title: "No pudimos enviar tu consulta",
               message:
                  resultado.message || "Intentá nuevamente en unos minutos.",
            });
            setModalOpen(true);
         }
         // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (e) {
         setModal({
            type: "error",
            title: "Error inesperado",
            message:
               "Ocurrió un error procesando tu consulta. Intentá nuevamente.",
         });
         setModalOpen(true);
      } finally {
         setIsSubmitting(false);
      }
   };

   return (
      <div className="min-h-screen bg-white pt-30 pb-15 px-4">
         <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
               <h1 className="text-4xl md:text-5xl font-bold text-[var(--nav-dark)] mb-4">
                  Consultas
               </h1>
               <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  ¿Tenés preguntas o necesitás información adicional? Completá
                  el formulario y te respondemos.
               </p>
            </div>

            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
               <div className="grid md:grid-cols-2">
                  {/* Formulario (inputs estilo Reservar) */}
                  <div className="p-8 lg:p-12">
                     <h2 className="text-2xl font-bold text-[var(--nav-dark)] mb-6">
                        Enviá tu consulta
                     </h2>
                     <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                           <input
                              type="text"
                              name="nombre"
                              value={consultaData.nombre}
                              onChange={handleChange}
                              className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none
                               focus:ring-2 focus:ring-[var(--nav-dark)] focus:border-transparent"
                              placeholder="Nombre *"
                              required
                           />
                           <input
                              type="text"
                              name="apellido"
                              value={consultaData.apellido}
                              onChange={handleChange}
                              className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none
                               focus:ring-2 focus:ring-[var(--nav-dark)] focus:border-transparent"
                              placeholder="Apellido *"
                              required
                           />
                        </div>

                        <input
                           type="email"
                           name="email"
                           value={consultaData.email}
                           onChange={handleChange}
                           className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none
                             focus:ring-2 focus:ring-[var(--nav-dark)] focus:border-transparent"
                           placeholder="Email *"
                           required
                        />

                        <input
                           type="tel"
                           name="telefono"
                           value={consultaData.telefono}
                           onChange={handleChange}
                           className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none
                             focus:ring-2 focus:ring-[var(--nav-dark)] focus:border-transparent"
                           placeholder="Teléfono (opcional)"
                        />

                        <textarea
                           name="mensaje"
                           value={consultaData.mensaje}
                           onChange={handleChange}
                           rows={5}
                           className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none
                             focus:ring-2 focus:ring-[var(--nav-dark)] focus:border-transparent resize-none"
                           placeholder="Escribí tu consulta *"
                           required
                        />

                        <button
                           type="submit"
                           disabled={isSubmitting}
                           className={`w-full font-semibold py-3 rounded-lg transition-all
                    ${
                       isSubmitting
                          ? "bg-gray-400 cursor-not-allowed text-white"
                          : "bg-[var(--nav-dark)] text-white hover:bg-[#374151] cursor-pointer"
                    }`}
                        >
                           {isSubmitting ? "Enviando..." : "Enviar consulta"}
                        </button>
                     </form>
                  </div>

                  {/* Columna izquierda con estética de Reservar */}
                  <LeftPanelConsultas />
               </div>
            </div>
         </div>

         {/* Modal resultado */}
         <ConsultaResultModal
            isOpen={modalOpen}
            onClose={() => setModalOpen(false)}
            type={modal.type}
            title={modal.title}
            message={modal.message}
            leftImageSrc="/hero-2.jpg"
            leftTitle="Gracias por escribirnos"
            leftSubtitle="Revisaremos tu mensaje"
            leftHint="Horario de atención: 9 a 18 h"
         />
      </div>
   );
}

/** Panel izquierdo: ideas alineadas con Reservar */
function LeftPanelConsultas() {
   return (
      <div className="hidden md:flex items-center justify-center bg-gradient-to-br from-orange-100 to-amber-200">
         <div className="relative w-full h-full">
            <img
               src="/hero-1.jpeg"
               alt="Lobby del hotel"
               className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-black/0" />
            <div className="relative p-8 text-white flex flex-col justify-end h-full">
               <h3 className="text-2xl font-semibold">Aurora Hotel</h3>
               <p className="opacity-90">
                  Consultas, reservas y asistencia personalizada.
               </p>
               <ul className="mt-3 text-sm opacity-90 space-y-1">
                  <li>• Respuesta en menos de 24 h</li>
                  <li>• Dirección: Los Tarcos 69, Tres Cerritos</li>
               </ul>
            </div>
         </div>
      </div>
   );
}
