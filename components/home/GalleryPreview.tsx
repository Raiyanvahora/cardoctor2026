import { ArrowRight } from "lucide-react";
import { previewImages } from "@/lib/gallery";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GalleryGrid } from "@/components/shared/GalleryGrid";

export function GalleryPreview() {
  return (
    <Section tone="soft" width="wide" aria-labelledby="gallery-heading">
      <SectionHeading
        id="gallery-heading"
        eyebrow="The Gallery"
        title="Inside the Workshop"
        description="Real photographs of the Car Doctor India workshop in Anand and the cars that pass through it."
        action={
          <Button href="/gallery" variant="secondary">
            View Gallery
            <ArrowRight aria-hidden className="h-4 w-4" />
          </Button>
        }
        className="mb-12 lg:mb-16"
      />

      <GalleryGrid images={previewImages} />
    </Section>
  );
}
