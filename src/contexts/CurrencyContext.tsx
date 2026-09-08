'use client'

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import { getTipoCambioDolar } from '@/lib/banxico'

type Currency = 'MXN' | 'USD'

interface CurrencyContextType {
  currency: Currency
  exchangeRate: number
  isLoading: boolean
  toggleCurrency: () => void
  convertPrice: (amountInMXN: number) => number
  formatPrice: (amountInMXN: number) => string
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined)
const CACHE_DURATION = 4 * 60 * 60 * 1000
const CACHE_KEY = 'tecvox_exchange_rate'

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const { language } = useLanguage()
  const [exchangeRate, setExchangeRate] = useState<number>(1)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [manualOverride, setManualOverride] = useState(false)
  const [currency, setCurrency] = useState<Currency>('MXN')

  // Efecto 1: Cargar el tipo de cambio de Banxico
  useEffect(() => {
    const fetchRate = async () => {
      try {
        const cachedData = localStorage.getItem(CACHE_KEY)
        if (cachedData) {
          const { rate, timestamp } = JSON.parse(cachedData)
          if (Date.now() - timestamp < CACHE_DURATION) {
            setExchangeRate(rate)
            setIsLoading(false)
            return
          }
        }
        setIsLoading(true)
        const { tipoDeCambio } = await getTipoCambioDolar()
        const validRate = tipoDeCambio > 0 ? tipoDeCambio : 1
        setExchangeRate(validRate)
        localStorage.setItem(CACHE_KEY, JSON.stringify({ rate: validRate, timestamp: Date.now() }))
      } catch (error) {
        const staleCache = localStorage.getItem(CACHE_KEY)
        setExchangeRate(staleCache ? JSON.parse(staleCache).rate : 1)
      } finally {
        setIsLoading(false)
      }
    }
    fetchRate()
  }, [])

  // Efecto 2: Sincronizar moneda con idioma (si no hay override manual)
  useEffect(() => {
    if (!manualOverride) {
      setCurrency(language === 'en' ? 'USD' : 'MXN')
    }
  }, [language, manualOverride])

  const toggleCurrency = useCallback(() => {
    setCurrency(prev => (prev === 'MXN' ? 'USD' : 'MXN'))
    setManualOverride(true)
  }, [])

  const convertPrice = useCallback((amountInMXN: number) => {
    return currency === 'USD' && exchangeRate > 1 ? amountInMXN / exchangeRate : amountInMXN
  }, [currency, exchangeRate])

  const formatPrice = useCallback((amountInMXN: number) => {
    const finalAmount = convertPrice(amountInMXN)
    const isUsd = currency === 'USD'
    const formatted = new Intl.NumberFormat(isUsd ? 'en-US' : 'es-MX', {
      style: 'currency',
      currency: isUsd ? 'USD' : 'MXN',
      minimumFractionDigits: 2,
    }).format(finalAmount)
    return `${formatted} ${currency}`
  }, [convertPrice, currency])

  return (
    <CurrencyContext.Provider value={{ currency, exchangeRate, isLoading, toggleCurrency, convertPrice, formatPrice }}>
      {children}
    </CurrencyContext.Provider>
  )
}

export const useCurrency = () => {
  const context = useContext(CurrencyContext)
  if (!context) throw new Error('useCurrency debe usarse dentro de CurrencyProvider')
  return context
}