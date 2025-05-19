'use client'
import React, { createContext, useContext, useState, ReactNode } from 'react'

interface CartItem {
  id: number
  title: string
  price: number
  size: string
  quantity: number
  image: string
}

interface CartContextValue {
  items: CartItem[]
  toggleOpen: () => void
  isOpen: boolean
}

const CartContext = createContext<CartContextValue | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const toggleOpen = () => setIsOpen((o) => !o)

  const items: CartItem[] = [
    {
      id: 1,
      title: 'The Evergreen',
      price: 599,
      size: '149',
      quantity: 1,
      image:
        'https://a.storyblok.com/f/338283/1000x1000/8a903d71c7/the-evergreen-front-real.jpg',
    },
    {
      id: 2,
      title: 'The Kingfisher',
      price: 549,
      size: '152',
      quantity: 1,
      image:
        'https://a.storyblok.com/f/338283/1000x1000/1482ba8d23/the-kingfisher-front-real.jpg',
    },
  ]

  return (
    <CartContext.Provider value={{ items, isOpen, toggleOpen }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be inside CartProvider')
  return ctx
}
