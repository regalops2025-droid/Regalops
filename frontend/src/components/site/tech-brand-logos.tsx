import React from "react";

// ============================================================================
// Official High-Fidelity Vector Tech Brand Logos
// Designed for Enterprise Presentation in Regal OPs Stack
// ============================================================================

export function ReactLogo({ className = "h-7 w-7" }: { className?: string }) {
  return (
    <svg viewBox="-11.5 -10.23174 23 20.46348" className={className} fill="none">
      <circle cx="0" cy="0" r="2.05" fill="#61DAFB" />
      <g stroke="#61DAFB" strokeWidth="1" fill="none">
        <ellipse rx="11" ry="4.2" />
        <ellipse rx="11" ry="4.2" transform="rotate(60)" />
        <ellipse rx="11" ry="4.2" transform="rotate(120)" />
      </g>
    </svg>
  );
}

export function NextjsLogo({ className = "h-7 w-7" }: { className?: string }) {
  return (
    <svg viewBox="0 0 180 180" className={className} fill="none">
      <mask height="180" id="nextMask" maskUnits="userSpaceOnUse" width="180" x="0" y="0">
        <circle cx="90" cy="90" fill="#000000" r="90" />
      </mask>
      <g mask="url(#nextMask)">
        <circle cx="90" cy="90" fill="#090A0F" r="90" stroke="#333333" strokeWidth="3" />
        <path
          d="M149.508 157.438L69.1478 54H54V125.97H66.1136V69.3836L139.999 164.845C143.333 162.614 146.509 160.137 149.508 157.438Z"
          fill="url(#nextPaint0)"
        />
        <rect fill="url(#nextPaint1)" height="72" width="12.1" x="114.5" y="54" />
      </g>
      <defs>
        <linearGradient id="nextPaint0" x1="109" x2="144.5" y1="116.5" y2="160.5" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFFFFF" />
          <stop offset="1" stopColor="#FFFFFF" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="nextPaint1" x1="121" x2="120.8" y1="54" y2="104" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFFFFF" />
          <stop offset="1" stopColor="#FFFFFF" stopOpacity="0.2" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function TypeScriptLogo({ className = "h-7 w-7" }: { className?: string }) {
  return (
    <svg viewBox="0 0 128 128" className={className}>
      <rect width="128" height="128" rx="20" fill="#3178C6" />
      <path
        fill="#FFFFFF"
        d="M47.7 75.3v36.6h-11.8V75.3H23.5V64.8h36.6v10.5H47.7zm28.9 37.6c-6.8 0-12.7-2.1-16.8-6.1l7.1-7.7c2.7 2.8 6.1 4.3 10.1 4.3 4.2 0 6.6-1.7 6.6-4.3 0-2.9-3.2-3.8-8.8-5.3-8.1-2.1-14.7-5.4-14.7-14.4 0-8.6 6.8-14.8 17.6-14.8 6.1 0 11.2 1.8 15 4.9l-6.4 7.9c-2.8-2.1-5.7-3.4-8.9-3.4-3.7 0-5.8 1.6-5.8 4 0 2.6 3.1 3.5 8.3 4.8 8.6 2.1 15.2 5.5 15.2 14.8 0 8.8-6.9 15.3-18.5 15.3z"
      />
    </svg>
  );
}

export function NodeLogo({ className = "h-7 w-7" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} fill="none">
      <path
        d="M16 2.5l11.7 6.8v13.4L16 29.5 4.3 22.7V9.3L16 2.5z"
        fill="#539E43"
      />
      <path
        d="M16 8.5a6 6 0 0 0-6 6v7h4v-7a2 2 0 0 1 4 0v7h4v-7a6 6 0 0 0-6-6z"
        fill="#FFFFFF"
      />
    </svg>
  );
}

export function PythonLogo({ className = "h-7 w-7" }: { className?: string }) {
  return (
    <svg viewBox="0 0 110 110" className={className}>
      <path
        fill="#3771A1"
        d="M53.4 3.7c-24.8 0-23.3 10.8-23.3 10.8l.1 11.1h23.7v3.4H20.5S5.8 27.3 5.8 52.1c0 24.8 12.9 23.9 12.9 23.9h7.7v-10.8s-.4-12.9 12.7-12.9h23.5s12.2-.2 12.2-12V15.7S76.6 3.7 53.4 3.7zm-13 7.3c2.4 0 4.4 2 4.4 4.4 0 2.4-2 4.4-4.4 4.4-2.4 0-4.4-2-4.4-4.4 0-2.4 2-4.4 4.4-4.4z"
      />
      <path
        fill="#FFD43B"
        d="M56.6 106.3c24.8 0 23.3-10.8 23.3-10.8l-.1-11.1H56.1V81h33.4s14.7 1.7 14.7-23.1c0-24.8-12.9-23.9-12.9-23.9h-7.7v10.8s.4 12.9-12.7 12.9H47.4s-12.2.2-12.2 12v21.6s-1.8 12 21.4 12zm13-7.3c-2.4 0-4.4-2-4.4-4.4 0-2.4 2-4.4 4.4-4.4 2.4 0 4.4 2 4.4 4.4 0 2.4-2 4.4-4.4 4.4z"
      />
    </svg>
  );
}

export function AwsLogo({ className = "h-7 w-7" }: { className?: string }) {
  return (
    <svg viewBox="0 0 80 80" className={className}>
      <rect width="80" height="80" rx="18" fill="#1A2433" stroke="#FF9900" strokeWidth="1.5" strokeOpacity="0.4" />
      <path
        fill="#FF9900"
        d="M20 48.5c7.2 5.5 17.5 8.3 26.5 8.3 12.6 0 24-4.7 32.5-12.5.6-.6.1-1.5-.8-1-7.6 4.7-17.1 7.4-26.7 7.4-8.1 0-17.1-2.3-24.3-6.9-.9-.5-1.6.3-.9 1.1z"
      />
      <path
        fill="#FF9900"
        d="M80 41.5c-.8-1-5.4-.5-8.2-.2-.9.1-1 .7-.2 1.3 4.5 2.9 8.8 1.3 8.8 1.3s.4-.9-.4-2.4z"
      />
      <text x="40" y="36" fill="#FFFFFF" fontSize="17" fontWeight="900" textAnchor="middle" fontFamily="system-ui, sans-serif" letterSpacing="1">
        AWS
      </text>
    </svg>
  );
}

export function AzureLogo({ className = "h-7 w-7" }: { className?: string }) {
  return (
    <svg viewBox="0 0 96 96" className={className}>
      <path fill="#0078D4" d="M25 81h46L49 15z" />
      <path fill="#50E6FF" d="M36 49L57 81H81L54 36z" />
      <path fill="#005BA1" d="M25 81L48 57l-15-27z" />
    </svg>
  );
}

export function GcpLogo({ className = "h-7 w-7" }: { className?: string }) {
  return (
    <svg viewBox="0 0 96 78" className={className}>
      <path
        fill="#EA4335"
        d="M52 14c-11.6 0-21.5 7.6-24.8 18.2A19 19 0 0 0 8 49c0 10.5 8.5 19 19 19h25V54H27a7 7 0 0 1-7-7c0-3.9 3.1-7 7-7h4.5l1.6-4.2C35.4 27.5 43.1 22 52 22c10.5 0 19.3 7.5 21.2 17.8l.9 4.7 4.7.7C83.7 46 87 50.1 87 55c0 4.4-3.6 8-8 8H64v14h15c12.2 0 22-9.8 22-22 0-8.8-5.2-16.4-12.7-19.9C77 22.8 65.6 14 52 14z"
      />
      <path fill="#4285F4" d="M37 68h27V54H37z" />
      <path fill="#FBBC05" d="M19 49c0 10.5 8.5 19 19 19V54a7 7 0 0 1-7-7c0-3.9 3.1-7 7-7v-14C27.5 26 19 36.3 19 49z" />
      <path
        fill="#34A853"
        d="M64 54v14h15c4.4 0 8-3.6 8-8 0-4.9-3.3-9-8.2-9.8l-4.7-.7-.9-4.7C66.3 34.5 59.8 29.5 52 28v14c4.4 0 8 3.6 8 8h4z"
      />
    </svg>
  );
}

export function KubernetesLogo({ className = "h-7 w-7" }: { className?: string }) {
  return (
    <svg viewBox="0 0 128 128" className={className}>
      <path fill="#326CE5" d="M64 12.8L19.2 38.6v51.6L64 116l44.8-25.8V38.6L64 12.8z" />
      <path
        fill="#FFFFFF"
        d="M64 32a32 32 0 1 0 0 64 32 32 0 0 0 0-64zm0 10a22 22 0 0 1 9.6 2.2l-3.3 5.8a15.3 15.3 0 0 0-12.6 0l-3.3-5.8A22 22 0 0 1 64 42zm-18.7 9a22 22 0 0 1 6.5-6.6l3.3 5.8a15.3 15.3 0 0 0-6.3 10.9h-6.7a22 22 0 0 1 3.2-10.1zm-3.3 17h6.7a15.3 15.3 0 0 0 6.3 10.9l-3.3 5.8a22 22 0 0 1-9.7-16.7zm22 18a15.3 15.3 0 0 0 12.6 0l3.3 5.8a22 22 0 0 1-19.2 0l3.3-5.8zm18.7-7.1a15.3 15.3 0 0 0 6.3-10.9h6.7a22 22 0 0 1-9.7 16.7l-3.3-5.8zm6.3-17.9a15.3 15.3 0 0 0-6.3-10.9l3.3-5.8a22 22 0 0 1 9.7 16.7h-6.7z"
      />
    </svg>
  );
}

export function DockerLogo({ className = "h-7 w-7" }: { className?: string }) {
  return (
    <svg viewBox="0 0 128 128" className={className}>
      <rect width="128" height="128" rx="22" fill="#2496ED" />
      <path
        fill="#FFFFFF"
        d="M112.5 54c-1.3-.9-5.3-1.6-10.4-.6-.7-5.5-4.4-9.8-9.9-10.9l-2.4-.4-.8 2.3c-2.3 6.9-1.2 13.9 3.2 18.7-2.6 1.4-6.4 2.1-11.2 2.1H20.4c-2.7 8.2-1.9 17.3 2.5 24.9 7.6 13.1 22.8 19.3 39.4 19.3 25.5 0 47.9-14.7 54.4-36.2 6.8-1 12.8-5.3 15.8-11.8l1.1-2.4-1.1-.9zM42 41h9v9h-9zm12 0h9v9h-9zm12 0h9v9h-9zm-36 12h9v9h-9zm12 0h9v9h-9zm12 0h9v9h-9zm12 0h9v9h-9zm12 0h9v9h-9zm-36 12h9v9h-9zm12 0h9v9h-9zm12 0h9v9h-9zm12 0h9v9h-9z"
      />
    </svg>
  );
}

export function AppleLogo({ className = "h-7 w-7" }: { className?: string }) {
  return (
    <svg viewBox="0 0 170 170" className={className} fill="currentColor">
      <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.69-3.08-7.7-7.98-12.04-14.7-6.08-9.45-10.74-20.2-13.98-32.25-3.24-12.05-4.86-23.2-4.86-33.45 0-14.88 3.8-27.27 11.41-37.18 7.61-9.91 17.18-14.99 28.7-15.24 4.58 0 9.87 1.25 15.86 3.75 5.99 2.5 10.13 3.84 12.43 4.02 2.65-.24 7.02-1.6 13.12-4.08 6.1-2.48 11.41-3.6 15.93-3.37 12.05.61 21.84 5.37 29.37 14.28-10.45 6.35-15.55 15.11-15.3 26.28.25 8.78 3.52 16.14 9.81 22.08 6.29 5.94 13.79 9.38 22.5 10.32-2.32 7.08-5.06 14.35-8.24 21.81zM119.22 32.64c0-7.2 2.61-13.98 7.83-20.34 5.22-6.36 11.66-10.59 19.32-12.7 1.09 7.08-.85 13.9-5.82 20.46-4.97 6.56-11.41 10.87-19.33 12.93-.36-.12-1-.23-2-.35z" />
    </svg>
  );
}

export function AndroidLogo({ className = "h-7 w-7" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="#3DDC84">
      <path d="M17.523 15.3414c-.5511 0-.9993-.4486-.9993-1s.4482-1 .9993-1c.5511 0 .9993.4486.9993 1s-.4482 1-.9993 1m-11.046 0c-.5511 0-.9993-.4486-.9993-1s.4482-1 .9993-1c.5511 0 .9993.4486.9993 1s-.4482 1-.9993 1m11.4045-6.02l1.996-3.4572c.1556-.2696.0633-.6135-.2063-.7691-.2696-.1556-.6135-.0633-.7691.2063l-2.0221 3.5024C15.3444 8.2415 13.7145 7.89 12 7.89c-1.7145 0-3.3444.3515-4.886 1.0138L5.0919 5.4014c-.1556-.2696-.4995-.3619-.7691-.2063-.2696.1556-.3619.4995-.2063.7691l1.996 3.4572C2.6806 11.354 0 15.42 0 20.08h24c0-4.66-2.6806-8.726-6.1185-10.7586" />
    </svg>
  );
}

export function PyTorchLogo({ className = "h-7 w-7" }: { className?: string }) {
  return (
    <svg viewBox="0 0 128 128" className={className} fill="none">
      <path
        fill="#EE4C2C"
        d="M72.5 18l-8.8 8.8c11.6 11.6 12 30 1.2 42.1-10.8 12.1-29.2 13.8-42.1 4-1.2-.9-2.3-2-3.4-3.1L10.6 78.6c19.4 19.4 50.8 19.4 70.2 0 19.4-19.4 19.4-50.8 0-70.2l-8.3 9.6z"
      />
      <circle cx="82.4" cy="27.9" r="6.2" fill="#EE4C2C" />
    </svg>
  );
}

export function TensorFlowLogo({ className = "h-7 w-7" }: { className?: string }) {
  return (
    <svg viewBox="0 0 128 128" className={className}>
      <path fill="#FF6F00" d="M64 4L16 32v64l48 28 48-28V32L64 4zm0 20.6l32 18.7v49.4L64 111.4 32 92.7V43.3l32-18.7z" />
      <path fill="#FFA800" d="M64 24.6L32 43.3v49.4L64 74V24.6z" />
      <path fill="#FF6F00" d="M64 74l32 18.7-32 18.7V74z" />
    </svg>
  );
}

export function OpenAiLogo({ className = "h-7 w-7" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.02 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zM20.444 8.7617l-.142-.0852-4.7877-2.763a.7759.7759 0 0 0-.7854 0L8.886 9.2819V6.9496a.0757.0757 0 0 1 .0331-.0615l4.897-2.8256a4.4992 4.4992 0 0 1 6.6279 4.6992zm-9.708 6.0028l-2.6028-1.5002 2.6028-1.5002 2.6028 1.5002-2.6028 1.5002z" />
    </svg>
  );
}

export function PostgreSqlLogo({ className = "h-7 w-7" }: { className?: string }) {
  return (
    <svg viewBox="0 0 128 128" className={className}>
      <rect width="128" height="128" rx="20" fill="#336791" />
      <path
        fill="#FFFFFF"
        d="M64 22c-15.5 0-28 12.5-28 28 0 7.8 3.2 14.8 8.4 19.8-1.1 2.5-2.4 5-2.4 8.2 0 11 8.9 20 20 20s20-9 20-20c0-3.2-1.3-5.7-2.4-8.2 5.2-5 8.4-12 8.4-19.8 0-15.5-12.5-28-28-28zm0 12c8.8 0 16 7.2 16 16s-7.2 16-16 16-16-7.2-16-16 7.2-16 16-16z"
      />
    </svg>
  );
}

export function RedisLogo({ className = "h-7 w-7" }: { className?: string }) {
  return (
    <svg viewBox="0 0 128 128" className={className}>
      <rect width="128" height="128" rx="20" fill="#D82C20" />
      <path
        fill="#FFFFFF"
        d="M64 28l36 18-36 18-36-18 36-18zm0 28l36 18-36 18-36-18 36-18zm0 28l36 18-36 18-36-18 36-18z"
        opacity="0.9"
      />
    </svg>
  );
}

export function TerraformLogo({ className = "h-7 w-7" }: { className?: string }) {
  return (
    <svg viewBox="0 0 128 128" className={className}>
      <rect width="128" height="128" rx="20" fill="#844FBA" />
      <path
        fill="#FFFFFF"
        d="M48 24v28L24 38V10l24 14zm4 0l24-14v28L52 52V24zm0 32l24-14v28L52 84V56zm28-16l24-14v28l-24 14V40zm-28 48l24-14v28l-24 14V88z"
      />
    </svg>
  );
}

export function FlutterLogo({ className = "h-7 w-7" }: { className?: string }) {
  return (
    <svg viewBox="0 0 128 128" className={className}>
      <path fill="#02569B" d="M78 12L24 66l16 16L94 28z" />
      <path fill="#0175C2" d="M56 82l22 22 46-46H86z" />
      <path fill="#29B6F6" d="M78 104l16 16h38L94 82z" />
    </svg>
  );
}
