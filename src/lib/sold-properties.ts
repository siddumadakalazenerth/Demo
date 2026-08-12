import { properties } from "@/lib/properties";

export const formatPrice = (n: number) =>
  n.toLocaleString("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 });

export type SoldProperty = {
  id: string;
  name: string;
  city: string;
  locality: string;
  type: string;
  askingPrice: number;
  finalPrice: number;
  soldDate: string;
  img: string;
  daysOnMarket: number;
};

/** Roadmap 9.3 — fabricated but structured "sold" outcome data for a demo. */
export const soldProperties: SoldProperty[] = properties.slice(0, 18).map((p, i) => {
  const discountPct = 2 + (i % 6);
  const askingPrice = Math.round(p.price * (1 + discountPct / 100));
  return {
    id: `sold-${p.id}`,
    name: p.name,
    city: p.city,
    locality: p.locality,
    type: p.type,
    askingPrice,
    finalPrice: p.price,
    soldDate: new Date(Date.now() - (30 + i * 11) * 86400000).toISOString().slice(0, 10),
    img: p.img,
    daysOnMarket: 18 + (i % 9) * 6,
  };
});

export function avgDiscountPct(city?: string): number {
  const list = city ? soldProperties.filter((s) => s.city === city) : soldProperties;
  if (list.length === 0) return 0;
  const total = list.reduce((sum, s) => sum + (s.askingPrice - s.finalPrice) / s.askingPrice, 0);
  return Math.round((total / list.length) * 100);
}
