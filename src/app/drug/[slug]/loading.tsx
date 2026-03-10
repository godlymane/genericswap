import { DrugCardSkeleton, TableSkeleton, ScoreSkeleton } from "@/components/Skeleton";

export default function DrugPageLoading() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 mb-6">
        <div className="shimmer-skeleton h-3 w-12 rounded" />
        <div className="shimmer-skeleton h-3 w-3 rounded" />
        <div className="shimmer-skeleton h-3 w-20 rounded" />
        <div className="shimmer-skeleton h-3 w-3 rounded" />
        <div className="shimmer-skeleton h-3 w-28 rounded" />
      </div>

      {/* Title */}
      <div className="animate-fade-up space-y-2 mb-8">
        <div className="shimmer-skeleton h-9 w-96 rounded-lg" />
        <div className="shimmer-skeleton h-4 w-64 rounded" />
      </div>

      {/* Drug info card */}
      <DrugCardSkeleton />

      {/* Score */}
      <div className="mt-8">
        <ScoreSkeleton />
      </div>

      {/* Comparison table */}
      <div className="mt-8">
        <TableSkeleton />
      </div>

      {/* Patent timeline skeleton */}
      <div className="mt-8">
        <div className="relative overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-lg shadow-gray-100/50">
          <div className="px-6 py-5 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <div className="shimmer-skeleton w-10 h-10 rounded-xl" />
              <div className="space-y-2">
                <div className="shimmer-skeleton h-5 w-56 rounded" />
                <div className="shimmer-skeleton h-3 w-32 rounded" />
              </div>
            </div>
          </div>
          <div className="p-6">
            <div className="shimmer-skeleton h-64 w-full rounded-lg" />
          </div>
        </div>
      </div>

      {/* FAQ skeleton */}
      <div className="mt-8">
        <div className="rounded-2xl border border-gray-200 bg-white overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-100">
            <div className="shimmer-skeleton h-5 w-48 rounded" />
          </div>
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="px-6 py-4 border-b border-gray-50 flex items-center justify-between">
              <div className="shimmer-skeleton h-4 w-72 rounded" />
              <div className="shimmer-skeleton w-8 h-8 rounded-lg" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
