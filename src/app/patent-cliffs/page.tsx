import Link from "next/link";
import { getUpcomingPatentCliffs } from "@/lib/queries";
import { generateMeta } from "@/lib/seo";
import NewsletterSignup from "@/components/NewsletterSignup";

export const dynamic = "force-dynamic"; // Heavy queries — render on-demand, not at build time

export const metadata = generateMeta({
  title: "Patent Cliff Dashboard — Upcoming Drug Patent Expirations",
  description:
    "Track upcoming drug patent expirations. See which blockbuster drugs are losing patent protection and when new generic alternatives will become available.",
  url: "/patent-cliffs",
});

export default async function PatentCliffPage() {
  const cliffs = await getUpcomingPatentCliffs(5);

  // Group by year
  const byYear = new Map<number, typeof cliffs>();
  for (const c of cliffs) {
    const year = c.earliestExpiry.getFullYear();
    if (!byYear.has(year)) byYear.set(year, []);
    byYear.get(year)!.push(c);
  }

  const years = Array.from(byYear.keys()).sort();

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
          Patent Cliff Dashboard
        </h1>
        <p className="text-gray-600 max-w-2xl">
          Track when blockbuster drugs lose patent protection. When patents expire, generic
          manufacturers can enter the market — typically reducing prices by 80-85%.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
        {years.slice(0, 4).map((year) => (
          <div key={year} className="bg-white border border-gray-200 rounded-xl p-5 text-center">
            <p className="text-2xl font-bold text-brand-700">{byYear.get(year)!.length}</p>
            <p className="text-sm text-gray-500">{year} expirations</p>
          </div>
        ))}
      </div>

      {/* Timeline by Year */}
      {years.map((year) => {
        const drugs = byYear.get(year)!;
        return (
          <section key={year} className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <h2 className="text-2xl font-bold text-gray-900">{year}</h2>
              <span className="text-sm bg-brand-100 text-brand-700 px-2.5 py-0.5 rounded-full font-medium">
                {drugs.length} drug{drugs.length !== 1 ? "s" : ""}
              </span>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-50 text-left">
                      <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Drug</th>
                      <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Active Ingredient</th>
                      <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Patent Expiry</th>
                      <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Manufacturer</th>
                      <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Days Left</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {drugs.map((c) => {
                      const daysLeft = Math.ceil(
                        (c.earliestExpiry.getTime() - Date.now()) / (1000 * 60 * 60 * 24)
                      );
                      const isUrgent = daysLeft < 365;

                      return (
                        <tr key={c.drug.id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4">
                            <Link
                              href={`/drug/${c.drug.slug}`}
                              className="font-medium text-brand-700 hover:underline"
                            >
                              {c.drug.tradeName}
                            </Link>
                          </td>
                          <td className="px-6 py-4 text-gray-600">{c.drug.activeIngredient}</td>
                          <td className="px-6 py-4 text-gray-600">
                            {c.earliestExpiry.toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </td>
                          <td className="px-6 py-4 text-gray-600">{c.drug.applicant || "—"}</td>
                          <td className="px-6 py-4">
                            <span
                              className={`text-xs font-semibold px-2 py-1 rounded-full ${
                                isUrgent
                                  ? "bg-red-100 text-red-700"
                                  : "bg-green-100 text-green-700"
                              }`}
                            >
                              {daysLeft > 0 ? `${daysLeft}d` : "Expired"}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        );
      })}

      {cliffs.length === 0 && (
        <div className="text-center py-16">
          <p className="text-gray-500 text-lg">No upcoming patent expirations found.</p>
          <p className="text-sm text-gray-400 mt-2">
            Run the data ingestion script to populate patent data.
          </p>
        </div>
      )}

      {/* Newsletter CTA */}
      <div className="mt-12">
        <NewsletterSignup variant="banner" />
      </div>

      {/* SEO Content */}
      <section className="mt-12 max-w-3xl">
        <h2 className="text-xl font-semibold text-gray-900 mb-3">
          What is a Patent Cliff?
        </h2>
        <div className="text-sm text-gray-700 space-y-3 leading-relaxed">
          <p>
            A &ldquo;patent cliff&rdquo; occurs when a pharmaceutical company&apos;s patent protection
            expires on a major drug product. Once patents expire, generic drug manufacturers can submit
            Abbreviated New Drug Applications (ANDAs) to the FDA to produce cheaper versions of the
            original medication.
          </p>
          <p>
            Patent cliffs are significant events in the pharmaceutical industry because they typically
            result in rapid price decreases of 80-85% for consumers. The FDA Orange Book tracks all
            patent and exclusivity data for approved drugs.
          </p>
          <p>
            This dashboard automatically tracks upcoming patent expirations using official FDA data,
            helping consumers, healthcare providers, and industry professionals anticipate when new
            generic alternatives may become available.
          </p>
        </div>
      </section>
    </div>
  );
}
