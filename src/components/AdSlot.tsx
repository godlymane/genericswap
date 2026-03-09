"use client";

import { useEffect, useRef, useState } from "react";

interface AdSlotProps {
  id: string;
  className?: string;
}

export default function AdSlot({ id, className = "" }: AdSlotProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

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

  return (
    <div
      ref={ref}
      id={id}
      className={`ad-slot my-8 ${className}`}
      data-ad-slot={id}
      aria-hidden="true"
    >
      {isVisible && (
        <div className="min-h-[90px]">
          {/* Ad network script will fill this div */}
        </div>
      )}
    </div>
  );
}
