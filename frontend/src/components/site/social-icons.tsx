import React from "react";
import { Phone } from "lucide-react";

// ============================================================================
// 1. Official High-Fidelity Vector Social Media Icons (Pixel-Perfect)
// ============================================================================

export function LinkedInIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

export function XIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

export function FacebookIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

export function YouTubeIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

export function InstagramIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" strokeWidth="2.5" />
    </svg>
  );
}

export function WhatsAppIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2zm5.79 14.07c-.24.67-1.39 1.29-1.91 1.33-.51.04-1.12.06-3.62-.97-2.93-1.22-4.83-4.22-4.98-4.42-.14-.2-1.19-1.58-1.19-3.02 0-1.43.75-2.14 1.02-2.43.27-.29.6-.36.8-.36.2 0 .4 0 .58.01.19.01.44-.07.69.52.25.6.86 2.09.93 2.24.08.15.13.33.03.53-.1.2-.15.33-.3.51-.15.17-.32.39-.46.52-.15.15-.31.31-.13.62.18.31.8 1.32 1.72 2.14 1.18 1.05 2.17 1.38 2.48 1.53.31.15.49.13.67-.08.18-.2.77-.9 1-.1.2-.23.4-.19.67-.09.27.1 1.72.81 2.02.96.3.15.5.22.57.35.07.13.07.76-.17 1.43z" />
    </svg>
  );
}

// ============================================================================
// 2. Original Social Platforms Configuration with Official Brand Identity
// ============================================================================

export interface SocialLinkItem {
  id: string;
  name: string;
  url: string;
  bgColor: string;
  hoverBg: string;
  textColor: string;
  glowColor: string;
  icon: (props: { className?: string }) => JSX.Element;
}

export const OFFICIAL_SOCIAL_LINKS: SocialLinkItem[] = [
  {
    id: "linkedin",
    name: "LinkedIn",
    url: "https://www.linkedin.com/company/regalops/",
    bgColor: "bg-[#0A66C2]",
    hoverBg: "hover:bg-[#004182]",
    textColor: "text-white",
    glowColor: "hover:shadow-[0_0_16px_rgba(10,102,194,0.6)]",
    icon: LinkedInIcon,
  },
  {
    id: "whatsapp",
    name: "WhatsApp",
    url: "https://wa.me/914400000000?text=Hi%20Regal%20OPs,%20I%20would%20like%20to%20discuss%20our%20enterprise%20platform%20needs.",
    bgColor: "bg-[#25D366]",
    hoverBg: "hover:bg-[#1ebe5b]",
    textColor: "text-white",
    glowColor: "hover:shadow-[0_0_16px_rgba(37,211,102,0.6)]",
    icon: WhatsAppIcon,
  },
  {
    id: "instagram",
    name: "Instagram",
    url: "https://www.instagram.com/regal_ops/",
    bgColor: "bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888]",
    hoverBg: "hover:brightness-110",
    textColor: "text-white",
    glowColor: "hover:shadow-[0_0_16px_rgba(220,39,67,0.6)]",
    icon: InstagramIcon,
  },
  {
    id: "facebook",
    name: "Facebook",
    url: "https://facebook.com",
    bgColor: "bg-[#1877F2]",
    hoverBg: "hover:bg-[#0c63d4]",
    textColor: "text-white",
    glowColor: "hover:shadow-[0_0_16px_rgba(24,119,242,0.6)]",
    icon: FacebookIcon,
  },
  {
    id: "x",
    name: "X (Twitter)",
    url: "https://twitter.com",
    bgColor: "bg-[#000000] border border-white/20",
    hoverBg: "hover:bg-neutral-800",
    textColor: "text-white",
    glowColor: "hover:shadow-[0_0_16px_rgba(255,255,255,0.3)]",
    icon: XIcon,
  },
  {
    id: "youtube",
    name: "YouTube",
    url: "https://youtube.com",
    bgColor: "bg-[#FF0000]",
    hoverBg: "hover:bg-[#cc0000]",
    textColor: "text-white",
    glowColor: "hover:shadow-[0_0_16px_rgba(255,0,0,0.6)]",
    icon: YouTubeIcon,
  },
];

// ============================================================================
// 3. Footer Original Social Media Bar
// ============================================================================

export function FooterSocialIcons() {
  return (
    <div className="flex items-center gap-2 sm:gap-2.5 flex-wrap">
      {OFFICIAL_SOCIAL_LINKS.map((item) => {
        const Icon = item.icon;
        return (
          <a
            key={item.id}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={item.name}
            title={item.name}
            className={`group relative flex h-8 w-8 sm:h-8.5 sm:w-8.5 items-center justify-center rounded-full ${item.bgColor} ${item.hoverBg} ${item.textColor} shadow-md transition-all duration-300 hover:scale-115 active:scale-95 ${item.glowColor}`}
          >
            <Icon className="h-4 w-4" />
          </a>
        );
      })}
    </div>
  );
}

// ============================================================================
// 4. Sticky Social Sidebar (Floating on Left Screen Edge)
// ============================================================================

export function StickySocialBar() {
  return (
    <aside
      aria-label="Social links quick bar"
      className="fixed left-2 sm:left-3 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col gap-2 p-1.5 rounded-2xl bg-neutral-950/80 backdrop-blur-md border border-white/10 shadow-2xl shadow-black/80"
    >
      {OFFICIAL_SOCIAL_LINKS.map((item) => {
        const Icon = item.icon;
        return (
          <a
            key={item.id}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={item.name}
            className={`group relative flex h-9 w-9 items-center justify-center rounded-xl ${item.bgColor} ${item.hoverBg} ${item.textColor} shadow-md transition-all duration-300 hover:scale-115 active:scale-95 ${item.glowColor}`}
          >
            <Icon className="h-4.5 w-4.5" />

            {/* Slide-out tooltip label */}
            <span className="pointer-events-none absolute left-full ml-3 scale-0 rounded-lg bg-neutral-900/95 px-2.5 py-1 text-xs font-semibold text-white shadow-xl border border-white/10 backdrop-blur-md transition-all duration-200 group-hover:scale-100 whitespace-nowrap z-50">
              {item.name}
            </span>
          </a>
        );
      })}
    </aside>
  );
}

// ============================================================================
// 5. Sticky Bottom-Right Quick Contact Actions (WhatsApp & Phone)
// ============================================================================

export function StickyBottomActions() {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Call Button */}
      <a
        href="tel:+914012345678"
        className="group relative flex h-13 w-13 items-center justify-center rounded-full bg-[#0284c7] text-white shadow-xl shadow-sky-900/40 transition-all duration-300 hover:scale-110 hover:bg-[#0369a1] active:scale-95"
        title="Call Regal OPs (+91 40 1234 5678)"
        aria-label="Call Regal OPs"
      >
        {/* Subtle breathing ripple */}
        <span className="absolute -inset-1 rounded-full bg-sky-500/30 animate-pulse pointer-events-none" />
        <Phone className="h-5 w-5 relative z-10" />
        <span className="pointer-events-none absolute right-15 scale-0 rounded-lg bg-neutral-900/95 px-3 py-1.5 text-xs font-semibold text-white shadow-xl border border-white/10 backdrop-blur-md transition-all duration-200 group-hover:scale-100 whitespace-nowrap">
          Call: +91 40 1234 5678
        </span>
      </a>

      {/* WhatsApp Button */}
      <a
        href="https://wa.me/914400000000?text=Hi%20Regal%20OPs,%20I%20would%20like%20to%20discuss%20our%20enterprise%20platform%20needs."
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex h-13 w-13 items-center justify-center rounded-full bg-[#25D366] text-white shadow-xl shadow-green-900/40 transition-all duration-300 hover:scale-110 hover:bg-[#1ebe5b] active:scale-95"
        title="Chat on WhatsApp"
        aria-label="Chat on WhatsApp"
      >
        {/* Live status pulsating ping indicator */}
        <span className="absolute -inset-1 rounded-full bg-emerald-500/40 animate-ping opacity-60 pointer-events-none" />
        <WhatsAppIcon className="h-6 w-6 relative z-10" />
        <span className="pointer-events-none absolute right-15 scale-0 rounded-lg bg-neutral-900/95 px-3 py-1.5 text-xs font-semibold text-white shadow-xl border border-white/10 backdrop-blur-md transition-all duration-200 group-hover:scale-100 whitespace-nowrap">
          Chat on WhatsApp
        </span>
      </a>
    </div>
  );
}
