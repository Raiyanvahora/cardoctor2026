import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Service } from "@/lib/services";
import { cn } from "@/lib/cn";

interface ServiceRowProps {
  service: Service;
  index: number;
  /** Hides the summary line where vertical space is tight. */
  showSummary?: boolean;
}

/**
 * One service as an editorial list row rather than a card.
 *
 * Rows separated by hairlines read as a considered index; ten identical
 * bordered boxes read as a template. The row is also a third of the height,
 * which is what stops the homepage running to twenty screens on a phone.
 */
export function ServiceRow({
  service,
  index,
  showSummary = true,
}: ServiceRowProps) {
  const Icon = service.icon;

  return (
    <li>
      <Link
        href={`/services/${service.slug}`}
        className="group flex items-center gap-4 border-b border-line py-4 transition-colors duration-300 hover:border-brand/40 sm:gap-5 sm:py-5"
      >
        <span className="font-display w-6 shrink-0 text-xs font-bold text-dim transition-colors duration-300 group-hover:text-brand">
          {String(index + 1).padStart(2, "0")}
        </span>

        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-line bg-surface transition-colors duration-300 group-hover:border-brand/50 group-hover:bg-brand-soft">
          <Icon aria-hidden className="h-4.5 w-4.5 text-brand" />
        </span>

        <span className="min-w-0 flex-1">
          <span className="font-display block text-[0.95rem] leading-tight font-bold text-fg uppercase sm:text-base">
            {service.shortTitle}
          </span>
          {showSummary ? (
            <span
              className={cn(
                "mt-1.5 block text-sm leading-snug text-muted",
                "line-clamp-2",
              )}
            >
              {service.summary}
            </span>
          ) : null}
        </span>

        <ArrowUpRight
          aria-hidden
          className="h-5 w-5 shrink-0 text-dim transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-brand"
        />
      </Link>
    </li>
  );
}

/** Compact two-up tile — icon and title only. Used where space is tightest. */
export function ServiceTile({ service }: { service: Service }) {
  const Icon = service.icon;

  return (
    <li>
      <Link
        href={`/services/${service.slug}`}
        className="group flex h-full flex-col justify-between gap-4 rounded-xl border border-line bg-surface p-4 transition-colors duration-300 hover:border-brand/50 hover:bg-surface-2"
      >
        <Icon aria-hidden className="h-5 w-5 text-brand" />
        <span className="font-display text-[0.8rem] leading-tight font-bold text-fg uppercase">
          {service.shortTitle}
        </span>
      </Link>
    </li>
  );
}
