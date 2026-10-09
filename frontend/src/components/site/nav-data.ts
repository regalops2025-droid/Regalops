export type NavChild = {
  label: string;
  desc: string;
  icon?: string;
  tag?: string;
  to?: string;
  params?: Record<string, string>;
};

export type NavFeatured = {
  badge: string;
  title: string;
  description: string;
  actionText: string;
  actionTo: string;
};

export type NavItem = {
  label: string;
  to: string;
  badge?: string;
  children?: NavChild[];
  featured?: NavFeatured;
};

export const navItems: NavItem[] = [
  { label: "Home", to: "/" },
  { label: "About Us", to: "/about" },
  {
    label: "Solutions",
    to: "/solutions",
    featured: {
      badge: "ARCHITECTURE ADVISORY",
      title: "Custom Enterprise Modernization",
      description: "Partner directly with our principal architects to engineer resilient, cloud-native platforms.",
      actionText: "Schedule Architecture Review",
      actionTo: "/contact",
    },
    children: [
      {
        label: "Strategic Staffing",
        desc: "Specialized, senior-only engineering squads mobilized within 72 hours",
        icon: "Users",
        tag: "High Demand",
      },
      {
        label: "Business Process Outsourcing",
        desc: "SLA-backed managed delivery, IT workflows & 24/7 follow-the-sun support",
        icon: "Workflow",
        tag: "Enterprise",
      },
      {
        label: "Recruitment Process Outsourcing",
        desc: "End-to-end talent acquisition pipelines for high-velocity engineering",
        icon: "Briefcase",
      },
      {
        label: "Custom Application Development",
        desc: "Industrial-grade distributed software, microservices & scalable backends",
        icon: "Code2",
        tag: "Core",
      },
      {
        label: "Cloud Consulting & Migration",
        desc: "Multi-cloud architecture, serverless systems & zero-downtime migrations",
        icon: "Cloud",
        tag: "AWS/Azure/GCP",
      },
      {
        label: "Big Data & Telemetry",
        desc: "Real-time streaming pipelines, modern lakehouses & predictive analytics",
        icon: "Database",
      },
      {
        label: "Mobile Systems Engineering",
        desc: "Mission-critical native iOS & Android apps with hardened security",
        icon: "Smartphone",
      },
      {
        label: "DevOps & SRE Reliability",
        desc: "GitOps automation, container orchestration & 99.99% uptime runbooks",
        icon: "Cpu",
      },
    ],
  },
  {
    label: "Technologies",
    to: "/technologies",
    featured: {
      badge: "TECH RADAR",
      title: "Zero-Debt Engineering Standards",
      description: "Explore our battle-tested toolchains across distributed cloud, MLOps, and modern micro-frontends.",
      actionText: "Explore Full Tech Radar",
      actionTo: "/technologies",
    },
    children: [
      {
        label: "React & Next.js",
        desc: "High-performance web applications, SSR & micro-frontends",
        icon: "Layers",
        tag: "Frontend",
      },
      {
        label: "Node.js & Python",
        desc: "High-throughput microservices, REST & gRPC API architecture",
        icon: "Terminal",
        tag: "Backend",
      },
      {
        label: "AWS / Azure / GCP",
        desc: "Hyperscaler multi-cloud infrastructure and Terraform automation",
        icon: "Cloud",
        tag: "Cloud",
      },
      {
        label: "Kubernetes & DevOps",
        desc: "Hardened cluster management, GitOps & automated CI/CD pipelines",
        icon: "Cpu",
        tag: "Platform",
      },
      {
        label: "Mobile — iOS & Android",
        desc: "Swift, Kotlin, React Native & enterprise-grade offline sync",
        icon: "Smartphone",
        tag: "Mobile",
      },
      {
        label: "Machine Learning & AI",
        desc: "Production LLM agents, vector embeddings & automated MLOps",
        icon: "Bot",
        tag: "AI/ML",
      },
    ],
  },
  { label: "Clients", to: "/clients" },
  {
    label: "Career",
    to: "/career",
    badge: "HIRING",
    featured: {
      badge: "GROWTH & CULTURE",
      title: "Shape the Future of Enterprise Tech",
      description: "Collaborate with world-class engineers, solve high-stakes challenges, and thrive in an inclusive culture.",
      actionText: "View Open Roles",
      actionTo: "/career",
    },
    children: [
      {
        label: "Open Positions",
        desc: "Explore active engineering, architecture, and leadership roles",
        icon: "Briefcase",
        tag: "12+ Roles",
      },
      {
        label: "Engineering Culture",
        desc: "Our principles: autonomy, mastery, zero-bureaucracy delivery",
        icon: "Sparkles",
      },
      {
        label: "Benefits & Perks",
        desc: "Global wellness, remote-first setup & continuous learning stipends",
        icon: "ShieldCheck",
      },
    ],
  },
  { label: "Blog", to: "/blog" },
  { label: "Contact Us", to: "/contact" },
];
