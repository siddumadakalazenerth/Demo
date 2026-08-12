import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { z } from "zod";
import {
  Scan,
  Camera,
  LayoutGrid,
  Video,
  Share2,
  Clock,
  CheckCircle2,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { Reveal } from "@/components/reveal";
import { cities } from "@/lib/properties";
import { saveShootRequest } from "@/lib/shootRequests";

export const Route = createFileRoute("/360-shoot")({
  head: () => ({
    meta: [
      { title: "Book a 360° Shoot | Zenrth" },
      {
        name: "description",
        content:
          "Book a professional Matterport-style 360° shoot for your property — see what Zenrth provides and what we need from you to get started.",
      },
    ],
  }),
  component: ShootRequestPage,
});

const provides = [
  {
    icon: Scan,
    title: "Full 360° walkthrough",
    body: "A Matterport-style scan of every room, so buyers can walk through your home from anywhere.",
  },
  {
    icon: Camera,
    title: "Professionally edited photos",
    body: "15–20 high-resolution photos, colour-corrected and staged for your listing gallery.",
  },
  {
    icon: LayoutGrid,
    title: "Dollhouse view & floor plan",
    body: "An auto-generated 3D dollhouse view and to-scale floor plan, drawn from the same scan.",
  },
  {
    icon: Video,
    title: "60-second highlight video",
    body: "A short walkthrough edit sized for sharing on WhatsApp and social media.",
  },
  {
    icon: Share2,
    title: "One embeddable tour link",
    body: "Drop the link straight into the Sell With Us wizard, or share it directly with buyers.",
  },
  {
    icon: Clock,
    title: "48-hour delivery",
    body: "Your finished tour, photos and floor plan land in your inbox within two working days.",
  },
];

const requirements = [
  "Property cleared of clutter, with surfaces wiped down before our crew arrives.",
  "All lights switched on and curtains open, so rooms scan with good natural light.",
  "Access to every room, balcony, terrace and parking area — keys or gate code kept handy.",
  "Someone present on-site for the full scan, which usually takes 1.5–2.5 hours.",
  "Clear parking nearby for our equipment vehicle.",
  "Ownership proof, or your Zenrth listing ID if you've already started a listing.",
  "A minimum covered area of 300 sq ft to qualify for a full walkthrough scan.",
];

const stats = [
  { label: "Turnaround time", value: "48 hrs" },
  { label: "Cities covered", value: `${cities.length}` },
  { label: "Starting at", value: "₹4,999" },
];

const slots = ["Morning · 9 AM – 12 PM", "Afternoon · 12 PM – 4 PM", "Evening · 4 PM – 7 PM"];

const shootSchema = z.object({
  name: z.string().trim().min(1, "Please enter your name").max(100, "Name is too long"),
  email: z.string().trim().email("Enter a valid email address").max(255),
  phone: z
    .string()
    .trim()
    .min(7, "Enter a valid phone number")
    .max(20, "Phone number is too long")
    .regex(/^[0-9+()\-\s]*$/, "Use digits and + ( ) - only"),
  address: z.string().trim().min(5, "Enter the property address").max(200),
  city: z.string().trim().min(1, "Select a city"),
  propertySize: z.string().trim().max(40, "Keep this under 40 characters"),
  preferredDate: z.string().trim().min(1, "Pick a preferred date"),
  preferredSlot: z.string().trim().min(1, "Pick a preferred time slot"),
  notes: z.string().trim().max(500, "Notes must be under 500 characters"),
});

type Values = z.infer<typeof shootSchema>;
type Errors = Partial<Record<keyof Values, string>>;

const emptyValues: Values = {
  name: "",
  email: "",
  phone: "",
  address: "",
  city: cities[0] ?? "",
  propertySize: "",
  preferredDate: "",
  preferredSlot: slots[0] ?? "",
  notes: "",
};

function ShootRequestPage() {
  const [values, setValues] = useState<Values>(emptyValues);
  const [errors, setErrors] = useState<Errors>({});
  const [minDate, setMinDate] = useState("");
  const [reference, setReference] = useState<string | null>(null);

  useEffect(() => {
    setMinDate(new Date().toISOString().slice(0, 10));
  }, []);

  const update = (k: keyof Values, v: string) => {
    setValues((p) => ({ ...p, [k]: v }));
    setErrors((p) => ({ ...p, [k]: undefined }));
  };

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const parsed = shootSchema.safeParse(values);
    if (!parsed.success) {
      const next: Errors = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as keyof Values;
        if (!next[key]) next[key] = issue.message;
      }
      setErrors(next);
      return;
    }
    setErrors({});
    const request = saveShootRequest(parsed.data);
    setReference(request.id);
  }

  if (reference) {
    return (
      <main className="min-h-screen bg-background text-foreground">
        <SiteNav />
        <section className="mx-auto flex max-w-2xl flex-col items-center px-6 py-24 text-center">
          <Reveal>
            <span className="grid size-14 place-items-center rounded-full bg-accent text-accent-foreground">
              <CheckCircle2 className="size-6" />
            </span>
            <h1 className="mt-6 font-display text-3xl font-light md:text-4xl">
              Your 360° shoot is booked
            </h1>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Reference <span className="font-medium text-foreground">{reference}</span> — a Zenrth
              crew coordinator will call you at the number you shared within one business day to
              confirm the exact time.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={() => {
                  setReference(null);
                  setValues(emptyValues);
                }}
                className="inline-flex items-center gap-2 rounded-full bg-secondary px-5 py-2.5 text-sm font-medium transition-transform hover:scale-105"
              >
                Book another shoot
              </button>
              <Link
                to="/sell-with-us"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-transform hover:scale-105"
              >
                Start your listing <ArrowRight className="size-4" />
              </Link>
            </div>
          </Reveal>
        </section>
        <SiteFooter />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <SiteNav />

      <section className="mx-auto max-w-6xl px-6 pb-10 pt-6">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
            Immersive tours
          </p>
          <h1 className="mt-4 max-w-2xl font-display text-4xl font-light leading-[1.1] md:text-5xl">
            Book a professional 360° shoot
          </h1>
          <p className="mt-4 max-w-lg text-sm leading-relaxed text-muted-foreground">
            Our crew scans your property into a walkthrough tour buyers can explore from anywhere —
            tell us a bit about the property and we'll handle the rest.
          </p>
        </Reveal>

        <Reveal delay={80}>
          <div className="mt-8 flex flex-wrap gap-4">
            {stats.map((s) => (
              <div key={s.label} className="rounded-2xl bg-secondary px-5 py-4">
                <p className="font-display text-xl font-medium">{s.value}</p>
                <p className="text-xs text-muted-foreground">{s.label}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-16">
        <Reveal>
          <h2 className="font-display text-2xl font-light md:text-3xl">What we'll provide</h2>
        </Reveal>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          {provides.map((p, i) => (
            <Reveal key={p.title} delay={i * 70}>
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

      <section className="mx-auto max-w-6xl px-6 pb-16">
        <Reveal>
          <h2 className="font-display text-2xl font-light md:text-3xl">What we need from you</h2>
          <p className="mt-2 max-w-xl text-sm text-muted-foreground">
            A little prep before our crew arrives keeps the shoot to under three hours.
          </p>
        </Reveal>
        <Reveal delay={80}>
          <ul className="mt-6 grid gap-4 rounded-3xl bg-surface p-6 shadow-sm sm:grid-cols-2 md:p-8">
            {requirements.map((r) => (
              <li key={r} className="flex gap-3 text-sm leading-relaxed">
                <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" />
                {r}
              </li>
            ))}
          </ul>
        </Reveal>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-20">
        <Reveal>
          <h2 className="font-display text-2xl font-light md:text-3xl">Request a slot</h2>
        </Reveal>
        <Reveal delay={80}>
          <form
            onSubmit={submit}
            noValidate
            className="mt-6 rounded-3xl bg-surface p-6 shadow-sm md:p-8"
          >
            <div className="grid gap-5 md:grid-cols-2">
              <TextField
                label="Full name"
                value={values.name}
                error={errors.name}
                onChange={(v) => update("name", v)}
                placeholder="Jane Doe"
              />
              <TextField
                label="Email"
                type="email"
                value={values.email}
                error={errors.email}
                onChange={(v) => update("email", v)}
                placeholder="jane@example.com"
              />
              <TextField
                label="Phone"
                value={values.phone}
                error={errors.phone}
                onChange={(v) => update("phone", v)}
                placeholder="+91 98450 12345"
              />
              <TextField
                label="Property size (optional)"
                value={values.propertySize}
                error={errors.propertySize}
                onChange={(v) => update("propertySize", v)}
                placeholder="e.g. 1,200 sq ft"
              />
              <TextField
                label="Property address"
                value={values.address}
                error={errors.address}
                onChange={(v) => update("address", v)}
                placeholder="Flat / house no., street, locality"
              />
              <label className="block">
                <span className="mb-1.5 block text-xs text-muted-foreground">City</span>
                <select
                  value={values.city}
                  onChange={(e) => update("city", e.target.value)}
                  className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring/30"
                >
                  {cities.map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
              </label>
              <label className="block">
                <span className="mb-1.5 block text-xs text-muted-foreground">Preferred date</span>
                <input
                  type="date"
                  min={minDate || undefined}
                  value={values.preferredDate}
                  onChange={(e) => update("preferredDate", e.target.value)}
                  className={`w-full rounded-lg border bg-background px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring/30 ${
                    errors.preferredDate ? "border-destructive" : "border-border"
                  }`}
                />
                {errors.preferredDate && (
                  <span className="mt-1 block text-xs text-destructive">
                    {errors.preferredDate}
                  </span>
                )}
              </label>
              <label className="block">
                <span className="mb-1.5 block text-xs text-muted-foreground">
                  Preferred time slot
                </span>
                <select
                  value={values.preferredSlot}
                  onChange={(e) => update("preferredSlot", e.target.value)}
                  className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring/30"
                >
                  {slots.map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </select>
              </label>
            </div>

            <label className="mt-5 block">
              <span className="mb-1.5 block text-xs text-muted-foreground">Notes (optional)</span>
              <textarea
                rows={4}
                maxLength={500}
                value={values.notes}
                onChange={(e) => update("notes", e.target.value)}
                placeholder="Gate codes, best time to call, anything else we should know…"
                className="w-full resize-none rounded-lg border border-border bg-background px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring/30"
              />
            </label>

            <button
              type="submit"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-transform hover:scale-105"
            >
              <Sparkles className="size-4" /> Request my 360° shoot
            </button>
          </form>
        </Reveal>
      </section>

      <SiteFooter />
    </main>
  );
}

function TextField({
  label,
  value,
  onChange,
  error,
  placeholder,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  error?: string | undefined;
  placeholder?: string | undefined;
  type?: string | undefined;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs text-muted-foreground">{label}</span>
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full rounded-lg border bg-background px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring/30 ${
          error ? "border-destructive" : "border-border"
        }`}
      />
      {error && <span className="mt-1 block text-xs text-destructive">{error}</span>}
    </label>
  );
}
