import { Link } from "@tanstack/react-router";
import type { Guide } from "@/lib/advice";

export function GuideCard({ guide }: { guide: Guide }) {
  return (
    <Link
      to="/advice/$slug"
      params={{ slug: guide.slug }}
      className="group block overflow-hidden rounded-2xl bg-surface"
    >
      <img
        src={guide.img}
        alt={guide.title}
        width={700}
        height={450}
        loading="lazy"
        className="h-40 w-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div className="p-5">
        <span className="rounded-full bg-secondary px-2.5 py-1 text-[11px] font-medium">
          {guide.audience}
        </span>
        <p className="mt-3 font-display text-lg font-medium group-hover:underline">{guide.title}</p>
        <p className="mt-1.5 text-sm text-muted-foreground">{guide.summary}</p>
        <p className="mt-3 text-xs text-muted-foreground">{guide.readMins} min read</p>
      </div>
    </Link>
  );
}
