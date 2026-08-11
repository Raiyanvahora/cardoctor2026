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
  /*
     Google Search Console ownership token. Renders as
     <meta name="google-site-verification" content="…"> on every page.

     Only the token goes here — Google issues it as
     "google-site-verification=<token>" for the DNS TXT method, and
     including that prefix in the content attribute fails verification.

     This is a public token by design; it has to be readable in the page
     source for Google to check it, and it grants no access on its own.
     Leave it in place — Search Console re-checks periodically and removing
     it later un-verifies the property.
  */
  verification: {
    google: "7iOkah20GHO-U60198g9TKNCDVY3JaE-f4GWk7Zb2eE",
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
      <head>
        {/*
          Marks that scripting is available, before first paint. Scroll-reveal
          start states are gated behind this class, so if this never runs the
          page simply renders fully visible instead of staying blank.
        */}
        <script
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.classList.add('js')`,
          }}
        />
      </head>
      <body className="min-h-screen bg-ink font-sans text-fg antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:rounded-full focus:bg-brand focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-white"
        >
          Skip to main content
        </a>

        <JsonLd data={autoRepairSchema()} />

        <Navbar />

        {/* Clearance for the fixed mobile action bar is on <body>, so that it
            also covers the footer below. */}
        <main id="main">{children}</main>

        <Footer />
        <WhatsAppFloat />
        <MobileBottomBar />
      </body>
    </html>
  );
}
