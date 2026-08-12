import { createFileRoute } from "@tanstack/react-router";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { Reveal } from "@/components/reveal";
import { companyInfo } from "@/lib/company";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms & Conditions | Zenrth" },
      { name: "description", content: "Terms and conditions for using the Zenrth platform." },
    ],
  }),
  component: TermsPage,
});

const sections = [
  {
    title: "1. Using Zenrth",
    body: "Zenrth is a listings discovery platform. Listing details are provided by builders and sellers; Zenrth does not itself buy, sell or hold title to any property shown on the platform.",
  },
  {
    title: "2. Accuracy of listings",
    body: "While we work with builders to keep pricing, availability and specifications current, all details should be independently verified before you make a purchase decision.",
  },
  {
    title: "3. Enquiries and site visits",
    body: "Submitting an enquiry or scheduling a site visit does not create any binding obligation between you and Zenrth or the listed builder.",
  },
  {
    title: "4. Intellectual property",
    body: "All content on this demo — including illustrative imagery — is used for demonstration purposes only.",
  },
  { title: "5. Contact", body: `Questions about these terms can be sent to ${companyInfo.email}.` },
];

function TermsPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <SiteNav />
      <section className="mx-auto max-w-3xl px-6 pb-20 pt-10">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Legal</p>
          <h1 className="mt-4 font-display text-4xl font-light leading-[1.1] md:text-5xl">
            Terms &amp; Conditions
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
