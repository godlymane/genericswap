import Link from "next/link";
import SearchBar from "@/components/SearchBar";
import { SITE_NAME } from "@/lib/constants";

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

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
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
    </div>
  );
}
