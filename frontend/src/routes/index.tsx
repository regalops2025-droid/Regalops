import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  ShieldCheck,
  Cloud,
  Cpu,
  LineChart,
  Layers,
  Check,
  Globe2,
  BarChart3,
  Users,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Server,
  Database,
  Lock,
  Zap,
  CheckCircle2,
  Clock,
  Award,
  Activity,
  Terminal,
  ChevronDown,
  Code2,
  GitBranch,
  Gauge,
  Workflow,
  HelpCircle,
  Building2,
  CheckCircle,
} from "lucide-react";
import { useState, useEffect } from "react";
import { SiteLayout } from "@/components/site/site-layout";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Regal OPs — High-Performance Cloud, AI & Enterprise Systems" },
      {
        name: "description",
        content:
          "Regal OPs consults, builds, and deploys mission-critical enterprise cloud infrastructure, autonomous AI platforms, and high-velocity engineering pods.",
      },
      { property: "og:title", content: "Regal OPs — Consult, Build, Deploy" },
      {
        property: "og:description",
        content:
          "Enterprise-grade cloud, data, and AI platforms engineered for uptime, scale, and security.",
      },
    ],
  }),
  component: Home,
});

/* -------------------------------------------------------------------------- */
/* Static Data & Constants                                                    */
/* -------------------------------------------------------------------------- */

const clientLogos = [
  { name: "Vanguard Capital", sector: "FinTech", glyph: "VC" },
  { name: "Apollo Health Systems", sector: "Healthcare", glyph: "AH" },
  { name: "Stratos Global Logistics", sector: "Supply Chain", glyph: "SG" },
  { name: "Nexus Energy Grids", sector: "Utilities", glyph: "NE" },
  { name: "Horizon Cloud AI", sector: "Enterprise SaaS", glyph: "HC" },
  { name: "Precision Industrial", sector: "Manufacturing", glyph: "PI" },
];

const techStackMarquee = [
  { name: "Amazon Web Services", category: "Cloud Infrastructure" },
  { name: "Microsoft Azure", category: "Enterprise Cloud" },
  { name: "Google Cloud Platform", category: "AI & BigQuery" },
  { name: "Kubernetes", category: "Container Orchestration" },
  { name: "Apache Kafka", category: "Event Streaming" },
  { name: "Snowflake", category: "Data Warehouse" },
  { name: "PyTorch & AI", category: "Neural Frameworks" },
  { name: "Terraform", category: "Infrastructure as Code" },
  { name: "Docker", category: "Microservices" },
  { name: "PostgreSQL", category: "Relational DB" },
  { name: "React & Next.js", category: "Modern Web" },
  { name: "TypeScript", category: "Type-Safe Systems" },
  { name: "Node.js & Python", category: "Scalable Backends" },
  { name: "Go", category: "High Concurrency" },
  { name: "Redis", category: "In-Memory Caching" },
];

const stats = [
  { value: "500+", label: "Projects Delivered", detail: "Across US, EMEA & APAC", icon: Layers },
  { value: "99.98%", label: "Average Uptime", detail: "Contractual SLA Guarantee", icon: BarChart3 },
  { value: "14", label: "Countries Served", detail: "24/7 Global Follow-the-Sun", icon: Globe2 },
  { value: "220+", label: "Senior Engineers", detail: "Principal Practitioners Only", icon: Users },
];

const showcaseSlides = [
  {
    id: "globe",
    image: "/hero-globe-glow.jpg",
    alt: "Digital Global Infrastructure Network",
    isGlobe: true,
    title: "Global Cloud Mesh",
    subtitle: "High-Availability Multi-Region Network",
    metric: "14 Countries • 99.98% SLA",
  },
  {
    id: "ai-ops",
    image: "/hero-slide-ai.jpg",
    alt: "Enterprise AI Neural Engine & Autonomous Pipeline",
    isGlobe: false,
    title: "Autonomous AI Engine",
    subtitle: "Production LLM & Agent Pipelines",
    metric: "4.8M ops/sec • Sub-12ms Latency",
  },
  {
    id: "cyber-mesh",
    image: "/hero-slide-cyber.jpg",
    alt: "Data Citadel & Cloud Server Mesh Architecture",
    isGlobe: false,
    title: "Zero-Trust Citadel",
    subtitle: "SOC-2 Audited Cloud Security Mesh",
    metric: "100% Audit Compliance",
  },
];

const comparisonMatrix = [
  {
    factor: "Engineering Seniority",
    traditional: "Junior trainees on retainer, billing high hourly blended rates",
    regalops: "100% Senior & Principal practitioners with 8+ years enterprise battle-testing",
  },
  {
    factor: "Time to First Production Code",
    traditional: "8 to 12 weeks of discovery decks, workshops, and bloated requirements docs",
    regalops: "Audited production code and IaC staging deployed in Sprint 1 (within 72 hours)",
  },
  {
    factor: "Architecture & Vendor Lock-in",
    traditional: "Proprietary toolchains that mandate perpetual multi-year consultant dependencies",
    regalops: "Cloud-agnostic, open-standard IaC (Terraform, K8s, Kafka) completely client-owned",
  },
  {
    factor: "Code & IP Ownership",
    traditional: "Ambiguous IP terms and locked custom modules requiring expensive licensing",
    regalops: "100% Client IP ownership from day one, delivered with full tests and operational runbooks",
  },
  {
    factor: "Uptime & Operational SLA",
    traditional: "Best-effort advisory recommendations with zero contractual availability risk",
    regalops: "Contractually backed 99.98% High Availability SLA with 24/7 incident response runbooks",
  },
];

const coreServices = [
  {
    id: 1,
    category: "Cloud & Platform",
    title: "Enterprise Cloud & Replatforming",
    desc: "Migrate legacy monoliths into cloud-native, containerized microservices on AWS, Azure, and GCP with zero customer downtime.",
    icon: Cloud,
    tags: ["AWS / Azure", "Kubernetes", "Zero Downtime"],
    deliverables: ["Strangler Fig migration", "Multi-region failover", "Auto-scaling clusters"],
  },
  {
    id: 2,
    category: "Autonomous AI",
    title: "Autonomous AI & Neural Automation",
    desc: "Production-grade AI agent systems, LLM orchestration, intelligent document pipelines, and real-time inference automation.",
    icon: Cpu,
    tags: ["LLM Agents", "PyTorch", "Model Ops"],
    deliverables: ["Agentic workflows", "RAG & vector databases", "Sub-15ms inference"],
  },
  {
    id: 3,
    category: "Data & Streaming",
    title: "Data Engineering & Streaming Analytics",
    desc: "High-throughput Apache Kafka pipelines, Snowflake warehouses, and sub-second analytical dashboards built for petabyte scale.",
    icon: Database,
    tags: ["Kafka", "Snowflake", "Real-Time ETL"],
    deliverables: ["Distributed streaming", "Data lakehouse topology", "Schema validation"],
  },
  {
    id: 4,
    category: "Cyber Security",
    title: "Cyber Security & Zero Trust Architecture",
    desc: "Enterprise hardening, automated SOC-2 compliance audits, threat modeling, penetration testing, and identity federation.",
    icon: Lock,
    tags: ["Zero Trust", "SOC-2 Type II", "Pen Testing"],
    deliverables: ["Identity federation (OIDC)", "Encrypted data in transit/rest", "Automated SIEM alerts"],
  },
  {
    id: 5,
    category: "DevOps & SRE",
    title: "DevOps & Infrastructure-as-Code",
    desc: "Terraform automation, multi-region CI/CD pipelines, automated canary rollouts, and self-healing Kubernetes clusters.",
    icon: Terminal,
    tags: ["Terraform", "CI/CD", "Site Reliability"],
    deliverables: ["Canary deployments", "Prometheus/Grafana telemetry", "Zero-drift IaC"],
  },
  {
    id: 6,
    category: "Senior Squads",
    title: "Dedicated Senior Engineering Squads",
    desc: "Pre-vetted senior technologists and principal engineers deployed into high-impact cross-functional pods within 72 hours.",
    icon: Users,
    tags: ["Full-Time Staff", "Staff Augmentation", "SLA Backed"],
    deliverables: ["Embedded in your Slack/Teams", "Daily async updates", "Zero recruitment overhead"],
  },
];

const architectureLayers = [
  {
    id: "edge",
    number: "01",
    name: "Edge & Multi-Cloud Ingress",
    badge: "GLOBAL ANYCAST",
    desc: "Global CDN routing, DDoS mitigation, and Cloudflare Zero Trust gateway directing traffic to multi-region cloud clusters with sub-10ms edge latency.",
    specs: ["Cloudflare Enterprise / AWS Route 53", "WAF & Bot Mitigation Active", "SSL/TLS 1.3 Termination", "Sub-10ms First Byte Latency"],
    status: "HEALTHY • 99.99%",
  },
  {
    id: "streaming",
    number: "02",
    name: "Event Mesh & Streaming Core",
    badge: "1.2M EVENTS/SEC",
    desc: "Distributed Apache Kafka and Redis cluster ingesting high-frequency transactional events, audit logs, and telemetry with guaranteed delivery.",
    specs: ["Apache Kafka 3.6 Event Mesh", "Partitioned Multi-AZ Replication", "Schema Registry with Avro", "Sub-5ms Message Latency"],
    status: "STREAMING • OPTIMAL",
  },
  {
    id: "compute",
    number: "03",
    name: "Autonomous AI & Microservice Mesh",
    badge: "SELF-HEALING K8S",
    desc: "Containerized Go, Node, and Python services running on auto-scaling EKS/AKS clusters, integrated with real-time neural inference workers.",
    specs: ["Kubernetes 1.30+ Auto-scaling Pods", "PyTorch & TensorRT Inference", "gRPC Internal Communication", "Zero-Downtime Rolling Canaries"],
    status: "AUTONOMOUS • 120 NODES",
  },
  {
    id: "storage",
    number: "04",
    name: "Audited Data Citadel & Cold Storage",
    badge: "SOC-2 TYPE II",
    desc: "Snowflake data warehouse, encrypted PostgreSQL clusters, and immutable S3 audit vaults adhering to stringent banking and healthcare compliance.",
    specs: ["PostgreSQL HA with Read Replicas", "Snowflake Petabyte Analytical Engine", "AES-256 GCM Client Encryption", "Immutable Append-Only Audit Logs"],
    status: "ENCRYPTED • COMPLIANT",
  },
];

const methodologySteps = [
  {
    number: "01",
    phase: "Architecture Audit",
    title: "Discovery & Topology Audit",
    desc: "Deep-dive analysis of your current infrastructure, security posture, bottlenecks, and dependencies to formulate a concrete blueprint.",
    timeframe: "Days 1 – 3",
  },
  {
    number: "02",
    phase: "Zero-Downtime Foundation",
    title: "Infrastructure as Code",
    desc: "Automated Terraform provisioning, CI/CD pipeline establishment, and sandbox staging environments with complete telemetry.",
    timeframe: "Week 1",
  },
  {
    number: "03",
    phase: "Agile Pod Execution",
    title: "Iterative Sprint Delivery",
    desc: "Senior engineering pods deliver tested, production-ready micro-releases with automated unit, integration, and load tests.",
    timeframe: "Weeks 2 – 8",
  },
  {
    number: "04",
    phase: "Handover & 24/7 Operations",
    title: "Runbooks & Operational SLA",
    desc: "Complete documentation, operational runbooks, knowledge transfer workshops, and 24/7 monitoring SLA handover.",
    timeframe: "Continuous",
  },
];

const cases = [
  {
    sector: "Banking & Fintech",
    title: "Core Replatform with Zero Outage",
    result: "14-year-old banking monolith split into 9 resilient microservices. Deployment release cycle cut from 6 weeks down to 48 hours with 100% data fidelity.",
    metric: "6 wks → 2 days",
    metricLabel: "Release Velocity",
    tag: "Tier 1 Regional Bank",
  },
  {
    sector: "Healthcare Systems",
    title: "Unified Patient Data Platform",
    result: "Consolidated 41 disparate clinical hospital source systems into an audited, HIPAA-compliant real-time data warehouse with instant query capabilities.",
    metric: "9 hrs → 4 min",
    metricLabel: "Clinician Query Latency",
    tag: "Apollo Healthcare Systems",
  },
  {
    sector: "Industrial Manufacturing",
    title: "Predictive IoT Line Maintenance",
    result: "High-frequency telemetry ingestion across 38 manufacturing facilities, predicting hardware failures and reducing unplanned assembly line stoppages by 27%.",
    metric: "-27%",
    metricLabel: "Unplanned Stoppages",
    tag: "Global Auto Parts Manufacturer",
  },
];

const testimonials = [
  {
    quote: "Regal OPs replatformed a 14-year-old core banking system without a single customer-visible outage. Their senior engineering caliber is unmatched across the industry.",
    author: "Marcus Vance",
    role: "Chief Technology Officer",
    org: "Tier 1 Regional Bank",
    highlight: "Zero Customer Outage",
  },
  {
    quote: "The patient data consolidation reduced our clinician report query latency from hours to minutes. Regal OPs delivered clean, audited code ahead of schedule.",
    author: "Dr. Elena Rostova",
    role: "Chief Information Officer",
    org: "Apollo Healthcare Systems",
    highlight: "Delivered Ahead of Schedule",
  },
  {
    quote: "Their predictive maintenance algorithms saved us millions in unplanned downtime in year one. A team of true senior practitioners who execute with extreme precision.",
    author: "David Chen",
    role: "VP of Engineering & IoT",
    org: "Precision Industrial Corp",
    highlight: "Millions Saved in Year 1",
  },
];

const faqs = [
  {
    question: "How quickly can Regal OPs mobilize a senior engineering squad?",
    answer: "Our pre-vetted senior technologists and principal practitioners can be onboarded and active in your codebase within 72 hours. We integrate directly into your Jira, GitHub, and Slack workflows with zero administrative friction.",
  },
  {
    question: "What compliance standards and security certifications do your architectures adhere to?",
    answer: "All production systems engineered by Regal OPs follow Zero-Trust principles and are built to withstand SOC-2 Type II, ISO 27001, HIPAA, and PCI-DSS compliance audits. We automate policy enforcement via Terraform Sentinel and Open Policy Agent.",
  },
  {
    question: "Who retains ownership of the code, infrastructure templates, and IP?",
    answer: "You do — 100%. Everything we write (source code, Terraform manifests, CI/CD scripts, documentation, and operational runbooks) is committed directly to your enterprise repositories and owned exclusively by your organization.",
  },
  {
    question: "How do you guarantee zero downtime during complex legacy migrations?",
    answer: "We employ proven architectural patterns including the Strangler Fig approach, blue-green deployments, canary rollouts, and dual-write shadow pipelines. User traffic is only switched over after automated load testing proves complete functional and performance parity.",
  },
  {
    question: "What is your ongoing operational SLA once systems go live?",
    answer: "We back our enterprise platforms with a contractually bound 99.98% High Availability SLA. We provide 24/7 follow-the-sun incident response runbooks, automated alerting, and dedicated Site Reliability Engineers to ensure continuous uptime.",
  },
];

/* -------------------------------------------------------------------------- */
/* Main Component                                                             */
/* -------------------------------------------------------------------------- */

function parseArrayField(val: any): string[] {
  if (!val) return [];
  if (Array.isArray(val)) return val;
  if (typeof val === "string") {
    try {
      const trimmed = val.trim();
      if (trimmed.startsWith("[")) {
        const parsed = JSON.parse(trimmed);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch {}
    return val
      .split(/[,\n]/)
      .map((s: string) => s.trim())
      .filter(Boolean);
  }
  return [];
}

function Home() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [selectedPracticeCategory, setSelectedPracticeCategory] = useState("All");
  const [activeArchLayer, setActiveArchLayer] = useState("edge");
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [solutions, setSolutions] = useState<any[]>([]);

  // Auto-play background carousel rotation every 5.5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % showcaseSlides.length);
    }, 5500);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    fetch("/api/solutions")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setSolutions(data);
        }
      })
      .catch((err) => console.error("Failed to fetch solutions", err));
  }, []);

  const displaySolutions = solutions.length > 0 ? solutions : coreServices;

  const filteredSolutions =
    selectedPracticeCategory === "All"
      ? displaySolutions
      : displaySolutions.filter((item) =>
          item.category
            ? item.category.toLowerCase().includes(selectedPracticeCategory.toLowerCase())
            : true
        );

  const categories = ["All", "Cloud & Platform", "Autonomous AI", "Data & Streaming", "Cyber Security", "DevOps & SRE"];

  const currentArch = architectureLayers.find((l) => l.id === activeArchLayer) || architectureLayers[0];

  return (
    <SiteLayout>
      {/* ==================================================================== */}
      {/* 1. HERO SECTION WITH BACKGROUND CAROUSEL & ROTATION EFFECTS           */}
      {/* ==================================================================== */}
      <section className="relative overflow-hidden bg-[#fafcfb] border-b border-neutral-200/60 pt-4 pb-8 sm:pt-6 sm:pb-10 lg:pt-8 lg:pb-12 min-h-[580px] lg:min-h-[620px] flex flex-col justify-between">
        
        {/* Full-bleed Background Carousel Layer */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          {showcaseSlides.map((slide, idx) => {
            const isActive = idx === activeSlide;
            return (
              <div
                key={slide.id}
                className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                  isActive ? "opacity-100" : "opacity-0"
                }`}
              >
                {/* Visual positioned seamlessly on the right side of the background */}
                <div className="absolute right-0 top-0 bottom-0 w-full lg:w-[60%] xl:w-[55%] overflow-hidden">
                  <img
                    src={slide.image}
                    alt={slide.alt}
                    className={`h-full w-full object-cover object-center ${
                      slide.isGlobe ? "animate-globe-pulse" : "scale-100"
                    }`}
                  />

                  {/* Rotating 3D Orbital Rings & Radar Scanner when globe slide is active */}
                  {slide.isGlobe && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      {/* Outer spinning dashed ring */}
                      <div className="h-[80%] w-[80%] max-h-[520px] max-w-[520px] rounded-full border border-cyan-400/30 border-dashed animate-spin-slow" />
                      {/* Inner counter-rotating ring with glowing satellite nodes */}
                      <div className="absolute h-[66%] w-[66%] max-h-[430px] max-w-[430px] rounded-full border border-emerald-400/25 border-dotted animate-spin-reverse-slow">
                        <div className="absolute -top-1.5 left-1/2 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-cyan-400 shadow-[0_0_10px_#22d3ee]" />
                        <div className="absolute -bottom-1.5 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-emerald-300 shadow-[0_0_8px_#6ee7b7]" />
                      </div>
                      {/* Rotating radar scan sweep */}
                      <div className="absolute h-[58%] w-[58%] max-h-[380px] max-w-[380px] rounded-full bg-gradient-to-tr from-cyan-400/15 via-transparent to-transparent animate-spin-slow opacity-60" />
                    </div>
                  )}

                  {/* Soft edge fade for natural blending with background */}
                  <div className="absolute inset-0 bg-gradient-to-r from-[#fafcfb] via-transparent to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#fafcfb] via-transparent to-transparent opacity-50" />
                </div>
              </div>
            );
          })}

          {/* Organic Emerald Ribbon layer along bottom right */}
          <img
            src="/hero-ribbon-bg.jpg"
            alt="Fluid emerald waves"
            className="absolute -right-10 bottom-0 h-full w-[80%] max-w-[1000px] object-cover object-right-bottom opacity-70 mix-blend-multiply pointer-events-none"
          />

          {/* High contrast gradient mask for foreground content readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#fafcfb] via-[#fafcfb]/95 via-45% to-transparent lg:w-[65%]" />
          <div className="absolute -top-24 left-1/4 h-80 w-80 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />
        </div>

        {/* Foreground Content */}
        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-8 xl:col-span-7">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-700/20 bg-emerald-50/80 px-3 py-1 text-[10px] sm:text-[11px] font-bold tracking-[0.14em] text-emerald-800 uppercase backdrop-blur-sm shadow-xs">
                <span className="relative flex h-2 w-2 items-center justify-center">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-600" />
                </span>
                Engineering partner since 2011
              </div>

              {/* Main Headline */}
              <h1 className="mt-3.5 text-3xl sm:text-4xl lg:text-[2.85rem] xl:text-[3.25rem] font-bold tracking-tight text-neutral-900 leading-[1.08]">
                Systems that stay<br />
                up when<br />
                <span className="bg-gradient-to-r from-[#115e34] via-[#2f6f32] to-[#738228] bg-clip-text text-transparent">
                  everything scales
                </span>
              </h1>

              {/* Paragraph */}
              <p className="mt-3 sm:mt-3.5 max-w-xl text-sm sm:text-[15px] leading-relaxed text-neutral-600">
                At Regal OPs, we help organizations accelerate digital transformation through innovative IT solutions, AI-driven automation, and specialized technology staffing across North America and global markets.
              </p>

              {/* Action Buttons */}
              <div className="mt-5 sm:mt-6 flex flex-wrap items-center gap-3">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 rounded-full bg-[#13502c] hover:bg-[#0e3f22] px-6 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold text-white shadow-md shadow-emerald-950/15 hover:shadow-lg hover:shadow-emerald-950/25 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
                >
                  Talk to an engineer <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  to="/solutions"
                  className="inline-flex items-center gap-2 rounded-full border border-neutral-300 hover:border-emerald-700/50 bg-white/80 hover:bg-white px-6 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold text-neutral-800 shadow-xs hover:shadow-sm hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
                >
                  Explore solutions <ArrowRight className="h-4 w-4 text-neutral-500" />
                </Link>
              </div>

              {/* Trust Sub-guarantees */}
              <div className="mt-4 flex flex-wrap items-center gap-4 text-[11px] font-medium text-neutral-500">
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" /> 99.98% High Availability SLA
                </span>
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" /> Zero-Outage Migrations
                </span>
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" /> 72-Hour Pod Mobilization
                </span>
              </div>
            </div>

            {/* Right Side: Seamless Background Carousel Controller */}
            <div className="lg:col-span-4 xl:col-span-5 flex flex-col items-start lg:items-end justify-center">
              {/* Carousel Navigation Pill */}
              <div className="flex flex-col items-end gap-2">
                <div className="flex items-center gap-3 rounded-full bg-white/85 backdrop-blur-md px-4 py-2 border border-white/90 shadow-[0_8px_25px_rgba(16,80,45,0.08)]">
                  <button
                    type="button"
                    onClick={() => setActiveSlide((prev) => (prev - 1 + showcaseSlides.length) % showcaseSlides.length)}
                    className="p-1 text-neutral-600 hover:text-emerald-700 transition-colors cursor-pointer"
                    aria-label="Previous slide"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>

                  <div className="flex items-center gap-1.5">
                    {showcaseSlides.map((slide, i) => (
                      <button
                        key={slide.id}
                        type="button"
                        onClick={() => setActiveSlide(i)}
                        className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                          i === activeSlide
                            ? "w-6 bg-emerald-600 shadow-[0_0_8px_rgba(5,150,105,0.4)]"
                            : "w-2 bg-neutral-300 hover:bg-neutral-400"
                        }`}
                        aria-label={`Go to slide ${i + 1}`}
                      />
                    ))}
                  </div>

                  <span className="text-[11px] font-bold text-neutral-700 tracking-wider">
                    0{activeSlide + 1} / 0{showcaseSlides.length}
                  </span>

                  <button
                    type="button"
                    onClick={() => setActiveSlide((prev) => (prev + 1) % showcaseSlides.length)}
                    className="p-1 text-neutral-600 hover:text-emerald-700 transition-colors cursor-pointer"
                    aria-label="Next slide"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>

                {/* Active Slide Label Micro-pill */}
                <div className="hidden sm:inline-flex items-center gap-2 rounded-full bg-white/70 backdrop-blur-sm px-3 py-1 border border-white/80 shadow-xs text-[10px] text-neutral-600">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="font-bold text-neutral-900">{showcaseSlides[activeSlide].title}</span>
                  <span className="text-neutral-400">•</span>
                  <span>{showcaseSlides[activeSlide].metric}</span>
                </div>
              </div>
            </div>

          </div>

          {/* Bottom Overlapping Frosted Glass Stats Card */}
          <div className="mt-8 sm:mt-10">
            <div className="rounded-2xl border border-white/80 bg-white/80 p-3.5 sm:p-4.5 shadow-[0_12px_30px_rgba(16,80,45,0.06)] backdrop-blur-xl max-w-4xl">
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 sm:divide-x sm:divide-neutral-200/70">
                {stats.map((s) => {
                  const Icon = s.icon;
                  return (
                    <div key={s.label} className="flex items-center gap-2.5 sm:px-3 first:sm:pl-1">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-100/60">
                        <Icon className="h-4 w-4 sm:h-4.5 sm:w-4.5" />
                      </div>
                      <div>
                        <div className="font-display text-lg sm:text-xl font-extrabold text-neutral-900 tracking-tight leading-none">
                          {s.value}
                        </div>
                        <div className="mt-1 text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-neutral-500 leading-tight">
                          {s.label}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ==================================================================== */}
      {/* 2. ENTERPRISE CLIENT TRUST STRIP                                     */}
      {/* ==================================================================== */}
      <section className="border-b border-neutral-200/60 bg-white py-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="shrink-0">
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-neutral-400">
                Trusted by Engineering Leaders at
              </p>
            </div>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-6 items-center w-full">
              {clientLogos.map((client) => (
                <div
                  key={client.name}
                  className="flex flex-col items-center justify-center p-2 rounded-xl transition-all duration-200 hover:bg-neutral-50 group"
                >
                  <div className="flex items-center gap-1.5">
                    <span className="flex h-6 w-6 items-center justify-center rounded-md bg-neutral-900 text-white font-mono text-[9px] font-bold group-hover:bg-emerald-700 transition-colors">
                      {client.glyph}
                    </span>
                    <span className="text-xs font-bold text-neutral-800 tracking-tight whitespace-nowrap group-hover:text-emerald-900 transition-colors">
                      {client.name}
                    </span>
                  </div>
                  <span className="text-[9px] font-medium text-neutral-400 uppercase tracking-wider mt-0.5">
                    {client.sector}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================================== */}
      {/* 3. ENTERPRISE TECH STACK INFINITE MARQUEE                             */}
      {/* ==================================================================== */}
      <section className="border-b border-neutral-200/70 bg-[#fafcfb] py-5 overflow-hidden">
        <div className="relative w-full overflow-hidden flex items-center">
          <div className="flex items-center gap-4 whitespace-nowrap animate-marquee">
            {[...techStackMarquee, ...techStackMarquee].map((tech, idx) => (
              <div
                key={idx}
                className="inline-flex items-center gap-2.5 rounded-full border border-neutral-200/80 bg-white px-4 py-2 text-xs font-semibold text-neutral-700 hover:border-emerald-600/40 hover:bg-emerald-50/40 hover:text-emerald-900 transition-colors shadow-2xs"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                <span>{tech.name}</span>
                <span className="text-[10px] font-medium text-neutral-400">({tech.category})</span>
              </div>
            ))}
          </div>
          {/* Subtle gradient fades on edges */}
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#fafcfb] to-transparent" />
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#fafcfb] to-transparent" />
        </div>
      </section>

      {/* ==================================================================== */}
      {/* 4. ABOUT REGAL OPS — "SENIOR ENGINEERING, QUIETLY DELIVERED"         */}
      {/* ==================================================================== */}
      <section className="border-b border-neutral-200/70 bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-700/20 bg-emerald-50 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-emerald-800">
                About Regal OPs
              </span>
              <h2 className="mt-4 text-3xl sm:text-4xl lg:text-[2.65rem] font-bold tracking-tight text-neutral-900 leading-tight">
                Senior Engineering, Quietly Delivered
              </h2>
              <p className="mt-5 text-base sm:text-lg leading-relaxed text-neutral-600">
                Regal OPs is a specialized engineering practice and technology consultancy. Since 2011, we have partnered with enterprises across financial services, healthcare, and industrial manufacturing to solve high-stakes architecture and scalability challenges.
              </p>

              {/* Key Pillars */}
              <div className="mt-8 space-y-4">
                <div className="flex items-start gap-3.5">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-emerald-100/70 text-emerald-800 mt-0.5">
                    <CheckCircle2 className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-neutral-900">Zero Technical Debt Delivery</h3>
                    <p className="mt-0.5 text-xs sm:text-sm text-neutral-500 leading-relaxed">
                      Every engagement delivers audited code, automated tests, full documentation, and operational runbooks.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-emerald-100/70 text-emerald-800 mt-0.5">
                    <CheckCircle2 className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-neutral-900">Senior-Only Engineering Squads</h3>
                    <p className="mt-0.5 text-xs sm:text-sm text-neutral-500 leading-relaxed">
                      No junior trainees on retainer. You collaborate directly with principal architects and seasoned practitioners.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-emerald-100/70 text-emerald-800 mt-0.5">
                    <CheckCircle2 className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-neutral-900">Follow-The-Sun Global Delivery</h3>
                    <p className="mt-0.5 text-xs sm:text-sm text-neutral-500 leading-relaxed">
                      Continuous 24/7 delivery across North America and international tech hubs ensuring rapid deployment velocity.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex items-center gap-4">
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 rounded-full bg-[#13502c] hover:bg-[#0e3f22] px-6 py-3 text-sm font-semibold text-white shadow-md shadow-emerald-950/15 hover:shadow-lg transition-all"
                >
                  Learn more about us <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 rounded-full border border-neutral-300 px-6 py-3 text-sm font-semibold text-neutral-800 hover:bg-neutral-50 transition-colors"
                >
                  Meet our leadership
                </Link>
              </div>
            </div>

            {/* Right Architecture Metrics Showcase */}
            <div className="lg:col-span-5">
              <div className="rounded-3xl border border-neutral-200/80 bg-white p-6 sm:p-8 shadow-xl shadow-neutral-950/5 relative overflow-hidden">
                <div className="absolute top-0 right-0 h-40 w-40 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />
                
                <div className="flex items-center justify-between border-b border-neutral-100 pb-5">
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wider text-emerald-800">Operational SLA</div>
                    <div className="text-2xl font-extrabold text-neutral-900">99.98% High Availability</div>
                  </div>
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
                    <Activity className="h-5 w-5" />
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-4">
                  <div className="rounded-2xl border border-neutral-100 bg-neutral-50/70 p-4 hover:border-emerald-600/30 transition-colors">
                    <div className="font-display text-3xl font-extrabold text-emerald-800">15+</div>
                    <div className="mt-1 text-xs font-bold text-neutral-900">Years Experience</div>
                    <div className="mt-0.5 text-[11px] text-neutral-500">Battle-tested since 2011</div>
                  </div>

                  <div className="rounded-2xl border border-neutral-100 bg-neutral-50/70 p-4 hover:border-emerald-600/30 transition-colors">
                    <div className="font-display text-3xl font-extrabold text-emerald-800">0</div>
                    <div className="mt-1 text-xs font-bold text-neutral-900">Customer Outages</div>
                    <div className="mt-0.5 text-[11px] text-neutral-500">Across 14 core migrations</div>
                  </div>

                  <div className="rounded-2xl border border-neutral-100 bg-neutral-50/70 p-4 hover:border-emerald-600/30 transition-colors">
                    <div className="font-display text-3xl font-extrabold text-emerald-800">220+</div>
                    <div className="mt-1 text-xs font-bold text-neutral-900">Senior Technologists</div>
                    <div className="mt-0.5 text-[11px] text-neutral-500">Full-time experts on staff</div>
                  </div>

                  <div className="rounded-2xl border border-neutral-100 bg-neutral-50/70 p-4 hover:border-emerald-600/30 transition-colors">
                    <div className="font-display text-3xl font-extrabold text-emerald-800">100%</div>
                    <div className="mt-1 text-xs font-bold text-neutral-900">Audit Compliance</div>
                    <div className="mt-0.5 text-[11px] text-neutral-500">SOC-2 & ISO standards</div>
                  </div>
                </div>

                <div className="mt-6 rounded-2xl bg-neutral-900 p-4 text-white flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-xs font-mono text-neutral-300">SYSTEMS HEALTH: OPTIMAL</span>
                  </div>
                  <span className="text-[11px] font-mono text-emerald-400">LATENCY: 1.2ms</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ==================================================================== */}
      {/* 5. WHY REGAL OPS — EXECUTIVE COMPARISON MATRIX                        */}
      {/* ==================================================================== */}
      <section className="border-b border-neutral-200/70 bg-[#fafcfb] py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-700/20 bg-emerald-50 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-emerald-800">
              The Engineering Difference
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900">
              Why Enterprise Leaders Choose Regal OPs
            </h2>
            <p className="mt-3 text-base text-neutral-600">
              A direct comparison between traditional Big-4 IT staff augmentation and our dedicated, senior-only engineering squads.
            </p>
          </div>

          <div className="mt-12 overflow-hidden rounded-3xl border border-neutral-200/80 bg-white shadow-xl shadow-neutral-950/5">
            <div className="grid grid-cols-1 md:grid-cols-12 divide-y md:divide-y-0 md:divide-x divide-neutral-200/80">
              
              {/* Header Titles */}
              <div className="col-span-12 grid grid-cols-1 md:grid-cols-12 bg-neutral-50/80 p-4 sm:p-5 border-b border-neutral-200/80 text-xs font-bold uppercase tracking-wider text-neutral-500">
                <div className="md:col-span-3">Strategic Criteria</div>
                <div className="hidden md:block md:col-span-4 text-neutral-500">Traditional IT / Big 4 Staffing</div>
                <div className="hidden md:block md:col-span-5 text-emerald-800 flex items-center gap-1.5">
                  <Sparkles className="h-3.5 w-3.5 text-emerald-600" /> Regal OPs Dedicated Pods
                </div>
              </div>

              {/* Rows */}
              {comparisonMatrix.map((item, idx) => (
                <div
                  key={item.factor}
                  className={`col-span-12 grid grid-cols-1 md:grid-cols-12 p-5 sm:p-6 items-center gap-3 md:gap-4 transition-colors hover:bg-neutral-50/40 ${
                    idx !== comparisonMatrix.length - 1 ? "border-b border-neutral-100" : ""
                  }`}
                >
                  <div className="md:col-span-3">
                    <span className="text-sm font-bold text-neutral-900">{item.factor}</span>
                  </div>
                  
                  <div className="md:col-span-4 flex items-start gap-2.5 text-xs text-neutral-500 leading-relaxed">
                    <div className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-neutral-200 text-neutral-600 font-bold text-[10px]">
                      ✕
                    </div>
                    <span>{item.traditional}</span>
                  </div>

                  <div className="md:col-span-5 flex items-start gap-2.5 text-xs font-medium text-emerald-950 leading-relaxed bg-emerald-50/50 p-2.5 rounded-xl border border-emerald-100/60">
                    <div className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-white font-bold text-[10px]">
                      ✓
                    </div>
                    <span>{item.regalops}</span>
                  </div>
                </div>
              ))}

            </div>
          </div>
        </div>
      </section>

      {/* ==================================================================== */}
      {/* 6. CORE PRACTICES & CAPABILITIES GRID WITH CATEGORY FILTER           */}
      {/* ==================================================================== */}
      <section className="border-b border-neutral-200/70 bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 max-w-7xl">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-700/20 bg-emerald-50 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-emerald-800">
                Core Capabilities
              </span>
              <h2 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900">
                Solutions Built for Mission-Critical Scale
              </h2>
              <p className="mt-3 text-base text-neutral-600 max-w-2xl">
                Six core practices, one unified delivery standard. Every engagement ships with production runbooks, automated test suites, and strict SLA commitments.
              </p>
            </div>

            {/* Filter Pills */}
            <div className="flex flex-wrap items-center gap-1.5 p-1 bg-neutral-100/80 rounded-full border border-neutral-200/80 self-start md:self-auto">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedPracticeCategory(cat)}
                  className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all cursor-pointer ${
                    selectedPracticeCategory === cat
                      ? "bg-white text-emerald-900 shadow-xs"
                      : "text-neutral-600 hover:text-neutral-900"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredSolutions.map((item, idx) => {
              const defaultIcons = [Cloud, Cpu, Database, Lock, Terminal, Users];
              const ServiceIcon = item.icon || defaultIcons[idx % defaultIcons.length];
              return (
                <Link
                  key={item.id || idx}
                  to="/solutions"
                  className="group relative flex flex-col justify-between rounded-3xl border border-neutral-200/80 bg-white p-7 transition-all duration-300 hover:-translate-y-1.5 hover:border-emerald-600/40 hover:shadow-xl hover:shadow-emerald-950/5 cursor-pointer overflow-hidden"
                >
                  <div className="relative z-10">
                    <div className="flex items-center justify-between">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-800 border border-emerald-100 group-hover:bg-emerald-600 group-hover:text-white transition-colors duration-300">
                        <ServiceIcon className="h-6 w-6" />
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">
                        {item.category || "Practice Area"}
                      </span>
                    </div>

                    <h3 className="mt-5 text-lg font-bold text-neutral-900 group-hover:text-emerald-800 transition-colors">
                      {item.title || item.name}
                    </h3>
                    <p className="mt-2.5 text-xs sm:text-sm leading-relaxed text-neutral-500">
                      {item.desc || item.description}
                    </p>

                    {/* Specific Deliverables with Checkmarks */}
                    {(() => {
                      const deliverablesList = parseArrayField(item.deliverables);
                      if (deliverablesList.length === 0) return null;
                      return (
                        <div className="mt-4 space-y-1.5 pt-3 border-t border-neutral-100">
                          {deliverablesList.slice(0, 3).map((del: string) => (
                            <div key={del} className="flex items-center gap-2 text-[11px] text-neutral-600">
                              <Check className="h-3 w-3 text-emerald-600 shrink-0" />
                              <span>{del}</span>
                            </div>
                          ))}
                        </div>
                      );
                    })()}

                    {(() => {
                      const tagsList = parseArrayField(item.tags || item.technologies);
                      if (tagsList.length === 0) return null;
                      return (
                        <div className="mt-4 flex flex-wrap gap-1.5">
                          {tagsList.slice(0, 4).map((tag: string) => (
                            <span
                              key={tag}
                              className="rounded-md bg-neutral-100 px-2 py-0.5 text-[10px] font-semibold text-neutral-600 group-hover:bg-emerald-50 group-hover:text-emerald-800 transition-colors"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      );
                    })()}
                  </div>

                  <div className="mt-6 flex items-center justify-between text-xs font-bold text-emerald-800 group-hover:text-emerald-700 transition-colors pt-4 border-t border-neutral-100">
                    <span>Explore practice</span>
                    <ArrowRight className="h-3.5 w-3.5 -translate-x-1 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-200" />
                  </div>

                  {/* Hover bottom accent highlight line */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-600 to-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ==================================================================== */}
      {/* 7. INTERACTIVE ARCHITECTURE BLUEPRINT & TOPOLOGY SHOWCASE            */}
      {/* ==================================================================== */}
      <section className="border-b border-neutral-200/70 bg-[#fafcfb] py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-700/20 bg-emerald-50 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-emerald-800">
              Interactive Blueprint
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900">
              The Regal OPs Production Topology
            </h2>
            <p className="mt-3 text-base text-neutral-600">
              Click through the architectural layers of our resilient, audited enterprise platform foundation.
            </p>
          </div>

          <div className="mt-12 grid gap-8 lg:grid-cols-12 items-start">
            
            {/* Left Layer Selectors */}
            <div className="lg:col-span-5 space-y-3">
              {architectureLayers.map((layer) => {
                const isSelected = layer.id === activeArchLayer;
                return (
                  <button
                    key={layer.id}
                    type="button"
                    onClick={() => setActiveArchLayer(layer.id)}
                    className={`w-full text-left p-5 rounded-2xl border transition-all duration-200 cursor-pointer flex items-center justify-between ${
                      isSelected
                        ? "bg-white border-emerald-600/40 shadow-lg shadow-emerald-950/5 ring-1 ring-emerald-600/20"
                        : "bg-white/60 border-neutral-200/80 hover:bg-white hover:border-neutral-300"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <span className={`font-mono text-sm font-bold ${isSelected ? "text-emerald-700" : "text-neutral-400"}`}>
                        {layer.number}
                      </span>
                      <div>
                        <div className="text-sm font-bold text-neutral-900">{layer.name}</div>
                        <div className="text-[11px] font-mono font-medium text-emerald-700 mt-0.5">
                          {layer.badge}
                        </div>
                      </div>
                    </div>
                    <ArrowRight className={`h-4 w-4 transition-transform ${isSelected ? "text-emerald-700 translate-x-1" : "text-neutral-300"}`} />
                  </button>
                );
              })}
            </div>

            {/* Right Live Layer Console HUD */}
            <div className="lg:col-span-7">
              <div className="rounded-3xl border border-neutral-200/80 bg-neutral-950 text-white p-7 sm:p-8 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 h-64 w-64 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />

                {/* HUD Header */}
                <div className="flex items-center justify-between border-b border-neutral-800 pb-5">
                  <div className="flex items-center gap-2.5">
                    <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="font-mono text-xs text-neutral-400">LAYER {currentArch.number} TOPOLOGY</span>
                  </div>
                  <span className="font-mono text-[11px] px-2.5 py-1 rounded-md bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    {currentArch.status}
                  </span>
                </div>

                {/* Content */}
                <div className="mt-6">
                  <div className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                    {currentArch.name}
                  </div>
                  <p className="mt-3 text-sm text-neutral-300 leading-relaxed">
                    {currentArch.desc}
                  </p>

                  <div className="mt-6 pt-5 border-t border-neutral-800">
                    <div className="text-xs font-mono font-semibold uppercase tracking-wider text-neutral-400 mb-3">
                      Standard Technical Specifications
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {currentArch.specs.map((spec) => (
                        <div key={spec} className="flex items-center gap-2 rounded-xl bg-neutral-900/80 p-3 border border-neutral-800 text-xs text-neutral-200">
                          <Check className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                          <span>{spec}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 pt-5 border-t border-neutral-800 flex items-center justify-between text-xs font-mono text-neutral-400">
                    <span>DEPLOYMENT: IAC TERRAFORM v1.9</span>
                    <Link
                      to="/solutions"
                      className="text-emerald-400 hover:text-emerald-300 font-bold flex items-center gap-1"
                    >
                      View Architecture Docs →
                    </Link>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ==================================================================== */}
      {/* 8. DELIVERY METHODOLOGY (4-PHASE FRAMEWORK)                           */}
      {/* ==================================================================== */}
      <section className="border-b border-neutral-200/70 bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-700/20 bg-emerald-50 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-emerald-800">
              Delivery Methodology
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900">
              Predictable, Audited, Repeatable
            </h2>
            <p className="mt-3 text-base text-neutral-600">
              Our 4-phase framework takes complex enterprise platforms from architecture review to resilient, audited production operations.
            </p>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {methodologySteps.map((step) => (
              <div
                key={step.number}
                className="relative rounded-3xl border border-neutral-200/80 bg-[#fafcfb] p-6 shadow-sm hover:border-emerald-600/30 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-display text-3xl font-extrabold text-emerald-800/25">
                      {step.number}
                    </span>
                    <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-[10px] font-bold text-emerald-800">
                      {step.phase}
                    </span>
                  </div>
                  <h3 className="mt-4 text-base font-bold text-neutral-900">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-neutral-500 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-neutral-200/60 text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-800">
                  {step.timeframe}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================================================================== */}
      {/* 9. AUDITED CASE STUDIES & CLIENT OUTCOMES                             */}
      {/* ==================================================================== */}
      <section className="border-b border-neutral-200/70 bg-[#fafcfb] py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 max-w-2xl">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-700/20 bg-emerald-50 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-emerald-800">
                Case Studies
              </span>
              <h2 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900">
                Work That Holds Up Under Audit
              </h2>
            </div>
            <Link
              to="/clients"
              className="text-sm font-bold text-emerald-800 hover:text-emerald-700 flex items-center gap-1.5 group shrink-0"
            >
              <span>View all client outcomes</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {cases.map((c) => (
              <Link
                key={c.title}
                to="/clients"
                className="group flex flex-col justify-between rounded-3xl border border-neutral-200/80 bg-white p-7 transition-all duration-300 hover:-translate-y-1.5 hover:border-emerald-600/40 hover:shadow-xl hover:shadow-emerald-950/5 cursor-pointer"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800">
                      {c.sector}
                    </span>
                    <span className="rounded-full bg-emerald-100/70 px-2 py-0.5 text-[10px] font-mono font-bold text-emerald-900">
                      VERIFIED OUTCOME
                    </span>
                  </div>

                  <h3 className="mt-4 text-lg font-bold text-neutral-900 group-hover:text-emerald-800 transition-colors">
                    {c.title}
                  </h3>
                  <p className="mt-3 text-xs sm:text-sm leading-relaxed text-neutral-600">
                    {c.result}
                  </p>
                </div>

                <div className="mt-6 pt-5 border-t border-neutral-200/70 flex items-center justify-between">
                  <div>
                    <div className="text-xl font-extrabold text-neutral-900 font-display">
                      {c.metric}
                    </div>
                    <div className="text-[10px] uppercase font-bold text-neutral-400">
                      {c.metricLabel}
                    </div>
                  </div>
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-neutral-100 text-emerald-800 border border-neutral-200 group-hover:bg-emerald-600 group-hover:text-white group-hover:border-transparent transition-all">
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ==================================================================== */}
      {/* 10. EXECUTIVE TESTIMONIALS                                            */}
      {/* ==================================================================== */}
      <section className="border-b border-neutral-200/70 bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-700/20 bg-emerald-50 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-emerald-800">
              Executive Validation
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900">
              Trusted by Engineering Leaders
            </h2>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {testimonials.map((t, idx) => (
              <figure
                key={idx}
                className="flex flex-col justify-between rounded-3xl border border-neutral-200/80 bg-[#fafcfb] p-7 shadow-xs hover:border-emerald-600/30 hover:shadow-md transition-all relative overflow-hidden"
              >
                <div>
                  <div className="flex items-center gap-1 text-emerald-600 mb-3">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span key={star} className="text-sm">★</span>
                    ))}
                    <span className="ml-2 text-[10px] font-bold text-neutral-400 uppercase tracking-wider">
                      {t.highlight}
                    </span>
                  </div>
                  <blockquote className="text-sm sm:text-[15px] italic leading-relaxed text-neutral-700">
                    "{t.quote}"
                  </blockquote>
                </div>

                <div className="mt-6 pt-4 border-t border-neutral-200/60">
                  <figcaption className="text-sm font-bold text-neutral-900">{t.author}</figcaption>
                  <p className="text-xs text-neutral-500 font-medium mt-0.5">{t.role} • {t.org}</p>
                </div>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ==================================================================== */}
      {/* 11. FREQUENTLY ASKED QUESTIONS (C-SUITE ACCORDION)                   */}
      {/* ==================================================================== */}
      <section className="border-b border-neutral-200/70 bg-[#fafcfb] py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-700/20 bg-emerald-50 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-emerald-800">
              Executive FAQ
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900">
              Clear Answers for Leadership
            </h2>
            <p className="mt-3 text-base text-neutral-600">
              Everything you need to know about our engagement models, IP security, and SLA guarantees.
            </p>
          </div>

          <div className="mt-12 space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={faq.question}
                  className="rounded-2xl border border-neutral-200/80 bg-white overflow-hidden shadow-xs transition-colors"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full flex items-center justify-between p-5 sm:p-6 text-left cursor-pointer gap-4"
                  >
                    <span className="text-sm sm:text-base font-bold text-neutral-900">
                      {faq.question}
                    </span>
                    <div className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-neutral-100 text-neutral-700 transition-transform duration-200 ${isOpen ? "rotate-180 bg-emerald-100 text-emerald-800" : ""}`}>
                      <ChevronDown className="h-4 w-4" />
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-5 sm:px-6 pb-6 pt-1 text-xs sm:text-sm text-neutral-600 leading-relaxed border-t border-neutral-100">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ==================================================================== */}
      {/* 12. HIGH-IMPACT CALL TO ACTION BANNER                                 */}
      {/* ==================================================================== */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-neutral-900 via-[#0a311b] to-neutral-950 p-8 sm:p-14 text-white shadow-2xl">
            {/* Ambient Background Glow */}
            <div className="pointer-events-none absolute -right-20 -bottom-20 h-96 w-96 rounded-full bg-emerald-500/20 blur-3xl" />
            <div className="pointer-events-none absolute -left-20 -top-20 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl" />

            <div className="relative z-10 max-w-3xl">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/30 bg-emerald-500/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-emerald-300">
                Ready to Scale?
              </span>
              <h2 className="mt-4 text-3xl sm:text-4xl lg:text-[2.75rem] font-bold tracking-tight text-white leading-tight">
                Start with a High-Impact Technical Conversation
              </h2>
              <p className="mt-4 text-base text-neutral-300 leading-relaxed max-w-2xl">
                Bring your architecture. We will review your topology and tell you candidly what to optimize first — no sales decks required.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 rounded-full bg-emerald-500 hover:bg-emerald-400 px-7 py-3.5 text-sm font-bold text-neutral-950 shadow-lg shadow-emerald-500/25 hover:scale-[1.02] active:scale-[0.98] transition-all"
                >
                  Book an Architecture Consultation <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  to="/solutions"
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 px-6 py-3.5 text-sm font-semibold text-white transition-all backdrop-blur-sm"
                >
                  Explore Solutions Catalog
                </Link>
              </div>

              <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap items-center gap-6 text-xs text-neutral-400">
                <span className="flex items-center gap-1.5">
                  <Check className="h-4 w-4 text-emerald-400" /> NDAs Respected
                </span>
                <span className="flex items-center gap-1.5">
                  <Check className="h-4 w-4 text-emerald-400" /> 48-Hour Response Guarantee
                </span>
                <span className="flex items-center gap-1.5">
                  <Check className="h-4 w-4 text-emerald-400" /> Senior Technologists Only
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
