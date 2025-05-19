'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { storyblokEditable } from '@storyblok/react/rsc'
import { useCart } from '@/components/CartContext'
import { ShoppingBasket, Menu, X } from 'lucide-react'
import type { JSX } from 'react'
import type { HeaderStoryblok, AssetStoryblok } from '@/types/storyblok'
import LanguageSwitcher from './LanguageSwitcher'

interface NavigationProps {
  blok: HeaderStoryblok
}

export default function Navigation({ blok }: NavigationProps): JSX.Element {
  const { toggleOpen, items } = useCart()
  const itemCount = items.length
  const logo: AssetStoryblok | undefined = blok.logo
  const links = Array.isArray(blok.links) ? blok.links : []
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    document.body.classList.toggle('overflow-hidden', mobileOpen)
    return () => {
      document.body.classList.remove('overflow-hidden')
    }
  }, [mobileOpen])

  return (
    <>
      <nav
        {...storyblokEditable(blok)}
        className="fixed left-0 right-0 top-0 z-50 bg-white shadow-sm"
      >
        <div className="flex h-12 items-center justify-between px-4">
          <Link href="/" className="block" aria-label="Accueil - Yunika">
            {logo?.filename && (
              <div className="relative aspect-[300/81] w-32">
                <Image
                  src={logo.filename}
                  alt="Yunika — retour à l’accueil"
                  fill
                  style={{ objectFit: 'contain' }}
                />
              </div>
            )}
          </Link>

          <div className="hidden space-x-6 md:flex">
            {links.map((l, i) => {
              if (
                typeof l !== 'object' ||
                l === null ||
                !('full_slug' in l) ||
                !('name' in l)
              )
                return null

              return (
                <Link
                  key={i}
                  href={`/${l.full_slug}`}
                  className="text-sm font-medium text-gray-700 transition-colors hover:text-gray-900"
                >
                  {l.content.title}
                </Link>
              )
            })}
          </div>

          <div className="flex items-center">
            <LanguageSwitcher />

            <button
              aria-label="Ouvrir le panier"
              onClick={toggleOpen}
              className="flex items-center space-x-1 rounded px-2 py-1 text-xs font-semibold uppercase transition hover:bg-gray-100"
            >
              <ShoppingBasket className="h-5 w-5" />
              <span>{itemCount}</span>
            </button>

            <button
              className="p-2 text-gray-700 transition-colors hover:text-gray-900 md:hidden"
              aria-label="Toggle menu"
              onClick={() => setMobileOpen((o) => !o)}
            >
              {mobileOpen ? (
                <X className="h-8 w-8" />
              ) : (
                <Menu className="h-8 w-8" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {mobileOpen && (
        <div className="fixed inset-0 z-40 flex flex-col bg-white px-6 pt-16">
          <div className="mt-4 flex flex-col space-y-4">
            {links.map((l, i) => {
              if (
                typeof l !== 'object' ||
                l === null ||
                !('full_slug' in l) ||
                !('name' in l)
              )
                return null

              return (
                <Link
                  key={i}
                  href={`/${l.full_slug}`}
                  onClick={() => setMobileOpen(false)}
                  className="text-lg font-medium text-gray-700 transition-colors hover:text-gray-900"
                >
                  {l.content.title}
                </Link>
              )
            })}
          </div>
        </div>
      )}
    </>
  )
}
