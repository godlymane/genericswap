import { generateMeta } from "@/lib/seo";
import Link from "next/link";

export const metadata = generateMeta({
  title: "Contact Us",
  description: "Get in touch with the GenericSwap team. Questions, feedback, or partnership inquiries.",
  url: "/contact",
});

export default function ContactPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Contact Us</h1>

      <div className="prose prose-gray max-w-none space-y-6 text-sm leading-relaxed text-gray-700">
        <p>
          Have questions, feedback, or found an error? We&apos;d love to hear from you. Use the
          appropriate email below depending on your inquiry.
        </p>

        <div className="grid gap-4 sm:grid-cols-2 mt-8">
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <h3 className="font-semibold text-gray-900 mb-2">General Inquiries</h3>
            <p className="text-gray-600 mb-3">
              Questions about the site, data, or feature requests.
            </p>
            <a
              href="mailto:hello@genericswap.com"
              className="text-brand-600 hover:underline font-medium"
            >
              hello@genericswap.com
            </a>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <h3 className="font-semibold text-gray-900 mb-2">Data Corrections</h3>
            <p className="text-gray-600 mb-3">
              Report incorrect drug information or missing data.
            </p>
            <a
              href="mailto:data@genericswap.com"
              className="text-brand-600 hover:underline font-medium"
            >
              data@genericswap.com
            </a>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <h3 className="font-semibold text-gray-900 mb-2">Partnerships &amp; Advertising</h3>
            <p className="text-gray-600 mb-3">
              Business partnerships, advertising, or sponsorship inquiries.
            </p>
            <a
              href="mailto:partners@genericswap.com"
              className="text-brand-600 hover:underline font-medium"
            >
              partners@genericswap.com
            </a>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <h3 className="font-semibold text-gray-900 mb-2">Legal &amp; Privacy</h3>
            <p className="text-gray-600 mb-3">
              Legal questions, DMCA notices, or privacy concerns.
            </p>
            <a
              href="mailto:legal@genericswap.com"
              className="text-brand-600 hover:underline font-medium"
            >
              legal@genericswap.com
            </a>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mt-8">
          <h3 className="font-semibold text-gray-900 mb-2">Before You Contact Us</h3>
          <p className="text-gray-600">
            Please check if your question is answered on one of these pages:
          </p>
          <ul className="list-disc pl-6 space-y-1 mt-3">
            <li>
              <Link href="/about" className="text-brand-600 hover:underline">
                About GenericSwap
              </Link>{" "}
              &mdash; How our site works and where our data comes from
            </li>
            <li>
              <Link href="/disclaimer" className="text-brand-600 hover:underline">
                Medical Disclaimer
              </Link>{" "}
              &mdash; Important information about our data limitations
            </li>
            <li>
              <Link href="/privacy" className="text-brand-600 hover:underline">
                Privacy Policy
              </Link>{" "}
              &mdash; How we handle your data
            </li>
            <li>
              <Link href="/terms" className="text-brand-600 hover:underline">
                Terms of Service
              </Link>{" "}
              &mdash; Rules for using the site
            </li>
          </ul>
        </div>

        <p className="text-gray-500 mt-8">
          We typically respond within 1&ndash;2 business days. For urgent medical questions, please
          contact your healthcare provider directly.
        </p>
      </div>
    </div>
  );
}
