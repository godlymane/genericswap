import { SITE_NAME, SITE_URL } from "./constants";

interface BreadcrumbItem {
  name: string;
  url: string;
}

export function buildBreadcrumbJsonLd(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.url}`,
    })),
  };
}

interface FAQItem {
  question: string;
  answer: string;
}

export function buildFAQJsonLd(items: FAQItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function buildWebPageJsonLd({
  title,
  description,
  url,
}: {
  title: string;
  description: string;
  url: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: title,
    description,
    url: `${SITE_URL}${url}`,
    isPartOf: {
      "@type": "WebSite",
      name: SITE_NAME,
      url: SITE_URL,
    },
  };
}

export function buildMedicalWebPageJsonLd({
  title,
  description,
  url,
  drugName,
  activeIngredient,
}: {
  title: string;
  description: string;
  url: string;
  drugName: string;
  activeIngredient: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    name: title,
    description,
    url: `${SITE_URL}${url}`,
    about: {
      "@type": "Drug",
      name: drugName,
      activeIngredient: {
        "@type": "Substance",
        name: activeIngredient,
      },
    },
    isPartOf: {
      "@type": "WebSite",
      name: SITE_NAME,
      url: SITE_URL,
    },
    lastReviewed: new Date().toISOString().split("T")[0],
  };
}

export function generateMeta({
  title,
  description,
  url,
  noindex = false,
}: {
  title: string;
  description: string;
  url: string;
  noindex?: boolean;
}) {
  const fullTitle = title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`;
  return {
    title: {
      absolute: fullTitle,
    },
    description,
    alternates: {
      canonical: `${SITE_URL}${url}`,
    },
    openGraph: {
      title: fullTitle,
      description,
      url: `${SITE_URL}${url}`,
      siteName: SITE_NAME,
      type: "website",
    },
    twitter: {
      card: "summary" as const,
      title: fullTitle,
      description,
    },
    ...(noindex ? { robots: { index: false, follow: false } } : {}),
  };
}
