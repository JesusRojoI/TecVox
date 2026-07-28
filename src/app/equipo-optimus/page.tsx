'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useLanguage } from '@/contexts/LanguageContext'
import { FaArrowRight, FaUsers, FaBuilding, FaCogs } from 'react-icons/fa'
import ValuesSection from '@/components/sections/ValuesSection'
import ContactForm from '@/components/sections/ContactForm'

export default function EquipoOptimusPage() {
  const { t, language } = useLanguage()

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-16 bg-tecvox-black overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-tecvox-blue/10 to-transparent"></div>
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <p className="text-tecvox-blue-accent text-sm mb-2">{t.equipo.breadcrumb.replace(/\//g, ' / ')}</p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">{t.equipo.title}</h1>
        </div>
      </section>

      {/* Hero Content */}
      <section className="py-16 bg-tecvox-dark">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 animate-fade-in-up">
              <span className="text-tecvox-blue-accent font-semibold">{t.equipo.hero}</span>
              <h2 className="text-3xl md:text-4xl font-bold text-white">{t.equipo.heroDescription}</h2>
              <p className="text-tecvox-gray text-lg">{t.equipo.heroSub}</p>
              <Link href="/#contacto" className="btn-primary inline-flex items-center gap-2">
                <FaArrowRight className="w-4 h-4" />
                {t.equipo.cta}
              </Link>
            </div>
            <div className="relative h-[400px] rounded-2xl overflow-hidden animate-fade-in-right">
              <Image
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=800&fit=crop"
                alt="Team"
                width={600}
                height={800}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Solutions */}
      <section className="py-16 bg-tecvox-black">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative h-[400px] rounded-2xl overflow-hidden order-last lg:order-first animate-fade-in-up">
              <Image
                src="https://images.unsplash.com/photo-1553877522-43269d4ea984?w=600&h=800&fit=crop"
                alt="Solutions"
                width={600}
                height={800}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="space-y-6 animate-fade-in-right">
              <div className="inline-flex items-center gap-2 bg-tecvox-blue/20 rounded-full px-4 py-1.5">
                <FaCogs className="text-tecvox-blue-accent w-4 h-4" />
                <span className="text-tecvox-blue-pale text-sm">{t.equipo.solutions}</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white">{t.equipo.solutionsTitle}</h2>
              <p className="text-tecvox-gray text-lg">{t.equipo.solutionsDescription}</p>
              
              <div className="grid grid-cols-3 gap-4 pt-4">
                <div className="text-center">
                  <div className="w-16 h-16 bg-tecvox-blue/20 rounded-full flex items-center justify-center mx-auto mb-2">
                    <FaUsers className="w-8 h-8 text-tecvox-blue-accent" />
                  </div>
                  <span className="text-tecvox-blue-accent font-bold text-2xl">50+</span>
                  <p className="text-tecvox-gray text-xs">{language === 'en' ? 'Clients' : 'Clientes'}</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-tecvox-blue/20 rounded-full flex items-center justify-center mx-auto mb-2">
                    <FaBuilding className="w-8 h-8 text-tecvox-blue-accent" />
                  </div>
                  <span className="text-tecvox-blue-accent font-bold text-2xl">100+</span>
                  <p className="text-tecvox-gray text-xs">{language === 'en' ? 'Projects' : 'Proyectos'}</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-tecvox-blue/20 rounded-full flex items-center justify-center mx-auto mb-2">
                    <FaCogs className="w-8 h-8 text-tecvox-blue-accent" />
                  </div>
                  <span className="text-tecvox-blue-accent font-bold text-2xl">24/7</span>
                  <p className="text-tecvox-gray text-xs">{language === 'en' ? 'Support' : 'Soporte'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Valores (reutilizado) */}
      <ValuesSection />

      {/* Contacto (reutilizado) */}
      <ContactForm />
    </>
  )
}