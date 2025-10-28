"use client";

import { useState, useEffect } from "react";

export default function Header() {
   const [isScrolled, setIsScrolled] = useState(false);
   const [isVisible, setIsVisible] = useState(true);
   const [isTransitioning, setIsTransitioning] = useState(false);
   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

   useEffect(() => {
      const handleScroll = () => {
         const scrolled = window.scrollY > 100;

         if (scrolled && !isScrolled && !isTransitioning) {
            setIsTransitioning(true);
            setIsVisible(false);

            setTimeout(() => {
               setIsScrolled(true);
               setIsVisible(true);
            }, 200);

            setTimeout(() => {
               setIsTransitioning(false);
            }, 600);
         } else if (!scrolled && isScrolled && !isTransitioning) {
            setIsScrolled(false);
            setIsVisible(true);
         }
      };

      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
   }, [isScrolled, isTransitioning]);

   // Cerrar menú móvil al hacer scroll
   useEffect(() => {
      const handleScroll = () => {
         if (isMobileMenuOpen) {
            setIsMobileMenuOpen(false);
         }
      };

      if (isMobileMenuOpen) {
         window.addEventListener("scroll", handleScroll);
         // Prevenir scroll del body cuando el menú está abierto
         document.body.style.overflow = "hidden";
      } else {
         document.body.style.overflow = "unset";
      }

      return () => {
         window.removeEventListener("scroll", handleScroll);
         document.body.style.overflow = "unset";
      };
   }, [isMobileMenuOpen]);

   const toggleMobileMenu = () => {
      setIsMobileMenuOpen(!isMobileMenuOpen);
   };

   const closeMobileMenu = () => {
      setIsMobileMenuOpen(false);
   };

   return (
      <>
         <nav
            className={`fixed left-0 right-0 z-50 font-semibold transition-all duration-300 ${
               isScrolled
                  ? "bg-white shadow-lg mx-4 mt-4 rounded-full max-w-6xl left-1/2 transform -translate-x-1/2"
                  : "bg-[var(--nav-dark)] w-full top-0"
            } ${
               isVisible
                  ? isScrolled
                     ? "top-4 translate-y-0"
                     : "top-0 translate-y-0"
                  : "translate-y-[-100px] opacity-0"
            }`}
         >
            <div
               className={`px-6 py-4 ${isScrolled ? "" : "max-w-7xl mx-auto"}`}
            >
               <div className="flex items-center justify-between">
                  {/* Logo */}
                  <div className="flex items-center">
                     <div
                        className={`${
                           isScrolled
                              ? "w-12 h-12 rounded-full flex items-center justify-center p-2"
                              : "flex items-center"
                        }`}
                     >
                        <img
                           src={
                              isScrolled ? "/logo-azul.png" : "/logo-blanco.png"
                           }
                           alt="Aurora Hotel Logo"
                           className={`${
                              isScrolled
                                 ? "w-8 h-8 object-contain"
                                 : "h-10 object-contain"
                           }`}
                        />
                     </div>
                  </div>

                  {/* Desktop Navigation */}
                  <div className="hidden xl:flex items-center space-x-8">
                     <div className="flex items-center space-x-6">
                        <a
                           href="/"
                           className={`transition-colors ${
                              isScrolled
                                 ? "text-gray-800 hover:text-[var(--cta-blue)]"
                                 : "text-white hover:text-gray-300"
                           }`}
                        >
                           Hotel
                        </a>
                        <a
                           href="#somos-aurora"
                           className={`transition-colors ${
                              isScrolled
                                 ? "text-gray-800 hover:text-[var(--cta-blue)]"
                                 : "text-white hover:text-gray-300"
                           }`}
                        >
                           Somos Aurora
                        </a>
                        <a
                           href="#disponibilidad"
                           className={`transition-colors ${
                              isScrolled
                                 ? "text-gray-800 hover:text-[var(--cta-blue)]"
                                 : "text-white hover:text-gray-300"
                           }`}
                        >
                           Disponibilidad
                        </a>
                        <a
                           href="/consultas"
                           className={`transition-colors ${
                              isScrolled
                                 ? "text-gray-800 hover:text-[var(--cta-blue)]"
                                 : "text-white hover:text-gray-300"
                           }`}
                        >
                           Consultas
                        </a>
                     </div>

                     <a
                        href="/reservar"
                        className="bg-[var(--cta-blue)] text-white px-6 py-3 rounded-full hover:bg-blue-600 transition-colors"
                     >
                        Reservar
                     </a>
                  </div>

                  {/* Mobile Menu Button */}
                  <button
                     onClick={toggleMobileMenu}
                     className="xl:hidden p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                     aria-label="Abrir menú"
                  >
                     <div className="space-y-1">
                        <span
                           className={`block w-6 h-0.5 transition-all duration-300 ${
                              isScrolled ? "bg-gray-800" : "bg-white"
                           } ${
                              isMobileMenuOpen
                                 ? "rotate-45 translate-y-1.5"
                                 : ""
                           }`}
                        />
                        <span
                           className={`block w-6 h-0.5 transition-all duration-300 ${
                              isScrolled ? "bg-gray-800" : "bg-white"
                           } ${isMobileMenuOpen ? "opacity-0" : ""}`}
                        />
                        <span
                           className={`block w-6 h-0.5 transition-all duration-300 ${
                              isScrolled ? "bg-gray-800" : "bg-white"
                           } ${
                              isMobileMenuOpen
                                 ? "-rotate-45 -translate-y-1.5"
                                 : ""
                           }`}
                        />
                     </div>
                  </button>
               </div>
            </div>
         </nav>

         {/* Mobile Menu Overlay */}
         {isMobileMenuOpen && (
            <div
               className="fixed inset-0 backdrop-blur-sm bg-white/10 z-40 xl:hidden"
               onClick={closeMobileMenu}
            />
         )}

         {/* Mobile Menu */}
         <div
            className={`fixed top-0 right-0 h-full w-80 bg-white shadow-xl transform transition-transform duration-300 ease-in-out z-50 xl:hidden ${
               isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
            }`}
         >
            <div className="flex flex-col h-full">
               {/* Mobile Menu Header */}
               <div className="flex items-center justify-between p-6 border-b border-gray-200">
                  <div className="flex items-center space-x-3">
                     <img
                        src="/logo-azul.png"
                        alt="Aurora Hotel Logo"
                        className="h-8 w-8 object-contain"
                     />
                     <span className="text-xl font-bold text-gray-800">
                        Aurora Hotel
                     </span>
                  </div>
                  <button
                     onClick={closeMobileMenu}
                     className="p-2 rounded-md text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
                     aria-label="Cerrar menú"
                  >
                     <svg
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                     >
                        <path
                           strokeLinecap="round"
                           strokeLinejoin="round"
                           strokeWidth={2}
                           d="M6 18L18 6M6 6l12 12"
                        />
                     </svg>
                  </button>
               </div>

               {/* Mobile Menu Navigation */}
               <nav className="flex-1 px-6 py-6 space-y-6">
                  <a
                     href="/"
                     onClick={closeMobileMenu}
                     className="block text-lg font-medium text-gray-800 hover:text-[var(--cta-blue)] transition-colors"
                  >
                     Hotel
                  </a>
                  <a
                     href="#somos-aurora"
                     onClick={closeMobileMenu}
                     className="block text-lg font-medium text-gray-800 hover:text-[var(--cta-blue)] transition-colors"
                  >
                     Somos Aurora
                  </a>
                  <a
                     href="#disponibilidad"
                     onClick={closeMobileMenu}
                     className="block text-lg font-medium text-gray-800 hover:text-[var(--cta-blue)] transition-colors"
                  >
                     Disponibilidad
                  </a>
                  <a
                     href="/consultas"
                     onClick={closeMobileMenu}
                     className="block text-lg font-medium text-gray-800 hover:text-[var(--cta-blue)] transition-colors"
                  >
                     Consultas
                  </a>
               </nav>

               {/* Mobile Menu CTA */}
               <div className="p-6 border-t border-gray-200">
                  <a
                     href="/reservar"
                     onClick={closeMobileMenu}
                     className="block w-full bg-[var(--cta-blue)] text-white text-center px-6 py-3 rounded-full hover:bg-blue-600 transition-colors font-medium"
                  >
                     Reservar
                  </a>
               </div>
            </div>
         </div>
      </>
   );
}
