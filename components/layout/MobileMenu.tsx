"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { CalendarCheck, MessageCircle, Phone, X } from "lucide-react";
import { business, primaryTelHref } from "@/lib/business";
import { navLinks } from "@/lib/navigation";
import { enquiryHref } from "@/lib/whatsapp";
import { cn } from "@/lib/cn";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
  pathname: string;
}

const FOCUSABLE =
  'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])';

/**
 * Full-screen navigation panel for small screens.
 *
 * Framer Motion drives the slide and fade, including the *exit* transition —
 * the panel unmounts on close, which CSS transitions cannot animate on their
 * own. This is safe to animate in JS because the panel only ever renders in
 * response to a tap: it is never server-rendered in a hidden state, so it
 * cannot get stranded mid-animation the way scroll reveals could.
 *
 * Accessibility contract: focus moves in on open and returns to the trigger on
 * close, Tab is trapped, Escape closes, background scrolling is locked.
 */
export function MobileMenu({ open, onClose, pathname }: MobileMenuProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (!open) return;

    previouslyFocused.current = document.activeElement as HTMLElement | null;

    // Lock background scrolling without the page shifting as the bar hides.
    const { overflow, paddingRight } = document.body.style;
    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = "hidden";
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    const focusables = panelRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE);
    focusables?.[0]?.focus();

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== "Tab") return;

      const items = panelRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE);
      if (!items || items.length === 0) return;

      const first = items[0];
      const last = items[items.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = overflow;
      document.body.style.paddingRight = paddingRight;
      previouslyFocused.current?.focus();
    };
  }, [open, onClose]);

  const duration = reduceMotion ? 0 : 0.28;

  return (
    <AnimatePresence>
      {open ? (
        <div className="fixed inset-0 z-50 lg:hidden">
          <motion.button
            type="button"
            aria-label="Close navigation menu"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration }}
            className="absolute inset-0 h-full w-full cursor-default bg-ink/80 backdrop-blur-sm"
          />

          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
            initial={reduceMotion ? { opacity: 0 } : { x: "100%" }}
            animate={reduceMotion ? { opacity: 1 } : { x: 0 }}
            exit={reduceMotion ? { opacity: 0 } : { x: "100%" }}
            transition={{ duration, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-y-0 right-0 flex w-full max-w-sm flex-col border-l border-line bg-ink-soft shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-line px-5 py-4">
              <span className="font-display text-sm font-bold tracking-[0.16em] text-muted uppercase">
                Menu
              </span>
              <button
                type="button"
                onClick={onClose}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-muted transition-colors hover:border-brand hover:text-fg"
              >
                <X aria-hidden className="h-5 w-5" />
                <span className="sr-only">Close navigation menu</span>
              </button>
            </div>

            <nav aria-label="Primary" className="flex-1 overflow-y-auto px-5 py-6">
              <ul className="flex flex-col gap-1">
                {navLinks.map((link) => {
                  const isActive =
                    link.href === "/"
                      ? pathname === "/"
                      : pathname.startsWith(link.href);

                  return (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        onClick={onClose}
                        aria-current={isActive ? "page" : undefined}
                        className={cn(
                          "flex items-center justify-between rounded-xl border border-transparent px-4 py-3.5",
                          "font-display text-lg font-semibold tracking-tight uppercase transition-colors",
                          isActive
                            ? "border-line bg-surface text-fg"
                            : "text-muted hover:bg-surface hover:text-fg",
                        )}
                      >
                        {link.label}
                        {isActive ? (
                          <span
                            aria-hidden
                            className="h-1.5 w-1.5 rounded-full bg-brand"
                          />
                        ) : null}
                      </Link>
                    </li>
                  );
                })}
              </ul>

              <div className="mt-6 flex flex-col gap-3 border-t border-line pt-6">
                <Link
                  href="/book-appointment"
                  onClick={onClose}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-brand px-6 py-3.5 text-xs font-semibold tracking-[0.08em] text-white uppercase transition-colors hover:bg-brand-dim"
                >
                  <CalendarCheck aria-hidden className="h-4 w-4" />
                  Book Appointment
                </Link>
                <a
                  href={enquiryHref()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-line-strong px-6 py-3.5 text-xs font-semibold tracking-[0.08em] text-fg uppercase transition-colors hover:border-brand"
                >
                  <MessageCircle aria-hidden className="h-4 w-4" />
                  WhatsApp Us
                </a>
                <a
                  href={primaryTelHref}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-line px-6 py-3.5 text-xs font-semibold tracking-[0.08em] text-muted uppercase transition-colors hover:border-brand hover:text-fg"
                >
                  <Phone aria-hidden className="h-4 w-4" />
                  {business.phones.primary}
                </a>
              </div>
            </nav>
          </motion.div>
        </div>
      ) : null}
    </AnimatePresence>
  );
}
