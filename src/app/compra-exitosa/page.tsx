'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'
import { useSearchParams } from 'next/navigation'
import { FaCheckCircle, FaArrowRight, FaShoppingBag, FaReceipt } from 'react-icons/fa'
import { HiDownload } from 'react-icons/hi'

export default function CompraExitosaPage() {
  const { t, language } = useLanguage()
  const searchParams = useSearchParams()
  const transactionId = searchParams.get('transactionId') || 'N/A'
  const total = searchParams.get('total') || '0'

  const [date, setDate] = useState('')

  useEffect(() => {
    const now = new Date()
    setDate(now.toLocaleDateString(language === 'en' ? 'en-US' : 'es-MX', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }))
  }, [language])

  return (
    <section className="min-h-screen pt-32 pb-16 bg-tecvox-black relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-tecvox-blue/10 to-transparent"></div>
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-tecvox-blue/5 rounded-full blur-3xl"></div>

      <div className="max-w-2xl mx-auto px-4 relative z-10">
        <div className="glass rounded-3xl p-8 md:p-12 text-center animate-fade-in-up">
          {/* Icono de éxito */}
          <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg shadow-green-500/20">
            <FaCheckCircle className="w-12 h-12 text-white" />
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {t.success.title}
          </h1>
          <p className="text-xl text-tecvox-blue-accent font-semibold mb-4">
            {t.success.subtitle}
          </p>
          <p className="text-tecvox-gray mb-8">
            {t.success.description}
          </p>

          {/* Recibo */}
          <div className="bg-tecvox-darker rounded-2xl p-6 mb-8 text-left">
            <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
              <FaReceipt className="text-tecvox-blue-accent" />
              {language === 'en' ? 'Receipt' : 'Recibo'}
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-tecvox-gray">{t.success.transaction}</span>
                <span className="text-white font-mono text-sm">{transactionId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-tecvox-gray">{t.success.date}</span>
                <span className="text-white">{date}</span>
              </div>
              <div className="border-t border-tecvox-blue/20 pt-3 flex justify-between">
                <span className="text-white font-bold">{t.success.total}</span>
                <span className="text-tecvox-blue-accent font-bold text-xl">
                  ${parseFloat(total).toLocaleString('es-MX', { minimumFractionDigits: 2 })}
                </span>
              </div>
            </div>
          </div>

          {/* Botones */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/" className="btn-primary inline-flex items-center justify-center gap-2">
              <FaShoppingBag className="w-4 h-4" />
              {t.success.cta}
            </Link>
            
          </div>
        </div>

        {/* Soporte */}
        <div className="text-center mt-8">
          <p className="text-tecvox-gray text-sm">
            {language === 'en' ? 'Need help? Contact us at' : '¿Necesitas ayuda? Contáctanos en'}{' '}
            <a href="mailto:atencion@tecvox.com.mx" className="text-tecvox-blue-accent hover:underline">
              atencion@tecvox.com.mx
            </a>
          </p>
        </div>
      </div>
    </section>
  )
}