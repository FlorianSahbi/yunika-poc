import { storyblokEditable, StoryblokRichText } from '@storyblok/react/rsc'
import React from 'react'
import Image from 'next/image'
import type { ImageEditoStoryblok, DoubleImagesBlockStoryblok } from '@/types/storyblok'

interface ImageEditoProps {
  blok: ImageEditoStoryblok
}

const ImageEdito: React.FC<ImageEditoProps> = ({ blok }) => {
  const items: DoubleImagesBlockStoryblok[] = blok.items ?? []

  return (
    <section
      className="grid grid-cols-12 gap-2 my-2"
      {...storyblokEditable(blok)}
    >
      {items.map((item, idx) => (
        <div key={item._uid || idx} className="col-span-6 relative">
          <div
            className="relative aspect-[4/5] w-full overflow-hidden flex items-center justify-center rounded-lg"
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
                <p className="text-4xl font-extrabold text-center text-white drop-shadow-lg">
                  {item.title}
                </p>
              )}
              {item.rich && (
                <div className="prose text-center mt-4 font-medium text-white">
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
