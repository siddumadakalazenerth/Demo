import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { Reveal } from "@/components/reveal";
import { PropertyCard } from "@/components/property-card";
import { CertificationBadges } from "@/components/certification-badges";
import { MilestoneTimeline } from "@/components/milestone-timeline";
import { ReviewCard } from "@/components/review-card";
import { getBuilder } from "@/lib/builders";
import { propertiesByBuilder } from "@/lib/properties";

export const Route = createFileRoute("/builders/$id")({
  loader: ({ params }) => {
    const builder = getBuilder(params.id);
    if (!builder) throw notFound();
    return { builder };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: "Builder not found — Zenrth" }] };
    return { meta: [{ title: `${loaderData.builder.name} | Zenrth Builders` }] };
  },
  component: BuilderProfilePage,
  notFoundComponent: () => (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-background px-6 text-center">
      <h1 className="font-display text-3xl font-light">We couldn't find that builder</h1>
      <Link
        to="/builders"
        className="rounded-full bg-primary px-5 py-2.5 text-sm text-primary-foreground"
      >
        Back to builders
      </Link>
    </main>
  ),
});

function BuilderProfilePage() {
  const { builder } = Route.useLoaderData();
  const listings = propertiesByBuilder(builder.id);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <SiteNav />
      <section className="mx-auto max-w-6xl px-6 pt-6">
        <Link
          to="/builders"
          className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="size-3.5" /> All builders
        </Link>
        <Reveal>
          <div className="mt-4 flex flex-wrap items-center gap-4">
            <span
              className={`grid size-16 place-items-center rounded-2xl font-display text-2xl font-semibold ${builder.logoTone}`}
            >
              {builder.logoInitial}
            </span>
            <div>
              <h1 className="font-display text-3xl font-light md:text-4xl">{builder.name}</h1>
              <p className="mt-1 text-sm text-muted-foreground">{builder.tagline}</p>
              <p className="mt-1 text-xs text-muted-foreground">
                {builder.hqCity} · est. {builder.founded}
              </p>
            </div>
          </div>
        </Reveal>
      </section>

      <section className="mx-auto mt-10 grid max-w-6xl gap-10 px-6 lg:grid-cols-[1.6fr_1fr]">
        <div>
          <Reveal>
            <h2 className="font-display text-2xl font-light">Live listings</h2>
            {listings.length === 0 ? (
              <p className="mt-3 text-sm text-muted-foreground">
                No live listings from this builder right now.
              </p>
            ) : (
              <div className="mt-5 grid gap-6 sm:grid-cols-2">
                {listings.map((p, i) => (
                  <Reveal key={p.id} delay={i * 80}>
                    <PropertyCard p={p} />
                  </Reveal>
                ))}
              </div>
            )}
          </Reveal>

          <Reveal delay={60}>
            <h2 className="mt-12 font-display text-2xl font-light">Buyer reviews</h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {builder.reviews.map((r) => (
                <ReviewCard key={r.author} review={r} />
              ))}
            </div>
            <p className="mt-3 text-[11px] text-muted-foreground">
              Illustrative reviews for this demo — not sourced from a live Google Reviews API.
            </p>
          </Reveal>
        </div>

        <Reveal delay={40}>
          <aside className="space-y-6">
            <div className="rounded-2xl bg-surface p-6">
              <p className="text-sm font-medium">Certifications</p>
              <div className="mt-3">
                <CertificationBadges certifications={builder.certifications} />
              </div>
            </div>
            <div className="rounded-2xl bg-surface p-6">
              <p className="text-sm font-medium">Milestones</p>
              <div className="mt-4">
                <MilestoneTimeline milestones={builder.milestones} />
              </div>
            </div>
          </aside>
        </Reveal>
      </section>

      <div className="h-16" />
      <SiteFooter />
    </main>
  );
}
