import { notFound } from "next/navigation";
import { Metadata } from "next";
import BreadcrumbNav from "@/components/BreadcrumbNav";
import PatentTimeline from "@/components/PatentTimeline";
import AdSlot from "@/components/AdSlot";
import { getDrugBySlug, getGenericEquivalents } from "@/lib/queries";
import { generateMeta, buildBreadcrumbJsonLd } from "@/lib/seo";
import { EXCLUSIVITY_CODES } from "@/lib/constants";
import Link from "next/link";

export const revalidate = 604800;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const drug = await getDrugBySlug(slug);
  if (!drug) return {};

  return generateMeta({
    title: `${drug.tradeName} Patent Expiry Date — When Does the Patent Expire?`,
    description: `${drug.tradeName} (${drug.activeIngredient}) patent expiration dates and exclusivity timeline. Find out when ${drug.tradeName} goes generic and cheaper alternatives become available.`,
    url: `/drug/${slug}/patent-expiry`,
  });
}

export default async function PatentExpiryPage({ params }: PageProps) {
  const { slug } = await params;
  const drug = await getDrugBySlug(slug);
  if (!drug) notFound();

  const generics = await getGenericEquivalents(drug.activeIngredient, drug.dosageForm, drug.route);
  const firstGenericDate = generics.length > 0 && generics[0].approvalDate ? new Date(generics[0].approvalDate) : null;

  const breadcrumbs = [
    { label: drug.tradeName, href: `/drug/${slug}` },
    { label: "Patent & Exclusivity" },
  ];

  const now = new Date();

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <BreadcrumbNav items={breadcrumbs} />

      <h1 className="text-3xl font-bold text-gray-900 mb-2">
        {drug.tradeName} Patent & Exclusivity Timeline
      </h1>
      <p className="text-gray-600 mb-8">
        {drug.activeIngredient} &mdash; {drug.patents.length} patent{drug.patents.length !== 1 ? "s" : ""}, {drug.exclusivities.length} exclusivit{drug.exclusivities.length !== 1 ? "ies" : "y"}
      </p>

      {/* Timeline Chart */}
      <PatentTimeline
        patents={drug.patents.map((p) => ({
          ...p,
          patentExpireDate: p.patentExpireDate ? new Date(p.patentExpireDate) : null,
        }))}
        exclusivities={drug.exclusivities.map((e) => ({
          ...e,
          exclusivityDate: e.exclusivityDate ? new Date(e.exclusivityDate) : null,
        }))}
        approvalDate={drug.approvalDate ? new Date(drug.approvalDate) : null}
        firstGenericDate={firstGenericDate}
        drugName={drug.tradeName}
      />

      <AdSlot slot="in-content-1" />

      {/* Patents Detail Table */}
      {drug.patents.length > 0 && (
        <div className="mt-8 bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
          <div className="px-6 py-4 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900">Patent Details</h2>
          </div>
          <div className="table-container">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 text-left">
                  <th className="px-6 py-3 font-medium text-gray-600">Patent Number</th>
                  <th className="px-6 py-3 font-medium text-gray-600">Expires</th>
                  <th className="px-6 py-3 font-medium text-gray-600">Type</th>
                  <th className="px-6 py-3 font-medium text-gray-600">Use Code</th>
                  <th className="px-6 py-3 font-medium text-gray-600">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {drug.patents.map((p) => {
                  const expDate = p.patentExpireDate ? new Date(p.patentExpireDate) : null;
                  const expired = expDate ? expDate < now : false;
                  return (
                    <tr key={p.id} className="hover:bg-gray-50">
                      <td className="px-6 py-3 font-mono text-gray-900">{p.patentNumber}</td>
                      <td className="px-6 py-3 text-gray-700">
                        {expDate?.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) || "N/A"}
                      </td>
                      <td className="px-6 py-3 text-gray-700">
                        {[p.drugSubstanceFlag && "Substance", p.drugProductFlag && "Product"].filter(Boolean).join(", ") || "N/A"}
                      </td>
                      <td className="px-6 py-3 text-gray-700">{p.patentUseCode || "N/A"}</td>
                      <td className="px-6 py-3">
                        {expired ? (
                          <span className="text-gray-500 text-xs font-medium">Expired</span>
                        ) : (
                          <span className="text-blue-600 text-xs font-medium">Active</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Exclusivities Detail */}
      {drug.exclusivities.length > 0 && (
        <div className="mt-8 bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
          <div className="px-6 py-4 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900">Exclusivity Periods</h2>
          </div>
          <div className="table-container">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 text-left">
                  <th className="px-6 py-3 font-medium text-gray-600">Code</th>
                  <th className="px-6 py-3 font-medium text-gray-600">Description</th>
                  <th className="px-6 py-3 font-medium text-gray-600">Expires</th>
                  <th className="px-6 py-3 font-medium text-gray-600">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {drug.exclusivities.map((e) => {
                  const exclDate = e.exclusivityDate ? new Date(e.exclusivityDate) : null;
                  const expired = exclDate ? exclDate < now : false;
                  return (
                    <tr key={e.id} className="hover:bg-gray-50">
                      <td className="px-6 py-3 font-mono text-gray-900">{e.exclusivityCode || "N/A"}</td>
                      <td className="px-6 py-3 text-gray-700">
                        {e.exclusivityCode ? EXCLUSIVITY_CODES[e.exclusivityCode] || e.exclusivityCode : "N/A"}
                      </td>
                      <td className="px-6 py-3 text-gray-700">
                        {exclDate?.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) || "N/A"}
                      </td>
                      <td className="px-6 py-3">
                        {expired ? (
                          <span className="text-gray-500 text-xs font-medium">Expired</span>
                        ) : (
                          <span className="text-yellow-600 text-xs font-medium">Active</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <div className="mt-8 text-center">
        <Link href={`/drug/${slug}`} className="text-brand-600 hover:underline text-sm font-medium">
          &larr; Back to {drug.tradeName} generics
        </Link>
      </div>

      <AdSlot slot="below-content" format="horizontal" />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            buildBreadcrumbJsonLd(breadcrumbs.map((b) => ({ name: b.label, url: b.href || `/drug/${slug}/patent-expiry` })))
          ),
        }}
      />
    </div>
  );
}
