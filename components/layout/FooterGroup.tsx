"use client";

import { useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";
import type { ReactNode } from "react";

interface FooterGroupProps {
  title: string;
  id: string;
  children: ReactNode;
}

/**
 * A footer column that collapses into an accordion on phones.
 *
 * Rendered EXPANDED on the server (`<details open>`). That direction matters:
 * if scripting never runs, the reader gets every link rather than two headings
 * with nothing under them. Only after mount does a viewport check collapse the
 * group on small screens.
 *
 * A pure-CSS version was tried first — forcing `display: block` on the panel at
 * desktop widths — and it silently failed: Chrome hides closed `<details>`
 * content by suppressing rendering on an internal slot, which `display` cannot
 * override. That shipped a desktop footer with empty columns, so the open state
 * is now driven by the actual `open` property instead of styling around it.
 *
 * The `open` property is set imperatively via a ref rather than as a React prop,
 * so the element stays uncontrolled and a reader's own taps are never fought.
 */
export function FooterGroup({ title, id, children }: FooterGroupProps) {
  const ref = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const desktop = window.matchMedia("(min-width: 64rem)");
    const apply = () => {
      el.open = desktop.matches;
    };

    apply();
    desktop.addEventListener("change", apply);
    return () => desktop.removeEventListener("change", apply);
  }, []);

  return (
    <details ref={ref} open className="footer-group border-b border-line lg:border-b-0">
      <summary
        className="flex cursor-pointer list-none items-center justify-between py-4 lg:cursor-default lg:py-0"
        aria-controls={id}
      >
        <h2 className="text-xs font-bold tracking-[0.16em] text-fg uppercase">
          {title}
        </h2>
        <ChevronDown
          aria-hidden
          className="h-4 w-4 shrink-0 text-dim transition-transform duration-300 lg:hidden"
        />
      </summary>
      <div id={id} className="pb-5 lg:pb-0">
        {children}
      </div>
    </details>
  );
}
