/**
 * WhatsApp deep-link helpers.
 *
 * The site has no backend — every enquiry and booking is delivered by opening
 * WhatsApp with a pre-filled message addressed to the workshop.
 */

import { business } from "./business";

export const WHATSAPP_NUMBER = business.whatsappNumber;

/** Builds a `wa.me` link with the message correctly percent-encoded. */
export function buildWhatsAppUrl(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export interface BookingMessageValues {
  fullName: string;
  phone: string;
  carBrand: string;
  carModel: string;
  vehicleYear: string;
  service: string;
  location: string;
  preferredDate: string;
  preferredTime: string;
  pickupDrop: "yes" | "no";
  problem: string;
}

/** Formats a date input value (yyyy-mm-dd) as a readable dd Mon yyyy. */
function formatDate(value: string): string {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (!match) return value;
  const [, year, month, day] = match;
  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
  ];
  const monthLabel = months[Number(month) - 1] ?? month;
  return `${day} ${monthLabel} ${year}`;
}

/** Formats a time input value (HH:mm, 24h) as a readable 12-hour time. */
function formatTime(value: string): string {
  const match = /^(\d{2}):(\d{2})$/.exec(value);
  if (!match) return value;
  const [, rawHours, minutes] = match;
  const hours = Number(rawHours);
  const suffix = hours >= 12 ? "PM" : "AM";
  const displayHours = hours % 12 === 0 ? 12 : hours % 12;
  return `${displayHours}:${minutes} ${suffix}`;
}

/**
 * Builds the appointment request message. Asterisks render as bold in
 * WhatsApp, which keeps the request scannable for the workshop.
 */
export function buildBookingMessage(values: BookingMessageValues): string {
  return [
    `*New Appointment Request — ${business.name}*`,
    "",
    `*Name:* ${values.fullName}`,
    `*Phone:* ${values.phone}`,
    `*Vehicle:* ${values.carBrand} ${values.carModel} (${values.vehicleYear})`,
    `*Service:* ${values.service}`,
    `*Location:* ${values.location}`,
    `*Preferred date:* ${formatDate(values.preferredDate)}`,
    `*Preferred time:* ${formatTime(values.preferredTime)}`,
    `*Pickup & drop:* ${values.pickupDrop === "yes" ? "Yes" : "No"}`,
    "",
    "*Problem:*",
    values.problem,
    "",
    "— Sent from the Car Doctor India website",
  ].join("\n");
}

/** Short enquiry message used by CTA buttons across the site. */
export function buildEnquiryMessage(topic?: string): string {
  return topic
    ? `Hello ${business.name}, I would like to enquire about ${topic}.`
    : `Hello ${business.name}, I would like to enquire about your services.`;
}

/** Convenience: a ready-to-use `wa.me` href for a general or topical enquiry. */
export function enquiryHref(topic?: string): string {
  return buildWhatsAppUrl(buildEnquiryMessage(topic));
}
