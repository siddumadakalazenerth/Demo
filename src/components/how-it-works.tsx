import { Search, CalendarCheck, FileCheck, KeyRound } from "lucide-react";
import { Reveal } from "@/components/reveal";

const steps = [
  {
    icon: Search,
    title: "Search & shortlist",
    body: "Filter by city, budget, amenities and bedroom count to build a shortlist in minutes.",
  },
  {
    icon: CalendarCheck,
    title: "Book a site visit",
    body: "Schedule an in-person or video walkthrough directly from any listing.",
  },
  {
    icon: FileCheck,
    title: "Verify & negotiate",
    body: "Check RERA status, builder certifications and price history before you make an offer.",
  },
  {
    icon: KeyRound,
    title: "Close & move in",
    body: "We connect you with financing and walk you through paperwork to possession.",
  },
];

/** Roadmap 13.1 — short walkthrough usable for onboarding and marketing. */
export function HowItWorks() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <Reveal>
        <h2 className="font-display text-3xl font-light md:text-4xl">How Zenrth works</h2>
      </Reveal>
      <div className="mt-10 grid gap-6 md:grid-cols-4">
        {steps.map((s, i) => (
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
    </section>
  );
}
