import { ArrowRight, Home, Wrench } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Section } from "@/components/ui/Section";

export default function NotFound() {
  return (
    <Section spacing="loose" className="pt-40">
      <div aria-hidden className="glow-brand absolute inset-x-0 top-0 h-80" />

      <div className="relative mx-auto max-w-2xl text-center">
        <Eyebrow>Error 404</Eyebrow>

        <h1 className="mt-6 font-display text-6xl font-extrabold text-fg sm:text-8xl">
          Page Not <span className="text-brand">Found</span>
        </h1>

        <p className="mx-auto mt-6 max-w-lg text-base leading-relaxed text-muted">
          This page does not exist, or it has moved. Head back to the homepage,
          or take a look at what we do.
        </p>

        <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
          <Button href="/" size="lg">
            <Home aria-hidden className="h-4 w-4" />
            Back to Home
          </Button>
          <Button href="/services" variant="secondary" size="lg">
            <Wrench aria-hidden className="h-4 w-4" />
            View Services
            <ArrowRight aria-hidden className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Section>
  );
}
