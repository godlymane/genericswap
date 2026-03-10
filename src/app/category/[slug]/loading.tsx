export default function CategoryLoading() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 mb-6">
        <div className="shimmer-skeleton h-3 w-12 rounded" />
        <div className="shimmer-skeleton h-3 w-3 rounded" />
        <div className="shimmer-skeleton h-3 w-28 rounded" />
      </div>

      {/* Title */}
      <div className="space-y-2 mb-8">
        <div className="shimmer-skeleton h-9 w-72 rounded-lg" />
        <div className="shimmer-skeleton h-4 w-96 rounded" />
      </div>

      {/* Drug cards grid */}
      <div className="grid gap-4">
        {Array.from({ length: 10 }).map((_, i) => (
          <div
            key={i}
            className="rounded-xl border border-gray-200 bg-white p-5 flex items-center justify-between"
          >
            <div className="flex items-center gap-4 flex-1">
              <div className="shimmer-skeleton w-10 h-10 rounded-xl" />
              <div className="space-y-1.5 flex-1">
                <div className="shimmer-skeleton h-5 w-36 rounded" />
                <div className="shimmer-skeleton h-3 w-48 rounded" />
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="shimmer-skeleton h-6 w-16 rounded-full" />
              <div className="shimmer-skeleton h-8 w-20 rounded-lg" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
