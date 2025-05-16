'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';
import clsx from 'clsx';
import type { CommitmentStoryblok } from '@/types/storyblok';

interface CommitmentsCarouselProps {
  commitments: CommitmentStoryblok[];
}

export default function CommitmentsCarousel({ commitments }: CommitmentsCarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = commitments.length;

  const [sliderRef, slider] = useKeenSlider<HTMLDivElement>({
    loop: true,
    slides: { perView: 1 },
    breakpoints: {
      '(min-width: 768px)': {
        loop: false,
        slides: { perView: 3, spacing: 24 },
      },
    },
    slideChanged(s) {
      setCurrentSlide(s.track.details.rel);
    },
  });

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
                <div className="bg-white rounded-full w-12 h-12 relative">
                  <Image
                    src={item.media.filename}
                    alt={item.media.alt ?? ''}
                    fill
                    className="object-contain"
                  />
                </div>
              )}
              {item.title && <p className="mt-2 font-semibold text-center">{item.title}</p>}
              {item.subtitle && (
                <p className="mt-1 text-sm text-gray-200 text-center">{item.subtitle}</p>
              )}
            </div>
          ))}
        </div>

        <div className="mt-4 flex justify-center space-x-2 p-2 rounded-full mx-auto">
          {Array.from({ length: totalSlides }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => slider.current?.moveToIdx(idx)}
              className={clsx(
                'w-2 h-2 rounded-full transition-colors',
                currentSlide === idx ? 'bg-[#05AB94]' : 'bg-white'
              )}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      <div className="hidden md:grid md:grid-cols-3 gap-6">
        {commitments.map((item) => (
          <div key={item._uid} className="flex flex-col items-center">
            {item.media?.filename && (
              <div className="bg-white rounded-full w-12 h-12 relative">
                <Image
                  src={item.media.filename}
                  alt={item.media.alt ?? ''}
                  fill
                  className="object-contain"
                />
              </div>
            )}
            {item.title && <p className="mt-2 font-semibold text-center">{item.title}</p>}
            {item.subtitle && (
              <p className="mt-1 text-sm text-gray-200 text-center">{item.subtitle}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}