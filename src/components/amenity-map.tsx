import { amenityCategoryLabels, type Amenity } from "@/lib/properties";

const positions: Record<string, { top: string; left: string }> = {
  Pool: { top: "62%", left: "22%" },
  Gym: { top: "30%", left: "70%" },
  ClubHouse: { top: "48%", left: "50%" },
  Park: { top: "20%", left: "18%" },
  WalkingTrail: { top: "78%", left: "60%" },
  KidsZone: { top: "35%", left: "30%" },
  CoveredParking: { top: "82%", left: "20%" },
  Security: { top: "12%", left: "50%" },
};

/** Roadmap 5.2 — spatial top-down amenity highlighting instead of a plain text list. */
export function AmenityMap({ img, amenities }: { img: string; amenities: Amenity[] }) {
  return (
    <div className="relative overflow-hidden rounded-3xl">
      <img
        src={img}
        alt="Aerial view of the community layout"
        width={1200}
        height={700}
        loading="lazy"
        className="h-[320px] w-full object-cover"
      />
      <div className="absolute inset-0 bg-foreground/15" />
      {amenities.map((a) => {
        const pos = positions[a.category] ?? { top: "50%", left: "50%" };
        return (
          <span
            key={a.category}
            style={{ top: pos.top, left: pos.left }}
            className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full bg-surface px-3 py-1.5 text-xs font-medium shadow-md"
          >
            {amenityCategoryLabels[a.category]}
          </span>
        );
      })}
    </div>
  );
}
