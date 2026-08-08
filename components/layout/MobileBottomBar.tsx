"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CalendarCheck, MessageCircle, Phone } from "lucide-react";
import { primaryTelHref } from "@/lib/business";
import { enquiryHref } from "@/lib/whatsapp";
import { cn } from "@/lib/cn";

/**
 * Fixed three-up action bar for phones: Call, WhatsApp, Book.
 *
 * The matching bottom padding that keeps page content clear of this bar lives
 * on the <main> element in the root layout.
 */
export function MobileBottomBar() {
  const pathname = usePathname();
  const onBookingPage = pathname === "/book-appointment";

  const itemClasses =
    "flex flex-1 flex-col items-center justify-center gap-1 py-2.5 text-[11px] font-semibold uppercase tracking-[0.08em] transition-colors";

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-ink/95 backdrop-blur-xl lg:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <nav aria-label="Quick actions" className="flex items-stretch">
        <a href={primaryTelHref} className={cn(itemClasses, "text-muted hover:text-fg")}>
          <Phone aria-hidden className="h-5 w-5 text-brand" />
          Call
        </a>

        <span aria-hidden className="my-2 w-px bg-line" />

        <a
          href={enquiryHref()}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(itemClasses, "text-muted hover:text-fg")}
        >
          <MessageCircle aria-hidden className="h-5 w-5 text-[#25D366]" />
          WhatsApp
        </a>

        <span aria-hidden className="my-2 w-px bg-line" />

        <Link
          href="/book-appointment"
          aria-current={onBookingPage ? "page" : undefined}
          className={cn(
            itemClasses,
            onBookingPage ? "bg-brand text-white" : "text-muted hover:text-fg",
          )}
        >
          <CalendarCheck
            aria-hidden
            className={cn("h-5 w-5", onBookingPage ? "text-white" : "text-brand")}
          />
          Book
        </Link>
      </nav>
    </div>
  );
}
