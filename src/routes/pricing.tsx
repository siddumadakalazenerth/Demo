import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ArrowRight, Calculator } from "lucide-react";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { Reveal } from "@/components/reveal";
import { formatPrice, properties } from "@/lib/properties";
import { computeMortgage } from "@/lib/mortgage";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Pricing & EMI Calculator | Zenrth" },
      {
        name: "description",
        content:
          "Estimate your monthly home loan EMI, down payment and total interest with the Zenrth calculator, plus our advisory fee plans.",
      },
      { property: "og:title", content: "Pricing & EMI Calculator | Zenrth" },
      {
        property: "og:description",
        content: "Estimate monthly payments and total interest before you tour a home.",
      },
    ],
  }),
  component: PricingPage,
});

const plans = [
  {
    name: "Browse",
    price: "Free",
    body: "Full listing access, saved searches and price alerts.",
    perks: ["Unlimited listing views", "Weekly market digest", "Email support"],
  },
  {
    name: "Guided",
    price: "1.5%",
    body: "A dedicated advisor from shortlist to closing day.",
    perks: ["Curated shortlists", "Private tours", "Negotiation & paperwork"],
    featured: true,
  },
  {
    name: "Portfolio",
    price: "Custom",
    body: "For investors buying three or more properties a year.",
    perks: ["Yield modelling", "Off-market access", "Dedicated closing team"],
  },
];

function PricingPage() {
  const [price, setPrice] = useState(9000000);
  const [downPct, setDownPct] = useState(20);
  const [years, setYears] = useState(20);
  const [rate, setRate] = useState(8.5);

  const result = useMemo(
    () => computeMortgage({ price, downPct, years, rate }),
    [price, downPct, years, rate],
  );

  const affordable = properties.filter((p) => p.price <= price).length;

  return (
    <main className="min-h-screen bg-background text-foreground">
      <SiteNav />

      <section className="mx-auto max-w-6xl px-6 pb-12 pt-6">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Pricing</p>
          <h1 className="mt-4 max-w-2xl font-display text-4xl font-light leading-[1.1] md:text-5xl">
            Know the real number before you fall in love with a house.
          </h1>
        </Reveal>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-16">
        <Reveal>
          <div className="grid gap-6 rounded-3xl bg-secondary p-6 md:grid-cols-[1.1fr_1fr] md:p-8">
            <div>
              <p className="inline-flex items-center gap-2 font-display text-lg font-medium">
                <Calculator className="size-4" /> EMI calculator
              </p>

              <Slider
                label="Property price"
                value={formatPrice(price)}
                min={2000000}
                max={50000000}
                step={100000}
                current={price}
                onChange={setPrice}
              />
              <Slider
                label="Down payment"
                value={`${downPct}% · ${formatPrice(result.down)}`}
                min={0}
                max={60}
                step={1}
                current={downPct}
                onChange={setDownPct}
              />
              <Slider
                label="Loan term"
                value={`${years} years`}
                min={5}
                max={30}
                step={1}
                current={years}
                onChange={setYears}
              />
              <Slider
                label="Interest rate"
                value={`${rate.toFixed(1)}%`}
                min={6}
                max={14}
                step={0.1}
                current={rate}
                onChange={setRate}
              />
            </div>

            <div className="flex flex-col justify-between rounded-2xl bg-surface p-6">
              <div>
                <p className="text-sm text-muted-foreground">Estimated monthly EMI</p>
                <p className="mt-2 font-display text-5xl font-light tabular-nums">
                  {formatPrice(Math.round(result.monthly))}
                </p>

                <dl className="mt-6 space-y-3 text-sm">
                  {[
                    ["Loan amount", formatPrice(Math.round(result.principal))],
                    ["Down payment", formatPrice(Math.round(result.down))],
                    ["Total interest", formatPrice(Math.round(result.interest))],
                    ["Total repaid", formatPrice(Math.round(result.total))],
                  ].map(([k, v]) => (
                    <div
                      key={k}
                      className="flex items-center justify-between border-b border-border pb-2"
                    >
                      <dt className="text-muted-foreground">{k}</dt>
                      <dd className="tabular-nums">{v}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              <Link
                to="/properties"
                className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm text-primary-foreground transition-transform hover:scale-105"
              >
                See {affordable} homes in this range <ArrowRight className="size-4" />
              </Link>
            </div>
          </div>
        </Reveal>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-20">
        <Reveal>
          <h2 className="font-display text-3xl font-light md:text-4xl">Advisory plans</h2>
        </Reveal>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {plans.map((p, i) => (
            <Reveal key={p.name} delay={i * 90}>
              <div
                className={`flex h-full flex-col rounded-2xl p-6 ${
                  p.featured
                    ? "bg-primary text-primary-foreground"
                    : "border border-border bg-surface"
                }`}
              >
                <p className="font-display text-lg font-medium">{p.name}</p>
                <p className="mt-3 font-display text-4xl font-light">{p.price}</p>
                <p
                  className={`mt-3 text-sm ${
                    p.featured ? "text-primary-foreground/75" : "text-muted-foreground"
                  }`}
                >
                  {p.body}
                </p>
                <ul className="mt-5 space-y-2 text-sm">
                  {p.perks.map((perk) => (
                    <li key={perk} className="flex gap-2">
                      <span className={p.featured ? "text-accent" : "text-primary"}>—</span>
                      {perk}
                    </li>
                  ))}
                </ul>
                <Link
                  to="/contact"
                  className={`mt-6 inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm transition-transform hover:scale-105 ${
                    p.featured
                      ? "bg-accent text-accent-foreground"
                      : "bg-primary text-primary-foreground"
                  }`}
                >
                  Get started <ArrowRight className="size-4" />
                </Link>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}

function Slider({
  label,
  value,
  min,
  max,
  step,
  current,
  onChange,
}: {
  label: string;
  value: string;
  min: number;
  max: number;
  step: number;
  current: number;
  onChange: (n: number) => void;
}) {
  return (
    <div className="mt-6">
      <div className="flex items-baseline justify-between">
        <span className="text-sm text-muted-foreground">{label}</span>
        <span className="text-sm font-medium tabular-nums">{value}</span>
      </div>
      <input
        type="range"
        aria-label={label}
        min={min}
        max={max}
        step={step}
        value={current}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-2 h-1.5 w-full cursor-pointer appearance-none rounded-full bg-border accent-primary"
      />
    </div>
  );
}
