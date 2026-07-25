import { cn } from "@/lib/cn";

interface MarqueeProps {
  /** Items rendered in the moving track. */
  items: string[];
  /** Seconds for one full loop. Lower is faster. */
  durationSeconds?: number;
  className?: string;
}

/**
 * An edge-to-edge marquee of short labels — used for the luxury marques.
 *
 * The track holds two identical copies of the list and translates by -50%, so
 * the loop is seamless. It is purely decorative: `aria-hidden` keeps a screen
 * reader from reading the doubled list, and the animation freezes under
 * reduced motion (see globals.css), leaving a static, legible row.
 *
 * No manufacturer logos — just names — so nothing implies a dealer affiliation.
 */
export function Marquee({ items, durationSeconds = 32, className }: MarqueeProps) {
  const track = [...items, ...items];

  return (
    <div
      aria-hidden
      className={cn("marquee-mask group relative overflow-hidden", className)}
    >
      <ul
        className="animate-marquee flex w-max items-center group-hover:[animation-play-state:paused]"
        style={{ "--marquee-duration": `${durationSeconds}s` } as React.CSSProperties}
      >
        {track.map((item, index) => (
          <li key={index} className="flex items-center">
            <span className="font-display px-6 text-sm font-bold tracking-[0.14em] text-muted uppercase sm:px-9 sm:text-base">
              {item}
            </span>
            <span aria-hidden className="h-1 w-1 rounded-full bg-brand/60" />
          </li>
        ))}
      </ul>
    </div>
  );
}
