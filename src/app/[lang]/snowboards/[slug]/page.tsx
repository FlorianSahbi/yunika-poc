import { notFound } from 'next/navigation'
import { fetchStory } from '@/utils/fetchStory'
import { fetchStories } from '@/utils/fetchStories'
import type { SnowboardStoryblok } from '@/types/storyblok'
import type { JSX } from 'react'
import type { ISbStoryData } from 'storyblok-js-client'
import CamberSpec from '@/components/CamberSpec'
import Features from '@/components/Features'
import ProductDetails from '@/components/ProductDetails'
import ProductImage from '@/components/ProductImage'
import TechSpec from '@/components/TechSpec'
import Guard from '@/components/Guard'
import { Metadata } from 'next/types'
import { Locale } from 'next-intl'

export async function generateMetadata({
  params,
}: {
  params: { lang: Locale; slug: string }
}): Promise<Metadata> {
  const { lang, slug } = await params
  let pageData: ISbStoryData<SnowboardStoryblok>
  try {
    pageData = await fetchStory<SnowboardStoryblok>(
      'published',
      ['snowboards', slug],
      { locale: lang },
    )
  } catch {
    notFound()
  }

  return {
    title: `${pageData.name} | Yunika Boards`,
  }
}

export async function generateStaticParams(): Promise<
  { lang: Locale; slug: string }[]
> {
  const locales: Locale[] = ['fr', 'en']
  const params: { lang: Locale; slug: string }[] = []

  for (const lang of locales) {
    const { stories } = await fetchStories<SnowboardStoryblok>(
      'published',
      'snowboards',
      { locale: lang },
    )
    stories.forEach((s) => {
      params.push({ lang, slug: s.slug })
    })
  }

  return params
}

interface PageProps {
  params: { lang: Locale; slug: string }
}

export default async function SnowboardPage({
  params,
}: PageProps): Promise<JSX.Element> {
  const { lang, slug } = await params

  if (lang !== 'fr' && lang !== 'en') notFound()

  let pageData: ISbStoryData<SnowboardStoryblok>
  try {
    pageData = await fetchStory<SnowboardStoryblok>(
      'published',
      ['snowboards', slug],
      { locale: lang },
    )
  } catch {
    notFound()
  }

  const { media = [], camber = [], tech = [], features = [] } = pageData.content

  return (
    // pt-12 + 16 : 12 Nav + Default Spacing
    <main className="px-4 pt-28 lg:px-0">
      <section className="mb-8 flex flex-col items-start gap-6 md:grid md:grid-cols-12 md:gap-16">
        <Guard cond={media.length > 0}>
          <ProductImage
            className="w-full md:col-span-6 md:col-start-2"
            media={media}
          />
        </Guard>

        <ProductDetails
          className="w-full md:sticky md:top-28 md:col-span-4 md:mt-16"
          slug={slug}
          title={pageData.content.title}
          price={pageData.content.price}
          description={pageData.content.description}
          types={pageData.content.types}
          artist={pageData.content.artist}
          rating={pageData.content.rating}
        />
      </section>

      <Guard cond={camber.length > 0}>
        <CamberSpec
          className="my-8 w-full px-0 md:col-start-2 md:col-end-[-2] md:px-4"
          camber={camber}
        />
      </Guard>

      <Guard cond={tech.length > 0}>
        <TechSpec
          className="my-8 w-full px-0 md:col-start-2 md:col-end-[-2] md:px-4"
          tech={tech}
        />
      </Guard>

      <Guard cond={features.length > 0}>
        <Features
          className="mb-16 mt-8 w-full px-0 md:px-4"
          features={features}
        />
      </Guard>
    </main>
  )
}
