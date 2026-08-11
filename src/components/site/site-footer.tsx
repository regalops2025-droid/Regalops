import { Link } from "@tanstack/react-router";
import { Linkedin, Twitter, Github, Mail, MapPin, Phone } from "lucide-react";
import { navItems } from "./nav-data";

const solutions = navItems.find((i) => i.label === "Solutions")?.children ?? [];
const technologies = navItems.find((i) => i.label === "Technologies")?.children ?? [];

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <div className="flex min-w-0 items-center gap-2.5">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-primary font-display text-sm font-bold text-primary-foreground">
                N
              </span>
              <span className="font-display text-lg font-semibold">
                Nexora<span className="text-primary">.</span>
              </span>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
              We engineer cloud, data and AI platforms for enterprises that cannot
              afford downtime. Deep technical craft, delivered quietly.
            </p>
            <ul className="mt-6 space-y-2.5 text-sm text-muted-foreground">
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span>4th Floor, Tidel Park, Chennai 600113, India</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 shrink-0 text-primary" />
                <a href="tel:+914400000000" className="hover:text-foreground">
                  +91 44 0000 0000
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 shrink-0 text-primary" />
                <a href="mailto:hello@nexora.dev" className="hover:text-foreground">
                  hello@nexora.dev
                </a>
              </li>
            </ul>
          </div>

          <FooterCol title="Solutions" items={solutions.map((s) => s.label)} to="/solutions" />
          <FooterCol
            title="Technologies"
            items={technologies.map((s) => s.label)}
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
            © {new Date().getFullYear()} Nexora Technologies. All rights reserved.
          </p>
          <div className="flex shrink-0 items-center gap-2">
            {[Linkedin, Twitter, Github].map((Icon, idx) => (
              <a
                key={idx}
                href="#"
                aria-label="Social profile"
                className="grid h-9 w-9 place-items-center rounded-xl border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
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
