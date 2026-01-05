import React, { useRef, useEffect, useMemo } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MainBubbleBulge from "./MainBubbleBulge";

// ScrollTrigger should already be registered by parent component

/**
 * BubbleCluster - Renders a cluster of bubbles for a timeline category
 * Rebuilt from scratch using GSAP animations
 *
 * Layout:
 * - Main bubble (Picture_1) is centered and largest
 * - Smaller bubbles arranged in a deterministic radial pattern around it
 */
const BubbleCluster = ({ category, index, isMobile = false }) => {
  const clusterRef = useRef(null);
  const { label, images } = category;

  // Responsive sizes
  const mainSize = isMobile ? 100 : 140;
  const smallSize = isMobile ? 45 : 60;
  const clusterRadius = isMobile ? 85 : 120;

  // Find main image and supporting images
  const mainImage = images.find((img) => img.isMain) || images[0];
  const supportImages = images.filter((img) => !img.isMain).slice(0, 6);

  // Calculate deterministic positions for supporting bubbles
  // Uses radial layout with slight variation for visual interest
  const bubblePositions = useMemo(() => {
    const count = supportImages.length;
    if (count === 0) return [];

    return supportImages.map((_, i) => {
      // Golden angle distribution for natural-looking arrangement
      const goldenAngle = Math.PI * (3 - Math.sqrt(5));
      const angle = i * goldenAngle + Math.PI / 4; // Offset to avoid top position

      // Vary radius slightly based on index
      const radiusVariation = 1 + (i % 2) * 0.15;
      const r = clusterRadius * radiusVariation;

      // Calculate position
      const x = Math.cos(angle) * r;
      const y = Math.sin(angle) * r;

      // Vary size slightly
      const sizeVariation = 1 - (i % 3) * 0.1;
      const size = smallSize * sizeVariation;

      return { x, y, size, angle };
    });
  }, [supportImages, clusterRadius, smallSize]);

  // GSAP animations on mount and scroll
  useEffect(() => {
    if (!clusterRef.current) return;

    const cluster = clusterRef.current;
    const supportBubbles = cluster.querySelectorAll(".support-bubble");
    const mainBubble = cluster.querySelector(".main-bubble-wrapper");
    const label = cluster.querySelector(".cluster-label");

    // Set initial state
    gsap.set(supportBubbles, { opacity: 0, scale: 0 });
    gsap.set(mainBubble, { opacity: 0, scale: 0.8 });
    gsap.set(label, { opacity: 0, y: 10 });

    // Create timeline for entrance animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: cluster,
        start: "top 85%",
        toggleActions: "play none none none",
      },
    });

    // Animate main bubble
    if (mainBubble) {
      tl.to(mainBubble, {
        opacity: 1,
        scale: 1,
        duration: 0.6,
        ease: "back.out(1.7)",
      });
    }

    // Animate support bubbles with stagger
    if (supportBubbles.length > 0) {
      tl.to(
        supportBubbles,
        {
          opacity: 1,
          scale: 1,
          duration: 0.4,
          ease: "elastic.out(1, 0.5)",
          stagger: {
            amount: 0.3,
            from: "center",
          },
        },
        "-=0.3"
      );
    }

    // Animate label
    if (label) {
      tl.to(
        label,
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          ease: "power2.out",
        },
        "-=0.2"
      );
    }

    // Hover animations for support bubbles
    supportBubbles.forEach((bubble) => {
      bubble.addEventListener("mouseenter", () => {
        gsap.to(bubble, {
          scale: 1.15,
          zIndex: 10,
          duration: 0.3,
          ease: "power2.out",
        });
      });

      bubble.addEventListener("mouseleave", () => {
        gsap.to(bubble, {
          scale: 1,
          zIndex: 1,
          duration: 0.3,
          ease: "power2.out",
        });
      });
    });

    // Cleanup
    return () => {
      if (typeof ScrollTrigger !== "undefined") {
        ScrollTrigger.getAll().forEach((trigger) => {
          if (
            trigger.trigger === cluster ||
            trigger.vars?.trigger === cluster
          ) {
            trigger.kill();
          }
        });
      }
      if (tl) {
        tl.kill();
      }
    };
  }, [supportImages, mainImage]);

  return (
    <div
      ref={clusterRef}
      className="bubble-cluster"
      style={{
        "--main-size": `${mainSize}px`,
        "--cluster-width": `${clusterRadius * 2 + mainSize}px`,
      }}
    >
      {/* Cluster container */}
      <div className="bubble-cluster-content">
        {/* Supporting bubbles (rendered first, behind main) */}
        {supportImages.map((image, i) => {
          const pos = bubblePositions[i];
          if (!pos) return null;

          return (
            <div
              key={`support-${i}`}
              className="support-bubble"
              style={{
                "--x": `${pos.x}px`,
                "--y": `${pos.y}px`,
                "--size": `${pos.size}px`,
              }}
            >
              <img
                src={image.src}
                alt={`${label} - Image ${i + 2}`}
                draggable={false}
              />
            </div>
          );
        })}

        {/* Main bubble (rendered last, on top) */}
        {mainImage && (
          <div className="main-bubble-wrapper">
            <MainBubbleBulge
              src={mainImage.src}
              alt={`${label} - Main`}
              size={mainSize}
            />
          </div>
        )}
      </div>

      {/* Category label */}
      <div className="cluster-label">
        <span className="cluster-number">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="cluster-title">{label}</span>
      </div>

      <style>{`
        .bubble-cluster {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 20px;
          flex-shrink: 0;
          width: var(--cluster-width);
          min-width: 280px;
        }

        .bubble-cluster-content {
          position: relative;
          width: var(--cluster-width);
          height: var(--cluster-width);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .main-bubble-wrapper {
          position: relative;
          z-index: 5;
        }

        .support-bubble {
          position: absolute;
          left: 50%;
          top: 50%;
          width: var(--size);
          height: var(--size);
          transform: translate(calc(-50% + var(--x)), calc(-50% + var(--y)));
          border-radius: 50%;
          overflow: hidden;
          box-shadow: 
            0 2px 10px rgba(0, 0, 0, 0.1),
            0 0 0 2px rgba(255, 255, 255, 0.5);
          cursor: pointer;
          transition: box-shadow 0.2s ease;
          z-index: 1;
        }

        .support-bubble:hover {
          box-shadow: 
            0 4px 20px rgba(0, 0, 0, 0.2),
            0 0 0 3px rgba(59, 130, 246, 0.5);
        }

        .support-bubble img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 50%;
        }

        .cluster-label {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-top: 16px;
          text-align: center;
          gap: 4px;
        }

        .cluster-number {
          font-size: 12px;
          font-weight: 600;
          color: #3b82f6;
          letter-spacing: 0.1em;
        }

        .cluster-title {
          font-size: 14px;
          font-weight: 500;
          color: #334155;
          max-width: 180px;
          line-height: 1.3;
        }

        /* Dark mode */
        :root.dark .cluster-title,
        .dark .cluster-title {
          color: #e2e8f0;
        }

        :root.dark .support-bubble,
        .dark .support-bubble {
          box-shadow: 
            0 2px 10px rgba(0, 0, 0, 0.3),
            0 0 0 2px rgba(255, 255, 255, 0.2);
        }

        /* Mobile adjustments */
        @media (max-width: 768px) {
          .bubble-cluster {
            padding: 12px;
            min-width: 220px;
          }

          .cluster-title {
            font-size: 12px;
            max-width: 140px;
          }

          .cluster-number {
            font-size: 10px;
          }
        }
      `}</style>
    </div>
  );
};

export default BubbleCluster;
