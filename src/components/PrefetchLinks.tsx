"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

/** Prefetch common pages when the browser is idle */
const PREFETCH_ROUTES = [
  "/search",
  "/search/advanced",
  "/trending",
  "/patent-cliffs",
];

export default function PrefetchLinks() {
  const router = useRouter();

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Use requestIdleCallback to prefetch when the browser is idle
    const prefetch = () => {
      PREFETCH_ROUTES.forEach((route) => {
        router.prefetch(route);
      });
    };

    if ("requestIdleCallback" in window) {
      const id = window.requestIdleCallback(prefetch, { timeout: 3000 });
      return () => window.cancelIdleCallback(id);
    } else {
      const timeout = setTimeout(prefetch, 2000);
      return () => clearTimeout(timeout);
    }
  }, [router]);

  return null;
}
