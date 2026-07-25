"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

interface RevealProps {
  children: React.ReactNode;
  /** Stagger helper — seconds to wait before this element animates. */
  delay?: number;
  from?: "bottom" | "left" | "right" | "zoom";
  className?: string;
  as?: "div" | "li" | "article" | "section";
}

/**
 * Scroll-triggered fade and rise.
 *
 * Deliberately CSS-driven rather than JS-driven, because the animated state
 * must never be able to get stuck:
 *
 *   - Content is VISIBLE by default. The hidden start state only applies once
 *     `.js` is on <html>, which an inline script in the layout sets before
 *     first paint. If scripting fails, everything simply renders.
 *   - `prefers-reduced-motion` is honoured by a CSS media query, not by a
 *     client-side branch. An earlier version branched in React after the
 *     server had already rendered `opacity: 0`, and React never cleared that
 *     inline style — so readers with Reduce Motion enabled saw a blank page.
 *
 * The observer only ever *adds* the shown state, so the failure mode is
 * "animation doesn't play", never "content never appears".
 */
export function Reveal({
  children,
  delay = 0,
  from = "bottom",
  className,
  as: Tag = "div",
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || shown) return;

    // No IntersectionObserver, or already in view on load — show immediately.
    if (typeof IntersectionObserver === "undefined") {
      setShown(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setShown(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -60px 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [shown]);

  return (
    <Tag
      ref={ref as React.Ref<never>}
      data-reveal={from}
      data-shown={shown ? "" : undefined}
      style={delay ? ({ "--reveal-delay": `${delay}s` } as React.CSSProperties) : undefined}
      className={cn(className)}
    >
      {children}
    </Tag>
  );
}
