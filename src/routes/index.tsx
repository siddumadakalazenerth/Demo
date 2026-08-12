import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, MapPin, ChevronDown } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { Reveal } from "@/components/reveal";
import { PropertyCard } from "@/components/property-card";
import { AreaCard } from "@/components/area-card";
import { BuilderMarquee } from "@/components/builder-marquee";
import { HowItWorks } from "@/components/how-it-works";
import { RecentSearchesRail, recordSearch } from "@/components/recent-searches-rail";
import { BudgetTierRail } from "@/components/budget-tier-rail";
import { PersonaCollectionRail } from "@/components/persona-collection-rail";
import { TestimonialVideoCard, type VideoTestimonial } from "@/components/testimonial-video-card";
import {
  properties,
  propertyTypes,
  cities,
  priceBands,
  roomOptions,
  propertyDetails,
} from "@/lib/properties";
import { citiesInfo } from "@/lib/locations";

import heroHouse from "@/assets/hero-house.jpg";
import featureLarge from "@/assets/feature-large.jpg";
import featureSmall from "@/assets/feature-small.jpg";
import faqInterior from "@/assets/faq-interior.jpg";
import mapImg from "@/assets/map.jpg";
import ctaHouse from "@/assets/cta-house.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Zenrth — Find Your Next Home in India" },
      {
        name: "description",
        content:
          "Discover residential, commercial and luxury homes across Hyderabad, Bengaluru, Mumbai, Delhi NCR, Chennai and Pune. Browse premier listings, compare prices and book a tour with Zenrth.",
      },
      { property: "og:title", content: "Zenrth — Find Your Next Home in India" },
      {
        property: "og:description",
        content:
          "Browse premier homes across India. Compare prices, locations and book a tour with Zenrth.",
      },
    ],
  }),
  component: Index,
});

const faqs = [
  {
    q: "What types of properties do you sell?",
    a: "We specialise in residential, commercial and luxury properties — houses, apartments, villas and plots — offering a wide range of options across six Indian cities. We connect you with trusted lenders and arrange private showings before you decide.",
  },
  {
    q: "How do I know if a property is a good investment?",
    a: "We share locality price history, recently sold data and builder track records so you can judge long-term value before you commit.",
  },
  {
    q: "Do I need to hire a real estate agent?",
    a: "You don't have to, but our advisors handle negotiation, paperwork and inspections at no extra cost to buyers.",
  },
  {
    q: "What's the process for buying a property?",
    a: "Shortlist, tour, get loan pre-approval, make an offer, complete due diligence and register. We guide you through every step.",
  },
  {
    q: "Can I tour a property before purchasing?",
    a: "Yes — book an in-person or live video tour any day of the week directly from any listing.",
  },
];

function Select({
  label,
  value,
  onChange,
  placeholder,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  options: string[];
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs text-muted-foreground">{label}</span>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full appearance-none rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring/30"
        >
          <option value="">{placeholder}</option>
          {options.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
      </div>
    </label>
  );
}

type Intent = "buy" | "sell" | "hot" | "prime";

const intents: { key: Intent; label: string }[] = [
  { key: "buy", label: "Buy a home" },
  { key: "hot", label: "Hot listings" },
  { key: "prime", label: "Prime locations" },
  { key: "sell", label: "Sell my property" },
];

function Hero() {
  // Computed at render time, not module top-level — see collections.$persona.tsx
  // for why eagerly deriving from an import at module scope is unsafe here.
  const hotListings = properties
    .filter((p) => propertyDetails[p.id]?.tags.includes("Hot Listing"))
    .slice(0, 3);
  const navigate = useNavigate();
  const [intent, setIntent] = useState<Intent>("buy");
  const [type, setType] = useState("");
  const [price, setPrice] = useState("");
  const [location, setLocation] = useState("");
  const [rooms, setRooms] = useState("");

  const search = (overrides?: { type?: string }) => {
    const next = { ...(overrides ?? {}) };
    const s = {
      type: next.type ?? type ?? undefined,
      price: price || undefined,
      location: location || undefined,
      rooms: rooms ? Number(rooms) : undefined,
    };
    recordSearch(s);
    navigate({ to: "/properties", search: s });
  };

  return (
    <section className="px-3 pt-3">
      <div className="relative overflow-hidden rounded-3xl">
        <img
          src={heroHouse}
          alt="Modern home with clean architectural lines"
          width={1600}
          height={900}
          className="h-[640px] w-full scale-105 animate-[scale-in_1.2s_ease-out_forwards] object-cover md:h-[680px]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/85 via-foreground/25 to-foreground/45" />
        <SiteNav overlay />

        <div className="absolute inset-x-0 bottom-0 animate-fade-in px-6 pb-6 md:px-10 md:pb-8">
          <div className="mb-4 flex flex-wrap gap-2">
            {intents.map((i) => (
              <button
                key={i.key}
                onClick={() => setIntent(i.key)}
                className={`rounded-full border px-3.5 py-1.5 text-xs backdrop-blur-md transition-colors ${
                  intent === i.key
                    ? "border-primary-foreground bg-primary-foreground text-primary"
                    : "border-primary-foreground/30 bg-primary-foreground/10 text-primary-foreground hover:bg-primary-foreground/20"
                }`}
              >
                {i.label}
              </button>
            ))}
          </div>

          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <h1 className="max-w-2xl font-display text-4xl font-light leading-[1.08] text-primary-foreground md:text-6xl">
              {intent === "buy" && (
                <>
                  Find Your Next
                  <br />
                  Home in India.
                </>
              )}
              {intent === "sell" && (
                <>
                  List Your Property
                  <br />
                  With Confidence.
                </>
              )}
              {intent === "hot" && (
                <>
                  Hot-Selling Homes,
                  <br />
                  Handpicked Weekly.
                </>
              )}
              {intent === "prime" && (
                <>
                  Explore India's
                  <br />
                  Prime Locations.
                </>
              )}
            </h1>
            <p className="max-w-xs text-sm leading-relaxed text-primary-foreground/70">
              {intent === "buy" &&
                "Residential, commercial and luxury homes across six of India's fastest-growing cities."}
              {intent === "sell" &&
                "Reach verified buyers, get a fair price estimate, and unlock perks for repeat sellers."}
              {intent === "hot" &&
                "Listings with the most enquiries this month — tagged Hot Listing across our catalog."}
              {intent === "prime" &&
                "Anchored to landmarks you already know — Charminar, Gateway of India, India Gate and more."}
            </p>
          </div>

          {intent === "buy" && (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                search();
              }}
              className="mt-6 rounded-2xl bg-surface p-5 shadow-lg"
            >
              <p className="mb-4 font-display text-base font-medium">Find the best place</p>
              <div className="grid gap-4 md:grid-cols-4">
                <Select
                  label="Looking for"
                  value={type}
                  onChange={setType}
                  placeholder="Choose type"
                  options={propertyTypes}
                />
                <Select
                  label="Price"
                  value={price}
                  onChange={setPrice}
                  placeholder="Price"
                  options={priceBands.map((b) => b.label)}
                />
                <Select
                  label="City"
                  value={location}
                  onChange={setLocation}
                  placeholder="City"
                  options={cities}
                />
                <Select
                  label="Number of rooms"
                  value={rooms}
                  onChange={setRooms}
                  placeholder="Any bedrooms"
                  options={roomOptions.map((r) => `${r}`)}
                />
              </div>
              <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-4">
                <div className="flex flex-wrap items-center gap-2 text-xs">
                  <span className="text-muted-foreground">Filter</span>
                  {["House", "Apartment", "Villa"].map((f) => (
                    <button
                      key={f}
                      type="button"
                      onClick={() => setType(type === f ? "" : f)}
                      className={`rounded-full border px-3 py-1.5 transition-colors ${
                        type === f
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-border text-foreground hover:bg-secondary"
                      }`}
                    >
                      {f}
                    </button>
                  ))}
                </div>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-transform hover:scale-105"
                >
                  Search Properties <ArrowRight className="size-4" />
                </button>
              </div>
            </form>
          )}

          {intent === "sell" && (
            <div className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-surface p-5 shadow-lg">
              <p className="max-w-sm text-sm text-muted-foreground">
                Verified and repeat sellers get free 3D scans, AI photo tools and a buyer discount
                pool.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  to="/seller-perks"
                  className="rounded-full bg-secondary px-5 py-2.5 text-sm font-medium"
                >
                  See seller perks
                </Link>
                <Link
                  to="/sell-with-us"
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground"
                >
                  Start your listing <ArrowRight className="size-4" />
                </Link>
              </div>
            </div>
          )}

          {intent === "hot" && (
            <div className="mt-6 grid gap-3 rounded-2xl bg-surface p-5 shadow-lg sm:grid-cols-3">
              {hotListings.map((p) => (
                <Link
                  key={p.id}
                  to="/properties/$id"
                  params={{ id: p.id }}
                  className="group flex items-center gap-3 rounded-xl p-2 hover:bg-secondary"
                >
                  <img
                    src={p.img}
                    alt={p.name}
                    width={80}
                    height={80}
                    className="size-12 shrink-0 rounded-lg object-cover"
                  />
                  <span className="min-w-0">
                    <span className="block truncate text-xs font-medium group-hover:underline">
                      {p.name}
                    </span>
                    <span className="block text-[11px] text-muted-foreground">{p.city}</span>
                  </span>
                </Link>
              ))}
            </div>
          )}

          {intent === "prime" && (
            <div className="mt-6 flex flex-wrap gap-2 rounded-2xl bg-surface p-5 shadow-lg">
              {citiesInfo.slice(0, 6).map((c) => (
                <Link
                  key={c.name}
                  to="/explore/$city"
                  params={{ city: c.name }}
                  className="inline-flex items-center gap-1.5 rounded-full border border-border px-3.5 py-1.5 text-xs text-foreground hover:bg-secondary"
                >
                  <MapPin className="size-3.5" /> {c.name}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function Feature() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <Reveal>
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <h2 className="max-w-md font-display text-3xl font-light leading-tight md:text-4xl">
            Your primary home might begin to feel left out.
          </h2>
          <p className="max-w-[15rem] text-sm text-muted-foreground">
            Each listing offers unique features, exceptional quality, and prime locations across
            India.
          </p>
        </div>
      </Reveal>

      <Reveal delay={80}>
        <div className="mt-10 grid gap-4 md:grid-cols-[1.35fr_1fr_1fr]">
          <img
            src={featureLarge}
            alt="Stone and wood family home at golden hour"
            width={1000}
            height={800}
            loading="lazy"
            className="h-[340px] w-full rounded-2xl object-cover transition-transform duration-500 hover:scale-[1.02]"
          />
          <div className="flex h-[340px] flex-col justify-between rounded-2xl bg-secondary p-6">
            <div>
              <h3 className="font-display text-2xl font-light leading-tight">
                Big things can happen in small spaces.
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                With thoughtful design and smart organisation, you can maximise every inch, making
                room for creativity.
              </p>
            </div>
            <Link
              to="/about"
              className="w-fit rounded-full bg-surface px-4 py-2 text-sm transition-transform hover:scale-105"
            >
              Details
            </Link>
          </div>
          <div className="flex h-[340px] flex-col gap-4">
            <img
              src={featureSmall}
              alt="Minimalist modern villa"
              width={800}
              height={800}
              loading="lazy"
              className="h-[200px] w-full rounded-2xl object-cover"
            />
            <div className="flex flex-1 flex-col justify-between rounded-2xl bg-secondary p-4">
              <p className="text-sm font-medium">Pricing Starts at ₹55L</p>
              <Link
                to="/properties"
                className="inline-flex w-fit items-center gap-2 rounded-full bg-primary px-4 py-2 text-xs text-primary-foreground transition-transform hover:scale-105"
              >
                Explore Properties <ArrowRight className="size-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </Reveal>

      <div className="mt-16 grid grid-cols-2 gap-y-10 border-t border-border pt-10 md:grid-cols-4">
        {[
          ["100%", "Satisfied clients"],
          ["500+", "Properties sold"],
          ["6", "Indian cities"],
          ["2,00+", "Positive reviews"],
        ].map(([n, l], i) => (
          <Reveal key={l} delay={i * 90}>
            <div className={i === 0 ? "" : "md:border-l md:border-border md:pl-8"}>
              <p className="font-display text-4xl font-light">{n}</p>
              <p className="mt-1 text-sm text-muted-foreground">{l}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function MapSection() {
  return (
    <section className="bg-secondary/70 py-16">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-6 md:grid-cols-2">
        <Reveal>
          <div className="relative overflow-hidden rounded-2xl">
            <img
              src={mapImg}
              alt="Map of available property locations"
              width={1000}
              height={700}
              loading="lazy"
              className="h-[260px] w-full object-cover"
            />
            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 animate-[pulse_2.5s_ease-in-out_infinite] rounded-full bg-primary px-4 py-2 text-xs text-primary-foreground">
              <MapPin className="mr-1 inline size-3.5" />
              Zenrth Verified Listing
            </span>
          </div>
        </Reveal>
        <Reveal delay={100}>
          <div>
            <h2 className="font-display text-3xl font-light leading-tight md:text-4xl">
              Discover Properties with
              <br /> the Best Value
            </h2>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
              From compact apartments to sprawling villas, browse by city and locality to find homes
              that fit your budget.
            </p>
            <Link
              to="/explore"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm text-primary-foreground transition-transform hover:scale-105"
            >
              Explore by City <ArrowRight className="size-4" />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Listings() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <Reveal>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-3xl font-light md:text-4xl">
              Explore our premier homes
            </h2>
            <p className="mt-2 max-w-md text-sm text-muted-foreground">
              Each listing offers unique features, exceptional quality, and prime locations,
              ensuring an exclusive living experience.
            </p>
          </div>
          <Link
            to="/properties"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm text-primary-foreground transition-transform hover:scale-105"
          >
            See All Properties <ArrowRight className="size-4" />
          </Link>
        </div>
      </Reveal>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {properties.slice(0, 6).map((p, i) => (
          <Reveal key={p.id} delay={(i % 3) * 90}>
            <PropertyCard p={p} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function ExploreCities() {
  return (
    <section className="mx-auto max-w-6xl px-6 pb-20">
      <Reveal>
        <div className="flex items-end justify-between">
          <h2 className="font-display text-3xl font-light md:text-4xl">Explore by city</h2>
          <Link to="/explore" className="text-sm text-muted-foreground hover:text-foreground">
            All cities
          </Link>
        </div>
      </Reveal>
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {citiesInfo.slice(0, 3).map((c, i) => (
          <Reveal key={c.name} delay={i * 90}>
            <AreaCard city={c} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function BuildersSection() {
  return (
    <section className="mx-auto max-w-6xl px-6 pb-20">
      <Reveal>
        <div className="flex items-end justify-between">
          <h2 className="font-display text-3xl font-light md:text-4xl">
            Backed by trusted builders
          </h2>
          <Link to="/builders" className="text-sm text-muted-foreground hover:text-foreground">
            All builders
          </Link>
        </div>
      </Reveal>
      <Reveal delay={80}>
        <div className="mt-8">
          <BuilderMarquee />
        </div>
      </Reveal>
    </section>
  );
}

function Faq() {
  return (
    <section className="mx-auto max-w-6xl px-6 pb-20">
      <Reveal>
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <h2 className="max-w-sm font-display text-3xl font-light leading-tight md:text-4xl">
            Frequently asked questions
          </h2>
          <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
            Our advisors guide you in making informed investment decisions based on market insights.
            We offer residential, commercial, and luxury properties tailored to different
            preferences and budgets.
          </p>
        </div>
      </Reveal>

      <Accordion type="single" collapsible defaultValue="item-0" className="mt-8 space-y-3">
        {faqs.map((f, i) => (
          <AccordionItem
            key={f.q}
            value={`item-${i}`}
            className="rounded-2xl border border-border bg-surface px-5"
          >
            <AccordionTrigger className="text-left font-display text-base font-medium hover:no-underline">
              {f.q}
            </AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-col gap-4 pb-2 md:flex-row">
                <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">{f.a}</p>
                {i === 0 && (
                  <img
                    src={faqInterior}
                    alt="Warm wooden living room interior"
                    width={700}
                    height={700}
                    loading="lazy"
                    className="h-24 w-40 shrink-0 rounded-xl object-cover"
                  />
                )}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
      <p className="mt-4 text-sm text-muted-foreground">
        Have a state-specific question about documentation or tax?{" "}
        <Link to="/faq" className="underline underline-offset-4 hover:text-foreground">
          See state-wise FAQs
        </Link>
        .
      </p>
    </section>
  );
}

function Testimonial() {
  // Computed at render time, not module top-level — see collections.$persona.tsx
  // for why eagerly deriving from an import at module scope is unsafe here.
  const videoTestimonials: VideoTestimonial[] = [
    {
      name: "Ananya Rao",
      role: "Buyer",
      quote:
        "We found a 3BHK in Whitefield within our budget in under three weeks. The whole process — tours, paperwork, negotiation — was handled with real care.",
      thumbnail: propertyDetails["p6"]?.gallery[2] ?? properties[5]!.img,
    },
    {
      name: "Vikram Chauhan",
      role: "Seller",
      quote:
        "Listing was simple and we had qualified enquiries within days. The price comparison data helped us set a realistic asking price.",
      thumbnail: propertyDetails["p20"]?.gallery[1] ?? properties[19]!.img,
    },
    {
      name: "Priya Nair",
      role: "Buyer",
      quote:
        "As a first-time buyer I expected stress. Instead I got clear numbers, honest advice about RERA status, and a home I still love.",
      thumbnail: propertyDetails["p9"]?.gallery[2] ?? properties[8]!.img,
    },
    {
      name: "Sunita Deshmukh",
      role: "Seller",
      quote:
        "Our heritage home in Greater Kailash sold close to asking price. Zenrth's builder verification and photos made a real difference.",
      thumbnail: propertyDetails["p20"]?.gallery[3] ?? properties[19]!.img,
    },
  ];

  return (
    <section className="mx-auto max-w-6xl px-6 pb-20">
      <Reveal>
        <h2 className="max-w-sm font-display text-3xl font-light leading-tight md:text-4xl">
          What our clients say about us
        </h2>
      </Reveal>
      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {videoTestimonials.map((t, i) => (
          <Reveal key={t.name} delay={i * 80}>
            <TestimonialVideoCard t={t} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Cta() {
  return (
    <section className="px-3 pb-16">
      <Reveal>
        <div className="relative overflow-hidden rounded-3xl">
          <img
            src={ctaHouse}
            alt="Luxury home at dusk"
            width={1600}
            height={700}
            loading="lazy"
            className="h-[320px] w-full object-cover"
          />
          <div className="absolute inset-0 bg-foreground/55" />
          <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
            <h2 className="max-w-xl font-display text-3xl font-light leading-tight text-primary-foreground md:text-4xl">
              Ready to Make Your Dream Property a Reality?
            </h2>
            <p className="mt-3 max-w-md text-sm text-primary-foreground/75">
              Explore a curated selection of properties across India that align with your vision.
            </p>
            <Link
              to="/contact"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-accent-foreground transition-transform hover:scale-105"
            >
              Get Started <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

function Index() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Hero />
      <Feature />
      <MapSection />
      <Listings />
      <RecentSearchesRail heading="Continue where you left off" />
      <ExploreCities />
      <BudgetTierRail tier="Budget" />
      <PersonaCollectionRail persona="FamilyWithKids" />
      <BuildersSection />
      <HowItWorks />
      <Faq />
      <Testimonial />
      <Cta />
      <SiteFooter />
    </main>
  );
}
