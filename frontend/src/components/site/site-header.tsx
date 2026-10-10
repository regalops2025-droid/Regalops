import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "@tanstack/react-router";
import {
  ChevronDown,
  Menu,
  X,
  ArrowRight,
  Sparkles,
  Briefcase,
  Code2,
  Cpu,
  Cloud,
  Layers,
  Bot,
  Database,
  Smartphone,
  ShieldCheck,
  Terminal,
  Users,
  Workflow,
  Lock,
  Compass,
  FileText,
  Crown,
  Globe,
  Linkedin,
  Youtube,
  Building2,
  Phone,
  Mail,
} from "lucide-react";
import { navItems, type NavChild } from "./nav-data";
import { FooterSocialIcons } from "./social-icons";
import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandSeparator,
} from "@/components/ui/command";

// X (formerly Twitter) official vector icon
function XIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width="13" height="13" fill="currentColor" {...props}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

// Icon resolution helper for dynamic solutions & technologies
function getNavIcon(name?: string) {
  if (!name) return Sparkles;
  const n = name.toLowerCase();
  if (n.includes("user") || n.includes("staffing")) return Users;
  if (n.includes("work") || n.includes("bpo") || n.includes("process")) return Workflow;
  if (n.includes("job") || n.includes("career") || n.includes("rpo") || n.includes("recruit")) return Briefcase;
  if (n.includes("code") || n.includes("app") || n.includes("custom")) return Code2;
  if (n.includes("cloud") || n.includes("aws") || n.includes("azure")) return Cloud;
  if (n.includes("data") || n.includes("analytics") || n.includes("lake")) return Database;
  if (n.includes("mobile") || n.includes("ios") || n.includes("android")) return Smartphone;
  if (n.includes("cpu") || n.includes("devops") || n.includes("k8s") || n.includes("kubernetes")) return Cpu;
  if (n.includes("layer") || n.includes("react") || n.includes("next")) return Layers;
  if (n.includes("term") || n.includes("node") || n.includes("python")) return Terminal;
  if (n.includes("bot") || n.includes("ai") || n.includes("ml") || n.includes("machine")) return Bot;
  if (n.includes("shield") || n.includes("secur")) return ShieldCheck;
  return Sparkles;
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [dynamicSolutions, setDynamicSolutions] = useState<any[]>([]);
  const [dynamicTechnologies, setDynamicTechnologies] = useState<any[]>([]);
  const [dynamicJobs, setDynamicJobs] = useState<any[]>([]);
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [activeAnnouncement, setActiveAnnouncement] = useState(0);

  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (to: string) => {
    if (to === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(to);
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Keyboard shortcut for command palette (Ctrl+K or Cmd+K)
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.key === "k" || e.key === "K") && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  // Auto-cycle top announcement badge on small mobile screens
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveAnnouncement((prev) => (prev + 1) % 3);
    }, 3200);
    return () => clearInterval(timer);
  }, []);

  // Fetch dynamic content
  useEffect(() => {
    fetch("/api/solutions")
      .then((res) => (res.ok ? res.json() : []))
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) setDynamicSolutions(data);
      })
      .catch((err) => console.error("Header: failed to fetch solutions", err));

    fetch("/api/technologies")
      .then((res) => (res.ok ? res.json() : []))
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) setDynamicTechnologies(data);
      })
      .catch((err) => console.error("Header: failed to fetch technologies", err));

    fetch("/api/jobs")
      .then((res) => (res.ok ? res.json() : []))
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) setDynamicJobs(data);
      })
      .catch((err) => console.error("Header: failed to fetch jobs", err));
  }, []);

  const handleSelectSearch = (path: string, params?: Record<string, string>) => {
    setSearchOpen(false);
    if (params && params["id"]) {
      navigate({ to: "/solutions/$id", params: { id: params["id"] } });
    } else {
      navigate({ to: path as any });
    }
  };

  return (
    <>
      <header className="sticky top-0 z-50 w-full select-none bg-transparent">
        {/* Top Micro-Bar (Enterprise Utility Strip matching Brand Green) */}
        <div className="w-full border-b border-[#0f4e2e] bg-[#136a3e] text-xs text-white/90 transition-all duration-300 shadow-xs">
          <div className="mx-auto flex max-w-[1400px] items-center justify-between px-3 sm:px-6 lg:px-8 py-1.5">
            {/* Mobile View (< sm): Centered, Rotating Single Trust Badge (Never clipped, fits 320px+) */}
            <div className="flex sm:hidden w-full items-center justify-center py-0.5 overflow-hidden">
              {activeAnnouncement === 0 && (
                <div className="flex items-center justify-center gap-1.5 text-center transition-all duration-300 animate-in fade-in">
                  <Crown className="h-3.5 w-3.5 text-[#fbbf24] shrink-0" />
                  <span className="font-medium text-white/95 text-[11px] whitespace-nowrap">
                    Top 500 Enterprise Partner
                  </span>
                </div>
              )}
              {activeAnnouncement === 1 && (
                <div className="flex items-center justify-center gap-1.5 text-center transition-all duration-300 animate-in fade-in">
                  <ShieldCheck className="h-3.5 w-3.5 text-[#6ee7b7] shrink-0" />
                  <span className="font-medium text-white/95 text-[11px] whitespace-nowrap">
                    99.98% SLA Guaranteed Uptime
                  </span>
                </div>
              )}
              {activeAnnouncement === 2 && (
                <div className="flex items-center justify-center gap-1.5 text-center transition-all duration-300 animate-in fade-in">
                  <Globe className="h-3.5 w-3.5 text-[#6ee7b7] shrink-0" />
                  <span className="font-medium text-white/95 text-[11px] whitespace-nowrap">
                    Serving 14+ Countries Worldwide
                  </span>
                </div>
              )}
            </div>

            {/* Tablet & Desktop View (sm+): All 3 Badges side-by-side */}
            <div className="hidden sm:flex items-center gap-2.5 sm:gap-4 overflow-x-auto no-scrollbar">
              <div className="flex items-center gap-1.5 whitespace-nowrap">
                <Crown className="h-3.5 w-3.5 text-[#fbbf24] shrink-0" />
                <span className="font-medium text-white/95">Top 500 Enterprise Partner</span>
              </div>
              <span className="text-white/30">|</span>
              <div className="flex items-center gap-1.5 whitespace-nowrap">
                <ShieldCheck className="h-3.5 w-3.5 text-[#6ee7b7] shrink-0" />
                <span className="font-medium text-white/95">99.98% SLA Uptime</span>
              </div>
              <span className="hidden md:inline text-white/30">|</span>
              <div className="hidden md:flex items-center gap-1.5 whitespace-nowrap">
                <Globe className="h-3.5 w-3.5 text-[#6ee7b7] shrink-0" />
                <span className="font-medium text-white/95">Serving 14+ Countries</span>
              </div>
            </div>

            {/* Right Socials & Micro Links (visible on tablet & desktop) */}
            <div className="hidden sm:flex items-center gap-2.5 sm:gap-4 shrink-0">
              <div className="hidden md:flex items-center gap-2 sm:gap-2.5">
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="text-white/75 hover:text-white transition-colors"
                >
                  <Linkedin className="h-3.5 w-3.5" />
                </a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YouTube"
                  className="text-white/75 hover:text-white transition-colors"
                >
                  <Youtube className="h-3.5 w-3.5" />
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="X"
                  className="text-white/75 hover:text-white transition-colors"
                >
                  <XIcon className="h-3 w-3" />
                </a>
              </div>
              <span className="hidden md:inline text-white/30">|</span>
              <Link
                to="/login"
                className="font-medium text-white/90 hover:text-amber-300 transition-colors whitespace-nowrap text-xs"
              >
                Client Portal
              </Link>
              <span className="text-white/30">|</span>
              <Link
                to="/career"
                className="font-medium text-white/90 hover:text-amber-300 transition-colors whitespace-nowrap text-xs"
              >
                Careers
              </Link>
            </div>
          </div>
        </div>

        {/* Floating Pill Main Navigation Bar (Calculated with ample internal clearance to NEVER overflow) */}
        <div className="w-full px-2 sm:px-4 lg:px-6 py-2 sm:py-2.5 transition-all duration-300">
          <div
            className={`mx-auto max-w-[1440px] rounded-full border border-neutral-200/90 bg-white/95 backdrop-blur-md px-3.5 sm:px-5 xl:px-6 2xl:px-8 py-1.5 sm:py-2 flex items-center justify-between gap-1.5 sm:gap-2 xl:gap-3 transition-all duration-300 min-h-[66px] sm:min-h-[72px] xl:min-h-[76px] ${
              scrolled
                ? "shadow-[0_8px_30px_rgba(0,0,0,0.08)] border-neutral-300/80"
                : "shadow-[0_4px_22px_rgba(0,0,0,0.04)]"
            }`}
          >
            {/* Logo Section */}
            <Link to="/" className="flex items-center gap-2 sm:gap-3 shrink-0 group">
              <img
                src="/logo.png"
                alt="Regal OPs Logo"
                className="h-10 sm:h-12 xl:h-13 2xl:h-14 w-auto object-contain shrink-0 transition-transform duration-200 group-hover:scale-105"
              />
              <div className="flex flex-col shrink-0 justify-center">
                <span className="font-display text-[18px] sm:text-[20px] xl:text-[22px] 2xl:text-[24px] font-bold tracking-tight text-neutral-900 leading-none whitespace-nowrap">
                  Regal OPs
                </span>
                <span className="text-[7.5px] sm:text-[8.5px] xl:text-[9.5px] 2xl:text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-500 mt-0.5 sm:mt-1 leading-none whitespace-nowrap">
                  CONSULT | BUILD | DEPLOY
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden xl:flex items-center gap-1.5 xl:gap-2.5 2xl:gap-4 shrink" aria-label="Main Navigation">
              {/* Home */}
              <Link
                to="/"
                className={`relative whitespace-nowrap text-[12.5px] xl:text-[13px] 2xl:text-sm font-semibold transition-colors py-1 ${
                  isActive("/")
                    ? "text-[#136a3e] font-bold after:absolute after:-bottom-1.5 after:left-0 after:right-0 after:h-[2px] after:bg-[#136a3e] after:rounded-full"
                    : "text-neutral-700 hover:text-neutral-950"
                }`}
              >
                Home
              </Link>

              {/* About Us */}
              <Link
                to="/about"
                className={`relative whitespace-nowrap text-[13px] 2xl:text-sm font-medium transition-colors py-1 ${
                  isActive("/about")
                    ? "text-[#136a3e] font-bold after:absolute after:-bottom-1.5 after:left-0 after:right-0 after:h-[2px] after:bg-[#136a3e] after:rounded-full"
                    : "text-neutral-700 hover:text-neutral-950"
                }`}
              >
                About Us
              </Link>

              {/* Solutions with Mega-Menu */}
              <div className="group relative">
                <Link
                  to="/solutions"
                  className={`flex items-center gap-0.5 whitespace-nowrap text-[13px] 2xl:text-sm font-medium transition-colors py-1 ${
                    isActive("/solutions")
                      ? "text-[#136a3e] font-bold after:absolute after:-bottom-1.5 after:left-0 after:right-0 after:h-[2px] after:bg-[#136a3e] after:rounded-full"
                      : "text-neutral-700 hover:text-neutral-950"
                  }`}
                >
                  <span>Solutions</span>
                  <ChevronDown className="h-3 w-3 text-neutral-400 group-hover:rotate-180 transition-transform duration-200" />
                </Link>

                {/* Solutions Dropdown Menu */}
                <div className="invisible absolute left-0 top-full pt-2 opacity-0 transition-all duration-150 ease-out group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 translate-y-1 pointer-events-none group-hover:pointer-events-auto z-50">
                  <div className="w-60 rounded-2xl border border-neutral-200/90 bg-white/98 backdrop-blur-xl p-1.5 shadow-[0_12px_32px_-4px_rgba(0,0,0,0.12)] ring-1 ring-black/5">
                    <div className="space-y-0.5">
                      {(dynamicSolutions.length > 0
                        ? dynamicSolutions.map((s) => ({
                            label: s.name,
                            to: "/solutions/$id",
                            params: { id: String(s.id) },
                          }))
                        : (navItems.find((n) => n.label === "Solutions")?.children || [])
                      ).map((child) => (
                        <Link
                          key={child.label}
                          to={(child.to || "/solutions") as any}
                          params={child.params as any}
                          className="group/item flex items-center justify-between rounded-xl px-3 py-2 text-xs font-semibold text-neutral-700 hover:text-[#136a3e] hover:bg-emerald-50/70 transition-colors"
                        >
                          <span className="truncate">{child.label}</span>
                          <ArrowRight className="h-3 w-3 text-neutral-400 group-hover/item:text-[#136a3e] group-hover/item:translate-x-0.5 transition-all opacity-0 group-hover/item:opacity-100 shrink-0 ml-1.5" />
                        </Link>
                      ))}
                    </div>

                    <div className="my-1 border-t border-neutral-100" />

                    <Link
                      to="/solutions"
                      className="flex items-center justify-between rounded-xl px-3 py-2 text-xs font-bold text-[#136a3e] hover:bg-emerald-50/70 transition-colors"
                    >
                      <span>All Solutions</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              </div>

              {/* Technologies with Simple Dropdown Menu */}
              <div className="group relative">
                <Link
                  to="/technologies"
                  className={`flex items-center gap-0.5 whitespace-nowrap text-[13px] 2xl:text-sm font-medium transition-colors py-1 ${
                    isActive("/technologies")
                      ? "text-[#136a3e] font-bold after:absolute after:-bottom-1.5 after:left-0 after:right-0 after:h-[2px] after:bg-[#136a3e] after:rounded-full"
                      : "text-neutral-700 hover:text-neutral-950"
                  }`}
                >
                  <span>Technologies</span>
                  <ChevronDown className="h-3 w-3 text-neutral-400 group-hover:rotate-180 transition-transform duration-200" />
                </Link>

                {/* Technologies Dropdown Menu */}
                <div className="invisible absolute left-0 top-full pt-2 opacity-0 transition-all duration-150 ease-out group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 translate-y-1 pointer-events-none group-hover:pointer-events-auto z-50">
                  <div className="w-60 rounded-2xl border border-neutral-200/90 bg-white/98 backdrop-blur-xl p-1.5 shadow-[0_12px_32px_-4px_rgba(0,0,0,0.12)] ring-1 ring-black/5">
                    <div className="space-y-0.5">
                      {(dynamicTechnologies.length > 0
                        ? dynamicTechnologies.map((t) => ({
                            label: t.name,
                            to: "/technologies",
                          }))
                        : (navItems.find((n) => n.label === "Technologies")?.children || [])
                      ).map((child) => (
                        <Link
                          key={child.label}
                          to="/technologies"
                          className="group/item flex items-center justify-between rounded-xl px-3 py-2 text-xs font-semibold text-neutral-700 hover:text-[#136a3e] hover:bg-emerald-50/70 transition-colors"
                        >
                          <span className="truncate">{child.label}</span>
                          <ArrowRight className="h-3 w-3 text-neutral-400 group-hover/item:text-[#136a3e] group-hover/item:translate-x-0.5 transition-all opacity-0 group-hover/item:opacity-100 shrink-0 ml-1.5" />
                        </Link>
                      ))}
                    </div>

                    <div className="my-1 border-t border-neutral-100" />

                    <Link
                      to="/technologies"
                      className="flex items-center justify-between rounded-xl px-3 py-2 text-xs font-bold text-[#136a3e] hover:bg-emerald-50/70 transition-colors"
                    >
                      <span>All Technologies</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              </div>

              {/* Clients */}
              <Link
                to="/clients"
                className={`relative whitespace-nowrap text-[13px] 2xl:text-sm font-medium transition-colors py-1 ${
                  isActive("/clients")
                    ? "text-[#136a3e] font-bold after:absolute after:-bottom-1.5 after:left-0 after:right-0 after:h-[2px] after:bg-[#136a3e] after:rounded-full"
                    : "text-neutral-700 hover:text-neutral-950"
                }`}
              >
                Clients
              </Link>

              {/* Career */}
              <Link
                to="/career"
                className={`relative whitespace-nowrap text-[13px] 2xl:text-sm font-medium transition-colors py-1 ${
                  isActive("/career")
                    ? "text-[#136a3e] font-bold after:absolute after:-bottom-1.5 after:left-0 after:right-0 after:h-[2px] after:bg-[#136a3e] after:rounded-full"
                    : "text-neutral-700 hover:text-neutral-950"
                }`}
              >
                Career
              </Link>

              {/* Blog */}
              <Link
                to="/blog"
                className={`relative whitespace-nowrap text-[13px] 2xl:text-sm font-medium transition-colors py-1 ${
                  isActive("/blog")
                    ? "text-[#136a3e] font-bold after:absolute after:-bottom-1.5 after:left-0 after:right-0 after:h-[2px] after:bg-[#136a3e] after:rounded-full"
                    : "text-neutral-700 hover:text-neutral-950"
                }`}
              >
                Blog
              </Link>

              {/* Contact Us */}
              <Link
                to="/contact"
                className={`relative whitespace-nowrap text-[13px] 2xl:text-sm font-medium transition-colors py-1 ${
                  isActive("/contact")
                    ? "text-[#136a3e] font-bold after:absolute after:-bottom-1.5 after:left-0 after:right-0 after:h-[2px] after:bg-[#136a3e] after:rounded-full"
                    : "text-neutral-700 hover:text-neutral-950"
                }`}
              >
                Contact Us
              </Link>
            </nav>

            {/* Right Action Group */}
            <div className="flex items-center gap-1.5 sm:gap-2 2xl:gap-2.5 shrink-0">

              {/* Book Consultation Button (displayed on tablet & desktop, accessible via mobile drawer on phones) */}
              <Link
                to="/contact"
                id="header-cta-button"
                className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-[#136a3e] hover:bg-[#0e5230] text-white text-xs xl:text-[13px] font-semibold px-3.5 sm:px-4 xl:px-4.5 2xl:px-5 py-2 xl:py-2.5 shadow-sm shadow-[#136a3e]/25 hover:shadow-md transition-all hover:scale-[1.02] active:scale-[0.98] whitespace-nowrap shrink-0 group"
              >
                <span>Book Consultation</span>
                <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5 shrink-0" />
              </Link>

              {/* Mobile Menu Hamburger Toggle */}
              <button
                type="button"
                aria-label="Toggle navigation menu"
                aria-expanded={open}
                onClick={() => setOpen((v) => !v)}
                className="grid h-9 w-9 sm:h-10 sm:w-10 place-items-center rounded-full border border-neutral-200 xl:hidden hover:bg-neutral-100 transition-colors text-neutral-700 cursor-pointer shrink-0"
              >
                {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {open && (
          <div className="fixed inset-x-0 bottom-0 top-[100px] z-40 h-[calc(100vh-100px)] overflow-y-auto bg-white/98 backdrop-blur-2xl border-t border-neutral-200 px-5 py-6 transition-all duration-300 animate-in fade-in slide-in-from-top-4 xl:hidden flex flex-col justify-between">
            <div className="space-y-4">

              {/* Mobile Nav Links */}
              <div className="divide-y divide-neutral-100">
                {navItems.map((item) => {
                  const isSolutions = item.label === "Solutions";
                  const isTechnologies = item.label === "Technologies";
                  const isCareer = item.label === "Career";

                  const childrenToRender: NavChild[] = isSolutions
                    ? dynamicSolutions.length > 0
                      ? dynamicSolutions.map((s) => ({
                          label: s.name,
                          desc: s.description,
                          icon: s.name,
                          to: "/solutions/$id",
                          params: { id: String(s.id) },
                        }))
                      : (item.children || [])
                    : isTechnologies
                      ? dynamicTechnologies.length > 0
                        ? dynamicTechnologies.map((t) => ({
                            label: t.name,
                            desc: t.description || t.keywords,
                            icon: t.name,
                            to: "/technologies",
                          }))
                        : (item.children || [])
                      : isCareer
                        ? dynamicJobs.length > 0
                          ? dynamicJobs.map((j) => ({
                              label: j.title,
                              desc: `${j.location} • ${j.type}`,
                              icon: "Briefcase",
                              to: "/career",
                            }))
                          : (item.children || [])
                        : (item.children || []);

                  const hasChildren = childrenToRender.length > 0;
                  const active = isActive(item.to);

                  return (
                    <div key={item.label} className="py-2.5">
                      <div className="flex items-center justify-between gap-2">
                        <Link
                          to={item.to}
                          onClick={() => setOpen(false)}
                          className={`text-base font-semibold py-1 transition-colors flex items-center gap-2 ${
                            active ? "text-[#136a3e] font-bold" : "text-neutral-800 hover:text-[#136a3e]"
                          }`}
                        >
                          <span>{item.label}</span>
                          {item.badge && (
                            <span className="rounded-full bg-[#dcfce7] px-2 py-0.2 text-[10px] font-bold uppercase tracking-wider text-[#15803d]">
                              {item.badge}
                            </span>
                          )}
                        </Link>
                        {hasChildren && (
                          <button
                            type="button"
                            aria-label={`Expand ${item.label}`}
                            onClick={() =>
                              setExpanded((v) => (v === item.label ? null : item.label))
                            }
                            className="shrink-0 p-2 text-neutral-400 hover:text-neutral-700"
                          >
                            <ChevronDown
                              className={`h-4 w-4 transition-transform duration-200 ${
                                expanded === item.label ? "rotate-180 text-[#136a3e]" : ""
                              }`}
                            />
                          </button>
                        )}
                      </div>

                      {hasChildren && expanded === item.label && (
                        <div className="mt-2 pl-2 space-y-1.5 border-l-2 border-[#136a3e]/30 animate-in fade-in slide-in-from-top-2 duration-200">
                          {childrenToRender.map((child) => {
                            const ChildIcon = getNavIcon(child.icon || child.label);
                            return (
                              <Link
                                key={child.label}
                                to={(child.to || item.to) as any}
                                params={child.params as any}
                                onClick={() => setOpen(false)}
                                className="flex items-start gap-2.5 rounded-lg p-2 transition-colors hover:bg-neutral-50"
                              >
                                <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded bg-emerald-50 text-[#136a3e]">
                                  <ChildIcon className="h-3.5 w-3.5" />
                                </div>
                                <div className="min-w-0 flex-1">
                                  <span className="block text-xs font-semibold text-neutral-800">
                                    {child.label}
                                  </span>
                                  {child.desc && (
                                    <span className="block text-[11px] text-neutral-400 line-clamp-1">
                                      {child.desc}
                                    </span>
                                  )}
                                </div>
                              </Link>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Mobile Footer Actions */}
            <div className="mt-8 space-y-3 pt-4 border-t border-neutral-200">
              <div className="grid grid-cols-2 gap-2">
                <Link
                  to="/login"
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-center gap-1.5 rounded-xl border border-neutral-200 bg-white py-2.5 text-center text-xs font-semibold text-neutral-700 hover:bg-neutral-50 transition-colors"
                >
                  <Lock className="h-3.5 w-3.5 text-[#854d0e]" />
                  Client Portal
                </Link>
                <Link
                  to="/contact"
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-center gap-1.5 rounded-xl bg-[#136a3e] py-2.5 text-center text-xs font-bold text-white shadow-sm hover:bg-[#0e5230] transition-all"
                >
                  Book Consultation
                </Link>
              </div>

              {/* Original Social Links in Mobile Menu */}
              <div className="pt-2 flex items-center justify-center">
                <FooterSocialIcons />
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Global Interactive Command Palette Search Modal */}
      <CommandDialog open={searchOpen} onOpenChange={setSearchOpen}>
        <CommandInput placeholder="Search solutions, technologies, open roles, or pages..." />
        <CommandList>
          <CommandEmpty>No matching services or resources found.</CommandEmpty>

          {/* Quick Navigation */}
          <CommandGroup heading="Quick Navigation">
            <CommandItem onSelect={() => handleSelectSearch("/")}>
              <Compass className="mr-2 h-4 w-4 text-[#136a3e]" />
              <span>Home</span>
            </CommandItem>
            <CommandItem onSelect={() => handleSelectSearch("/about")}>
              <Building2 className="mr-2 h-4 w-4 text-[#136a3e]" />
              <span>About Regal OPs</span>
            </CommandItem>
            <CommandItem onSelect={() => handleSelectSearch("/clients")}>
              <Users className="mr-2 h-4 w-4 text-[#136a3e]" />
              <span>Clients & Case Studies</span>
            </CommandItem>
            <CommandItem onSelect={() => handleSelectSearch("/blog")}>
              <FileText className="mr-2 h-4 w-4 text-[#136a3e]" />
              <span>Engineering Blog</span>
            </CommandItem>
            <CommandItem onSelect={() => handleSelectSearch("/contact")}>
              <Mail className="mr-2 h-4 w-4 text-[#136a3e]" />
              <span>Contact & Consultation</span>
            </CommandItem>
            <CommandItem onSelect={() => handleSelectSearch("/login")}>
              <Lock className="mr-2 h-4 w-4 text-[#854d0e]" />
              <span>Client & Admin Portal</span>
            </CommandItem>
          </CommandGroup>

          <CommandSeparator />

          {/* Enterprise Solutions */}
          <CommandGroup heading="Enterprise Solutions">
            {dynamicSolutions.length > 0
              ? dynamicSolutions.map((s) => (
                  <CommandItem
                    key={s.id}
                    onSelect={() => handleSelectSearch("/solutions/$id", { id: String(s.id) })}
                  >
                    <Workflow className="mr-2 h-4 w-4 text-[#136a3e]" />
                    <span>{s.name}</span>
                  </CommandItem>
                ))
              : (navItems.find((n) => n.label === "Solutions")?.children || []).map((c) => (
                  <CommandItem
                    key={c.label}
                    onSelect={() => handleSelectSearch("/solutions")}
                  >
                    <Workflow className="mr-2 h-4 w-4 text-[#136a3e]" />
                    <span>{c.label}</span>
                  </CommandItem>
                ))}
          </CommandGroup>

          <CommandSeparator />

          {/* Technologies */}
          <CommandGroup heading="Technology Stacks">
            {(navItems.find((n) => n.label === "Technologies")?.children || []).map((t) => (
              <CommandItem
                key={t.label}
                onSelect={() => handleSelectSearch("/technologies")}
              >
                <Cpu className="mr-2 h-4 w-4 text-[#136a3e]" />
                <span>{t.label}</span>
              </CommandItem>
            ))}
          </CommandGroup>

          <CommandSeparator />

          {/* Careers & Jobs */}
          <CommandGroup heading="Careers & Open Roles">
            <CommandItem onSelect={() => handleSelectSearch("/career")}>
              <Briefcase className="mr-2 h-4 w-4 text-[#136a3e]" />
              <span>View All Open Positions</span>
            </CommandItem>
            {dynamicJobs.map((j) => (
              <CommandItem
                key={j.id || j.title}
                onSelect={() => handleSelectSearch("/career")}
              >
                <Sparkles className="mr-2 h-4 w-4 text-emerald-600" />
                <span>{j.title} ({j.location})</span>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
