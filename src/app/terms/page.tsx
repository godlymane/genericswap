import { generateMeta } from "@/lib/seo";

export const metadata = generateMeta({
  title: "Terms of Service",
  description: "GenericSwap terms of service. Read our terms and conditions for using this website.",
  url: "/terms",
});

export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Terms of Service</h1>
      <p className="text-sm text-gray-500 mb-8">Last updated: January 2025</p>

      <div className="prose prose-gray max-w-none space-y-6 text-sm leading-relaxed text-gray-700">
        <h2 className="text-xl font-semibold text-gray-900 mt-8">Acceptance of Terms</h2>
        <p>
          By accessing and using GenericSwap (&ldquo;the Site&rdquo;), you agree to be bound by
          these Terms of Service. If you do not agree to these terms, please do not use the Site.
        </p>

        <h2 className="text-xl font-semibold text-gray-900 mt-8">Description of Service</h2>
        <p>
          GenericSwap provides information about FDA-approved prescription drugs, including generic
          alternatives, therapeutic equivalence ratings, patent information, and links to pharmacy
          price comparison services. All drug data is sourced from the FDA&apos;s Orange Book
          database.
        </p>

        <h2 className="text-xl font-semibold text-gray-900 mt-8">Not Medical Advice</h2>
        <p>
          The information on GenericSwap is for informational purposes only and does not constitute
          medical advice, diagnosis, or treatment recommendations. Always consult a qualified
          healthcare provider before making decisions about your medications. Never disregard
          professional medical advice or delay seeking it because of information found on this Site.
        </p>

        <h2 className="text-xl font-semibold text-gray-900 mt-8">Accuracy of Information</h2>
        <p>
          While we strive to provide accurate and up-to-date information from the FDA Orange Book,
          we make no warranties or representations about the completeness, accuracy, or reliability
          of any information on the Site. Drug information, prices, availability, and patent status
          may change without notice. Users should verify all information with their healthcare
          provider or pharmacist.
        </p>

        <h2 className="text-xl font-semibold text-gray-900 mt-8">Use Restrictions</h2>
        <p>You agree not to:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Use the Site for any unlawful purpose</li>
          <li>Scrape, crawl, or use automated tools to extract data in bulk without permission</li>
          <li>Attempt to interfere with or disrupt the Site&apos;s operation</li>
          <li>Reproduce, distribute, or create derivative works from our content without permission</li>
          <li>Use the Site to provide medical advice to others</li>
          <li>Misrepresent information obtained from the Site</li>
        </ul>

        <h2 className="text-xl font-semibold text-gray-900 mt-8">Intellectual Property</h2>
        <p>
          The Site&apos;s design, layout, and original content are protected by copyright. The
          underlying drug data is sourced from the FDA&apos;s public Orange Book database. FDA data
          is in the public domain, but our compilation, presentation, and analysis of this data are
          proprietary.
        </p>

        <h2 className="text-xl font-semibold text-gray-900 mt-8">Third-Party Links</h2>
        <p>
          The Site contains links to third-party websites, including pharmacy price comparison
          services. These links are provided for convenience and may include affiliate links through
          which we earn commissions. We do not control or endorse these third-party sites and are not
          responsible for their content, practices, or availability.
        </p>

        <h2 className="text-xl font-semibold text-gray-900 mt-8">Limitation of Liability</h2>
        <p>
          To the fullest extent permitted by law, GenericSwap and its operators shall not be liable
          for any direct, indirect, incidental, special, consequential, or punitive damages arising
          from your use of the Site, including but not limited to damages resulting from reliance on
          drug information, medication decisions, or interactions with third-party services linked
          from the Site.
        </p>

        <h2 className="text-xl font-semibold text-gray-900 mt-8">Disclaimer of Warranties</h2>
        <p>
          The Site is provided &ldquo;as is&rdquo; and &ldquo;as available&rdquo; without warranties
          of any kind, either express or implied, including but not limited to implied warranties of
          merchantability, fitness for a particular purpose, or non-infringement.
        </p>

        <h2 className="text-xl font-semibold text-gray-900 mt-8">Changes to Terms</h2>
        <p>
          We reserve the right to modify these Terms at any time. Changes take effect immediately
          upon posting. Your continued use of the Site after changes constitutes acceptance of the
          updated Terms.
        </p>

        <h2 className="text-xl font-semibold text-gray-900 mt-8">Governing Law</h2>
        <p>
          These Terms shall be governed by and construed in accordance with the laws of the United
          States. Any disputes arising from these Terms or your use of the Site shall be resolved in
          the appropriate courts.
        </p>

        <h2 className="text-xl font-semibold text-gray-900 mt-8">Contact</h2>
        <p>
          Questions about these Terms should be directed to{" "}
          <a href="mailto:legal@genericswap.com" className="text-brand-600 hover:underline">
            legal@genericswap.com
          </a>
          .
        </p>
      </div>
    </div>
  );
}
