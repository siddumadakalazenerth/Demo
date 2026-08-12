import { Scan, ClipboardList, Compass } from "lucide-react";
import { Reveal } from "@/components/reveal";

const services = [
  {
    icon: Scan,
    title: "Immersive 360° tours",
    body: "Showcase your property with a Matterport 360° virtual tour — buyers can walk through every room from anywhere.",
  },
  {
    icon: ClipboardList,
    title: "Easy listing",
    body: "Post your property in minutes with our guided listing flow and start receiving enquiries right away.",
  },
  {
    icon: Compass,
    title: "Explore anywhere",
    body: "Buyers can discover and tour your home anytime, from any device, through the 360° experience.",
  },
];

/** Seller-facing services strip for /sell-with-us — same card idiom as HowItWorks. */
export function SellServicesBand() {
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {services.map((s, i) => (
        <Reveal key={s.title} delay={i * 90}>
          <div className="h-full rounded-2xl bg-secondary p-6">
            <span className="grid size-10 place-items-center rounded-full bg-primary text-primary-foreground">
              <s.icon className="size-4" />
            </span>
            <p className="mt-4 font-display text-base font-medium">{s.title}</p>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
