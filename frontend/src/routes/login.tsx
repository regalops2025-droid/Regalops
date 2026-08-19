import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { SiteLayout } from "@/components/site/site-layout";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Client Login — Regal OPs Delivery Portal" },
      {
        name: "description",
        content:
          "Sign in to the Regal OPs client portal for delivery dashboards, runbooks and support tickets.",
      },
      { property: "og:title", content: "Regal OPs Client Login" },
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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5001/api/auth/me", { credentials: "include" })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error("Not logged in");
      })
      .then((data) => {
        localStorage.setItem("user", JSON.stringify(data.user));
        navigate({ to: "/admin" });
      })
      .catch(() => {
        localStorage.removeItem("user");
      });
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");
    setUser(null);

    try {
      const response = await fetch("http://localhost:5001/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Login failed.");
      }

      const data = await response.json();
      setStatus("success");
      setUser(data.user);
      localStorage.setItem("user", JSON.stringify(data.user));
      setEmail("");
      setPassword("");
      
      setTimeout(() => {
        navigate({ to: "/admin" });
      }, 1000);
    } catch (err: any) {
      console.error(err);
      setStatus("error");
      setErrorMsg(err.message || "An unexpected error occurred. Please try again.");
    }
  };

  return (
    <SiteLayout>
      <section className="hero-glow flex min-h-[70vh] items-center px-4 py-8 sm:px-6">
        <div className="panel mx-auto w-full max-w-md p-6 sm:p-8">
          <h1 className="text-2xl font-semibold">Client portal login</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Delivery dashboards, runbooks and support tickets in one place.
          </p>

          {status === "success" && (
            <div className="mt-6 rounded-xl bg-emerald-500/10 border border-emerald-500/30 p-4 text-sm text-emerald-600">
              Welcome back, <strong>{user?.name || "Client"}</strong>! You have successfully signed in.
            </div>
          )}

          {status !== "success" && (
            <form className="mt-7" onSubmit={handleSubmit}>
              {status === "error" && (
                <div className="mb-5 rounded-xl bg-destructive/10 border border-destructive/30 p-4 text-sm text-destructive">
                  {errorMsg}
                </div>
              )}
              <label className="block text-sm font-medium">
                Work email
                <input
                  type="email"
                  className={field}
                  placeholder="you@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={status === "loading"}
                />
              </label>
              <label className="mt-5 block text-sm font-medium">
                Password
                <input
                  type="password"
                  className={field}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={status === "loading"}
                />
              </label>
              <button
                type="submit"
                disabled={status === "loading"}
                className="mt-6 w-full rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5 disabled:opacity-50"
              >
                {status === "loading" ? "Signing in..." : "Sign in"}
              </button>
            </form>
          )}

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
