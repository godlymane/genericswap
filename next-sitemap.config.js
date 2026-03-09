/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || "https://genericswap.com",
  generateRobotsTxt: false, // We generate robots.ts via Next.js metadata API
  sitemapSize: 50000,
  changefreq: "weekly",
  priority: 0.7,
  exclude: ["/api/*", "/admin/*"],
};
