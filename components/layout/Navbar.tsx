"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Clock, Menu, Phone } from "lucide-react";
import { business, primaryTelHref } from "@/lib/business";
import { navLinks } from "@/lib/navigation";
import { cn } from "@/lib/cn";
import { Logo } from "./Logo";
import { MobileMenu } from "./MobileMenu";

/**
 * Sticky site header.
 *
 * Sits transparent over the hero, then picks up a blurred dark background and
 * a hairline border once the page is scrolled.
 */
export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 16);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the panel whenever navigation completes.
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <>
      {/* Utility strip — hidden once scrolled to keep the header compact. */}
      <div
        className={cn(
          "fixed inset-x-0 top-0 z-40 hidden border-b border-line bg-ink-soft/90 backdrop-blur transition-transform duration-300 lg:block",
          scrolled && "-translate-y-full",
        )}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-2 text-[11px] font-medium uppercase tracking-[0.14em] text-dim">
          <span className="flex items-center gap-2">
            <Clock aria-hidden className="h-3.5 w-3.5 text-brand" />
            {business.hours}
          </span>
          <span className="flex items-center gap-6">
            <span>{business.serviceArea}</span>
            <a
              href={primaryTelHref}
              className="flex items-center gap-2 text-muted transition-colors hover:text-fg"
            >
              <Phone aria-hidden className="h-3.5 w-3.5 text-brand" />
              {business.phones.primary}
            </a>
          </span>
        </div>
      </div>

      <header
        className={cn(
          "fixed inset-x-0 z-40 transition-[background-color,border-color,top,box-shadow] duration-300",
          scrolled
            ? "top-0 border-b border-line bg-ink/85 shadow-[0_8px_30px_-20px_rgba(0,0,0,1)] backdrop-blur-xl"
            : "top-0 border-b border-transparent bg-transparent lg:top-[37px]",
        )}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4 sm:px-6 lg:px-8">
          <Logo />

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {navLinks.map((link) => {
                const isActive =
                  link.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(link.href);

                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      aria-current={isActive ? "page" : undefined}
                      className={cn(
                        "relative rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] transition-colors",
                        isActive
                          ? "text-fg"
                          : "text-muted hover:text-fg",
                      )}
                    >
                      {link.label}
                      {isActive ? (
                        <span
                          aria-hidden
                          className="absolute inset-x-4 -bottom-0.5 h-px bg-brand"
                        />
                      ) : null}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <Link
              href="/book-appointment"
              className="hidden rounded-full bg-brand px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.1em] text-white shadow-[0_10px_30px_-14px_rgba(225,29,46,0.9)] transition-colors hover:bg-brand-dim sm:inline-flex"
            >
              Book Appointment
            </Link>

            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-expanded={menuOpen}
              aria-haspopup="dialog"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-line bg-surface/80 text-fg backdrop-blur transition-colors hover:border-brand lg:hidden"
            >
              <Menu aria-hidden className="h-5 w-5" />
              <span className="sr-only">Open navigation menu</span>
            </button>
          </div>
        </div>
      </header>

      <MobileMenu
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        pathname={pathname}
      />
    </>
  );
}
