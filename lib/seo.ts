/**
 * SEO helpers: page metadata and JSON-LD structured data.
 */

import type { Metadata } from "next";
import { addressLine, business } from "./business";
import { services } from "./services";

interface PageMetadataInput {
  title: string;
  description: string;
  /** Path with a leading slash, e.g. "/services". Omit for the homepage. */
  path?: string;
}

/**
 * The generated social card from `app/opengraph-image.tsx`.
 *
 * Declaring an `openGraph` block on a page replaces the one inherited from the
 * root layout, which drops the file-convention image with it — so the card is
 * attached explicitly here instead. `metadataBase` resolves the relative path.
 */
const socialImage = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: `${business.name} — ${business.positioning}`,
};

/**
 * Builds consistent metadata for a page: canonical URL, Open Graph and Twitter
 * cards all derived from one title/description pair.
 */
export function pageMetadata({
  title,
  description,
  path = "/",
}: PageMetadataInput): Metadata {
  const url = new URL(path, business.siteUrl).toString();

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: `${title} | ${business.name}`,
      description,
      url,
      siteName: business.name,
      locale: "en_IN",
      type: "website",
      images: [socialImage],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${business.name}`,
      description,
      images: [socialImage.url],
    },
  };
}

const postalAddress = {
  "@type": "PostalAddress",
  streetAddress: `${business.address.line1}, ${business.address.line2}`,
  addressLocality: business.address.city,
  addressRegion: business.address.state,
  postalCode: business.address.postalCode,
  addressCountry: business.address.countryCode,
} as const;

/**
 * AutoRepair structured data for the business.
 *
 * NOTE: `aggregateRating` is deliberately omitted. The 5.0 Google rating was
 * supplied without a review count, and Schema.org requires a rating to be
 * accompanied by `ratingCount` or `reviewCount`. Publishing a rating without
 * one would be both invalid structured data and an unverifiable statistic, so
 * the rating appears only as on-page text linked to the real Google listing.
 */
export function autoRepairSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "AutoRepair",
    "@id": `${business.siteUrl}/#business`,
    name: business.name,
    legalName: business.legalName,
    slogan: business.tagline,
    description: `${business.positioning} in ${business.address.city}, ${business.address.state}. ${business.serviceArea}`,
    url: business.siteUrl,
    image: [
      `${business.siteUrl}/images/workshop-exterior-night.jpg`,
      `${business.siteUrl}/images/bay-red-ambient-night.jpg`,
      `${business.siteUrl}/images/reception-interior.jpg`,
    ],
    logo: `${business.siteUrl}/images/logo-mark.png`,
    telephone: business.phones.primary,
    email: business.email,
    address: postalAddress,
    geo: {
      "@type": "GeoCoordinates",
      latitude: business.geo.latitude,
      longitude: business.geo.longitude,
    },
    hasMap: business.mapsUrl,
    foundingDate: String(business.established),
    currenciesAccepted: "INR",
    areaServed: [
      { "@type": "City", name: business.address.city },
      { "@type": "State", name: business.address.state },
      { "@type": "Country", name: business.address.country },
    ],
    sameAs: [business.social.instagram],
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: business.phones.primary,
        contactType: "customer service",
        areaServed: business.address.countryCode,
        availableLanguage: ["en", "hi", "gu"],
      },
    ],
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: "00:00",
        closes: "23:59",
      },
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `${business.name} Services`,
      itemListElement: services.map((service) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: service.title,
          description: service.summary,
          url: `${business.siteUrl}/services/${service.slug}`,
        },
      })),
    },
  };
}

/** Service structured data for an individual service detail page. */
export function serviceSchema(slug: string) {
  const service = services.find((entry) => entry.slug === slug);
  if (!service) return null;

  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.summary,
    url: `${business.siteUrl}/services/${service.slug}`,
    serviceType: service.shortTitle,
    provider: {
      "@type": "AutoRepair",
      "@id": `${business.siteUrl}/#business`,
      name: business.name,
      address: postalAddress,
      telephone: business.phones.primary,
    },
    areaServed: {
      "@type": "Country",
      name: business.address.country,
    },
  };
}

export interface Crumb {
  name: string;
  path: string;
}

/** BreadcrumbList structured data. Pass the trail excluding "Home". */
export function breadcrumbSchema(crumbs: Crumb[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [{ name: "Home", path: "/" }, ...crumbs].map(
      (crumb, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: crumb.name,
        item: new URL(crumb.path, business.siteUrl).toString(),
      }),
    ),
  };
}

/** Human-readable address string, reused in metadata descriptions. */
export const seoAddress = addressLine;
