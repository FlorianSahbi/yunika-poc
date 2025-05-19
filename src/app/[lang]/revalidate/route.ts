import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { routing } from '@/i18n/routing' // your defineRouting({ locales:['en','fr'], defaultLocale:'en' })

export async function POST(request: NextRequest) {
  const { full_slug } = await request.json()

  if (!full_slug) {
    return NextResponse.json(
      { error: 'full_slug is required' },
      { status: 400 },
    )
  }

  // Storyblok sends "home" for the homepage,
  // "snowboards/the-kingfisher" for English,
  // and "fr/snowboards/the-matryoshka" for French.
  let slug = full_slug === 'home' ? '' : full_slug

  // If it's prefixed with "fr/", strip it off for normalization
  const prefix = `${routing.locales.find((l) => l !== routing.defaultLocale)}/` // "fr/"
  if (slug.startsWith(prefix)) {
    slug = slug.slice(prefix.length)
  }

  // Now revalidate for each locale in your routing config
  await Promise.all(
    routing.locales.map((locale) => {
      if (locale === routing.defaultLocale) {
        return revalidatePath(`/${slug}`)
      }
      return revalidatePath(`/${locale}/${slug}`)
    }),
  )

  return NextResponse.json({ revalidated: true, now: Date.now() })
}
