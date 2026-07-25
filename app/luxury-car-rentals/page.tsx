import type { Metadata } from "next";
import Image from "next/image";
import {
  CalendarRange,
  CarFront,
  Info,
  MessageCircle,
  PartyPopper,
} from "lucide-react";

import { business } from "@/lib/business";
import { indicativeVehicles, marques, rentalSteps } from "@/lib/rentals";
import { breadcrumbSchema, pageMetadata } from "@/lib/seo";
import { enquiryHref } from "@/lib/whatsapp";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { JsonLd } from "@/components/ui/JsonLd";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CtaBand } from "@/components/shared/CtaBand";

export const metadata: Metadata = pageMetadata({
  title: "Luxury Car Rentals",
  description: `Luxury car rentals from ${business.name} in ${business.address.city}, ${business.address.state} — for weddings, events, shoots and daily use. Availability and rates confirmed on WhatsApp for your dates.`,
  path: "/luxury-car-rentals",
});

const useCases = [
  {
    icon: PartyPopper,
    title: "Special Occasions",
    body: "Weddings, events and photo or video shoots, where the car is part of the picture rather than just transport.",
  },
  {
    icon: CalendarRange,
    title: "Daily Use",
    body: "Short-term rental when you want something better than a standard hire car for a few days of driving.",
  },
];

export default function RentalsPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Luxury Car Rentals", path: "/luxury-car-rentals" },
        ])}
      />

      <PageHero
        eyebrow="Rentals"
        title="Luxury Car Rentals"
        description="Luxury cars for special occasions or daily use, arranged from the Anand workshop. Tell us your dates and we will confirm what is available."
        crumbs={[{ name: "Luxury Car Rentals", path: "/luxury-car-rentals" }]}
        image={{ src: "/images/signage-red-bmw-night.webp", alt: "" }}
      />

      {/* Availability notice — sits above everything so it cannot be missed. */}
      <Section width="wide" spacing="tight">
        <Reveal>
          <div className="flex flex-col gap-4 rounded-2xl border border-brand/30 bg-brand-soft p-6 sm:flex-row sm:items-start sm:gap-5">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-brand/40 bg-ink">
              <Info aria-hidden className="h-5 w-5 text-brand" />
            </span>
            <div>
              <h2 className="text-sm font-bold uppercase tracking-[0.14em] text-fg">
                Availability & Rates
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                We do not publish a fixed fleet list or rate card, because
                availability changes constantly. Message us on WhatsApp with your
                dates and the occasion, and we will confirm exactly what is free
                and what it costs. Nothing is held until it is confirmed with you.
              </p>
            </div>
          </div>
        </Reveal>
      </Section>

      {/* Use cases */}
      <Section width="wide" spacing="tight">
        <div className="grid gap-5 sm:grid-cols-2">
          {useCases.map((useCase, index) => {
            const Icon = useCase.icon;
            return (
              <Reveal key={useCase.title} delay={index * 0.08}>
                <Card className="h-full" padding="lg">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-line bg-ink">
                    <Icon aria-hidden className="h-5.5 w-5.5 text-brand" />
                  </span>
                  <h2 className="mt-6 text-xl font-bold text-fg">
                    {useCase.title}
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-muted">
                    {useCase.body}
                  </p>
                </Card>
              </Reveal>
            );
          })}
        </div>
      </Section>

      {/* How it works */}
      <Section tone="soft" width="wide">
        <SectionHeading
          eyebrow="How It Works"
          title="Four Steps to the Keys"
          align="center"
          className="mb-12 lg:mb-16"
        />

        <ol className="grid gap-5 lg:grid-cols-4">
          {rentalSteps.map((step, index) => (
            <Reveal as="li" key={step.title} delay={index * 0.08}>
              <div className="flex h-full flex-col rounded-2xl border border-line bg-surface p-6 sm:p-7">
                <span className="font-display text-3xl font-extrabold text-line-strong">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-5 text-lg font-bold text-fg">{step.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {step.body}
                </p>
              </div>
            </Reveal>
          ))}
        </ol>
      </Section>

      {/* Marques */}
      <Section width="wide">
        <SectionHeading
          eyebrow="The Marques"
          title="The Makes We Work With"
          description="These are the luxury marques on the workshop's own signage — the makes Car Doctor India specialises in."
          align="center"
          className="mb-10"
        />

        <Reveal>
          <ul className="flex flex-wrap justify-center gap-3">
            {marques.map((marque) => (
              <li
                key={marque.name}
                className="rounded-full border border-line bg-surface px-5 py-3 font-display text-sm font-bold uppercase tracking-[0.1em] text-muted"
              >
                {marque.name}
              </li>
            ))}
          </ul>
        </Reveal>
      </Section>

      {/* Indicative vehicles */}
      <Section tone="soft" width="wide">
        <SectionHeading
          eyebrow="Seen at the Workshop"
          title="The Kind of Car We Handle"
          description="Real photographs of cars at the Car Doctor India workshop. They show the standard of vehicle we work with — they are not a live availability list."
          className="mb-10"
        />

        <Reveal>
          <div className="mb-8 flex items-start gap-3 rounded-2xl border border-line bg-surface p-5">
            <Info aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
            <p className="text-sm leading-relaxed text-muted">
              <span className="font-semibold text-fg">Indicative only.</span> The
              cars below were photographed at the workshop and are shown as
              examples. Availability for any specific vehicle, date or rate is
              confirmed on WhatsApp — please ask before you plan around it.
            </p>
          </div>
        </Reveal>

        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {indicativeVehicles.map((vehicle, index) => (
            <Reveal as="li" key={vehicle.name} delay={index * 0.06} className="h-full">
              <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface">
                <div className="relative">
                  <Image
                    src={vehicle.image.src}
                    alt={vehicle.image.alt}
                    width={vehicle.image.width}
                    height={vehicle.image.height}
                    sizes="(min-width: 1024px) 22vw, (min-width: 640px) 45vw, 92vw"
                    className="aspect-[4/3] w-full object-cover object-center"
                  />
                  <span className="absolute top-3 left-3 rounded-full border border-line-strong bg-ink/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-muted backdrop-blur">
                    Indicative
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="text-base font-bold text-fg">{vehicle.name}</h3>
                  <p className="mt-1.5 text-xs uppercase tracking-[0.12em] text-dim">
                    {vehicle.category}
                  </p>
                  <div className="mt-5 flex-1" />
                  <Button
                    href={enquiryHref(
                      `renting a ${vehicle.name} — please confirm availability`,
                    )}
                    variant="secondary"
                    size="sm"
                    className="w-full"
                  >
                    <MessageCircle aria-hidden className="h-4 w-4" />
                    Check Availability
                  </Button>
                </div>
              </article>
            </Reveal>
          ))}
        </ul>
      </Section>

      {/* What you need */}
      <Section width="wide" spacing="tight">
        <Reveal>
          <Card padding="lg">
            <div className="flex items-center gap-4">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-line bg-ink">
                <CarFront aria-hidden className="h-5.5 w-5.5 text-brand" />
              </span>
              <h2 className="text-xl font-bold text-fg sm:text-2xl">
                What to Send When You Enquire
              </h2>
            </div>
            <ul className="mt-7 grid gap-3 sm:grid-cols-2">
              {[
                "The dates you need the car",
                "The city or area you need it in",
                "Whether it is for an occasion or daily use",
                "Any particular car or marque you have in mind",
              ].map((item) => (
                <li
                  key={item}
                  className="rounded-xl border border-line bg-ink px-4 py-3.5 text-sm text-muted"
                >
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-xs leading-relaxed text-dim">
              Valid identification and driving licence documentation is required
              before any vehicle is handed over.
            </p>
          </Card>
        </Reveal>
      </Section>

      <CtaBand
        eyebrow="Rentals"
        title="Tell Us Your Dates"
        description="Send us when and where you need the car, and we will come back to you with what is available and what it costs."
        whatsappTopic="luxury car rentals"
      />
    </>
  );
}
