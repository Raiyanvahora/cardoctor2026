"use client";

import Image from "next/image";
import { useState } from "react";
import { Expand } from "lucide-react";
import type { GalleryImage } from "@/lib/gallery";
import { cn } from "@/lib/cn";
import { Reveal } from "@/components/ui/Reveal";
import { Lightbox } from "./Lightbox";

interface GalleryGridProps {
  images: GalleryImage[];
  /**
   * "feature" renders large portrait frames for the full-resolution photos.
   * "tile"    renders small squares — the only size at which the 204px-wide
   *           images from the Google listing still look sharp.
   */
  layout?: "feature" | "tile";
  /** Columns for the feature layout on large screens. */
  featureCols?: 3 | 4;
  className?: string;
}

export function GalleryGrid({
  images,
  layout = "feature",
  featureCols = 3,
  className,
}: GalleryGridProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const isTile = layout === "tile";

  return (
    <>
      <ul
        className={cn(
          "grid gap-3 sm:gap-4",
          isTile
            ? "grid-cols-3 sm:grid-cols-4 lg:grid-cols-6"
            : // Two-up on phones as well: a single column of portrait frames
              // ran to roughly 2,800px for six photographs.
              featureCols === 4
              ? "grid-cols-2 lg:grid-cols-4"
              : "grid-cols-2 lg:grid-cols-3",
          className,
        )}
      >
        {images.map((image, index) => (
          <Reveal
            as="li"
            key={image.src}
            delay={Math.min(index * 0.04, 0.4)}
            className="h-full"
          >
            <button
              type="button"
              onClick={() => setOpenIndex(index)}
              className="group relative block h-full w-full overflow-hidden rounded-2xl border border-line bg-surface transition-[border-color,transform] duration-300 hover:-translate-y-1 hover:border-brand/50"
            >
              <Image
                src={image.src}
                alt={image.alt}
                width={image.width}
                height={image.height}
                sizes={
                  isTile
                    ? "(min-width: 1024px) 12vw, (min-width: 640px) 20vw, 30vw"
                    : "(min-width: 1024px) 30vw, 46vw"
                }
                className={cn(
                  "photo-lift w-full object-cover object-center transition-transform duration-500 group-hover:scale-105",
                  isTile ? "aspect-square" : "aspect-[3/4]",
                )}
              />

              <span
                aria-hidden
                className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/10 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-95"
              />

              {!isTile ? (
                <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-3.5 text-left sm:p-5">
                  <span className="line-clamp-1 text-xs font-semibold text-fg sm:line-clamp-2 sm:text-sm">
                    {image.caption}
                  </span>
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-line-strong bg-ink/70 text-fg opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <Expand aria-hidden className="h-4 w-4" />
                  </span>
                </span>
              ) : (
                <span
                  aria-hidden
                  className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-full border border-line-strong bg-ink/70 text-fg">
                    <Expand className="h-4 w-4" />
                  </span>
                </span>
              )}

              <span className="sr-only">View larger: {image.caption}</span>
            </button>
          </Reveal>
        ))}
      </ul>

      <Lightbox
        images={images}
        index={openIndex}
        onClose={() => setOpenIndex(null)}
        onNavigate={setOpenIndex}
      />
    </>
  );
}
