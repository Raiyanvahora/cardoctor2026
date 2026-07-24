import type { Metadata } from "next";
import { business } from "@/lib/business";
import { pageMetadata } from "@/lib/seo";

import { AboutPreview } from "@/components/home/AboutPreview";
import { ContactMap } from "@/components/home/ContactMap";
import { GalleryPreview } from "@/components/home/GalleryPreview";
import { Hero } from "@/components/home/Hero";
import { ProcessSteps } from "@/components/home/ProcessSteps";
import { RentalsTeaser } from "@/components/home/RentalsTeaser";
import { Reviews } from "@/components/home/Reviews";
import { ServicesGrid } from "@/components/home/ServicesGrid";
import { TrustBar } from "@/components/home/TrustBar";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";

export const metadata: Metadata = pageMetadata({
  title: `${business.positioning} in ${business.address.city}`,
  description: `${business.name} — ${business.tagline}. Luxury car repair, advanced diagnostics, AC repair, denting and painting, upgrades, rentals and insurance assistance in ${business.address.city}, ${business.address.state}. Established ${business.established}. ${business.hours}.`,
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustBar />
      <ServicesGrid />
      <AboutPreview />
      <WhyChooseUs />
      <ProcessSteps />
      <RentalsTeaser />
      <GalleryPreview />
      <Reviews />
      <ContactMap />
    </>
  );
}
