interface AffiliateCTAProps {
  activeIngredient: string;
  tradeName: string;
}

export default function AffiliateCTA({ activeIngredient, tradeName }: AffiliateCTAProps) {
  const searchTerm = encodeURIComponent(activeIngredient.toLowerCase());

  return (
    <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-xl p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        Check Generic {activeIngredient} Prices
      </h3>
      <p className="text-sm text-gray-600 mb-4">
        Compare prices for generic {activeIngredient.toLowerCase()} ({tradeName}) across pharmacies:
      </p>
      <div className="flex flex-wrap gap-3">
        <a
          href={`https://www.goodrx.com/search?search_term=${searchTerm}`}
          target="_blank"
          rel="noopener noreferrer nofollow"
          className="px-5 py-2.5 bg-yellow-400 text-gray-900 font-semibold rounded-lg hover:bg-yellow-500 transition-colors text-sm"
        >
          Check GoodRx Prices
        </a>
        <a
          href={`https://pharmacy.amazon.com/search?query=${searchTerm}`}
          target="_blank"
          rel="noopener noreferrer nofollow"
          className="px-5 py-2.5 bg-[#FF9900] text-white font-semibold rounded-lg hover:bg-[#e68a00] transition-colors text-sm"
        >
          Amazon Pharmacy
        </a>
        <a
          href={`https://costplusdrugs.com/search/?query=${searchTerm}`}
          target="_blank"
          rel="noopener noreferrer nofollow"
          className="px-5 py-2.5 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors text-sm"
        >
          Cost Plus Drugs
        </a>
      </div>
      <p className="text-xs text-gray-400 mt-3">
        * Links may contain affiliate referrals. Prices vary by pharmacy and location.
      </p>
    </div>
  );
}
