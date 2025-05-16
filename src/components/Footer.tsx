import Image from 'next/image';
import { storyblokEditable } from '@storyblok/react/rsc';
import Badge from '@/components/Badge';
import clsx from 'clsx';
import type { JSX } from 'react';
import type {
  FooterStoryblok,
  CommitmentStoryblok,
  SocialStoryblok,
} from '@/types/storyblok';
import CommitmentsCarousel from './CommitmentsCarousel';

interface FooterProps {
  blok: FooterStoryblok;
}

export default function Footer({ blok }: FooterProps): JSX.Element {
  const backgroundUrl = blok.background?.filename;
  const commitments: CommitmentStoryblok[] = blok.list ?? [];
  const socials: SocialStoryblok[] = blok.socials ?? [];

  const badgeItems = socials
    .filter((s): s is SocialStoryblok & { link: { url: string } } =>
      !!s.link && typeof s.link.url === 'string'
    )
    .map((s) => ({
      _uid: s._uid,
      iconName: s.iconName ?? '',
      link: { url: s.link.url },
    }));

  return (
    <footer
      {...storyblokEditable(blok)}
      className={clsx('bg-stone-900 text-white', backgroundUrl && 'bg-cover bg-center')}
      style={
        backgroundUrl ? { backgroundImage: `url(${backgroundUrl})` } : undefined
      }
    >
      {blok.title && (
        <p className="mx-auto text-4xl uppercase font-medium text-center pt-6">
          {blok.title}
        </p>
      )}

      <CommitmentsCarousel commitments={commitments} />

      <div className="w-full h-4 bg-red-700" />

      <div className="container mx-auto py-6 text-center flex flex-col gap-4">
        {blok.logo?.filename && (
          <div className="relative aspect-[70/99] w-24 mx-auto mt-4">
            <Image
              src={blok.logo.filename}
              alt={blok.logo.alt ?? ''}
              fill
              loading="lazy"
              className="object-contain"
            />
          </div>
        )}

        {badgeItems.length > 0 && <Badge className="justify-center" items={badgeItems} />}
      </div>
    </footer>
  );
}
