const KEY = "zenrth:favorites";

function readIds(): string[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(window.localStorage.getItem(KEY) ?? "[]");
  } catch {
    return [];
  }
}

export function getFavoriteIds(): string[] {
  return readIds();
}

export function isFavorite(id: string): boolean {
  return readIds().includes(id);
}

/** Toggles favorite state for a property id and returns the new state. */
export function toggleFavorite(id: string): boolean {
  const ids = readIds();
  const next = ids.includes(id) ? ids.filter((x) => x !== id) : [...ids, id];
  window.localStorage.setItem(KEY, JSON.stringify(next));
  return next.includes(id);
}
