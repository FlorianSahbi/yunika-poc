import { getStoryblokApi } from '@/lib/storyblok'

export interface DictionaryEntry {
  id: number
  name: string
  value: string
  dimension_value: string
}

/**
 * Récupère les clés/valeurs depuis le Datasource Storyblok
 * en fonction de la dimension (locale) désirée.
 */
export async function fetchDictionary(
  datasource: string = 'dictionary',
  locale: string = 'en',
): Promise<Record<string, string>> {
  getStoryblokApi()

  const url = new URL('https://api.storyblok.com/v2/cdn/datasource_entries')
  url.searchParams.set('datasource', datasource)
  url.searchParams.set('token', process.env.STORYBLOK_TOKEN!)

  // Si la locale n'est pas l'anglais par défaut, on passe dimension=locale
  if (locale && locale !== 'en') {
    url.searchParams.set('dimension', locale) // :contentReference[oaicite:0]{index=0}
  }

  const res = await fetch(url.toString(), {
    next: { tags: ['cms'] },
    cache: 'default',
  })
  if (!res.ok) {
    throw new Error(`Storyblok dictionary fetch error ${res.status}`)
  }

  const { datasource_entries }: { datasource_entries: DictionaryEntry[] } =
    await res.json()

  return datasource_entries.reduce(
    (acc, { name, value, dimension_value }) => {
      acc[name] = dimension_value || value
      return acc
    },
    {} as Record<string, string>,
  )
}
