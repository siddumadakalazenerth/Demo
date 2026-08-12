import { MapPin } from "lucide-react";

/**
 * Roadmap 2.3 — for low-inventory areas, show the area itself (landmark image +
 * marked points of interest) instead of an empty results grid.
 */
export function EmptyLandHero({
  city,
  locality,
  img,
}: {
  city: string;
  locality: string;
  img: string;
}) {
  return (
    <div className="overflow-hidden rounded-3xl bg-secondary">
      <div className="relative">
        <img
          src={img}
          alt={`${locality}, ${city}`}
          width={1200}
          height={500}
          loading="lazy"
          className="h-[220px] w-full object-cover"
        />
        <span className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-xs text-primary-foreground shadow-lg">
          <MapPin className="size-3.5" /> {locality}
        </span>
      </div>
      <div className="p-6">
        <p className="font-display text-lg font-medium">Not many listings here yet</p>
        <p className="mt-1 text-sm text-muted-foreground">
          {locality} is one of {city}'s emerging areas — here's the area itself while inventory
          catches up. Check back soon, or explore nearby hotspots below.
        </p>
      </div>
    </div>
  );
}
