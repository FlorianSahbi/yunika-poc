import { StoryblokRichText } from "@storyblok/react/rsc";
import Rating from "./Rating";
import clsx from "clsx";
import Artist from "./Artist";
import { ShoppingCart, ChevronDown } from "lucide-react";
import type { JSX } from "react";
import type { ISbStoryData } from "@storyblok/react/rsc";
import type {
  SnowboardStoryblok,
  TypeStoryblok,
  ArtistStoryblok,
  RatingStoryblok,
  RichtextStoryblok,
} from "@/types/storyblok";

interface PurchaseFormProps {
  slug: string;
  sizes: number[];
}

function PurchaseForm({ sizes }: PurchaseFormProps): JSX.Element {
  return (
    <form>
      <div className="mb-2 mt-4">
        <label htmlFor="size" className="block text-sm font-medium text-gray-700">
          Taille
        </label>
        <div className="relative mt-1">
          <select
            id="size"
            name="size"
            defaultValue={sizes[0]}
            className={clsx(
              'appearance-none w-full bg-white border border-gray-300 rounded-md',
              'py-2 px-3 pr-10 text-sm text-gray-700',
              'focus:outline-none focus:ring-2 focus:ring-[#AA1F21] focus:border-[#AA1F21]',
              'hover:border-gray-400 transition duration-150 ease-in-out'
            )}
          >
            {sizes.map((s) => (
              <option key={s} value={s}>
                {s} cm
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
            <ChevronDown className="h-4 w-4 text-gray-400" />
          </div>
        </div>
      </div>

      <button
        type="button"
        className={clsx(
          'w-full flex items-center justify-center gap-2',
          'py-3 text-sm font-semibold text-white bg-[#AA1F21] rounded-md',
          'hover:bg-[#8e1a1e]',
          'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#AA1F21]',
          'transition transform duration-150 ease-in-out',
          'hover:shadow hover:-translate-y-0.5 active:scale-95'
        )}
      >
        <ShoppingCart className="h-5 w-5" />
        Ajouter au panier
      </button>
    </form>
  );
}

interface ProductDetailsProps {
  className?: string;
  slug: string;
  title?: SnowboardStoryblok["title"];
  price?: SnowboardStoryblok["price"];
  types?: Array<ISbStoryData<TypeStoryblok> | string>;
  description?: RichtextStoryblok;
  artist?: ISbStoryData<ArtistStoryblok> | string;
  rating?: RatingStoryblok[];
  lang?: 'en' | 'fr';
}

export default function ProductDetails({
  className,
  slug,
  title,
  price,
  types = [],
  description,
  artist,
  rating = [],
  lang,
}: ProductDetailsProps): JSX.Element {
  const typeLabels = types
    .map((t) => (typeof t === "object" && "content" in t ? t.content.label : t))
    .filter((lbl): lbl is string => typeof lbl === "string");

  const hasArtist = typeof artist === "object" && "content" in artist;
  return (
    <section className={clsx(className)}>
      {typeLabels.length > 0 && (
        <p className="text-sm uppercase text-gray-500 tracking-wide">
          {typeLabels.join(" / ")}
        </p>
      )}

      {title && <h1 className="text-3xl font-extrabold">{title}</h1>}

      {price && <p className="text-2xl font-semibold">
        {lang === 'en' ? `$${price}` : `${price}€`}
      </p>}

      <PurchaseForm slug={slug} sizes={[143, 146, 149, 152]} />

      {rating.length > 0 && (
        <div className="my-8">
          {rating.map((r, i) => (
            <Rating
              key={i}
              className="mb-2"
              label={r.label ?? ""}
              value={r.value ? parseInt(r.value, 10) : 0}
            />
          ))}
        </div>
      )}

      {description && (
        <div className="mb-4 prose">
          <StoryblokRichText doc={description as never} />
        </div>
      )}

      {hasArtist && <Artist className="mt-4" artist={artist as ISbStoryData<ArtistStoryblok>} />}
    </section>
  );
}
