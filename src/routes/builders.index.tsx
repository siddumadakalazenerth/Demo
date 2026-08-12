import { createFileRoute } from "@tanstack/react-router";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { Reveal } from "@/components/reveal";
import { BuilderCard } from "@/components/builder-card";
import { BuilderMarquee } from "@/components/builder-marquee";
import { builders } from "@/lib/builders";

export const Route = createFileRoute("/builders/")({
  head: () => ({
    meta: [
      { title: "Builders & Developers | Zenrth" },
      {
        name: "description",
        content:
          "Browse verified builders and developers listing properties on Zenrth, with certifications, milestones and reviews.",
      },
    ],
  }),
  component: BuildersPage,
});

function BuildersPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <SiteNav />
      <section className="mx-auto max-w-6xl px-6 pb-10 pt-6">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Builders</p>
          <h1 className="mt-4 max-w-2xl font-display text-4xl font-light leading-[1.1] md:text-5xl">
            Every listing, backed by a verified builder
          </h1>
          <p className="mt-4 max-w-lg text-sm text-muted-foreground">
            Browse the developers behind our listings — certifications, delivery milestones and
            reviews from past buyers.
          </p>
        </Reveal>
        <Reveal delay={80}>
          <div className="mt-8">
            <BuilderMarquee />
          </div>
        </Reveal>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-20">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {builders.map((b, i) => (
            <Reveal key={b.id} delay={(i % 3) * 80}>
              <BuilderCard builder={b} />
            </Reveal>
          ))}
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
