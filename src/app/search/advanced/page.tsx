import Link from "next/link";
import ScoreBadge from "@/components/ScoreBadge";
import AdvancedSearchForm from "@/components/AdvancedSearchForm";
import { advancedSearch, getUniqueDosageForms, getUniqueRoutes } from "@/lib/queries";
import { generateMeta } from "@/lib/seo";

export const revalidate = 0; // Dynamic

export const metadata = generateMeta({
  title: "Advanced Drug Search — Filter by Dosage, Route, TE Code",
  description:
    "Search the FDA Orange Book with advanced filters. Filter drugs by dosage form, route of administration, therapeutic equivalence code, and more.",
  url: "/search/advanced",
});

interface PageProps {
  searchParams: Promise<{
    q?: string;
    dosage_form?: string;
    route?: string;
    te_code?: string;
    type?: string;
  }>;
}

export default async function AdvancedSearchPage({ searchParams }: PageProps) {
  const sp = await searchParams;
  const hasFilters = sp.q || sp.dosage_form || sp.route || sp.te_code || sp.type;

  const [results, dosageForms, routes] = await Promise.all([
    hasFilters
      ? advancedSearch({
          query: sp.q || undefined,
          dosageForm: sp.dosage_form || undefined,
          route: sp.route || undefined,
          teCode: sp.te_code || undefined,
          applicationType: sp.type || undefined,
          limit: 50,
        })
      : Promise.resolve([]),
    getUniqueDosageForms(),
    getUniqueRoutes(),
  ]);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Advanced Drug Search</h1>
      <p className="text-gray-600 mb-6">
        Filter drugs by dosage form, route, TE code, and type using FDA Orange Book data.
      </p>

      {/* Search Form */}
      <AdvancedSearchForm
        dosageForms={dosageForms}
        routes={routes}
        currentFilters={sp}
      />

      {/* Results */}
      {hasFilters && (
        <div className="mt-8">
          <p className="text-sm text-gray-500 mb-4">
            {results.length} result{results.length !== 1 ? "s" : ""} found
          </p>

          {results.length > 0 ? (
            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-50 text-left">
                      <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Drug Name</th>
                      <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Active Ingredient</th>
                      <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase hidden sm:table-cell">Form</th>
                      <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase hidden md:table-cell">Route</th>
                      <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">TE Code</th>
                      <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Type</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {results.map((drug) => (
                      <tr key={drug.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4">
                          <Link
                            href={`/drug/${drug.slug}`}
                            className="font-medium text-brand-700 hover:underline"
                          >
                            {drug.tradeName}
                          </Link>
                        </td>
                        <td className="px-6 py-4 text-gray-600">{drug.activeIngredient}</td>
                        <td className="px-6 py-4 text-gray-600 hidden sm:table-cell">{drug.dosageForm || "—"}</td>
                        <td className="px-6 py-4 text-gray-600 hidden md:table-cell">{drug.route || "—"}</td>
                        <td className="px-6 py-4">
                          <ScoreBadge code={drug.teCode} showLabel={false} />
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`text-xs px-2 py-0.5 rounded-full ${
                              drug.applicationType === "N"
                                ? "bg-blue-100 text-blue-700"
                                : "bg-green-100 text-green-700"
                            }`}
                          >
                            {drug.applicationType === "N" ? "Brand" : "Generic"}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">No drugs found matching your filters.</p>
              <p className="text-sm text-gray-400 mt-2">Try broadening your search criteria.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
