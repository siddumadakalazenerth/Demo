import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { z } from "zod";
import { X } from "lucide-react";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { Reveal } from "@/components/reveal";
import { PropertyCard } from "@/components/property-card";
import { MultiLocationSelect } from "@/components/multi-location-select";
import { RecentSearchesRail, recordSearch } from "@/components/recent-searches-rail";
import { Switch } from "@/components/ui/switch";
import {
  properties,
  propertyTypes,
  cities,
  priceBands,
  roomOptions,
  filterProperties,
  amenityCategoryLabels,
  type AmenityCategory,
} from "@/lib/properties";
import { citiesInfo } from "@/lib/locations";

const searchSchema = z.object({
  type: z.string().max(40).optional(),
  price: z.string().max(40).optional(),
  location: z.string().max(40).optional(),
  locations: z.array(z.string().max(60)).max(20).optional(),
  rooms: z.coerce.number().int().min(1).max(10).optional(),
  amenities: z.array(z.string().max(30)).max(10).optional(),
  browse: z.coerce.boolean().optional(),
});

export const Route = createFileRoute("/properties/")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: "Property List — Browse Homes | Zenrth" },
      {
        name: "description",
        content:
          "Filter Zenrth listings by type, price band, city, locality and amenities to find residential, commercial and luxury homes across India.",
      },
      { property: "og:title", content: "Property List — Browse Homes | Zenrth" },
      {
        property: "og:description",
        content:
          "Filter homes by type, price, city, locality and amenities across six Indian cities.",
      },
    ],
  }),
  component: PropertiesPage,
});

function PropertiesPage() {
  // Computed inside the component (render time), not module top-level — see
  // collections.$persona.tsx for why eager Object.keys() on an import is unsafe here.
  const amenityCategories = Object.keys(amenityCategoryLabels) as AmenityCategory[];
  const search = Route.useSearch();
  const navigate = useNavigate({ from: "/properties/" });
  const amenities = (search.amenities ?? []) as AmenityCategory[];
  const results = search.browse
    ? properties
    : filterProperties(properties, { ...search, amenities });

  useEffect(() => {
    recordSearch({
      type: search.type,
      price: search.price,
      location: search.location,
      rooms: search.rooms,
    });
  }, [search.type, search.price, search.location, search.rooms]);

  const set = (patch: Partial<typeof search>) =>
    navigate({ search: (prev: typeof search) => ({ ...prev, ...patch }) });

  const localityOptions = search.location
    ? (citiesInfo.find((c) => c.name === search.location)?.localities ?? [])
    : Array.from(new Set(properties.map((p) => p.locality))).sort();

  const toggleAmenity = (a: AmenityCategory) =>
    set({
      amenities: amenities.includes(a) ? amenities.filter((x) => x !== a) : [...amenities, a],
    });

  const activeChips = [
    search.type && { key: "type" as const, label: search.type },
    search.price && { key: "price" as const, label: search.price },
    search.location && { key: "location" as const, label: search.location },
    search.rooms && { key: "rooms" as const, label: `${search.rooms}+ bedrooms` },
    search.locations &&
      search.locations.length > 0 && {
        key: "locations" as const,
        label: `${search.locations.length} localities`,
      },
    amenities.length > 0 && { key: "amenities" as const, label: `${amenities.length} amenities` },
  ].filter(Boolean) as { key: keyof typeof search; label: string }[];

  return (
    <main className="min-h-screen bg-background text-foreground">
      <SiteNav />

      <section className="mx-auto max-w-6xl px-6 pb-10 pt-6">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                Property list
              </p>
              <h1 className="mt-4 max-w-2xl font-display text-4xl font-light leading-[1.1] md:text-5xl">
                {results.length} {results.length === 1 ? "home" : "homes"}{" "}
                {search.browse ? "to browse" : "matching your search"}
              </h1>
            </div>
            <label className="flex items-center gap-2.5 rounded-full bg-secondary px-4 py-2.5 text-sm">
              <Switch checked={!!search.browse} onCheckedChange={(v) => set({ browse: v })} />
              Just browse (no filters)
            </label>
          </div>
        </Reveal>

        {!search.browse && (
          <Reveal delay={80}>
            <div className="mt-8 rounded-2xl bg-surface p-5 shadow-sm">
              <div className="grid gap-4 md:grid-cols-4">
                <Field label="Looking for">
                  <select
                    value={search.type ?? ""}
                    onChange={(e) => set({ type: e.target.value || undefined })}
                    className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring/30"
                  >
                    <option value="">Any type</option>
                    {propertyTypes.map((t) => (
                      <option key={t}>{t}</option>
                    ))}
                  </select>
                </Field>
                <Field label="Price">
                  <select
                    value={search.price ?? ""}
                    onChange={(e) => set({ price: e.target.value || undefined })}
                    className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring/30"
                  >
                    <option value="">Any price</option>
                    {priceBands.map((b) => (
                      <option key={b.label}>{b.label}</option>
                    ))}
                  </select>
                </Field>
                <Field label="City">
                  <select
                    value={search.location ?? ""}
                    onChange={(e) =>
                      set({ location: e.target.value || undefined, locations: undefined })
                    }
                    className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring/30"
                  >
                    <option value="">Any city</option>
                    {cities.map((c) => (
                      <option key={c}>{c}</option>
                    ))}
                  </select>
                </Field>
                <Field label="Number of rooms">
                  <select
                    value={search.rooms ?? ""}
                    onChange={(e) =>
                      set({ rooms: e.target.value ? Number(e.target.value) : undefined })
                    }
                    className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring/30"
                  >
                    <option value="">Any bedrooms</option>
                    {roomOptions.map((r) => (
                      <option key={r} value={r}>
                        {r}+ bedrooms
                      </option>
                    ))}
                  </select>
                </Field>
              </div>

              <div className="mt-4 grid gap-4 md:grid-cols-2">
                <Field label="Localities (select multiple)">
                  <MultiLocationSelect
                    options={localityOptions}
                    selected={search.locations ?? []}
                    onChange={(next) => set({ locations: next.length ? next : undefined })}
                  />
                </Field>
                <Field label="Amenities">
                  <div className="flex flex-wrap gap-1.5">
                    {amenityCategories.map((a) => (
                      <button
                        key={a}
                        type="button"
                        onClick={() => toggleAmenity(a)}
                        className={`rounded-full border px-2.5 py-1 text-xs transition-colors ${
                          amenities.includes(a)
                            ? "border-primary bg-primary text-primary-foreground"
                            : "border-border text-muted-foreground hover:bg-secondary"
                        }`}
                      >
                        {amenityCategoryLabels[a]}
                      </button>
                    ))}
                  </div>
                </Field>
              </div>

              {activeChips.length > 0 && (
                <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-border pt-4">
                  {activeChips.map((c) => (
                    <button
                      key={c.key}
                      onClick={() => set({ [c.key]: undefined } as Partial<typeof search>)}
                      className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1.5 text-xs transition-colors hover:bg-border"
                    >
                      {c.label} <X className="size-3" />
                    </button>
                  ))}
                  <button
                    onClick={() => navigate({ search: {} })}
                    className="ml-auto text-xs text-muted-foreground underline-offset-4 hover:underline"
                  >
                    Clear all
                  </button>
                </div>
              )}
            </div>
          </Reveal>
        )}
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-20">
        {results.length === 0 ? (
          <div className="rounded-2xl bg-secondary p-12 text-center">
            <p className="font-display text-xl font-light">No homes match those filters yet.</p>
            <button
              onClick={() => navigate({ search: {} })}
              className="mt-4 rounded-full bg-primary px-5 py-2.5 text-sm text-primary-foreground"
            >
              Reset filters
            </button>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {results.map((p, i) => (
              <Reveal key={p.id} delay={(i % 3) * 80}>
                <PropertyCard p={p} />
              </Reveal>
            ))}
          </div>
        )}
      </section>

      {!search.browse && <RecentSearchesRail />}

      <SiteFooter />
    </main>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs text-muted-foreground">{label}</span>
      {children}
    </label>
  );
}
