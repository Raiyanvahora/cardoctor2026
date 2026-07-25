import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Eyebrow } from "./Eyebrow";
import { Reveal } from "./Reveal";

interface SectionHeadingProps {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  as?: "h1" | "h2" | "h3";
  align?: "left" | "center";
  id?: string;
  className?: string;
  action?: ReactNode;
  /**
   * How the eyebrow is presented. Varying this stops every section on the page
   * opening with an identical pill-and-centred-title block.
   *
   *   "pill" — bordered pill (use sparingly, for the headline section)
   *   "rule" — small uppercase label above a short red rule
   *   "inline" — label sitting on the same baseline as a hairline that runs out
   *   "none" — no eyebrow at all
   */
  eyebrowStyle?: "pill" | "rule" | "inline" | "none";
  size?: "sm" | "md" | "lg";
}

const titleSizes = {
  sm: "text-2xl sm:text-3xl",
  md: "text-[1.75rem] leading-[1.08] sm:text-4xl lg:text-[2.75rem]",
  lg: "text-4xl sm:text-5xl lg:text-6xl",
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  as: Tag = "h2",
  align = "left",
  id,
  className,
  action,
  eyebrowStyle = "rule",
  size = "md",
}: SectionHeadingProps) {
  const centered = align === "center";

  const label =
    !eyebrow || eyebrowStyle === "none" ? null : eyebrowStyle === "pill" ? (
      <Eyebrow className="mb-5">{eyebrow}</Eyebrow>
    ) : eyebrowStyle === "inline" ? (
      <span
        className={cn(
          "mb-5 flex items-center gap-4",
          centered && "justify-center",
        )}
      >
        <span className="text-[11px] font-semibold tracking-[0.18em] text-brand uppercase">
          {eyebrow}
        </span>
        <span
          aria-hidden
          className="rule-line h-px flex-1 origin-left bg-gradient-to-r from-brand/60 to-line"
        />
      </span>
    ) : (
      <span className={cn("mb-5 block", centered && "text-center")}>
        <span className="text-[11px] font-semibold tracking-[0.18em] text-brand uppercase">
          {eyebrow}
        </span>
        <span
          aria-hidden
          className={cn("rule-line mt-2.5 block h-0.5 w-9 bg-brand", centered && "mx-auto")}
        />
      </span>
    );

  return (
    <div
      className={cn(
        "flex flex-col gap-5",
        action && "lg:flex-row lg:items-end lg:justify-between lg:gap-10",
        className,
      )}
    >
      <Reveal className={cn("max-w-2xl", centered && "mx-auto text-center")}>
        {label}
        <Tag id={id} className={cn("font-bold text-fg", titleSizes[size])}>
          {title}
        </Tag>
        {description ? (
          <p className="mt-4 text-[0.95rem] leading-relaxed text-muted sm:text-base">
            {description}
          </p>
        ) : null}
      </Reveal>
      {action ? (
        <Reveal delay={0.08} className="shrink-0">
          {action}
        </Reveal>
      ) : null}
    </div>
  );
}
