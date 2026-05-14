import Link from "next/link";
import { generateMeta, buildWebPageJsonLd } from "@/lib/seo";

export const metadata = generateMeta({
  title: "Editorial Policy",
  description:
    "How GenericSwap sources, reviews, updates, and corrects drug information and educational guides.",
  url: "/editorial-policy",
});

export default function EditorialPolicyPage() {
  const pageJsonLd = buildWebPageJsonLd({
    title: "Editorial Policy",
    description:
      "GenericSwap sourcing, review, update, correction, and medical disclaimer standards.",
    url: "/editorial-policy",
  });

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">Editorial Policy</h1>
      <p className="text-gray-600 leading-relaxed mb-8">
        GenericSwap combines public FDA data with original educational explainers. This page
        describes how we keep the site useful, transparent, and clear about its limits.
      </p>

      <div className="space-y-8 text-sm text-gray-700 leading-relaxed">
        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Primary Data Sources</h2>
          <p>
            Drug product, therapeutic equivalence, patent, and exclusivity information is based on
            the FDA Orange Book and related public FDA resources. Where useful, guide pages link to
            the FDA, DailyMed, or another primary source so readers can verify important concepts.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Original Analysis</h2>
          <p>
            Our comparison pages organize FDA data into search results, category pages, patent
            timelines, substitution context, and plain-English explainers. We do not copy pharmacy
            advice from other publishers, and our guides are written to help patients ask better
            questions of pharmacists and prescribers.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Updates and Corrections</h2>
          <p>
            Database content is designed to refresh from FDA public data. Educational pages are
            reviewed when source material changes or when readers report an issue. To report a data
            correction, use the contact options on our{" "}
            <Link href="/contact" className="text-brand-600 hover:underline">
              contact page
            </Link>
            .
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Advertising and Affiliates</h2>
          <p>
            Advertising and affiliate relationships do not change FDA data, therapeutic equivalence
            labels, patent information, or guide conclusions. Sponsored placements, if added, should
            be visually distinguishable from publisher content.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Medical Limits</h2>
          <p>
            GenericSwap does not provide diagnosis, treatment, or medication-change instructions.
            The site is for informational research only. Medication decisions should be confirmed
            with a pharmacist, prescriber, or other qualified healthcare professional.
          </p>
        </section>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageJsonLd) }}
      />
    </div>
  );
}
