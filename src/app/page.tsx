import Link from "next/link";
import SearchBar from "@/components/SearchBar";
import NewsletterSignup from "@/components/NewsletterSignup";
import HeroCanvasWrapper from "@/components/HeroCanvasWrapper";
import { DRUG_CATEGORIES, POPULAR_DRUGS, SITE_NAME } from "@/lib/constants";
import { getPopularDrugs, getStats } from "@/lib/queries";
import { generateMeta } from "@/lib/seo";

export const revalidate = 86400; // Daily

export const metadata = generateMeta({
  title: `Find Generic Alternatives for Any Drug — ${SITE_NAME}`,
  description:
    "Search 35,000+ FDA-approved drugs. Find generic alternatives, compare therapeutic equivalence ratings, check patent timelines, and save on prescription costs.",
  url: "/",
});

export default async function HomePage() {
  const [popularDrugs, stats] = await Promise.all([
    getPopularDrugs(POPULAR_DRUGS),
    getStats(),
  ]);

  const categories = Object.entries(DRUG_CATEGORIES);

  return (
    <div>
      {/* Hero Section — Dark, immersive 3D */}
      <section className="relative bg-slate-950 overflow-hidden" style={{ minHeight: "85vh" }}>
        <HeroCanvasWrapper />

        {/* Gradient overlays for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/40 via-transparent to-slate-950/80 pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center justify-center min-h-[85vh] px-4 py-20">
          {/* Pill icon badge */}
          <div className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 backdrop-blur-sm mb-6">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-xs font-medium text-cyan-300 tracking-wide uppercase">
              FDA Orange Book Data &mdash; Updated Weekly
            </span>
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white text-center mb-6 leading-tight tracking-tight">
            Find Generic Alternatives
            <br />
            <span className="bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500 bg-clip-text text-transparent">
              for Any Drug
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-300 mb-10 max-w-2xl text-center leading-relaxed">
            Search {stats.totalDrugs.toLocaleString()} FDA-approved drugs. Compare generic options,
            check patent timelines, and save up to 85% on prescriptions.
          </p>

          {/* Search bar with glass effect */}
          <div className="w-full max-w-2xl">
            <SearchBar size="large" />
          </div>

          {/* Quick stats */}
          <div className="flex flex-wrap items-center justify-center gap-6 mt-10 text-sm">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-white">{stats.brandDrugs.toLocaleString()}</span>
              <span className="text-slate-400">Brand Drugs</span>
            </div>
            <div className="w-px h-6 bg-slate-700" />
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-cyan-400">{stats.genericDrugs.toLocaleString()}</span>
              <span className="text-slate-400">Generics</span>
            </div>
            <div className="w-px h-6 bg-slate-700" />
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-white">{stats.totalPatents.toLocaleString()}</span>
              <span className="text-slate-400">Active Patents</span>
            </div>
          </div>
        </div>

        {/* Bottom gradient fade into white */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent" />
      </section>

      {/* Popular Drugs */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Popular Drug Searches</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {popularDrugs.map((drug) => (
            <Link
              key={drug.slug}
              href={`/drug/${drug.slug}`}
              className="bg-white border border-gray-200 rounded-lg p-4 hover:border-brand-300 hover:shadow-sm transition-all group"
            >
              <p className="font-semibold text-gray-900 group-hover:text-brand-700 text-sm">
                {drug.tradeName}
              </p>
              <p className="text-xs text-gray-500 mt-1 truncate">{drug.activeIngredient}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Browse by Drug Category</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {categories.map(([slug, cat]) => (
            <Link
              key={slug}
              href={`/category/${slug}`}
              className="bg-white border border-gray-200 rounded-lg p-5 hover:border-brand-300 hover:shadow-sm transition-all group"
            >
              <h3 className="font-semibold text-gray-900 group-hover:text-brand-700">
                {cat.name}
              </h3>
              <p className="text-xs text-gray-500 mt-1">
                Includes: {cat.keywords.slice(0, 3).join(", ")}...
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* Explainer Section */}
      <section className="bg-white border-y border-gray-200 py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Understanding Generic Drugs
          </h2>

          <div className="space-y-6 text-gray-700 text-sm leading-relaxed">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">What is a generic drug?</h3>
              <p>
                A generic drug is a medication that has the same active ingredient, strength, dosage
                form, and route of administration as a brand-name drug. The FDA requires generic
                drugs to meet the same quality and performance standards as brand-name drugs. Generic
                drugs typically cost 80-85% less than their brand-name counterparts.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">
                What does &ldquo;AB-rated&rdquo; mean?
              </h3>
              <p>
                The FDA assigns therapeutic equivalence (TE) codes to drugs in the Orange Book. An
                &ldquo;AB&rdquo; rating means the generic has been demonstrated to be bioequivalent
                to the brand-name drug. Pharmacists can automatically substitute an AB-rated generic
                for the brand-name product without consulting the prescribing doctor.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">
                What is the FDA Orange Book?
              </h3>
              <p>
                The Orange Book, officially titled &ldquo;Approved Drug Products with Therapeutic
                Equivalence Evaluations,&rdquo; is a publication by the FDA that lists all approved
                prescription drug products, their therapeutic equivalence ratings, and patent/exclusivity
                information. GenericSwap uses this public data to help consumers find generic alternatives.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Tools & Resources */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Tools &amp; Resources</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <ToolCard
            href="/patent-cliffs"
            title="Patent Cliff Dashboard"
            description="Track upcoming patent expirations and new generic opportunities."
            icon="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
          />
          <ToolCard
            href="/trending"
            title="Trending Generics"
            description="Recently approved generics and drugs with expiring patents."
            icon="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
          />
          <ToolCard
            href="/state-laws"
            title="State Substitution Laws"
            description="Generic substitution rules for all 50 US states."
            icon="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm6.5-1.8l-1.5-1.5"
          />
          <ToolCard
            href="/search/advanced"
            title="Advanced Search"
            description="Filter by dosage form, route, TE code, and drug type."
            icon="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </div>
      </section>

      {/* Newsletter */}
      <section className="max-w-6xl mx-auto px-4 py-4 pb-12">
        <NewsletterSignup variant="banner" />
      </section>

      {/* Stats Bar */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <StatCard label="Total Drugs" value={stats.totalDrugs.toLocaleString()} />
          <StatCard label="Brand Drugs" value={stats.brandDrugs.toLocaleString()} />
          <StatCard label="Generic Drugs" value={stats.genericDrugs.toLocaleString()} />
          <StatCard label="Active Patents" value={stats.totalPatents.toLocaleString()} />
        </div>
      </section>

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: SITE_NAME,
            url: "https://genericswap.com",
            potentialAction: {
              "@type": "SearchAction",
              target: {
                "@type": "EntryPoint",
                urlTemplate: "https://genericswap.com/search?q={search_term_string}",
              },
              "query-input": "required name=search_term_string",
            },
          }),
        }}
      />
    </div>
  );
}

function ToolCard({ href, title, description, icon }: { href: string; title: string; description: string; icon: string }) {
  return (
    <Link
      href={href}
      className="bg-white border border-gray-200 rounded-xl p-5 hover:border-brand-300 hover:shadow-md transition-all group"
    >
      <div className="w-10 h-10 rounded-lg bg-brand-50 flex items-center justify-center mb-3 group-hover:bg-brand-100 transition-colors">
        <svg className="w-5 h-5 text-brand-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d={icon} />
        </svg>
      </div>
      <h3 className="font-semibold text-gray-900 group-hover:text-brand-700 text-sm">{title}</h3>
      <p className="text-xs text-gray-500 mt-1">{description}</p>
    </Link>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5">
      <p className="text-2xl font-bold text-brand-700">{value}</p>
      <p className="text-sm text-gray-500 mt-1">{label}</p>
    </div>
  );
}
