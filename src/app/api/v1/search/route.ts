import { NextRequest } from "next/server";
import { advancedSearch } from "@/lib/queries";
import { validateApiKey, apiError, apiSuccess, corsHeaders } from "@/lib/api-helpers";

export async function OPTIONS() {
  return new Response(null, { status: 200, headers: corsHeaders() });
}

export async function GET(request: NextRequest) {
  const auth = await validateApiKey(request);
  if ("error" in auth && auth.error) return apiError(auth.error, auth.status!);

  const { searchParams } = request.nextUrl;
  const q = searchParams.get("q");
  const dosageForm = searchParams.get("dosage_form") || undefined;
  const route = searchParams.get("route") || undefined;
  const teCode = searchParams.get("te_code") || undefined;
  const type = searchParams.get("type") || undefined; // N = brand, A = generic
  const limit = Math.min(100, Math.max(1, parseInt(searchParams.get("limit") || "20")));

  if (!q) {
    return apiError("Missing required 'q' query parameter.", 400);
  }

  const results = await advancedSearch({
    query: q,
    dosageForm,
    route,
    teCode,
    applicationType: type,
    limit,
  });

  return apiSuccess(
    results.map((d) => ({
      slug: d.slug,
      tradeName: d.tradeName,
      activeIngredient: d.activeIngredient,
      dosageForm: d.dosageForm,
      route: d.route,
      applicant: d.applicant,
      applicationType: d.applicationType,
      teCode: d.teCode,
      approvalDate: d.approvalDate,
    })),
    { query: q, count: results.length, limit }
  );
}
