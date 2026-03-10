import ScoreBadge from "./ScoreBadge";

interface DrugInfoCardProps {
  tradeName: string;
  activeIngredient: string;
  applicant: string | null;
  approvalDate: Date | null;
  dosageForm: string | null;
  route: string | null;
  strength: string | null;
  teCode: string | null;
  genericCount: number;
  isDiscontinued: boolean;
}

export default function DrugInfoCard({
  tradeName,
  activeIngredient,
  applicant,
  approvalDate,
  dosageForm,
  route,
  strength,
  teCode,
  genericCount,
  isDiscontinued,
}: DrugInfoCardProps) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-lg shadow-gray-100/50">
      {/* Gradient accent bar */}
      <div className="h-1.5 bg-gradient-to-r from-cyan-500 via-blue-500 to-violet-500" />

      <div className="p-6 sm:p-8">
        {/* Header row */}
        <div className="flex items-start justify-between gap-4 mb-6">
          <div className="flex items-center gap-4">
            {/* Capsule icon */}
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-50 to-blue-50 border border-cyan-100 flex items-center justify-center shrink-0">
              <svg className="w-7 h-7 text-cyan-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
              </svg>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{tradeName}</h2>
              <p className="text-gray-500 text-sm mt-0.5">
                {activeIngredient}
                {dosageForm && ` · ${dosageForm}`}
                {route && ` · ${route}`}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            {isDiscontinued && (
              <span className="px-3 py-1 bg-red-50 text-red-700 text-xs font-semibold rounded-full border border-red-200">
                Discontinued
              </span>
            )}
            <span className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-semibold rounded-full border border-blue-200">
              Brand
            </span>
          </div>
        </div>

        {/* Info grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-5">
          <InfoItem
            icon={
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
              </svg>
            }
            label="Manufacturer"
            value={applicant || "Unknown"}
          />
          <InfoItem
            icon={
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
              </svg>
            }
            label="First Approved"
            value={
              approvalDate
                ? approvalDate.toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })
                : "Prior to 1982"
            }
          />
          {strength && (
            <InfoItem
              icon={
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3" />
                </svg>
              }
              label="Strengths"
              value={strength}
            />
          )}
          <div>
            <div className="flex items-center gap-1.5 mb-1.5">
              <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-xs text-gray-500 uppercase tracking-wider font-medium">TE Rating</p>
            </div>
            <ScoreBadge code={teCode} />
          </div>
        </div>

        {/* Generic availability banner */}
        <div className={`mt-6 rounded-xl p-4 flex items-center justify-between ${
          genericCount > 0
            ? "bg-gradient-to-r from-emerald-50 to-green-50 border border-emerald-200"
            : "bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-200"
        }`}>
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
              genericCount > 0 ? "bg-emerald-100" : "bg-amber-100"
            }`}>
              {genericCount > 0 ? (
                <svg className="w-5 h-5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
              ) : (
                <svg className="w-5 h-5 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                </svg>
              )}
            </div>
            <div>
              <p className={`font-semibold text-sm ${
                genericCount > 0 ? "text-emerald-800" : "text-amber-800"
              }`}>
                {genericCount > 0
                  ? `${genericCount} Generic Alternative${genericCount > 1 ? "s" : ""} Available`
                  : "No Generic Available"
                }
              </p>
              <p className={`text-xs mt-0.5 ${
                genericCount > 0 ? "text-emerald-600" : "text-amber-600"
              }`}>
                {genericCount > 0
                  ? "FDA-approved equivalents are listed below"
                  : "Patent protection or market exclusivity may apply"
                }
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoItem({ label, value, icon }: { label: string; value: string; icon: React.ReactNode }) {
  return (
    <div>
      <div className="flex items-center gap-1.5 mb-1.5">
        <span className="text-gray-400">{icon}</span>
        <p className="text-xs text-gray-500 uppercase tracking-wider font-medium">{label}</p>
      </div>
      <p className="text-sm font-semibold text-gray-900">{value}</p>
    </div>
  );
}
