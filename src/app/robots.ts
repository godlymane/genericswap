import { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/constants";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/admin/"],
      },
    ],
    // List each child sitemap individually — Next.js 16 does not
    // reliably generate a sitemap index, so we point crawlers
    // directly to the working child sitemaps.
    sitemap: [
      `${SITE_URL}/sitemap/0.xml`,   // Static pages, categories, generic ingredients
      `${SITE_URL}/sitemap/1.xml`,   // Drug pages (~42K)
      `${SITE_URL}/sitemap/2.xml`,   // Patent-expiry pages (~42K)
    ],
  };
}
