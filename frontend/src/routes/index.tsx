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
import { AnimatedCounter } from "@/components/ui/animated-counter";

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

const row1Logos = [
  { name: "Apple", logo: "/clients/apple.jpg" },
  { name: "AGCO", logo: "/clients/agco.jpg" },
  { name: "ADT", logo: "/clients/adt.jpg" },
  { name: "Assurant", logo: "/clients/assurant.jpg" },
  { name: "AT&T", logo: "/clients/at-t.jpg" },
  { name: "Capital One", logo: "/clients/capital-one.jpg" },
  { name: "Credit Suisse", logo: "/clients/credit-suisse.jpg" },
  { name: "Cricket Wireless", logo: "/clients/cricket-wireless.jpg" },
];

const midLeftLogos = [
  { name: "US DOT", logo: "/clients/dot-usa.jpg" },
  { name: "DTCC", logo: "/clients/dtcc.jpg" },
  { name: "FedEx", logo: "/clients/fedex.jpg" },
  { name: "FIS", logo: "/clients/fis.jpg" },
  { name: "Highpoint Solutions", logo: "/clients/highpoint-solutions.jpg" },
  { name: "Infosys", logo: "/clients/infosys.jpg" },
];

const midRightLogos = [
  { name: "iVEDiX", logo: "/clients/ivedix.jpg" },
  { name: "Mphasis", logo: "/clients/mphasis.jpg" },
  { name: "Premier", logo: "/clients/premier.jpg" },
  { name: "Socket Mobile", logo: "/clients/socket.jpg" },
  { name: "Synchronoss", logo: "/clients/synchronious.jpg" },
  { name: "Synovus Bank", logo: "/clients/synovus-bank.jpg" },
];

const row4Logos = [
  { name: "TATA Consultancy Services", logo: "/clients/tcs.jpg" },
  { name: "The Economist", logo: "/clients/the-economist.jpg" },
  { name: "T-Mobile", logo: "/clients/tmobile.jpg" },
  { name: "Turner", logo: "/clients/turner.jpg" },
  { name: "VISA", logo: "/clients/visa.jpg" },
  { name: "Wells Fargo", logo: "/clients/wellsfargo.jpg" },
  { name: "Zions Bank", logo: "/clients/zions-bank.jpg" },
  { name: "DTCC", logo: "/clients/dtcc.jpg" },
];

const allClientLogos = [...row1Logos, ...midLeftLogos, ...midRightLogos, ...row4Logos];

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
    id: "awards",
    image: "/hero-slide-1.jpg",
    alt: "Ranked Enterprise Leader - INC 5000 and Industry Recognitions",
    tag: "Recognized Excellence • Inc 5000",
    titlePrefix: "Ranked ",
    titleHighlight: "Top 500 Enterprise Partner",
    titleSuffix: "",
    subtitle: "INC 5000 HONOREE. THE MOST SUCCESSFUL ENTERPRISE CLOUD & AI PRACTICES",
    desc: "Recognized by industry authorities for engineering resilient digital platforms, 99.98% SLA high availability, and transformative AI systems.",
    primaryCta: { text: "Explore Solutions", link: "/solutions" },
    secondaryCta: { text: "View Accreditations", link: "/about" },
  },
  {
    id: "engineering",
    image: "/hero-slide-2.jpg",
    alt: "Cutting-edge customised cloud and application solutions to accelerate your business",
    tag: "Custom Cloud & Digital Engineering",
    titlePrefix: "Cutting-edge customised ",
    titleHighlight: "cloud & application solutions",
    titleSuffix: " to accelerate your business",
    subtitle: "BESPOKE ENTERPRISE ARCHITECTURE & HIGH-VELOCITY SQUADS",
    desc: "We engineer resilient multi-region infrastructure, autonomous intelligence pipelines, and custom enterprise software delivered by senior engineers.",
    primaryCta: { text: "Explore Solutions", link: "/solutions" },
    secondaryCta: { text: "Talk to an engineer", link: "/contact" },
  },
  {
    id: "roi",
    image: "/hero-slide-3.jpg",
    alt: "Are you Investing or Just Spending on IT",
    tag: "Strategic Technology ROI & Growth",
    titlePrefix: "Are you Investing or ",
    titleHighlight: "Just Spending on IT?",
    titleSuffix: "",
    subtitle: "TURN TECHNOLOGY EXPENDITURES INTO COMPOUNDING BUSINESS VALUE",
    desc: "Eliminate cloud waste, streamline operations with automated workflows, and build high-ROI digital assets that drive measurable bottom-line growth.",
    primaryCta: { text: "Explore Solutions", link: "/solutions" },
    secondaryCta: { text: "Calculate IT ROI", link: "/contact" },
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

export function renderServiceIcon(iconKey?: string, title?: string) {
  const key = `${iconKey || ""} ${title || ""}`.toLowerCase();
  if (key.includes("tech") || key.includes("consult")) {
    return (
      <svg className="w-14 h-14 mx-auto group-hover:scale-105 transition-transform duration-300" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="10" y="16" width="44" height="32" rx="4" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="#f8fafc" />
        <path d="M26 48L24 54H40L38 48" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        <line x1="20" y1="54" x2="44" y2="54" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M32 20C32 20 38 23 38 31L35 34L32 32L29 34L26 31C26 23 32 20 32 20Z" stroke="#334155" strokeWidth="2.2" strokeLinejoin="round" fill="#ffffff" />
        <circle cx="32" cy="27" r="2.5" fill="#f97316" />
        <path d="M30 35L32 39L34 35" stroke="#f97316" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M44 24L45 22L46 24L48 25L46 26L45 28L44 26L42 25Z" fill="#0284c7" />
      </svg>
    );
  }
  if (key.includes("bpo") || key.includes("process") || key.includes("outsource")) {
    return (
      <svg className="w-14 h-14 mx-auto group-hover:scale-105 transition-transform duration-300" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M34 16H46C48.2 16 50 17.8 50 20V28C50 30.2 48.2 32 46 32H42L38 36V32H34C31.8 32 30 30.2 30 28V20C30 17.8 31.8 16 34 16Z" stroke="#f97316" strokeWidth="2.2" strokeLinejoin="round" fill="#fff7ed" />
        <circle cx="36" cy="24" r="1.5" fill="#f97316" />
        <circle cx="40" cy="24" r="1.5" fill="#f97316" />
        <circle cx="44" cy="24" r="1.5" fill="#f97316" />
        <circle cx="22" cy="28" r="4.5" stroke="#334155" strokeWidth="2.2" fill="#ffffff" />
        <path d="M14 44C14 38.5 17.5 37 22 37C26.5 37 30 38.5 30 44" stroke="#334155" strokeWidth="2.2" strokeLinecap="round" />
        <circle cx="36" cy="40" r="4" stroke="#334155" strokeWidth="2.2" fill="#ffffff" />
        <path d="M29 52C29 48 32 47 36 47C40 47 43 48 43 52" stroke="#334155" strokeWidth="2.2" strokeLinecap="round" />
      </svg>
    );
  }
  if (key.includes("custom") || key.includes("app") || key.includes("develop")) {
    return (
      <svg className="w-14 h-14 mx-auto group-hover:scale-105 transition-transform duration-300" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="20" y="12" width="24" height="40" rx="5" stroke="#334155" strokeWidth="2.5" fill="#f8fafc" />
        <circle cx="32" cy="46" r="1.5" fill="#334155" />
        <line x1="28" y1="16" x2="36" y2="16" stroke="#334155" strokeWidth="2" strokeLinecap="round" />
        <circle cx="32" cy="30" r="8.5" fill="#fff7ed" stroke="#f97316" strokeWidth="2" />
        <path d="M32 25C32 25 35 27 35 31L33.5 32.5L32 31.5L30.5 32.5L29 31C29 27 32 25 32 25Z" fill="#f97316" />
        <path d="M31 33L32 35.5L33 33" stroke="#f97316" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="15" cy="22" r="1.5" fill="#0284c7" />
        <path d="M48 20L49 18L50 20L52 21L50 22L49 24L48 22L46 21Z" fill="#f97316" />
      </svg>
    );
  }
  if (key.includes("data") || key.includes("big") || key.includes("analytic")) {
    return (
      <svg className="w-14 h-14 mx-auto group-hover:scale-105 transition-transform duration-300" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <line x1="32" y1="32" x2="18" y2="22" stroke="#94a3b8" strokeWidth="2" />
        <line x1="32" y1="32" x2="46" y2="20" stroke="#94a3b8" strokeWidth="2" />
        <line x1="32" y1="32" x2="48" y2="42" stroke="#94a3b8" strokeWidth="2" />
        <line x1="32" y1="32" x2="20" y2="44" stroke="#94a3b8" strokeWidth="2" />
        <line x1="32" y1="32" x2="32" y2="14" stroke="#f97316" strokeWidth="1.8" strokeDasharray="2 2" />
        <line x1="32" y1="32" x2="32" y2="50" stroke="#94a3b8" strokeWidth="2" />
        <circle cx="32" cy="32" r="4.5" fill="#f97316" stroke="#ea580c" strokeWidth="2" />
        <circle cx="18" cy="22" r="3" fill="#334155" />
        <circle cx="46" cy="20" r="3.5" fill="#334155" />
        <circle cx="48" cy="42" r="3" fill="#334155" />
        <circle cx="20" cy="44" r="3.5" fill="#334155" />
        <circle cx="32" cy="14" r="2.5" fill="#f97316" />
        <circle cx="32" cy="50" r="2.5" fill="#0284c7" />
        <circle cx="44" cy="30" r="2" fill="#f97316" />
        <circle cx="18" cy="34" r="2" fill="#0284c7" />
      </svg>
    );
  }
  if (key.includes("mobile") || key.includes("ios") || key.includes("android")) {
    return (
      <svg className="w-14 h-14 mx-auto group-hover:scale-105 transition-transform duration-300" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="20" y="14" width="24" height="40" rx="5" stroke="#334155" strokeWidth="2.5" fill="#f8fafc" />
        <line x1="28" y1="18" x2="36" y2="18" stroke="#334155" strokeWidth="2" strokeLinecap="round" />
        <circle cx="32" cy="48" r="1.5" fill="#334155" />
        <g transform="translate(32, 32)">
          <circle cx="0" cy="0" r="7.5" stroke="#0284c7" strokeWidth="2" strokeDasharray="3 2" fill="#f0f9ff" />
          <circle cx="0" cy="0" r="3.5" fill="#0284c7" />
        </g>
        <line x1="48" y1="28" x2="52" y2="28" stroke="#f97316" strokeWidth="2" strokeLinecap="round" />
        <line x1="48" y1="32" x2="55" y2="32" stroke="#f97316" strokeWidth="2" strokeLinecap="round" />
        <line x1="48" y1="36" x2="51" y2="36" stroke="#f97316" strokeWidth="2" strokeLinecap="round" />
      </svg>
    );
  }
  if (key.includes("cloud")) {
    return (
      <svg className="w-14 h-14 mx-auto group-hover:scale-105 transition-transform duration-300" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M22 36C18.7 36 16 33.3 16 30C16 27.1 18 24.6 20.8 24.1C21.6 19.5 25.6 16 30.5 16C34.6 16 38.1 18.6 39.4 22.4C40.2 22.1 41.1 22 42 22C45.3 22 48 24.7 48 28C48 28.5 47.9 29 47.8 29.5C49.7 30.7 51 32.7 51 35C51 38.3 48.3 41 45 41H22" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="#f8fafc" />
        <path d="M24 41V46" stroke="#334155" strokeWidth="2" strokeLinecap="round" />
        <circle cx="24" cy="48" r="2" fill="#f97316" />
        <path d="M32 41V48" stroke="#334155" strokeWidth="2" strokeLinecap="round" />
        <circle cx="32" cy="50" r="2" fill="#0284c7" />
        <path d="M40 41V45" stroke="#334155" strokeWidth="2" strokeLinecap="round" />
        <circle cx="40" cy="47" r="2" fill="#f97316" />
        <path d="M46 41V49" stroke="#334155" strokeWidth="2" strokeLinecap="round" />
        <circle cx="46" cy="51" r="2" fill="#334155" />
      </svg>
    );
  }
  if (key.includes("project") || key.includes("implement")) {
    return (
      <svg className="w-14 h-14 mx-auto group-hover:scale-105 transition-transform duration-300" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M16 22H38C42 22 45 25 45 29C45 33 42 36 38 36H24C20 36 17 39 17 43C17 47 20 50 24 50H46" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="16" cy="22" r="3" fill="#334155" />
        <circle cx="32" cy="22" r="2.5" fill="#f97316" />
        <circle cx="45" cy="29" r="2.5" fill="#0284c7" />
        <circle cx="28" cy="36" r="3" fill="#f97316" />
        <circle cx="36" cy="50" r="2.5" fill="#0284c7" />
        <circle cx="48" cy="50" r="3.5" fill="#f97316" />
        <path d="M35 19L38 22L35 25" stroke="#334155" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M27 33L24 36L27 39" stroke="#334155" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M43 47L46 50L43 53" stroke="#334155" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  if (key.includes("ai") || key.includes("ml") || key.includes("intel")) {
    return (
      <svg className="w-14 h-14 mx-auto group-hover:scale-105 transition-transform duration-300" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="18" y="18" width="28" height="28" rx="6" stroke="#334155" strokeWidth="2.5" fill="#f8fafc" />
        <circle cx="32" cy="32" r="6" fill="#f97316" />
        <line x1="32" y1="12" x2="32" y2="18" stroke="#0284c7" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="32" y1="46" x2="32" y2="52" stroke="#0284c7" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="12" y1="32" x2="18" y2="32" stroke="#0284c7" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="46" y1="32" x2="52" y2="32" stroke="#0284c7" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    );
  }
  if (key.includes("secur") || key.includes("cyber") || key.includes("lock")) {
    return (
      <svg className="w-14 h-14 mx-auto group-hover:scale-105 transition-transform duration-300" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M32 14L48 20V32C48 42 41 50 32 54C23 50 16 42 16 32V20L32 14Z" stroke="#334155" strokeWidth="2.5" fill="#f8fafc" />
        <circle cx="32" cy="32" r="3" fill="#f97316" />
        <path d="M32 35V40" stroke="#f97316" strokeWidth="2" strokeLinecap="round" />
      </svg>
    );
  }
  return (
    <svg className="w-14 h-14 mx-auto group-hover:scale-105 transition-transform duration-300" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="32" cy="22" r="4.5" stroke="#334155" strokeWidth="2.2" fill="#ffffff" />
      <path d="M25 38C25 33 28 31 32 31C36 31 39 33 39 38" stroke="#334155" strokeWidth="2.2" strokeLinecap="round" />
      <circle cx="21" cy="26" r="3.8" stroke="#334155" strokeWidth="2" fill="#ffffff" />
      <path d="M15 41C15 37 17.5 35 21 35C22.8 35 24.3 35.5 25.2 36.5" stroke="#334155" strokeWidth="2" strokeLinecap="round" />
      <circle cx="43" cy="26" r="3.8" stroke="#334155" strokeWidth="2" fill="#ffffff" />
      <path d="M38.8 36.5C39.7 35.5 41.2 35 43 35C46.5 35 49 37 49 41" stroke="#334155" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M12 44C18 49 46 49 52 44" stroke="#0284c7" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M16 48C22 52 42 52 48 48" stroke="#0284c7" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

const ourServices = [
  {
    id: "tech-consulting",
    title: "Technology Consulting",
    desc: "Uncovering technology blocks to business growth.",
    icon: (
      <svg className="w-14 h-14 mx-auto group-hover:scale-105 transition-transform duration-300" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="10" y="16" width="44" height="32" rx="4" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="#f8fafc" />
        <path d="M26 48L24 54H40L38 48" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        <line x1="20" y1="54" x2="44" y2="54" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M32 20C32 20 38 23 38 31L35 34L32 32L29 34L26 31C26 23 32 20 32 20Z" stroke="#334155" strokeWidth="2.2" strokeLinejoin="round" fill="#ffffff" />
        <circle cx="32" cy="27" r="2.5" fill="#f97316" />
        <path d="M30 35L32 39L34 35" stroke="#f97316" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M44 24L45 22L46 24L48 25L46 26L45 28L44 26L42 25Z" fill="#0284c7" />
      </svg>
    ),
    link: "/solutions",
  },
  {
    id: "bpo",
    title: "Business Process Outsourcing",
    desc: "Delivering industry-leading expertise, and supporting all delivery models.",
    icon: (
      <svg className="w-14 h-14 mx-auto group-hover:scale-105 transition-transform duration-300" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M34 16H46C48.2 16 50 17.8 50 20V28C50 30.2 48.2 32 46 32H42L38 36V32H34C31.8 32 30 30.2 30 28V20C30 17.8 31.8 16 34 16Z" stroke="#f97316" strokeWidth="2.2" strokeLinejoin="round" fill="#fff7ed" />
        <circle cx="36" cy="24" r="1.5" fill="#f97316" />
        <circle cx="40" cy="24" r="1.5" fill="#f97316" />
        <circle cx="44" cy="24" r="1.5" fill="#f97316" />
        <circle cx="22" cy="28" r="4.5" stroke="#334155" strokeWidth="2.2" fill="#ffffff" />
        <path d="M14 44C14 38.5 17.5 37 22 37C26.5 37 30 38.5 30 44" stroke="#334155" strokeWidth="2.2" strokeLinecap="round" />
        <circle cx="36" cy="40" r="4" stroke="#334155" strokeWidth="2.2" fill="#ffffff" />
        <path d="M29 52C29 48 32 47 36 47C40 47 43 48 43 52" stroke="#334155" strokeWidth="2.2" strokeLinecap="round" />
      </svg>
    ),
    link: "/solutions",
  },
  {
    id: "custom-app",
    title: "Custom Application Development",
    desc: "Developing a robust and industrialized approach for both new and existing applications.",
    icon: (
      <svg className="w-14 h-14 mx-auto group-hover:scale-105 transition-transform duration-300" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="20" y="12" width="24" height="40" rx="5" stroke="#334155" strokeWidth="2.5" fill="#f8fafc" />
        <circle cx="32" cy="46" r="1.5" fill="#334155" />
        <line x1="28" y1="16" x2="36" y2="16" stroke="#334155" strokeWidth="2" strokeLinecap="round" />
        <circle cx="32" cy="30" r="8.5" fill="#fff7ed" stroke="#f97316" strokeWidth="2" />
        <path d="M32 25C32 25 35 27 35 31L33.5 32.5L32 31.5L30.5 32.5L29 31C29 27 32 25 32 25Z" fill="#f97316" />
        <path d="M31 33L32 35.5L33 33" stroke="#f97316" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="15" cy="22" r="1.5" fill="#0284c7" />
        <path d="M48 20L49 18L50 20L52 21L50 22L49 24L48 22L46 21Z" fill="#f97316" />
      </svg>
    ),
    link: "/solutions",
  },
  {
    id: "big-data",
    title: "Big Data Solutions",
    desc: "Applying smarter business acumen more extensively across the application life cycle.",
    icon: (
      <svg className="w-14 h-14 mx-auto group-hover:scale-105 transition-transform duration-300" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <line x1="32" y1="32" x2="18" y2="22" stroke="#94a3b8" strokeWidth="2" />
        <line x1="32" y1="32" x2="46" y2="20" stroke="#94a3b8" strokeWidth="2" />
        <line x1="32" y1="32" x2="48" y2="42" stroke="#94a3b8" strokeWidth="2" />
        <line x1="32" y1="32" x2="20" y2="44" stroke="#94a3b8" strokeWidth="2" />
        <line x1="32" y1="32" x2="32" y2="14" stroke="#f97316" strokeWidth="1.8" strokeDasharray="2 2" />
        <line x1="32" y1="32" x2="32" y2="50" stroke="#94a3b8" strokeWidth="2" />
        <circle cx="32" cy="32" r="4.5" fill="#f97316" stroke="#ea580c" strokeWidth="2" />
        <circle cx="18" cy="22" r="3" fill="#334155" />
        <circle cx="46" cy="20" r="3.5" fill="#334155" />
        <circle cx="48" cy="42" r="3" fill="#334155" />
        <circle cx="20" cy="44" r="3.5" fill="#334155" />
        <circle cx="32" cy="14" r="2.5" fill="#f97316" />
        <circle cx="32" cy="50" r="2.5" fill="#0284c7" />
        <circle cx="44" cy="30" r="2" fill="#f97316" />
        <circle cx="18" cy="34" r="2" fill="#0284c7" />
      </svg>
    ),
    link: "/solutions",
  },
  {
    id: "mobile-solutions",
    title: "Mobile Solutions",
    desc: "Driving businesses in motion, and doing business with anybody, anytime!",
    icon: (
      <svg className="w-14 h-14 mx-auto group-hover:scale-105 transition-transform duration-300" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="20" y="14" width="24" height="40" rx="5" stroke="#334155" strokeWidth="2.5" fill="#f8fafc" />
        <line x1="28" y1="18" x2="36" y2="18" stroke="#334155" strokeWidth="2" strokeLinecap="round" />
        <circle cx="32" cy="48" r="1.5" fill="#334155" />
        <g transform="translate(32, 32)">
          <circle cx="0" cy="0" r="7.5" stroke="#0284c7" strokeWidth="2" strokeDasharray="3 2" fill="#f0f9ff" />
          <circle cx="0" cy="0" r="3.5" fill="#0284c7" />
        </g>
        <line x1="48" y1="28" x2="52" y2="28" stroke="#f97316" strokeWidth="2" strokeLinecap="round" />
        <line x1="48" y1="32" x2="55" y2="32" stroke="#f97316" strokeWidth="2" strokeLinecap="round" />
        <line x1="48" y1="36" x2="51" y2="36" stroke="#f97316" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    link: "/solutions",
  },
  {
    id: "cloud-consulting",
    title: "Cloud Consulting",
    desc: "Helping clients utilize the cloud for data storage and recovery, underpinning mobility, analytics, and social media.",
    icon: (
      <svg className="w-14 h-14 mx-auto group-hover:scale-105 transition-transform duration-300" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M22 36C18.7 36 16 33.3 16 30C16 27.1 18 24.6 20.8 24.1C21.6 19.5 25.6 16 30.5 16C34.6 16 38.1 18.6 39.4 22.4C40.2 22.1 41.1 22 42 22C45.3 22 48 24.7 48 28C48 28.5 47.9 29 47.8 29.5C49.7 30.7 51 32.7 51 35C51 38.3 48.3 41 45 41H22" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="#f8fafc" />
        <path d="M24 41V46" stroke="#334155" strokeWidth="2" strokeLinecap="round" />
        <circle cx="24" cy="48" r="2" fill="#f97316" />
        <path d="M32 41V48" stroke="#334155" strokeWidth="2" strokeLinecap="round" />
        <circle cx="32" cy="50" r="2" fill="#0284c7" />
        <path d="M40 41V45" stroke="#334155" strokeWidth="2" strokeLinecap="round" />
        <circle cx="40" cy="47" r="2" fill="#f97316" />
        <path d="M46 41V49" stroke="#334155" strokeWidth="2" strokeLinecap="round" />
        <circle cx="46" cy="51" r="2" fill="#334155" />
      </svg>
    ),
    link: "/solutions",
  },
  {
    id: "project-implementation",
    title: "Project Implementation",
    desc: "Turning vision and plans into reality.",
    icon: (
      <svg className="w-14 h-14 mx-auto group-hover:scale-105 transition-transform duration-300" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M16 22H38C42 22 45 25 45 29C45 33 42 36 38 36H24C20 36 17 39 17 43C17 47 20 50 24 50H46" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="16" cy="22" r="3" fill="#334155" />
        <circle cx="32" cy="22" r="2.5" fill="#f97316" />
        <circle cx="45" cy="29" r="2.5" fill="#0284c7" />
        <circle cx="28" cy="36" r="3" fill="#f97316" />
        <circle cx="36" cy="50" r="2.5" fill="#0284c7" />
        <circle cx="48" cy="50" r="3.5" fill="#f97316" />
        <path d="M35 19L38 22L35 25" stroke="#334155" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M27 33L24 36L27 39" stroke="#334155" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M43 47L46 50L43 53" stroke="#334155" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    link: "/solutions",
  },
  {
    id: "staffing-solutions",
    title: "Staffing Solutions",
    desc: "Assembling a customized solution to support your industry.",
    icon: (
      <svg className="w-14 h-14 mx-auto group-hover:scale-105 transition-transform duration-300" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="32" cy="22" r="4.5" stroke="#334155" strokeWidth="2.2" fill="#ffffff" />
        <path d="M25 38C25 33 28 31 32 31C36 31 39 33 39 38" stroke="#334155" strokeWidth="2.2" strokeLinecap="round" />
        <circle cx="21" cy="26" r="3.8" stroke="#334155" strokeWidth="2" fill="#ffffff" />
        <path d="M15 41C15 37 17.5 35 21 35C22.8 35 24.3 35.5 25.2 36.5" stroke="#334155" strokeWidth="2" strokeLinecap="round" />
        <circle cx="43" cy="26" r="3.8" stroke="#334155" strokeWidth="2" fill="#ffffff" />
        <path d="M38.8 36.5C39.7 35.5 41.2 35 43 35C46.5 35 49 37 49 41" stroke="#334155" strokeWidth="2.2" strokeLinecap="round" />
        <path d="M12 44C18 49 46 49 52 44" stroke="#0284c7" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M16 48C22 52 42 52 48 48" stroke="#0284c7" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
    link: "/solutions",
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
  const [servicesList, setServicesList] = useState<any[]>([]);

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

  useEffect(() => {
    fetch("/api/services")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setServicesList(data);
        }
      })
      .catch((err) => console.error("Failed to fetch services", err));
  }, []);

  const displaySolutions = solutions.length > 0 ? solutions : coreServices;
  const displayServices = servicesList.length > 0 ? servicesList : ourServices;

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
      <section className="relative overflow-hidden bg-white border-b border-neutral-200/70 min-h-[400px] sm:min-h-[430px] lg:min-h-[460px] flex items-center justify-between">
        
        {/* Full-bleed Background Slide Images */}
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
                {/* Visual positioned on the right half on desktop */}
                <div className="absolute right-0 top-0 bottom-0 w-full lg:w-[62%] xl:w-[58%] overflow-hidden">
                  <img
                    src={slide.image}
                    alt={slide.alt}
                    className="h-full w-full object-cover object-center lg:object-right transition-transform duration-1000 ease-out"
                  />
                  {/* Soft edge blend gradient for smooth falloff */}
                  <div className="absolute inset-0 bg-gradient-to-r from-white via-white/30 to-transparent lg:via-transparent" />
                </div>

                {/* Left gradient mask to ensure pure legibility of foreground text */}
                <div className="absolute inset-0 bg-gradient-to-r from-white via-white/95 to-transparent w-full lg:w-[55%]" />
              </div>
            );
          })}
        </div>

        {/* Side Navigation Buttons (Pinned to Left and Right edges like in reference) */}
        <button
          type="button"
          onClick={() => setActiveSlide((prev) => (prev - 1 + showcaseSlides.length) % showcaseSlides.length)}
          className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 flex h-10 w-8 sm:h-11 sm:w-9 items-center justify-center rounded bg-black/45 hover:bg-black/75 text-white/90 hover:text-white transition-all duration-200 cursor-pointer shadow-md backdrop-blur-xs"
          aria-label="Previous slide"
        >
          <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
        </button>

        <button
          type="button"
          onClick={() => setActiveSlide((prev) => (prev + 1) % showcaseSlides.length)}
          className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 flex h-10 w-8 sm:h-11 sm:w-9 items-center justify-center rounded bg-black/45 hover:bg-black/75 text-white/90 hover:text-white transition-all duration-200 cursor-pointer shadow-md backdrop-blur-xs"
          aria-label="Next slide"
        >
          <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
        </button>

        {/* Foreground Content for Active Slide */}
        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 sm:px-10 lg:px-12 py-5 sm:py-6 lg:py-7">
          <div className="max-w-2xl xl:max-w-3xl">
            {showcaseSlides.map((slide, idx) => {
              if (idx !== activeSlide) return null;
              return (
                <div key={slide.id} className="transition-all duration-500">
                  {/* Slide Category Badge */}
                  <div className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white/90 px-3 py-0.5 text-[10px] sm:text-[11px] font-bold tracking-[0.14em] text-neutral-800 uppercase shadow-xs backdrop-blur-sm">
                    <span className="relative flex h-2 w-2 items-center justify-center">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-75" />
                      <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#0091d5]" />
                    </span>
                    {slide.tag}
                  </div>

                  {/* Main Headline */}
                  <h1 className="mt-2.5 sm:mt-3 text-2xl sm:text-3xl lg:text-[2.4rem] xl:text-[2.75rem] font-medium tracking-tight text-neutral-800 leading-[1.14]">
                    {slide.titlePrefix}
                    <span className="font-extrabold text-neutral-950">
                      {slide.titleHighlight}
                    </span>
                    {slide.titleSuffix}
                  </h1>

                  {/* Subtitle / Eyebrow text */}
                  {slide.subtitle && (
                    <p className="mt-1.5 text-[11px] sm:text-xs font-bold tracking-wider text-neutral-500 uppercase">
                      {slide.subtitle}
                    </p>
                  )}

                  {/* Paragraph Description */}
                  <p className="mt-2.5 max-w-xl text-xs sm:text-sm leading-relaxed text-neutral-600">
                    {slide.desc}
                  </p>

                  {/* Action Buttons */}
                  <div className="mt-4 sm:mt-5 flex flex-wrap items-center gap-3">
                    <Link
                      to={slide.primaryCta.link}
                      className="inline-flex items-center gap-2 rounded-full bg-[#136a3e] hover:bg-[#0e5230] px-5 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-sm font-bold text-white shadow-md shadow-[#136a3e]/20 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 cursor-pointer group"
                    >
                      <span>{slide.primaryCta.text}</span>
                      <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
                    </Link>

                    <Link
                      to={slide.secondaryCta.link}
                      className="inline-flex items-center gap-2 rounded-full border border-neutral-300 hover:border-neutral-400 bg-white/90 hover:bg-white px-4 sm:px-5 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold text-neutral-800 shadow-xs hover:shadow-sm transition-all duration-200 cursor-pointer"
                    >
                      <span>{slide.secondaryCta.text}</span>
                      <ArrowRight className="h-3.5 w-3.5 text-neutral-500" />
                    </Link>
                  </div>

                  {/* Trust guarantees bar */}
                  <div className="mt-3.5 flex flex-wrap items-center gap-3.5 text-[10px] sm:text-[11px] font-medium text-neutral-500">
                    <span className="flex items-center gap-1">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" /> 99.98% SLA Uptime
                    </span>
                    <span className="flex items-center gap-1">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" /> Zero-Outage Migrations
                    </span>
                    <span className="flex items-center gap-1">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" /> 72-Hour Mobilization
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Carousel Indicators / Navigation Dots anchored inside */}
          <div className="mt-5 flex items-center gap-2 bg-white/85 backdrop-blur-md px-3 py-1.5 rounded-full border border-neutral-200/80 shadow-xs w-fit">
            {showcaseSlides.map((slide, i) => (
              <button
                key={slide.id}
                type="button"
                onClick={() => setActiveSlide(i)}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  i === activeSlide
                    ? "w-6 bg-[#136a3e] shadow-[0_0_8px_rgba(19,106,62,0.4)]"
                    : "w-2 bg-neutral-300 hover:bg-neutral-400"
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
            <span className="text-[10px] font-bold text-neutral-600 ml-1">
              0{activeSlide + 1} / 0{showcaseSlides.length}
            </span>
          </div>
        </div>
      </section>

      {/* Trust Stats Strip (Positioned directly below the compact hero slider) */}
      <div className="border-b border-neutral-200/70 bg-[#fafcfb] py-3.5 sm:py-4">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 sm:divide-x sm:divide-neutral-200/70">
            {stats.map((s) => {
              const Icon = s.icon;
              return (
                <div key={s.label} className="flex items-center gap-2.5 sm:px-4 first:sm:pl-0">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-[#136a3e] border border-emerald-100">
                    <Icon className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="font-display text-base sm:text-lg font-extrabold text-neutral-900 tracking-tight leading-none">
                      <AnimatedCounter value={s.value} />
                    </div>
                    <div className="mt-0.5 text-[9px] font-bold uppercase tracking-wider text-neutral-500 leading-tight">
                      {s.label}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ==================================================================== */}
      {/* 2. ENTERPRISE TECH STACK INFINITE MARQUEE                             */}
      {/* ==================================================================== */}
      <section className="border-b border-neutral-200/70 bg-[#fafcfb] py-3 overflow-hidden">
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
      {/* 3. ABOUT REGAL OPS — "WHO WE ARE & WHAT WE DO" (Vuesol Reference)    */}
      {/* ==================================================================== */}
      <section id="about" className="relative bg-white py-6 sm:py-8 overflow-hidden">
        {/* Ambient background soft glow */}
        <div className="absolute top-1/2 right-12 -translate-y-1/2 w-96 h-96 rounded-full bg-gradient-to-tr from-sky-400/10 via-orange-400/10 to-amber-300/10 blur-3xl pointer-events-none" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid gap-6 sm:gap-8 lg:grid-cols-12 lg:items-center">
            
            {/* Left Content Column (Exact Text & Layout from Reference) */}
            <div className="lg:col-span-6 xl:col-span-6">
              
              {/* Category Pill */}
              <div className="inline-flex items-center gap-2 rounded-full border border-sky-200/80 bg-sky-50/70 px-3.5 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-[#007cb8]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#0091d5]" />
                Who We Are &amp; What We Do
              </div>

              {/* Main Heading matching Reference */}
              <h2 className="mt-4 text-3xl sm:text-4xl lg:text-[2.75rem] font-bold text-neutral-900 tracking-tight leading-[1.15]">
                About Regal OPs
              </h2>

              {/* Subheading in Italicized Font matching Reference */}
              <p className="mt-2 text-lg sm:text-xl font-normal italic font-serif text-neutral-600 tracking-wide">
                Who We Are &amp; What We Do
              </p>

              {/* Paragraph 1 matching Reference */}
              <p className="mt-3.5 text-sm sm:text-[15.5px] leading-relaxed text-neutral-600">
                We empower companies by helping them utilize and integrate the most recent technological advances. This allows businesses to respond more quickly and intuitively to changing market dynamics. At Regal OPs, we have a long track record of transforming organizations into high-performing businesses that can tap into new, high-profit opportunities.
              </p>

              {/* Paragraph 2 matching Reference */}
              <p className="mt-2.5 text-sm sm:text-[15.5px] leading-relaxed text-neutral-600">
                By utilizing our technical expertise, industry insight, technological vision, and innovative thinking we can help you identify new opportunities for growth and innovation. We enable organizations to reach their full potential and accelerate their business. Don’t just keep up with the competition, get ahead. The market can be crowded, but we will make you stand out.
              </p>

              {/* CTAs matching reference button style */}
              <div className="mt-5 flex flex-wrap items-center gap-3.5">
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 rounded bg-[#0091d5] hover:bg-[#007cb8] px-6 py-2.5 text-xs sm:text-sm font-semibold text-white shadow-sm hover:shadow transition-all duration-200 cursor-pointer"
                >
                  <span className="font-bold">&mdash;</span> Know more
                </Link>

                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 rounded border border-neutral-300 hover:border-neutral-400 bg-white hover:bg-neutral-50 px-5 py-2.5 text-xs sm:text-sm font-semibold text-neutral-800 shadow-2xs transition-all duration-200 cursor-pointer"
                >
                  Get in Touch <ArrowRight className="h-3.5 w-3.5 text-neutral-500" />
                </Link>
              </div>

            </div>

            {/* Right Graphic Showcase (Exact Geometric Artwork from Reference) */}
            <div className="lg:col-span-6 xl:col-span-6 flex justify-center items-center">
              <div className="relative w-full max-w-md lg:max-w-lg xl:max-w-xl">
                
                {/* Backlight Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-tr from-sky-100 via-orange-100 to-amber-50 rounded-full blur-3xl opacity-60 pointer-events-none transform scale-90" />
                
                {/* Main Graphic with subtle floating animation */}
                <div className="relative z-10 transition-transform duration-500 hover:scale-[1.02]">
                  <img
                    src="/about-graphic.png"
                    alt="About Regal OPs — Who We Are & What We Do"
                    className="w-full h-auto max-h-[460px] object-contain mx-auto drop-shadow-md select-none animate-float"
                  />
                </div>

                {/* Overlaid Floating Badge */}
                <div className="absolute -bottom-2 -left-2 sm:bottom-4 sm:left-4 z-20 rounded-2xl border border-neutral-200/90 bg-white/95 backdrop-blur-md p-3.5 sm:p-4 shadow-xl shadow-neutral-900/8 max-w-[240px] sm:max-w-[270px]">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-orange-50 text-orange-600 border border-orange-100 shadow-xs">
                      <Sparkles className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="text-xs sm:text-sm font-bold text-neutral-900 leading-tight">
                        Proven Track Record
                      </div>
                      <div className="text-[10px] sm:text-[11px] text-neutral-500 mt-0.5 leading-tight">
                        Transforming high-performing organizations
                      </div>
                    </div>
                  </div>
                </div>

                {/* Overlaid Top-Right Accent Tag */}
                <div className="absolute top-2 -right-2 sm:top-6 sm:right-2 z-20 rounded-full border border-sky-200/90 bg-white/90 backdrop-blur-md px-3.5 py-1 text-[11px] font-bold text-[#007cb8] shadow-md shadow-sky-900/5">
                  Next-Gen Innovation &bull; 99.98% SLA
                </div>

              </div>
            </div>

          </div>
        </div>

        {/* Seamless Soft Curve Transition into Our Services */}
        <div className="w-full overflow-hidden leading-none mt-12 sm:mt-16 -mb-1">
          <svg
            className="relative block w-full h-8 sm:h-12 lg:h-16 text-[#fafcfb]"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            fill="currentColor"
          >
            <path d="M0,0 C300,90 900,90 1200,0 L1200,120 L0,120 Z" />
          </svg>
        </div>

      </section>

      {/* ==================================================================== */}
      {/* 4. OUR SERVICES SECTION (Infinite Scrolling Marquee + Grid Toggle)   */}
      {/* ==================================================================== */}
      <section className="border-b border-neutral-200/70 bg-[#fafcfb] py-6 sm:py-8 overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-bold text-neutral-900 tracking-tight">
              Our Services
            </h2>
            <p className="mt-2 text-base sm:text-lg text-neutral-600 italic font-serif sm:font-normal">
              Accelerate your journey to success with our expertise, insights, innovation and vision
            </p>
          </div>
        </div>

        {/* AUTO-SCROLLING MARQUEE FLOW */}
        <div className="mt-5 sm:mt-6 relative w-full overflow-hidden group py-1.5">
          {/* Subtle Gradient Fade Masks on Edges */}
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-[#fafcfb] via-[#fafcfb]/80 to-transparent z-10" />
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-[#fafcfb] via-[#fafcfb]/80 to-transparent z-10" />

          {/* Seamless Infinite Marquee Track with Pause on Hover */}
          <div className="flex gap-5 w-max py-3 px-4 transition-all duration-300 animate-marquee-services hover:[animation-play-state:paused]">
            {[...displayServices, ...displayServices].map((service, idx) => {
              const iconElement =
                service.icon && typeof service.icon !== "string"
                  ? service.icon
                  : renderServiceIcon(service.icon, service.title);
              const title = service.title;
              const desc = service.description || service.desc;
              const link = service.link || "/solutions";

              return (
                <Link
                  key={`${service.id || "srv"}-${idx}`}
                  to={link}
                  className="group/card flex flex-col items-center text-center rounded-2xl border border-neutral-200/80 bg-white p-7 sm:p-8 w-[285px] sm:w-[320px] shrink-0 transition-all duration-300 hover:-translate-y-2 hover:border-sky-400/60 hover:shadow-[0_16px_35px_rgba(2,132,199,0.12)] shadow-[0_4px_20px_rgba(0,0,0,0.03)] cursor-pointer select-none"
                >
                  {/* Vector Icon */}
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-50/80 group-hover/card:bg-sky-50 transition-colors duration-300">
                    {iconElement}
                  </div>

                  {/* Title */}
                  <h3 className="mt-6 text-lg sm:text-[18px] font-bold text-neutral-900 group-hover/card:text-sky-700 transition-colors leading-snug">
                    {title}
                  </h3>

                  {/* Description */}
                  <p className="mt-3 text-xs sm:text-[13.5px] leading-relaxed text-neutral-500 line-clamp-3">
                    {desc}
                  </p>

                  {/* Bottom Explore Link */}
                  <div className="mt-auto pt-6 flex items-center gap-1.5 text-xs font-semibold text-[#136a3e] group-hover/card:text-[#0e5230]">
                    <span>Explore Practice</span>
                    <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover/card:translate-x-1" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Bottom Explore CTA Bar */}
        <div className="mt-5 sm:mt-6 text-center">
          <Link
            to="/solutions"
            className="inline-flex items-center gap-2.5 rounded-full bg-[#136a3e] hover:bg-[#0e5230] px-7 py-3 text-xs sm:text-sm font-bold text-white shadow-md shadow-[#136a3e]/20 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer group"
          >
            <span>Explore Solutions</span>
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </div>
      </section>

      {/* ==================================================================== */}
      {/* 5. OUR CLIENTS — "WHO WE WORK WITH" (Vuesol Reference Match)         */}
      {/* ==================================================================== */}
      <section className="border-b border-neutral-200/70 bg-[#fbfcfd] py-6 sm:py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          {/* Desktop Layout: Exact center-callout 4-row layout matching reference */}
          <div className="hidden lg:flex flex-col gap-3.5 xl:gap-4">
            
            {/* Row 1 (8 cards) */}
            <div className="grid grid-cols-8 gap-3 xl:gap-3.5">
              {row1Logos.map((client, idx) => (
                <div
                  key={`r1-${idx}`}
                  className="bg-white rounded-md border border-neutral-200/80 shadow-2xs hover:shadow-md hover:border-sky-300 transition-all duration-200 flex items-center justify-center p-3 h-20 xl:h-22"
                >
                  <img
                    src={client.logo}
                    alt={client.name}
                    className="max-h-11 xl:max-h-12 w-auto object-contain filter contrast-[1.03] select-none"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>

            {/* Middle Section: Left 6 cards (3x2), Center Title Box, Right 6 cards (3x2) */}
            <div className="flex items-center gap-3.5 xl:gap-4">
              
              {/* Left 6 cards (3 columns x 2 rows) */}
              <div className="flex-1 grid grid-cols-3 gap-3 xl:gap-3.5">
                {midLeftLogos.map((client, idx) => (
                  <div
                    key={`ml-${idx}`}
                    className="bg-white rounded-md border border-neutral-200/80 shadow-2xs hover:shadow-md hover:border-sky-300 transition-all duration-200 flex items-center justify-center p-3 h-20 xl:h-22"
                  >
                    <img
                      src={client.logo}
                      alt={client.name}
                      className="max-h-11 xl:max-h-12 w-auto object-contain filter contrast-[1.03] select-none"
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>

              {/* Center Callout Title Box */}
              <div className="w-64 xl:w-72 shrink-0 flex flex-col items-center justify-center text-center px-4 py-2">
                <h2 className="text-3xl xl:text-4xl font-bold text-neutral-900 tracking-tight leading-none">
                  Our Clients
                </h2>
                <p className="mt-2.5 text-base xl:text-lg italic font-serif text-neutral-600 tracking-wide">
                  Who We Work With
                </p>
              </div>

              {/* Right 6 cards (3 columns x 2 rows) */}
              <div className="flex-1 grid grid-cols-3 gap-3 xl:gap-3.5">
                {midRightLogos.map((client, idx) => (
                  <div
                    key={`mr-${idx}`}
                    className="bg-white rounded-md border border-neutral-200/80 shadow-2xs hover:shadow-md hover:border-sky-300 transition-all duration-200 flex items-center justify-center p-3 h-20 xl:h-22"
                  >
                    <img
                      src={client.logo}
                      alt={client.name}
                      className="max-h-11 xl:max-h-12 w-auto object-contain filter contrast-[1.03] select-none"
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>

            </div>

            {/* Row 4 (8 cards) */}
            <div className="grid grid-cols-8 gap-3 xl:gap-3.5">
              {row4Logos.map((client, idx) => (
                <div
                  key={`r4-${idx}`}
                  className="bg-white rounded-md border border-neutral-200/80 shadow-2xs hover:shadow-md hover:border-sky-300 transition-all duration-200 flex items-center justify-center p-3 h-20 xl:h-22"
                >
                  <img
                    src={client.logo}
                    alt={client.name}
                    className="max-h-11 xl:max-h-12 w-auto object-contain filter contrast-[1.03] select-none"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>

          </div>

          {/* Mobile / Tablet Layout */}
          <div className="lg:hidden flex flex-col gap-6">
            <div className="text-center">
              <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 tracking-tight">
                Our Clients
              </h2>
              <p className="mt-1.5 text-sm sm:text-base italic font-serif text-neutral-600">
                Who We Work With
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
              {allClientLogos.map((client, idx) => (
                <div
                  key={`mob-${idx}`}
                  className="bg-white rounded-md border border-neutral-200/80 shadow-2xs flex items-center justify-center p-2.5 h-16 sm:h-20"
                >
                  <img
                    src={client.logo}
                    alt={client.name}
                    className="max-h-9 sm:max-h-10 w-auto object-contain"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* "More Clients" Centered Button */}
          <div className="mt-8 sm:mt-10 lg:mt-12 text-center">
            <Link
              to="/clients"
              className="inline-flex items-center justify-center rounded border border-[#0091d5] text-[#0091d5] hover:bg-[#0091d5] hover:text-white px-8 py-2 text-xs sm:text-sm font-semibold shadow-2xs hover:shadow transition-all duration-200 cursor-pointer"
            >
              More Clients
            </Link>
          </div>

        </div>
      </section>


      {/* ==================================================================== */}
      {/* 7. INTERACTIVE ARCHITECTURE BLUEPRINT & TOPOLOGY SHOWCASE            */}
      {/* ==================================================================== */}
      <section className="border-b border-neutral-200/70 bg-[#fafcfb] py-6 sm:py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-700/20 bg-emerald-50 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-emerald-800">
              Interactive Blueprint
            </span>
            <h2 className="mt-2 text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-neutral-900">
              The Regal OPs Production Topology
            </h2>
            <p className="mt-2 text-sm sm:text-base text-neutral-600">
              Click through the architectural layers of our resilient, audited enterprise platform foundation.
            </p>
          </div>

          <div className="mt-5 sm:mt-6 grid gap-5 lg:grid-cols-12 items-start">
            
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
      <section className="border-b border-neutral-200/70 bg-white py-6 sm:py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-700/20 bg-emerald-50 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-emerald-800">
              Delivery Methodology
            </span>
            <h2 className="mt-2 text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-neutral-900">
              Predictable, Audited, Repeatable
            </h2>
            <p className="mt-2 text-sm sm:text-base text-neutral-600">
              Our 4-phase framework takes complex enterprise platforms from architecture review to resilient, audited production operations.
            </p>
          </div>

          <div className="mt-5 sm:mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
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
      <section className="border-b border-neutral-200/70 bg-[#fafcfb] py-6 sm:py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 max-w-2xl">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-700/20 bg-emerald-50 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-emerald-800">
                Case Studies
              </span>
              <h2 className="mt-2 text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-neutral-900">
                Work That Holds Up Under Audit
              </h2>
            </div>
            <Link
              to="/clients"
              className="text-xs sm:text-sm font-bold text-emerald-800 hover:text-emerald-700 flex items-center gap-1.5 group shrink-0"
            >
              <span>View all client outcomes</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="mt-5 sm:mt-6 grid gap-4 lg:grid-cols-3">
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
      <section className="border-b border-neutral-200/70 bg-white py-6 sm:py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-700/20 bg-emerald-50 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-emerald-800">
              Executive Validation
            </span>
            <h2 className="mt-2 text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-neutral-900">
              Trusted by Engineering Leaders
            </h2>
          </div>

          <div className="mt-5 sm:mt-6 grid gap-4 md:grid-cols-3">
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
      <section className="border-b border-neutral-200/70 bg-[#fafcfb] py-6 sm:py-8">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-700/20 bg-emerald-50 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-emerald-800">
              Executive FAQ
            </span>
            <h2 className="mt-2 text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-neutral-900">
              Clear Answers for Leadership
            </h2>
            <p className="mt-2 text-sm sm:text-base text-neutral-600">
              Everything you need to know about our engagement models, IP security, and SLA guarantees.
            </p>
          </div>

          <div className="mt-5 sm:mt-6 space-y-3">
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
      <section className="py-6 sm:py-8 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-neutral-900 via-[#0a311b] to-neutral-950 p-6 sm:p-10 text-white shadow-2xl">
            {/* Ambient Background Glow */}
            <div className="pointer-events-none absolute -right-20 -bottom-20 h-96 w-96 rounded-full bg-emerald-500/20 blur-3xl" />
            <div className="pointer-events-none absolute -left-20 -top-20 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl" />

            <div className="relative z-10 max-w-3xl">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/30 bg-emerald-500/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-emerald-300">
                Ready to Scale?
              </span>
              <h2 className="mt-3 text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white leading-tight">
                Start with a High-Impact Technical Conversation
              </h2>
              <p className="mt-2.5 text-sm sm:text-base text-neutral-300 leading-relaxed max-w-2xl">
                Bring your architecture. We will review your topology and tell you candidly what to optimize first — no sales decks required.
              </p>

              <div className="mt-5 flex flex-wrap items-center gap-3.5">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 rounded-full bg-emerald-500 hover:bg-emerald-400 px-6 py-3 text-xs sm:text-sm font-bold text-neutral-950 shadow-lg shadow-emerald-500/25 hover:scale-[1.02] active:scale-[0.98] transition-all"
                >
                  Book an Architecture Consultation <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  to="/solutions"
                  className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 hover:bg-white/20 hover:border-white px-6 py-3 text-xs sm:text-sm font-semibold text-white shadow-sm hover:scale-[1.02] active:scale-[0.98] transition-all backdrop-blur-sm group"
                >
                  <span>Explore Solutions</span>
                  <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                </Link>
              </div>

              <div className="mt-5 pt-4 border-t border-white/10 flex flex-wrap items-center gap-5 text-xs text-neutral-400">
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
