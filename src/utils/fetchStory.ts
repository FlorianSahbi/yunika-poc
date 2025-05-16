import type { ISbStoryData } from "@storyblok/react/rsc";
import { getStoryblokApi } from "@/lib/storyblok";
import { populateRelations } from "@/lib/populateRelations";

export async function fetchStory<T>(
  version: "draft" | "published",
  slug?: string[],
  options?: { locale?: string }
): Promise<ISbStoryData<T>> {
  getStoryblokApi();

  const path = slug?.length ? `/${slug.join("/")}` : "/home";
  const url = new URL(`https://api.storyblok.com/v2/cdn/stories${path}`);

  url.searchParams.set("version", version);
  url.searchParams.set("token", process.env.NEXT_PUBLIC_STORYBLOK_TOKEN!);
  url.searchParams.set(
    "resolve_relations",
    "snowboard.types,snowboard.artist,collection.products,collection.collections,snowboard.features"
  );

  const nextLocale = options?.locale;
  const STORYBLOK_DEFAULT_LANGUAGE = 'default';
  if (nextLocale) {
    const languageParam = nextLocale === 'en' ? STORYBLOK_DEFAULT_LANGUAGE : nextLocale;
    url.searchParams.set('language', languageParam);
  }

  const res = await fetch(url.toString(), {
    next: { tags: ["cms"] },
    cache: version === "published" ? "default" : "no-store",
  });
  if (!res.ok) throw new Error(`Storyblok fetch error ${res.status}`);

  const { story, rels = [] } = (await res.json()) as {
    story: ISbStoryData<T>;
    rels?: Array<{ uuid: string; [k: string]: any }>;
  };

  const content = populateRelations(
    story.content as Record<string, unknown>,
    rels
  );

  return {
    ...story,
    content: content as unknown as T,
  };
}
