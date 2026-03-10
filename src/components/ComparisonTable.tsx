"use client";

import { useState } from "react";
import ScoreBadge from "./ScoreBadge";

interface Generic {
  id: string;
  tradeName: string;
  applicant: string | null;
  teCode: string | null;
  strength: string | null;
  approvalDate: Date | null;
  isDiscontinued: boolean;
}

type SortKey = "applicant" | "teCode" | "strength" | "approvalDate";
type SortDir = "asc" | "desc";

export default function ComparisonTable({ generics }: { generics: Generic[] }) {
  const [sortKey, setSortKey] = useState<SortKey>("approvalDate");
  const [sortDir, setSortDir] = useState<SortDir>("asc");

  function handleSort(key: SortKey) {
    if (sortKey === key) {
      setSortDir(sortDir === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  }

  const sorted = [...generics].sort((a, b) => {
    const dir = sortDir === "asc" ? 1 : -1;
    switch (sortKey) {
      case "applicant":
        return (a.applicant || "").localeCompare(b.applicant || "") * dir;
      case "teCode":
        return (a.teCode || "").localeCompare(b.teCode || "") * dir;
      case "strength":
        return (a.strength || "").localeCompare(b.strength || "") * dir;
      case "approvalDate":
        return ((a.approvalDate?.getTime() || 0) - (b.approvalDate?.getTime() || 0)) * dir;
      default:
        return 0;
    }
  });

  const SortIcon = ({ field }: { field: SortKey }) => {
    if (sortKey !== field)
      return (
        <svg className="w-3.5 h-3.5 ml-1 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 9l4-4 4 4M16 15l-4 4-4-4" />
        </svg>
      );
    return (
      <svg className="w-3.5 h-3.5 ml-1 text-brand-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        {sortDir === "asc" ? (
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
        ) : (
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        )}
      </svg>
    );
  };

  return (
    <div className="relative overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-lg shadow-gray-100/50">
      {/* Header */}
      <div className="px-6 py-5 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 flex items-center justify-center">
            <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z" />
            </svg>
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900">
              FDA-Approved Generic Equivalents
            </h3>
            <p className="text-sm text-gray-500">
              {generics.length} manufacturer{generics.length !== 1 ? "s" : ""} found · Click headers to sort
            </p>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="table-container">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50/80">
              <th className="px-6 py-3 text-left">
                <button onClick={() => handleSort("applicant")} className="flex items-center text-xs font-semibold text-gray-500 uppercase tracking-wider hover:text-gray-900 transition-colors">
                  Manufacturer <SortIcon field="applicant" />
                </button>
              </th>
              <th className="px-6 py-3 text-left">
                <button onClick={() => handleSort("teCode")} className="flex items-center text-xs font-semibold text-gray-500 uppercase tracking-wider hover:text-gray-900 transition-colors">
                  TE Code <SortIcon field="teCode" />
                </button>
              </th>
              <th className="px-6 py-3 text-left">
                <button onClick={() => handleSort("strength")} className="flex items-center text-xs font-semibold text-gray-500 uppercase tracking-wider hover:text-gray-900 transition-colors">
                  Strength <SortIcon field="strength" />
                </button>
              </th>
              <th className="px-6 py-3 text-left">
                <button onClick={() => handleSort("approvalDate")} className="flex items-center text-xs font-semibold text-gray-500 uppercase tracking-wider hover:text-gray-900 transition-colors">
                  Approved <SortIcon field="approvalDate" />
                </button>
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {sorted.map((g, idx) => (
              <tr
                key={g.id}
                className="hover:bg-blue-50/40 transition-colors group"
                style={{ animationDelay: `${idx * 30}ms` }}
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-500 group-hover:bg-brand-100 group-hover:text-brand-700 transition-colors">
                      {(g.applicant || "?")[0]}
                    </div>
                    <span className="font-medium text-gray-900">{g.applicant || "Unknown"}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <ScoreBadge code={g.teCode} />
                </td>
                <td className="px-6 py-4 text-gray-700 font-mono text-xs">{g.strength || "N/A"}</td>
                <td className="px-6 py-4 text-gray-700">
                  {g.approvalDate
                    ? g.approvalDate.toLocaleDateString("en-US", { month: "short", year: "numeric" })
                    : "Pre-1982"}
                </td>
                <td className="px-6 py-4">
                  {g.isDiscontinued ? (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-red-50 text-red-700 text-xs font-semibold rounded-full border border-red-200">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                      Discontinued
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-emerald-50 text-emerald-700 text-xs font-semibold rounded-full border border-emerald-200">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      Active
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Legend Footer */}
      <div className="px-6 py-4 bg-gradient-to-r from-gray-50 to-white border-t border-gray-100">
        <p className="text-xs text-gray-500 flex items-center gap-1.5">
          <svg className="w-3.5 h-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
          </svg>
          <strong>TE Code:</strong>{" "}
          <span className="text-emerald-700">AB = Auto-substitute OK</span>
          <span className="text-gray-300">|</span>
          <span className="text-amber-700">BC/BE/BP = Bioequivalence issues</span>
          <span className="text-gray-300">|</span>
          <span className="text-gray-600">BN = No generic for this strength</span>
        </p>
      </div>
    </div>
  );
}
