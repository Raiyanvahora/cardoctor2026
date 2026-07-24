import { Clock, Gem, ScanSearch, Truck } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { business } from "@/lib/business";
import { Card } from "@/components/ui/Card";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

interface Reason {
  icon: LucideIcon;
  title: string;
  body: string;
}

/**
 * Each reason restates something the business actually offers. No awards,
 * certifications, technician counts or turnaround promises are claimed.
 */
const reasons: Reason[] = [
  {
    icon: Gem,
    title: "Luxury Is the Speciality",
    body: `Since ${business.established} the workshop has focused on luxury and performance vehicles — the marques on the wall are the cars that come through the doors.`,
  },
  {
    icon: ScanSearch,
    title: "Diagnose Before Replacing",
    body: "Fault codes are read, circuits and components are tested, and the cause is confirmed with you before any repair is authorised.",
  },
  {
    icon: Clock,
    title: "Open 24 Hours",
    body: "The workshop keeps 24-hour availability, so a drop-off does not have to be squeezed into a working day.",
  },
  {
    icon: Truck,
    title: "Pickup & Drop",
    body: `Your car can be collected and returned instead of you making two trips. ${business.pickupNote}`,
  },
];

export function WhyChooseUs() {
  return (
    <Section width="wide" aria-labelledby="why-heading">
      <SectionHeading
        id="why-heading"
        eyebrow="Why Car Doctor India"
        title="The Difference Is in the Detail"
        description="No shortcuts, no guesswork, and no surprises when you collect the car."
        align="center"
        className="mb-12 lg:mb-16"
      />

      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {reasons.map((reason, index) => {
          const Icon = reason.icon;
          return (
            <Reveal as="li" key={reason.title} delay={index * 0.08} className="h-full">
              <Card className="h-full" padding="md">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-line bg-ink">
                  <Icon aria-hidden className="h-5.5 w-5.5 text-brand" />
                </span>
                <h3 className="mt-6 text-lg font-bold text-fg">{reason.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {reason.body}
                </p>
              </Card>
            </Reveal>
          );
        })}
      </ul>
    </Section>
  );
}
