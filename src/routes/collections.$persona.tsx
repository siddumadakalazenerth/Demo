import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { Reveal } from "@/components/reveal";
import { PropertyCard } from "@/components/property-card";
import { properties, personasFor, personaLabels, type Persona } from "@/lib/properties";

// Checked lazily (at request time, not module top-level) so it never runs before
// `personaLabels` has finished evaluating in bundlers that split routes into
// separately-loaded chunks (e.g. Nitro's Vercel preset).
function isPersona(value: string): value is Persona {
  return Object.prototype.hasOwnProperty.call(personaLabels, value);
}

export const Route = createFileRoute("/collections/$persona")({
  loader: ({ params }) => {
    if (!isPersona(params.persona)) throw notFound();
    return { persona: params.persona };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: "Collection not found — Zenrth" }] };
    return { meta: [{ title: `${personaLabels[loaderData.persona]} | Zenrth` }] };
  },
  component: CollectionPage,
  notFoundComponent: () => (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-background px-6 text-center">
      <h1 className="font-display text-3xl font-light">We couldn't find that collection</h1>
      <Link
        to="/properties"
        className="rounded-full bg-primary px-5 py-2.5 text-sm text-primary-foreground"
      >
        Browse all properties
      </Link>
    </main>
  ),
});

function CollectionPage() {
  const { persona } = Route.useLoaderData();
  const list = properties.filter((p) => personasFor(p).includes(persona));

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
          <h1 className="mt-4 max-w-2xl font-display text-4xl font-light leading-[1.1] md:text-5xl">
            {personaLabels[persona]}
          </h1>
          <p className="mt-3 text-sm text-muted-foreground">{list.length} matching listings</p>
        </Reveal>
      </section>

      <section className="mx-auto mt-8 max-w-6xl px-6 pb-20">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((p, i) => (
            <Reveal key={p.id} delay={(i % 3) * 80}>
              <PropertyCard p={p} />
            </Reveal>
          ))}
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
