// OPTIMIZED: Route-level loading skeleton for compare pages
import { DrugCardSkeleton } from "@/components/Skeleton";

export default function Loading() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 animate-pulse">
      <div className="h-4 w-48 bg-gray-200 rounded mb-6 shimmer-skeleton" />
      <div className="h-8 w-96 bg-gray-200 rounded mb-2 shimmer-skeleton" />
      <div className="h-4 w-64 bg-gray-200 rounded mb-8 shimmer-skeleton" />
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <DrugCardSkeleton />
        <DrugCardSkeleton />
      </div>
      <div className="h-64 bg-gray-100 rounded-xl shimmer-skeleton" />
    </div>
  );
}
