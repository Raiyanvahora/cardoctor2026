import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Service } from "@/lib/services";
import { Reveal } from "@/components/ui/Reveal";

interface ServiceCardProps {
  service: Service;
  /** Stagger index — spaces the reveal animation across the grid. */
  index?: number;
}

/** Icon-led service card. The whole card is one link target. */
export function ServiceCard({ service, index = 0 }: ServiceCardProps) {
  const Icon = service.icon;

  return (
    <Reveal as="li" delay={Math.min(index * 0.06, 0.4)} className="h-full">
      <Link
        href={`/services/${service.slug}`}
        className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface p-6 transition-[transform,border-color,background-color] duration-300 ease-out hover:-translate-y-1 hover:border-brand/50 hover:bg-surface-2 sm:p-7"
      >
        {/* Red wash that fades in on hover. */}
        <span
          aria-hidden
          className="glow-brand-sm absolute inset-x-0 -top-16 h-40 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        />

        <span className="relative flex h-12 w-12 items-center justify-center rounded-xl border border-line bg-ink transition-colors duration-300 group-hover:border-brand/60">
          <Icon aria-hidden className="h-5.5 w-5.5 text-brand" />
        </span>

        <h3 className="relative mt-6 text-lg font-bold text-fg">
          {service.shortTitle}
        </h3>

        <p className="relative mt-3 flex-1 text-sm leading-relaxed text-muted">
          {service.summary}
        </p>

        <span className="relative mt-6 flex h-10 w-10 items-center justify-center rounded-full border border-line text-muted transition-colors duration-300 group-hover:border-brand group-hover:bg-brand group-hover:text-white">
          <ArrowUpRight aria-hidden className="h-4.5 w-4.5" />
        </span>

        <span className="sr-only">Read more about {service.title}</span>
      </Link>
    </Reveal>
  );
}
