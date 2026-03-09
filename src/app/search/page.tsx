import Link from "next/link";
import SearchBar from "@/components/SearchBar";
import ScoreBadge from "@/components/ScoreBadge";
import { searchDrugs } from "@/lib/queries";
import { generateMeta } from "@/lib/seo";

export const revalidate = 0; // Dynamic

interface PageProps {
  searchParams: Promise<{ q?: string }>;
}

export async function generateMetadata({ searchParams }: PageProps) {
  const { q } = await searchParams;
  if (!q) return generateMeta({ title: "Search Drugs", description: "Search the FDA Orange Book for any drug.", url: "/search" });

  return generateMeta({
    title: `Search results for "${q}"`,
    description: `Find FDA-approved drugs matching "${q}". View generic alternatives, manufacturers, and therapeutic equivalence ratings.`,
    url: `/search?q=${encodeURIComponent(q)}`,
    noindex: true,
  });
}

export default async function SearchPage({ searchParams }: PageProps) {
  const { q } = await searchParams;
  const results = q ? await searchDrugs(q, 50) : [];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Search Drugs</h1>

      <SearchBar />

      {q && (
        <div className="mt-8">
          <p className="text-sm text-gray-500 mb-4">
            {results.length} result{results.length !== 1 ? "s" : ""} for &ldquo;{q}&rdquo;
          </p>

          {results.length > 0 ? (
            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
              <div className="divide-y divide-gray-100">
                {results.map((drug) => (
                  <Link
                    key={drug.id}
                    href={`/drug/${drug.slug}`}
                    className="flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition-colors"
                  >
                    <div>
                      <p className="font-medium text-gray-900">{drug.tradeName}</p>
                      <p className="text-sm text-gray-500">
                        {drug.activeIngredient}
                        {drug.dosageForm && ` \u00b7 ${drug.dosageForm}`}
                        {drug.applicant && ` \u00b7 ${drug.applicant}`}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <ScoreBadge code={drug.teCode} showLabel={false} />
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full ${
                          drug.applicationType === "N"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-green-100 text-green-700"
                        }`}
                      >
                        {drug.applicationType === "N" ? "Brand" : "Generic"}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">No drugs found matching &ldquo;{q}&rdquo;.</p>
              <p className="text-sm text-gray-400 mt-2">Try searching by brand name or active ingredient.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
