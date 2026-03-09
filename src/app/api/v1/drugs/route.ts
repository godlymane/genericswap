import { NextRequest } from "next/server";
import prisma from "@/lib/db";
import { validateApiKey, apiError, apiSuccess, corsHeaders } from "@/lib/api-helpers";

export async function OPTIONS() {
  return new Response(null, { status: 200, headers: corsHeaders() });
}

export async function GET(request: NextRequest) {
  const auth = await validateApiKey(request);
  if ("error" in auth && auth.error) return apiError(auth.error, auth.status!);

  const { searchParams } = request.nextUrl;
  const page = Math.max(1, parseInt(searchParams.get("page") || "1"));
  const limit = Math.min(100, Math.max(1, parseInt(searchParams.get("limit") || "20")));
  const type = searchParams.get("type"); // "brand" or "generic"

  const where = type === "brand"
    ? { applicationType: "N" as const }
    : type === "generic"
    ? { applicationType: "A" as const }
    : {};

  const [drugs, total] = await Promise.all([
    prisma.drug.findMany({
      where,
      select: {
        slug: true,
        tradeName: true,
        activeIngredient: true,
        dosageForm: true,
        route: true,
        strength: true,
        applicant: true,
        applicationType: true,
        teCode: true,
        approvalDate: true,
        isRLD: true,
        isDiscontinued: true,
      },
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { tradeName: "asc" },
    }),
    prisma.drug.count({ where }),
  ]);

  return apiSuccess(drugs, {
    page,
    limit,
    total,
    totalPages: Math.ceil(total / limit),
  });
}
