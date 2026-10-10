import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect, useRef } from "react";
import { SiteLayout } from "@/components/site/site-layout";
import {
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Activity,
  Users,
  Award,
  Cpu,
  Target,
  Clock,
  TrendingUp,
  Layers,
  HeartHandshake,
  CheckCircle2,
  Zap,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Regal OPs — Technology Services & Enterprise Modernization" },
      {
        name: "description",
        content:
          "Regal OPs offers complete end-to-end lifecycle delivery of technology services to transform organizations into high-performing businesses.",
      },
      { property: "og:title", content: "About Regal OPs — Technology Services & Enterprise Modernization" },
      {
        property: "og:description",
        content:
          "Regal OPs offers complete end-to-end lifecycle delivery of technology services to transform organizations into high-performing businesses through our expertise, insights, vision and innovative solutions.",
      },
    ],
  }),
  component: About,
});

// 1. Key Benefits Data (Exact Vuesol 6 Pillars)
const keyBenefits = [
  {
    title: "Leaders in Technology",
    desc: "Cutting edge technologies to help your business build competitive advantages and achieve operational efficiency.",
    icon: Cpu,
    color: "sky",
    badge: "Next-Gen Tech",
  },
  {
    title: "Proven Delivery Experts",
    desc: "We deliver high-performance results through customized delivery of technological solutions to increase productivity, reduce risk and empower your business.",
    icon: Award,
    color: "amber",
    badge: "Zero-Risk SLA",
  },
  {
    title: "Real-Time Solutions",
    desc: "Your deadlines are ours too. We become your strategic partner to deliver solutions that help you sync with the changing market conditions.",
    icon: Clock,
    color: "emerald",
    badge: "24/7 Velocity",
  },
  {
    title: "Strategic Sourcing",
    desc: "Sourcing and technology solutions that help you achieve procurement and supply chain efficiency across global multi-region squads.",
    icon: Layers,
    color: "indigo",
    badge: "Global Pods",
  },
  {
    title: "Value for Money",
    desc: "Get the best ROI on our domestic and global expertise with transparent, outcome-based engagements and zero consultant bloat.",
    icon: TrendingUp,
    color: "orange",
    badge: "Measurable ROI",
  },
  {
    title: "Technical Know-How",
    desc: "Regal OPs comprises an expert line-up of skilled, talented individuals who can accelerate an enterprise organization to sustainable success.",
    icon: Zap,
    color: "blue",
    badge: "Principal Staff",
  },
];

// 2. Our People Data (Vuesol 3 Pillars)
const peoplePillars = [
  {
    title: "Passion for Technology",
    desc: "Our passion for delivering phenomenal results keeps our IT experts armed with sharpened skills in cutting-edge technologies, cloud infrastructure, and autonomous AI.",
    icon: Sparkles,
  },
  {
    title: "In-depth Industry Expertise",
    desc: "Our principal consultants hold deep domain expertise and battle-tested experience across enterprise finance, healthcare, logistics, and high-load SaaS platforms.",
    icon: Users,
  },
  {
    title: "Value Addition",
    desc: "With our customer-centric attitude, our people add measurable value to every architecture interaction and every deployed production system.",
    icon: Target,
  },
];

// 3. Our Core Values Data (Vuesol Exact Values)
const coreValues = [
  {
    title: "Personal Integrity & Professional Standards",
    desc: "Upheld with unwavering commitment, especially while pursuing high-stakes enterprise objectives with customers and long-term ecosystem partners.",
    icon: ShieldCheck,
  },
  {
    title: "Dignity & Equal Opportunity",
    desc: "Maintained rigorously for employment, career acceleration, and continuous engineering development for all current and future team members.",
    icon: HeartHandshake,
  },
  {
    title: "Quality Products & Ethical Approach",
    desc: "Aligned with technology partners and engineering squads to maintain rigorous production standards and display demonstrable operational commitment.",
    icon: Activity,
  },
];

// 4. Milestones Timeline
const timeline = [
  {
    year: "2011",
    title: "Practice Inception",
    text: "Founded as a specialized systems integration practice with deep roots in enterprise architecture and distributed systems.",
  },
  {
    year: "2015",
    title: "Core Modernization",
    text: "Delivered first zero-downtime core banking migration with 100% transactional fidelity and automated failover.",
  },
  {
    year: "2019",
    title: "Multi-Cloud Expansion",
    text: "Launched dedicated AWS, Azure, and GCP practices with automated Terraform IaC and GitOps pipelines.",
  },
  {
    year: "2023",
    title: "AI & Neural Automation",
    text: "Formed Autonomous AI squad, deploying production LLM agents and sub-15ms inference pipelines for enterprise clients.",
  },
  {
    year: "2026",
    title: "Global Scale & Inc. 5000 Recognition",
    text: "220+ senior technologists across 14 countries maintaining contractually backed 99.98% high availability.",
  },
];

function About() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Auto-scroll loop every 3.5 seconds when user is not hovering
  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      const container = scrollRef.current;
      if (!container) return;
      const firstChild = container.firstElementChild as HTMLElement | null;
      const cardWidth = firstChild?.clientWidth || 360;
      const gap = 24;
      const scrollAmount = cardWidth + gap;

      // When reaching or nearing the end, smoothly loop back to start
      if (container.scrollLeft + container.clientWidth >= container.scrollWidth - 30) {
        container.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        container.scrollBy({ left: scrollAmount, behavior: "smooth" });
      }
    }, 3500);

    return () => clearInterval(interval);
  }, [isHovered]);

  const handleScroll = () => {
    const container = scrollRef.current;
    if (!container) return;
    const firstChild = container.firstElementChild as HTMLElement | null;
    const cardWidth = firstChild?.clientWidth || 360;
    const gap = 24;
    const index = Math.round(container.scrollLeft / (cardWidth + gap));
    setActiveIndex(Math.min(Math.max(index, 0), keyBenefits.length - 1));
  };

  const scroll = (direction: "left" | "right") => {
    const container = scrollRef.current;
    if (!container) return;
    const firstChild = container.firstElementChild as HTMLElement | null;
    const cardWidth = firstChild?.clientWidth || 360;
    const gap = 24;
    const scrollAmount = cardWidth + gap;
    container.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  const scrollTo = (index: number) => {
    const container = scrollRef.current;
    if (!container) return;
    const firstChild = container.firstElementChild as HTMLElement | null;
    const cardWidth = firstChild?.clientWidth || 360;
    const gap = 24;
    container.scrollTo({
      left: index * (cardWidth + gap),
      behavior: "smooth",
    });
    setActiveIndex(index);
  };

  return (
    <SiteLayout>
      {/* ==================================================================== */}
      {/* 1. HERO BANNER (Vuesol Exact Reference with Skyline & Wave Ribbon)    */}
      {/* ==================================================================== */}
      {/* ==================================================================== */}
      {/* 1. HERO BANNER (Executive Skyline & Multi-Layer Wave Ribbon)          */}
      {/* ==================================================================== */}
      <section className="relative w-full overflow-hidden bg-[#07192F]">
        {/* Main Banner Container */}
        <div className="relative min-h-[380px] sm:min-h-[420px] lg:min-h-[460px] flex flex-col justify-between">
          
          {/* Background Right Side Image: Twilight Skyline & Highway Trails */}
          <div className="absolute top-0 right-0 bottom-0 w-full lg:w-[60%] select-none pointer-events-none overflow-hidden">
            <img
              src="/about-banner-city.jpg"
              alt="Metropolitan Skyline & Highway Trails"
              className="h-full w-full object-cover object-center scale-105"
            />
            {/* Smooth gradient blend between dark navy left zone and right skyline */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#07192F] via-[#07192F]/70 to-transparent lg:w-[48%]" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#07192F]/90 via-transparent to-black/25" />
            <div className="absolute inset-0 bg-sky-950/20 mix-blend-multiply" />
          </div>

          {/* Background Left Side Tech Dot Grid Pattern */}
          <div
            className="absolute top-0 left-0 w-full lg:w-[50%] bottom-0 pointer-events-none select-none opacity-25"
            style={{
              backgroundImage: "radial-gradient(rgba(217, 168, 62, 0.45) 1px, transparent 1px)",
              backgroundSize: "22px 22px",
              maskImage: "radial-gradient(circle at 20% 40%, black 50%, transparent 100%)",
              WebkitMaskImage: "radial-gradient(circle at 20% 40%, black 50%, transparent 100%)",
            }}
          />

          {/* Floating script text in the sky (top right) */}
          <div className="absolute top-6 right-6 lg:right-14 z-10 pointer-events-none select-none text-right hidden sm:block">
            <span
              className="text-lg sm:text-xl lg:text-[24px] text-white/95 drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)] block font-light tracking-wide"
              style={{ fontFamily: "'Caveat', cursive, sans-serif" }}
            >
              Transforming Businesses Through Technology
            </span>
            <div className="w-20 h-[2px] bg-[#E5A93C] ml-auto mt-0.5 rounded-full shadow-sm" />
          </div>

          {/* Left Column Content Container */}
          <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full py-8 sm:py-10 lg:py-12">
            <div className="max-w-2xl text-left space-y-6">
              
              {/* Top Tagline / Eyebrow */}
              <div className="flex items-center gap-2.5 text-[#E5A93C] text-[11px] sm:text-xs font-bold tracking-[0.22em] uppercase">
                <span className="w-6 h-[2px] bg-[#E5A93C]" />
                <span>Enterprise IT Consulting &amp; Managed Services</span>
              </div>

              {/* Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.08] drop-shadow-md">
                About <br />
                <span className="text-[#E5A93C]">Regal OPs</span>
              </h1>

              {/* Subheading / Lifecycle Statement */}
              <p className="text-sm sm:text-base lg:text-[16px] leading-relaxed text-white/90 font-normal max-w-xl">
                Regal OPs offers complete end-to-end lifecycle delivery of technology services to transform organizations into high-performing businesses through our expertise, insights, vision and innovative solutions.
              </p>

              {/* Call to Action Buttons */}
              <div className="flex flex-wrap items-center gap-3.5 pt-1">
                <Link
                  to="/solutions"
                  className="inline-flex items-center gap-2 rounded-full bg-[#059669] hover:bg-[#10B981] px-6 sm:px-7 py-3 text-xs sm:text-sm font-bold text-white shadow-lg shadow-emerald-950/40 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
                >
                  Explore Our Solutions <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 rounded-full border border-white/40 hover:border-white bg-white/10 hover:bg-white/20 px-5 sm:px-6 py-3 text-xs sm:text-sm font-semibold text-white backdrop-blur-xs transition-all cursor-pointer"
                >
                  Contact Leadership <ArrowRight className="h-4 w-4" />
                </Link>
              </div>

            </div>
          </div>

          {/* Multi-Layer Wave Transition SVG with Golden Metallic Ribbon Trim */}
          <div className="relative w-full overflow-hidden leading-none select-none pointer-events-none -mb-[1px]">
            <svg
              className="w-full h-16 sm:h-24 lg:h-32 block"
              viewBox="0 0 1440 180"
              preserveAspectRatio="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="goldWaveRibbon" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#D4AF37" />
                  <stop offset="35%" stopColor="#F59E0B" />
                  <stop offset="70%" stopColor="#E5A93C" />
                  <stop offset="100%" stopColor="#D4AF37" />
                </linearGradient>
              </defs>
              {/* Golden metallic wave ribbon accent layer */}
              <path
                d="M0,60 C320,165 650,140 980,50 C1200,-10 1350,35 1440,60 L1440,180 L0,180 Z"
                fill="url(#goldWaveRibbon)"
              />
              {/* White wave base smoothly flowing into page */}
              <path
                d="M0,76 C320,180 650,155 980,66 C1200,6 1350,50 1440,75 L1440,180 L0,180 Z"
                fill="#FFFFFF"
              />
            </svg>
          </div>

        </div>

        {/* Section Intro: "OUR PURPOSE" (Directly under the wave) */}
        <div className="relative bg-white pt-10 pb-4 text-center">
          <div className="mx-auto max-w-4xl px-4 sm:px-6">
            <div className="flex items-center justify-center gap-2.5 text-emerald-600 text-xs font-bold tracking-[0.22em] uppercase mb-3">
              <span className="w-5 h-[2px] bg-emerald-500" />
              <span>OUR PURPOSE</span>
              <span className="w-5 h-[2px] bg-emerald-500" />
            </div>
            <h2 className="text-[20px] xs:text-[22px] sm:text-3xl lg:text-4xl font-extrabold text-[#0F172A] tracking-tight leading-snug">
              <span className="block sm:inline">Building Smarter, Stronger</span>{" "}
              <span className="block sm:inline">and More Resilient Businesses</span>
            </h2>
            <p className="mt-3.5 text-sm sm:text-base text-neutral-600 max-w-2xl mx-auto leading-relaxed">
              We combine deep industry knowledge, advanced technologies and a client-first approach to create sustainable value for organizations across the globe.
            </p>
          </div>
        </div>
      </section>

      {/* ==================================================================== */}
      {/* 2. OUR KEY BENEFITS (Horizontal Auto-Scrolling Carousel)             */}
      {/* ==================================================================== */}
      <section id="our-key-benefits" className="relative bg-white py-6 sm:py-8 border-b border-neutral-200/70 overflow-hidden">
        <div id="benefits" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Section Header with Carousel Navigation Controls */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-5">
            <div className="max-w-2xl text-left">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-sky-200 bg-sky-50 px-3.5 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-[#007cb8]">
                Why Leading Enterprises Choose Us
              </span>
              <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight">
                Our Key Benefits
              </h2>
              <div className="w-12 h-1 bg-[#0091d5] rounded-full mt-3 mb-4" />
              <p className="text-sm sm:text-base text-neutral-600 leading-relaxed">
                We empower organizations to reach their full potential and accelerate
                their technological transformation with battle-tested rigor.
              </p>
            </div>

            {/* Navigation Buttons & Auto-scroll indicator */}
            <div className="flex items-center gap-3 shrink-0 self-start md:self-end">
              <span className="text-[11px] font-medium text-neutral-500 hidden sm:inline-flex items-center gap-1.5 bg-neutral-100/80 px-3 py-1.5 rounded-full border border-neutral-200/60">
                <span className={`h-2 w-2 rounded-full ${isHovered ? "bg-amber-400" : "bg-emerald-500 animate-pulse"}`} />
                {isHovered ? "Paused on hover" : "Auto-scrolling"}
              </span>
              <button
                type="button"
                onClick={() => scroll("left")}
                aria-label="Scroll left"
                className="h-10 w-10 rounded-full border border-neutral-200/80 bg-white text-neutral-700 hover:bg-[#0091d5] hover:text-white hover:border-[#0091d5] shadow-xs flex items-center justify-center transition-all duration-200 cursor-pointer active:scale-95"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={() => scroll("right")}
                aria-label="Scroll right"
                className="h-10 w-10 rounded-full border border-neutral-200/80 bg-white text-neutral-700 hover:bg-[#0091d5] hover:text-white hover:border-[#0091d5] shadow-xs flex items-center justify-center transition-all duration-200 cursor-pointer active:scale-95"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Carousel Container with Side Gradient Mask Fades */}
        <div
          className="relative w-full"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Subtle Left & Right Edge Fades */}
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-6 sm:w-16 bg-gradient-to-r from-white to-transparent z-10" />
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-6 sm:w-16 bg-gradient-to-l from-white to-transparent z-10" />

          {/* Horizontally Scrollable Cards Row */}
          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className="flex gap-6 overflow-x-auto scroll-smooth py-4 px-4 sm:px-6 lg:px-8 snap-x snap-mandatory mx-auto max-w-7xl [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          >
            {keyBenefits.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="group relative w-[85vw] sm:w-[360px] lg:w-[380px] shrink-0 snap-start rounded-2xl border border-neutral-200/80 bg-white p-7 shadow-xs hover:shadow-xl hover:border-sky-300 transition-all duration-300 flex flex-col justify-between hover:-translate-y-1 select-none"
                >
                  <div>
                    {/* Top Icon & Tag */}
                    <div className="flex items-center justify-between mb-5">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-sky-50 text-[#0091d5] border border-sky-100 group-hover:bg-[#0091d5] group-hover:text-white transition-colors duration-300">
                        <Icon className="h-6 w-6" />
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 bg-neutral-100/80 px-2.5 py-1 rounded-full group-hover:bg-sky-50 group-hover:text-[#007cb8] transition-colors">
                        {item.badge}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-neutral-900 group-hover:text-[#0091d5] transition-colors">
                      {item.title}
                    </h3>
                    <p className="mt-2.5 text-xs sm:text-sm text-neutral-600 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-neutral-100 flex items-center justify-between text-xs font-semibold text-[#0091d5]">
                    <span>Standard in every engagement</span>
                    <span className="text-neutral-400 font-mono text-[11px]">0{idx + 1}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Pagination Dots & Position Tracker */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mt-8 flex items-center justify-center gap-2">
            {keyBenefits.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => scrollTo(idx)}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  idx === activeIndex
                    ? "w-8 bg-[#0091d5] shadow-[0_0_8px_rgba(0,145,213,0.4)]"
                    : "w-2 bg-neutral-300 hover:bg-neutral-400"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
            <span className="text-xs font-bold font-mono text-neutral-500 ml-2">
              0{activeIndex + 1} / 0{keyBenefits.length}
            </span>
          </div>
        </div>
      </section>

      {/* ==================================================================== */}
      {/* 3. OUR PEOPLE (Architectural Card-Free Editorial Pillars - COMPACT)  */}
      {/* ==================================================================== */}
      <section className="relative bg-white dark:bg-slate-950 py-6 sm:py-8 border-b border-neutral-200/70 dark:border-slate-800/80 overflow-hidden">
        {/* Ambient subtle light glow behind the pillars */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[220px] bg-emerald-500/5 dark:bg-emerald-500/10 blur-[100px] rounded-full pointer-events-none" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200/60 dark:border-emerald-800/60 bg-emerald-50 dark:bg-emerald-950/50 px-3 py-0.5 text-[11px] font-bold uppercase tracking-[0.2em] text-[#136a3e] dark:text-emerald-400">
              <Sparkles className="h-3 w-3" /> Culture &amp; Talent Excellence
            </span>
            <h2 className="mt-1.5 text-2xl sm:text-3xl lg:text-4xl font-black text-neutral-900 dark:text-white tracking-tight">
              Our People
            </h2>
            <div className="w-10 h-0.5 bg-gradient-to-r from-[#136a3e] to-amber-500 rounded-full mx-auto mt-2 mb-2" />
            <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-2xl mx-auto">
              We nurture a truly diverse and talented pool of people who work with a
              customer-centric attitude to deliver phenomenal results.
            </p>
          </div>

          {/* Open Architectural 3-Column Pillar Presentation (NO CARDS - COMPACT HEIGHT) */}
          <div className="mt-5 sm:mt-6 grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-neutral-200/80 dark:divide-slate-800">
            {peoplePillars.map((p, idx) => {
              const Icon = p.icon;
              return (
                <div
                  key={p.title}
                  className="group relative py-5 sm:py-6 px-5 lg:px-8 flex flex-col justify-between transition-colors duration-300"
                >
                  <div>
                    {/* Top row: Floating luminous icon + sleek mono index */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500/10 via-teal-500/10 to-amber-500/10 text-[#136a3e] dark:text-emerald-400 border border-emerald-500/20 shadow-xs group-hover:scale-105 group-hover:bg-[#136a3e] group-hover:text-white transition-all duration-300">
                        <Icon className="h-5 w-5 transition-colors" />
                      </div>
                      <span className="text-2xl sm:text-3xl font-mono font-black text-slate-200 dark:text-slate-800 group-hover:text-emerald-600/30 dark:group-hover:text-emerald-400/30 transition-colors select-none">
                        0{idx + 1}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-lg sm:text-xl font-extrabold text-neutral-900 dark:text-white tracking-tight group-hover:text-[#136a3e] dark:group-hover:text-emerald-400 transition-colors">
                      {p.title}
                    </h3>

                    {/* Description */}
                    <p className="mt-2 text-xs sm:text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
                      {p.desc}
                    </p>
                  </div>

                  {/* Bottom expanding gradient accent line */}
                  <div className="mt-5 pt-3.5 border-t border-neutral-100 dark:border-slate-800/60 flex items-center gap-2.5">
                    <div className="h-0.5 w-6 rounded-full bg-gradient-to-r from-[#136a3e] to-amber-500 group-hover:w-16 transition-all duration-300" />
                    <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 dark:text-neutral-500 group-hover:text-[#136a3e] dark:group-hover:text-emerald-400 transition-colors">
                      Core Pillar
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ==================================================================== */}
      {/* 4. OUR CORE VALUES (Open Architectural Feature Layout - COMPACT)     */}
      {/* ==================================================================== */}
      <section id="our-core-values" className="bg-[#fafcfb] dark:bg-slate-900/60 py-6 sm:py-8 border-b border-neutral-200/70 dark:border-slate-800/80">
        <div id="values" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-left max-w-3xl">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-sky-200 dark:border-sky-800 bg-sky-50 dark:bg-sky-950/50 px-3 py-0.5 text-[11px] font-bold uppercase tracking-[0.2em] text-[#007cb8] dark:text-sky-400">
              Ethical Standards &amp; Principles
            </span>
            <h2 className="mt-1.5 text-2xl sm:text-3xl lg:text-4xl font-black text-neutral-900 dark:text-white tracking-tight">
              Our Core Values
            </h2>
            <div className="w-10 h-0.5 bg-[#0091d5] rounded-full mt-2 mb-2" />
            <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-2xl">
              We have embedded the highest ethical standards across our organization,
              reflected in how we conduct our business and collaborate with all stakeholders.
            </p>
          </div>

          <div className="mt-5 sm:mt-6 grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-neutral-200/80 dark:divide-slate-800">
            {coreValues.map((v, idx) => {
              const Icon = v.icon;
              return (
                <div
                  key={v.title}
                  className="group relative py-5 sm:py-6 px-5 lg:px-8 flex flex-col justify-between transition-colors duration-300"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-sky-50 dark:bg-sky-950/60 text-[#0091d5] dark:text-sky-400 border border-sky-200/50 dark:border-sky-800/50 group-hover:scale-105 group-hover:bg-[#0091d5] group-hover:text-white transition-all duration-300 shadow-xs">
                        <Icon className="h-5 w-5" />
                      </div>
                      <span className="text-2xl sm:text-3xl font-mono font-black text-slate-200 dark:text-slate-800 group-hover:text-sky-500/30 transition-colors select-none">
                        0{idx + 1}
                      </span>
                    </div>

                    <h3 className="text-lg sm:text-xl font-extrabold text-neutral-900 dark:text-white tracking-tight group-hover:text-[#0091d5] transition-colors">
                      {v.title}
                    </h3>
                    <p className="mt-2 text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                      {v.desc}
                    </p>
                  </div>

                  <div className="mt-5 pt-3.5 border-t border-neutral-200/60 dark:border-slate-800 flex items-center gap-2 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                    <CheckCircle2 className="h-4 w-4" /> Contractually Respected
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ==================================================================== */}
      {/* 5. JOURNEY & MILESTONES TIMELINE                                     */}
      {/* ==================================================================== */}
      <section className="bg-[#fafcfb] py-6 sm:py-8 border-b border-neutral-200/70">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-sky-200 bg-sky-50 px-3.5 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-[#007cb8]">
              Fifteen Years of Impact
            </span>
            <h2 className="mt-2 text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-neutral-900">
              Our Journey &amp; Milestones
            </h2>
            <div className="w-12 h-1 bg-[#0091d5] rounded-full mt-2 mb-3" />
            <p className="text-sm sm:text-base text-neutral-600">
              From an agile architecture squad to a global practice serving Fortune 500 institutions.
            </p>
          </div>

          <div className="mt-5 sm:mt-6 relative border-l-2 border-sky-200 ml-4 sm:ml-6 space-y-5 pl-6 sm:pl-8">
            {timeline.map((item) => (
              <div key={item.year} className="relative group">
                <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 h-4 w-4 rounded-full border-2 border-white bg-[#0091d5] shadow-xs group-hover:scale-125 transition-transform" />
                <div className="inline-block rounded-full bg-sky-100 text-[#007cb8] px-3 py-0.5 text-xs font-bold font-mono">
                  {item.year}
                </div>
                <h3 className="mt-1 text-base sm:text-lg font-bold text-neutral-900">
                  {item.title}
                </h3>
                <p className="mt-0.5 text-xs sm:text-sm leading-relaxed text-neutral-600 max-w-2xl">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================================================================== */}
      {/* 6. EXECUTIVE CTA BANNER                                               */}
      {/* ==================================================================== */}
      <section className="bg-white py-6 sm:py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl bg-linear-to-br from-neutral-900 via-neutral-950 to-neutral-900 p-6 sm:p-8 lg:p-10 shadow-2xl border border-neutral-800 text-center">
            <div className="pointer-events-none absolute -right-20 -bottom-20 h-80 w-80 rounded-full bg-sky-500/10 blur-3xl" />
            <div className="pointer-events-none absolute -left-20 -top-20 h-80 w-80 rounded-full bg-cyan-500/10 blur-3xl" />

            <div className="relative z-10 max-w-3xl mx-auto">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-sky-400/30 bg-sky-500/10 px-3.5 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-sky-300">
                Accelerate With Confidence
              </span>
              <h2 className="mt-3 text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
                Ready to Transform Your Technology Landscape?
              </h2>
              <p className="mt-2 text-sm sm:text-base text-neutral-300 leading-relaxed max-w-xl mx-auto">
                Schedule an executive architectural consultation with our principal engineering team.
              </p>
              <div className="mt-5 flex flex-wrap justify-center items-center gap-3.5">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 rounded-full bg-[#0091d5] hover:bg-[#007cb8] px-7 py-3 text-sm font-bold text-white shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
                >
                  Talk to an Engineer <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  to="/solutions"
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 px-6 py-3 text-sm font-semibold text-white transition-all backdrop-blur-xs cursor-pointer"
                >
                  View Solutions Catalog
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}

export default About;
