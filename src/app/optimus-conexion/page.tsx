'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useLanguage } from '@/contexts/LanguageContext'
import { HiMail, HiPhone, HiUser } from 'react-icons/hi'
import { FaPaperPlane, FaArrowRight } from 'react-icons/fa'
import toast from 'react-hot-toast'

export default function OptimusConexionPage() {
  const { t, language } = useLanguage()
  const [formData, setFormData] = useState({
    nombre: '',
    telefono: '',
    email: '',
    mensaje: '',
  })
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return re.test(email)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const newErrors: Record<string, string> = {}
    if (!formData.nombre.trim()) newErrors.nombre = language === 'en' ? 'Required' : 'Campo requerido'
    if (!formData.telefono.trim()) newErrors.telefono = language === 'en' ? 'Required' : 'Campo requerido'
    if (!formData.email.trim()) {
      newErrors.email = language === 'en' ? 'Required' : 'Campo requerido'
    } else if (!validateEmail(formData.email)) {
      newErrors.email = language === 'en' ? 'Invalid email' : 'Email inválido'
    }
    if (!formData.mensaje.trim()) newErrors.mensaje = language === 'en' ? 'Required' : 'Campo requerido'
    
    setErrors(newErrors)
    if (Object.keys(newErrors).length > 0) return

    setLoading(true)
    try {
      const response = await fetch('/api/enviar-correo-contacto', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre: formData.nombre,
          email: formData.email,
          asunto: `Optimus Conexión - ${formData.nombre}`,
          mensaje: `Teléfono: ${formData.telefono}\n\n${formData.mensaje}`,
          language,
        }),
      })

      const data = await response.json()
      if (data.success) {
        toast.success(
          language === 'en' 
            ? 'Message sent. We will contact you shortly.' 
            : 'Mensaje enviado. Te contactaremos en breve.'
        )
        setFormData({ nombre: '', telefono: '', email: '', mensaje: '' })
      } else {
        toast.error(language === 'en' ? 'Error sending message' : 'Error al enviar el mensaje')
      }
    } catch {
      toast.error(language === 'en' ? 'Error sending message' : 'Error al enviar el mensaje')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 bg-tecvox-black overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-tecvox-blue/10 to-transparent"></div>
        <div className="absolute top-20 right-0 w-96 h-96 bg-tecvox-blue/5 rounded-full blur-3xl"></div>
        
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center">
            <p className="text-tecvox-blue-accent text-sm mb-2">
              {language === 'en' ? 'Home / Optimus Connection' : 'Inicio / Optimus Conexión'}
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              {language === 'en' ? 'Optimus Connection' : 'Optimus Conexión'}
            </h1>
            <p className="text-tecvox-gray text-lg max-w-2xl mx-auto">
              {language === 'en' 
                ? 'Need more information? Contact us and we will help you find the best technological solution for your business.'
                : '¿Necesitas más información? Contáctanos y te ayudaremos a encontrar la mejor solución tecnológica para tu empresa.'
              }
            </p>
          </div>
        </div>
      </section>

      {/* Formulario y Contacto */}
      <section className="py-16 bg-tecvox-dark relative overflow-hidden">
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-tecvox-blue/5 rounded-full blur-3xl"></div>
        
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Formulario */}
            <div className="animate-fade-in-up">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">
                {language === 'en' ? 'Contact Us' : 'Comunícate con nosotros'}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="flex items-center gap-2 text-tecvox-gray-light text-sm mb-2">
                    <HiUser className="text-tecvox-blue-accent w-4 h-4" />
                    {language === 'en' ? 'Name' : 'Nombre'}
                  </label>
                  <input
                    type="text"
                    placeholder={language === 'en' ? 'Your name' : 'Tu nombre'}
                    value={formData.nombre}
                    onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                    className={`input-field ${errors.nombre ? 'border-red-500' : ''}`}
                  />
                  {errors.nombre && <p className="text-red-400 text-sm mt-1">{errors.nombre}</p>}
                </div>

                <div>
                  <label className="flex items-center gap-2 text-tecvox-gray-light text-sm mb-2">
                    <HiPhone className="text-tecvox-blue-accent w-4 h-4" />
                    {language === 'en' ? 'Phone' : 'Teléfono'}
                  </label>
                  <input
                    type="tel"
                    placeholder="55 1234 5678"
                    value={formData.telefono}
                    onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                    className={`input-field ${errors.telefono ? 'border-red-500' : ''}`}
                  />
                  {errors.telefono && <p className="text-red-400 text-sm mt-1">{errors.telefono}</p>}
                </div>

                <div>
                  <label className="flex items-center gap-2 text-tecvox-gray-light text-sm mb-2">
                    <HiMail className="text-tecvox-blue-accent w-4 h-4" />
                    {language === 'en' ? 'Email' : 'Mail'}
                  </label>
                  <input
                    type="email"
                    placeholder="tu@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className={`input-field ${errors.email ? 'border-red-500' : ''}`}
                  />
                  {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
                </div>

                <div>
                  <label className="flex items-center gap-2 text-tecvox-gray-light text-sm mb-2">
                    <HiMail className="text-tecvox-blue-accent w-4 h-4" />
                    {language === 'en' ? 'Your message' : 'Tu mensaje aquí'}
                  </label>
                  <textarea
                    rows={5}
                    placeholder={language === 'en' ? 'Write your message...' : 'Escribe tu mensaje...'}
                    value={formData.mensaje}
                    onChange={(e) => setFormData({ ...formData, mensaje: e.target.value })}
                    className={`input-field resize-none ${errors.mensaje ? 'border-red-500' : ''}`}
                  ></textarea>
                  {errors.mensaje && <p className="text-red-400 text-sm mt-1">{errors.mensaje}</p>}
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary w-full flex items-center justify-center gap-2 py-4 text-lg"
                >
                  {loading ? (
                    <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <>
                      <FaPaperPlane className="w-5 h-5" />
                      {language === 'en' ? 'Send Message' : 'Enviar mensaje'}
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Información de contacto e imagen */}
            <div className="space-y-8 animate-fade-in-right">
              {/* Imagen */}
              <div className="relative h-64 rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src="https://images.unsplash.com/photo-1553877522-43269d4ea984?w=600&h=400&fit=crop"
                  alt="Contact"
                  width={600}
                  height={400}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-tecvox-black/60 to-transparent"></div>
              </div>

              {/* Contacto */}
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-white">
                  {language === 'en' ? 'Contact Us' : 'Contáctanos'}
                </h3>

                <div className="glass rounded-2xl p-6">
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-tecvox-blue/20 rounded-xl flex items-center justify-center text-tecvox-blue-accent flex-shrink-0">
                        <HiMail className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="text-tecvox-gray text-sm mb-1">{language === 'en' ? 'Email' : 'Email'}</p>
                        <a href="mailto:atencion@tecvox.com.mx" className="text-white font-semibold hover:text-tecvox-blue-accent transition-colors">
                          atencion@tecvox.com.mx
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-tecvox-blue/20 rounded-xl flex items-center justify-center text-tecvox-blue-accent flex-shrink-0">
                        <HiPhone className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="text-tecvox-gray text-sm mb-1">{language === 'en' ? 'Phone' : 'Teléfono'}</p>
                        <a href="tel:5552731980" className="text-white font-semibold hover:text-tecvox-blue-accent transition-colors">
                          (+52) 55 5273 1980
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Botones */}
                <div className="flex flex-wrap gap-4">
                  <Link href="/#contacto" className="btn-primary inline-flex items-center gap-2">
                    <HiMail className="w-4 h-4" />
                    {language === 'en' ? 'Contact Us' : 'Contáctanos'}
                  </Link>
                  <Link href="/soluciones-digitales" className="btn-outline inline-flex items-center gap-2">
                    <FaArrowRight className="w-4 h-4" />
                    {language === 'en' ? 'View Solutions' : 'Ver soluciones'}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Segunda imagen decorativa */}
      <section className="py-16 bg-tecvox-black relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-tecvox-blue/5 rounded-full blur-3xl"></div>
        
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="relative h-80 rounded-2xl overflow-hidden shadow-2xl">
            <Image
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&h=400&fit=crop"
              alt="Team"
              width={1200}
              height={400}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-tecvox-black/80 via-tecvox-black/40 to-transparent flex items-center">
              <div className="p-8 md:p-12 max-w-lg">
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                  {language === 'en' 
                    ? 'Ready to take your technology to the next level?'
                    : '¿Listo para llevar tu tecnología al siguiente nivel?'
                  }
                </h3>
                <p className="text-tecvox-gray-light mb-6">
                  {language === 'en'
                    ? 'Our team of experts is ready to help you find the perfect solution for your business.'
                    : 'Nuestro equipo de expertos está listo para ayudarte a encontrar la solución perfecta para tu negocio.'
                  }
                </p>
                <Link href="/planes-optimus" className="btn-primary inline-flex items-center gap-2">
                  <FaArrowRight className="w-4 h-4" />
                  {language === 'en' ? 'View Plans' : 'Ver planes'}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}