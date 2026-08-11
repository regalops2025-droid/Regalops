import { createFileRoute } from "@tanstack/react-router";
import { Mail, MapPin, Phone } from "lucide-react";
import { useState } from "react";
import { SiteLayout, PageHero, Section } from "@/components/site/site-layout";

export const Route = createFileRoute("/contact")({
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
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      const response = await fetch("http://localhost:5001/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ fullName, email, company, phone, message }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to submit enquiry.");
      }

      setStatus("success");
      setFullName("");
      setEmail("");
      setCompany("");
      setPhone("");
      setMessage("");
    } catch (err: any) {
      console.error(err);
      setStatus("error");
      setErrorMsg(err.message || "An unexpected error occurred. Please try again.");
    }
  };

  return (
    <SiteLayout>
      <PageHero
        eyebrow="Contact us"
        title="Start with a technical conversation"
        description="No discovery-call funnel. Describe the problem and a senior engineer replies within one business day."
      />
      <Section>
        <div className="grid gap-8 lg:grid-cols-[1.2fr_minmax(0,1fr)]">
          <form className="panel p-6 sm:p-8" onSubmit={handleSubmit}>
            {status === "success" && (
              <div className="mb-6 rounded-xl bg-emerald-500/10 border border-emerald-500/30 p-4 text-sm text-emerald-600">
                Enquiry sent successfully! A senior engineer will review it and reply within one business day.
              </div>
            )}
            {status === "error" && (
              <div className="mb-6 rounded-xl bg-destructive/10 border border-destructive/30 p-4 text-sm text-destructive">
                {errorMsg}
              </div>
            )}
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="block text-sm font-medium">
                Full name
                <input
                  className={field}
                  placeholder="Priya Raman"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                  disabled={status === "loading"}
                />
              </label>
              <label className="block text-sm font-medium">
                Work email
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
              <label className="block text-sm font-medium">
                Company
                <input
                  className={field}
                  placeholder="Company Ltd"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  disabled={status === "loading"}
                />
              </label>
              <label className="block text-sm font-medium">
                Phone
                <input
                  className={field}
                  placeholder="+91 98000 00000"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  disabled={status === "loading"}
                />
              </label>
            </div>
            <label className="mt-5 block text-sm font-medium">
              What are you building?
              <textarea
                rows={5}
                className={field}
                placeholder="A short description of the system, timeline and constraints."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                disabled={status === "loading"}
              />
            </label>
            <button
              type="submit"
              disabled={status === "loading"}
              className="mt-6 w-full rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5 sm:w-auto disabled:opacity-50 disabled:hover:translate-y-0"
            >
              {status === "loading" ? "Sending..." : "Send enquiry"}
            </button>
          </form>

          <aside className="panel h-fit p-6 sm:p-8">
            <h2 className="text-lg font-semibold">Our Offices</h2>
            <div className="mt-5 space-y-4 text-xs text-muted-foreground">
              <div className="flex items-start gap-3">
                <MapPin className="mt-1 h-4 w-4 shrink-0 text-primary" />
                <div>
                  <p className="font-semibold text-foreground">Atlanta, USA</p>
                  <p className="mt-0.5">8 Chill Sean Street, Dunwoody, Atlanta, Georgia, USA</p>
                </div>
              </div>
              <div className="flex items-start gap-3 border-t border-border pt-3">
                <MapPin className="mt-1 h-4 w-4 shrink-0 text-primary" />
                <div>
                  <p className="font-semibold text-foreground">Hyderabad, India</p>
                  <p className="mt-0.5">Floor 1, MB3 Block, Raheja Mindspace, Hyderabad, Telangana</p>
                </div>
              </div>
              <div className="flex items-start gap-3 border-t border-border pt-3">
                <MapPin className="mt-1 h-4 w-4 shrink-0 text-primary" />
                <div>
                  <p className="font-semibold text-foreground">Warangal, India</p>
                  <p className="mt-0.5">H.No: 12-13, 1st Floor, Warangal, Telangana, 506002</p>
                </div>
              </div>
            </div>

            <div className="mt-6 border-t border-border pt-4 space-y-3 text-sm text-muted-foreground">
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 shrink-0 text-primary" />
                <a href="mailto:Info@regalops.com" className="hover:text-foreground">Info@regalops.com</a>
              </div>
            </div>

            <div className="mt-6 border-t border-border pt-4 text-xs text-muted-foreground">
              <p className="font-semibold text-foreground">Working Hours:</p>
              <p className="mt-1">IST: 9:00 AM – 6:00 PM</p>
              <p className="mt-0.5">USA EST: 9:00 AM – 6:00 PM</p>
              <p className="mt-1 text-[10px] text-muted-foreground/80">(Monday to Friday)</p>
            </div>
          </aside>
        </div>
      </Section>
    </SiteLayout>
  );
}
