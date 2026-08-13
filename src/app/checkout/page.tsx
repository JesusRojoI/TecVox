'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { useLanguage } from '@/contexts/LanguageContext'
import { useCart, getTranslatedProductName } from '@/contexts/CartContext'
import { useRouter } from 'next/navigation'
import { FaLock, FaCreditCard } from 'react-icons/fa'
import toast from 'react-hot-toast'

interface FormData {
  nombre: string
  apellidos: string
  empresa: string
  pais: string
  direccion: string
  interior: string
  ciudad: string
  estado: string
  codigoPostal: string
  telefono: string
  email: string
  nombreTarjeta: string
  numeroTarjeta: string
  fechaTarjeta: string
  cvv: string
}

export default function CheckoutPage() {
  const { t, language } = useLanguage()
  const { items, subtotal, iva, total, clearCart } = useCart()
  const router = useRouter()

  const [formData, setFormData] = useState<FormData>({
    nombre: '',
    apellidos: '',
    empresa: '',
    pais: 'México',
    direccion: '',
    interior: '',
    ciudad: '',
    estado: 'Ciudad de México',
    codigoPostal: '',
    telefono: '',
    email: '',
    nombreTarjeta: '',
    numeroTarjeta: '',
    fechaTarjeta: '',
    cvv: '',
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(false)

  const formatPrice = (price: number) => {
    return `$${price.toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
  }

  const formatCardNumber = (value: string) => {
    const numbers = value.replace(/\D/g, '').slice(0, 16)
    return numbers.replace(/(\d{4})(?=\d)/g, '$1 ')
  }

  const formatExpiry = (value: string) => {
    const numbers = value.replace(/\D/g, '').slice(0, 4)
    if (numbers.length > 2) {
      return numbers.slice(0, 2) + '/' + numbers.slice(2)
    }
    return numbers
  }

  const handleChange = (field: keyof FormData, value: string) => {
    if (field === 'numeroTarjeta') {
      setFormData({ ...formData, [field]: formatCardNumber(value) })
    } else if (field === 'fechaTarjeta') {
      setFormData({ ...formData, [field]: formatExpiry(value) })
    } else {
      setFormData({ ...formData, [field]: value })
    }
  }

  const validate = () => {
    const newErrors: Record<string, string> = {}
    const requiredFields: (keyof FormData)[] = [
      'nombre', 'apellidos', 'pais', 'direccion', 'estado', 'codigoPostal',
      'telefono', 'email', 'nombreTarjeta', 'numeroTarjeta', 'fechaTarjeta', 'cvv'
    ]

    requiredFields.forEach(field => {
      if (!formData[field].trim()) {
        newErrors[field] = language === 'en' ? 'Required field' : 'Campo requerido'
      }
    })

    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = language === 'en' ? 'Invalid email' : 'Email inválido'
    }

    if (formData.numeroTarjeta.replace(/\s/g, '').length < 16) {
      newErrors.numeroTarjeta = language === 'en' ? 'Invalid card number' : 'Número de tarjeta inválido'
    }

    if (formData.fechaTarjeta.length < 5) {
      newErrors.fechaTarjeta = language === 'en' ? 'Invalid date' : 'Fecha inválida'
    }

    if (formData.cvv.length < 3) {
      newErrors.cvv = language === 'en' ? 'Invalid CVV' : 'CVV inválido'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return

    setLoading(true)
    try {
      const response = await fetch('/api/procesar-pago', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombreTarjeta: formData.nombreTarjeta,
          numeroTarjeta: formData.numeroTarjeta,
          fechaTarjeta: formData.fechaTarjeta,
          cvv: formData.cvv,
          monto: total.toFixed(2),
          nombre: formData.nombre,
          apellidos: formData.apellidos,
          email: formData.email,
          direccion: formData.direccion,
          poblacion: formData.ciudad,
          region: formData.estado,
          codigoPostal: formData.codigoPostal,
          telefono: formData.telefono,
        }),
      })

      const data = await response.json()

      if (data.success) {
        // Enviar correo de confirmación
        await fetch('/api/enviar-correo', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            to: formData.email,
            orderData: {
              nombre: `${formData.nombre} ${formData.apellidos}`,
              productos: items.map(item => ({
                nombre: getTranslatedProductName(item.productKey, item.isCustom, item.name, t),
                sku: item.productKey || 'CUSTOM',
                precio: item.price,
                cantidad: item.quantity,
              })),
              subtotal,
              descuento: 0,
              impuesto: iva,
              total,
              transactionId: data.transactionId,
              cupon: '',
            },
            language,
          }),
        })

        clearCart()
        router.push(`/compra-exitosa?transactionId=${data.transactionId}&total=${total}`)
      } else {
        toast.error(data.message || (language === 'en' ? 'Payment failed' : 'Pago rechazado'))
      }
    } catch {
      toast.error(language === 'en' ? 'Error processing payment' : 'Error procesando el pago')
    } finally {
      setLoading(false)
    }
  }

  if (items.length === 0) {
    return (
      <section className="min-h-screen pt-32 pb-16 bg-tecvox-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white mb-4">{language === 'en' ? 'Empty cart' : 'Carrito vacío'}</h1>
          <p className="text-tecvox-gray">{language === 'en' ? 'Add products before checking out.' : 'Agrega productos antes de pagar.'}</p>
        </div>
      </section>
    )
  }

  return (
    <>
      <section className="relative pt-32 pb-8 bg-tecvox-black overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-tecvox-blue/10 to-transparent"></div>
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold text-white">{t.checkout.title}</h1>
        </div>
      </section>

      <section className="py-8 bg-tecvox-black">
        <div className="max-w-7xl mx-auto px-4">
          <form onSubmit={handleSubmit}>
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Columna de formularios */}
              <div className="lg:col-span-2 space-y-8">
                {/* Datos de facturación */}
                <div className="glass rounded-2xl p-8">
                  <h2 className="text-xl font-bold text-white mb-6">{t.checkout.billing}</h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-tecvox-gray-light text-sm mb-1">* {t.checkout.name}</label>
                      <input
                        type="text"
                        value={formData.nombre}
                        onChange={(e) => handleChange('nombre', e.target.value)}
                        className={`input-field ${errors.nombre ? 'border-red-500' : ''}`}
                      />
                      {errors.nombre && <p className="text-red-400 text-xs mt-1">{errors.nombre}</p>}
                    </div>
                    <div>
                      <label className="block text-tecvox-gray-light text-sm mb-1">* {t.checkout.lastname}</label>
                      <input
                        type="text"
                        value={formData.apellidos}
                        onChange={(e) => handleChange('apellidos', e.target.value)}
                        className={`input-field ${errors.apellidos ? 'border-red-500' : ''}`}
                      />
                      {errors.apellidos && <p className="text-red-400 text-xs mt-1">{errors.apellidos}</p>}
                    </div>
                    <div>
                      <label className="block text-tecvox-gray-light text-sm mb-1">{t.checkout.company} <span className="text-tecvox-gray">({t.checkout.companyOptional})</span></label>
                      <input
                        type="text"
                        value={formData.empresa}
                        onChange={(e) => handleChange('empresa', e.target.value)}
                        className="input-field"
                      />
                    </div>
                    <div>
                      <label className="block text-tecvox-gray-light text-sm mb-1">* {t.checkout.country}</label>
                      <select
                        value={formData.pais}
                        onChange={(e) => handleChange('pais', e.target.value)}
                        className="input-field"
                      >
                        <option value="México">México</option>
                      </select>
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-tecvox-gray-light text-sm mb-1">* {t.checkout.address}</label>
                      <input
                        type="text"
                        placeholder="Ej. Av. Reforma 123"
                        value={formData.direccion}
                        onChange={(e) => handleChange('direccion', e.target.value)}
                        className={`input-field ${errors.direccion ? 'border-red-500' : ''}`}
                      />
                      {errors.direccion && <p className="text-red-400 text-xs mt-1">{errors.direccion}</p>}
                    </div>
                    <div>
                      <label className="block text-tecvox-gray-light text-sm mb-1">{t.checkout.interior}</label>
                      <input
                        type="text"
                        placeholder="Ej. Depto 402"
                        value={formData.interior}
                        onChange={(e) => handleChange('interior', e.target.value)}
                        className="input-field"
                      />
                    </div>
                    <div>
                      <label className="block text-tecvox-gray-light text-sm mb-1">{t.checkout.city}</label>
                      <input
                        type="text"
                        value={formData.ciudad}
                        onChange={(e) => handleChange('ciudad', e.target.value)}
                        className="input-field"
                      />
                    </div>
                    <div>
                      <label className="block text-tecvox-gray-light text-sm mb-1">* {t.checkout.state}</label>
                      <select
                        value={formData.estado}
                        onChange={(e) => handleChange('estado', e.target.value)}
                        className="input-field"
                      >
                        <option value="Ciudad de México">Ciudad de México</option>
                        <option value="Estado de México">Estado de México</option>
                        <option value="Nuevo León">Nuevo León</option>
                        <option value="Jalisco">Jalisco</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-tecvox-gray-light text-sm mb-1">* {t.checkout.postal}</label>
                      <input
                        type="text"
                        value={formData.codigoPostal}
                        onChange={(e) => handleChange('codigoPostal', e.target.value)}
                        className={`input-field ${errors.codigoPostal ? 'border-red-500' : ''}`}
                      />
                      {errors.codigoPostal && <p className="text-red-400 text-xs mt-1">{errors.codigoPostal}</p>}
                    </div>
                    <div>
                      <label className="block text-tecvox-gray-light text-sm mb-1">* {t.checkout.phone}</label>
                      <input
                        type="tel"
                        value={formData.telefono}
                        onChange={(e) => handleChange('telefono', e.target.value)}
                        className={`input-field ${errors.telefono ? 'border-red-500' : ''}`}
                      />
                      {errors.telefono && <p className="text-red-400 text-xs mt-1">{errors.telefono}</p>}
                    </div>
                    <div>
                      <label className="block text-tecvox-gray-light text-sm mb-1">* {t.checkout.email}</label>
                      <input
                        type="email"
                        placeholder="tu@email.com"
                        value={formData.email}
                        onChange={(e) => handleChange('email', e.target.value)}
                        className={`input-field ${errors.email ? 'border-red-500' : ''}`}
                      />
                      {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
                    </div>
                  </div>
                </div>

                {/* Datos de pago */}
                <div className="glass rounded-2xl p-8">
                  <h2 className="text-xl font-bold text-white mb-2">{t.checkout.payment}</h2>
                  <p className="text-tecvox-gray text-sm mb-6">{t.checkout.paymentDescription}</p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <label className="block text-tecvox-gray-light text-sm mb-1">* {t.checkout.cardholder}</label>
                      <input
                        type="text"
                        placeholder={language === 'en' ? 'As it appears on the card' : 'Como aparece en la tarjeta'}
                        value={formData.nombreTarjeta}
                        onChange={(e) => handleChange('nombreTarjeta', e.target.value)}
                        className={`input-field ${errors.nombreTarjeta ? 'border-red-500' : ''}`}
                      />
                      {errors.nombreTarjeta && <p className="text-red-400 text-xs mt-1">{errors.nombreTarjeta}</p>}
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-tecvox-gray-light text-sm mb-1">* {t.checkout.cardNumber}</label>
                      <input
                        type="text"
                        placeholder="1234 5678 9012 3456"
                        value={formData.numeroTarjeta}
                        onChange={(e) => handleChange('numeroTarjeta', e.target.value)}
                        maxLength={19}
                        className={`input-field ${errors.numeroTarjeta ? 'border-red-500' : ''}`}
                      />
                      {errors.numeroTarjeta && <p className="text-red-400 text-xs mt-1">{errors.numeroTarjeta}</p>}
                    </div>
                    <div>
                      <label className="block text-tecvox-gray-light text-sm mb-1">* {t.checkout.expiry}</label>
                      <input
                        type="text"
                        placeholder="MM/AA"
                        value={formData.fechaTarjeta}
                        onChange={(e) => handleChange('fechaTarjeta', e.target.value)}
                        maxLength={5}
                        className={`input-field ${errors.fechaTarjeta ? 'border-red-500' : ''}`}
                      />
                      {errors.fechaTarjeta && <p className="text-red-400 text-xs mt-1">{errors.fechaTarjeta}</p>}
                    </div>
                    <div>
                      <label className="block text-tecvox-gray-light text-sm mb-1">* {t.checkout.cvc}</label>
                      <input
                        type="password"
                        placeholder="123"
                        value={formData.cvv}
                        onChange={(e) => handleChange('cvv', e.target.value.replace(/\D/g, '').slice(0, 4))}
                        maxLength={4}
                        className={`input-field ${errors.cvv ? 'border-red-500' : ''}`}
                      />
                      {errors.cvv && <p className="text-red-400 text-xs mt-1">{errors.cvv}</p>}
                    </div>
                  </div>
                </div>
              </div>

              {/* Resumen */}
              <div className="lg:col-span-1">
                <div className="glass rounded-2xl p-6 sticky top-24">
                  <h2 className="text-xl font-bold text-white mb-4">{t.checkout.summary}</h2>
                  
                  <div className="space-y-4 mb-6">
                    {items.map((item) => {
                      const translatedName = getTranslatedProductName(item.productKey, item.isCustom, item.name, t)
                      return (
                        <div key={item.cartItemId} className="text-sm">
                          <p className="text-white font-medium">{translatedName}</p>
                          <p className="text-tecvox-gray">
                            {item.quantity} × {formatPrice(item.price)}
                          </p>
                          <p className="text-tecvox-blue-accent font-semibold">{formatPrice(item.price * item.quantity)}</p>
                        </div>
                      )
                    })}
                  </div>

                  <div className="border-t border-tecvox-blue/20 pt-4 space-y-2">
                    <div className="flex justify-between text-tecvox-gray text-sm">
                      <span>{t.cart.subtotal}</span>
                      <span>{formatPrice(subtotal)}</span>
                    </div>
                    <div className="flex justify-between text-tecvox-gray text-sm">
                      <span>{language === 'en' ? 'VAT' : 'IVA'}</span>
                      <span>{formatPrice(iva)}</span>
                    </div>
                    <div className="border-t border-tecvox-blue/20 pt-2 flex justify-between">
                      <span className="text-white font-bold">{language === 'en' ? 'Total' : 'Total'}</span>
                      <span className="text-tecvox-blue-accent font-bold text-lg">{formatPrice(total)}</span>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-primary w-full mt-6 py-4 flex items-center justify-center gap-2 text-lg"
                  >
                    {loading ? (
                      <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      <>
                        <FaLock className="w-4 h-4" />
                        {t.checkout.pay}
                      </>
                    )}
                  </button>

                  <div className="mt-6 text-center">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <FaCreditCard className="text-tecvox-gray w-4 h-4" />
                      <span className="text-tecvox-gray text-xs">{t.checkout.secure}</span>
                    </div>
                    <div className="relative w-32 h-12 mx-auto">
                      <Image
                        src="/logo-keycop-2.png"
                        alt="Keycop Payments"
                        width={128}
                        height={48}
                        className="object-contain w-full h-full"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </section>
    </>
  )
}