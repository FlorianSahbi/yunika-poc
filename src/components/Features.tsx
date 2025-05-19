'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import clsx from 'clsx'
import { useKeenSlider } from 'keen-slider/react'
import 'keen-slider/keen-slider.min.css'
import Guard from '@/components/Guard'
import type { JSX } from 'react'
import type { ISbStoryData } from '@storyblok/react/rsc'
import type { FeaturesStoryblok } from '@/types/storyblok'

interface FeaturesProps {
  className?: string
  features: ISbStoryData<FeaturesStoryblok>[]
}

export default function Features({
  className,
  features,
}: FeaturesProps): JSX.Element | null {
  const [currentSlide, setCurrentSlide] = useState(0)

  const [sliderRef, slider] = useKeenSlider<HTMLDivElement>({
    loop: true,
    mode: 'snap',
    slides: { perView: 1, spacing: 16 },
    breakpoints: {
      '(min-width: 480px)': { slides: { perView: 1, spacing: 16 } },
      '(min-width: 640px)': { slides: { perView: 2, spacing: 16 } },
      '(min-width: 768px)': { slides: { perView: 2, spacing: 20 } },
      '(min-width: 1024px)': { slides: { perView: 3, spacing: 20 } },
      '(min-width: 1280px)': { slides: { perView: 4, spacing: 24 } },
    },
    slideChanged(s) {
      setCurrentSlide(s.track.details.rel)
    },
  })

  const items = features ?? []
  if (items.length === 0) {
    return null
  }

  const totalSlides = items.length

  return (
    <section className={clsx(className)}>
      <div ref={sliderRef} className="keen-slider">
        {items.map((f, i) => (
          <Guard
            key={i}
            cond={
              !!(
                f.content.title ||
                f.content.description ||
                f.content.media?.filename
              )
            }
          >
            <div className="keen-slider__slide flex flex-col rounded-lg bg-gray-100 p-6">
              {f.content.title && (
                <p className="mb-4 text-center text-2xl font-semibold uppercase">
                  {f.content.title}
                </p>
              )}
              {f.content.description && (
                <p className="flex-1 text-center text-sm text-gray-700">
                  {f.content.description}
                </p>
              )}
              {f.content.media?.filename && (
                <div className="relative mx-auto mt-4 aspect-video w-4/5">
                  <Image
                    src={f.content.media.filename}
                    alt={f.content.media.alt ?? f.content.title ?? ''}
                    fill
                    className="object-contain"
                  />
                </div>
              )}
            </div>
          </Guard>
        ))}
      </div>

      {/* Pagination Dots with larger touch targets */}
      <div className="mt-4 flex justify-center space-x-4">
        {Array.from({ length: totalSlides }).map((_, idx) => (
          <button
            key={idx}
            onClick={() => slider.current?.moveToIdx(idx)}
            className="flex h-8 w-8 items-center justify-center rounded-full"
            aria-label={`Go to slide ${idx + 1}`}
          >
            <span
              className={clsx(
                'block h-3 w-3 rounded-full transition-colors',
                currentSlide === idx ? 'bg-gray-800' : 'bg-gray-400',
              )}
            />
          </button>
        ))}
      </div>
    </section>
  )
}
