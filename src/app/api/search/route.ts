import { NextRequest, NextResponse } from "next/server";
import { searchDrugs } from "@/lib/queries";
import { rateLimit, rateLimitResponse } from "@/lib/rate-limit";

export async function GET(request: NextRequest) {
  // OPTIMIZED: Rate limit public search API (30 requests/minute per IP)
  const ip = request.headers.get("x-forwarded-for") || "unknown";
  const rl = rateLimit(`search:${ip}`, { limit: 30 });
  if (!rl.success) return rateLimitResponse();

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
