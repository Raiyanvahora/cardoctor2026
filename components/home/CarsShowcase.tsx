import { ArrowRight } from "lucide-react";
import { carShowcase } from "@/lib/gallery";
import { marques } from "@/lib/rentals";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GalleryGrid } from "@/components/shared/GalleryGrid";

/**
 * A lineup of the luxury cars actually photographed at the workshop.
 *
 * Every image is real and each opens the shared lightbox. The marque strip is
 * plain text — the manufacturers' logos are deliberately not reproduced, to
 * avoid implying an authorised-dealer relationship (see the About page note).
 */
export function CarsShowcase() {
  return (
    <Section width="wide" aria-labelledby="cars-heading">
      <SectionHeading
        id="cars-heading"
        eyebrow="The Cars We Care For"
        eyebrowStyle="inline"
        title="Built for Exceptional Machines"
        description="A look at some of the luxury and performance cars that have passed through the Anand workshop. Tap any car to view it larger."
        action={
          <Button href="/gallery" variant="secondary">
            View Gallery
            <ArrowRight aria-hidden className="h-4 w-4" />
          </Button>
        }
        className="mb-9 lg:mb-12"
      />

      <GalleryGrid images={carShowcase} featureCols={4} />

      <Reveal delay={0.1}>
        <ul className="mt-8 flex flex-wrap justify-center gap-2">
          {marques.map((marque) => (
            <li
              key={marque.name}
              className="rounded-full border border-line bg-surface px-4 py-2 text-[11px] font-semibold tracking-[0.12em] text-muted uppercase"
            >
              {marque.name}
            </li>
          ))}
        </ul>
      </Reveal>
    </Section>
  );
}
