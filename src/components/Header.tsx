'use client'

import { useState, useEffect } from 'react'

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [isTransitioning, setIsTransitioning] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 100
      
      if (scrolled && !isScrolled && !isTransitioning) {
        setIsTransitioning(true)
        setIsVisible(false)
        
        setTimeout(() => {
          setIsScrolled(true)
          setIsVisible(true)
        }, 200)
        
        setTimeout(() => {
          setIsTransitioning(false)
        }, 600)
      } else if (!scrolled && isScrolled && !isTransitioning) {
        setIsScrolled(false)
        setIsVisible(true)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isScrolled, isTransitioning])

  return (
    <nav
      className={`fixed left-0 right-0 z-50 font-semibold transition-all duration-300 ${
        isScrolled
          ? 'bg-white shadow-lg mx-4 mt-4 rounded-full max-w-6xl left-1/2 transform -translate-x-1/2'
          : 'bg-[var(--nav-dark)] w-full top-0'
      } ${
        isVisible 
          ? (isScrolled ? 'top-4 translate-y-0' : 'top-0 translate-y-0')
          : 'translate-y-[-100px] opacity-0'
      }`}
    >
      <div className={`px-6 py-4 ${isScrolled ? '' : 'max-w-7xl mx-auto'}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div
              className={`${
                isScrolled
                  ? 'w-12 h-12 rounded-full flex items-center justify-center p-2'
                  : 'flex items-center'
              }`}
            >
              <img
                src={isScrolled ? '/logo-azul.png' : '/logo-blanco.png'}
                alt="Aurora Hotel Logo"
                className={`${
                  isScrolled 
                    ? 'w-8 h-8 object-contain' 
                    : 'h-10 object-contain'
                }`}
              />
            </div>
          </div>

          <div className="flex items-center space-x-8">
            <div
              className="flex items-center space-x-6"
            >
              <a
                href="/"
                className={`transition-colors ${
                  isScrolled
                    ? 'text-gray-800 hover:text-[var(--cta-blue)]'
                    : 'text-white hover:text-gray-300'
                }`}
              >
                Hotel
              </a>
              <a
                href="#"
                className={`transition-colors ${
                  isScrolled
                    ? 'text-gray-800 hover:text-[var(--cta-blue)]'
                    : 'text-white hover:text-gray-300'
                }`}
              >
                Somos Aurora
              </a>
              <a
                href="#"
                className={`transition-colors ${
                  isScrolled
                    ? 'text-gray-800 hover:text-[var(--cta-blue)]'
                    : 'text-white hover:text-gray-300'
                }`}
              >
                Disponibilidad
              </a>
            </div>

            <a
              href="/reservar"
              className="bg-[var(--cta-blue)] text-white px-6 py-3 rounded-full hover:bg-blue-600 transition-colors"
            >
              Reservar
            </a>
          </div>
        </div>
      </div>
    </nav>
  )
}
