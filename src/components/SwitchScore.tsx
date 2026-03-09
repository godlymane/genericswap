"use client";

import { useState } from "react";

interface SwitchScoreProps {
  score: number;
  grade: string;
  verdict: string;
  color: string;
  breakdown: {
    teRating: number;
    competition: number;
    marketMaturity: number;
    patentFreedom: number;
  };
  savings: {
    low: number;
    high: number;
    average: number;
    percentSaved: number;
  };
  drugName: string;
  genericCount: number;
}

const GRADE_STYLES: Record<string, string> = {
  "A+": "from-emerald-500 to-emerald-600 shadow-emerald-200",
  A: "from-green-500 to-green-600 shadow-green-200",
  "B+": "from-lime-500 to-lime-600 shadow-lime-200",
  B: "from-yellow-500 to-yellow-600 shadow-yellow-200",
  C: "from-orange-500 to-orange-600 shadow-orange-200",
  D: "from-red-500 to-red-600 shadow-red-200",
  F: "from-gray-400 to-gray-500 shadow-gray-200",
};

export default function SwitchScore({
  score,
  grade,
  verdict,
  color,
  breakdown,
  savings,
  drugName,
  genericCount,
}: SwitchScoreProps) {
  const [showBreakdown, setShowBreakdown] = useState(false);
  const gradientClass = GRADE_STYLES[grade] || GRADE_STYLES.F;

  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
      <div className="p-6">
        <div className="flex items-start gap-6">
          {/* Score Circle */}
          <div className="flex-shrink-0">
            <div
              className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${gradientClass} shadow-lg flex flex-col items-center justify-center text-white`}
            >
              <span className="text-2xl font-black leading-none">{grade}</span>
              <span className="text-[10px] font-medium opacity-80">{score}/100</span>
            </div>
          </div>

          {/* Score Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-lg font-bold text-gray-900">GenericSwap Score</h3>
              <span className="text-[10px] text-gray-400 font-medium tracking-wider">TM</span>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">{verdict}</p>

            {/* Score Bar */}
            <div className="mt-3 h-2 bg-gray-100 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full bg-gradient-to-r ${gradientClass} transition-all duration-1000`}
                style={{ width: `${score}%` }}
              />
            </div>
            <div className="flex justify-between text-[10px] text-gray-400 mt-1">
              <span>Low switchability</span>
              <span>High switchability</span>
            </div>
          </div>
        </div>

        {/* Savings Estimate */}
        {savings.average > 0 && (
          <div className="mt-5 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-green-800 uppercase tracking-wide">
                  Estimated Annual Savings
                </p>
                <p className="text-2xl font-black text-green-700 mt-0.5">
                  ${savings.average.toLocaleString()}
                  <span className="text-sm font-medium text-green-600">/yr</span>
                </p>
                <p className="text-xs text-green-600 mt-0.5">
                  ${savings.low.toLocaleString()} &mdash; ${savings.high.toLocaleString()} range &middot; {savings.percentSaved}% saved vs brand
                </p>
              </div>
              <div className="text-right">
                <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center">
                  <span className="text-xl font-bold text-green-700">{savings.percentSaved}%</span>
                </div>
                <p className="text-[10px] text-green-600 mt-1">savings</p>
              </div>
            </div>
          </div>
        )}

        {/* Breakdown Toggle */}
        <button
          onClick={() => setShowBreakdown(!showBreakdown)}
          className="mt-4 text-sm text-brand-600 hover:text-brand-700 font-medium flex items-center gap-1"
        >
          {showBreakdown ? "Hide" : "Show"} score breakdown
          <svg
            className={`w-4 h-4 transition-transform ${showBreakdown ? "rotate-180" : ""}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {showBreakdown && (
          <div className="mt-3 space-y-2.5">
            <BreakdownBar label="TE Rating" value={breakdown.teRating} max={35} />
            <BreakdownBar label="Market Competition" value={breakdown.competition} max={25} />
            <BreakdownBar label="Market Maturity" value={breakdown.marketMaturity} max={20} />
            <BreakdownBar label="Patent Freedom" value={breakdown.patentFreedom} max={20} />
          </div>
        )}
      </div>

      <div className="bg-gray-50 px-6 py-3 border-t border-gray-100 text-[11px] text-gray-400">
        Estimates based on average US cash prices. Actual savings vary by pharmacy, insurance, and location. Not financial or medical advice.
      </div>
    </div>
  );
}

function BreakdownBar({ label, value, max }: { label: string; value: number; max: number }) {
  const pct = Math.round((value / max) * 100);
  return (
    <div>
      <div className="flex justify-between text-xs mb-1">
        <span className="text-gray-600">{label}</span>
        <span className="text-gray-500 font-mono">
          {value}/{max}
        </span>
      </div>
      <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
        <div
          className="h-full bg-brand-500 rounded-full transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
