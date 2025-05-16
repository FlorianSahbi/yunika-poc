import { storyblokEditable } from '@storyblok/react/rsc'
import React, { JSX } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import type { DoubleImagesStoryblok, DoubleImagesBlockStoryblok, CtaStoryblok, AssetStoryblok } from '@/types/storyblok'

interface DoubleImagesProps {
  blok: DoubleImagesStoryblok
}

export default function DoubleImages({ blok }: DoubleImagesProps): JSX.Element | null {
  const items: DoubleImagesBlockStoryblok[] = blok.items ?? []
  if (items.length === 0) return null

  return (
    <section
      className="grid grid-cols-12 gap-2 mt-2"
      {...storyblokEditable(blok)}
    >
      {items.map((item, idx) => {
        const media: AssetStoryblok | undefined = 'media' in item ? item.media : undefined
        const ctaList: CtaStoryblok[] = item.cta ?? []
        const firstUrl = ctaList[0]?.link?.cached_url ?? '#'

        return (
          <div key={item._uid ?? idx} className="col-span-6 relative group">
            <Link href={`/${firstUrl}`}> 
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-lg">
                {media?.filename && (
                  <Image
                    src={media.filename}
                    alt={media.alt || ''}
                    fill
                    className="object-cover"
                    draggable={false}
                  />
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent pointer-events-none" />

                <div className="absolute bottom-0 left-0 p-4 pointer-events-none">
                  {item.title && (
                    <h2 className="text-4xl font-extrabold text-white inline-block relative">
                      <span className="relative z-10">{item.title}</span>
                      <span className="absolute left-0 bottom-0 h-1 w-full bg-white scale-x-0 origin-left transform transition-transform duration-300 group-hover:scale-x-100" />
                    </h2>
                  )}

                  {item.subtitle && (
                    <p className="mt-1 text-lg font-light text-white opacity-70 transition-opacity duration-300 group-hover:opacity-100">
                      {item.subtitle}
                    </p>
                  )}
                </div>
              </div>
            </Link>
          </div>
        )
      })}
    </section>
  )
}
