import Link from "next/link";
import { CalendarCheck, MessageCircle, Navigation } from "lucide-react";
import { business } from "@/lib/business";
import { enquiryHref } from "@/lib/whatsapp";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ContactCards } from "@/components/shared/ContactCards";
import { MapEmbed } from "@/components/shared/MapEmbed";

export function ContactMap() {
  return (
    <Section tone="soft" width="wide" aria-labelledby="contact-heading">
      <SectionHeading
        id="contact-heading"
        eyebrow="Get in Touch"
        eyebrowStyle="inline"
        title="Find Us on Service Road NH8"
        description={`${business.serviceArea} ${business.pickupNote}`}
        className="mb-9 lg:mb-12"
      />

      <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-7">
          <Reveal>
            <MapEmbed />
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <Button href={business.mapsUrl} variant="secondary">
                <Navigation aria-hidden className="h-4 w-4" />
                Get Directions
              </Button>
              <Button href={enquiryHref()} variant="whatsapp">
                <MessageCircle aria-hidden className="h-4 w-4" />
                WhatsApp Us
              </Button>
              <Button href="/book-appointment">
                <CalendarCheck aria-hidden className="h-4 w-4" />
                Book Appointment
              </Button>
            </div>
          </Reveal>
        </div>

        <div className="lg:col-span-5">
          {/* Four essentials here; the contact page carries the full set. */}
          <ContactCards className="sm:grid-cols-2 lg:grid-cols-1" limit={4} compact />
          <Reveal delay={0.1}>
            <p className="mt-4 text-xs text-dim">
              More ways to reach us on the{" "}
              <Link
                href="/contact"
                className="text-muted underline decoration-line underline-offset-4 transition-colors hover:text-fg"
              >
                contact page
              </Link>
              .
            </p>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
