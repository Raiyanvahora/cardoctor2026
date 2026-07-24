import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Eyebrow } from "./Eyebrow";
import { Reveal } from "./Reveal";

interface SectionHeadingProps {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  /** Heading level. Pages use one h1; sections below it use h2. */
  as?: "h1" | "h2" | "h3";
  align?: "left" | "center";
  id?: string;
  className?: string;
  /** Optional element rendered to the right on wide screens (e.g. a CTA). */
  action?: ReactNode;
}

const titleSizes = {
  h1: "text-4xl sm:text-5xl lg:text-6xl",
  h2: "text-3xl sm:text-4xl lg:text-5xl",
  h3: "text-2xl sm:text-3xl",
};

/** Eyebrow + heading + supporting copy, with consistent sizing and rhythm. */
export function SectionHeading({
  eyebrow,
  title,
  description,
  as: Tag = "h2",
  align = "left",
  id,
  className,
  action,
}: SectionHeadingProps) {
  const centered = align === "center";

  return (
    <div
      className={cn(
        "flex flex-col gap-6",
        action && "lg:flex-row lg:items-end lg:justify-between",
        className,
      )}
    >
      <Reveal className={cn("max-w-3xl", centered && "mx-auto text-center")}>
        {eyebrow ? <Eyebrow className="mb-5">{eyebrow}</Eyebrow> : null}
        <Tag id={id} className={cn("font-bold text-fg", titleSizes[Tag])}>
          {title}
        </Tag>
        {description ? (
          <p className="mt-5 text-base leading-relaxed text-muted sm:text-lg">
            {description}
          </p>
        ) : null}
      </Reveal>
      {action ? (
        <Reveal delay={0.1} className="shrink-0">
          {action}
        </Reveal>
      ) : null}
    </div>
  );
}
