import React, { useRef, useCallback, useEffect } from "react";
import { gsap } from "gsap";

/**
 * MainBubbleBulge - Main bubble with mouse-following bulge/lens distortion effect
 * Enhanced with GSAP for smoother animations
 */
const MainBubbleBulge = ({ src, alt, size = 120, className = "" }) => {
  const containerRef = useRef(null);
  const imageRef = useRef(null);
  const overlayRef = useRef(null);
  const isHoveringRef = useRef(false);
  const animRef = useRef(null);

  const handleMouseMove = useCallback((e) => {
    if (!isHoveringRef.current || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    // Clamp values
    const clampedX = Math.max(0, Math.min(100, x));
    const clampedY = Math.max(0, Math.min(100, y));

    // Distance from center (0-1)
    const dx = (clampedX - 50) / 50;
    const dy = (clampedY - 50) / 50;
    const distance = Math.sqrt(dx * dx + dy * dy);

    // Intensity decreases slightly at edges
    const intensity = Math.max(0.6, 1 - distance * 0.4);

    // Use GSAP for smooth updates
    if (animRef.current) {
      animRef.current.kill();
    }

    animRef.current = gsap.to(containerRef.current, {
      duration: 0.1,
      "--bulge-x": `${clampedX}%`,
      "--bulge-y": `${clampedY}%`,
      "--bulge-intensity": intensity,
    });
  }, []);

  const handleMouseEnter = useCallback(() => {
    isHoveringRef.current = true;
    if (containerRef.current) {
      gsap.to(containerRef.current, {
        scale: 1.05,
        boxShadow:
          "0 8px 30px rgba(0, 0, 0, 0.2), 0 0 0 4px rgba(59, 130, 246, 0.5)",
        duration: 0.3,
        ease: "power2.out",
      });
      containerRef.current.classList.add("bulge-active");
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    isHoveringRef.current = false;

    if (animRef.current) {
      animRef.current.kill();
    }

    // Smoothly reset to center using GSAP
    gsap.to(containerRef.current, {
      "--bulge-x": "50%",
      "--bulge-y": "50%",
      "--bulge-intensity": 0,
      scale: 1,
      boxShadow:
        "0 4px 20px rgba(0, 0, 0, 0.15), 0 0 0 3px rgba(59, 130, 246, 0.3)",
      duration: 0.3,
      ease: "power2.out",
    });

    if (containerRef.current) {
      containerRef.current.classList.remove("bulge-active");
    }
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (animRef.current) {
        animRef.current.kill();
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`main-bubble-container ${className}`}
      style={{
        "--bulge-x": "50%",
        "--bulge-y": "50%",
        "--bulge-intensity": 0,
        "--bubble-size": `${size}px`,
        width: size,
        height: size,
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="main-bubble-inner">
        <img
          ref={imageRef}
          src={src}
          alt={alt}
          className="main-bubble-image"
          draggable={false}
        />
      </div>

      {/* Bulge overlay effect */}
      <div ref={overlayRef} className="main-bubble-bulge-overlay" />

      <style>{`
        .main-bubble-container {
          position: relative;
          border-radius: 50%;
          overflow: hidden;
          cursor: pointer;
          box-shadow: 
            0 4px 20px rgba(0, 0, 0, 0.15),
            0 0 0 3px rgba(59, 130, 246, 0.3);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .main-bubble-inner {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          overflow: hidden;
          position: relative;
        }

        .main-bubble-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 50%;
          transition: transform 0.15s ease-out;
        }

        .main-bubble-container.bulge-active .main-bubble-image {
          transform: scale(1.02);
        }

        .main-bubble-bulge-overlay {
          position: absolute;
          inset: 0;
          border-radius: 50%;
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.3s ease;
          background: radial-gradient(
            circle at var(--bulge-x) var(--bulge-y),
            rgba(255, 255, 255, 0.25) 0%,
            rgba(255, 255, 255, 0.1) 20%,
            transparent 50%
          );
        }

        .main-bubble-container.bulge-active .main-bubble-bulge-overlay {
          opacity: calc(var(--bulge-intensity) * 1);
        }

        /* Subtle lens distortion effect using filter */
        .main-bubble-container.bulge-active .main-bubble-inner {
          filter: contrast(1.02) brightness(1.02);
        }

        /* Inner highlight for 3D effect */
        .main-bubble-container::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 50%;
          background: radial-gradient(
            ellipse at 30% 20%,
            rgba(255, 255, 255, 0.3) 0%,
            transparent 50%
          );
          pointer-events: none;
          z-index: 2;
          opacity: 0.5;
        }

        /* Border glow */
        .main-bubble-container::after {
          content: '';
          position: absolute;
          inset: -2px;
          border-radius: 50%;
          background: linear-gradient(
            135deg,
            rgba(59, 130, 246, 0.4),
            rgba(147, 51, 234, 0.4)
          );
          z-index: -1;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .main-bubble-container:hover::after {
          opacity: 1;
        }
      `}</style>
    </div>
  );
};

export default MainBubbleBulge;
