import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, PageHero, Section } from "@/components/site/site-layout";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Regal OPs — Senior Engineering, Quietly Delivered" },
      {
        name: "description",
        content:
          "Regal OPs is a 220-person engineering firm building cloud, data and AI platforms for regulated enterprises since 2011.",
      },
      { property: "og:title", content: "About Regal OPs" },
      {
        property: "og:description",
        content: "220 engineers building mission-critical platforms for regulated enterprises.",
      },
    ],
  }),
  component: About,
});

const values = [
  { title: "Engineering over theatre", desc: "Working software beats a beautiful deck every single time." },
  { title: "Own the outcome", desc: "We stay on until the system is stable in production, not until the invoice clears." },
  { title: "Say the hard thing", desc: "If the plan is wrong, you hear it in week one." },
];

const timeline = [
  { year: "2011", text: "Founded as a four-person integration team in Chennai." },
  { year: "2015", text: "First large-scale core banking modernisation shipped." },
  { year: "2019", text: "Cloud practice launched; AWS and Azure partnerships signed." },
  { year: "2023", text: "AI and data platform group formed, now 60 engineers." },
  { year: "2026", text: "220 engineers across 14 countries, 99.98% average uptime." },
];

function About() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="About us"
        title="Fifteen years of building systems other people depend on"
        description="At Regal OPs, we help organizations accelerate digital transformation through innovative IT solutions, AI-driven automation, and specialized technology staffing across North America and global markets."
      />
      <Section>
        <div className="grid gap-4 sm:grid-cols-3">
          {values.map((v) => (
            <article key={v.title} className="panel p-6">
              <h3 className="text-lg font-semibold">{v.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{v.desc}</p>
            </article>
          ))}
        </div>
      </Section>
      <section className="border-t border-border bg-surface">
        <Section>
          <h2 className="text-2xl font-semibold sm:text-4xl">How we got here</h2>
          <ol className="mt-10 space-y-6 border-l border-border pl-6">
            {timeline.map((t) => (
              <li key={t.year} className="relative">
                <span className="absolute -left-[31px] top-1.5 grid h-3 w-3 place-items-center rounded-full bg-primary" />
                <p className="font-display text-sm font-semibold text-primary">{t.year}</p>
                <p className="mt-1 text-sm text-muted-foreground">{t.text}</p>
              </li>
            ))}
          </ol>
        </Section>
      </section>
    </SiteLayout>
  );
}
