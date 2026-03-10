"use client";

import { useState } from "react";
import Link from "next/link";
import { SITE_NAME } from "@/lib/constants";

const NAV_LINKS = [
  { href: "/search/advanced", label: "Advanced Search" },
  { href: "/patent-cliffs", label: "Patent Cliffs" },
  { href: "/trending", label: "Trending" },
  { href: "/state-laws", label: "State Laws" },
  { href: "/api-docs", label: "API" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-gray-200/60 sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          {/* Capsule logo icon */}
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center shadow-sm">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <rect x="4" y="2" width="16" height="20" rx="8" fill="#3b82f6" />
              <rect x="4" y="2" width="16" height="10" rx="8" fill="#22d3ee" />
              <rect x="4" y="11" width="16" height="2" fill="#0f172a" opacity="0.2" />
              <rect x="8" y="4" width="3" height="6" rx="1.5" fill="white" opacity="0.4" />
            </svg>
          </div>
          <span className="text-lg font-bold text-gray-900 group-hover:text-brand-700 transition-colors">
            {SITE_NAME}
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden sm:flex items-center gap-1 text-sm">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-3 py-1.5 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100/80 transition-all"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Mobile hamburger */}
        <button
          onClick={() => setOpen(!open)}
          className="sm:hidden p-2 -mr-2 text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-100"
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

      {/* Mobile menu */}
      {open && (
        <nav className="sm:hidden border-t border-gray-100 bg-white/95 backdrop-blur-md">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 border-b border-gray-50"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/search"
            onClick={() => setOpen(false)}
            className="block px-4 py-3 text-sm text-brand-600 font-medium hover:bg-gray-50 border-t border-gray-100"
          >
            Quick Search
          </Link>
        </nav>
      )}
    </header>
  );
}
