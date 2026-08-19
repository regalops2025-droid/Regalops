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

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [service, setService] = useState("");
  const [comments, setComments] = useState("");
  const [cvFile, setCvFile] = useState<File | null>(null);
  
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      if (jobTitle && jobId) {
        if (!cvFile) {
          throw new Error("Please select a PDF CV/Resume file to upload.");
        }
        const formData = new FormData();
        formData.append("first_name", firstName);
        formData.append("last_name", lastName);
        formData.append("email", email);
        formData.append("mobile", mobile);
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
            first_name: firstName,
            last_name: lastName,
            email,
            mobile,
            city,
            state,
            country,
            zip_code: zipCode,
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
      setFirstName("");
      setLastName("");
      setEmail("");
      setMobile("");
      setCity("");
      setState("");
      setCountry("");
      setZipCode("");
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
        description={
          jobTitle
            ? "Submit your details and CV/Resume below to apply. Our engineering leads will review it shortly."
            : "No discovery-call funnel. Describe the problem and a senior engineer replies within one business day."
        }
      />
      <Section>
        <div className="grid gap-8 xl:grid-cols-[1.4fr_0.8fr]">
          
          {/* Vuesol Premium Form Layout */}
          <form className="panel p-6 sm:p-8 space-y-5" onSubmit={handleSubmit}>
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

            <div className="grid gap-5 sm:grid-cols-2">
              <label className="block text-sm font-medium text-foreground">
                First Name*
                <input
                  className={field}
                  placeholder="e.g. Priya"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                  disabled={status === "loading"}
                />
              </label>
              <label className="block text-sm font-medium text-foreground">
                Last Name*
                <input
                  className={field}
                  placeholder="e.g. Raman"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                  disabled={status === "loading"}
                />
              </label>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
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
              <label className="block text-sm font-medium text-foreground">
                Mobile*
                <input
                  className={field}
                  placeholder="+91 98000 00000"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  required
                  disabled={status === "loading"}
                />
              </label>
            </div>

            {jobTitle ? (
              /* CV upload field for jobs application */
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
                  Upload Resume / CV (PDF only, max 5MB)*
                </label>
                <input
                  type="file"
                  accept=".pdf"
                  onChange={(e) => setCvFile(e.target.files?.[0] || null)}
                  required
                  disabled={status === "loading"}
                  className="w-full text-sm text-zinc-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-xl file:border-0
                    file:text-sm file:font-semibold
                    file:bg-primary file:text-primary-foreground
                    hover:file:opacity-90 file:cursor-pointer"
                />
              </div>
            ) : (
              /* Standard enquiry address and comments field */
              <>
                <div className="grid gap-5 sm:grid-cols-2">
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
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
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
                  <label className="block text-sm font-medium text-foreground">
                    Zip Code
                    <input
                      className={field}
                      placeholder="e.g. 600001"
                      value={zipCode}
                      onChange={(e) => setZipCode(e.target.value)}
                      disabled={status === "loading"}
                    />
                  </label>
                </div>

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

                <label className="block text-sm font-medium text-foreground">
                  Additional Comments*
                  <textarea
                    rows={5}
                    className={field}
                    placeholder="A short description of the system, timeline, or key comments."
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
              className="mt-6 w-full rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5 disabled:opacity-50 cursor-pointer"
            >
              {status === "loading" ? "Submitting..." : jobTitle ? "Submit Application" : "Send Enquiry"}
            </button>
          </form>

          {/* Right Column: Office info */}
          <div className="space-y-6">
            <div className="panel p-6 bg-surface">
              <h3 className="font-display text-base font-semibold">Office locations</h3>
              <ul className="mt-4 space-y-4 text-xs text-muted-foreground">
                <li className="flex items-start gap-2.5">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <div>
                    <strong className="text-foreground uppercase tracking-wider text-[10px]">USA Office</strong>
                    <p className="mt-1 leading-relaxed">8 Chill Sean Street, Dunwoody, Atlanta, Georgia, USA</p>
                  </div>
                </li>
                <li className="flex items-start gap-2.5">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <div>
                    <strong className="text-foreground uppercase tracking-wider text-[10px]">Hyderabad Office</strong>
                    <p className="mt-1 leading-relaxed">Floor 1, MB3 Block, Raheja Mindspace, Hyderabad, Telangana</p>
                  </div>
                </li>
                <li className="flex items-start gap-2.5">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <div>
                    <strong className="text-foreground uppercase tracking-wider text-[10px]">Warangal Office</strong>
                    <p className="mt-1 leading-relaxed">H.No: 12-13, 1st Floor, Warangal, Telangana, 506002</p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="panel p-6 bg-surface">
              <h3 className="font-display text-base font-semibold">Direct engineering contact</h3>
              <ul className="mt-4 space-y-3.5 text-xs text-muted-foreground">
                <li className="flex items-center gap-2.5">
                  <Mail className="h-4 w-4 shrink-0 text-primary" />
                  <a href="mailto:Info@regalops.com" className="hover:text-foreground">
                    Info@regalops.com
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </Section>
    </SiteLayout>
  );
}
