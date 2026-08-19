import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { ArrowLeft, Calendar, User, Tag, BookOpen } from "lucide-react";
import { SiteLayout, PageHero, Section } from "@/components/site/site-layout";

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

function Blog() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPost, setSelectedPost] = useState<any | null>(null);

  useEffect(() => {
    fetch("http://localhost:5001/api/blogs")
      .then((res) => res.json())
      .then((data) => {
        setPosts(data);
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
          <div className="relative border-b border-border bg-surface py-6">
            <Section className="py-2">
              <button
                onClick={handleBackToList}
                className="inline-flex items-center gap-2 rounded-xl border border-border bg-background px-4 py-2 text-sm font-semibold text-foreground transition-all hover:bg-secondary cursor-pointer"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Articles
              </button>
            </Section>
          </div>

          <Section className="py-8 max-w-3xl">
            {/* Header / Meta */}
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 font-semibold text-primary uppercase tracking-wider">
                  <Tag className="h-3.5 w-3.5" />
                  {selectedPost.tag}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5" />
                  {new Date(selectedPost.created_at).toLocaleDateString(undefined, {
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
            {selectedPost.image && (
              <div className="mt-8 rounded-2xl overflow-hidden border border-border/80 shadow-lg">
                <img
                  src={selectedPost.image}
                  alt={selectedPost.title}
                  className="w-full h-72 sm:h-96 object-cover"
                />
              </div>
            )}

            {/* Structured Content Sections */}
            <div className="mt-10 space-y-8">
              {(() => {
                try {
                  const sections = typeof selectedPost.content === "string" 
                    ? JSON.parse(selectedPost.content) 
                    : selectedPost.content;
                  
                  return sections.map((sec: any, index: number) => (
                    <div key={index} className="space-y-4 border-t border-border/40 pt-8 first:border-0 first:pt-0">
                      {sec.heading && (
                        <h2 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl mt-6">
                          {sec.heading}
                        </h2>
                      )}
                      
                      {sec.image && (
                        <div className="rounded-2xl overflow-hidden border border-border/70 my-6 max-h-[350px]">
                          <img
                            src={sec.image}
                            alt={sec.heading || "Illustration"}
                            className="w-full h-full object-cover"
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
                  return <p className="text-muted-foreground">{selectedPost.content}</p>;
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
          />
          <Section>
            {loading ? (
              <div className="grid gap-6 sm:grid-cols-2 animate-pulse">
                {[1, 2].map((i) => (
                  <div key={i} className="panel h-64 bg-surface-2 border border-border/50 rounded-2xl"></div>
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
              <div className="grid gap-6 sm:grid-cols-2">
                {posts.map((p) => (
                  <article
                    key={p.id}
                    className="panel overflow-hidden border border-border/85 hover:border-primary/45 transition-all duration-300 flex flex-col justify-between rounded-2xl bg-surface group"
                  >
                    <div>
                      {p.image && (
                        <div className="h-48 overflow-hidden border-b border-border/80">
                          <img
                            src={p.image}
                            alt={p.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103"
                          />
                        </div>
                      )}
                      <div className="p-6">
                        <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                          <span className="rounded-full bg-primary/10 px-3 py-1 font-semibold text-primary uppercase tracking-wider">
                            {p.tag}
                          </span>
                          <span>
                            {new Date(p.created_at).toLocaleDateString(undefined, {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </span>
                        </div>
                        <h2 className="mt-4 text-lg font-semibold sm:text-xl text-foreground leading-snug group-hover:text-primary transition-colors">
                          {p.title}
                        </h2>
                        <p className="mt-3 text-sm leading-relaxed text-muted-foreground line-clamp-3">
                          {p.description}
                        </p>
                      </div>
                    </div>
                    <div className="p-6 pt-0 flex justify-end">
                      <button
                        onClick={() => handleSelectPost(p)}
                        className="inline-flex items-center gap-1 rounded-xl border border-border bg-background px-4 py-2 text-xs font-semibold text-foreground transition-all hover:border-primary hover:text-primary cursor-pointer"
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
