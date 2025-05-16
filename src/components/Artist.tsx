import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import type { ISbStoryData } from '@storyblok/react/rsc'
import type { ArtistStoryblok } from '@/types/storyblok'

interface ArtistCardProps {
  className?: string
  artist: ISbStoryData<ArtistStoryblok>
}

export default function ArtistCard({
  className,
  artist,
}: ArtistCardProps) {
  const { content } = artist
  const { media, name } = content

  return (
    <Link className={clsx(className)} href={`#`} passHref>
      <article
        className="
          group flex items-center bg-white border border-gray-200 rounded-md
          p-3 gap-3
          transition-all duration-200 ease-out
          hover:shadow-md hover:-translate-y-0.5
        "
      >
        <figure className="relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
          <Image
            src={media?.filename ?? ''}
            alt={media?.alt ?? name ?? 'Artist'}
            fill
            className="
              object-cover
              group-hover:scale-105
              transition-transform duration-200 ease-out
            "
          />
        </figure>

        <figcaption className="flex-1">
          <h3
            className="
              text-sm font-medium text-gray-800
              group-hover:text-red-600
              transition-colors duration-200
            "
          >
            Artwork by {name}
          </h3>
          <p className="text-xs text-gray-500">
            Discover portfolio&nbsp;&rarr;
          </p>
        </figcaption>
      </article>
    </Link>
  )
}
