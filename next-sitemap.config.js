/** @type {import('next-sitemap').IConfig} */
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "https://genericswap.vercel.app");

module.exports = {
  siteUrl,
  generateRobotsTxt: false, // We generate robots.ts via Next.js metadata API
  sitemapSize: 50000,
  changefreq: "weekly",
  priority: 0.7,
  exclude: ["/api/*", "/admin/*"],
};
