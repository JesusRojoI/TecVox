'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useLanguage } from '@/contexts/LanguageContext'
import { HiPhone, HiMail } from 'react-icons/hi'
import { FaShieldAlt, FaHeadset, FaCogs } from 'react-icons/fa'

export default function HeroSection() {
  const { t, language } = useLanguage()

  return (
    <section className="min-h-screen flex items-center relative overflow-hidden pt-24 pb-16">
      {/* Fondo con efecto */}
      <div className="absolute inset-0 bg-gradient-to-br from-tecvox-black via-tecvox-darker to-tecvox-blue/5"></div>
      <div className="absolute top-20 right-0 w-96 h-96 bg-tecvox-blue/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-0 w-72 h-72 bg-tecvox-blue-light/5 rounded-full blur-3xl"></div>
      
      {/* Grid decorativo */}
      <div className="absolute inset-0 opacity-5">
        <div className="h-full w-full" style={{ backgroundImage: 'radial-gradient(circle, #3b82f6 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Columna de texto */}
          <div className="space-y-8 animate-fade-in-up">
            <div className="inline-flex items-center gap-2 bg-tecvox-blue/20 border border-tecvox-blue/30 rounded-full px-4 py-1.5">
              <FaShieldAlt className="text-tecvox-blue-accent w-4 h-4" />
              <span className="text-tecvox-blue-pale text-sm font-medium">{t.home.hero.title}</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight">
              <span className="text-white">{t.home.hero.subtitle.split(' ').slice(0, 2).join(' ')}</span>
              <br />
              <span className="gradient-text">{t.home.hero.subtitle.split(' ').slice(2).join(' ')}</span>
            </h1>
            
            <p className="text-tecvox-gray text-lg max-w-lg">
              {language === 'en' 
                ? 'We keep your technological infrastructure in optimal conditions with comprehensive solutions and certified professionals.'
                : 'Conservamos tu infraestructura tecnológica en condiciones óptimas mediante soluciones integrales y personal certificado.'
              }
            </p>

            <Link href="/planes-optimus" className="btn-primary inline-flex items-center gap-2 text-lg px-8 py-4">
              <FaCogs className="w-5 h-5" />
              {t.home.hero.cta}
            </Link>

            <div className="flex flex-wrap items-center gap-6 pt-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-tecvox-blue/20 rounded-full flex items-center justify-center">
                  <HiPhone className="w-6 h-6 text-tecvox-blue-accent" />
                </div>
                <div>
                  <p className="text-tecvox-gray text-xs">{t.home.hero.call}</p>
                  <a href="tel:5552731980" className="text-white font-bold hover:text-tecvox-blue-accent transition-colors">55 5273 1980</a>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-tecvox-blue/20 rounded-full flex items-center justify-center">
                  <HiMail className="w-6 h-6 text-tecvox-blue-accent" />
                </div>
                <div>
                  <p className="text-tecvox-gray text-xs">{t.home.hero.write}</p>
                  <a href="mailto:atencion@tecvox.com.mx" className="text-white font-bold hover:text-tecvox-blue-accent transition-colors">atencion@tecvox.com.mx</a>
                </div>
              </div>
            </div>
          </div>

          {/* Columna de imagen */}
          <div className="relative animate-fade-in-right">
            <div className="relative w-full aspect-square max-w-lg mx-auto">
              {/* Círculo decorativo */}
              <div className="absolute inset-0 bg-gradient-to-br from-tecvox-blue to-tecvox-blue-light rounded-full opacity-20 blur-2xl"></div>
              <div className="absolute inset-4 bg-gradient-to-br from-tecvox-blue/30 to-tecvox-blue-light/10 rounded-full"></div>
              
              {/* Imagen principal */}
              <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-tecvox-blue/30 shadow-2xl shadow-tecvox-blue/20">
                <Image
                  src="https://images.unsplash.com/photo-1581092921461-eab62e97a780?w=600&h=600&fit=crop"
                  alt="TecVox IT Support"
                  width={500}
                  height={500}
                  className="object-cover w-full h-full"
                />
              </div>

              {/* Elementos flotantes */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-tecvox-blue rounded-2xl flex items-center justify-center animate-float shadow-lg">
                <FaHeadset className="w-10 h-10 text-white" />
              </div>
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-tecvox-blue-light rounded-xl flex items-center justify-center animate-float shadow-lg" style={{ animationDelay: '0.5s' }}>
                <FaShieldAlt className="w-8 h-8 text-white" />
              </div>
              <div className="absolute top-1/2 -right-8 w-12 h-12 bg-tecvox-blue-accent rounded-full flex items-center justify-center animate-float shadow-lg" style={{ animationDelay: '1s' }}>
                <FaCogs className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}