export type NavChild = { label: string; desc: string };
export type NavItem = { label: string; to: string; children?: NavChild[] };

export const navItems: NavItem[] = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  {
    label: "Solutions",
    to: "/solutions",
    children: [
      { label: "Technology Consulting", desc: "Uncovering technology blocks to growth" },
      { label: "Business Process Outsourcing", desc: "Industry-leading global delivery models" },
      { label: "Custom Application Development", desc: "Robust and industrialized app engineering" },
      { label: "Big Data Solutions", desc: "Data warehouses, pipelines & analytics" },
      { label: "Mobile Solutions", desc: "Native iOS & Android mobile systems" },
      { label: "Cloud Consulting", desc: "Multi-cloud migration, storage & recovery" },
      { label: "Project Implementation", desc: "Turning vision and roadmaps into reality" },
      { label: "Staffing Solutions", desc: "Customized senior engineering pods" },
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
  {
    label: "Career",
    to: "/career",
    children: [
      { label: "Open Positions", desc: "Join our global engineering team" },
      { label: "Life at Regal OPs", desc: "Culture, benefits, and innovation" },
    ],
  },
  { label: "Blog", to: "/blog" },
  { label: "Contact Us", to: "/contact" },
];
