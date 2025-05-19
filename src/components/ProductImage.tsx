import clsx from 'clsx'
import Image from 'next/image'
import type { JSX } from 'react'
import type { MultiassetStoryblok } from '@/types/storyblok'

interface ProductImageProps {
  className?: string
  media: MultiassetStoryblok
}

export default function ProductImage({
  media,
  className,
}: ProductImageProps): JSX.Element {
  return (
    <section className={clsx(className)}>
      <div className="grid grid-cols-2 gap-4">
        {media.map((img, idx) => (
          <div
            key={img.id ?? idx}
            className="relative aspect-[4/7] w-full overflow-hidden rounded-lg border shadow-sm"
          >
            {img.filename && (
              <Image
                src={img.filename}
                alt={img.alt ?? img.name ?? 'Product Image'}
                fill
                className="object-cover"
                priority={idx < 2}
                loading={idx < 2 ? 'eager' : 'lazy'}
              />
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
