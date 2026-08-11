import type { ReactNode } from "react";
import { Phone } from "lucide-react";
import { SiteHeader } from "./site-header";
import { SiteFooter } from "./site-footer";

export function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />

      {/* Sticky WhatsApp and Call Buttons */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
        {/* Call Button */}
        <a
          href="tel:+914400000000"
          className="group relative flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-all duration-300 hover:scale-110 active:scale-95"
          title="Call Regal OPs"
        >
          <Phone className="h-5 w-5" />
          <span className="absolute right-14 scale-0 rounded-lg bg-foreground px-2 py-1 text-xs text-background shadow transition-all duration-200 group-hover:scale-100 whitespace-nowrap">
            Call us
          </span>
        </a>

        {/* WhatsApp Button */}
        <a
          href="https://wa.me/914400000000?text=Hi%20Regal%20OPs,%20I%20would%20like%20to%20discuss%20our%20enterprise%20platform%20needs."
          target="_blank"
          rel="noopener noreferrer"
          className="group relative flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-all duration-300 hover:scale-110 active:scale-95"
          title="Chat on WhatsApp"
        >
          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-6 w-6"
          >
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.66.986 3.284 1.489 4.969 1.49 5.485 0 9.948-4.467 9.95-9.95.002-2.656-1.03-5.153-2.906-7.03C16.786 1.777 14.29 .746 11.632.746c-5.49 0-9.95 4.467-9.953 9.951-.001 1.761.472 3.484 1.368 5.011L2.094 21.84l6.231-1.635z" />
          </svg>
          <span className="absolute right-14 scale-0 rounded-lg bg-foreground px-2 py-1 text-xs text-background shadow transition-all duration-200 group-hover:scale-100 whitespace-nowrap">
            WhatsApp
          </span>
        </a>
      </div>
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
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
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
    <section className={`mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8 ${className}`}>
      {children}
    </section>
  );
}
