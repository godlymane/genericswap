import { MetadataRoute } from "next";
import prisma from "@/lib/db";
import { DRUG_CATEGORIES, SITE_URL } from "@/lib/constants";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = SITE_URL;

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: "daily", priority: 1.0 },
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.3 },
    { url: `${baseUrl}/privacy`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.2 },
    { url: `${baseUrl}/terms`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.2 },
    { url: `${baseUrl}/disclaimer`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.3 },
    { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.2 },
  ];

  // Category pages
  const categoryPages: MetadataRoute.Sitemap = Object.keys(DRUG_CATEGORIES).map((slug) => ({
    url: `${baseUrl}/category/${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  // Drug pages (all unique slugs)
  const drugSlugs = await prisma.drug.findMany({
    select: { slug: true },
    distinct: ["slug"],
    take: 49000, // Stay under 50K sitemap limit
  });

  const drugPages: MetadataRoute.Sitemap = drugSlugs.map((d) => ({
    url: `${baseUrl}/drug/${d.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  // Unique active ingredients for generic pages
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

  return [...staticPages, ...categoryPages, ...drugPages, ...genericPages];
}
