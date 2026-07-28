'use client'

import React from 'react'
import { useCart } from '@/contexts/CartContext'
import { HiShoppingCart } from 'react-icons/hi'
import Link from 'next/link'

export default function CartIcon() {
  const { itemCount } = useCart()

  return (
    <Link href="/carrito" className="relative inline-flex items-center justify-center">
      <HiShoppingCart className="w-6 h-6 text-tecvox-blue-accent hover:text-tecvox-blue-pale transition-colors duration-300" />
      {itemCount > 0 && (
        <span className="absolute -top-2 -right-2 bg-tecvox-blue text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-fade-in-up">
          {itemCount}
        </span>
      )}
    </Link>
  )
}