export default function Loading() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="space-y-6 animate-fade-up">
        {/* Breadcrumb skeleton */}
        <div className="flex items-center gap-2">
          <div className="shimmer-skeleton h-3 w-16 rounded" />
          <div className="shimmer-skeleton h-3 w-4 rounded" />
          <div className="shimmer-skeleton h-3 w-24 rounded" />
        </div>

        {/* Title skeleton */}
        <div className="space-y-2">
          <div className="shimmer-skeleton h-9 w-80 rounded-lg" />
          <div className="shimmer-skeleton h-4 w-56 rounded" />
        </div>

        {/* Info card skeleton */}
        <div className="relative overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-lg shadow-gray-100/50">
          <div className="h-1.5 shimmer-skeleton rounded-none" />
          <div className="p-6 sm:p-8 space-y-6">
            <div className="flex items-start gap-4">
              <div className="shimmer-skeleton w-14 h-14 rounded-2xl" />
              <div className="space-y-2 flex-1">
                <div className="shimmer-skeleton h-7 w-48 rounded-lg" />
                <div className="shimmer-skeleton h-4 w-64 rounded" />
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-5">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="space-y-2">
                  <div className="shimmer-skeleton h-3 w-16 rounded" />
                  <div className="shimmer-skeleton h-5 w-24 rounded" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Table skeleton */}
        <div className="rounded-2xl border border-gray-200 bg-white overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-100">
            <div className="shimmer-skeleton h-5 w-64 rounded" />
          </div>
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="px-6 py-4 border-b border-gray-50 flex gap-6">
              <div className="shimmer-skeleton h-4 w-28 rounded" />
              <div className="shimmer-skeleton h-4 w-12 rounded" />
              <div className="shimmer-skeleton h-4 w-20 rounded" />
              <div className="shimmer-skeleton h-4 w-16 rounded" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
