import { Link } from "@tanstack/react-router";
import { country, states } from "@/lib/locations";

/** Roadmap 3.5 — country → state → city discovery hierarchy. */
export function LocationHierarchyPicker() {
  return (
    <div className="rounded-2xl bg-surface p-5">
      <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{country}</p>
      <div className="mt-4 space-y-4">
        {states.map((s) => (
          <div key={s.name}>
            <p className="text-sm font-medium">{s.name}</p>
            <div className="mt-1.5 flex flex-wrap gap-2">
              {s.cities.map((c) => (
                <Link
                  key={c}
                  to="/explore/$city"
                  params={{ city: c }}
                  className="rounded-full border border-border px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                >
                  {c}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
