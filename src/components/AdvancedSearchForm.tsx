"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

interface Props {
  dosageForms: string[];
  routes: string[];
  currentFilters: {
    q?: string;
    dosage_form?: string;
    route?: string;
    te_code?: string;
    type?: string;
  };
}

const TE_CODES = ["AB", "AA", "AN", "AO", "AP", "AT", "BC", "BD", "BE", "BN", "BP", "BR", "BS", "BT", "BX"];

export default function AdvancedSearchForm({ dosageForms, routes, currentFilters }: Props) {
  const router = useRouter();
  const [q, setQ] = useState(currentFilters.q || "");
  const [dosageForm, setDosageForm] = useState(currentFilters.dosage_form || "");
  const [route, setRoute] = useState(currentFilters.route || "");
  const [teCode, setTeCode] = useState(currentFilters.te_code || "");
  const [type, setType] = useState(currentFilters.type || "");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (q) params.set("q", q);
    if (dosageForm) params.set("dosage_form", dosageForm);
    if (route) params.set("route", route);
    if (teCode) params.set("te_code", teCode);
    if (type) params.set("type", type);
    router.push(`/search/advanced?${params.toString()}`);
  }

  function handleReset() {
    setQ("");
    setDosageForm("");
    setRoute("");
    setTeCode("");
    setType("");
    router.push("/search/advanced");
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
      {/* Query */}
      <div className="mb-4">
        <label htmlFor="q" className="block text-sm font-medium text-gray-700 mb-1">
          Drug Name or Active Ingredient
        </label>
        <input
          id="q"
          type="text"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="e.g., Lipitor, atorvastatin"
          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
        />
      </div>

      {/* Filter Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div>
          <label htmlFor="dosage" className="block text-xs font-medium text-gray-500 mb-1">
            Dosage Form
          </label>
          <select
            id="dosage"
            value={dosageForm}
            onChange={(e) => setDosageForm(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
          >
            <option value="">All Forms</option>
            {dosageForms.map((f) => (
              <option key={f} value={f}>{f}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="route" className="block text-xs font-medium text-gray-500 mb-1">
            Route
          </label>
          <select
            id="route"
            value={route}
            onChange={(e) => setRoute(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
          >
            <option value="">All Routes</option>
            {routes.map((r) => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="te" className="block text-xs font-medium text-gray-500 mb-1">
            TE Code
          </label>
          <select
            id="te"
            value={teCode}
            onChange={(e) => setTeCode(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
          >
            <option value="">All Codes</option>
            {TE_CODES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="type" className="block text-xs font-medium text-gray-500 mb-1">
            Drug Type
          </label>
          <select
            id="type"
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
          >
            <option value="">All Types</option>
            <option value="N">Brand (NDA)</option>
            <option value="A">Generic (ANDA)</option>
          </select>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex gap-3">
        <button
          type="submit"
          className="px-6 py-2.5 bg-brand-600 text-white font-semibold rounded-lg text-sm hover:bg-brand-700 transition-colors"
        >
          Search
        </button>
        <button
          type="button"
          onClick={handleReset}
          className="px-6 py-2.5 bg-gray-100 text-gray-700 font-medium rounded-lg text-sm hover:bg-gray-200 transition-colors"
        >
          Reset
        </button>
      </div>
    </form>
  );
}
