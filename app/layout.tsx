import type { Metadata, Viewport } from "next";
import { Archivo, Inter } from "next/font/google";
import "./globals.css";

import { Footer } from "@/components/layout/Footer";
import { MobileBottomBar } from "@/components/layout/MobileBottomBar";
import { Navbar } from "@/components/layout/Navbar";
import { WhatsAppFloat } from "@/components/layout/WhatsAppFloat";
import { JsonLd } from "@/components/ui/JsonLd";
import { business } from "@/lib/business";
import { autoRepairSchema } from "@/lib/seo";

const archivo = Archivo({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-archivo",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(business.siteUrl),
  title: {
    default: `${business.name} — ${business.positioning} in ${business.address.city}`,
    template: `%s | ${business.name}`,
  },
  description: `${business.name} — ${business.positioning} in ${business.address.city}, ${business.address.state}. Established ${business.established}. Advanced diagnostics, engine and mechanical repair, AC repair, denting and painting, upgrades, rentals and insurance assistance. ${business.hours}.`,
  applicationName: business.name,
  keywords: [
    "luxury car repair Anand",
    "car service Anand Gujarat",
    "luxury car mechanic Gujarat",
    "car AC repair Anand",
    "denting painting Anand",
    "luxury car rental Anand",
    "Mercedes BMW Audi service Gujarat",
    business.name,
  ],
  authors: [{ name: business.name }],
  creator: business.name,
  publisher: business.name,
  formatDetection: { telephone: true, address: true, email: true },
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: business.name,
    url: business.siteUrl,
    title: `${business.name} — ${business.positioning}`,
    description: `${business.tagline}. ${business.positioning} in ${business.address.city}, ${business.address.state}, established ${business.established}.`,
  },
  twitter: {
    card: "summary_large_image",
    title: `${business.name} — ${business.positioning}`,
    description: `${business.tagline}. ${business.positioning} in ${business.address.city}, ${business.address.state}.`,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export const viewport: Viewport = {
  themeColor: "#08080a",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-IN" className={`${archivo.variable} ${inter.variable}`}>
      <body className="min-h-screen bg-ink font-sans text-fg antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:rounded-full focus:bg-brand focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-white"
        >
          Skip to main content
        </a>

        <JsonLd data={autoRepairSchema()} />

        <Navbar />

        {/* Bottom padding clears the fixed mobile action bar. */}
        <main id="main" className="pb-20 lg:pb-0">
          {children}
        </main>

        <Footer />
        <WhatsAppFloat />
        <MobileBottomBar />
      </body>
    </html>
  );
}
