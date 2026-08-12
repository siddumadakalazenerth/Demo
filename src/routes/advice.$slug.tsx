import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { Reveal } from "@/components/reveal";
import { getGuide } from "@/lib/advice";

export const Route = createFileRoute("/advice/$slug")({
  loader: ({ params }) => {
    const guide = getGuide(params.slug);
    if (!guide) throw notFound();
    return { guide };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: "Guide not found — Zenrth" }] };
    return { meta: [{ title: `${loaderData.guide.title} | Zenrth Advice` }] };
  },
  component: GuidePage,
  notFoundComponent: () => (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-background px-6 text-center">
      <h1 className="font-display text-3xl font-light">We couldn't find that guide</h1>
      <Link
        to="/advice"
        className="rounded-full bg-primary px-5 py-2.5 text-sm text-primary-foreground"
      >
        Back to advice
      </Link>
    </main>
  ),
});

function GuidePage() {
  const { guide } = Route.useLoaderData();
  return (
    <main className="min-h-screen bg-background text-foreground">
      <SiteNav />
      <section className="mx-auto max-w-3xl px-6 pt-6">
        <Link
          to="/advice"
          className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="size-3.5" /> All guides
        </Link>
        <Reveal>
          <span className="mt-4 inline-block rounded-full bg-secondary px-2.5 py-1 text-[11px] font-medium">
            {guide.audience}
          </span>
          <h1 className="mt-3 font-display text-4xl font-light leading-[1.1] md:text-5xl">
            {guide.title}
          </h1>
          <p className="mt-3 text-xs text-muted-foreground">{guide.readMins} min read</p>
        </Reveal>
        <Reveal delay={80}>
          <img
            src={guide.img}
            alt={guide.title}
            width={1200}
            height={700}
            loading="lazy"
            className="mt-8 h-[300px] w-full rounded-3xl object-cover"
          />
        </Reveal>
        <Reveal delay={100}>
          <div className="mt-8 space-y-5 pb-20">
            {guide.body.map((para, i) => (
              <p key={i} className="text-sm leading-relaxed text-muted-foreground">
                {para}
              </p>
            ))}
          </div>
        </Reveal>
      </section>
      <SiteFooter />
    </main>
  );
}
