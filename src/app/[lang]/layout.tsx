import './globals.css'
import { Rajdhani } from 'next/font/google'
import StoryblokProvider from '@/components/StoryBlokProvider'
import { StoryblokServerComponent } from '@storyblok/react/rsc'
import { fetchStories } from '@/utils/fetchStories'
import { CartProvider } from '@/components/CartContext'
import CartPanel from '@/components/CartPanel'

import type { ISbStoryData } from '@storyblok/react/rsc'
import type {
  HeaderStoryblok,
  FooterStoryblok
} from '@/types/storyblok'
import type { JSX } from 'react'
import { Metadata } from 'next'

const rajdhani = Rajdhani({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-rajdhani',
})

export const metadata: Metadata = {
  title: 'Yunika Boards | Welcome',
  description: 'Découvrez notre collection de snowboards artisanaux',
  openGraph: {
    title: 'My Storyblok Shop',
    description: 'Découvrez notre collection de snowboards artisanaux',
    url: 'https://yunika-poc',
    siteName: 'Storyblok Shop',
    images: [
      {
        url: 'https://yunika-poc/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Storyblok Snowboard Shop',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Yunika Boards | Welcome',
    description: 'Découvrez notre collection de snowboards artisanaux',
    images: ['https://yunika-poc/og-image.jpg'],
  },
}

type Lang = 'fr' | 'en';

export default async function RootLayout({
  children,
  params
}: {
  children: React.ReactNode,
  params: { lang: Lang; slug: string };
}): Promise<JSX.Element> {
  const { lang } = await params;

  const [hdrResult, ftrResult] = await Promise.all([
    (async () => {
      try {
        const { stories } = await fetchStories<HeaderStoryblok>(
          'published',
          'global',
          { locale: lang }
        )
        return stories.find(
          (s): s is ISbStoryData<HeaderStoryblok> =>
            s.content.component === 'header'
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
          { locale: lang }
        )
        return stories.find(
          (s): s is ISbStoryData<FooterStoryblok> =>
            s.content.component === 'footer'
        )
      } catch {
        return undefined
      }
    })(),
  ])

  const header = hdrResult
  const footer = ftrResult

  return (
    <html lang="en">
      <body className={`${rajdhani.variable} font-sans antialiased`}>
        <StoryblokProvider>
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
        </StoryblokProvider>
      </body>
    </html>
  )
}
