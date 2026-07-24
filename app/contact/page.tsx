import type { Metadata } from "next";
import { CalendarCheck, MessageCircle, Navigation, Truck } from "lucide-react";

import { addressLine, business } from "@/lib/business";
import { breadcrumbSchema, pageMetadata } from "@/lib/seo";
import { enquiryHref } from "@/lib/whatsapp";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { JsonLd } from "@/components/ui/JsonLd";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ContactCards } from "@/components/shared/ContactCards";
import { MapEmbed } from "@/components/shared/MapEmbed";

export const metadata: Metadata = pageMetadata({
  title: "Contact Us",
  description: `Contact ${business.name} — ${addressLine}. Call ${business.phones.primary}, WhatsApp, or email ${business.email}. ${business.hours}.`,
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Contact", path: "/contact" }])} />

      <PageHero
        eyebrow="Get in Touch"
        title="Contact Car Doctor India"
        description={`${business.hours}. Call, message us on WhatsApp, or come to the workshop on Service Road NH8.`}
        crumbs={[{ name: "Contact", path: "/contact" }]}
        image={{ src: "/images/workshop-exterior-night.jpg", alt: "" }}
      />

      <Section width="wide">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Contact methods */}
          <div className="lg:col-span-7">
            <SectionHeading
              eyebrow="Reach Us"
              title="Every Way to Get Hold of Us"
              description="WhatsApp is the fastest — send the car, the symptom and your location and we will come straight back to you."
              className="mb-10"
            />

            <ContactCards />
          </div>

          {/* Quick actions */}
          <div className="lg:col-span-5">
            <Reveal from="right">
              <Card padding="lg">
                <div aria-hidden className="glow-brand-sm absolute inset-x-0 -top-12 h-40" />
                <div className="relative">
                  <h2 className="text-xl font-bold text-fg sm:text-2xl">
                    Quick Actions
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-muted">
                    Book an appointment, ask a question, or get directions to the
                    workshop.
                  </p>

                  <div className="mt-7 flex flex-col gap-3">
                    <Button href="/book-appointment" className="w-full">
                      <CalendarCheck aria-hidden className="h-4 w-4" />
                      Book Appointment
                    </Button>
                    <Button href={enquiryHref()} variant="whatsapp" className="w-full">
                      <MessageCircle aria-hidden className="h-4 w-4" />
                      Message on WhatsApp
                    </Button>
                    <Button
                      href={business.mapsUrl}
                      variant="secondary"
                      className="w-full"
                    >
                      <Navigation aria-hidden className="h-4 w-4" />
                      Get Directions
                    </Button>
                  </div>
                </div>
              </Card>
            </Reveal>

            <Reveal from="right" delay={0.1}>
              <Card className="mt-5" padding="md">
                <div className="flex items-start gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-line bg-ink">
                    <Truck aria-hidden className="h-5 w-5 text-brand" />
                  </span>
                  <div>
                    <h2 className="text-base font-bold text-fg">
                      Can&apos;t Bring the Car In?
                    </h2>
                    <p className="mt-2.5 text-sm leading-relaxed text-muted">
                      We offer a pickup and drop service, including for vehicles
                      that are not in drivable condition. {business.pickupNote}
                    </p>
                  </div>
                </div>
              </Card>
            </Reveal>

            <Reveal from="right" delay={0.16}>
              <Card className="mt-5" padding="md">
                <h2 className="text-base font-bold text-fg">Service Area</h2>
                <p className="mt-2.5 text-sm leading-relaxed text-muted">
                  {business.serviceArea}
                </p>
              </Card>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* Map */}
      <Section tone="soft" width="wide">
        <SectionHeading
          eyebrow="Find Us"
          title="Service Road NH8, Anand"
          description={addressLine}
          align="center"
          className="mb-12"
        />

        <Reveal>
          <MapEmbed />
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-6 flex justify-center">
            <Button href={business.mapsUrl} variant="secondary" size="lg">
              <Navigation aria-hidden className="h-4 w-4" />
              Open in Google Maps
            </Button>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
