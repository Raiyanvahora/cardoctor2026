import Image from "next/image";
import { ArrowRight, Clock, MapPin, Star } from "lucide-react";
import { business } from "@/lib/business";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Homepage hero.
 *
 * Split layout: copy on the left, a full-height portrait photograph on the
 * right. All of the workshop photography is portrait, so this keeps the real
 * images at their true aspect ratio instead of cropping them to a wide strip.
 */
export function Hero() {
  return (
    <section className="relative isolate overflow-hidden pt-28 pb-16 sm:pt-36 sm:pb-20 lg:pt-44 lg:pb-28">
      <div aria-hidden className="glow-brand absolute -top-40 -left-40 -z-10 h-[36rem] w-[36rem]" />
      <div aria-hidden className="texture-lines absolute inset-0 -z-10 opacity-50" />

      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 sm:px-6 lg:grid-cols-12 lg:gap-16 lg:px-8">
        {/* Copy */}
        <div className="lg:col-span-6 xl:col-span-6">
          <Reveal>
            <Eyebrow>{business.positioning}</Eyebrow>
          </Reveal>

          <Reveal delay={0.08}>
            <h1 className="mt-6 text-[2.6rem] leading-[1.03] font-extrabold text-fg sm:text-6xl lg:text-[4.2rem]">
              Advanced Care for{" "}
              <span className="relative inline-block">
                <span className="relative z-10 text-brand">Exceptional</span>
                <span
                  aria-hidden
                  className="absolute inset-x-0 bottom-1 z-0 h-3 bg-brand/15"
                />
              </span>{" "}
              Cars
            </h1>
          </Reveal>

          <Reveal delay={0.16}>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
              {business.tagline}. Since {business.established}, Car Doctor India
              has looked after luxury and performance vehicles from its workshop
              in {business.address.city}, {business.address.state} — from
              scheduled servicing and advanced diagnostics to bodywork,
              modifications and rentals.
            </p>
          </Reveal>

          <Reveal delay={0.24}>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button href="/book-appointment" size="lg">
                Book Appointment
                <ArrowRight aria-hidden className="h-4 w-4" />
              </Button>
              <Button href="/services" variant="secondary" size="lg">
                Explore Services
              </Button>
            </div>
          </Reveal>

          {/* Facts only — supplied by the business, nothing inferred. */}
          <Reveal delay={0.32}>
            <dl className="mt-12 grid max-w-lg grid-cols-3 gap-px overflow-hidden rounded-2xl border border-line bg-line">
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
                  <MapPin aria-hidden className="h-3.5 w-3.5 text-brand" />
                  Since
                </dt>
                <dd className="mt-2 font-display text-xl font-bold text-fg">
                  {business.established}
                </dd>
              </div>
              <div className="bg-surface px-4 py-5">
                <dt className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-dim">
                  <Clock aria-hidden className="h-3.5 w-3.5 text-brand" />
                  Hours
                </dt>
                <dd className="mt-2 font-display text-xl font-bold text-fg">
                  24<span className="text-brand">/</span>7
                </dd>
              </div>
            </dl>
          </Reveal>
        </div>

        {/* Photograph */}
        <div className="lg:col-span-6 xl:col-span-6">
          <Reveal from="right" delay={0.12}>
            <div className="relative">
              <div
                aria-hidden
                className="glow-brand absolute -inset-8 -z-10 blur-2xl"
              />
              <div className="relative overflow-hidden rounded-3xl border border-line bg-surface">
                <Image
                  src="/images/workshop-exterior-night.jpg"
                  alt="The Car Doctor India workshop on Service Road NH8 in Anand, lit up at night with its illuminated sign above the service bays"
                  width={1200}
                  height={1600}
                  priority
                  sizes="(min-width: 1024px) 42vw, 92vw"
                  className="h-[26rem] w-full object-cover object-center sm:h-[32rem] lg:h-[38rem]"
                />
                <div
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-t from-ink via-ink/10 to-transparent"
                />

                <div className="absolute inset-x-0 bottom-0 p-6 sm:p-7">
                  <p className="font-display text-xs font-bold uppercase tracking-[0.16em] text-brand">
                    The Workshop
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    Near Amber Hotel, Service Road NH8, {business.address.city}.
                    Open 24 hours.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
