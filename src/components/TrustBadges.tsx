export default function TrustBadges() {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-lg shadow-gray-100/50">
      <div className="px-6 py-5 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-50 to-green-50 border border-emerald-100 flex items-center justify-center">
            <svg className="w-5 h-5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
            </svg>
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900">Trusted Data Sources</h3>
            <p className="text-sm text-gray-500">Verified by official FDA databases</p>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* FDA Orange Book */}
          <div className="group rounded-xl border border-gray-200 p-4 hover:border-blue-200 hover:bg-blue-50/30 transition-all">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                <svg className="w-5 h-5 text-blue-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                </svg>
              </div>
              <div>
                <p className="font-semibold text-gray-900 text-sm">FDA Orange Book</p>
                <p className="text-xs text-gray-500">Official source</p>
              </div>
            </div>
            <p className="text-xs text-gray-600">
              Therapeutic equivalence evaluations for approved drug products
            </p>
          </div>

          {/* Weekly Updates */}
          <div className="group rounded-xl border border-gray-200 p-4 hover:border-emerald-200 hover:bg-emerald-50/30 transition-all">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center">
                <svg className="w-5 h-5 text-emerald-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182M2.985 19.644l3.181-3.182" />
                </svg>
              </div>
              <div>
                <p className="font-semibold text-gray-900 text-sm">Updated Weekly</p>
                <p className="text-xs text-gray-500">Fresh data</p>
              </div>
            </div>
            <p className="text-xs text-gray-600">
              Our database syncs with the latest FDA data releases every week
            </p>
          </div>

          {/* 42K+ Records */}
          <div className="group rounded-xl border border-gray-200 p-4 hover:border-violet-200 hover:bg-violet-50/30 transition-all">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-violet-100 flex items-center justify-center">
                <svg className="w-5 h-5 text-violet-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
                </svg>
              </div>
              <div>
                <p className="font-semibold text-gray-900 text-sm">42,000+ Records</p>
                <p className="text-xs text-gray-500">Comprehensive</p>
              </div>
            </div>
            <p className="text-xs text-gray-600">
              Complete coverage of brand and generic drug approvals in the US market
            </p>
          </div>
        </div>

        {/* Compliance note */}
        <div className="mt-4 rounded-lg bg-gray-50 border border-gray-100 px-4 py-3 flex items-start gap-2.5">
          <svg className="w-4 h-4 text-gray-400 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
          </svg>
          <p className="text-xs text-gray-500">
            GenericSwap is an independent tool and is not affiliated with, endorsed by, or sponsored by the FDA.
            All data is sourced from publicly available FDA databases. This site provides informational content only and
            should not replace professional medical advice.{" "}
            <a href="/disclaimer" className="text-brand-600 hover:text-brand-700 underline transition-colors">
              Read our disclaimer
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
