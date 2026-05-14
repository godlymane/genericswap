import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { GUIDES, getGuideBySlug } from "@/lib/guides";
import { SITE_NAME, SITE_URL } from "@/lib/constants";
import { generateMeta, buildFAQJsonLd, buildBreadcrumbJsonLd } from "@/lib/seo";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return GUIDES.map((guide) => ({ slug: guide.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);
  if (!guide) return {};

  return generateMeta({
    title: guide.title,
    description: guide.description,
    url: `/guides/${guide.slug}`,
  });
}

export default async function GuidePage({ params }: PageProps) {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);
  if (!guide) notFound();

  const breadcrumbs = [
    { name: "Guides", url: "/guides" },
    { name: guide.title, url: `/guides/${guide.slug}` },
  ];

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: guide.title,
    description: guide.description,
    dateModified: guide.updatedAt,
    datePublished: guide.updatedAt,
    author: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
    mainEntityOfPage: `${SITE_URL}/guides/${guide.slug}`,
  };

  return (
    <article className="max-w-3xl mx-auto px-4 py-10">
      <nav className="mb-8 text-sm text-gray-500">
        <Link href="/guides" className="hover:text-brand-600 hover:underline">
          Guides
        </Link>
        <span className="mx-2">/</span>
        <span>{guide.category}</span>
      </nav>

      <header className="mb-10">
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <span className="text-xs font-semibold text-brand-700 bg-brand-50 px-2.5 py-1 rounded-full">
            {guide.category}
          </span>
          <span className="text-xs text-gray-500">{guide.readTime}</span>
          <span className="text-xs text-gray-500">Updated {guide.updatedAt}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight">
          {guide.title}
        </h1>
        <p className="text-lg text-gray-600 leading-relaxed mt-5">{guide.description}</p>
      </header>

      <div className="space-y-9">
        {guide.sections.map((section) => (
          <section key={section.heading}>
            <h2 className="text-xl font-bold text-gray-900 mb-3">{section.heading}</h2>
            <p className="text-gray-700 leading-7">{section.body}</p>
          </section>
        ))}
      </div>

      <section className="mt-12 border-t border-gray-200 pt-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Common Questions</h2>
        <div className="space-y-4">
          {guide.faqs.map((faq) => (
            <div key={faq.question} className="bg-white border border-gray-200 rounded-xl p-5">
              <h3 className="font-semibold text-gray-900">{faq.question}</h3>
              <p className="text-sm text-gray-700 leading-6 mt-2">{faq.answer}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-10 bg-gray-50 border border-gray-200 rounded-xl p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-3">Primary Sources</h2>
        <ul className="space-y-2">
          {guide.sources.map((source) => (
            <li key={source.href}>
              <a
                href={source.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-brand-600 hover:underline"
              >
                {source.label}
              </a>
            </li>
          ))}
        </ul>
      </section>

      <div className="mt-10 rounded-xl border border-yellow-200 bg-yellow-50 p-5 text-sm text-yellow-900 leading-6">
        GenericSwap is an informational research tool. Do not start, stop, or change a medication
        based only on this guide. Confirm medication decisions with a pharmacist or qualified
        healthcare provider.
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildFAQJsonLd(guide.faqs)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildBreadcrumbJsonLd(breadcrumbs)) }}
      />
    </article>
  );
}
