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
  secondaryTelHref,
} from "@/lib/business";
import { navLinks } from "@/lib/navigation";
import { services } from "@/lib/services";
import { enquiryHref } from "@/lib/whatsapp";
import { Logo } from "./Logo";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-line bg-ink-soft">
      <div aria-hidden className="texture-lines absolute inset-0 opacity-60" />
      <div aria-hidden className="glow-brand-sm absolute -top-32 left-1/4 h-64 w-[36rem]" />

      <div className="relative mx-auto max-w-7xl px-5 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-12">
          {/* Brand */}
          <div className="lg:col-span-4">
            <Logo />
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-muted">
              {business.positioning} in {business.address.city},{" "}
              {business.address.state}, established {business.established}.{" "}
              {business.serviceArea}
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
                <span className="sr-only">Message Car Doctor India on WhatsApp</span>
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

          {/* Navigation */}
          <nav aria-labelledby="footer-explore" className="lg:col-span-2">
            <h2
              id="footer-explore"
              className="text-xs font-bold uppercase tracking-[0.16em] text-fg"
            >
              Explore
            </h2>
            <ul className="mt-5 flex flex-col gap-3 text-sm">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-muted transition-colors hover:text-fg"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/book-appointment"
                  className="text-muted transition-colors hover:text-fg"
                >
                  Book Appointment
                </Link>
              </li>
            </ul>
          </nav>

          {/* Services */}
          <nav aria-labelledby="footer-services" className="lg:col-span-3">
            <h2
              id="footer-services"
              className="text-xs font-bold uppercase tracking-[0.16em] text-fg"
            >
              Services
            </h2>
            <ul className="mt-5 flex flex-col gap-3 text-sm">
              {services.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="text-muted transition-colors hover:text-fg"
                  >
                    {service.shortTitle}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div className="lg:col-span-3">
            <h2 className="text-xs font-bold uppercase tracking-[0.16em] text-fg">
              Contact
            </h2>
            <ul className="mt-5 flex flex-col gap-4 text-sm">
              <li>
                <a
                  href={primaryTelHref}
                  className="flex items-start gap-3 text-muted transition-colors hover:text-fg"
                >
                  <Phone aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                  <span>{business.phones.primary}</span>
                </a>
              </li>
              <li>
                <a
                  href={secondaryTelHref}
                  className="flex items-start gap-3 text-muted transition-colors hover:text-fg"
                >
                  <Phone aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                  <span>{business.phones.secondary}</span>
                </a>
              </li>
              <li>
                <a
                  href={mailHref}
                  className="flex items-start gap-3 break-all text-muted transition-colors hover:text-fg"
                >
                  <Mail aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                  <span>{business.email}</span>
                </a>
              </li>
              <li className="flex items-start gap-3 text-muted">
                <MapPin aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                <address className="not-italic">{addressLine}</address>
              </li>
              <li className="flex items-start gap-3 text-muted">
                <Clock aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                <span>{business.hours}</span>
              </li>
            </ul>

            <a
              href={business.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-full border border-line-strong px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.1em] text-fg transition-colors hover:border-brand"
            >
              <Navigation aria-hidden className="h-4 w-4" />
              Get Directions
            </a>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-line pt-8 text-xs text-dim sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {business.name}. All rights reserved.
          </p>
          <p className="uppercase tracking-[0.14em]">{business.tagline}</p>
        </div>
      </div>
    </footer>
  );
}
