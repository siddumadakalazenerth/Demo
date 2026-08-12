export type FaqEntry = {
  q: string;
  a: string;
  category: "Documentation" | "Tax" | "Process" | "General";
};

/** Roadmap 10.2 — most-asked FAQs, segmented by state since buying concerns differ regionally. */
export const faqsByState: Record<string, FaqEntry[]> = {
  National: [
    {
      q: "What types of properties are listed on Zenrth?",
      a: "Residential, commercial and luxury properties — houses, apartments, villas and plots — across six major Indian cities.",
      category: "General",
    },
    {
      q: "Is site visit booking free?",
      a: "Yes, scheduling a site visit through any listing is free and does not obligate you to proceed.",
      category: "Process",
    },
    {
      q: "Can I browse without creating an account?",
      a: "Yes — this demo does not require sign-up to browse listings, save searches locally, or use the calculators.",
      category: "General",
    },
  ],
  Telangana: [
    {
      q: "Is RERA registration mandatory in Telangana?",
      a: "Yes, TS-RERA registration is mandatory for most residential projects above the threshold size before a builder can market or sell units.",
      category: "Documentation",
    },
    {
      q: "What is the stamp duty for property registration in Hyderabad?",
      a: "Stamp duty and registration charges in Telangana are typically around 6-7.5% of the property value combined, subject to current state rates.",
      category: "Tax",
    },
  ],
  Karnataka: [
    {
      q: "What is Khata and why does it matter in Bengaluru?",
      a: "A Khata is a municipal property record required for utility connections, loans and resale — always confirm A-Khata status before purchase.",
      category: "Documentation",
    },
    {
      q: "How much is stamp duty in Karnataka?",
      a: "Karnataka's stamp duty is tiered by property value, generally between 3-5% plus registration charges.",
      category: "Tax",
    },
  ],
  Maharashtra: [
    {
      q: "Is MahaRERA registration required?",
      a: "Yes, MahaRERA registration is mandatory for projects in Mumbai and Pune above the applicable size threshold.",
      category: "Documentation",
    },
    {
      q: "What is the stamp duty in Mumbai vs Pune?",
      a: "Stamp duty rates are set by the state and can vary slightly by municipal corporation — always confirm the current rate before registration.",
      category: "Tax",
    },
  ],
  Delhi: [
    {
      q: "What documents are needed for property registration in Delhi?",
      a: "Sale deed, PAN, identity proof and payment of applicable stamp duty and registration fee at the sub-registrar's office.",
      category: "Documentation",
    },
    {
      q: "Is there a difference buying in Delhi vs Gurugram/Noida?",
      a: "Gurugram falls under Haryana RERA and Noida under UP RERA — each has its own registration and stamp duty rules distinct from Delhi.",
      category: "Process",
    },
  ],
  "Tamil Nadu": [
    {
      q: "Is TNRERA registration checked on Zenrth listings?",
      a: "We surface builder RERA registration where available — always independently verify on the official TNRERA portal before purchase.",
      category: "Documentation",
    },
    {
      q: "What is the typical registration cost in Chennai?",
      a: "Registration charges in Tamil Nadu are generally around 1% of property value in addition to stamp duty.",
      category: "Tax",
    },
  ],
};

export const faqStates = Object.keys(faqsByState);
