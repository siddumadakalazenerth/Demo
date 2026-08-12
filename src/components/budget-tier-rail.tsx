import { Link } from "@tanstack/react-router";
import { properties, budgetTierFor, type BudgetTier } from "@/lib/properties";
import { PropertyCard } from "@/components/property-card";
import { Reveal } from "@/components/reveal";

/** Roadmap 7.2 — "Budget homes/apartments/villas" rails scoped to a tier. */
export function BudgetTierRail({ tier, city }: { tier: BudgetTier; city?: string }) {
  const list = properties
    .filter((p) => budgetTierFor(p.price) === tier && (!city || p.city === city))
    .slice(0, 3);
  if (list.length === 0) return null;

  return (
    <section className="mx-auto max-w-6xl px-6 py-14">
      <Reveal>
        <div className="flex items-end justify-between">
          <h2 className="font-display text-2xl font-light md:text-3xl">
            {tier} homes{city ? ` in ${city}` : ""}
          </h2>
          <Link to="/properties" className="text-sm text-muted-foreground hover:text-foreground">
            View all
          </Link>
        </div>
      </Reveal>
      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((p, i) => (
          <Reveal key={p.id} delay={i * 80}>
            <PropertyCard p={p} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
