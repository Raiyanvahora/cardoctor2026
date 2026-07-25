import Image from "next/image";
import { business } from "@/lib/business";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";

interface Step {
  title: string;
  body: string;
}

const steps: Step[] = [
  {
    title: "Enquire",
    body: "Send us the car, the symptom and your location on WhatsApp, or book an appointment through the form. We come back to you to confirm.",
  },
  {
    title: "Inspect & diagnose",
    body: "The car is inspected and scanned, the fault is traced to its actual cause, and we explain what we found before any work starts.",
  },
  {
    title: "Repair & check",
    body: "The approved work is carried out and then checked over — including a road test where the repair calls for one.",
  },
  {
    title: "Handover",
    body: `You collect the car, or we return it to you. ${business.pickupNote}`,
  },
];

/**
 * A vertical timeline paired with a real photograph, rather than a fourth
 * row of numbered cards.
 */
export function ProcessSteps() {
  return (
    <Section width="wide" aria-labelledby="process-heading">
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
        {/* Photograph — portrait source, so it suits a tall column. */}
        <div className="lg:col-span-5">
          <Reveal from="left">
            <div className="relative overflow-hidden rounded-2xl border border-line bg-surface">
              <Image
                src="/images/bmw-1series-exterior.jpg"
                alt="A blue BMW 1 Series with black alloy wheels parked outside the Car Doctor India workshop"
                width={1200}
                height={1600}
                sizes="(min-width: 1024px) 34vw, 92vw"
                className="photo-lift h-56 w-full object-cover object-center sm:h-72 lg:h-[30rem]"
              />
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent"
              />
              <p className="absolute inset-x-0 bottom-0 p-6 text-sm text-muted">
                Every car treated as its own job
              </p>
            </div>
          </Reveal>
        </div>

        {/* Timeline */}
        <div className="lg:col-span-7">
          <Reveal>
            <span className="flex items-center gap-3">
              <span aria-hidden className="h-px w-8 bg-brand" />
              <span className="text-[11px] font-semibold tracking-[0.2em] text-brand uppercase">
                How It Works
              </span>
            </span>
            <h2
              id="process-heading"
              className="mt-5 text-[1.75rem] leading-[1.08] font-bold text-fg sm:text-4xl"
            >
              From First Message to Keys Back in Your Hand
            </h2>
          </Reveal>

          <ol className="relative mt-9 pl-11">
            {/* Spine */}
            <span
              aria-hidden
              className="absolute top-2 bottom-2 left-[0.9375rem] w-px bg-line"
            />

            {steps.map((step, index) => (
              <Reveal
                as="li"
                key={step.title}
                delay={index * 0.08}
                className="relative pb-8 last:pb-0"
              >
                <span
                  aria-hidden
                  className="font-display absolute top-0 -left-11 flex h-8 w-8 items-center justify-center rounded-full border border-line bg-ink text-[11px] font-bold text-brand"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="font-display text-base leading-tight font-bold text-fg uppercase">
                  {step.title}
                </h3>
                <p className="mt-2.5 max-w-lg text-sm leading-relaxed text-muted">
                  {step.body}
                </p>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </Section>
  );
}
