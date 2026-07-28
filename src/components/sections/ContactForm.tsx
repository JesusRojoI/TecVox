'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { useLanguage } from '@/contexts/LanguageContext'
import { HiMail, HiUser, HiPencil } from 'react-icons/hi'
import { FaPaperPlane } from 'react-icons/fa'
import toast from 'react-hot-toast'

export default function ContactForm() {
  const { t, language } = useLanguage()
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    asunto: '',
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
          asunto: formData.asunto || 'Sin asunto',
          mensaje: formData.mensaje,
          language,
        }),
      })

      const data = await response.json()
      if (data.success) {
        toast.success(t.home.contact.success)
        setFormData({ nombre: '', email: '', asunto: '', mensaje: '' })
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
    <section className="section-padding bg-tecvox-dark relative overflow-hidden">
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-tecvox-blue/5 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Imagen */}
          <div className="animate-fade-in-right">
            <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1423666639041-f56000c27a9a?w=600&h=800&fit=crop"
                alt="Contact us"
                width={600}
                height={800}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-tecvox-black/80 via-tecvox-black/20 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <h3 className="text-2xl font-bold text-white mb-2">
                  {language === 'en' ? 'We are here to help' : 'Estamos para ayudarte'}
                </h3>
                <p className="text-tecvox-gray-light">
                  {language === 'en' ? 'Contact us and we will respond within 24 hours.' : 'Contáctanos y te responderemos en menos de 24 horas.'}
                </p>
              </div>
            </div>
          </div>

          {/* Formulario */}
          <div className="animate-fade-in-up">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">
              {t.home.contact.title}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="flex items-center gap-2 text-tecvox-gray-light text-sm mb-2">
                  <HiUser className="text-tecvox-blue-accent w-4 h-4" />
                  {t.home.contact.name}
                </label>
                <input
                  type="text"
                  placeholder={t.home.contact.name}
                  value={formData.nombre}
                  onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                  className={`input-field ${errors.nombre ? 'border-red-500' : ''}`}
                />
                {errors.nombre && <p className="text-red-400 text-sm mt-1">{errors.nombre}</p>}
              </div>

              <div>
                <label className="flex items-center gap-2 text-tecvox-gray-light text-sm mb-2">
                  <HiMail className="text-tecvox-blue-accent w-4 h-4" />
                  {t.home.contact.email}
                </label>
                <input
                  type="email"
                  placeholder={t.home.contact.email}
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className={`input-field ${errors.email ? 'border-red-500' : ''}`}
                />
                {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
              </div>

              <div>
                <label className="flex items-center gap-2 text-tecvox-gray-light text-sm mb-2">
                  <HiPencil className="text-tecvox-blue-accent w-4 h-4" />
                  {t.home.contact.message}
                </label>
                <textarea
                  placeholder={t.home.contact.message}
                  rows={5}
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
                    {t.home.contact.submit}
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}