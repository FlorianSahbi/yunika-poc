import { StoryblokRichText } from '@storyblok/react/rsc'
import Rating from './Rating'
import clsx from 'clsx'
import Artist from './Artist'
import { ShoppingCart, ChevronDown } from 'lucide-react'
import type { JSX } from 'react'
import type { ISbStoryData } from '@storyblok/react/rsc'
import type {
  SnowboardStoryblok,
  TypeStoryblok,
  ArtistStoryblok,
  RatingStoryblok,
  RichtextStoryblok,
} from '@/types/storyblok'
import { useLocale, useTranslations } from 'next-intl'

interface PurchaseFormProps {
  slug: string
  sizes: number[]
}

function PurchaseForm({ sizes }: PurchaseFormProps): JSX.Element {
  const t = useTranslations()
  const size = 'cm'

  return (
    <form>
      <div className="mb-2 mt-4">
        <label
          htmlFor="size"
          className="block text-sm font-medium text-gray-700"
        >
          {t('size')}
        </label>
        <div className="relative mt-1">
          <select
            id="size"
            name="size"
            defaultValue={sizes[0]}
            className={clsx(
              'w-full appearance-none rounded-md border border-gray-300 bg-white',
              'px-3 py-2 pr-10 text-sm text-gray-700',
              'focus:border-[#AA1F21] focus:outline-none focus:ring-2 focus:ring-[#AA1F21]',
              'transition duration-150 ease-in-out hover:border-gray-400',
            )}
          >
            {sizes.map((s) => (
              <option key={s} value={s}>
                {s}
                {size}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
            <ChevronDown className="h-4 w-4 text-gray-400" />
          </div>
        </div>
      </div>

      <button
        type="button"
        className={clsx(
          'flex w-full items-center justify-center gap-2',
          'rounded-md bg-[#AA1F21] py-3 text-sm font-semibold text-white',
          'hover:bg-[#8e1a1e]',
          'focus:outline-none focus:ring-2 focus:ring-[#AA1F21] focus:ring-offset-2',
          'transform transition duration-150 ease-in-out',
          'hover:-translate-y-0.5 hover:shadow active:scale-95',
        )}
      >
        <ShoppingCart className="h-5 w-5" />
        {t('addToCart')}
      </button>
    </form>
  )
}

interface ProductDetailsProps {
  className?: string
  slug: string
  title?: SnowboardStoryblok['title']
  price?: SnowboardStoryblok['price']
  types?: Array<ISbStoryData<TypeStoryblok> | string>
  description?: RichtextStoryblok
  artist?: ISbStoryData<ArtistStoryblok> | string
  rating?: RatingStoryblok[]
}

export default function ProductDetails({
  className,
  slug,
  title,
  price,
  types = [],
  description,
  artist,
  rating = [],
}: ProductDetailsProps): JSX.Element {
  const locale = useLocale()
  const currency = locale === 'en' ? 'USD' : 'EUR'

  const typeLabels = types
    .map((t) => (typeof t === 'object' && 'content' in t ? t.content.label : t))
    .filter((lbl): lbl is string => typeof lbl === 'string')

  const hasArtist = typeof artist === 'object' && 'content' in artist
  return (
    <section className={clsx(className)}>
      {typeLabels.length > 0 && (
        <p className="text-sm uppercase tracking-wide text-gray-500">
          {typeLabels.join(' / ')}
        </p>
      )}

      {title && <h1 className="text-3xl font-extrabold">{title}</h1>}

      {price && (
        <p className="text-2xl font-semibold">
          {new Intl.NumberFormat(locale, {
            style: 'currency',
            currency: currency,
          }).format(price)}
        </p>
      )}

      <PurchaseForm slug={slug} sizes={[143, 146, 149, 152]} />

      {rating.length > 0 && (
        <div className="my-8">
          {rating.map((r, i) => (
            <Rating
              key={i}
              className="mb-2"
              label={r.label ?? ''}
              value={r.value ? parseInt(r.value, 10) : 0}
            />
          ))}
        </div>
      )}

      {description && (
        <div className="prose mb-4">
          <StoryblokRichText doc={description as never} />
        </div>
      )}

      {hasArtist && (
        <Artist
          className="mt-4"
          artist={artist as ISbStoryData<ArtistStoryblok>}
        />
      )}
    </section>
  )
}
