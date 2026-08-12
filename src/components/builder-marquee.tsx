import { builders } from "@/lib/builders";

/** Roadmap 8.1 — animated builder brand strip signalling scale/credibility. */
export function BuilderMarquee() {
  const row = [...builders, ...builders];
  return (
    <div className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
      <div className="flex w-max animate-[marquee_28s_linear_infinite] gap-4 motion-reduce:animate-none">
        {row.map((b, i) => (
          <span
            key={`${b.id}-${i}`}
            className="flex shrink-0 items-center gap-2.5 rounded-full border border-border bg-surface px-4 py-2.5"
          >
            <span
              className={`grid size-7 place-items-center rounded-full text-xs font-semibold ${b.logoTone}`}
            >
              {b.logoInitial}
            </span>
            <span className="text-sm font-medium">{b.name}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
