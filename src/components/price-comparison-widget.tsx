import { formatPrice } from "@/lib/properties";

/** Roadmap 9.2 — synthesized "other platforms" estimate, clearly labelled as illustrative. */
export function PriceComparisonWidget({ id, price }: { id: string; price: number }) {
  // Deterministic pseudo-random offset from the id so the same listing always shows the same band.
  const seed = Array.from(id).reduce((acc, c) => acc + c.charCodeAt(0), 0);
  const factor = 0.97 + (seed % 12) / 100;
  const otherPlatformsEstimate = Math.round(price * factor);
  const diff = otherPlatformsEstimate - price;
  const cheaper = diff > 0;

  return (
    <div className="rounded-2xl bg-surface p-5">
      <p className="text-sm font-medium">How this price compares</p>
      <div className="mt-4 flex items-center justify-between text-sm">
        <span className="text-muted-foreground">On Zenrth</span>
        <span className="font-medium">{formatPrice(price)}</span>
      </div>
      <div className="mt-2 flex items-center justify-between text-sm">
        <span className="text-muted-foreground">Typical for similar listings elsewhere</span>
        <span className="font-medium">{formatPrice(otherPlatformsEstimate)}</span>
      </div>
      {cheaper && (
        <p className="mt-3 rounded-full bg-accent px-3 py-1.5 text-center text-xs font-medium text-accent-foreground">
          ~{formatPrice(Math.abs(diff))} below the typical estimate
        </p>
      )}
      <p className="mt-3 text-[11px] text-muted-foreground">
        Estimated for illustration only — not sourced from live third-party listings.
      </p>
    </div>
  );
}
