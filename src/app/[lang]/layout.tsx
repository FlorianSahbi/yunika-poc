import './globals.css'
import { Rajdhani } from 'next/font/google'
import StoryblokProvider from '@/components/StoryBlokProvider'
import { StoryblokServerComponent } from '@storyblok/react/rsc'
import { fetchStories } from '@/utils/fetchStories'
import { CartProvider } from '@/components/CartContext'
import CartPanel from '@/components/CartPanel'
import { Locale, NextIntlClientProvider, hasLocale } from 'next-intl'
import { notFound } from 'next/navigation'
import { routing } from '@/i18n/routing'

import type { ISbStoryData } from '@storyblok/react/rsc'
import type { HeaderStoryblok, FooterStoryblok } from '@/types/storyblok'
import type { JSX } from 'react'
import { Metadata } from 'next'

const rajdhani = Rajdhani({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-rajdhani',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://yunika-poc.vercel.app'),
  title: 'Yunika Boards | Welcome',
  description: 'Découvrez notre collection de snowboards artisanaux',
  openGraph: {
    title: 'Yunika POC',
    description: 'Découvrez notre collection de snowboards artisanaux',
    url: 'https://yunika-poc.vercel.app',
    siteName: 'Yunika Boards',
    images: [
      {
        url: 'https://yunika-poc.vercel.app/yunika-metadata.jpg',
        width: 1200,
        height: 630,
        alt: 'Yunika Boards',
      },
    ],
    locale: 'en',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Yunika Boards | Welcome',
    description: 'Découvrez notre collection de snowboards artisanaux',
    images: ['https://yunika-poc.vercel.app/yunika-metadata.jpg'],
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
  },
}

export async function generateStaticParams() {
  return routing.locales.map((locale) => ({ lang: locale }))
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { lang: Locale; slug: string }
}): Promise<JSX.Element> {
  const { lang } = await params

  if (!hasLocale(routing.locales, lang)) {
    notFound()
  }

  const [hdrResult, ftrResult] = await Promise.all([
    (async () => {
      try {
        const { stories } = await fetchStories<HeaderStoryblok>(
          'published',
          'global',
          { locale: lang },
        )
        return stories.find(
          (s): s is ISbStoryData<HeaderStoryblok> =>
            s.content.component === 'header',
        )
      } catch {
        return undefined
      }
    })(),

    (async () => {
      try {
        const { stories } = await fetchStories<FooterStoryblok>(
          'published',
          'global',
          { locale: lang },
        )
        return stories.find(
          (s): s is ISbStoryData<FooterStoryblok> =>
            s.content.component === 'footer',
        )
      } catch {
        return undefined
      }
    })(),
  ])

  const header = hdrResult
  const footer = ftrResult

  return (
    <html lang={lang}>
      <body className={`${rajdhani.variable} font-sans antialiased`}>
        <StoryblokProvider>
          <NextIntlClientProvider>
            <CartProvider>
              {header && (
                <StoryblokServerComponent
                  key={header.content._uid}
                  blok={header.content}
                />
              )}

              {children}

              {footer && (
                <StoryblokServerComponent
                  key={footer.content._uid}
                  blok={footer.content}
                />
              )}

              <CartPanel />
            </CartProvider>
          </NextIntlClientProvider>
        </StoryblokProvider>
      </body>
    </html>
  )
}
