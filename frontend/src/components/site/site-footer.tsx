import { Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import {
  Linkedin,
  Instagram,
  Mail,
  MapPin,
  ChevronsUp,
  Phone,
  ShieldCheck,
  Globe,
  Building,
  ArrowUpRight,
} from "lucide-react";

export function SiteFooter() {
  return (
    <div className="relative w-full bg-white">
      {/* ==================================================================== */}
      {/* 1. FLOWING ORGANIC WAVE SVG TRANSITION (Vuesol Exact Reference)       */}
      {/* ==================================================================== */}
      <div className="relative w-full overflow-hidden leading-none select-none pointer-events-none -mb-[1px] bg-white">
        <svg
          id="footer-wave"
          className="w-full h-auto block min-h-[70px] sm:min-h-[105px] lg:min-h-[140px]"
          viewBox="0 0 2560 301"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Main solid midnight black wave */}
          <path
            fill="#111215"
            d="M2560,179.8V313.4H0v-192a2356,2356,0,0,1,313.1-78c103.4-18.2,219.1-31,339.9-31,421.8,0,551.2,67.3,811.8,117.1,73,14,156.3,26.6,259.2,35.9,316.3,28.8,551.8,20.8,741.6-19.3C2498.4,157.1,2530,168.4,2560,179.8Z"
            transform="translate(0 -12.4)"
          />
          <path
            fill="#111215"
            d="M2560,179.8V122.6c-30.2,8.8-61.6,16.6-94.4,23.5C2498.4,157.1,2530,168.4,2560,179.8Z"
            transform="translate(0 -12.4)"
          />
          {/* Subtle light accent wave on the left crest */}
          <path
            fill="#efefef"
            opacity="0.4"
            d="M313.1,43.4C191.3,26.6,86.1,29.8,0,41.5v79.9A2356,2356,0,0,1,313.1,43.4Z"
            transform="translate(0 -12.4)"
          />
          {/* Soft white/light-grey layered wave crest on the right shoulder */}
          <path
            fill="#e6e8eb"
            d="M2465.6,146.1C2232.9,68.6,1936.7,9.6,1688,75.4c-66.4,17.6-140.9,37.1-223.2,54.1,73,14,156.3,26.6,259.2,35.9C2040.3,194.2,2275.7,186.2,2465.6,146.1Z"
            transform="translate(0 -12.4)"
          />
        </svg>
      </div>

      {/* ==================================================================== */}
      {/* 2. MAIN FOOTER BODY (Ultra-Premium Midnight Theme)                   */}
      {/* ==================================================================== */}
      <footer className="relative bg-[#111215] text-[#e5e7eb] font-sans overflow-hidden">
        {/* Subtle atmospheric ambient glow */}
        <div className="pointer-events-none absolute top-0 right-1/4 w-[500px] h-[500px] bg-sky-500/[0.03] rounded-full blur-[140px]" />
        <div className="pointer-events-none absolute bottom-12 left-10 w-[450px] h-[450px] bg-[#0091d5]/[0.02] rounded-full blur-[120px]" />

        <div className="relative mx-auto max-w-7xl px-4 pt-6 pb-14 sm:px-6 lg:px-8">
          {/* Top 4-Column Navigation Layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10">
            {/* Column 1: Company (lg:col-span-2) */}
            <div className="lg:col-span-2">
              <h3 className="text-white text-[18px] font-bold tracking-tight">Company</h3>
              <div className="w-8 h-[2.5px] bg-[#0091d5] rounded-full mt-2.5 mb-5 shadow-[0_0_8px_rgba(0,145,213,0.5)]" />
              <ul className="space-y-2.5">
                {[
                  { label: "About", to: "/about" },
                  { label: "Core Values", to: "/about", hash: "values" },
                  { label: "Key Benefits", to: "/about", hash: "benefits" },
                  { label: "Our Clients", to: "/clients" },
                ].map((item) => (
                  <li key={item.label}>
                    <Link
                      to={item.to}
                      hash={item.hash}
                      className="group flex items-center text-[13.5px] text-[#9ca3af] hover:text-white transition-all duration-200 py-0.5 leading-snug"
                    >
                      <span className="w-0 opacity-0 group-hover:w-2 group-hover:opacity-100 group-hover:mr-1.5 transition-all duration-200 text-[#0091d5] font-bold">
                        ›
                      </span>
                      <span className="group-hover:translate-x-0.5 transition-transform duration-200">
                        {item.label}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 2: Solutions (lg:col-span-4) */}
            <div className="lg:col-span-4">
              <h3 className="text-white text-[18px] font-bold tracking-tight">Solutions</h3>
              <div className="w-8 h-[2.5px] bg-[#0091d5] rounded-full mt-2.5 mb-5 shadow-[0_0_8px_rgba(0,145,213,0.5)]" />
              <ul className="space-y-2.5">
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
                      className="group flex items-center text-[13.5px] text-[#9ca3af] hover:text-white transition-all duration-200 py-0.5 leading-snug"
                    >
                      <span className="w-0 opacity-0 group-hover:w-2 group-hover:opacity-100 group-hover:mr-1.5 transition-all duration-200 text-[#0091d5] font-bold">
                        ›
                      </span>
                      <span className="group-hover:translate-x-0.5 transition-transform duration-200">
                        {item.label}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Technologies (lg:col-span-4) */}
            <div className="lg:col-span-4">
              <h3 className="text-white text-[18px] font-bold tracking-tight">Technologies</h3>
              <div className="w-8 h-[2.5px] bg-[#0091d5] rounded-full mt-2.5 mb-5 shadow-[0_0_8px_rgba(0,145,213,0.5)]" />
              <ul className="space-y-2.5">
                {[
                  { label: "Agile and DevOps", to: "/technologies" },
                  { label: "Big Data", to: "/technologies" },
                  { label: "Cloud Computing", to: "/technologies" },
                  { label: "Analytics", to: "/technologies" },
                  { label: "Cyber Security & Risk", to: "/technologies" },
                  { label: "IoT", to: "/technologies" },
                  { label: "Enterprise Mobility", to: "/technologies" },
                  { label: "Digital Process Automation", to: "/technologies" },
                  { label: "Blockchain", to: "/technologies" },
                  { label: "Open Source Development & Migration", to: "/technologies" },
                  { label: "Service Experience Transformation", to: "/technologies" },
                  { label: "Mainframe Modernisation", to: "/technologies" },
                  { label: "E- Commerce", to: "/technologies" },
                ].map((item) => (
                  <li key={item.label}>
                    <Link
                      to={item.to}
                      className="group flex items-center text-[13.5px] text-[#9ca3af] hover:text-white transition-all duration-200 py-0.5 leading-snug"
                    >
                      <span className="w-0 opacity-0 group-hover:w-2 group-hover:opacity-100 group-hover:mr-1.5 transition-all duration-200 text-[#0091d5] font-bold">
                        ›
                      </span>
                      <span className="group-hover:translate-x-0.5 transition-transform duration-200">
                        {item.label}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 4: Careers & Direct Connect (lg:col-span-2) */}
            <div className="lg:col-span-2">
              <h3 className="text-white text-[18px] font-bold tracking-tight">Careers</h3>
              <div className="w-8 h-[2.5px] bg-[#0091d5] rounded-full mt-2.5 mb-5 shadow-[0_0_8px_rgba(0,145,213,0.5)]" />
              <ul className="space-y-2.5">
                {[
                  { label: "Why Join Regal OPs", to: "/career" },
                  { label: "Jobs", to: "/career" },
                  { label: "Current Openings", to: "/career" },
                ].map((item) => (
                  <li key={item.label}>
                    <Link
                      to={item.to}
                      className="group flex items-center text-[13.5px] text-[#9ca3af] hover:text-white transition-all duration-200 py-0.5 leading-snug"
                    >
                      <span className="w-0 opacity-0 group-hover:w-2 group-hover:opacity-100 group-hover:mr-1.5 transition-all duration-200 text-[#0091d5] font-bold">
                        ›
                      </span>
                      <span className="group-hover:translate-x-0.5 transition-transform duration-200">
                        {item.label}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>

              {/* Direct Inquiries Card */}
              <div className="mt-8 rounded-xl border border-white/10 bg-white/[0.03] p-4 backdrop-blur-xs">
                <span className="text-[11px] uppercase tracking-wider font-bold text-neutral-400 block mb-2">
                  Direct Inquiries
                </span>
                <a
                  href="mailto:Info@regalops.com"
                  className="flex items-center gap-2 text-[13px] text-white hover:text-[#0091d5] transition-colors font-medium"
                >
                  <Mail className="h-4 w-4 text-[#0091d5] shrink-0" />
                  <span className="truncate">Info@regalops.com</span>
                </a>
                <div className="mt-2 text-[11px] text-neutral-400">
                  Response SLA: &lt; 24 business hours
                </div>
              </div>
            </div>
          </div>

          {/* ================================================================ */}
          {/* 3. CORPORATE OFFICES BAR (Executive Enterprise Presence)          */}
          {/* ================================================================ */}
          <div className="mt-14 pt-8 border-t border-white/10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-4.5 hover:border-[#0091d5]/40 hover:bg-white/[0.04] transition-all">
                <div className="flex items-start gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-sky-500/10 border border-sky-500/20 text-[#0091d5]">
                    <MapPin className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-white flex items-center gap-1.5">
                      USA Office
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    </h4>
                    <p className="mt-1.5 text-xs text-neutral-400 leading-relaxed">
                      8 Chill Sean Street, Dunwoody, Atlanta, Georgia, USA
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-4.5 hover:border-[#0091d5]/40 hover:bg-white/[0.04] transition-all">
                <div className="flex items-start gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-sky-500/10 border border-sky-500/20 text-[#0091d5]">
                    <MapPin className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-white flex items-center gap-1.5">
                      Hyderabad Office
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    </h4>
                    <p className="mt-1.5 text-xs text-neutral-400 leading-relaxed">
                      Floor 1, MB3 Block, Raheja Mindspace, Hyderabad, Telangana
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-4.5 hover:border-[#0091d5]/40 hover:bg-white/[0.04] transition-all">
                <div className="flex items-start gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-sky-500/10 border border-sky-500/20 text-[#0091d5]">
                    <MapPin className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-white flex items-center gap-1.5">
                      Warangal Office
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    </h4>
                    <p className="mt-1.5 text-xs text-neutral-400 leading-relaxed">
                      H.No: 12-13, 1st Floor, Warangal, Telangana, 506002
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ================================================================ */}
          {/* 4. FOOTER BOTTOM (Copyright, Compliance & Socials)               */}
          {/* ================================================================ */}
          <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 text-xs text-neutral-400">
              <p>
                &copy; Copyright Regal OPs {new Date().getFullYear()}. All rights reserved.
              </p>
              <div className="flex items-center gap-4 text-neutral-500 text-[11.5px]">
                <Link to="/about" className="hover:text-neutral-300 transition-colors">
                  Privacy Policy
                </Link>
                <span>&bull;</span>
                <Link to="/about" className="hover:text-neutral-300 transition-colors">
                  Terms of Service
                </Link>
                <span>&bull;</span>
                <span className="text-emerald-500 font-medium flex items-center gap-1">
                  <ShieldCheck className="h-3.5 w-3.5" /> ISO 27001 Certified Practices
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <a
                href="https://www.linkedin.com/company/regalops/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn profile"
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/5 border border-white/10 text-neutral-400 hover:border-[#0091d5] hover:text-[#0091d5] hover:bg-white/10 transition-all duration-200"
              >
                <Linkedin className="h-4 w-4" />
              </a>
              <a
                href="https://www.instagram.com/regal_ops/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram profile"
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/5 border border-white/10 text-neutral-400 hover:border-[#0091d5] hover:text-[#0091d5] hover:bg-white/10 transition-all duration-200"
              >
                <Instagram className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating Scroll to Top Button (matching Vuesol bottom-right floating pill) */}
      <ScrollToTopButton />
    </div>
  );
}

function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 280) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Scroll to top"
      title="Scroll to top"
      className={`fixed bottom-36 right-6 z-40 flex h-11 w-11 items-center justify-center rounded-full bg-[#1e2026]/90 text-neutral-300 shadow-2xl backdrop-blur-md transition-all duration-300 hover:bg-[#0091d5] hover:text-white hover:scale-110 active:scale-95 border border-white/15 cursor-pointer ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 pointer-events-none translate-y-4"
      }`}
    >
      <ChevronsUp className="h-5 w-5" />
    </button>
  );
}

export default SiteFooter;
