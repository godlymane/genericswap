import { MetadataRoute } from "next";
import prisma from "@/lib/db";
import { DRUG_CATEGORIES, SITE_URL } from "@/lib/constants";

// Next.js sitemap index — splits into /sitemap/0.xml, /sitemap/1.xml, /sitemap/2.xml
// Google limit: 50,000 URLs per sitemap file
export async function generateSitemaps() {
  return [{ id: 0 }, { id: 1 }, { id: 2 }];
}

export default async function sitemap({ id }: { id: number }): Promise<MetadataRoute.Sitemap> {
  const baseUrl = SITE_URL;

  // Sitemap 0: Static + Category + Generic ingredient pages (~5K URLs)
  if (id === 0) {
    const staticPages: MetadataRoute.Sitemap = [
      { url: baseUrl, lastModified: new Date(), changeFrequency: "daily", priority: 1.0 },
      { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.3 },
      { url: `${baseUrl}/privacy`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.2 },
      { url: `${baseUrl}/terms`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.2 },
      { url: `${baseUrl}/disclaimer`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.3 },
      { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.2 },
    ];

    const categoryPages: MetadataRoute.Sitemap = Object.keys(DRUG_CATEGORIES).map((slug) => ({
      url: `${baseUrl}/category/${slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }));

    const ingredients = await prisma.drug.findMany({
      select: { activeIngredient: true },
      distinct: ["activeIngredient"],
      take: 5000,
    });

    const genericPages: MetadataRoute.Sitemap = ingredients.map((d) => ({
      url: `${baseUrl}/generic/${encodeURIComponent(
        d.activeIngredient.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]/g, "")
      )}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.6,
    }));

    return [...staticPages, ...categoryPages, ...genericPages];
  }

  // Sitemap 1: Drug pages (~49K URLs)
  if (id === 1) {
    const drugSlugs = await prisma.drug.findMany({
      select: { slug: true },
      distinct: ["slug"],
      take: 49000,
    });

    return drugSlugs.map((d) => ({
      url: `${baseUrl}/drug/${d.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    }));
  }

  // Sitemap 2: Patent expiry pages (~49K URLs)
  const drugSlugs = await prisma.drug.findMany({
    select: { slug: true },
    distinct: ["slug"],
    take: 49000,
  });

  return drugSlugs.map((d) => ({
    url: `${baseUrl}/drug/${d.slug}/patent-expiry`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));
}
