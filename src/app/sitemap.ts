import { MetadataRoute } from "next";
import { headers } from "next/headers";
import prisma from "@/lib/db";
import { DRUG_CATEGORIES } from "@/lib/constants";

// Next.js sitemap index — splits into /sitemap/0.xml, /sitemap/1.xml, /sitemap/2.xml
// Google limit: 50,000 URLs per sitemap file
export async function generateSitemaps() {
  return [{ id: 0 }, { id: 1 }, { id: 2 }];
}

// --- Individual sitemap generators ---

async function sitemapStatic(baseUrl: string): Promise<MetadataRoute.Sitemap> {
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

async function sitemapDrugs(baseUrl: string): Promise<MetadataRoute.Sitemap> {
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

async function sitemapPatents(baseUrl: string): Promise<MetadataRoute.Sitemap> {
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

// Lookup table — avoids if/else on id which can break if Next.js
// passes a string instead of a number
const SITEMAP_HANDLERS = [sitemapStatic, sitemapDrugs, sitemapPatents];

export default async function sitemap({ id }: { id: number }): Promise<MetadataRoute.Sitemap> {
  // Detect real host from request headers so sitemap URLs always match the
  // actual deployment domain — avoids domain mismatch when env var differs.
  const h = await headers();
  const host = h.get("host") || "genericswap.vercel.app";
  const proto = h.get("x-forwarded-proto") || "https";
  const baseUrl = `${proto}://${host}`;

  // Use array lookup — works regardless of whether id is number or string
  const handler = SITEMAP_HANDLERS[Number(id)] ?? sitemapPatents;
  return handler(baseUrl);
}
