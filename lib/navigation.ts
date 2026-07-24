/** Primary site navigation, shared by the navbar, mobile menu and footer. */

export interface NavLink {
  label: string;
  href: string;
}

export const navLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Rentals", href: "/luxury-car-rentals" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact", href: "/contact" },
];

/** Every route on the site, used to generate the sitemap. */
export const staticRoutes: string[] = [
  "/",
  "/about",
  "/services",
  "/luxury-car-rentals",
  "/gallery",
  "/book-appointment",
  "/contact",
];
