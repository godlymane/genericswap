"use client";

import { useState } from "react";

interface NewsletterSignupProps {
  drugSlug?: string;
  drugName?: string;
  activeIngredient?: string;
  variant?: "inline" | "card" | "banner";
}

export default function NewsletterSignup({
  drugSlug,
  drugName,
  activeIngredient,
  variant = "card",
}: NewsletterSignupProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          drugSlug: drugSlug || null,
          activeIngredient: activeIngredient || null,
          alertType: drugSlug ? "patent_expiry" : "newsletter",
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setStatus("success");
        setMessage(data.message || "You're subscribed!");
        setEmail("");
      } else {
        setStatus("error");
        setMessage(data.error || "Something went wrong. Try again.");
      }
    } catch {
      setStatus("error");
      setMessage("Network error. Please try again.");
    }
  }

  if (status === "success") {
    return (
      <div className={variant === "banner" ? "bg-green-50 border border-green-200 rounded-xl p-4 text-center" : "bg-green-50 border border-green-200 rounded-xl p-6 text-center"}>
        <svg className="w-8 h-8 text-green-500 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
        <p className="font-semibold text-green-800">{message}</p>
        <p className="text-sm text-green-600 mt-1">
          {drugName
            ? `We'll notify you about ${drugName} generic availability and patent updates.`
            : "You'll receive updates on new generics and patent expirations."}
        </p>
      </div>
    );
  }

  if (variant === "banner") {
    return (
      <div className="bg-gradient-to-r from-brand-600 to-blue-700 rounded-xl p-6 text-white">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="flex-1">
            <h3 className="font-bold text-lg">
              {drugName ? `Get ${drugName} Patent Alerts` : "Generic Drug Alerts"}
            </h3>
            <p className="text-blue-100 text-sm mt-1">
              {drugName
                ? `Be first to know when new generics for ${drugName} become available.`
                : "Get notified when blockbuster drugs lose patent protection and generics hit the market."}
            </p>
          </div>
          <form onSubmit={handleSubmit} className="flex gap-2 w-full sm:w-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              className="px-4 py-2.5 rounded-lg bg-white/10 border border-white/20 text-white placeholder-blue-200 text-sm flex-1 sm:w-56 focus:outline-none focus:ring-2 focus:ring-white/30"
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="px-5 py-2.5 bg-white text-brand-700 font-semibold rounded-lg text-sm hover:bg-blue-50 transition-colors disabled:opacity-50 whitespace-nowrap"
            >
              {status === "loading" ? "..." : "Alert Me"}
            </button>
          </form>
        </div>
        {status === "error" && <p className="text-red-200 text-sm mt-2">{message}</p>}
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
      <h3 className="font-bold text-gray-900 text-lg mb-1">
        {drugName ? `${drugName} Alerts` : "Stay Updated"}
      </h3>
      <p className="text-sm text-gray-600 mb-4">
        {drugName
          ? `Get notified when new generics for ${drugName} are approved or patents expire.`
          : "Get weekly updates on new generic approvals, patent cliffs, and savings opportunities."}
      </p>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          required
          className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="px-5 py-2.5 bg-brand-600 text-white font-semibold rounded-lg text-sm hover:bg-brand-700 transition-colors disabled:opacity-50"
        >
          {status === "loading" ? "..." : drugName ? "Alert Me" : "Subscribe"}
        </button>
      </form>
      {status === "error" && <p className="text-red-500 text-sm mt-2">{message}</p>}
      <p className="text-[11px] text-gray-400 mt-3">Free. No spam. Unsubscribe anytime.</p>
    </div>
  );
}
