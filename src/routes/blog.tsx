import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, PageHero, Section } from "@/components/site/site-layout";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Blog — Engineering Notes from the Nexora Team" },
      {
        name: "description",
        content:
          "Field notes on cloud architecture, data platforms, AI delivery and production reliability from Nexora engineers.",
      },
      { property: "og:title", content: "Nexora Engineering Blog" },
      {
        property: "og:description",
        content: "Field notes on cloud, data, AI and production reliability.",
      },
    ],
  }),
  component: Blog,
});

const posts = [
  {
    tag: "Architecture",
    date: "12 Jul 2026",
    title: "Strangler-fig migrations that actually finish",
    excerpt: "Most incremental rewrites stall at 60%. The fix is a decommission deadline written into the contract.",
  },
  {
    tag: "Data",
    date: "28 Jun 2026",
    title: "Your warehouse does not need real-time",
    excerpt: "A five-minute batch answers 94% of enterprise questions at a fraction of streaming cost.",
  },
  {
    tag: "AI",
    date: "09 Jun 2026",
    title: "Agents need audit trails before autonomy",
    excerpt: "In regulated environments, observability is the feature that makes automation approvable.",
  },
  {
    tag: "Reliability",
    date: "21 May 2026",
    title: "What 99.98% actually costs to maintain",
    excerpt: "An honest breakdown of the on-call, tooling and redundancy spend behind two extra nines.",
  },
];

function Blog() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Blog"
        title="Engineering notes, no marketing filler"
        description="Written by the people on call. Practical lessons from production systems in regulated industries."
      />
      <Section>
        <div className="grid gap-4 sm:grid-cols-2">
          {posts.map((p) => (
            <article
              key={p.title}
              className="panel p-6 transition-transform duration-300 hover:-translate-y-1 sm:p-8"
            >
              <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                <span className="rounded-full bg-surface-2 px-3 py-1 font-semibold text-primary">
                  {p.tag}
                </span>
                <span>{p.date}</span>
              </div>
              <h2 className="mt-4 text-lg font-semibold sm:text-xl">{p.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.excerpt}</p>
            </article>
          ))}
        </div>
      </Section>
    </SiteLayout>
  );
}
