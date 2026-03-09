"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

interface SearchResult {
  slug: string;
  tradeName: string;
  activeIngredient: string;
  applicationType: string;
}

export default function SearchBar({ size = "default" }: { size?: "default" | "large" }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const ref = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<NodeJS.Timeout>(undefined);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);

    if (query.length < 2) {
      setResults([]);
      setIsOpen(false);
      return;
    }

    debounceRef.current = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
        const data = await res.json();
        setResults(data.results || []);
        setIsOpen(true);
      } catch {
        setResults([]);
      }
      setLoading(false);
    }, 300);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [query]);

  function handleSelect(result: SearchResult) {
    setIsOpen(false);
    setQuery("");
    router.push(`/drug/${result.slug}`);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (query.length >= 2) {
      setIsOpen(false);
      router.push(`/search?q=${encodeURIComponent(query)}`);
    }
  }

  const inputClass =
    size === "large"
      ? "w-full px-6 py-4 text-lg rounded-xl border-2 border-gray-200 focus:border-brand-500 focus:outline-none shadow-sm"
      : "w-full px-4 py-2.5 text-sm rounded-lg border border-gray-300 focus:border-brand-500 focus:outline-none";

  return (
    <div ref={ref} className="relative w-full max-w-2xl mx-auto">
      <form onSubmit={handleSubmit}>
        <div className="relative">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search any drug name (e.g., Lipitor, atorvastatin)..."
            className={inputClass}
            aria-label="Search drugs"
            autoComplete="off"
          />
          <button
            type="submit"
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-brand-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-brand-700 transition-colors"
          >
            Search
          </button>
        </div>
      </form>

      {isOpen && results.length > 0 && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-xl shadow-lg max-h-80 overflow-y-auto">
          {results.map((r) => (
            <button
              key={r.slug}
              onClick={() => handleSelect(r)}
              className="w-full text-left px-4 py-3 hover:bg-gray-50 border-b border-gray-100 last:border-0 flex justify-between items-center"
            >
              <div>
                <span className="font-medium text-gray-900">{r.tradeName}</span>
                <span className="text-gray-500 text-sm ml-2">({r.activeIngredient})</span>
              </div>
              <span
                className={`text-xs px-2 py-0.5 rounded-full ${
                  r.applicationType === "N"
                    ? "bg-blue-100 text-blue-700"
                    : "bg-green-100 text-green-700"
                }`}
              >
                {r.applicationType === "N" ? "Brand" : "Generic"}
              </span>
            </button>
          ))}
        </div>
      )}

      {isOpen && loading && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-xl shadow-lg p-4 text-center text-gray-500 text-sm">
          Searching...
        </div>
      )}

      {isOpen && !loading && query.length >= 2 && results.length === 0 && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-xl shadow-lg p-4 text-center text-gray-500 text-sm">
          No drugs found for &ldquo;{query}&rdquo;
        </div>
      )}
    </div>
  );
}
