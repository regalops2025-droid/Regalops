import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Mail, Lock, Eye, EyeOff, ShieldCheck, ArrowRight, CheckCircle2, LockKeyhole } from "lucide-react";
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

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/api/auth/me", { credentials: "include" })
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
      const response = await fetch("/api/login", {
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
    <SiteLayout hideFooter noScroll hideStickyActions>
      <section className="hero-glow flex-1 min-h-0 w-full flex items-center justify-center py-4 sm:py-6 lg:py-4 px-4 sm:px-6 lg:px-8 overflow-y-visible lg:overflow-hidden">
        <div className="w-full max-w-[1440px] mx-auto overflow-hidden rounded-3xl border border-border/80 bg-surface shadow-2xl grid grid-cols-1 lg:grid-cols-12 items-stretch my-2 lg:my-0 lg:max-h-[calc(100dvh-120px)]">
          
          {/* LEFT SIDE: Visual Showcase Image Card */}
          <div className="lg:col-span-6 relative overflow-hidden bg-neutral-950 text-white flex flex-col justify-between p-5 sm:p-7 xl:p-9 space-y-4">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
              <img
                src="/hero-slide-cyber.jpg"
                alt="Regal OPs Secure Data Network"
                className="h-full w-full object-cover object-center scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/85 to-neutral-950/40" />
              <div className="absolute inset-0 bg-[#07192F]/60 mix-blend-multiply" />
            </div>

            {/* Top Badge & Header */}
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/15 px-3 py-0.5 backdrop-blur-md mb-2 sm:mb-2.5">
                <span className="h-2 w-2 rounded-full bg-[#a4c965] animate-pulse" />
                <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.2em] text-[#a4c965]">
                  Secure Gateway
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl xl:text-3xl font-extrabold text-white tracking-tight leading-tight">
                Client Delivery <br />
                <span className="text-[#a4c965]">& Architecture Portal</span>
              </h2>
              <p className="mt-1.5 sm:mt-2 text-xs sm:text-sm text-neutral-300 leading-relaxed max-w-lg">
                Direct access to your real-time delivery dashboards, sprint velocity, infrastructure runbooks, and 24/7 dedicated engineering support tickets.
              </p>
            </div>

            {/* Bottom Trust & Feature Card */}
            <div className="relative z-10 pt-3 border-t border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-2">
              <div className="flex items-center gap-2 text-xs text-neutral-200">
                <ShieldCheck className="h-4 w-4 text-[#a4c965] shrink-0" />
                <span className="text-[11px] leading-tight">256-Bit AES Encryption</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-neutral-200">
                <CheckCircle2 className="h-4 w-4 text-[#a4c965] shrink-0" />
                <span className="text-[11px] leading-tight">Zero-Trust Access</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-neutral-200">
                <LockKeyhole className="h-4 w-4 text-[#a4c965] shrink-0" />
                <span className="text-[11px] leading-tight">SOC 2 Type II Certified</span>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE: Login Form */}
          <div className="lg:col-span-6 p-5 sm:p-7 xl:p-9 flex flex-col justify-center bg-card">
            <div className="w-full max-w-lg mx-auto">
              <div className="mb-3 sm:mb-4">
                <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.18em] text-primary">
                  Regal OPs Portal
                </span>
                <h1 className="mt-0.5 text-xl sm:text-2xl xl:text-3xl font-bold tracking-tight text-foreground">
                  Client portal login
                </h1>
                <p className="mt-1 text-xs sm:text-sm text-muted-foreground">
                  Delivery dashboards, runbooks and support tickets in one place.
                </p>
              </div>

              {status === "success" && (
                <div className="mb-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 p-3 text-sm text-emerald-600 flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 shrink-0" />
                  <div>
                    Welcome back, <strong>{user?.name || "Client"}</strong>! Signing in to your portal...
                  </div>
                </div>
              )}

              {status !== "success" && (
                <form className="space-y-3" onSubmit={handleSubmit}>
                  {status === "error" && (
                    <div className="rounded-xl bg-destructive/10 border border-destructive/30 p-2.5 text-xs sm:text-sm text-destructive">
                      {errorMsg}
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-semibold text-foreground mb-1">
                      Work email
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted-foreground">
                        <Mail className="h-4 w-4" />
                      </div>
                      <input
                        type="email"
                        className="w-full rounded-xl border border-input bg-background pl-9 pr-3 py-2 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary/20"
                        placeholder="you@company.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        disabled={status === "loading"}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-foreground mb-1">
                      Password
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted-foreground">
                        <Lock className="h-4 w-4" />
                      </div>
                      <input
                        type={showPassword ? "text" : "password"}
                        className="w-full rounded-xl border border-input bg-background pl-9 pr-9 py-2 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary/20"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        disabled={status === "loading"}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword((prev) => !prev)}
                        className="absolute inset-y-0 right-0 pr-2.5 flex items-center text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                        title={showPassword ? "Hide password" : "Show password"}
                        aria-label={showPassword ? "Hide password" : "Show password"}
                      >
                        <span className="p-1 rounded-lg hover:bg-muted/80 flex items-center justify-center transition-colors">
                          {showPassword ? (
                            <EyeOff className="h-4 w-4 text-primary" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </span>
                      </button>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="w-full rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/20 disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2 mt-3.5"
                  >
                    {status === "loading" ? (
                      "Signing in..."
                    ) : (
                      <>
                        <span>Sign in</span>
                        <ArrowRight className="h-4 w-4" />
                      </>
                    )}
                  </button>
                </form>
              )}

              <div className="mt-3.5 pt-3 border-t border-border/60 text-center">
                <p className="text-xs text-muted-foreground">
                  Need access?{" "}
                  <Link to="/contact" className="font-semibold text-primary hover:underline">
                    Contact your delivery lead
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
