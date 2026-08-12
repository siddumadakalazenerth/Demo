import { Link } from "@tanstack/react-router";
import { hotspotImage, hotspotListingCount } from "@/lib/locations";

/** Roadmap 2.5 — known micro-markets within a city, image + listing count. */
export function HotspotCard({ city, locality }: { city: string; locality: string }) {
  const count = hotspotListingCount(city, locality);
  return (
    <Link
      to="/properties"
      search={{ location: city, locations: [locality] }}
      className="group block"
    >
      <div className="relative overflow-hidden rounded-2xl">
        <img
          src={hotspotImage(city, locality)}
          alt={locality}
          width={700}
          height={500}
          loading="lazy"
          className="h-[160px] w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <p className="mt-2 text-sm font-medium">{locality}</p>
      <p className="text-xs text-muted-foreground">
        {count} {count === 1 ? "listing" : "listings"}
      </p>
    </Link>
  );
}
