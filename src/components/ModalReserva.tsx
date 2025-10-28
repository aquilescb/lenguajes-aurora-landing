import { useEffect, useRef } from "react";
import { IoCheckmarkCircle, IoCloseCircle } from "react-icons/io5";

type ModalProps = {
   isOpen: boolean;
   onClose: () => void;
   type: "success" | "error";
   title: string;
   message: string;
};

export default function Modal({
   isOpen,
   onClose,
   type,
   title,
   message,
}: ModalProps) {
   const dialogRef = useRef<HTMLDivElement>(null);

   // Cerrar con Escape y bloquear scroll del body
   useEffect(() => {
      if (!isOpen) return;

      const onKey = (e: KeyboardEvent) => {
         if (e.key === "Escape") onClose();
      };

      // Bloqueo de scroll
      const prevOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";

      window.addEventListener("keydown", onKey);
      return () => {
         window.removeEventListener("keydown", onKey);
         document.body.style.overflow = prevOverflow;
      };
   }, [isOpen, onClose]);

   if (!isOpen) return null;

   const stop = (e: React.MouseEvent) => e.stopPropagation();

   return (
      <div
         className="fixed inset-0 z-50 flex items-center justify-center p-4
                 bg-black/30 backdrop-blur-sm backdrop-saturate-150"
         onClick={onClose}
         aria-hidden="false"
         aria-modal="true"
         role="dialog"
      >
         {/* Contenedor del diálogo */}
         <div
            ref={dialogRef}
            onClick={stop}
            className="w-full max-w-md mx-auto rounded-2xl bg-white shadow-2xl
                   border border-black/5
                   transform transition-all duration-200
                   animate-[fadeIn_160ms_ease-out]
                   data-[show=true]:scale-100"
            style={{ scale: 1 }}
         >
            <div className="p-8 text-center">
               {/* Ícono */}
               <div className="mb-6">
                  {type === "success" ? (
                     <IoCheckmarkCircle className="mx-auto text-6xl text-green-500" />
                  ) : (
                     <IoCloseCircle className="mx-auto text-6xl text-red-500" />
                  )}
               </div>

               {/* Título */}
               <h3 className="mb-4 text-2xl font-bold text-gray-800">
                  {title}
               </h3>

               {/* Mensaje */}
               <div className="mb-8 whitespace-pre-line text-left text-gray-600">
                  {message}
               </div>

               {/* Botón */}
               <button
                  onClick={onClose}
                  className={`w-full cursor-pointer rounded-lg px-6 py-3 font-semibold text-white transition-colors
              ${
                 type === "success"
                    ? "bg-green-500 hover:bg-green-600 focus-visible:outline-green-600"
                    : "bg-red-500 hover:bg-red-600 focus-visible:outline-red-600"
              } focus-visible:outline-2 focus-visible:outline-offset-2`}
                  autoFocus
               >
                  Aceptar
               </button>
            </div>
         </div>

         {/* Pequeña animación de entrada: util CSS nativo si no tenés plugin de animaciones */}
         <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(4px) scale(0.98); }
          to   { opacity: 1; transform: translateY(0px)  scale(1); }
        }
      `}</style>
      </div>
   );
}
