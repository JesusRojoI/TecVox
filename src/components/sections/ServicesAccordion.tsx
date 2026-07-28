'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useLanguage } from '@/contexts/LanguageContext'
import { FaDesktop, FaServer, FaChartLine } from 'react-icons/fa'

interface ServicesAccordionProps {
  fullWidth?: boolean
}

export default function ServicesAccordion({ fullWidth = false }: ServicesAccordionProps) {
  const { t } = useLanguage()
  const [activeIndex, setActiveIndex] = useState(0)

  const services = [
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
    <div className="flex flex-col md:flex-row gap-4 h-[400px]">
      {services.map((service, index) => (
        <Link
          key={service.key}
          href={service.link}
          className={`relative overflow-hidden rounded-2xl cursor-pointer transition-all duration-500 ease-in-out flex items-end group ${
            activeIndex === index ? 'flex-[3]' : 'flex-[1]'
          }`}
          onMouseEnter={() => setActiveIndex(index)}
        >
          <Image
            src={service.image}
            alt={service.title}
            width={500}
            height={400}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          
          <div className="absolute inset-0 bg-gradient-to-t from-tecvox-black via-tecvox-black/60 to-transparent"></div>
          <div className="absolute inset-0 bg-tecvox-blue/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          
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
                {t.home.services.description.substring(0, 80)}...
              </p>
            )}
          </div>
        </Link>
      ))}
    </div>
  )
}