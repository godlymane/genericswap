import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { rateLimit, rateLimitResponse } from "@/lib/rate-limit";

export async function POST(request: NextRequest) {
  // OPTIMIZED: Rate limit subscription API (5 requests/minute per IP)
  const ip = request.headers.get("x-forwarded-for") || "unknown";
  const rl = rateLimit(`subscribe:${ip}`, { limit: 5 });
  if (!rl.success) return rateLimitResponse();

  try {
    const body = await request.json();
    const { email, drugSlug, activeIngredient, alertType } = body;

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Valid email required." }, { status: 400 });
    }

    const validTypes = ["patent_expiry", "new_generic", "newsletter"];
    const type = validTypes.includes(alertType) ? alertType : "newsletter";

    // Upsert to handle re-subscriptions
    await prisma.subscriber.upsert({
      where: { email },
      update: {
        drugSlug: drugSlug || undefined,
        activeIngredient: activeIngredient || undefined,
        alertType: type,
      },
      create: {
        email,
        drugSlug: drugSlug || null,
        activeIngredient: activeIngredient || null,
        alertType: type,
      },
    });

    return NextResponse.json({
      message: "You're subscribed! We'll keep you updated.",
      success: true,
    });
  } catch (error) {
    console.error("Subscribe error:", error);
    return NextResponse.json({ error: "Failed to subscribe. Try again." }, { status: 500 });
  }
}
