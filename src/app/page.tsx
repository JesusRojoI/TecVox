'use client'

import React from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import HeroSection from '@/components/sections/HeroSection'
import ServicesSection from '@/components/sections/ServicesSection'
import ValuesSection from '@/components/sections/ValuesSection'
import CommitmentSection from '@/components/sections/CommitmentSection'
import CTASection from '@/components/sections/CTASection'
import OfferSection from '@/components/sections/OfferSection'
import ContactForm from '@/components/sections/ContactForm'

export default function HomePage() {
  const { t } = useLanguage()

  return (
    <>
      <HeroSection />
      <div id="servicios">
        <ServicesSection />
      </div>
      <div id="valores">
        <ValuesSection />
      </div>
      <div id="equipo">
        <CommitmentSection />
      </div>
      <CTASection />
      <OfferSection />
      <div id="contacto">
        <ContactForm />
      </div>
    </>
  )
}