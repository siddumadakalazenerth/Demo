import { formatPrice, type SoldProperty } from "@/lib/sold-properties";

export function SoldPropertyCard({ item }: { item: SoldProperty }) {
  const discountPct = Math.round(((item.askingPrice - item.finalPrice) / item.askingPrice) * 100);
  return (
    <div className="overflow-hidden rounded-2xl bg-surface">
      <img
        src={item.img}
        alt={item.name}
        width={700}
        height={450}
        loading="lazy"
        className="h-36 w-full object-cover"
      />
      <div className="p-4">
        <p className="font-display text-base font-medium">{item.name}</p>
        <p className="text-xs text-muted-foreground">
          {item.locality}, {item.city}
        </p>
        <div className="mt-3 flex items-center justify-between text-sm">
          <span className="text-muted-foreground line-through">
            {formatPrice(item.askingPrice)}
          </span>
          <span className="font-medium">{formatPrice(item.finalPrice)}</span>
        </div>
        <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
          <span>{item.daysOnMarket} days on market</span>
          {discountPct > 0 && (
            <span className="rounded-full bg-accent px-2 py-0.5 font-medium text-accent-foreground">
              {discountPct}% below asking
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
