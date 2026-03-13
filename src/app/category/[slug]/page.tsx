import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import BreadcrumbNav from "@/components/BreadcrumbNav";
import AdSlot from "@/components/AdSlot";
import { generateMeta, buildBreadcrumbJsonLd } from "@/lib/seo";
import { DRUG_CATEGORIES } from "@/lib/constants";
import { getBrandDrugsWithGenericCounts } from "@/lib/queries";

export const revalidate = 86400; // OPTIMIZED: 24h ISR for fresh data

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return Object.keys(DRUG_CATEGORIES).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = DRUG_CATEGORIES[slug];
  if (!category) return {};

  return generateMeta({
    title: `${category.name} — Generic Alternatives`,
    description: `Browse FDA-approved ${category.name.toLowerCase()} and find generic alternatives. Compare ${category.keywords.slice(0, 3).join(", ")} and more.`,
    url: `/category/${slug}`,
  });
}

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params;
  const category = DRUG_CATEGORIES[slug];
  if (!category) notFound();

  const drugs = await getBrandDrugsWithGenericCounts(category.keywords);

  const breadcrumbs = [{ label: "Categories" }, { label: category.name }];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <BreadcrumbNav items={breadcrumbs} />

      <h1 className="text-3xl font-bold text-gray-900 mb-2">{category.name}</h1>
      <p className="text-gray-600 mb-8">
        {drugs.length} brand drugs in this category &mdash; find generic alternatives for each
      </p>

      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
        <div className="table-container">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-left">
                <th className="px-6 py-3 font-medium text-gray-600">Drug Name</th>
                <th className="px-6 py-3 font-medium text-gray-600">Active Ingredient</th>
                <th className="px-6 py-3 font-medium text-gray-600">Generic Available</th>
                <th className="px-6 py-3 font-medium text-gray-600"># Generics</th>
                <th className="px-6 py-3 font-medium text-gray-600">Manufacturer</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {drugs.map((drug) => (
                <tr key={drug.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-3">
                    <Link href={`/drug/${drug.slug}`} className="font-medium text-brand-600 hover:underline">
                      {drug.tradeName}
                    </Link>
                  </td>
                  <td className="px-6 py-3 text-gray-700">{drug.activeIngredient}</td>
                  <td className="px-6 py-3">
                    {drug.genericCount > 0 ? (
                      <span className="text-green-600 font-medium">Yes</span>
                    ) : (
                      <span className="text-red-600">No</span>
                    )}
                  </td>
                  <td className="px-6 py-3 text-gray-700">{drug.genericCount}</td>
                  <td className="px-6 py-3 text-gray-500 text-xs">{drug.applicant || "Unknown"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <AdSlot slot="below-content" format="horizontal" />

      {/* Related categories */}
      <div className="mt-8 bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
        <h2 className="font-semibold text-gray-900 mb-3">Browse Other Categories</h2>
        <div className="flex flex-wrap gap-2">
          {Object.entries(DRUG_CATEGORIES)
            .filter(([s]) => s !== slug)
            .map(([s, cat]) => (
              <Link
                key={s}
                href={`/category/${s}`}
                className="px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-700 hover:bg-brand-50 hover:border-brand-200 transition-colors"
              >
                {cat.name}
              </Link>
            ))}
        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            buildBreadcrumbJsonLd(breadcrumbs.map((b) => ({ name: b.label, url: `/category/${slug}` })))
          ),
        }}
      />
    </div>
  );
}
