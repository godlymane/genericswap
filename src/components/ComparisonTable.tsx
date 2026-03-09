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
    if (sortKey !== field) return <span className="text-gray-400 ml-1">\u2195</span>;
    return <span className="text-brand-600 ml-1">{sortDir === "asc" ? "\u2191" : "\u2193"}</span>;
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
      <div className="px-6 py-4 border-b border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900">
          FDA-Approved Generic Equivalents
          <span className="text-sm font-normal text-gray-500 ml-2">({generics.length} found)</span>
        </h3>
      </div>

      <div className="table-container">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 text-left">
              <th className="px-6 py-3 font-medium text-gray-600">
                <button onClick={() => handleSort("applicant")} className="flex items-center hover:text-gray-900">
                  Manufacturer <SortIcon field="applicant" />
                </button>
              </th>
              <th className="px-6 py-3 font-medium text-gray-600">
                <button onClick={() => handleSort("teCode")} className="flex items-center hover:text-gray-900">
                  TE Code <SortIcon field="teCode" />
                </button>
              </th>
              <th className="px-6 py-3 font-medium text-gray-600">
                <button onClick={() => handleSort("strength")} className="flex items-center hover:text-gray-900">
                  Strength <SortIcon field="strength" />
                </button>
              </th>
              <th className="px-6 py-3 font-medium text-gray-600">
                <button onClick={() => handleSort("approvalDate")} className="flex items-center hover:text-gray-900">
                  Approved <SortIcon field="approvalDate" />
                </button>
              </th>
              <th className="px-6 py-3 font-medium text-gray-600">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {sorted.map((g) => (
              <tr key={g.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-3 font-medium text-gray-900">{g.applicant || "Unknown"}</td>
                <td className="px-6 py-3">
                  <ScoreBadge code={g.teCode} />
                </td>
                <td className="px-6 py-3 text-gray-700">{g.strength || "N/A"}</td>
                <td className="px-6 py-3 text-gray-700">
                  {g.approvalDate
                    ? g.approvalDate.toLocaleDateString("en-US", { month: "short", year: "numeric" })
                    : "Pre-1982"}
                </td>
                <td className="px-6 py-3">
                  {g.isDiscontinued ? (
                    <span className="text-red-600 text-xs font-medium">Discontinued</span>
                  ) : (
                    <span className="text-green-600 text-xs font-medium">Active</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="px-6 py-3 bg-gray-50 border-t border-gray-100 text-xs text-gray-500">
        <p>
          <strong>TE Code Legend:</strong>{" "}
          <span className="text-green-700">AB = Pharmacist can auto-substitute</span> |{" "}
          <span className="text-yellow-700">BC/BE/BP = Potential bioequivalence issues</span> |{" "}
          <span className="text-gray-600">BN = No generic available for this strength</span>
        </p>
      </div>
    </div>
  );
}
