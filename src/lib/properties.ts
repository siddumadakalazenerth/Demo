import { getBuilder } from "@/lib/builders";

// ── Image pools ──────────────────────────────────────────────────────────────
// Curated, verified Unsplash photo IDs (checked for a real 200 response and, for a
// sample, checked visually) — no local asset files, so every property gets a
// genuinely distinct photo instead of all 30 sharing a handful of images.

const img = (id: string, w = 1200) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

/** One unique hero/card photo per property (30), assigned 1:1 by array index. */
const heroPool = [
  "1560448204-e02f11c3d0e2",
  "1600596542815-ffad4c1539a9",
  "1600585154340-be6161a56a0c",
  "1568605114967-8130f3a36994",
  "1570129477492-45c003edd2be",
  "1512917774080-9991f1c4c750",
  "1523217582562-09d0def993a6",
  "1613977257363-707ba9348227",
  "1512915922686-57c11dde9b6b",
  "1523419409543-a5e549c1faa8",
  "1600607687939-ce8a6c25118c",
  "1605146769289-440113cc3d00",
  "1600566753190-17f0baa2a6c3",
  "1600566753086-00f18fb6b3ea",
  "1599809275671-b5942cabc7a2",
  "1600047509807-ba8f99d2cdde",
  "1600585152220-90363fe7e115",
  "1567538096630-e0c55bd6374c",
  "1586023492125-27b2c045efd7",
  "1493809842364-78817add7ffb",
  "1502672260266-1c1ef2d93688",
  "1524758631624-e2822e304c36",
  "1618221195710-dd6b41faaea6",
  "1600210492486-724fe5c67fb0",
  "1616486338812-3dadae4b4ace",
  "1556911220-e15b29be8c8f",
  "1556909212-d5b604d0c90d",
  "1600489000022-c2086d79f9d4",
  "1600585154526-990dced4db0d",
  "1616594039964-ae9021a400a0",
];

/** Larger interior/exterior pool for the remaining gallery slots. */
const interiorPool = [
  "1540518614846-7eded433c457",
  "1616137466211-f939a420be84",
  "1620626011761-996317b8d101",
  "1584622650111-993a426fbf0a",
  "1600566752355-35792bedcfea",
  "1600585154363-67eb9e2e2099",
  "1518780664697-55e3ad937233",
  "1494526585095-c41746248156",
  "1449844908441-8829872d2607",
  "1613490493576-7fde63acd811",
  "1554995207-c18c203602cb",
  "1605276374104-dee2a0ed3cd6",
  "1580587771525-78b9dba3b914",
  "1600047509358-9dc75507daeb",
  "1580216643062-cf460548a66a",
  "1523192193543-6e7296d960e4",
  "1592595896616-c37162298647",
  "1613553507747-5f8d62ad5904",
  "1598228723793-52759bba239c",
  "1449158743715-0a90ebb6d2d8",
  "1545324418-cc1a3fa10c00",
  "1460317442991-0ec209397118",
  "1524230572899-a752b3835840",
  "1494203484021-3c454daf695d",
  "1522708323590-d24dbb6b0267",
  "1615874959474-d609969a20ed",
  "1616047006789-b7af5afb8c20",
  "1600121848594-d8644e57abab",
  "1560185893-a55cbc8c57e8",
  "1571508601891-ca5e7a713859",
  "1631679706909-1844bbd07221",
  "1600210491892-03d54c0aaf87",
  "1583847268964-b28dc8f51f92",
  "1616627561950-9f746e330187",
  "1540497077202-7c8a3999166f",
  "1571019613454-1cb2f99b2d8b",
  "1587836374828-4dbafa94cf0e",
  "1568402102990-bc541580b59f",
  "1560184897-ae75f418493e",
  "1470770903676-69b98201ea1c",
];

export type AmenityCategory =
  | "Park"
  | "WalkingTrail"
  | "KidsZone"
  | "Pool"
  | "Gym"
  | "ClubHouse"
  | "CoveredParking"
  | "Security";

export const amenityCategoryLabels: Record<AmenityCategory, string> = {
  Park: "Landscaped park",
  WalkingTrail: "Walking trail",
  KidsZone: "Kids' zone",
  Pool: "Swimming pool",
  Gym: "Fitness studio",
  ClubHouse: "Clubhouse",
  CoveredParking: "Covered parking",
  Security: "24x7 security",
};

/** One representative image per amenity category, drawn from the verified pool. */
export const amenityImagePool: Record<AmenityCategory, string> = {
  Pool: img("1613977257363-707ba9348227", 800),
  Gym: img("1571902943202-507ec2618e8f", 800),
  ClubHouse: img("1522708323590-d24dbb6b0267", 800),
  Park: img("1580587771525-78b9dba3b914", 800),
  WalkingTrail: img("1605276374104-dee2a0ed3cd6", 800),
  KidsZone: img("1592595896616-c37162298647", 800),
  CoveredParking: img("1460317442991-0ec209397118", 800),
  Security: img("1545324418-cc1a3fa10c00", 800),
};

// ── Location data ────────────────────────────────────────────────────────────

export type PropertyType = "House" | "Apartment" | "Residential" | "Commercial" | "Villa" | "Plot";

export type Property = {
  id: string;
  name: string;
  img: string;
  price: number;
  country: "India";
  state: string;
  city: string;
  locality: string;
  landmark: string;
  address: string;
  pincode: string;
  beds: number;
  baths: number;
  type: PropertyType;
  floor: number;
  totalFloors: number;
  lift: boolean;
  builderId: string;
  amenityCategories: AmenityCategory[];
};

type Base = Omit<Property, "img" | "country" | "address"> & { street: string };

const bases: Base[] = [
  // Hyderabad, Telangana — landmark Charminar
  {
    id: "p1",
    name: "Cedar Heights, HITEC City",
    street: "Plot 14, Cedar Heights",
    locality: "HITEC City",
    city: "Hyderabad",
    state: "Telangana",
    landmark: "Charminar",
    pincode: "500081",
    price: 9800000,
    beds: 3,
    baths: 3,
    type: "Apartment",
    floor: 8,
    totalFloors: 18,
    lift: true,
    builderId: "b1",
    amenityCategories: ["Pool", "Gym", "ClubHouse", "Security"],
  },
  {
    id: "p2",
    name: "The Courtyard, Nanakramguda",
    street: "Survey 88, The Courtyard Villas",
    locality: "Nanakramguda",
    city: "Hyderabad",
    state: "Telangana",
    landmark: "Charminar",
    pincode: "500032",
    price: 21000000,
    beds: 4,
    baths: 4,
    type: "Villa",
    floor: 0,
    totalFloors: 2,
    lift: false,
    builderId: "b3",
    amenityCategories: ["Pool", "Park", "Security", "CoveredParking"],
  },
  {
    id: "p3",
    name: "Banjara Crest",
    street: "Road No. 12, Banjara Crest",
    locality: "Banjara Hills",
    city: "Hyderabad",
    state: "Telangana",
    landmark: "Charminar",
    pincode: "500034",
    price: 16500000,
    beds: 3,
    baths: 3,
    type: "Residential",
    floor: 5,
    totalFloors: 9,
    lift: true,
    builderId: "b5",
    amenityCategories: ["Gym", "ClubHouse", "CoveredParking"],
  },
  {
    id: "p4",
    name: "Gachibowli Grove Apartments",
    street: "Financial District Rd, Gachibowli Grove",
    locality: "Gachibowli",
    city: "Hyderabad",
    state: "Telangana",
    landmark: "Charminar",
    pincode: "500032",
    price: 7200000,
    beds: 2,
    baths: 2,
    type: "Apartment",
    floor: 3,
    totalFloors: 14,
    lift: true,
    builderId: "b2",
    amenityCategories: ["Pool", "KidsZone", "Security"],
  },
  {
    id: "p5",
    name: "Kondapur Garden Homes",
    street: "Botanical Garden Rd, Kondapur Garden Homes",
    locality: "Kondapur",
    city: "Hyderabad",
    state: "Telangana",
    landmark: "Charminar",
    pincode: "500084",
    price: 6100000,
    beds: 2,
    baths: 2,
    type: "Apartment",
    floor: 4,
    totalFloors: 6,
    lift: false,
    builderId: "b7",
    amenityCategories: ["Park", "WalkingTrail", "CoveredParking"],
  },

  // Bengaluru, Karnataka — landmark Vidhana Soudha
  {
    id: "p6",
    name: "Whitefield Woods",
    street: "ITPL Main Rd, Whitefield Woods",
    locality: "Whitefield",
    city: "Bengaluru",
    state: "Karnataka",
    landmark: "Vidhana Soudha",
    pincode: "560066",
    price: 11200000,
    beds: 3,
    baths: 3,
    type: "Apartment",
    floor: 11,
    totalFloors: 20,
    lift: true,
    builderId: "b1",
    amenityCategories: ["Pool", "Gym", "ClubHouse", "KidsZone"],
  },
  {
    id: "p7",
    name: "Indiranagar Heritage Homes",
    street: "12th Main, Indiranagar Heritage Homes",
    locality: "Indiranagar",
    city: "Bengaluru",
    state: "Karnataka",
    landmark: "Vidhana Soudha",
    pincode: "560038",
    price: 24500000,
    beds: 4,
    baths: 3,
    type: "House",
    floor: 0,
    totalFloors: 2,
    lift: false,
    builderId: "b4",
    amenityCategories: ["Park", "Security"],
  },
  {
    id: "p8",
    name: "Koramangala Skyline Residency",
    street: "80 Feet Rd, Koramangala Skyline",
    locality: "Koramangala",
    city: "Bengaluru",
    state: "Karnataka",
    landmark: "Vidhana Soudha",
    pincode: "560034",
    price: 18700000,
    beds: 3,
    baths: 3,
    type: "Apartment",
    floor: 15,
    totalFloors: 22,
    lift: true,
    builderId: "b6",
    amenityCategories: ["Pool", "Gym", "ClubHouse", "CoveredParking"],
  },
  {
    id: "p9",
    name: "Electronic City Tech Park Homes",
    street: "Hosur Rd, Tech Park Homes",
    locality: "Electronic City",
    city: "Bengaluru",
    state: "Karnataka",
    landmark: "Vidhana Soudha",
    pincode: "560100",
    price: 5400000,
    beds: 2,
    baths: 2,
    type: "Apartment",
    floor: 2,
    totalFloors: 12,
    lift: true,
    builderId: "b2",
    amenityCategories: ["Security", "CoveredParking"],
  },
  {
    id: "p10",
    name: "Yelahanka Lake View Villas",
    street: "Doddaballapur Rd, Lake View Villas",
    locality: "Yelahanka",
    city: "Bengaluru",
    state: "Karnataka",
    landmark: "Vidhana Soudha",
    pincode: "560064",
    price: 15800000,
    beds: 4,
    baths: 4,
    type: "Villa",
    floor: 0,
    totalFloors: 2,
    lift: false,
    builderId: "b3",
    amenityCategories: ["Pool", "Park", "WalkingTrail", "Security"],
  },

  // Mumbai, Maharashtra — landmark Gateway of India
  {
    id: "p11",
    name: "Andheri West Horizon Towers",
    street: "Veera Desai Rd, Horizon Towers",
    locality: "Andheri West",
    city: "Mumbai",
    state: "Maharashtra",
    landmark: "Gateway of India",
    pincode: "400053",
    price: 24800000,
    beds: 3,
    baths: 3,
    type: "Apartment",
    floor: 18,
    totalFloors: 28,
    lift: true,
    builderId: "b6",
    amenityCategories: ["Pool", "Gym", "ClubHouse", "Security"],
  },
  {
    id: "p12",
    name: "Powai Lakeside Residency",
    street: "Hiranandani Gardens Rd, Lakeside Residency",
    locality: "Powai",
    city: "Mumbai",
    state: "Maharashtra",
    landmark: "Gateway of India",
    pincode: "400076",
    price: 19500000,
    beds: 3,
    baths: 2,
    type: "Apartment",
    floor: 9,
    totalFloors: 16,
    lift: true,
    builderId: "b1",
    amenityCategories: ["Pool", "ClubHouse", "KidsZone"],
  },
  {
    id: "p13",
    name: "Bandra Bayview Homes",
    street: "Carter Rd, Bayview Homes",
    locality: "Bandra",
    city: "Mumbai",
    state: "Maharashtra",
    landmark: "Gateway of India",
    pincode: "400050",
    price: 42000000,
    beds: 4,
    baths: 4,
    type: "Residential",
    floor: 6,
    totalFloors: 10,
    lift: true,
    builderId: "b4",
    amenityCategories: ["Gym", "Security", "CoveredParking"],
  },
  {
    id: "p14",
    name: "Thane West Green Meadows",
    street: "Ghodbunder Rd, Green Meadows",
    locality: "Thane West",
    city: "Mumbai",
    state: "Maharashtra",
    landmark: "Gateway of India",
    pincode: "400607",
    price: 8900000,
    beds: 2,
    baths: 2,
    type: "Apartment",
    floor: 5,
    totalFloors: 15,
    lift: true,
    builderId: "b7",
    amenityCategories: ["Park", "KidsZone", "CoveredParking"],
  },
  {
    id: "p15",
    name: "Navi Mumbai Riverside Plots",
    street: "Palm Beach Rd, Riverside Plots",
    locality: "Navi Mumbai",
    city: "Mumbai",
    state: "Maharashtra",
    landmark: "Gateway of India",
    pincode: "400614",
    price: 12500000,
    beds: 0,
    baths: 0,
    type: "Plot",
    floor: 0,
    totalFloors: 0,
    lift: false,
    builderId: "b8",
    amenityCategories: ["Security"],
  },

  // Delhi NCR — landmark India Gate
  {
    id: "p16",
    name: "Dwarka Sector Homes",
    street: "Sector 12, Dwarka Sector Homes",
    locality: "Dwarka",
    city: "Delhi NCR",
    state: "Delhi",
    landmark: "India Gate",
    pincode: "110078",
    price: 9700000,
    beds: 3,
    baths: 2,
    type: "Apartment",
    floor: 6,
    totalFloors: 12,
    lift: true,
    builderId: "b2",
    amenityCategories: ["Park", "Security", "CoveredParking"],
  },
  {
    id: "p17",
    name: "Vasant Kunj Manor",
    street: "Poorvi Marg, Vasant Kunj Manor",
    locality: "Vasant Kunj",
    city: "Delhi NCR",
    state: "Delhi",
    landmark: "India Gate",
    pincode: "110070",
    price: 38500000,
    beds: 4,
    baths: 4,
    type: "House",
    floor: 0,
    totalFloors: 3,
    lift: false,
    builderId: "b5",
    amenityCategories: ["Park", "Security"],
  },
  {
    id: "p18",
    name: "Gurugram Sky Residences",
    street: "Golf Course Ext Rd, Sky Residences",
    locality: "Gurugram Sector 54",
    city: "Delhi NCR",
    state: "Haryana",
    landmark: "India Gate",
    pincode: "122011",
    price: 21300000,
    beds: 3,
    baths: 3,
    type: "Apartment",
    floor: 22,
    totalFloors: 30,
    lift: true,
    builderId: "b6",
    amenityCategories: ["Pool", "Gym", "ClubHouse", "Security"],
  },
  {
    id: "p19",
    name: "Noida Tech Homes",
    street: "Sector 62 Main Rd, Tech Homes",
    locality: "Noida Sector 62",
    city: "Delhi NCR",
    state: "Uttar Pradesh",
    landmark: "India Gate",
    pincode: "201309",
    price: 6800000,
    beds: 2,
    baths: 2,
    type: "Apartment",
    floor: 3,
    totalFloors: 10,
    lift: true,
    builderId: "b2",
    amenityCategories: ["Gym", "CoveredParking"],
  },
  {
    id: "p20",
    name: "Greater Kailash Heritage House",
    street: "M Block Market Rd, Heritage House",
    locality: "Greater Kailash",
    city: "Delhi NCR",
    state: "Delhi",
    landmark: "India Gate",
    pincode: "110048",
    price: 32000000,
    beds: 4,
    baths: 3,
    type: "House",
    floor: 0,
    totalFloors: 2,
    lift: false,
    builderId: "b4",
    amenityCategories: ["Security", "CoveredParking"],
  },

  // Chennai, Tamil Nadu — landmark Marina Beach
  {
    id: "p21",
    name: "OMR IT Corridor Homes",
    street: "Sholinganallur, OMR IT Corridor Homes",
    locality: "OMR",
    city: "Chennai",
    state: "Tamil Nadu",
    landmark: "Marina Beach",
    pincode: "600119",
    price: 6900000,
    beds: 2,
    baths: 2,
    type: "Apartment",
    floor: 4,
    totalFloors: 11,
    lift: true,
    builderId: "b7",
    amenityCategories: ["Pool", "Gym", "Security"],
  },
  {
    id: "p22",
    name: "Anna Nagar Classic Residency",
    street: "2nd Ave, Anna Nagar Classic Residency",
    locality: "Anna Nagar",
    city: "Chennai",
    state: "Tamil Nadu",
    landmark: "Marina Beach",
    pincode: "600040",
    price: 13400000,
    beds: 3,
    baths: 3,
    type: "Residential",
    floor: 4,
    totalFloors: 8,
    lift: true,
    builderId: "b1",
    amenityCategories: ["ClubHouse", "CoveredParking"],
  },
  {
    id: "p23",
    name: "Adyar Riverside Villas",
    street: "Besant Nagar Rd, Riverside Villas",
    locality: "Adyar",
    city: "Chennai",
    state: "Tamil Nadu",
    landmark: "Marina Beach",
    pincode: "600020",
    price: 27500000,
    beds: 4,
    baths: 4,
    type: "Villa",
    floor: 0,
    totalFloors: 2,
    lift: false,
    builderId: "b3",
    amenityCategories: ["Pool", "Park", "Security"],
  },
  {
    id: "p24",
    name: "Velachery Garden Apartments",
    street: "100 Feet Rd, Garden Apartments",
    locality: "Velachery",
    city: "Chennai",
    state: "Tamil Nadu",
    landmark: "Marina Beach",
    pincode: "600042",
    price: 5900000,
    beds: 2,
    baths: 2,
    type: "Apartment",
    floor: 2,
    totalFloors: 7,
    lift: false,
    builderId: "b8",
    amenityCategories: ["Park", "KidsZone"],
  },
  {
    id: "p25",
    name: "T Nagar Commercial Complex",
    street: "Pondy Bazaar, Commercial Complex",
    locality: "T Nagar",
    city: "Chennai",
    state: "Tamil Nadu",
    landmark: "Marina Beach",
    pincode: "600017",
    price: 34000000,
    beds: 0,
    baths: 2,
    type: "Commercial",
    floor: 1,
    totalFloors: 5,
    lift: true,
    builderId: "b6",
    amenityCategories: ["CoveredParking", "Security"],
  },

  // Pune, Maharashtra — landmark Shaniwar Wada
  {
    id: "p26",
    name: "Hinjewadi Tech Park Homes",
    street: "Phase 2, Hinjewadi Tech Park Homes",
    locality: "Hinjewadi",
    city: "Pune",
    state: "Maharashtra",
    landmark: "Shaniwar Wada",
    pincode: "411057",
    price: 7600000,
    beds: 2,
    baths: 2,
    type: "Apartment",
    floor: 7,
    totalFloors: 16,
    lift: true,
    builderId: "b2",
    amenityCategories: ["Pool", "Gym", "ClubHouse"],
  },
  {
    id: "p27",
    name: "Baner Hilltop Residency",
    street: "Baner-Pashan Link Rd, Hilltop Residency",
    locality: "Baner",
    city: "Pune",
    state: "Maharashtra",
    landmark: "Shaniwar Wada",
    pincode: "411045",
    price: 10800000,
    beds: 3,
    baths: 3,
    type: "Apartment",
    floor: 10,
    totalFloors: 19,
    lift: true,
    builderId: "b5",
    amenityCategories: ["Pool", "Gym", "Security", "CoveredParking"],
  },
  {
    id: "p28",
    name: "Kharadi Riverside Homes",
    street: "EON Free Zone Rd, Riverside Homes",
    locality: "Kharadi",
    city: "Pune",
    state: "Maharashtra",
    landmark: "Shaniwar Wada",
    pincode: "411014",
    price: 8300000,
    beds: 2,
    baths: 2,
    type: "Residential",
    floor: 5,
    totalFloors: 13,
    lift: true,
    builderId: "b7",
    amenityCategories: ["Park", "WalkingTrail", "KidsZone"],
  },
  {
    id: "p29",
    name: "Kothrud Heritage Homes",
    street: "Karve Rd, Kothrud Heritage Homes",
    locality: "Kothrud",
    city: "Pune",
    state: "Maharashtra",
    landmark: "Shaniwar Wada",
    pincode: "411038",
    price: 14200000,
    beds: 3,
    baths: 2,
    type: "House",
    floor: 0,
    totalFloors: 2,
    lift: false,
    builderId: "b4",
    amenityCategories: ["Security"],
  },
  {
    id: "p30",
    name: "Viman Nagar Skyline Plots",
    street: "Airport Rd, Skyline Plots",
    locality: "Viman Nagar",
    city: "Pune",
    state: "Maharashtra",
    landmark: "Shaniwar Wada",
    pincode: "411014",
    price: 9100000,
    beds: 0,
    baths: 0,
    type: "Plot",
    floor: 0,
    totalFloors: 0,
    lift: false,
    builderId: "b8",
    amenityCategories: ["Security", "CoveredParking"],
  },
];

export const properties: Property[] = bases.map((b, i) => ({
  ...b,
  country: "India",
  address: `${b.street}, ${b.locality}, ${b.city} - ${b.pincode}`,
  img: img(heroPool[i % heroPool.length]!),
}));

export const propertyTypes: PropertyType[] = [
  "House",
  "Apartment",
  "Residential",
  "Commercial",
  "Villa",
  "Plot",
];
export const cities = ["Hyderabad", "Bengaluru", "Mumbai", "Delhi NCR", "Chennai", "Pune"];
export const priceBands = [
  { label: "Up to ₹50L", min: 0, max: 5000000 },
  { label: "₹50L – ₹1Cr", min: 5000000, max: 10000000 },
  { label: "₹1Cr – ₹2.5Cr", min: 10000000, max: 25000000 },
  { label: "₹2.5Cr+", min: 25000000, max: Number.MAX_SAFE_INTEGER },
];
export const roomOptions = [1, 2, 3, 4, 5];

export const formatPrice = (n: number) =>
  n.toLocaleString("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 });

export function filterProperties(
  list: Property[],
  f: {
    type?: string | undefined;
    price?: string | undefined;
    location?: string | undefined;
    locations?: string[] | undefined;
    rooms?: number | undefined;
    amenities?: AmenityCategory[] | undefined;
  },
) {
  const band = priceBands.find((b) => b.label === f.price);
  return list.filter((p) => {
    if (f.type && p.type !== f.type) return false;
    if (f.location && p.city !== f.location) return false;
    if (f.locations && f.locations.length > 0 && !f.locations.includes(p.locality)) return false;
    if (f.rooms && p.beds < f.rooms) return false;
    if (band && (p.price < band.min || p.price > band.max)) return false;
    if (
      f.amenities &&
      f.amenities.length > 0 &&
      !f.amenities.every((a) => p.amenityCategories.includes(a))
    )
      return false;
    return true;
  });
}

// ── Rich detail data ─────────────────────────────────────────────────────────

export type Amenity = { label: string; img: string; category: AmenityCategory };
export type NearbyPlace = {
  kind: "School" | "Hospital" | "Metro" | "Park";
  name: string;
  km: number;
  mins: number;
};
export type PricePoint = { date: string; price: number };

export type PropertyDetail = {
  gallery: string[];
  description: string;
  amenities: Amenity[];
  nearby: NearbyPlace[];
  priceHistory: PricePoint[];
  tags: string[];
  listedAt: string;
  area: number;
  yearBuilt: number;
  mapQuery: string;
  amenityMapImg?: string | undefined;
};

const nearbySets: Record<
  string,
  { schools: string[]; hospitals: string[]; metros: string[]; parks: string[] }
> = {
  Hyderabad: {
    schools: ["Delhi Public School, Nacharam", "Chirec International School"],
    hospitals: ["Apollo Hospitals, Jubilee Hills", "Continental Hospitals"],
    metros: ["Ameerpet Metro Station", "Raidurg Metro Station"],
    parks: ["KBR National Park", "Botanical Garden, Kondapur"],
  },
  Bengaluru: {
    schools: ["National Public School, Koramangala", "Vidyashilp Academy"],
    hospitals: ["Manipal Hospital", "Fortis Hospital, Bannerghatta"],
    metros: ["Indiranagar Metro Station", "MG Road Metro Station"],
    parks: ["Cubbon Park", "Lalbagh Botanical Garden"],
  },
  Mumbai: {
    schools: ["Bombay Scottish School", "Dhirubhai Ambani International School"],
    hospitals: ["Kokilaben Dhirubhai Ambani Hospital", "Hiranandani Hospital"],
    metros: ["Andheri Metro Station", "Ghatkopar Metro Station"],
    parks: ["Sanjay Gandhi National Park", "Powai Lake Promenade"],
  },
  "Delhi NCR": {
    schools: ["DAV Public School", "Delhi Public School, R.K. Puram"],
    hospitals: ["Max Super Speciality Hospital", "Fortis Escorts Heart Institute"],
    metros: ["Dwarka Sector 21 Metro Station", "HUDA City Centre Metro Station"],
    parks: ["Lodhi Garden", "Deer Park, Hauz Khas"],
  },
  Chennai: {
    schools: ["Chettinad Vidyashram", "PSBB Senior Secondary School"],
    hospitals: ["Apollo Hospitals, Greams Road", "MIOT International"],
    metros: ["Thirumangalam Metro Station", "AG-DMS Metro Station"],
    parks: ["Semmozhi Poonga", "Guindy National Park"],
  },
  Pune: {
    schools: ["Symbiosis International School", "Vibgyor High School"],
    hospitals: ["Ruby Hall Clinic", "Jehangir Hospital"],
    metros: ["Hinjewadi Metro Station", "Vanaz Metro Station"],
    parks: ["Pashan Lake", "Okayama Friendship Garden"],
  },
};

export const propertyDetails: Record<string, PropertyDetail> = Object.fromEntries(
  properties.map((p, i) => {
    const gallery = [
      p.img,
      ...Array.from({ length: 4 }, (_, slot) =>
        img(interiorPool[(i * 5 + slot) % interiorPool.length]!),
      ),
    ];
    const nb = nearbySets[p.city] ?? nearbySets["Hyderabad"]!;
    const listedDaysAgo = 3 + ((i * 7) % 40);
    const listedAt = new Date(Date.now() - listedDaysAgo * 24 * 60 * 60 * 1000)
      .toISOString()
      .slice(0, 10);
    const amenities: Amenity[] = p.amenityCategories.map((cat) => ({
      label: amenityCategoryLabels[cat],
      img: amenityImagePool[cat],
      category: cat,
    }));
    const tags: string[] = [];
    if (i % 4 === 0) tags.push("Exclusive");
    if (i % 5 === 0) tags.push("Prime Location");
    if (i % 6 === 1) tags.push("Hot Listing");

    return [
      p.id,
      {
        gallery,
        description: `${p.name} is located in ${p.locality}, ${p.city} — a short drive from ${p.landmark}. Designed with bright, cross-ventilated layouts and quality fittings throughout, this ${p.beds > 0 ? `${p.beds}-bedroom` : ""} ${p.type.toLowerCase()} suits ${p.beds >= 4 ? "joint or growing families" : p.beds <= 2 ? "young professionals and couples" : "families"} looking for a well-connected neighbourhood close to schools, hospitals and transit.`,
        amenities,
        nearby: [
          {
            kind: "School",
            name: nb.schools[i % nb.schools.length]!,
            km: 0.8 + (i % 3) * 0.4,
            mins: 4 + (i % 3),
          },
          {
            kind: "Hospital",
            name: nb.hospitals[i % nb.hospitals.length]!,
            km: 2.1 + (i % 4) * 0.5,
            mins: 8 + (i % 4),
          },
          {
            kind: "Metro",
            name: nb.metros[i % nb.metros.length]!,
            km: 1.4 + (i % 3) * 0.6,
            mins: 6 + (i % 3),
          },
          {
            kind: "Park",
            name: nb.parks[i % nb.parks.length]!,
            km: 0.5 + (i % 2) * 0.3,
            mins: 3 + (i % 2),
          },
        ],
        priceHistory: [
          {
            date: new Date(Date.now() - 180 * 86400000).toISOString().slice(0, 10),
            price: Math.round(p.price * 1.08),
          },
          {
            date: new Date(Date.now() - 90 * 86400000).toISOString().slice(0, 10),
            price: Math.round(p.price * 1.03),
          },
          { date: listedAt, price: Math.round(p.price * 1.01) },
          { date: new Date().toISOString().slice(0, 10), price: p.price },
        ],
        tags,
        listedAt,
        area: p.type === "Plot" ? 1800 + i * 60 : 850 + i * 45,
        yearBuilt: p.type === "Plot" ? 0 : 2014 + (i % 10),
        mapQuery: `${p.address}`,
        amenityMapImg:
          (p.type === "Villa" || p.type === "Apartment") && p.amenityCategories.length >= 3
            ? img(interiorPool[(i * 3 + 2) % interiorPool.length]!, 900)
            : undefined,
      },
    ];
  }),
);

export const getProperty = (id: string) => properties.find((p) => p.id === id);
export const getBuilderName = (builderId: string) =>
  getBuilder(builderId)?.name ?? "Independent Seller";

/** Similar listings: same city first, then same type, then closest price. */
export function recommendedFor(id: string, limit = 3): Property[] {
  const base = getProperty(id);
  if (!base) return properties.slice(0, limit);
  return properties
    .filter((p) => p.id !== id)
    .map((p) => ({
      p,
      score:
        (p.city === base.city ? 0 : 2) +
        (p.type === base.type ? 0 : 1) +
        Math.abs(p.price - base.price) / 1_000_000,
    }))
    .sort((a, b) => a.score - b.score)
    .slice(0, limit)
    .map((x) => x.p);
}

export function propertiesByBuilder(builderId: string): Property[] {
  return properties.filter((p) => p.builderId === builderId);
}

// ── Derived helpers (computed, not hand-authored, per the pattern above) ──────

export function isNewListing(listedAtIso: string, windowDays = 10): boolean {
  const days = (Date.now() - new Date(listedAtIso).getTime()) / 86400000;
  return days <= windowDays;
}

export type BudgetTier = "Budget" | "Mid-range" | "Premium" | "Luxury";

export function budgetTierFor(price: number): BudgetTier {
  if (price < 8000000) return "Budget";
  if (price < 16000000) return "Mid-range";
  if (price < 30000000) return "Premium";
  return "Luxury";
}

export type Persona =
  "SeniorFriendly" | "YoungProfessional" | "Couple" | "FamilyWithKids" | "JointFamily";

export function personasFor(p: Property): Persona[] {
  const out: Persona[] = [];
  const groundFloorOrLift = p.floor === 0 || p.lift;
  if (groundFloorOrLift && p.type !== "Plot" && p.type !== "Commercial") out.push("SeniorFriendly");
  if ((p.type === "Apartment" || p.type === "Residential") && p.beds <= 2) {
    out.push("YoungProfessional");
    out.push("Couple");
  }
  if (p.beds >= 3 && groundFloorOrLift) out.push("FamilyWithKids");
  if (p.type === "Villa" || p.type === "House" || p.beds >= 4) out.push("JointFamily");
  return out;
}

export const personaLabels: Record<Persona, string> = {
  SeniorFriendly: "Senior-Friendly Homes",
  YoungProfessional: "For Young Professionals",
  Couple: "For Couples",
  FamilyWithKids: "Family Homes",
  JointFamily: "Joint Family Villas",
};
