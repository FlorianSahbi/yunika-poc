import { StoryblokRichText } from '@storyblok/react/rsc'
import Image from 'next/image'
import clsx from 'clsx'
import type { JSX } from 'react'
import type { CamberStoryblok } from '@/types/storyblok'

interface CamberSpecProps {
  className?: string
  camber: CamberStoryblok[]
}

export default function CamberSpec({
  className,
  camber,
}: CamberSpecProps): JSX.Element {
  const spec = camber[0] ?? ({} as CamberStoryblok)
  const { media, description } = spec

  return (
    <section className={clsx(className)}>
      <h2 className="text-3xl font-bold">{spec.title}</h2>

      <div className="mb-8 h-px bg-gray-400" />

      {media?.filename && (
        <div className="relative aspect-[940/84] w-full overflow-hidden rounded-md">
          <Image
            src={media.filename}
            alt={media.alt ?? 'Camber spec'}
            fill
            className="object-cover"
          />
        </div>
      )}

      {description && (
        <div className="prose mt-4 text-center font-medium">
          <StoryblokRichText
            doc={
              description as Parameters<typeof StoryblokRichText>['0']['doc']
            }
          />
        </div>
      )}
    </section>
  )
}
