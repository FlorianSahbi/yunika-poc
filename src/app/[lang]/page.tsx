import { StoryblokStory } from '@storyblok/react/rsc'
import { fetchStory } from '@/utils/fetchStory'
import type { PageStoryblok } from '@/types/storyblok'
import { notFound } from 'next/navigation'
import type { JSX } from 'react'
import { routing } from '@/i18n/routing'

export async function generateStaticParams() {
  return routing.locales.map((locale) => ({ lang: locale }))
}

interface PageProps {
  params: {
    lang: 'fr' | 'en'
  }
}

export default async function Home({
  params,
}: PageProps): Promise<JSX.Element> {
  const { lang } = await params

  if (lang !== 'fr' && lang !== 'en') {
    notFound()
  }

  try {
    const pageData = await fetchStory<PageStoryblok>('published', ['home'], {
      locale: lang,
    })
    return <StoryblokStory story={pageData} />
  } catch (err) {
    console.error('Erreur fetch Storyblok :', err)
    notFound()
  }
}
