import { Link } from "@tanstack/react-router";
import {
  ShieldCheck,
  Users,
  Globe,
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  ArrowUp,
} from "lucide-react";
import { FooterSocialIcons } from "./social-icons";

export function SiteFooter() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="relative w-full bg-[#060B0E] text-[#D1D5DB] font-sans overflow-hidden border-t border-white/[0.06]">
      {/* ==================================================================== */}
      {/* 1. ATMOSPHERIC BACKGROUND LAYERS & SKYLINE ARCHITECTURE             */}
      {/* ==================================================================== */}
      {/* Illuminated corporate architecture skyline on right side */}
      <div className="absolute inset-y-0 right-0 w-full lg:w-[48%] pointer-events-none select-none overflow-hidden opacity-25 lg:opacity-35">
        <img
          src="/footer-skyline.jpg"
          alt="Enterprise Headquarters"
          className="h-full w-full object-cover object-center"
        />
        {/* Gradients blending image smoothly into deep dark obsidian backdrop */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#060B0E] via-[#060B0E]/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#060B0E] via-transparent to-[#060B0E]/80" />
      </div>

      {/* Subtle digital dot matrix pattern top-left */}
      <div
        className="absolute top-0 left-0 w-[550px] h-[350px] pointer-events-none opacity-20"
        style={{
          backgroundImage: "radial-gradient(rgba(217, 168, 62, 0.4) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
          maskImage: "radial-gradient(circle at 0% 0%, black 50%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(circle at 0% 0%, black 50%, transparent 100%)",
        }}
      />

      {/* ==================================================================== */}
      {/* 2. LUMINOUS GOLDEN WAVE RIBBON (Flows under metrics on left)         */}
      {/* ==================================================================== */}
      <div className="absolute inset-x-0 bottom-8 sm:bottom-12 lg:bottom-10 h-56 sm:h-68 lg:h-80 pointer-events-none select-none z-[1] overflow-hidden">
        <svg
          viewBox="0 0 1600 240"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-[0_0_16px_rgba(229,169,60,0.4)]"
          preserveAspectRatio="none"
        >
          <defs>
            {/* Pure Warm Gold / Amber Gradient - Zero Green Shades */}
            <linearGradient id="pureGoldRibbon1" gradientUnits="userSpaceOnUse" x1="-50" y1="0" x2="780" y2="0">
              <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.05" />
              <stop offset="12%" stopColor="#F59E0B" stopOpacity="0.9" />
              <stop offset="38%" stopColor="#EAB308" stopOpacity="1" />
              <stop offset="60%" stopColor="#FCD34D" stopOpacity="0.95" />
              <stop offset="78%" stopColor="#F59E0B" stopOpacity="0.55" />
              <stop offset="90%" stopColor="#D4AF37" stopOpacity="0.18" />
              <stop offset="100%" stopColor="#D4AF37" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="pureGoldRibbon2" gradientUnits="userSpaceOnUse" x1="-50" y1="0" x2="780" y2="0">
              <stop offset="0%" stopColor="#B45309" stopOpacity="0" />
              <stop offset="15%" stopColor="#D4AF37" stopOpacity="0.85" />
              <stop offset="42%" stopColor="#FBBF24" stopOpacity="0.95" />
              <stop offset="68%" stopColor="#F59E0B" stopOpacity="0.7" />
              <stop offset="88%" stopColor="#D4AF37" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#D4AF37" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Ambient luminous glow trail under brand & metrics */}
          <path
            d="M -50 178 C 180 215, 460 120, 710 135"
            stroke="#F59E0B"
            strokeWidth="8"
            strokeOpacity="0.22"
          />

          {/* Parallel flowing pure-gold wave ribbons - gracefully dissolving before the right columns */}
          <path d="M -50 180 C 180 218, 460 122, 710 136" stroke="url(#pureGoldRibbon1)" strokeWidth="2.0" strokeOpacity="0.95" />
          <path d="M -50 177 C 185 215, 465 120, 715 134" stroke="url(#pureGoldRibbon1)" strokeWidth="1.8" strokeOpacity="0.90" />
          <path d="M -50 174 C 190 212, 470 118, 720 132" stroke="url(#pureGoldRibbon2)" strokeWidth="1.6" strokeOpacity="0.85" />
          <path d="M -50 171 C 195 209, 475 116, 725 130" stroke="url(#pureGoldRibbon1)" strokeWidth="1.5" strokeOpacity="0.80" />
          <path d="M -50 168 C 200 206, 480 114, 730 128" stroke="url(#pureGoldRibbon2)" strokeWidth="1.4" strokeOpacity="0.75" />
          <path d="M -50 165 C 205 203, 485 112, 735 126" stroke="url(#pureGoldRibbon1)" strokeWidth="1.3" strokeOpacity="0.70" />
          <path d="M -50 162 C 210 200, 490 110, 740 124" stroke="url(#pureGoldRibbon2)" strokeWidth="1.2" strokeOpacity="0.65" />
          <path d="M -50 159 C 215 197, 495 108, 745 122" stroke="url(#pureGoldRibbon1)" strokeWidth="1.1" strokeOpacity="0.60" />
          <path d="M -50 156 C 220 194, 500 106, 750 120" stroke="url(#pureGoldRibbon2)" strokeWidth="1.0" strokeOpacity="0.55" />
          <path d="M -50 153 C 225 191, 505 104, 755 118" stroke="url(#pureGoldRibbon1)" strokeWidth="0.9" strokeOpacity="0.50" />
          <path d="M -50 150 C 230 188, 510 102, 760 116" stroke="url(#pureGoldRibbon2)" strokeWidth="0.8" strokeOpacity="0.45" />
          <path d="M -50 147 C 235 185, 515 100, 765 114" stroke="url(#pureGoldRibbon1)" strokeWidth="0.8" strokeOpacity="0.40" />
          <path d="M -50 144 C 240 182, 520 98,  770 112" stroke="url(#pureGoldRibbon2)" strokeWidth="0.7" strokeOpacity="0.35" />
          <path d="M -50 141 C 245 179, 525 96,  775 110" stroke="url(#pureGoldRibbon1)" strokeWidth="0.6" strokeOpacity="0.30" />
          <path d="M -50 138 C 250 176, 530 94,  780 108" stroke="url(#pureGoldRibbon2)" strokeWidth="0.5" strokeOpacity="0.25" />
          <path d="M -50 135 C 255 173, 535 92,  785 106" stroke="url(#pureGoldRibbon1)" strokeWidth="0.5" strokeOpacity="0.20" />
        </svg>
      </div>

      {/* ==================================================================== */}
      {/* 2. MAIN FOOTER CONTENT WRAPPER                                       */}
      {/* ==================================================================== */}
      <div className="relative mx-auto max-w-[1480px] px-5 sm:px-8 lg:px-12 pt-7 sm:pt-8 pb-5">
        {/* Top Main Section: Brand + Links Columns + Get in Touch Card */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-5 lg:gap-6 xl:gap-7 items-start">
          
          {/* ---------------------------------------------------------------- */}
          {/* COLUMN 1: Brand Identity, Mission, & Stat Metrics (lg:col-span-4)*/}
          {/* ---------------------------------------------------------------- */}
          <div className="lg:col-span-4 space-y-4">
            {/* Official Brand Logo matching Header */}
            <Link to="/" className="inline-flex items-center gap-3.5 group">
              <img
                src="/logo-emblem.png"
                alt="Regal OPs Logo"
                className="h-12 sm:h-14 w-auto object-contain shrink-0 transition-transform duration-200 group-hover:scale-105 drop-shadow-[0_2px_12px_rgba(217,168,62,0.35)]"
              />
              <div className="flex flex-col justify-center">
                <span className="font-display text-2xl font-black tracking-tight text-white block group-hover:text-amber-300 transition-colors leading-none">
                  Regal OPs
                </span>
                <span className="text-[10px] font-bold tracking-[0.22em] text-[#D4AF37] block uppercase mt-1 leading-none">
                  CONSULT &nbsp;|&nbsp; BUILD &nbsp;|&nbsp; DEPLOY
                </span>
              </div>
            </Link>

            {/* Mission Statement */}
            <p className="text-[13.5px] leading-relaxed text-[#9CA3AF] max-w-sm">
              Delivering resilient, high-performance IT solutions that accelerate business growth. From cloud and data to digital engineering, we help enterprises operate smarter and scale faster.
            </p>

            {/* 3 Metric / Trust Badges in a Horizontal Row */}
            <div className="pt-2 flex items-center gap-6 sm:gap-7 border-t border-white/[0.08]">
              {/* Metric 1 */}
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-amber-400">
                  <ShieldCheck className="h-5 w-5 shrink-0 stroke-[2.2]" />
                </div>
                <div className="text-[19px] font-black text-white tracking-tight">
                  99.98%
                </div>
                <div className="text-[11px] font-medium text-neutral-400 uppercase tracking-wider">
                  SLA Uptime
                </div>
              </div>

              {/* Metric 2 */}
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-amber-400">
                  <Users className="h-5 w-5 shrink-0 stroke-[2.2]" />
                </div>
                <div className="text-[19px] font-black text-white tracking-tight">
                  500+
                </div>
                <div className="text-[11px] font-medium text-neutral-400 uppercase tracking-wider">
                  Projects
                </div>
              </div>

              {/* Metric 3 */}
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-amber-400">
                  <Globe className="h-5 w-5 shrink-0 stroke-[2.2]" />
                </div>
                <div className="text-[19px] font-black text-white tracking-tight">
                  220+
                </div>
                <div className="text-[11px] font-medium text-neutral-400 uppercase tracking-wider">
                  Global Clients
                </div>
              </div>
            </div>
          </div>

          {/* ---------------------------------------------------------------- */}
          {/* COLUMN 2: Company Links (lg:col-span-2)                          */}
          {/* ---------------------------------------------------------------- */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-[15px] font-bold tracking-tight text-white">Company</h4>
            <ul className="space-y-2.5 text-[13px]">
              {[
                { label: "About", to: "/about" },
                { label: "Core Values", to: "/about", hash: "values" },
                { label: "Key Benefits", to: "/about", hash: "benefits" },
                { label: "Our Clients", to: "/clients" },
                { label: "Leadership Team", to: "/about", hash: "leadership" },
                { label: "News & Media", to: "/blogs" },
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.to}
                    hash={item.hash}
                    className="text-[#9CA3AF] hover:text-white transition-colors duration-150 block py-0.5 whitespace-nowrap"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ---------------------------------------------------------------- */}
          {/* COLUMN 3: Solutions Links (lg:col-span-2)                        */}
          {/* ---------------------------------------------------------------- */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-[15px] font-bold tracking-tight text-white">Solutions</h4>
            <ul className="space-y-2.5 text-[13px]">
              {[
                { label: "Strategic Staffing", to: "/solutions" },
                { label: "Business Process Outsourcing", to: "/solutions" },
                { label: "Recruitment Process Outsourcing", to: "/solutions" },
                { label: "Application Development", to: "/solutions" },
                { label: "Quality Assurance", to: "/solutions" },
                { label: "Regal OPs Training Hub", to: "/solutions" },
                { label: "IT Strategy and Assessment", to: "/solutions" },
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.to}
                    className="text-[#9CA3AF] hover:text-white transition-colors duration-150 block py-0.5 leading-snug"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ---------------------------------------------------------------- */}
          {/* COLUMN 4: Careers Links (lg:col-span-1)                          */}
          {/* ---------------------------------------------------------------- */}
          <div className="lg:col-span-1 space-y-4">
            <h4 className="text-[15px] font-bold tracking-tight text-white">Careers</h4>
            <ul className="space-y-2.5 text-[13px]">
              {[
                { label: "Why Join Regal OPs", to: "/career" },
                { label: "Jobs", to: "/career" },
                { label: "Current Openings", to: "/career" },
                { label: "Life at Regal OPs", to: "/career" },
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.to}
                    className="text-[#9CA3AF] hover:text-white transition-colors duration-150 block py-0.5 leading-snug"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ---------------------------------------------------------------- */}
          {/* COLUMN 5: "Get in Touch" Floating Glass Card (lg:col-span-3)     */}
          {/* ---------------------------------------------------------------- */}
          <div className="lg:col-span-3 xl:col-span-3">
            <div className="relative rounded-3xl border border-white/10 bg-[#0A131A]/90 p-5 sm:p-6 backdrop-blur-md shadow-2xl shadow-black/80 space-y-4 hover:border-emerald-500/40 transition-all">
              <div>
                <h4 className="text-[17px] font-bold text-white tracking-tight">Get in Touch</h4>
                <p className="mt-1 text-xs text-[#9CA3AF] leading-relaxed">
                  Have a project in mind? Let's build it together.
                </p>
              </div>

              {/* Contact Item 1: Email */}
              <a
                href="mailto:info@regalops.com"
                className="group flex items-start gap-3 transition-colors"
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 group-hover:bg-emerald-500 group-hover:text-white transition-all shadow-xs">
                  <Mail className="h-4 w-4" />
                </div>
                <div className="min-w-0">
                  <span className="block text-xs font-semibold text-white group-hover:text-emerald-400 transition-colors truncate">
                    info@regalops.com
                  </span>
                  <span className="block text-[10px] text-neutral-400">
                    Response SLA &lt; 24 business hours
                  </span>
                </div>
              </a>

              {/* Contact Item 2: Phone */}
              <a
                href="tel:+914012345678"
                className="group flex items-center gap-3 transition-colors"
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 group-hover:bg-emerald-500 group-hover:text-white transition-all shadow-xs">
                  <Phone className="h-4 w-4" />
                </div>
                <span className="text-xs font-semibold text-white group-hover:text-emerald-400 transition-colors">
                  +91 40 1234 5678
                </span>
              </a>

              {/* Contact Item 3: Address */}
              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 shadow-xs mt-0.5">
                  <MapPin className="h-4 w-4" />
                </div>
                <div>
                  <span className="block text-xs font-semibold text-white">
                    Hyderabad, India
                  </span>
                  <span className="block text-[10px] text-neutral-400">
                    Serving Clients Across 14+ Countries
                  </span>
                </div>
              </div>

              {/* Action Button: Contact Us */}
              <div className="pt-2">
                <Link
                  to="/contact"
                  className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 py-2.5 px-4 text-xs font-bold text-white shadow-lg shadow-emerald-950/50 transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  Contact Us
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </div>

        </div>

        {/* ================================================================== */}
        {/* 3. BOTTOM BAR: Copyright, Legal, Social Icons, Scroll to Top       */}
        {/* ================================================================== */}
        <div className="mt-6 pt-4 border-t border-white/[0.08] flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Copyright */}
          <div className="text-xs text-neutral-400">
            &copy; {new Date().getFullYear()} Regal OPs. All rights reserved.
          </div>

          {/* Legal Links */}
          <div className="flex items-center gap-3 text-xs text-neutral-400">
            <Link to="/about" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <span className="text-neutral-600">|</span>
            <Link to="/about" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
            <span className="text-neutral-600">|</span>
            <Link to="/about" className="hover:text-white transition-colors">
              Sitemap
            </Link>
          </div>

          {/* Original Social Links & Floating Scroll-to-Top Button */}
          <div className="flex items-center gap-3">
            <FooterSocialIcons />

            {/* Scroll to Top Circular Button */}
            <button
              type="button"
              onClick={scrollToTop}
              aria-label="Scroll to top"
              title="Scroll to top"
              className="ml-1 flex h-8 w-8 sm:h-8.5 sm:w-8.5 items-center justify-center rounded-full bg-emerald-600 hover:bg-emerald-500 text-white transition-all shadow-md shadow-emerald-950/40 cursor-pointer hover:scale-110 active:scale-95"
            >
              <ArrowUp className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default SiteFooter;
