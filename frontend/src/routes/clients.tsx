import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect, useMemo } from "react";
import { SiteLayout } from "@/components/site/site-layout";
import {
  Layers,
  Landmark,
  HeartPulse,
  Cpu,
  Radio,
  ShieldCheck,
  Award,
  ArrowRight,
  Sparkles,
} from "lucide-react";

export const Route = createFileRoute("/clients")({
  head: () => ({
    meta: [
      { title: "Clients & Industries We Serve | Regal OPs" },
      {
        name: "description",
        content:
          "Industries and case outcomes across Automotive, Banking & Financial, Higher Education, Insurance, Social Media, Oil & Gas, Telecom, and Health Care.",
      },
      { property: "og:title", content: "Regal OPs Clients & Industries" },
      {
        property: "og:description",
        content: "Enterprise technology partnerships across 8 core industry verticals.",
      },
    ],
  }),
  component: Clients,
});

/* ========================================================================== */
/* FLAT CIRCULAR ILLUSTRATION BADGES (Exact Match to User Reference Image)   */
/* ========================================================================== */

// 1. Automotive: Teal circular badge with car dashboard, wrench & gauge nodes
function AutomotiveBadge({ className = "w-20 h-20" }: { className?: string }) {
  return (
    <svg viewBox="0 0 80 80" className={className} fill="none">
      <circle cx="40" cy="40" r="40" fill="#14B8A6" />
      {/* Central dashboard screen */}
      <rect x="22" y="24" width="36" height="24" rx="3" fill="#0F766E" stroke="#CCFBF1" strokeWidth="1.5" />
      {/* Car silhouette inside screen */}
      <path d="M30 38 L34 32 L46 32 L50 38 Z" fill="#FACC15" />
      <circle cx="33" cy="40" r="2.5" fill="#FFFFFF" />
      <circle cx="47" cy="40" r="2.5" fill="#FFFFFF" />
      <line x1="26" y1="44" x2="54" y2="44" stroke="#5EEAD4" strokeWidth="1" />
      {/* Wrench icon node (left) */}
      <circle cx="18" cy="40" r="7" fill="#F97316" />
      <path d="M16 38 L19 41 L21 39" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" />
      {/* Gauge icon node (right) */}
      <circle cx="62" cy="40" r="7" fill="#F97316" />
      <circle cx="62" cy="40" r="4" fill="#FFFFFF" />
      <path d="M62 40 L64 38" stroke="#EF4444" strokeWidth="1.5" strokeLinecap="round" />
      {/* Chart node (top) */}
      <circle cx="30" cy="16" r="6" fill="#F97316" />
      <rect x="28" y="15" width="4" height="4" fill="#FFFFFF" />
      {/* OK node (bottom) */}
      <circle cx="40" cy="62" r="6" fill="#10B981" />
      <path d="M38 62 L39.5 63.5 L42.5 60.5" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// 2. Banking & Financial: Golden yellow circular badge with credit card
function BankingBadge({ className = "w-20 h-20" }: { className?: string }) {
  return (
    <svg viewBox="0 0 80 80" className={className} fill="none">
      <circle cx="40" cy="40" r="40" fill="#F59E0B" />
      {/* Credit card body */}
      <rect x="20" y="26" width="40" height="28" rx="4" fill="#FFFFFF" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.15))" />
      {/* Magnetic stripe */}
      <rect x="20" y="31" width="40" height="6" fill="#1E293B" />
      {/* Chip */}
      <rect x="25" y="42" width="6" height="5" rx="1" fill="#F59E0B" />
      <rect x="34" y="44" width="10" height="2" rx="1" fill="#94A3B8" />
      {/* Mastercard style dual circles */}
      <circle cx="51" cy="45" r="3.5" fill="#EF4444" opacity="0.85" />
      <circle cx="54" cy="45" r="3.5" fill="#F59E0B" opacity="0.85" />
    </svg>
  );
}

// 3. Higher Education: Dark slate circular badge with university hall
function EducationBadge({ className = "w-20 h-20" }: { className?: string }) {
  return (
    <svg viewBox="0 0 80 80" className={className} fill="none">
      <circle cx="40" cy="40" r="40" fill="#334155" />
      {/* Building base */}
      <rect x="20" y="32" width="40" height="26" rx="2" fill="#E2E8F0" />
      {/* Red pediment triangle */}
      <polygon points="40,20 18,33 62,33" fill="#DC2626" />
      {/* Flag */}
      <line x1="40" y1="20" x2="40" y2="14" stroke="#FFFFFF" strokeWidth="1.5" />
      <polygon points="40,14 46,16.5 40,19" fill="#F59E0B" />
      {/* Classic Columns */}
      <rect x="24" y="38" width="4" height="15" rx="1" fill="#FFFFFF" />
      <rect x="32" y="38" width="4" height="15" rx="1" fill="#FFFFFF" />
      <rect x="44" y="38" width="4" height="15" rx="1" fill="#FFFFFF" />
      <rect x="52" y="38" width="4" height="15" rx="1" fill="#FFFFFF" />
      {/* Door */}
      <rect x="37" y="45" width="6" height="13" rx="1" fill="#475569" />
      {/* Steps */}
      <rect x="18" y="58" width="44" height="3" rx="1" fill="#94A3B8" />
    </svg>
  );
}

// 4. Insurance: Sky blue circular badge with umbrella & policy document
function InsuranceBadge({ className = "w-20 h-20" }: { className?: string }) {
  return (
    <svg viewBox="0 0 80 80" className={className} fill="none">
      <circle cx="40" cy="40" r="40" fill="#38BDF8" />
      {/* Document */}
      <rect x="30" y="32" width="20" height="26" rx="2" fill="#FFFFFF" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.12))" />
      <line x1="34" y1="38" x2="46" y2="38" stroke="#CBD5E1" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="34" y1="43" x2="46" y2="43" stroke="#CBD5E1" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="34" y1="48" x2="42" y2="48" stroke="#CBD5E1" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="40" cy="52" r="2.5" fill="#EF4444" />
      {/* Umbrella */}
      <path d="M22 28 C22 17 58 17 58 28 Z" fill="#1E293B" />
      <line x1="40" y1="18" x2="40" y2="28" stroke="#FFFFFF" strokeWidth="1.5" />
      <path d="M40 28 L40 40 C40 42 38 43 36 41" stroke="#E2E8F0" strokeWidth="2" strokeLinecap="round" fill="none" />
    </svg>
  );
}

// 5. Social Media: Cyan circular badge with avatar & connected social bubbles
function SocialMediaBadge({ className = "w-20 h-20" }: { className?: string }) {
  return (
    <svg viewBox="0 0 80 80" className={className} fill="none">
      <circle cx="40" cy="40" r="40" fill="#0EA5E9" />
      {/* Connecting lines */}
      <line x1="40" y1="40" x2="22" y2="30" stroke="#BAE6FD" strokeWidth="1.5" />
      <line x1="40" y1="40" x2="58" y2="30" stroke="#BAE6FD" strokeWidth="1.5" />
      <line x1="40" y1="40" x2="24" y2="52" stroke="#BAE6FD" strokeWidth="1.5" />
      <line x1="40" y1="40" x2="40" y2="60" stroke="#BAE6FD" strokeWidth="1.5" />
      <line x1="40" y1="40" x2="56" y2="52" stroke="#BAE6FD" strokeWidth="1.5" />
      <line x1="40" y1="40" x2="40" y2="18" stroke="#BAE6FD" strokeWidth="1.5" />
      {/* Central avatar node */}
      <circle cx="40" cy="40" r="10" fill="#FBBF24" />
      <circle cx="40" cy="37" r="3.5" fill="#FFFFFF" />
      <path d="M34 45 C34 42 46 42 46 45" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
      {/* Surrounding social nodes */}
      <circle cx="22" cy="30" r="5" fill="#38BDF8" />
      <circle cx="58" cy="30" r="5" fill="#2563EB" />
      <circle cx="24" cy="52" r="5" fill="#DC2626" />
      <circle cx="40" cy="60" r="5" fill="#0284C7" />
      <circle cx="56" cy="52" r="5" fill="#8B5CF6" />
      <circle cx="40" cy="18" r="4" fill="#F43F5E" />
    </svg>
  );
}

// 6. Oil & Gas: Deep blue circular badge with fuel tanker truck
function OilGasBadge({ className = "w-20 h-20" }: { className?: string }) {
  return (
    <svg viewBox="0 0 80 80" className={className} fill="none">
      <circle cx="40" cy="40" r="40" fill="#3B82F6" />
      {/* Yellow Tanker Cylinder */}
      <rect x="32" y="32" width="30" height="14" rx="7" fill="#FACC15" stroke="#CA8A04" strokeWidth="1" />
      <line x1="38" y1="39" x2="56" y2="39" stroke="#CA8A04" strokeWidth="1.5" />
      {/* Red Truck Cab */}
      <path d="M16 46 L16 38 L24 38 L30 42 L30 46 Z" fill="#EF4444" />
      <rect x="23" y="39" width="6" height="3" fill="#BAE6FD" />
      {/* Chassis & Wheels */}
      <rect x="18" y="46" width="42" height="3" fill="#1E293B" />
      <circle cx="22" cy="49" r="4" fill="#0F172A" />
      <circle cx="22" cy="49" r="1.5" fill="#94A3B8" />
      <circle cx="46" cy="49" r="4" fill="#0F172A" />
      <circle cx="46" cy="49" r="1.5" fill="#94A3B8" />
      <circle cx="56" cy="49" r="4" fill="#0F172A" />
      <circle cx="56" cy="49" r="1.5" fill="#94A3B8" />
    </svg>
  );
}

// 7. Telecom: Light blue circular badge with telephone handset & signal waves
function TelecomBadge({ className = "w-20 h-20" }: { className?: string }) {
  return (
    <svg viewBox="0 0 80 80" className={className} fill="none">
      <circle cx="40" cy="40" r="40" fill="#67E8F9" />
      {/* Handset */}
      <path d="M26 38 C28 32 36 30 40 33 L37 38 L33 37 C32 40 36 44 39 45 L41 41 L45 44 C43 48 37 49 32 46 C27 43 24 41 26 38 Z" fill="#1E293B" />
      {/* Speech / Dial bubble */}
      <circle cx="48" cy="32" r="10" fill="#FFFFFF" opacity="0.9" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.1))" />
      <path d="M44 32 C44 30 46 28 48 28 M44 34 C44 36 46 37 48 37" stroke="#0284C7" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="48" cy="32" r="2" fill="#0284C7" />
    </svg>
  );
}

// 8. Health Care: Coral orange circular badge with medical Star of Life
function HealthCareBadge({ className = "w-20 h-20" }: { className?: string }) {
  return (
    <svg viewBox="0 0 80 80" className={className} fill="none">
      <circle cx="40" cy="40" r="40" fill="#EA580C" />
      {/* Star of Life cross */}
      <g fill="#FFFFFF">
        <path d="M37 20 L43 20 L42 35 L38 35 Z M37 60 L43 60 L42 45 L38 45 Z" />
        <path d="M23 29 L28 25 L37 37 L33 40 Z M57 51 L52 55 L43 43 L47 40 Z" />
        <path d="M57 29 L52 25 L43 37 L47 40 Z M23 51 L28 55 L37 43 L33 40 Z" />
      </g>
      {/* Rod & Serpent */}
      <line x1="40" y1="23" x2="40" y2="57" stroke="#EA580C" strokeWidth="2" strokeLinecap="round" />
      <path d="M37 28 Q43 32 37 36 Q43 40 37 44 Q43 48 40 52" stroke="#FFFFFF" strokeWidth="2" fill="none" strokeLinecap="round" />
    </svg>
  );
}

// Fallback Badge for custom added industries
function DefaultIndustryBadge({ className = "w-20 h-20" }: { className?: string }) {
  return (
    <svg viewBox="0 0 80 80" className={className} fill="none">
      <circle cx="40" cy="40" r="40" fill="#059669" />
      <rect x="26" y="26" width="28" height="28" rx="6" fill="#FFFFFF" />
      <circle cx="40" cy="40" r="6" fill="#059669" />
    </svg>
  );
}

/* ========================================================================== */
/* CURATED INDUSTRIES DICTIONARY (Matching User Reference Image Exactly)      */
/* ========================================================================== */
const INDUSTRY_PRESETS: Record<string, {
  name: string;
  desc: string;
  Badge: React.ComponentType<{ className?: string }>;
}> = {
  automotive: {
    name: "Automotive",
    desc: "We offer services that enable automakers and dealers to streamline processes and meet customer demands.",
    Badge: AutomotiveBadge,
  },
  "banking & financial": {
    name: "Banking & Financial",
    desc: "Our banking-focused solutions and services help banking and capital-markets clients achieve their business goals.",
    Badge: BankingBadge,
  },
  banking: {
    name: "Banking & Financial",
    desc: "Our banking-focused solutions and services help banking and capital-markets clients achieve their business goals.",
    Badge: BankingBadge,
  },
  "higher education": {
    name: "Higher Education",
    desc: "Whether you're running an online training course or a campus-based school, we increase student enrollments right away.",
    Badge: EducationBadge,
  },
  education: {
    name: "Higher Education",
    desc: "Whether you're running an online training course or a campus-based school, we increase student enrollments right away.",
    Badge: EducationBadge,
  },
  insurance: {
    name: "Insurance",
    desc: "We simplify and support enriched interactions between the insurance provider and its policyholders, brokers, agents, and all other customer-facing personnel.",
    Badge: InsuranceBadge,
  },
  "social media": {
    name: "Social Media",
    desc: "We have expertise in developing successful marketing programs to market technology-specific brands.",
    Badge: SocialMediaBadge,
  },
  "oil & gas": {
    name: "Oil & Gas",
    desc: "Our capabilities include mission-critical industry expertise, technology best practices, and operational safety.",
    Badge: OilGasBadge,
  },
  energy: {
    name: "Oil & Gas",
    desc: "Our capabilities include mission-critical industry expertise, technology best practices, and operational safety.",
    Badge: OilGasBadge,
  },
  telecom: {
    name: "Telecom",
    desc: "Global telecom companies unify financials with SAP in the Cloud.",
    Badge: TelecomBadge,
  },
  "health care": {
    name: "Health Care",
    desc: "Our team explains the strategies that help to transform your health information technology to achieve.",
    Badge: HealthCareBadge,
  },
  healthcare: {
    name: "Health Care",
    desc: "Our team explains the strategies that help to transform your health information technology to achieve.",
    Badge: HealthCareBadge,
  },
};

const DEFAULT_EIGHT_INDUSTRIES = [
  INDUSTRY_PRESETS["automotive"],
  INDUSTRY_PRESETS["banking & financial"],
  INDUSTRY_PRESETS["higher education"],
  INDUSTRY_PRESETS["insurance"],
  INDUSTRY_PRESETS["social media"],
  INDUSTRY_PRESETS["oil & gas"],
  INDUSTRY_PRESETS["telecom"],
  INDUSTRY_PRESETS["health care"],
];

export interface OriginalClientBrand {
  id: string;
  name: string;
  category: "banking" | "tech" | "telecom" | "enterprise" | "healthcare" | "media";
  image: string;
}

export const ORIGINAL_CLIENT_BRANDS: OriginalClientBrand[] = [
  // Banking & Finance (8)
  { id: "visa", name: "Visa", category: "banking", image: "/clients/visa.jpg" },
  { id: "capital-one", name: "Capital One", category: "banking", image: "/clients/capital-one.jpg" },
  { id: "wellsfargo", name: "Wells Fargo", category: "banking", image: "/clients/wellsfargo.jpg" },
  { id: "credit-suisse", name: "Credit Suisse", category: "banking", image: "/clients/credit-suisse.jpg" },
  { id: "dtcc", name: "DTCC", category: "banking", image: "/clients/dtcc.jpg" },
  { id: "fis", name: "FIS", category: "banking", image: "/clients/fis.jpg" },
  { id: "synovus-bank", name: "Synovus Bank", category: "banking", image: "/clients/synovus-bank.jpg" },
  { id: "zions-bank", name: "Zions Bank", category: "banking", image: "/clients/zions-bank.jpg" },

  // Technology (8)
  { id: "apple", name: "Apple", category: "tech", image: "/clients/apple.jpg" },
  { id: "tcs", name: "TCS", category: "tech", image: "/clients/tcs.jpg" },
  { id: "infosys", name: "Infosys", category: "tech", image: "/clients/infosys.jpg" },
  { id: "mphasis", name: "Mphasis", category: "tech", image: "/clients/mphasis.jpg" },
  { id: "highpoint", name: "HighPoint Solutions", category: "tech", image: "/clients/highpoint-solutions.jpg" },
  { id: "ivedix", name: "Ivedix", category: "tech", image: "/clients/ivedix.jpg" },
  { id: "socket", name: "Socket", category: "tech", image: "/clients/socket.jpg" },
  { id: "synchronoss", name: "Synchronoss", category: "tech", image: "/clients/synchronious.jpg" },

  // Telecom (3)
  { id: "at-t", name: "AT&T", category: "telecom", image: "/clients/at-t.jpg" },
  { id: "tmobile", name: "T-Mobile", category: "telecom", image: "/clients/tmobile.jpg" },
  { id: "cricket", name: "Cricket Wireless", category: "telecom", image: "/clients/cricket-wireless.jpg" },

  // Enterprise & Logistics (4)
  { id: "fedex", name: "FedEx", category: "enterprise", image: "/clients/fedex.jpg" },
  { id: "adt", name: "ADT", category: "enterprise", image: "/clients/adt.jpg" },
  { id: "agco", name: "AGCO", category: "enterprise", image: "/clients/agco.jpg" },
  { id: "assurant", name: "Assurant", category: "enterprise", image: "/clients/assurant.jpg" },

  // Healthcare (1)
  { id: "premier", name: "Premier Healthcare", category: "healthcare", image: "/clients/premier.jpg" },

  // Media & Public (3)
  { id: "the-economist", name: "The Economist", category: "media", image: "/clients/the-economist.jpg" },
  { id: "turner", name: "Turner Broadcasting", category: "media", image: "/clients/turner.jpg" },
  { id: "dot-usa", name: "U.S. Department of Transportation", category: "media", image: "/clients/dot-usa.jpg" },
];

const CLIENT_CATEGORIES = [
  { id: "all", label: "ALL CLIENTS", icon: Layers },
  { id: "banking", label: "BANKING & FINANCE", icon: Landmark },
  { id: "tech", label: "TECHNOLOGY", icon: Cpu },
  { id: "telecom", label: "TELECOM", icon: Radio },
  { id: "enterprise", label: "ENTERPRISE & LOGISTICS", icon: ShieldCheck },
  { id: "healthcare", label: "HEALTHCARE", icon: HeartPulse },
  { id: "media", label: "MEDIA & PUBLIC", icon: Award },
] as const;

function Clients() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [showAll, setShowAll] = useState(false);
  const [industriesList, setIndustriesList] = useState<any[]>([]);
  const [adminClientStudies, setAdminClientStudies] = useState<any[]>([]);
  const [studiesLoading, setStudiesLoading] = useState(true);
  const [loading, setLoading] = useState(true);

  // Merge dynamic admin client brands with default brand collection
  const allClientBrands = useMemo(() => {
    if (!adminClientStudies || adminClientStudies.length === 0) {
      return ORIGINAL_CLIENT_BRANDS;
    }

    const adminBrands: OriginalClientBrand[] = adminClientStudies.map((c) => {
      const s = (c.sector || "").toLowerCase();
      let cat = "tech";
      if (s.includes("bank") || s.includes("finan")) cat = "banking";
      else if (s.includes("telecom") || s.includes("network") || s.includes("mobile")) cat = "telecom";
      else if (s.includes("health") || s.includes("medic") || s.includes("pharma")) cat = "healthcare";
      else if (s.includes("enterprise") || s.includes("logistics") || s.includes("supply") || s.includes("manufactur")) cat = "enterprise";
      else if (s.includes("auto")) cat = "automotive";
      else if (s.includes("insur")) cat = "insurance";
      else if (s.includes("educat")) cat = "education";

      return {
        id: `admin-${c.id}`,
        name: c.name,
        category: cat,
        image: c.image || "/logo.png",
      };
    });

    // Admin-added client brands are prepended so they appear immediately in the top grid and marquee
    return [...adminBrands, ...ORIGINAL_CLIENT_BRANDS];
  }, [adminClientStudies]);

  // Segment brands for the mosaic layout matching the reference design
  const marquee1Row1 = useMemo(() => allClientBrands.slice(0, 5), [allClientBrands]);
  const marquee1Row2 = useMemo(() => allClientBrands.slice(5, 10), [allClientBrands]);
  const marquee1Row3 = useMemo(() => allClientBrands.slice(10, 14), [allClientBrands]);
  const marquee2Row1 = useMemo(() => allClientBrands.slice(14, 19), [allClientBrands]);
  const marquee2Row2 = useMemo(() => allClientBrands.slice(19, 23), [allClientBrands]);
  const marquee2Row3 = useMemo(() => allClientBrands.slice(23, 27), [allClientBrands]);

  // Filter client brands based on category tab
  const filteredBrands = useMemo(() => {
    if (selectedCategory === "all") return allClientBrands;
    return allClientBrands.filter((b) => b.category === selectedCategory);
  }, [allClientBrands, selectedCategory]);

  const topGridBrands = useMemo(() => {
    return filteredBrands.slice(0, 4);
  }, [filteredBrands]);

  const bottomGridBrands = useMemo(() => {
    if (filteredBrands.length > 4) {
      return filteredBrands.slice(4, 8);
    }
    return allClientBrands.slice(4, 8);
  }, [filteredBrands, allClientBrands]);

  // Filter admin case studies by category
  const filteredCaseStudies = useMemo(() => {
    if (selectedCategory === "all") return adminClientStudies;
    const catLower = selectedCategory.toLowerCase();
    const matched = adminClientStudies.filter((study) => {
      const s = (study.sector || "").toLowerCase();
      if (catLower === "banking" && (s.includes("bank") || s.includes("finance"))) return true;
      if (catLower === "tech" && (s.includes("tech") || s.includes("soft") || s.includes("cloud"))) return true;
      if (catLower === "telecom" && (s.includes("telecom") || s.includes("network") || s.includes("mobile"))) return true;
      if (catLower === "enterprise" && (s.includes("enterprise") || s.includes("logistics") || s.includes("supply") || s.includes("manufactur"))) return true;
      if (catLower === "healthcare" && (s.includes("health") || s.includes("pharma") || s.includes("medic") || s.includes("bio"))) return true;
      return s.includes(catLower);
    });
    return matched.length > 0 ? matched : adminClientStudies;
  }, [adminClientStudies, selectedCategory]);

  const extendedBrands = useMemo(() => {
    return filteredBrands.slice(8);
  }, [filteredBrands]);

  useEffect(() => {
    // Fetch clients & case studies managed from Admin
    fetch("/api/clients")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setAdminClientStudies(data);
        }
        setStudiesLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load client case studies", err);
        setStudiesLoading(false);
      });

    // Fetch industries
    fetch("/api/industries")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setIndustriesList(data);
        } else {
          setIndustriesList(DEFAULT_EIGHT_INDUSTRIES);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load industries", err);
        setIndustriesList(DEFAULT_EIGHT_INDUSTRIES);
        setLoading(false);
      });
  }, []);

  // Compute final display list mapping backend industries to rich badges & descriptions
  const displayIndustries =
    industriesList.length > 0
      ? industriesList.map((item) => {
          const key = (item.name || "").toLowerCase().trim();
          const preset = INDUSTRY_PRESETS[key];
          return {
            id: item.id || key,
            name: item.name || preset?.name || "Industry",
            desc: item.description || preset?.desc || "Enterprise technology and engineering practices.",
            Badge: preset?.Badge || DefaultIndustryBadge,
          };
        })
      : DEFAULT_EIGHT_INDUSTRIES;

  return (
    <SiteLayout>
      {/* ==================================================================== */}
      {/* OUR CLIENTS GALLERY (Matches User Reference Mosaic & Scrolling Logos)*/}
      {/* ==================================================================== */}
      <section className="bg-white dark:bg-slate-950 py-5 sm:py-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-3.5 sm:mb-4">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-slate-900 dark:text-white">
              Our Clients
            </h1>
            <p className="mt-2 text-sm sm:text-base text-slate-500 dark:text-slate-400 font-medium">
              Trusted by industry leaders and high-growth organizations worldwide
            </p>
          </div>

          {/* Category Tabs Bar with Icons (Matching Reference Image) */}
          <div className="border-b border-border/80 mb-3.5 sm:mb-4 overflow-x-auto no-scrollbar">
            <div className="flex items-center justify-center gap-2 sm:gap-6 min-w-max px-4">
              {CLIENT_CATEGORIES.map((cat) => {
                const IconComponent = cat.icon;
                const isActive = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => {
                      setSelectedCategory(cat.id);
                      setShowAll(false);
                    }}
                    className={`flex items-center gap-2 px-3 sm:px-4 py-2 text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-200 border-b-2 cursor-pointer ${
                      isActive
                        ? "border-[#136a3e] dark:border-emerald-400 text-[#136a3e] dark:text-emerald-400"
                        : "border-transparent text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                    }`}
                  >
                    <IconComponent
                      className={`h-4 w-4 ${isActive ? "text-[#136a3e] dark:text-emerald-400" : "text-slate-400"}`}
                    />
                    <span>{cat.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* ================================================================ */}
          {/* MOSAIC GALLERY: PART 1 (Big Scrolling Card Left, 2x2 Tiles Right) */}
          {/* ================================================================ */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5 items-stretch mb-4 sm:mb-5">
            {/* BIG CARD ON LEFT: SCROLLING LOGOS STREAM */}
            <div className="lg:col-span-6 relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-[#0b3821] p-4 sm:p-5 flex flex-col justify-center items-stretch text-white border border-emerald-900/50 shadow-xl min-h-[320px] sm:min-h-[340px] group/big">
              {/* Ambient Glow Orbs */}
              <div className="pointer-events-none absolute -top-24 -left-24 w-80 h-80 bg-emerald-500/15 rounded-full blur-3xl" />
              <div className="pointer-events-none absolute -bottom-24 -right-24 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl" />

              {/* SCROLLING BRAND LOGOS (Three Opposing Marquee Streams - Pure Original Logos) */}
              <div className="relative z-10 w-full space-y-2.5 sm:space-y-3 overflow-hidden py-1">
                {/* Fade masks */}
                <div className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-slate-950 to-transparent z-10" />
                <div className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-[#0b3821] to-transparent z-10" />

                {/* Track 1 (Scrolling Left) */}
                <div className="flex gap-4 w-max animate-marquee hover:[animation-play-state:paused] py-1">
                  {[...marquee1Row1, ...marquee1Row1, ...marquee1Row1, ...marquee1Row1].map((brand, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-center bg-white rounded-xl px-4 py-2 transition-all duration-300 min-w-[125px] sm:min-w-[145px] h-12 sm:h-14 shadow-md hover:scale-105 shrink-0"
                    >
                      <img
                        src={brand.image}
                        alt={brand.name}
                        className="max-h-7 sm:max-h-8 max-w-[105px] sm:max-w-[120px] w-auto object-contain"
                        loading="lazy"
                      />
                    </div>
                  ))}
                </div>

                {/* Track 2 (Scrolling Right / Reverse) */}
                <div className="flex gap-4 w-max animate-marquee-reverse hover:[animation-play-state:paused] py-1">
                  {[...marquee1Row2, ...marquee1Row2, ...marquee1Row2, ...marquee1Row2].map((brand, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-center bg-white rounded-xl px-4 py-2 transition-all duration-300 min-w-[125px] sm:min-w-[145px] h-12 sm:h-14 shadow-md hover:scale-105 shrink-0"
                    >
                      <img
                        src={brand.image}
                        alt={brand.name}
                        className="max-h-7 sm:max-h-8 max-w-[105px] sm:max-w-[120px] w-auto object-contain"
                        loading="lazy"
                      />
                    </div>
                  ))}
                </div>

                {/* Track 3 (Scrolling Left) */}
                <div className="flex gap-4 w-max animate-marquee hover:[animation-play-state:paused] py-1">
                  {[...marquee1Row3, ...marquee1Row3, ...marquee1Row3, ...marquee1Row3].map((brand, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-center bg-white rounded-xl px-4 py-2 transition-all duration-300 min-w-[125px] sm:min-w-[145px] h-12 sm:h-14 shadow-md hover:scale-105 shrink-0"
                    >
                      <img
                        src={brand.image}
                        alt={brand.name}
                        className="max-h-7 sm:max-h-8 max-w-[105px] sm:max-w-[120px] w-auto object-contain"
                        loading="lazy"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 2x2 TILES ON RIGHT (4 Distinct Original Brand Cards - Logos Only) */}
            <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
              {topGridBrands.map((brand) => (
                <div
                  key={brand.id}
                  className="group relative bg-white dark:bg-white border border-slate-200/90 dark:border-slate-300 rounded-2xl p-4 sm:p-5 flex items-center justify-center text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-1 min-h-[145px] sm:min-h-[155px]"
                >
                  <div className="h-10 sm:h-12 w-full flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                    <img
                      src={brand.image}
                      alt={brand.name}
                      className="max-h-9 sm:max-h-11 max-w-[140px] sm:max-w-[160px] w-auto object-contain"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ================================================================ */}
          {/* MOSAIC GALLERY: PART 2 (2x2 Tiles Left, Big Scrolling Card Right) */}
          {/* ================================================================ */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5 items-stretch">
            {/* 2x2 TILES ON LEFT (4 Distinct Original Brand Cards - Logos Only) */}
            <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 order-2 lg:order-1">
              {bottomGridBrands.map((brand) => (
                <div
                  key={brand.id}
                  className="group relative bg-white dark:bg-white border border-slate-200/90 dark:border-slate-300 rounded-2xl p-4 sm:p-5 flex items-center justify-center text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-1 min-h-[145px] sm:min-h-[155px]"
                >
                  <div className="h-10 sm:h-12 w-full flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                    <img
                      src={brand.image}
                      alt={brand.name}
                      className="max-h-9 sm:max-h-11 max-w-[140px] sm:max-w-[160px] w-auto object-contain"
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* BIG CARD ON RIGHT: SCROLLING ORIGINAL LOGOS */}
            <div className="lg:col-span-6 relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0c2333] via-slate-900 to-[#0e3b25] p-4 sm:p-5 flex flex-col justify-center items-stretch text-white border border-cyan-900/50 shadow-xl min-h-[320px] sm:min-h-[340px] group/big order-1 lg:order-2">
              {/* Ambient Glow Orbs */}
              <div className="pointer-events-none absolute -top-24 -right-24 w-80 h-80 bg-cyan-500/15 rounded-full blur-3xl" />
              <div className="pointer-events-none absolute -bottom-24 -left-24 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl" />

              {/* SCROLLING BRAND LOGOS (Three Opposing Marquee Streams - Pure Original Logos) */}
              <div className="relative z-10 w-full space-y-2.5 sm:space-y-3 overflow-hidden py-1">
                {/* Fade masks */}
                <div className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-[#0c2333] to-transparent z-10" />
                <div className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-[#0e3b25] to-transparent z-10" />

                {/* Track 1 (Scrolling Left) */}
                <div className="flex gap-4 w-max animate-marquee hover:[animation-play-state:paused] py-1">
                  {[...marquee2Row1, ...marquee2Row1, ...marquee2Row1, ...marquee2Row1].map((brand, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-center bg-white rounded-xl px-4 py-2 transition-all duration-300 min-w-[125px] sm:min-w-[145px] h-12 sm:h-14 shadow-md hover:scale-105 shrink-0"
                    >
                      <img
                        src={brand.image}
                        alt={brand.name}
                        className="max-h-7 sm:max-h-8 max-w-[105px] sm:max-w-[120px] w-auto object-contain"
                        loading="lazy"
                      />
                    </div>
                  ))}
                </div>

                {/* Track 2 (Scrolling Right / Reverse) */}
                <div className="flex gap-4 w-max animate-marquee-reverse hover:[animation-play-state:paused] py-1">
                  {[...marquee2Row2, ...marquee2Row2, ...marquee2Row2, ...marquee2Row2].map((brand, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-center bg-white rounded-xl px-4 py-2 transition-all duration-300 min-w-[125px] sm:min-w-[145px] h-12 sm:h-14 shadow-md hover:scale-105 shrink-0"
                    >
                      <img
                        src={brand.image}
                        alt={brand.name}
                        className="max-h-7 sm:max-h-8 max-w-[105px] sm:max-w-[120px] w-auto object-contain"
                        loading="lazy"
                      />
                    </div>
                  ))}
                </div>

                {/* Track 3 (Scrolling Left) */}
                <div className="flex gap-4 w-max animate-marquee hover:[animation-play-state:paused] py-1">
                  {[...marquee2Row3, ...marquee2Row3, ...marquee2Row3, ...marquee2Row3].map((brand, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-center bg-white rounded-xl px-4 py-2 transition-all duration-300 min-w-[125px] sm:min-w-[145px] h-12 sm:h-14 shadow-md hover:scale-105 shrink-0"
                    >
                      <img
                        src={brand.image}
                        alt={brand.name}
                        className="max-h-7 sm:max-h-8 max-w-[105px] sm:max-w-[120px] w-auto object-contain"
                        loading="lazy"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* EXTENDED DIRECTORY (Shown when "LOAD MORE" is toggled) */}
          {showAll && extendedBrands.length > 0 && (
            <div className="mt-8 pt-8 border-t border-border/80 animate-in fade-in duration-300">
              <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-6 text-center">
                Extended Partner Directory ({extendedBrands.length} Additional Brands)
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-6">
                {extendedBrands.map((brand) => (
                  <div
                    key={brand.id}
                    className="group relative bg-white dark:bg-white border border-slate-200/90 dark:border-slate-300 rounded-3xl p-6 sm:p-7 flex items-center justify-center text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-1 min-h-[170px]"
                  >
                    <div className="h-12 w-full flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                      <img
                        src={brand.image}
                        alt={brand.name}
                        className="max-h-10 max-w-[140px] w-auto object-contain"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Load More Pill Button (Matching Reference Image) */}
          {extendedBrands.length > 0 && (
            <div className="mt-4 sm:mt-5 text-center">
              <button
                onClick={() => setShowAll(!showAll)}
                className="inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-[#136a3e] to-[#0f5431] hover:from-[#0f5431] hover:to-[#0a3b22] text-white px-9 py-3 text-xs font-bold uppercase tracking-wider shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer"
              >
                <span>{showAll ? "Show Less" : "Load More"}</span>
                <ArrowRight className={`h-4 w-4 transition-transform duration-300 ${showAll ? "-rotate-90" : ""}`} />
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ==================================================================== */}
      {/* CLIENT CASE STUDIES & OUTCOMES (Synced Live with Admin Panel)        */}
      {/* ==================================================================== */}
      <section className="border-t border-border/80 bg-slate-50/70 dark:bg-slate-900/40 py-5 sm:py-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-4 sm:mb-5 gap-3">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#136a3e] dark:text-emerald-400">
                Enterprise Case Studies
              </span>
              <h2 className="mt-2 text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                Client Success Stories &amp; Deliverables
              </h2>
              <div className="w-12 h-1 bg-[#136a3e] rounded-full mt-3" />
            </div>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-md leading-relaxed">
              Real-world transformations, platform modernization, and quantifiable business outcomes engineered for our clients.
            </p>
          </div>

          {studiesLoading && adminClientStudies.length === 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 animate-pulse">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-80 rounded-3xl bg-slate-200 dark:bg-slate-800" />
              ))}
            </div>
          ) : filteredCaseStudies.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-border/80 p-8 text-center">
              <p className="text-sm text-slate-500">No client studies published yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
              {filteredCaseStudies.map((study) => (
                <div
                  key={study.id}
                  className="group relative flex flex-col justify-between overflow-hidden rounded-3xl bg-white dark:bg-slate-950 border border-slate-200/90 dark:border-slate-800 p-6 sm:p-7 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5"
                >
                  <div>
                    {/* Cover image if available */}
                    {study.image ? (
                      <div className="relative mb-5 h-48 w-full overflow-hidden rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800">
                        <img
                          src={study.image}
                          alt={study.name}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                          loading="lazy"
                        />
                        {study.sector && (
                          <div className="absolute top-3 left-3 rounded-full bg-slate-950/85 backdrop-blur-md px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-emerald-400 border border-emerald-500/30 shadow-md">
                            {study.sector}
                          </div>
                        )}
                      </div>
                    ) : (
                      study.sector && (
                        <div className="mb-4 inline-block rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#136a3e] dark:text-emerald-400 border border-emerald-500/20">
                          {study.sector}
                        </div>
                      )
                    )}

                    <h3 className="text-lg sm:text-xl font-bold tracking-tight text-slate-900 dark:text-white group-hover:text-[#136a3e] dark:group-hover:text-emerald-400 transition-colors">
                      {study.name}
                    </h3>
                    <p className="mt-3 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                      {study.description}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-semibold text-[#136a3e] dark:text-emerald-400">
                    <span>Verified Engagement</span>
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ==================================================================== */}
      {/* INDUSTRIES WE SERVE (Matches User Reference Image Layout & SVGs)     */}
      {/* ==================================================================== */}
      <section className="border-t border-border/80 bg-white dark:bg-slate-950 py-5 sm:py-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-4 sm:mb-5">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#136a3e] dark:text-emerald-400">
              Domains &amp; Verticals
            </span>
            <h2 className="mt-1.5 text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Industries We Serve
            </h2>
            <div className="w-12 h-1 bg-[#136a3e] rounded-full mt-2" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 lg:gap-x-8 gap-y-5 sm:gap-y-6">
            {displayIndustries.map((ind, idx) => {
              const BadgeComponent = ind.Badge || DefaultIndustryBadge;
              return (
                <div key={idx} className="group flex flex-col items-start text-left">
                  {/* Flat Circular Illustration Badge */}
                  <div className="w-16 h-16 sm:w-18 sm:h-18 mb-2.5 sm:mb-3 transition-transform duration-300 ease-out group-hover:scale-105 group-hover:-translate-y-1">
                    <BadgeComponent className="w-full h-full drop-shadow-sm" />
                  </div>

                  {/* Industry Title */}
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white tracking-tight group-hover:text-[#136a3e] dark:group-hover:text-emerald-400 transition-colors">
                    {ind.name}
                  </h3>

                  {/* Industry Description */}
                  <p className="mt-2.5 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    {ind.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
