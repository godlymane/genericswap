"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="max-w-2xl mx-auto px-4 py-20 text-center">
      <h1 className="text-4xl font-bold text-gray-900 mb-3">Something went wrong</h1>
      <p className="text-gray-600 mb-8">
        We had trouble loading this page. This could be a temporary issue &mdash; please try again.
      </p>
      <button
        onClick={reset}
        className="inline-flex items-center justify-center px-6 py-2.5 bg-brand-600 text-white rounded-lg text-sm font-medium hover:bg-brand-700 transition-colors"
      >
        Try Again
      </button>
    </div>
  );
}
