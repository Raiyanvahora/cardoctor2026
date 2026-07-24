import type { Metadata } from "next";
import { Camera } from "lucide-react";

import { business } from "@/lib/business";
import { featureImages, tileImages } from "@/lib/gallery";
import { breadcrumbSchema, pageMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/ui/JsonLd";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GalleryGrid } from "@/components/shared/GalleryGrid";
import { CtaBand } from "@/components/shared/CtaBand";

export const metadata: Metadata = pageMetadata({
  title: "Gallery",
  description: `Photographs of the ${business.name} workshop in ${business.address.city}, ${business.address.state}, and the luxury cars that pass through it.`,
  path: "/gallery",
});

export default function GalleryPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Gallery", path: "/gallery" }])} />

      <PageHero
        eyebrow="Gallery"
        title="Inside Car Doctor India"
        description="Every photograph on this page was taken at the workshop on Service Road NH8. Nothing here is stock imagery."
        crumbs={[{ name: "Gallery", path: "/gallery" }]}
        image={{ src: "/images/bay-red-ambient-night.jpg", alt: "" }}
      />

      <Section width="wide">
        <SectionHeading
          eyebrow="The Workshop"
          title="The Premises & the Cars"
          description="Tap any photograph to view it full size. Use the arrow keys to move between images."
          className="mb-12"
        />

        <GalleryGrid images={featureImages} />
      </Section>

      <Section tone="soft" width="wide">
        <SectionHeading
          eyebrow="More From the Workshop"
          title="Cars, Parts & Work in Progress"
          description="Further photographs from the workshop's own listing — shown small, at the size they were taken."
          className="mb-10"
        />

        <Reveal>
          <div className="mb-8 flex items-start gap-3 rounded-2xl border border-line bg-surface p-5">
            <Camera aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
            <p className="text-sm leading-relaxed text-muted">
              These images come from the business&apos;s Google listing and are
              lower resolution than the photographs above, so they are shown as
              small tiles. Higher-resolution versions will replace them as they
              become available.
            </p>
          </div>
        </Reveal>

        <GalleryGrid images={tileImages} layout="tile" />
      </Section>

      <CtaBand
        eyebrow="Your Car Next"
        title="Bring It to the Workshop"
        description={`Book an appointment or send us a message and we will take it from there. ${business.hours}.`}
      />
    </>
  );
}
