export type MyListing = {
  id: string;
  title: string;
  propertyType: string;
  price?: string | undefined;
  city?: string | undefined;
  locality?: string | undefined;
  photoUrl?: string | undefined;
  status: "Under review";
  submittedAt: string;
};

const KEY = "zenrth:myListings";

function read(): MyListing[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(window.localStorage.getItem(KEY) ?? "[]");
  } catch {
    return [];
  }
}

export function getListings(): MyListing[] {
  return read();
}

export function saveListing(listing: Omit<MyListing, "id" | "status" | "submittedAt">): MyListing {
  const next: MyListing = {
    ...listing,
    id: `listing-${Date.now()}`,
    status: "Under review",
    submittedAt: new Date().toISOString(),
  };
  window.localStorage.setItem(KEY, JSON.stringify([next, ...read()]));
  return next;
}

export function removeListing(id: string) {
  window.localStorage.setItem(KEY, JSON.stringify(read().filter((l) => l.id !== id)));
}
