export default function SearchLoading() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Search bar skeleton */}
      <div className="mb-8 space-y-4">
        <div className="shimmer-skeleton h-9 w-64 rounded-lg" />
        <div className="shimmer-skeleton h-12 w-full rounded-xl" />
      </div>

      {/* Results skeleton */}
      <div className="space-y-3">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="rounded-xl border border-gray-200 bg-white p-4 flex items-center justify-between"
          >
            <div className="flex items-center gap-3 flex-1">
              <div className="shimmer-skeleton w-10 h-10 rounded-lg" />
              <div className="space-y-1.5 flex-1">
                <div className="shimmer-skeleton h-4 w-40 rounded" />
                <div className="shimmer-skeleton h-3 w-56 rounded" />
              </div>
            </div>
            <div className="shimmer-skeleton h-6 w-20 rounded-full" />
          </div>
        ))}
      </div>
    </div>
  );
}
