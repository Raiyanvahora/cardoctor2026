import type { Metadata } from "next";
import { Clock, MapPin, MessageCircle, Phone, Truck } from "lucide-react";

import { addressLine, business, primaryTelHref } from "@/lib/business";
import { breadcrumbSchema, pageMetadata } from "@/lib/seo";
import { enquiryHref } from "@/lib/whatsapp";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { JsonLd } from "@/components/ui/JsonLd";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { BookingForm } from "@/components/booking/BookingForm";

export const metadata: Metadata = pageMetadata({
  title: "Book an Appointment",
  description: `Book a service or repair appointment with ${business.name} in ${business.address.city}, ${business.address.state}. Fill in your car and vehicle details and send the request straight to WhatsApp. ${business.hours}.`,
  path: "/book-appointment",
});

const whatHappensNext = [
  "Your request arrives on our WhatsApp with everything you filled in.",
  "We confirm the slot with you, or suggest the nearest one that works.",
  "If you asked for pickup and drop, we confirm whether it covers your area.",
  "You get a reminder of the date, time and what to bring.",
];

export default function BookAppointmentPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Book Appointment", path: "/book-appointment" },
        ])}
      />

      <PageHero
        eyebrow="Booking"
        title="Book an Appointment"
        description="Tell us about your car and when suits you. We will confirm the slot with you on WhatsApp."
        crumbs={[{ name: "Book Appointment", path: "/book-appointment" }]}
        image={{ src: "/images/bay-brand-wall-night.jpg", alt: "" }}
      />

      <Section width="wide">
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
          {/* Form */}
          <div className="lg:col-span-8">
            <BookingForm />
          </div>

          {/* Side panel */}
          <aside className="lg:col-span-4">
            <div className="flex flex-col gap-5 lg:sticky lg:top-28">
              <Reveal from="right">
                <Card padding="md">
                  <h2 className="text-base font-bold text-fg">
                    Prefer to Talk?
                  </h2>
                  <p className="mt-2.5 text-sm leading-relaxed text-muted">
                    Call us or send a message — whichever is quicker for you.
                  </p>
                  <div className="mt-6 flex flex-col gap-3">
                    <Button href={enquiryHref()} variant="whatsapp" size="sm">
                      <MessageCircle aria-hidden className="h-4 w-4" />
                      WhatsApp Us
                    </Button>
                    <Button href={primaryTelHref} variant="secondary" size="sm">
                      <Phone aria-hidden className="h-4 w-4" />
                      {business.phones.primary}
                    </Button>
                  </div>
                </Card>
              </Reveal>

              <Reveal from="right" delay={0.08}>
                <Card padding="md">
                  <h2 className="text-base font-bold text-fg">
                    What Happens Next
                  </h2>
                  <ol className="mt-5 space-y-4">
                    {whatHappensNext.map((step, index) => (
                      <li key={step} className="flex gap-3 text-sm text-muted">
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-line bg-ink font-display text-[11px] font-bold text-brand">
                          {index + 1}
                        </span>
                        <span className="leading-relaxed">{step}</span>
                      </li>
                    ))}
                  </ol>
                </Card>
              </Reveal>

              <Reveal from="right" delay={0.14}>
                <Card padding="md">
                  <ul className="space-y-5 text-sm">
                    <li className="flex items-start gap-3">
                      <Clock aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                      <span>
                        <span className="block text-[10px] font-semibold uppercase tracking-[0.14em] text-dim">
                          Hours
                        </span>
                        <span className="mt-1 block text-muted">
                          {business.hours}
                        </span>
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <MapPin aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                      <span>
                        <span className="block text-[10px] font-semibold uppercase tracking-[0.14em] text-dim">
                          Workshop
                        </span>
                        <address className="mt-1 block not-italic text-muted">
                          {addressLine}
                        </address>
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Truck aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                      <span>
                        <span className="block text-[10px] font-semibold uppercase tracking-[0.14em] text-dim">
                          Pickup & Drop
                        </span>
                        <span className="mt-1 block text-muted">
                          {business.pickupNote}
                        </span>
                      </span>
                    </li>
                  </ul>
                </Card>
              </Reveal>
            </div>
          </aside>
        </div>
      </Section>
    </>
  );
}
