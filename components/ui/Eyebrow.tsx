import { cn } from "@/lib/cn";

interface EyebrowProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Small uppercase label with a red marker, used above section headings.
 * The marker is decorative and hidden from assistive technology.
 */
export function Eyebrow({ children, className }: EyebrowProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2.5 rounded-full border border-line bg-surface/80 px-3.5 py-1.5",
        "text-[11px] font-semibold uppercase tracking-[0.18em] text-muted",
        className,
      )}
    >
      <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-brand" />
      {children}
    </span>
  );
}
