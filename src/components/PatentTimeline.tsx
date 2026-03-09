"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  Cell,
} from "recharts";

interface Patent {
  patentNumber: string;
  patentExpireDate: Date | null;
  drugSubstanceFlag: boolean | null;
  drugProductFlag: boolean | null;
  patentUseCode: string | null;
}

interface Exclusivity {
  exclusivityCode: string | null;
  exclusivityDate: Date | null;
}

interface PatentTimelineProps {
  patents: Patent[];
  exclusivities: Exclusivity[];
  approvalDate: Date | null;
  firstGenericDate: Date | null;
  drugName: string;
}

export default function PatentTimeline({
  patents,
  exclusivities,
  approvalDate,
  firstGenericDate,
  drugName,
}: PatentTimelineProps) {
  if (patents.length === 0 && exclusivities.length === 0) {
    return (
      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Patent & Exclusivity Timeline</h3>
        <p className="text-gray-500 text-sm">No patent or exclusivity data available for {drugName}.</p>
      </div>
    );
  }

  const now = new Date();

  // Build chart data
  const chartData: { name: string; start: number; duration: number; type: string; expired: boolean }[] = [];

  const validPatents = patents.filter((p) => p.patentExpireDate);
  for (const patent of validPatents) {
    const expireDate = new Date(patent.patentExpireDate!);
    const startDate = approvalDate ? new Date(approvalDate) : new Date("2000-01-01");
    const expired = expireDate < now;

    chartData.push({
      name: `Patent ${patent.patentNumber}${patent.patentUseCode ? ` (${patent.patentUseCode})` : ""}`,
      start: startDate.getFullYear(),
      duration: expireDate.getFullYear() - startDate.getFullYear(),
      type: "patent",
      expired,
    });
  }

  for (const excl of exclusivities) {
    if (!excl.exclusivityDate) continue;
    const exclDate = new Date(excl.exclusivityDate);
    const startDate = approvalDate ? new Date(approvalDate) : new Date("2000-01-01");
    const expired = exclDate < now;

    chartData.push({
      name: `Exclusivity ${excl.exclusivityCode || ""}`,
      start: startDate.getFullYear(),
      duration: Math.max(1, exclDate.getFullYear() - startDate.getFullYear()),
      type: "exclusivity",
      expired,
    });
  }

  if (chartData.length === 0) {
    return (
      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Patent & Exclusivity Timeline</h3>
        <p className="text-gray-500 text-sm">No displayable timeline data for {drugName}.</p>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Patent & Exclusivity Timeline</h3>

      <div className="h-64 sm:h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" horizontal={false} />
            <XAxis type="number" domain={["auto", "auto"]} />
            <YAxis
              type="category"
              dataKey="name"
              width={180}
              tick={{ fontSize: 11 }}
              tickFormatter={(value: string) => (value.length > 25 ? value.slice(0, 22) + "..." : value)}
            />
            <Tooltip
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              formatter={(value: any, name: any) => {
                if (name === "start") return [`${value}`, "Start Year"];
                return [`${value} years`, "Duration"];
              }}
            />
            <ReferenceLine x={now.getFullYear()} stroke="#dc2626" strokeDasharray="3 3" label="Today" />
            {firstGenericDate && (
              <ReferenceLine
                x={firstGenericDate.getFullYear()}
                stroke="#16a34a"
                strokeDasharray="3 3"
                label="1st Generic"
              />
            )}
            <Bar dataKey="start" stackId="a" fill="transparent" />
            <Bar dataKey="duration" stackId="a" radius={[0, 4, 4, 0]}>
              {chartData.map((entry, index) => (
                <Cell
                  key={index}
                  fill={
                    entry.type === "exclusivity"
                      ? entry.expired
                        ? "#d1d5db"
                        : "#fbbf24"
                      : entry.expired
                        ? "#d1d5db"
                        : "#3b82f6"
                  }
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 flex flex-wrap gap-4 text-xs text-gray-600">
        <span className="flex items-center gap-1">
          <span className="w-3 h-3 rounded bg-blue-500 inline-block" /> Active Patent
        </span>
        <span className="flex items-center gap-1">
          <span className="w-3 h-3 rounded bg-yellow-400 inline-block" /> Active Exclusivity
        </span>
        <span className="flex items-center gap-1">
          <span className="w-3 h-3 rounded bg-gray-300 inline-block" /> Expired
        </span>
        <span className="flex items-center gap-1">
          <span className="w-3 h-1 border-t-2 border-dashed border-red-500 inline-block" /> Today
        </span>
        {firstGenericDate && (
          <span className="flex items-center gap-1">
            <span className="w-3 h-1 border-t-2 border-dashed border-green-500 inline-block" /> First Generic
          </span>
        )}
      </div>
    </div>
  );
}
