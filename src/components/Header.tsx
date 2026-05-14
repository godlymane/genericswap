"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SITE_NAME } from "@/lib/constants";

const NAV_LINKS = [
  { href: "/guides", label: "Guides" },
  { href: "/search/advanced", label: "Advanced Search" },
  { href: "/patent-cliffs", label: "Patent Cliffs" },
  { href: "/trending", label: "Trending" },
  { href: "/state-laws", label: "State Laws" },
  { href: "/api-docs", label: "API" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 20);
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 backdrop-blur-xl border-b border-gray-200/60 shadow-sm"
          : isHome
            ? "bg-transparent border-b border-transparent"
            : "bg-white/80 backdrop-blur-md border-b border-gray-200/60"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 group">
          {/* Capsule logo icon */}
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <rect x="4" y="2" width="16" height="20" rx="8" fill="#3b82f6" />
              <rect x="4" y="2" width="16" height="10" rx="8" fill="#22d3ee" />
              <rect x="4" y="11" width="16" height="2" fill="#0f172a" opacity="0.2" />
              <rect x="8" y="4" width="3" height="6" rx="1.5" fill="white" opacity="0.4" />
            </svg>
          </div>
          <span
            className={`text-lg font-bold transition-colors ${
              scrolled || !isHome
                ? "text-gray-900 group-hover:text-brand-700"
                : "text-white group-hover:text-cyan-300"
            }`}
          >
            {SITE_NAME}
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden sm:flex items-center gap-1 text-sm">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`nav-link px-3 py-1.5 rounded-lg transition-all ${
                  isActive
                    ? scrolled || !isHome
                      ? "text-brand-700 bg-brand-50 font-medium"
                      : "text-cyan-300 bg-white/10 font-medium"
                    : scrolled || !isHome
                      ? "text-gray-600 hover:text-gray-900 hover:bg-gray-100/80"
                      : "text-slate-300 hover:text-white hover:bg-white/10"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Mobile hamburger */}
        <button
          onClick={() => setOpen(!open)}
          className={`sm:hidden p-2 -mr-2 rounded-lg transition-colors ${
            scrolled || !isHome
              ? "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              : "text-slate-300 hover:text-white hover:bg-white/10"
          }`}
          aria-label="Toggle menu"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            {open ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu with slide animation */}
      <div
        className={`sm:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="border-t border-gray-100 bg-white/95 backdrop-blur-md">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`block px-4 py-3 text-sm border-b border-gray-50 transition-colors ${
                  isActive
                    ? "text-brand-700 bg-brand-50 font-medium"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <Link
            href="/search"
            className="block px-4 py-3 text-sm text-brand-600 font-medium hover:bg-gray-50 border-t border-gray-100"
          >
            Quick Search
          </Link>
        </nav>
      </div>
    </header>
  );
}
