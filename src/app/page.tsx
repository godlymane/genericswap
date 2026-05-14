import Link from "next/link";
import SearchBar from "@/components/SearchBar";
import NewsletterSignup from "@/components/NewsletterSignup";
import HeroCanvasWrapper from "@/components/HeroCanvasWrapper";
import TypedDrugName from "@/components/TypedDrugName";
import HeroStats from "@/components/HeroStats";
import ScrollReveal from "@/components/ScrollReveal";
import TrustBadges from "@/components/TrustBadges";
import SocialProof from "@/components/SocialProof";
import { DRUG_CATEGORIES, POPULAR_DRUGS, SITE_NAME, SITE_URL } from "@/lib/constants";
import { GUIDES } from "@/lib/guides";
import { getPopularDrugs, getStats } from "@/lib/queries";
import { generateMeta } from "@/lib/seo";

export const revalidate = 86400; // Daily

export const metadata = generateMeta({
  title: `Find Generic Alternatives for Any Drug — ${SITE_NAME}`,
  description:
    "Search 35,000+ FDA-approved drugs. Find generic alternatives, compare therapeutic equivalence ratings, check patent timelines, and save on prescription costs.",
  url: "/",
});

const CATEGORY_ICONS: Record<string, string> = {
  "blood-pressure": "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z",
  cholesterol: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
  diabetes: "M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z",
  "pain-relief": "M13 10V3L4 14h7v7l9-11h-7z",
  antibiotics: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
  antidepressants: "M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
  "acid-reflux": "M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z",
  thyroid: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
  asthma: "M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z",
  "blood-thinners": "M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z",
  anxiety: "M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z",
  allergy: "M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z",
};

const CATEGORY_COLORS: Record<string, string> = {
  "blood-pressure": "from-red-500 to-rose-600",
  cholesterol: "from-amber-500 to-orange-600",
  diabetes: "from-violet-500 to-purple-600",
  "pain-relief": "from-yellow-500 to-amber-600",
  antibiotics: "from-emerald-500 to-green-600",
  antidepressants: "from-pink-500 to-rose-600",
  "acid-reflux": "from-lime-500 to-green-600",
  thyroid: "from-blue-500 to-indigo-600",
  asthma: "from-sky-500 to-cyan-600",
  "blood-thinners": "from-red-600 to-red-700",
  anxiety: "from-indigo-500 to-violet-600",
  allergy: "from-teal-500 to-cyan-600",
};

export default async function HomePage() {
  const [popularDrugs, stats] = await Promise.all([
    getPopularDrugs(POPULAR_DRUGS).catch(() => []),
    getStats().catch(() => ({ totalDrugs: 42000, brandDrugs: 6800, genericDrugs: 35400, totalPatents: 3600 })),
  ]);

  const categories = Object.entries(DRUG_CATEGORIES);

  return (
    <div>
      {/* ═══════════════════════════════════════════════
          HERO SECTION — Cinematic dark 3D
      ═══════════════════════════════════════════════ */}
      <section className="relative bg-slate-950 overflow-hidden" style={{ minHeight: "90vh" }}>
        <HeroCanvasWrapper />

        {/* Gradient overlays for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/50 via-transparent to-slate-950/90 pointer-events-none z-[1]" />
        {/* Subtle radial mesh */}
        <div className="absolute inset-0 gradient-mesh pointer-events-none z-[1]" />

        <div className="relative z-10 flex flex-col items-center justify-center min-h-[90vh] px-4 py-24">
          {/* Badge */}
          <div className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 backdrop-blur-sm mb-8 animate-fade-up">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-xs font-medium text-cyan-300 tracking-wide uppercase">
              FDA Orange Book Data &mdash; Updated Weekly
            </span>
          </div>

          {/* Main headline with typed animation */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-white text-center mb-6 leading-[1.1] tracking-tight animate-fade-up" style={{ animationDelay: "0.1s" }}>
            Find Generic Alternatives
            <br />
            <TypedDrugName />
          </h1>

          <p className="text-lg sm:text-xl text-slate-300 mb-10 max-w-2xl text-center leading-relaxed animate-fade-up" style={{ animationDelay: "0.2s" }}>
            Search {stats.totalDrugs.toLocaleString()} FDA-approved drugs. Compare generic options,
            check patent timelines, and save up to <span className="text-cyan-400 font-semibold">85%</span> on prescriptions.
          </p>

          {/* Search bar with glow */}
          <div className="w-full max-w-2xl animate-fade-up" style={{ animationDelay: "0.3s" }}>
            <SearchBar size="large" />
            <p className="text-center text-xs text-slate-500 mt-3">
              Try: <span className="text-slate-400">Lipitor</span>, <span className="text-slate-400">metformin</span>, <span className="text-slate-400">atorvastatin</span>, or press <kbd className="text-slate-400 bg-slate-800 px-1.5 py-0.5 rounded text-[10px] font-mono ml-0.5">⌘K</kbd>
            </p>
          </div>

          {/* Animated counter stats */}
          <HeroStats
            brandDrugs={stats.brandDrugs}
            genericDrugs={stats.genericDrugs}
            totalPatents={stats.totalPatents}
          />
        </div>

        {/* Bottom gradient fade */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-slate-950 to-transparent z-[2]" />
      </section>

      {/* ═══════════════════════════════════════════════
          HOW IT WORKS — Sticky horizontal steps
      ═══════════════════════════════════════════════ */}
      <section className="bg-slate-950 py-20 px-4 -mt-1">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal animation="slide-left">
            <p className="text-sm font-semibold text-cyan-400 uppercase tracking-wider mb-2">How It Works</p>
            <h2 className="text-3xl font-bold text-white mb-10 heading-underline">Three Simple Steps</h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <ScrollReveal delay={0.1}>
              <StepCard step="01" title="Search Your Drug" description="Enter any brand-name drug to find FDA-approved generic alternatives instantly." gradient="from-cyan-500 to-blue-500" />
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <StepCard step="02" title="Compare Options" description="View therapeutic equivalence ratings, patent timelines, and manufacturer details." gradient="from-blue-500 to-indigo-500" />
            </ScrollReveal>
            <ScrollReveal delay={0.3}>
              <StepCard step="03" title="Save Money" description="Switch to an AB-rated generic and save up to 85% on your prescriptions." gradient="from-indigo-500 to-violet-500" />
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Transition from dark to light */}
      <div className="h-24 bg-gradient-to-b from-slate-950 to-gray-50" />

      {/* ═══════════════════════════════════════════════
          POPULAR DRUGS
      ═══════════════════════════════════════════════ */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <ScrollReveal>
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-sm font-semibold text-brand-600 uppercase tracking-wider mb-1">Most Searched</p>
              <h2 className="text-3xl font-bold text-gray-900">Popular Drugs</h2>
            </div>
            <Link href="/search" className="text-sm text-brand-600 hover:text-brand-700 font-medium flex items-center gap-1 group">
              View all
              <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </ScrollReveal>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {popularDrugs.map((drug, i) => (
            <ScrollReveal key={drug.slug} delay={0.03 * i}>
              <Link
                href={`/drug/${drug.slug}`}
                className="group relative bg-white rounded-xl p-4 border border-gray-200/80 hover:border-brand-300 hover:shadow-lg hover:shadow-brand-500/5 transition-all duration-300 hover:-translate-y-1 block"
              >
                <div className="absolute top-0 left-4 right-4 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-b opacity-0 group-hover:opacity-100 transition-opacity" />
                <p className="font-semibold text-gray-900 group-hover:text-brand-700 text-sm transition-colors">
                  {drug.tradeName}
                </p>
                <p className="text-xs text-gray-500 mt-1 truncate">{drug.activeIngredient}</p>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          DRUG CATEGORIES — Colorful grid
      ═══════════════════════════════════════════════ */}
      <section className="bg-gray-50 gradient-mesh py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-12">
              <p className="text-sm font-semibold text-brand-600 uppercase tracking-wider mb-1">Browse</p>
              <h2 className="text-3xl font-bold text-gray-900">Drug Categories</h2>
              <p className="text-gray-500 mt-3 max-w-lg mx-auto">
                Explore generic alternatives organized by therapeutic area
              </p>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {categories.map(([slug, cat], i) => (
              <ScrollReveal key={slug} delay={0.05 * i}>
                <Link
                  href={`/category/${slug}`}
                  className="group relative bg-white rounded-xl p-5 border border-gray-200/80 hover:shadow-xl hover:shadow-gray-200/50 transition-all duration-300 hover:-translate-y-1 overflow-hidden block"
                >
                  {/* Gradient accent bar */}
                  <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${CATEGORY_COLORS[slug] || "from-brand-400 to-brand-600"} opacity-60 group-hover:opacity-100 transition-opacity`} />

                  <div className="flex items-start gap-3">
                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${CATEGORY_COLORS[slug] || "from-brand-400 to-brand-600"} flex items-center justify-center shrink-0 shadow-sm group-hover:scale-110 transition-transform duration-300`}>
                      <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d={CATEGORY_ICONS[slug] || "M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"} />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 group-hover:text-brand-700 transition-colors text-sm">
                        {cat.name}
                      </h3>
                      <p className="text-xs text-gray-400 mt-1">
                        {cat.keywords.slice(0, 3).join(", ")}...
                      </p>
                    </div>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          TOOLS & RESOURCES — Dark section with glass cards
      ═══════════════════════════════════════════════ */}
      <section className="bg-slate-900 py-20 px-4 relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-cyan-500/5 blur-3xl pointer-events-none" />
        <div className="max-w-6xl mx-auto relative">
          <ScrollReveal animation="slide-left">
            <div className="text-center mb-12">
              <p className="text-sm font-semibold text-cyan-400 uppercase tracking-wider mb-1">Explore</p>
              <h2 className="text-3xl font-bold text-white">Tools &amp; Resources</h2>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <ScrollReveal delay={0.1}>
              <ToolCard href="/patent-cliffs" title="Patent Cliff Dashboard" description="Track upcoming patent expirations and new generic opportunities." icon="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" gradient="from-cyan-500 to-blue-500" />
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <ToolCard href="/trending" title="Trending Generics" description="Recently approved generics and drugs with expiring patents." icon="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" gradient="from-green-500 to-emerald-500" />
            </ScrollReveal>
            <ScrollReveal delay={0.3}>
              <ToolCard href="/state-laws" title="State Substitution Laws" description="Generic substitution rules for all 50 US states." icon="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm6.5-1.8l-1.5-1.5" gradient="from-amber-500 to-orange-500" />
            </ScrollReveal>
            <ScrollReveal delay={0.4}>
              <ToolCard href="/search/advanced" title="Advanced Search" description="Filter by dosage form, route, TE code, and drug type." icon="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" gradient="from-violet-500 to-purple-500" />
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          EXPLAINER SECTION
      ═══════════════════════════════════════════════ */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal animation="slide-left">
            <div className="text-center mb-12">
              <p className="text-sm font-semibold text-brand-600 uppercase tracking-wider mb-1">Learn</p>
              <h2 className="text-3xl font-bold text-gray-900">Understanding Generic Drugs</h2>
            </div>
          </ScrollReveal>

          <div className="grid gap-4">
            <ScrollReveal delay={0.1}>
              <ExplainerCard
                question="What is a generic drug?"
                answer="A generic drug has the same active ingredient, strength, dosage form, and route of administration as a brand-name drug. The FDA requires generics to meet the same quality and performance standards. Generic drugs typically cost 80-85% less than their brand-name counterparts."
                icon="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
              />
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <ExplainerCard
                question='What does "AB-rated" mean?'
                answer='The FDA assigns therapeutic equivalence (TE) codes to drugs in the Orange Book. An "AB" rating means the generic has been demonstrated to be bioequivalent to the brand-name drug. Pharmacists can automatically substitute an AB-rated generic for the brand-name product without consulting the prescribing doctor.'
                icon="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
              />
            </ScrollReveal>
            <ScrollReveal delay={0.3}>
              <ExplainerCard
                question="What is the FDA Orange Book?"
                answer='The Orange Book, officially titled "Approved Drug Products with Therapeutic Equivalence Evaluations," is a publication by the FDA that lists all approved prescription drug products, their therapeutic equivalence ratings, and patent/exclusivity information. GenericSwap uses this public data to help consumers find generic alternatives.'
                icon="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          SOCIAL PROOF — Stats + Testimonials
      ═══════════════════════════════════════════════ */}
      <section className="bg-gray-50 py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <div className="flex items-end justify-between gap-4 mb-8">
              <div>
                <p className="text-sm font-semibold text-brand-600 uppercase tracking-wider mb-1">
                  Guides
                </p>
                <h2 className="text-3xl font-bold text-gray-900">Learn Before You Switch</h2>
                <p className="text-gray-500 mt-3 max-w-2xl">
                  Original explainers for reading FDA data, understanding therapeutic equivalence,
                  and preparing smarter questions for your pharmacist.
                </p>
              </div>
              <Link
                href="/guides"
                className="hidden sm:flex text-sm text-brand-600 hover:text-brand-700 font-medium items-center gap-1 group"
              >
                View guides
                <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {GUIDES.slice(0, 3).map((guide, i) => (
              <ScrollReveal key={guide.slug} delay={0.08 * i}>
                <Link
                  href={`/guides/${guide.slug}`}
                  className="group block h-full bg-white border border-gray-200 rounded-xl p-6 hover:border-brand-300 hover:shadow-lg transition-all"
                >
                  <span className="text-xs font-semibold text-brand-700 bg-brand-50 px-2.5 py-1 rounded-full">
                    {guide.category}
                  </span>
                  <h3 className="text-lg font-bold text-gray-900 group-hover:text-brand-700 transition-colors mt-4">
                    {guide.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed mt-3">{guide.description}</p>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 py-16">
        <ScrollReveal>
          <SocialProof />
        </ScrollReveal>
      </section>

      {/* ═══════════════════════════════════════════════
          TRUST BADGES — Data sources & credentials
      ═══════════════════════════════════════════════ */}
      <section className="max-w-5xl mx-auto px-4 pb-16">
        <ScrollReveal animation="fade-up">
          <TrustBadges />
        </ScrollReveal>
      </section>

      {/* ═══════════════════════════════════════════════
          NEWSLETTER
      ═══════════════════════════════════════════════ */}
      <section className="max-w-4xl mx-auto px-4 py-16">
        <ScrollReveal>
          <NewsletterSignup variant="banner" />
        </ScrollReveal>
      </section>

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: SITE_NAME,
            url: SITE_URL,
            potentialAction: {
              "@type": "SearchAction",
              target: {
                "@type": "EntryPoint",
                urlTemplate: `${SITE_URL}/search?q={search_term_string}`,
              },
              "query-input": "required name=search_term_string",
            },
          }),
        }}
      />
    </div>
  );
}

/* ──────────────────────────────────────────────
   Sub-components
────────────────────────────────────────────── */

function StepCard({ step, title, description, gradient }: { step: string; title: string; description: string; gradient: string }) {
  return (
    <div className="relative group h-full">
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 backdrop-blur-sm hover:border-slate-600 transition-all duration-300 hover:-translate-y-1 h-full">
        <span className={`text-xs font-bold bg-gradient-to-r ${gradient} bg-clip-text text-transparent uppercase tracking-widest`}>
          Step {step}
        </span>
        <h3 className="text-lg font-bold text-white mt-3">{title}</h3>
        <p className="text-sm text-slate-400 mt-2 leading-relaxed">{description}</p>
        <div className={`absolute bottom-0 left-6 right-6 h-0.5 bg-gradient-to-r ${gradient} opacity-0 group-hover:opacity-100 transition-opacity rounded-t`} />
      </div>
    </div>
  );
}

function ToolCard({ href, title, description, icon, gradient }: { href: string; title: string; description: string; icon: string; gradient: string }) {
  return (
    <Link
      href={href}
      className="group relative glass-card rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 hover:-translate-y-1 block"
    >
      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center mb-4 shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300`}>
        <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d={icon} />
        </svg>
      </div>
      <h3 className="font-bold text-white text-sm group-hover:text-cyan-300 transition-colors">{title}</h3>
      <p className="text-xs text-slate-400 mt-2 leading-relaxed">{description}</p>
      <div className="flex items-center gap-1 mt-4 text-xs text-cyan-400 opacity-0 group-hover:opacity-100 transition-all translate-x-0 group-hover:translate-x-1">
        Explore
        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </Link>
  );
}

function ExplainerCard({ question, answer, icon }: { question: string; answer: string; icon: string }) {
  return (
    <details className="group bg-gray-50 rounded-xl border border-gray-100 overflow-hidden hover:border-gray-200 transition-colors">
      <summary className="flex items-center gap-4 p-6 cursor-pointer select-none">
        <div className="w-10 h-10 rounded-lg bg-brand-50 flex items-center justify-center shrink-0 group-hover:bg-brand-100 transition-colors">
          <svg className="w-5 h-5 text-brand-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d={icon} />
          </svg>
        </div>
        <h3 className="font-bold text-gray-900 flex-1">{question}</h3>
        <svg className="faq-chevron w-5 h-5 text-gray-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </summary>
      <div className="px-6 pb-6 pl-20 text-sm text-gray-600 leading-relaxed -mt-2">{answer}</div>
    </details>
  );
}

