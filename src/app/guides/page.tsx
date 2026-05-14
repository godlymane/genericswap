import Link from "next/link";
import { GUIDES } from "@/lib/guides";
import { generateMeta, buildWebPageJsonLd } from "@/lib/seo";

export const metadata = generateMeta({
  title: "Generic Drug Guides",
  description:
    "Original, pharmacist-friendly guides that explain generic substitution, FDA therapeutic equivalence ratings, patent expirations, and responsible prescription savings research.",
  url: "/guides",
});

export default function GuidesPage() {
  const pageJsonLd = buildWebPageJsonLd({
    title: "Generic Drug Guides",
    description:
      "Educational guides for understanding generic drugs, FDA Orange Book data, patent expirations, and prescription savings.",
    url: "/guides",
  });

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="max-w-3xl mb-10">
        <p className="text-sm font-semibold text-brand-600 uppercase tracking-wider mb-2">
          Learn
        </p>
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
          Generic Drug Guides
        </h1>
        <p className="text-gray-600 leading-relaxed">
          Use these guides to understand the public FDA data behind generic alternatives, what to
          ask at the pharmacy counter, and how to compare prescription savings without skipping the
          safety checks that belong with your care team.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        {GUIDES.map((guide) => (
          <Link
            key={guide.slug}
            href={`/guides/${guide.slug}`}
            className="group bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:border-brand-300 hover:shadow-md transition-all"
          >
            <div className="flex items-center justify-between gap-3 mb-4">
              <span className="text-xs font-semibold text-brand-700 bg-brand-50 px-2.5 py-1 rounded-full">
                {guide.category}
              </span>
              <span className="text-xs text-gray-400">{guide.readTime}</span>
            </div>
            <h2 className="text-xl font-bold text-gray-900 group-hover:text-brand-700 transition-colors">
              {guide.title}
            </h2>
            <p className="text-sm text-gray-600 leading-relaxed mt-3">{guide.description}</p>
            <div className="text-sm font-medium text-brand-600 mt-5">Read guide</div>
          </Link>
        ))}
      </div>

      <section className="mt-12 bg-blue-50 border border-blue-200 rounded-xl p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-2">How these guides are written</h2>
        <p className="text-sm text-gray-700 leading-relaxed">
          GenericSwap guides are original explainers based on public FDA resources and pharmacy
          substitution concepts. They are not medical advice and should be used to prepare better
          questions for a pharmacist, prescriber, or insurance plan.
        </p>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageJsonLd) }}
      />
    </div>
  );
}
