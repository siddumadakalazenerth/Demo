import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { Reveal } from "@/components/reveal";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faqsByState, faqStates } from "@/lib/faq";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQs | Zenrth" },
      {
        name: "description",
        content:
          "State-scoped frequently asked questions about buying and selling property in India.",
      },
    ],
  }),
  component: FaqPage,
});

function FaqPage() {
  const [state, setState] = useState("National");
  const items = faqsByState[state] ?? [];

  return (
    <main className="min-h-screen bg-background text-foreground">
      <SiteNav />
      <section className="mx-auto max-w-3xl px-6 pb-10 pt-6">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">FAQs</p>
          <h1 className="mt-4 font-display text-4xl font-light leading-[1.1] md:text-5xl">
            Frequently asked questions
          </h1>
          <p className="mt-4 text-sm text-muted-foreground">
            Buying concerns differ by state — pick yours for state-specific documentation and tax
            questions.
          </p>
        </Reveal>

        <Reveal delay={60}>
          <div className="mt-6 flex flex-wrap gap-2">
            {faqStates.map((s) => (
              <button
                key={s}
                onClick={() => setState(s)}
                className={`rounded-full border px-3.5 py-1.5 text-xs transition-colors ${
                  state === s
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border text-muted-foreground hover:bg-secondary"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </Reveal>

        <Reveal delay={100}>
          <Accordion type="single" collapsible className="mt-8 space-y-3 pb-20">
            {items.map((f, i) => (
              <AccordionItem
                key={f.q}
                value={`item-${i}`}
                className="rounded-2xl border border-border bg-surface px-5"
              >
                <AccordionTrigger className="text-left font-display text-base font-medium hover:no-underline">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent>
                  <p className="pb-2 text-sm leading-relaxed text-muted-foreground">{f.a}</p>
                  <span className="mb-2 inline-block rounded-full bg-secondary px-2 py-0.5 text-[10px] uppercase tracking-wide text-muted-foreground">
                    {f.category}
                  </span>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </section>
      <SiteFooter />
    </main>
  );
}
