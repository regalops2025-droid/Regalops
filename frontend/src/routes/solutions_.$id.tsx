import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2, Cpu, Database, Shield, Activity, HelpCircle, Briefcase, Users, UserCheck, GraduationCap, Compass, Layers } from "lucide-react";
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
    icon: Users,
    capabilities: [
      "Dedicated senior-only engineering squads mobilized within 72 hours",
      "Specialized expertise across Cloud, DevOps, Full-Stack, and AI/ML",
      "Direct team integration into client Slack, Jira, and Agile ceremonies",
      "Flexible engagement models: team augmentation or managed delivery pods"
    ],
    methodology: [
      "Skills Matrix & Technical Domain Assessment",
      "72-Hour Candidate Vetting & Live Coding Screen",
      "Frictionless Sprint Onboarding & Security Clearance",
      "Continuous Velocity, Delivery, and SLA Reviews"
    ],
    deliverables: [
      "Principal Architects and Senior Engineers",
      "Zero recruitment overhead or onboarding delays",
      "Contractual delivery SLAs and performance guarantees",
      "100% Client ownership of all generated code and assets"
    ],
    technologies: ["Full-Stack", "DevOps", "Cloud Architects", "AI/ML Engineers", "Agile Pods"]
  },
  "2": {
    icon: Activity,
    capabilities: [
      "End-to-end IT service delivery operations and enterprise helpdesk",
      "Follow-the-sun global support pods with 24/7/365 coverage",
      "SLA-backed Tier 1 to Tier 3 managed operational workflows",
      "Continuous robotic process automation (RPA) and optimization"
    ],
    methodology: [
      "Process Discovery and Workstream Transition",
      "SLA and KPI Benchmarking",
      "Automated Workflow Integration",
      "Continuous Service Improvement (ITIL)"
    ],
    deliverables: [
      "Standard Operating Procedures (SOPs)",
      "Real-time Telemetry Dashboard & Reporting",
      "Monthly SLA Attainment Audits",
      "Risk and Business Continuity Runbooks"
    ],
    technologies: ["ITIL", "ServiceNow", "Jira Service Desk", "24/7 Operations", "Automation"]
  },
  "3": {
    icon: UserCheck,
    capabilities: [
      "End-to-end recruitment lifecycle management and talent pipelining",
      "AI-driven candidate screening, technical evaluation, and background checks",
      "Employer branding and candidate experience optimization",
      "Scalable on-demand hiring capacity with zero fixed recruitment overhead"
    ],
    methodology: [
      "Workforce Planning & Hiring Needs Audit",
      "Omnichannel Talent Sourcing & Pipelining",
      "Rigorous Technical & Cultural Assessment",
      "Offer Management, Onboarding, and Retention Tracking"
    ],
    deliverables: [
      "Dedicated RPO Talent Acquisition Squad",
      "Custom Applicant Tracking System (ATS) Integration",
      "Time-to-Hire and Quality-of-Hire KPI Reports",
      "Pre-screened Active Candidate Pipelines"
    ],
    technologies: ["ATS Integration", "Talent Intelligence", "AI Sourcing", "Tech Vetting", "Global Hiring"]
  },
  "4": {
    icon: Cpu,
    capabilities: [
      "Domain-Driven Design (DDD) & clean modular microservices architecture",
      "Full-stack cloud-native applications with React, Next.js, and Node.js",
      "High-throughput transactional APIs with gRPC, REST, and GraphQL",
      "Industrialized automated testing, security scanning, and CI/CD"
    ],
    methodology: [
      "Domain Modeling & Sprint Blueprinting",
      "Incremental Modular Delivery",
      "Automated Contract and E2E Testing",
      "Zero-Downtime Blue/Green Deployment"
    ],
    deliverables: [
      "Production-ready codebase with full client IP ownership",
      "OpenAPI specifications & comprehensive documentation",
      "Automated test suites and security scan reports",
      "Kubernetes deployment manifests and CI/CD pipelines"
    ],
    technologies: ["React", "Next.js", "TypeScript", "Node.js", "Python", "PostgreSQL", "Docker"]
  },
  "5": {
    icon: Shield,
    capabilities: [
      "Full-suite automated end-to-end, regression, and integration testing",
      "High-concurrency load, stress, and performance benchmark testing",
      "API security, OWASP vulnerability scanning, and compliance testing",
      "Mobile device cloud testing across 100+ physical device configurations"
    ],
    methodology: [
      "Test Strategy & Automation Architecture Definition",
      "Continuous Test Automation in CI/CD Pipelines",
      "Performance & Security Baseline Benchmarking",
      "Defect Prevention & Quality Gate Enforcement"
    ],
    deliverables: [
      "Automated Playwright, Cypress, and Selenium Test Suites",
      "JMeter & k6 Load and Scalability Benchmark Reports",
      "Continuous Quality Gates integrated with GitHub Actions",
      "Real-time Test Coverage & Bug Density Dashboards"
    ],
    technologies: ["Playwright", "Cypress", "Selenium", "k6", "JMeter", "Postman", "OWASP ZAP"]
  },
  "6": {
    icon: GraduationCap,
    capabilities: [
      "Role-based enterprise curriculum across Cloud, DevOps, AI, and Full-Stack",
      "Hands-on real-world production sandboxes and architectural labs",
      "Mentorship from veteran principal architects and technical leaders",
      "Custom corporate training cohorts with industry certification pathways"
    ],
    methodology: [
      "Skills Gap Assessment & Corporate Needs Analysis",
      "Custom Curriculum & Hands-on Lab Design",
      "Live Interactive Training & Code Reviews",
      "Capstone Project Evaluation & Certification"
    ],
    deliverables: [
      "Production-ready certified engineers",
      "Comprehensive course materials, lab guides, and video archives",
      "Individual capability benchmarks and progress dashboards",
      "Post-training mentorship and ongoing learning roadmaps"
    ],
    technologies: ["Cloud Certifications", "DevOps Bootcamps", "AI/ML Workshops", "Hands-on Labs", "Architecture Mentorship"]
  },
  "7": {
    icon: Compass,
    capabilities: [
      "Comprehensive enterprise architecture audit and tech debt quantification",
      "Legacy modernization blueprints and cloud readiness assessments",
      "Cybersecurity posture, compliance, and risk assessments",
      "Technology due diligence for M&A and strategic capital allocation"
    ],
    methodology: [
      "Discovery & Technology Health Audit",
      "Bottleneck & Architectural Risk Identification",
      "Future-State Target Architecture Modeling",
      "Execution Roadmap & Governance Framework Formulation"
    ],
    deliverables: [
      "Executive Enterprise Architecture Blueprint",
      "Technical Debt Remediation & Modernization Roadmap",
      "ROI and Total Cost of Ownership (TCO) Model",
      "C-Suite Advisory Briefing and Implementation Milestones"
    ],
    technologies: ["Enterprise Architecture", "Cloud Strategy", "FinOps", "Cybersecurity", "Legacy Modernization"]
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
        <div className="grid gap-6 lg:grid-cols-[1fr_380px] items-start">
          <div className="space-y-6">
            {solution.image && (
              <div className="rounded-3xl overflow-hidden border border-border/80 shadow-md bg-surface-2/40 flex items-center justify-center">
                <img
                  src={solution.image}
                  alt={solution.name}
                  className="w-full h-auto max-h-[520px] object-contain rounded-3xl"
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
