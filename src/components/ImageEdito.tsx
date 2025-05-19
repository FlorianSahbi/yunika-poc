import { storyblokEditable, StoryblokRichText } from '@storyblok/react/rsc'
import React from 'react'
import Image from 'next/image'
import type {
  ImageEditoStoryblok,
  DoubleImagesBlockStoryblok,
} from '@/types/storyblok'

interface ImageEditoProps {
  blok: ImageEditoStoryblok
}

const ImageEdito: React.FC<ImageEditoProps> = ({ blok }) => {
  const items: DoubleImagesBlockStoryblok[] = blok.items ?? []

  return (
    <section
      className="my-2 grid grid-cols-12 gap-2"
      {...storyblokEditable(blok)}
    >
      {items.map((item, idx) => (
        <div key={item._uid || idx} className="relative col-span-6">
          <div
            className="relative flex aspect-[4/5] w-full items-center justify-center overflow-hidden rounded-lg"
            style={item.color ? { backgroundColor: item.color } : undefined}
          >
            {!item.color && item.media && (
              <Image
                src={item.media.filename || ''}
                alt={item.media.alt || 'Image'}
                fill
                className="object-cover"
              />
            )}

            <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
              {item.title && (
                <p className="text-center text-4xl font-extrabold text-white drop-shadow-lg">
                  {item.title}
                </p>
              )}
              {item.rich && (
                <div className="prose mt-4 text-center font-medium text-white">
                  <StoryblokRichText doc={item.rich as never} />
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </section>
  )
}

export default ImageEdito
