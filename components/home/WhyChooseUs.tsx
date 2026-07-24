import { business } from "@/lib/business";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";

interface Reason {
  title: string;
  body: string;
}

/**
 * Each reason restates something the business actually offers. No awards,
 * certifications, technician counts or turnaround promises are claimed.
 */
const reasons: Reason[] = [
  {
    title: "Luxury is the speciality",
    body: `Since ${business.established} the workshop has focused on luxury and performance vehicles — the marques on the wall are the cars that come through the doors.`,
  },
  {
    title: "Diagnose before replacing",
    body: "Fault codes are read, circuits and components are tested, and the cause is confirmed with you before any repair is authorised.",
  },
  {
    title: "Open 24 hours",
    body: "The workshop keeps 24-hour availability, so a drop-off does not have to be squeezed into a working day.",
  },
  {
    title: "Pickup and drop",
    body: `Your car can be collected and returned instead of you making two trips. ${business.pickupNote}`,
  },
];

/**
 * Presented as a divided band rather than four bordered cards — the page
 * already carries a service index and a process timeline, and a third grid of
 * identical boxes is what made the layout read as a template.
 */
export function WhyChooseUs() {
  return (
    <Section tone="soft" width="wide" aria-labelledby="why-heading">
      <Reveal>
        <div className="flex flex-col gap-5 border-b border-line pb-8 lg:flex-row lg:items-end lg:justify-between">
          <h2
            id="why-heading"
            className="max-w-lg text-[1.75rem] leading-[1.08] font-bold text-fg sm:text-4xl"
          >
            The Difference Is in the Detail
          </h2>
          <p className="max-w-sm text-sm leading-relaxed text-muted">
            No shortcuts, no guesswork, and no surprises when you collect the
            car.
          </p>
        </div>
      </Reveal>

      <ol className="grid gap-0 lg:grid-cols-4">
        {reasons.map((reason, index) => (
          <Reveal
            as="li"
            key={reason.title}
            delay={index * 0.07}
            className="border-b border-line py-7 lg:border-b-0 lg:border-r lg:px-7 lg:py-9 lg:first:pl-0 lg:last:border-r-0 lg:last:pr-0"
          >
            <span className="font-display block text-3xl leading-none font-extrabold text-line-strong">
              {String(index + 1).padStart(2, "0")}
            </span>
            <h3 className="font-display mt-4 text-base leading-tight font-bold text-fg uppercase">
              {reason.title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              {reason.body}
            </p>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}
