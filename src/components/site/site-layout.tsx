import type { ReactNode } from "react";
import { SiteHeader } from "./site-header";
import { SiteFooter } from "./site-footer";

export function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  );
}

export function PageHero({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <section className="hero-glow border-b border-border">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <span className="inline-flex items-center rounded-full border border-border bg-surface px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
          {eyebrow}
        </span>
        <h1 className="mt-5 max-w-3xl text-3xl font-semibold leading-tight sm:text-5xl">
          {title}
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          {description}
        </p>
      </div>
    </section>
  );
}

export function Section({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={`mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8 ${className}`}>
      {children}
    </section>
  );
}
