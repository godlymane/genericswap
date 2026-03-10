// Therapeutic Equivalence Code descriptions
export const TE_CODES: Record<string, { label: string; description: string; color: string; canSubstitute: boolean }> = {
  AA: { label: "AA", description: "No bioequivalence problems in conventional dosage forms", color: "green", canSubstitute: true },
  AB: { label: "AB", description: "Meets bioequivalence requirements — pharmacist can auto-substitute", color: "green", canSubstitute: true },
  AN: { label: "AN", description: "Aerosol — bioequivalent", color: "green", canSubstitute: true },
  AO: { label: "AO", description: "Injectable oil — bioequivalent", color: "green", canSubstitute: true },
  AP: { label: "AP", description: "Injectable aqueous — bioequivalent", color: "green", canSubstitute: true },
  AT: { label: "AT", description: "Topical — bioequivalent", color: "green", canSubstitute: true },
  BC: { label: "BC", description: "Extended-release — NOT bioequivalent without further data", color: "yellow", canSubstitute: false },
  BD: { label: "BD", description: "Documented bioequivalence problems", color: "red", canSubstitute: false },
  BE: { label: "BE", description: "Delayed-release enteric — potential bioequivalence issues", color: "yellow", canSubstitute: false },
  BN: { label: "BN", description: "No generic equivalent available for this product", color: "gray", canSubstitute: false },
  BP: { label: "BP", description: "Potential bioequivalence problems", color: "yellow", canSubstitute: false },
  BR: { label: "BR", description: "Insufficient evidence for bioequivalence", color: "red", canSubstitute: false },
  BS: { label: "BS", description: "Standard not established for this product", color: "gray", canSubstitute: false },
  BT: { label: "BT", description: "Topical — potential bioequivalence problems", color: "yellow", canSubstitute: false },
  BX: { label: "BX", description: "Insufficient data for bioequivalence determination", color: "gray", canSubstitute: false },
};

// Dosage form labels for display
export const DOSAGE_FORMS: Record<string, string> = {
  "TABLET": "Tablet",
  "CAPSULE": "Capsule",
  "INJECTABLE": "Injectable",
  "SOLUTION": "Solution",
  "SUSPENSION": "Suspension",
  "CREAM": "Cream",
  "OINTMENT": "Ointment",
  "GEL": "Gel",
  "PATCH": "Patch",
  "AEROSOL": "Aerosol",
  "POWDER": "Powder",
  "SYRUP": "Syrup",
  "DROPS": "Drops",
  "LOTION": "Lotion",
  "SPRAY": "Spray",
  "SUPPOSITORY": "Suppository",
  "IMPLANT": "Implant",
  "FILM": "Film",
  "FOAM": "Foam",
  "GRANULE": "Granule",
};

// Route labels
export const ROUTES: Record<string, string> = {
  "ORAL": "Oral",
  "INTRAVENOUS": "Intravenous",
  "INTRAMUSCULAR": "Intramuscular",
  "SUBCUTANEOUS": "Subcutaneous",
  "TOPICAL": "Topical",
  "INHALATION": "Inhalation",
  "OPHTHALMIC": "Ophthalmic",
  "OTIC": "Otic",
  "NASAL": "Nasal",
  "RECTAL": "Rectal",
  "VAGINAL": "Vaginal",
  "TRANSDERMAL": "Transdermal",
  "SUBLINGUAL": "Sublingual",
  "BUCCAL": "Buccal",
};

// Exclusivity code descriptions
export const EXCLUSIVITY_CODES: Record<string, string> = {
  NCE: "New Chemical Entity (5 years)",
  "P-I": "Pediatric Exclusivity (6 months added)",
  "P-II": "Pediatric Exclusivity (6 months added)",
  "P-III": "Pediatric Exclusivity (6 months added)",
  ODE: "Orphan Drug Exclusivity (7 years)",
  NP: "New Patient Population (3 years)",
  I: "180-day Generic Exclusivity",
  D180: "180-day Generic Exclusivity",
  QIAL: "Qualified Infectious Disease Product (5 years added)",
  CGT: "Competitive Generic Therapy (180 days)",
  "NC": "New Combination (3 years)",
  M: "New Dosage Form/Route (3 years)",
};

// Drug categories for browsing
export const DRUG_CATEGORIES: Record<string, { name: string; keywords: string[] }> = {
  "blood-pressure": { name: "Blood Pressure Medications", keywords: ["amlodipine", "lisinopril", "losartan", "metoprolol", "valsartan", "hydrochlorothiazide", "atenolol", "ramipril", "enalapril", "olmesartan"] },
  "cholesterol": { name: "Cholesterol Medications", keywords: ["atorvastatin", "simvastatin", "rosuvastatin", "pravastatin", "ezetimibe", "lovastatin", "fluvastatin", "pitavastatin"] },
  "diabetes": { name: "Diabetes Medications", keywords: ["metformin", "glipizide", "glyburide", "pioglitazone", "sitagliptin", "empagliflozin", "dapagliflozin", "canagliflozin", "semaglutide", "insulin"] },
  "pain-relief": { name: "Pain Relief", keywords: ["ibuprofen", "acetaminophen", "naproxen", "celecoxib", "meloxicam", "diclofenac", "tramadol", "gabapentin", "pregabalin"] },
  "antibiotics": { name: "Antibiotics", keywords: ["amoxicillin", "azithromycin", "ciprofloxacin", "levofloxacin", "doxycycline", "cephalexin", "metronidazole", "clindamycin", "sulfamethoxazole"] },
  "antidepressants": { name: "Antidepressants", keywords: ["sertraline", "fluoxetine", "escitalopram", "citalopram", "venlafaxine", "duloxetine", "bupropion", "trazodone", "paroxetine", "mirtazapine"] },
  "acid-reflux": { name: "Acid Reflux & GERD", keywords: ["omeprazole", "pantoprazole", "esomeprazole", "lansoprazole", "famotidine", "ranitidine"] },
  "thyroid": { name: "Thyroid Medications", keywords: ["levothyroxine", "liothyronine", "methimazole", "propylthiouracil"] },
  "asthma": { name: "Asthma & COPD", keywords: ["albuterol", "fluticasone", "budesonide", "montelukast", "tiotropium", "ipratropium", "formoterol", "salmeterol"] },
  "blood-thinners": { name: "Blood Thinners", keywords: ["warfarin", "apixaban", "rivaroxaban", "clopidogrel", "enoxaparin", "dabigatran", "heparin"] },
  "anxiety": { name: "Anxiety & Sleep", keywords: ["alprazolam", "lorazepam", "diazepam", "clonazepam", "zolpidem", "buspirone", "hydroxyzine"] },
  "allergy": { name: "Allergy Medications", keywords: ["cetirizine", "loratadine", "fexofenadine", "diphenhydramine", "montelukast", "fluticasone"] },
};

// Popular drugs for homepage display
export const POPULAR_DRUGS = [
  "Lipitor", "Crestor", "Eliquis", "Xarelto", "Ozempic", "Humira",
  "Synthroid", "Nexium", "Advair", "Lantus", "Lyrica", "Cialis",
  "Viagra", "Zoloft", "Lexapro", "Prilosec", "Plavix", "Abilify",
  "Seroquel", "Januvia", "Celebrex", "Adderall", "Ambien", "Norvasc",
  "Cozaar", "Diovan", "Protonix", "Effexor", "Cymbalta", "Wellbutrin",
];

export const SITE_NAME = "GenericSwap";

// SITE_URL controls build-time metadataBase (sitemap index, canonical URLs).
// Child sitemaps use headers() at runtime for the actual domain, so this only
// matters for the statically-generated sitemap index.
//
// On Vercel the NEXT_PUBLIC_SITE_URL env var may be set to a custom domain
// whose DNS isn't pointed yet (e.g. genericswap.com).  In that case, fall back
// to the known working .vercel.app URL.
// TODO: once genericswap.com DNS is live, remove the VERCEL guard.
export const SITE_URL = process.env.VERCEL
  ? "https://genericswap.vercel.app"
  : process.env.NEXT_PUBLIC_SITE_URL || "https://genericswap.vercel.app";

export const SITE_DESCRIPTION = "Find FDA-approved generic alternatives for any brand-name drug. Compare manufacturers, therapeutic equivalence ratings, patent timelines, and prices.";
