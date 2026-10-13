import type { ReactNode } from "react";
import { SiteHeader } from "./site-header";
import { SiteFooter } from "./site-footer";
import { StickyBottomActions } from "./social-icons";
import { ScrollRevealProvider } from "./scroll-reveal";

export function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col overflow-x-clip w-full max-w-full">
      <ScrollRevealProvider />
      <SiteHeader />
      <main className="flex-1 w-full max-w-full overflow-x-clip">{children}</main>
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
  containerClassName = "",
  descriptionClassName = "",
  titleClassName = "",
}: {
  eyebrow: string;
  title: string;
  description?: string;
  className?: string;
  containerClassName?: string;
  descriptionClassName?: string;
  titleClassName?: string;
}) {
  const hasCustomMaxW = containerClassName.includes("max-w-");
  return (
    <section className={`hero-glow border-b border-border ${className}`}>
      <div className={`mx-auto ${hasCustomMaxW ? "" : "max-w-[1440px]"} px-4 py-2 sm:px-6 sm:py-2.5 lg:px-8 text-left ${containerClassName}`}>
        <span className="inline-flex items-center rounded-full border border-border bg-surface px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">
          {eyebrow}
        </span>
        <h1 className={`mt-1 sm:mt-1.5 text-xl font-bold leading-tight sm:text-2xl lg:text-3xl text-left ${titleClassName || "max-w-3xl"}`}>
          {title}
        </h1>
        {description && (
          <p className={`mt-1 text-xs leading-relaxed text-muted-foreground sm:text-sm text-left ${descriptionClassName || "max-w-2xl"}`}>
            {description}
          </p>
        )}
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
  const hasCustomMaxW = className.includes("max-w-");
  const hasCustomPx = className.includes("px-");
  const hasCustomPy = className.includes("py-");
  return (
    <section
      className={`mx-auto ${hasCustomMaxW ? "" : "max-w-[1440px]"} ${hasCustomPx ? "" : "px-4 sm:px-6 lg:px-8"} ${hasCustomPy ? "" : "py-2 sm:py-2.5"} ${className}`}
    >
      {children}
    </section>
  );
}
