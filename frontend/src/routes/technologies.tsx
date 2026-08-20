import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { SiteLayout, PageHero, Section } from "@/components/site/site-layout";

export const Route = createFileRoute("/technologies")({
  head: () => ({
    meta: [
      { title: "Technologies — The Stack Regal OPs Runs in Production" },
      {
        name: "description",
        content:
          "React, Node, Python, Kubernetes, AWS, Azure, GCP and machine learning — the technologies Regal OPs engineers run at enterprise scale.",
      },
      { property: "og:title", content: "Regal OPs Technologies" },
      {
        property: "og:description",
        content: "The production-proven stack behind our cloud, data and AI delivery.",
      },
    ],
  }),
  component: Technologies,
});

function Technologies() {
  const [techList, setTechList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/technologies")
      .then((res) => res.json())
      .then((data) => {
        setTechList(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load technologies", err);
        setLoading(false);
      });
  }, []);

  return (
    <SiteLayout>
      <PageHero
        eyebrow="Technologies"
        title="Production-proven, never experimental"
        description="We standardise on technologies our teams have operated at scale for years — so your estate never becomes someone's learning project."
      />
      <Section>
        {loading ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 animate-pulse">
            {[1, 2, 3].map((i) => (
              <div key={i} className="panel h-28 bg-surface-2 border border-border/50"></div>
            ))}
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {techList.map((item) => (
              <article key={item.id} className="panel p-6 hover:border-primary/30 transition-all duration-300 flex flex-col justify-between bg-surface-2 border border-border/50 rounded-2xl">
                <div>
                  <h2 className="text-xl font-bold text-foreground">{item.name}</h2>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
                  
                  {item.how_to_work && (
                    <div className="mt-4 pt-3 border-t border-border/40">
                      <h4 className="text-[10px] font-bold text-primary uppercase tracking-wider">How we use it</h4>
                      <p className="mt-1 text-xs text-muted-foreground leading-relaxed">{item.how_to_work}</p>
                    </div>
                  )}
                </div>

                {item.keywords && (
                  <div className="mt-5 flex flex-wrap gap-1.5 pt-3 border-t border-border/20">
                    {item.keywords.split(",").map((k: string) => (
                      <span key={k} className="text-[9px] font-semibold px-2 py-0.5 bg-primary/10 text-primary border border-primary/10 rounded-lg">
                        {k.trim()}
                      </span>
                    ))}
                  </div>
                )}
              </article>
            ))}
          </div>
        )}
      </Section>
      <section className="border-t border-border bg-surface">
        <Section>
          <h2 className="text-2xl font-semibold sm:text-3xl">Full toolchain</h2>
          <div className="mt-8 flex flex-wrap gap-2.5">
            {techList.map((tech) => (
              <span
                key={tech.id}
                className="rounded-xl border border-border bg-background px-4 py-2 text-sm text-muted-foreground transition-colors hover:border-primary hover:text-primary"
              >
                {tech.name}
              </span>
            ))}
          </div>
        </Section>
      </section>
    </SiteLayout>
  );
}
