import { business, mapEmbedSrc } from "@/lib/business";
import { cn } from "@/lib/cn";

interface MapEmbedProps {
  className?: string;
}

/**
 * Google Maps embed for the workshop.
 *
 * Keyless (no API setup needed) and lazily loaded so it never blocks paint.
 * The title is what a screen reader announces for the frame.
 */
export function MapEmbed({ className }: MapEmbedProps) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-2xl border border-line bg-surface",
        className,
      )}
    >
      <iframe
        src={mapEmbedSrc}
        title={`Map showing the location of ${business.name} on Service Road NH8, ${business.address.city}`}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
        className="h-72 w-full border-0 grayscale-[35%] contrast-[1.1] sm:h-96"
      />
    </div>
  );
}
