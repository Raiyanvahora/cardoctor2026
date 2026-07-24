import Link from "next/link";
import { business } from "@/lib/business";
import { cn } from "@/lib/cn";

interface LogoProps {
  className?: string;
  /** Hides the tagline on tight layouts such as the mobile navbar. */
  showTagline?: boolean;
}

/**
 * Brand lockup: an original stethoscope-over-car mark drawn as inline SVG,
 * echoing the workshop's own signage motif, plus the wordmark and tagline.
 */
export function Logo({ className, showTagline = true }: LogoProps) {
  return (
    <Link
      href="/"
      className={cn("group inline-flex items-center gap-3", className)}
      aria-label={`${business.name} — home`}
    >
      <span className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-line bg-surface transition-colors duration-300 group-hover:border-brand/60">
        <svg
          aria-hidden
          viewBox="0 0 32 32"
          className="h-6 w-6"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* Stethoscope tubing */}
          <path
            d="M9 4v5a5 5 0 0 0 10 0V4"
            stroke="var(--color-brand)"
            strokeWidth="2"
          />
          <path
            d="M14 14v3a6 6 0 0 0 12 0v-2"
            stroke="var(--color-brand)"
            strokeWidth="2"
          />
          {/* Chest piece, drawn as a car silhouette */}
          <path
            d="M4 26v-3l2-4h12l2 4v3"
            stroke="currentColor"
            strokeWidth="2"
            className="text-fg"
          />
          <circle cx="8" cy="26" r="2" stroke="currentColor" strokeWidth="2" className="text-fg" />
          <circle cx="18" cy="26" r="2" stroke="currentColor" strokeWidth="2" className="text-fg" />
          <circle cx="26" cy="13" r="2.5" stroke="var(--color-brand)" strokeWidth="2" />
        </svg>
      </span>
      <span className="flex flex-col leading-none">
        <span className="font-display text-base font-bold uppercase tracking-tight text-fg sm:text-lg">
          Car <span className="text-brand">Doctor</span> India
        </span>
        {showTagline ? (
          <span className="mt-1 hidden text-[10px] font-medium uppercase tracking-[0.16em] text-dim sm:block">
            {business.tagline}
          </span>
        ) : null}
      </span>
    </Link>
  );
}
