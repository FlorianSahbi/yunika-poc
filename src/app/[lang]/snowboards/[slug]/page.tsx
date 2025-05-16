import { notFound } from 'next/navigation';
import { fetchStory } from '@/utils/fetchStory';
import { fetchStories } from '@/utils/fetchStories';
import type { SnowboardStoryblok } from '@/types/storyblok';
import type { JSX } from 'react';
import type { ISbStoryData } from 'storyblok-js-client';
import Breadcrumb from '@/components/Breadcrumb';
import CamberSpec from '@/components/CamberSpec';
import Features from '@/components/Features';
import ProductDetails from '@/components/ProductDetails';
import ProductImage from '@/components/ProductImage';
import TechSpec from '@/components/TechSpec';
import Guard from '@/components/Guard';

type Lang = 'fr' | 'en';

export async function generateStaticParams(): Promise<
  { lang: Lang; slug: string }[]
> {
  const locales: Lang[] = ['fr', 'en'];
  const params: { lang: Lang; slug: string }[] = [];

  for (const lang of locales) {
    const { stories } = await fetchStories<SnowboardStoryblok>(
      'published',
      'snowboards',
      { locale: lang }
    );
    stories.forEach((s) => {
      params.push({ lang, slug: s.slug });
    });
  }

  return params;
}

interface PageProps {
  params: { lang: Lang; slug: string };
}

export default async function SnowboardPage({ params }: PageProps): Promise<JSX.Element> {
  const { lang, slug } = params;

  if (lang !== 'fr' && lang !== 'en') notFound();

  let pageData: ISbStoryData<SnowboardStoryblok>;
  try {
    pageData = await fetchStory<SnowboardStoryblok>(
      'published',
      ['snowboards', slug],
      { locale: lang }
    );
  } catch {
    notFound();
  }

  const { media = [], camber = [], tech = [], features = [] } = pageData.content;

  return (
    <main className="px-4 pt-16 lg:px-0">
      <Breadcrumb />

      <section className="mb-8 flex flex-col gap-6 md:grid md:grid-cols-12 md:gap-16 items-start">
        <Guard cond={media.length > 0}>
          <ProductImage
            className="w-full md:col-start-2 md:col-span-6"
            media={media}
          />
        </Guard>

        <ProductDetails
          className="w-full md:col-span-4 md:sticky md:top-28 md:mt-16"
          slug={slug}
          title={pageData.content.title}
          price={pageData.content.price}
          description={pageData.content.description}
          types={pageData.content.types}
          artist={pageData.content.artist}
          rating={pageData.content.rating}
        />
      </section>

      <Guard cond={camber.length > 0}>
        <CamberSpec
          className="my-8 w-full md:col-start-2 md:col-end-[-2]"
          camber={camber}
        />
      </Guard>

      <Guard cond={tech.length > 0}>
        <TechSpec
          className="my-8 w-full md:col-start-2 md:col-end-[-2]"
          tech={tech}
        />
      </Guard>

      <Guard cond={features.length > 0}>
        <Features
          className="mt-8 mb-16 w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
          features={features}
        />
      </Guard>
    </main>
  );
}
