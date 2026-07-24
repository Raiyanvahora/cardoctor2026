/**
 * Luxury car rental content.
 *
 * IMPORTANT — nothing here is a promise of availability.
 *
 * The marques listed are those displayed on the workshop's own signage. The
 * vehicles listed are cars that appear in the business's own photographs; they
 * are presented as *indicative* of the kind of car the workshop works with and
 * every entry is flagged accordingly. No rates are shown anywhere, because none
 * were supplied. Availability and pricing are confirmed on WhatsApp only.
 */

export interface Marque {
  name: string;
}

export interface IndicativeVehicle {
  name: string;
  category: string;
  /** Always true — these are examples seen at the workshop, not a bookable fleet. */
  indicative: true;
  image: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
}

/** Marques shown on the Car Doctor India workshop signage. */
export const marques: Marque[] = [
  { name: "Mercedes-Benz" },
  { name: "BMW" },
  { name: "Audi" },
  { name: "Porsche" },
  { name: "Jaguar" },
  { name: "Land Rover" },
  { name: "Mini" },
];

/**
 * Cars photographed at the Car Doctor India workshop. Shown to illustrate the
 * kind of vehicle the business handles — not a live availability list.
 */
export const indicativeVehicles: IndicativeVehicle[] = [
  {
    name: "Mercedes-AMG",
    category: "Performance saloon",
    indicative: true,
    image: {
      src: "/images/mercedes-amg-night.jpg",
      alt: "A white Mercedes-AMG parked under the Car Doctor India canopy at night",
      width: 900,
      height: 1600,
    },
  },
  {
    name: "Mercedes-Benz G-Class",
    category: "Luxury SUV",
    indicative: true,
    image: {
      src: "/images/tile-16.jpg",
      alt: "A black Mercedes-Benz G-Class parked at night",
      width: 204,
      height: 255,
    },
  },
  {
    name: "BMW M",
    category: "Performance saloon",
    indicative: true,
    image: {
      src: "/images/bmw-m-daylight.jpg",
      alt: "The rear of a white BMW M car at the Car Doctor India workshop",
      width: 1200,
      height: 1600,
    },
  },
  {
    name: "Porsche 718 Boxster",
    category: "Roadster",
    indicative: true,
    image: {
      src: "/images/tile-03.jpg",
      alt: "A yellow Porsche 718 Boxster parked outside the workshop",
      width: 204,
      height: 146,
    },
  },
  {
    name: "Jaguar XF",
    category: "Luxury saloon",
    indicative: true,
    image: {
      src: "/images/tile-09.jpg",
      alt: "The rear of a black Jaguar XF parked on paving outside",
      width: 204,
      height: 255,
    },
  },
  {
    name: "Audi Q5",
    category: "Luxury SUV",
    indicative: true,
    image: {
      src: "/images/tile-13.jpg",
      alt: "The interior of an Audi Q5 showing the steering wheel, dashboard and cream leather seats",
      width: 204,
      height: 340,
    },
  },
  {
    name: "Mercedes-Benz C-Class",
    category: "Luxury saloon",
    indicative: true,
    image: {
      src: "/images/tile-04.jpg",
      alt: "A white Mercedes-Benz C-Class parked outside the workshop in daylight",
      width: 204,
      height: 340,
    },
  },
  {
    name: "Porsche Cayenne",
    category: "Luxury SUV",
    indicative: true,
    image: {
      src: "/images/tile-01.jpg",
      alt: "A dark Porsche Cayenne parked beside a white Mercedes-AMG inside the workshop at night",
      width: 204,
      height: 255,
    },
  },
];

export interface RentalStep {
  title: string;
  body: string;
}

export const rentalSteps: RentalStep[] = [
  {
    title: "Send your dates",
    body: "Message us on WhatsApp with the dates you need, the city, and whether it is for an occasion or for daily use.",
  },
  {
    title: "We confirm availability",
    body: "We check what is actually free for those dates and come back to you with the options and the rate.",
  },
  {
    title: "Documents",
    body: "Valid identification and driving licence documentation is required before a car is handed over.",
  },
  {
    title: "Handover",
    body: "Collection is arranged from the Anand workshop, with the car checked over with you before you take it.",
  },
];
