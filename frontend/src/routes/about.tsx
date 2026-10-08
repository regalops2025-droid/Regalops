import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/site-layout";
import { ArrowRight, Sparkles, CheckCircle2, Award, Users, Globe2, ShieldCheck, Activity } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Regal OPs — Who We Are & What We Do" },
      {
        name: "description",
        content:
          "We empower companies by helping them utilize and integrate the most recent technological advances to respond quickly to changing market dynamics.",
      },
      { property: "og:title", content: "About Regal OPs — Who We Are & What We Do" },
      {
        property: "og:description",
        content: "220+ senior engineers building mission-critical platforms for global enterprises.",
      },
    ],
  }),
  component: About,
});

const values = [
  {
    title: "Engineering Over Theatre",
    desc: "Audited, working software beats a slide deck every single time. We deliver production-ready code with comprehensive tests.",
    icon: ShieldCheck,
  },
  {
    title: "Own the Outcome",
    desc: "We stay on until the platform is battle-tested, autoscaling, and stable under peak production workloads.",
    icon: Activity,
  },
  {
    title: "Say the Hard Thing",
    desc: "If an architectural direction poses scalability risk or vendor lock-in, our principal engineers highlight it in sprint one.",
    icon: Sparkles,
  },
];

const timeline = [
  { year: "2011", title: "Practice Inception", text: "Founded as a specialized systems integration practice with deep roots in enterprise architecture." },
  { year: "2015", title: "Core Modernization", text: "Delivered first zero-downtime core banking migration with 100% transactional fidelity." },
  { year: "2019", title: "Multi-Cloud Expansion", text: "Launched dedicated AWS, Azure, and GCP practices with automated Terraform IaC." },
  { year: "2023", title: "AI & Neural Automation", text: "Formed Autonomous AI squad, deploying production LLM agents and sub-15ms inference pipelines." },
  { year: "2026", title: "Global Scale", text: "220+ senior technologists across 14 countries maintaining contractually backed 99.98% high availability." },
];

function About() {
  return (
    <SiteLayout>
      {/* 1. HERO & ABOUT SECTION (Matching Reference) */}
      <section className="relative bg-white pt-16 sm:pt-20 lg:pt-24 pb-16 sm:pb-20 overflow-hidden border-b border-neutral-200/70">
        <div className="absolute top-1/2 right-10 -translate-y-1/2 w-96 h-96 rounded-full bg-gradient-to-tr from-sky-400/10 via-orange-400/10 to-amber-300/10 blur-3xl pointer-events-none" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-6 xl:col-span-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-sky-200/80 bg-sky-50/70 px-3.5 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-[#007cb8]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#0091d5]" />
                Who We Are &amp; What We Do
              </div>

              <h1 className="mt-4 text-3xl sm:text-4xl lg:text-[2.75rem] font-bold text-neutral-900 tracking-tight leading-[1.15]">
                About Regal OPs
              </h1>

              <p className="mt-2 text-lg sm:text-xl font-normal italic font-serif text-neutral-600 tracking-wide">
                Who We Are &amp; What We Do
              </p>

              <p className="mt-6 text-sm sm:text-[15.5px] leading-relaxed text-neutral-600">
                We empower companies by helping them utilize and integrate the most recent technological advances. This allows businesses to respond more quickly and intuitively to changing market dynamics. At Regal OPs, we have a long track record of transforming organizations into high-performing businesses that can tap into new, high-profit opportunities.
              </p>

              <p className="mt-4 text-sm sm:text-[15.5px] leading-relaxed text-neutral-600">
                By utilizing our technical expertise, industry insight, technological vision, and innovative thinking we can help you identify new opportunities for growth and innovation. We enable organizations to reach their full potential and accelerate their business. Don’t just keep up with the competition, get ahead. The market can be crowded, but we will make you stand out.
              </p>

              {/* Three Value Highlights */}
              <div className="mt-7 grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="rounded-xl border border-neutral-200/80 bg-neutral-50/60 p-3">
                  <div className="text-xs font-bold text-neutral-900 flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-orange-500" />
                    Technical Expertise
                  </div>
                  <div className="text-[11px] text-neutral-500 mt-1 leading-tight">
                    Cloud, AI &amp; modern engineering
                  </div>
                </div>

                <div className="rounded-xl border border-neutral-200/80 bg-neutral-50/60 p-3">
                  <div className="text-xs font-bold text-neutral-900 flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-[#0091d5]" />
                    Industry Insight
                  </div>
                  <div className="text-[11px] text-neutral-500 mt-1 leading-tight">
                    Deep domain &amp; operational wisdom
                  </div>
                </div>

                <div className="rounded-xl border border-neutral-200/80 bg-neutral-50/60 p-3">
                  <div className="text-xs font-bold text-neutral-900 flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-amber-500" />
                    Accelerated Growth
                  </div>
                  <div className="text-[11px] text-neutral-500 mt-1 leading-tight">
                    Turning vision into measurable ROI
                  </div>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-3.5">
                <Link
                  to="/solutions"
                  className="inline-flex items-center gap-2 rounded bg-[#0091d5] hover:bg-[#007cb8] px-6 py-2.5 text-xs sm:text-sm font-semibold text-white shadow-sm hover:shadow transition-all duration-200 cursor-pointer"
                >
                  <span className="font-bold">&mdash;</span> Our Solutions
                </Link>

                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 rounded border border-neutral-300 hover:border-neutral-400 bg-white hover:bg-neutral-50 px-5 py-2.5 text-xs sm:text-sm font-semibold text-neutral-800 shadow-2xs transition-all duration-200 cursor-pointer"
                >
                  Contact Our Leadership <ArrowRight className="h-3.5 w-3.5 text-neutral-500" />
                </Link>
              </div>
            </div>

            {/* Right Graphic Showcase */}
            <div className="lg:col-span-6 xl:col-span-6 flex justify-center items-center">
              <div className="relative w-full max-w-md lg:max-w-lg xl:max-w-xl">
                <div className="absolute inset-0 bg-gradient-to-tr from-sky-100 via-orange-100 to-amber-50 rounded-full blur-3xl opacity-60 pointer-events-none transform scale-90" />
                
                <div className="relative z-10 transition-transform duration-500 hover:scale-[1.02]">
                  <img
                    src="/about-graphic.png"
                    alt="About Regal OPs — Who We Are & What We Do"
                    className="w-full h-auto max-h-[460px] object-contain mx-auto drop-shadow-md select-none animate-float"
                  />
                </div>

                <div className="absolute -bottom-2 -left-2 sm:bottom-4 sm:left-4 z-20 rounded-2xl border border-neutral-200/90 bg-white/95 backdrop-blur-md p-3.5 sm:p-4 shadow-xl shadow-neutral-900/8 max-w-[240px] sm:max-w-[270px]">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-orange-50 text-orange-600 border border-orange-100 shadow-xs">
                      <Sparkles className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="text-xs sm:text-sm font-bold text-neutral-900 leading-tight">
                        Proven Track Record
                      </div>
                      <div className="text-[10px] sm:text-[11px] text-neutral-500 mt-0.5 leading-tight">
                        Transforming high-performing organizations
                      </div>
                    </div>
                  </div>
                </div>

                <div className="absolute top-2 -right-2 sm:top-6 sm:right-2 z-20 rounded-full border border-sky-200/90 bg-white/90 backdrop-blur-md px-3.5 py-1 text-[11px] font-bold text-[#007cb8] shadow-md shadow-sky-900/5">
                  Next-Gen Innovation &bull; 99.98% SLA
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. CORE VALUES & PHILOSOPHY */}
      <section className="bg-[#fafcfb] py-16 sm:py-20 border-b border-neutral-200/70">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-sky-200 bg-sky-50 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-[#007cb8]">
              Our Guiding Principles
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900">
              The Principles That Drive Our Work
            </h2>
            <p className="mt-3 text-base text-neutral-600">
              How we approach engineering challenges, client partnerships, and technical ownership.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            {values.map((v) => {
              const Icon = v.icon;
              return (
                <div key={v.title} className="rounded-2xl border border-neutral-200/80 bg-white p-7 shadow-xs hover:shadow-md transition-shadow">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-sky-50 text-[#0091d5] border border-sky-100 mb-5">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-bold text-neutral-900">{v.title}</h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-neutral-600">{v.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. TIMELINE & MILESTONES */}
      <section className="bg-white py-16 sm:py-20 border-b border-neutral-200/70">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-sky-200 bg-sky-50 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-[#007cb8]">
              Fifteen Years of Impact
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900">
              Our Journey &amp; Milestones
            </h2>
            <p className="mt-3 text-base text-neutral-600">
              From an agile architecture squad to a global practice serving Tier-1 institutions.
            </p>
          </div>

          <div className="mt-12 relative border-l-2 border-sky-100 ml-4 sm:ml-6 space-y-10 pl-6 sm:pl-8">
            {timeline.map((item) => (
              <div key={item.year} className="relative group">
                {/* Dot */}
                <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 h-4 w-4 rounded-full border-2 border-white bg-[#0091d5] shadow-xs group-hover:scale-125 transition-transform" />
                <div className="inline-block rounded-full bg-sky-50 px-3 py-0.5 text-xs font-bold text-[#007cb8]">
                  {item.year}
                </div>
                <h3 className="mt-2 text-base sm:text-lg font-bold text-neutral-900">{item.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-neutral-600 max-w-2xl">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. BOTTOM CTA */}
      <section className="bg-[#fafcfb] py-16 text-center">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900">
            Ready to Accelerate Your Enterprise?
          </h2>
          <p className="mt-3 text-sm sm:text-base text-neutral-600">
            Schedule a confidential architecture review with our principal engineering team.
          </p>
          <div className="mt-6 flex justify-center gap-4">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded bg-[#0091d5] hover:bg-[#007cb8] px-6 py-3 text-sm font-semibold text-white shadow-md shadow-sky-900/10 transition-all cursor-pointer"
            >
              Talk to an Engineer <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}

