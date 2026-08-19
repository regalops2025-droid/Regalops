import { useState, useEffect } from "react";
import { Link, useLocation } from "@tanstack/react-router";
import { ChevronDown, Menu, X, ArrowRight } from "lucide-react";
import { navItems } from "./nav-data";

function Logo({ scrolled }: { scrolled: boolean }) {
  return (
    <Link to="/" className="flex min-w-0 items-center gap-3.5 group">
      <img
        src="/logo.png"
        alt="Regal OPs Logo"
        className={`w-auto object-contain transition-all duration-300 ${
          scrolled ? "h-14" : "h-18"
        }`}
      />
      <span className="font-display text-2xl font-bold tracking-tight text-foreground transition-all duration-300">
        Regal OPs
      </span>
    </Link>
  );
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [dynamicSolutions, setDynamicSolutions] = useState<any[]>([]);
  const [dynamicTechnologies, setDynamicTechnologies] = useState<any[]>([]);
  const [dynamicJobs, setDynamicJobs] = useState<any[]>([]);
  const [scrolled, setScrolled] = useState(false);

  const location = useLocation();

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
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    fetch("http://localhost:5001/api/solutions")
      .then((res) => res.json())
      .then((data) => setDynamicSolutions(data))
      .catch((err) => console.error("Failed to fetch header solutions", err));

    fetch("http://localhost:5001/api/technologies")
      .then((res) => res.json())
      .then((data) => setDynamicTechnologies(data))
      .catch((err) => console.error("Failed to fetch header technologies", err));

    fetch("http://localhost:5001/api/jobs")
      .then((res) => res.json())
      .then((data) => setDynamicJobs(data))
      .catch((err) => console.error("Failed to fetch header jobs", err));
  }, []);

  return (
    <header
      style={{ "--header-height": scrolled ? "78px" : "106px" } as React.CSSProperties}
      className={`sticky top-0 z-50 transition-all duration-300 border-b ${
        scrolled
          ? "border-primary/20 bg-[color-mix(in_oklab,var(--primary)_6%,var(--background))]/90 backdrop-blur-md shadow-md py-2.5"
          : "border-border/40 bg-background/40 backdrop-blur-sm py-4"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Logo scrolled={scrolled} />

        <nav className="hidden items-center gap-1 xl:flex">
          {navItems.map((item) => {
            const isSolutions = item.label === "Solutions";
            const isTechnologies = item.label === "Technologies";
            const isCareer = item.label === "Career";

            const childrenToRender = isSolutions
              ? (Array.isArray(dynamicSolutions) ? dynamicSolutions.map((s) => ({ label: s.name, desc: s.description, to: "/solutions/$id", params: { id: String(s.id) } })) : [])
              : isTechnologies
                ? (Array.isArray(dynamicTechnologies) ? dynamicTechnologies.map((t) => ({ label: t.name, desc: t.description })) : [])
                : isCareer
                  ? (Array.isArray(dynamicJobs) ? dynamicJobs.map((j) => ({ label: j.title, desc: `${j.location} • ${j.type}` })) : [])
                  : (item.children || []);

            const hasChildren = isSolutions
              ? (Array.isArray(dynamicSolutions) && dynamicSolutions.length > 0)
              : isTechnologies
                ? (Array.isArray(dynamicTechnologies) && dynamicTechnologies.length > 0)
                : isCareer
                  ? (Array.isArray(dynamicJobs) && dynamicJobs.length > 0)
                  : !!item.children;

            const active = isActive(item.to);

            return hasChildren ? (
              <div key={item.label} className="group relative">
                <Link
                  to={item.to}
                  className={`flex items-center gap-1.5 px-3.5 py-2 text-sm transition-all duration-200 border ${
                    active
                      ? "text-primary-foreground bg-primary border-transparent font-semibold shadow-sm rounded-tr-2xl rounded-bl-2xl rounded-tl-sm rounded-br-sm"
                      : "text-muted-foreground border-transparent font-medium rounded-xl hover:bg-secondary/50 hover:text-foreground"
                  }`}
                >
                  {item.label}
                  <ChevronDown className="h-3.5 w-3.5 transition-transform duration-300 group-hover:rotate-180" />
                </Link>
                <div className="invisible absolute left-1/2 top-full w-[580px] -translate-x-1/2 pt-3.5 opacity-0 transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                  <div className="panel grid grid-cols-2 gap-2 p-4 bg-background/95 backdrop-blur-xl border border-border/80 shadow-xl rounded-2xl">
                    {childrenToRender.map((child) => (
                      <Link
                        key={child.label}
                        to={child.to || item.to}
                        params={child.params}
                        className="group/i flex items-start gap-3 rounded-xl p-2.5 transition-all duration-200 hover:bg-secondary/40 hover:translate-x-0.5"
                      >
                        <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-border transition-colors duration-200 group-hover/i:bg-primary" />
                        <div className="min-w-0 flex-1">
                          <span className="flex items-center gap-1.5 text-sm font-semibold text-foreground truncate group-hover/i:text-primary transition-colors">
                            {child.label}
                            <ArrowRight className="h-3.5 w-3.5 -translate-x-1 opacity-0 transition-all duration-200 group-hover/i:translate-x-0 group-hover/i:opacity-100" />
                          </span>
                          <span className="mt-0.5 block text-xs text-muted-foreground line-clamp-1">
                            {child.desc}
                          </span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <Link
                key={item.label}
                to={item.to}
                className={`px-3.5 py-2 text-sm transition-all duration-200 border ${
                  active
                    ? "text-primary-foreground bg-primary border-transparent font-semibold shadow-sm rounded-tr-2xl rounded-bl-2xl rounded-tl-sm rounded-br-sm"
                    : "text-muted-foreground border-transparent font-medium rounded-xl hover:bg-secondary/50 hover:text-foreground"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <Link
            to="/login"
            className="hidden rounded-tr-2xl rounded-bl-2xl rounded-tl-sm rounded-br-sm bg-gradient-to-r from-primary to-gold/90 px-6 py-2 text-sm font-semibold text-primary-foreground shadow-md shadow-primary/10 hover:shadow-lg hover:shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 sm:inline-flex"
          >
            Login
          </Link>
          <button
            type="button"
            aria-label="Toggle navigation"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="grid h-10 w-10 place-items-center rounded-xl border border-border xl:hidden hover:bg-secondary/50 transition-colors"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="fixed inset-x-0 bottom-0 top-[var(--header-height,73px)] z-40 h-[calc(100vh-var(--header-height,73px))] overflow-y-auto bg-background/95 backdrop-blur-xl border-t border-border/80 px-6 py-6 transition-all duration-300 animate-in fade-in slide-in-from-top-5 xl:hidden flex flex-col justify-between">
          <div className="space-y-4">
            {navItems.map((item) => {
              const isSolutions = item.label === "Solutions";
              const isTechnologies = item.label === "Technologies";
              const isCareer = item.label === "Career";

              const childrenToRender = isSolutions
                ? dynamicSolutions.map((s) => ({ label: s.name, desc: s.description }))
                : isTechnologies
                  ? dynamicTechnologies.map((t) => ({ label: t.name, desc: t.description }))
                  : isCareer
                    ? dynamicJobs.map((j) => ({ label: j.title, desc: `${j.location} • ${j.type}` }))
                    : (item.children || []);

              const hasChildren = isSolutions
                ? dynamicSolutions.length > 0
                : isTechnologies
                  ? dynamicTechnologies.length > 0
                  : isCareer
                    ? dynamicJobs.length > 0
                    : !!item.children;

              const active = isActive(item.to);

              return (
                <div key={item.label} className="border-b border-border/40 pb-2 last:border-0">
                  <div className="flex items-center justify-between gap-2">
                    <Link
                      to={item.to}
                      onClick={() => setOpen(false)}
                      className={`text-base font-semibold py-2 transition-colors ${
                        active ? "text-primary font-bold" : "text-foreground hover:text-primary"
                      }`}
                    >
                      {item.label}
                    </Link>
                    {hasChildren && (
                      <button
                        type="button"
                        aria-label={`Expand ${item.label}`}
                        onClick={() =>
                          setExpanded((v) => (v === item.label ? null : item.label))
                        }
                        className="shrink-0 p-2 text-muted-foreground"
                      >
                        <ChevronDown
                          className={`h-4 w-4 transition-transform duration-200 ${
                            expanded === item.label ? "rotate-180 text-primary" : ""
                          }`}
                        />
                      </button>
                    )}
                  </div>
                  {hasChildren && expanded === item.label && (
                    <div className="pb-3 pl-3 space-y-2 animate-in fade-in slide-in-from-top-2 duration-200">
                      {childrenToRender.map((child) => (
                        <Link
                          key={child.label}
                          to={child.to || item.to}
                          params={child.params}
                          onClick={() => setOpen(false)}
                          className="flex flex-col py-1 text-sm text-muted-foreground hover:text-foreground truncate"
                        >
                          <span className="font-semibold text-foreground/90">{child.label}</span>
                          <span className="text-xs text-muted-foreground/80 truncate">{child.desc}</span>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          <Link
            to="/login"
            onClick={() => setOpen(false)}
            className="mt-6 block rounded-tr-2xl rounded-bl-2xl rounded-tl-sm rounded-br-sm bg-gradient-to-r from-primary to-gold/90 py-3 text-center text-sm font-semibold text-primary-foreground shadow-md hover:shadow-lg transition-all"
          >
            Login
          </Link>
        </div>
      )}
    </header>
  );
}
