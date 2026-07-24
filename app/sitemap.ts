import type { MetadataRoute } from "next";
import { business } from "@/lib/business";
import { staticRoutes } from "@/lib/navigation";
import { serviceSlugs } from "@/lib/services";

/** Every page on the site, generated from the same data the nav uses. */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const pages: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: new URL(route, business.siteUrl).toString(),
    lastModified,
    changeFrequency: route === "/" ? "weekly" : "monthly",
    priority: route === "/" ? 1 : 0.8,
  }));

  const servicePages: MetadataRoute.Sitemap = serviceSlugs.map((slug) => ({
    url: new URL(`/services/${slug}`, business.siteUrl).toString(),
    lastModified,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...pages, ...servicePages];
}
