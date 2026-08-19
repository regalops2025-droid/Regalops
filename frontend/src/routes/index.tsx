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
  const [solutions, setSolutions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

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
            <div className="mt-8 flex flex-wrap gap-3.5">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-tr-2xl rounded-bl-2xl rounded-tl-sm rounded-br-sm bg-gradient-to-r from-primary to-gold/90 px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
              >
                Talk to an engineer <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/solutions"
                className="inline-flex items-center gap-2 rounded-xl border border-border px-5 py-3.5 text-sm font-semibold transition-all duration-200 hover:bg-secondary/40 hover:border-primary/50 hover:text-primary"
              >
                Explore solutions
              </Link>
            </div>
            <dl className="mt-12 grid grid-cols-2 gap-6 sm:grid-cols-4">
              {stats.map((s) => (
                <div key={s.label} className="border-l border-primary/25 pl-4 py-1">
                  <dt className="font-display text-3xl font-extrabold text-primary sm:text-4xl tracking-tight">
                    {s.value}
                  </dt>
                  <dd className="mt-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{s.label}</dd>
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
                className="inline-flex items-center gap-2 rounded-tr-2xl rounded-bl-2xl rounded-tl-sm rounded-br-sm bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
              >
                Learn more about us <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="panel p-6 bg-surface/50 border border-border/80 hover:border-primary/25 hover:shadow-md transition-all duration-300">
              <h3 className="font-display text-4xl font-extrabold text-primary tracking-tight">15+</h3>
              <p className="mt-1.5 text-sm font-semibold text-foreground">Years of experience</p>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">Building mission-critical systems since 2011.</p>
            </div>
            <div className="panel p-6 bg-surface/50 border border-border/80 hover:border-primary/25 hover:shadow-md transition-all duration-300">
              <h3 className="font-display text-4xl font-extrabold text-primary tracking-tight">220</h3>
              <p className="mt-1.5 text-sm font-semibold text-foreground">Senior engineers</p>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">No juniors on retainer — only seasoned experts.</p>
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
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {loading ? (
              [1, 2, 3].map((i) => (
                <div key={i} className="panel animate-pulse h-64 rounded-2xl bg-surface-2 border border-border/50"></div>
              ))
            ) : solutions.length === 0 ? (
              <p className="text-sm text-muted-foreground col-span-full text-center py-8">No solutions available.</p>
            ) : (
              solutions.map((item) => (
                <Link
                  key={item.id}
                  to="/solutions/$id"
                  params={{ id: String(item.id) }}
                  className="panel group overflow-hidden rounded-2xl border border-border/80 hover:border-primary/30 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl flex flex-col justify-between bg-background cursor-pointer"
                >
                  <div className="flex-1 flex flex-col">
                    {item.image && (
                      <div className="h-44 w-full overflow-hidden border-b border-border/60 relative">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>
                    )}
                    <div className="p-6 pt-5 flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">{item.name}</h3>
                        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
                      </div>
                      <div className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-primary/80 group-hover:text-primary transition-colors">
                        <span>Explore practice</span>
                        <ArrowRight className="h-3.5 w-3.5 -translate-x-1 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-200" />
                      </div>
                    </div>
                  </div>
                  <div className="h-1 w-0 bg-primary group-hover:w-full transition-all duration-300" />
                </Link>
              ))
            )}
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
            <Link
              key={c.title}
              to="/clients"
              className="panel group border border-border/80 hover:border-primary/30 p-6 sm:p-8 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl flex flex-col justify-between cursor-pointer bg-background"
            >
              <div>
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                  {c.sector}
                </span>
                <h3 className="mt-4 text-lg font-bold text-foreground group-hover:text-primary transition-colors">{c.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{c.result}</p>
              </div>
              <div className="mt-6 flex items-center gap-1.5 text-xs font-semibold text-primary/80 group-hover:text-primary transition-colors">
                <span>View case study</span>
                <ArrowRight className="h-3.5 w-3.5 -translate-x-1 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-200" />
              </div>
            </Link>
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
              <figure key={idx} className="panel bg-background p-8 relative flex flex-col justify-between hover:border-primary/20 hover:shadow-md transition-all duration-300">
                <div className="relative pt-2">
                  <span className="font-serif text-6xl text-primary/20 leading-none absolute -top-5 -left-4 select-none">“</span>
                  <blockquote className="text-base italic leading-relaxed text-muted-foreground relative z-10">
                    {t.quote}
                  </blockquote>
                </div>
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
          <div className="panel hero-glow grid gap-6 p-8 sm:p-12 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center border border-primary/20 shadow-xl rounded-3xl overflow-hidden relative bg-background">
            <div>
              <h2 className="text-2xl font-semibold sm:text-3xl text-foreground">
                Start with a technical conversation
              </h2>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
                Bring your architecture. We will tell you honestly what to fix
                first — no slide deck required.
              </p>
            </div>
            <Link
              to="/contact"
              className="inline-flex shrink-0 items-center gap-2 rounded-tr-2xl rounded-bl-2xl rounded-tl-sm rounded-br-sm bg-gradient-to-r from-primary to-gold/90 px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
            >
              Book a call <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </Section>
      </section>
    </SiteLayout>
  );
}
