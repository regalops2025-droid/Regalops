import { createFileRoute, Link } from "@tanstack/react-router";
import { MapPin, Clock } from "lucide-react";
import { SiteLayout, PageHero, Section } from "@/components/site/site-layout";

export const Route = createFileRoute("/career")({
  head: () => ({
    meta: [
      { title: "Careers at Regal OPs — Senior Engineering Roles" },
      {
        name: "description",
        content:
          "Open engineering roles at Regal OPs: platform, data, cloud and security positions across Chennai, Bengaluru and remote.",
      },
      { property: "og:title", content: "Careers at Regal OPs" },
      {
        property: "og:description",
        content: "Open platform, data, cloud and security engineering roles.",
      },
    ],
  }),
  component: Career,
});

const roles = [
  { title: "Senior Platform Engineer", location: "Chennai / Hybrid", type: "Full-time" },
  { title: "Cloud Architect — Azure", location: "Remote, India", type: "Full-time" },
  { title: "Data Engineer (Snowflake, dbt)", location: "Bengaluru", type: "Full-time" },
  { title: "ML Engineer — NLP", location: "Remote, EU", type: "Full-time" },
  { title: "Security Analyst", location: "Chennai", type: "Full-time" },
  { title: "Engineering Manager", location: "Chennai / Hybrid", type: "Full-time" },
];

const perks = [
  "Four-day deep work weeks during delivery crunch",
  "Certification and conference budget, no approval theatre",
  "Private health cover for family",
  "Internal mobility across all six practices",
];

function Career() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Career"
        title="Build things that must not fail"
        description="We hire for judgement and craft. If you want ownership of real production systems, we should talk."
      />
      <Section>
        <div className="grid gap-4">
          {roles.map((r) => (
            <article
              key={r.title}
              className="panel grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 p-5 sm:flex sm:justify-between sm:p-6"
            >
              <div className="min-w-0">
                <h2 className="truncate text-base font-semibold sm:text-lg">{r.title}</h2>
                <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5 text-primary" /> {r.location}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5 text-primary" /> {r.type}
                  </span>
                </div>
              </div>
              <Link
                to="/contact"
                className="shrink-0 rounded-xl border border-border px-4 py-2 text-sm font-semibold transition-colors hover:border-primary hover:text-primary"
              >
                Apply
              </Link>
            </article>
          ))}
        </div>
      </Section>
      <section className="border-t border-border bg-surface">
        <Section>
          <h2 className="text-2xl font-semibold sm:text-3xl">What you get</h2>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {perks.map((p) => (
              <li
                key={p}
                className="rounded-2xl border border-border bg-background px-5 py-4 text-sm text-muted-foreground"
              >
                {p}
              </li>
            ))}
          </ul>
        </Section>
      </section>
    </SiteLayout>
  );
}
