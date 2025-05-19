'use client'
import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { useCart } from './CartContext'
import { motion, AnimatePresence } from 'framer-motion'
import { useLocale, useTranslations } from 'next-intl'
import Image from 'next/image'
import { X } from 'lucide-react'

export default function CartPanel() {
  const separators = [':', '-']
  const t = useTranslations()
  const { items, isOpen, toggleOpen } = useCart()
  const [portalRoot, setPortalRoot] = useState<HTMLElement | null>(null)
  const locale = useLocale()
  const currency = locale === 'en' ? 'USD' : 'EUR'
  const hardCodedPrice = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(1148)

  useEffect(() => {
    const el = document.createElement('div')
    document.body.appendChild(el)
    setPortalRoot(el)
    return () => {
      document.body.removeChild(el)
    }
  }, [])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  if (!portalRoot) return null

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 z-50 bg-black/50"
            onClick={toggleOpen}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />

          <motion.aside
            className="fixed right-0 top-0 z-50 flex h-full w-full flex-col bg-white shadow-xl md:w-2/5"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
          >
            <div className="flex h-12 items-center justify-between border-b border-gray-300 px-4">
              <h2 className="text-lg font-semibold">{t('cart')}</h2>
              <button
                onClick={toggleOpen}
                aria-label="Fermer"
                className="text-2xl leading-none"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 space-y-4 overflow-auto p-4">
              {items.map((p, i) => (
                <div key={i} className="flex items-start space-x-3">
                  <div className="relative aspect-[4/6] w-20">
                    <Image
                      src={p.image}
                      alt={p.title}
                      fill
                      className="rounded-lg object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{p.title}</p>
                    <p className="text-xs text-gray-600">
                      {t('size')} {separators[0]} {p.size}
                    </p>
                    <p className="text-xs text-gray-600">
                      {t('quantity')} {separators[0]} {p.quantity}
                    </p>
                  </div>
                  <div className="text-sm font-semibold">
                    {new Intl.NumberFormat(locale, {
                      style: 'currency',
                      currency: currency,
                    }).format(p.price)}
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-300 p-4">
              <button className="w-full rounded bg-black py-3 font-semibold uppercase text-white">
                {t('completeOrder')} {separators[1]} {hardCodedPrice}
              </button>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>,
    portalRoot,
  )
}
