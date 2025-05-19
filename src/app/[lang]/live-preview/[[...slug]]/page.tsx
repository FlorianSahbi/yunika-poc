import { StoryblokStory } from '@storyblok/react/rsc'
import { fetchStory } from '@/utils/fetchStory'
import { notFound } from 'next/navigation'
import type { JSX } from 'react'

export default async function LivePreview({
  params,
}: {
  params: { slug?: string[] }
}): Promise<JSX.Element> {
  const slugArray = params.slug ?? []

  try {
    const pageData = await fetchStory('draft', slugArray)
    return <StoryblokStory story={pageData} />
  } catch {
    notFound()
  }
}
