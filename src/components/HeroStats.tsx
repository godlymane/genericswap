"use client";

import AnimatedCounter from "@/components/AnimatedCounter";

interface HeroStatsProps {
  brandDrugs: number;
  genericDrugs: number;
  totalPatents: number;
}

export default function HeroStats({ brandDrugs, genericDrugs, totalPatents }: HeroStatsProps) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-6 mt-10 text-sm">
      <div className="flex items-center gap-2">
        <AnimatedCounter
          value={brandDrugs}
          duration={2200}
          className="text-2xl font-bold text-white tabular-nums"
        />
        <span className="text-slate-400">Brand Drugs</span>
      </div>
      <div className="w-px h-6 bg-slate-700" />
      <div className="flex items-center gap-2">
        <AnimatedCounter
          value={genericDrugs}
          duration={2500}
          className="text-2xl font-bold text-cyan-400 tabular-nums"
        />
        <span className="text-slate-400">Generics</span>
      </div>
      <div className="w-px h-6 bg-slate-700" />
      <div className="flex items-center gap-2">
        <AnimatedCounter
          value={totalPatents}
          duration={2000}
          className="text-2xl font-bold text-white tabular-nums"
        />
        <span className="text-slate-400">Active Patents</span>
      </div>
    </div>
  );
}
