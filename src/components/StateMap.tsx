"use client";

import { useState } from "react";
import { STATE_LAWS, type StateLaw } from "@/lib/state-laws";

// Simplified US state positions for CSS grid map
const STATE_POSITIONS: Record<string, { row: number; col: number }> = {
  ME: { row: 0, col: 10 }, VT: { row: 1, col: 9 }, NH: { row: 1, col: 10 },
  WA: { row: 0, col: 0 }, MT: { row: 0, col: 1 }, ND: { row: 0, col: 2 }, MN: { row: 0, col: 3 }, WI: { row: 0, col: 5 }, MI: { row: 1, col: 6 }, NY: { row: 1, col: 8 }, MA: { row: 2, col: 10 },
  OR: { row: 1, col: 0 }, ID: { row: 1, col: 1 }, SD: { row: 1, col: 2 }, IA: { row: 1, col: 3 }, IL: { row: 1, col: 4 }, IN: { row: 1, col: 5 }, OH: { row: 2, col: 6 }, PA: { row: 2, col: 7 }, NJ: { row: 2, col: 8 }, CT: { row: 2, col: 9 }, RI: { row: 3, col: 10 },
  NV: { row: 2, col: 0 }, WY: { row: 2, col: 1 }, NE: { row: 2, col: 2 }, MO: { row: 2, col: 3 }, KY: { row: 3, col: 5 }, WV: { row: 3, col: 6 }, VA: { row: 3, col: 7 }, MD: { row: 3, col: 8 }, DE: { row: 3, col: 9 },
  CA: { row: 3, col: 0 }, UT: { row: 3, col: 1 }, CO: { row: 3, col: 2 }, KS: { row: 3, col: 3 }, AR: { row: 4, col: 4 }, TN: { row: 4, col: 5 }, NC: { row: 4, col: 6 }, SC: { row: 4, col: 7 }, DC: { row: 4, col: 8 },
  AZ: { row: 4, col: 1 }, NM: { row: 4, col: 2 }, OK: { row: 4, col: 3 }, LA: { row: 5, col: 4 }, MS: { row: 5, col: 5 }, AL: { row: 5, col: 6 }, GA: { row: 5, col: 7 }, FL: { row: 6, col: 7 },
  TX: { row: 5, col: 2 }, HI: { row: 6, col: 0 }, AK: { row: 6, col: 1 },
  IL2: { row: 2, col: 4 }, // duplicate handling
};

const TYPE_COLORS = {
  mandatory: { bg: "bg-green-500", hover: "hover:bg-green-600", text: "text-white" },
  permissive: { bg: "bg-yellow-400", hover: "hover:bg-yellow-500", text: "text-yellow-900" },
  mixed: { bg: "bg-blue-400", hover: "hover:bg-blue-500", text: "text-white" },
};

export default function StateMap() {
  const [selected, setSelected] = useState<StateLaw | null>(null);

  return (
    <div>
      {/* Map Grid */}
      <div className="bg-white border border-gray-200 rounded-xl p-4 sm:p-6">
        <div className="grid gap-1" style={{ gridTemplateColumns: "repeat(11, 1fr)", gridTemplateRows: "repeat(7, 1fr)" }}>
          {Object.entries(STATE_POSITIONS).map(([abbr, pos]) => {
            const law = STATE_LAWS[abbr];
            if (!law) return <div key={abbr} style={{ gridRow: pos.row + 1, gridColumn: pos.col + 1 }} />;
            const colors = TYPE_COLORS[law.type];

            return (
              <button
                key={abbr}
                onClick={() => setSelected(selected?.abbr === abbr ? null : law)}
                className={`${colors.bg} ${colors.hover} ${colors.text} rounded-md p-1 sm:p-2 text-[9px] sm:text-xs font-bold transition-all ${
                  selected?.abbr === abbr ? "ring-2 ring-brand-600 ring-offset-2 scale-110 z-10" : ""
                }`}
                style={{ gridRow: pos.row + 1, gridColumn: pos.col + 1 }}
                title={law.state}
              >
                {abbr}
              </button>
            );
          })}
        </div>

        {/* Legend */}
        <div className="flex items-center gap-4 mt-4 text-xs text-gray-600">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded bg-green-500" /> Mandatory
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded bg-yellow-400" /> Permissive
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded bg-blue-400" /> Mixed
          </div>
        </div>
      </div>

      {/* Selected State Detail */}
      {selected && (
        <div className="mt-4 bg-white border border-gray-200 rounded-xl p-6 shadow-sm animate-in fade-in">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-bold text-gray-900">{selected.state}</h3>
            <span
              className={`text-xs font-semibold px-3 py-1 rounded-full ${
                selected.type === "mandatory"
                  ? "bg-green-100 text-green-700"
                  : selected.type === "permissive"
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-blue-100 text-blue-700"
              }`}
            >
              {selected.type.charAt(0).toUpperCase() + selected.type.slice(1)} Substitution
            </span>
          </div>
          <p className="text-sm text-gray-600 mb-4">{selected.summary}</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-sm">
            <div className="bg-gray-50 rounded-lg p-3">
              <p className="text-xs text-gray-400 mb-0.5">Patient Consent</p>
              <p className="font-medium text-gray-900">
                {selected.patientConsentRequired ? "Required" : "Not Required"}
              </p>
            </div>
            <div className="bg-gray-50 rounded-lg p-3">
              <p className="text-xs text-gray-400 mb-0.5">Prescriber Can Block</p>
              <p className="font-medium text-gray-900">
                {selected.prescriberCanBlock ? "Yes" : "No"}
              </p>
            </div>
            <div className="bg-gray-50 rounded-lg p-3">
              <p className="text-xs text-gray-400 mb-0.5">NTI Drug Rules</p>
              <p className="font-medium text-gray-900 text-xs">{selected.narrowTherapeuticIndex}</p>
            </div>
          </div>
          <p className="text-[10px] text-gray-400 mt-3">Last updated: {selected.updated}</p>
        </div>
      )}
    </div>
  );
}
