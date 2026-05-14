import { NextResponse } from "next/server";
import { DRUG_CATEGORIES } from "@/lib/constants";
import { GUIDES } from "@/lib/guides";

type SitemapEntry = {
  url: string;
  lastModified?: Date;
  changeFrequency?: string;
  priority?: number;
};

async function db() {
  const { default: prisma } = await import("@/lib/db");
  return prisma;
}

function hasDatabaseUrl() {
  return Boolean(process.env.DATABASE_URL);
}

function escapeXml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function renderUrlset(entries: SitemapEntry[]) {
  const urls = entries
    .map((entry) => {
      const lastModified = entry.lastModified
        ? `<lastmod>${entry.lastModified.toISOString()}</lastmod>`
        : "";
      const changeFrequency = entry.changeFrequency
        ? `<changefreq>${entry.changeFrequency}</changefreq>`
        : "";
      const priority = entry.priority ? `<priority>${entry.priority}</priority>` : "";

      return `<url><loc>${escapeXml(entry.url)}</loc>${lastModified}${changeFrequency}${priority}</url>`;
    })
    .join("");

  return `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`;
}

function staticEntries(baseUrl: string): SitemapEntry[] {
  const now = new Date();
  const staticPages: SitemapEntry[] = [
    { url: baseUrl, lastModified: now, changeFrequency: "daily", priority: 1.0 },
    { url: `${baseUrl}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.3 },
    { url: `${baseUrl}/privacy`, lastModified: now, changeFrequency: "monthly", priority: 0.2 },
    { url: `${baseUrl}/terms`, lastModified: now, changeFrequency: "monthly", priority: 0.2 },
    { url: `${baseUrl}/disclaimer`, lastModified: now, changeFrequency: "monthly", priority: 0.3 },
    { url: `${baseUrl}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.2 },
    { url: `${baseUrl}/editorial-policy`, lastModified: now, changeFrequency: "monthly", priority: 0.4 },
    { url: `${baseUrl}/guides`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/trending`, lastModified: now, changeFrequency: "daily", priority: 0.7 },
    { url: `${baseUrl}/patent-cliffs`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${baseUrl}/state-laws`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/search`, lastModified: now, changeFrequency: "daily", priority: 0.5 },
    { url: `${baseUrl}/search/advanced`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${baseUrl}/api-docs`, lastModified: now, changeFrequency: "monthly", priority: 0.4 },
  ];

  const guidePages = GUIDES.map((guide) => ({
    url: `${baseUrl}/guides/${guide.slug}`,
    lastModified: new Date(guide.updatedAt),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const categoryPages = Object.keys(DRUG_CATEGORIES).map((slug) => ({
    url: `${baseUrl}/category/${slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  return [...staticPages, ...guidePages, ...categoryPages];
}

async function sitemapStatic(baseUrl: string): Promise<SitemapEntry[]> {
  const entries = staticEntries(baseUrl);

  if (!hasDatabaseUrl()) return entries;

  try {
    const prisma = await db();
    const ingredients = await prisma.drug.findMany({
      select: { activeIngredient: true },
      distinct: ["activeIngredient"],
      take: 5000,
    });

    const genericPages = ingredients.map((drug) => ({
      url: `${baseUrl}/generic/${encodeURIComponent(
        drug.activeIngredient.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]/g, "")
      )}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.6,
    }));

    return [...entries, ...genericPages];
  } catch {
    return entries;
  }
}

async function sitemapDrugs(baseUrl: string): Promise<SitemapEntry[]> {
  if (!hasDatabaseUrl()) return [];

  try {
    const prisma = await db();
    const drugSlugs = await prisma.drug.findMany({
      select: { slug: true },
      distinct: ["slug"],
      take: 49000,
    });

    return drugSlugs.map((drug) => ({
      url: `${baseUrl}/drug/${drug.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    }));
  } catch {
    return [];
  }
}

async function sitemapPatents(baseUrl: string): Promise<SitemapEntry[]> {
  if (!hasDatabaseUrl()) return [];

  try {
    const prisma = await db();
    const drugSlugs = await prisma.drug.findMany({
      select: { slug: true },
      distinct: ["slug"],
      take: 49000,
    });

    return drugSlugs.map((drug) => ({
      url: `${baseUrl}/drug/${drug.slug}/patent-expiry`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    }));
  } catch {
    return [];
  }
}

const SITEMAP_HANDLERS = [sitemapStatic, sitemapDrugs, sitemapPatents];

export async function GET(request: Request, { params }: { params: Promise<{ id: string[] }> }) {
  const { id } = await params;
  const rawId = id[0]?.replace(/\.xml$/, "") ?? "2";
  const sitemapId = Number(rawId);
  const url = new URL(request.url);
  const baseUrl = `${url.protocol}//${url.host}`;
  const handler = SITEMAP_HANDLERS[sitemapId] ?? sitemapPatents;
  const entries = await handler(baseUrl);

  return new NextResponse(renderUrlset(entries), {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
