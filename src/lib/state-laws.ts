/**
 * US State Generic Drug Substitution Laws
 * Sources: NCSL, state pharmacy boards, FDA
 *
 * Types:
 * - mandatory: Pharmacist MUST substitute unless prescriber/patient objects
 * - permissive: Pharmacist MAY substitute
 * - mixed: Mandatory for some programs (Medicaid), permissive otherwise
 */

export interface StateLaw {
  state: string;
  abbr: string;
  type: "mandatory" | "permissive" | "mixed";
  summary: string;
  patientConsentRequired: boolean;
  prescriberCanBlock: boolean;
  narrowTherapeuticIndex: string; // Special rules for NTI drugs
  updated: string; // Year last updated
}

export const STATE_LAWS: Record<string, StateLaw> = {
  AL: { state: "Alabama", abbr: "AL", type: "permissive", summary: "Pharmacist may substitute with AB-rated generics. Patient must be informed.", patientConsentRequired: true, prescriberCanBlock: true, narrowTherapeuticIndex: "NTI drugs require prescriber approval", updated: "2023" },
  AK: { state: "Alaska", abbr: "AK", type: "mandatory", summary: "Pharmacist must substitute unless prescriber writes 'brand medically necessary'.", patientConsentRequired: false, prescriberCanBlock: true, narrowTherapeuticIndex: "Same as other drugs", updated: "2023" },
  AZ: { state: "Arizona", abbr: "AZ", type: "mandatory", summary: "Mandatory substitution unless prescriber or patient objects.", patientConsentRequired: true, prescriberCanBlock: true, narrowTherapeuticIndex: "NTI drugs exempt", updated: "2024" },
  AR: { state: "Arkansas", abbr: "AR", type: "permissive", summary: "Pharmacist may substitute with patient consent.", patientConsentRequired: true, prescriberCanBlock: true, narrowTherapeuticIndex: "Prescriber approval required for NTI", updated: "2023" },
  CA: { state: "California", abbr: "CA", type: "mandatory", summary: "Mandatory substitution unless prescriber handwrites 'Do Not Substitute'.", patientConsentRequired: false, prescriberCanBlock: true, narrowTherapeuticIndex: "NTI drugs require notification", updated: "2024" },
  CO: { state: "Colorado", abbr: "CO", type: "permissive", summary: "Pharmacist may substitute; must inform patient of substitution.", patientConsentRequired: true, prescriberCanBlock: true, narrowTherapeuticIndex: "Same as other drugs", updated: "2023" },
  CT: { state: "Connecticut", abbr: "CT", type: "mandatory", summary: "Must substitute unless prescriber indicates 'brand necessary'.", patientConsentRequired: false, prescriberCanBlock: true, narrowTherapeuticIndex: "NTI drugs exempt from mandatory substitution", updated: "2024" },
  DE: { state: "Delaware", abbr: "DE", type: "mandatory", summary: "Mandatory substitution with AB-rated products.", patientConsentRequired: false, prescriberCanBlock: true, narrowTherapeuticIndex: "Same as other drugs", updated: "2023" },
  FL: { state: "Florida", abbr: "FL", type: "mandatory", summary: "Must substitute unless prescriber writes 'medically necessary' in own handwriting.", patientConsentRequired: false, prescriberCanBlock: true, narrowTherapeuticIndex: "NTI drugs require prescriber and patient consent", updated: "2024" },
  GA: { state: "Georgia", abbr: "GA", type: "mandatory", summary: "Must substitute; prescriber can block with 'brand necessary'.", patientConsentRequired: false, prescriberCanBlock: true, narrowTherapeuticIndex: "Same as other drugs", updated: "2023" },
  HI: { state: "Hawaii", abbr: "HI", type: "mandatory", summary: "Mandatory substitution for multi-source drugs.", patientConsentRequired: false, prescriberCanBlock: true, narrowTherapeuticIndex: "NTI drugs may be excluded", updated: "2023" },
  ID: { state: "Idaho", abbr: "ID", type: "permissive", summary: "Pharmacist may substitute with patient notification.", patientConsentRequired: true, prescriberCanBlock: true, narrowTherapeuticIndex: "Same as other drugs", updated: "2023" },
  IL: { state: "Illinois", abbr: "IL", type: "mandatory", summary: "Must substitute unless prescriber writes 'Do Not Substitute'.", patientConsentRequired: false, prescriberCanBlock: true, narrowTherapeuticIndex: "NTI drugs require additional notification", updated: "2024" },
  IN: { state: "Indiana", abbr: "IN", type: "mandatory", summary: "Mandatory substitution; patient may refuse.", patientConsentRequired: true, prescriberCanBlock: true, narrowTherapeuticIndex: "Same as other drugs", updated: "2023" },
  IA: { state: "Iowa", abbr: "IA", type: "mandatory", summary: "Must substitute with AB-rated generics.", patientConsentRequired: false, prescriberCanBlock: true, narrowTherapeuticIndex: "Same as other drugs", updated: "2023" },
  KS: { state: "Kansas", abbr: "KS", type: "mandatory", summary: "Mandatory substitution; prescriber can indicate 'dispense as written'.", patientConsentRequired: false, prescriberCanBlock: true, narrowTherapeuticIndex: "Same as other drugs", updated: "2023" },
  KY: { state: "Kentucky", abbr: "KY", type: "mandatory", summary: "Must substitute unless prescriber writes 'brand medically necessary'.", patientConsentRequired: false, prescriberCanBlock: true, narrowTherapeuticIndex: "NTI drugs require prescriber approval", updated: "2023" },
  LA: { state: "Louisiana", abbr: "LA", type: "mandatory", summary: "Must substitute; patient must be notified.", patientConsentRequired: true, prescriberCanBlock: true, narrowTherapeuticIndex: "Same as other drugs", updated: "2023" },
  ME: { state: "Maine", abbr: "ME", type: "mandatory", summary: "Must substitute with the least costly equivalent.", patientConsentRequired: false, prescriberCanBlock: true, narrowTherapeuticIndex: "NTI drugs require prescriber consent", updated: "2024" },
  MD: { state: "Maryland", abbr: "MD", type: "mandatory", summary: "Must substitute unless prescriber indicates otherwise.", patientConsentRequired: false, prescriberCanBlock: true, narrowTherapeuticIndex: "NTI drugs require prescriber and patient consent", updated: "2024" },
  MA: { state: "Massachusetts", abbr: "MA", type: "mandatory", summary: "Must substitute with lower-cost equivalent.", patientConsentRequired: false, prescriberCanBlock: true, narrowTherapeuticIndex: "NTI drugs exempt", updated: "2024" },
  MI: { state: "Michigan", abbr: "MI", type: "mandatory", summary: "Must substitute unless prescriber writes 'dispense as written'.", patientConsentRequired: false, prescriberCanBlock: true, narrowTherapeuticIndex: "Same as other drugs", updated: "2023" },
  MN: { state: "Minnesota", abbr: "MN", type: "mandatory", summary: "Must substitute; patient can refuse.", patientConsentRequired: true, prescriberCanBlock: true, narrowTherapeuticIndex: "NTI drugs require notification", updated: "2024" },
  MS: { state: "Mississippi", abbr: "MS", type: "permissive", summary: "Pharmacist may substitute with prescriber's permission.", patientConsentRequired: false, prescriberCanBlock: true, narrowTherapeuticIndex: "Same as other drugs", updated: "2023" },
  MO: { state: "Missouri", abbr: "MO", type: "permissive", summary: "Pharmacist may substitute; must notify patient.", patientConsentRequired: true, prescriberCanBlock: true, narrowTherapeuticIndex: "Same as other drugs", updated: "2023" },
  MT: { state: "Montana", abbr: "MT", type: "mandatory", summary: "Must substitute unless prescriber or patient objects.", patientConsentRequired: true, prescriberCanBlock: true, narrowTherapeuticIndex: "Same as other drugs", updated: "2023" },
  NE: { state: "Nebraska", abbr: "NE", type: "mandatory", summary: "Must substitute with AB-rated products.", patientConsentRequired: false, prescriberCanBlock: true, narrowTherapeuticIndex: "Same as other drugs", updated: "2023" },
  NV: { state: "Nevada", abbr: "NV", type: "mandatory", summary: "Must substitute unless prescriber writes 'dispense as written'.", patientConsentRequired: false, prescriberCanBlock: true, narrowTherapeuticIndex: "NTI drugs require prescriber approval", updated: "2024" },
  NH: { state: "New Hampshire", abbr: "NH", type: "mandatory", summary: "Must substitute; patient may refuse.", patientConsentRequired: true, prescriberCanBlock: true, narrowTherapeuticIndex: "Same as other drugs", updated: "2023" },
  NJ: { state: "New Jersey", abbr: "NJ", type: "mandatory", summary: "Must substitute unless prescriber handwrites 'dispense as written'.", patientConsentRequired: false, prescriberCanBlock: true, narrowTherapeuticIndex: "NTI drugs exempt", updated: "2024" },
  NM: { state: "New Mexico", abbr: "NM", type: "mandatory", summary: "Must substitute with AB-rated generics.", patientConsentRequired: false, prescriberCanBlock: true, narrowTherapeuticIndex: "Same as other drugs", updated: "2023" },
  NY: { state: "New York", abbr: "NY", type: "mandatory", summary: "Must substitute unless prescriber writes 'DAW' in own handwriting.", patientConsentRequired: false, prescriberCanBlock: true, narrowTherapeuticIndex: "NTI drugs require prescriber and patient consent", updated: "2024" },
  NC: { state: "North Carolina", abbr: "NC", type: "permissive", summary: "Pharmacist may substitute; must inform patient.", patientConsentRequired: true, prescriberCanBlock: true, narrowTherapeuticIndex: "Same as other drugs", updated: "2023" },
  ND: { state: "North Dakota", abbr: "ND", type: "mandatory", summary: "Must substitute unless prescriber indicates brand required.", patientConsentRequired: false, prescriberCanBlock: true, narrowTherapeuticIndex: "Same as other drugs", updated: "2023" },
  OH: { state: "Ohio", abbr: "OH", type: "mandatory", summary: "Must substitute; prescriber can block with 'dispense as written'.", patientConsentRequired: false, prescriberCanBlock: true, narrowTherapeuticIndex: "Same as other drugs", updated: "2024" },
  OK: { state: "Oklahoma", abbr: "OK", type: "mandatory", summary: "Must substitute unless prescriber or patient objects.", patientConsentRequired: true, prescriberCanBlock: true, narrowTherapeuticIndex: "Same as other drugs", updated: "2023" },
  OR: { state: "Oregon", abbr: "OR", type: "mandatory", summary: "Must substitute; patient must be informed.", patientConsentRequired: true, prescriberCanBlock: true, narrowTherapeuticIndex: "NTI drugs require notification", updated: "2024" },
  PA: { state: "Pennsylvania", abbr: "PA", type: "mandatory", summary: "Must substitute with AB-rated products.", patientConsentRequired: false, prescriberCanBlock: true, narrowTherapeuticIndex: "NTI drugs require prescriber consent", updated: "2024" },
  RI: { state: "Rhode Island", abbr: "RI", type: "mandatory", summary: "Must substitute unless prescriber writes 'brand necessary'.", patientConsentRequired: false, prescriberCanBlock: true, narrowTherapeuticIndex: "Same as other drugs", updated: "2023" },
  SC: { state: "South Carolina", abbr: "SC", type: "permissive", summary: "Pharmacist may substitute with patient consent.", patientConsentRequired: true, prescriberCanBlock: true, narrowTherapeuticIndex: "Same as other drugs", updated: "2023" },
  SD: { state: "South Dakota", abbr: "SD", type: "mandatory", summary: "Must substitute unless prescriber or patient objects.", patientConsentRequired: true, prescriberCanBlock: true, narrowTherapeuticIndex: "Same as other drugs", updated: "2023" },
  TN: { state: "Tennessee", abbr: "TN", type: "mandatory", summary: "Must substitute; prescriber can block with 'dispense as written'.", patientConsentRequired: false, prescriberCanBlock: true, narrowTherapeuticIndex: "Same as other drugs", updated: "2023" },
  TX: { state: "Texas", abbr: "TX", type: "mandatory", summary: "Must substitute unless prescriber writes 'brand necessary' or patient refuses.", patientConsentRequired: true, prescriberCanBlock: true, narrowTherapeuticIndex: "NTI drugs require prescriber approval", updated: "2024" },
  UT: { state: "Utah", abbr: "UT", type: "mandatory", summary: "Must substitute with AB-rated generics.", patientConsentRequired: false, prescriberCanBlock: true, narrowTherapeuticIndex: "Same as other drugs", updated: "2023" },
  VT: { state: "Vermont", abbr: "VT", type: "mandatory", summary: "Must substitute unless prescriber indicates 'dispense as written'.", patientConsentRequired: false, prescriberCanBlock: true, narrowTherapeuticIndex: "Same as other drugs", updated: "2023" },
  VA: { state: "Virginia", abbr: "VA", type: "mandatory", summary: "Must substitute; patient has right to refuse.", patientConsentRequired: true, prescriberCanBlock: true, narrowTherapeuticIndex: "NTI drugs require notification", updated: "2024" },
  WA: { state: "Washington", abbr: "WA", type: "mandatory", summary: "Must substitute unless prescriber writes 'dispense as written'.", patientConsentRequired: false, prescriberCanBlock: true, narrowTherapeuticIndex: "NTI drugs require prescriber consent", updated: "2024" },
  WV: { state: "West Virginia", abbr: "WV", type: "mandatory", summary: "Must substitute with AB-rated products.", patientConsentRequired: false, prescriberCanBlock: true, narrowTherapeuticIndex: "Same as other drugs", updated: "2023" },
  WI: { state: "Wisconsin", abbr: "WI", type: "mandatory", summary: "Must substitute; patient must be notified.", patientConsentRequired: true, prescriberCanBlock: true, narrowTherapeuticIndex: "Same as other drugs", updated: "2023" },
  WY: { state: "Wyoming", abbr: "WY", type: "permissive", summary: "Pharmacist may substitute with notification.", patientConsentRequired: true, prescriberCanBlock: true, narrowTherapeuticIndex: "Same as other drugs", updated: "2023" },
  DC: { state: "District of Columbia", abbr: "DC", type: "mandatory", summary: "Must substitute unless prescriber indicates brand required.", patientConsentRequired: false, prescriberCanBlock: true, narrowTherapeuticIndex: "Same as other drugs", updated: "2024" },
};

export function getStateLawStats() {
  const laws = Object.values(STATE_LAWS);
  return {
    total: laws.length,
    mandatory: laws.filter((l) => l.type === "mandatory").length,
    permissive: laws.filter((l) => l.type === "permissive").length,
    mixed: laws.filter((l) => l.type === "mixed").length,
    patientConsentRequired: laws.filter((l) => l.patientConsentRequired).length,
  };
}
