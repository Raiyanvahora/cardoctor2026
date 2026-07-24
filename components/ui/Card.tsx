import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/cn";

interface CardProps {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  /** Adds a lift-and-glow treatment. Only use where the card is a link. */
  interactive?: boolean;
  padding?: "none" | "sm" | "md" | "lg";
}

const paddings = {
  none: "",
  sm: "p-5",
  md: "p-6 sm:p-7",
  lg: "p-7 sm:p-9",
};

/** Rounded surface with a thin border — the base container for the whole site. */
export function Card({
  children,
  as: Tag = "div",
  className,
  interactive = false,
  padding = "md",
}: CardProps) {
  return (
    <Tag
      className={cn(
        "relative overflow-hidden rounded-2xl border border-line bg-surface",
        paddings[padding],
        interactive &&
          "transition-[transform,border-color,background-color] duration-300 ease-out " +
            "hover:-translate-y-1 hover:border-brand/50 hover:bg-surface-2",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
