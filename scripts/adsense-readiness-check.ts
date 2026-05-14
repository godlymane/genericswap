import { DRUG_CATEGORIES } from "../src/lib/constants";
import { GUIDES } from "../src/lib/guides";

function assert(condition: unknown, message: string) {
  if (!condition) {
    throw new Error(message);
  }
}

function wordCount(value: string) {
  return value.trim().split(/\s+/).filter(Boolean).length;
}

assert(GUIDES.length >= 6, "Expected at least six original guide articles.");

const slugs = new Set<string>();
for (const guide of GUIDES) {
  assert(!slugs.has(guide.slug), `Duplicate guide slug: ${guide.slug}`);
  slugs.add(guide.slug);
  assert(guide.title.length >= 24, `Guide title is too short: ${guide.slug}`);
  assert(guide.description.length >= 90, `Guide description is too short: ${guide.slug}`);
  assert(guide.sections.length >= 4, `Guide needs at least four sections: ${guide.slug}`);
  assert(guide.faqs.length >= 3, `Guide needs at least three FAQs: ${guide.slug}`);

  const guideWords =
    wordCount(guide.description) +
    guide.sections.reduce((total, section) => total + wordCount(section.heading) + wordCount(section.body), 0) +
    guide.faqs.reduce((total, faq) => total + wordCount(faq.question) + wordCount(faq.answer), 0);

  assert(guideWords >= 500, `Guide has thin content: ${guide.slug} (${guideWords} words)`);
}

for (const [slug, category] of Object.entries(DRUG_CATEGORIES)) {
  assert(category.name.length > 0, `Missing category name for ${slug}`);
  assert(category.keywords.length >= 4, `Category needs enough keyword coverage: ${slug}`);
}

console.log(`AdSense readiness content check passed for ${GUIDES.length} guides.`);
