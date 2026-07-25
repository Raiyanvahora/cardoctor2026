import { business } from "@/lib/business";

/**
 * Facts supplied by the business, as a single compact strip.
 *
 * No statistics, job counts or certifications are claimed, because none were
 * provided. On phones it scrolls horizontally rather than stacking into five
 * rows of near-empty boxes.
 */
const items: Array<{ label: string; value: string }> = [
  { label: "Established", value: String(business.established) },
  { label: "Google rating", value: `${business.googleRating}★` },
  { label: "Availability", value: business.hours },
  {
    label: "Workshop",
    value: `${business.address.city}, ${business.address.state}`,
  },
  { label: "Pickup & drop", value: "Location dependent" },
];

export function TrustBar() {
  return (
    <section
      aria-label="Business at a glance"
      className="border-y border-line bg-ink-soft"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <ul
          className="scrollbar-none -mx-5 flex snap-x snap-mandatory gap-8 overflow-x-auto px-5 py-5 sm:mx-0 sm:justify-between sm:gap-4 sm:overflow-visible sm:px-0"
          role="list"
        >
          {items.map((item) => (
            <li
              key={item.label}
              className="flex shrink-0 snap-start flex-col gap-1 sm:shrink"
            >
              <span className="text-[11px] font-semibold tracking-[0.16em] text-dim uppercase">
                {item.label}
              </span>
              <span className="font-display text-sm font-bold whitespace-nowrap text-fg uppercase sm:text-base">
                {item.value}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
