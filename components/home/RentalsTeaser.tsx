import Image from "next/image";
import { ArrowRight, MessageCircle } from "lucide-react";
import { marques } from "@/lib/rentals";
import { enquiryHref } from "@/lib/whatsapp";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";

export function RentalsTeaser() {
  return (
    <Section width="wide" aria-labelledby="rentals-heading">
      <div className="relative overflow-hidden rounded-3xl border border-line bg-surface">
        <div aria-hidden className="glow-brand absolute -top-32 -right-20 h-96 w-96" />

        <div className="grid items-stretch gap-0 lg:grid-cols-12">
          {/* Copy */}
          <div className="relative order-2 p-7 sm:p-10 lg:order-1 lg:col-span-7 lg:p-14">
            <Reveal>
              <Eyebrow>Luxury Car Rentals</Eyebrow>
              <h2
                id="rentals-heading"
                className="mt-6 text-3xl font-bold text-fg sm:text-4xl lg:text-5xl"
              >
                Drive Something Worth Arriving In
              </h2>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-muted">
                Luxury cars available to rent for weddings, events and shoots — or
                simply for a few days of driving something better. Tell us your
                dates and we will confirm what is available and what it costs.
              </p>
            </Reveal>

            <Reveal delay={0.12}>
              <ul className="mt-8 flex flex-wrap gap-2">
                {marques.map((marque) => (
                  <li
                    key={marque.name}
                    className="rounded-full border border-line bg-ink px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-muted"
                  >
                    {marque.name}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Button href="/luxury-car-rentals">
                  View Rentals
                  <ArrowRight aria-hidden className="h-4 w-4" />
                </Button>
                <Button
                  href={enquiryHref("luxury car rentals")}
                  variant="secondary"
                >
                  <MessageCircle aria-hidden className="h-4 w-4" />
                  Ask on WhatsApp
                </Button>
              </div>
              <p className="mt-5 text-xs text-dim">
                Availability and rates are confirmed for your specific dates.
              </p>
            </Reveal>
          </div>

          {/* Photograph */}
          <div className="relative order-1 lg:order-2 lg:col-span-5">
            <Image
              src="/images/signage-red-bmw-night.webp"
              alt="A red BMW parked beneath the illuminated Car Doctor India sign at night, with luxury marque badges displayed across the signage"
              width={765}
              height={1020}
              sizes="(min-width: 1024px) 38vw, 100vw"
              className="photo-lift h-64 w-full object-cover object-center sm:h-80 lg:h-full lg:min-h-[30rem]"
            />
            <div
              aria-hidden
              className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent lg:bg-gradient-to-r lg:from-surface lg:via-surface/20 lg:to-transparent"
            />
          </div>
        </div>
      </div>
    </Section>
  );
}
