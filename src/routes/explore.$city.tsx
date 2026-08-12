import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, MapPin } from "lucide-react";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { Reveal } from "@/components/reveal";
import { HotspotCard } from "@/components/hotspot-card";
import { EmptyLandHero } from "@/components/empty-land-hero";
import { AreaAlertDialog } from "@/components/area-alert-dialog";
import { getCityInfo, hotspotListingCount } from "@/lib/locations";
import { properties } from "@/lib/properties";

export const Route = createFileRoute("/explore/$city")({
  loader: ({ params }) => {
    const city = getCityInfo(decodeURIComponent(params.city));
    if (!city) throw notFound();
    return { city };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: "City not found — Zenrth" }] };
    return { meta: [{ title: `${loaderData.city.name} listings | Zenrth` }] };
  },
  component: CityExplorePage,
  notFoundComponent: () => (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-background px-6 text-center">
      <h1 className="font-display text-3xl font-light">We don't have that city yet</h1>
      <Link
        to="/explore"
        className="rounded-full bg-primary px-5 py-2.5 text-sm text-primary-foreground"
      >
        Back to explore
      </Link>
    </main>
  ),
});

function CityExplorePage() {
  const { city } = Route.useLoaderData();
  const totalListings = properties.filter((p) => p.city === city.name).length;
  const thinLocality = city.localities.find((l) => hotspotListingCount(city.name, l) < 2);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <SiteNav />
      <section className="mx-auto max-w-6xl px-6 pt-6">
        <Link
          to="/explore"
          className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="size-3.5" /> All cities
        </Link>
        <Reveal>
          <div className="mt-4 flex flex-wrap items-end justify-between gap-4">
            <div>
              <h1 className="font-display text-4xl font-light leading-[1.1] md:text-5xl">
                {city.name}
              </h1>
              <p className="mt-2 inline-flex items-center gap-1.5 text-sm text-muted-foreground">
                <MapPin className="size-4" /> Near {city.landmark} · {city.state} · {totalListings}{" "}
                listings
              </p>
            </div>
            <AreaAlertDialog city={city.name} />
          </div>
        </Reveal>
        <Reveal delay={80}>
          <img
            src={city.landmarkImg}
            alt={city.landmark}
            width={1600}
            height={500}
            loading="lazy"
            className="mt-6 h-[260px] w-full rounded-3xl object-cover"
          />
        </Reveal>
      </section>

      <section className="mx-auto mt-14 max-w-6xl px-6 pb-14">
        <Reveal>
          <h2 className="font-display text-2xl font-light">Hotspots in {city.name}</h2>
        </Reveal>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 md:grid-cols-4">
          {city.localities.map((l, i) => (
            <Reveal key={l} delay={(i % 4) * 80}>
              <HotspotCard city={city.name} locality={l} />
            </Reveal>
          ))}
        </div>
      </section>

      {thinLocality && (
        <section className="mx-auto max-w-6xl px-6 pb-14">
          <Reveal>
            <EmptyLandHero city={city.name} locality={thinLocality} img={city.landmarkImg} />
          </Reveal>
        </section>
      )}

      <section className="mx-auto max-w-6xl px-6 pb-20">
        <Reveal>
          <Link
            to="/properties"
            search={{ location: city.name }}
            className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm text-primary-foreground transition-transform hover:scale-105"
          >
            See all {city.name} listings <ArrowRight className="size-4" />
          </Link>
        </Reveal>
      </section>

      <SiteFooter />
    </main>
  );
}
