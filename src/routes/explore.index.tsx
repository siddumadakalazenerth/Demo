import { createFileRoute } from "@tanstack/react-router";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { Reveal } from "@/components/reveal";
import { AreaCard } from "@/components/area-card";
import { LocationHierarchyPicker } from "@/components/location-hierarchy-picker";
import { citiesInfo } from "@/lib/locations";

export const Route = createFileRoute("/explore/")({
  head: () => ({
    meta: [
      { title: "Explore Cities | Zenrth" },
      {
        name: "description",
        content: "Browse Zenrth listings by city, anchored to a recognizable local landmark.",
      },
    ],
  }),
  component: ExplorePage,
});

function ExplorePage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <SiteNav />
      <section className="mx-auto max-w-6xl px-6 pb-10 pt-6">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Explore</p>
          <h1 className="mt-4 max-w-2xl font-display text-4xl font-light leading-[1.1] md:text-5xl">
            Explore listings by city
          </h1>
        </Reveal>
      </section>

      <section className="mx-auto grid max-w-6xl gap-10 px-6 pb-20 lg:grid-cols-[1.7fr_1fr]">
        <div className="grid gap-6 sm:grid-cols-2">
          {citiesInfo.map((c, i) => (
            <Reveal key={c.name} delay={(i % 2) * 90}>
              <AreaCard city={c} />
            </Reveal>
          ))}
        </div>
        <Reveal delay={80}>
          <LocationHierarchyPicker />
        </Reveal>
      </section>

      <SiteFooter />
    </main>
  );
}
