import { MessageCircle } from "lucide-react";
import { enquiryHref } from "@/lib/whatsapp";

/**
 * Floating WhatsApp button — desktop only.
 *
 * Hidden below `lg`, where the fixed bottom action bar already carries a
 * WhatsApp button. Showing both put a floating bubble on top of body copy and
 * gave the same action two permanent slots on a small screen.
 */
export function WhatsAppFloat() {
  return (
    <a
      href={enquiryHref()}
      target="_blank"
      rel="noopener noreferrer"
      className="group fixed right-6 bottom-6 z-40 hidden h-14 w-14 items-center justify-center rounded-full bg-[#25D366] shadow-[0_12px_32px_-8px_rgba(37,211,102,0.6)] transition-transform duration-300 hover:scale-105 lg:flex"
    >
      {/* Slow pulse to draw the eye without being noisy. */}
      <span
        aria-hidden
        className="absolute inset-0 rounded-full bg-[#25D366] opacity-40 motion-safe:animate-ping"
        style={{ animationDuration: "2.8s" }}
      />
      <MessageCircle aria-hidden className="relative h-7 w-7 text-[#062e12]" />
      <span className="sr-only">Chat with Car Doctor India on WhatsApp</span>
    </a>
  );
}
