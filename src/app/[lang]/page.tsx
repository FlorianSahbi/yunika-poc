import { StoryblokStory } from "@storyblok/react/rsc";
import { fetchStory } from "@/utils/fetchStory";
import type { PageStoryblok } from "@/types/storyblok";
import { notFound } from "next/navigation";
import type { JSX } from "react";

export const dynamic = "force-static";
export const dynamicParams = false;
export const revalidate = false;

export function generateStaticParams() {
  return [
    { lang: "fr" },
    { lang: "en" },
  ];
}

interface PageProps {
  params: {
    lang: "fr" | "en";
  };
}

export default async function Home({ params }: PageProps): Promise<JSX.Element> {
  const { lang } = await params;

  if (lang !== "fr" && lang !== "en") {
    notFound();
  }

  try {
    const pageData = await fetchStory<PageStoryblok>(
      "published",
      ["home"],
      { locale: lang }
    );
    return <StoryblokStory story={pageData} />;
  } catch (err) {
    console.error("Erreur fetch Storyblok :", err);
    notFound();
  }
}
