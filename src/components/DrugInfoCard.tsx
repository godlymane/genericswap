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
    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h2 className="text-xl font-bold text-gray-900">{tradeName}</h2>
          <p className="text-gray-600 text-sm mt-1">
            {activeIngredient}
            {dosageForm && ` \u00b7 ${dosageForm}`}
            {route && ` \u00b7 ${route}`}
          </p>
        </div>
        {isDiscontinued && (
          <span className="px-2 py-1 bg-red-100 text-red-700 text-xs font-medium rounded-full">
            Discontinued
          </span>
        )}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        <InfoItem label="Brand Name" value={tradeName} />
        <InfoItem label="Active Ingredient" value={activeIngredient} />
        <InfoItem label="Manufacturer" value={applicant || "Unknown"} />
        <InfoItem
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
        <InfoItem label="Dosage Form" value={`${dosageForm || "N/A"}${route ? ` \u00b7 ${route}` : ""}`} />
        {strength && <InfoItem label="Strengths" value={strength} />}
        <div>
          <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">TE Rating</p>
          <ScoreBadge code={teCode} />
        </div>
        <div>
          <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Generic Available</p>
          <p className="font-semibold text-sm">
            {genericCount > 0 ? (
              <span className="text-green-700">Yes ({genericCount} approved)</span>
            ) : (
              <span className="text-red-600">No</span>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}

function InfoItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">{label}</p>
      <p className="text-sm font-medium text-gray-900">{value}</p>
    </div>
  );
}
