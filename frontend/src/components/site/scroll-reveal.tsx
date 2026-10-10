import { useEffect } from "react";

/**
 * Global Scroll Reveal Hook & Manager
 * Enables smooth viewport entrance transitions for cards and content
 * when scrolling both down and up.
 */
export function useScrollReveal() {
  useEffect(() => {
    // Only run in browser
    if (typeof window === "undefined" || !("IntersectionObserver" in window)) return;

    let observer: IntersectionObserver;

    const setupObserver = () => {
      if (observer) {
        observer.disconnect();
      }

      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            const el = entry.target as HTMLElement;
            if (entry.isIntersecting) {
              el.classList.add("is-revealed");
            } else {
              // Reset when element completely exits viewport (above or below)
              // so it smoothly re-animates when user scrolls back
              const rect = entry.boundingClientRect;
              if (rect.bottom < -20 || rect.top > window.innerHeight + 20) {
                el.classList.remove("is-revealed");
              }
            }
          });
        },
        {
          rootMargin: "0px 0px -40px 0px",
          threshold: 0.06,
        }
      );

      // Select all explicit reveal targets as well as cards
      const targets = document.querySelectorAll<HTMLElement>(
        ".reveal-on-scroll, .reveal-scale, .reveal-from-left, .reveal-from-right, [data-reveal]"
      );

      targets.forEach((el) => {
        // Immediately reveal if already visible in initial viewport to avoid initial flash
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          el.classList.add("is-revealed");
        }
        observer.observe(el);
      });
    };

    // Initial setup with small timeout to allow react tree to settle
    const timer = setTimeout(setupObserver, 50);

    // Re-observe when DOM mutates (e.g. data fetch loads new cards)
    const mutationObserver = new MutationObserver(() => {
      setupObserver();
    });

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      clearTimeout(timer);
      if (observer) observer.disconnect();
      mutationObserver.disconnect();
    };
  }, []);
}

export function ScrollRevealProvider() {
  useScrollReveal();
  return null;
}
