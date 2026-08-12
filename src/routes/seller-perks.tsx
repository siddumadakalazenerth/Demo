import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Camera, Percent, ScanLine, ShieldCheck } from "lucide-react";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { Reveal } from "@/components/reveal";

export const Route = createFileRoute("/seller-perks")({
  head: () => ({
    meta: [
      { title: "Seller Perks | Zenrth" },
      { name: "description", content: "Perks for repeat and verified sellers on Zenrth." },
    ],
  }),
  component: SellerPerksPage,
});

const perks = [
  {
    icon: ScanLine,
    title: "Free 3D scan",
    body: "A complimentary Matterport-style 3D walkthrough for your listing, at no cost.",
  },
  {
    icon: Camera,
    title: "AI photo tools",
    body: "Automatic photo enhancement and virtual staging for every listing photo you upload.",
  },
  {
    icon: Percent,
    title: "5–10% buyer discount pool",
    body: "Verified repeat sellers can offer buyers a small discount, funded by reduced Zenrth fees.",
  },
  {
    icon: ShieldCheck,
    title: "Verified Seller badge",
    body: "A visible trust badge on your listings once you've completed two or more transactions with us.",
  },
];

function SellerPerksPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <SiteNav />
      <section className="mx-auto max-w-6xl px-6 pb-10 pt-6">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
            Loyalty &amp; incentives
          </p>
          <h1 className="mt-4 max-w-2xl font-display text-4xl font-light leading-[1.1] md:text-5xl">
            Perks for repeat and verified sellers
          </h1>
          <p className="mt-4 max-w-lg text-sm text-muted-foreground">
            This is an informational overview for this demo — Zenrth doesn't yet have a seller
            account system, so perks aren't automatically applied to a live listing.
          </p>
        </Reveal>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-16">
        <div className="grid gap-6 md:grid-cols-4">
          {perks.map((p, i) => (
            <Reveal key={p.title} delay={i * 90}>
              <div className="h-full rounded-2xl bg-secondary p-6">
                <span className="grid size-10 place-items-center rounded-full bg-primary text-primary-foreground">
                  <p.icon className="size-4" />
                </span>
                <p className="mt-4 font-display text-base font-medium">{p.title}</p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-20">
        <Reveal>
          <div className="flex flex-wrap items-center justify-between gap-4 rounded-3xl bg-primary p-8">
            <h2 className="max-w-md font-display text-2xl font-light text-primary-foreground md:text-3xl">
              Selling again? Tell us about it.
            </h2>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-accent-foreground transition-transform hover:scale-105"
            >
              Contact our team <ArrowRight className="size-4" />
            </Link>
          </div>
        </Reveal>
      </section>

      <SiteFooter />
    </main>
  );
}
