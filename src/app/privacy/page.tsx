import { generateMeta } from "@/lib/seo";

export const metadata = generateMeta({
  title: "Privacy Policy",
  description: "GenericSwap privacy policy. Learn how we collect, use, and protect your information.",
  url: "/privacy",
});

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Privacy Policy</h1>
      <p className="text-sm text-gray-500 mb-8">Last updated: January 2025</p>

      <div className="prose prose-gray max-w-none space-y-6 text-sm leading-relaxed text-gray-700">
        <h2 className="text-xl font-semibold text-gray-900 mt-8">Information We Collect</h2>
        <p>
          GenericSwap does not require user registration or collect personal information directly. We
          may collect the following non-personal data automatically when you visit our site:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Browser type and version</li>
          <li>Operating system</li>
          <li>Pages visited and time spent</li>
          <li>Referring website</li>
          <li>Approximate geographic location (country/region level)</li>
          <li>Search queries entered on our site</li>
        </ul>

        <h2 className="text-xl font-semibold text-gray-900 mt-8">How We Use Information</h2>
        <p>We use this non-personal information to:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Improve our website content and user experience</li>
          <li>Analyze site usage patterns and trends</li>
          <li>Monitor and prevent technical issues</li>
          <li>Serve relevant advertisements</li>
        </ul>

        <h2 className="text-xl font-semibold text-gray-900 mt-8">Cookies and Tracking</h2>
        <p>
          We use cookies and similar tracking technologies to enhance your browsing experience.
          Third-party services on our site may also use cookies:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>Google Analytics:</strong> We use Google Analytics to understand how visitors
            interact with our site. Google Analytics uses cookies to collect anonymous usage data.
            You can opt out by installing the{" "}
            <a
              href="https://tools.google.com/dlpage/gaoptout"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-600 hover:underline"
            >
              Google Analytics Opt-out Browser Add-on
            </a>
            .
          </li>
          <li>
            <strong>Advertising Partners:</strong> Our ad network partners may use cookies to serve
            personalized ads based on your browsing history. You can manage your ad preferences
            through your browser settings or visit{" "}
            <a
              href="https://optout.aboutads.info/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-600 hover:underline"
            >
              aboutads.info
            </a>{" "}
            to opt out of interest-based advertising.
          </li>
        </ul>

        <h2 className="text-xl font-semibold text-gray-900 mt-8">Third-Party Links</h2>
        <p>
          Our site contains links to third-party websites including pharmacy price comparison
          services (GoodRx, Amazon Pharmacy, Cost Plus Drugs) and the FDA website. We are not
          responsible for the privacy practices of these external sites. We encourage you to review
          their privacy policies before providing any personal information.
        </p>

        <h2 className="text-xl font-semibold text-gray-900 mt-8">Affiliate Disclosure</h2>
        <p>
          Some links on GenericSwap are affiliate links, meaning we may earn a commission if you
          click through and make a purchase. This does not affect the information we present or the
          price you pay. Our drug data comes directly from the FDA Orange Book and is not influenced
          by affiliate relationships.
        </p>

        <h2 className="text-xl font-semibold text-gray-900 mt-8">Data Security</h2>
        <p>
          We implement reasonable security measures to protect the information collected through our
          site. However, no method of transmission over the internet is 100% secure, and we cannot
          guarantee absolute security.
        </p>

        <h2 className="text-xl font-semibold text-gray-900 mt-8">Children&apos;s Privacy</h2>
        <p>
          GenericSwap is not directed at children under 13. We do not knowingly collect personal
          information from children. If you believe a child has provided us with personal
          information, please contact us so we can delete it.
        </p>

        <h2 className="text-xl font-semibold text-gray-900 mt-8">Changes to This Policy</h2>
        <p>
          We may update this privacy policy from time to time. Changes will be posted on this page
          with an updated revision date. Your continued use of the site after changes constitutes
          acceptance of the updated policy.
        </p>

        <h2 className="text-xl font-semibold text-gray-900 mt-8">Contact Us</h2>
        <p>
          If you have questions about this privacy policy, please contact us at{" "}
          <a href="mailto:privacy@genericswap.com" className="text-brand-600 hover:underline">
            privacy@genericswap.com
          </a>
          .
        </p>
      </div>
    </div>
  );
}
