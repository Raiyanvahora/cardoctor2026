/**
 * Joins class names, dropping anything falsy.
 *
 * Accepts any value so `cond && "class"` works even when `cond` is a ReactNode
 * or a number; only truthy strings ever make it into the output.
 */
export function cn(...classes: unknown[]): string {
  return classes.filter((value): value is string => typeof value === "string" && value !== "").join(" ");
}
