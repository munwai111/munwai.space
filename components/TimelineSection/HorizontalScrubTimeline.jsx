import React, { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import BubbleCluster from "./BubbleCluster";
import useReducedMotion from "./useReducedMotion";

// Register GSAP ScrollTrigger plugin once at module level
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * HorizontalScrubTimeline - Scroll-driven horizontal timeline using GSAP
 * Using standard GSAP ScrollTrigger patterns with gsap.context() for React
 * Includes image preloading and delayed initialization for smooth animations
 */
const HorizontalScrubTimeline = ({ categories, isMobile = false }) => {
  const containerRef = useRef(null);
  const viewportRef = useRef(null);
  const trackRef = useRef(null);
  const progressRef = useRef(null);
  const hintRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();
  const [imagesLoaded, setImagesLoaded] = useState(false);

  const navHeight = isMobile ? 56 : 60;

  // Preload images before initializing animations
  useEffect(() => {
    if (!categories || categories.length === 0) return;

    const imageUrls = [];
    categories.forEach((category) => {
      category.images?.forEach((img) => {
        if (img.src) imageUrls.push(img.src);
      });
    });

    if (imageUrls.length === 0) {
      setImagesLoaded(true);
      return;
    }

    let loadedCount = 0;
    const totalImages = imageUrls.length;

    const checkAllLoaded = () => {
      loadedCount++;
      if (loadedCount >= totalImages) {
        // Small delay to ensure DOM is ready after images load
        setTimeout(() => setImagesLoaded(true), 200);
      }
    };

    imageUrls.forEach((src) => {
      const img = new Image();
      img.onload = checkAllLoaded;
      img.onerror = checkAllLoaded; // Continue even if some images fail
      img.src = src;
    });

    // Timeout fallback - proceed after 2 seconds even if images aren't all loaded
    const timeoutFallback = setTimeout(() => {
      setImagesLoaded(true);
    }, 2000);

    return () => {
      clearTimeout(timeoutFallback);
    };
  }, [categories]);

  useEffect(() => {
    if (!imagesLoaded) return; // Wait for images to load
    if (!containerRef.current || !trackRef.current || !viewportRef.current)
      return;

    const container = containerRef.current;
    const track = trackRef.current;
    const viewport = viewportRef.current;
    const progressBar = progressRef.current;
    const hint = hintRef.current;

    // Use gsap.context() for proper cleanup in React
    let ctx;

    // Initialize after a brief delay to ensure DOM is ready
    const initTimer = setTimeout(() => {
      ctx = gsap.context(() => {
        // Calculate track width
        const trackWidth = track.scrollWidth;
        const viewportWidth = window.innerWidth;
        const maxTranslateX = Math.max(0, trackWidth - viewportWidth + 60);

        // Calculate scroll height based on track width for smooth scrubbing
        // Multiply by a factor to ensure enough scroll distance
        let scrollHeight = Math.max(
          maxTranslateX * 1.5, // Ensure enough scroll distance
          isMobile ? 2500 : 3000 // Minimum scroll height
        );

        // Adjust height to match desired value (7885px for desktop)
        if (!isMobile && scrollHeight < 7885) {
          scrollHeight = 7885;
        }

        // Update container height
        container.style.height = `${scrollHeight}px`;

        // Set initial state - start from the left (x: 0) so timeline begins at "Journey Begins"
        gsap.set(track, { x: 0, opacity: 0 });
        if (progressBar) gsap.set(progressBar, { scaleX: 0 });
        if (hint) gsap.set(hint, { opacity: 1 });

        // Fade in the track smoothly
        gsap.to(track, {
          opacity: 1,
          duration: 0.5,
          ease: "power2.out",
        });

        // Standard GSAP pattern: Single timeline with ScrollTrigger
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: container,
            start: `top top`,
            end: `+=${scrollHeight}`,
            scrub: 1,
            pin: viewport,
            pinSpacing: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onEnter: () => {
              // Position viewport below nav when pinning starts and set z-index
              if (viewport) {
                gsap.set(viewport, { top: `${navHeight}px`, zIndex: 10 });
              }
              if (container) {
                gsap.set(container, { zIndex: 10 });
              }
            },
            onEnterBack: () => {
              // Position viewport below nav when scrolling back and set z-index
              if (viewport) {
                gsap.set(viewport, { top: `${navHeight}px`, zIndex: 10 });
                // Fade back in when scrolling back into timeline
                gsap.to(viewport, {
                  opacity: 1,
                  duration: 0.6,
                  ease: "power2.out",
                });
              }
              if (container) {
                gsap.set(container, { zIndex: 10 });
              }
            },
            onLeave: () => {
              // Reset z-index when timeline finishes - ensure it's below other content
              if (viewport) {
                viewport.style.zIndex = "";
                // Fade out the timeline viewport smoothly as it exits
                gsap.to(viewport, {
                  opacity: 0.3,
                  duration: 0.8,
                  ease: "power2.out",
                });
              }
              if (container) {
                container.style.zIndex = "";
              }
            },
            onLeaveBack: () => {
              // Reset z-index when scrolling back before timeline
              if (viewport) {
                viewport.style.zIndex = "";
              }
              if (container) {
                container.style.zIndex = "";
              }
            },
          },
        });

        // Add animations to timeline - animate from left (0) to right (-maxTranslateX)
        tl.to(track, {
          x: -maxTranslateX,
          ease: "none",
        });

        if (progressBar) {
          tl.to(
            progressBar,
            {
              scaleX: 1,
              ease: "none",
            },
            0
          );
        }

        if (hint) {
          tl.to(
            hint,
            {
              opacity: 0,
              ease: "power1.inOut",
              duration: 0.1,
            },
            0
          );
        }

        // Header entrance animation - add to context so it gets cleaned up
        const header = viewport.querySelector(".timeline-header");
        if (header) {
          gsap.from(header, {
            y: -30,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: container,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          });
        }
      }, container);

      // Refresh ScrollTrigger after initialization
      ScrollTrigger.refresh();
    }, 150);

    // Handle resize with debouncing
    let resizeTimer;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 150);
    };

    window.addEventListener("resize", handleResize, { passive: true });

    // Cleanup
    return () => {
      clearTimeout(initTimer);
      clearTimeout(resizeTimer);
      window.removeEventListener("resize", handleResize);
      if (ctx) {
        ctx.revert();
      }
    };
  }, [categories, navHeight, imagesLoaded]);

  // Reduced motion - simple horizontal scroll
  if (prefersReducedMotion) {
    return (
      <div
        className="bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800"
        style={{
          padding: "40px 0",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: 20 }}>
          <h2
            className="text-slate-800 dark:text-white"
            style={{ fontSize: "1.75rem", fontWeight: 700 }}
          >
            Learning Journey
          </h2>
          <p className="text-slate-600 dark:text-slate-300">
            A visual chronicle of growth, experiences, and milestones
          </p>
        </div>
        <div
          style={{
            display: "flex",
            gap: 20,
            padding: "0 40px",
            overflowX: "auto",
          }}
        >
          {categories.map((category, index) => (
            <BubbleCluster
              key={category.key}
              category={category}
              index={index}
              isMobile={isMobile}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="relative"
      style={{
        height: "3000px",
        marginTop: `${navHeight}px`,
      }}
    >
      <div
        ref={viewportRef}
        className="timeline-viewport"
        style={{
          position: "relative",
          height: `calc(100vh - ${navHeight}px)`,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          zIndex: 10,
        }}
        data-nav-height={navHeight}
      >
        {/* Header */}
        <div
          className="timeline-header"
          style={{
            textAlign: "center",
            padding: "12px 20px 4px",
            flexShrink: 0,
          }}
        >
          <h2
            className="text-slate-800 dark:text-white"
            style={{
              fontSize: isMobile ? "1.2rem" : "1.5rem",
              fontWeight: 700,
              marginBottom: 2,
            }}
          >
            Learning Journey
          </h2>
          <p
            className="text-slate-600 dark:text-slate-300"
            style={{
              fontSize: isMobile ? "0.75rem" : "0.85rem",
              margin: 0,
            }}
          >
            A visual chronicle of growth, experiences, and milestones
          </p>
        </div>

        {/* Progress bar */}
        <div
          style={{
            height: 3,
            background: "rgba(148, 163, 184, 0.2)",
            margin: isMobile ? "0 16px 4px" : "0 24px 6px",
            borderRadius: 2,
            overflow: "hidden",
          }}
        >
          <div
            ref={progressRef}
            style={{
              height: "100%",
              background: "linear-gradient(90deg, #3b82f6, #8b5cf6)",
              transformOrigin: "left",
              transform: "scaleX(0)",
            }}
          />
        </div>

        {/* Track */}
        <div
          ref={trackRef}
          style={{
            display: "flex",
            alignItems: "center",
            gap: isMobile ? 12 : 20,
            padding: isMobile ? "8px 20px" : "10px 40px",
            flex: 1,
            willChange: "transform",
            justifyContent: "flex-start",
          }}
        >
          {/* Start marker */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 6,
              flexShrink: 0,
            }}
          >
            <div
              style={{
                width: isMobile ? 38 : 46,
                height: isMobile ? 38 : 46,
                borderRadius: "50%",
                background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: isMobile ? 15 : 18,
                boxShadow: "0 2px 10px rgba(59, 130, 246, 0.2)",
              }}
            >
              🚀
            </div>
            <span
              className="text-slate-700 dark:text-slate-300"
              style={{
                fontSize: isMobile ? 9 : 11,
                fontWeight: 600,
              }}
            >
              Journey Begins
            </span>
          </div>

          {/* Categories */}
          {categories.map((category, index) => (
            <BubbleCluster
              key={category.key}
              category={category}
              index={index}
              isMobile={isMobile}
            />
          ))}

          {/* End marker */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 6,
              flexShrink: 0,
            }}
          >
            <div
              style={{
                width: isMobile ? 38 : 46,
                height: isMobile ? 38 : 46,
                borderRadius: "50%",
                background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: isMobile ? 15 : 18,
                boxShadow: "0 2px 10px rgba(59, 130, 246, 0.2)",
              }}
            >
              🎯
            </div>
            <span
              className="text-slate-700 dark:text-slate-300"
              style={{
                fontSize: isMobile ? 9 : 11,
                fontWeight: 600,
              }}
            >
              Present Day
            </span>
          </div>
        </div>

        {/* Scroll hint */}
        <div
          ref={hintRef}
          className="text-slate-600 dark:text-slate-400"
          style={{
            position: "absolute",
            bottom: isMobile ? 10 : 16,
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 2,
            fontSize: isMobile ? 9 : 11,
            opacity: 1,
          }}
        >
          <span>Scroll to explore</span>
          <span style={{ animation: "bounce 1s infinite" }}>↓</span>
        </div>
      </div>

      <style>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(4px); }
        }
        .timeline-viewport {
          background: linear-gradient(135deg, 
            #f8fafc 0%, 
            #f1f5f9 25%, 
            #e2e8f0 50%, 
            #dbeafe 75%, 
            #dbeafe 100%
          ) !important;
        }
        .dark .timeline-viewport {
          background: linear-gradient(135deg, 
            #0f172a 0%, 
            #1e293b 25%, 
            #1e293b 50%, 
            #1e3a8a 75%, 
            #1e3a8a 100%
          ) !important;
        }
      `}</style>
    </div>
  );
};

export default HorizontalScrubTimeline;
