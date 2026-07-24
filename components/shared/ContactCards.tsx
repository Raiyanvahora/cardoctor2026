import {
  Clock,
  Instagram,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import {
  addressLine,
  business,
  mailHref,
  primaryTelHref,
  secondaryTelHref,
} from "@/lib/business";
import { enquiryHref } from "@/lib/whatsapp";
import { cn } from "@/lib/cn";
import { Reveal } from "@/components/ui/Reveal";

interface ContactEntry {
  icon: LucideIcon;
  label: string;
  value: string;
  href?: string;
  /** Opens in a new tab. */
  external?: boolean;
  note?: string;
}

const entries: ContactEntry[] = [
  {
    icon: Phone,
    label: "Call us",
    value: business.phones.primary,
    href: primaryTelHref,
    note: "Primary line — also WhatsApp",
  },
  {
    icon: Phone,
    label: "Alternate line",
    value: business.phones.secondary,
    href: secondaryTelHref,
  },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: business.phones.primary,
    href: enquiryHref(),
    external: true,
    note: "Fastest way to reach us",
  },
  {
    icon: Mail,
    label: "Email",
    value: business.email,
    href: mailHref,
  },
  {
    icon: MapPin,
    label: "Workshop",
    value: addressLine,
    href: business.mapsUrl,
    external: true,
    note: "Tap for directions",
  },
  {
    icon: Clock,
    label: "Opening hours",
    value: business.hours,
  },
  {
    icon: Instagram,
    label: "Instagram",
    value: "@cardoctor_india",
    href: business.social.instagram,
    external: true,
  },
];

interface ContactCardsProps {
  className?: string;
}

/** Grid of contact methods — every one of them actionable. */
export function ContactCards({ className }: ContactCardsProps) {
  return (
    <ul className={cn("grid gap-4 sm:grid-cols-2", className)}>
      {entries.map((entry, index) => {
        const Icon = entry.icon;

        const inner = (
          <>
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-line bg-ink transition-colors duration-300 group-hover:border-brand/60">
              <Icon aria-hidden className="h-5 w-5 text-brand" />
            </span>
            <span className="min-w-0">
              <span className="block text-[10px] font-semibold uppercase tracking-[0.16em] text-dim">
                {entry.label}
              </span>
              <span className="mt-1.5 block text-sm font-medium break-words text-fg">
                {entry.value}
              </span>
              {entry.note ? (
                <span className="mt-1 block text-xs text-dim">{entry.note}</span>
              ) : null}
            </span>
          </>
        );

        const cardClasses =
          "group flex h-full items-start gap-4 rounded-2xl border border-line bg-surface p-5 transition-[border-color,background-color] duration-300";

        return (
          <Reveal as="li" key={entry.label} delay={index * 0.05} className="h-full">
            {entry.href ? (
              <a
                href={entry.href}
                className={cn(cardClasses, "hover:border-brand/50 hover:bg-surface-2")}
                {...(entry.external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
              >
                {inner}
              </a>
            ) : (
              <div className={cardClasses}>{inner}</div>
            )}
          </Reveal>
        );
      })}
    </ul>
  );
}
