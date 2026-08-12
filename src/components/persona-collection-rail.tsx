import { Link } from "@tanstack/react-router";
import { properties, personasFor, personaLabels, type Persona } from "@/lib/properties";
import { PropertyCard } from "@/components/property-card";
import { Reveal } from "@/components/reveal";

/** Roadmap 7.1 — curated card sets by life-stage/persona, derived from configuration logic. */
export function PersonaCollectionRail({
  persona,
  limit = 3,
}: {
  persona: Persona;
  limit?: number;
}) {
  const list = properties.filter((p) => personasFor(p).includes(persona)).slice(0, limit);
  if (list.length === 0) return null;

  return (
    <section className="mx-auto max-w-6xl px-6 py-14">
      <Reveal>
        <div className="flex items-end justify-between">
          <h2 className="font-display text-2xl font-light md:text-3xl">{personaLabels[persona]}</h2>
          <Link
            to="/collections/$persona"
            params={{ persona }}
            className="text-sm text-muted-foreground hover:text-foreground"
          >
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
