import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ChevronDown, Menu, X, ArrowRight } from "lucide-react";
import { navItems } from "./nav-data";

function Logo() {
  return (
    <Link to="/" className="flex min-w-0 items-center gap-2.5">
      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-primary font-display text-sm font-bold text-primary-foreground">
        N
      </span>
      <span className="truncate font-display text-lg font-semibold tracking-tight">
        Nexora<span className="text-primary">.</span>
      </span>
    </Link>
  );
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/85 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3.5 sm:px-6 lg:px-8">
        <Logo />

        <nav className="hidden items-center gap-0.5 xl:flex">
          {navItems.map((item) =>
            item.children ? (
              <div key={item.label} className="group relative">
                <Link
                  to={item.to}
                  className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                >
                  {item.label}
                  <ChevronDown className="h-3.5 w-3.5 transition-transform duration-300 group-hover:rotate-180" />
                </Link>
                <div className="invisible absolute left-1/2 top-full w-[560px] -translate-x-1/2 pt-3 opacity-0 transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                  <div className="panel grid grid-cols-2 gap-1 p-3">
                    {item.children.map((child) => (
                      <Link
                        key={child.label}
                        to={item.to}
                        className="group/i rounded-xl px-3 py-2.5 transition-colors hover:bg-surface-2"
                      >
                        <span className="flex items-center gap-1.5 text-sm font-semibold">
                          {child.label}
                          <ArrowRight className="h-3.5 w-3.5 -translate-x-1 text-primary opacity-0 transition-all group-hover/i:translate-x-0 group-hover/i:opacity-100" />
                        </span>
                        <span className="mt-0.5 block text-xs text-muted-foreground">
                          {child.desc}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <Link
                key={item.label}
                to={item.to}
                className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                activeProps={{ className: "text-foreground" }}
              >
                {item.label}
              </Link>
            ),
          )}
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <Link
            to="/login"
            className="hidden rounded-xl border border-border px-4 py-2 text-sm font-semibold transition-colors hover:border-primary hover:text-primary sm:inline-flex"
          >
            Login
          </Link>
          <button
            type="button"
            aria-label="Toggle navigation"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="grid h-10 w-10 place-items-center rounded-xl border border-border xl:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="max-h-[75vh] overflow-y-auto border-t border-border bg-surface px-4 py-4 sm:px-6 xl:hidden">
          {navItems.map((item) => (
            <div key={item.label} className="border-b border-border/60 last:border-0">
              <div className="flex items-center justify-between gap-2">
                <Link
                  to={item.to}
                  onClick={() => setOpen(false)}
                  className="min-w-0 flex-1 truncate py-3 text-sm font-semibold"
                >
                  {item.label}
                </Link>
                {item.children && (
                  <button
                    type="button"
                    aria-label={`Expand ${item.label}`}
                    onClick={() =>
                      setExpanded((v) => (v === item.label ? null : item.label))
                    }
                    className="shrink-0 p-2 text-muted-foreground"
                  >
                    <ChevronDown
                      className={`h-4 w-4 transition-transform ${expanded === item.label ? "rotate-180" : ""}`}
                    />
                  </button>
                )}
              </div>
              {item.children && expanded === item.label && (
                <div className="pb-3 pl-3">
                  {item.children.map((child) => (
                    <Link
                      key={child.label}
                      to={item.to}
                      onClick={() => setOpen(false)}
                      className="block py-2 text-sm text-muted-foreground"
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
          <Link
            to="/login"
            onClick={() => setOpen(false)}
            className="mt-4 block rounded-xl bg-primary py-2.5 text-center text-sm font-semibold text-primary-foreground"
          >
            Login
          </Link>
        </div>
      )}
    </header>
  );
}
