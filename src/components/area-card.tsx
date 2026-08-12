import { Link } from "@tanstack/react-router";
import type { CityInfo } from "@/lib/locations";
import { properties } from "@/lib/properties";

/** Roadmap 2.4 — city discovery card anchored to a recognizable local landmark. */
export function AreaCard({ city }: { city: CityInfo }) {
  const count = properties.filter((p) => p.city === city.name).length;
  return (
    <Link to="/explore/$city" params={{ city: city.name }} className="group block">
      <div className="relative overflow-hidden rounded-2xl">
        <img
          src={city.landmarkImg}
          alt={`${city.landmark}, ${city.name}`}
          width={800}
          height={600}
          loading="lazy"
          className="h-[220px] w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-transparent to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-4 text-primary-foreground">
          <p className="font-display text-lg font-medium">{city.name}</p>
          <p className="text-xs opacity-80">
            Near {city.landmark} · {count} listings
          </p>
        </div>
      </div>
    </Link>
  );
}
