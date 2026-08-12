export type Enquiry = {
  id: string;
  propertyId: string;
  propertyName: string;
  city: string;
  date: string;
};

const KEY = "zenrth:enquiries";

function read(): Enquiry[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(window.localStorage.getItem(KEY) ?? "[]");
  } catch {
    return [];
  }
}

export function getEnquiries(): Enquiry[] {
  return read();
}

export function logEnquiry(propertyId: string, propertyName: string, city: string) {
  const all = read();
  if (all.some((e) => e.propertyId === propertyId)) return;
  const next: Enquiry = {
    id: `enquiry-${Date.now()}`,
    propertyId,
    propertyName,
    city,
    date: new Date().toISOString(),
  };
  window.localStorage.setItem(KEY, JSON.stringify([next, ...all]));
}
