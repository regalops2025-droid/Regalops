import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2, Cpu, Database, Shield, Activity, HelpCircle, Briefcase } from "lucide-react";
import { useState, useEffect } from "react";
import { SiteLayout, PageHero, Section } from "@/components/site/site-layout";

export const Route = createFileRoute("/solutions_/$id")({
  head: () => ({
    meta: [
      { title: "Practice Area Details | Regal OPs Engineering" },
      { name: "description", content: "Detailed breakdown of our core engineering practices." },
    ],
  }),
  component: SolutionDetail,
});

// Rich static metadata to supplement database records for premium look
const richMetadata: Record<string, {
  icon: any;
  capabilities: string[];
  methodology: string[];
  deliverables: string[];
  technologies: string[];
}> = {
  "1": {
    icon: Cpu,
    capabilities: [
      "Domain-Driven Development (DDD) & clean architecture",
      "High-throughput event-driven microservices",
      "Strangler-fig migration of legacy monoliths",
      "Real-time transactional consistency at scale"
    ],
    methodology: [
      "Event Storming & Domain Modeling",
      "Target Architecture Blueprinting",
      "Incremental Strangler Delivery",
      "Load Testing & Performance Tuning"
    ],
    deliverables: [
      "Fully documented OpenAPI specifications",
      "Automated unit, integration, and contract test suites",
      "Structured JSON logging & Prometheus metrics",
      "Operational runbooks for infrastructure teams"
    ],
    technologies: ["Node.js", "TypeScript", "Go", "PostgreSQL", "Kafka", "Docker"]
  },
  "2": {
    icon: Activity,
    capabilities: [
      "Zero-downtime database and asset migrations",
      "Multi-region high-availability configurations",
      "Infrastructure as Code (IaC) templates",
      "TCO analysis & cost optimization structures"
    ],
    methodology: [
      "TCO & Compliance Readiness Audit",
      "Infrastructure Landing Zone Setup",
      "Data Sync & Pilot Shift",
      "DNS Cutover & Monolithic Decommission"
    ],
    deliverables: [
      "Terraform or CloudFormation scripts",
      "Security audit & IAM compliance report",
      "Cost breakdown & auto-scaling configuration",
      "Disaster recovery runbook"
    ],
    technologies: ["AWS", "Azure", "Terraform", "Kubernetes", "Docker", "Linux"]
  },
  "3": {
    icon: Database,
    capabilities: [
      "Five-minute batch ETL pipelines at 1/10th streaming costs",
      "Real-time analytics warehousing & views",
      "Centralized metrics schema definition (dbt)",
      "Strict data sanitization & PII separation"
    ],
    methodology: [
      "Source System Schema Auditing",
      "Warehouse Model Design",
      "ETL Pipeline Engineering",
      "BI Integration & Verification"
    ],
    deliverables: [
      "dbt models with automated schema assertions",
      "Optimized warehouse queries & indexing",
      "Data lineage documentation",
      "Airflow/Prefect orchestration DAGs"
    ],
    technologies: ["Snowflake", "PostgreSQL", "Python", "dbt", "Airflow", "Kafka"]
  },
  "4": {
    icon: Cpu,
    capabilities: [
      "Intelligent workflows & agentic copilots",
      "Human-in-the-loop validation checkpoints",
      "Private Large Language Model (LLM) fine-tuning",
      "Audit logs of all autonomous decisions"
    ],
    methodology: [
      "Workflow Observability Mapping",
      "Model Selection & Context Prompting",
      "Security & Guardrail Integration",
      "Production Evaluation & Tuning"
    ],
    deliverables: [
      "Fully versioned model prompts & weights",
      "Observability dashboard tracking LLM drift",
      "Safety filter configurations",
      "Developer API wrapper code"
    ],
    technologies: ["Python", "PyTorch", "HuggingFace", "AWS Bedrock", "FastAPI"]
  },
  "5": {
    icon: Shield,
    capabilities: [
      "Threat modeling & threat vector assessment",
      "SOC2, ISO27001, and HIPAA compliance readiness",
      "Identity and Access Management (IAM) hardening",
      "Automated vulnerability scanning pipelines"
    ],
    methodology: [
      "Threat Vectors Assessment",
      "System Hardening & Config Fixes",
      "Compliance Assertions Mapping",
      "Penetration Test & Correction"
    ],
    deliverables: [
      "Vulnerability scan reports & remediation logs",
      "IAM architecture diagrams",
      "SOC2-ready system control definitions",
      "Incident response policy files"
    ],
    technologies: ["Vault", "SSL/TLS", "IAM", "OWASP", "SIEM", "Kubernetes NetworkPolicies"]
  },
  "6": {
    icon: Briefcase,
    capabilities: [
      "24/7 incident response by senior practitioners",
      "Custom SLAs built around core business metrics",
      "Blameless post-mortem analysis reports",
      "Continuous runtime optimization and patching"
    ],
    methodology: [
      "Telemetry Integration",
      "Runbook Consolidation",
      "Alarm Threshold Calibration",
      "Continuous Optimization Iteration"
    ],
    deliverables: [
      "Structured alert logs & notification settings",
      "Standard operating procedures (SOPs)",
      "Monthly SLA attainment reports",
      "Resource allocation suggestions"
    ],
    technologies: ["Prometheus", "Grafana", "Datadog", "PagerDuty", "Terraform"]
  }
};

function SolutionDetail() {
  const { id } = useParams({ from: "/solutions_/$id" });
  const [solution, setSolution] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/solutions")
      .then((res) => res.json())
      .then((data) => {
        const found = data.find((s: any) => String(s.id) === String(id));
        setSolution(found || null);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load solution detail", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <SiteLayout>
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="animate-pulse flex flex-col items-center gap-4">
            <div className="h-10 w-48 bg-surface-2 rounded-xl" />
            <div className="h-4 w-64 bg-surface-2 rounded-lg" />
          </div>
        </div>
      </SiteLayout>
    );
  }

  if (!solution) {
    return (
      <SiteLayout>
        <Section className="text-center py-20">
          <HelpCircle className="h-12 w-12 text-primary mx-auto" />
          <h1 className="text-2xl font-bold mt-4">Practice Area Not Found</h1>
          <p className="text-muted-foreground mt-2">
            The requested engineering practice does not exist or has been removed.
          </p>
          <Link
            to="/solutions"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground"
          >
            All solutions
          </Link>
        </Section>
      </SiteLayout>
    );
  }

  // Safely parse database array or JSON string fields
  const parseDbArray = (field: any) => {
    if (!field) return null;
    if (Array.isArray(field)) return field;
    try {
      const parsed = JSON.parse(field);
      if (Array.isArray(parsed)) return parsed;
    } catch (e) {}
    if (typeof field === "string") {
      return field.split("\n").map(s => s.trim()).filter(Boolean);
    }
    return null;
  };

  const dbCapabilities = parseDbArray(solution.capabilities);
  const dbMethodology = parseDbArray(solution.methodology);
  const dbDeliverables = parseDbArray(solution.deliverables);
  const dbTechnologies = parseDbArray(solution.technologies);

  const defaultMeta = richMetadata[String(solution.id)] || {
    icon: Briefcase,
    capabilities: [solution.description],
    methodology: ["Assessment", "Execution", "Delivery"],
    deliverables: ["Technical documentation", "Production ready deployment"],
    technologies: ["Node.js", "Docker"]
  };

  const meta = {
    icon: defaultMeta.icon,
    capabilities: dbCapabilities || defaultMeta.capabilities,
    methodology: dbMethodology || defaultMeta.methodology,
    deliverables: dbDeliverables || defaultMeta.deliverables,
    technologies: dbTechnologies || defaultMeta.technologies
  };

  const IconComponent = meta.icon;

  return (
    <SiteLayout>
      <PageHero
        eyebrow="Practice Detail"
        title={solution.name}
        description={solution.description}
      />

      <Section>
        <div className="grid gap-12 lg:grid-cols-[1fr_380px] items-start">
          <div className="space-y-12">
            {solution.image && (
              <div className="rounded-3xl overflow-hidden border border-border/80 shadow-md">
                <img
                  src={solution.image}
                  alt={solution.name}
                  className="w-full h-64 sm:h-96 object-cover"
                />
              </div>
            )}

            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">Core Capabilities</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {meta.capabilities.map((cap, index) => (
                  <div
                    key={index}
                    className="panel p-5 border border-border/70 hover:border-primary/20 transition-all flex items-start gap-3 bg-surface/50"
                  >
                    <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <p className="text-sm font-medium leading-relaxed text-foreground">{cap}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">Delivery Methodology</h2>
              <ol className="relative border-l border-border pl-6 space-y-6">
                {meta.methodology.map((step, index) => (
                  <li key={index} className="relative">
                    <span className="absolute -left-[31px] top-1.5 grid h-3.5 w-3.5 place-items-center rounded-full bg-primary ring-4 ring-background" />
                    <span className="text-xs font-semibold text-primary uppercase tracking-wider">
                      Phase {String(index + 1).padStart(2, "0")}
                    </span>
                    <h4 className="text-base font-bold text-foreground mt-0.5">{step}</h4>
                  </li>
                ))}
              </ol>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">What We Deliver</h2>
              <ul className="space-y-3">
                {meta.deliverables.map((del, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                    <span className="text-sm text-muted-foreground leading-relaxed">{del}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="space-y-6 lg:sticky lg:top-28">
            <div className="panel p-6 sm:p-8 bg-surface/40 border border-primary/20 shadow-md rounded-2xl">
              <IconComponent className="h-8 w-8 text-primary" />
              <h3 className="text-lg font-bold text-foreground mt-4">Consult on this practice</h3>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                Discuss your scale, uptime requirements, or migration roadmap with a senior practitioner.
              </p>
              <Link
                to="/contact"
                search={{ service: solution.name }}
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-tr-2xl rounded-bl-2xl rounded-tl-sm rounded-br-sm bg-gradient-to-r from-primary to-gold/90 py-3 text-sm font-semibold text-primary-foreground shadow-md hover:shadow-lg transition-all"
              >
                Book a consultation <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="panel p-6 bg-background border border-border/80 rounded-2xl">
              <h4 className="text-sm font-bold text-foreground">Featured Technologies</h4>
              <div className="mt-4 flex flex-wrap gap-2">
                {meta.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="inline-flex items-center rounded-xl bg-secondary/80 px-3 py-1.5 text-xs font-semibold text-secondary-foreground border border-border/50"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="text-center">
              <Link
                to="/solutions"
                className="text-xs font-semibold text-primary hover:text-primary/80 transition-colors"
              >
                ← Back to all solutions
              </Link>
            </div>
          </div>
        </div>
      </Section>
    </SiteLayout>
  );
}
