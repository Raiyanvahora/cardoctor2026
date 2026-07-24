import Image from "next/image";
import Link from "next/link";
import { business } from "@/lib/business";
import { cn } from "@/lib/cn";

interface LogoProps {
  className?: string;
  /** Hides the tagline on tight layouts such as the mobile navbar. */
  showTagline?: boolean;
  /** Prioritise loading — set for the navbar, which is above the fold. */
  priority?: boolean;
}

/**
 * Brand lockup, built from the workshop's own signage artwork.
 *
 * The mark and wordmark were cut from the real sign and lifted onto
 * transparency (see the note in the repo README), so this is the business's
 * actual identity rather than an approximation of it.
 *
 * Both images are decorative here: the surrounding link already carries an
 * accessible name, so alt text on them would make a screen reader announce the
 * business twice. The tagline stays as real text.
 */
export function Logo({ className, showTagline = true, priority = false }: LogoProps) {
  return (
    <Link
      href="/"
      className={cn("group inline-flex min-h-11 items-center gap-2.5 sm:gap-3", className)}
      aria-label={`${business.name} — home`}
    >
      <Image
        src="/images/logo-mark.png"
        alt=""
        width={320}
        height={305}
        priority={priority}
        sizes="44px"
        className="h-9 w-auto shrink-0 transition-transform duration-300 group-hover:scale-105 sm:h-10"
      />

      <span className="flex flex-col gap-1">
        <Image
          src="/images/logo-wordmark.png"
          alt=""
          width={900}
          height={89}
          priority={priority}
          sizes="200px"
          className="h-[15px] w-auto sm:h-[18px]"
        />
        {showTagline ? (
          <span className="hidden text-[9px] font-medium tracking-[0.14em] text-dim uppercase sm:block">
            {business.tagline}
          </span>
        ) : null}
      </span>
    </Link>
  );
}
