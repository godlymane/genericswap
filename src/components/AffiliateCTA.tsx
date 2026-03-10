interface AffiliateCTAProps {
  activeIngredient: string;
  tradeName: string;
}

export default function AffiliateCTA({ activeIngredient, tradeName }: AffiliateCTAProps) {
  const searchTerm = encodeURIComponent(activeIngredient.toLowerCase());

  return (
    <div className="relative overflow-hidden rounded-2xl border border-emerald-200 bg-gradient-to-br from-emerald-50 via-green-50 to-cyan-50 shadow-lg shadow-emerald-100/30">
      {/* Decorative circles */}
      <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-emerald-100/50 blur-xl" />
      <div className="absolute -bottom-4 -left-4 w-20 h-20 rounded-full bg-cyan-100/50 blur-xl" />

      <div className="relative p-6 sm:p-8">
        <div className="flex items-start gap-4 mb-5">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-400 to-green-500 flex items-center justify-center shadow-lg shadow-emerald-200/50 shrink-0">
            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
            </svg>
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900">
              Compare Generic {activeIngredient} Prices
            </h3>
            <p className="text-sm text-gray-600 mt-1">
              Save up to 80% by switching from {tradeName} to a generic alternative.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <a
            href={`https://www.goodrx.com/search?search_term=${searchTerm}`}
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="group flex items-center gap-2 px-5 py-3 bg-white border border-gray-200 rounded-xl text-sm font-semibold text-gray-900 hover:border-yellow-400 hover:shadow-md hover:shadow-yellow-100/50 transition-all"
          >
            <span className="w-6 h-6 rounded-md bg-yellow-400 flex items-center justify-center text-[10px] font-black text-gray-900 group-hover:scale-110 transition-transform">G</span>
            GoodRx
            <svg className="w-3.5 h-3.5 text-gray-400 group-hover:text-yellow-600 group-hover:translate-x-0.5 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
            </svg>
          </a>
          <a
            href={`https://pharmacy.amazon.com/search?query=${searchTerm}`}
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="group flex items-center gap-2 px-5 py-3 bg-white border border-gray-200 rounded-xl text-sm font-semibold text-gray-900 hover:border-orange-400 hover:shadow-md hover:shadow-orange-100/50 transition-all"
          >
            <span className="w-6 h-6 rounded-md bg-[#FF9900] flex items-center justify-center text-[10px] font-black text-white group-hover:scale-110 transition-transform">A</span>
            Amazon Pharmacy
            <svg className="w-3.5 h-3.5 text-gray-400 group-hover:text-orange-600 group-hover:translate-x-0.5 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
            </svg>
          </a>
          <a
            href={`https://costplusdrugs.com/search/?query=${searchTerm}`}
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="group flex items-center gap-2 px-5 py-3 bg-white border border-gray-200 rounded-xl text-sm font-semibold text-gray-900 hover:border-blue-400 hover:shadow-md hover:shadow-blue-100/50 transition-all"
          >
            <span className="w-6 h-6 rounded-md bg-blue-600 flex items-center justify-center text-[10px] font-black text-white group-hover:scale-110 transition-transform">C+</span>
            Cost Plus Drugs
            <svg className="w-3.5 h-3.5 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
            </svg>
          </a>
        </div>

        <p className="text-[11px] text-gray-400 mt-4 flex items-center gap-1">
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
          </svg>
          Links may contain affiliate referrals. Prices vary by pharmacy and location.
        </p>
      </div>
    </div>
  );
}
