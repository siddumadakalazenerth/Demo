import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Leaf, ShieldCheck, Users, Sparkles } from "lucide-react";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { Reveal } from "@/components/reveal";
import featureLarge from "@/assets/feature-large.jpg";
import heroHouse from "@/assets/hero-house.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Zenrth — Property Advisors Across India" },
      {
        name: "description",
        content:
          "Meet the Zenrth team: over a decade of matching buyers with residential, commercial and luxury homes across India's fastest-growing cities.",
      },
      { property: "og:title", content: "About Zenrth — Property Advisors Across India" },
      {
        property: "og:description",
        content:
          "Over a decade of matching buyers with well-connected homes across India. Our story, values and team.",
      },
    ],
  }),
  component: AboutPage,
});

const values = [
  {
    icon: Leaf,
    title: "Verified listings",
    body: "Every listing is checked for RERA registration, title clarity and builder credentials before it reaches you.",
  },
  {
    icon: ShieldCheck,
    title: "Honest numbers",
    body: "Full cost breakdowns up front — taxes, fees and maintenance, never buried.",
  },
  {
    icon: Users,
    title: "One advisor",
    body: "The same person guides you from first tour to keys. No handoffs, no call centres.",
  },
  {
    icon: Sparkles,
    title: "Quiet luxury",
    body: "We curate rather than list. Fewer homes, each one worth your weekend.",
  },
];

const team = [
  {
    name: "Rohan Malhotra",
    role: "Founder & Principal Advisor",
    bio: "13 years closing luxury and residential deals across Hyderabad and Bengaluru.",
    photo:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop&crop=faces&q=80",
    ring: "ring-primary",
  },
  {
    name: "Kavya Reddy",
    role: "Head of Residential",
    bio: "Leads first-time buyer journeys, from budgeting through to keys in hand.",
    photo:
      "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&h=400&fit=crop&crop=faces&q=80",
    ring: "ring-accent",
  },
  {
    name: "Arvind Nair",
    role: "Commercial Portfolio Lead",
    bio: "Handles office, retail and mixed-use deals for growing businesses.",
    photo:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop&crop=faces&q=80",
    ring: "ring-primary",
  },
];

function AboutPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <SiteNav />

      <section className="mx-auto max-w-6xl px-6 pb-14 pt-6">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">About us</p>
          <h1 className="mt-4 max-w-3xl font-display text-4xl font-light leading-[1.1] md:text-6xl">
            We find homes that feel like the landscape around them.
          </h1>
          <p className="mt-5 max-w-xl text-sm leading-relaxed text-muted-foreground">
            Zenrth started in Hyderabad with a single question: why is finding a well-connected home
            in India still this hard? Since then we've helped hundreds of families across Hyderabad,
            Bengaluru, Mumbai, Delhi NCR, Chennai and Pune, always with the same standard of
            transparency.
          </p>
        </Reveal>

        <Reveal delay={100}>
          <img
            src={heroHouse}
            alt="Timber and glass home in a forest clearing"
            width={1600}
            height={900}
            loading="lazy"
            className="mt-10 h-[380px] w-full rounded-3xl object-cover"
          />
        </Reveal>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-16">
        <div className="grid gap-6 md:grid-cols-4">
          {values.map((v, i) => (
            <Reveal key={v.title} delay={i * 80}>
              <div className="h-full rounded-2xl bg-secondary p-6">
                <v.icon className="size-5 text-primary" />
                <h2 className="mt-4 font-display text-lg font-medium">{v.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{v.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl items-center gap-10 px-6 pb-16 md:grid-cols-2">
        <Reveal>
          <img
            src={featureLarge}
            alt="Family home at golden hour"
            width={1000}
            height={800}
            loading="lazy"
            className="h-[320px] w-full rounded-3xl object-cover"
          />
        </Reveal>
        <Reveal delay={100}>
          <div>
            <h2 className="font-display text-3xl font-light leading-tight md:text-4xl">
              How we work
            </h2>
            <ol className="mt-6 space-y-5">
              {[
                [
                  "Listen",
                  "A ninety-minute session on how you actually live, not just bedroom counts.",
                ],
                [
                  "Curate",
                  "A shortlist of five to eight homes, each with a written case for and against.",
                ],
                [
                  "Close",
                  "Tours, financing introductions, inspection and negotiation handled end to end.",
                ],
              ].map(([t, b], i) => (
                <li key={t} className="flex gap-4">
                  <span className="grid size-8 shrink-0 place-items-center rounded-full bg-primary text-xs text-primary-foreground">
                    {i + 1}
                  </span>
                  <div>
                    <p className="font-display text-base font-medium">{t}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{b}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </Reveal>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-20">
        <Reveal>
          <h2 className="font-display text-3xl font-light md:text-4xl">The people</h2>
        </Reveal>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {team.map((m, i) => (
            <Reveal key={m.name} delay={i * 90}>
              <div className="flex h-full flex-col items-center rounded-2xl bg-secondary p-8 text-center">
                <img
                  src={m.photo}
                  alt={m.name}
                  width={200}
                  height={200}
                  loading="lazy"
                  className={`size-28 rounded-full object-cover ring-4 ring-offset-4 ring-offset-secondary ${m.ring}`}
                />
                <p className="mt-5 font-display text-lg font-medium">{m.name}</p>
                <p className="text-sm text-muted-foreground">{m.role}</p>
                <p className="mt-3 text-xs leading-relaxed text-muted-foreground">{m.bio}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={120}>
          <div className="mt-12 flex flex-wrap items-center justify-between gap-4 rounded-3xl bg-primary p-8">
            <h2 className="max-w-md font-display text-2xl font-light text-primary-foreground md:text-3xl">
              Want to see what fits your budget?
            </h2>
            <Link
              to="/pricing"
              className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-accent-foreground transition-transform hover:scale-105"
            >
              Open the calculator <ArrowRight className="size-4" />
            </Link>
          </div>
        </Reveal>
      </section>

      <SiteFooter />
    </main>
  );
}
