'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useLanguage } from '@/contexts/LanguageContext'
import { HiMail, HiLocationMarker, HiPhone } from 'react-icons/hi'

export default function Footer() {
  const { t } = useLanguage()
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-tecvox-darker border-t border-tecvox-blue/10">
      {/* Contenido principal del footer */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {/* Columna 1: Logo y descripción */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative w-14 h-14">
                <Image
                  src="/logo.svg"
                  alt="TecVox Logo"
                  width={56}
                  height={56}
                  className="object-contain transition-transform duration-300 group-hover:scale-110"
                />
              </div>
            </Link>
            <p className="text-tecvox-gray text-sm leading-relaxed">
              {t.footer.description}
            </p>
          </div>

          {/* Columna 2: Contacto */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white border-b border-tecvox-blue/30 pb-2 inline-block">
              {t.footer.contact}
            </h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3 text-tecvox-gray text-sm">
                <HiLocationMarker className="w-5 h-5 text-tecvox-blue-accent mt-0.5 flex-shrink-0" />
                <span>CALLE GENERAL JUAN CANO 87 INT 100, SAN MIGUEL CHAPULTEPEC II SECC, C.P.11850, CIUDAD DE MÉXICO</span>
              </div>
              <div className="flex items-center gap-3 text-tecvox-gray text-sm">
                <HiPhone className="w-5 h-5 text-tecvox-blue-accent flex-shrink-0" />
                <a href="tel:5552731980" className="hover:text-tecvox-blue-accent transition-colors">
                  55 5273 1980
                </a>
              </div>
              <div className="flex items-center gap-3 text-tecvox-gray text-sm">
                <HiMail className="w-5 h-5 text-tecvox-blue-accent flex-shrink-0" />
                <a href="mailto:atencion@tecvox.com.mx" className="hover:text-tecvox-blue-accent transition-colors">
                  atencion@tecvox.com.mx
                </a>
              </div>
            </div>
          </div>

          {/* Columna 3: Enlaces y tarjetas */}
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-white border-b border-tecvox-blue/30 pb-2 inline-block">
                {t.footer.links}
              </h3>
              <div className="grid grid-cols-1 gap-2">
                <Link href="/" className="text-tecvox-gray text-sm hover:text-tecvox-blue-accent transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-tecvox-blue-accent rounded-full"></span>
                  {t.footer.dashboard}
                </Link>
                <Link href="/equipo-optimus" className="text-tecvox-gray text-sm hover:text-tecvox-blue-accent transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-tecvox-blue-accent rounded-full"></span>
                  {t.footer.equipo}
                </Link>
                <Link href="/soluciones-digitales" className="text-tecvox-gray text-sm hover:text-tecvox-blue-accent transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-tecvox-blue-accent rounded-full"></span>
                  {t.footer.soluciones}
                </Link>
                <Link href="/planes-optimus" className="text-tecvox-gray text-sm hover:text-tecvox-blue-accent transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-tecvox-blue-accent rounded-full"></span>
                  {t.footer.planes}
                </Link>
              </div>
            </div>

            {/* Tarjetas aceptadas */}
            <div className="flex items-center gap-4">
              <div className="relative w-14 h-9 flex items-center">
                <Image
                  src="/mastercard.svg"
                  alt="Mastercard"
                  width={56}
                  height={36}
                  className="object-contain"
                />
              </div>
              <div className="relative w-14 h-9 flex items-center">
                <Image
                  src="/visa.svg"
                  alt="Visa"
                  width={56}
                  height={36}
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Barra inferior */}
      <div className="border-t border-tecvox-blue/10">
        <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-tecvox-gray text-sm text-center sm:text-left">
            {t.footer.rights}
          </p>
          <div className="flex items-center gap-4 text-sm text-tecvox-gray">
            <Link href="#" className="hover:text-tecvox-blue-accent transition-colors">
              {t.footer.privacy}
            </Link>
            <span className="text-tecvox-blue/30">|</span>
            <Link href="#" className="hover:text-tecvox-blue-accent transition-colors">
              {t.footer.terms}
            </Link>
            <span className="text-tecvox-blue/30">|</span>
            <Link href="#" className="hover:text-tecvox-blue-accent transition-colors">
              {t.footer.refund}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}