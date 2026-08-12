import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { ArrowRight, Check, Mail, MapPin, Phone } from "lucide-react";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { Reveal } from "@/components/reveal";
import { propertyTypes } from "@/lib/properties";
import { companyInfo } from "@/lib/company";
import ctaHouse from "@/assets/cta-house.jpg";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Zenrth — Book a Tour or Ask a Question" },
      {
        name: "description",
        content:
          "Send the Zenrth team a message about buying, selling or touring a property. We reply within one business day.",
      },
      { property: "og:title", content: "Contact Zenrth — Book a Tour" },
      {
        property: "og:description",
        content: "Tell us what you're looking for and we'll reply within one business day.",
      },
    ],
  }),
  component: ContactPage,
});

const contactSchema = z.object({
  name: z.string().trim().min(1, "Please enter your name").max(100, "Name is too long"),
  email: z.string().trim().email("Enter a valid email address").max(255),
  phone: z
    .string()
    .trim()
    .max(30, "Phone number is too long")
    .regex(/^[0-9+()\-\s]*$/, "Use digits and + ( ) - only")
    .optional()
    .or(z.literal("")),
  interest: z.string().trim().max(40),
  message: z
    .string()
    .trim()
    .min(10, "Tell us a little more (10 characters minimum)")
    .max(1000, "Message must be under 1000 characters"),
});

type Values = z.infer<typeof contactSchema>;
type Errors = Partial<Record<keyof Values, string>>;

const empty: Values = { name: "", email: "", phone: "", interest: "House", message: "" };

function ContactPage() {
  const [values, setValues] = useState<Values>(empty);
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);

  const update = (k: keyof Values, v: string) => {
    setValues((p) => ({ ...p, [k]: v }));
    setErrors((p) => ({ ...p, [k]: undefined }));
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = contactSchema.safeParse(values);
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
    setSent(true);
    setValues(empty);
  };

  return (
    <main className="min-h-screen bg-background text-foreground">
      <SiteNav />

      <section className="mx-auto max-w-6xl px-6 pb-12 pt-6">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Contact us</p>
          <h1 className="mt-4 max-w-2xl font-display text-4xl font-light leading-[1.1] md:text-5xl">
            Tell us what you're looking for.
          </h1>
          <p className="mt-4 max-w-lg text-sm leading-relaxed text-muted-foreground">
            Share a few details and an advisor replies within one business day — usually with three
            homes worth your weekend.
          </p>
        </Reveal>
      </section>

      <section className="mx-auto grid max-w-6xl gap-8 px-6 pb-20 md:grid-cols-[1.2fr_1fr]">
        <Reveal>
          <form
            onSubmit={submit}
            noValidate
            className="rounded-3xl bg-surface p-6 shadow-sm md:p-8"
          >
            {sent && (
              <div className="mb-6 flex animate-fade-in items-center gap-3 rounded-2xl bg-secondary p-4 text-sm">
                <span className="grid size-8 place-items-center rounded-full bg-accent text-accent-foreground">
                  <Check className="size-4" />
                </span>
                Thanks — your message is with our team. We'll be in touch shortly.
              </div>
            )}

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
                label="Phone (optional)"
                value={values.phone ?? ""}
                error={errors.phone}
                onChange={(v) => update("phone", v)}
                placeholder="+91 98450 12345"
              />
              <label className="block">
                <span className="mb-1.5 block text-xs text-muted-foreground">
                  I'm interested in
                </span>
                <select
                  value={values.interest}
                  onChange={(e) => update("interest", e.target.value)}
                  className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring/30"
                >
                  {[...propertyTypes, "Selling my home"].map((o) => (
                    <option key={o}>{o}</option>
                  ))}
                </select>
              </label>
            </div>

            <label className="mt-5 block">
              <span className="mb-1.5 block text-xs text-muted-foreground">Message</span>
              <textarea
                rows={5}
                maxLength={1000}
                value={values.message}
                onChange={(e) => update("message", e.target.value)}
                placeholder="Budget, preferred cities, timeline…"
                className={`w-full resize-none rounded-lg border bg-background px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring/30 ${
                  errors.message ? "border-destructive" : "border-border"
                }`}
              />
              <span className="mt-1 flex justify-between text-xs">
                <span className="text-destructive">{errors.message ?? ""}</span>
                <span className="text-muted-foreground">{values.message.length}/1000</span>
              </span>
            </label>

            <button
              type="submit"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-transform hover:scale-105"
            >
              Send message <ArrowRight className="size-4" />
            </button>
          </form>
        </Reveal>

        <Reveal delay={100}>
          <div className="flex h-full flex-col gap-6">
            <div className="rounded-3xl bg-secondary p-6">
              <h2 className="font-display text-lg font-medium">Reach us directly</h2>
              <ul className="mt-4 space-y-4 text-sm">
                <li className="flex gap-3">
                  <MapPin className="mt-0.5 size-4 text-primary" />
                  {companyInfo.address}
                </li>
                <li className="flex gap-3">
                  <Phone className="mt-0.5 size-4 text-primary" />
                  {companyInfo.phoneDisplay}
                </li>
                <li className="flex gap-3">
                  <Mail className="mt-0.5 size-4 text-primary" />
                  {companyInfo.email}
                </li>
              </ul>
              <p className="mt-5 text-xs text-muted-foreground">
                Office hours: Mon–Sat, 9:00–18:00
              </p>
            </div>
            <img
              src={ctaHouse}
              alt="Zenrth listed home at dusk"
              width={1600}
              height={700}
              loading="lazy"
              className="h-56 w-full rounded-3xl object-cover"
            />
          </div>
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
