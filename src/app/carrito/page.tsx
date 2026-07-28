'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'
import { useCart, getTranslatedProductName, getTranslatedProductFeatures } from '@/contexts/CartContext'
import { FaTrash, FaMinus, FaPlus, FaArrowRight, FaShoppingCart, FaTag } from 'react-icons/fa'
import toast from 'react-hot-toast'

export default function CarritoPage() {
  const { t, language } = useLanguage()
  const { items, removeItem, updateQuantity, clearCart, subtotal, iva, total, itemCount } = useCart()
  const [couponCode, setCouponCode] = useState('')

  const handleApplyCoupon = () => {
    if (couponCode.trim()) {
      toast.error(t.cart.invalidCoupon)
    }
  }

  const formatPrice = (price: number) => {
    return `$${price.toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
  }

  if (items.length === 0) {
    return (
      <section className="min-h-screen pt-32 pb-16 bg-tecvox-black flex items-center justify-center">
        <div className="text-center">
          <FaShoppingCart className="w-24 h-24 text-tecvox-blue/30 mx-auto mb-6" />
          <h1 className="text-3xl font-bold text-white mb-4">{t.cart.title}</h1>
          <p className="text-tecvox-gray text-lg mb-8">{t.cart.emptyMessage}</p>
          <Link href="/planes-optimus" className="btn-primary inline-flex items-center gap-2">
            <FaArrowRight className="w-4 h-4" />
            {language === 'en' ? 'View Plans' : 'Ver planes'}
          </Link>
        </div>
      </section>
    )
  }

  return (
    <>
      <section className="relative pt-32 pb-8 bg-tecvox-black overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-tecvox-blue/10 to-transparent"></div>
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{t.cart.title}</h1>
          <p className="text-tecvox-gray text-lg">{t.cart.subtitle}</p>
        </div>
      </section>

      <section className="py-8 bg-tecvox-black">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Lista de productos */}
            <div className="lg:col-span-2 space-y-6">
              <h2 className="text-xl font-bold text-white mb-4">{t.cart.products}</h2>
              
              {items.map((item) => {
                const translatedName = getTranslatedProductName(item.productKey, item.isCustom, item.name, t)
                const translatedFeatures = getTranslatedProductFeatures(item.productKey, item.isCustom, item.features, t)
                
                return (
                  <div key={item.cartItemId} className="glass rounded-2xl p-6 hover:border-tecvox-blue/30 transition-all">
                    <div className="flex flex-col sm:flex-row gap-6">
                      {/* Info del producto */}
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-white mb-2">
                          {translatedName}
                        </h3>
                        <p className="text-tecvox-blue-accent font-semibold mb-3">
                          {t.cart.unitPrice}: {formatPrice(item.price)}
                        </p>
                        {translatedFeatures && translatedFeatures.length > 0 && (
                          <ul className="space-y-1 mb-4">
                            {translatedFeatures.slice(0, 4).map((feature, i) => (
                              <li key={i} className="text-tecvox-gray text-sm flex items-center gap-2">
                                <span className="w-1 h-1 bg-tecvox-blue-accent rounded-full"></span>
                                {feature}
                              </li>
                            ))}
                            {translatedFeatures.length > 4 && (
                              <li className="text-tecvox-gray text-sm">
                                + {translatedFeatures.length - 4} {language === 'en' ? 'more' : 'más'}
                              </li>
                            )}
                          </ul>
                        )}
                      </div>

                      {/* Cantidad y total */}
                      <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                            className="w-8 h-8 bg-tecvox-blue/20 hover:bg-tecvox-blue/30 border border-tecvox-blue/30 rounded-lg flex items-center justify-center text-tecvox-blue-accent transition-all"
                          >
                            <FaMinus className="w-3 h-3" />
                          </button>
                          <span className="text-white font-bold w-8 text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                            className="w-8 h-8 bg-tecvox-blue/20 hover:bg-tecvox-blue/30 border border-tecvox-blue/30 rounded-lg flex items-center justify-center text-tecvox-blue-accent transition-all"
                          >
                            <FaPlus className="w-3 h-3" />
                          </button>
                        </div>
                        
                        <div className="text-right">
                          <p className="text-tecvox-gray text-xs">{t.cart.total}</p>
                          <p className="text-white font-bold text-lg">{formatPrice(item.price * item.quantity)}</p>
                        </div>

                        <button
                          onClick={() => removeItem(item.cartItemId)}
                          className="text-red-400 hover:text-red-300 transition-colors p-2"
                          title={t.cart.remove}
                        >
                          <FaTrash className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Resumen */}
            <div className="lg:col-span-1">
              <div className="glass rounded-2xl p-6 sticky top-24">
                {/* Cupón */}
                <div className="mb-6">
                  <h3 className="text-white font-bold mb-3 flex items-center gap-2">
                    <FaTag className="text-tecvox-blue-accent" />
                    {t.cart.coupon}
                  </h3>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder={t.cart.couponPlaceholder}
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      className="input-field flex-1 text-sm"
                    />
                    <button
                      onClick={handleApplyCoupon}
                      className="bg-tecvox-blue/20 hover:bg-tecvox-blue/30 border border-tecvox-blue/30 text-tecvox-blue-accent px-4 rounded-xl font-semibold transition-all text-sm"
                    >
                      {t.cart.apply}
                    </button>
                  </div>
                </div>

                {/* Totales */}
                <div className="border-t border-tecvox-blue/20 pt-6">
                  <h3 className="text-white font-bold mb-4">{t.cart.cartTotal}</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between text-tecvox-gray">
                      <span>{t.cart.subtotal}</span>
                      <span>{formatPrice(subtotal)}</span>
                    </div>
                    <div className="flex justify-between text-tecvox-gray">
                      <span>{t.cart.iva}</span>
                      <span>{formatPrice(iva)}</span>
                    </div>
                    <div className="border-t border-tecvox-blue/20 pt-3 flex justify-between">
                      <span className="text-white font-bold">{t.cart.grandTotal}</span>
                      <span className="text-tecvox-blue-accent font-bold text-xl">{formatPrice(total)}</span>
                    </div>
                  </div>
                </div>

                {/* Botones */}
                <div className="space-y-3 mt-6">
                  <Link href="/checkout" className="btn-primary w-full flex items-center justify-center gap-2 py-3">
                    <FaArrowRight className="w-4 h-4" />
                    {t.cart.checkout}
                  </Link>
                  <button
                    onClick={clearCart}
                    className="w-full py-3 rounded-xl border border-red-500/30 text-red-400 hover:bg-red-500/10 transition-all font-semibold text-sm"
                  >
                    {t.cart.empty}
                  </button>
                </div>

                <p className="text-tecvox-gray text-xs text-center mt-4">
                  {itemCount} {language === 'en' ? (itemCount === 1 ? 'item' : 'items') : (itemCount === 1 ? 'producto' : 'productos')} {language === 'en' ? 'in cart' : 'en el carrito'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}