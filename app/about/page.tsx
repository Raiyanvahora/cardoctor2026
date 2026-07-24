import type { Metadata } from "next";
import Image from "next/image";
import { Check, Clock, MapPin, Star } from "lucide-react";

import { business } from "@/lib/business";
import { marques } from "@/lib/rentals";
import { breadcrumbSchema, pageMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/ui/JsonLd";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { CtaBand } from "@/components/shared/CtaBand";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";

export const metadata: Metadata = pageMetadata({
  title: "About Us",
  description: `About ${business.name} — ${business.positioning} in ${business.address.city}, ${business.address.state}, established ${business.established}. ${business.serviceArea}`,
  path: "/about",
});

const whatWeWorkOn = [
  "Scheduled servicing, oil changes and tune-ups",
  "Advanced diagnostics and electrical fault tracing",
  "Engine, transmission, suspension and brake repair",
  "Air conditioning diagnosis and repair",
  "Denting, painting and body repair",
  "Upgrades, modifications and accessories",
  "Luxury car rentals",
  "Insurance quotes and claim paperwork",
];

export default function AboutPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "About", path: "/about" }])} />

      <PageHero
        eyebrow={`Established ${business.established}`}
        title="About Car Doctor India"
        description={`${business.tagline}. A workshop in ${business.address.city} built specifically around luxury and performance cars.`}
        crumbs={[{ name: "About", path: "/about" }]}
        image={{
          src: "/images/bay-red-ambient-night.jpg",
          alt: "",
        }}
      />

      {/* Story */}
      <Section width="wide">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <Reveal from="left">
              <div className="overflow-hidden rounded-3xl border border-line bg-surface">
                <Image
                  src="/images/workshop-exterior-night.jpg"
                  alt="The Car Doctor India workshop on Service Road NH8 in Anand, lit up at night with its illuminated sign and stethoscope logo above the service bays"
                  width={1200}
                  height={1600}
                  priority
                  sizes="(min-width: 1024px) 44vw, 92vw"
                  className="h-[26rem] w-full object-cover object-center sm:h-[34rem]"
                />
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-6">
            <SectionHeading
              eyebrow="Our Story"
              title="We Repair Your Injured Dreams"
              description={`That line is painted across the front of the workshop, and it is the whole idea behind ${business.name}.`}
            />

            <Reveal delay={0.1}>
              <div className="mt-8 space-y-5 text-base leading-relaxed text-muted">
                <p>
                  Car Doctor India opened in {business.established} on Service
                  Road NH8, near Amber Hotel in {business.address.city}. From the
                  start the focus was narrow and deliberate: luxury and
                  performance vehicles, and the kind of work they actually
                  require.
                </p>
                <p>
                  A car like that is not a collection of parts to be swapped
                  until a warning light goes away. It is a set of systems that
                  talk to each other, and a fault in one of them often shows up
                  somewhere else entirely. So the work starts with finding out
                  what is genuinely wrong — reading the car properly, testing
                  what the codes point at, and confirming the cause before
                  anything is replaced.
                </p>
                <p>
                  What began as a repair workshop now covers most of what an
                  owner needs in one place: servicing and diagnostics, engine and
                  mechanical work, air conditioning, bodywork and paint,
                  upgrades and accessories, rentals, and help with insurance.
                </p>
                <p>{business.serviceArea}</p>
              </div>
            </Reveal>

            <Reveal delay={0.18}>
              <dl className="mt-10 grid grid-cols-3 gap-px overflow-hidden rounded-2xl border border-line bg-line">
                <div className="bg-surface px-4 py-5">
                  <dt className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-dim">
                    <MapPin aria-hidden className="h-3.5 w-3.5 text-brand" />
                    Since
                  </dt>
                  <dd className="mt-2 font-display text-xl font-bold text-fg">
                    {business.established}
                  </dd>
                </div>
                <div className="bg-surface px-4 py-5">
                  <dt className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-dim">
                    <Star aria-hidden className="h-3.5 w-3.5 fill-brand text-brand" />
                    Google
                  </dt>
                  <dd className="mt-2 font-display text-xl font-bold text-fg">
                    {business.googleRating}
                    <span className="text-brand">★</span>
                  </dd>
                </div>
                <div className="bg-surface px-4 py-5">
                  <dt className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-dim">
                    <Clock aria-hidden className="h-3.5 w-3.5 text-brand" />
                    Open
                  </dt>
                  <dd className="mt-2 font-display text-xl font-bold text-fg">
                    24<span className="text-brand">/</span>7
                  </dd>
                </div>
              </dl>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* What we work on + marques */}
      <Section tone="soft" width="wide">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow="What We Handle"
              title="One Workshop, the Whole Job"
              description="Servicing, repair, bodywork, upgrades and the paperwork that comes with them — handled in-house rather than sent elsewhere."
            />
          </div>

          <div className="lg:col-span-7">
            <Reveal delay={0.1}>
              <ul className="grid gap-3 sm:grid-cols-2">
                {whatWeWorkOn.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 rounded-2xl border border-line bg-surface p-4 text-sm text-muted"
                  >
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-soft">
                      <Check aria-hidden className="h-3 w-3 text-brand" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.18}>
              <Card className="mt-6" padding="md">
                <h3 className="text-sm font-bold uppercase tracking-[0.14em] text-fg">
                  Marques on our signage
                </h3>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {marques.map((marque) => (
                    <li
                      key={marque.name}
                      className="rounded-full border border-line bg-ink px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-muted"
                    >
                      {marque.name}
                    </li>
                  ))}
                </ul>
                <p className="mt-5 text-xs leading-relaxed text-dim">
                  We are not a franchised dealer for any of these marques. These
                  are the makes the workshop specialises in servicing and
                  repairing.
                </p>
              </Card>
            </Reveal>
          </div>
        </div>
      </Section>

      <WhyChooseUs />

      {/* Workshop imagery */}
      <Section tone="soft" width="wide">
        <SectionHeading
          eyebrow="The Premises"
          title="Where the Work Happens"
          description="The reception, the parts wall and the service bay in Anand."
          align="center"
          className="mb-12 lg:mb-16"
        />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              src: "/images/reception-interior.jpg",
              alt: "The Car Doctor India reception with a branded desk, seating, and alloy wheels, grilles and performance parts displayed on the brick wall behind",
              width: 1200,
              height: 1600,
              caption: "Reception and parts display",
            },
            {
              src: "/images/bay-brand-wall-night.jpg",
              alt: "The Car Doctor India service bay at night with cars parked inside and luxury marque badges mounted on the wall",
              width: 1200,
              height: 1600,
              caption: "The service bay",
            },
            {
              src: "/images/signage-red-bmw-night.webp",
              alt: "A red BMW parked beneath the illuminated Car Doctor India sign at night",
              width: 765,
              height: 1020,
              caption: "The frontage at night",
            },
          ].map((photo, index) => (
            <Reveal key={photo.src} delay={index * 0.08}>
              <figure className="overflow-hidden rounded-2xl border border-line bg-surface">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  width={photo.width}
                  height={photo.height}
                  sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 92vw"
                  className="aspect-[3/4] w-full object-cover object-center"
                />
                <figcaption className="border-t border-line px-5 py-4 text-sm text-muted">
                  {photo.caption}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </Section>

      <CtaBand
        eyebrow="Come and See"
        title="Bring Us Your Car"
        description={`The workshop is on Service Road NH8, near Amber Hotel in ${business.address.city}. ${business.hours}. ${business.pickupNote}`}
      />
    </>
  );
}
