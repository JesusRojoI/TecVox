'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { useLanguage } from '@/contexts/LanguageContext'
import { useCart } from '@/contexts/CartContext'
import { useRouter } from 'next/navigation'
import { FaCartPlus, FaMinus, FaPlus, FaEnvelope } from 'react-icons/fa'
import toast from 'react-hot-toast'

export default function PlanALaMedidaPage() {
  const { t, language } = useLanguage()
  const { addItem } = useCart()
  const router = useRouter()

  const [folio, setFolio] = useState('')
  const [amount, setAmount] = useState(0)
  const [amountInput, setAmountInput] = useState('0')
  const [error, setError] = useState('')

  const updateAmount = (newValue: number) => {
    const rounded = Math.round(newValue * 100) / 100
    if (rounded >= 0) {
      setAmount(rounded)
      setAmountInput(rounded.toString())
    }
  }

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/[^0-9.]/g, '')
    
    // Evitar múltiples puntos decimales
    const parts = rawValue.split('.')
    let cleanValue = parts[0]
    if (parts.length > 1) {
      cleanValue += '.' + parts.slice(1).join('')
    }

    setAmountInput(cleanValue)
    const parsed = parseFloat(cleanValue)
    if (!isNaN(parsed) && parsed >= 0) {
      setAmount(parsed)
    } else if (cleanValue === '' || cleanValue === '.') {
      setAmount(0)
      setAmountInput('')
    }
  }

  const handleAmountBlur = () => {
    // Formatear al perder el foco
    if (amountInput === '' || amountInput === '.') {
      setAmount(0)
      setAmountInput('0')
    } else {
      const parsed = parseFloat(amountInput)
      if (!isNaN(parsed)) {
        const formatted = Math.round(parsed * 100) / 100
        setAmount(formatted)
        setAmountInput(formatted.toString())
      }
    }
  }

  const incrementAmount = () => updateAmount(amount + 1)
  const decrementAmount = () => updateAmount(Math.max(0, amount - 1))

  const handleAddToCart = () => {
    setError('')
    
    if (!folio.trim()) {
      setError(t.planPersonalizado.error)
      return
    }
    
    if (amount <= 0) {
      setError(t.planPersonalizado.error)
      return
    }

    addItem({
      name: `${t.planPersonalizado.title} - ${folio.trim()}`,
      price: amount,
      isCustom: true,
      folio: folio.trim(),
      quantity: 1,
    })

    toast.success(language === 'en' ? 'Custom plan added to cart!' : '¡Plan personalizado agregado al carrito!')
    router.push('/carrito')
  }

  const iva = amount * 0.16
  const total = amount + iva

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-16 bg-tecvox-black overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-tecvox-blue/10 to-transparent"></div>
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center">
            <p className="text-tecvox-blue-accent text-sm mb-2">{t.planPersonalizado.title}</p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white">{t.planPersonalizado.subtitle}</h1>
          </div>
        </div>
      </section>

      {/* Contenido principal */}
      <section className="py-16 bg-tecvox-dark">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-5 gap-12 items-center">
            {/* Imagen - 40% */}
            <div className="lg:col-span-2">
              <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&h=800&fit=crop"
                  alt="Plan Personalizado"
                  width={600}
                  height={800}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-tecvox-black/80 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-2xl font-bold text-white">{t.planPersonalizado.title}</h3>
                  <p className="text-tecvox-gray-light text-sm mt-1">{t.planPersonalizado.description}</p>
                </div>
              </div>
            </div>

            {/* Formulario - 60% */}
            <div className="lg:col-span-3 space-y-8">
              <div>
                <p className="text-tecvox-gray text-lg mb-2">{t.planPersonalizado.info}</p>
                <p className="text-tecvox-gray-light text-sm">
                  {t.planPersonalizado.help}{' '}
                  <a href="mailto:atencion@tecvox.com.mx" className="text-tecvox-blue-accent hover:underline">
                    atencion@tecvox.com.mx
                  </a>
                </p>
              </div>

              {/* Campo Folio */}
              <div>
                <label className="block text-tecvox-gray-light text-sm mb-2">* {t.planPersonalizado.folio}</label>
                <input
                  type="text"
                  placeholder={t.planPersonalizado.folioPlaceholder}
                  value={folio}
                  onChange={(e) => setFolio(e.target.value)}
                  className="input-field"
                />
              </div>

              {/* Campo Monto */}
              <div>
                <label className="block text-tecvox-gray-light text-sm mb-2">* {t.planPersonalizado.amount}</label>
                <div className="flex items-center gap-3">
                  <button
                    onClick={decrementAmount}
                    className="w-10 h-10 bg-tecvox-blue/20 hover:bg-tecvox-blue/30 border border-tecvox-blue/30 rounded-xl flex items-center justify-center text-tecvox-blue-accent transition-all flex-shrink-0"
                  >
                    <FaMinus className="w-3 h-3" />
                  </button>
                  <div className="relative flex-1 max-w-[200px]">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-tecvox-gray font-bold text-lg">$</span>
                    <input
                      type="text"
                      inputMode="decimal"
                      value={amountInput}
                      onChange={handleAmountChange}
                      onBlur={handleAmountBlur}
                      className="input-field pl-8 text-center font-bold text-white"
                      placeholder="0.00"
                    />
                  </div>
                  <button
                    onClick={incrementAmount}
                    className="w-10 h-10 bg-tecvox-blue/20 hover:bg-tecvox-blue/30 border border-tecvox-blue/30 rounded-xl flex items-center justify-center text-tecvox-blue-accent transition-all flex-shrink-0"
                  >
                    <FaPlus className="w-3 h-3" />
                  </button>
                </div>
              </div>

              {/* Total */}
              <div className="glass rounded-2xl p-6">
                <h3 className="text-lg font-bold text-white mb-4">{t.planPersonalizado.totalFinal}</h3>
                <div className="space-y-2">
                  <div className="flex justify-between text-tecvox-gray">
  <span>{language === 'en' ? 'Subtotal' : 'Subtotal'}</span>
  <span>MXN ${amount.toFixed(2)}</span>
</div>
<div className="flex justify-between text-tecvox-gray">
  <span>{language === 'en' ? 'VAT' : 'IVA'}</span>
  <span>MXN ${iva.toFixed(2)}</span>
</div>
<div className="border-t border-tecvox-blue/20 pt-2 flex justify-between">
  <span className="text-white font-bold">{language === 'en' ? 'Total' : 'Total'}</span>
  <span className="text-tecvox-blue-accent font-bold text-xl">MXN ${total.toFixed(2)}</span>
</div>
                </div>
              </div>

              {/* Error */}
              {error && (
                <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4">
                  <p className="text-red-400 text-sm">{error}</p>
                </div>
              )}

              {/* Botón */}
              <button
                onClick={handleAddToCart}
                className="btn-primary w-full py-4 text-lg flex items-center justify-center gap-3"
              >
                <FaCartPlus className="w-5 h-5" />
                {t.planPersonalizado.addToCart}
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}