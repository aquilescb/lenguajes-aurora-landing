'use client'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination, Navigation } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'


export default function Hero() {
  const slides = [
    {
      id: 1,
      image: '/hero-1.jpg',
      alt: 'Aurora Hotel - Imagen 1'
    },
    {
      id: 2,
      image: '/hero-2.jpg',
      alt: 'Aurora Hotel - Imagen 2'
    },
    {
      id: 3,
      image: '/hero-3.jpg',
      alt: 'Aurora Hotel - Imagen 3'
    }
  ]

  return (
    <section className="relative h-[80vh]">
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        spaceBetween={0}
        slidesPerView={1}
        autoplay={{
          delay: 5000,
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
              <img
                src={slide.image}
                alt={slide.alt}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40"></div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      
      <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
        <div className="text-center text-white">
          <h1 className="text-5xl md:text-7xl font-bold mb-4">
            Bienvenido a Aurora
          </h1>
          <p className="text-xl md:text-2xl opacity-90">
            Una experiencia única te espera
          </p>
        </div>
      </div>
    </section>
  )
}
