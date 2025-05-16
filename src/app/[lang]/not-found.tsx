import { StoryblokStory } from "@storyblok/react/rsc";
import { fetchStory } from "@/utils/fetchStory";
import type { PageStoryblok } from "@/types/storyblok";
import { notFound } from "next/navigation";

export default async function NotFound() {
  try {
    const pageData = await fetchStory<PageStoryblok>(
      "published",
      ["not-found"],
    );
    return <StoryblokStory story={pageData} />;
  } catch {
    notFound();
  }
}
