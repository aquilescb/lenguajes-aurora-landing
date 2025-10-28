"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation, EffectFade } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

export default function Hero() {
   const slides = [
      {
         id: 1,
         image: "/hero-1.jpeg",
         alt: "Aurora Hotel - Imagen 1",
      },
      {
         id: 2,
         image: "/hero-2.jpg",
         alt: "Aurora Hotel - Imagen 2",
      },
      {
         id: 3,
         image: "/hero-3.jpg",
         alt: "Aurora Hotel - Imagen 3",
      },
   ];

   return (
      <section className="relative h-[90vh] overflow-hidden">
         <Swiper
            modules={[Autoplay, Pagination, Navigation, EffectFade]}
            effect="fade"
            spaceBetween={0}
            slidesPerView={1}
            autoplay={{
               delay: 6000,
               disableOnInteraction: false,
            }}
            pagination={{
               clickable: true,
            }}
            navigation={true}
            loop={true}
            className="h-full w-full"
         >
            {slides.map((slide) => (
               <SwiperSlide key={slide.id}>
                  <div className="relative h-full w-full">
                     {/* Imagen con animación de zoom */}
                     <img
                        src={slide.image}
                        alt={slide.alt}
                        className="h-full w-full object-cover animate-zoom-slow"
                     />
                     <div className="absolute inset-0 bg-black/45"></div>
                  </div>
               </SwiperSlide>
            ))}
         </Swiper>

         {/* Contenido centrado */}
         <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-10">
            <h1 className="text-5xl md:text-7xl font-bold text-white drop-shadow-lg mb-6 animate-fade-in">
               Bienvenido a Aurora
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 animate-fade-in delay-300">
               Tu escondite frente al mar. Diseño, calma y detalles que
               importan.
            </p>
            <div className="flex flex-wrap justify-center gap-3 mb-8 animate-fade-in delay-500">
               <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-white md:text-base">
                  Desayuno Americano
               </span>
               <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-white md:text-base">
                  Vista al Mar
               </span>
               <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-white md:text-base">
                  Check-in 24/7
               </span>
               <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-white md:text-base">
                  Wi-Fi gratis
               </span>
               <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-white md:text-base">
                  Servicio de Buffet
               </span>
            </div>
         </div>
      </section>
   );
}
