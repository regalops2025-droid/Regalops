import { createFileRoute, Link, useLocation } from "@tanstack/react-router";
import { ArrowRight, Sparkles } from "lucide-react";
import { useState, useEffect } from "react";
import { SiteLayout } from "@/components/site/site-layout";

export const Route = createFileRoute("/solutions")({
  head: () => ({
    meta: [
      { title: "Solutions | Regal OPs Enterprise Practices" },
      {
        name: "description",
        content:
          "Explore Regal OPs enterprise solutions: Strategic Staffing, BPO, RPO, Application Development, QA, Training Hub, and IT Strategy.",
      },
      { property: "og:title", content: "Regal OPs Solutions" },
      {
        property: "og:description",
        content: "Tailored engineering and talent practices for enterprise scale.",
      },
    ],
  }),
  component: Solutions,
});

function Solutions() {
  const [solutions, setSolutions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const hash = location.hash;

  useEffect(() => {
    fetch("/api/solutions")
      .then((res) => res.json())
      .then((data) => {
        setSolutions(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch solutions", err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (!loading && solutions.length > 0 && hash) {
      const rawTarget = hash.startsWith("#") ? hash.substring(1) : hash;
      const targetId = rawTarget.startsWith("solution-") ? rawTarget : `solution-${rawTarget}`;
      const timer = setTimeout(() => {
        const element = document.getElementById(targetId) || document.getElementById(rawTarget);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "center" });
          element.classList.add("ring-2", "ring-[#136a3e]", "rounded-3xl", "shadow-2xl");
          const clearTimer = setTimeout(() => {
            element.classList.remove("ring-2", "ring-[#136a3e]", "rounded-3xl", "shadow-2xl");
          }, 2500);
          return () => clearTimeout(clearTimer);
        }
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [hash, loading, solutions]);

  return (
    <SiteLayout>
      {/* ======================================================== */}
      {/* SIDE-BY-SIDE SOLUTIONS WITH ORGANIC WAVE SHAPED IMAGES   */}
      {/* ======================================================== */}
      <section className="py-12 sm:py-16 lg:py-20 bg-slate-50/50 dark:bg-slate-950">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-12 sm:mb-16 text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-[#136a3e] dark:text-emerald-400 text-xs font-bold uppercase tracking-wider mb-4 border border-emerald-200/50 dark:border-emerald-800/50">
              <Sparkles className="h-3.5 w-3.5" /> Specialized Practices
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
              Enterprise <span className="bg-gradient-to-r from-[#136a3e] to-emerald-600 bg-clip-text text-transparent">Solutions</span>
            </h1>
            <p className="mt-3.5 text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
              Tailored engineering, staffing, and operational practices built for high concurrency, velocity, and enterprise reliability.
            </p>
          </div>

          {loading ? (
            <div className="space-y-12">
              {[1, 2, 3].map((i) => (
                <div key={i} className="animate-pulse h-96 bg-slate-200/60 dark:bg-slate-800/60 rounded-3xl" />
              ))}
            </div>
          ) : solutions.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-12">No solutions available.</p>
          ) : (
            <div className="space-y-14 sm:space-y-20">
              {solutions.map((item, index) => {
                const isEven = index % 2 === 0;

                return (
                  <div
                    key={item.id}
                    id={`solution-${item.id}`}
                    className="group relative bg-white dark:bg-slate-900 rounded-3xl shadow-xl hover:shadow-2xl border border-slate-200/80 dark:border-slate-800 overflow-hidden transition-all duration-300"
                  >
                    {isEven ? (
                      /* ======================================================== */
                      /* EVEN ROW: TEXT ON LEFT, SHAPED IMAGE ON RIGHT           */
                      /* ======================================================== */
                      <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch lg:h-[420px]">
                        {/* Text Side (Left) */}
                        <div className="lg:col-span-6 xl:col-span-5 p-8 sm:p-12 lg:p-12 flex flex-col justify-center z-20 h-full">
                          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-[#136a3e] dark:text-emerald-400 text-xs font-bold uppercase tracking-wider mb-4 border border-emerald-200/50 dark:border-emerald-800/50 w-fit">
                            <Sparkles className="h-3 w-3" /> Practice {String(index + 1).padStart(2, "0")}
                          </div>

                          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
                            {item.name}
                          </h2>

                          <p className="mt-4 text-base sm:text-lg leading-relaxed text-slate-600 dark:text-slate-300 line-clamp-4">
                            {item.description}
                          </p>

                          <div className="mt-8">
                            <Link
                              to="/solutions/$id"
                              params={{ id: String(item.id) }}
                              className="inline-flex items-center gap-2.5 rounded-xl bg-[#136a3e] hover:bg-[#0f5431] text-white px-7 py-3.5 text-sm font-bold shadow-md hover:shadow-lg transition-all duration-200 group/btn"
                            >
                              <span>{index === 0 ? "Know more" : "Learn more"}</span>
                              <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                            </Link>
                          </div>
                        </div>

                        {/* Shaped Image Side (Right) - Fixed uniform height & object-cover */}
                        <div className="lg:col-span-6 xl:col-span-7 relative h-[280px] sm:h-[340px] lg:h-full w-full overflow-hidden">
                          <Link
                            to="/solutions/$id"
                            params={{ id: String(item.id) }}
                            className="block w-full h-full relative group/img cursor-pointer overflow-hidden"
                          >
                            {/* Main Image - Absolutely positioned & center-cropped so it never inflates card height */}
                            <img
                              src={item.image || "/solutions-team.jpg"}
                              alt={item.name}
                              className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                            />

                            {/* Organic Wave SVG Swoop on Left Edge of Image */}
                            <svg
                              className="hidden lg:block absolute top-0 left-0 bottom-0 h-full w-28 sm:w-36 xl:w-48 text-white dark:text-slate-900 pointer-events-none z-10"
                              viewBox="0 0 100 100"
                              preserveAspectRatio="none"
                              fill="currentColor"
                            >
                              <path d="M 0,0 L 75,0 C 95,28 35,65 0,100 L 0,0 Z" />
                            </svg>

                            {/* Diagonal Accent Slash (Orange / Amber line matching reference) */}
                            <div className="hidden lg:block absolute top-4 left-10 xl:left-14 w-1.5 h-20 xl:h-28 bg-gradient-to-b from-amber-500 via-orange-500 to-amber-600 rounded-full rotate-[28deg] shadow-md z-20 pointer-events-none" />

                            {/* Bottom Ambient Amber Wave Ribbon */}
                            <div className="absolute -bottom-6 -right-6 w-52 sm:w-72 h-20 sm:h-28 bg-gradient-to-tl from-amber-500/30 via-orange-500/20 to-transparent rounded-[100%] blur-sm pointer-events-none z-10" />

                            {/* Script badge on first practice matching reference */}
                            {index === 0 && (
                              <div className="hidden sm:block absolute top-5 right-6 z-20 select-none">
                                <span className="font-serif italic font-bold text-sky-600 dark:text-sky-400 text-lg sm:text-xl tracking-wide drop-shadow-sm inline-block -rotate-6">
                                  People Powering Possibilities
                                </span>
                              </div>
                            )}
                          </Link>
                        </div>
                      </div>
                    ) : (
                      /* ======================================================== */
                      /* ODD ROW: SHAPED IMAGE ON LEFT, TEXT ON RIGHT            */
                      /* ======================================================== */
                      <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch lg:h-[420px]">
                        {/* Shaped Image Side (Left) - Order 2 on mobile, Order 1 on lg */}
                        <div className="lg:col-span-6 xl:col-span-7 relative h-[280px] sm:h-[340px] lg:h-full w-full overflow-hidden order-2 lg:order-1">
                          <Link
                            to="/solutions/$id"
                            params={{ id: String(item.id) }}
                            className="block w-full h-full relative group/img cursor-pointer overflow-hidden"
                          >
                            {/* Main Image - Absolutely positioned & center-cropped so it never inflates card height */}
                            <img
                              src={item.image || "/solutions-bpo.jpg"}
                              alt={item.name}
                              className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                            />

                            {/* Organic Wave SVG Swoop on Right Edge of Image */}
                            <svg
                              className="hidden lg:block absolute top-0 right-0 bottom-0 h-full w-28 sm:w-36 xl:w-48 text-white dark:text-slate-900 pointer-events-none z-10"
                              viewBox="0 0 100 100"
                              preserveAspectRatio="none"
                              fill="currentColor"
                            >
                              <path d="M 100,0 L 25,0 C 5,28 65,65 100,100 L 100,0 Z" />
                            </svg>

                            {/* Diagonal Accent Slash (Orange / Amber line matching reference) */}
                            <div className="hidden lg:block absolute top-4 right-10 xl:right-14 w-1.5 h-20 xl:h-28 bg-gradient-to-b from-amber-500 via-orange-500 to-amber-600 rounded-full -rotate-[28deg] shadow-md z-20 pointer-events-none" />

                            {/* Bottom Ambient Amber Wave Ribbon */}
                            <div className="absolute -bottom-6 -left-6 w-52 sm:w-72 h-20 sm:h-28 bg-gradient-to-tr from-amber-500/30 via-orange-500/20 to-transparent rounded-[100%] blur-sm pointer-events-none z-10" />
                          </Link>
                        </div>

                        {/* Text Side (Right) - Order 1 on mobile, Order 2 on lg */}
                        <div className="lg:col-span-6 xl:col-span-5 p-8 sm:p-12 lg:p-12 flex flex-col justify-center z-20 order-1 lg:order-2 h-full">
                          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-[#136a3e] dark:text-emerald-400 text-xs font-bold uppercase tracking-wider mb-4 border border-emerald-200/50 dark:border-emerald-800/50 w-fit">
                            <Sparkles className="h-3 w-3" /> Practice {String(index + 1).padStart(2, "0")}
                          </div>

                          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
                            {item.name}
                          </h2>

                          <p className="mt-4 text-base sm:text-lg leading-relaxed text-slate-600 dark:text-slate-300 line-clamp-4">
                            {item.description}
                          </p>

                          <div className="mt-8">
                            <Link
                              to="/solutions/$id"
                              params={{ id: String(item.id) }}
                              className="inline-flex items-center gap-2.5 rounded-xl bg-[#136a3e] hover:bg-[#0f5431] text-white px-7 py-3.5 text-sm font-bold shadow-md hover:shadow-lg transition-all duration-200 group/btn"
                            >
                              <span>Learn more</span>
                              <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                            </Link>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </SiteLayout>
  );
}
