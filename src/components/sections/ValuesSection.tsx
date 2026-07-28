'use client'

import React from 'react'
import Image from 'next/image'
import { useLanguage } from '@/contexts/LanguageContext'
import { FaBalanceScale, FaLightbulb, FaUsers, FaCheckCircle } from 'react-icons/fa'

export default function ValuesSection() {
  const { t } = useLanguage()

  const values = [
    {
      icon: <FaBalanceScale className="w-8 h-8" />,
      title: t.home.values.value1.title,
      description: t.home.values.value1.description,
    },
    {
      icon: <FaLightbulb className="w-8 h-8" />,
      title: t.home.values.value2.title,
      description: t.home.values.value2.description,
    },
    {
      icon: <FaUsers className="w-8 h-8" />,
      title: t.home.values.value3.title,
      description: t.home.values.value3.description,
    },
  ]

  return (
    <section className="section-padding bg-tecvox-black relative overflow-hidden">
      {/* Decoración de fondo */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-tecvox-blue/10 rounded-full"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-tecvox-blue/5 rounded-full"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Encabezado */}
        <div className="text-center mb-16 animate-fade-in-up">
          <span className="text-tecvox-blue-accent font-semibold text-sm uppercase tracking-wider">
            {t.home.values.title}
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mt-2">
            {t.home.values.subtitle}
          </h2>
        </div>

        {/* Grid de valores */}
        <div className="grid md:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <div
              key={index}
              className="glass rounded-2xl p-8 card-hover animate-fade-in-up"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="w-16 h-16 bg-tecvox-blue/20 rounded-xl flex items-center justify-center text-tecvox-blue-accent mb-6">
                {value.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-4">{value.title}</h3>
              <p className="text-tecvox-gray leading-relaxed">{value.description}</p>
            </div>
          ))}
        </div>

        {/* Imágenes decorativas */}
        <div className="grid md:grid-cols-3 gap-6 mt-16 animate-fade-in-up">
          <div className="relative h-48 rounded-2xl overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=500&h=300&fit=crop"
              alt="Team collaboration"
              width={500}
              height={300}
              className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-tecvox-blue/20"></div>
          </div>
          <div className="relative h-48 rounded-2xl overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1553877522-43269d4ea984?w=500&h=300&fit=crop"
              alt="Technology innovation"
              width={500}
              height={300}
              className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-tecvox-blue/20"></div>
          </div>
          <div className="relative h-48 rounded-2xl overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=500&h=300&fit=crop"
              alt="Client meeting"
              width={500}
              height={300}
              className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-tecvox-blue/20"></div>
          </div>
        </div>
      </div>
    </section>
  )
}