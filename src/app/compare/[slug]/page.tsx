import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import BreadcrumbNav from "@/components/BreadcrumbNav";
import DrugInfoCard from "@/components/DrugInfoCard";
import AdSlot from "@/components/AdSlot";
import AffiliateCTA from "@/components/AffiliateCTA";
import FAQSection from "@/components/FAQSection";
import { generateMeta, buildBreadcrumbJsonLd, buildFAQJsonLd } from "@/lib/seo";
import { SITE_NAME, SITE_URL } from "@/lib/constants";
import prisma from "@/lib/db";
import { countGenerics } from "@/lib/queries";

export const revalidate = 86400; // OPTIMIZED: 24h ISR for fresh data

interface PageProps {
  params: Promise<{ slug: string }>;
}

async function findDrugByName(name: string) {
  // Try exact trade name first, then active ingredient
  const byTrade = await prisma.drug.findFirst({
    where: { tradeName: name, isRLD: true },
  });
  if (byTrade) return byTrade;

  const byIngredient = await prisma.drug.findFirst({
    where: { activeIngredient: { contains: name }, applicationType: "N", isRLD: true },
  });
  if (byIngredient) return byIngredient;

  // Try generic
  const generic = await prisma.drug.findFirst({
    where: { activeIngredient: { contains: name }, applicationType: "A" },
  });
  return generic;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const parts = decodeURIComponent(slug).split("-vs-");
  if (parts.length !== 2) return {};

  const name1 = parts[0].replace(/-/g, " ");
  const name2 = parts[1].replace(/-/g, " ");

  return generateMeta({
    title: `${name1} vs ${name2} — Comparison`,
    description: `Compare ${name1} and ${name2}. See side-by-side differences in active ingredients, generic availability, therapeutic equivalence, and pricing.`,
    url: `/compare/${slug}`,
  });
}

export default async function ComparePage({ params }: PageProps) {
  const { slug } = await params;
  const parts = decodeURIComponent(slug).split("-vs-");
  if (parts.length !== 2) notFound();

  const name1 = parts[0].replace(/-/g, " ");
  const name2 = parts[1].replace(/-/g, " ");

  const [drug1, drug2] = await Promise.all([findDrugByName(name1), findDrugByName(name2)]);

  if (!drug1 || !drug2) notFound();

  const [count1, count2] = await Promise.all([
    countGenerics(drug1.activeIngredient, drug1.dosageForm, drug1.route),
    countGenerics(drug2.activeIngredient, drug2.dosageForm, drug2.route),
  ]);

  const isSameIngredient =
    drug1.activeIngredient.toLowerCase() === drug2.activeIngredient.toLowerCase();

  const breadcrumbs = [
    { label: "Compare" },
    { label: `${drug1.tradeName} vs ${drug2.tradeName}` },
  ];

  const faqItems = [
    {
      question: `What is the difference between ${drug1.tradeName} and ${drug2.tradeName}?`,
      answer: isSameIngredient
        ? `${drug1.tradeName} and ${drug2.tradeName} contain the same active ingredient (${drug1.activeIngredient}). ${drug1.tradeName} is the brand-name version manufactured by ${drug1.applicant || "the original manufacturer"}, while ${drug2.tradeName} is ${drug2.applicationType === "A" ? "a generic version" : `another brand manufactured by ${drug2.applicant || "a different manufacturer"}`}.`
        : `${drug1.tradeName} contains ${drug1.activeIngredient}, while ${drug2.tradeName} contains ${drug2.activeIngredient}. They are different medications that may be used for similar conditions.`,
    },
    {
      question: `Is ${drug2.tradeName} a generic for ${drug1.tradeName}?`,
      answer: isSameIngredient && drug2.applicationType === "A"
        ? `Yes, ${drug2.tradeName} (${drug2.activeIngredient}) is a generic equivalent of ${drug1.tradeName}.`
        : `No, ${drug2.tradeName} is not a generic version of ${drug1.tradeName}. They ${isSameIngredient ? "contain the same active ingredient but are marketed separately" : "contain different active ingredients"}.`,
    },
  ];

  const pageJsonLd = {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    name: `${drug1.tradeName} vs ${drug2.tradeName}`,
    description: `Compare ${drug1.tradeName} and ${drug2.tradeName} — side-by-side FDA data`,
    url: `${SITE_URL}/compare/${slug}`,
    about: [
      {
        "@type": "Drug",
        name: drug1.tradeName,
        activeIngredient: { "@type": "Substance", name: drug1.activeIngredient },
      },
      {
        "@type": "Drug",
        name: drug2.tradeName,
        activeIngredient: { "@type": "Substance", name: drug2.activeIngredient },
      },
    ],
    isPartOf: { "@type": "WebSite", name: SITE_NAME, url: SITE_URL },
    lastReviewed: new Date().toISOString().split("T")[0],
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <BreadcrumbNav items={breadcrumbs} />

      <h1 className="text-3xl font-bold text-gray-900 mb-2">
        {drug1.tradeName} vs {drug2.tradeName}
      </h1>
      <p className="text-gray-600 mb-8">Side-by-side comparison based on FDA Orange Book data</p>

      {/* Side-by-side cards */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div>
          <DrugInfoCard
            tradeName={drug1.tradeName}
            activeIngredient={drug1.activeIngredient}
            applicant={drug1.applicant}
            approvalDate={drug1.approvalDate ? new Date(drug1.approvalDate) : null}
            dosageForm={drug1.dosageForm}
            route={drug1.route}
            strength={drug1.strength}
            teCode={drug1.teCode}
            genericCount={count1}
            isDiscontinued={drug1.isDiscontinued}
          />
          <div className="mt-3 text-center">
            <Link href={`/drug/${drug1.slug}`} className="text-sm text-brand-600 hover:underline">
              View full {drug1.tradeName} page
            </Link>
          </div>
        </div>
        <div>
          <DrugInfoCard
            tradeName={drug2.tradeName}
            activeIngredient={drug2.activeIngredient}
            applicant={drug2.applicant}
            approvalDate={drug2.approvalDate ? new Date(drug2.approvalDate) : null}
            dosageForm={drug2.dosageForm}
            route={drug2.route}
            strength={drug2.strength}
            teCode={drug2.teCode}
            genericCount={count2}
            isDiscontinued={drug2.isDiscontinued}
          />
          <div className="mt-3 text-center">
            <Link href={`/drug/${drug2.slug}`} className="text-sm text-brand-600 hover:underline">
              View full {drug2.tradeName} page
            </Link>
          </div>
        </div>
      </div>

      <AdSlot slot="in-content-1" />

      {/* Key Differences */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm mt-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Key Differences</h2>
        <div className="table-container">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-2 text-gray-600 font-medium">Feature</th>
                <th className="text-left py-2 text-gray-600 font-medium">{drug1.tradeName}</th>
                <th className="text-left py-2 text-gray-600 font-medium">{drug2.tradeName}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              <CompareRow label="Active Ingredient" val1={drug1.activeIngredient} val2={drug2.activeIngredient} />
              <CompareRow label="Type" val1={drug1.applicationType === "N" ? "Brand" : "Generic"} val2={drug2.applicationType === "N" ? "Brand" : "Generic"} />
              <CompareRow label="Manufacturer" val1={drug1.applicant || "Unknown"} val2={drug2.applicant || "Unknown"} />
              <CompareRow label="Dosage Form" val1={drug1.dosageForm || "N/A"} val2={drug2.dosageForm || "N/A"} />
              <CompareRow label="Generics Available" val1={String(count1)} val2={String(count2)} />
              <CompareRow
                label="First Approved"
                val1={drug1.approvalDate ? new Date(drug1.approvalDate).getFullYear().toString() : "Pre-1982"}
                val2={drug2.approvalDate ? new Date(drug2.approvalDate).getFullYear().toString() : "Pre-1982"}
              />
            </tbody>
          </table>
        </div>
      </div>

      {/* Are They The Same? */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm mt-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-3">
          Are {drug1.tradeName} and {drug2.tradeName} the same?
        </h2>
        <p className="text-sm text-gray-700 leading-relaxed">
          {isSameIngredient
            ? `Yes, ${drug1.tradeName} and ${drug2.tradeName} both contain ${drug1.activeIngredient}. ${
                drug2.applicationType === "A"
                  ? `${drug2.tradeName} is a generic version that must meet the same FDA bioequivalence standards as ${drug1.tradeName}.`
                  : `Both are brand-name products made by different manufacturers.`
              }`
            : `No, ${drug1.tradeName} (${drug1.activeIngredient}) and ${drug2.tradeName} (${drug2.activeIngredient}) are different medications with different active ingredients. They should not be substituted for each other without consulting a healthcare provider.`}
        </p>
      </div>

      {/* OPTIMIZED: Internal links for SEO crawl depth */}
      <div className="mt-6 flex flex-wrap gap-3 text-sm">
        <Link
          href={`/generic/${drug1.activeIngredient.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]/g, "")}`}
          className="text-gray-500 hover:text-brand-600 hover:underline transition-colors"
        >
          All {drug1.activeIngredient} options &rarr;
        </Link>
        {drug1.activeIngredient !== drug2.activeIngredient && (
          <Link
            href={`/generic/${drug2.activeIngredient.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]/g, "")}`}
            className="text-gray-500 hover:text-brand-600 hover:underline transition-colors"
          >
            All {drug2.activeIngredient} options &rarr;
          </Link>
        )}
      </div>

      <AdSlot slot="in-content-2" />

      {/* Affiliate */}
      <div className="mt-8">
        <AffiliateCTA
          activeIngredient={drug1.activeIngredient}
          tradeName={drug1.tradeName}
        />
      </div>

      {/* FAQ */}
      <div className="mt-8">
        <FAQSection items={faqItems} drugName={`${drug1.tradeName} vs ${drug2.tradeName}`} />
      </div>

      <AdSlot slot="below-content" format="horizontal" />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(buildBreadcrumbJsonLd(
            breadcrumbs.map((b) => ({ name: b.label, url: `/compare/${slug}` }))
          )),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildFAQJsonLd(faqItems)) }}
      />
      {/* OPTIMIZED: MedicalWebPage structured data for compare pages */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageJsonLd) }}
      />
    </div>
  );
}

function CompareRow({ label, val1, val2 }: { label: string; val1: string; val2: string }) {
  const same = val1.toLowerCase() === val2.toLowerCase();
  return (
    <tr>
      <td className="py-2 text-gray-600 font-medium">{label}</td>
      <td className={`py-2 ${same ? "text-gray-700" : "text-gray-900 font-medium"}`}>{val1}</td>
      <td className={`py-2 ${same ? "text-gray-700" : "text-gray-900 font-medium"}`}>{val2}</td>
    </tr>
  );
}
