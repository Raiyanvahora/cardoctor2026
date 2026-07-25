import Image from "next/image";
import { ArrowRight, Clock, Star } from "lucide-react";
import { business } from "@/lib/business";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

const HERO_IMAGE = {
  src: "/images/workshop-exterior-night.jpg",
  alt: "The Car Doctor India workshop on Service Road NH8 in Anand, lit up at night with its illuminated sign above the service bays",
  width: 1200,
  height: 1600,
};

/**
 * Homepage hero — two genuinely different layouts.
 *
 * Mobile: the photograph goes full-bleed behind the copy. Every source image
 * is portrait and a phone screen is portrait, so it fills the frame with no
 * cropping at all. Previously the image sat below the copy, which meant the
 * first screen of a luxury car website had no car on it.
 *
 * Desktop (lg+): copy left, the same portrait photograph framed on the right,
 * where a full-bleed portrait crop would not work.
 */
export function Hero() {
  return (
    <section className="relative isolate overflow-hidden">
      {/* Mobile / tablet: full-bleed backdrop */}
      <div aria-hidden className="absolute inset-0 -z-10 overflow-hidden lg:hidden">
        <Image
          src={HERO_IMAGE.src}
          alt=""
          fill
          priority
          sizes="100vw"
          className="animate-kenburns object-cover object-center"
        />
        {/*
          Tuned so the workshop actually reads through the copy: heaviest at the
          top behind the headline, clearing through the middle where the lit
          signage is worth seeing, solid again at the bottom so the trust strip
          below meets it on a clean edge. The source is a night photograph, so
          the cleared band is still dark enough to carry white text.
        */}
        <div className="absolute inset-0 bg-gradient-to-b from-ink/92 via-ink/45 to-ink" />
      </div>

      {/* Desktop ambience */}
      <div
        aria-hidden
        className="glow-brand absolute -top-40 -left-40 -z-10 hidden h-[36rem] w-[36rem] lg:block"
      />
      <div
        aria-hidden
        className="texture-lines absolute inset-0 -z-10 hidden opacity-50 lg:block"
      />

      {/* Tall enough on phones that the photograph has room to be seen. */}
      <div className="mx-auto grid min-h-[88svh] max-w-7xl items-center gap-10 px-5 pt-28 pb-16 sm:px-6 sm:pt-32 lg:min-h-0 lg:grid-cols-12 lg:gap-14 lg:px-8 lg:pt-40 lg:pb-24">
        {/* Copy */}
        <div className="lg:col-span-6">
          <Reveal>
            <span className="flex items-center gap-3">
              <span aria-hidden className="h-px w-8 bg-brand" />
              <span className="text-[11px] font-semibold tracking-[0.2em] text-brand uppercase">
                {business.positioning}
              </span>
            </span>
          </Reveal>

          <Reveal delay={0.06} from="zoom">
            <h1 className="mt-5 text-[2.5rem] leading-[1.02] font-extrabold text-fg sm:text-6xl lg:text-[4rem]">
              Advanced Care for{" "}
              <span className="text-sheen text-brand">Exceptional</span> Cars
            </h1>
          </Reveal>

          <Reveal delay={0.12}>
            <p className="mt-5 max-w-xl text-[0.95rem] leading-relaxed text-muted sm:text-lg">
              {business.tagline}. Since {business.established}, a workshop in{" "}
              {business.address.city} built around luxury and performance
              vehicles — servicing, diagnostics, bodywork, upgrades and rentals.
            </p>
          </Reveal>

          <Reveal delay={0.18}>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button href="/book-appointment" size="lg">
                Book Appointment
                <ArrowRight aria-hidden className="h-4 w-4" />
              </Button>
              <Button href="/services" variant="secondary" size="lg">
                Explore Services
              </Button>
            </div>
          </Reveal>

          {/* Facts supplied by the business — nothing inferred. */}
          <Reveal delay={0.24}>
            <dl className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-4 border-t border-line pt-6 text-sm">
              <div className="flex items-center gap-2.5">
                <Star aria-hidden className="h-4 w-4 fill-brand text-brand" />
                <dt className="sr-only">Google rating</dt>
                <dd className="font-display font-bold text-fg">
                  {business.googleRating}
                  <span className="ml-1.5 font-sans text-xs font-normal text-dim">
                    Google
                  </span>
                </dd>
              </div>

              <span aria-hidden className="h-4 w-px bg-line" />

              <div className="flex items-center gap-2.5">
                <dt className="text-xs text-dim">Since</dt>
                <dd className="font-display font-bold text-fg">
                  {business.established}
                </dd>
              </div>

              <span aria-hidden className="h-4 w-px bg-line" />

              <div className="flex items-center gap-2.5">
                <Clock aria-hidden className="h-4 w-4 text-brand" />
                <dt className="sr-only">Opening hours</dt>
                <dd className="font-display font-bold text-fg">
                  Open 24 Hours
                </dd>
              </div>
            </dl>
          </Reveal>
        </div>

        {/* Desktop photograph */}
        <div className="hidden lg:col-span-6 lg:block">
          <Reveal from="right" delay={0.1}>
            <div className="relative">
              <div aria-hidden className="glow-brand absolute -inset-8 -z-10 blur-2xl" />
              <div className="relative overflow-hidden rounded-3xl border border-line bg-surface">
                <Image
                  src={HERO_IMAGE.src}
                  alt={HERO_IMAGE.alt}
                  width={HERO_IMAGE.width}
                  height={HERO_IMAGE.height}
                  priority
                  sizes="42vw"
                  className="animate-kenburns h-[34rem] w-full object-cover object-center xl:h-[38rem]"
                />
                <div
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-t from-ink via-ink/10 to-transparent"
                />
                <div className="absolute inset-x-0 bottom-0 p-7">
                  <p className="font-display text-xs font-bold tracking-[0.16em] text-brand uppercase">
                    The Workshop
                  </p>
                  <p className="mt-2 text-sm text-muted">
                    Near Amber Hotel, Service Road NH8, {business.address.city}
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
