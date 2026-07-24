import { ArrowRight, MessageCircle, Phone } from "lucide-react";
import { business, primaryTelHref } from "@/lib/business";
import { enquiryHref } from "@/lib/whatsapp";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";

interface CtaBandProps {
  eyebrow?: string;
  title?: string;
  description?: string;
  /** Topic pre-filled into the WhatsApp message, e.g. "car AC repair". */
  whatsappTopic?: string;
}

/** Closing call to action, reused at the bottom of most pages. */
export function CtaBand({
  eyebrow = "Ready When You Are",
  title = "Let's Get Your Car Looked At",
  description = `Send us the car and the symptom on WhatsApp, or book an appointment and we will confirm it with you. ${business.hours}.`,
  whatsappTopic,
}: CtaBandProps) {
  return (
    <Section width="wide" spacing="tight">
      <Reveal>
        <div className="relative overflow-hidden rounded-3xl border border-line bg-surface px-7 py-12 text-center sm:px-12 sm:py-16">
          <div aria-hidden className="glow-brand absolute inset-x-0 -top-24 h-72" />
          <div aria-hidden className="texture-lines absolute inset-0 opacity-60" />

          <div className="relative mx-auto max-w-2xl">
            <Eyebrow>{eyebrow}</Eyebrow>
            <h2 className="mt-6 text-3xl font-bold text-fg sm:text-4xl lg:text-5xl">
              {title}
            </h2>
            <p className="mt-5 text-base leading-relaxed text-muted">
              {description}
            </p>

            <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
              <Button href="/book-appointment" size="lg">
                Book Appointment
                <ArrowRight aria-hidden className="h-4 w-4" />
              </Button>
              <Button
                href={enquiryHref(whatsappTopic)}
                variant="whatsapp"
                size="lg"
              >
                <MessageCircle aria-hidden className="h-4 w-4" />
                WhatsApp
              </Button>
              <Button href={primaryTelHref} variant="secondary" size="lg">
                <Phone aria-hidden className="h-4 w-4" />
                Call
              </Button>
            </div>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
