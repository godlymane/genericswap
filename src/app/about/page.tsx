import { generateMeta } from "@/lib/seo";
import Link from "next/link";

export const metadata = generateMeta({
  title: "About GenericSwap",
  description: "GenericSwap uses FDA Orange Book data to help consumers find generic drug alternatives and save on prescription costs.",
  url: "/about",
});

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">About GenericSwap</h1>

      <div className="prose prose-gray max-w-none space-y-6 text-sm leading-relaxed text-gray-700">
        <p>
          GenericSwap is a free tool that helps Americans find FDA-approved generic alternatives for
          brand-name prescription drugs. Our goal is to make prescription drug information transparent
          and accessible, helping consumers make informed decisions about their medications.
        </p>

        <h2 className="text-xl font-semibold text-gray-900 mt-8">Our Data Source</h2>
        <p>
          All drug information on GenericSwap comes from the FDA&apos;s Orange Book (Approved Drug
          Products with Therapeutic Equivalence Evaluations). This is a public database maintained by
          the U.S. Food and Drug Administration that lists all approved prescription drug products,
          their therapeutic equivalence ratings, and patent/exclusivity information.
        </p>
        <p>
          We update our database weekly to ensure accuracy. However, for the most current information,
          always check the{" "}
          <a
            href="https://www.accessdata.fda.gov/scripts/cder/ob/index.cfm"
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand-600 hover:underline"
          >
            FDA Orange Book website
          </a>{" "}
          directly.
        </p>

        <h2 className="text-xl font-semibold text-gray-900 mt-8">What We Provide</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>Generic alternatives for any brand-name drug in the FDA Orange Book</li>
          <li>Therapeutic equivalence ratings (TE codes) explaining substitutability</li>
          <li>Patent expiration timelines showing when generics become available</li>
          <li>Manufacturer information for all approved generic versions</li>
          <li>Original guides that explain how to discuss substitutions and savings with a pharmacist</li>
        </ul>

        <h2 className="text-xl font-semibold text-gray-900 mt-8">How We Review Content</h2>
        <p>
          Our database pages organize public FDA information, while our guides add original
          explanations, checklists, and context for consumers. Read our{" "}
          <Link href="/editorial-policy" className="text-brand-600 hover:underline">
            editorial policy
          </Link>{" "}
          for details about sourcing, updates, corrections, advertising, and medical limits.
        </p>

        <h2 className="text-xl font-semibold text-gray-900 mt-8">Important Notice</h2>
        <p>
          GenericSwap is an informational resource only. We do not provide medical advice, diagnosis,
          or treatment recommendations. Always consult your doctor or pharmacist before making changes
          to your medication. See our full{" "}
          <Link href="/disclaimer" className="text-brand-600 hover:underline">
            medical disclaimer
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
