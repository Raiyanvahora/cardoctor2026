import { CalendarDays, Clock, MapPin, Star, Truck } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { business } from "@/lib/business";
import { Reveal } from "@/components/ui/Reveal";

interface TrustItem {
  icon: LucideIcon;
  label: string;
  value: string;
}

/**
 * Every item below is a fact supplied by the business. No statistics, job
 * counts or certifications are claimed, because none were provided.
 */
const items: TrustItem[] = [
  {
    icon: CalendarDays,
    label: "Established",
    value: String(business.established),
  },
  { icon: Star, label: "Google Rating", value: `${business.googleRating}★` },
  { icon: Clock, label: "Availability", value: business.hours },
  {
    icon: MapPin,
    label: "Workshop",
    value: `${business.address.city}, ${business.address.state}`,
  },
  { icon: Truck, label: "Pickup & Drop", value: "Location dependent" },
];

export function TrustBar() {
  return (
    <section
      aria-label="Business at a glance"
      className="relative border-y border-line bg-ink-soft"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <ul className="grid grid-cols-2 gap-px bg-line sm:grid-cols-3 lg:grid-cols-5">
          {items.map((item, index) => {
            const Icon = item.icon;
            return (
              <Reveal
                as="li"
                key={item.label}
                delay={index * 0.05}
                className="bg-ink-soft"
              >
                <div className="flex flex-col gap-2 px-4 py-7 sm:px-6">
                  <span className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-dim">
                    <Icon aria-hidden className="h-3.5 w-3.5 text-brand" />
                    {item.label}
                  </span>
                  <span className="font-display text-base font-bold uppercase tracking-tight text-fg sm:text-lg">
                    {item.value}
                  </span>
                </div>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
