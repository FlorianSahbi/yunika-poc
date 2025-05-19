import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import type { ISbStoryData } from '@storyblok/react/rsc'
import type { ArtistStoryblok } from '@/types/storyblok'
import { ArrowRight } from 'lucide-react'
import { useTranslations } from 'next-intl'

interface ArtistCardProps {
  className?: string
  artist: ISbStoryData<ArtistStoryblok>
}

export default function ArtistCard({ className, artist }: ArtistCardProps) {
  const t = useTranslations()
  const { content } = artist
  const { media, name } = content

  return (
    <Link className={clsx(className)} href={`#`} passHref>
      <article className="group flex items-center gap-3 rounded-md border border-gray-200 bg-white p-3 transition-all duration-200 ease-out hover:-translate-y-0.5 hover:shadow-md">
        <figure className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-full">
          <Image
            src={media?.filename ?? ''}
            alt={media?.alt ?? name ?? 'Artist'}
            fill
            className="object-cover transition-transform duration-200 ease-out group-hover:scale-105"
          />
        </figure>

        <figcaption className="flex-1">
          <p className="text-sm font-medium text-gray-800 transition-colors duration-200 group-hover:text-[#038674]">
            {t('artistTitle')} {name}
          </p>
          <p className="flex items-center text-xs text-gray-500">
            <span>{t('artistSubTitle')}</span>
            <ArrowRight className="h-3 w-3 text-gray-400" />
          </p>
        </figcaption>
      </article>
    </Link>
  )
}
