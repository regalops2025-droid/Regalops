import { createFileRoute, Link, useLocation } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
import { SiteLayout, PageHero, Section } from "@/components/site/site-layout";

export const Route = createFileRoute("/solutions")({
  head: () => ({
    meta: [
      { title: "Solutions — Cloud, Data, AI & Managed Engineering | Regal OPs" },
      {
        name: "description",
        content:
          "Six delivery practices: enterprise software, cloud migration, data analytics, AI automation, cyber security and managed support.",
      },
      { property: "og:title", content: "Regal OPs Solutions" },
      {
        property: "og:description",
        content: "Enterprise software, cloud, data, AI, security and managed support practices.",
      },
    ],
  }),
  component: Solutions,
});

function Solutions() {
  const [solutions, setSolutions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const hash = location.hash;

  useEffect(() => {
    fetch("http://localhost:5001/api/solutions")
      .then((res) => res.json())
      .then((data) => {
        setSolutions(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch solutions", err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (!loading && solutions.length > 0 && hash) {
      const targetId = hash.startsWith("#") ? hash.substring(1) : hash;
      const timer = setTimeout(() => {
        const element = document.getElementById(targetId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "center" });
          element.classList.add("ring-2", "ring-primary", "scale-[1.01]", "shadow-lg");
          const clearTimer = setTimeout(() => {
            element.classList.remove("ring-2", "ring-primary", "scale-[1.01]", "shadow-lg");
          }, 2000);
          return () => clearTimeout(clearTimer);
        }
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [hash, loading, solutions]);

  return (
    <SiteLayout>
      <PageHero
        eyebrow="Solutions"
        title="Practices tailored for enterprise scale"
        description="Every engagement ships with architecture documentation, automated tests, observability and an operational runbook."
      />
      <Section>
        <div className="grid gap-6 sm:grid-cols-2">
          {loading ? (
            [1, 2, 3, 4].map((i) => (
              <div key={i} className="panel animate-pulse h-48 rounded-xl bg-surface-2 border border-border/50"></div>
            ))
          ) : solutions.length === 0 ? (
            <p className="text-sm text-muted-foreground col-span-full text-center py-8">No solutions available.</p>
          ) : (
            solutions.map((item, i) => (
              <Link
                key={item.id}
                to="/solutions/$id"
                params={{ id: String(item.id) }}
                className="panel group overflow-hidden transition-all duration-300 hover:border-primary/30 hover:-translate-y-1.5 hover:shadow-xl flex flex-col justify-between bg-background cursor-pointer text-left"
              >
                <div>
                  {item.image && (
                    <div className="h-48 w-full overflow-hidden border-b border-border/60 relative">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                  )}
                  <div className="p-6 sm:p-8">
                    <span className="font-display text-xs font-semibold text-primary uppercase tracking-wider">
                      Practice {String(i + 1).padStart(2, "0")}
                    </span>
                    <h2 className="mt-2 text-xl font-bold text-foreground group-hover:text-primary transition-colors">{item.name}</h2>
                    <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
                  </div>
                </div>
                <div className="px-6 pb-6 sm:px-8 sm:pb-8 flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary group-hover:text-primary/85 transition-colors">
                    View practice details <ArrowRight className="h-4 w-4 -translate-x-1 group-hover:translate-x-0 transition-transform duration-200" />
                  </span>
                </div>
              </Link>
            ))
          )}
        </div>
      </Section>
    </SiteLayout>
  );
}
