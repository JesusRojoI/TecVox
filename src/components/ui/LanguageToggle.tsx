'use client'

import React from 'react'
import { useLanguage } from '@/contexts/LanguageContext'

export default function LanguageToggle() {
  const { language, t, toggleLanguage } = useLanguage()

  return (
    <button
      onClick={toggleLanguage}
      className="px-3 py-1 rounded-md bg-tecvox-blue/20 border border-tecvox-blue/30 text-tecvox-blue-accent hover:bg-tecvox-blue/30 transition-all duration-300 text-sm font-semibold"
      aria-label="Toggle language"
    >
      {t.header.language}
    </button>
  )
}