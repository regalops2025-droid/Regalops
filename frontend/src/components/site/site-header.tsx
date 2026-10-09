import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "@tanstack/react-router";
import {
  ChevronDown,
  Menu,
  X,
  ArrowRight,
  Search,
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
        {/* Top Micro-Bar (Enterprise Utility Strip matching Image 2) */}
        <div className="w-full border-b border-[#EBEAE5] bg-[#FAF9F5] text-xs text-neutral-600 transition-all duration-300">
          <div className="mx-auto flex max-w-[1400px] items-center justify-between px-3 sm:px-6 lg:px-8 py-1.5">
            {/* Left Badges */}
            <div className="flex items-center gap-2.5 sm:gap-4 overflow-x-auto no-scrollbar">
              <div className="flex items-center gap-1.5 whitespace-nowrap">
                <Crown className="h-3.5 w-3.5 text-[#b4883b] shrink-0" />
                <span className="font-medium text-neutral-700">Top 500 Enterprise Partner</span>
              </div>
              <span className="text-neutral-300">|</span>
              <div className="flex items-center gap-1.5 whitespace-nowrap">
                <ShieldCheck className="h-3.5 w-3.5 text-[#2d6a4f] shrink-0" />
                <span className="font-medium text-neutral-700">99.98% SLA Uptime</span>
              </div>
              <span className="hidden sm:inline text-neutral-300">|</span>
              <div className="hidden sm:flex items-center gap-1.5 whitespace-nowrap">
                <Globe className="h-3.5 w-3.5 text-[#2d6a4f] shrink-0" />
                <span className="font-medium text-neutral-700">Serving 14+ Countries</span>
              </div>
            </div>

            {/* Right Socials & Micro Links */}
            <div className="flex items-center gap-2.5 sm:gap-4 shrink-0">
              <div className="flex items-center gap-2 sm:gap-2.5">
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="text-neutral-500 hover:text-[#136a3e] transition-colors"
                >
                  <Linkedin className="h-3.5 w-3.5" />
                </a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YouTube"
                  className="text-neutral-500 hover:text-[#136a3e] transition-colors"
                >
                  <Youtube className="h-3.5 w-3.5" />
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="X"
                  className="text-neutral-500 hover:text-[#136a3e] transition-colors"
                >
                  <XIcon className="h-3 w-3" />
                </a>
              </div>
              <span className="text-neutral-300">|</span>
              <Link
                to="/login"
                className="font-medium text-neutral-600 hover:text-[#136a3e] transition-colors whitespace-nowrap text-xs"
              >
                Client Portal
              </Link>
              <span className="text-neutral-300">|</span>
              <Link
                to="/career"
                className="font-medium text-neutral-600 hover:text-[#136a3e] transition-colors whitespace-nowrap text-xs"
              >
                Careers
              </Link>
            </div>
          </div>
        </div>

        {/* Floating Pill Main Navigation Bar (Calculated with ample internal clearance to NEVER overflow) */}
        <div className="w-full px-2.5 sm:px-5 lg:px-7 py-2 sm:py-2.5 transition-all duration-300">
          <div
            className={`mx-auto max-w-[1400px] rounded-full border border-neutral-200/90 bg-white/95 backdrop-blur-md px-3.5 sm:px-5 xl:px-6 2xl:px-7 py-2 sm:py-2.5 flex items-center justify-between gap-2 xl:gap-4 transition-all duration-300 ${
              scrolled
                ? "shadow-[0_8px_30px_rgba(0,0,0,0.08)] border-neutral-300/80"
                : "shadow-[0_4px_22px_rgba(0,0,0,0.04)]"
            }`}
          >
            {/* Logo Section */}
            <Link to="/" className="flex items-center gap-2 sm:gap-2.5 shrink-0 group">
              <img
                src="/logo.png"
                alt="Regal OPs Logo"
                className="h-8 sm:h-9 w-auto object-contain shrink-0 transition-transform duration-200 group-hover:scale-105"
              />
              <div className="flex flex-col shrink-0 justify-center">
                <span className="font-display text-[16px] sm:text-[18px] 2xl:text-[19px] font-bold tracking-tight text-neutral-900 leading-none whitespace-nowrap">
                  Regal OPs
                </span>
                <span className="text-[7.5px] sm:text-[8px] 2xl:text-[8.5px] font-bold uppercase tracking-[0.18em] text-neutral-400 mt-0.5 leading-none whitespace-nowrap">
                  CONSULT | BUILD | DEPLOY
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden xl:flex items-center gap-3 2xl:gap-5 shrink-0" aria-label="Main Navigation">
              {/* Home */}
              <Link
                to="/"
                className={`relative whitespace-nowrap text-[13px] 2xl:text-sm font-semibold transition-colors py-1 ${
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

              {/* Career with HIRING badge cleanly placed inline */}
              <div className="flex items-center py-1">
                <Link
                  to="/career"
                  className={`relative whitespace-nowrap text-[13px] 2xl:text-sm font-medium transition-colors ${
                    isActive("/career")
                      ? "text-[#136a3e] font-bold after:absolute after:-bottom-1.5 after:left-0 after:right-0 after:h-[2px] after:bg-[#136a3e] after:rounded-full"
                      : "text-neutral-700 hover:text-neutral-950"
                  }`}
                >
                  Career
                </Link>
                <span className="ml-1 rounded-full bg-[#dcfce7] px-1.5 py-0.2 text-[8px] font-bold uppercase tracking-wider text-[#15803d] pointer-events-none shadow-2xs">
                  HIRING
                </span>
              </div>

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
              {/* Search Pill */}
              <button
                type="button"
                id="header-search-trigger"
                onClick={() => setSearchOpen(true)}
                aria-label="Search"
                className="flex items-center gap-1.5 rounded-full border border-neutral-200/90 bg-[#F9FAFB] hover:bg-neutral-100/90 px-2.5 sm:px-3 py-1.5 text-xs text-neutral-400 hover:text-neutral-600 transition-colors shadow-2xs cursor-pointer"
              >
                <Search className="h-3.5 w-3.5 text-[#b4883b]" />
                <span className="hidden sm:inline font-normal text-neutral-500">Search...</span>
                <kbd className="hidden 2xl:inline-flex items-center rounded border border-neutral-200/80 bg-white px-1 py-0.2 text-[9px] font-mono text-neutral-400 shadow-2xs">
                  ⌘K
                </kbd>
              </button>

              {/* Divider - only on desktop when portal is shown */}
              <div className="hidden xl:block h-4 w-px bg-neutral-200" />

              {/* Portal Button */}
              <Link
                to="/login"
                id="header-client-portal"
                className="hidden xl:flex items-center gap-1 rounded-full border border-neutral-200 bg-white hover:bg-neutral-50 px-2.5 2xl:px-3 py-1.5 text-xs font-semibold text-neutral-700 hover:text-neutral-900 shadow-2xs transition-all hover:border-neutral-300 whitespace-nowrap"
              >
                <Lock className="h-3 w-3 text-[#854d0e]" />
                <span>Portal</span>
              </Link>

              {/* Book Consultation Button */}
              <Link
                to="/contact"
                id="header-cta-button"
                className="flex items-center gap-1.5 rounded-full bg-[#136a3e] hover:bg-[#0e5230] text-white text-xs font-semibold px-3.5 sm:px-4 py-1.5 sm:py-2 shadow-sm shadow-[#136a3e]/25 hover:shadow-md transition-all hover:scale-[1.02] active:scale-[0.98] whitespace-nowrap group"
              >
                <span>Book Consultation</span>
                <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
              </Link>

              {/* Mobile Menu Hamburger Toggle */}
              <button
                type="button"
                aria-label="Toggle navigation menu"
                aria-expanded={open}
                onClick={() => setOpen((v) => !v)}
                className="grid h-8 w-8 sm:h-9 sm:w-9 place-items-center rounded-full border border-neutral-200 xl:hidden hover:bg-neutral-100 transition-colors text-neutral-700 cursor-pointer shrink-0"
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
              {/* Mobile Search Button */}
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  setSearchOpen(true);
                }}
                className="w-full flex items-center justify-between rounded-xl border border-neutral-200 bg-[#F9FAFB] px-4 py-2.5 text-sm text-neutral-500 shadow-2xs"
              >
                <span className="flex items-center gap-2">
                  <Search className="h-4 w-4 text-[#b4883b]" />
                  Search solutions, tech, jobs...
                </span>
                <kbd className="rounded border border-neutral-200 bg-white px-1.5 py-0.5 text-xs font-semibold">
                  ⌘K
                </kbd>
              </button>

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
