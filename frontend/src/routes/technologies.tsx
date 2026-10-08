import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect, useMemo } from "react";
import { SiteLayout, Section } from "@/components/site/site-layout";
import {
  Sparkles,
  Terminal,
  ShieldCheck,
  Cpu,
  ArrowRight,
  Zap,
  Activity,
  Layers,
  Search,
} from "lucide-react";
import {
  ReactLogo,
  NextjsLogo,
  TypeScriptLogo,
  NodeLogo,
  PythonLogo,
  AwsLogo,
  AzureLogo,
  GcpLogo,
  KubernetesLogo,
  DockerLogo,
  TerraformLogo,
  AppleLogo,
  AndroidLogo,
  FlutterLogo,
  PyTorchLogo,
  TensorFlowLogo,
  OpenAiLogo,
  PostgreSqlLogo,
  RedisLogo,
} from "@/components/site/tech-brand-logos";

export const Route = createFileRoute("/technologies")({
  head: () => ({
    meta: [
      { title: "Technologies — Enterprise Stack & Architecture | Regal OPs" },
      {
        name: "description",
        content:
          "React, Next.js, Node, Python, AWS, Azure, GCP, Kubernetes, and Machine Learning — the battle-tested enterprise technologies Regal OPs runs at scale.",
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

// Domain Filter Tabs
type DomainFilter = "all" | "frontend" | "backend" | "cloud" | "devops" | "mobile" | "ai";

interface BrandItem {
  name: string;
  Logo: React.ComponentType<{ className?: string }>;
  color: string;
  badge: string;
}

// Global brand lookup registry to dynamically render brand logos added by Admin
export const BRAND_LOGO_MAP: Record<string, { Logo: React.ComponentType<{ className?: string }>; color: string; badge: string }> = {
  "react": { Logo: ReactLogo, color: "#61DAFB", badge: "v19 Concurrent" },
  "react.js": { Logo: ReactLogo, color: "#61DAFB", badge: "v19 Concurrent" },
  "reactjs": { Logo: ReactLogo, color: "#61DAFB", badge: "v19 Concurrent" },
  "next.js": { Logo: NextjsLogo, color: "#000000", badge: "SSR & Edge" },
  "nextjs": { Logo: NextjsLogo, color: "#000000", badge: "SSR & Edge" },
  "next": { Logo: NextjsLogo, color: "#000000", badge: "SSR & Edge" },
  "typescript": { Logo: TypeScriptLogo, color: "#3178C6", badge: "Type Safety" },
  "ts": { Logo: TypeScriptLogo, color: "#3178C6", badge: "Type Safety" },
  "node": { Logo: NodeLogo, color: "#539E43", badge: "Async I/O" },
  "node.js": { Logo: NodeLogo, color: "#539E43", badge: "Async I/O" },
  "nodejs": { Logo: NodeLogo, color: "#539E43", badge: "Async I/O" },
  "python": { Logo: PythonLogo, color: "#3771A1", badge: "APIs & Core" },
  "py": { Logo: PythonLogo, color: "#3771A1", badge: "APIs & Core" },
  "aws": { Logo: AwsLogo, color: "#FF9900", badge: "Multi-Region" },
  "amazon": { Logo: AwsLogo, color: "#FF9900", badge: "Multi-Region" },
  "azure": { Logo: AzureLogo, color: "#0089D6", badge: "Enterprise Cloud" },
  "microsoft azure": { Logo: AzureLogo, color: "#0089D6", badge: "Enterprise Cloud" },
  "gcp": { Logo: GcpLogo, color: "#4285F4", badge: "BigQuery & AI" },
  "google cloud": { Logo: GcpLogo, color: "#4285F4", badge: "BigQuery & AI" },
  "kubernetes": { Logo: KubernetesLogo, color: "#326CE5", badge: "K8s Autoscaling" },
  "k8s": { Logo: KubernetesLogo, color: "#326CE5", badge: "K8s Autoscaling" },
  "docker": { Logo: DockerLogo, color: "#2496ED", badge: "OCI Containers" },
  "terraform": { Logo: TerraformLogo, color: "#844FBA", badge: "GitOps IaC" },
  "apple": { Logo: AppleLogo, color: "#000000", badge: "Swift & SwiftUI" },
  "apple ios": { Logo: AppleLogo, color: "#000000", badge: "Swift & SwiftUI" },
  "ios": { Logo: AppleLogo, color: "#000000", badge: "Swift & SwiftUI" },
  "swift": { Logo: AppleLogo, color: "#FA7343", badge: "Native iOS" },
  "android": { Logo: AndroidLogo, color: "#3DDC84", badge: "Kotlin Modern" },
  "kotlin": { Logo: AndroidLogo, color: "#7F52FF", badge: "Modern Android" },
  "flutter": { Logo: FlutterLogo, color: "#02569B", badge: "Cross Platform" },
  "pytorch": { Logo: PyTorchLogo, color: "#EE4C2C", badge: "Deep Learning" },
  "tensorflow": { Logo: TensorFlowLogo, color: "#FF6F00", badge: "Production ML" },
  "openai": { Logo: OpenAiLogo, color: "#10A37F", badge: "LLM Agents" },
  "postgresql": { Logo: PostgreSqlLogo, color: "#4169E1", badge: "ACID Database" },
  "postgres": { Logo: PostgreSqlLogo, color: "#4169E1", badge: "ACID Database" },
  "redis": { Logo: RedisLogo, color: "#DC382D", badge: "In-Memory Cache" },
  "sap": { Logo: Cpu, color: "#008FD3", badge: "ERP & S/4HANA" },
};

export function resolveBrandLogos(brandsStr?: string | null, fallbackLogos: BrandItem[] = []): BrandItem[] {
  if (!brandsStr || !brandsStr.trim()) return fallbackLogos;
  const names = brandsStr.split(",").map((s) => s.trim()).filter(Boolean);
  if (names.length === 0) return fallbackLogos;
  return names.map((name) => {
    const key = name.toLowerCase();
    const mapped = BRAND_LOGO_MAP[key];
    if (mapped) {
      return {
        name,
        Logo: mapped.Logo,
        color: mapped.color,
        badge: mapped.badge,
      };
    }
    return {
      name,
      Logo: Cpu,
      color: "#0284c7",
      badge: "Enterprise",
    };
  });
}

interface TechMetadata {
  category: string;
  domain: DomainFilter;
  accentGradient: string;
  borderGlow: string;
  badgeBg: string;
  textColor: string;
  logos: BrandItem[];
  capabilities: string[];
  metric: { label: string; value: string };
  defaultHowToWork: string;
}

// Enterprise metadata registry mapping technology names to brand logos & specs
function getTechMetadata(name: string): TechMetadata {
  const lower = name.toLowerCase();

  if (lower.includes("react") || lower.includes("next")) {
    return {
      category: "ENTERPRISE WEB & FRONTEND",
      domain: "frontend",
      accentGradient: "from-cyan-500/10 via-sky-500/5 to-transparent",
      borderGlow: "hover:border-cyan-500/50 hover:shadow-cyan-500/10",
      badgeBg: "bg-cyan-500/10 text-cyan-700 dark:text-cyan-300 border-cyan-500/25",
      textColor: "text-cyan-500",
      logos: [
        { name: "React", Logo: ReactLogo, color: "#61DAFB", badge: "v19 Concurrent" },
        { name: "Next.js", Logo: NextjsLogo, color: "#000000", badge: "SSR & Edge" },
        { name: "TypeScript", Logo: TypeScriptLogo, color: "#3178C6", badge: "Type Safety" },
      ],
      capabilities: [
        "Server-Side Rendering & ISR for sub-second LCP scores",
        "Modular micro-frontend architecture & enterprise design systems",
        "Zero-bundle React Server Components (RSC) optimization",
      ],
      metric: { label: "Core Web Vitals", value: "99.9% Pass Rate" },
      defaultHowToWork:
        "We build scalable enterprise portals using Next.js App Router, streaming hydration, and strict TypeScript contracts.",
    };
  }

  if (lower.includes("node") || lower.includes("python")) {
    return {
      category: "RUNTIMES & DISTRIBUTED APIS",
      domain: "backend",
      accentGradient: "from-emerald-500/10 via-green-500/5 to-transparent",
      borderGlow: "hover:border-emerald-500/50 hover:shadow-emerald-500/10",
      badgeBg: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/25",
      textColor: "text-emerald-500",
      logos: [
        { name: "Node.js", Logo: NodeLogo, color: "#539E43", badge: "Async I/O" },
        { name: "Python", Logo: PythonLogo, color: "#3771A1", badge: "APIs & Core" },
      ],
      capabilities: [
        "High-throughput non-blocking asynchronous event architectures",
        "Resilient microservices with gRPC, REST, and GraphQL gateways",
        "Distributed task queues and stream processing with Kafka",
      ],
      metric: { label: "P99 Response Time", value: "< 35ms Latency" },
      defaultHowToWork:
        "Our backend teams engineer resilient Node.js microservices and Python FastAPI pipelines connected to robust message brokers.",
    };
  }

  if (lower.includes("aws") || lower.includes("azure") || lower.includes("gcp") || lower.includes("cloud")) {
    return {
      category: "MULTI-CLOUD ARCHITECTURE",
      domain: "cloud",
      accentGradient: "from-amber-500/10 via-orange-500/5 to-transparent",
      borderGlow: "hover:border-amber-500/50 hover:shadow-amber-500/10",
      badgeBg: "bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-500/25",
      textColor: "text-amber-500",
      logos: [
        { name: "AWS", Logo: AwsLogo, color: "#FF9900", badge: "Hyperscale" },
        { name: "Azure", Logo: AzureLogo, color: "#0078D4", badge: "Enterprise" },
        { name: "GCP", Logo: GcpLogo, color: "#4285F4", badge: "Cloud Native" },
      ],
      capabilities: [
        "Multi-cloud redundancy with automated cross-region failover",
        "Declarative Infrastructure-as-Code with security compliance",
        "FinOps cloud spend governance delivering up to 40% TCO savings",
      ],
      metric: { label: "Target Availability", value: "99.99% Multi-Region SLA" },
      defaultHowToWork:
        "We engineer zero-trust multi-region cloud infrastructures across AWS, Azure, and GCP with automated disaster recovery.",
    };
  }

  if (lower.includes("kubernetes") || lower.includes("devops") || lower.includes("ci/cd")) {
    return {
      category: "CONTAINER PLATFORMS & CI/CD",
      domain: "devops",
      accentGradient: "from-blue-500/10 via-indigo-500/5 to-transparent",
      borderGlow: "hover:border-blue-500/50 hover:shadow-blue-500/10",
      badgeBg: "bg-blue-500/10 text-blue-700 dark:text-blue-300 border-blue-500/25",
      textColor: "text-blue-500",
      logos: [
        { name: "Kubernetes", Logo: KubernetesLogo, color: "#326CE5", badge: "K8s Fleet" },
        { name: "Docker", Logo: DockerLogo, color: "#2496ED", badge: "Containers" },
        { name: "Terraform", Logo: TerraformLogo, color: "#844FBA", badge: "IaC GitOps" },
      ],
      capabilities: [
        "Zero-downtime rolling canary & blue/green release pipelines",
        "GitOps continuous delivery workflows with automated audits",
        "Dynamic horizontal auto-scaling and cluster self-healing",
      ],
      metric: { label: "Release Velocity", value: "Zero Downtime Deployments" },
      defaultHowToWork:
        "We manage hardened Kubernetes clusters (EKS/AKS/GKE) with declarative GitOps pipelines, strict network policies, and 24/7 automated telemetry.",
    };
  }

  if (lower.includes("mobile") || lower.includes("ios") || lower.includes("android")) {
    return {
      category: "MOBILE & CROSS-PLATFORM",
      domain: "mobile",
      accentGradient: "from-rose-500/10 via-pink-500/5 to-transparent",
      borderGlow: "hover:border-rose-500/50 hover:shadow-rose-500/10",
      badgeBg: "bg-rose-500/10 text-rose-700 dark:text-rose-300 border-rose-500/25",
      textColor: "text-rose-500",
      logos: [
        { name: "Apple iOS", Logo: AppleLogo, color: "#A2AAAD", badge: "Swift & Native" },
        { name: "Android", Logo: AndroidLogo, color: "#3DDC84", badge: "Kotlin Jetpack" },
        { name: "Flutter", Logo: FlutterLogo, color: "#02569B", badge: "Cross Platform" },
      ],
      capabilities: [
        "Native Swift/Kotlin & high-performance Flutter architectures",
        "Offline-first synchronization with biometric device security",
        "60/120 FPS fluid gestures and responsive adaptive layouts",
      ],
      metric: { label: "Store Quality", value: "4.8★ App Store Rating" },
      defaultHowToWork:
        "We build high-performance mobile apps integrated with enterprise SSO, offline data caching, and secure biometrics.",
    };
  }

  if (lower.includes("machine learning") || lower.includes("ml") || lower.includes("ai")) {
    return {
      category: "ENTERPRISE AI & MLOPS",
      domain: "ai",
      accentGradient: "from-purple-500/10 via-violet-500/5 to-transparent",
      borderGlow: "hover:border-purple-500/50 hover:shadow-purple-500/10",
      badgeBg: "bg-purple-500/10 text-purple-700 dark:text-purple-300 border-purple-500/25",
      textColor: "text-purple-500",
      logos: [
        { name: "PyTorch", Logo: PyTorchLogo, color: "#EE4C2C", badge: "Deep Learning" },
        { name: "TensorFlow", Logo: TensorFlowLogo, color: "#FF6F00", badge: "Production ML" },
        { name: "OpenAI", Logo: OpenAiLogo, color: "#10A37F", badge: "GenAI & LLMs" },
      ],
      capabilities: [
        "Production Retrieval-Augmented Generation (RAG) pipelines",
        "Automated model drift detection & continuous retraining",
        "High-throughput sub-100ms real-time inference on GPU clusters",
      ],
      metric: { label: "Inference Latency", value: "< 70ms Real-Time Inference" },
      defaultHowToWork:
        "We deploy production LLM workflows, custom embeddings, and robust MLOps lifecycle pipelines with full enterprise data governance.",
    };
  }

  // Fallback for custom added technologies
  return {
    category: "ENTERPRISE PLATFORM",
    domain: "all",
    accentGradient: "from-emerald-500/10 via-primary/5 to-transparent",
    borderGlow: "hover:border-primary/50 hover:shadow-primary/10",
    badgeBg: "bg-primary/10 text-primary border-primary/25",
    textColor: "text-primary",
    logos: [
      { name: "Platform", Logo: Cpu, color: "#10B981", badge: "Enterprise" },
    ],
    capabilities: [
      "Hardened for enterprise-grade scale and zero-downtime operations",
      "Comprehensive telemetry, automated testing, and health checks",
      "Seamless integration with Regal OPs observability stack",
    ],
    metric: { label: "Standard SLA", value: "99.9% Production Ready" },
    defaultHowToWork:
      "Engineered according to Regal OPs strict architectural standards, automated CI testing, and production monitoring.",
  };
}

// Curated Enterprise Toolchain Matrix items
const TOOLCHAIN_ITEMS = [
  { name: "React", category: "Frontend", Logo: ReactLogo, desc: "Component Architecture" },
  { name: "Next.js", category: "Frontend", Logo: NextjsLogo, desc: "SSR & Edge Routing" },
  { name: "TypeScript", category: "Frontend", Logo: TypeScriptLogo, desc: "Static Type Verification" },
  { name: "Node.js", category: "Backend", Logo: NodeLogo, desc: "Asynchronous Microservices" },
  { name: "Python", category: "Backend", Logo: PythonLogo, desc: "API & Data Engine" },
  { name: "AWS", category: "Cloud", Logo: AwsLogo, desc: "Elastic Cloud Infrastructure" },
  { name: "Microsoft Azure", category: "Cloud", Logo: AzureLogo, desc: "Enterprise Hybrid Services" },
  { name: "Google Cloud", category: "Cloud", Logo: GcpLogo, desc: "Scalable Data Analytics" },
  { name: "Kubernetes", category: "DevOps", Logo: KubernetesLogo, desc: "Container Fleet Management" },
  { name: "Docker", category: "DevOps", Logo: DockerLogo, desc: "Container Virtualization" },
  { name: "Terraform", category: "DevOps", Logo: TerraformLogo, desc: "Infrastructure as Code" },
  { name: "Apple iOS", category: "Mobile", Logo: AppleLogo, desc: "Swift Native Engineering" },
  { name: "Android", category: "Mobile", Logo: AndroidLogo, desc: "Kotlin Mobile Ecosystem" },
  { name: "Flutter", category: "Mobile", Logo: FlutterLogo, desc: "Cross-Platform Framework" },
  { name: "PyTorch", category: "AI & ML", Logo: PyTorchLogo, desc: "Neural Networks & Research" },
  { name: "TensorFlow", category: "AI & ML", Logo: TensorFlowLogo, desc: "Production Model Serving" },
  { name: "OpenAI", category: "AI & ML", Logo: OpenAiLogo, desc: "Generative AI & LLM Agents" },
  { name: "PostgreSQL", category: "Data", Logo: PostgreSqlLogo, desc: "Relational ACID Engine" },
  { name: "Redis", category: "Data", Logo: RedisLogo, desc: "Sub-millisecond In-Memory Cache" },
];

function Technologies() {
  const [techList, setTechList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState<DomainFilter>("all");
  const [searchQuery, setSearchQuery] = useState("");

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

  // Filtered technology cards
  const filteredTechList = useMemo(() => {
    return techList.filter((tech) => {
      const meta = getTechMetadata(tech.name);
      const matchesFilter = activeFilter === "all" || meta.domain === activeFilter;
      const matchesSearch =
        searchQuery === "" ||
        tech.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tech.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (tech.keywords && tech.keywords.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesFilter && matchesSearch;
    });
  }, [techList, activeFilter, searchQuery]);

  return (
    <SiteLayout>
      {/* ==================================================================== */}
      {/* 1. HERO SECTION: Sleek High-Tech Header with Live Metrics            */}
      {/* ==================================================================== */}
      <section className="relative overflow-hidden border-b border-border bg-gradient-to-b from-background via-surface to-background pt-16 pb-14">
        {/* Ambient background glow dots */}
        <div className="absolute top-0 left-1/4 -z-10 h-96 w-96 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />
        <div className="absolute top-10 right-1/4 -z-10 h-96 w-96 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center text-center">
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-xs font-bold tracking-wider text-emerald-600 dark:text-emerald-400 uppercase shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              ENTERPRISE ENGINEERING STACK
            </div>

            {/* Main Headline */}
            <h1 className="mt-6 max-w-4xl font-display text-4xl font-black tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Production-proven, <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-emerald-500 via-amber-400 to-emerald-400 bg-clip-text text-transparent">
                never experimental.
              </span>
            </h1>

            {/* Subtitle */}
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              We standardise on technologies our teams have operated at scale for years — backed by official partner ecosystems, zero vendor lock-in, and guaranteed SLAs.
            </p>

            {/* Live Trust Metrics Ribbon */}
            <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-6 border-y border-border/60 py-4 max-w-3xl w-full">
              <div className="text-center">
                <div className="text-xl sm:text-2xl font-black text-foreground">99.98%</div>
                <div className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Target Uptime</div>
              </div>
              <div className="text-center">
                <div className="text-xl sm:text-2xl font-black text-foreground">6 Core</div>
                <div className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Tech Practices</div>
              </div>
              <div className="text-center">
                <div className="text-xl sm:text-2xl font-black text-foreground">20+ Stack</div>
                <div className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Frameworks</div>
              </div>
              <div className="text-center">
                <div className="text-xl sm:text-2xl font-black text-emerald-500">Zero</div>
                <div className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Vendor Lock-In</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================================== */}
      {/* 2. FILTER & SEARCH CONTROLS                                          */}
      {/* ==================================================================== */}
      <section className="bg-surface/50 border-b border-border/70 sticky top-16 z-20 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-4 py-3.5 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            {/* Domain Tabs */}
            <div className="flex flex-wrap items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
              {[
                { id: "all", label: "All Technologies" },
                { id: "frontend", label: "Frontend" },
                { id: "backend", label: "Backend & APIs" },
                { id: "cloud", label: "Multi-Cloud" },
                { id: "devops", label: "Kubernetes & DevOps" },
                { id: "mobile", label: "Mobile" },
                { id: "ai", label: "AI & ML" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveFilter(tab.id as DomainFilter)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-all duration-200 cursor-pointer whitespace-nowrap ${
                    activeFilter === tab.id
                      ? "bg-primary text-primary-foreground shadow-sm scale-102"
                      : "bg-background/80 hover:bg-surface text-muted-foreground hover:text-foreground border border-border/50"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Quick Search */}
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-muted-foreground" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search frameworks..."
                className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg bg-background border border-border/80 focus:outline-none focus:ring-1 focus:ring-primary text-foreground placeholder:text-muted-foreground"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================================== */}
      {/* 3. PREMIUM TECHNOLOGY CARDS WITH BRAND LOGOS                         */}
      {/* ==================================================================== */}
      <Section className="py-12 sm:py-16">
        {loading ? (
          <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="animate-pulse rounded-2xl border border-border/60 bg-surface/60 p-7 h-96" />
            ))}
          </div>
        ) : filteredTechList.length === 0 ? (
          <div className="text-center py-16 bg-surface/40 rounded-2xl border border-border/50 max-w-lg mx-auto">
            <Cpu className="h-10 w-10 mx-auto text-muted-foreground stroke-1" />
            <h3 className="mt-3 text-base font-bold text-foreground">No technologies match your filter</h3>
            <p className="mt-1 text-xs text-muted-foreground">Try selecting "All Technologies" or clearing your search.</p>
            <button
              onClick={() => {
                setActiveFilter("all");
                setSearchQuery("");
              }}
              className="mt-4 px-4 py-2 text-xs font-semibold rounded-lg bg-primary text-primary-foreground"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {filteredTechList.map((item) => {
              const meta = getTechMetadata(item.name);
              const howToWorkText = item.how_to_work && item.how_to_work.trim().length > 0 ? item.how_to_work : meta.defaultHowToWork;
              const displayCategory = item.category && item.category.trim().length > 0 ? item.category.toUpperCase() : meta.category;
              const displayStatus = item.status_badge && item.status_badge.trim().length > 0 ? item.status_badge.toUpperCase() : "PRODUCTION READY";
              const brandItems = resolveBrandLogos(item.brands, meta.logos);

              return (
                <article
                  key={item.id}
                  className={`group relative flex flex-col justify-between rounded-2xl border border-border/70 bg-gradient-to-b ${meta.accentGradient} p-6 sm:p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${meta.borderGlow} bg-card`}
                >
                  {/* Subtle top edge glow bar */}
                  <div className="absolute inset-x-6 top-0 h-0.5 bg-gradient-to-r from-transparent via-primary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Top Header: Category Tag & Status Badge */}
                  <div>
                    <div className="flex items-center justify-between gap-2 border-b border-border/40 pb-4">
                      <span className={`text-[10px] font-extrabold uppercase tracking-widest px-2.5 py-1 rounded-md border ${meta.badgeBg}`}>
                        {displayCategory}
                      </span>
                      <span className="inline-flex items-center gap-1.5 text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        {displayStatus}
                      </span>
                    </div>

                    {/* BRAND LOGOS SHOWCASE BAR (Key User Request - Admin configurable) */}
                    <div className="mt-5 flex items-center gap-3">
                      <div className="flex items-center -space-x-1.5">
                        {brandItems.map((logoItem, idx) => {
                          const LogoComp = logoItem.Logo;
                          return (
                            <div
                              key={idx}
                              title={`${logoItem.name} — ${logoItem.badge}`}
                              className="relative flex h-12 w-12 items-center justify-center rounded-xl border border-border/80 bg-background/90 p-2 shadow-sm transition-transform duration-300 group-hover:scale-105 group-hover:-translate-y-0.5 hover:z-10 hover:border-primary/50"
                            >
                              <LogoComp className="h-7 w-7" />
                            </div>
                          );
                        })}
                      </div>

                      {/* Brand Names Label */}
                      <div className="pl-1">
                        <div className="flex flex-wrap items-center gap-1.5">
                          {brandItems.map((logoItem, idx) => (
                            <span
                              key={idx}
                              className="text-[11px] font-bold text-foreground/90 bg-surface px-2 py-0.5 rounded-md border border-border/60"
                            >
                              {logoItem.name}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Technology Main Title */}
                    <h2 className="mt-5 font-display text-2xl font-bold tracking-tight text-foreground group-hover:text-primary transition-colors">
                      {item.name}
                    </h2>

                    {/* Description */}
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground font-normal">
                      {item.description}
                    </p>

                    {/* How We Use It (Sleek Terminal/Code Style Callout) */}
                    <div className="mt-5 rounded-xl border border-border/60 bg-surface/80 p-3.5">
                      <div className="flex items-center gap-1.5 text-[10px] font-bold text-primary uppercase tracking-wider">
                        <Terminal className="h-3 w-3" />
                        <span>How Regal OPs Runs It</span>
                      </div>
                      <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed line-clamp-3">
                        {howToWorkText}
                      </p>
                    </div>
                  </div>

                  {/* Bottom Footer: SLA Metric & Keywords Badges */}
                  <div className="mt-6 pt-4 border-t border-border/50">
                    {/* Live Enterprise SLA Pill */}
                    <div className="flex items-center justify-between text-xs py-1.5 px-3 rounded-lg bg-surface/90 border border-border/40 mb-3">
                      <span className="text-[11px] font-medium text-muted-foreground flex items-center gap-1.5">
                        <Activity className="h-3 w-3 text-emerald-500" />
                        {meta.metric.label}
                      </span>
                      <span className="text-xs font-black text-foreground">
                        {meta.metric.value}
                      </span>
                    </div>

                    {/* Keywords / Tooling Tags */}
                    {item.keywords && (
                      <div className="flex flex-wrap gap-1.5">
                        {item.keywords
                          .split(",")
                          .filter((k: string) => k.trim().length > 0)
                          .map((k: string) => (
                            <span
                              key={k}
                              className="text-[10px] font-medium px-2.5 py-0.5 bg-background text-muted-foreground border border-border/60 rounded-md hover:border-primary/40 hover:text-foreground transition-colors"
                            >
                              {k.trim()}
                            </span>
                          ))}
                      </div>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </Section>

      {/* ==================================================================== */}
      {/* 4. "FULL TOOLCHAIN" SECTION (Re-architected as Brand Logo Matrix)     */}
      {/* ==================================================================== */}
      <section className="border-t border-border bg-gradient-to-b from-surface via-background to-surface py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-primary">
                <Layers className="h-3.5 w-3.5" />
                Comprehensive Matrix
              </div>
              <h2 className="mt-4 font-display text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
                Full Production Toolchain
              </h2>
              <p className="mt-3 text-sm sm:text-base text-muted-foreground max-w-2xl leading-relaxed">
                The certified frameworks, runtimes, clouds, and databases our architects operate in enterprise production environments.
              </p>
            </div>

            {/* Contact / Stack Consultation CTA */}
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-xs font-bold text-primary-foreground shadow-sm transition-all hover:bg-primary/90 hover:shadow-md cursor-pointer whitespace-nowrap self-start md:self-auto"
            >
              Consult On Your Stack
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          {/* High-Fidelity Toolchain Brand Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3.5 sm:gap-4">
            {TOOLCHAIN_ITEMS.map((tool, idx) => {
              const LogoComp = tool.Logo;
              return (
                <div
                  key={idx}
                  className="group relative flex flex-col items-center text-center rounded-xl border border-border/70 bg-card p-4 transition-all duration-200 hover:-translate-y-1 hover:border-primary/40 hover:shadow-md cursor-default"
                >
                  {/* Brand Logo Container */}
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-surface border border-border/50 p-2.5 transition-transform duration-200 group-hover:scale-110">
                    <LogoComp className="h-7 w-7" />
                  </div>

                  {/* Name */}
                  <div className="mt-3 font-bold text-xs text-foreground group-hover:text-primary transition-colors">
                    {tool.name}
                  </div>

                  {/* Category Pill */}
                  <div className="mt-1 text-[10px] font-semibold text-muted-foreground">
                    {tool.category}
                  </div>

                  {/* Short Description */}
                  <div className="mt-1 text-[9px] text-muted-foreground/80 line-clamp-1">
                    {tool.desc}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Database Driven Toolchain Pills */}
          <div className="mt-10 rounded-2xl border border-border/60 bg-surface/60 p-6">
            <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3">
              Registered Architecture Modules ({techList.length})
            </div>
            <div className="flex flex-wrap gap-2">
              {techList.map((tech) => (
                <span
                  key={tech.id}
                  className="inline-flex items-center gap-2 rounded-xl border border-border/80 bg-background px-3.5 py-1.5 text-xs font-semibold text-foreground transition-all hover:border-primary hover:text-primary shadow-xs"
                >
                  <span className="h-2 w-2 rounded-full bg-emerald-500" />
                  {tech.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
