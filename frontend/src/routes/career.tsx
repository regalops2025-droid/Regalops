import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { MapPin, Clock, Briefcase } from "lucide-react";
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

const perks = [
  "Four-day deep work weeks during delivery crunch",
  "Certification and conference budget, no approval theatre",
  "Private health cover for family",
  "Internal mobility across all six practices",
];

function Career() {
  const [roles, setRoles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5001/api/jobs")
      .then((res) => res.json())
      .then((data) => {
        setRoles(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load career data", err);
        setLoading(false);
      });
  }, []);

  return (
    <SiteLayout>
      <PageHero
        eyebrow="Career"
        title="Build things that must not fail"
        description="We hire for judgement and craft. If you want ownership of real production systems, we should talk."
      />
      <Section>
        {loading ? (
          <div className="space-y-4 animate-pulse">
            {[1, 2, 3].map((i) => (
              <div key={i} className="panel h-24 bg-surface-2 border border-border/50 rounded-2xl"></div>
            ))}
          </div>
        ) : roles.length === 0 ? (
          <div className="panel p-12 text-center border border-dashed border-border/80 rounded-2xl flex flex-col items-center justify-center">
            <div className="rounded-full bg-secondary p-3 text-muted-foreground">
              <Briefcase className="h-8 w-8 text-primary" />
            </div>
            <h3 className="mt-4 text-base font-semibold text-foreground">No open roles right now</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Check back later or get in touch for speculative applications.
            </p>
          </div>
        ) : (
          <div className="grid gap-4">
            {roles.map((r) => (
              <article
                key={r.id}
                className="panel grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 p-5 sm:flex sm:justify-between sm:p-6 hover:border-primary/30 transition-all duration-300 bg-surface"
              >
                <div className="min-w-0">
                  <h2 className="truncate text-base font-semibold sm:text-lg text-foreground">{r.title}</h2>
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
                  search={{ jobId: r.id, jobTitle: r.title }}
                  className="shrink-0 rounded-xl border border-border px-4 py-2 text-sm font-semibold transition-colors hover:border-primary hover:text-primary bg-background"
                >
                  Apply
                </Link>
              </article>
            ))}
          </div>
        )}
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
