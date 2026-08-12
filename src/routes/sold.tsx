import { createFileRoute } from "@tanstack/react-router";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { Reveal } from "@/components/reveal";
import { SoldPropertyCard } from "@/components/sold-property-card";
import { soldProperties, avgDiscountPct } from "@/lib/sold-properties";

export const Route = createFileRoute("/sold")({
  head: () => ({
    meta: [
      { title: "Recently Sold | Zenrth" },
      {
        name: "description",
        content: "Asking price vs final sold price for recent Zenrth transactions.",
      },
    ],
  }),
  component: SoldPage,
});

function SoldPage() {
  const avg = avgDiscountPct();
  return (
    <main className="min-h-screen bg-background text-foreground">
      <SiteNav />
      <section className="mx-auto max-w-6xl px-6 pb-10 pt-6">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Sold tracking</p>
          <h1 className="mt-4 max-w-2xl font-display text-4xl font-light leading-[1.1] md:text-5xl">
            Recently sold, asking vs. final price
          </h1>
          <p className="mt-4 max-w-lg text-sm text-muted-foreground">
            Buyers on Zenrth closed an average of {avg}% below asking price across recent
            transactions. Illustrative data for this demo.
          </p>
        </Reveal>
      </section>
      <section className="mx-auto max-w-6xl px-6 pb-20">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {soldProperties.map((s, i) => (
            <Reveal key={s.id} delay={(i % 3) * 70}>
              <SoldPropertyCard item={s} />
            </Reveal>
          ))}
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
