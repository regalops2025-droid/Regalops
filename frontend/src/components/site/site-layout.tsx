import type { ReactNode } from "react";
import { SiteHeader } from "./site-header";
import { SiteFooter } from "./site-footer";
import { StickyBottomActions } from "./social-icons";

export function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />

      {/* Sticky Quick Contact Actions (WhatsApp & Call Buttons) */}
      <StickyBottomActions />
    </div>
  );
}

export function PageHero({
  eyebrow,
  title,
  description,
  className = "",
  descriptionClassName = "",
  titleClassName = "",
}: {
  eyebrow: string;
  title: string;
  description: string;
  className?: string;
  descriptionClassName?: string;
  titleClassName?: string;
}) {
  return (
    <section className={`hero-glow border-b border-border ${className}`}>
      <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 sm:py-6 lg:px-8">
        <span className="inline-flex items-center rounded-full border border-border bg-surface px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
          {eyebrow}
        </span>
        <h1 className={`mt-2.5 sm:mt-3 text-3xl font-semibold leading-tight sm:text-4xl lg:text-5xl ${titleClassName || "max-w-3xl"}`}>
          {title}
        </h1>
        <p className={`mt-2 sm:mt-2.5 text-base leading-relaxed text-muted-foreground sm:text-lg ${descriptionClassName || "max-w-2xl"}`}>
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
    <section className={`mx-auto max-w-7xl px-4 py-5 sm:px-6 sm:py-6 lg:px-8 ${className}`}>
      {children}
    </section>
  );
}
