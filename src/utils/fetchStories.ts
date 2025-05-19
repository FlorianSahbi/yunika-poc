import type { ISbStoryData } from '@storyblok/react/rsc'
import { getStoryblokApi } from '@/lib/storyblok'
import { populateRelations } from '@/lib/populateRelations'

interface StoriesResponse<T> {
  stories: ISbStoryData<T>[]
  total: number
}

export interface FetchStoriesOptions {
  locale?: string
}

export async function fetchStories<T>(
  version: 'draft' | 'published',
  folder?: string,
  options?: FetchStoriesOptions,
): Promise<StoriesResponse<T>> {
  getStoryblokApi()

  const url = new URL('https://api.storyblok.com/v2/cdn/stories')
  url.searchParams.set('version', version)
  url.searchParams.set('token', process.env.STORYBLOK_TOKEN!)
  url.searchParams.set('per_page', '100')
  url.searchParams.set(
    'resolve_relations',
    'snowboard.types,snowboard.artist,collection.products,collection.collections,snowboard.features,header.links',
  )
  if (folder) url.searchParams.set('starts_with', folder)

  const nextLocale = options?.locale
  const STORYBLOK_DEFAULT_LANGUAGE = 'default'
  if (nextLocale) {
    const languageParam =
      nextLocale === 'en' ? STORYBLOK_DEFAULT_LANGUAGE : nextLocale
    url.searchParams.set('language', languageParam)
  }

  const res = await fetch(url.toString(), {
    next: { tags: ['cms'] },
    cache: version === 'published' ? 'default' : 'no-store',
  })
  if (!res.ok) throw new Error(`Storyblok fetch error ${res.status}`)

  const {
    stories,
    rels = [],
    total,
  } = (await res.json()) as {
    stories: ISbStoryData<T>[]
    rels?: Array<{ uuid: string; [k: string]: any }>
    total: number
  }

  const populated = stories.map((s) => ({
    ...s,
    content: populateRelations(
      s.content as Record<string, unknown>,
      rels,
    ) as unknown as T,
  }))

  return { stories: populated, total }
}
