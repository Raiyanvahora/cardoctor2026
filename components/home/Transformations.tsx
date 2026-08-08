import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { BeforeAfterBoards } from "@/components/shared/BeforeAfterBoards";

/**
 * Before/after proof of the upgrade work, on the homepage.
 *
 * Sits directly after the car showcase: the showcase says which cars come
 * through, this says what leaves looking different.
 */
export function Transformations() {
  return (
    <Section
      tone="soft"
      width="wide"
      // Hairline against the soft section that follows, which would otherwise
      // run straight into this one with no visible boundary.
      className="border-b border-line"
      aria-labelledby="transformations-heading"
    >
      <SectionHeading
        id="transformations-heading"
        eyebrow="Before & After"
        eyebrowStyle="inline"
        title="One Cayenne, Both Ends, Rebuilt"
        description="The same Porsche Cayenne, photographed from the same spot in our bay before and after the work — a full colour change, new bumpers front and rear, and a full-width LED light bar. Tap either board to view it larger."
        action={
          <Button href="/services/upgrades-modifications" variant="secondary">
            Upgrades &amp; Modifications
            <ArrowRight aria-hidden className="h-4 w-4" />
          </Button>
        }
        className="mb-9 lg:mb-12"
      />

      <BeforeAfterBoards />
    </Section>
  );
}
