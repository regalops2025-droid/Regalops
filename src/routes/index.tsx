import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  ShieldCheck,
  Cloud,
  Cpu,
  LineChart,
  Layers,
  Headphones,
  Check,
} from "lucide-react";
import { SiteLayout, Section } from "@/components/site/site-layout";
import heroImage from "@/assets/hero-network.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Nexora — Enterprise Cloud, Data & AI Engineering" },
      {
        name: "description",
        content:
          "Nexora builds enterprise-grade cloud, data and AI platforms. Solutions, technologies and managed engineering teams for mission-critical systems.",
      },
      { property: "og:title", content: "Nexora — Enterprise Cloud, Data & AI Engineering" },
      {
        property: "og:description",
        content:
          "Enterprise-grade cloud, data and AI platforms engineered for uptime, scale and security.",
      },
    ],
  }),
  component: Home,
});

const solutions = [
  { icon: Layers, title: "Enterprise Software", desc: "Modular platforms designed around your operating model, not a template." },
  { icon: Cloud, title: "Cloud Migration", desc: "Zero-drama moves to AWS, Azure or GCP with measurable cost reduction." },
  { icon: LineChart, title: "Data & Analytics", desc: "Warehouses, streaming pipelines and decision dashboards leaders trust." },
  { icon: Cpu, title: "AI Automation", desc: "Agents and copilots wired into real workflows with human oversight." },
  { icon: ShieldCheck, title: "Cyber Security", desc: "Threat modelling, hardening and audit-ready compliance programmes." },
  { icon: Headphones, title: "Managed Support", desc: "24/7 monitoring, incident response and SLAs you can hold us to." },
];

const stack = [
  "React", "Next.js", "TypeScript", "Node.js", "Python", "Go",
  "PostgreSQL", "Kafka", "Kubernetes", "Terraform", "AWS", "Azure",
  "GCP", "Snowflake", "PyTorch", "Swift",
];

const stats = [
  { value: "180+", label: "Platforms delivered" },
  { value: "99.98%", label: "Average uptime" },
  { value: "14", label: "Countries served" },
  { value: "220", label: "Engineers on staff" },
];

function Home() {
  return (
    <SiteLayout>
      <section className="hero-glow relative overflow-hidden border-b border-border">
        <div className="grid-lines pointer-events-none absolute inset-0 opacity-30" />
        <div className="relative mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 sm:py-24 lg:grid-cols-2 lg:items-center lg:px-8">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
              Engineering partner since 2011
            </span>
            <h1 className="mt-6 text-4xl font-semibold leading-[1.05] sm:text-6xl">
              Systems that stay up when <span className="text-gradient">everything scales</span>
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              Nexora designs, builds and operates cloud, data and AI platforms for
              banks, healthcare networks and global manufacturers — with senior
              engineers on every line of code.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5"
              >
                Talk to an engineer <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/solutions"
                className="inline-flex items-center gap-2 rounded-xl border border-border px-5 py-3 text-sm font-semibold transition-colors hover:border-primary hover:text-primary"
              >
                Explore solutions
              </Link>
            </div>
            <dl className="mt-12 grid grid-cols-2 gap-6 sm:grid-cols-4">
              {stats.map((s) => (
                <div key={s.label}>
                  <dt className="font-display text-2xl font-semibold text-primary sm:text-3xl">
                    {s.value}
                  </dt>
                  <dd className="mt-1 text-xs text-muted-foreground">{s.label}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="panel overflow-hidden p-2">
            <img
              src={heroImage}
              alt="Illustration of a connected enterprise data network"
              width={1600}
              height={1200}
              className="h-full w-full rounded-xl object-cover"
            />
          </div>
        </div>
      </section>

      <Section>
        <div className="max-w-2xl">
          <h2 className="text-2xl font-semibold sm:text-4xl">Solutions built for scale</h2>
          <p className="mt-4 text-muted-foreground">
            Six practices, one delivery standard. Each engagement ships with
            architecture docs, tests and a runbook.
          </p>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {solutions.map(({ icon: Icon, title, desc }) => (
            <article
              key={title}
              className="panel group p-6 transition-transform duration-300 hover:-translate-y-1"
            >
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-surface-2 text-primary">
                <Icon className="h-5 w-5" />
              </span>
              <h3 className="mt-5 text-lg font-semibold">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{desc}</p>
            </article>
          ))}
        </div>
      </Section>

      <section className="border-y border-border bg-surface">
        <Section>
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_1.2fr] lg:items-center">
            <div>
              <h2 className="text-2xl font-semibold sm:text-4xl">A stack we know cold</h2>
              <p className="mt-4 text-muted-foreground">
                No experiments on your production estate. We standardise on
                technologies our teams have run at scale for years.
              </p>
            </div>
            <div className="flex flex-wrap gap-2.5">
              {stack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-xl border border-border bg-background px-4 py-2 text-sm text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </Section>
      </section>

      <Section>
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 className="text-2xl font-semibold sm:text-4xl">
              Why enterprises keep us on retainer
            </h2>
            <ul className="mt-6 space-y-4">
              {[
                "Senior-only delivery pods — no junior hand-offs mid-project",
                "Fixed-scope discovery in 10 working days",
                "Security review baked into every release train",
                "Documentation and knowledge transfer as a deliverable",
              ].map((item) => (
                <li key={item} className="flex gap-3 text-sm text-muted-foreground">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <figure className="panel p-8">
            <blockquote className="text-lg leading-relaxed">
              “They replatformed a 14-year-old core system without a single
              customer-visible outage. That is the whole review.”
            </blockquote>
            <figcaption className="mt-6 text-sm text-muted-foreground">
              CTO — Tier 1 regional bank
            </figcaption>
          </figure>
        </div>
      </Section>

      <section className="border-t border-border">
        <Section>
          <div className="panel hero-glow grid gap-6 p-8 sm:p-12 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
            <div>
              <h2 className="text-2xl font-semibold sm:text-3xl">
                Start with a technical conversation
              </h2>
              <p className="mt-3 max-w-xl text-muted-foreground">
                Bring your architecture. We will tell you honestly what to fix
                first — no slide deck required.
              </p>
            </div>
            <Link
              to="/contact"
              className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5"
            >
              Book a call <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </Section>
      </section>
    </SiteLayout>
  );
}
