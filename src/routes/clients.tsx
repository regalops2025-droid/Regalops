import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, PageHero, Section } from "@/components/site/site-layout";

export const Route = createFileRoute("/clients")({
  head: () => ({
    meta: [
      { title: "Clients — Banks, Health Networks & Manufacturers | Nexora" },
      {
        name: "description",
        content:
          "Case outcomes from Nexora engagements across banking, healthcare, logistics and manufacturing.",
      },
      { property: "og:title", content: "Nexora Clients" },
      {
        property: "og:description",
        content: "Outcomes from engagements in banking, healthcare, logistics and manufacturing.",
      },
    ],
  }),
  component: Clients,
});

const industries = ["Banking", "Insurance", "Healthcare", "Logistics", "Manufacturing", "Energy", "Retail", "Public sector"];

const cases = [
  {
    sector: "Banking",
    title: "Core replatform, zero customer outage",
    result: "14-year-old monolith split into 9 services; release cycle cut from 6 weeks to 2 days.",
  },
  {
    sector: "Healthcare",
    title: "Unified patient data platform",
    result: "41 source systems consolidated; clinician report latency down from 9 hours to 4 minutes.",
  },
  {
    sector: "Manufacturing",
    title: "Predictive maintenance at 38 plants",
    result: "Unplanned line stoppages reduced 27% in the first operating year.",
  },
];

function Clients() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Clients"
        title="Work that holds up under audit"
        description="We publish outcomes, not logos-for-decoration. Here is what the last three years produced."
      />
      <Section>
        <div className="grid gap-4 lg:grid-cols-3">
          {cases.map((c) => (
            <article key={c.title} className="panel p-6 sm:p-8">
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                {c.sector}
              </span>
              <h2 className="mt-4 text-lg font-semibold">{c.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{c.result}</p>
            </article>
          ))}
        </div>
      </Section>
      <section className="border-t border-border bg-surface">
        <Section>
          <h2 className="text-2xl font-semibold sm:text-3xl">Industries we serve</h2>
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {industries.map((i) => (
              <div
                key={i}
                className="rounded-2xl border border-border bg-background px-5 py-4 text-sm font-medium"
              >
                {i}
              </div>
            ))}
          </div>
        </Section>
      </section>
    </SiteLayout>
  );
}
