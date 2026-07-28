/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost'],
    unoptimized: true,
  },
  // Aseguramos que no hay iconos de Next.js en producción
  devIndicators: {
    buildActivity: false,
  },
}

module.exports = nextConfig