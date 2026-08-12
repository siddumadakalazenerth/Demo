import { useEffect, useState } from "react";
import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import {
  BedDouble,
  Bath,
  MapPin,
  Ruler,
  CalendarDays,
  GraduationCap,
  Stethoscope,
  TrainFront,
  Trees,
  ArrowLeft,
  Building2,
} from "lucide-react";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { Reveal } from "@/components/reveal";
import { PropertyCard, GallerySkeleton } from "@/components/property-card";
import { BrandLoader } from "@/components/brand-loader";
import { PriceHistoryChart } from "@/components/price-history-chart";
import { PriceComparisonWidget } from "@/components/price-comparison-widget";
import { AmenityMap } from "@/components/amenity-map";
import { CertificationBadges } from "@/components/certification-badges";
import { RecentSearchesRail } from "@/components/recent-searches-rail";
import {
  formatPrice,
  getProperty,
  getBuilderName,
  propertyDetails,
  recommendedFor,
  isNewListing,
  type NearbyPlace,
  type Property,
  type PropertyDetail,
} from "@/lib/properties";
import { getBuilder } from "@/lib/builders";
import { companyInfo } from "@/lib/company";

export const Route = createFileRoute("/properties/$id")({
  loader: async ({ params }) => {
    const property = getProperty(params.id);
    const detail = propertyDetails[params.id];
    if (!property || !detail) throw notFound();
    // Deliberate small delay so the branded pending state (roadmap 1.2) is visible —
    // local mock data would otherwise resolve instantly.
    await new Promise((r) => setTimeout(r, 350));
    return { property, detail };
  },
  pendingComponent: () => (
    <main className="min-h-screen bg-background text-foreground">
      <SiteNav />
      <BrandLoader label="Loading listing" />
    </main>
  ),
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Listing not found — Zenrth" }, { name: "robots", content: "noindex" }],
      };
    }
    const { property } = loaderData;
    const title = `${property.name}, ${property.city} — ${formatPrice(property.price)} | Zenrth`;
    const description = `${property.beds} bed, ${property.baths} bath ${property.type.toLowerCase()} at ${property.address}. Gallery, amenities, location intelligence and similar homes nearby.`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
      ],
    };
  },
  component: PropertyDetailPage,
  notFoundComponent: () => (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-background px-6 text-center">
      <h1 className="font-display text-3xl font-light">We couldn't find that listing</h1>
      <Link
        to="/properties"
        className="rounded-full bg-primary px-5 py-2.5 text-sm text-primary-foreground"
      >
        Back to all homes
      </Link>
    </main>
  ),
});

const nearbyIcon: Record<NearbyPlace["kind"], typeof Trees> = {
  School: GraduationCap,
  Hospital: Stethoscope,
  Metro: TrainFront,
  Park: Trees,
};

function PropertyDetailPage() {
  const { property: p, detail } = Route.useLoaderData() as {
    property: Property;
    detail: PropertyDetail;
  };
  const [active, setActive] = useState(0);
  const [galleryLoaded, setGalleryLoaded] = useState(false);
  useEffect(() => {
    setGalleryLoaded(false);
    const timer = setTimeout(() => setGalleryLoaded(true), 250);
    return () => clearTimeout(timer);
  }, [p.id]);
  const similar = recommendedFor(p.id, 3);
  const builder = getBuilder(p.builderId);
  const badges = [...detail.tags];
  if (isNewListing(detail.listedAt)) badges.unshift("New");

  return (
    <main className="min-h-screen bg-background text-foreground">
      <SiteNav />

      <section className="mx-auto max-w-6xl px-6 pt-6">
        <Link
          to="/properties"
          className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="size-3.5" /> All properties
        </Link>

        <Reveal>
          <div className="mt-4 flex flex-wrap items-end justify-between gap-4">
            <div>
              <div className="flex flex-wrap gap-2">
                <span className="rounded-full bg-secondary px-3 py-1 text-xs">{p.type}</span>
                {badges.map((t) => (
                  <span
                    key={t}
                    className={`rounded-full px-3 py-1 text-xs ${
                      t === "New"
                        ? "bg-accent text-accent-foreground"
                        : "bg-primary text-primary-foreground"
                    }`}
                  >
                    {t}
                  </span>
                ))}
              </div>
              <h1 className="mt-4 max-w-2xl font-display text-4xl font-light leading-[1.1] md:text-5xl">
                {p.name}
              </h1>
              <p className="mt-2 flex w-fit items-center gap-1.5 text-sm text-muted-foreground">
                <MapPin className="size-4 shrink-0" /> {p.address}
              </p>
              {builder && (
                <Link
                  to="/builders/$id"
                  params={{ id: builder.id }}
                  className="mt-2 flex w-fit items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground"
                >
                  <Building2 className="size-3.5 shrink-0" /> By {builder.name}
                </Link>
              )}
            </div>
            <div className="text-right">
              <p className="font-display text-3xl font-medium">{formatPrice(p.price)}</p>
              <p className="text-xs text-muted-foreground">Listed {detail.listedAt}</p>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Gallery */}
      <section className="mx-auto mt-8 max-w-6xl px-6">
        <Reveal>
          {!galleryLoaded ? (
            <GallerySkeleton />
          ) : (
            <>
              <div className="overflow-hidden rounded-3xl">
                <img
                  src={detail.gallery[active]}
                  alt={`${p.name} — view ${active + 1}`}
                  width={1600}
                  height={900}
                  className="h-[300px] w-full object-cover md:h-[460px]"
                />
              </div>
              <div className="mt-3 grid grid-cols-5 gap-3">
                {detail.gallery.map((g, i) => (
                  <button
                    key={g}
                    onClick={() => setActive(i)}
                    aria-label={`Show image ${i + 1}`}
                    className={`overflow-hidden rounded-xl transition-opacity ${
                      i === active ? "ring-2 ring-primary" : "opacity-70 hover:opacity-100"
                    }`}
                  >
                    <img
                      src={g}
                      alt={`${p.name} thumbnail ${i + 1}`}
                      width={300}
                      height={200}
                      loading="lazy"
                      className="h-16 w-full object-cover md:h-24"
                    />
                  </button>
                ))}
              </div>
            </>
          )}
        </Reveal>
      </section>

      {/* Overview + inquiry */}
      <section className="mx-auto mt-14 grid max-w-6xl gap-10 px-6 lg:grid-cols-[1.6fr_1fr]">
        <div>
          <Reveal>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              <Spec icon={BedDouble} label="Bedrooms" value={p.beds > 0 ? `${p.beds}` : "—"} />
              <Spec icon={Bath} label="Bathrooms" value={p.baths > 0 ? `${p.baths}` : "—"} />
              <Spec icon={Ruler} label="Area" value={`${detail.area.toLocaleString()} sqft`} />
              <Spec
                icon={CalendarDays}
                label="Built"
                value={detail.yearBuilt > 0 ? `${detail.yearBuilt}` : "Plot"}
              />
            </div>
          </Reveal>

          <Reveal delay={60}>
            <h2 className="mt-12 font-display text-2xl font-light">About this home</h2>
            <p className="mt-4 max-w-2xl leading-relaxed text-muted-foreground">
              {detail.description}
            </p>
            {builder && (
              <div className="mt-4">
                <CertificationBadges certifications={builder.certifications} />
              </div>
            )}
          </Reveal>

          <Reveal delay={80}>
            <h2 className="mt-12 font-display text-2xl font-light">Amenities</h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2 md:grid-cols-4">
              {detail.amenities.map((a) => (
                <figure key={a.label} className="overflow-hidden rounded-2xl bg-surface">
                  <img
                    src={a.img}
                    alt={a.label}
                    width={400}
                    height={300}
                    loading="lazy"
                    className="h-24 w-full object-cover"
                  />
                  <figcaption className="px-3 py-2.5 text-xs font-medium">{a.label}</figcaption>
                </figure>
              ))}
            </div>
          </Reveal>

          {detail.amenityMapImg && (
            <Reveal delay={90}>
              <h2 className="mt-12 font-display text-2xl font-light">Site layout</h2>
              <div className="mt-5">
                <AmenityMap img={detail.amenityMapImg} amenities={detail.amenities} />
              </div>
            </Reveal>
          )}

          <Reveal delay={80}>
            <h2 className="mt-12 font-display text-2xl font-light">Price history</h2>
            <div className="mt-4 rounded-2xl bg-surface p-4">
              <PriceHistoryChart data={detail.priceHistory} />
            </div>
          </Reveal>
        </div>

        {/* Inquiry CTA */}
        <div className="space-y-6">
          <Reveal delay={40}>
            <aside className="sticky top-6 rounded-3xl bg-primary p-7 text-primary-foreground">
              <p className="text-xs uppercase tracking-[0.2em] opacity-70">Interested?</p>
              <h2 className="mt-3 font-display text-2xl font-light leading-snug">
                Book a viewing of {p.name}
              </h2>
              <p className="mt-3 text-sm opacity-80">
                Talk to the Zenrth advisor for {p.city}. We'll walk you through pricing, the
                neighbourhood and next steps — no obligation.
              </p>
              <Link
                to="/contact"
                className="mt-6 block rounded-full bg-background px-5 py-3 text-center text-sm font-medium text-foreground transition-transform hover:-translate-y-0.5"
              >
                Request a viewing
              </Link>
              <Link
                to="/pricing"
                className="mt-3 block rounded-full border border-primary-foreground/30 px-5 py-3 text-center text-sm transition-colors hover:bg-primary-foreground/10"
              >
                Estimate monthly EMI
              </Link>
              <p className="mt-5 text-xs opacity-70">
                {companyInfo.phoneDisplay} · {companyInfo.email}
              </p>
            </aside>
          </Reveal>
          <Reveal delay={60}>
            <PriceComparisonWidget id={p.id} price={p.price} />
          </Reveal>
        </div>
      </section>

      {/* Location */}
      <section className="mx-auto mt-16 max-w-6xl px-6">
        <Reveal>
          <h2 className="font-display text-2xl font-light">Location</h2>
          <div className="mt-5 grid gap-6 lg:grid-cols-[1.6fr_1fr]">
            <div className="overflow-hidden rounded-3xl bg-secondary">
              <iframe
                title={`Map of ${p.address}`}
                src={`https://maps.google.com/maps?q=${encodeURIComponent(detail.mapQuery)}&z=14&output=embed`}
                loading="lazy"
                className="h-[340px] w-full border-0"
              />
            </div>
            <ul className="grid gap-3">
              {detail.nearby.map((n) => {
                const Icon = nearbyIcon[n.kind];
                return (
                  <li
                    key={n.name}
                    className="flex items-center gap-3 rounded-2xl bg-surface px-4 py-3.5"
                  >
                    <span className="grid size-9 place-items-center rounded-full bg-secondary">
                      <Icon className="size-4" />
                    </span>
                    <span className="flex-1">
                      <span className="block text-sm font-medium">{n.name}</span>
                      <span className="block text-xs text-muted-foreground">{n.kind}</span>
                    </span>
                    <span className="text-right text-xs text-muted-foreground">
                      {n.km.toFixed(1)} km
                      <br />
                      {n.mins} min
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        </Reveal>
      </section>

      {/* Recommendations */}
      <section className="mx-auto mt-16 max-w-6xl px-6 pb-4">
        <Reveal>
          <div className="flex items-end justify-between">
            <div>
              <h2 className="font-display text-2xl font-light">Similar homes nearby</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Matched by city, type and closest price to {p.name}.
              </p>
            </div>
            <Link to="/properties" className="text-sm text-muted-foreground hover:text-foreground">
              View all
            </Link>
          </div>
        </Reveal>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {similar.map((s, i) => (
            <Reveal key={s.id} delay={i * 80}>
              <PropertyCard p={s} />
            </Reveal>
          ))}
        </div>
      </section>

      <RecentSearchesRail heading="Based on your recent searches" excludeId={p.id} />

      <SiteFooter />
    </main>
  );
}

function Spec({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof BedDouble;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl bg-surface px-4 py-4">
      <Icon className="size-4 text-muted-foreground" />
      <p className="mt-2 text-sm font-medium">{value}</p>
      <p className="text-xs text-muted-foreground">{label}</p>
    </div>
  );
}
