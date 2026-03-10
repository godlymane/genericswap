import { notFound } from "next/navigation";
import { Metadata } from "next";
import BreadcrumbNav from "@/components/BreadcrumbNav";
import DrugInfoCard from "@/components/DrugInfoCard";
import ComparisonTable from "@/components/ComparisonTable";
import PatentTimeline from "@/components/PatentTimeline";
import FAQSection, { generateDrugFAQs } from "@/components/FAQSection";
import AffiliateCTA from "@/components/AffiliateCTA";
import RelatedDrugs from "@/components/RelatedDrugs";
import AdSlot from "@/components/AdSlot";
import SwitchScore from "@/components/SwitchScore";
import NewsletterSignup from "@/components/NewsletterSignup";
import ScrollReveal from "@/components/ScrollReveal";
import { getDrugBySlug, getGenericEquivalents, getRelatedDrugs, getAllBrandDrugSlugs, countGenerics } from "@/lib/queries";
import { generateMeta, buildBreadcrumbJsonLd, buildFAQJsonLd, buildMedicalWebPageJsonLd } from "@/lib/seo";
import { calculateSwitchScore, estimateAnnualSavings } from "@/lib/scoring";
import { DRUG_CATEGORIES, SITE_NAME } from "@/lib/constants";

export const revalidate = 604800; // Weekly

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const drug = await getDrugBySlug(slug);
  if (!drug) return {};

  const generics = await getGenericEquivalents(drug.activeIngredient, drug.dosageForm, drug.route);

  return generateMeta({
    title: `Generic for ${drug.tradeName} (${drug.activeIngredient}) — ${generics.length} FDA-Approved Alternatives`,
    description: `Find all ${generics.length} FDA-approved generic alternatives for ${drug.tradeName} (${drug.activeIngredient.toLowerCase()}). Compare manufacturers, therapeutic equivalence ratings, and approval dates.`,
    url: `/drug/${slug}`,
  });
}

export async function generateStaticParams() {
  // All pages generated on-demand via ISR (Neon free tier can't handle concurrent build workers)
  return [];
}

export default async function DrugPage({ params }: PageProps) {
  const { slug } = await params;
  const drug = await getDrugBySlug(slug);
  if (!drug) notFound();

  const [generics, relatedDrugs, genericCount] = await Promise.all([
    getGenericEquivalents(drug.activeIngredient, drug.dosageForm, drug.route),
    getRelatedDrugs(drug.activeIngredient),
    countGenerics(drug.activeIngredient, drug.dosageForm, drug.route),
  ]);

  // Determine category for breadcrumb
  let categorySlug: string | undefined;
  let categoryName: string | undefined;
  for (const [cSlug, cat] of Object.entries(DRUG_CATEGORIES)) {
    if (cat.keywords.some((kw) => drug.activeIngredient.toLowerCase().includes(kw.toLowerCase()))) {
      categorySlug = cSlug;
      categoryName = cat.name;
      break;
    }
  }

  // First generic approval date
  const firstGenericDate =
    generics.length > 0 && generics[0].approvalDate
      ? new Date(generics[0].approvalDate)
      : null;

  // Check if any generics have AB rating
  const hasABRating = generics.some((g) => g.teCode?.startsWith("AB"));

  // Generate FAQ items
  const faqItems = generateDrugFAQs({
    tradeName: drug.tradeName,
    activeIngredient: drug.activeIngredient,
    genericCount: generics.length,
    firstGenericDate,
    hasABRating,
    applicant: drug.applicant,
  });

  // Check patent/exclusivity status
  const now = new Date();
  const allPatentsExpired = drug.patents.length === 0 || drug.patents.every(
    (p) => p.patentExpireDate && new Date(p.patentExpireDate) < now
  );
  const allExclusivitiesExpired = drug.exclusivities.length === 0 || drug.exclusivities.every(
    (e) => e.exclusivityDate && new Date(e.exclusivityDate) < now
  );

  // Calculate GenericSwap Score
  const switchScore = calculateSwitchScore({
    teCode: drug.teCode,
    genericCount,
    firstGenericApprovalDate: firstGenericDate,
    allPatentsExpired,
    allExclusivitiesExpired,
    isDiscontinued: drug.isDiscontinued,
  });

  const savings = estimateAnnualSavings(genericCount, false);

  // Breadcrumb items
  const breadcrumbs = [
    ...(categorySlug && categoryName
      ? [{ label: categoryName, href: `/category/${categorySlug}` }]
      : []),
    { label: drug.tradeName },
  ];

  // JSON-LD schemas
  const breadcrumbJsonLd = buildBreadcrumbJsonLd(
    breadcrumbs.map((b) => ({
      name: b.label,
      url: b.href || `/drug/${slug}`,
    }))
  );

  const faqJsonLd = buildFAQJsonLd(faqItems);

  const pageJsonLd = buildMedicalWebPageJsonLd({
    title: `Generic for ${drug.tradeName}`,
    description: `Find FDA-approved generic alternatives for ${drug.tradeName} (${drug.activeIngredient})`,
    url: `/drug/${slug}`,
    drugName: drug.tradeName,
    activeIngredient: drug.activeIngredient,
  });

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <BreadcrumbNav items={breadcrumbs} />

      {/* Page Title */}
      <div className="animate-fade-up">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
          Generic Alternatives for {drug.tradeName}
        </h1>
        <p className="text-gray-600 mb-8">
          {drug.activeIngredient}
          {drug.dosageForm && ` \u00b7 ${drug.dosageForm}`}
          {drug.route && ` \u00b7 ${drug.route}`}
        </p>
      </div>

      {/* Drug Info Card */}
      <ScrollReveal animation="fade-up" delay={0.1}>
        <DrugInfoCard
          tradeName={drug.tradeName}
          activeIngredient={drug.activeIngredient}
          applicant={drug.applicant}
          approvalDate={drug.approvalDate ? new Date(drug.approvalDate) : null}
          dosageForm={drug.dosageForm}
          route={drug.route}
          strength={drug.strength}
          teCode={drug.teCode}
          genericCount={generics.length}
          isDiscontinued={drug.isDiscontinued}
        />
      </ScrollReveal>

      {/* GenericSwap Score */}
      <div className="mt-8">
        <SwitchScore
          score={switchScore.score}
          grade={switchScore.grade}
          verdict={switchScore.verdict}
          color={switchScore.color}
          breakdown={switchScore.breakdown}
          savings={savings}
          drugName={drug.tradeName}
          genericCount={genericCount}
        />
      </div>

      {/* Ad Slot 1 */}
      <AdSlot id="ad-in-content-1" />

      {/* Generic Equivalents Table */}
      <ScrollReveal animation="fade-up" className="mt-8">
        {generics.length > 0 ? (
          <ComparisonTable
            generics={generics.map((g) => ({
              ...g,
              approvalDate: g.approvalDate ? new Date(g.approvalDate) : null,
            }))}
          />
        ) : (
          <div className="bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-200 rounded-2xl p-6">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center shrink-0">
                <svg className="w-5 h-5 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-amber-800">No Generic Available</h3>
                <p className="text-sm text-amber-700 mt-1">
                  There are currently no FDA-approved generic alternatives for {drug.tradeName}. This may
                  be due to active patent protection or market exclusivity. Check the patent timeline below
                  for more details.
                </p>
              </div>
            </div>
          </div>
        )}
      </ScrollReveal>

      {/* Patent Timeline */}
      <ScrollReveal animation="fade-up" className="mt-8">
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
      </ScrollReveal>

      {/* Ad Slot 2 */}
      <AdSlot id="ad-in-content-2" />

      {/* Affiliate CTA */}
      {generics.length > 0 && (
        <ScrollReveal animation="scale-in" className="mt-8">
          <AffiliateCTA
            activeIngredient={drug.activeIngredient}
            tradeName={drug.tradeName}
          />
        </ScrollReveal>
      )}

      {/* FAQ Section */}
      <ScrollReveal animation="fade-up" className="mt-8">
        <FAQSection items={faqItems} drugName={drug.tradeName} />
      </ScrollReveal>

      {/* Related Drugs */}
      {relatedDrugs.length > 0 && (
        <ScrollReveal animation="slide-left" className="mt-8">
          <RelatedDrugs
            drugs={relatedDrugs}
            currentDrug={drug.tradeName}
            categorySlug={categorySlug}
            categoryName={categoryName}
          />
        </ScrollReveal>
      )}

      {/* Newsletter Signup */}
      <ScrollReveal animation="fade-up" className="mt-8">
        <NewsletterSignup variant="card" />
      </ScrollReveal>

      {/* Ad Slot 3 */}
      <AdSlot id="ad-below-content" />

      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageJsonLd) }}
      />
    </div>
  );
}
