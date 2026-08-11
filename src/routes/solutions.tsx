import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { SiteLayout, PageHero, Section } from "@/components/site/site-layout";
import { navItems } from "@/components/site/nav-data";

const items = navItems.find((i) => i.label === "Solutions")?.children ?? [];

export const Route = createFileRoute("/solutions")({
  head: () => ({
    meta: [
      { title: "Solutions — Cloud, Data, AI & Managed Engineering | Nexora" },
      {
        name: "description",
        content:
          "Six delivery practices: enterprise software, cloud migration, data analytics, AI automation, cyber security and managed support.",
      },
      { property: "og:title", content: "Nexora Solutions" },
      {
        property: "og:description",
        content: "Enterprise software, cloud, data, AI, security and managed support practices.",
      },
    ],
  }),
  component: Solutions,
});

function Solutions() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Solutions"
        title="Six practices, one delivery standard"
        description="Every engagement ships with architecture documentation, automated tests, observability and an operational runbook."
      />
      <Section>
        <div className="grid gap-4 sm:grid-cols-2">
          {items.map((item, i) => (
            <article key={item.label} className="panel p-6 sm:p-8">
              <span className="font-display text-sm text-primary">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h2 className="mt-3 text-xl font-semibold">{item.label}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
              <Link
                to="/contact"
                className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary"
              >
                Discuss this practice <ArrowRight className="h-4 w-4" />
              </Link>
            </article>
          ))}
        </div>
      </Section>
    </SiteLayout>
  );
}
