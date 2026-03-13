"use client";
// OPTIMIZED: Shows user's saved drugs on 404 and other pages

import { useEffect, useState } from "react";
import Link from "next/link";
import { getSavedDrugs, type SavedDrug } from "./SaveDrug";

export default function SavedDrugsList() {
  const [drugs, setDrugs] = useState<SavedDrug[]>([]);

  useEffect(() => {
    setDrugs(getSavedDrugs().slice(0, 6));
  }, []);

  if (drugs.length === 0) return null;

  return (
    <div className="mt-8">
      <h3 className="text-sm font-medium text-gray-500 mb-3">Your Saved Drugs</h3>
      <div className="flex flex-wrap gap-2 justify-center">
        {drugs.map((d) => (
          <Link
            key={d.slug}
            href={`/drug/${d.slug}`}
            className="px-3 py-1.5 bg-brand-50 border border-brand-200 rounded-lg text-sm text-brand-700 hover:bg-brand-100 transition-colors"
          >
            {d.tradeName}
          </Link>
        ))}
      </div>
    </div>
  );
}
