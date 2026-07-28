'use client'

import React from 'react'
import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'
import { useCart } from '@/contexts/CartContext'
import { useRouter } from 'next/navigation'
import { FaCheckCircle, FaArrowRight, FaStar, FaShieldAlt, FaCrown, FaGem } from 'react-icons/fa'
import { HiLightningBolt } from 'react-icons/hi'
import toast from 'react-hot-toast'

interface PlanProduct {
  key: string
  name: string
  price: number
  features: string[]
  icon?: React.ReactNode
  highlight?: boolean
}

export default function PlanesOptimusPage() {
  const { t, language } = useLanguage()
  const { addItem } = useCart()
  const router = useRouter()

  const planesData = t.planes.products as unknown as Record<string, { name: string; price: number; features: string[] }>

  const planes: PlanProduct[] = [
    { key: 'minisafe', ...planesData.minisafe, icon: <FaShieldAlt className="w-5 h-5" /> },
    { key: 'nanoprotect', ...planesData.nanoprotect, icon: <HiLightningBolt className="w-5 h-5" /> },
    { key: 'essentials', ...planesData.essentials, icon: <FaStar className="w-5 h-5" /> },
    { key: 'guardian', ...planesData.guardian, icon: <FaShieldAlt className="w-5 h-5" /> },
    { key: 'optimussafe', ...planesData.optimussafe, icon: <FaShieldAlt className="w-5 h-5" /> },
    { key: 'inicial', ...planesData.inicial, icon: <FaStar className="w-5 h-5" /> },
    { key: 'protege', ...planesData.protege, icon: <FaShieldAlt className="w-5 h-5" /> },
    { key: 'seguro', ...planesData.seguro, icon: <FaShieldAlt className="w-5 h-5" /> },
    { key: 'conecta', ...planesData.conecta, icon: <HiLightningBolt className="w-5 h-5" /> },
    { key: 'optimiza', ...planesData.optimiza, icon: <FaStar className="w-5 h-5" /> },
    { key: 'corporativo', ...planesData.corporativo, icon: <FaCrown className="w-5 h-5" /> },
    { key: 'titanium', ...planesData.titanium, icon: <FaGem className="w-5 h-5" /> },
    { key: 'platino', ...planesData.platino, icon: <FaCrown className="w-5 h-5" />, highlight: true },
    { key: 'zafiro', ...planesData.zafiro, icon: <FaGem className="w-5 h-5" /> },
    { key: 'diamante', ...planesData.diamante, icon: <FaGem className="w-5 h-5" />, highlight: true },
    { key: 'obsidiana', ...planesData.obsidiana, icon: <FaCrown className="w-5 h-5" />, highlight: true },
  ]

  const handleAddToCart = (plan: PlanProduct) => {
    addItem({
      productKey: plan.key,
      name: plan.name,
      price: plan.price,
      features: plan.features,
      quantity: 1,
    })
    toast.success(language === 'en' ? `${plan.name} added to cart!` : `¡${plan.name} agregado al carrito!`)
    router.push('/carrito')
  }

  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 bg-tecvox-black overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-tecvox-blue/10 to-transparent"></div>
        <div className="absolute top-20 right-0 w-96 h-96 bg-tecvox-blue/5 rounded-full blur-3xl"></div>
        
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center mb-8">
            <p className="text-tecvox-blue-accent text-sm mb-2">{t.planes.breadcrumb.replace(/\//g, ' / ')}</p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              {t.planes.title}
            </h1>
            <span className="text-tecvox-blue-accent font-semibold text-lg">{t.planes.subtitle}</span>
          </div>
        </div>
      </section>

      {/* Descripción */}
      <section className="py-16 bg-tecvox-dark">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">{t.planes.title2}</h2>
          <p className="text-tecvox-gray text-lg leading-relaxed">{t.planes.description}</p>
        </div>
      </section>

      {/* Grid de Planes */}
      <section className="py-16 bg-tecvox-black">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {planes.map((plan, index) => (
              <div
                key={plan.key}
                className={`relative rounded-2xl overflow-hidden transition-all duration-300 hover:transform hover:-translate-y-2 animate-fade-in-up ${
                  plan.highlight
                    ? 'bg-gradient-to-b from-tecvox-blue/20 to-tecvox-darker border-2 border-tecvox-blue shadow-xl shadow-tecvox-blue/20'
                    : 'bg-tecvox-darker border border-tecvox-blue/10'
                }`}
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                {plan.highlight && (
                  <div className="absolute top-4 right-4 bg-tecvox-blue text-white text-xs font-bold px-3 py-1 rounded-full">
                    {language === 'en' ? 'Popular' : 'Popular'}
                  </div>
                )}

                <div className="p-8">
                  {/* Icono y nombre */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      plan.highlight ? 'bg-tecvox-blue text-white' : 'bg-tecvox-blue/20 text-tecvox-blue-accent'
                    }`}>
                      {plan.icon}
                    </div>
                    <h3 className="text-xl font-bold text-white">{plan.name}</h3>
                  </div>

                  {/* Precio */}
                  <div className="mb-6">
                    <span className="text-4xl font-extrabold text-white">
                      ${plan.price.toLocaleString('es-MX')}
                    </span>
                    <span className="text-tecvox-gray ml-2">
                      {t.planes.iva}
                    </span>
                  </div>

                  {/* Características */}
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <FaCheckCircle className="w-5 h-5 text-tecvox-blue-accent mt-0.5 flex-shrink-0" />
                        <span className="text-tecvox-gray text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Botón */}
                  <button
                    onClick={() => handleAddToCart(plan)}
                    className={`w-full py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
                      plan.highlight
                        ? 'bg-tecvox-blue hover:bg-tecvox-blue-light text-white'
                        : 'bg-tecvox-blue/20 hover:bg-tecvox-blue/30 text-tecvox-blue-accent border border-tecvox-blue/30'
                    }`}
                  >
                    <FaArrowRight className="w-4 h-4" />
                    {t.planes.cta}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Plan Personalizado */}
      <section className="py-16 bg-tecvox-darker relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-tecvox-blue to-transparent"></div>
        <div className="absolute inset-0 opacity-5">
          <div className="h-full w-full" style={{ backgroundImage: 'radial-gradient(circle, #3b82f6 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
        </div>

        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-tecvox-blue/20 border border-tecvox-blue/30 rounded-full px-4 py-1.5 mb-6">
            <FaStar className="text-tecvox-blue-accent w-4 h-4" />
            <span className="text-tecvox-blue-pale text-sm font-medium">{t.planes.personalizado.title}</span>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">{t.planes.personalizado.description}</h2>
          <p className="text-tecvox-gray text-lg mb-8">{t.planes.personalizado.subdescription}</p>

          <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto mb-10">
            <div className="glass rounded-2xl p-6 text-left">
              <h3 className="text-white font-bold text-lg mb-2">{t.planes.personalizado.hasQuote}</h3>
              <p className="text-tecvox-gray text-sm mb-4">{t.planes.personalizado.hasQuoteDescription}</p>
              <Link href="/plan-a-la-medida" className="btn-primary inline-flex items-center gap-2 w-full justify-center">
                <FaArrowRight className="w-4 h-4" />
                {t.planes.personalizado.payment}
              </Link>
            </div>
            <div className="glass rounded-2xl p-6 text-left">
              <h3 className="text-white font-bold text-lg mb-2">{t.planes.personalizado.noQuote}</h3>
              <p className="text-tecvox-gray text-sm mb-4">{t.planes.personalizado.noQuoteDescription}</p>
              <Link href="/#contacto" className="btn-outline inline-flex items-center gap-2 w-full justify-center">
                <FaArrowRight className="w-4 h-4" />
                {t.planes.personalizado.contact}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}