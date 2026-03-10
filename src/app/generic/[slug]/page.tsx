import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import BreadcrumbNav from "@/components/BreadcrumbNav";
import ScoreBadge from "@/components/ScoreBadge";
import AdSlot from "@/components/AdSlot";
import AffiliateCTA from "@/components/AffiliateCTA";
import { generateMeta, buildBreadcrumbJsonLd } from "@/lib/seo";
import prisma from "@/lib/db";

export const revalidate = 604800;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const ingredientSlug = decodeURIComponent(slug);

  // Find drugs matching this ingredient slug
  const drugs = await prisma.drug.findMany({
    where: {
      activeIngredient: { contains: ingredientSlug.replace(/-/g, " "),  },
    },
    take: 1,
  });

  if (drugs.length === 0) return {};

  const ingredient = drugs[0].activeIngredient;

  return generateMeta({
    title: `${ingredient} — All Brands & Generic Manufacturers`,
    description: `Find all FDA-approved brand and generic versions of ${ingredient.toLowerCase()}. Compare manufacturers, strengths, and therapeutic equivalence ratings.`,
    url: `/generic/${slug}`,
  });
}

export default async function GenericIngredientPage({ params }: PageProps) {
  const { slug } = await params;
  const searchTerm = decodeURIComponent(slug).replace(/-/g, " ");

  const drugs = await prisma.drug.findMany({
    where: {
      activeIngredient: { contains: searchTerm,  },
    },
    orderBy: [{ applicationType: "asc" }, { approvalDate: "asc" }],
  });

  if (drugs.length === 0) notFound();

  const ingredient = drugs[0].activeIngredient;
  const brandDrugs = drugs.filter((d) => d.applicationType === "N");
  const genericDrugs = drugs.filter((d) => d.applicationType === "A");
  const strengths = [...new Set(drugs.map((d) => d.strength).filter(Boolean))];
  const dosageForms = [...new Set(drugs.map((d) => d.dosageForm).filter(Boolean))];

  const breadcrumbs = [{ label: "Generics" }, { label: ingredient }];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <BreadcrumbNav items={breadcrumbs} />

      <h1 className="text-3xl font-bold text-gray-900 mb-2">{ingredient}</h1>
      <p className="text-gray-600 mb-8">
        {dosageForms.join(", ")} &mdash; {brandDrugs.length} brand{brandDrugs.length !== 1 ? "s" : ""}, {genericDrugs.length} generic manufacturer{genericDrugs.length !== 1 ? "s" : ""}
      </p>

      {/* Brand Reference */}
      {brandDrugs.length > 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8">
          <h2 className="font-semibold text-blue-900 mb-3">Brand Name Drug{brandDrugs.length > 1 ? "s" : ""}</h2>
          <div className="space-y-2">
            {brandDrugs.map((drug) => (
              <div key={drug.id} className="flex items-center justify-between">
                <Link href={`/drug/${drug.slug}`} className="text-blue-700 font-medium hover:underline">
                  {drug.tradeName}
                </Link>
                <span className="text-sm text-gray-500">
                  {drug.applicant} &mdash; {drug.isRLD ? "Reference Listed Drug" : "Brand"}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Affiliate CTA */}
      <AffiliateCTA activeIngredient={ingredient} tradeName={brandDrugs[0]?.tradeName || ingredient} />

      <AdSlot slot="in-content-1" />

      {/* Generic Manufacturers Table */}
      {genericDrugs.length > 0 && (
        <div className="mt-8 bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
          <div className="px-6 py-4 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900">
              Approved Generic Manufacturers ({genericDrugs.length})
            </h2>
          </div>
          <div className="table-container">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 text-left">
                  <th className="px-6 py-3 font-medium text-gray-600">Manufacturer</th>
                  <th className="px-6 py-3 font-medium text-gray-600">TE Code</th>
                  <th className="px-6 py-3 font-medium text-gray-600">Strength</th>
                  <th className="px-6 py-3 font-medium text-gray-600">Form</th>
                  <th className="px-6 py-3 font-medium text-gray-600">Approved</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {genericDrugs.map((g) => (
                  <tr key={g.id} className="hover:bg-gray-50">
                    <td className="px-6 py-3 font-medium text-gray-900">{g.applicant || "Unknown"}</td>
                    <td className="px-6 py-3"><ScoreBadge code={g.teCode} /></td>
                    <td className="px-6 py-3 text-gray-700">{g.strength || "N/A"}</td>
                    <td className="px-6 py-3 text-gray-700">{g.dosageForm || "N/A"}</td>
                    <td className="px-6 py-3 text-gray-700">
                      {g.approvalDate
                        ? new Date(g.approvalDate).toLocaleDateString("en-US", { month: "short", year: "numeric" })
                        : "Pre-1982"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Available Strengths */}
      {strengths.length > 0 && (
        <div className="mt-8 bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          <h3 className="font-semibold text-gray-900 mb-3">Available Strengths</h3>
          <div className="flex flex-wrap gap-2">
            {strengths.map((s) => (
              <span key={s} className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-700">
                {s}
              </span>
            ))}
          </div>
        </div>
      )}

      <AdSlot slot="below-content" format="horizontal" />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            buildBreadcrumbJsonLd(breadcrumbs.map((b) => ({ name: b.label, url: `/generic/${slug}` })))
          ),
        }}
      />
    </div>
  );
}
