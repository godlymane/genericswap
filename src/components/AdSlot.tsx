"use client";

import { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

interface AdSlotProps {
  slot: string;
  format?: "auto" | "horizontal" | "vertical" | "rectangle";
  responsive?: boolean;
  className?: string;
}

export default function AdSlot({
  slot,
  format = "auto",
  responsive = true,
  className = "",
}: AdSlotProps) {
  const ref = useRef<HTMLDivElement>(null);
  const pushed = useRef(false);
  const [isVisible, setIsVisible] = useState(false);
  const [hasConsent, setHasConsent] = useState(false);

  const pubId = process.env.NEXT_PUBLIC_ADSENSE_PUB_ID;

  // Listen for cookie consent
  useEffect(() => {
    function check() {
      setHasConsent(localStorage.getItem("cookie-consent") === "accepted");
    }
    check();
    window.addEventListener("cookie-consent-granted", check);
    return () => window.removeEventListener("cookie-consent-granted", check);
  }, []);

  // Intersection observer for lazy loading
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  // Push the ad once visible + consent given
  useEffect(() => {
    if (!isVisible || !hasConsent || !pubId || pushed.current) return;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
      pushed.current = true;
    } catch {
      // AdSense not loaded yet or ad blocker active
    }
  }, [isVisible, hasConsent, pubId]);

  if (!pubId) return null;

  return (
    <div ref={ref} className={`ad-slot my-8 ${className}`} aria-hidden="true">
      {isVisible && hasConsent && (
        <ins
          className="adsbygoogle"
          style={{ display: "block" }}
          data-ad-client={pubId}
          data-ad-slot={slot}
          data-ad-format={format}
          {...(responsive ? { "data-full-width-responsive": "true" } : {})}
        />
      )}
    </div>
  );
}
