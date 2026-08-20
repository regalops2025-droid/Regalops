import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { SiteLayout, PageHero, Section } from "@/components/site/site-layout";

export const Route = createFileRoute("/clients")({
  head: () => ({
    meta: [
      { title: "Clients — Banks, Health Networks & Manufacturers | Regal OPs" },
      {
        name: "description",
        content:
          "Case outcomes from Regal OPs engagements across banking, healthcare, logistics and manufacturing.",
      },
      { property: "og:title", content: "Regal OPs Clients" },
      {
        property: "og:description",
        content: "Outcomes from engagements in banking, healthcare, logistics and manufacturing.",
      },
    ],
  }),
  component: Clients,
});

function Clients() {
  const [cases, setCases] = useState<any[]>([]);
  const [industriesList, setIndustriesList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch clients
    fetch("/api/clients")
      .then((res) => res.json())
      .then((data) => {
        setCases(data);
      })
      .catch((err) => {
        console.error("Failed to load clients", err);
      });

    // Fetch industries
    fetch("/api/industries")
      .then((res) => res.json())
      .then((data) => {
        setIndustriesList(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load industries", err);
        setIndustriesList([]);
        setLoading(false);
      });
  }, []);

  return (
    <SiteLayout>
      <PageHero
        eyebrow="Clients"
        title="Work that holds up under audit"
        description="We publish outcomes, not logos-for-decoration. Here is what the last three years produced."
      />
      <Section>
        {loading ? (
          <div className="grid gap-6 lg:grid-cols-3 animate-pulse">
            {[1, 2, 3].map((i) => (
              <div key={i} className="panel h-80 bg-surface-2 border border-border/50 rounded-2xl"></div>
            ))}
          </div>
        ) : (
          <div className="grid gap-6 lg:grid-cols-3">
            {cases.map((c) => (
              <article 
                key={c.id} 
                className="panel overflow-hidden border border-border/70 hover:border-primary/30 transition-all duration-300 flex flex-col h-full rounded-2xl bg-surface"
              >
                {c.image && (
                  <img
                    src={c.image}
                    alt={c.name}
                    className="h-48 w-full object-cover border-b border-border/60"
                  />
                )}
                <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                      {c.sector}
                    </span>
                    <h2 className="mt-4 text-lg font-semibold leading-tight text-foreground">{c.name}</h2>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{c.description}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </Section>
      <section className="border-t border-border bg-surface">
        <Section>
          <h2 className="text-2xl font-semibold sm:text-3xl">Industries we serve</h2>
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {industriesList.map((i) => (
              <div
                key={i.id}
                className="rounded-2xl border border-border bg-background px-5 py-4 text-sm font-medium"
              >
                {i.name}
              </div>
            ))}
          </div>
        </Section>
      </section>
    </SiteLayout>
  );
}
