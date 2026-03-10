"use client";

import { useEffect, useState, useCallback } from "react";

const DRUG_NAMES = [
  "Lipitor",
  "Metformin",
  "Adderall",
  "Ozempic",
  "Xanax",
  "Ambien",
  "Prozac",
  "Zoloft",
  "Viagra",
  "Any Drug",
];

export default function TypedDrugName() {
  const [displayText, setDisplayText] = useState("");
  const [drugIndex, setDrugIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const tick = useCallback(() => {
    const current = DRUG_NAMES[drugIndex];

    if (isPaused) return;

    if (!isDeleting) {
      // Typing
      if (displayText.length < current.length) {
        setDisplayText(current.substring(0, displayText.length + 1));
      } else {
        // Finished typing, pause then delete
        setIsPaused(true);
        setTimeout(() => {
          setIsPaused(false);
          // If it's the last one ("Any Drug"), stay
          if (drugIndex === DRUG_NAMES.length - 1) {
            setIsPaused(true); // Stay forever
            return;
          }
          setIsDeleting(true);
        }, 2000);
      }
    } else {
      // Deleting
      if (displayText.length > 0) {
        setDisplayText(current.substring(0, displayText.length - 1));
      } else {
        setIsDeleting(false);
        setDrugIndex((prev) => (prev + 1) % DRUG_NAMES.length);
      }
    }
  }, [displayText, drugIndex, isDeleting, isPaused]);

  useEffect(() => {
    const speed = isDeleting ? 40 : 80;
    const timer = setTimeout(tick, speed);
    return () => clearTimeout(timer);
  }, [tick, isDeleting]);

  return (
    <span className="bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500 bg-clip-text text-transparent">
      for {displayText}
      <span className="inline-block w-[3px] h-[0.85em] bg-cyan-400 ml-0.5 align-text-bottom animate-blink" />
    </span>
  );
}
