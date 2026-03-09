import { NextRequest, NextResponse } from "next/server";
import { searchDrugs } from "@/lib/queries";

export async function GET(request: NextRequest) {
  const q = request.nextUrl.searchParams.get("q");

  if (!q || q.length < 2) {
    return NextResponse.json({ results: [] });
  }

  const results = await searchDrugs(q, 10);

  return NextResponse.json({
    results: results.map((d) => ({
      slug: d.slug,
      tradeName: d.tradeName,
      activeIngredient: d.activeIngredient,
      applicationType: d.applicationType,
    })),
  });
}
