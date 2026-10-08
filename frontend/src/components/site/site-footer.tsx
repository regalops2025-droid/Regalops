import { Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Linkedin, Instagram, Mail, MapPin, ChevronsUp } from "lucide-react";

export function SiteFooter() {
  return (
    <div className="relative w-full bg-white">
      {/* ==================================================================== */}
      {/* 1. FLOWING ORGANIC DOUBLE-WAVE SVG TRANSITION                       */}
      {/* ==================================================================== */}
      <div className="relative w-full overflow-hidden leading-none select-none pointer-events-none -mb-[1px]">
        <svg
          id="footer-wave"
          className="w-full h-auto block min-h-[60px] md:min-h-[95px] lg:min-h-[120px]"
          viewBox="0 0 2560 301"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Subtle light neutral accent wave layers */}
          <path
            fill="#efefef"
            d="M313.1,43.4C191.3,26.6,86.1,29.8,0,41.5v79.9A2356,2356,0,0,1,313.1,43.4Z"
            transform="translate(0 -12.4)"
          />
          <path
            fill="#e6e6e6"
            d="M2465.6,146.1C2232.9,68.6,1936.7,9.6,1688,75.4c-66.4,17.6-140.9,37.1-223.2,54.1,73,14,156.3,26.6,259.2,35.9C2040.3,194.2,2275.7,186.2,2465.6,146.1Z"
            transform="translate(0 -12.4)"
          />
          {/* Main solid charcoal/black wave filling the lower base */}
          <path
            fill="#191919"
            d="M2560,179.8V313.4H0v-192a2356,2356,0,0,1,313.1-78c103.4-18.2,219.1-31,339.9-31,421.8,0,551.2,67.3,811.8,117.1,73,14,156.3,26.6,259.2,35.9,316.3,28.8,551.8,20.8,741.6-19.3C2498.4,157.1,2530,168.4,2560,179.8Z"
            transform="translate(0 -12.4)"
          />
          <path
            fill="#191919"
            d="M2560,179.8V122.6c-30.2,8.8-61.6,16.6-94.4,23.5C2498.4,157.1,2530,168.4,2560,179.8Z"
            transform="translate(0 -12.4)"
          />
        </svg>
      </div>

      {/* ==================================================================== */}
      {/* 2. MAIN FOOTER BODY (4 COLUMNS + OFFICES + COPYRIGHT)                */}
      {/* ==================================================================== */}
      <footer className="bg-[#191919] text-[#e5e7eb] font-sans">
        <div className="mx-auto max-w-7xl px-4 pt-4 pb-12 sm:px-6 lg:px-8">
          {/* Top 4 Columns Matching Reference */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {/* Column 1: Company */}
            <div>
              <h3 className="text-white text-[18px] font-bold tracking-tight">Company</h3>
              <div className="w-8 h-[2.5px] bg-[#0091d5] rounded-full mt-2.5 mb-6" />
              <ul className="space-y-3">
                <li>
                  <Link
                    to="/about"
                    className="text-[13.5px] text-[#9ca3af] hover:text-white transition-all duration-200 block py-0.5 leading-relaxed hover:translate-x-0.5"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    to="/about"
                    hash="values"
                    className="text-[13.5px] text-[#9ca3af] hover:text-white transition-all duration-200 block py-0.5 leading-relaxed hover:translate-x-0.5"
                  >
                    Core Values
                  </Link>
                </li>
                <li>
                  <Link
                    to="/about"
                    hash="benefits"
                    className="text-[13.5px] text-[#9ca3af] hover:text-white transition-all duration-200 block py-0.5 leading-relaxed hover:translate-x-0.5"
                  >
                    Key Benefits
                  </Link>
                </li>
                <li>
                  <Link
                    to="/clients"
                    className="text-[13.5px] text-[#9ca3af] hover:text-white transition-all duration-200 block py-0.5 leading-relaxed hover:translate-x-0.5"
                  >
                    Our Clients
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 2: Solutions */}
            <div>
              <h3 className="text-white text-[18px] font-bold tracking-tight">Solutions</h3>
              <div className="w-8 h-[2.5px] bg-[#0091d5] rounded-full mt-2.5 mb-6" />
              <ul className="space-y-3">
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
                      className="text-[13.5px] text-[#9ca3af] hover:text-white transition-all duration-200 block py-0.5 leading-relaxed hover:translate-x-0.5"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Technologies */}
            <div>
              <h3 className="text-white text-[18px] font-bold tracking-tight">Technologies</h3>
              <div className="w-8 h-[2.5px] bg-[#0091d5] rounded-full mt-2.5 mb-6" />
              <ul className="space-y-3">
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
                ].map((item) => (
                  <li key={item.label}>
                    <Link
                      to={item.to}
                      className="text-[13.5px] text-[#9ca3af] hover:text-white transition-all duration-200 block py-0.5 leading-relaxed hover:translate-x-0.5"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 4: Careers & Inquiries */}
            <div>
              <h3 className="text-white text-[18px] font-bold tracking-tight">Careers</h3>
              <div className="w-8 h-[2.5px] bg-[#0091d5] rounded-full mt-2.5 mb-6" />
              <ul className="space-y-3">
                {[
                  { label: "Why Join Regal OPs", to: "/career" },
                  { label: "Jobs", to: "/career" },
                  { label: "Current Openings", to: "/career" },
                ].map((item) => (
                  <li key={item.label}>
                    <Link
                      to={item.to}
                      className="text-[13.5px] text-[#9ca3af] hover:text-white transition-all duration-200 block py-0.5 leading-relaxed hover:translate-x-0.5"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>

              <div className="mt-8 pt-6 border-t border-white/10">
                <span className="text-xs uppercase tracking-wider font-bold text-neutral-300 block mb-2">
                  Direct Inquiries
                </span>
                <a
                  href="mailto:Info@regalops.com"
                  className="flex items-center gap-2 text-[13px] text-[#9ca3af] hover:text-[#0091d5] transition-colors"
                >
                  <Mail className="h-4 w-4 text-[#0091d5]" />
                  <span>Info@regalops.com</span>
                </a>
              </div>
            </div>
          </div>

          {/* Corporate Offices Bar */}
          <div className="mt-14 pt-8 border-t border-white/10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/5 border border-white/10 text-[#0091d5]">
                  <MapPin className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-white">USA Office</h4>
                  <p className="mt-1 text-xs text-neutral-400 leading-relaxed">
                    8 Chill Sean Street, Dunwoody, Atlanta, Georgia, USA
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/5 border border-white/10 text-[#0091d5]">
                  <MapPin className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-white">Hyderabad Office</h4>
                  <p className="mt-1 text-xs text-neutral-400 leading-relaxed">
                    Floor 1, MB3 Block, Raheja Mindspace, Hyderabad, Telangana
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/5 border border-white/10 text-[#0091d5]">
                  <MapPin className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-white">Warangal Office</h4>
                  <p className="mt-1 text-xs text-neutral-400 leading-relaxed">
                    H.No: 12-13, 1st Floor, Warangal, Telangana, 506002
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Bottom Bar (Copyright & Socials) */}
          <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-neutral-400">
              © Copyright Regal OPs {new Date().getFullYear()}. All rights reserved.
            </p>
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

      {/* Floating Scroll to Top Button */}
      <ScrollToTopButton />
    </div>
  );
}

function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 250) {
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
      aria-label="Back to top"
      className={`fixed bottom-6 right-6 z-50 flex h-11 w-11 items-center justify-center rounded-full bg-[#262626]/90 text-neutral-300 shadow-2xl backdrop-blur-md transition-all duration-300 hover:bg-[#0091d5] hover:text-white hover:scale-110 active:scale-95 border border-white/10 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 pointer-events-none translate-y-4"
      }`}
    >
      <ChevronsUp className="h-5 w-5" />
    </button>
  );
}
