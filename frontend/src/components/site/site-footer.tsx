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
  Linkedin,
  Instagram,
  Youtube,
  Facebook,
} from "lucide-react";

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

      {/* Graceful flowing golden-green wave mesh curves running across mid-lower background */}
      <div className="absolute inset-x-0 bottom-40 h-72 pointer-events-none select-none opacity-30 overflow-hidden">
        <svg
          viewBox="0 0 1600 350"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full preserve-3d"
        >
          <defs>
            <linearGradient id="goldRibbon1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#d4af37" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#10b981" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#d4af37" stopOpacity="0.1" />
            </linearGradient>
            <linearGradient id="goldRibbon2" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.7" />
              <stop offset="70%" stopColor="#059669" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#d4af37" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path
            d="M-50,220 C250,140 450,280 800,210 C1150,140 1350,240 1650,190"
            stroke="url(#goldRibbon1)"
            strokeWidth="1.8"
          />
          <path
            d="M-50,240 C280,160 480,300 830,225 C1180,150 1380,260 1650,205"
            stroke="url(#goldRibbon1)"
            strokeWidth="1.2"
            opacity="0.7"
          />
          <path
            d="M-50,260 C310,180 510,310 860,240 C1210,165 1410,275 1650,220"
            stroke="url(#goldRibbon2)"
            strokeWidth="1"
            opacity="0.5"
          />
          <path
            d="M-50,200 C220,120 420,260 770,195 C1120,125 1320,225 1650,175"
            stroke="url(#goldRibbon2)"
            strokeWidth="0.8"
            opacity="0.4"
          />
        </svg>
      </div>

      {/* ==================================================================== */}
      {/* 2. MAIN FOOTER CONTENT WRAPPER                                       */}
      {/* ==================================================================== */}
      <div className="relative mx-auto max-w-[1480px] px-5 sm:px-8 lg:px-12 pt-14 pb-8">
        {/* Top Main Section: Brand + Links Columns + Get in Touch Card */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-8 xl:gap-10 items-start">
          
          {/* ---------------------------------------------------------------- */}
          {/* COLUMN 1: Brand Identity, Mission, & Stat Metrics (lg:col-span-4)*/}
          {/* ---------------------------------------------------------------- */}
          <div className="lg:col-span-4 space-y-6">
            {/* Geometric Golden Logo */}
            <Link to="/" className="inline-flex items-center gap-3.5 group">
              <div className="relative flex h-14 w-14 shrink-0 items-center justify-center">
                {/* SVG Geometric layered triangle icon matching brand emblem */}
                <svg
                  viewBox="0 0 64 64"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-full w-full drop-shadow-[0_2px_8px_rgba(217,168,62,0.35)]"
                >
                  <polygon
                    points="32,6 58,54 6,54"
                    stroke="#D4AF37"
                    strokeWidth="3.2"
                    strokeLinejoin="round"
                  />
                  <polygon
                    points="32,16 50,50 14,50"
                    stroke="#D4AF37"
                    strokeWidth="2.2"
                    strokeLinejoin="round"
                    strokeOpacity="0.85"
                  />
                  <polygon
                    points="32,26 42,46 22,46"
                    stroke="#D4AF37"
                    strokeWidth="1.8"
                    strokeLinejoin="round"
                    strokeOpacity="0.7"
                  />
                  {/* Subtle inner horizontal lines */}
                  <line x1="22" y1="36" x2="42" y2="36" stroke="#D4AF37" strokeWidth="1.2" strokeOpacity="0.5" />
                  <line x1="17" y1="44" x2="47" y2="44" stroke="#D4AF37" strokeWidth="1.2" strokeOpacity="0.5" />
                </svg>
              </div>
              <div>
                <span className="font-display text-2xl font-black tracking-tight text-white block group-hover:text-amber-300 transition-colors">
                  Regal OPs
                </span>
                <span className="text-[10px] font-bold tracking-[0.22em] text-[#D4AF37] block uppercase mt-0.5">
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
          {/* COLUMN 2: Company Links (lg:col-span-1.5)                        */}
          {/* ---------------------------------------------------------------- */}
          <div className="lg:col-span-1 xl:col-span-1 space-y-4">
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
          {/* COLUMN 4: Technologies Links (lg:col-span-2)                      */}
          {/* ---------------------------------------------------------------- */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-[15px] font-bold tracking-tight text-white">Technologies</h4>
            <ul className="space-y-2 text-[12.5px]">
              {[
                "Agile and DevOps",
                "Big Data",
                "Cloud Computing",
                "Analytics",
                "Cyber Security & Risk",
                "IoT",
                "Enterprise Mobility",
                "Digital Process Automation",
                "Blockchain",
                "Open Source Development & Migration",
                "Service Experience Transformation",
                "Mainframe Modernisation",
                "E- Commerce",
              ].map((name) => (
                <li key={name}>
                  <Link
                    to="/technologies"
                    className="text-[#9CA3AF] hover:text-white transition-colors duration-150 block py-0.5 leading-tight"
                  >
                    {name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ---------------------------------------------------------------- */}
          {/* COLUMN 5: Careers Links (lg:col-span-1)                          */}
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
          {/* COLUMN 6: "Get in Touch" Floating Glass Card (lg:col-span-2)     */}
          {/* ---------------------------------------------------------------- */}
          <div className="lg:col-span-2 xl:col-span-2">
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
        <div className="mt-12 pt-6 border-t border-white/[0.08] flex flex-col md:flex-row items-center justify-between gap-5">
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

          {/* Social Links & Floating Scroll-to-Top Button */}
          <div className="flex items-center gap-2.5">
            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/company/regalops/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-neutral-400 hover:border-emerald-500 hover:text-white hover:bg-emerald-500/10 transition-all"
            >
              <Linkedin className="h-3.5 w-3.5" />
            </a>

            {/* X (Twitter) */}
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X"
              className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-neutral-400 hover:border-emerald-500 hover:text-white hover:bg-emerald-500/10 transition-all font-bold text-xs"
            >
              &#120143;
            </a>

            {/* Facebook */}
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-neutral-400 hover:border-emerald-500 hover:text-white hover:bg-emerald-500/10 transition-all"
            >
              <Facebook className="h-3.5 w-3.5" />
            </a>

            {/* YouTube */}
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-neutral-400 hover:border-emerald-500 hover:text-white hover:bg-emerald-500/10 transition-all"
            >
              <Youtube className="h-3.5 w-3.5" />
            </a>

            {/* Instagram */}
            <a
              href="https://www.instagram.com/regal_ops/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-neutral-400 hover:border-emerald-500 hover:text-white hover:bg-emerald-500/10 transition-all"
            >
              <Instagram className="h-3.5 w-3.5" />
            </a>

            {/* Scroll to Top Circular Button */}
            <button
              type="button"
              onClick={scrollToTop}
              aria-label="Scroll to top"
              className="ml-2 flex h-8 w-8 items-center justify-center rounded-full bg-emerald-600 hover:bg-emerald-500 text-white transition-all shadow-md shadow-emerald-950/40 cursor-pointer hover:scale-110 active:scale-95"
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
