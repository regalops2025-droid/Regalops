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
  "mt-1.5 w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-primary";

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
    <SiteLayout>
      <PageHero
        eyebrow={jobTitle ? "Careers" : "Contact us"}
        title={jobTitle ? `Apply for ${jobTitle}` : "Start with a technical conversation"}
        titleClassName="max-w-none whitespace-nowrap text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-tight"
        description={
          jobTitle
            ? "Submit your details and CV/Resume below to apply. Our engineering leads will review it shortly."
            : "No discovery-call funnel. Describe the problem and a senior engineer replies within one business day."
        }
        descriptionClassName="max-w-none md:whitespace-nowrap"
      />
      <Section className="w-full">
        {/* Full Screen Width Contact Form */}
        <div className="w-full space-y-5">
          <form className="panel p-5 sm:p-7 lg:p-8 space-y-4 w-full shadow-lg border border-border/80 rounded-3xl bg-surface" onSubmit={handleSubmit}>
            <div className="border-b border-border/60 pb-3.5 mb-1.5">
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
                {jobTitle ? `Submit Application for ${jobTitle}` : "Send an Engineering Enquiry"}
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                {jobTitle
                  ? "Fill in your details below and upload your CV/Resume."
                  : "Tell us about your system architecture, project scope, or enterprise technical requirements."}
              </p>
            </div>

            {status === "success" && (
              <div className="rounded-xl bg-emerald-500/10 border border-emerald-500/30 p-4 text-sm text-emerald-600">
                {jobTitle
                  ? "Job application submitted successfully! Our recruiters will review your CV shortly."
                  : "Enquiry sent successfully! A senior engineer will review it and reply within one business day."}
              </div>
            )}
            {status === "error" && (
              <div className="rounded-xl bg-destructive/10 border border-destructive/30 p-4 text-sm text-destructive">
                {errorMsg}
              </div>
            )}

            {/* Row 1: Full Name & Email Address */}
            <div className="grid gap-6 sm:grid-cols-2">
              <label className="block text-sm font-medium text-foreground">
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

              <label className="block text-sm font-medium text-foreground">
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
              <div className="grid gap-6 sm:grid-cols-2">
                <label className="block text-sm font-medium text-foreground">
                  Mobile*
                  <div
                    className={`relative mt-1.5 flex rounded-xl border bg-background transition-all overflow-hidden ${
                      mobileTouched && mobileError
                        ? "border-rose-500 focus-within:border-rose-500 ring-1 ring-rose-500/20"
                        : mobile.length === 10 && !mobileError
                          ? "border-emerald-500/70 focus-within:border-emerald-500"
                          : "border-input focus-within:border-primary"
                    }`}
                  >
                    <span className="inline-flex items-center px-3.5 text-xs font-semibold text-muted-foreground bg-secondary/60 border-r border-border select-none shrink-0">
                      +91
                    </span>
                    <input
                      type="tel"
                      inputMode="numeric"
                      maxLength={10}
                      pattern="[6-9][0-9]{9}"
                      className="w-full bg-transparent px-3.5 py-2.5 text-sm outline-none placeholder:text-muted-foreground text-foreground"
                      placeholder="98765 43210"
                      value={mobile}
                      onChange={handleMobileChange}
                      onBlur={handleMobileBlur}
                      required
                      disabled={status === "loading"}
                    />
                  </div>
                  {mobileTouched && mobileError ? (
                    <p className="mt-1.5 text-xs font-medium text-rose-500 animate-in fade-in">
                      {mobileError}
                    </p>
                  ) : mobile.length === 10 && !mobileError ? (
                    <p className="mt-1.5 text-xs font-medium text-emerald-600 dark:text-emerald-400 animate-in fade-in">
                      ✓ Valid 10-digit Indian mobile number
                    </p>
                  ) : (
                    <p className="mt-1 text-[11px] text-muted-foreground">
                      10 digits starting with 6, 7, 8, or 9
                    </p>
                  )}
                </label>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">
                    Upload Resume / CV (PDF only, max 5MB)*
                  </label>
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={(e) => setCvFile(e.target.files?.[0] || null)}
                    required
                    disabled={status === "loading"}
                    className="w-full text-sm text-zinc-500
                      file:mr-4 file:py-2.5 file:px-4
                      file:rounded-xl file:border-0
                      file:text-sm file:font-semibold
                      file:bg-primary file:text-primary-foreground
                      hover:file:opacity-90 file:cursor-pointer"
                  />
                </div>
              </div>
            ) : (
              /* Standard enquiry address and comments field */
              <>
                <div className="grid gap-6 sm:grid-cols-2">
                  <label className="block text-sm font-medium text-foreground">
                    Mobile*
                    <div
                      className={`relative mt-1.5 flex rounded-xl border bg-background transition-all overflow-hidden ${
                        mobileTouched && mobileError
                          ? "border-rose-500 focus-within:border-rose-500 ring-1 ring-rose-500/20"
                          : mobile.length === 10 && !mobileError
                            ? "border-emerald-500/70 focus-within:border-emerald-500"
                            : "border-input focus-within:border-primary"
                      }`}
                    >
                      <span className="inline-flex items-center px-3.5 text-xs font-semibold text-muted-foreground bg-secondary/60 border-r border-border select-none shrink-0">
                        +91
                      </span>
                      <input
                        type="tel"
                        inputMode="numeric"
                        maxLength={10}
                        pattern="[6-9][0-9]{9}"
                        className="w-full bg-transparent px-3.5 py-2.5 text-sm outline-none placeholder:text-muted-foreground text-foreground"
                        placeholder="98765 43210"
                        value={mobile}
                        onChange={handleMobileChange}
                        onBlur={handleMobileBlur}
                        required
                        disabled={status === "loading"}
                      />
                    </div>
                    {mobileTouched && mobileError ? (
                      <p className="mt-1.5 text-xs font-medium text-rose-500 animate-in fade-in">
                        {mobileError}
                      </p>
                    ) : mobile.length === 10 && !mobileError ? (
                      <p className="mt-1.5 text-xs font-medium text-emerald-600 dark:text-emerald-400 animate-in fade-in">
                        ✓ Valid 10-digit Indian mobile number
                      </p>
                    ) : (
                      <p className="mt-1 text-[11px] text-muted-foreground">
                        10 digits starting with 6, 7, 8, or 9
                      </p>
                    )}
                  </label>

                  <label className="block text-sm font-medium text-foreground">
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

                {/* 3-column location row (Zip Code removed) */}
                <div className="grid gap-6 sm:grid-cols-3">
                  <label className="block text-sm font-medium text-foreground">
                    City
                    <input
                      className={field}
                      placeholder="e.g. Chennai"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      disabled={status === "loading"}
                    />
                  </label>

                  <label className="block text-sm font-medium text-foreground">
                    Select State
                    <select
                      className={field}
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      disabled={status === "loading"}
                    >
                      <option value="">-- Choose State --</option>
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

                  <label className="block text-sm font-medium text-foreground">
                    Select Country
                    <select
                      className={field}
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      disabled={status === "loading"}
                    >
                      <option value="">-- Choose Country --</option>
                      <option value="India">India</option>
                      <option value="United States">United States</option>
                      <option value="United Kingdom">United Kingdom</option>
                      <option value="Canada">Canada</option>
                      <option value="Australia">Australia</option>
                    </select>
                  </label>
                </div>

                <label className="block text-sm font-medium text-foreground">
                  Additional Comments*
                  <textarea
                    rows={5}
                    className={field}
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
              className="mt-6 w-full rounded-xl bg-primary px-6 py-3.5 text-base font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5 disabled:opacity-50 cursor-pointer shadow-md shadow-primary/20 hover:shadow-lg"
            >
              {status === "loading" ? "Submitting..." : jobTitle ? "Submit Application" : "Send Enquiry"}
            </button>
          </form>

          {/* Office locations & Direct engineering contact: full-width 4-column cards below */}
          <div>
            <h3 className="text-xl font-bold tracking-tight text-foreground text-center mb-6">
              Our Offices & Global Engineering Hubs
            </h3>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <div className="panel p-6 bg-surface border border-border/80 rounded-2xl flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-primary font-semibold text-sm">
                    <MapPin className="h-4 w-4" />
                    <span>USA Office</span>
                  </div>
                  <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                    8 Chill Sean Street, Dunwoody, Atlanta, Georgia, USA
                  </p>
                </div>
                <span className="mt-4 text-[10px] uppercase font-bold tracking-widest text-primary/80">North America HQ</span>
              </div>

              <div className="panel p-6 bg-surface border border-border/80 rounded-2xl flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-primary font-semibold text-sm">
                    <MapPin className="h-4 w-4" />
                    <span>Hyderabad Office</span>
                  </div>
                  <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                    Floor 1, MB3 Block, Raheja Mindspace, Hyderabad, Telangana
                  </p>
                </div>
                <span className="mt-4 text-[10px] uppercase font-bold tracking-widest text-primary/80">Delivery Center</span>
              </div>

              <div className="panel p-6 bg-surface border border-border/80 rounded-2xl flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-primary font-semibold text-sm">
                    <MapPin className="h-4 w-4" />
                    <span>Warangal Office</span>
                  </div>
                  <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                    H.No: 12-13, 1st Floor, Warangal, Telangana, 506002
                  </p>
                </div>
                <span className="mt-4 text-[10px] uppercase font-bold tracking-widest text-primary/80">Innovation Lab</span>
              </div>

              <div className="panel p-6 bg-surface border border-border/80 rounded-2xl flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-primary font-semibold text-sm">
                    <Mail className="h-4 w-4" />
                    <span>Direct Engineering Contact</span>
                  </div>
                  <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                    For direct architecture reviews & inquiries:
                  </p>
                  <a href="mailto:Info@regalops.com" className="mt-1 block text-xs font-semibold text-primary hover:underline">
                    Info@regalops.com
                  </a>
                </div>
                <span className="mt-4 text-[10px] uppercase font-bold tracking-widest text-emerald-600">24/7 Response SLA</span>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </SiteLayout>
  );
}
