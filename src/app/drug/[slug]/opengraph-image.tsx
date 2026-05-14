import { ImageResponse } from "next/og";
import { getDrugBySlug, countGenerics } from "@/lib/queries";
import { calculateSwitchScore } from "@/lib/scoring";

export const runtime = "edge";
export const alt = "GenericSwap Drug Info";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const GRADE_COLORS: Record<string, string> = {
  "A+": "#10b981",
  A: "#22c55e",
  "B+": "#84cc16",
  B: "#eab308",
  C: "#f97316",
  D: "#ef4444",
  F: "#9ca3af",
};

export default async function OGImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const drug = await getDrugBySlug(slug);

  if (!drug) {
    return new ImageResponse(
      (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%", height: "100%", backgroundColor: "#1e40af", color: "white", fontSize: 48, fontWeight: 700 }}>
          GenericSwap
        </div>
      ),
      size
    );
  }

  const genericCount = await countGenerics(drug.activeIngredient, drug.dosageForm, drug.route);

  const score = calculateSwitchScore({
    teCode: drug.teCode,
    genericCount,
    firstGenericApprovalDate: null,
    allPatentsExpired: false,
    allExclusivitiesExpired: false,
    isDiscontinued: drug.isDiscontinued,
  });

  const gradeColor = GRADE_COLORS[score.grade] || "#9ca3af";

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "100%",
          backgroundColor: "#ffffff",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        {/* Top bar */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "32px 48px", backgroundColor: "#1e40af" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div style={{ width: 40, height: 40, borderRadius: 8, backgroundColor: "white", display: "flex", alignItems: "center", justifyContent: "center", color: "#1e40af", fontSize: 20, fontWeight: 800 }}>
              G
            </div>
            <span style={{ color: "white", fontSize: 24, fontWeight: 700 }}>GenericSwap</span>
          </div>
          <span style={{ color: "rgba(255,255,255,0.7)", fontSize: 16 }}>genericswap.vercel.app</span>
        </div>

        {/* Content */}
        <div style={{ display: "flex", flex: 1, padding: "48px", gap: "48px" }}>
          {/* Left */}
          <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
            <div style={{ fontSize: 14, color: "#6b7280", textTransform: "uppercase", letterSpacing: 2, marginBottom: 8 }}>
              Generic Alternatives for
            </div>
            <div style={{ fontSize: 52, fontWeight: 800, color: "#111827", lineHeight: 1.1, marginBottom: 16 }}>
              {drug.tradeName}
            </div>
            <div style={{ fontSize: 22, color: "#6b7280", marginBottom: 32 }}>
              {drug.activeIngredient}
              {drug.dosageForm ? ` · ${drug.dosageForm}` : ""}
            </div>

            {/* Stats */}
            <div style={{ display: "flex", gap: "24px" }}>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <span style={{ fontSize: 36, fontWeight: 800, color: "#1e40af" }}>{genericCount}</span>
                <span style={{ fontSize: 14, color: "#6b7280" }}>Generic{genericCount !== 1 ? "s" : ""} Available</span>
              </div>
              {drug.teCode && (
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <span style={{ fontSize: 36, fontWeight: 800, color: drug.teCode.startsWith("A") ? "#16a34a" : "#d97706" }}>{drug.teCode}</span>
                  <span style={{ fontSize: 14, color: "#6b7280" }}>TE Rating</span>
                </div>
              )}
            </div>
          </div>

          {/* Right - Score */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minWidth: 200 }}>
            <div
              style={{
                width: 160,
                height: 160,
                borderRadius: 32,
                backgroundColor: gradeColor,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                boxShadow: "0 20px 60px rgba(0,0,0,0.15)",
              }}
            >
              <span style={{ fontSize: 56, fontWeight: 900, lineHeight: 1 }}>{score.grade}</span>
              <span style={{ fontSize: 18, opacity: 0.8 }}>{score.score}/100</span>
            </div>
            <span style={{ fontSize: 14, color: "#6b7280", marginTop: 12, fontWeight: 600 }}>Switch Score</span>
          </div>
        </div>

        {/* Bottom */}
        <div style={{ padding: "16px 48px", backgroundColor: "#f9fafb", borderTop: "1px solid #e5e7eb", fontSize: 12, color: "#9ca3af", display: "flex", justifyContent: "space-between" }}>
          <span>Data from FDA Orange Book · Updated weekly</span>
          <span>Not medical advice · Consult your doctor</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
