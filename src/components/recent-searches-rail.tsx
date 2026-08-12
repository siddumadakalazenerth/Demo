import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { properties, filterProperties } from "@/lib/properties";
import { PropertyCard } from "@/components/property-card";
import { Reveal } from "@/components/reveal";

const KEY = "zenrth:lastSearch";

export type SavedSearch = {
  type?: string | undefined;
  price?: string | undefined;
  location?: string | undefined;
  rooms?: number | undefined;
};

/**
 * Roadmap 2.2/3.2 — anonymous, browser-local personalization only (no accounts/backend
 * in this demo, so nothing is persisted server-side per logged-in user).
 */
export function recordSearch(search: SavedSearch) {
  if (typeof window === "undefined") return;
  const hasValue = Object.values(search).some(Boolean);
  if (!hasValue) return;
  window.localStorage.setItem(KEY, JSON.stringify(search));
}

function readSearch(): SavedSearch | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function RecentSearchesRail({
  heading = "Based on your recent searches",
  excludeId,
}: {
  heading?: string;
  excludeId?: string;
}) {
  const [search, setSearch] = useState<SavedSearch | null>(null);

  useEffect(() => {
    setSearch(readSearch());
  }, []);

  if (!search) return null;
  const matches = filterProperties(properties, search)
    .filter((p) => p.id !== excludeId)
    .slice(0, 3);
  if (matches.length === 0) return null;

  return (
    <section className="mx-auto max-w-6xl px-6 py-14">
      <Reveal>
        <div className="flex items-end justify-between">
          <div>
            <h2 className="font-display text-2xl font-light md:text-3xl">{heading}</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              {[
                search.type,
                search.location,
                search.rooms ? `${search.rooms}+ bedrooms` : undefined,
              ]
                .filter(Boolean)
                .join(" · ") || "Recently viewed filters"}
            </p>
          </div>
          <Link to="/properties" className="text-sm text-muted-foreground hover:text-foreground">
            See more
          </Link>
        </div>
      </Reveal>
      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {matches.map((p, i) => (
          <Reveal key={p.id} delay={i * 80}>
            <PropertyCard p={p} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
