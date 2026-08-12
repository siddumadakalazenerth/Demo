import { createFileRoute } from "@tanstack/react-router";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { Reveal } from "@/components/reveal";
import { GuideCard } from "@/components/guide-card";
import { EmiCalculator } from "@/components/emi-calculator";
import { guides } from "@/lib/advice";

export const Route = createFileRoute("/advice/")({
  head: () => ({
    meta: [
      { title: "Advice & Tools | Zenrth" },
      {
        name: "description",
        content: "Buying and selling guides, plus an EMI calculator, from Zenrth.",
      },
    ],
  }),
  component: AdvicePage,
});

function AdvicePage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <SiteNav />
      <section className="mx-auto max-w-6xl px-6 pb-10 pt-6">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
            Advice &amp; tools
          </p>
          <h1 className="mt-4 max-w-2xl font-display text-4xl font-light leading-[1.1] md:text-5xl">
            Guides and calculators for buyers and sellers
          </h1>
        </Reveal>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-16">
        <Reveal>
          <EmiCalculator />
        </Reveal>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-20">
        <Reveal>
          <h2 className="font-display text-2xl font-light">Guides</h2>
        </Reveal>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {guides.map((g, i) => (
            <Reveal key={g.slug} delay={(i % 3) * 80}>
              <GuideCard guide={g} />
            </Reveal>
          ))}
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
