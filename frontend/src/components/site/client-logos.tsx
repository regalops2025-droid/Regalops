import React from "react";

export interface ClientBrand {
  id: string;
  name: string;
  category: "banking" | "healthcare" | "automotive" | "tech" | "telecom" | "energy";
  categoryLabel: string;
  tagline: string;
  featured?: boolean;
  Logo: React.ComponentType<{ className?: string }>;
}

/* ========================================================================== */
/* VECTOR CLIENT LOGOS (High-Fidelity Enterprise Brand SVGs)                  */
/* ========================================================================== */

// 1. JPMorgan Chase
export function JPMorganLogo({ className = "h-8 w-auto" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 48" className={className} fill="none">
      <path d="M12 8 L24 20 L24 28 L12 40 L4 32 L16 20 L16 16 L4 8 Z" fill="#00355f" />
      <path d="M40 8 L28 20 L28 28 L40 40 L48 32 L36 20 L36 16 L48 8 Z" fill="#00355f" />
      <text x="58" y="30" fill="currentColor" fontFamily="sans-serif" fontSize="18" fontWeight="700" letterSpacing="0.5">
        J.P.Morgan
      </text>
    </svg>
  );
}

// 2. Barclays
export function BarclaysLogo({ className = "h-8 w-auto" }: { className?: string }) {
  return (
    <svg viewBox="0 0 180 48" className={className} fill="none">
      <path d="M18 10 C24 16 28 24 28 34 C24 36 16 36 10 32 C12 24 14 16 18 10 Z" fill="#00aeef" />
      <path d="M32 10 C26 16 22 24 22 34 C26 36 34 36 40 32 C38 24 36 16 32 10 Z" fill="#00aeef" />
      <circle cx="25" cy="18" r="3" fill="#00aeef" />
      <text x="50" y="30" fill="currentColor" fontFamily="sans-serif" fontSize="17" fontWeight="800" letterSpacing="1">
        BARCLAYS
      </text>
    </svg>
  );
}

// 3. HSBC
export function HscbLogo({ className = "h-8 w-auto" }: { className?: string }) {
  return (
    <svg viewBox="0 0 160 48" className={className} fill="none">
      {/* Central white & red triangles */}
      <rect x="6" y="10" width="28" height="28" fill="#DB0011" />
      <polygon points="20,10 6,24 20,38 34,24" fill="#FFFFFF" />
      <polygon points="6,10 20,24 6,38" fill="#DB0011" />
      <polygon points="34,10 20,24 34,38" fill="#DB0011" />
      <text x="44" y="30" fill="currentColor" fontFamily="sans-serif" fontSize="19" fontWeight="800" letterSpacing="1.5">
        HSBC
      </text>
    </svg>
  );
}

// 4. Visa
export function VisaLogo({ className = "h-8 w-auto" }: { className?: string }) {
  return (
    <svg viewBox="0 0 130 44" className={className} fill="none">
      <text x="10" y="32" fill="#1A1F71" fontFamily="sans-serif" fontSize="32" fontStyle="italic" fontWeight="900" letterSpacing="-1">
        VISA
      </text>
      <path d="M12 10 L22 10 L18 18 Z" fill="#F7B600" />
    </svg>
  );
}

// 5. Mastercard
export function MastercardLogo({ className = "h-8 w-auto" }: { className?: string }) {
  return (
    <svg viewBox="0 0 160 48" className={className} fill="none">
      <circle cx="24" cy="24" r="16" fill="#EB001B" />
      <circle cx="44" cy="24" r="16" fill="#F79E1B" fillOpacity="0.9" />
      <path d="M34 11.5 A16 16 0 0 1 34 36.5 A16 16 0 0 1 34 11.5 Z" fill="#FF5F00" />
      <text x="70" y="30" fill="currentColor" fontFamily="sans-serif" fontSize="16" fontWeight="700" letterSpacing="-0.5">
        mastercard
      </text>
    </svg>
  );
}

// 6. Goldman Sachs
export function GoldmanLogo({ className = "h-8 w-auto" }: { className?: string }) {
  return (
    <svg viewBox="0 0 190 48" className={className} fill="none">
      <rect x="6" y="8" width="32" height="32" rx="4" fill="#7399C6" />
      <text x="14" y="30" fill="#FFFFFF" fontFamily="serif" fontSize="18" fontWeight="bold">
        GS
      </text>
      <text x="48" y="24" fill="currentColor" fontFamily="serif" fontSize="14" fontWeight="bold" letterSpacing="0.5">
        Goldman
      </text>
      <text x="48" y="38" fill="currentColor" fontFamily="serif" fontSize="14" fontWeight="bold" letterSpacing="0.5">
        Sachs
      </text>
    </svg>
  );
}

// 7. Pfizer
export function PfizerLogo({ className = "h-8 w-auto" }: { className?: string }) {
  return (
    <svg viewBox="0 0 150 48" className={className} fill="none">
      {/* Helix ribbon */}
      <path d="M14 12 C24 16 24 32 14 36 C8 32 8 16 14 12 Z" fill="#0093D0" />
      <path d="M26 12 C16 16 16 32 26 36 C32 32 32 16 26 12 Z" fill="#000080" opacity="0.8" />
      <text x="42" y="31" fill="currentColor" fontFamily="sans-serif" fontSize="21" fontWeight="700" fontStyle="italic">
        Pfizer
      </text>
    </svg>
  );
}

// 8. Novartis
export function NovartisLogo({ className = "h-8 w-auto" }: { className?: string }) {
  return (
    <svg viewBox="0 0 160 48" className={className} fill="none">
      {/* Terracotta flower pestle flame */}
      <path d="M12 34 C12 24 20 16 24 10 C28 16 36 24 36 34 C36 40 12 40 12 34 Z" fill="#E84A27" />
      <path d="M20 34 C20 28 24 22 24 18 C26 22 30 28 30 34 Z" fill="#FFB81C" />
      <text x="46" y="30" fill="currentColor" fontFamily="sans-serif" fontSize="17" fontWeight="700" letterSpacing="1">
        NOVARTIS
      </text>
    </svg>
  );
}

// 9. UnitedHealth Group
export function UnitedHealthLogo({ className = "h-8 w-auto" }: { className?: string }) {
  return (
    <svg viewBox="0 0 190 48" className={className} fill="none">
      <rect x="8" y="10" width="28" height="28" rx="6" fill="#002677" />
      <path d="M14 20 L22 28 L30 18" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <text x="44" y="24" fill="currentColor" fontFamily="sans-serif" fontSize="13" fontWeight="800">
        UNITEDHEALTH
      </text>
      <text x="44" y="37" fill="#002677" className="dark:fill-sky-400" fontFamily="sans-serif" fontSize="11" fontWeight="700" letterSpacing="1">
        GROUP
      </text>
    </svg>
  );
}

// 10. Johnson & Johnson
export function JNJLogo({ className = "h-8 w-auto" }: { className?: string }) {
  return (
    <svg viewBox="0 0 210 48" className={className} fill="none">
      <text x="6" y="32" fill="#D51900" fontFamily="serif" fontStyle="italic" fontSize="22" fontWeight="bold">
        Johnson &amp; Johnson
      </text>
    </svg>
  );
}

// 11. Tesla
export function TeslaLogo({ className = "h-8 w-auto" }: { className?: string }) {
  return (
    <svg viewBox="0 0 150 48" className={className} fill="none">
      <path d="M22 14 C16 14 10 16 6 18 L10 22 C14 20 18 19 22 19 C26 19 30 20 34 22 L38 18 C34 16 28 14 22 14 Z" fill="#E82127" />
      <path d="M20 22 L24 22 L23 38 L21 38 Z" fill="#E82127" />
      <text x="48" y="30" fill="currentColor" fontFamily="sans-serif" fontSize="19" fontWeight="800" letterSpacing="3">
        TESLA
      </text>
    </svg>
  );
}

// 12. BMW
export function BmwLogo({ className = "h-8 w-auto" }: { className?: string }) {
  return (
    <svg viewBox="0 0 140 48" className={className} fill="none">
      <circle cx="24" cy="24" r="18" fill="#1C1C1C" stroke="#888888" strokeWidth="1.5" />
      <path d="M24 10 A14 14 0 0 1 38 24 L24 24 Z" fill="#0066B1" />
      <path d="M24 24 L10 24 A14 14 0 0 1 24 10 Z" fill="#FFFFFF" />
      <path d="M24 24 L38 24 A14 14 0 0 1 24 38 Z" fill="#FFFFFF" />
      <path d="M10 24 A14 14 0 0 0 24 38 L24 24 Z" fill="#0066B1" />
      <text x="52" y="31" fill="currentColor" fontFamily="sans-serif" fontSize="20" fontWeight="900" letterSpacing="2">
        BMW
      </text>
    </svg>
  );
}

// 13. Mercedes-Benz
export function MercedesLogo({ className = "h-8 w-auto" }: { className?: string }) {
  return (
    <svg viewBox="0 0 190 48" className={className} fill="none">
      <circle cx="24" cy="24" r="17" stroke="#64748B" strokeWidth="2" fill="none" />
      <path d="M24 8 L24 24 L10 32 M24 24 L38 32" stroke="#64748B" strokeWidth="2.5" strokeLinecap="round" />
      <text x="50" y="30" fill="currentColor" fontFamily="sans-serif" fontSize="16" fontWeight="700" letterSpacing="1">
        Mercedes-Benz
      </text>
    </svg>
  );
}

// 14. Toyota
export function ToyotaLogo({ className = "h-8 w-auto" }: { className?: string }) {
  return (
    <svg viewBox="0 0 160 48" className={className} fill="none">
      <ellipse cx="24" cy="24" rx="18" ry="12" stroke="#EB0A1E" strokeWidth="2.5" fill="none" />
      <ellipse cx="24" cy="24" rx="7" ry="12" stroke="#EB0A1E" strokeWidth="2" fill="none" />
      <ellipse cx="24" cy="18" rx="12" ry="5" stroke="#EB0A1E" strokeWidth="2" fill="none" />
      <text x="52" y="30" fill="currentColor" fontFamily="sans-serif" fontSize="18" fontWeight="800" letterSpacing="1">
        TOYOTA
      </text>
    </svg>
  );
}

// 15. Microsoft
export function MicrosoftLogo({ className = "h-8 w-auto" }: { className?: string }) {
  return (
    <svg viewBox="0 0 170 48" className={className} fill="none">
      <rect x="6" y="10" width="12" height="12" fill="#F25022" />
      <rect x="20" y="10" width="12" height="12" fill="#7FBA00" />
      <rect x="6" y="24" width="12" height="12" fill="#00A4EF" />
      <rect x="20" y="24" width="12" height="12" fill="#FFB900" />
      <text x="40" y="30" fill="currentColor" fontFamily="sans-serif" fontSize="18" fontWeight="600">
        Microsoft
      </text>
    </svg>
  );
}

// 16. Google Cloud
export function GoogleCloudLogo({ className = "h-8 w-auto" }: { className?: string }) {
  return (
    <svg viewBox="0 0 180 48" className={className} fill="none">
      <circle cx="16" cy="24" r="8" fill="#4285F4" />
      <circle cx="26" cy="18" r="9" fill="#EA4335" />
      <circle cx="34" cy="24" r="7" fill="#FBBC05" />
      <rect x="18" y="24" width="16" height="8" fill="#34A853" />
      <text x="48" y="24" fill="currentColor" fontFamily="sans-serif" fontSize="14" fontWeight="600">
        Google Cloud
      </text>
      <text x="48" y="36" fill="#64748B" fontFamily="sans-serif" fontSize="10" fontWeight="600" letterSpacing="1">
        PLATFORM
      </text>
    </svg>
  );
}

// 17. Amazon AWS
export function AwsLogo({ className = "h-8 w-auto" }: { className?: string }) {
  return (
    <svg viewBox="0 0 140 48" className={className} fill="none">
      <text x="10" y="28" fill="currentColor" fontFamily="sans-serif" fontSize="24" fontWeight="900" letterSpacing="1">
        aws
      </text>
      <path d="M10 34 Q32 44 54 34" stroke="#FF9900" strokeWidth="3" strokeLinecap="round" fill="none" />
      <polygon points="56,33 50,32 54,38" fill="#FF9900" />
    </svg>
  );
}

// 18. Cisco
export function CiscoLogo({ className = "h-8 w-auto" }: { className?: string }) {
  return (
    <svg viewBox="0 0 150 48" className={className} fill="none">
      <line x1="8" y1="20" x2="8" y2="28" stroke="#049FD9" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="14" y1="16" x2="14" y2="28" stroke="#049FD9" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="20" y1="12" x2="20" y2="28" stroke="#049FD9" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="26" y1="16" x2="26" y2="28" stroke="#049FD9" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="32" y1="20" x2="32" y2="28" stroke="#049FD9" strokeWidth="2.5" strokeLinecap="round" />
      <text x="42" y="28" fill="currentColor" fontFamily="sans-serif" fontSize="18" fontWeight="800" letterSpacing="1">
        CISCO
      </text>
    </svg>
  );
}

// 19. Salesforce
export function SalesforceLogo({ className = "h-8 w-auto" }: { className?: string }) {
  return (
    <svg viewBox="0 0 170 48" className={className} fill="none">
      <path d="M16 28 C12 28 8 24 8 20 C8 15 12 12 16 12 C18 8 24 6 30 8 C34 10 36 14 36 18 C40 18 44 22 44 26 C44 30 40 32 36 32 Z" fill="#00A1E0" />
      <text x="50" y="28" fill="currentColor" fontFamily="sans-serif" fontSize="17" fontWeight="700">
        salesforce
      </text>
    </svg>
  );
}

// 20. Verizon
export function VerizonLogo({ className = "h-8 w-auto" }: { className?: string }) {
  return (
    <svg viewBox="0 0 150 48" className={className} fill="none">
      <text x="8" y="30" fill="currentColor" fontFamily="sans-serif" fontSize="20" fontWeight="900">
        verizon
      </text>
      <path d="M86 16 L94 28 L104 10" stroke="#CD040B" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  );
}

// 21. AT&T
export function AttLogo({ className = "h-8 w-auto" }: { className?: string }) {
  return (
    <svg viewBox="0 0 140 48" className={className} fill="none">
      <circle cx="22" cy="24" r="15" fill="#00A8E0" />
      <ellipse cx="22" cy="24" rx="15" ry="5" fill="#FFFFFF" fillOpacity="0.4" />
      <ellipse cx="22" cy="24" rx="15" ry="10" fill="#FFFFFF" fillOpacity="0.2" />
      <text x="46" y="31" fill="currentColor" fontFamily="sans-serif" fontSize="22" fontWeight="900">
        at&amp;t
      </text>
    </svg>
  );
}

// 22. Vodafone
export function VodafoneLogo({ className = "h-8 w-auto" }: { className?: string }) {
  return (
    <svg viewBox="0 0 160 48" className={className} fill="none">
      <circle cx="22" cy="24" r="16" fill="#E60000" />
      <path d="M22 14 C17 14 14 18 14 23 C14 27 17 31 22 31 C25 31 28 29 29 26 L24 26 C23 27 22 28 21 28 C19 28 17 26 17 23 C17 20 19 18 21 18 C23 18 25 19 26 21 L30 18 C28 15 25 14 22 14 Z" fill="#FFFFFF" />
      <text x="46" y="30" fill="currentColor" fontFamily="sans-serif" fontSize="17" fontWeight="700">
        vodafone
      </text>
    </svg>
  );
}

// 23. Shell
export function ShellLogo({ className = "h-8 w-auto" }: { className?: string }) {
  return (
    <svg viewBox="0 0 140 48" className={className} fill="none">
      <path d="M12 36 L16 16 L24 10 L32 16 L36 36 L24 40 Z" fill="#FBCE07" stroke="#DD1D21" strokeWidth="2" />
      <line x1="24" y1="10" x2="24" y2="40" stroke="#DD1D21" strokeWidth="1.5" />
      <line x1="20" y1="13" x2="16" y2="38" stroke="#DD1D21" strokeWidth="1.5" />
      <line x1="28" y1="13" x2="32" y2="38" stroke="#DD1D21" strokeWidth="1.5" />
      <text x="46" y="30" fill="currentColor" fontFamily="sans-serif" fontSize="19" fontWeight="800">
        Shell
      </text>
    </svg>
  );
}

// 24. Siemens
export function SiemensLogo({ className = "h-8 w-auto" }: { className?: string }) {
  return (
    <svg viewBox="0 0 160 48" className={className} fill="none">
      <text x="8" y="30" fill="#00646E" className="dark:fill-[#00A3A6]" fontFamily="sans-serif" fontSize="21" fontWeight="900" letterSpacing="1">
        SIEMENS
      </text>
    </svg>
  );
}

/* ========================================================================== */
/* CURATED CLIENT PARTNERS CATALOG                                            */
/* ========================================================================== */
export const CLIENT_BRANDS: ClientBrand[] = [
  // Banking & Finance
  {
    id: "jpmorgan",
    name: "J.P. Morgan",
    category: "banking",
    categoryLabel: "Banking & Finance",
    tagline: "Core Banking Modernization & Real-Time Telemetry",
    featured: true,
    Logo: JPMorganLogo,
  },
  {
    id: "barclays",
    name: "Barclays",
    category: "banking",
    categoryLabel: "Banking & Finance",
    tagline: "Algorithmic Risk Engines & Cloud Compliance",
    Logo: BarclaysLogo,
  },
  {
    id: "hsbc",
    name: "HSBC",
    category: "banking",
    categoryLabel: "Banking & Finance",
    tagline: "Global Transaction Settlement Architecture",
    featured: true,
    Logo: HscbLogo,
  },
  {
    id: "visa",
    name: "Visa",
    category: "banking",
    categoryLabel: "Banking & Finance",
    tagline: "Sub-Second Micro-Payment Gateway Integration",
    Logo: VisaLogo,
  },
  {
    id: "mastercard",
    name: "Mastercard",
    category: "banking",
    categoryLabel: "Banking & Finance",
    tagline: "Decentralized Tokenization & Fraud Prevention",
    Logo: MastercardLogo,
  },
  {
    id: "goldman",
    name: "Goldman Sachs",
    category: "banking",
    categoryLabel: "Banking & Finance",
    tagline: "Enterprise Wealth Management API Ecosystem",
    Logo: GoldmanLogo,
  },

  // Healthcare
  {
    id: "pfizer",
    name: "Pfizer",
    category: "healthcare",
    categoryLabel: "Healthcare & Life Sciences",
    tagline: "Clinical Trial Data Pipelines & HIPAA Analytics",
    featured: true,
    Logo: PfizerLogo,
  },
  {
    id: "novartis",
    name: "Novartis",
    category: "healthcare",
    categoryLabel: "Healthcare & Life Sciences",
    tagline: "Drug Discovery ML Models & Cloud Bioinformatics",
    Logo: NovartisLogo,
  },
  {
    id: "unitedhealth",
    name: "UnitedHealth Group",
    category: "healthcare",
    categoryLabel: "Healthcare & Life Sciences",
    tagline: "Unified Provider Network & EHR Interoperability",
    Logo: UnitedHealthLogo,
  },
  {
    id: "jnj",
    name: "Johnson & Johnson",
    category: "healthcare",
    categoryLabel: "Healthcare & Life Sciences",
    tagline: "Medical Device Telemetry & Automated Auditing",
    Logo: JNJLogo,
  },

  // Automotive
  {
    id: "tesla",
    name: "Tesla",
    category: "automotive",
    categoryLabel: "Automotive & Mobility",
    tagline: "Fleet Edge Telemetry & Real-Time Diagnostics",
    featured: true,
    Logo: TeslaLogo,
  },
  {
    id: "bmw",
    name: "BMW",
    category: "automotive",
    categoryLabel: "Automotive & Mobility",
    tagline: "Smart Factory Digital Twins & Supply Chain IoT",
    Logo: BmwLogo,
  },
  {
    id: "mercedes",
    name: "Mercedes-Benz",
    category: "automotive",
    categoryLabel: "Automotive & Mobility",
    tagline: "Connected Vehicle Operating Architecture",
    Logo: MercedesLogo,
  },
  {
    id: "toyota",
    name: "Toyota",
    category: "automotive",
    categoryLabel: "Automotive & Mobility",
    tagline: "Just-In-Time Logistics & Quality Telemetry",
    Logo: ToyotaLogo,
  },

  // Technology
  {
    id: "microsoft",
    name: "Microsoft",
    category: "tech",
    categoryLabel: "Technology & Cloud",
    tagline: "Azure Multi-Region Enterprise Infrastructure",
    featured: true,
    Logo: MicrosoftLogo,
  },
  {
    id: "google-cloud",
    name: "Google Cloud",
    category: "tech",
    categoryLabel: "Technology & Cloud",
    tagline: "Kubernetes Cluster Modernization & BigQuery Data Mesh",
    Logo: GoogleCloudLogo,
  },
  {
    id: "aws",
    name: "Amazon AWS",
    category: "tech",
    categoryLabel: "Technology & Cloud",
    tagline: "Serverless Event-Driven Cloud Scaling",
    featured: true,
    Logo: AwsLogo,
  },
  {
    id: "cisco",
    name: "Cisco",
    category: "tech",
    categoryLabel: "Technology & Cloud",
    tagline: "Zero-Trust Enterprise Network Engineering",
    Logo: CiscoLogo,
  },
  {
    id: "salesforce",
    name: "Salesforce",
    category: "tech",
    categoryLabel: "Technology & Cloud",
    tagline: "Enterprise CRM Workflow Automation",
    Logo: SalesforceLogo,
  },

  // Telecom
  {
    id: "verizon",
    name: "Verizon",
    category: "telecom",
    categoryLabel: "Telecom & Networks",
    tagline: "5G Ultra-Wideband Core Edge Operations",
    featured: true,
    Logo: VerizonLogo,
  },
  {
    id: "att",
    name: "AT&T",
    category: "telecom",
    categoryLabel: "Telecom & Networks",
    tagline: "High-Availability Carrier Routing & Cloud VoLTE",
    Logo: AttLogo,
  },
  {
    id: "vodafone",
    name: "Vodafone",
    category: "telecom",
    categoryLabel: "Telecom & Networks",
    tagline: "Multi-Country Billing Microservices Transformation",
    Logo: VodafoneLogo,
  },

  // Energy & Logistics
  {
    id: "shell",
    name: "Shell",
    category: "energy",
    categoryLabel: "Energy & Infrastructure",
    tagline: "Mission-Critical IoT Sensor Pipelines & Predictive Safety",
    featured: true,
    Logo: ShellLogo,
  },
  {
    id: "siemens",
    name: "Siemens",
    category: "energy",
    categoryLabel: "Energy & Infrastructure",
    tagline: "Industrial Automation SCADA & Industrial Edge AI",
    Logo: SiemensLogo,
  },
];
