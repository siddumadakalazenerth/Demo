import { properties } from "@/lib/properties";

const img = (id: string, w = 1200) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

export type CityInfo = {
  name: string;
  state: string;
  landmark: string;
  landmarkImg: string;
  localities: string[];
};

export const country = "India";

export const citiesInfo: CityInfo[] = [
  {
    name: "Hyderabad",
    state: "Telangana",
    landmark: "Charminar",
    landmarkImg: img("1741545979534-02f59c742730"),
    localities: ["HITEC City", "Nanakramguda", "Banjara Hills", "Gachibowli", "Kondapur"],
  },
  {
    name: "Bengaluru",
    state: "Karnataka",
    landmark: "Vidhana Soudha",
    landmarkImg: img("1588416936097-41850ab3d86d"),
    localities: ["Whitefield", "Indiranagar", "Koramangala", "Electronic City", "Yelahanka"],
  },
  {
    name: "Mumbai",
    state: "Maharashtra",
    landmark: "Gateway of India",
    landmarkImg: img("1595658658481-d53d3f999875"),
    localities: ["Andheri West", "Powai", "Bandra", "Thane West", "Navi Mumbai"],
  },
  {
    name: "Delhi NCR",
    state: "Delhi",
    landmark: "India Gate",
    landmarkImg: img("1587474260584-136574528ed5"),
    localities: [
      "Dwarka",
      "Vasant Kunj",
      "Gurugram Sector 54",
      "Noida Sector 62",
      "Greater Kailash",
    ],
  },
  {
    name: "Chennai",
    state: "Tamil Nadu",
    landmark: "Marina Beach",
    landmarkImg: img("1724992609113-bb30249a2573"),
    localities: ["OMR", "Anna Nagar", "Adyar", "Velachery", "T Nagar"],
  },
  {
    name: "Pune",
    state: "Maharashtra",
    landmark: "Shaniwar Wada",
    landmarkImg: img("1760034588108-987757454c18"),
    localities: ["Hinjewadi", "Baner", "Kharadi", "Kothrud", "Viman Nagar"],
  },
];

export type StateInfo = { name: string; cities: string[] };

export const states: StateInfo[] = [
  { name: "Telangana", cities: ["Hyderabad"] },
  { name: "Karnataka", cities: ["Bengaluru"] },
  { name: "Maharashtra", cities: ["Mumbai", "Pune"] },
  { name: "Delhi", cities: ["Delhi NCR"] },
  { name: "Tamil Nadu", cities: ["Chennai"] },
];

export const getCityInfo = (name: string) => citiesInfo.find((c) => c.name === name);

/** Live count, never hardcoded, so it can't drift from the actual catalog. */
export function hotspotListingCount(city: string, locality: string): number {
  return properties.filter((p) => p.city === city && p.locality === locality).length;
}

/** Representative image per locality — reuses each locality's cheapest listing's hero photo. */
export function hotspotImage(city: string, locality: string): string {
  const match = properties
    .filter((p) => p.city === city && p.locality === locality)
    .sort((a, b) => a.price - b.price)[0];
  return match?.img ?? getCityInfo(city)?.landmarkImg ?? "";
}
