import type { Metadata } from 'next'
import { LanguageProvider } from '@/contexts/LanguageContext'
import { CartProvider } from '@/contexts/CartContext'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { Toaster } from 'react-hot-toast'
import './globals.css'

export const metadata: Metadata = {
  title: 'TecVox - Mantenimiento de Sistemas TI',
  description: 'Nos especializamos en el mantenimiento de equipos de cómputo, ofreciendo soluciones integrales para asegurar que tu infraestructura tecnológica siempre esté en óptimas condiciones.',
  icons: {
    icon: '/logo.svg',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className="min-h-screen flex flex-col">
        <LanguageProvider>
          <CartProvider>
            <Header />
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
            <Toaster
              position="top-right"
              toastOptions={{
                style: {
                  background: '#121212',
                  color: '#f8fafc',
                  border: '1px solid rgba(59, 130, 246, 0.3)',
                },
              }}
            />
          </CartProvider>
        </LanguageProvider>
      </body>
    </html>
  )
}