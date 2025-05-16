import Image from 'next/image';
import clsx from 'clsx';
import Guard from '@/components/Guard';
import type { JSX } from 'react';
import type { ISbStoryData } from '@storyblok/react/rsc';
import type { FeaturesStoryblok } from '@/types/storyblok';

interface FeaturesProps {
  className?: string;
  features: ISbStoryData<FeaturesStoryblok>[];
}

export default function Features({ className, features }: FeaturesProps): JSX.Element | null {
  const items: ISbStoryData<FeaturesStoryblok>[] = features ?? [];
  if (items.length === 0) return null;

  return (
    <section className={clsx(className)}>
      {items.map((f, i: number) => {
        const { title, description, media } = f.content;

        return (
          <Guard key={i} cond={!!(title || description || media?.filename)}>
            <div className="bg-gray-100 p-6 rounded-lg flex flex-col">
              {title && (
                <h3 className="text-2xl font-semibold text-center uppercase">
                  {title}
                </h3>
              )}

              {description && (
                <p className="text-sm text-gray-700 flex-1 text-center">
                  {description}
                </p>
              )}

              {media?.filename && (
                <div className="relative aspect-video w-4/5 mx-auto mt-4">
                  <Image
                    src={media.filename}
                    alt={media.alt ?? title ?? ''}
                    fill
                    className="object-contain"
                  />
                </div>
              )}
            </div>
          </Guard>
        );
      })}
    </section>
  );
}