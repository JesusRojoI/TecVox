'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useLanguage } from '@/contexts/LanguageContext'
import { FaDesktop, FaServer, FaChartLine, FaArrowRight } from 'react-icons/fa'

interface ServiceCard {
  key: string
  title: string
  icon: React.ReactNode
  image: string
  link: string
}

export default function ServicesSection() {
  const { t } = useLanguage()
  const [activeIndex, setActiveIndex] = useState(0)

  const services: ServiceCard[] = [
    {
      key: 'card1',
      title: t.home.services.card1,
      icon: <FaServer className="w-6 h-6" />,
      image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=500&h=400&fit=crop',
      link: '/soluciones-digitales/mantenimiento-de-sistemas-ti',
    },
    {
      key: 'card2',
      title: t.home.services.card2,
      icon: <FaDesktop className="w-6 h-6" />,
image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=500&h=400&fit=crop',
      link: '/soluciones-digitales/mantenimiento-de-equipos-de-computo',
    },
    {
      key: 'card3',
      title: t.home.services.card3,
      icon: <FaChartLine className="w-6 h-6" />,
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=400&fit=crop',
      link: '/soluciones-digitales/consultoria-tecnologica',
    },
  ]

  return (
    <section className="section-padding bg-tecvox-dark relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-tecvox-blue/5 rounded-full blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Columna de texto */}
          <div className="space-y-6 animate-fade-in-up">
            <span className="text-tecvox-blue-accent font-semibold text-sm uppercase tracking-wider">
              {t.home.services.title}
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
              {t.home.services.subtitle}
            </h2>
            <p className="text-tecvox-gray text-lg leading-relaxed">
              {t.home.services.description}
            </p>
            <Link href="/planes-optimus" className="btn-primary inline-flex items-center gap-2">
              <FaArrowRight className="w-4 h-4" />
              {t.home.services.cta}
            </Link>
          </div>

          {/* Columna de tarjetas - Acordeón horizontal */}
          <div className="flex gap-4 h-[400px] animate-fade-in-right">
            {services.map((service, index) => (
              <Link
                key={service.key}
                href={service.link}
                className={`relative overflow-hidden rounded-2xl cursor-pointer transition-all duration-500 ease-in-out flex items-end group ${
                  activeIndex === index ? 'flex-[3]' : 'flex-[1]'
                }`}
                onMouseEnter={() => setActiveIndex(index)}
              >
                {/* Imagen de fondo */}
                <Image
                  src={service.image}
                  alt={service.title}
                  width={500}
                  height={400}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                
                {/* Overlay gradiente */}
                <div className="absolute inset-0 bg-gradient-to-t from-tecvox-black via-tecvox-black/60 to-transparent"></div>
                <div className="absolute inset-0 bg-tecvox-blue/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Contenido */}
                <div className="relative z-10 p-6 w-full">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-tecvox-blue rounded-lg flex items-center justify-center text-white">
                      {service.icon}
                    </div>
                    <h3 className="text-white font-bold text-lg whitespace-nowrap">
                      {service.title}
                    </h3>
                  </div>
                  {activeIndex === index && (
                    <p className="text-tecvox-gray-light text-sm mt-2 animate-fade-in-up">
                      Click para más información
                    </p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}