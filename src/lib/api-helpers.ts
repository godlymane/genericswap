import { NextRequest, NextResponse } from "next/server";
import prisma from "./db";

// Rate limiting: simple in-memory store (use Redis in production)
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

type ApiKeyResult =
  | { error: string; status: number; key?: never }
  | { key: NonNullable<Awaited<ReturnType<typeof prisma.apiKey.findUnique>>>; error?: never; status?: never };

export async function validateApiKey(request: NextRequest): Promise<ApiKeyResult> {
  const authHeader = request.headers.get("authorization");
  const apiKey = authHeader?.replace("Bearer ", "") || request.nextUrl.searchParams.get("api_key");

  if (!apiKey) {
    return { error: "Missing API key. Include via Authorization: Bearer <key> header or ?api_key= param.", status: 401 };
  }

  const key = await prisma.apiKey.findUnique({ where: { key: apiKey } });
  if (!key || !key.active) {
    return { error: "Invalid or deactivated API key.", status: 403 };
  }

  // Simple rate limiting
  const now = Date.now();
  const windowMs = 3600000; // 1 hour
  const existing = rateLimitMap.get(apiKey);

  if (existing && existing.resetAt > now) {
    if (existing.count >= key.rateLimit) {
      return { error: `Rate limit exceeded. ${key.rateLimit} requests per hour.`, status: 429 };
    }
    existing.count++;
  } else {
    rateLimitMap.set(apiKey, { count: 1, resetAt: now + windowMs });
  }

  // Increment total request count
  await prisma.apiKey.update({
    where: { key: apiKey },
    data: { requests: { increment: 1 } },
  });

  return { key };
}

export function apiError(message: string, status: number) {
  return NextResponse.json({ error: message, status }, { status });
}

export function apiSuccess(data: unknown, meta?: Record<string, unknown>) {
  return NextResponse.json({ data, meta, status: 200 });
}

export function corsHeaders() {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, OPTIONS",
    "Access-Control-Allow-Headers": "Authorization, Content-Type",
  };
}
