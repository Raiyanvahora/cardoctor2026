import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

interface SectionProps {
  children: ReactNode;
  /** Renders as <section> by default; pass "div" when nesting. */
  as?: "section" | "div";
  id?: string;
  className?: string;
  /** Inner container width. "wide" suits galleries, "narrow" suits prose. */
  width?: "default" | "wide" | "narrow";
  /** Vertical rhythm. "flush" removes padding entirely. */
  spacing?: "default" | "tight" | "loose" | "flush";
  /** Alternate surface tone, used to separate adjacent sections. */
  tone?: "ink" | "soft";
  "aria-labelledby"?: string;
}

const widths = {
  narrow: "max-w-3xl",
  default: "max-w-6xl",
  wide: "max-w-7xl",
};

const spacings = {
  tight: "py-12 sm:py-16",
  default: "py-16 sm:py-20 lg:py-28",
  loose: "py-20 sm:py-28 lg:py-36",
  flush: "",
};

/**
 * Standard page section: consistent vertical rhythm, gutters and max-width.
 * Every section on the site goes through this so spacing never drifts.
 */
export function Section({
  children,
  as: Tag = "section",
  id,
  className,
  width = "default",
  spacing = "default",
  tone = "ink",
  ...rest
}: SectionProps) {
  return (
    <Tag
      id={id}
      className={cn(
        "relative",
        tone === "soft" && "bg-ink-soft",
        spacings[spacing],
        className,
      )}
      {...rest}
    >
      <div className={cn("mx-auto px-5 sm:px-6 lg:px-8", widths[width])}>
        {children}
      </div>
    </Tag>
  );
}
