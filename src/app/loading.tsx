export default function Loading() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="animate-pulse space-y-6">
        <div className="h-4 bg-gray-200 rounded w-48" />
        <div className="h-8 bg-gray-200 rounded w-96" />
        <div className="h-4 bg-gray-200 rounded w-64" />

        <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="space-y-2">
                <div className="h-3 bg-gray-200 rounded w-20" />
                <div className="h-5 bg-gray-200 rounded w-32" />
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100">
            <div className="h-5 bg-gray-200 rounded w-48" />
          </div>
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="px-6 py-3 border-b border-gray-50 flex gap-4">
              <div className="h-4 bg-gray-200 rounded w-32" />
              <div className="h-4 bg-gray-200 rounded w-24" />
              <div className="h-4 bg-gray-200 rounded w-20" />
              <div className="h-4 bg-gray-200 rounded w-16" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
