"use client";
// OPTIMIZED: Save Drug bookmark feature for user retention via localStorage

import { useEffect, useState } from "react";

interface SaveDrugProps {
  slug: string;
  tradeName: string;
  activeIngredient: string;
}

interface SavedDrug {
  slug: string;
  tradeName: string;
  activeIngredient: string;
  savedAt: string;
}

const STORAGE_KEY = "genericswap-saved-drugs";

function getSavedDrugs(): SavedDrug[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  } catch {
    return [];
  }
}

function saveDrugs(drugs: SavedDrug[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(drugs));
}

export default function SaveDrug({ slug, tradeName, activeIngredient }: SaveDrugProps) {
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    setIsSaved(getSavedDrugs().some((d) => d.slug === slug));
  }, [slug]);

  function toggle() {
    const current = getSavedDrugs();
    if (isSaved) {
      saveDrugs(current.filter((d) => d.slug !== slug));
      setIsSaved(false);
    } else {
      saveDrugs([...current, { slug, tradeName, activeIngredient, savedAt: new Date().toISOString() }]);
      setIsSaved(true);
    }
  }

  return (
    <button
      onClick={toggle}
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
        isSaved
          ? "bg-brand-50 text-brand-700 border border-brand-200"
          : "bg-gray-50 text-gray-600 border border-gray-200 hover:bg-gray-100"
      }`}
      title={isSaved ? "Remove from saved drugs" : "Save this drug for quick access"}
    >
      <svg
        className="w-4 h-4"
        fill={isSaved ? "currentColor" : "none"}
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
        />
      </svg>
      {isSaved ? "Saved" : "Save Drug"}
    </button>
  );
}

export { getSavedDrugs, type SavedDrug };
