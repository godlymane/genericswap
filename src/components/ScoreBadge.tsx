import { TE_CODES } from "@/lib/constants";

interface ScoreBadgeProps {
  code: string | null;
  showLabel?: boolean;
}

export default function ScoreBadge({ code, showLabel = true }: ScoreBadgeProps) {
  if (!code) {
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
        N/A
      </span>
    );
  }

  // Match base code (e.g., AB1 → AB, AB2 → AB)
  const baseCode = code.replace(/\d+$/, "");
  const info = TE_CODES[baseCode] || TE_CODES[code];

  const colorMap: Record<string, string> = {
    green: "bg-green-100 text-green-800 border-green-200",
    yellow: "bg-yellow-100 text-yellow-800 border-yellow-200",
    red: "bg-red-100 text-red-800 border-red-200",
    gray: "bg-gray-100 text-gray-600 border-gray-200",
  };

  const iconMap: Record<string, string> = {
    green: "\u2705",
    yellow: "\u26a0\ufe0f",
    red: "\u274c",
    gray: "\u26aa",
  };

  const color = info?.color || "gray";

  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold border ${colorMap[color]}`}
      title={info?.description || code}
    >
      <span>{iconMap[color]}</span>
      <span>{code}</span>
      {showLabel && info?.canSubstitute && (
        <span className="text-[10px] font-normal ml-0.5">Sub OK</span>
      )}
    </span>
  );
}
