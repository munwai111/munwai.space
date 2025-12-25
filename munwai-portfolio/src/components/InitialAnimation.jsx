import React, { useRef, useEffect, useState, useCallback } from "react";

// Color palette - moved outside component to avoid dependency issues
const colors = [
  { hex: "#0a0913", rgb: [10, 9, 19] },
  { hex: "#131122", rgb: [19, 17, 34] },
  { hex: "#1d1936", rgb: [29, 25, 54] },
  { hex: "#282442", rgb: [40, 36, 66] },
];

const InitialAnimation = ({ onComplete }) => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const particlesRef = useRef([]);
  const startTimeRef = useRef(performance.now());
  const textMetricsRef = useRef({ width: 0, height: 0, x: 0, y: 0 }); // Store text position and size
  const [phase, setPhase] = useState(0); // 0: color transition, 1: magnetic pull, 2: explosion, 3: fade in
  const [handwritingProgress, setHandwritingProgress] = useState(0);
  const [textOpacity, setTextOpacity] = useState(0);
  const handwritingAnimationRef = useRef(null);

  // Helper function to interpolate between colors
  const lerpColor = (color1, color2, t) => {
    return [
      Math.round(color1[0] + (color2[0] - color1[0]) * t),
      Math.round(color1[1] + (color2[1] - color1[1]) * t),
      Math.round(color1[2] + (color2[2] - color1[2]) * t),
    ];
  };

  // Handwriting animation effect
  const animateHandwriting = useCallback(() => {
    let progress = 0;
    const duration = 2500; // 2.5 seconds to write out the text
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      progress = Math.min(1, elapsed / duration);
      setHandwritingProgress(progress);

      if (progress < 1) {
        handwritingAnimationRef.current = requestAnimationFrame(animate);
      }
    };
    animate();
  }, []);

  // Start handwriting animation when component mounts
  useEffect(() => {
    // Small delay to let the canvas initialize
    const timeout = setTimeout(() => {
      animateHandwriting();
    }, 300);

    return () => {
      clearTimeout(timeout);
      if (handwritingAnimationRef.current) {
        cancelAnimationFrame(handwritingAnimationRef.current);
      }
    };
  }, [animateHandwriting]);

  // Initialize canvas and particles
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      if (rect.width > 0 && rect.height > 0) {
        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
        const ctx = canvas.getContext("2d");
        ctx.scale(dpr, dpr);
      }
    };

    // Wait for canvas to be properly sized
    const initParticles = () => {
      resizeCanvas();
      const rect = canvas.getBoundingClientRect();

      if (rect.width > 0 && rect.height > 0) {
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        // Calculate particle count for well-spread, endless feel
        // More particles for larger screens, ensuring good coverage
        const screenArea = rect.width * rect.height;
        const baseDensity = 0.0012; // Particles per pixel (increased for more particles)
        const particleCount = Math.max(
          300, // Minimum particles for good coverage
          Math.floor(screenArea * baseDensity)
        );

        const particles = [];

        // Use Poisson-like distribution for better spread
        const minDistance =
          Math.sqrt((rect.width * rect.height) / particleCount) * 0.7;

        for (let i = 0; i < particleCount; i++) {
          let x, y;
          let attempts = 0;
          let validPosition = false;

          // Try to place particles with minimum distance for better spread
          while (!validPosition && attempts < 30) {
            x = Math.random() * rect.width;
            y = Math.random() * rect.height;

            // Check distance from existing particles
            validPosition = true;
            for (let j = 0; j < particles.length; j++) {
              const dx = x - particles[j].x;
              const dy = y - particles[j].y;
              const distance = Math.sqrt(dx * dx + dy * dy);
              if (distance < minDistance) {
                validPosition = false;
                break;
              }
            }
            attempts++;
          }

          // If couldn't find good position, use random (still well spread due to density)
          if (!validPosition) {
            x = Math.random() * rect.width;
            y = Math.random() * rect.height;
          }

          // Start with larger size - will shrink as it approaches center
          const initialSize = Math.random() * 4 + 3; // Size range: 3-7 (larger starting size)
          const minSize = Math.random() * 1.5 + 0.5; // Final size range: 0.5-2 (like landing page)

          particles.push({
            x: x,
            y: y,
            targetX: centerX,
            targetY: centerY,
            size: initialSize,
            originalSize: initialSize, // Store original size
            minSize: minSize, // Store minimum size for shrinking
            opacity: 0, // Start invisible - will fade in during phase 1
            velocityX: 0,
            velocityY: 0,
            originalX: x, // Store original position for landing page behavior
            originalY: y,
            speedX: (Math.random() - 0.5) * 0.5, // For landing page behavior after explosion
            speedY: (Math.random() - 0.5) * 0.5,
            originalOpacity: Math.random() * 0.6 + 0.2, // For landing page behavior
          });
        }
        particlesRef.current = particles;
      }
    };

    // Initialize immediately and also after a short delay to ensure canvas is sized
    initParticles();
    const timeoutId = setTimeout(initParticles, 100);
    window.addEventListener("resize", resizeCanvas);

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  // Animation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Wait a bit for particles to initialize
    const startAnimation = () => {
      const ctx = canvas.getContext("2d");
      const startTime = startTimeRef.current;

      const animate = (currentTime) => {
        const elapsed = (currentTime - startTime) / 1000; // Convert to seconds
        const rect = canvas.getBoundingClientRect();

        // Ensure we have valid dimensions
        if (rect.width === 0 || rect.height === 0) {
          animationRef.current = requestAnimationFrame(animate);
          return;
        }

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        // Calculate text metrics once (for force field and rendering)
        const splashText = "MUN WAI SPACE";
        // Use responsive font size
        const fontSize = Math.max(40, Math.min(80, rect.width / 15));
        ctx.font = `bold ${fontSize}px 'Sora', sans-serif`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        const textMetrics = ctx.measureText(splashText);
        const textWidth = textMetrics.width;
        const textHeight = fontSize * 1.2; // Approximate text height
        const textX = centerX;
        const textY = centerY;

        // Force field parameters - liquid-like boundary
        const forceFieldPadding = 40;
        const forceFieldRadius =
          Math.max(textWidth, textHeight) / 2 + forceFieldPadding;
        const liquidBoundaryThickness = 30;
        const maxRepulsionForce = 2.5;

        // Update text metrics ref
        textMetricsRef.current = {
          x: textX,
          y: textY,
          width: textWidth,
          height: textHeight,
        };

        // Phase 0: Color transition (0-3 seconds)
        let currentColor = colors[0].rgb; // Default to first color
        if (elapsed < 3) {
          const colorIndex = Math.floor(elapsed);
          const t = elapsed % 1;
          if (colorIndex < colors.length - 1) {
            currentColor = lerpColor(
              colors[colorIndex].rgb,
              colors[colorIndex + 1].rgb,
              t
            );
          } else {
            currentColor = colors[colors.length - 1].rgb;
          }
          setPhase(0);
        }
        // Phase 1: Magnetic pull to center (3-5.5 seconds) - particles fade in during this phase
        else if (elapsed < 5.5) {
          currentColor = colors[3].rgb;
          setPhase(1);
          const pullProgress = (elapsed - 3) / 2.5; // 0 to 1 over 2.5 seconds

          if (!particlesRef.current || particlesRef.current.length === 0) {
            animationRef.current = requestAnimationFrame(animate);
            return;
          }

          // Cluster border radius - particles will experience elastic drag here
          const clusterRadius = 15; // Radius of the cluster at center
          const maxDistance = Math.max(rect.width, rect.height);

          // Store maxDistance for size calculation
          if (
            !particlesRef.current[0] ||
            !particlesRef.current[0].maxDistance
          ) {
            particlesRef.current.forEach((p) => (p.maxDistance = maxDistance));
          }

          particlesRef.current.forEach((particle) => {
            // Calculate distance to text center
            const textDx = particle.x - textX;
            const textDy = particle.y - textY;
            const textDistance = Math.sqrt(textDx * textDx + textDy * textDy);

            // Liquid-like force field - prevents particles from passing through
            if (textDistance < forceFieldRadius + liquidBoundaryThickness) {
              // Calculate distance from text boundary
              const distanceFromBoundary = textDistance - forceFieldRadius;

              // Liquid-like repulsion - stronger near boundary, smooth falloff
              let repulsionForce = 0;
              if (distanceFromBoundary < 0) {
                // Inside force field - strong repulsion
                const penetration = Math.abs(distanceFromBoundary);
                repulsionForce =
                  maxRepulsionForce *
                  (1 + penetration / liquidBoundaryThickness);
              } else if (distanceFromBoundary < liquidBoundaryThickness) {
                // In boundary zone - smooth repulsion
                const boundaryProgress =
                  distanceFromBoundary / liquidBoundaryThickness;
                // Smooth curve for liquid-like feel
                const smoothCurve = 1 - Math.pow(boundaryProgress, 2);
                repulsionForce = maxRepulsionForce * smoothCurve * 0.6;
              }

              if (repulsionForce > 0 && textDistance > 0) {
                // Apply liquid-like repulsion force
                const normalizedTextDx = textDx / textDistance;
                const normalizedTextDy = textDy / textDistance;

                // Add liquid damping effect (particles slow down near boundary)
                const liquidDamping = 0.92;
                particle.velocityX *= liquidDamping;
                particle.velocityY *= liquidDamping;

                // Apply repulsion
                particle.velocityX += normalizedTextDx * repulsionForce;
                particle.velocityY += normalizedTextDy * repulsionForce;

                // Push particle away from text if too close
                if (textDistance < forceFieldRadius) {
                  const pushDistance = forceFieldRadius - textDistance;
                  particle.x += normalizedTextDx * pushDistance;
                  particle.y += normalizedTextDy * pushDistance;
                }
              }
            }

            // Magnetic pull towards center
            const dx = centerX - particle.x;
            const dy = centerY - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            // Exponential acceleration: stronger pull as particle gets closer (gravity effect)
            // Using inverse square law with exponential boost for closer distances
            const normalizedDistance = distance / maxDistance;

            // Base pull strength that increases exponentially as distance decreases
            // The closer the particle, the stronger the pull (like gravity)
            const exponentialFactor = Math.pow(1 - normalizedDistance, 2.5); // Exponential curve
            const basePullStrength = 0.15;
            const maxPullStrength = 0.8; // Maximum pull strength

            // Exponential increase in pull strength as particle approaches center
            const pullStrength =
              basePullStrength +
              (maxPullStrength - basePullStrength) * exponentialFactor;

            // Additional time-based acceleration for more dramatic effect
            const timeAcceleration = 1 + pullProgress * 0.5; // Increases over time
            const finalPullStrength = pullStrength * timeAcceleration;

            if (distance > clusterRadius) {
              // Particle is outside cluster - apply exponential magnetic pull
              const normalizedDx = dx / distance;
              const normalizedDy = dy / distance;

              // Apply exponential acceleration
              particle.velocityX += normalizedDx * finalPullStrength;
              particle.velocityY += normalizedDy * finalPullStrength;

              // Exponential velocity increase as it gets closer
              const velocityBoost = 1 + (1 - distance / maxDistance) * 0.3;
              particle.velocityX *= 1 + velocityBoost * 0.02;
              particle.velocityY *= 1 + velocityBoost * 0.02;
            } else {
              // Particle has hit the cluster border - apply elastic drag
              const penetrationDepth = clusterRadius - distance;
              const elasticForce = penetrationDepth * 0.3; // Elastic resistance

              // Push particle away from center with elastic force
              const normalizedDx = dx / (distance || 0.1); // Avoid division by zero
              const normalizedDy = dy / (distance || 0.1);

              // Elastic bounce effect
              particle.velocityX -= normalizedDx * elasticForce;
              particle.velocityY -= normalizedDy * elasticForce;

              // Apply elastic damping (oscillation effect)
              particle.velocityX *= 0.85; // Strong damping for elastic feel
              particle.velocityY *= 0.85;

              // Ensure particle stays at cluster border
              if (distance < clusterRadius) {
                const pushOutDistance = clusterRadius - distance;
                particle.x -= normalizedDx * pushOutDistance;
                particle.y -= normalizedDy * pushOutDistance;
              }
            }

            // Apply velocity with progressive damping (less damping when far, more when close)
            const dampingFactor = distance > clusterRadius * 2 ? 0.94 : 0.88;
            particle.x += particle.velocityX;
            particle.y += particle.velocityY;
            particle.velocityX *= dampingFactor;
            particle.velocityY *= dampingFactor;

            // Size shrinks as particle approaches center (from large to small)
            const particleMaxDistance = particle.maxDistance || maxDistance;
            const sizeProgress = Math.min(distance / particleMaxDistance, 1);
            // Interpolate from originalSize to small size (0.5-2 range like landing page)
            particle.size =
              particle.originalSize * sizeProgress +
              particle.minSize * (1 - sizeProgress);
            // Ensure size doesn't go below minimum
            particle.size = Math.max(particle.size, particle.minSize);

            // Fade in particles gradually from the 4th color onwards
            particle.opacity = Math.min(
              pullProgress * particle.originalOpacity,
              particle.originalOpacity
            );
          });
        }
        // Phase 2: Explosion (5.5-7.5 seconds) - match landing page behavior
        else if (elapsed < 7.5) {
          currentColor = colors[3].rgb;
          setPhase(2);
          const explosionProgress = (elapsed - 5.5) / 2; // 0 to 1 over 2 seconds

          if (!particlesRef.current || particlesRef.current.length === 0) {
            animationRef.current = requestAnimationFrame(animate);
            return;
          }

          // Trigger explosion at the start of this phase
          if (explosionProgress < 0.05) {
            const explosionStrength = 12;
            const maxDistance = Math.max(rect.width, rect.height);

            particlesRef.current.forEach((particle) => {
              const dx = particle.x - centerX;
              const dy = particle.y - centerY;
              const distance = Math.sqrt(dx * dx + dy * dy);

              if (distance > 0) {
                const angle = Math.atan2(dy, dx);
                // Stronger explosion for particles closer to center
                const forceMultiplier =
                  1 + (1 - distance / (maxDistance * 0.3));
                const force = explosionStrength * forceMultiplier;
                particle.velocityX = Math.cos(angle) * force;
                particle.velocityY = Math.sin(angle) * force;
              }

              // Apply force field repulsion during explosion
              const textDx = particle.x - textX;
              const textDy = particle.y - textY;
              const textDistance = Math.sqrt(textDx * textDx + textDy * textDy);

              if (textDistance < forceFieldRadius + liquidBoundaryThickness) {
                const distanceFromBoundary = textDistance - forceFieldRadius;
                let repulsionForce = 0;
                if (distanceFromBoundary < 0) {
                  const penetration = Math.abs(distanceFromBoundary);
                  repulsionForce =
                    maxRepulsionForce *
                    (1 + penetration / liquidBoundaryThickness);
                } else if (distanceFromBoundary < liquidBoundaryThickness) {
                  const boundaryProgress =
                    distanceFromBoundary / liquidBoundaryThickness;
                  const smoothCurve = 1 - Math.pow(boundaryProgress, 2);
                  repulsionForce = maxRepulsionForce * smoothCurve * 0.6;
                }

                if (repulsionForce > 0 && textDistance > 0) {
                  const normalizedTextDx = textDx / textDistance;
                  const normalizedTextDy = textDy / textDistance;
                  particle.velocityX += normalizedTextDx * repulsionForce;
                  particle.velocityY += normalizedTextDy * repulsionForce;

                  if (textDistance < forceFieldRadius) {
                    const pushDistance = forceFieldRadius - textDistance;
                    particle.x += normalizedTextDx * pushDistance;
                    particle.y += normalizedTextDy * pushDistance;
                  }
                }
              }
            });
          }

          // Update particles with physics - match landing page behavior
          const frameRateMultiplier = 1; // Assume 60fps
          particlesRef.current.forEach((particle) => {
            // Apply liquid-like force field repulsion
            const textDx = particle.x - textX;
            const textDy = particle.y - textY;
            const textDistance = Math.sqrt(textDx * textDx + textDy * textDy);

            if (textDistance < forceFieldRadius + liquidBoundaryThickness) {
              const distanceFromBoundary = textDistance - forceFieldRadius;
              let repulsionForce = 0;
              if (distanceFromBoundary < 0) {
                // Inside force field - strong repulsion
                const penetration = Math.abs(distanceFromBoundary);
                repulsionForce =
                  maxRepulsionForce *
                  (1 + penetration / liquidBoundaryThickness);
              } else if (distanceFromBoundary < liquidBoundaryThickness) {
                // In boundary zone - smooth liquid-like repulsion
                const boundaryProgress =
                  distanceFromBoundary / liquidBoundaryThickness;
                const smoothCurve = 1 - Math.pow(boundaryProgress, 2);
                repulsionForce = maxRepulsionForce * smoothCurve * 0.6;
              }

              if (repulsionForce > 0 && textDistance > 0) {
                const normalizedTextDx = textDx / textDistance;
                const normalizedTextDy = textDy / textDistance;
                // Liquid damping effect
                particle.velocityX *= 0.92;
                particle.velocityY *= 0.92;
                // Apply repulsion force
                particle.velocityX += normalizedTextDx * repulsionForce;
                particle.velocityY += normalizedTextDy * repulsionForce;

                // Push particle away if too close
                if (textDistance < forceFieldRadius) {
                  const pushDistance = forceFieldRadius - textDistance;
                  particle.x += normalizedTextDx * pushDistance;
                  particle.y += normalizedTextDy * pushDistance;
                }
              }
            }

            // Apply damping to velocity (like landing page)
            particle.velocityX *= 0.92;
            particle.velocityY *= 0.92;

            // Apply velocity to position
            particle.x += particle.velocityX * frameRateMultiplier;
            particle.y += particle.velocityY * frameRateMultiplier;

            // Normal movement (like landing page) - particles return to original position
            particle.originalX += particle.speedX * frameRateMultiplier;
            particle.originalY += particle.speedY * frameRateMultiplier;

            // Return force to original position (like landing page)
            const returnForceX = (particle.originalX - particle.x) * 0.02;
            const returnForceY = (particle.originalY - particle.y) * 0.02;

            particle.velocityX += returnForceX;
            particle.velocityY += returnForceY;

            // Wrap around edges for original position (like landing page)
            if (particle.originalX < 0) particle.originalX = rect.width;
            if (particle.originalX > rect.width) particle.originalX = 0;
            if (particle.originalY < 0) particle.originalY = rect.height;
            if (particle.originalY > rect.height) particle.originalY = 0;

            // Keep particles within canvas bounds
            if (particle.x < 0) {
              particle.x = 0;
              particle.velocityX *= -0.6;
            } else if (particle.x > rect.width) {
              particle.x = rect.width;
              particle.velocityX *= -0.6;
            }
            if (particle.y < 0) {
              particle.y = 0;
              particle.velocityY *= -0.6;
            } else if (particle.y > rect.height) {
              particle.y = rect.height;
              particle.velocityY *= -0.6;
            }

            // Reset size to landing page size range (use stored minSize)
            particle.size = particle.minSize;

            // Use original opacity from landing page
            particle.opacity = particle.originalOpacity;
          });
        }
        // Phase 3: Fade out overlay (7.5-8.5 seconds)
        // Simple fade out - keep background at 4th color, just fade overlay
        else if (elapsed < 8.5) {
          setPhase(3);
          const fadeProgress = (elapsed - 7.5) / 1; // 0 to 1 over 1 second

          // Keep background at 4th color during fade
          currentColor = colors[3].rgb;

          if (!particlesRef.current || particlesRef.current.length === 0) {
            animationRef.current = requestAnimationFrame(animate);
            return;
          }

          // Continue particle physics exactly like landing page (optimized)
          const frameRateMultiplier = 1;
          const particleCount = particlesRef.current.length;

          // Batch process particles for better performance
          for (let i = 0; i < particleCount; i++) {
            const particle = particlesRef.current[i];

            // Apply force field repulsion
            const textDx = particle.x - textX;
            const textDy = particle.y - textY;
            const textDistance = Math.sqrt(textDx * textDx + textDy * textDy);

            if (textDistance < forceFieldRadius + liquidBoundaryThickness) {
              const distanceFromBoundary = textDistance - forceFieldRadius;
              let repulsionForce = 0;
              if (distanceFromBoundary < 0) {
                const penetration = Math.abs(distanceFromBoundary);
                repulsionForce =
                  maxRepulsionForce *
                  (1 + penetration / liquidBoundaryThickness);
              } else if (distanceFromBoundary < liquidBoundaryThickness) {
                const boundaryProgress =
                  distanceFromBoundary / liquidBoundaryThickness;
                const smoothCurve = 1 - Math.pow(boundaryProgress, 2);
                repulsionForce = maxRepulsionForce * smoothCurve * 0.6;
              }

              if (repulsionForce > 0 && textDistance > 0) {
                const normalizedTextDx = textDx / textDistance;
                const normalizedTextDy = textDy / textDistance;
                particle.velocityX *= 0.92; // Liquid damping
                particle.velocityY *= 0.92;
                particle.velocityX += normalizedTextDx * repulsionForce;
                particle.velocityY += normalizedTextDy * repulsionForce;

                if (textDistance < forceFieldRadius) {
                  const pushDistance = forceFieldRadius - textDistance;
                  particle.x += normalizedTextDx * pushDistance;
                  particle.y += normalizedTextDy * pushDistance;
                }
              }
            }

            // Apply damping to velocity (like landing page)
            particle.velocityX *= 0.92;
            particle.velocityY *= 0.92;

            // Apply velocity to position
            particle.x += particle.velocityX * frameRateMultiplier;
            particle.y += particle.velocityY * frameRateMultiplier;

            // Normal movement (like landing page)
            particle.originalX += particle.speedX * frameRateMultiplier;
            particle.originalY += particle.speedY * frameRateMultiplier;

            // Return force to original position (like landing page)
            const returnForceX = (particle.originalX - particle.x) * 0.02;
            const returnForceY = (particle.originalY - particle.y) * 0.02;

            particle.velocityX += returnForceX;
            particle.velocityY += returnForceY;

            // Wrap around edges for original position (like landing page)
            if (particle.originalX < 0) particle.originalX = rect.width;
            if (particle.originalX > rect.width) particle.originalX = 0;
            if (particle.originalY < 0) particle.originalY = rect.height;
            if (particle.originalY > rect.height) particle.originalY = 0;

            // Keep particles within canvas bounds
            if (particle.x < 0) {
              particle.x = 0;
              particle.velocityX *= -0.6;
            } else if (particle.x > rect.width) {
              particle.x = rect.width;
              particle.velocityX *= -0.6;
            }
            if (particle.y < 0) {
              particle.y = 0;
              particle.velocityY *= -0.6;
            } else if (particle.y > rect.height) {
              particle.y = rect.height;
              particle.velocityY *= -0.6;
            }

            // Fade out particles smoothly as we transition
            particle.opacity = particle.originalOpacity * (1 - fadeProgress);
          }
        }
        // Complete - reveal main page (at 8.5 seconds)
        else {
          // Trigger completion immediately for smooth transition
          if (onComplete) {
            onComplete();
          }
          return;
        }

        // Clear and fill canvas with current color
        ctx.fillStyle = `rgb(${currentColor[0]}, ${currentColor[1]}, ${currentColor[2]})`;
        ctx.fillRect(0, 0, rect.width, rect.height);

        // Update text opacity for SVG overlay based on animation phase
        if (elapsed < 1) {
          // Intro: fade in
          const introProgress = elapsed / 1;
          setTextOpacity(Math.min(1, introProgress * 1.2));
        } else if (elapsed >= 1 && elapsed < 7.5) {
          // Visible during main animation
          setTextOpacity(1);
        } else if (elapsed >= 7.5 && elapsed < 8.5) {
          // Outro: fade out
          const outroProgress = (elapsed - 7.5) / 1;
          setTextOpacity(Math.max(0, 1 - outroProgress));
        }

        // Draw particles (optimized batch rendering) - AFTER text so particles appear on top
        if (
          phase >= 1 &&
          particlesRef.current &&
          particlesRef.current.length > 0
        ) {
          // Batch draw particles for better performance
          ctx.fillStyle = "rgba(255, 255, 255, 1)";
          const particleCount = particlesRef.current.length;

          for (let i = 0; i < particleCount; i++) {
            const particle = particlesRef.current[i];
            if (particle.opacity > 0.01) {
              // Only draw visible particles
              ctx.globalAlpha = particle.opacity;
              ctx.beginPath();
              ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
              ctx.fill();
            }
          }
          ctx.globalAlpha = 1; // Reset alpha
        }

        // Add fade overlay for phase 3 - simple fade out of entire splash page
        if (phase === 3 && elapsed >= 7.5) {
          const fadeProgress = Math.min((elapsed - 7.5) / 1, 1); // 0 to 1 over 1 second
          const opacity = Math.max(0, 1 - fadeProgress); // Fade from 1 to 0

          // Fade out the entire canvas overlay
          ctx.fillStyle = `rgba(${currentColor[0]}, ${currentColor[1]}, ${currentColor[2]}, ${opacity})`;
          ctx.fillRect(0, 0, rect.width, rect.height);
        }

        animationRef.current = requestAnimationFrame(animate);
      };

      animationRef.current = requestAnimationFrame(animate);
    };

    // Start animation after a short delay to ensure particles are initialized
    const timeoutId = setTimeout(startAnimation, 150);

    return () => {
      clearTimeout(timeoutId);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [phase, onComplete]);

  return (
    <div
      className="fixed inset-0 z-50 bg-[#0a0913]"
      style={{
        width: "100vw",
        height: "100vh",
      }}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0"
        style={{
          width: "100%",
          height: "100%",
          display: "block",
        }}
      />

      {/* SVG Handwriting Text Overlay */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        style={{
          opacity: handwritingProgress > 0 ? textOpacity : 0,
          transition: "opacity 0.3s ease-out",
        }}
      >
        <svg
          width="100%"
          height="120"
          viewBox="0 0 1050 120"
          className="max-w-[90vw] md:max-w-[70vw]"
          preserveAspectRatio="xMidYMid meet"
        >
          {/* MUN WAI SPACE - Handwriting stroke animation */}
          <g
            stroke="rgba(255, 255, 255, 1)"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{
              filter: "drop-shadow(0 0 8px rgba(255, 255, 255, 0.8))",
            }}
            className="[&>path]:transition-[stroke-dashoffset] [&>path]:duration-75"
          >
            {/* M */}
            <path
              d="M70 90 L70 30 L100 70 L130 30 L130 90"
              strokeDasharray="200"
              strokeDashoffset={
                200 * (1 - Math.min(1, handwritingProgress * 13))
              }
            />
            {/* U */}
            <path
              d="M160 30 L160 70 Q160 90 185 90 Q210 90 210 70 L210 30"
              strokeDasharray="180"
              strokeDashoffset={
                180 *
                (1 -
                  Math.max(0, Math.min(1, (handwritingProgress - 0.077) * 13)))
              }
            />
            {/* N */}
            <path
              d="M240 90 L240 30 L290 90 L290 30"
              strokeDasharray="200"
              strokeDashoffset={
                200 *
                (1 -
                  Math.max(0, Math.min(1, (handwritingProgress - 0.154) * 13)))
              }
            />

            {/* W */}
            <path
              d="M360 30 L380 90 L400 50 L420 90 L440 30"
              strokeDasharray="220"
              strokeDashoffset={
                220 *
                (1 -
                  Math.max(0, Math.min(1, (handwritingProgress - 0.231) * 13)))
              }
            />
            {/* A */}
            <path
              d="M470 90 L500 30 L530 90 M483 65 L517 65"
              strokeDasharray="180"
              strokeDashoffset={
                180 *
                (1 -
                  Math.max(0, Math.min(1, (handwritingProgress - 0.308) * 13)))
              }
            />
            {/* I */}
            <path
              d="M560 30 L560 90 M545 30 L575 30 M545 90 L575 90"
              strokeDasharray="130"
              strokeDashoffset={
                130 *
                (1 -
                  Math.max(0, Math.min(1, (handwritingProgress - 0.385) * 13)))
              }
            />

            {/* S - simplified path for cleaner animation */}
            <path
              d="M640 35 Q640 30 655 30 L675 30 Q690 30 690 45 Q690 60 675 60 L655 60 Q640 60 640 75 Q640 90 655 90 L675 90 Q690 90 690 85"
              strokeDasharray="250"
              strokeDashoffset={
                250 *
                (1 -
                  Math.max(0, Math.min(1, (handwritingProgress - 0.462) * 13)))
              }
            />
            {/* P */}
            <path
              d="M720 90 L720 30 L750 30 Q770 30 770 50 Q770 70 750 70 L720 70"
              strokeDasharray="180"
              strokeDashoffset={
                180 *
                (1 -
                  Math.max(0, Math.min(1, (handwritingProgress - 0.539) * 13)))
              }
            />
            {/* A */}
            <path
              d="M800 90 L830 30 L860 90 M813 65 L847 65"
              strokeDasharray="180"
              strokeDashoffset={
                180 *
                (1 -
                  Math.max(0, Math.min(1, (handwritingProgress - 0.616) * 13)))
              }
            />
            {/* C */}
            <path
              d="M910 35 Q910 30 895 30 L885 30 Q870 30 870 50 L870 70 Q870 90 885 90 L895 90 Q910 90 910 85"
              strokeDasharray="180"
              strokeDashoffset={
                180 *
                (1 -
                  Math.max(0, Math.min(1, (handwritingProgress - 0.693) * 13)))
              }
            />
            {/* E */}
            <path
              d="M940 30 L940 90 M940 30 L975 30 M940 60 L970 60 M940 90 L975 90"
              strokeDasharray="160"
              strokeDashoffset={
                160 *
                (1 -
                  Math.max(0, Math.min(1, (handwritingProgress - 0.77) * 13)))
              }
            />
          </g>
        </svg>
      </div>
    </div>
  );
};

export default InitialAnimation;
