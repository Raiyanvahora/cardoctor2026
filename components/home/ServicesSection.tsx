import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { services } from "@/lib/services";
import { business } from "@/lib/business";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { ServiceRow, ServiceTile } from "@/components/shared/ServiceRow";

interface ServicesSectionProps {
  /**
   * "home" — sticky photo panel beside the list, compact tiles on phones.
   * "page" — full-width two-column list, no photo panel.
   */
  variant?: "home" | "page";
}

export function ServicesSection({ variant = "home" }: ServicesSectionProps) {
  if (variant === "page") {
    return (
      <Section width="wide" aria-labelledby="services-heading">
        <Reveal>
          <h2 id="services-heading" className="sr-only">
            All services
          </h2>
        </Reveal>
        <ul className="grid gap-x-12 lg:grid-cols-2">
          {services.map((service, index) => (
            <ServiceRow key={service.slug} service={service} index={index} />
          ))}
        </ul>
      </Section>
    );
  }

  return (
    <Section width="wide" aria-labelledby="services-heading">
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
        {/* Left: heading + photograph */}
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <Reveal>
              <span className="flex items-center gap-3">
                <span aria-hidden className="h-px w-8 bg-brand" />
                <span className="text-[11px] font-semibold tracking-[0.2em] text-brand uppercase">
                  What We Do
                </span>
              </span>

              <h2
                id="services-heading"
                className="mt-5 text-[1.75rem] leading-[1.08] font-bold text-fg sm:text-4xl lg:text-[2.75rem]"
              >
                Everything Your Car Needs, Under One Roof
              </h2>

              <p className="mt-4 max-w-md text-[0.95rem] leading-relaxed text-muted">
                From a routine oil change to a full body repair, a diagnostic
                puzzle or a set of upgrades — handled in-house at the{" "}
                {business.address.city} workshop.
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              {/* Desktop only: the list carries the section on small screens. */}
              <div className="mt-8 hidden overflow-hidden rounded-2xl border border-line bg-surface lg:block">
                <Image
                  src="/images/bay-red-ambient-night.jpg"
                  alt="A dark blue BMW and a white Mercedes-Benz inside the Car Doctor India service bay at night, lit by red ambient lighting"
                  width={1288}
                  height={1599}
                  sizes="34vw"
                  className="photo-lift h-64 w-full object-cover object-center xl:h-80"
                />
              </div>

              <div className="mt-7">
                <Button href="/services" variant="secondary">
                  All Services
                  <ArrowRight aria-hidden className="h-4 w-4" />
                </Button>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Right: the index */}
        <div className="lg:col-span-7">
          {/* Phones: two-up tiles keep ten services to about five rows. */}
          <Reveal>
            <ul className="grid grid-cols-2 gap-3 sm:hidden">
              {services.map((service) => (
                <ServiceTile key={service.slug} service={service} />
              ))}
            </ul>
          </Reveal>

          {/* Tablet and up: full rows with summaries. */}
          <ul className="hidden border-t border-line sm:block">
            {services.map((service, index) => (
              <ServiceRow key={service.slug} service={service} index={index} />
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
