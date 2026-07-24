import { ArrowRight } from "lucide-react";
import { services } from "@/lib/services";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ServiceCard } from "@/components/shared/ServiceCard";

interface ServicesGridProps {
  /** Homepage uses "h2"; the services page supplies its own h1 above. */
  showHeading?: boolean;
}

export function ServicesGrid({ showHeading = true }: ServicesGridProps) {
  return (
    <Section width="wide" aria-labelledby="services-heading">
      {showHeading ? (
        <SectionHeading
          id="services-heading"
          eyebrow="What We Do"
          title="Everything Your Car Needs, Under One Roof"
          description="From a routine oil change to a full body repair, a diagnostic puzzle or a set of upgrades — the work is handled in-house at the Anand workshop."
          action={
            <Button href="/services" variant="secondary">
              All Services
              <ArrowRight aria-hidden className="h-4 w-4" />
            </Button>
          }
          className="mb-12 lg:mb-16"
        />
      ) : null}

      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {services.map((service, index) => (
          <ServiceCard key={service.slug} service={service} index={index} />
        ))}
      </ul>
    </Section>
  );
}
