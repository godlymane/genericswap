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
    <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold text-brand-700">
          {SITE_NAME}
        </Link>

        {/* Desktop nav */}
        <nav className="hidden sm:flex items-center gap-6 text-sm">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Mobile hamburger */}
        <button
          onClick={() => setOpen(!open)}
          className="sm:hidden p-2 -mr-2 text-gray-600 hover:text-gray-900"
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
        <nav className="sm:hidden border-t border-gray-100 bg-white">
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
