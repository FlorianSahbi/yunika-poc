import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { fetchStory } from '@/utils/fetchStory'
// import { Columns, LayoutGrid } from 'lucide-react'
import type { ISbStoryData } from '@storyblok/react/rsc'
import type { JSX } from 'react'
import type { CollectionStoryblok, TypeStoryblok } from '@/types/storyblok'
import Guard from '@/components/Guard'
import { fetchStories } from '@/utils/fetchStories'
import { getTranslations } from 'next-intl/server'
import { Locale } from 'next-intl'
import { Metadata } from 'next/types'

export async function generateMetadata({
  params,
}: {
  params: { lang: Locale; slug: string }
}): Promise<Metadata> {
  const { lang, slug } = params
  let pageData: ISbStoryData<CollectionStoryblok>
  try {
    pageData = await fetchStory<CollectionStoryblok>(
      'published',
      ['collections', slug],
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
    const { stories } = await fetchStories<CollectionStoryblok>(
      'published',
      'collections',
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
  searchParams: { cols?: string }
}

export default async function CollectionsPage({
  params,
  // searchParams,
}: PageProps): Promise<JSX.Element> {
  const t = await getTranslations()
  const { lang, slug } = await params
  const currency = lang === 'en' ? 'USD' : 'EUR'

  let pageData: ISbStoryData<CollectionStoryblok>
  try {
    pageData = await fetchStory<CollectionStoryblok>(
      'published',
      ['collections', slug],
      { locale: lang },
    )
  } catch {
    notFound()
  }

  const { collections = [], products = [], title, subtitle } = pageData.content
  const hasCollections = collections.length > 0
  const hasProducts = products.length > 0

  // const displayCols = searchParams.cols === '3' ? 3 : 4

  return (
    <main>
      <section className="relative h-[70vh] w-full overflow-hidden">
        <Image
          src="https://a.storyblok.com/f/338283/2560x1374/71026cd960/yunika-1.webp"
          alt="Bannière collection"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
          {title && (
            <h1 className="text-3xl font-extrabold leading-tight text-white sm:text-4xl md:text-5xl lg:text-6xl">
              {title}
            </h1>
          )}
          {subtitle && (
            <p className="mt-2 max-w-2xl text-sm text-gray-200 sm:text-base md:text-lg">
              {subtitle}
            </p>
          )}
          {hasProducts && (
            <span className="mt-4 inline-block text-xs uppercase tracking-wide text-gray-300 sm:text-sm">
              {products.length} {t('item', { count: products.length })}
            </span>
          )}
        </div>
      </section>

      <Guard cond={hasCollections}>
        <div className="sticky top-12 z-10 flex items-center justify-between bg-[#231F20] px-4 py-4">
          <div className="flex-1 space-x-4 overflow-x-auto whitespace-nowrap">
            {collections.map((cat) => (
              <Link
                key={cat.full_slug}
                href={`/${cat.full_slug}`}
                className="inline-block text-sm font-semibold text-white transition-colors hover:text-[#038674]"
              >
                {cat.content.title}
              </Link>
            ))}
          </div>
          {/* <div className="hidden md:flex items-center gap-3 ml-4">
            <span className="text-sm font-semibold text-white">Grid</span>
            {[3, 4].map((cols) => {
              const Icon = cols === 3 ? Columns : LayoutGrid
              const isActive = displayCols === cols
              return (
                <Link
                  key={cols}
                  scroll={false}
                  href={`?cols=${cols}`}
                  className={`p-2 rounded-md transition-colors ${isActive
                      ? 'bg-white text-[#231F20]'
                      : 'text-white hover:bg-[#038674]/20'
                    }`}
                  aria-label={`${cols}-column view`}
                >
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </Link>
              )
            })}
          </div> */}
        </div>
      </Guard>

      <Guard cond={hasProducts}>
        <div
          className={`my-16 grid grid-cols-1 gap-4 px-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4`}
        >
          {products.map((prod) => {
            const {
              slug: prodSlug,
              content: { title: prodTitle, media, price, types },
            } = prod
            const image = Array.isArray(media) ? media[0] : null
            const imageHover = Array.isArray(media) ? media[1] : null

            return (
              <article key={prodSlug} className="col-span-1">
                <Link
                  href={`/${lang}/snowboards/${prodSlug}`}
                  className="group block"
                >
                  <div className="relative aspect-[4/6] w-full overflow-hidden rounded-lg border shadow-sm">
                    {image && (
                      <Image
                        src={image.filename}
                        alt={prodTitle}
                        fill
                        style={{ objectFit: 'cover' }}
                        className="object-cover transition-opacity duration-300 ease-in-out group-hover:opacity-0"
                        sizes="(max-width: 640px) 100vw, 25vw"
                        draggable={false}
                      />
                    )}
                    {imageHover && (
                      <Image
                        src={imageHover.filename}
                        alt="Preview"
                        fill
                        style={{ objectFit: 'cover' }}
                        className="absolute inset-0 object-cover opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100"
                        loading="eager"
                        draggable={false}
                      />
                    )}
                  </div>
                  <div className="ml-2 mt-2">
                    <div className="flex items-baseline justify-between">
                      <p className="truncate text-base font-semibold text-[#231F20]">
                        {prodTitle}
                      </p>
                      {/* Intl.NumberFormat("de-DE", {style: "currency", currency: "EUR" }).format(number) */}
                      <p className="ml-2 text-xs font-bold text-[#AA1F21]">
                        {new Intl.NumberFormat(lang, {
                          style: 'currency',
                          currency: currency,
                        }).format(price)}
                      </p>
                    </div>
                    <p className="mt-1 text-xs font-medium uppercase text-[#038674]">
                      {types.map((t: TypeStoryblok) => t.name).join(' / ')}
                    </p>
                  </div>
                </Link>
              </article>
            )
          })}
        </div>
      </Guard>
    </main>
  )
}
