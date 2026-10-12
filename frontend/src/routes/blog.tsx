import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { ArrowLeft, Calendar, User, Tag, BookOpen } from "lucide-react";
import { SiteLayout, PageHero, Section } from "@/components/site/site-layout";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Blog — Engineering Notes from the Regal OPs Team" },
      {
        name: "description",
        content:
          "Field notes on cloud architecture, data platforms, AI delivery and production reliability from Regal OPs engineers.",
      },
      { property: "og:title", content: "Regal OPs Engineering Blog" },
      {
        property: "og:description",
        content: "Field notes on cloud, data, AI and production reliability.",
      },
    ],
  }),
  component: Blog,
});

/**
 * Normalizes image paths to prevent localhost dev server leaks or missing slashes.
 */
function normalizeImageUrl(url?: string | null): string {
  if (!url || typeof url !== "string") return "";
  const trimmed = url.trim();
  if (!trimmed) return "";

  // Strip accidental localhost / internal port prefixes
  if (trimmed.startsWith("http://localhost:5001") || trimmed.startsWith("http://127.0.0.1:5001")) {
    return trimmed.replace(/^http:\/\/(localhost|127\.0\.0\.1):5001/, "");
  }
  if (trimmed.startsWith("http://localhost:3000") || trimmed.startsWith("http://127.0.0.1:3000")) {
    return trimmed.replace(/^http:\/\/(localhost|127\.0\.0\.1):3000/, "");
  }

  // Prepend slash to relative upload paths
  if (!trimmed.startsWith("http://") && !trimmed.startsWith("https://") && !trimmed.startsWith("data:") && !trimmed.startsWith("/")) {
    return `/${trimmed}`;
  }

  return trimmed;
}

/**
 * Provides a category-tailored, high-resolution enterprise banner fallback.
 */
function getFallbackBlogImage(tag?: string): string {
  const t = (tag || "").toLowerCase();
  if (t.includes("arch") || t.includes("system") || t.includes("enterp")) {
    return "/solutions-strategy.jpg";
  }
  if (t.includes("ai") || t.includes("data") || t.includes("intel") || t.includes("ml")) {
    return "/hero-slide-ai.jpg";
  }
  if (t.includes("cyber") || t.includes("secur") || t.includes("trust")) {
    return "/hero-slide-cyber.jpg";
  }
  if (t.includes("cloud") || t.includes("infra") || t.includes("devops") || t.includes("plat")) {
    return "/solutions-app-dev.jpg";
  }
  if (t.includes("qa") || t.includes("test") || t.includes("qual")) {
    return "/solutions-qa.jpg";
  }
  return "/solutions-strategy.jpg";
}

/**
 * Resilient, fast-loading image component with automatic skeleton placeholder,
 * non-blocking async decoding, and graceful instant fallback on error.
 */
function BlogImage({
  src,
  alt,
  tag,
  className,
  containerClassName,
  objectFit = "cover",
}: {
  src?: string | null;
  alt: string;
  tag?: string;
  className?: string;
  containerClassName?: string;
  objectFit?: "cover" | "contain";
}) {
  const fallback = getFallbackBlogImage(tag);
  const normalized = normalizeImageUrl(src);
  const [currentSrc, setCurrentSrc] = useState<string>(normalized || fallback);
  const [loaded, setLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const nextUrl = normalizeImageUrl(src) || fallback;
    setCurrentSrc(nextUrl);
    setLoaded(false);
    setHasError(false);
  }, [src, fallback]);

  const handleError = () => {
    if (!hasError && currentSrc !== fallback) {
      setHasError(true);
      setCurrentSrc(fallback);
    }
  };

  return (
    <div className={cn("relative w-full h-full overflow-hidden bg-surface-2/60", containerClassName)}>
      {/* Shimmer skeleton while loading */}
      {!loaded && (
        <div className="absolute inset-0 bg-gradient-to-r from-surface-2 via-secondary/50 to-surface-2 animate-pulse z-0" />
      )}

      <img
        src={currentSrc}
        alt={alt}
        loading="lazy"
        decoding="async"
        onLoad={() => setLoaded(true)}
        onError={handleError}
        className={cn(
          "w-full h-full transition-all duration-500",
          objectFit === "contain" ? "object-contain" : "object-cover object-center",
          loaded ? "opacity-100" : "opacity-0",
          className
        )}
      />
    </div>
  );
}

function Blog() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPost, setSelectedPost] = useState<any | null>(null);

  useEffect(() => {
    fetch("/api/blogs")
      .then((res) => res.json())
      .then((data) => {
        setPosts(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load blog posts", err);
        setLoading(false);
      });
  }, []);

  // Back to list handler
  const handleBackToList = () => {
    setSelectedPost(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Select post handler
  const handleSelectPost = (post: any) => {
    setSelectedPost(post);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <SiteLayout>
      {selectedPost ? (
        // Detailed Post View
        <div>
          <div className="relative border-b border-border bg-surface py-2.5">
            <Section className="py-1">
              <button
                onClick={handleBackToList}
                className="inline-flex items-center gap-2 rounded-xl border border-border bg-background px-4 py-1.5 text-sm font-semibold text-foreground transition-all hover:bg-secondary cursor-pointer"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Articles
              </button>
            </Section>
          </div>

          <Section className="py-5 max-w-3xl">
            {/* Header / Meta */}
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 font-semibold text-primary uppercase tracking-wider">
                  <Tag className="h-3.5 w-3.5" />
                  {selectedPost.tag}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5" />
                  {new Date(selectedPost.created_at || Date.now()).toLocaleDateString(undefined, {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
                <span className="flex items-center gap-1">
                  <User className="h-3.5 w-3.5" />
                  Regal OPs Engineers
                </span>
              </div>
              <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl leading-tight">
                {selectedPost.title}
              </h1>
              <p className="text-lg leading-relaxed text-muted-foreground border-l-4 border-primary pl-4 py-1 italic bg-secondary/20 rounded-r-xl">
                {selectedPost.description}
              </p>
            </div>

            {/* Main Cover Image */}
            <div className="mt-4 rounded-2xl overflow-hidden border border-border/80 shadow-lg bg-surface-2/40 flex items-center justify-center">
              <BlogImage
                src={selectedPost.image}
                alt={selectedPost.title}
                tag={selectedPost.tag}
                objectFit="contain"
                containerClassName="max-h-[580px] min-h-[260px]"
                className="rounded-2xl"
              />
            </div>

            {/* Structured Content Sections */}
            <div className="mt-5 space-y-4">
              {(() => {
                try {
                  const sections = typeof selectedPost.content === "string"
                    ? JSON.parse(selectedPost.content)
                    : selectedPost.content;

                  if (!Array.isArray(sections)) {
                    return <p className="text-muted-foreground whitespace-pre-wrap">{selectedPost.content}</p>;
                  }

                  return sections.map((sec: any, index: number) => (
                    <div key={index} className="space-y-3 border-t border-border/40 pt-4 first:border-0 first:pt-0">
                      {sec.heading && (
                        <h2 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl mt-6">
                          {sec.heading}
                        </h2>
                      )}

                      {sec.image && (
                        <div className="rounded-2xl overflow-hidden border border-border/80 my-6 bg-surface-2/40 shadow-sm flex items-center justify-center">
                          <BlogImage
                            src={sec.image}
                            alt={sec.heading || "Illustration"}
                            tag={selectedPost.tag}
                            objectFit="contain"
                            containerClassName="max-h-[520px] min-h-[220px]"
                            className="rounded-2xl"
                          />
                        </div>
                      )}

                      {sec.story && (
                        <p className="text-base leading-relaxed text-muted-foreground whitespace-pre-wrap">
                          {sec.story}
                        </p>
                      )}
                    </div>
                  ));
                } catch (e) {
                  return <p className="text-muted-foreground whitespace-pre-wrap">{selectedPost.content}</p>;
                }
              })()}
            </div>
          </Section>
        </div>
      ) : (
        // Grid List View
        <div>
          <PageHero
            eyebrow="Blog"
            title="Engineering notes, no marketing filler"
            description="Written by the people on call. Practical lessons from production systems in regulated industries."
            containerClassName="w-full max-w-[1720px] px-4 sm:px-6 lg:px-8 xl:px-12"
          />
          <Section className="w-full max-w-[1720px] px-4 sm:px-6 lg:px-8 xl:px-12 py-6 sm:py-8">
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 lg:gap-6 animate-pulse">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="panel h-80 bg-surface-2 border border-border/50 rounded-2xl"></div>
                ))}
              </div>
            ) : posts.length === 0 ? (
              <div className="panel p-12 text-center border border-dashed border-border/80 rounded-2xl flex flex-col items-center justify-center">
                <div className="rounded-full bg-secondary p-3 text-muted-foreground">
                  <BookOpen className="h-8 w-8 text-primary" />
                </div>
                <h3 className="mt-4 text-base font-semibold text-foreground">No articles published yet</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Check back soon for insights from our engineering teams.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 lg:gap-6">
                {posts.map((p) => (
                  <article
                    key={p.id}
                    className="panel overflow-hidden border border-border/85 hover:border-primary/50 transition-all duration-300 flex flex-col justify-between rounded-2xl bg-surface group shadow-sm hover:shadow-md hover:-translate-y-0.5"
                  >
                    <div>
                      {/* Robust Blog Card Header Image with Fast Skeleton & Error Fallback */}
                      <div className="aspect-[16/10] w-full overflow-hidden border-b border-border/80 bg-slate-900/10 relative">
                        <BlogImage
                          src={p.image}
                          alt={p.title}
                          tag={p.tag}
                          className="group-hover:scale-105"
                        />
                      </div>

                      <div className="p-5">
                        <div className="flex flex-wrap items-center gap-2.5 text-xs text-muted-foreground">
                          <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-[11px] font-semibold text-primary uppercase tracking-wider">
                            {p.tag}
                          </span>
                          <span className="text-[11px]">
                            {new Date(p.created_at || Date.now()).toLocaleDateString(undefined, {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </span>
                        </div>
                        <h2 className="mt-3 text-base font-bold sm:text-lg text-foreground leading-snug group-hover:text-primary transition-colors line-clamp-2">
                          {p.title}
                        </h2>
                        <p className="mt-2 text-xs sm:text-sm leading-relaxed text-muted-foreground line-clamp-3">
                          {p.description}
                        </p>
                      </div>
                    </div>
                    <div className="p-5 pt-0 flex items-center justify-between border-t border-border/40 mt-3">
                      <span className="text-[11px] text-muted-foreground font-medium">Regal OPs</span>
                      <button
                        onClick={() => handleSelectPost(p)}
                        className="inline-flex items-center gap-1 rounded-xl border border-border bg-background px-3.5 py-1.5 text-xs font-semibold text-foreground transition-all hover:border-primary hover:text-primary hover:bg-primary/5 cursor-pointer"
                      >
                        Read more &gt;
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </Section>
        </div>
      )}
    </SiteLayout>
  );
}
