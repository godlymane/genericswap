import Link from "next/link";
import SearchBar from "@/components/SearchBar";
import SavedDrugsList from "@/components/SavedDrugsList";

// OPTIMIZED: Enhanced 404 with search, popular drugs, and saved drugs for retention
const POPULAR_DRUGS = [
  { name: "Lipitor", slug: "lipitor" },
  { name: "Synthroid", slug: "synthroid" },
  { name: "Metformin", slug: "metformin-hydrochloride" },
  { name: "Lisinopril", slug: "lisinopril" },
  { name: "Amlodipine", slug: "amlodipine-besylate" },
  { name: "Omeprazole", slug: "omeprazole" },
  { name: "Atorvastatin", slug: "atorvastatin-calcium" },
  { name: "Xanax", slug: "xanax" },
];

export default function NotFound() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-20 text-center">
      <h1 className="text-6xl font-bold text-gray-300 mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-gray-900 mb-3">Drug Not Found</h2>
      <p className="text-gray-600 mb-8">
        We couldn&apos;t find the page you&apos;re looking for. Try searching for a drug by brand
        name or active ingredient.
      </p>

      <div className="max-w-md mx-auto mb-8">
        <SearchBar size="large" />
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
        <Link
          href="/"
          className="inline-flex items-center justify-center px-6 py-2.5 bg-brand-600 text-white rounded-lg text-sm font-medium hover:bg-brand-700 transition-colors"
        >
          Go Home
        </Link>
        <Link
          href="/category/cholesterol"
          className="inline-flex items-center justify-center px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
        >
          Browse Categories
        </Link>
      </div>

      {/* OPTIMIZED: Popular drug suggestions to reduce bounce rate */}
      <div className="border-t border-gray-200 pt-8">
        <h3 className="text-sm font-medium text-gray-500 mb-3">Popular Drugs</h3>
        <div className="flex flex-wrap gap-2 justify-center">
          {POPULAR_DRUGS.map((d) => (
            <Link
              key={d.slug}
              href={`/drug/${d.slug}`}
              className="px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-700 hover:bg-gray-100 transition-colors"
            >
              {d.name}
            </Link>
          ))}
        </div>
      </div>

      <SavedDrugsList />
    </div>
  );
}
