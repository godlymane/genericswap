"use client";

import { useState, useEffect, useRef } from "react";

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

const GRADE_STYLES: Record<string, { gradient: string; ring: string; glow: string }> = {
  "A+": { gradient: "from-emerald-500 to-emerald-600", ring: "ring-emerald-200", glow: "shadow-emerald-200/50" },
  A: { gradient: "from-green-500 to-green-600", ring: "ring-green-200", glow: "shadow-green-200/50" },
  "B+": { gradient: "from-lime-500 to-lime-600", ring: "ring-lime-200", glow: "shadow-lime-200/50" },
  B: { gradient: "from-yellow-500 to-yellow-600", ring: "ring-yellow-200", glow: "shadow-yellow-200/50" },
  C: { gradient: "from-orange-500 to-orange-600", ring: "ring-orange-200", glow: "shadow-orange-200/50" },
  D: { gradient: "from-red-500 to-red-600", ring: "ring-red-200", glow: "shadow-red-200/50" },
  F: { gradient: "from-gray-400 to-gray-500", ring: "ring-gray-200", glow: "shadow-gray-200/50" },
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
  const [animatedScore, setAnimatedScore] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const style = GRADE_STYLES[grade] || GRADE_STYLES.F;

  // Intersection observer for entrance animation
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Animate score counter when visible
  useEffect(() => {
    if (!isVisible) return;
    const duration = 1200;
    const start = performance.now();
    function tick(now: number) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setAnimatedScore(Math.round(score * eased));
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }, [isVisible, score]);

  // SVG circle animation
  const circumference = 2 * Math.PI * 42;
  const offset = circumference - (circumference * (isVisible ? score : 0)) / 100;

  return (
    <div
      ref={ref}
      className={`relative overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-lg shadow-gray-100/50 transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
    >
      {/* Gradient accent bar */}
      <div className={`h-1.5 bg-gradient-to-r ${style.gradient}`} />

      <div className="p-6 sm:p-8">
        <div className="flex items-start gap-6 sm:gap-8">
          {/* Animated Score Ring */}
          <div className="flex-shrink-0 relative">
            <svg width="100" height="100" viewBox="0 0 100 100" className="transform -rotate-90">
              {/* Background circle */}
              <circle cx="50" cy="50" r="42" fill="none" stroke="#f3f4f6" strokeWidth="6" />
              {/* Animated progress circle */}
              <circle
                cx="50"
                cy="50"
                r="42"
                fill="none"
                stroke="url(#scoreGradient)"
                strokeWidth="6"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                className="transition-all duration-1000 ease-out"
              />
              <defs>
                <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor={score >= 70 ? "#10b981" : score >= 40 ? "#f59e0b" : "#ef4444"} />
                  <stop offset="100%" stopColor={score >= 70 ? "#059669" : score >= 40 ? "#d97706" : "#dc2626"} />
                </linearGradient>
              </defs>
            </svg>
            {/* Center content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className={`text-2xl font-black bg-gradient-to-br ${style.gradient} bg-clip-text text-transparent`}>
                {grade}
              </span>
              <span className="text-[11px] font-semibold text-gray-400 tabular-nums">
                {animatedScore}/100
              </span>
            </div>
          </div>

          {/* Score Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1.5">
              <h3 className="text-lg font-bold text-gray-900">GenericSwap Score</h3>
              <span className="text-[9px] text-gray-400 font-bold tracking-widest border border-gray-200 rounded px-1 py-0.5">TM</span>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">{verdict}</p>

            {/* Score Bar */}
            <div className="mt-4 h-2.5 bg-gray-100 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full bg-gradient-to-r ${style.gradient} transition-all duration-1000 ease-out`}
                style={{ width: isVisible ? `${score}%` : "0%" }}
              />
            </div>
            <div className="flex justify-between text-[10px] text-gray-400 mt-1.5">
              <span>Low switchability</span>
              <span>High switchability</span>
            </div>
          </div>
        </div>

        {/* Savings Estimate */}
        {savings.average > 0 && (
          <div className="mt-6 relative overflow-hidden rounded-xl bg-gradient-to-r from-emerald-50 via-green-50 to-cyan-50 border border-emerald-200 p-5">
            <div className="absolute -top-4 -right-4 w-20 h-20 rounded-full bg-emerald-100/40 blur-xl" />
            <div className="relative flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-emerald-800 uppercase tracking-wider flex items-center gap-1.5">
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
                  </svg>
                  Estimated Annual Savings
                </p>
                <p className="text-3xl font-black text-emerald-700 mt-1 tabular-nums">
                  ${savings.average.toLocaleString()}
                  <span className="text-base font-semibold text-emerald-600">/yr</span>
                </p>
                <p className="text-xs text-emerald-600 mt-1">
                  ${savings.low.toLocaleString()} &mdash; ${savings.high.toLocaleString()} range &middot; {savings.percentSaved}% saved vs brand
                </p>
              </div>
              <div className="text-right">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-400 to-green-500 flex items-center justify-center shadow-lg shadow-emerald-200/50">
                  <span className="text-xl font-black text-white">{savings.percentSaved}%</span>
                </div>
                <p className="text-[10px] text-emerald-600 font-medium mt-1.5">savings</p>
              </div>
            </div>
          </div>
        )}

        {/* Breakdown Toggle */}
        <button
          onClick={() => setShowBreakdown(!showBreakdown)}
          className="mt-5 text-sm text-brand-600 hover:text-brand-700 font-semibold flex items-center gap-1.5 transition-colors"
        >
          {showBreakdown ? "Hide" : "Show"} score breakdown
          <svg
            className={`w-4 h-4 transition-transform duration-300 ${showBreakdown ? "rotate-180" : ""}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {/* Breakdown bars */}
        <div
          className={`overflow-hidden transition-all duration-400 ease-in-out ${
            showBreakdown ? "max-h-64 opacity-100 mt-4" : "max-h-0 opacity-0"
          }`}
        >
          <div className="space-y-3 pb-1">
            <BreakdownBar label="TE Rating" value={breakdown.teRating} max={35} delay={0} visible={showBreakdown} />
            <BreakdownBar label="Market Competition" value={breakdown.competition} max={25} delay={100} visible={showBreakdown} />
            <BreakdownBar label="Market Maturity" value={breakdown.marketMaturity} max={20} delay={200} visible={showBreakdown} />
            <BreakdownBar label="Patent Freedom" value={breakdown.patentFreedom} max={20} delay={300} visible={showBreakdown} />
          </div>
        </div>
      </div>

      <div className="bg-gray-50 px-6 py-3 border-t border-gray-100 text-[11px] text-gray-400">
        Estimates based on average US cash prices. Actual savings vary by pharmacy, insurance, and location. Not financial or medical advice.
      </div>
    </div>
  );
}

function BreakdownBar({
  label,
  value,
  max,
  delay,
  visible,
}: {
  label: string;
  value: number;
  max: number;
  delay: number;
  visible: boolean;
}) {
  const pct = Math.round((value / max) * 100);
  const barColor =
    pct >= 80 ? "from-emerald-400 to-emerald-500" :
    pct >= 50 ? "from-blue-400 to-blue-500" :
    pct >= 30 ? "from-amber-400 to-amber-500" :
    "from-red-400 to-red-500";

  return (
    <div>
      <div className="flex justify-between text-xs mb-1.5">
        <span className="text-gray-600 font-medium">{label}</span>
        <span className="text-gray-500 font-mono text-[11px]">
          {value}/{max}
        </span>
      </div>
      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
        <div
          className={`h-full bg-gradient-to-r ${barColor} rounded-full transition-all duration-700 ease-out`}
          style={{
            width: visible ? `${pct}%` : "0%",
            transitionDelay: `${delay}ms`,
          }}
        />
      </div>
    </div>
  );
}
