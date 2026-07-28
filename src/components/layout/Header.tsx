'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useLanguage } from '@/contexts/LanguageContext'
import CartIcon from '@/components/ui/CartIcon'
import LanguageToggle from '@/components/ui/LanguageToggle'
import { HiMail, HiLocationMarker, HiPhone, HiMenu, HiX } from 'react-icons/hi'

export default function Header() {
  const { t } = useLanguage()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { href: '/', label: t.header.nav.dashboard },
    { href: '/equipo-optimus', label: t.header.nav.equipo },
    { href: '/soluciones-digitales', label: t.header.nav.soluciones },
    { href: '/planes-optimus', label: t.header.nav.planes },
    { href: '/optimus-conexion', label: t.header.nav.conexion },
  ]

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      {/* Top bar con información de contacto */}
      <div className={`${isScrolled ? 'h-0 overflow-hidden opacity-0' : 'h-auto opacity-100'} transition-all duration-300 bg-tecvox-darker border-b border-tecvox-blue/10`}>
        <div className="max-w-7xl mx-auto px-4 py-2 flex flex-wrap items-center justify-center md:justify-between gap-4 text-xs md:text-sm">
          <div className="flex items-center gap-2 text-tecvox-gray-light">
            <HiMail className="w-4 h-4 text-tecvox-blue-accent" />
            <a href="mailto:atencion@tecvox.com.mx" className="hover:text-tecvox-blue-accent transition-colors">
              {t.header.email}
            </a>
          </div>
          <div className="flex items-center gap-2 text-tecvox-gray-light">
            <HiLocationMarker className="w-4 h-4 text-tecvox-blue-accent" />
            <span>{t.header.address}</span>
          </div>
          <div className="flex items-center gap-2 text-tecvox-gray-light">
            <HiPhone className="w-4 h-4 text-tecvox-blue-accent" />
            <a href="tel:5552731980" className="hover:text-tecvox-blue-accent transition-colors">
              {t.header.phone}
            </a>
          </div>
        </div>
      </div>

      {/* Barra de navegación principal */}
      <div className={`${isScrolled ? 'bg-tecvox-black/95 shadow-lg shadow-tecvox-blue/5' : 'bg-tecvox-black/80'} backdrop-blur-md transition-all duration-300`}>
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group flex-shrink-0">
            <div className="relative w-12 h-12 md:w-14 md:h-14">
              <Image
                src="/logo.svg"
                alt="TecVox Logo"
                width={56}
                height={56}
                className="object-contain transition-transform duration-300 group-hover:scale-110"
              />
            </div>
          </Link>

          {/* Navegación desktop */}
          <nav className="hidden lg:flex items-center gap-1 mx-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-3 py-2 text-sm font-medium text-tecvox-gray-light hover:text-tecvox-blue-accent transition-colors duration-300 rounded-md hover:bg-tecvox-blue/10 relative group whitespace-nowrap"
              >
                {item.label}
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-tecvox-blue-accent transition-all duration-300 group-hover:w-3/4"></span>
              </Link>
            ))}
          </nav>

          {/* Acciones */}
          <div className="flex items-center gap-4 flex-shrink-0">
            <LanguageToggle />
            <CartIcon />
            
            {/* Botón menú móvil */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden text-tecvox-blue-accent hover:text-tecvox-blue-pale transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <HiX className="w-6 h-6" />
              ) : (
                <HiMenu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Menú móvil */}
        <div className={`lg:hidden transition-all duration-300 overflow-hidden ${isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
          <nav className="px-4 py-2 bg-tecvox-darker border-t border-tecvox-blue/10 flex flex-col gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-4 py-3 text-sm font-medium text-tecvox-gray-light hover:text-tecvox-blue-accent transition-colors rounded-md hover:bg-tecvox-blue/10"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  )
}