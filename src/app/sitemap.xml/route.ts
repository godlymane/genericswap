import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export function GET(request: Request) {
  const url = new URL(request.url);
  const baseUrl = `${url.protocol}//${url.host}`;
  const sitemaps = [0, 1, 2]
    .map((id) => `<sitemap><loc>${baseUrl}/sitemap/${id}.xml</loc></sitemap>`)
    .join("");

  return new NextResponse(
    `<?xml version="1.0" encoding="UTF-8"?>` +
      `<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${sitemaps}</sitemapindex>`,
    {
      headers: {
        "Content-Type": "application/xml; charset=utf-8",
        "Cache-Control": "public, max-age=3600, s-maxage=3600",
      },
    }
  );
}
