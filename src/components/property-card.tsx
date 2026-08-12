import { Link } from "@tanstack/react-router";
import { BedDouble, Bath, MapPin } from "lucide-react";
import { formatPrice, propertyDetails, isNewListing, type Property } from "@/lib/properties";
import { CardImageCycler } from "@/components/card-image-cycler";

export function PropertyCard({ p }: { p: Property }) {
  const detail = propertyDetails[p.id];
  const badges = [...(detail?.tags ?? [])];
  if (detail && isNewListing(detail.listedAt)) badges.unshift("New");

  return (
    <Link
      to="/properties/$id"
      params={{ id: p.id }}
      className="group block focus:outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
    >
      <article>
        <div className="relative overflow-hidden rounded-2xl">
          <CardImageCycler
            images={detail?.gallery ?? [p.img]}
            alt={`${p.name} in ${p.locality}, ${p.city}`}
            className="h-[220px] w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <span className="absolute left-3 top-3 rounded-full bg-surface px-3 py-1 text-xs font-medium">
            {p.type}
          </span>
          <div className="absolute right-3 top-3 flex flex-wrap justify-end gap-1.5">
            {badges.map((t) => (
              <span
                key={t}
                className={`rounded-full px-2.5 py-1 text-[11px] font-medium ${
                  t === "New"
                    ? "bg-accent text-accent-foreground"
                    : "bg-primary text-primary-foreground"
                }`}
              >
                {t}
              </span>
            ))}
          </div>
        </div>
        <div className="mt-3 flex items-center gap-4 text-xs text-muted-foreground">
          {p.beds > 0 && (
            <span className="inline-flex items-center gap-1.5">
              <BedDouble className="size-4" /> {p.beds} Bedrooms
            </span>
          )}
          {p.baths > 0 && (
            <span className="inline-flex items-center gap-1.5">
              <Bath className="size-4" /> {p.baths} Bathroom
            </span>
          )}
        </div>
        <h2 className="mt-2 font-display text-lg font-medium group-hover:underline">{p.name}</h2>
        <p className="mt-1 text-sm">
          <span className="font-medium">{formatPrice(p.price)}</span>
        </p>
        <p className="mt-0.5 inline-flex items-center gap-1 text-xs text-muted-foreground">
          <MapPin className="size-3.5" /> {p.locality}, {p.city}
        </p>
        {detail && detail.amenities.length > 0 && (
          <div className="mt-2 flex -space-x-1.5">
            {detail.amenities.slice(0, 3).map((a) => (
              <img
                key={a.label}
                src={a.img}
                alt={a.label}
                title={a.label}
                width={64}
                height={64}
                loading="lazy"
                className="size-6 rounded-full border-2 border-background object-cover"
              />
            ))}
          </div>
        )}
      </article>
    </Link>
  );
}

export function PropertyCardSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="h-[220px] w-full rounded-2xl bg-secondary" />
      <div className="mt-4 h-3 w-1/2 rounded bg-secondary" />
      <div className="mt-3 h-4 w-3/4 rounded bg-secondary" />
      <div className="mt-3 h-3 w-1/3 rounded bg-secondary" />
    </div>
  );
}

export function GallerySkeleton() {
  return (
    <div className="animate-pulse">
      <div className="h-[420px] w-full rounded-2xl bg-secondary" />
      <div className="mt-3 grid grid-cols-5 gap-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="h-16 rounded-lg bg-secondary" />
        ))}
      </div>
    </div>
  );
}
