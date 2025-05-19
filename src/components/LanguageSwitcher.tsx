'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Globe } from 'lucide-react'
import type { JSX } from 'react'

export default function LanguageSwitcher(): JSX.Element {
  const pathname = usePathname()
  const segments = pathname.split('/').filter(Boolean)

  const current = segments[0] === 'en' ? 'en' : 'fr'
  const target = current === 'en' ? 'fr' : 'en'

  const rest = segments.slice(1).join('/')
  const nextPath = `/${target}${rest ? `/${rest}` : ''}`

  return (
    <Link
      replace
      href={nextPath}
      scroll={false}
      aria-label={`Passer en ${target.toUpperCase()}`}
      className="flex items-center space-x-1 rounded px-2 py-1 text-xs font-semibold uppercase transition hover:bg-gray-100"
    >
      <Globe className="h-5 w-5" />
      <span>{target}</span>
    </Link>
  )
}
