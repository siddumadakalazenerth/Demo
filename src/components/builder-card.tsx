import { Link } from "@tanstack/react-router";
import type { Builder } from "@/lib/builders";
import { propertiesByBuilder } from "@/lib/properties";

export function BuilderCard({ builder }: { builder: Builder }) {
  const count = propertiesByBuilder(builder.id).length;
  return (
    <Link
      to="/builders/$id"
      params={{ id: builder.id }}
      className="block rounded-2xl border border-border bg-surface p-6 transition-transform hover:-translate-y-0.5"
    >
      <span
        className={`grid size-12 place-items-center rounded-xl font-display text-lg font-semibold ${builder.logoTone}`}
      >
        {builder.logoInitial}
      </span>
      <p className="mt-4 font-display text-lg font-medium">{builder.name}</p>
      <p className="mt-1 text-sm text-muted-foreground">{builder.tagline}</p>
      <p className="mt-4 text-xs text-muted-foreground">
        {count} live {count === 1 ? "listing" : "listings"} · {builder.hqCity} · est.{" "}
        {builder.founded}
      </p>
    </Link>
  );
}
