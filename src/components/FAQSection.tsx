interface FAQItem {
  question: string;
  answer: string;
}

export default function FAQSection({ items, drugName }: { items: FAQItem[]; drugName: string }) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-lg shadow-gray-100/50">
      {/* Header */}
      <div className="px-6 py-5 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-50 to-purple-50 border border-violet-100 flex items-center justify-center">
            <svg className="w-5 h-5 text-violet-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
            </svg>
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900">
              Frequently Asked Questions
            </h3>
            <p className="text-sm text-gray-500">About {drugName} and its generic alternatives</p>
          </div>
        </div>
      </div>

      {/* FAQ Items */}
      <div className="divide-y divide-gray-100">
        {items.map((item, i) => (
          <details key={i} className="group">
            <summary className="flex items-center justify-between px-6 py-4 cursor-pointer hover:bg-gray-50/80 transition-colors">
              <span className="font-medium text-gray-900 text-sm pr-4">{item.question}</span>
              <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0 group-hover:bg-violet-100 transition-colors">
                <svg
                  className="faq-chevron w-4 h-4 text-gray-500 group-hover:text-violet-600 transition-colors"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </summary>
            <div className="px-6 pb-5 text-sm text-gray-700 leading-relaxed">
              <div className="pl-0 border-l-2 border-violet-200 ml-0 pl-4">
                {item.answer}
              </div>
            </div>
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

  // Q6: Cheapest generic (long-tail keyword target)
  if (genericCount > 0) {
    faqs.push({
      question: `What is the cheapest generic for ${tradeName}?`,
      answer: `Generic ${activeIngredient.toLowerCase()} is available from ${genericCount} manufacturer${genericCount !== 1 ? "s" : ""}, and pricing varies by pharmacy and insurance plan. Generally, generics cost 80-85% less than brand-name ${tradeName}. Ask your pharmacist to compare prices across manufacturers for the best deal.`,
    });
  }

  // Q7: Brand vs generic comparison (long-tail keyword target)
  if (genericCount > 0) {
    faqs.push({
      question: `Is generic ${activeIngredient.toLowerCase()} as good as ${tradeName}?`,
      answer: `Yes. FDA-approved generics of ${tradeName} must contain the same active ingredient (${activeIngredient.toLowerCase()}), at the same dose and strength, and work the same way in the body. The FDA requires generics to meet strict bioequivalence standards before approval.`,
    });
  }

  // Q8: How to switch (long-tail keyword target)
  if (genericCount > 0) {
    faqs.push({
      question: `How do I switch from ${tradeName} to a generic alternative?`,
      answer: `Talk to your doctor or pharmacist about switching to generic ${activeIngredient.toLowerCase()}. ${
        hasABRating
          ? `Since AB-rated generics are available, your pharmacist can typically make the substitution automatically.`
          : `Your doctor can write a new prescription specifying the generic, or your pharmacist may be able to substitute depending on your state's laws.`
      }`,
    });
  }

  return faqs;
}
