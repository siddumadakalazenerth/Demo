const img = (id: string, w = 400) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

export type BuilderReview = {
  author: string;
  avatarImg: string;
  rating: 1 | 2 | 3 | 4 | 5;
  quote: string;
  date: string;
};

export type Builder = {
  id: string;
  name: string;
  tagline: string;
  founded: number;
  hqCity: string;
  logoInitial: string;
  logoTone: string;
  certifications: string[];
  milestones: { year: number; label: string }[];
  reviews: BuilderReview[];
};

export const builders: Builder[] = [
  {
    id: "b1",
    name: "Silver Oak Realty",
    tagline: "Thoughtfully planned homes across South India",
    founded: 1998,
    hqCity: "Bengaluru",
    logoInitial: "SO",
    logoTone: "bg-primary text-primary-foreground",
    certifications: ["RERA Registered", "ISO 9001:2015", "IGBC Green Homes Rated"],
    milestones: [
      { year: 1998, label: "Founded in Bengaluru with its first residential layout" },
      { year: 2009, label: "Delivered 5,000th home across South India" },
      { year: 2018, label: "Launched first IGBC Green Homes certified project" },
      { year: 2024, label: "Crossed 40 completed projects" },
    ],
    reviews: [
      {
        author: "Ananya Rao",
        avatarImg: img("1507003211169-0a1dd7228f2d"),
        rating: 5,
        quote:
          "Handover was on time and exactly as promised in the brochure. Very transparent process.",
        date: "2026-03-14",
      },
      {
        author: "Karthik Iyer",
        avatarImg: img("1472099645785-5658abf4ff4e"),
        rating: 4,
        quote:
          "Good build quality and the clubhouse amenities are well maintained even after 3 years.",
        date: "2025-11-02",
      },
    ],
  },
  {
    id: "b2",
    name: "Bluewave Habitat",
    tagline: "Affordable, well-connected homes for first-time buyers",
    founded: 2005,
    hqCity: "Pune",
    logoInitial: "BH",
    logoTone: "bg-accent text-accent-foreground",
    certifications: ["RERA Registered", "ISO 14001:2015"],
    milestones: [
      { year: 2005, label: "Founded with a focus on budget housing" },
      { year: 2014, label: "First project in the National Capital Region" },
      { year: 2021, label: "10,000th family moved into a Bluewave home" },
    ],
    reviews: [
      {
        author: "Priya Nair",
        avatarImg: img("1494790108377-be9c29b29330"),
        rating: 4,
        quote:
          "Best value for money in the Noida sector we were looking at. Site visits were hassle-free.",
        date: "2026-01-20",
      },
      {
        author: "Rohit Sharma",
        avatarImg: img("1519085360753-af0119f7cbe7"),
        rating: 4,
        quote:
          "Construction quality is solid for the price point. Would recommend to first-time buyers.",
        date: "2025-09-18",
      },
    ],
  },
  {
    id: "b3",
    name: "Terra Crest Builders",
    tagline: "Premium villas and independent homes",
    founded: 2001,
    hqCity: "Hyderabad",
    logoInitial: "TC",
    logoTone: "bg-secondary text-secondary-foreground",
    certifications: ["RERA Registered", "ISO 9001:2015", "IGBC Gold Certified"],
    milestones: [
      { year: 2001, label: "Founded, specialising in independent villas" },
      { year: 2012, label: "Launched gated villa community in Nanakramguda" },
      { year: 2023, label: "Awarded IGBC Gold rating for sustainable design" },
    ],
    reviews: [
      {
        author: "Meera Pillai",
        avatarImg: img("1544005313-94ddf0286df2"),
        rating: 5,
        quote:
          "The villa layout and privacy is exactly what we wanted for a joint family. Highly satisfied.",
        date: "2026-02-08",
      },
      {
        author: "Arjun Menon",
        avatarImg: img("1517841905240-472988babdf9"),
        rating: 5,
        quote: "Landscaping and common areas are still immaculate two years after possession.",
        date: "2025-07-30",
      },
    ],
  },
  {
    id: "b4",
    name: "Amber Grove Developers",
    tagline: "Heritage-style independent houses in established neighbourhoods",
    founded: 1989,
    hqCity: "Delhi NCR",
    logoInitial: "AG",
    logoTone: "bg-primary text-primary-foreground",
    certifications: ["RERA Registered", "Heritage Conservation Partner"],
    milestones: [
      { year: 1989, label: "Founded in Delhi, one of the earliest listed developers on Zenrth" },
      { year: 2003, label: "Restored and delivered 12 heritage-style bungalows" },
      { year: 2020, label: "Expanded to Mumbai and Chennai" },
    ],
    reviews: [
      {
        author: "Sunita Deshmukh",
        avatarImg: img("1552058544-f2b08422138a"),
        rating: 5,
        quote:
          "They preserved the character of the neighbourhood while modernising the interiors. Excellent work.",
        date: "2025-12-11",
      },
      {
        author: "Vikram Chauhan",
        avatarImg: img("1508214751196-bcfd4ca60f91"),
        rating: 4,
        quote: "A bit pricier than others nearby, but the finish quality justifies it.",
        date: "2025-10-05",
      },
    ],
  },
  {
    id: "b5",
    name: "Skyline Meadows Developers",
    tagline: "High-rise living with panoramic city views",
    founded: 2010,
    hqCity: "Hyderabad",
    logoInitial: "SM",
    logoTone: "bg-accent text-accent-foreground",
    certifications: ["RERA Registered", "ISO 9001:2015"],
    milestones: [
      { year: 2010, label: "Founded with first high-rise tower in Banjara Hills" },
      { year: 2017, label: "Delivered tallest residential tower in the portfolio" },
      { year: 2024, label: "Launched second high-rise phase in Pune" },
    ],
    reviews: [
      {
        author: "Divya Krishnan",
        avatarImg: img("1573497019940-1c28c88b4f3e"),
        rating: 4,
        quote: "Great views and the lift service is reliable even during peak hours.",
        date: "2026-04-02",
      },
      {
        author: "Sanjay Bhatt",
        avatarImg: img("1531123897727-8f129e1688ce"),
        rating: 4,
        quote: "Amenities are well thought out for families. Gym and pool are rarely crowded.",
        date: "2025-08-22",
      },
    ],
  },
  {
    id: "b6",
    name: "Orchid Crown Realty",
    tagline: "Integrated townships with full-service amenities",
    founded: 1995,
    hqCity: "Mumbai",
    logoInitial: "OC",
    logoTone: "bg-secondary text-secondary-foreground",
    certifications: ["RERA Registered", "ISO 14001:2015", "IGBC Green Homes Rated"],
    milestones: [
      { year: 1995, label: "Founded in Mumbai" },
      { year: 2008, label: "First integrated township with school and retail" },
      { year: 2019, label: "Expanded township model to Gurugram and Chennai" },
    ],
    reviews: [
      {
        author: "Neha Kapoor",
        avatarImg: img("1560250097-0b93528c311a"),
        rating: 5,
        quote: "Everything we need is within the township — school, clinic, and a great clubhouse.",
        date: "2026-01-29",
      },
      {
        author: "Amitabh Rao",
        avatarImg: img("1487412720507-e7ab37603c6f"),
        rating: 4,
        quote: "Slightly higher maintenance charges but the upkeep of common areas shows it.",
        date: "2025-06-14",
      },
    ],
  },
  {
    id: "b7",
    name: "Northgate Living",
    tagline: "Nature-integrated homes with parks and trails",
    founded: 2013,
    hqCity: "Chennai",
    logoInitial: "NL",
    logoTone: "bg-primary text-primary-foreground",
    certifications: ["RERA Registered", "IGBC Green Homes Rated"],
    milestones: [
      { year: 2013, label: "Founded with a focus on green, low-density layouts" },
      { year: 2020, label: "Planted over 10,000 trees across active projects" },
      { year: 2025, label: "Delivered first net-positive-water community" },
    ],
    reviews: [
      {
        author: "Lakshmi Venkatesh",
        avatarImg: img("1544725176-7c40e5a71c5e"),
        rating: 5,
        quote:
          "The walking trails and green cover make this feel nothing like a typical apartment complex.",
        date: "2026-03-30",
      },
      {
        author: "Farhan Sheikh",
        avatarImg: img("1438761681033-6461ffad8d80"),
        rating: 4,
        quote: "Peaceful and well-planned. Kids' zone is a big plus for our family.",
        date: "2025-11-19",
      },
    ],
  },
  {
    id: "b8",
    name: "Palm Court Estates",
    tagline: "Land parcels and plotted developments for custom builds",
    founded: 2007,
    hqCity: "Chennai",
    logoInitial: "PC",
    logoTone: "bg-accent text-accent-foreground",
    certifications: ["RERA Registered", "DTCP Approved Layouts"],
    milestones: [
      { year: 2007, label: "Founded, focused on DTCP-approved plotted layouts" },
      { year: 2016, label: "First gated plotted community with underground utilities" },
      { year: 2022, label: "Expanded plotted layouts to Pune and Navi Mumbai" },
    ],
    reviews: [
      {
        author: "Ramesh Iyer",
        avatarImg: img("1500648767791-00dcc994a43e"),
        rating: 4,
        quote:
          "Clean titles and all approvals were in place, which made the purchase process smooth.",
        date: "2025-09-27",
      },
      {
        author: "Shalini Menon",
        avatarImg: img("1580489944761-15a19d654956"),
        rating: 5,
        quote: "Boundary marking and utility layout were exactly as shown in the plan.",
        date: "2025-05-16",
      },
    ],
  },
];

export const getBuilder = (id: string) => builders.find((b) => b.id === id);
