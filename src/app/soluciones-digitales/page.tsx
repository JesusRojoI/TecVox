'use client'

import React from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import ServicesAccordion from '@/components/sections/ServicesAccordion'

export default function SolucionesDigitalesPage() {
  const { t } = useLanguage()

  return (
    <>
      <section className="relative pt-32 pb-16 bg-tecvox-black overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-tecvox-blue/10 to-transparent"></div>
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center">
            <p className="text-tecvox-blue-accent text-sm mb-2">{t.soluciones.breadcrumb.replace(/\//g, ' / ')}</p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">{t.soluciones.title}</h1>
            <p className="text-tecvox-gray text-lg">{t.soluciones.subtitle}</p>
            <h2 className="text-2xl md:text-3xl font-bold text-white mt-2">{t.soluciones.title2}</h2>
          </div>
        </div>
      </section>

      <section className="py-16 bg-tecvox-dark">
        <div className="max-w-7xl mx-auto px-4">
          <ServicesAccordion fullWidth />
        </div>
      </section>
    </>
  )
}