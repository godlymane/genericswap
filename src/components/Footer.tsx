import Link from "next/link";
import { DRUG_CATEGORIES, SITE_NAME } from "@/lib/constants";

export default function Footer() {
  const categories = Object.entries(DRUG_CATEGORIES).slice(0, 12);

  return (
    <footer className="bg-gray-900 text-gray-300 mt-16">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <Link href="/" className="text-xl font-bold text-white">
              {SITE_NAME}
            </Link>
            <p className="mt-3 text-sm text-gray-400 leading-relaxed">
              Find FDA-approved generic alternatives for any brand-name drug. All data sourced from
              the FDA Orange Book.
            </p>
          </div>

          {/* Drug Categories */}
          <div>
            <h4 className="font-semibold text-white mb-3 text-sm uppercase tracking-wide">
              Drug Categories
            </h4>
            <ul className="space-y-2">
              {categories.slice(0, 6).map(([slug, cat]) => (
                <li key={slug}>
                  <Link
                    href={`/category/${slug}`}
                    className="text-sm hover:text-white transition-colors"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:mt-8">
            <ul className="space-y-2">
              {categories.slice(6, 12).map(([slug, cat]) => (
                <li key={slug}>
                  <Link
                    href={`/category/${slug}`}
                    className="text-sm hover:text-white transition-colors"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Tools & Info */}
          <div>
            <h4 className="font-semibold text-white mb-3 text-sm uppercase tracking-wide">
              Tools
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="/search/advanced" className="text-sm hover:text-white transition-colors">
                  Advanced Search
                </Link>
              </li>
              <li>
                <Link href="/patent-cliffs" className="text-sm hover:text-white transition-colors">
                  Patent Cliff Dashboard
                </Link>
              </li>
              <li>
                <Link href="/trending" className="text-sm hover:text-white transition-colors">
                  Trending Generics
                </Link>
              </li>
              <li>
                <Link href="/state-laws" className="text-sm hover:text-white transition-colors">
                  State Substitution Laws
                </Link>
              </li>
              <li>
                <Link href="/api-docs" className="text-sm hover:text-white transition-colors">
                  API Documentation
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-sm hover:text-white transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/disclaimer" className="text-sm hover:text-white transition-colors">
                  Disclaimer
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-sm hover:text-white transition-colors">
                  Privacy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-sm hover:text-white transition-colors">
                  Terms
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-500">
            &copy; {new Date().getFullYear()} {SITE_NAME}. All drug data from the FDA Orange Book
            (public domain).
          </p>
          <p className="text-xs text-gray-500">
            Not medical advice. Always consult your doctor or pharmacist.
          </p>
        </div>
      </div>
    </footer>
  );
}
