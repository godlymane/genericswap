export interface GuideSection {
  heading: string;
  body: string;
}

export interface GuideFAQ {
  question: string;
  answer: string;
}

export interface GuideSource {
  label: string;
  href: string;
}

export interface Guide {
  slug: string;
  title: string;
  description: string;
  category: string;
  readTime: string;
  updatedAt: string;
  sections: GuideSection[];
  faqs: GuideFAQ[];
  sources: GuideSource[];
}

export const GUIDES: Guide[] = [
  {
    slug: "ask-pharmacist-about-generic-alternatives",
    title: "How to Ask Your Pharmacist About Generic Alternatives",
    description:
      "A practical, patient-friendly guide to starting a safe conversation about generic alternatives, therapeutic equivalence, pharmacy substitution rules, and prescription savings without treating a website search result as medical advice.",
    category: "Patient checklist",
    readTime: "7 min read",
    updatedAt: "2026-05-15",
    sections: [
      {
        heading: "Start with the exact prescription details",
        body:
          "The safest generic conversation begins with the details already printed on the prescription label: drug name, strength, dosage form, route, directions, and the prescriber instructions. A generic search can show that an active ingredient has many manufacturers, but a pharmacist needs to match the exact product you were prescribed. A tablet is not the same as an injection, an extended-release product is not the same as an immediate-release product, and two strengths of the same active ingredient may not be interchangeable. Bring the medication bottle, insurance card, and any coupon or cash-price estimate you found so the pharmacist can compare the same product rather than a similar-looking one.",
      },
      {
        heading: "Ask whether substitution is allowed",
        body:
          "In many situations a pharmacist can substitute an FDA-rated generic when state law and the prescriber instructions allow it. The key phrase to ask is simple: 'Is there a therapeutically equivalent generic for this exact prescription, and are you allowed to substitute it?' This question keeps the conversation grounded in the pharmacy workflow. If the prescription says 'dispense as written,' 'brand medically necessary,' or similar language, the pharmacist may need prescriber approval before changing the product. If state law requires patient consent, the pharmacist can explain what you need to approve before the lower-cost version can be dispensed.",
      },
      {
        heading: "Use FDA ratings as a starting point, not a personal decision",
        body:
          "FDA therapeutic equivalence ratings are useful because they tell pharmacists whether products have been evaluated as substitutable in the Orange Book. They do not replace personal medical judgment. Your prescriber may have a reason to prefer one product, such as past side effects, allergies to inactive ingredients, narrow dose monitoring, or a condition that requires closer follow-up. A good generic conversation should include both sides: whether a product is generally considered substitutable and whether it is appropriate for your situation. That is why GenericSwap presents public FDA data with reminders to confirm decisions with a pharmacist or clinician.",
      },
      {
        heading: "Compare the price after insurance and cash options",
        body:
          "The lowest listed cash price is not always the lowest final price. Some insurance plans prefer a specific generic manufacturer, while some pharmacies quote a lower cash price if you do not use insurance. Ask the pharmacist to compare your insurance copay, a cash price, and any available discount card for the same strength and quantity. Also ask whether the price changes for a 30-day versus 90-day fill. When a generic has several manufacturers, availability can change by pharmacy, so the cheapest option on one website may not be the product in stock today.",
      },
      {
        heading: "Know when to call the prescriber",
        body:
          "Call the prescriber before switching if the medication has special monitoring, if you have had a prior reaction to a generic, if your symptoms changed after a refill, or if the pharmacist says the available product does not have an appropriate therapeutic equivalence rating. It is also worth contacting the prescriber when the brand is unaffordable and no substitutable generic is available, because there may be a different medication in the same therapeutic area. The goal is not simply to switch; the goal is to lower cost while keeping the treatment plan clear and safe.",
      },
    ],
    faqs: [
      {
        question: "Can a pharmacist always switch my brand prescription to a generic?",
        answer:
          "No. Substitution depends on the exact product, FDA therapeutic equivalence information, prescriber instructions, state law, and pharmacy availability.",
      },
      {
        question: "Should I ask my doctor before using a generic?",
        answer:
          "For routine substitutions your pharmacist can often guide you, but your prescriber should be involved if the medication requires close monitoring, you have allergies, or you have had problems with a prior switch.",
      },
      {
        question: "Why did my generic pill look different after a refill?",
        answer:
          "Pharmacies may source the same active ingredient from different approved manufacturers. Color, shape, and inactive ingredients can differ, so verify the change with the pharmacist if anything looks unfamiliar.",
      },
    ],
    sources: [
      {
        label: "FDA: Generic Drugs Questions and Answers",
        href: "https://www.fda.gov/drugs/frequently-asked-questions-popular-topics/generic-drugs-questions-answers",
      },
      {
        label: "FDA Orange Book",
        href: "https://www.fda.gov/drugs/drug-approvals-and-databases/approved-drug-products-therapeutic-equivalence-evaluations-orange-book",
      },
    ],
  },
  {
    slug: "fda-therapeutic-equivalence-ratings-explained",
    title: "FDA Therapeutic Equivalence Ratings Explained",
    description:
      "Learn what Orange Book therapeutic equivalence ratings mean, why AB-rated products are commonly substitutable, and why a TE code should be read alongside dosage form, route, state law, and clinical context.",
    category: "FDA data",
    readTime: "8 min read",
    updatedAt: "2026-05-15",
    sections: [
      {
        heading: "What a TE rating is meant to answer",
        body:
          "The FDA Orange Book uses therapeutic equivalence ratings to help identify products that are expected to have the same clinical effect and safety profile when used under the conditions in labeling. A TE code is not a general review of whether a medicine is good or bad. It is a product-specific evaluation tied to approved applications, active ingredient, dosage form, route, strength, and bioequivalence evidence. That distinction matters because many drug names appear in multiple forms. A tablet, capsule, injection, patch, or extended-release version may have different substitution considerations even when the active ingredient looks familiar.",
      },
      {
        heading: "Why A-rated products get the most attention",
        body:
          "Codes beginning with A generally indicate that FDA considers the product therapeutically equivalent to other pharmaceutically equivalent products, assuming the product is otherwise used as labeled. AB is the rating most consumers notice because it often appears on generic products where bioequivalence evidence has been reviewed against a reference product. In everyday pharmacy language, an AB-rated generic is commonly treated as substitutable for the matching brand product when state law and the prescription allow. Other A ratings exist for specific dosage forms or product types, so the second letter should not be ignored.",
      },
      {
        heading: "What B-rated or unrated products signal",
        body:
          "A code beginning with B usually means FDA has not determined therapeutic equivalence for that product, or that actual or potential bioequivalence issues require more evidence. This does not automatically mean the product is unsafe or ineffective; it means it should not be treated as automatically substitutable based only on Orange Book equivalence. Some products are not rated because there is no multisource comparison in the Orange Book. When GenericSwap shows a non-A rating, the practical next step is to ask a pharmacist or prescriber what alternatives are appropriate for the exact prescription.",
      },
      {
        heading: "The rating is only one part of the substitution check",
        body:
          "A TE code should be read together with the active ingredient, strength, dosage form, route, application type, and whether the drug is discontinued. Pharmacy substitution also depends on state law and prescriber instructions. Insurance coverage and pharmacy inventory can further affect what is dispensed. This is why a responsible comparison page should not stop at 'generic available.' It should show the evidence category, manufacturer information, patent or exclusivity context when available, and a reminder that individual patient factors can change the best choice.",
      },
      {
        heading: "How to use TE ratings on GenericSwap",
        body:
          "Use TE ratings to narrow the conversation. If a product has multiple AB-rated generic manufacturers, ask the pharmacist which one is in stock and whether your plan prefers a specific manufacturer. If the listed alternatives do not have an A rating, ask whether the prescriber needs to approve a change or whether a different therapy would make more sense. The site is designed to translate the public FDA data into a readable starting point, not to make the substitution decision for you.",
      },
    ],
    faqs: [
      {
        question: "Does AB-rated mean the generic is identical in every ingredient?",
        answer:
          "No. It means FDA has evaluated the product as therapeutically equivalent for the matching product. Inactive ingredients, color, and shape may differ.",
      },
      {
        question: "Does a B rating mean a drug is dangerous?",
        answer:
          "No. It means therapeutic equivalence has not been established in the Orange Book for automatic substitution purposes.",
      },
      {
        question: "Can two generics have different TE codes?",
        answer:
          "Yes. Ratings are product-specific, so products with the same active ingredient can differ by dosage form, route, strength, reference product, or evidence submitted.",
      },
    ],
    sources: [
      {
        label: "FDA Orange Book Preface",
        href: "https://www.fda.gov/drugs/development-approval-process-drugs/orange-book-preface",
      },
      {
        label: "FDA Orange Book",
        href: "https://www.fda.gov/drugs/drug-approvals-and-databases/approved-drug-products-therapeutic-equivalence-evaluations-orange-book",
      },
    ],
  },
  {
    slug: "why-generic-drugs-cost-less",
    title: "Why Generic Drugs Usually Cost Less Than Brand Drugs",
    description:
      "A plain-English explanation of why generic competition can reduce prescription prices, why the first generic may not be the cheapest, and why insurance, supply, and pharmacy contracts still matter.",
    category: "Prescription savings",
    readTime: "7 min read",
    updatedAt: "2026-05-15",
    sections: [
      {
        heading: "Brand prices include the protected market period",
        body:
          "A brand-name drug often reaches the market after years of development, approval work, patents, exclusivity periods, manufacturing scale-up, and marketing. During protected periods, the brand manufacturer may face limited direct competition for the same product. That does not mean every brand price is explained by one factor, but it does mean the competitive pressure is different before generic entry. GenericSwap tracks patent and exclusivity information because those dates help explain why a product may have no generic alternative today even when patients are actively searching for one.",
      },
      {
        heading: "Generic manufacturers compete on the same active ingredient",
        body:
          "A generic manufacturer does not need to repeat the brand sponsor's full clinical development program. Instead, the manufacturer must show that the generic matches key requirements such as active ingredient, strength, dosage form, route, quality, performance characteristics, and bioequivalence. Once more than one manufacturer enters the market, pharmacies and buyers can compare suppliers. That competition is one reason generic prices often fall sharply over time, especially for simple oral solid products with many approved manufacturers.",
      },
      {
        heading: "The first generic is not always the lowest price",
        body:
          "The first approved generic can still be expensive, especially if it has temporary exclusivity, limited supply, or few competitors. Prices often become more favorable when several manufacturers are approved and stocked. This is why the number of generic manufacturers matters on a comparison page. A drug with one generic source may not behave like a drug with ten generic sources. Availability also matters: a pharmacy can only dispense the products it can order, and the product preferred by your insurance plan may differ from the lowest cash price at another pharmacy.",
      },
      {
        heading: "Insurance can make the answer less obvious",
        body:
          "Many patients assume generic always equals cheapest, but insurance formularies can complicate the final cost. A plan may prefer one generic, require prior authorization for another product, or price a brand favorably because of a contract. Cash-pay prices can also beat insurance copays for some common generics. The useful comparison is not only brand versus generic; it is insurance copay versus cash price versus discount price for the exact quantity, strength, and pharmacy. A pharmacist can usually help compare those paths.",
      },
      {
        heading: "Savings should not override safety checks",
        body:
          "Lower cost is important, but it should not be the only decision point. Some drugs require monitoring, some products have device-specific instructions, and some patients react to inactive ingredients. If a medication looks different after a refill, if symptoms change, or if a substitution does not match what the prescriber intended, stop and ask the pharmacist. A good savings workflow protects both affordability and continuity of care.",
      },
    ],
    faqs: [
      {
        question: "Why is my generic still expensive?",
        answer:
          "There may be few manufacturers, limited pharmacy supply, insurance restrictions, temporary exclusivity, or a dosage form that is harder to produce.",
      },
      {
        question: "Will more generic manufacturers usually lower the price?",
        answer:
          "More competition often helps, but final patient cost still depends on pharmacy contracts, insurance design, quantity, and local availability.",
      },
      {
        question: "Should I use insurance or a cash discount for a generic?",
        answer:
          "Ask the pharmacy to compare both for the same product and quantity. The lower option can vary by medication and plan.",
      },
    ],
    sources: [
      {
        label: "FDA: Generic Drugs Undergo Rigorous FDA Review",
        href: "https://www.fda.gov/consumers/consumer-updates/generic-drugs-undergo-rigorous-fda-review",
      },
      {
        label: "FDA: Patents and Exclusivity FAQ",
        href: "https://www.fda.gov/drugs/development-approval-process-drugs/frequently-asked-questions-patents-and-exclusivity",
      },
    ],
  },
  {
    slug: "read-drug-patent-expiration-page",
    title: "How to Read a Drug Patent Expiration Page",
    description:
      "Understand the difference between patents, exclusivity, Orange Book dates, and real-world generic launch timing so upcoming generic availability is easier to interpret.",
    category: "Patent cliffs",
    readTime: "8 min read",
    updatedAt: "2026-05-15",
    sections: [
      {
        heading: "Patent dates are not the same as pharmacy availability",
        body:
          "A patent expiration date can show when one legal barrier may end, but it does not guarantee that a generic will appear on pharmacy shelves the next day. A manufacturer still needs an approved application, adequate supply, distribution agreements, and a commercial decision to launch. Patent litigation, settlements, exclusivity, and product complexity can also affect timing. A patent page is best read as a calendar of possible market-opening events rather than a promise that a lower-cost product will be available immediately.",
      },
      {
        heading: "Patents and exclusivity are related but different",
        body:
          "Patents are intellectual property rights that can cover an active ingredient, formulation, method of use, or other listed claim. Exclusivity is a regulatory protection administered by FDA under specific rules. A drug can have patents, exclusivity, both, or neither listed in the Orange Book. The practical question for a patient is whether any listed protection could delay approval or launch of a substitutable generic. That is why GenericSwap displays both patent and exclusivity dates when they are available in public data.",
      },
      {
        heading: "The earliest date may not be the controlling date",
        body:
          "It is tempting to look for the earliest expiration date and assume that is the generic entry date. In reality, later patents or exclusivities can still matter, and some patents may relate only to certain uses. A generic manufacturer may seek approval for a label that omits protected uses, or it may challenge a patent. Those details are legal and product-specific. For consumer research, the safest takeaway is directional: more unexpired protections usually mean more uncertainty, while expired protections plus existing approved generics usually point to a more mature generic market.",
      },
      {
        heading: "Use patent pages with product matching",
        body:
          "Always match the patent page to the exact drug product. Different strengths, dosage forms, or routes may have different approval histories and market situations. For example, a tablet and an injection with the same active ingredient can have very different generic timelines. If a drug page shows no generic alternatives but several future patent dates, ask your prescriber or pharmacist whether another dose form, active ingredient, or therapeutic class has an appropriate lower-cost option. Do not substitute across products on your own.",
      },
      {
        heading: "What to watch after a patent cliff",
        body:
          "After a major expiration, watch for newly approved generic applications, pharmacy stock changes, and insurance formulary updates. A plan may take time to add the generic or change copays. Some pharmacies may stock one manufacturer before another. Patients who need uninterrupted treatment should ask the pharmacy about timing before the next refill is due. Patent data is useful because it helps you know when to start asking better questions, not because it resolves every supply and coverage issue.",
      },
    ],
    faqs: [
      {
        question: "Does patent expiration mean a generic is FDA-approved?",
        answer:
          "No. Patent expiration and FDA approval are separate. A generic also needs an approved application and market launch.",
      },
      {
        question: "Why are there multiple patents for one drug?",
        answer:
          "Different patents can cover different aspects of a product, such as formulation, use, or delivery. Their relevance can vary by product and label.",
      },
      {
        question: "Can exclusivity delay a generic after patents expire?",
        answer:
          "Yes. Regulatory exclusivity can affect approval or launch timing even when patent protection is not the main barrier.",
      },
    ],
    sources: [
      {
        label: "FDA Orange Book",
        href: "https://www.fda.gov/drugs/drug-approvals-and-databases/approved-drug-products-therapeutic-equivalence-evaluations-orange-book",
      },
      {
        label: "FDA: Patents and Exclusivity FAQ",
        href: "https://www.fda.gov/drugs/development-approval-process-drugs/frequently-asked-questions-patents-and-exclusivity",
      },
    ],
  },
  {
    slug: "brand-vs-generic-what-must-match",
    title: "Brand vs Generic Drugs: What Actually Has to Match",
    description:
      "A careful guide to what FDA-approved generics must match, what may differ, and which differences are worth discussing with a pharmacist or prescriber before changing products.",
    category: "Generic basics",
    readTime: "7 min read",
    updatedAt: "2026-05-15",
    sections: [
      {
        heading: "The core medicine has to match",
        body:
          "For a typical FDA-approved generic, the active ingredient, strength, dosage form, route of administration, quality, performance characteristics, and intended use must match the brand product in the ways required for approval. The generic must also demonstrate bioequivalence, meaning it delivers the active ingredient at a rate and extent that supports the same clinical benefit. This is why a pharmacist can often substitute a generic for a matching brand product when the Orange Book rating, prescription, and state law allow it.",
      },
      {
        heading: "Some visible details can be different",
        body:
          "Generic products may look different from the brand and from each other. Shape, color, markings, packaging, and inactive ingredients can vary. Those differences are not automatically a problem, but they can matter for people with allergies, swallowing difficulties, sensitivity to dyes, or confusion when pill appearance changes between refills. If a pill looks different, do not guess. Check the label and ask the pharmacist to confirm the manufacturer and product before taking it.",
      },
      {
        heading: "Devices and complex products deserve extra attention",
        body:
          "Some products are harder to compare than a simple tablet. Inhalers, injectors, patches, topical products, and extended-release forms may have device instructions or release characteristics that affect how the medicine is used. FDA still applies approval standards, but the patient experience can differ. When a product involves a device, ask the pharmacist to demonstrate how to use it and ask whether the prescriber intended that specific substitution. A lower price is only helpful if the patient can use the product correctly.",
      },
      {
        heading: "Therapeutic equivalence does not erase patient history",
        body:
          "A TE rating addresses the product comparison, not every individual circumstance. A patient who experienced side effects after a prior manufacturer change, who needs blood-level monitoring, or who has a condition requiring precise follow-up should involve the prescriber. The same is true when switching between products that are not listed as therapeutically equivalent. The FDA data is a strong starting point, but continuity, monitoring, and clinical history still belong in the decision.",
      },
      {
        heading: "A simple script for the pharmacy counter",
        body:
          "A useful question is: 'Does this generic match the same active ingredient, strength, dosage form, and route as my prescription, and is it rated substitutable for the brand?' Follow with: 'Is this the same manufacturer I received last time?' and 'Do any inactive ingredients commonly cause issues?' These questions are specific enough for a pharmacist to answer quickly and practical enough to catch the most common sources of confusion.",
      },
    ],
    faqs: [
      {
        question: "Can inactive ingredients differ between brand and generic drugs?",
        answer:
          "Yes. Inactive ingredients can differ, which is why patients with allergies or sensitivities should ask the pharmacist about the specific manufacturer.",
      },
      {
        question: "Is a generic less effective because it costs less?",
        answer:
          "Cost is not the approval standard. FDA-approved generics must meet requirements for quality and bioequivalence to the matching brand product.",
      },
      {
        question: "What should I do if a refill looks different?",
        answer:
          "Confirm the product with the pharmacist before taking it, especially if the label, shape, color, or manufacturer changed unexpectedly.",
      },
    ],
    sources: [
      {
        label: "FDA: Generic Drugs Questions and Answers",
        href: "https://www.fda.gov/drugs/frequently-asked-questions-popular-topics/generic-drugs-questions-answers",
      },
      {
        label: "FDA: Generic Drugs Undergo Rigorous FDA Review",
        href: "https://www.fda.gov/consumers/consumer-updates/generic-drugs-undergo-rigorous-fda-review",
      },
    ],
  },
  {
    slug: "prescription-savings-comparison-checklist",
    title: "Prescription Savings Comparison Checklist",
    description:
      "Use this step-by-step checklist to compare prescription prices responsibly across insurance, pharmacy cash prices, generic manufacturers, discount cards, and refill quantities.",
    category: "Prescription savings",
    readTime: "8 min read",
    updatedAt: "2026-05-15",
    sections: [
      {
        heading: "Match the exact product before comparing prices",
        body:
          "Price comparison only works when every quote refers to the same product. Match the active ingredient, brand or generic status, strength, dosage form, route, quantity, and day supply. A price for thirty tablets of one strength cannot be compared to a ninety-day fill of another strength. If the medication comes in immediate-release and extended-release versions, confirm which one the prescription uses. Small product mismatches can create large price differences and unsafe assumptions.",
      },
      {
        heading: "Compare insurance, cash, and discount paths separately",
        body:
          "Ask the pharmacy for the insurance copay first, then ask whether a cash price or discount card would be lower for the same product and quantity. Some plans apply the cost to a deductible; some do not. Some cash prices are lower but do not count toward insurance spending. The right choice may depend on whether you need deductible credit, whether the medication is long-term, and whether your plan restricts pharmacy networks. Keep a written note of the quoted price, pharmacy, quantity, and date because prices can change.",
      },
      {
        heading: "Check whether a 90-day fill changes the math",
        body:
          "For maintenance medications, a ninety-day fill can sometimes lower the per-day cost, reduce pharmacy trips, and improve refill timing. Insurance plans may require mail order or a preferred pharmacy for the best ninety-day price. Cash prices can move in the opposite direction for some drugs, so do the comparison rather than assuming. Before changing quantity, make sure the prescriber wrote enough refills and that the medication is stable enough for a longer supply.",
      },
      {
        heading: "Ask about manufacturer availability",
        body:
          "When several generic manufacturers are approved, the pharmacy may carry only one or two at a given time. If you have tolerated a specific manufacturer well, ask whether the pharmacy can keep sourcing it or whether supply changes are likely. If you are price shopping, ask whether the quote applies to the product in stock today. A low price for a manufacturer that is unavailable does not help at the counter. Availability is part of real savings.",
      },
      {
        heading: "Keep your care team in the loop",
        body:
          "Savings work best when the pharmacist and prescriber can help. If a medication remains unaffordable after generic and cash-price checks, ask the prescriber whether there is a clinically appropriate alternative in the same class. Do not split tablets, change dosing frequency, or skip doses to save money unless the prescriber specifically tells you to. The purpose of a comparison checklist is to reveal better options, not to create hidden safety risks.",
      },
    ],
    faqs: [
      {
        question: "Are online prescription prices guaranteed?",
        answer:
          "Usually no. Prices can vary by pharmacy, location, quantity, manufacturer, insurance status, and date. Confirm the final price with the pharmacy.",
      },
      {
        question: "Can using a discount card affect my insurance deductible?",
        answer:
          "It can. Cash or discount-card purchases may not count toward your deductible, so compare both the immediate price and your plan rules.",
      },
      {
        question: "What if no generic exists for my medication?",
        answer:
          "Ask the prescriber about alternatives, patient assistance programs, formulary exceptions, or whether a different dose form has an appropriate option.",
      },
    ],
    sources: [
      {
        label: "FDA: Generic Drugs Questions and Answers",
        href: "https://www.fda.gov/drugs/frequently-asked-questions-popular-topics/generic-drugs-questions-answers",
      },
      {
        label: "DailyMed",
        href: "https://dailymed.nlm.nih.gov/dailymed/",
      },
    ],
  },
];

export function getGuideBySlug(slug: string) {
  return GUIDES.find((guide) => guide.slug === slug);
}
