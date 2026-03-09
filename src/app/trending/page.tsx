import Link from "next/link";
import { getRecentlyApprovedGenerics, getUpcomingPatentCliffs } from "@/lib/queries";
import { generateMeta } from "@/lib/seo";
import NewsletterSignup from "@/components/NewsletterSignup";

export const revalidate = 86400; // Daily

export const metadata = generateMeta({
  title: "Trending Generics — Recently Approved & Upcoming",
  description:
    "See the latest FDA-approved generic drugs and upcoming patent expirations. Stay ahead of new generic availability and potential savings.",
  url: "/trending",
});

export default async function TrendingPage() {
  const [recentGenerics, upcomingCliffs] = await Promise.all([
    getRecentlyApprovedGenerics(12),
    getUpcomingPatentCliffs(2),
  ]);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
        Trending in Generic Drugs
      </h1>
      <p className="text-gray-600 mb-8">
        Recently approved generics and drugs about to lose patent protection.
      </p>

      {/* Recently Approved Generics */}
      <section className="mb-12">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-900">Recently Approved Generics</h2>
          <span className="text-sm bg-green-100 text-green-700 px-3 py-1 rounded-full font-medium">
            Last 12 months
          </span>
        </div>

        {recentGenerics.length > 0 ? (
          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
            <div className="divide-y divide-gray-100">
              {recentGenerics.map((drug) => (
                <Link
                  key={drug.id}
                  href={`/drug/${drug.slug}`}
                  className="flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-gray-900">{drug.tradeName}</p>
                      <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                        Generic
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 mt-0.5">
                      {drug.activeIngredient}
                      {drug.dosageForm && ` · ${drug.dosageForm}`}
                      {drug.applicant && ` · ${drug.applicant}`}
                    </p>
                  </div>
                  <div className="text-right flex-shrink-0 ml-4">
                    <p className="text-sm font-medium text-gray-700">
                      {drug.approvalDate
                        ? new Date(drug.approvalDate).toLocaleDateString("en-US", {
                            month: "short",
                            year: "numeric",
                          })
                        : "—"}
                    </p>
                    <p className="text-xs text-gray-400">Approved</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ) : (
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-8 text-center">
            <p className="text-gray-500">No recently approved generics found.</p>
            <p className="text-sm text-gray-400 mt-1">Data updates weekly from the FDA Orange Book.</p>
          </div>
        )}
      </section>

      {/* Upcoming Patent Expirations */}
      <section className="mb-12">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-900">Expiring Soon</h2>
          <Link href="/patent-cliffs" className="text-sm text-brand-600 hover:underline font-medium">
            View all patent cliffs →
          </Link>
        </div>

        {upcomingCliffs.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {upcomingCliffs.slice(0, 10).map((c) => {
              const daysLeft = Math.ceil(
                (c.earliestExpiry.getTime() - Date.now()) / (1000 * 60 * 60 * 24)
              );
              const months = Math.ceil(daysLeft / 30);

              return (
                <Link
                  key={c.drug.id}
                  href={`/drug/${c.drug.slug}`}
                  className="bg-white border border-gray-200 rounded-xl p-5 hover:border-brand-300 hover:shadow-sm transition-all"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-semibold text-gray-900">{c.drug.tradeName}</p>
                      <p className="text-sm text-gray-500 mt-0.5">{c.drug.activeIngredient}</p>
                    </div>
                    <span
                      className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                        daysLeft < 365
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {months < 12 ? `${months}mo` : `${Math.round(months / 12)}yr`}
                    </span>
                  </div>
                  <div className="mt-3 flex items-center gap-2">
                    <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-yellow-400 to-red-400 rounded-full"
                        style={{ width: `${Math.max(5, 100 - (daysLeft / 1825) * 100)}%` }}
                      />
                    </div>
                    <span className="text-[10px] text-gray-400">
                      {c.earliestExpiry.toLocaleDateString("en-US", { month: "short", year: "numeric" })}
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-8 text-center">
            <p className="text-gray-500">No upcoming expirations found.</p>
          </div>
        )}
      </section>

      {/* Newsletter */}
      <NewsletterSignup variant="banner" />
    </div>
  );
}
