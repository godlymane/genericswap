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
    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
      {categoryName && (
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Other {categoryName}
          {categorySlug && (
            <Link
              href={`/category/${categorySlug}`}
              className="text-sm font-normal text-brand-600 ml-2 hover:underline"
            >
              View all
            </Link>
          )}
        </h3>
      )}

      <div className="flex flex-wrap gap-2 mb-4">
        {drugs.map((drug) => (
          <Link
            key={drug.slug}
            href={`/drug/${drug.slug}`}
            className="px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-700 hover:bg-brand-50 hover:border-brand-200 hover:text-brand-700 transition-colors"
          >
            {drug.tradeName}
          </Link>
        ))}
      </div>

      {currentDrug && (
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-2">Compare:</h4>
          <div className="flex flex-wrap gap-2">
            {drugs.slice(0, 5).map((drug) => (
              <Link
                key={drug.slug}
                href={`/compare/${currentDrug.toLowerCase().replace(/\s+/g, "-")}-vs-${drug.tradeName.toLowerCase().replace(/\s+/g, "-")}`}
                className="px-3 py-1.5 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-700 hover:bg-blue-100 transition-colors"
              >
                {currentDrug} vs {drug.tradeName}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
