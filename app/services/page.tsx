import type { Metadata } from "next";
import { business } from "@/lib/business";
import { breadcrumbSchema, pageMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/ui/JsonLd";
import { PageHero } from "@/components/ui/PageHero";
import { ServicesGrid } from "@/components/home/ServicesGrid";
import { ProcessSteps } from "@/components/home/ProcessSteps";
import { CtaBand } from "@/components/shared/CtaBand";

export const metadata: Metadata = pageMetadata({
  title: "Our Services",
  description: `Luxury car services at ${business.name}, ${business.address.city}: regular maintenance, advanced diagnostics, engine and mechanical repair, car AC repair, denting and painting, upgrades, accessories, rentals, insurance assistance and pickup and drop.`,
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Services", path: "/services" }])} />

      <PageHero
        eyebrow="What We Do"
        title="Our Services"
        description="Ten services covering everything a luxury car needs — from a scheduled oil change to bodywork, upgrades and the paperwork on an insurance claim."
        crumbs={[{ name: "Services", path: "/services" }]}
        image={{ src: "/images/bay-brand-wall-night.jpg", alt: "" }}
      />

      <ServicesGrid showHeading={false} />

      <ProcessSteps />

      <CtaBand
        eyebrow="Not Sure Which You Need"
        title="Describe the Problem, We'll Take It From There"
        description={`Send us the car and what it is doing on WhatsApp and we will tell you what is likely involved. ${business.hours}.`}
      />
    </>
  );
}
