import Link from "next/link";

interface RelatedDrug {
  slug: string;
  tradeName: string;
  activeIngredient: string;
}

export default function RelatedDrugs({
  drugs,
  currentDrug,
  categorySlug,
  categoryName,
}: {
  drugs: RelatedDrug[];
  currentDrug?: string;
  categorySlug?: string;
  categoryName?: string;
}) {
  if (drugs.length === 0) return null;

  return (
    <div className="relative overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-lg shadow-gray-100/50">
      {/* Header */}
      <div className="px-6 py-5 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-50 to-amber-50 border border-orange-100 flex items-center justify-center">
              <svg className="w-5 h-5 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900">
                {categoryName ? `Other ${categoryName}` : "Related Drugs"}
              </h3>
              <p className="text-sm text-gray-500">{drugs.length} related medications</p>
            </div>
          </div>
          {categorySlug && (
            <Link
              href={`/category/${categorySlug}`}
              className="text-sm font-medium text-brand-600 hover:text-brand-700 flex items-center gap-1 transition-colors"
            >
              View all
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </Link>
          )}
        </div>
      </div>

      <div className="p-6 space-y-5">
        {/* Drug pills */}
        <div className="flex flex-wrap gap-2">
          {drugs.map((drug) => (
            <Link
              key={drug.slug}
              href={`/drug/${drug.slug}`}
              className="group px-3.5 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-700 hover:bg-brand-50 hover:border-brand-200 hover:text-brand-700 hover:shadow-sm transition-all"
            >
              <span className="font-medium">{drug.tradeName}</span>
              <span className="text-xs text-gray-400 ml-1.5 group-hover:text-brand-500">
                {drug.activeIngredient}
              </span>
            </Link>
          ))}
        </div>

        {/* Compare section */}
        {currentDrug && (
          <div className="pt-4 border-t border-gray-100">
            <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
              </svg>
              Quick Compare
            </h4>
            <div className="flex flex-wrap gap-2">
              {drugs.slice(0, 5).map((drug) => (
                <Link
                  key={drug.slug}
                  href={`/compare/${currentDrug.toLowerCase().replace(/\s+/g, "-")}-vs-${drug.tradeName.toLowerCase().replace(/\s+/g, "-")}`}
                  className="group px-3.5 py-2 bg-blue-50 border border-blue-200 rounded-xl text-sm text-blue-700 hover:bg-blue-100 hover:shadow-sm transition-all flex items-center gap-1.5"
                >
                  <span className="font-medium">{currentDrug}</span>
                  <span className="text-blue-400 text-xs">vs</span>
                  <span className="font-medium">{drug.tradeName}</span>
                  <svg className="w-3 h-3 text-blue-400 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                  </svg>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
