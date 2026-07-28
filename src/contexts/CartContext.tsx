'use client'

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { v4 as uuidv4 } from 'uuid'

export interface CartItem {
  cartItemId: string
  productKey?: string
  name: string
  price: number
  quantity: number
  features?: string[]
  isCustom?: boolean
  folio?: string
}

interface CartContextType {
  items: CartItem[]
  addItem: (item: Omit<CartItem, 'cartItemId'>) => void
  removeItem: (cartItemId: string) => void
  updateQuantity: (cartItemId: string, quantity: number) => void
  clearCart: () => void
  subtotal: number
  iva: number
  total: number
  itemCount: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

const IVA_RATE = 0.16

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])

  useEffect(() => {
    const savedCart = localStorage.getItem('tecvox-cart')
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart))
      } catch {
        setItems([])
      }
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('tecvox-cart', JSON.stringify(items))
  }, [items])

  const addItem = useCallback((newItem: Omit<CartItem, 'cartItemId'>) => {
    setItems(prev => {
      if (newItem.isCustom) {
        const cartItem: CartItem = {
          ...newItem,
          cartItemId: uuidv4(),
          quantity: 1,
        }
        return [...prev, cartItem]
      }

      const existingIndex = prev.findIndex(
        item => item.productKey === newItem.productKey && !item.isCustom
      )

      if (existingIndex >= 0) {
        const updated = [...prev]
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + 1,
        }
        return updated
      }

      const cartItem: CartItem = {
        ...newItem,
        cartItemId: uuidv4(),
        quantity: 1,
      }
      return [...prev, cartItem]
    })
  }, [])

  const removeItem = useCallback((cartItemId: string) => {
    setItems(prev => prev.filter(item => item.cartItemId !== cartItemId))
  }, [])

  const updateQuantity = useCallback((cartItemId: string, quantity: number) => {
    if (quantity < 1) {
      removeItem(cartItemId)
      return
    }
    setItems(prev =>
      prev.map(item =>
        item.cartItemId === cartItemId ? { ...item, quantity } : item
      )
    )
  }, [removeItem])

  const clearCart = useCallback(() => {
    setItems([])
  }, [])

  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0)
  const iva = subtotal * IVA_RATE
  const total = subtotal + iva
  const itemCount = items.reduce((acc, item) => acc + item.quantity, 0)

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        subtotal,
        iva,
        total,
        itemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}

// Función auxiliar para traducir nombres de productos
export function getTranslatedProductName(productKey: string | undefined, isCustom: boolean | undefined, name: string, t: any): string {
  if (isCustom || !productKey) return name
  
  try {
    const productData = t.planes.products[productKey]
    if (productData && productData.name) {
      return productData.name
    }
  } catch {
    // Si falla, devolver el nombre original
  }
  
  return name
}

// Función auxiliar para traducir características de productos
export function getTranslatedProductFeatures(productKey: string | undefined, isCustom: boolean | undefined, features: string[] | undefined, t: any): string[] {
  if (isCustom || !productKey || !features) return features || []
  
  try {
    const productData = t.planes.products[productKey]
    if (productData && productData.features) {
      return productData.features
    }
  } catch {
    // Si falla, devolver las características originales
  }
  
  return features || []
}