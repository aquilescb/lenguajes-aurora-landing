export default function Footer() {
   return (
      <footer className="bg-[#111827] text-white">
         <div className="flex flex-col lg:flex-row min-h-[300px] lg:max-h-120">
            {/* Contenido principal */}
            <div className="w-full lg:w-1/2 px-6 sm:px-12 lg:pl-20 pt-8 pb-8 lg:pb-0">
               {/* Logo y título */}
               <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-4 mb-8 lg:mb-10">
                  <img
                     src="/logo-blanco.png"
                     alt="Logo"
                     className="h-12 sm:h-15 object-contain"
                  />
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center sm:text-left">
                     Somos Aurora
                  </h2>
               </div>

               {/* Links de navegación */}
               <nav className="flex flex-col space-y-3 sm:space-y-4">
                  <a
                     href="/"
                     className="text-lg sm:text-xl lg:text-2xl hover:text-gray-300 transition-colors text-center sm:text-left"
                  >
                     Hotel
                  </a>
                  <a
                     href="#somos-aurora"
                     className="text-lg sm:text-xl lg:text-2xl hover:text-gray-300 transition-colors text-center sm:text-left"
                  >
                     Somos Aurora
                  </a>
                  <a
                     href="#disponibilidad"
                     className="text-lg sm:text-xl lg:text-2xl hover:text-gray-300 transition-colors text-center sm:text-left"
                  >
                     Disponibilidad
                  </a>
                  <a
                     href="/reservar"
                     className="text-lg sm:text-xl lg:text-2xl hover:text-gray-300 transition-colors text-center sm:text-left"
                  >
                     Reservar
                  </a>
                  <a
                     href="/consultas"
                     className="text-lg sm:text-xl lg:text-2xl hover:text-gray-300 transition-colors text-center sm:text-left"
                  >
                     Consultas
                  </a>
               </nav>
            </div>

            {/* Imagen lateral */}
            <div className="w-full lg:w-1/2 h-64 sm:h-80 lg:h-auto">
               <img
                  src="/hero-2.jpg"
                  alt="Aurora Hotel"
                  className="w-full h-full object-cover"
               />
            </div>
         </div>
      </footer>
   );
}
