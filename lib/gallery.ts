/**
 * Gallery manifest.
 *
 * Every entry is a real photograph of the Car Doctor India workshop or of a
 * vehicle photographed there. Nothing here is stock or generated, and each alt
 * description states only what is actually visible in the frame.
 *
 * `tier` splits the two source qualities:
 *   - "feature" — full-resolution photographs, used large.
 *   - "tile"    — 204px-wide photographs from the business's Google listing.
 *                 They are only ever rendered small, where that width holds up.
 */

export type GalleryTier = "feature" | "tile";

export interface GalleryImage {
  src: string;
  alt: string;
  width: number;
  height: number;
  tier: GalleryTier;
  caption: string;
}

export const featureImages: GalleryImage[] = [
  {
    src: "/images/workshop-exterior-night.jpg",
    alt: "The illuminated Car Doctor India workshop frontage on Service Road NH8 at night, with the stethoscope logo and 'We Repair Your Injured Dreams' tagline lit above the service bays",
    width: 1200,
    height: 1600,
    tier: "feature",
    caption: "The workshop on Service Road NH8, Anand",
  },
  {
    src: "/images/signage-red-bmw-night.webp",
    alt: "A red BMW parked beneath the illuminated Car Doctor India sign at night, with Mercedes-Benz, Audi, BMW, Porsche, Jaguar and Land Rover badges displayed across the signage",
    width: 765,
    height: 1020,
    tier: "feature",
    caption: "Specialists in luxury marques",
  },
  {
    src: "/images/bay-red-ambient-night.jpg",
    alt: "A dark blue BMW and a white Mercedes-Benz parked inside the Car Doctor India service bay at night, lit by red ambient lighting",
    width: 1288,
    height: 1599,
    tier: "feature",
    caption: "Inside the service bay",
  },
  {
    src: "/images/bay-brand-wall-night.jpg",
    alt: "The Car Doctor India service bay at night with a blue BMW and a white Hyundai parked inside, and Mercedes-Benz, Porsche, Mini, Jaguar and Land Rover badges mounted on the wall",
    width: 1200,
    height: 1600,
    tier: "feature",
    caption: "The service bay and marque wall",
  },
  {
    src: "/images/reception-interior.jpg",
    alt: "The Car Doctor India reception with a branded desk, seating, and alloy wheels, grilles and performance parts displayed on the brick wall behind",
    width: 1200,
    height: 1600,
    tier: "feature",
    caption: "Reception and parts display",
  },
  {
    src: "/images/mercedes-amg-night.jpg",
    alt: "A white Mercedes-AMG and a dark Mercedes-Benz E-Class parked under the Car Doctor India canopy at night",
    width: 900,
    height: 1600,
    tier: "feature",
    caption: "Mercedes-AMG in for work",
  },
  {
    src: "/images/bmw-m-daylight.jpg",
    alt: "The rear of a white BMW M car parked at the Car Doctor India workshop in daylight, with the workshop signage above",
    width: 1200,
    height: 1600,
    tier: "feature",
    caption: "BMW M at the workshop",
  },
  {
    src: "/images/bmw-1series-exterior.jpg",
    alt: "A blue BMW 1 Series with black alloy wheels and a rear spoiler parked outside the Car Doctor India workshop",
    width: 1200,
    height: 1600,
    tier: "feature",
    caption: "BMW 1 Series, exterior",
  },
  {
    src: "/images/bmw-yellow-workshop.webp",
    alt: "A yellow BMW 3 Series with black alloy wheels parked under the Car Doctor India canopy",
    width: 765,
    height: 1020,
    tier: "feature",
    caption: "BMW 3 Series in yellow",
  },
];

export const tileImages: GalleryImage[] = [
  {
    src: "/images/tile-01.jpg",
    alt: "A dark Porsche Cayenne and a white Mercedes-AMG parked side by side inside the workshop at night",
    width: 204,
    height: 255,
    tier: "tile",
    caption: "Porsche and Mercedes-AMG",
  },
  {
    src: "/images/tile-02.jpg",
    alt: "A display board showing a BMW blower resistor part with its part number",
    width: 204,
    height: 340,
    tier: "tile",
    caption: "BMW parts",
  },
  {
    src: "/images/tile-03.jpg",
    alt: "A yellow Porsche 718 Boxster parked outside the workshop",
    width: 204,
    height: 146,
    tier: "tile",
    caption: "Porsche 718 Boxster",
  },
  {
    src: "/images/tile-04.jpg",
    alt: "A white Mercedes-Benz C-Class parked outside the workshop in daylight",
    width: 204,
    height: 340,
    tier: "tile",
    caption: "Mercedes-Benz C-Class",
  },
  {
    src: "/images/tile-05.jpg",
    alt: "The workshop entrance in daylight with a white BMW parked inside beneath the service signage",
    width: 204,
    height: 340,
    tier: "tile",
    caption: "Workshop entrance",
  },
  {
    src: "/images/tile-06.jpg",
    alt: "The interior of a Mercedes-Benz GLC showing the dashboard, steering wheel and centre console",
    width: 204,
    height: 340,
    tier: "tile",
    caption: "Mercedes-Benz GLC interior",
  },
  {
    src: "/images/tile-07.jpg",
    alt: "A body kit laid out on the workshop floor with front and rear skirting, alongside the fitted result on an SUV with red accents",
    width: 204,
    height: 340,
    tier: "tile",
    caption: "Body kit fitment",
  },
  {
    src: "/images/tile-08.jpg",
    alt: "The front of a white Mercedes-Benz C-Class at the workshop",
    width: 204,
    height: 255,
    tier: "tile",
    caption: "Mercedes-Benz C-Class",
  },
  {
    src: "/images/tile-09.jpg",
    alt: "The rear of a black Jaguar XF parked on paving outside",
    width: 204,
    height: 255,
    tier: "tile",
    caption: "Jaguar XF",
  },
  {
    src: "/images/tile-10.jpg",
    alt: "The steering wheel and instrument cluster of an Audi",
    width: 204,
    height: 170,
    tier: "tile",
    caption: "Audi interior",
  },
  {
    src: "/images/tile-11.jpg",
    alt: "A pink BMW, a white BMW and a yellow BMW parked together inside the workshop at night",
    width: 204,
    height: 204,
    tier: "tile",
    caption: "Wrapped BMWs",
  },
  {
    src: "/images/tile-12.jpg",
    alt: "A yellow BMW 3 Series with black alloy wheels parked under the workshop canopy",
    width: 204,
    height: 340,
    tier: "tile",
    caption: "BMW 3 Series",
  },
  {
    src: "/images/tile-13.jpg",
    alt: "The interior of an Audi Q5 showing the steering wheel, dashboard and cream leather seats",
    width: 204,
    height: 340,
    tier: "tile",
    caption: "Audi Q5 interior",
  },
  {
    src: "/images/tile-14.jpg",
    alt: "The Car Doctor India workshop lit up at night, seen from the road",
    width: 204,
    height: 204,
    tier: "tile",
    caption: "The workshop at night",
  },
  {
    src: "/images/tile-15.jpg",
    alt: "Stacks of tyres on display in the workshop parts store",
    width: 204,
    height: 340,
    tier: "tile",
    caption: "Tyres in stock",
  },
  {
    src: "/images/tile-16.jpg",
    alt: "A black Mercedes-Benz G-Class parked at night",
    width: 204,
    height: 255,
    tier: "tile",
    caption: "Mercedes-Benz G-Class",
  },
  {
    src: "/images/tile-17.jpg",
    alt: "A modified black off-road vehicle parked outside the workshop at night",
    width: 204,
    height: 146,
    tier: "tile",
    caption: "Modified off-roader",
  },
  {
    src: "/images/tile-18.jpg",
    alt: "The rear of a lime green BMW M3 with a large rear spoiler, photographed at night",
    width: 204,
    height: 146,
    tier: "tile",
    caption: "BMW M3",
  },
];

export const galleryImages: GalleryImage[] = [...featureImages, ...tileImages];

/** The six feature photographs used in the homepage gallery preview. */
export const previewImages = featureImages.slice(0, 6);

const bySrc = (src: string): GalleryImage => {
  const image = featureImages.find((entry) => entry.src === src);
  if (!image) throw new Error(`Unknown gallery image: ${src}`);
  return image;
};

/**
 * Luxury cars photographed at the workshop, for the homepage showcase.
 *
 * These four full-resolution car photographs were previously not shown on the
 * homepage at all — the sections leaned on a couple of workshop interiors that
 * ended up repeating. Featuring the actual cars here adds the luxury imagery
 * the page was missing and gives each workshop shot a single home.
 */
export const carShowcase: GalleryImage[] = [
  bySrc("/images/mercedes-amg-night.jpg"),
  bySrc("/images/bmw-m-daylight.jpg"),
  bySrc("/images/bmw-1series-exterior.jpg"),
  bySrc("/images/bmw-yellow-workshop.webp"),
];
