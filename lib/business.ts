/**
 * Single source of truth for every business fact used on the site.
 *
 * If a detail changes (a phone number, the hours, the address), change it here
 * and it updates everywhere — navigation, footer, contact page, WhatsApp
 * messages, JSON-LD structured data and SEO metadata.
 *
 * Nothing in this file may be invented. Every value below was supplied by the
 * business owner.
 */

export const business = {
  name: "Car Doctor India",
  legalName: "Car Doctor India",
  tagline: "We Repair Your Injured Dreams",
  positioning: "Luxury Car Repair Specialists",
  established: 2017,
  /** Google rating as supplied by the owner. Review count is unknown. */
  googleRating: "5.0",
  hours: "Open 24 Hours",

  address: {
    line1: "Near Amber Hotel",
    line2: "Service Road NH8",
    city: "Anand",
    state: "Gujarat",
    postalCode: "388001",
    country: "India",
    countryCode: "IN",
  },

  /** Coordinates taken from the business's own Google Maps listing. */
  geo: {
    latitude: 22.5825695,
    longitude: 72.9654912,
  },

  phones: {
    /** The only published line — also the WhatsApp number. */
    primary: "+91 72288 60075",
  },

  /** WhatsApp expects the number in international format with no symbols. */
  whatsappNumber: "917228860075",

  email: "cardoctorbharat@gmail.com",

  social: {
    instagram: "https://www.instagram.com/cardoctor_india/",
  },

  mapsUrl:
    "https://www.google.com/maps/dir//car+doctor+india,+amber+hotel,+Near,+Service+road+NH8,+Anand,+Gujarat+388001/@22.6111172,72.9196853,14z/data=!4m8!4m7!1m0!1m5!1m1!1s0x395e4dcee4b55047:0x178cac16aa81e131!2m2!1d72.9654912!2d22.5825695",

  serviceArea:
    "Based in Anand, Gujarat, serving luxury car owners across India.",

  /** Pickup and drop is offered, but never promised unconditionally. */
  pickupNote: "Pickup and drop availability depends on your location.",

  /**
   * Production URL — the canonical origin for the whole site.
   *
   * Must be the domain the public actually reaches, because every canonical
   * link, og:url, sitemap entry, robots Host and JSON-LD @id is derived from
   * it. It stayed on the netlify.app subdomain after the custom domain went
   * live, which told Google the canonical copy of every page lived on a
   * different host than the one being served.
   *
   * www, not the apex: the apex 301-redirects to www, so www is the address
   * that actually resolves to content.
   */
  siteUrl: "https://www.cardoctorindia.com",
} as const;

/** "Near Amber Hotel, Service Road NH8, Anand, Gujarat 388001" */
export const addressLine = [
  business.address.line1,
  business.address.line2,
  business.address.city,
  `${business.address.state} ${business.address.postalCode}`,
].join(", ");

/** Strips spaces and symbols so the number is dialable from a `tel:` link. */
export function telHref(phone: string): string {
  return `tel:${phone.replace(/[^\d+]/g, "")}`;
}

export const primaryTelHref = telHref(business.phones.primary);
export const mailHref = `mailto:${business.email}`;

/** Embeddable map centred on the workshop. Keyless, so it needs no API setup. */
export const mapEmbedSrc = `https://www.google.com/maps?q=${business.geo.latitude},${business.geo.longitude}&z=15&output=embed`;
