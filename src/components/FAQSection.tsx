interface FAQItem {
  question: string;
  answer: string;
}

export default function FAQSection({ items, drugName }: { items: FAQItem[]; drugName: string }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Frequently Asked Questions About {drugName}
      </h3>
      <div className="space-y-3">
        {items.map((item, i) => (
          <details key={i} className="group border border-gray-100 rounded-lg">
            <summary className="flex items-center justify-between px-4 py-3 cursor-pointer hover:bg-gray-50 rounded-lg">
              <span className="font-medium text-gray-900 text-sm pr-4">{item.question}</span>
              <svg
                className="faq-chevron w-5 h-5 text-gray-400 flex-shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </summary>
            <div className="px-4 pb-4 text-sm text-gray-700 leading-relaxed">{item.answer}</div>
          </details>
        ))}
      </div>
    </div>
  );
}

// Helper to generate FAQ items from drug data
export function generateDrugFAQs({
  tradeName,
  activeIngredient,
  genericCount,
  firstGenericDate,
  hasABRating,
  applicant,
}: {
  tradeName: string;
  activeIngredient: string;
  genericCount: number;
  firstGenericDate: Date | null;
  hasABRating: boolean;
  applicant: string | null;
}): FAQItem[] {
  const faqs: FAQItem[] = [];

  // Q1: Is there a generic?
  if (genericCount > 0) {
    faqs.push({
      question: `Is there a generic for ${tradeName}?`,
      answer: `Yes. ${activeIngredient} is the generic equivalent of ${tradeName}. There are ${genericCount} FDA-approved generic versions available from multiple manufacturers.`,
    });
  } else {
    faqs.push({
      question: `Is there a generic for ${tradeName}?`,
      answer: `No. There is currently no FDA-approved generic equivalent for ${tradeName} (${activeIngredient}). This may be due to active patent protection or market exclusivity.`,
    });
  }

  // Q2: Can pharmacist substitute?
  if (hasABRating) {
    faqs.push({
      question: `Can my pharmacist substitute generic ${activeIngredient.toLowerCase()} for ${tradeName}?`,
      answer: `Yes. The approved generics are AB-rated by the FDA, which means pharmacists can automatically substitute them for ${tradeName} without contacting your doctor. AB-rated generics are considered therapeutically equivalent.`,
    });
  }

  // Q3: When did it go generic?
  if (firstGenericDate) {
    const dateStr = firstGenericDate.toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    });
    faqs.push({
      question: `When did ${tradeName} go generic?`,
      answer: `The first generic version of ${tradeName} (${activeIngredient.toLowerCase()}) was approved by the FDA in ${dateStr}.`,
    });
  }

  // Q4: Are all generics the same?
  if (genericCount > 0) {
    faqs.push({
      question: `Are all generic versions of ${tradeName} the same?`,
      answer: `All FDA-approved generics of ${tradeName} contain the same active ingredient (${activeIngredient.toLowerCase()}) at the same strength and must meet FDA bioequivalence standards. While inactive ingredients may differ slightly between manufacturers, the FDA requires that generics perform the same way in the body.`,
    });
  }

  // Q5: Who makes it?
  if (applicant) {
    faqs.push({
      question: `Who makes ${tradeName}?`,
      answer: `${tradeName} is manufactured by ${applicant}. ${
        genericCount > 0
          ? `Generic versions of ${activeIngredient.toLowerCase()} are produced by ${genericCount} different manufacturers.`
          : ""
      }`,
    });
  }

  return faqs;
}
