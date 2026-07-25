import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { Crumb } from "@/lib/seo";

interface BreadcrumbProps {
  /** Trail after "Home". The final entry renders as the current page. */
  crumbs: Crumb[];
}

/** Accessible breadcrumb trail. Home is prepended automatically. */
export function Breadcrumb({ crumbs }: BreadcrumbProps) {
  const trail: Crumb[] = [{ name: "Home", path: "/" }, ...crumbs];

  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center justify-center gap-x-1 gap-y-1 text-xs font-medium text-dim">
        {trail.map((crumb, index) => {
          const isLast = index === trail.length - 1;
          return (
            <li key={crumb.path} className="flex items-center gap-1">
              {isLast ? (
                <span
                  aria-current="page"
                  className="inline-flex min-h-10 items-center px-1.5 text-muted"
                >
                  {crumb.name}
                </span>
              ) : (
                <Link
                  href={crumb.path}
                  className="inline-flex min-h-10 items-center px-1.5 transition-colors hover:text-fg"
                >
                  {crumb.name}
                </Link>
              )}
              {!isLast ? (
                <ChevronRight aria-hidden className="h-3.5 w-3.5 text-dim/60" />
              ) : null}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
