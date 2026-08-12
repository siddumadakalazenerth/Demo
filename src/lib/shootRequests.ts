export type ShootRequest = {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  propertySize: string;
  preferredDate: string;
  preferredSlot: string;
  notes: string;
  status: "Requested";
  submittedAt: string;
};

const KEY = "zenrth:shootRequests";

export function saveShootRequest(
  input: Omit<ShootRequest, "id" | "status" | "submittedAt">,
): ShootRequest {
  const request: ShootRequest = {
    ...input,
    id: `SR-${Date.now().toString(36).toUpperCase()}`,
    status: "Requested",
    submittedAt: new Date().toISOString(),
  };
  window.localStorage.setItem(KEY, JSON.stringify([request, ...getShootRequests()]));
  return request;
}

export function getShootRequests(): ShootRequest[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as ShootRequest[]) : [];
  } catch {
    return [];
  }
}
