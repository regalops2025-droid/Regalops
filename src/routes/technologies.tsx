import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, PageHero, Section } from "@/components/site/site-layout";
import { navItems } from "@/components/site/nav-data";

const items = navItems.find((i) => i.label === "Technologies")?.children ?? [];

const stack = [
  "React", "Next.js", "TypeScript", "Node.js", "Python", "Go", "Rust",
  "PostgreSQL", "MongoDB", "Kafka", "Redis", "Kubernetes", "Docker",
  "Terraform", "AWS", "Azure", "GCP", "Snowflake", "dbt", "PyTorch",
  "TensorFlow", "Swift", "Kotlin", "GraphQL",
];

export const Route = createFileRoute("/technologies")({
  head: () => ({
    meta: [
      { title: "Technologies — The Stack Nexora Runs in Production" },
      {
        name: "description",
        content:
          "React, Node, Python, Kubernetes, AWS, Azure, GCP and machine learning — the technologies Nexora engineers run at enterprise scale.",
      },
      { property: "og:title", content: "Nexora Technologies" },
      {
        property: "og:description",
        content: "The production-proven stack behind our cloud, data and AI delivery.",
      },
    ],
  }),
  component: Technologies,
});

function Technologies() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Technologies"
        title="Production-proven, never experimental"
        description="We standardise on technologies our teams have operated at scale for years — so your estate never becomes someone's learning project."
      />
      <Section>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <article key={item.label} className="panel p-6">
              <h2 className="text-lg font-semibold">{item.label}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
            </article>
          ))}
        </div>
      </Section>
      <section className="border-t border-border bg-surface">
        <Section>
          <h2 className="text-2xl font-semibold sm:text-3xl">Full toolchain</h2>
          <div className="mt-8 flex flex-wrap gap-2.5">
            {stack.map((tech) => (
              <span
                key={tech}
                className="rounded-xl border border-border bg-background px-4 py-2 text-sm text-muted-foreground transition-colors hover:border-primary hover:text-primary"
              >
                {tech}
              </span>
            ))}
          </div>
        </Section>
      </section>
    </SiteLayout>
  );
}
