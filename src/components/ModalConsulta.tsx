import { useEffect } from "react";
import { IoCheckmarkCircle, IoCloseCircle } from "react-icons/io5";

type Props = {
   isOpen: boolean;
   onClose: () => void;
   type: "success" | "error";
   title: string;
   message: string;
   // opcionales para la columna izquierda
   leftTitle?: string;
   leftSubtitle?: string;
   leftImageSrc?: string; // ej: "/imgs/contact-illustration.jpg"
   leftHint?: string; // ej: "Respondemos en menos de 24 h"
};

export default function ConsultaResultModal({
   isOpen,
   onClose,
   type,
   title,
   message,
   leftTitle = "Estamos aquí para ayudarte",
   leftSubtitle = "Tu consulta fue procesada.",
   leftImageSrc = "/hero-2.jpg",
   leftHint = "Respondemos en menos de 24 h",
}: Props) {
   useEffect(() => {
      if (!isOpen) return;
      const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", onKey);
      return () => {
         window.removeEventListener("keydown", onKey);
         document.body.style.overflow = prev;
      };
   }, [isOpen, onClose]);

   if (!isOpen) return null;

   return (
      <div
         className="fixed inset-0 z-50 flex items-center justify-center p-4
                 bg-black/30 backdrop-blur-sm backdrop-saturate-150"
         role="dialog"
         aria-modal="true"
         onClick={onClose}
      >
         <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-3xl grid grid-cols-1 md:grid-cols-2 overflow-hidden
                   rounded-2xl bg-white shadow-2xl border border-black/5
                   animate-[fadeIn_160ms_ease-out]"
         >
            {/* Izquierda: imagen + copy alineado con Reservar */}
            <div className="relative hidden md:block">
               <img
                  src={leftImageSrc}
                  alt="Contacto"
                  className="absolute inset-0 w-full h-full object-cover"
               />
               <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-black/0" />
               <div className="relative h-full p-6 flex flex-col justify-end text-white">
                  <h3 className="text-2xl font-bold">{leftTitle}</h3>
                  <p className="opacity-90">{leftSubtitle}</p>
                  <p className="text-sm mt-2 opacity-80">{leftHint}</p>
               </div>
            </div>

            {/* Derecha: contenido del resultado */}
            <div className="p-8">
               <div className="text-center">
                  <div className="mb-6">
                     {type === "success" ? (
                        <IoCheckmarkCircle className="mx-auto text-6xl text-green-500" />
                     ) : (
                        <IoCloseCircle className="mx-auto text-6xl text-red-500" />
                     )}
                  </div>

                  <h3 className="text-2xl font-bold text-gray-800 mb-4">
                     {title}
                  </h3>
                  <div className="text-gray-600 whitespace-pre-line text-left mb-8">
                     {message}
                  </div>

                  <button
                     onClick={onClose}
                     className={`w-full py-3 px-6 rounded-lg font-semibold text-white transition-colors cursor-pointer
                ${
                   type === "success"
                      ? "bg-[var(--nav-dark)] hover:bg-[#374151]"
                      : "bg-red-500 hover:bg-red-600"
                }`}
                     autoFocus
                  >
                     Aceptar
                  </button>
               </div>
            </div>
         </div>

         <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(4px) scale(0.98); }
          to   { opacity: 1; transform: translateY(0)   scale(1);    }
        }
      `}</style>
      </div>
   );
}
