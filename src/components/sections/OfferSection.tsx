'use client'

import React from 'react'
import Image from 'next/image'
import { useLanguage } from '@/contexts/LanguageContext'
import { FaCheckCircle, FaShieldAlt, FaSync, FaHeadset } from 'react-icons/fa'

export default function OfferSection() {
  const { t } = useLanguage()

  const features = [
    {
      icon: <FaSync className="w-6 h-6" />,
      title: 'Actualización de software',
      description: 'Mantenemos tus sistemas al día con las últimas versiones y parches de seguridad.',
    },
    {
      icon: <FaShieldAlt className="w-6 h-6" />,
      title: 'Reparación de hardware',
      description: 'Diagnóstico y reparación profesional de todos tus equipos de cómputo.',
    },
    {
      icon: <FaHeadset className="w-6 h-6" />,
      title: 'Monitoreo continuo',
      description: 'Vigilancia 24/7 para detectar y prevenir fallas antes de que ocurran.',
    },
  ]

  return (
    <section className="section-padding bg-tecvox-black relative overflow-hidden">
      <div className="absolute top-0 right-0 w-80 h-80 bg-tecvox-blue/5 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Columna de texto */}
          <div className="space-y-6 animate-fade-in-up">
            <span className="text-tecvox-blue-accent font-semibold text-sm uppercase tracking-wider">
              {t.home.offer.title}
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
              {t.home.offer.subtitle}
            </h2>
            <p className="text-tecvox-gray text-lg leading-relaxed">
              {t.home.offer.description}
            </p>

            <div className="space-y-4 pt-4">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start gap-4 glass-light rounded-xl p-4">
                  <div className="w-12 h-12 bg-tecvox-blue/20 rounded-lg flex items-center justify-center text-tecvox-blue-accent flex-shrink-0">
                    {feature.icon}
                  </div>
                  <div>
                    <h4 className="text-white font-semibold">{feature.title}</h4>
                    <p className="text-tecvox-gray text-sm">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Columna de imagen */}
          <div className="animate-fade-in-right">
            <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1581092921461-eab62e97a780?w=600&h=800&fit=crop"
                alt="IT Maintenance"
                width={600}
                height={800}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-tecvox-black/60 to-transparent"></div>
              
              {/* Stats flotantes */}
              
              <div className="absolute bottom-6 left-6 bg-tecvox-black/80 backdrop-blur-sm rounded-xl p-4 text-white text-center shadow-xl">
                <span className="text-3xl font-bold block">24/7</span>
                <span className="text-sm">Soporte</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}