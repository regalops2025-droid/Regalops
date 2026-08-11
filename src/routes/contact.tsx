import { createFileRoute } from "@tanstack/react-router";
import { Mail, MapPin, Phone } from "lucide-react";
import { SiteLayout, PageHero, Section } from "@/components/site/site-layout";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Nexora — Talk to a Senior Engineer" },
      {
        name: "description",
        content:
          "Reach the Nexora team in Chennai. Bring your architecture and get an honest technical assessment.",
      },
      { property: "og:title", content: "Contact Nexora" },
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
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Contact us"
        title="Start with a technical conversation"
        description="No discovery-call funnel. Describe the problem and a senior engineer replies within one business day."
      />
      <Section>
        <div className="grid gap-8 lg:grid-cols-[1.2fr_minmax(0,1fr)]">
          <form className="panel p-6 sm:p-8" onSubmit={(e) => e.preventDefault()}>
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="block text-sm font-medium">
                Full name
                <input className={field} placeholder="Priya Raman" required />
              </label>
              <label className="block text-sm font-medium">
                Work email
                <input type="email" className={field} placeholder="priya@company.com" required />
              </label>
              <label className="block text-sm font-medium">
                Company
                <input className={field} placeholder="Company Ltd" />
              </label>
              <label className="block text-sm font-medium">
                Phone
                <input className={field} placeholder="+91 98000 00000" />
              </label>
            </div>
            <label className="mt-5 block text-sm font-medium">
              What are you building?
              <textarea rows={5} className={field} placeholder="A short description of the system, timeline and constraints." />
            </label>
            <button
              type="submit"
              className="mt-6 w-full rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5 sm:w-auto"
            >
              Send enquiry
            </button>
          </form>

          <aside className="panel h-fit p-6 sm:p-8">
            <h2 className="text-lg font-semibold">Direct lines</h2>
            <ul className="mt-5 space-y-4 text-sm text-muted-foreground">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span>4th Floor, Tidel Park, Taramani, Chennai 600113, India</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 shrink-0 text-primary" />
                <a href="tel:+914400000000" className="hover:text-foreground">+91 44 0000 0000</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 shrink-0 text-primary" />
                <a href="mailto:hello@nexora.dev" className="hover:text-foreground">hello@nexora.dev</a>
              </li>
            </ul>
            <p className="mt-6 border-t border-border pt-6 text-xs text-muted-foreground">
              Monday to Friday, 09:00–19:00 IST. Existing clients use the 24/7
              support line in your runbook.
            </p>
          </aside>
        </div>
      </Section>
    </SiteLayout>
  );
}
