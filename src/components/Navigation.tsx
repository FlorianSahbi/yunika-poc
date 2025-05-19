'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { storyblokEditable } from '@storyblok/react/rsc'
import { useCart } from '@/components/CartContext'
import { ShoppingBasket, Menu, X } from 'lucide-react'
import { usePathname } from 'next/navigation'
import type { JSX } from 'react'
import type { HeaderStoryblok, AssetStoryblok } from '@/types/storyblok'
import LanguageSwitcher from './LanguageSwitcher'
import { useLocale } from 'next-intl'

interface NavigationProps {
  blok: HeaderStoryblok
}

export default function Navigation({ blok }: NavigationProps): JSX.Element {
  const { toggleOpen, items } = useCart()
  const itemCount = items.length
  const logo: AssetStoryblok | undefined = blok.logo
  const links = Array.isArray(blok.links) ? blok.links : []
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()
  const locale = useLocale()

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
                !l ||
                typeof l !== 'object' ||
                !('full_slug' in l) ||
                !('name' in l)
              )
                return null
              const href =
                locale === 'en' ? `/en/${l.full_slug}` : `/${l.full_slug}`
              const isActive = pathname === href

              return (
                <Link
                  key={i}
                  href={href}
                  className="group relative text-sm font-medium text-gray-700 transition-colors hover:text-gray-900"
                >
                  <span className="relative z-10">{l.content.title}</span>
                  <span
                    className={
                      `absolute bottom-0 left-0 h-px w-full origin-left transform bg-current transition-transform duration-200 ` +
                      (isActive ? 'scale-x-100' : 'scale-x-0') +
                      ' group-hover:scale-x-100'
                    }
                  />
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
                !l ||
                typeof l !== 'object' ||
                !('full_slug' in l) ||
                !('name' in l)
              )
                return null
              const href = `/${l.full_slug}`
              const isActive = pathname === href

              return (
                <Link
                  key={i}
                  href={href}
                  onClick={() => setMobileOpen(false)}
                  className="group relative text-lg font-medium text-gray-700 transition-colors hover:text-gray-900"
                >
                  <span className="relative z-10">{l.content.title}</span>
                  <span
                    className={
                      `absolute bottom-0 left-0 h-px w-full origin-left transform bg-current transition-transform duration-200 ` +
                      (isActive ? 'scale-x-100' : 'scale-x-0') +
                      ' group-hover:scale-x-100'
                    }
                  />
                </Link>
              )
            })}
          </div>
        </div>
      )}
    </>
  )
}
