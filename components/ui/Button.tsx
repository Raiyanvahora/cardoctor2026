import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost" | "whatsapp";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold uppercase tracking-[0.08em] " +
  "transition-[transform,background-color,border-color,color,box-shadow] duration-200 ease-out " +
  "active:translate-y-px disabled:pointer-events-none disabled:opacity-60";

const variants: Record<Variant, string> = {
  primary:
    "bg-brand text-white shadow-[0_10px_30px_-12px_rgba(225,29,46,0.9)] hover:bg-brand-dim",
  secondary:
    "border border-line-strong bg-surface/70 text-fg backdrop-blur hover:border-brand hover:bg-surface-2",
  ghost: "text-muted hover:text-fg",
  whatsapp: "bg-[#25D366] text-[#062e12] hover:bg-[#1eb855]",
};

const sizes: Record<Size, string> = {
  sm: "px-4 py-2 text-[11px]",
  md: "px-6 py-3 text-xs",
  lg: "px-7 py-3.5 text-sm",
};

interface StyleProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
}

type LinkProps = StyleProps & {
  href: string;
  /** Force external behaviour. Inferred from the href when omitted. */
  external?: boolean;
} & Omit<ComponentProps<"a">, keyof StyleProps | "href">;

type NativeButtonProps = StyleProps & { href?: never } & Omit<
    ComponentProps<"button">,
    keyof StyleProps
  >;

export type ButtonProps = LinkProps | NativeButtonProps;

/**
 * One button component for the whole site. Renders an internal `next/link`, an
 * external anchor, or a real `<button>` depending on the props given.
 */
export function Button(props: ButtonProps) {
  if (props.href !== undefined) {
    const {
      href,
      external,
      variant = "primary",
      size = "md",
      className,
      children,
      ...rest
    } = props;

    // Anything not starting with "/" leaves the app (tel:, mailto:, https:, …).
    const isExternal = external ?? !href.startsWith("/");
    const classes = cn(base, variants[variant], sizes[size], className);

    if (isExternal) {
      // Only http(s) links need a new tab; tel: and mailto: must stay in place.
      const opensNewTab = href.startsWith("http");
      return (
        <a
          href={href}
          className={classes}
          {...(opensNewTab
            ? { target: "_blank", rel: "noopener noreferrer" }
            : {})}
          {...rest}
        >
          {children}
        </a>
      );
    }

    return (
      <Link href={href} className={classes} {...rest}>
        {children}
      </Link>
    );
  }

  const {
    variant = "primary",
    size = "md",
    className,
    children,
    ...rest
  } = props;

  return (
    <button className={cn(base, variants[variant], sizes[size], className)} {...rest}>
      {children}
    </button>
  );
}
