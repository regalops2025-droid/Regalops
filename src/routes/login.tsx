import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/site-layout";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Client Login — Nexora Delivery Portal" },
      {
        name: "description",
        content:
          "Sign in to the Nexora client portal for delivery dashboards, runbooks and support tickets.",
      },
      { property: "og:title", content: "Nexora Client Login" },
      {
        property: "og:description",
        content: "Access delivery dashboards, runbooks and support tickets.",
      },
    ],
  }),
  component: Login,
});

const field =
  "mt-1.5 w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-primary";

function Login() {
  return (
    <SiteLayout>
      <section className="hero-glow flex min-h-[70vh] items-center px-4 py-16 sm:px-6">
        <div className="panel mx-auto w-full max-w-md p-6 sm:p-8">
          <h1 className="text-2xl font-semibold">Client portal login</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Delivery dashboards, runbooks and support tickets in one place.
          </p>
          <form className="mt-7" onSubmit={(e) => e.preventDefault()}>
            <label className="block text-sm font-medium">
              Work email
              <input type="email" className={field} placeholder="you@company.com" required />
            </label>
            <label className="mt-5 block text-sm font-medium">
              Password
              <input type="password" className={field} placeholder="••••••••" required />
            </label>
            <button
              type="submit"
              className="mt-6 w-full rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5"
            >
              Sign in
            </button>
          </form>
          <p className="mt-6 text-center text-xs text-muted-foreground">
            Need access?{" "}
            <Link to="/contact" className="font-semibold text-primary">
              Contact your delivery lead
            </Link>
          </p>
        </div>
      </section>
    </SiteLayout>
  );
}
