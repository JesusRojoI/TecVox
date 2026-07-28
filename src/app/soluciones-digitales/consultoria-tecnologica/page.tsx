'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useLanguage } from '@/contexts/LanguageContext'
import { FaServer, FaDesktop, FaChartLine, FaArrowRight, FaLightbulb, FaCogs, FaUsers } from 'react-icons/fa'

export default function ConsultoriaPage() {
  const { t, language } = useLanguage()
  const content = t.consultoria.content as unknown as Record<string, { title: string; description: string }>

  const accordionItems = [
    { label: t.mantenimiento_sistemas.accordion1, href: '/soluciones-digitales/mantenimiento-de-sistemas-ti' },
    { label: t.mantenimiento_sistemas.accordion2, href: '/soluciones-digitales/mantenimiento-de-equipos-de-computo' },
    { label: t.mantenimiento_sistemas.accordion3, href: '#', active: true },
  ]

  return (
    <>
      <section className="relative pt-32 pb-16 bg-tecvox-black overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-tecvox-blue/10 to-transparent"></div>
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <p className="text-tecvox-blue-accent text-sm mb-2">{t.consultoria.breadcrumb.replace(/\//g, ' / ')}</p>
          <h1 className="text-4xl md:text-5xl font-bold text-white">{t.consultoria.title}</h1>
        </div>
      </section>

      <section className="py-16 bg-tecvox-dark">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-4 gap-8">
            <div className="lg:col-span-1">
              <div className="glass rounded-2xl overflow-hidden">
                {accordionItems.map((item, index) => (
                  <Link
                    key={index}
                    href={item.href}
                    className={`block p-4 border-b border-tecvox-blue/10 transition-all ${
                      item.active
                        ? 'bg-tecvox-blue/20 text-white font-bold'
                        : 'text-tecvox-gray hover:text-tecvox-blue-accent hover:bg-tecvox-blue/5'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {index === 0 && <FaServer className="w-4 h-4" />}
                      {index === 1 && <FaDesktop className="w-4 h-4" />}
                      {index === 2 && <FaChartLine className="w-4 h-4 text-tecvox-blue-accent" />}
                      <span className="text-sm">{item.label}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            <div className="lg:col-span-3 space-y-8">
              <h2 className="text-3xl font-bold text-white">{content.title.title}</h2>

              <div className="space-y-6">
                <div className="glass rounded-xl p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-tecvox-blue/20 rounded-xl flex items-center justify-center text-tecvox-blue-accent flex-shrink-0">
                      <FaLightbulb className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-white font-bold mb-2">{content.evaluacion.title}</h3>
                      <p className="text-tecvox-gray text-sm">{content.evaluacion.description}</p>
                    </div>
                  </div>
                </div>

                <div className="glass rounded-xl p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-tecvox-blue/20 rounded-xl flex items-center justify-center text-tecvox-blue-accent flex-shrink-0">
                      <FaChartLine className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-white font-bold mb-2">{content.planificacion.title}</h3>
                      <p className="text-tecvox-gray text-sm">{content.planificacion.description}</p>
                    </div>
                  </div>
                </div>

                <div className="glass rounded-xl p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-tecvox-blue/20 rounded-xl flex items-center justify-center text-tecvox-blue-accent flex-shrink-0">
                      <FaCogs className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-white font-bold mb-2">{content.implementacion.title}</h3>
                      <p className="text-tecvox-gray text-sm">{content.implementacion.description}</p>
                    </div>
                  </div>
                </div>

                <div className="glass rounded-xl p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-tecvox-blue/20 rounded-xl flex items-center justify-center text-tecvox-blue-accent flex-shrink-0">
                      <FaUsers className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-white font-bold mb-2">{content.capacitacion.title}</h3>
                      <p className="text-tecvox-gray text-sm">{content.capacitacion.description}</p>
                    </div>
                  </div>
                </div>

                <div className="glass rounded-xl p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-tecvox-blue/20 rounded-xl flex items-center justify-center text-tecvox-blue-accent flex-shrink-0">
                      <FaServer className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-white font-bold mb-2">{content.gestion.title}</h3>
                      <p className="text-tecvox-gray text-sm">{content.gestion.description}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="relative h-64 rounded-2xl overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop"
                    alt="Consulting"
                    width={600}
                    height={400}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="relative h-64 rounded-2xl overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&h=400&fit=crop"
                    alt="Business Meeting"
                    width={600}
                    height={400}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <Link href="/#contacto" className="btn-primary inline-flex items-center gap-2">
                  <FaArrowRight className="w-4 h-4" />
                  {t.consultoria.cta1}
                </Link>
                <Link href="/soluciones-digitales" className="btn-outline inline-flex items-center gap-2">
                  <FaArrowRight className="w-4 h-4" />
                  {t.consultoria.cta2}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}