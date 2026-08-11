export type NavChild = { label: string; desc: string };
export type NavItem = { label: string; to: string; children?: NavChild[] };

export const navItems: NavItem[] = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  {
    label: "Solutions",
    to: "/solutions",
    children: [
      { label: "Enterprise Software", desc: "Custom platforms built to scale" },
      { label: "Cloud Migration", desc: "Lift, shift and modernise safely" },
      { label: "Data & Analytics", desc: "Pipelines, warehouses, dashboards" },
      { label: "AI Automation", desc: "Agents and workflow intelligence" },
      { label: "Cyber Security", desc: "Audits, hardening, compliance" },
      { label: "Managed Support", desc: "24/7 monitoring and SLAs" },
    ],
  },
  {
    label: "Technologies",
    to: "/technologies",
    children: [
      { label: "React & Next.js", desc: "Fast, modern web interfaces" },
      { label: "Node & Python", desc: "APIs and backend services" },
      { label: "AWS / Azure / GCP", desc: "Cloud native infrastructure" },
      { label: "Kubernetes & DevOps", desc: "CI/CD and containerisation" },
      { label: "Mobile — iOS & Android", desc: "Native and cross-platform" },
      { label: "Machine Learning", desc: "Models, MLOps, vision, NLP" },
    ],
  },
  { label: "Clients", to: "/clients" },
  { label: "Career", to: "/career" },
  { label: "Blog", to: "/blog" },
  { label: "Contact Us", to: "/contact" },
];
