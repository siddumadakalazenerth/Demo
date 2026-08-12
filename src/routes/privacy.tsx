import { createFileRoute } from "@tanstack/react-router";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { Reveal } from "@/components/reveal";
import { companyInfo } from "@/lib/company";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy | Zenrth" },
      { name: "description", content: "How Zenrth handles the information you share with us." },
    ],
  }),
  component: PrivacyPage,
});

const sections = [
  {
    title: "1. What we collect",
    body: "Contact details you submit through enquiry forms, saved searches stored locally in your browser, and basic usage data.",
  },
  {
    title: "2. How we use it",
    body: "To respond to enquiries, schedule site visits, and personalise the listings shown to you based on your recent searches.",
  },
  {
    title: "3. Local storage",
    body: "Recent searches, area alert subscriptions and whether you've seen the intro animation are stored only in your browser's local storage, not on a server, in this demo.",
  },
  {
    title: "4. Sharing",
    body: "We do not sell your information. Enquiry details are shared only with the relevant builder for that listing.",
  },
  { title: "5. Contact", body: `Privacy questions can be sent to ${companyInfo.email}.` },
];

function PrivacyPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <SiteNav />
      <section className="mx-auto max-w-3xl px-6 pb-20 pt-10">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Legal</p>
          <h1 className="mt-4 font-display text-4xl font-light leading-[1.1] md:text-5xl">
            Privacy Policy
          </h1>
          <p className="mt-4 text-sm text-muted-foreground">
            This is a demo showcase page; content is illustrative.
          </p>
        </Reveal>
        <div className="mt-10 space-y-8">
          {sections.map((s) => (
            <div key={s.title}>
              <h2 className="font-display text-lg font-medium">{s.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
            </div>
          ))}
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
