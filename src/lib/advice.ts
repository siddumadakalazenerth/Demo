const img = (id: string, w = 900) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

export type Guide = {
  slug: string;
  title: string;
  audience: "Buying" | "Selling";
  summary: string;
  body: string[];
  readMins: number;
  img: string;
};

export const guides: Guide[] = [
  {
    slug: "first-time-buyer-checklist",
    title: "A first-time buyer's checklist for India",
    audience: "Buying",
    summary: "The documents, approvals and site-visit questions to get right before you commit.",
    readMins: 6,
    img: img("1600566753190-17f0baa2a6c3"),
    body: [
      "Start with your budget, not the listing. Use an EMI calculator to see what a lender will actually approve before you fall for a home outside your range.",
      "Check RERA registration for the project and confirm the builder's track record on delivery timelines.",
      "Visit at two different times of day — traffic, noise and light change more than photos suggest.",
      "Ask for the encumbrance certificate and confirm there are no pending dues on the property.",
    ],
  },
  {
    slug: "understanding-emi",
    title: "Understanding your home loan EMI",
    audience: "Buying",
    summary: "How down payment, tenure and interest rate each move your monthly number.",
    readMins: 4,
    img: img("1600047509807-ba8f99d2cdde"),
    body: [
      "A longer tenure lowers your monthly EMI but increases total interest paid over the life of the loan.",
      "Every extra percentage point of down payment reduces the principal you're financing — and the interest that compounds on it.",
      "Compare the effective interest rate, not just the headline rate — processing fees and insurance add-ons change the real cost.",
    ],
  },
  {
    slug: "selling-your-home-fast",
    title: "Pricing your home to sell without leaving money on the table",
    audience: "Selling",
    summary: "How to set an asking price that attracts offers instead of sitting unsold.",
    readMins: 5,
    img: img("1600566753086-00f18fb6b3ea"),
    body: [
      "Compare recent sold prices in your locality, not just current asking prices — asking prices are aspirational, sold prices are real.",
      "Homes priced within 5% of fair value typically sell faster and closer to asking than homes priced aggressively high.",
      "Professional photos and a complete amenity list measurably increase enquiry volume.",
    ],
  },
  {
    slug: "documents-for-selling",
    title: "Documents you'll need before listing",
    audience: "Selling",
    summary: "Sale deed, encumbrance certificate, tax receipts — what buyers will ask for.",
    readMins: 4,
    img: img("1580216643062-cf460548a66a"),
    body: [
      "Keep the sale deed, latest property tax receipts and encumbrance certificate ready before you list.",
      "For apartments, occupancy certificate and society NOC speed up buyer due diligence significantly.",
      "Clear any pending loans against the property early — an active lien is the most common reason deals stall.",
    ],
  },
  {
    slug: "choosing-a-locality",
    title: "How to choose the right locality, not just the right home",
    audience: "Buying",
    summary: "Commute, schools, resale value — the factors that outlast the interior finish.",
    readMins: 5,
    img: img("1605276374104-dee2a0ed3cd6"),
    body: [
      "A great home in the wrong locality is still the wrong home — weigh commute time and social infrastructure alongside the floor plan.",
      "Emerging localities can offer better value, but check the area's actual development timeline, not just the builder's projections.",
      "Resale value tends to track proximity to metro connectivity and established schools over a 5-10 year horizon.",
    ],
  },
  {
    slug: "negotiation-basics",
    title: "Negotiation basics every buyer should know",
    audience: "Buying",
    summary: "What's actually negotiable beyond the headline price.",
    readMins: 3,
    img: img("1600121848594-d8644e57abab"),
    body: [
      "Price isn't the only lever — floor rise charges, parking allocation and payment schedule are all negotiable.",
      "Builders are often more flexible near quarter-end targets than mid-quarter.",
      "Get any verbal concession in writing before you make your token payment.",
    ],
  },
];

export const getGuide = (slug: string) => guides.find((g) => g.slug === slug);
