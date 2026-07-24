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
        title="Find Us on Service Road NH8"
        description={`${business.serviceArea} ${business.pickupNote}`}
        className="mb-12 lg:mb-16"
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
          <ContactCards className="sm:grid-cols-1" />
        </div>
      </div>
    </Section>
  );
}
