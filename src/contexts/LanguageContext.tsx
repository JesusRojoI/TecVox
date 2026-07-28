'use client'

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'
import es from '@/locales/es.json'
import en from '@/locales/en.json'

type Language = 'es' | 'en'
type TranslationDict = typeof es

interface LanguageContextType {
  language: Language
  t: TranslationDict
  toggleLanguage: () => void
  setLanguage: (lang: Language) => void
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

const dictionaries: Record<Language, TranslationDict> = {
  es,
  en,
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>('es')
  const [t, setT] = useState<TranslationDict>(dictionaries.es)

  useEffect(() => {
    const savedLang = localStorage.getItem('tecvox-language') as Language | null
    if (savedLang && (savedLang === 'es' || savedLang === 'en')) {
      setLanguageState(savedLang)
      setT(dictionaries[savedLang])
    }
  }, [])

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang)
    setT(dictionaries[lang])
    localStorage.setItem('tecvox-language', lang)
  }, [])

  const toggleLanguage = useCallback(() => {
    const newLang = language === 'es' ? 'en' : 'es'
    setLanguage(newLang)
  }, [language, setLanguage])

  return (
    <LanguageContext.Provider value={{ language, t, toggleLanguage, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}