import { storyblokEditable } from '@storyblok/react/rsc'
import React, { JSX } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import type {
  DoubleImagesStoryblok,
  DoubleImagesBlockStoryblok,
} from '@/types/storyblok'

interface DoubleImagesProps {
  blok: DoubleImagesStoryblok
}

export default function DoubleImages({
  blok,
}: DoubleImagesProps): JSX.Element | null {
  const items: DoubleImagesBlockStoryblok[] = blok.items ?? []
  if (items.length === 0) return null

  return (
    <section
      className="grid grid-cols-12 md:mt-2 md:gap-2"
      {...storyblokEditable(blok)}
    >
      {items.map((item, idx) => {
        return (
          <div
            key={item._uid ?? idx}
            className="group relative col-span-12 md:col-span-6"
          >
            <Link href={`/${item.full_slug}`}>
              <div className="relative aspect-[4/6] w-full overflow-hidden md:aspect-[4/5] md:rounded-lg">
                {item?.content?.media?.filename && (
                  <Image
                    src={item?.content?.media?.filename}
                    alt={item?.content?.media?.alt || ''}
                    fill
                    className="object-cover"
                    draggable={false}
                  />
                )}

                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />

                <div className="pointer-events-none absolute bottom-0 left-0 p-4">
                  {item.name && (
                    <h2 className="relative inline-block text-4xl font-extrabold text-white">
                      <span className="relative z-10">
                        {item.content.title}
                      </span>
                      <span className="absolute bottom-0 left-0 h-1 w-full origin-left scale-x-0 transform bg-white transition-transform duration-300 group-hover:scale-x-100" />
                    </h2>
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
