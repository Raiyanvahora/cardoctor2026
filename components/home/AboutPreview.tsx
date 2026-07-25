import Image from "next/image";
import { ArrowRight, Check } from "lucide-react";
import { business } from "@/lib/business";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";

const points = [
  "Luxury and performance vehicles are the focus, not an afterthought",
  "Diagnosis is confirmed before any repair is quoted or carried out",
  "Servicing, bodywork, upgrades, rentals and insurance help in one place",
  "Open 24 hours, so drop-offs fit around your schedule",
];

export function AboutPreview() {
  return (
    <Section tone="soft" width="wide" aria-labelledby="about-heading">
      <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
        {/* Images */}
        <div className="lg:col-span-5">
          <Reveal from="left">
            <div className="relative">
              <div className="overflow-hidden rounded-3xl border border-line bg-surface">
                <Image
                  src="/images/reception-interior.jpg"
                  alt="The Car Doctor India reception, with a branded desk and alloy wheels, grilles and performance parts displayed on the wall behind"
                  width={1200}
                  height={1600}
                  sizes="(min-width: 1024px) 36vw, 92vw"
                  className="h-[24rem] w-full object-cover object-center sm:h-[30rem]"
                />
              </div>

              {/* Overlapping second frame, offset for depth. */}
              <div className="absolute -right-4 -bottom-10 hidden w-40 overflow-hidden rounded-2xl border border-line bg-surface shadow-2xl sm:block lg:-right-8 lg:w-48">
                <Image
                  src="/images/bay-brand-wall-night.jpg"
                  alt="The Car Doctor India service bay at night with cars parked inside and luxury marque badges on the wall"
                  width={1200}
                  height={1600}
                  sizes="12rem"
                  className="h-52 w-full object-cover object-center lg:h-60"
                />
              </div>
            </div>
          </Reveal>
        </div>

        {/* Copy */}
        <div className="lg:col-span-7">
          <Reveal>
            <Eyebrow>About Car Doctor India</Eyebrow>
            <h2
              id="about-heading"
              className="mt-6 text-3xl font-bold text-fg sm:text-4xl lg:text-5xl"
            >
              A Workshop Built Around Luxury Cars
            </h2>
            <div className="mt-6 space-y-5 text-base leading-relaxed text-muted">
              <p>
                Car Doctor India opened in {business.established} on Service Road
                NH8 in {business.address.city}, and has specialised in luxury and
                performance vehicles ever since. The name is the promise:{" "}
                <span className="text-fg">{business.tagline.toLowerCase()}</span>.
              </p>
              <p>
                An expensive car does not behave like an ordinary one, and it
                should not be treated like one. Faults are traced properly before
                parts are replaced, work is carried out to the specification of
                the car in front of us, and you are told what was actually found.
              </p>
              <p>{business.serviceArea}</p>
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {points.map((point) => (
                <li key={point} className="flex items-start gap-3 text-sm text-muted">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-soft">
                    <Check aria-hidden className="h-3 w-3 text-brand" />
                  </span>
                  {point}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="mt-9">
              <Button href="/about" variant="secondary">
                More About Us
                <ArrowRight aria-hidden className="h-4 w-4" />
              </Button>
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
