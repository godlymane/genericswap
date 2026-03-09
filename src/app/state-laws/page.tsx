import { generateMeta } from "@/lib/seo";
import { STATE_LAWS, getStateLawStats } from "@/lib/state-laws";
import StateMap from "@/components/StateMap";

export const metadata = generateMeta({
  title: "Generic Drug Substitution Laws by State — Interactive Map",
  description:
    "Explore generic drug substitution laws for all 50 US states + DC. See whether your state requires or permits pharmacist substitution of generic drugs.",
  url: "/state-laws",
});

export default function StateLawsPage() {
  const stats = getStateLawStats();
  const laws = Object.values(STATE_LAWS);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
        Generic Drug Substitution Laws by State
      </h1>
      <p className="text-gray-600 mb-8 max-w-2xl">
        Every US state has laws governing whether pharmacists can (or must) substitute a generic
        drug for a brand-name prescription. Click on any state to see details.
      </p>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
        <div className="bg-white border border-gray-200 rounded-xl p-5 text-center">
          <p className="text-2xl font-bold text-green-600">{stats.mandatory}</p>
          <p className="text-sm text-gray-500">Mandatory Substitution</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-5 text-center">
          <p className="text-2xl font-bold text-yellow-600">{stats.permissive}</p>
          <p className="text-sm text-gray-500">Permissive Substitution</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-5 text-center">
          <p className="text-2xl font-bold text-blue-600">{stats.total}</p>
          <p className="text-sm text-gray-500">States + DC Covered</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-5 text-center">
          <p className="text-2xl font-bold text-brand-600">{stats.patientConsentRequired}</p>
          <p className="text-sm text-gray-500">Require Patient Consent</p>
        </div>
      </div>

      {/* Interactive Map */}
      <div className="mb-10">
        <StateMap />
      </div>

      {/* State List */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">All States</h2>
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 text-left">
                  <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">State</th>
                  <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Type</th>
                  <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase hidden sm:table-cell">Patient Consent</th>
                  <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase hidden md:table-cell">Summary</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {laws.map((law) => (
                  <tr key={law.abbr} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 font-medium text-gray-900">{law.state}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                          law.type === "mandatory"
                            ? "bg-green-100 text-green-700"
                            : law.type === "permissive"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-blue-100 text-blue-700"
                        }`}
                      >
                        {law.type.charAt(0).toUpperCase() + law.type.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-600 hidden sm:table-cell">
                      {law.patientConsentRequired ? "Required" : "Not required"}
                    </td>
                    <td className="px-6 py-4 text-gray-600 text-xs hidden md:table-cell max-w-md">
                      {law.summary}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* SEO Content */}
      <section className="mt-12 max-w-3xl space-y-6 text-sm text-gray-700 leading-relaxed">
        <h2 className="text-xl font-semibold text-gray-900">
          Understanding Generic Drug Substitution Laws
        </h2>
        <p>
          Generic drug substitution laws determine whether a pharmacist can replace a brand-name
          drug with its generic equivalent when filling a prescription. These laws vary significantly
          from state to state and can have a major impact on prescription drug costs.
        </p>
        <div>
          <h3 className="font-semibold text-gray-900 mb-1">Mandatory Substitution States</h3>
          <p>
            In mandatory substitution states, pharmacists are required to dispense the generic
            version of a drug unless the prescriber specifically writes &ldquo;Dispense As Written&rdquo;
            (DAW) or &ldquo;Brand Medically Necessary.&rdquo; This results in the highest rates of
            generic adoption and the lowest average prescription costs.
          </p>
        </div>
        <div>
          <h3 className="font-semibold text-gray-900 mb-1">Permissive Substitution States</h3>
          <p>
            In permissive states, pharmacists have the option to substitute but are not required to.
            They typically must inform the patient and may need explicit consent. Generic adoption
            rates tend to be lower in these states.
          </p>
        </div>
        <p className="text-xs text-gray-400 mt-6">
          This information is for educational purposes only. Laws change frequently. Consult your state&apos;s
          pharmacy board for the most current regulations. Last updated: 2024.
        </p>
      </section>
    </div>
  );
}
