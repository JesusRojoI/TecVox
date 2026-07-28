'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useLanguage } from '@/contexts/LanguageContext'
import { FaArrowRight, FaCheckCircle } from 'react-icons/fa'

export default function CommitmentSection() {
  const { t, language } = useLanguage()

  const features = [
    language === 'en' ? 'Highly trained professionals' : 'Profesionales altamente capacitados',
    language === 'en' ? 'Proven experience in the sector' : 'Experiencia comprobada en el sector',
    language === 'en' ? 'Passion for technology' : 'Pasión por la tecnología',
    language === 'en' ? 'Exceptional results guaranteed' : 'Resultados excepcionales garantizados',
  ]

  return (
    <section className="section-padding bg-tecvox-darker relative overflow-hidden">
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-tecvox-blue/5 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-5 gap-12 items-center">
          {/* Imagen - 40% */}
          <div className="lg:col-span-2 animate-fade-in-right">
            <div className="relative">
              <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=800&fit=crop"
                  alt="Professional team"
                  width={600}
                  height={800}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-tecvox-black/80 to-transparent"></div>
              </div>
            </div>
          </div>

          {/* Texto - 60% */}
          <div className="lg:col-span-3 space-y-6 animate-fade-in-up">
            <span className="text-tecvox-blue-accent font-semibold text-sm uppercase tracking-wider">
              {t.home.commitment.title}
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
              {t.home.commitment.subtitle}
            </h2>
            <p className="text-tecvox-gray text-lg leading-relaxed">
              {t.home.commitment.description}
            </p>

            <div className="grid sm:grid-cols-2 gap-4 pt-4">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <FaCheckCircle className="text-tecvox-blue-accent w-5 h-5 flex-shrink-0" />
                  <span className="text-tecvox-gray-light">{feature}</span>
                </div>
              ))}
            </div>

            <Link href="/planes-optimus" className="btn-primary inline-flex items-center gap-2 mt-4">
              <FaArrowRight className="w-4 h-4" />
              {t.home.commitment.cta}
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}