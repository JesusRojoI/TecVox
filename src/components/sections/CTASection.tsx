'use client'

import React from 'react'
import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'
import { FaArrowRight } from 'react-icons/fa'

export default function CTASection() {
  const { t } = useLanguage()

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Imagen de fondo con overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-fixed"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&h=600&fit=crop)',
        }}
      ></div>
      <div className="absolute inset-0 bg-gradient-to-r from-tecvox-black/95 via-tecvox-darker/90 to-tecvox-black/95"></div>
      <div className="absolute inset-0 bg-tecvox-blue/10"></div>

      {/* Patrón de puntos */}
      <div className="absolute inset-0 opacity-5">
        <div className="h-full w-full" style={{ backgroundImage: 'radial-gradient(circle, #3b82f6 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
      </div>

      <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-8 animate-fade-in-up">
          {t.home.cta.title}
        </h2>
        <Link
          href="/#equipo"
          className="btn-outline inline-flex items-center gap-2 text-lg px-8 py-4 animate-fade-in-up"
          style={{ animationDelay: '0.3s' }}
        >
          <FaArrowRight className="w-5 h-5" />
          {t.home.cta.cta}
        </Link>
      </div>
    </section>
  )
}