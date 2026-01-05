import React, { useRef, useEffect, useState } from "react";

// Add this helper function at the top-level (outside the component)
function lerpColor(a, b, t) {
  // a, b: hex strings "#RRGGBB"
  // t: 0..1
  const ah = a.replace("#", "");
  const bh = b.replace("#", "");
  const ar = parseInt(ah.substring(0, 2), 16);
  const ag = parseInt(ah.substring(2, 4), 16);
  const ab = parseInt(ah.substring(4, 6), 16);
  const br = parseInt(bh.substring(0, 2), 16);
  const bg = parseInt(bh.substring(2, 4), 16);
  const bb = parseInt(bh.substring(4, 6), 16);
  const rr = Math.round(ar + (br - ar) * t);
  const rg = Math.round(ag + (bg - ag) * t);
  const rb = Math.round(ab + (bb - ab) * t);
  return `rgb(${rr},${rg},${rb})`;
}

const InteractiveBackground = () => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null); // NEW: ref for container
  const animationRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0, isInside: false });
  const particlesRef = useRef([]);
  const binaryNumbersRef = useRef([]);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Check for dark mode
  useEffect(() => {
    const checkDarkMode = () => {
      setIsDarkMode(document.documentElement.classList.contains("dark"));
    };
    checkDarkMode();
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, []);

  // Helper to set canvas size to match container
  function setCanvasSizeToContainer() {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const rect = container.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    // Only update if size changed
    if (
      canvas.width !== Math.round(rect.width * dpr) ||
      canvas.height !== Math.round(rect.height * dpr)
    ) {
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      const ctx = canvas.getContext("2d");
      ctx.setTransform(1, 0, 0, 1, 0, 0); // Reset transform
      ctx.scale(dpr, dpr);
    }
  }

  // Initialize particles and bars
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    function setupParticlesAndBars() {
      setCanvasSizeToContainer();
      const rect = container.getBoundingClientRect();

      // Responsive particle count based on screen size
      const area = rect.width * rect.height;
      const baseCount = 120;
      const scaleFactor = Math.min(area / (800 * 600), 2);
      const particleCount = Math.floor(baseCount * scaleFactor);
      // Responsive bar count
      let barCount = 20;
      if (rect.width < 480) barCount = 8;
      else if (rect.width < 768) barCount = 12;
      else if (rect.width < 1024) barCount = 16;
      // Initialize particles (dots)
      const particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * rect.width,
          y: Math.random() * rect.height,
          originalX: 0,
          originalY: 0,
          size: Math.random() * 2 + 0.5,
          speedX: (Math.random() - 0.5) * 0.5,
          speedY: (Math.random() - 0.5) * 0.5,
          opacity: Math.random() * 0.6 + 0.2,
          originalOpacity: 0,
          ripple: 0,
          rippleSpeed: 0,
          velocityX: 0,
          velocityY: 0,
        });
      }
      particles.forEach((particle) => {
        particle.originalX = particle.x;
        particle.originalY = particle.y;
        particle.originalOpacity = particle.opacity;
      });
      // Initialize bars
      const bars = [];
      for (let i = 0; i < barCount; i++) {
        const barWidth =
          rect.width < 480 ? Math.random() * 60 + 15 : Math.random() * 100 + 20;
        bars.push({
          x: Math.random() * rect.width,
          y: Math.random() * rect.height,
          originalX: 0,
          originalY: 0,
          width: barWidth,
          height: rect.width < 480 ? 1.5 : 2,
          opacity: Math.random() * 0.3 + 0.1,
          originalOpacity: 0,
          angle: Math.random() * Math.PI * 2,
          ripple: 0,
          rippleSpeed: 0,
          velocityX: 0,
          velocityY: 0,
        });
      }
      bars.forEach((bar) => {
        bar.originalX = bar.x;
        bar.originalY = bar.y;
        bar.originalOpacity = bar.opacity;
      });
      particlesRef.current = { particles, bars, rect };
    }

    setupParticlesAndBars();

    // Use ResizeObserver for container
    const resizeObserver = new window.ResizeObserver(() => {
      setupParticlesAndBars();
    });
    resizeObserver.observe(container);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  // Check if mouse is over specific clickable elements
  const isMouseOverClickableElements = (x, y) => {
    const canvasRect = canvasRef.current?.getBoundingClientRect();
    if (!canvasRect) return false;

    // Convert canvas coordinates to page coordinates
    const pageX = x + canvasRect.left;
    const pageY = y + canvasRect.top;

    // Get the element at the mouse position
    const elementAtPoint = document.elementFromPoint(pageX, pageY);
    if (!elementAtPoint) return false;

    // Check if it's a clickable element
    const clickableElements = ["BUTTON", "A", "INPUT", "SELECT", "TEXTAREA"];
    const isClickable =
      clickableElements.includes(elementAtPoint.tagName) ||
      elementAtPoint.hasAttribute("onclick") ||
      elementAtPoint.style.cursor === "pointer" ||
      elementAtPoint.classList.contains("cursor-pointer");

    return isClickable;
  };

  // Mouse/touch event handlers
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const getEventCoordinates = (e) => {
      const rect = canvas.getBoundingClientRect();
      let clientX, clientY;

      if (e.touches && e.touches.length > 0) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      } else if (e.changedTouches && e.changedTouches.length > 0) {
        clientX = e.changedTouches[0].clientX;
        clientY = e.changedTouches[0].clientY;
      } else {
        clientX = e.clientX;
        clientY = e.clientY;
      }

      return {
        x: clientX - rect.left,
        y: clientY - rect.top,
      };
    };

    const handleInteractionMove = (e) => {
      e.preventDefault();
      const coords = getEventCoordinates(e);

      // Only block interaction over specific clickable elements
      const overClickableElements = isMouseOverClickableElements(
        coords.x,
        coords.y
      );

      mouseRef.current = {
        x: coords.x,
        y: coords.y,
        isInside: !overClickableElements,
      };
    };

    const handleInteractionEnd = (e) => {
      if (e.preventDefault) e.preventDefault();
      mouseRef.current.isInside = false;
    };

    const handleInteractionStart = (e) => {
      e.preventDefault();
      const coords = getEventCoordinates(e);

      // For touch devices, also trigger the move effect immediately
      if (e.touches) {
        handleInteractionMove(e);
      }

      // Only prevent binary effect over clickable elements
      if (isMouseOverClickableElements(coords.x, coords.y)) {
        return;
      }

      // Propel particles outward from the mouse on click
      const propelRadius = window.innerWidth < 480 ? 150 : 200; // Use the same as your force field, or set a value
      const propelStrength = 3.5; // Adjust for more/less force
      const { particles, bars } = particlesRef.current;

      // Only destructure once
      particles.forEach((particle) => {
        const dx = particle.x - coords.x;
        const dy = particle.y - coords.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < propelRadius && distance > 1) {
          // Normalize direction
          const nx = dx / distance;
          const ny = dy / distance;
          // Add outward velocity
          particle.velocityX +=
            nx * propelStrength * (5 - distance / propelRadius);
          particle.velocityY +=
            ny * propelStrength * (5 - distance / propelRadius);
        }
      });

      // Ripple effect
      const rippleRadius = window.innerWidth < 480 ? 150 : 200;

      particles.forEach((particle) => {
        const distance = Math.sqrt(
          Math.pow(particle.x - coords.x, 2) +
            Math.pow(particle.y - coords.y, 2)
        );
        if (distance < rippleRadius) {
          particle.ripple = 1;
          particle.rippleSpeed = 0.015;
        }
      });

      bars.forEach((bar) => {
        const distance = Math.sqrt(
          Math.pow(bar.x - coords.x, 2) + Math.pow(bar.y - coords.y, 2)
        );
        if (distance < rippleRadius) {
          bar.ripple = 1;
          bar.rippleSpeed = 0.015;
        }
      });

      // Generate binary numbers explosion
      const binaryCount = window.innerWidth < 480 ? 20 : 20;
      const thrustRadius = window.innerWidth < 480 ? 80 : 120;
      const fontSize = 10;

      const binaryColorsLight = [
        "#7c3aed",
        "#f59e42",
        "#06b6d4",
        "#f43f5e",
        "#059669",
      ];
      const binaryColorsDark = [
        "#6adc99",
        "#0ef3c5",
        "#04e2b7",
        "#038298",
        "#025385",
        "#172347",
      ];

      const palette = isDarkMode ? binaryColorsDark : binaryColorsLight;
      const startColor = palette[Math.floor(Math.random() * palette.length)];
      let endColor;
      do {
        endColor = palette[Math.floor(Math.random() * palette.length)];
      } while (endColor === startColor); // ensure different color

      for (let i = 0; i < binaryCount; i++) {
        const angle = Math.random() * Math.PI * 2;
        const thrustDistance = Math.random() * thrustRadius + 20;
        const randomVariation = (Math.random() - 0.5) * 30;

        const thrustX = Math.cos(angle) * thrustDistance;
        const thrustY = Math.sin(angle) * thrustDistance;

        binaryNumbersRef.current.push({
          x: coords.x,
          y: coords.y,
          targetX: coords.x + thrustX + randomVariation,
          targetY: coords.y + thrustY + randomVariation,
          text: Math.random() > 0.5 ? "1" : "0",
          opacity: 0,
          maxOpacity: 0.9 + Math.random() * 0.1,
          fadeInSpeed: 0.08 + Math.random() * 0.04,
          fadeOutSpeed: 0.012 + Math.random() * 0.008,
          thrustSpeedX: thrustX * 0.15,
          thrustSpeedY: thrustY * 0.15,
          floatSpeedX: (Math.random() - 0.5) * 1.5,
          floatSpeedY: -Math.random() * 1.8 - 0.8,
          fontSize: fontSize,
          phase: "thrust",
          scale: 0.3,
          targetScale: 1.0 + Math.random() * 0.3,
          scaleSpeed: 0.12 + Math.random() * 0.06,
          thrustProgress: 0,
          thrustDuration: 0.4 + Math.random() * 0.2,
          hueStart: Math.floor(Math.random() * 360),
          hueRange: 180 + Math.random() * 120,
          color: startColor, // add this property
        });
      }
    };

    // Mouse events
    canvas.addEventListener("mousemove", handleInteractionMove);
    canvas.addEventListener("mouseleave", handleInteractionEnd);
    canvas.addEventListener("click", handleInteractionStart);

    // Touch events
    canvas.addEventListener("touchstart", handleInteractionStart, {
      passive: false,
    });
    canvas.addEventListener("touchmove", handleInteractionMove, {
      passive: false,
    });
    canvas.addEventListener("touchend", handleInteractionEnd);
    canvas.addEventListener("touchcancel", handleInteractionEnd);

    return () => {
      canvas.removeEventListener("mousemove", handleInteractionMove);
      canvas.removeEventListener("mouseleave", handleInteractionEnd);
      canvas.removeEventListener("click", handleInteractionStart);
      canvas.removeEventListener("touchstart", handleInteractionStart);
      canvas.removeEventListener("touchmove", handleInteractionMove);
      canvas.removeEventListener("touchend", handleInteractionEnd);
      canvas.removeEventListener("touchcancel", handleInteractionEnd);
    };
  }, [isDarkMode]);

  // Animation loop with PROPULSION MAGNET EFFECT
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let lastTime = 0;
    const targetFPS = 60;
    const frameInterval = 1000 / targetFPS;

    const animate = (currentTime) => {
      if (currentTime - lastTime < frameInterval) {
        animationRef.current = requestAnimationFrame(animate);
        return;
      }

      const deltaTime = Math.min(currentTime - lastTime, 33);
      const frameRateMultiplier = deltaTime / 16.67;
      lastTime = currentTime;

      const { particles, bars, rect } = particlesRef.current || {
        particles: [],
        bars: [],
        rect: { width: 0, height: 0 },
      };

      // Clear canvas
      ctx.clearRect(0, 0, rect.width, rect.height);

      // Set colors based on theme
      const baseColor = isDarkMode ? "255, 255, 255" : "0, 0, 0";

      // Magnet effect parameters
      const forceFieldRadius = window.innerWidth < 800 ? 180 : 250;
      const forceFieldRadiusInner = 30; // or another value, e.g., 40-60px
      const magnetStrength = 1; // Adjust for stronger/weaker pull
      // Draw and update particles with PROPULSION EFFECT
      particles.forEach((particle) => {
        // Initialize velocity if not exists
        if (!particle.velocityX) particle.velocityX = 0;
        if (!particle.velocityY) particle.velocityY = 0;

        if (mouseRef.current.isInside) {
          const dx = mouseRef.current.x - particle.x;
          const dy = mouseRef.current.y - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < forceFieldRadius && distance > forceFieldRadiusInner) {
            // Attraction force toward mouse
            const force =
              ((forceFieldRadius - distance) / forceFieldRadius) *
              magnetStrength;
            const fx = (dx / distance) * force * frameRateMultiplier;
            const fy = (dy / distance) * force * frameRateMultiplier;

            particle.velocityX += fx;
            particle.velocityY += fy;
          } else if (distance <= forceFieldRadiusInner) {
            // Calculate the angle from mouse to particle
            const angle = Math.atan2(dy, dx);

            // Elastic bounce: reverse and dampen velocity
            const elasticity = 1; // 0 = no bounce, 1 = perfect bounce
            const Speed = Math.sqrt(
              particle.velocityX ** 1 + particle.velocityY ** 1
            );

            // Place particle exactly on the edge
            const edgeX =
              mouseRef.current.x - Math.cos(angle) * forceFieldRadiusInner;
            const edgeY =
              mouseRef.current.y - Math.sin(angle) * forceFieldRadiusInner;

            // Tangential (orbit) velocity
            const orbitSpeed = 0.6; // Adjust for faster/slower orbit
            const tangentAngle = angle + Math.PI / 2; // Perpendicular to radius
            const vx = Math.cos(tangentAngle) * orbitSpeed;
            const vy = Math.sin(tangentAngle) * orbitSpeed;

            // Set position and velocity
            particle.x = edgeX;
            particle.y = edgeY;
            // Elastic bounce (radial)
            particle.velocityX = -particle.velocityX * elasticity + vx;
            particle.velocityY = -particle.velocityY * elasticity + vy;
          }
        }

        // Apply damping to velocity
        particle.velocityX *= 0.92; // Changed from damping to 0.92
        particle.velocityY *= 0.92; // Changed from damping to 0.92

        // Apply velocity to position
        particle.x += particle.velocityX * frameRateMultiplier;
        particle.y += particle.velocityY * frameRateMultiplier;

        // Normal movement
        particle.originalX += particle.speedX * frameRateMultiplier;
        particle.originalY += particle.speedY * frameRateMultiplier;

        // If not under propulsion influence, gradually return to original position
        if (
          !mouseRef.current.isInside ||
          Math.sqrt(
            Math.pow(particle.x - mouseRef.current.x, 2) +
              Math.pow(particle.y - mouseRef.current.y, 2)
          ) >= forceFieldRadius // Changed from propulsionRadius to forceFieldRadius
        ) {
          const returnForceX = (particle.originalX - particle.x) * 0.02;
          const returnForceY = (particle.originalY - particle.y) * 0.02;

          particle.velocityX += returnForceX;
          particle.velocityY += returnForceY;
        }

        // Wrap around edges for original position
        if (particle.originalX < 0) particle.originalX = rect.width;
        if (particle.originalX > rect.width) particle.originalX = 0;
        if (particle.originalY < 0) particle.originalY = rect.height;
        if (particle.originalY > rect.height) particle.originalY = 0;

        // Keep particles within canvas bounds
        if (particle.x < 0) particle.x = 0;
        if (particle.x > rect.width) particle.x = rect.width;
        if (particle.y < 0) particle.y = 0;
        if (particle.y > rect.height) particle.y = rect.height;

        // Handle ripple effect
        if (particle.ripple > 0) {
          particle.ripple -= particle.rippleSpeed;
          particle.opacity = particle.originalOpacity + particle.ripple * 0.6;
        } else {
          particle.opacity = particle.originalOpacity;
        }

        // Draw particle
        ctx.fillStyle = `rgba(${baseColor}, ${particle.opacity})`;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // Draw and update bars with PROPULSION EFFECT
      bars.forEach((bar) => {
        // Initialize velocity if not exists
        if (!bar.velocityX) bar.velocityX = 0;
        if (!bar.velocityY) bar.velocityY = 0;

        // PROPULSION MAGNET EFFECT for bars
        if (mouseRef.current.isInside) {
          const distance = Math.sqrt(
            Math.pow(bar.x - mouseRef.current.x, 2) +
              Math.pow(bar.y - mouseRef.current.y, 2)
          );

          if (distance < forceFieldRadius && distance > 0) {
            // Changed from propulsionRadius to forceFieldRadius
            // Calculate propulsion force (push away from mouse)
            const propulsionForce =
              ((forceFieldRadius - distance) / forceFieldRadius) *
              magnetStrength *
              0.4; // Changed from propulsionStrength to magnetStrength
            const propulsionX =
              ((bar.x - mouseRef.current.x) / distance) *
              propulsionForce *
              frameRateMultiplier;
            const propulsionY =
              ((bar.y - mouseRef.current.y) / distance) *
              propulsionForce *
              frameRateMultiplier;

            // Apply propulsion force to velocity
            bar.velocityX += propulsionX;
            bar.velocityY += propulsionY;
          }
        }

        // Apply damping to velocity
        bar.velocityX *= 0.92; // Changed from damping to 0.92
        bar.velocityY *= 0.92; // Changed from damping to 0.92

        // Apply velocity to position
        bar.x += bar.velocityX * frameRateMultiplier;
        bar.y += bar.velocityY * frameRateMultiplier;

        // If not under propulsion influence, gradually return to original position
        if (
          !mouseRef.current.isInside ||
          Math.sqrt(
            Math.pow(bar.x - mouseRef.current.x, 2) +
              Math.pow(bar.y - mouseRef.current.y, 2)
          ) >= forceFieldRadius // Changed from propulsionRadius to forceFieldRadius
        ) {
          const returnForceX = (bar.originalX - bar.x) * 0.018;
          const returnForceY = (bar.originalY - bar.y) * 0.018;

          bar.velocityX += returnForceX;
          bar.velocityY += returnForceY;
        }

        // Keep bars within canvas bounds
        if (bar.x < 0) bar.x = 0;
        if (bar.x > rect.width) bar.x = rect.width;
        if (bar.y < 0) bar.y = 0;
        if (bar.y > rect.height) bar.y = rect.height;

        // Handle ripple effect
        if (bar.ripple > 0) {
          bar.ripple -= bar.rippleSpeed;
          bar.opacity = bar.originalOpacity + bar.ripple * 0.4;
        } else {
          bar.opacity = bar.originalOpacity;
        }

        // Draw bar
        ctx.save();
        ctx.translate(bar.x, bar.y);
        ctx.rotate(bar.angle);
        ctx.fillStyle = `rgba(${baseColor}, ${bar.opacity})`;
        ctx.fillRect(-bar.width / 2, -bar.height / 2, bar.width, bar.height);
        ctx.restore();
      });

      // Draw and update binary numbers
      binaryNumbersRef.current = binaryNumbersRef.current.filter((binary) => {
        // Handle animation phases
        if (binary.phase === "thrust") {
          binary.thrustProgress += 0.05;

          const progress = Math.min(
            binary.thrustProgress / binary.thrustDuration,
            1
          );
          const easeOut = 1 - Math.pow(1 - progress, 3);

          binary.x = binary.x + (binary.targetX - binary.x) * easeOut * 0.3;
          binary.y = binary.y + (binary.targetY - binary.y) * easeOut * 0.3;

          binary.opacity += binary.fadeInSpeed;
          binary.scale += binary.scaleSpeed;

          if (
            progress >= 1 ||
            (binary.opacity >= binary.maxOpacity &&
              binary.scale >= binary.targetScale)
          ) {
            binary.phase = "floating";
            binary.opacity = binary.maxOpacity;
            binary.scale = binary.targetScale;
            binary.x = binary.targetX;
            binary.y = binary.targetY;
          }
        } else if (binary.phase === "floating") {
          binary.x += binary.floatSpeedX;
          binary.y += binary.floatSpeedY;

          binary.floatTime = (binary.floatTime || 0) + 1;
          if (binary.floatTime > 45) {
            binary.phase = "fadeOut";
          }
        } else if (binary.phase === "fadeOut") {
          binary.x += binary.floatSpeedX * 0.8;
          binary.y += binary.floatSpeedY * 0.8;
          binary.opacity -= binary.fadeOutSpeed;
          binary.scale *= 0.97;
        }

        // Draw binary number
        if (binary.opacity > 0) {
          ctx.save();
          ctx.translate(binary.x, binary.y);
          ctx.scale(binary.scale, binary.scale);
          if (isDarkMode) {
            // Palette-based color cycling
            const palette = [
              "#6adc99",
              "#0ef3c5",
              "#04e2b7",
              "#038298",
              "#025385",
              "#172347",
            ];
            const now = performance.now();
            if (!binary.birthTime) binary.birthTime = now;
            const cycleTime = 150;
            const elapsed =
              (now - binary.birthTime) % (cycleTime * palette.length);
            const paletteIndex = Math.floor(elapsed / cycleTime);
            const nextIndex = (paletteIndex + 1) % palette.length;
            const t = (elapsed % cycleTime) / cycleTime;
            ctx.fillStyle = lerpColor(
              palette[paletteIndex],
              palette[nextIndex],
              t
            );
          } else {
            ctx.fillStyle = "#000000";
          }
          ctx.font = `${binary.fontSize}px Sora, sans-serif`;
          ctx.textAlign = "center";
          ctx.fillText(binary.text, 0, 0);
          ctx.restore();
          return true;
        }
        return false;
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isDarkMode]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full overflow-hidden touch-none"
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{
          width: "100%",
          height: "100%",
          touchAction: "auto",
          pointerEvents: "auto",
          zIndex: 0,
        }}
      />
    </div>
  );
};

export default InteractiveBackground;
