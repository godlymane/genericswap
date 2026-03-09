/**
 * GenericSwap Score™ — proprietary switchability scoring algorithm.
 *
 * Factors:
 *  1. TE Code rating (AB = best, B-codes = risky)
 *  2. Number of approved generics (more = more competition = cheaper)
 *  3. How long generics have been on market (longer = more proven)
 *  4. Patent/exclusivity status (all expired = fully available)
 *  5. Discontinuation status
 *
 * Returns 0-100 score + letter grade + human-readable verdict.
 */

interface ScoreInput {
  teCode: string | null;
  genericCount: number;
  firstGenericApprovalDate: Date | null;
  allPatentsExpired: boolean;
  allExclusivitiesExpired: boolean;
  isDiscontinued: boolean;
}

interface ScoreResult {
  score: number;
  grade: "A+" | "A" | "B+" | "B" | "C" | "D" | "F";
  verdict: string;
  color: string;
  breakdown: {
    teRating: number;
    competition: number;
    marketMaturity: number;
    patentFreedom: number;
  };
}

// Estimated average brand vs generic savings by drug category
const AVERAGE_BRAND_PRICE_MONTHLY = 350; // USD rough median
const AVERAGE_GENERIC_PRICE_MONTHLY = 30; // USD rough median

export function calculateSwitchScore(input: ScoreInput): ScoreResult {
  const { teCode, genericCount, firstGenericApprovalDate, allPatentsExpired, allExclusivitiesExpired, isDiscontinued } = input;

  // Factor 1: TE Code (0-35 points)
  let teRating = 0;
  if (teCode) {
    const base = teCode.replace(/\d+$/, "");
    if (["AB", "AA", "AN", "AO", "AP", "AT"].includes(base)) {
      teRating = 35; // A-rated = full confidence
    } else if (base === "BC" || base === "BE" || base === "BP" || base === "BT") {
      teRating = 10; // B-rated with concerns
    } else if (base === "BD" || base === "BR") {
      teRating = 5; // Documented problems
    } else if (base === "BN" || base === "BS" || base === "BX") {
      teRating = 0; // No equivalence
    }
  }

  // Factor 2: Competition (0-25 points)
  let competition = 0;
  if (genericCount >= 10) competition = 25;
  else if (genericCount >= 5) competition = 20;
  else if (genericCount >= 3) competition = 16;
  else if (genericCount >= 2) competition = 12;
  else if (genericCount === 1) competition = 8;

  // Factor 3: Market maturity (0-20 points)
  let marketMaturity = 0;
  if (firstGenericApprovalDate) {
    const yearsOnMarket = (Date.now() - firstGenericApprovalDate.getTime()) / (365.25 * 24 * 60 * 60 * 1000);
    if (yearsOnMarket >= 10) marketMaturity = 20;
    else if (yearsOnMarket >= 5) marketMaturity = 16;
    else if (yearsOnMarket >= 3) marketMaturity = 12;
    else if (yearsOnMarket >= 1) marketMaturity = 8;
    else marketMaturity = 4;
  }

  // Factor 4: Patent freedom (0-20 points)
  let patentFreedom = 0;
  if (allPatentsExpired && allExclusivitiesExpired) {
    patentFreedom = 20;
  } else if (allPatentsExpired || allExclusivitiesExpired) {
    patentFreedom = 10;
  } else if (genericCount > 0) {
    patentFreedom = 5; // Some generics exist despite patents (paragraph IV challenges)
  }

  // Penalty for discontinued brand
  const discontinuedBonus = isDiscontinued && genericCount > 0 ? 0 : 0;

  let score = Math.min(100, teRating + competition + marketMaturity + patentFreedom + discontinuedBonus);

  // No generics at all = cap at 15
  if (genericCount === 0) score = Math.min(15, score);

  const grade = scoreToGrade(score);
  const verdict = scoreToVerdict(score, genericCount, teCode);
  const color = gradeToColor(grade);

  return {
    score,
    grade,
    verdict,
    color,
    breakdown: { teRating, competition, marketMaturity, patentFreedom },
  };
}

function scoreToGrade(score: number): ScoreResult["grade"] {
  if (score >= 90) return "A+";
  if (score >= 80) return "A";
  if (score >= 70) return "B+";
  if (score >= 55) return "B";
  if (score >= 35) return "C";
  if (score >= 20) return "D";
  return "F";
}

function scoreToVerdict(score: number, genericCount: number, teCode: string | null): string {
  if (score >= 90) return "Excellent candidate for generic switch. Multiple proven alternatives with strong FDA equivalence ratings.";
  if (score >= 80) return "Strong generic options available. Your pharmacist can likely substitute automatically.";
  if (score >= 70) return "Good generic alternatives exist. Discuss switching with your doctor.";
  if (score >= 55) return "Generic options available but limited. Consult your healthcare provider before switching.";
  if (score >= 35) return "Few generic options or potential bioequivalence concerns. Medical consultation recommended.";
  if (genericCount === 0) return "No FDA-approved generic currently available. Brand-name only.";
  return "Limited generic availability or significant bioequivalence concerns. Stick with your doctor's recommendation.";
}

function gradeToColor(grade: ScoreResult["grade"]): string {
  switch (grade) {
    case "A+": return "emerald";
    case "A": return "green";
    case "B+": return "lime";
    case "B": return "yellow";
    case "C": return "orange";
    case "D": return "red";
    case "F": return "gray";
  }
}

export function estimateAnnualSavings(genericCount: number, isSpecialty: boolean): {
  low: number;
  high: number;
  average: number;
  percentSaved: number;
} {
  if (genericCount === 0) return { low: 0, high: 0, average: 0, percentSaved: 0 };

  const brandMonthly = isSpecialty ? 1200 : AVERAGE_BRAND_PRICE_MONTHLY;
  const genericMonthly = isSpecialty ? 200 : AVERAGE_GENERIC_PRICE_MONTHLY;

  // More generics = more price competition
  const competitionFactor = Math.min(1, 0.6 + genericCount * 0.04);
  const adjustedGeneric = genericMonthly * (1 - (competitionFactor - 0.6));

  const monthlySavings = brandMonthly - adjustedGeneric;
  const annualLow = Math.round(monthlySavings * 12 * 0.7);
  const annualHigh = Math.round(monthlySavings * 12 * 1.3);
  const annualAvg = Math.round(monthlySavings * 12);
  const percentSaved = Math.round((monthlySavings / brandMonthly) * 100);

  return { low: annualLow, high: annualHigh, average: annualAvg, percentSaved };
}
