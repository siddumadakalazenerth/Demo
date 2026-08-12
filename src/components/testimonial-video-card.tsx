import { useState } from "react";
import { Play, X } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export type VideoTestimonial = {
  name: string;
  role: "Buyer" | "Seller";
  quote: string;
  thumbnail: string;
};

/** Roadmap 8.5 — video-style testimonial affordance; no real video hosting in this demo. */
export function TestimonialVideoCard({ t }: { t: VideoTestimonial }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="group relative block w-full overflow-hidden rounded-2xl text-left"
      >
        <img
          src={t.thumbnail}
          alt={`${t.name}, ${t.role}`}
          width={500}
          height={360}
          loading="lazy"
          className="h-[220px] w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-foreground/35" />
        <span className="absolute left-1/2 top-1/2 grid size-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-surface/90">
          <Play className="size-4 fill-primary text-primary" />
        </span>
        <span className="absolute left-3 top-3 rounded-full bg-primary px-2.5 py-1 text-[11px] font-medium text-primary-foreground">
          {t.role}
        </span>
        <div className="absolute inset-x-0 bottom-0 p-3 text-primary-foreground">
          <p className="text-sm font-medium">{t.name}</p>
        </div>
      </button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {t.name} — {t.role} story
            </DialogTitle>
          </DialogHeader>
          <div className="relative overflow-hidden rounded-2xl">
            <img
              src={t.thumbnail}
              alt=""
              width={500}
              height={300}
              className="h-52 w-full object-cover opacity-60"
            />
            <div className="absolute inset-0 grid place-items-center">
              <p className="max-w-xs px-4 text-center text-sm text-foreground">
                Demo placeholder — in production this would play a real testimonial video.
              </p>
            </div>
          </div>
          <p className="text-sm leading-relaxed text-muted-foreground">"{t.quote}"</p>
          <button
            onClick={() => setOpen(false)}
            className="inline-flex w-fit items-center gap-1.5 self-end text-xs text-muted-foreground hover:text-foreground"
          >
            <X className="size-3.5" /> Close
          </button>
        </DialogContent>
      </Dialog>
    </>
  );
}
