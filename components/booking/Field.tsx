import type { ReactNode } from "react";
import { AlertCircle } from "lucide-react";
import { cn } from "@/lib/cn";

interface FieldProps {
  id: string;
  label: string;
  error?: string;
  required?: boolean;
  hint?: string;
  className?: string;
  /** Receives the ids the control must reference for accessibility. */
  children: (ids: { describedBy: string | undefined; invalid: boolean }) => ReactNode;
}

/**
 * Wraps one form control with its label, optional hint and error message,
 * and wires up `aria-describedby` / `aria-invalid` for the control.
 */
export function Field({
  id,
  label,
  error,
  required,
  hint,
  className,
  children,
}: FieldProps) {
  const errorId = `${id}-error`;
  const hintId = `${id}-hint`;
  const describedBy =
    [hint ? hintId : null, error ? errorId : null].filter(Boolean).join(" ") ||
    undefined;

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <label
        htmlFor={id}
        className="text-xs font-semibold uppercase tracking-[0.12em] text-muted"
      >
        {label}
        {required ? (
          <>
            <span aria-hidden className="ml-1 text-brand">
              *
            </span>
            <span className="sr-only"> (required)</span>
          </>
        ) : (
          <span className="ml-1.5 text-dim normal-case">(optional)</span>
        )}
      </label>

      {hint ? (
        <p id={hintId} className="text-xs text-dim">
          {hint}
        </p>
      ) : null}

      {children({ describedBy, invalid: Boolean(error) })}

      {error ? (
        <p
          id={errorId}
          className="flex items-start gap-1.5 text-xs font-medium text-brand"
        >
          <AlertCircle aria-hidden className="mt-px h-3.5 w-3.5 shrink-0" />
          {error}
        </p>
      ) : null}
    </div>
  );
}

/** Shared input styling so every control in the form matches. */
export function controlClasses(invalid: boolean): string {
  return cn(
    "w-full rounded-xl border bg-ink px-4 py-3 text-sm text-fg placeholder:text-dim",
    "transition-colors duration-200 outline-none",
    "focus:border-brand focus-visible:outline-none",
    invalid ? "border-brand" : "border-line hover:border-line-strong",
  );
}
