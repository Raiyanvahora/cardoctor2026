/**
 * The service catalogue. Powers the services grid, the dynamic detail pages,
 * the booking form's service dropdown, the footer links, the sitemap and the
 * JSON-LD offer catalogue.
 *
 * Copy describes what each service *is*. It deliberately makes no claims about
 * turnaround times, warranties, certifications or job counts, because none of
 * that was supplied by the business.
 */

import type { LucideIcon } from "lucide-react";
import {
  BadgeCheck,
  Cog,
  Gauge,
  KeyRound,
  PaintRoller,
  ScanLine,
  ShieldCheck,
  Snowflake,
  Truck,
  Wrench,
} from "lucide-react";

export interface Service {
  slug: string;
  /** Full title used as the page heading. */
  title: string;
  /** Compact title for cards, sidebars and dropdowns. */
  shortTitle: string;
  icon: LucideIcon;
  /** One-line summary for cards and meta descriptions. */
  summary: string;
  /** Opening paragraphs on the detail page. */
  intro: string[];
  whatsIncluded: string[];
  goodToKnow: string[];
  image: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
}

const WORKSHOP_BAY = {
  src: "/images/bay-red-ambient-night.jpg",
  alt: "Cars parked inside the Car Doctor India workshop bay under red ambient lighting at night",
  width: 1288,
  height: 1599,
};

const BRAND_WALL = {
  src: "/images/bay-brand-wall-night.jpg",
  alt: "The Car Doctor India service bay with luxury marque badges displayed on the wall",
  width: 1200,
  height: 1600,
};

const RECEPTION = {
  src: "/images/reception-interior.jpg",
  alt: "The Car Doctor India reception desk with performance parts and wheels displayed on the wall behind it",
  width: 1200,
  height: 1600,
};

export const services: Service[] = [
  {
    slug: "regular-maintenance",
    title: "Regular Maintenance, Oil Changes & Tune-Ups",
    shortTitle: "Regular Maintenance",
    icon: Wrench,
    summary:
      "Scheduled servicing, oil and filter changes, fluid checks and tune-ups that keep a luxury car running the way it was built to.",
    intro: [
      "Routine servicing is what keeps an expensive car from becoming an expensive problem. Fluids degrade, filters clog and tolerances drift — and on a performance engine those small changes show up quickly in how the car drives.",
      "Car Doctor India handles scheduled maintenance for luxury and performance vehicles, from an oil and filter change through to a full tune-up. Work is carried out with the specification of your particular car in mind rather than a generic service checklist.",
    ],
    whatsIncluded: [
      "Engine oil and oil filter replacement",
      "Air, cabin and fuel filter checks and replacement",
      "Brake, coolant, transmission and power steering fluid checks",
      "Spark plug inspection and replacement where required",
      "Battery, belt and hose condition checks",
      "Tyre condition and pressure check",
      "Road test before handover",
    ],
    goodToKnow: [
      "Tell us your car's make, model and year when you enquire so the right parts and fluids are ready.",
      "Share your last service date or odometer reading if you have it — it helps us advise what is actually due.",
      "The workshop is open 24 hours, so drop-offs can be arranged outside normal working hours.",
    ],
    image: WORKSHOP_BAY,
  },
  {
    slug: "advanced-diagnostics",
    title: "Advanced Diagnostics & Luxury Car Repair",
    shortTitle: "Advanced Diagnostics",
    icon: ScanLine,
    summary:
      "Fault tracing on modern luxury vehicles — warning lights, electrical gremlins and intermittent faults diagnosed before any part is replaced.",
    intro: [
      "A modern luxury car is a network of control modules. A single warning light on the dashboard can be triggered from several directions, and replacing parts on a guess gets expensive fast.",
      "Car Doctor India specialises in diagnosing faults on luxury vehicles: reading and interpreting fault codes, testing the circuits and components behind them, and confirming the actual cause before any repair is quoted or carried out.",
    ],
    whatsIncluded: [
      "Full fault code scan across vehicle control modules",
      "Interpretation of stored, pending and historic fault codes",
      "Electrical circuit, sensor and actuator testing",
      "Investigation of intermittent and hard-to-reproduce faults",
      "Warning light and dashboard error diagnosis",
      "A clear explanation of what was found before work is authorised",
    ],
    goodToKnow: [
      "Describe when the fault appears — cold start, at speed, in traffic — as it narrows the search considerably.",
      "If a warning light is on, please avoid clearing it before you bring the car in; the stored data is useful.",
      "Diagnosis is confirmed with you before any repair work begins.",
    ],
    image: BRAND_WALL,
  },
  {
    slug: "engine-mechanical-repair",
    title: "Engine & Mechanical Repair",
    shortTitle: "Engine & Mechanical Repair",
    icon: Cog,
    summary:
      "Engine, transmission, suspension, braking and steering repair for luxury and performance cars.",
    intro: [
      "Mechanical work on a luxury car demands the right procedure, the right torque figures and the right parts. Shortcuts show up later as noise, vibration or a repeat failure.",
      "Car Doctor India carries out engine and mechanical repair across the drivetrain and chassis — from oil leaks and cooling faults through to suspension, braking and steering work.",
    ],
    whatsIncluded: [
      "Engine repair, oil leak tracing and rectification",
      "Cooling system, radiator and overheating repair",
      "Clutch, gearbox and transmission-related repair",
      "Suspension, shock absorber and bush replacement",
      "Brake system service, disc and pad replacement",
      "Steering and wheel-related repair",
      "Exhaust and emissions-related mechanical work",
    ],
    goodToKnow: [
      "Any noise, vibration or smell you have noticed is useful information — please mention it when you enquire.",
      "Parts availability for some luxury models can affect timing; we confirm this with you before starting.",
      "Pickup and drop can be arranged for cars that are not safe to drive, subject to your location.",
    ],
    image: WORKSHOP_BAY,
  },
  {
    slug: "car-ac-repair",
    title: "Car AC Repair",
    shortTitle: "Car AC Repair",
    icon: Snowflake,
    summary:
      "Air conditioning diagnosis and repair — weak cooling, leaks, compressor faults, blower and climate control problems.",
    intro: [
      "In Gujarat, a car's air conditioning is not a luxury. When cooling drops off it is usually one of a handful of causes: a refrigerant leak, a failing compressor, a blocked condenser, a blower fault or a climate control problem.",
      "Car Doctor India diagnoses and repairs car air conditioning systems, including the electronic climate control found on modern luxury vehicles.",
    ],
    whatsIncluded: [
      "AC performance and cooling test",
      "Refrigerant leak detection and repair",
      "Compressor, condenser and cooling coil diagnosis and replacement",
      "Blower motor, resistor and cabin filter service",
      "Climate control and AC electrical fault diagnosis",
      "Refrigerant evacuation and recharge",
    ],
    goodToKnow: [
      "Tell us whether cooling is weak all the time or only in traffic — it points to different causes.",
      "Unusual smells from the vents often trace back to the cabin filter or evaporator and are worth mentioning.",
      "A recharge alone rarely fixes a leaking system; we look for the cause first.",
    ],
    image: BRAND_WALL,
  },
  {
    slug: "denting-painting-bodywork",
    title: "Denting, Painting & Bodywork",
    shortTitle: "Denting, Painting & Bodywork",
    icon: PaintRoller,
    summary:
      "Dent removal, panel repair, refinishing and colour matching to restore a damaged body back to a proper finish.",
    intro: [
      "Bodywork is where a repair is most visible. A panel that is close but not right will catch the eye every time you walk up to the car, especially on a metallic or premium paint finish.",
      "Car Doctor India handles denting, panel repair, painting and refinishing, working to match the existing finish of the vehicle.",
    ],
    whatsIncluded: [
      "Dent removal and panel straightening",
      "Panel repair and replacement",
      "Scratch, scuff and stone-chip repair",
      "Paint colour matching and refinishing",
      "Bumper repair and refinishing",
      "Full and part body repainting",
      "Post-repair cleanup before handover",
    ],
    goodToKnow: [
      "Photographs of the damage sent on WhatsApp help us assess the work before you visit.",
      "If the damage is being claimed on insurance, mention it early — we can assist with the process.",
      "Paint and refinishing work needs curing time, so these jobs are planned around your availability.",
    ],
    image: {
      src: "/images/bmw-1series-exterior.jpg",
      alt: "A blue BMW 1 Series with a rear spoiler parked outside the Car Doctor India workshop",
      width: 1200,
      height: 1600,
    },
  },
  {
    slug: "upgrades-modifications",
    title: "Personalised Upgrades & Modifications",
    shortTitle: "Upgrades & Modifications",
    icon: Gauge,
    summary:
      "Styling and specification changes built around how you want your car to look and drive.",
    intro: [
      "Two owners of the same car rarely want the same things from it. Some want the stance and the styling; others want the seating, the sound or the lighting brought up to a different standard.",
      "Car Doctor India carries out personalised upgrades and modifications, planned with you first so the result matches what you actually had in mind — and so the work suits the car.",
    ],
    whatsIncluded: [
      "Body kits, spoilers and exterior styling",
      "Alloy wheel upgrades and fitment",
      "Lighting upgrades",
      "Interior and upholstery upgrades",
      "Audio and infotainment upgrades",
      "Exhaust and styling modifications",
      "Custom requests discussed case by case",
    ],
    goodToKnow: [
      "Send reference images on WhatsApp — the clearer the brief, the closer the result.",
      "We will tell you honestly if a requested modification is not advisable for your particular car.",
      "Please make sure any modification you choose is compliant with regulations applicable to your vehicle.",
    ],
    image: RECEPTION,
  },
  {
    slug: "accessories-performance",
    title: "Luxury Car Accessories & Performance Upgrades",
    shortTitle: "Accessories & Performance",
    icon: BadgeCheck,
    summary:
      "Wheels, tyres, accessories and performance parts sourced and fitted for luxury vehicles.",
    intro: [
      "The right accessory is the one that fits properly and suits the car. Wheels, tyres and performance parts all have to match the vehicle's specification to work as intended.",
      "Car Doctor India supplies and fits luxury car accessories and performance upgrades, including wheels, tyres and related components.",
    ],
    whatsIncluded: [
      "Alloy wheels — supply and fitment",
      "Tyres — supply, fitment and replacement",
      "Performance parts and upgrades",
      "Interior and exterior accessories",
      "Lighting and styling accessories",
      "Fitment carried out in-workshop",
    ],
    goodToKnow: [
      "Share your car's exact variant and current wheel or tyre size so we can confirm correct fitment.",
      "If you are after a specific brand or part, ask on WhatsApp and we will check availability for you.",
      "Availability of individual parts varies; nothing is confirmed until we have checked it for your car.",
    ],
    image: {
      src: "/images/bmw-yellow-workshop.webp",
      alt: "A yellow BMW 3 Series with black alloy wheels parked under the Car Doctor India canopy",
      width: 765,
      height: 1020,
    },
  },
  {
    slug: "luxury-car-rentals",
    title: "Luxury Car Rentals",
    shortTitle: "Luxury Car Rentals",
    icon: KeyRound,
    summary:
      "Luxury cars available to rent for special occasions or daily use, with availability confirmed on request.",
    intro: [
      "Sometimes the car matters — a wedding, a shoot, an occasion you want to arrive at properly. And sometimes you simply need something better than the usual rental for a few days.",
      "Car Doctor India offers luxury car rentals for special occasions and for daily use. Availability, terms and rates are confirmed directly with you on WhatsApp for the dates you need.",
    ],
    whatsIncluded: [
      "Luxury cars for weddings, events and shoots",
      "Luxury cars for daily and short-term use",
      "Availability confirmed for your specific dates",
      "Terms and rates shared on enquiry",
      "Handover arranged from the Anand workshop",
    ],
    goodToKnow: [
      "Tell us your dates, the city you need the car in, and the occasion when you enquire.",
      "Valid identification and driving licence documentation is required.",
      "Availability changes constantly — nothing is held until it is confirmed with you.",
    ],
    image: {
      src: "/images/signage-red-bmw-night.webp",
      alt: "A red BMW parked beneath the illuminated Car Doctor India sign at night",
      width: 765,
      height: 1020,
    },
  },
  {
    slug: "car-insurance-assistance",
    title: "Car Insurance Assistance",
    shortTitle: "Car Insurance Assistance",
    icon: ShieldCheck,
    summary:
      "Help with luxury car insurance quotes, policy management and the paperwork around a repair claim.",
    intro: [
      "Insurance on a luxury car is rarely straightforward, and the paperwork around a claim tends to arrive at the least convenient moment.",
      "Car Doctor India assists with luxury car insurance quotes and policy management, and helps with the documentation involved when a repair is going through a claim.",
    ],
    whatsIncluded: [
      "Luxury car insurance quotes",
      "Policy management assistance",
      "Guidance on documentation for repair claims",
      "Coordination between the repair and the claim paperwork",
      "Assistance with damage assessment documentation",
    ],
    goodToKnow: [
      "Have your existing policy details to hand when you enquire — it speeds everything up.",
      "For accident damage, photographs taken at the scene are useful supporting documentation.",
      "Final decisions on any claim rest with your insurer; we assist with the process, not the outcome.",
    ],
    image: RECEPTION,
  },
  {
    slug: "pickup-drop-service",
    title: "Pickup & Drop Service",
    shortTitle: "Pickup & Drop",
    icon: Truck,
    summary:
      "Your car collected and returned, so a service or repair does not cost you a day.",
    intro: [
      "Getting a car to a workshop and back is often the most annoying part of having it repaired — particularly if the car is not in a state to be driven.",
      "Car Doctor India offers a pickup and drop service so your vehicle can be collected and returned. Availability depends on your location, and is confirmed with you when you book.",
    ],
    whatsIncluded: [
      "Collection of your vehicle for service or repair",
      "Return of the vehicle after work is completed",
      "Collection arranged around your schedule",
      "Available for vehicles that are not in drivable condition",
      "Confirmed with you at the time of booking",
    ],
    goodToKnow: [
      "Pickup and drop availability depends on your location — please share your area when you enquire.",
      "Select the pickup and drop option on the booking form and we will confirm it with you.",
      "Please make sure keys and documents are available at the collection point.",
    ],
    image: {
      src: "/images/workshop-exterior-night.jpg",
      alt: "The illuminated Car Doctor India workshop frontage on Service Road NH8 at night",
      width: 1200,
      height: 1600,
    },
  },
];

export const serviceSlugs = services.map((service) => service.slug);

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((service) => service.slug === slug);
}

/** Previous and next service, used for the detail-page pager. Wraps around. */
export function getServiceNeighbours(slug: string): {
  previous: Service;
  next: Service;
} | null {
  const index = services.findIndex((service) => service.slug === slug);
  if (index === -1) return null;
  return {
    previous: services[(index - 1 + services.length) % services.length],
    next: services[(index + 1) % services.length],
  };
}

/** Options for the booking form dropdown, plus a catch-all. */
export const bookingServiceOptions: string[] = [
  ...services.map((service) => service.shortTitle),
  "Other / Not sure",
];
