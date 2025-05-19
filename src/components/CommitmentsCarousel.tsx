'use client'

import React, { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import { useKeenSlider, KeenSliderInstance } from 'keen-slider/react'
import 'keen-slider/keen-slider.min.css'
import clsx from 'clsx'
import type { CommitmentStoryblok } from '@/types/storyblok'

interface CommitmentsCarouselProps {
  commitments: CommitmentStoryblok[]
}

export default function CommitmentsCarousel({
  commitments,
}: CommitmentsCarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const totalSlides = commitments.length
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const isHovering = useRef<boolean>(false)

  const autoplayPlugin = (slider: KeenSliderInstance) => {
    function clearNextTimeout() {
      if (timerRef.current) {
        clearTimeout(timerRef.current)
      }
    }
    function nextTimeout() {
      clearNextTimeout()
      if (isHovering.current) return
      timerRef.current = setTimeout(() => {
        slider.next()
      }, 3000)
    }

    slider.on('created', () => {
      slider.container.addEventListener('mouseover', () => {
        isHovering.current = true
        clearNextTimeout()
      })
      slider.container.addEventListener('mouseout', () => {
        isHovering.current = false
        nextTimeout()
      })
      nextTimeout()
    })
    slider.on('dragStarted', clearNextTimeout)
    slider.on('animationEnded', nextTimeout)
    slider.on('updated', nextTimeout)
  }

  const [sliderRef, slider] = useKeenSlider<HTMLDivElement>(
    {
      loop: true,
      slides: { perView: 1 },
      breakpoints: {
        '(min-width: 768px)': {
          loop: false,
          slides: { perView: 3, spacing: 24 },
        },
      },
      slideChanged(s) {
        setCurrentSlide(s.track.details.rel)
      },
    },
    [autoplayPlugin],
  )

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current)
      }
    }
  }, [])

  return (
    <div className="container mx-auto py-8">
      <div className="md:hidden">
        <div ref={sliderRef} className="keen-slider overflow-hidden">
          {commitments.map((item) => (
            <div
              key={item._uid}
              className="keen-slider__slide flex flex-col items-center px-4"
            >
              {item.media?.filename && (
                <div className="relative h-12 w-12 rounded-full bg-white">
                  <Image
                    src={item.media.filename}
                    alt={item.media.alt ?? ''}
                    fill
                    loading="lazy"
                    className="object-contain"
                  />
                </div>
              )}
              {item.title && (
                <p className="mt-2 text-center font-semibold">{item.title}</p>
              )}
              {item.subtitle && (
                <p className="mt-1 text-center text-sm text-gray-200">
                  {item.subtitle}
                </p>
              )}
            </div>
          ))}
        </div>
        <div className="mt-4 flex justify-center">
          {Array.from({ length: totalSlides }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => slider.current?.moveToIdx(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className="flex h-12 w-12 items-center justify-center rounded-full"
            >
              <span
                className={clsx(
                  'block h-2 w-2 rounded-full transition-colors',
                  currentSlide === idx ? 'bg-[#038674]' : 'bg-white',
                )}
              />
            </button>
          ))}
        </div>
      </div>

      <div className="hidden gap-6 md:grid md:grid-cols-3">
        {commitments.map((item) => (
          <div key={item._uid} className="flex flex-col items-center">
            {item.media?.filename && (
              <div className="relative h-12 w-12 rounded-full bg-white">
                <Image
                  src={item.media.filename}
                  alt={item.media.alt ?? ''}
                  fill
                  className="object-contain"
                />
              </div>
            )}
            {item.title && (
              <p className="mt-2 text-center font-semibold uppercase">
                {item.title}
              </p>
            )}
            {item.subtitle && (
              <p className="text-center text-sm text-gray-200">
                {item.subtitle}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
