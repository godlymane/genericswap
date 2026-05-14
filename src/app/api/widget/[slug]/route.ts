import { NextRequest, NextResponse } from "next/server";
import { getDrugBySlug, countGenerics } from "@/lib/queries";
import { calculateSwitchScore, estimateAnnualSavings } from "@/lib/scoring";
import { SITE_URL } from "@/lib/constants";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const drug = await getDrugBySlug(slug);

  if (!drug) {
    return new NextResponse(
      renderWidget("Drug Not Found", "", 0, null, null),
      { headers: { "Content-Type": "text/html", "Cache-Control": "public, max-age=86400" } }
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

  const savings = estimateAnnualSavings(genericCount, false);

  return new NextResponse(
    renderWidget(drug.tradeName, drug.activeIngredient, genericCount, score, savings),
    {
      headers: {
        "Content-Type": "text/html",
        "Cache-Control": "public, max-age=86400",
        "X-Frame-Options": "ALLOWALL",
      },
    }
  );
}

function renderWidget(
  tradeName: string,
  activeIngredient: string,
  genericCount: number,
  score: { score: number; grade: string; verdict: string } | null,
  savings: { average: number; percentSaved: number } | null
) {
  const gradeColors: Record<string, string> = {
    "A+": "#10b981", A: "#22c55e", "B+": "#84cc16", B: "#eab308", C: "#f97316", D: "#ef4444", F: "#9ca3af",
  };
  const color = score ? gradeColors[score.grade] || "#9ca3af" : "#9ca3af";

  return `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:system-ui,-apple-system,sans-serif;background:#fff;color:#1f2937;padding:20px}
.card{border:1px solid #e5e7eb;border-radius:16px;overflow:hidden;max-width:400px}
.header{padding:16px 20px;border-bottom:1px solid #f3f4f6;display:flex;align-items:center;gap:12px}
.grade{width:48px;height:48px;border-radius:12px;display:flex;flex-direction:column;align-items:center;justify-content:center;color:#fff;font-weight:800;font-size:18px}
.grade small{font-size:9px;opacity:.8;font-weight:600}
.info h2{font-size:16px;font-weight:700;color:#111827}
.info p{font-size:12px;color:#6b7280;margin-top:2px}
.body{padding:16px 20px}
.stat{display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid #f9fafb;font-size:13px}
.stat:last-child{border:none}
.stat .label{color:#6b7280}
.stat .value{font-weight:600;color:#111827}
.savings{background:linear-gradient(135deg,#f0fdf4,#ecfdf5);border:1px solid #bbf7d0;border-radius:10px;padding:12px 16px;margin-top:12px;text-align:center}
.savings .amount{font-size:24px;font-weight:800;color:#15803d}
.savings .label{font-size:11px;color:#16a34a;margin-top:2px}
.footer{padding:10px 20px;background:#f9fafb;border-top:1px solid #f3f4f6;text-align:center}
.footer a{font-size:11px;color:#2563eb;text-decoration:none;font-weight:500}
.footer a:hover{text-decoration:underline}
</style>
</head>
<body>
<div class="card">
  <div class="header">
    ${score ? `<div class="grade" style="background:${color}"><span>${score.grade}</span><small>${score.score}/100</small></div>` : ""}
    <div class="info">
      <h2>${tradeName}</h2>
      <p>${activeIngredient}</p>
    </div>
  </div>
  <div class="body">
    <div class="stat"><span class="label">Generic Alternatives</span><span class="value">${genericCount}</span></div>
    ${score ? `<div class="stat"><span class="label">Switch Score</span><span class="value">${score.grade} (${score.score}/100)</span></div>` : ""}
    ${score ? `<div class="stat"><span class="label">Verdict</span><span class="value" style="font-size:11px;font-weight:400;max-width:200px;text-align:right">${score.verdict}</span></div>` : ""}
    ${savings && savings.average > 0 ? `<div class="savings"><div class="amount">$${savings.average.toLocaleString()}/yr</div><div class="label">Estimated savings (${savings.percentSaved}% vs brand)</div></div>` : ""}
  </div>
  <div class="footer">
    <a href="${SITE_URL}/drug/${tradeName.toLowerCase().replace(/\s+/g, "-")}" target="_blank" rel="noopener">
      View on GenericSwap →
    </a>
  </div>
</div>
</body>
</html>`;
}
