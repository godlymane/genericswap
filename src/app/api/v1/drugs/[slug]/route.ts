import { NextRequest } from "next/server";
import { getDrugBySlug, getGenericEquivalents, countGenerics } from "@/lib/queries";
import { calculateSwitchScore, estimateAnnualSavings } from "@/lib/scoring";
import { validateApiKey, apiError, apiSuccess, corsHeaders } from "@/lib/api-helpers";

export async function OPTIONS() {
  return new Response(null, { status: 200, headers: corsHeaders() });
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const auth = await validateApiKey(request);
  if ("error" in auth && auth.error) return apiError(auth.error, auth.status!);

  const { slug } = await params;
  const drug = await getDrugBySlug(slug);

  if (!drug) {
    return apiError("Drug not found.", 404);
  }

  const generics = await getGenericEquivalents(drug.activeIngredient, drug.dosageForm, drug.route);
  const genericCount = generics.length;

  // Calculate switch score
  const firstGenericDate = generics.length > 0 && generics[0].approvalDate
    ? new Date(generics[0].approvalDate)
    : null;

  const allPatentsExpired = drug.patents.every(
    (p) => p.patentExpireDate && new Date(p.patentExpireDate) < new Date()
  );
  const allExclusivitiesExpired = drug.exclusivities.every(
    (e) => e.exclusivityDate && new Date(e.exclusivityDate) < new Date()
  );

  const score = calculateSwitchScore({
    teCode: drug.teCode,
    genericCount,
    firstGenericApprovalDate: firstGenericDate,
    allPatentsExpired: drug.patents.length === 0 || allPatentsExpired,
    allExclusivitiesExpired: drug.exclusivities.length === 0 || allExclusivitiesExpired,
    isDiscontinued: drug.isDiscontinued,
  });

  const savings = estimateAnnualSavings(genericCount, false);

  return apiSuccess({
    drug: {
      slug: drug.slug,
      tradeName: drug.tradeName,
      activeIngredient: drug.activeIngredient,
      dosageForm: drug.dosageForm,
      route: drug.route,
      strength: drug.strength,
      applicant: drug.applicant,
      applicationType: drug.applicationType,
      teCode: drug.teCode,
      approvalDate: drug.approvalDate,
      isRLD: drug.isRLD,
      isDiscontinued: drug.isDiscontinued,
    },
    switchScore: {
      score: score.score,
      grade: score.grade,
      verdict: score.verdict,
      breakdown: score.breakdown,
    },
    savings: {
      estimatedAnnualSavings: savings.average,
      savingsRange: { low: savings.low, high: savings.high },
      percentSaved: savings.percentSaved,
    },
    generics: generics.map((g) => ({
      tradeName: g.tradeName,
      applicant: g.applicant,
      teCode: g.teCode,
      approvalDate: g.approvalDate,
      strength: g.strength,
    })),
    patents: drug.patents.map((p) => ({
      patentNumber: p.patentNumber,
      expiryDate: p.patentExpireDate,
      useCode: p.patentUseCode,
    })),
    genericCount,
  });
}
