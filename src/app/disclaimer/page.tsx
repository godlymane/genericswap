import { generateMeta } from "@/lib/seo";
import Link from "next/link";

export const metadata = generateMeta({
  title: "Medical Disclaimer",
  description: "GenericSwap medical disclaimer. This site provides drug information only and does not offer medical advice.",
  url: "/disclaimer",
});

export default function DisclaimerPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Medical Disclaimer</h1>
      <p className="text-sm text-gray-500 mb-8">Last updated: January 2025</p>

      <div className="prose prose-gray max-w-none space-y-6 text-sm leading-relaxed text-gray-700">
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
          <p className="font-semibold text-gray-900 mb-2">Important</p>
          <p>
            GenericSwap is not a healthcare provider. The information on this website should not be
            used as a substitute for professional medical advice, diagnosis, or treatment.
          </p>
        </div>

        <h2 className="text-xl font-semibold text-gray-900 mt-8">General Information Only</h2>
        <p>
          The content on GenericSwap, including drug names, generic alternatives, therapeutic
          equivalence codes, patent information, and pricing links, is provided for general
          informational purposes only. This information is sourced from the FDA&apos;s Orange Book
          (Approved Drug Products with Therapeutic Equivalence Evaluations) and is presented as-is.
        </p>

        <h2 className="text-xl font-semibold text-gray-900 mt-8">Not Medical Advice</h2>
        <p>
          Nothing on this website should be construed as medical advice or a recommendation to use,
          change, or discontinue any medication. Specifically:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            We do not recommend specific drugs or suggest switching from brand to generic medications
          </li>
          <li>
            Therapeutic equivalence ratings (TE codes) indicate FDA-evaluated substitutability but do
            not account for individual patient factors
          </li>
          <li>
            A drug being listed as &ldquo;therapeutically equivalent&rdquo; does not mean it is
            appropriate for every patient
          </li>
          <li>
            Generic drugs may contain different inactive ingredients that could affect some patients
          </li>
          <li>Patent and exclusivity information may not reflect the most current status</li>
        </ul>

        <h2 className="text-xl font-semibold text-gray-900 mt-8">Consult Your Healthcare Provider</h2>
        <p>Always consult your doctor, pharmacist, or other qualified healthcare provider:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Before switching between brand and generic medications</li>
          <li>Before making any changes to your prescription</li>
          <li>If you have questions about drug interactions or side effects</li>
          <li>If you experience any adverse reactions to medications</li>
          <li>For personalized medical advice regarding your condition</li>
        </ul>

        <h2 className="text-xl font-semibold text-gray-900 mt-8">Data Accuracy</h2>
        <p>
          While we update our database regularly from the FDA Orange Book, we cannot guarantee that
          all information is current, complete, or error-free. Drug approvals, patent expirations,
          and market availability can change at any time. For the most current information, consult:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            The{" "}
            <a
              href="https://www.accessdata.fda.gov/scripts/cder/ob/index.cfm"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-600 hover:underline"
            >
              FDA Orange Book
            </a>{" "}
            directly
          </li>
          <li>Your pharmacist or healthcare provider</li>
          <li>
            The{" "}
            <a
              href="https://dailymed.nlm.nih.gov/dailymed/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-600 hover:underline"
            >
              DailyMed
            </a>{" "}
            database for drug labeling
          </li>
        </ul>

        <h2 className="text-xl font-semibold text-gray-900 mt-8">Pricing Information</h2>
        <p>
          Links to pharmacy price comparison services (GoodRx, Amazon Pharmacy, Cost Plus Drugs) are
          provided for convenience. Prices shown on third-party sites may vary by location, pharmacy,
          insurance coverage, and other factors. We do not guarantee the accuracy of any pricing
          information on linked sites.
        </p>

        <h2 className="text-xl font-semibold text-gray-900 mt-8">Emergency Situations</h2>
        <p>
          If you are experiencing a medical emergency, call 911 or your local emergency number
          immediately. Do not rely on information from this website in an emergency situation.
        </p>

        <h2 className="text-xl font-semibold text-gray-900 mt-8">Limitation of Liability</h2>
        <p>
          GenericSwap, its operators, contributors, and affiliates shall not be held liable for any
          damages, injuries, or losses arising from the use of or reliance on information provided on
          this website. By using this site, you acknowledge and agree that you do so at your own
          risk.
        </p>

        <p className="mt-8 text-gray-500">
          For more information about our terms and practices, please review our{" "}
          <Link href="/terms" className="text-brand-600 hover:underline">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link href="/privacy" className="text-brand-600 hover:underline">
            Privacy Policy
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
