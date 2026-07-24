import { CheckCircle2, KeyRound, MessageCircle, Stethoscope } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { business } from "@/lib/business";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

interface Step {
  icon: LucideIcon;
  title: string;
  body: string;
}

const steps: Step[] = [
  {
    icon: MessageCircle,
    title: "Enquire",
    body: "Send us the car, the symptom and your location on WhatsApp, or book an appointment through the form. We come back to you to confirm.",
  },
  {
    icon: Stethoscope,
    title: "Inspect & Diagnose",
    body: "The car is inspected and scanned, the fault is traced to its actual cause, and we explain what we found before any work starts.",
  },
  {
    icon: CheckCircle2,
    title: "Repair & Check",
    body: "The approved work is carried out and then checked over — including a road test where the repair calls for one.",
  },
  {
    icon: KeyRound,
    title: "Handover",
    body: `You collect the car, or we return it to you. ${business.pickupNote}`,
  },
];

export function ProcessSteps() {
  return (
    <Section tone="soft" width="wide" aria-labelledby="process-heading">
      <SectionHeading
        id="process-heading"
        eyebrow="How It Works"
        title="From First Message to Keys Back in Your Hand"
        description="Four steps, and you know where the car stands at every one of them."
        align="center"
        className="mb-12 lg:mb-16"
      />

      <ol className="relative grid gap-5 lg:grid-cols-4">
        {/* Connector line, desktop only. */}
        <span
          aria-hidden
          className="absolute top-[3.25rem] right-0 left-0 hidden h-px bg-gradient-to-r from-transparent via-line-strong to-transparent lg:block"
        />

        {steps.map((step, index) => {
          const Icon = step.icon;
          return (
            <Reveal as="li" key={step.title} delay={index * 0.1} className="relative">
              <div className="flex h-full flex-col rounded-2xl border border-line bg-surface p-6 sm:p-7">
                <div className="flex items-center gap-4">
                  <span className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-line bg-ink">
                    <Icon aria-hidden className="h-5.5 w-5.5 text-brand" />
                  </span>
                  <span className="font-display text-3xl font-extrabold text-line-strong">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="mt-6 text-lg font-bold text-fg">{step.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {step.body}
                </p>
              </div>
            </Reveal>
          );
        })}
      </ol>
    </Section>
  );
}
