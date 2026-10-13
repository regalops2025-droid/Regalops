import { createFileRoute } from "@tanstack/react-router";
import { Mail, MapPin } from "lucide-react";
import { useState } from "react";
import { SiteLayout, PageHero, Section } from "@/components/site/site-layout";

interface ContactSearch {
  jobId?: number;
  jobTitle?: string;
}

export const Route = createFileRoute("/contact")({
  validateSearch: (search: Record<string, unknown>): ContactSearch => {
    return {
      jobId: search.jobId ? Number(search.jobId) : undefined,
      jobTitle: (search.jobTitle as string) || undefined,
    };
  },
  head: () => ({
    meta: [
      { title: "Contact Regal OPs — Talk to a Senior Engineer" },
      {
        name: "description",
        content:
          "Reach the Regal OPs team in Chennai. Bring your architecture and get an honest technical assessment.",
      },
      { property: "og:title", content: "Contact Regal OPs" },
      {
        property: "og:description",
        content: "Talk to a senior engineer about your platform, cloud or data programme.",
      },
    ],
  }),
  component: Contact,
});

const field =
  "mt-1 w-full rounded-xl border border-input bg-background px-3 py-1.5 sm:py-2 text-xs sm:text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary/20";

function Contact() {
  const { jobId, jobTitle } = Route.useSearch();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [mobileError, setMobileError] = useState("");
  const [mobileTouched, setMobileTouched] = useState(false);
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [service, setService] = useState("");
  const [comments, setComments] = useState("");
  const [cvFile, setCvFile] = useState<File | null>(null);
  
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  // Indian mobile validation: starts with 6, 7, 8, or 9 and strictly 10 digits
  const validateMobile = (value: string): string => {
    if (!value || !value.trim()) {
      return "Mobile number is required";
    }
    const clean = value.replace(/\D/g, "");
    if (clean.length === 0) {
      return "Mobile number is required";
    }
    if (!/^[6-9]/.test(clean)) {
      return "Must start with 6, 7, 8, or 9 (cannot start with 0, 1, 2, 3, 4, 5)";
    }
    if (clean.length < 10) {
      return `Must be exactly 10 digits (${10 - clean.length} more needed)`;
    }
    if (clean.length > 10) {
      return "Must not exceed 10 digits";
    }
    return "";
  };

  const handleMobileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let raw = e.target.value.replace(/\D/g, "");
    // If user pasted with country code +91 (12 digits), strip leading 91
    if (raw.length === 12 && raw.startsWith("91")) {
      raw = raw.slice(2);
    } else if (raw.length === 11 && raw.startsWith("0")) {
      raw = raw.slice(1);
    }
    const clean = raw.slice(0, 10);
    setMobile(clean);

    if (mobileTouched || clean.length > 0) {
      setMobileError(validateMobile(clean));
    }
  };

  const handleMobileBlur = () => {
    setMobileTouched(true);
    setMobileError(validateMobile(mobile));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    const mobErr = validateMobile(mobile);
    if (mobErr) {
      setMobileTouched(true);
      setMobileError(mobErr);
      setStatus("error");
      setErrorMsg(mobErr);
      return;
    }

    const nameParts = fullName.trim().split(/\s+/);
    const firstName = nameParts[0] || fullName.trim();
    const lastName = nameParts.slice(1).join(" ") || "-";

    try {
      if (jobTitle && jobId) {
        if (!cvFile) {
          throw new Error("Please select a PDF CV/Resume file to upload.");
        }
        const formData = new FormData();
        formData.append("full_name", fullName);
        formData.append("first_name", firstName);
        formData.append("last_name", lastName);
        formData.append("email", email);
        formData.append("mobile", `+91 ${mobile}`);
        formData.append("job_title", jobTitle);
        formData.append("cv", cvFile);

        const response = await fetch(`/api/jobs/${jobId}/apply`, {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.error || "Failed to submit job application.");
        }
      } else {
        const response = await fetch("/api/contact", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            full_name: fullName,
            first_name: firstName,
            last_name: lastName,
            email,
            mobile: `+91 ${mobile}`,
            city,
            state,
            country,
            service,
            comments,
          }),
        });

        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.error || "Failed to submit enquiry.");
        }
      }

      setStatus("success");
      setFullName("");
      setEmail("");
      setMobile("");
      setMobileError("");
      setMobileTouched(false);
      setCity("");
      setState("");
      setCountry("");
      setService("");
      setComments("");
      setCvFile(null);
    } catch (err: any) {
      console.error(err);
      setStatus("error");
      setErrorMsg(err.message || "An unexpected error occurred. Please try again.");
    }
  };

  return (
    <SiteLayout hideFooter noScroll hideStickyActions>
      <section className="hero-glow flex-1 min-h-0 w-full flex items-center justify-center py-3 sm:py-5 lg:py-6 px-4 sm:px-6 lg:px-8 overflow-y-auto">
        <div className="w-full max-w-[1440px] mx-auto rounded-3xl border border-border/80 bg-surface shadow-2xl grid grid-cols-1 lg:grid-cols-12 items-stretch my-auto overflow-hidden">
          
          {/* LEFT COLUMN: Visual Image Card & Executive Contact Details */}
          <div className="lg:col-span-5 relative overflow-hidden bg-neutral-950 text-white flex flex-col justify-between p-5 sm:p-6 lg:p-7 space-y-3 sm:space-y-4">
            {/* Image Background */}
            <div className="absolute inset-0 z-0">
              <img
                src="/contact-handshake.jpg"
                alt="Regal OPs Strategic Engineering Partnership"
                className="h-full w-full object-cover object-center brightness-[0.52] contrast-[1.1] scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/80 to-neutral-950/60" />
              <div className="absolute inset-0 bg-[#07192F]/40 mix-blend-multiply" />
            </div>

            {/* Top Details */}
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/15 px-3 py-0.5 backdrop-blur-md mb-2 sm:mb-2.5">
                <span className="h-2 w-2 rounded-full bg-[#a4c965] animate-pulse" />
                <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.2em] text-[#a4c965]">
                  {jobTitle ? "Careers Gateway" : "Architecture Consultation"}
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl xl:text-3xl font-extrabold text-white tracking-tight leading-tight">
                {jobTitle ? (
                  <>
                    Join Our Principal <br />
                    <span className="text-[#a4c965]">Engineering Practice</span>
                  </>
                ) : (
                  <>
                    Let&apos;s Build Resilient <br />
                    <span className="text-[#a4c965]">Systems Together</span>
                  </>
                )}
              </h2>
              <p className="mt-1.5 sm:mt-2 text-xs sm:text-sm text-neutral-300 leading-relaxed max-w-sm">
                {jobTitle
                  ? "Submit your application directly to our principal engineering leads. Fast-track technical evaluation."
                  : "Schedule an architectural review with our principal engineers. We dive straight into technical realities."}
              </p>
            </div>

            {/* Middle Card: Global Hubs & Direct Contact */}
            <div className="relative z-10 rounded-2xl border border-white/10 bg-white/10 backdrop-blur-md p-3.5 sm:p-4 space-y-2.5 shadow-lg">
              <div className="flex items-center gap-2.5">
                <div className="h-8 w-8 rounded-lg bg-[#555d25] flex items-center justify-center shrink-0 text-white shadow-xs">
                  <Mail className="h-3.5 w-3.5" />
                </div>
                <div className="min-w-0">
                  <span className="text-[9.5px] font-bold uppercase tracking-wider text-neutral-400 block">Direct Engineering Contact</span>
                  <a href="mailto:Info@regalops.com" className="text-xs sm:text-sm font-bold text-white hover:text-[#a4c965] transition-colors truncate block">
                    Info@regalops.com
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-2.5 pt-2 border-t border-white/10">
                <div className="h-8 w-8 rounded-lg bg-neutral-800 flex items-center justify-center shrink-0 text-[#a4c965]">
                  <MapPin className="h-3.5 w-3.5" />
                </div>
                <div className="min-w-0">
                  <span className="text-[9.5px] font-bold uppercase tracking-wider text-neutral-400 block">Global Engineering Hubs</span>
                  <p className="text-[11px] font-medium text-neutral-200 truncate">
                    Atlanta, GA &bull; Hyderabad &bull; Warangal
                  </p>
                </div>
              </div>
            </div>

            {/* Bottom Trust Pills */}
            <div className="relative z-10 flex flex-wrap gap-1.5 text-[10.5px] font-medium text-neutral-300 pt-1 pb-1">
              <span className="inline-flex items-center gap-1 rounded-full bg-black/50 border border-white/20 px-2.5 py-1 backdrop-blur-sm shadow-xs">
                ✓ 24h SLA Response
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-black/50 border border-white/20 px-2.5 py-1 backdrop-blur-sm shadow-xs">
                ✓ 100% NDA Protected
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-black/50 border border-white/20 px-2.5 py-1 backdrop-blur-sm shadow-xs">
                ✓ Senior Engineers Only
              </span>
            </div>
          </div>

          {/* RIGHT COLUMN: Contact / Application Form */}
          <div className="lg:col-span-7 p-4 sm:p-5 lg:p-6 xl:p-8 flex flex-col justify-center bg-card overflow-y-auto">
            <form className="space-y-2.5 sm:space-y-3 w-full" onSubmit={handleSubmit}>
              <div className="border-b border-border/60 pb-2 mb-1">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.18em] text-primary">
                      {jobTitle ? "Career Application" : "Get In Touch"}
                    </span>
                    <h1 className="text-lg sm:text-xl xl:text-2xl font-bold tracking-tight text-foreground">
                      {jobTitle ? `Apply for ${jobTitle}` : "Send an Engineering Enquiry"}
                    </h1>
                  </div>
                  <span className="hidden sm:inline-flex items-center gap-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 px-2.5 py-0.5 text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
                    Active On-Call Engineers
                  </span>
                </div>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  {jobTitle
                    ? "Fill in your details below and upload your CV/Resume."
                    : "Tell us about your system architecture, project scope, or technical challenges."}
                </p>
              </div>

              {status === "success" && (
                <div className="rounded-xl bg-emerald-500/10 border border-emerald-500/30 p-2.5 text-xs sm:text-sm text-emerald-600">
                  {jobTitle
                    ? "Job application submitted successfully! Our recruiters will review your CV shortly."
                    : "Enquiry sent successfully! A senior engineer will review it and reply within one business day."}
                </div>
              )}
              {status === "error" && (
                <div className="rounded-xl bg-destructive/10 border border-destructive/30 p-2.5 text-xs sm:text-sm text-destructive">
                  {errorMsg}
                </div>
              )}

              {/* Row 1: Full Name & Email Address */}
              <div className="grid gap-2.5 sm:gap-3 sm:grid-cols-2">
                <label className="block text-xs font-semibold text-foreground">
                  Full Name*
                  <input
                    className={field}
                    placeholder="e.g. Priya Raman"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                    disabled={status === "loading"}
                  />
                </label>

                <label className="block text-xs font-semibold text-foreground">
                  Email Address*
                  <input
                    type="email"
                    className={field}
                    placeholder="priya@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={status === "loading"}
                  />
                </label>
              </div>

              {jobTitle ? (
                /* CV upload field for jobs application */
                <div className="grid gap-2.5 sm:gap-3 sm:grid-cols-2">
                  <label className="block text-xs font-semibold text-foreground">
                    Mobile*
                    <div
                      className={`relative mt-1 flex rounded-xl border bg-background transition-all overflow-hidden ${
                        mobileTouched && mobileError
                          ? "border-rose-500 focus-within:border-rose-500 ring-1 ring-rose-500/20"
                          : mobile.length === 10 && !mobileError
                            ? "border-emerald-500/70 focus-within:border-emerald-500"
                            : "border-input focus-within:border-primary"
                      }`}
                    >
                      <span className="inline-flex items-center px-2.5 text-xs font-semibold text-muted-foreground bg-secondary/60 border-r border-border select-none shrink-0">
                        +91
                      </span>
                      <input
                        type="tel"
                        inputMode="numeric"
                        maxLength={10}
                        pattern="[6-9][0-9]{9}"
                        className="w-full bg-transparent px-3 py-1.5 sm:py-2 text-xs sm:text-sm outline-none placeholder:text-muted-foreground text-foreground"
                        placeholder="98765 43210"
                        value={mobile}
                        onChange={handleMobileChange}
                        onBlur={handleMobileBlur}
                        required
                        disabled={status === "loading"}
                      />
                    </div>
                  </label>

                  <div>
                    <label className="block text-xs font-semibold text-foreground mb-1">
                      Upload Resume / CV (PDF, max 5MB)*
                    </label>
                    <input
                      type="file"
                      accept=".pdf"
                      onChange={(e) => setCvFile(e.target.files?.[0] || null)}
                      required
                      disabled={status === "loading"}
                      className="w-full text-xs text-zinc-500
                        file:mr-3 file:py-1.5 file:px-3
                        file:rounded-xl file:border-0
                        file:text-xs file:font-semibold
                        file:bg-primary file:text-primary-foreground
                        hover:file:opacity-90 file:cursor-pointer"
                    />
                  </div>
                </div>
              ) : (
                /* Standard enquiry address and comments field */
                <>
                  <div className="grid gap-2.5 sm:gap-3 sm:grid-cols-2">
                    <label className="block text-xs font-semibold text-foreground">
                      Mobile*
                      <div
                        className={`relative mt-1 flex rounded-xl border bg-background transition-all overflow-hidden ${
                          mobileTouched && mobileError
                            ? "border-rose-500 focus-within:border-rose-500 ring-1 ring-rose-500/20"
                            : mobile.length === 10 && !mobileError
                              ? "border-emerald-500/70 focus-within:border-emerald-500"
                              : "border-input focus-within:border-primary"
                        }`}
                      >
                        <span className="inline-flex items-center px-2.5 text-xs font-semibold text-muted-foreground bg-secondary/60 border-r border-border select-none shrink-0">
                          +91
                        </span>
                        <input
                          type="tel"
                          inputMode="numeric"
                          maxLength={10}
                          pattern="[6-9][0-9]{9}"
                          className="w-full bg-transparent px-3 py-1.5 sm:py-2 text-xs sm:text-sm outline-none placeholder:text-muted-foreground text-foreground"
                          placeholder="98765 43210"
                          value={mobile}
                          onChange={handleMobileChange}
                          onBlur={handleMobileBlur}
                          required
                          disabled={status === "loading"}
                        />
                      </div>
                    </label>

                    <label className="block text-xs font-semibold text-foreground">
                      How can we help you?*
                      <select
                        className={field}
                        value={service}
                        onChange={(e) => setService(e.target.value)}
                        required
                        disabled={status === "loading"}
                      >
                        <option value="">-- Select Service Area --</option>
                        <option value="Enterprise Software">Enterprise Software</option>
                        <option value="Cloud Migration">Cloud Migration</option>
                        <option value="Data & Analytics">Data & Analytics</option>
                        <option value="AI Automation">AI Automation</option>
                        <option value="Cyber Security">Cyber Security</option>
                        <option value="Managed Support">Managed Support</option>
                      </select>
                    </label>
                  </div>

                  {/* 3-column location row */}
                  <div className="grid gap-2.5 sm:gap-3 sm:grid-cols-3">
                    <label className="block text-xs font-semibold text-foreground">
                      City
                      <input
                        className={field}
                        placeholder="e.g. Chennai"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        disabled={status === "loading"}
                      />
                    </label>

                    <label className="block text-xs font-semibold text-foreground">
                      Select State
                      <select
                        className={field}
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        disabled={status === "loading"}
                      >
                        <option value="">-- State --</option>
                        <option value="Tamil Nadu">Tamil Nadu</option>
                        <option value="Karnataka">Karnataka</option>
                        <option value="Telangana">Telangana</option>
                        <option value="Maharashtra">Maharashtra</option>
                        <option value="Delhi">Delhi</option>
                        <option value="Georgia">Georgia</option>
                        <option value="California">California</option>
                        <option value="New York">New York</option>
                        <option value="Texas">Texas</option>
                      </select>
                    </label>

                    <label className="block text-xs font-semibold text-foreground">
                      Select Country
                      <select
                        className={field}
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        disabled={status === "loading"}
                      >
                        <option value="">-- Country --</option>
                        <option value="India">India</option>
                        <option value="United States">United States</option>
                        <option value="United Kingdom">United Kingdom</option>
                        <option value="Canada">Canada</option>
                        <option value="Australia">Australia</option>
                      </select>
                    </label>
                  </div>

                  <label className="block text-xs font-semibold text-foreground">
                    Additional Comments*
                    <textarea
                      rows={2}
                      className={`${field} resize-none`}
                      placeholder="A short description of the system, timeline, or key technical challenges."
                      value={comments}
                      onChange={(e) => setComments(e.target.value)}
                      required
                      disabled={status === "loading"}
                    />
                  </label>
                </>
              )}

              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full rounded-xl bg-primary px-5 py-2.5 text-xs sm:text-sm font-semibold text-primary-foreground transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/20 disabled:opacity-50 cursor-pointer shadow-sm mt-2 sm:mt-2.5 mb-1"
              >
                {status === "loading" ? "Submitting..." : jobTitle ? "Submit Application" : "Send Enquiry"}
              </button>
            </form>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
