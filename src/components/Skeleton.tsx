interface SkeletonProps {
  className?: string;
  variant?: "text" | "circular" | "rectangular";
  width?: string | number;
  height?: string | number;
  count?: number;
}

export default function Skeleton({
  className = "",
  variant = "rectangular",
  width,
  height,
  count = 1,
}: SkeletonProps) {
  const baseClasses = "shimmer-skeleton";
  const variantClasses = {
    text: "rounded",
    circular: "rounded-full",
    rectangular: "rounded-lg",
  };

  const style: React.CSSProperties = {};
  if (width) style.width = typeof width === "number" ? `${width}px` : width;
  if (height) style.height = typeof height === "number" ? `${height}px` : height;

  if (count === 1) {
    return (
      <div
        className={`${baseClasses} ${variantClasses[variant]} ${className}`}
        style={style}
      />
    );
  }

  return (
    <div className="space-y-2">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className={`${baseClasses} ${variantClasses[variant]} ${className}`}
          style={style}
        />
      ))}
    </div>
  );
}

/** Skeleton card matching DrugInfoCard shape */
export function DrugCardSkeleton() {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-lg shadow-gray-100/50">
      <div className="h-1.5 shimmer-skeleton rounded-none" />
      <div className="p-6 sm:p-8 space-y-6">
        {/* Header */}
        <div className="flex items-start gap-4">
          <div className="shimmer-skeleton w-14 h-14 rounded-2xl" />
          <div className="space-y-2 flex-1">
            <div className="shimmer-skeleton h-7 w-48 rounded-lg" />
            <div className="shimmer-skeleton h-4 w-64 rounded" />
          </div>
        </div>
        {/* Info grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-5">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="space-y-2">
              <div className="shimmer-skeleton h-3 w-16 rounded" />
              <div className="shimmer-skeleton h-5 w-24 rounded" />
            </div>
          ))}
        </div>
        {/* Banner */}
        <div className="shimmer-skeleton h-16 w-full rounded-xl" />
      </div>
    </div>
  );
}

/** Skeleton matching ComparisonTable shape */
export function TableSkeleton() {
  return (
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
      <div className="px-6 py-3 border-b border-gray-100 flex gap-8">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="shimmer-skeleton h-3 w-20 rounded" />
        ))}
      </div>
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="px-6 py-4 border-b border-gray-50 flex items-center gap-6">
          <div className="flex items-center gap-2.5">
            <div className="shimmer-skeleton w-8 h-8 rounded-lg" />
            <div className="shimmer-skeleton h-4 w-28 rounded" />
          </div>
          <div className="shimmer-skeleton h-5 w-12 rounded-full" />
          <div className="shimmer-skeleton h-4 w-20 rounded" />
          <div className="shimmer-skeleton h-4 w-16 rounded" />
          <div className="shimmer-skeleton h-5 w-16 rounded-full" />
        </div>
      ))}
    </div>
  );
}

/** Skeleton matching SwitchScore shape */
export function ScoreSkeleton() {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-lg shadow-gray-100/50">
      <div className="h-1.5 shimmer-skeleton rounded-none" />
      <div className="p-6 sm:p-8">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <div className="shimmer-skeleton h-5 w-40 rounded" />
            <div className="shimmer-skeleton h-3 w-24 rounded" />
          </div>
          <div className="shimmer-skeleton w-28 h-28 rounded-full" />
        </div>
        <div className="shimmer-skeleton h-12 w-full rounded-xl mt-4" />
      </div>
    </div>
  );
}
