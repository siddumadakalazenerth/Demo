import { Star } from "lucide-react";
import type { BuilderReview } from "@/lib/builders";

/** Roadmap 8.4 — mock "Google-style" review, not a real API call. */
export function ReviewCard({ review }: { review: BuilderReview }) {
  return (
    <div className="rounded-2xl bg-surface p-5">
      <div className="flex items-center gap-3">
        <img
          src={review.avatarImg}
          alt={review.author}
          width={80}
          height={80}
          loading="lazy"
          className="size-10 rounded-full object-cover"
        />
        <div>
          <p className="text-sm font-medium">{review.author}</p>
          <div className="flex gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`size-3.5 ${i < review.rating ? "fill-accent text-accent" : "text-border"}`}
              />
            ))}
          </div>
        </div>
      </div>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{review.quote}</p>
      <p className="mt-2 text-[11px] text-muted-foreground">{review.date}</p>
    </div>
  );
}
