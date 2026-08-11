import Link from "next/link";
import {
  Clock,
  Instagram,
  Mail,
  MapPin,
  MessageCircle,
  Navigation,
  Phone,
} from "lucide-react";
import {
  addressLine,
  business,
  mailHref,
  primaryTelHref,
} from "@/lib/business";
import { navLinks } from "@/lib/navigation";
import { services } from "@/lib/services";
import { enquiryHref } from "@/lib/whatsapp";
import { Logo } from "./Logo";
import { FooterGroup } from "./FooterGroup";

/** Footer links need a 44px touch target, not a 17px line of text. */
const linkClasses =
  "flex min-h-11 items-center text-sm text-muted transition-colors hover:text-fg lg:min-h-0 lg:py-1.5";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-line bg-ink-soft">
      <div aria-hidden className="texture-lines absolute inset-0 opacity-60" />
      <div aria-hidden className="glow-brand-sm absolute -top-32 left-1/4 h-64 w-[36rem]" />

      {/* Extra bottom padding on phones clears the fixed action bar. */}
      <div className="relative mx-auto max-w-7xl px-5 pt-12 pb-28 sm:px-6 lg:px-8 lg:pt-20 lg:pb-12">
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
          {/* Brand */}
          <div className="lg:col-span-4">
            <Logo />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted">
              {business.positioning} in {business.address.city},{" "}
              {business.address.state}, established {business.established}.
              Serving luxury car owners across India.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={business.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-line bg-surface text-muted transition-colors hover:border-brand hover:text-fg"
              >
                <Instagram aria-hidden className="h-4.5 w-4.5" />
                <span className="sr-only">Car Doctor India on Instagram</span>
              </a>
              <a
                href={enquiryHref()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-line bg-surface text-muted transition-colors hover:border-brand hover:text-fg"
              >
                <MessageCircle aria-hidden className="h-4.5 w-4.5" />
                <span className="sr-only">
                  Message Car Doctor India on WhatsApp
                </span>
              </a>
              <a
                href={mailHref}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-line bg-surface text-muted transition-colors hover:border-brand hover:text-fg"
              >
                <Mail aria-hidden className="h-4.5 w-4.5" />
                <span className="sr-only">Email Car Doctor India</span>
              </a>
            </div>
          </div>

          {/* Explore — collapsed on phones, open from lg up. */}
          <nav aria-label="Footer navigation" className="lg:col-span-2">
            <FooterGroup title="Explore" id="footer-explore">
              <ul className="grid grid-cols-2 gap-x-4 lg:mt-4 lg:grid-cols-1 lg:gap-0">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className={linkClasses}>
                      {link.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link href="/book-appointment" className={linkClasses}>
                    Book Appointment
                  </Link>
                </li>
              </ul>
            </FooterGroup>
          </nav>

          {/* Services */}
          <nav aria-label="Footer services" className="lg:col-span-3">
            <FooterGroup title="Services" id="footer-services">
              <ul className="grid grid-cols-2 gap-x-4 lg:mt-4 lg:grid-cols-1 lg:gap-0">
                {services.map((service) => (
                  <li key={service.slug}>
                    <Link
                      href={`/services/${service.slug}`}
                      className={linkClasses}
                    >
                      {service.shortTitle}
                    </Link>
                  </li>
                ))}
              </ul>
            </FooterGroup>
          </nav>

          {/* Contact — always visible; this is what people came for. */}
          <div className="lg:col-span-3">
            <h2 className="pt-4 text-xs font-bold tracking-[0.16em] text-fg uppercase lg:pt-0">
              Contact
            </h2>
            <ul className="mt-3 flex flex-col lg:mt-4">
              <li>
                <a
                  href={primaryTelHref}
                  className="flex min-h-11 items-center gap-3 text-sm text-muted transition-colors hover:text-fg"
                >
                  <Phone aria-hidden className="h-4 w-4 shrink-0 text-brand" />
                  {business.phones.primary}
                </a>
              </li>
              <li>
                <a
                  href={mailHref}
                  className="flex min-h-11 items-center gap-3 text-sm break-all text-muted transition-colors hover:text-fg"
                >
                  <Mail aria-hidden className="h-4 w-4 shrink-0 text-brand" />
                  {business.email}
                </a>
              </li>
              <li className="flex items-start gap-3 py-2.5 text-sm text-muted">
                <MapPin aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                <address className="not-italic">{addressLine}</address>
              </li>
              <li className="flex items-center gap-3 py-2.5 text-sm text-muted">
                <Clock aria-hidden className="h-4 w-4 shrink-0 text-brand" />
                {business.hours}
              </li>
            </ul>

            <a
              href={business.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex min-h-11 items-center gap-2 rounded-full border border-line-strong px-5 text-[11px] font-semibold tracking-[0.1em] text-fg uppercase transition-colors hover:border-brand"
            >
              <Navigation aria-hidden className="h-4 w-4" />
              Get Directions
            </a>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-line pt-6 text-xs text-dim sm:flex-row sm:items-center sm:justify-between lg:mt-14 lg:pt-8">
          <p>
            © {year} {business.name}. All rights reserved.
          </p>
          <p className="tracking-[0.14em] uppercase">{business.tagline}</p>
        </div>
      </div>
    </footer>
  );
}
