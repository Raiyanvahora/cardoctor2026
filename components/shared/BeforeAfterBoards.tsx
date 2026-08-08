"use client";

import Image from "next/image";
import { useState } from "react";
import { Expand } from "lucide-react";

import { type Transformation, transformations } from "@/lib/gallery";
import { cn } from "@/lib/cn";
import { Reveal } from "@/components/ui/Reveal";
import { Lightbox } from "./Lightbox";

/**
 * The workshop's before/after comparison boards.
 *
 * Two things make these different from the photographs in `GalleryGrid`:
 *
 *   - Each board is a composite of two frames, and both frames have to stay
 *     whole for the comparison to read. So they are `object-contain` inside a
 *     square frame rather than cropped to a shared aspect ratio.
 *   - Their bullet points are burned into the image, which is unreadable at
 *     phone width and invisible to a screen reader. The lists beneath each
 *     board restate those points as real text.
 */
export function BeforeAfterBoards({
  boards = transformations,
  /** Defaults to the two-up grid at full page width. */
  sizes = "(min-width: 1024px) 46vw, 92vw",
  className,
}: {
  boards?: Transformation[];
  sizes?: string;
  className?: string;
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <>
      <ul className={cn("grid gap-5 lg:grid-cols-2 lg:gap-6", className)}>
        {boards.map((board, index) => (
          <Reveal as="li" key={board.src} delay={index * 0.08}>
            <article className="flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-surface">
              <button
                type="button"
                onClick={() => setOpenIndex(index)}
                className="group relative block w-full overflow-hidden bg-ink-soft transition-colors duration-300 hover:bg-ink"
              >
                <Image
                  src={board.src}
                  alt={board.alt}
                  width={board.width}
                  height={board.height}
                  sizes={sizes}
                  className="aspect-square w-full object-contain transition-transform duration-500 group-hover:scale-[1.02]"
                />

                <span className="absolute top-3.5 left-3.5 rounded-full border border-line-strong bg-ink/75 px-3 py-1 text-[10px] font-semibold tracking-[0.16em] text-fg uppercase backdrop-blur">
                  {board.view}
                </span>

                <span
                  aria-hidden
                  className="absolute right-3.5 bottom-3.5 flex h-9 w-9 items-center justify-center rounded-full border border-line-strong bg-ink/75 text-fg opacity-0 backdrop-blur transition-opacity duration-300 group-hover:opacity-100"
                >
                  <Expand className="h-4 w-4" />
                </span>

                <span className="sr-only">View larger: {board.caption}</span>
              </button>

              <div className="flex flex-1 flex-col gap-5 border-t border-line p-5 sm:p-6">
                <h3 className="text-lg font-bold text-fg sm:text-xl">
                  {board.title}
                </h3>

                <div className="grid gap-5 sm:grid-cols-2 sm:gap-6">
                  <Column label="Before" items={board.before} />
                  <Column label="After" items={board.after} tone="brand" />
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </ul>

      <Lightbox
        images={boards}
        index={openIndex}
        onClose={() => setOpenIndex(null)}
        onNavigate={setOpenIndex}
      />
    </>
  );
}

function Column({
  label,
  items,
  tone = "muted",
}: {
  label: string;
  items: string[];
  tone?: "muted" | "brand";
}) {
  const isBrand = tone === "brand";

  return (
    <div>
      <p
        className={cn(
          "text-[10px] font-semibold tracking-[0.16em] uppercase",
          isBrand ? "text-brand" : "text-dim",
        )}
      >
        {label}
      </p>
      <ul className="mt-3 space-y-2">
        {items.map((entry) => (
          <li
            key={entry}
            className={cn(
              "flex gap-2.5 text-[0.8125rem] leading-relaxed",
              isBrand ? "text-fg" : "text-muted",
            )}
          >
            <span
              aria-hidden
              className={cn(
                "mt-[0.4rem] h-1 w-1 shrink-0 rounded-full",
                isBrand ? "bg-brand" : "bg-dim",
              )}
            />
            {entry}
          </li>
        ))}
      </ul>
    </div>
  );
}
