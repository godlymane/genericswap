"use client";

import dynamic from "next/dynamic";

const HeroCanvas = dynamic(() => import("@/components/HeroCanvas"), {
  ssr: false,
});

export default function HeroCanvasWrapper() {
  return <HeroCanvas />;
}
