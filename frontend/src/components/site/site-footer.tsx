import { Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Linkedin, Instagram, Mail, MapPin } from "lucide-react";
import { navItems } from "./nav-data";

export function SiteFooter() {
  const [dynamicSolutions, setDynamicSolutions] = useState<any[]>([]);
  const [dynamicTechnologies, setDynamicTechnologies] = useState<any[]>([]);

  useEffect(() => {
    fetch("http://localhost:5001/api/solutions")
      .then((res) => res.json())
      .then((data) => setDynamicSolutions(data))
      .catch((err) => console.error("Failed to fetch footer solutions", err));

    fetch("http://localhost:5001/api/technologies")
      .then((res) => res.json())
      .then((data) => setDynamicTechnologies(data))
      .catch((err) => console.error("Failed to fetch footer technologies", err));
  }, []);

  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <div className="flex min-w-0 items-center gap-3">
              <img src="/logo.png" alt="Regal OPs Logo" className="h-12 w-auto object-contain" />
              <span className="font-display text-xl font-bold tracking-tight">
                Regal OPs
              </span>
            </div>
            <p className="mt-4 max-w-sm text-xs leading-relaxed text-muted-foreground">
              Greetings from Regal OPs! We provide cutting-edge IT services, AI solutions, enterprise consulting, and global technology staffing.
            </p>
            <ul className="mt-6 space-y-3.5 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <MapPin className="mt-1 h-4 w-4 shrink-0 text-primary" />
                <div className="flex flex-col gap-1 text-[11px] leading-normal">
                  <span className="font-semibold text-foreground uppercase tracking-wider">USA Office</span>
                  <span>8 Chill Sean Street, Dunwoody, Atlanta, Georgia, USA</span>
                  <span className="font-semibold text-foreground uppercase tracking-wider mt-1.5">Hyderabad Office</span>
                  <span>Floor 1, MB3 Block, Raheja Mindspace, Hyderabad, Telangana</span>
                  <span className="font-semibold text-foreground uppercase tracking-wider mt-1.5">Warangal Office</span>
                  <span>H.No: 12-13, 1st Floor, Warangal, Telangana, 506002</span>
                </div>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 shrink-0 text-primary" />
                <a href="mailto:Info@regalops.com" className="hover:text-foreground text-xs">
                  Info@regalops.com
                </a>
              </li>
            </ul>
          </div>

          <FooterCol title="Solutions" items={dynamicSolutions.map((s) => s.name)} to="/solutions" />
          <FooterCol
            title="Technologies"
            items={dynamicTechnologies.map((s) => s.name)}
            to="/technologies"
          />

          <div>
            <h4 className="text-sm font-semibold">Company</h4>
            <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
              {navItems
                .filter((i) => !i.children)
                .map((i) => (
                  <li key={i.label}>
                    <Link to={i.to} className="transition-colors hover:text-primary">
                      {i.label}
                    </Link>
                  </li>
                ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 border-t border-border pt-6 sm:flex sm:justify-between">
          <p className="min-w-0 text-xs text-muted-foreground">
             © {new Date().getFullYear()} Regal OPs Consult. All rights reserved.
          </p>
          <div className="flex shrink-0 items-center gap-2">
            <a
              href="https://www.linkedin.com/company/regalops/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn profile"
              className="grid h-9 w-9 place-items-center rounded-xl border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary"
            >
              <Linkedin className="h-4 w-4" />
            </a>
            <a
              href="https://www.instagram.com/regal_ops/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram profile"
              className="grid h-9 w-9 place-items-center rounded-xl border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary"
            >
              <Instagram className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  items,
  to,
}: {
  title: string;
  items: string[];
  to: string;
}) {
  return (
    <div>
      <h4 className="text-sm font-semibold">{title}</h4>
      <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
        {items.map((label) => (
          <li key={label}>
            <Link to={to} className="transition-colors hover:text-primary">
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
