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
import { useState, useEffect } from "react";
import { SiteLayout, Section } from "@/components/site/site-layout";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Regal OPs — Consult, Build, Deploy" },
      {
        name: "description",
        content:
          "Regal OPs consults, builds, and deploys premium enterprise cloud, data, and AI platforms.",
      },
      { property: "og:title", content: "Regal OPs — Consult, Build, Deploy" },
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

const heroSlides = [
  {
    bg: "/hero-bg-1.png",
    panel: "/hero-bg-1.png",
    alt: "Abstract cloud infrastructure network",
  },
  {
    bg: "/hero-bg-2.png",
    panel: "/hero-bg-2.png",
    alt: "Futuristic data engineering dashboard",
  },
  {
    bg: "/hero-bg-3.png",
    panel: "/hero-bg-3.png",
    alt: "Geometric nodes and connection network",
  },
];

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

const testimonials = [
  {
    quote: "They replatformed a 14-year-old core system without a single customer-visible outage. That is the whole review.",
    author: "CTO",
    role: "Tier 1 Regional Bank",
  },
  {
    quote: "The patient data consolidation cut our clinician report latency from hours to minutes. Regal OPs delivered clean, audited code ahead of schedule.",
    author: "CIO",
    role: "Apollo Healthcare Systems",
  },
  {
    quote: "Their predictive maintenance algorithms saved us millions in unplanned downtime in year one. A team of true senior practitioners.",
    author: "VP of Engineering",
    role: "Global Auto Parts Manufacturer",
  },
];

function Home() {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <SiteLayout>
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden border-b border-border bg-background">
        {/* Background Carousel */}
        <div className="absolute inset-0 z-0">
          {heroSlides.map((slide, index) => (
            <div
              key={slide.bg}
              className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out"
              style={{
                backgroundImage: `url(${slide.bg})`,
                opacity: index === activeSlide ? 0.08 : 0,
              }}
            />
          ))}
          <div className="grid-lines pointer-events-none absolute inset-0 opacity-15" />
        </div>

        <div className="relative z-10 mx-auto grid max-w-7xl gap-12 px-4 py-8 sm:px-6 sm:py-12 lg:grid-cols-2 lg:items-center lg:px-8">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
              Engineering partner since 2011
            </span>
            <h1 className="mt-6 text-4xl font-semibold leading-[1.05] sm:text-6xl">
              Systems that stay up when <span className="text-gradient">everything scales</span>
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              At Regal OPs, we help organizations accelerate digital transformation through innovative IT solutions, AI-driven automation, and specialized technology staffing across North America and global markets.
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
          <div className="panel relative overflow-hidden aspect-[4/3] w-full max-w-lg mx-auto lg:max-w-none">
            {heroSlides.map((slide, index) => (
              <img
                key={slide.panel}
                src={slide.panel}
                alt={slide.alt}
                className={`absolute inset-0 h-full w-full object-cover p-2 rounded-2xl transition-all duration-1000 ease-in-out ${
                  index === activeSlide
                    ? "opacity-100 scale-100 translate-x-0"
                    : "opacity-0 scale-95 translate-x-4 pointer-events-none"
                }`}
              />
            ))}
            {/* Slide Indicators */}
            <div className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 gap-2">
              {heroSlides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveSlide(idx)}
                  className={`h-2.5 w-2.5 rounded-full transition-all duration-300 ${
                    idx === activeSlide ? "bg-primary w-6" : "bg-primary/30 hover:bg-primary/50"
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 2. About Us Section */}
      <Section className="border-b border-border">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
              About Us
            </span>
            <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">
              Senior Engineering, Quietly Delivered
            </h2>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground sm:text-lg">
              Hello! Greetings from Regal OPs! We provide cutting-edge IT services, AI solutions, enterprise consulting, and global technology staffing. We work closely with our clients to connect and exchange ideas on technology, talent, and business growth opportunities.
            </p>
            <div className="mt-8">
              <Link
                to="/about"
                className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5"
              >
                Learn more about us <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="panel p-6 bg-surface">
              <h3 className="font-display text-3xl font-semibold text-primary">15+</h3>
              <p className="mt-1 text-sm font-semibold">Years of experience</p>
              <p className="mt-2 text-xs text-muted-foreground">Building mission-critical systems since 2011.</p>
            </div>
            <div className="panel p-6 bg-surface">
              <h3 className="font-display text-3xl font-semibold text-primary">220</h3>
              <p className="mt-1 text-sm font-semibold">Senior engineers</p>
              <p className="mt-2 text-xs text-muted-foreground">No juniors on retainer — only seasoned experts.</p>
            </div>
          </div>
        </div>
      </Section>

      {/* 3. Services Section (Solutions) */}
      <section className="border-b border-border bg-surface">
        <Section>
          <div className="max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
              Our Services
            </span>
            <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">Solutions built for scale</h2>
            <p className="mt-4 text-muted-foreground">
              Six core practices, one unified delivery standard. Every engagement ships with
              architecture documentation, automated tests, and operational runbooks.
            </p>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {solutions.map(({ icon: Icon, title, desc }) => (
              <article
                key={title}
                className="panel bg-background group p-6 transition-transform duration-300 hover:-translate-y-1"
              >
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-surface text-primary border border-border">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="mt-5 text-lg font-semibold">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{desc}</p>
              </article>
            ))}
          </div>
        </Section>
      </section>

      {/* 4. Clients Section */}
      <Section className="border-b border-border">
        <div className="max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
            Clients
          </span>
          <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">Work that holds up under audit</h2>
          <p className="mt-4 text-muted-foreground">
            We publish concrete outcomes, not logos-for-decoration. Here is what we have recently delivered.
          </p>
        </div>
        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          {cases.map((c) => (
            <article key={c.title} className="panel p-6 sm:p-8">
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                {c.sector}
              </span>
              <h3 className="mt-4 text-lg font-semibold">{c.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{c.result}</p>
            </article>
          ))}
        </div>
      </Section>

      {/* 5. Testimonials Section */}
      <section className="border-b border-border bg-surface">
        <Section>
          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
              Testimonials
            </span>
            <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">Trusted by Industry Leaders</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {testimonials.map((t, idx) => (
              <figure key={idx} className="panel bg-background p-8 flex flex-col justify-between">
                <blockquote className="text-base italic leading-relaxed text-muted-foreground">
                  “{t.quote}”
                </blockquote>
                <div className="mt-6 border-t border-border pt-4">
                  <figcaption className="text-sm font-semibold text-foreground">{t.author}</figcaption>
                  <p className="text-xs text-muted-foreground mt-0.5">{t.role}</p>
                </div>
              </figure>
            ))}
          </div>
        </Section>
      </section>

      {/* 6. Call to Action (CTA) */}
      <section>
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
