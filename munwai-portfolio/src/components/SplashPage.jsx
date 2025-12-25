import { useCallback, useEffect, useRef, useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

export default function SplashPage({ onComplete }) {
  // State for text animation
  const [showText, setShowText] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const [textAnimationPhase, setTextAnimationPhase] = useState(0); // 0: not started, 1: starting, 2: active
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [handwritingProgress1, setHandwritingProgress1] = useState(0);
  const [handwritingProgress2, setHandwritingProgress2] = useState(0);

  // Refs
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0, isInside: false });
  const textMetricsRef = useRef({ width: 0, height: 0, x: 0, y: 0 }); // Store text position and size

  // Animation timing
  const startTime = useRef(Date.now());
  const animationProgress = useRef(0);
  const animationId = useRef(null);

  // Handwriting animation for second text
  const animateHandwriting2 = useCallback(() => {
    let progress = 0;
    const duration = 4000; // 4 seconds for second text
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      progress = Math.min(1, elapsed / duration);
      setHandwritingProgress2(progress);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    animate();
  }, []);

  // Handwriting animation for first text
  const animateHandwriting1 = useCallback(() => {
    let progress = 0;
    const duration = 3000; // 3 seconds for first text
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      progress = Math.min(1, elapsed / duration);
      setHandwritingProgress1(progress);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        // Start second text after first is complete
        setTimeout(() => {
          animateHandwriting2();
        }, 800); // 800ms delay between texts
      }
    };
    animate();
  }, [animateHandwriting2]);

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

  // Mouse interaction handlers for calm state
  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
      mouseRef.current.isInside = true;
    };

    const handleMouseLeave = () => {
      mouseRef.current.isInside = false;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  // Main animation effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      console.log("Canvas not found");
      return;
    }

    console.log("Starting splash page animation");
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Set initial background
    ctx.fillStyle = isDarkMode ? "#000000" : "#f8fafc";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const binary = "0101010011001010110110100010101";
    let brainPoints = [];
    let particles = [];

    // Generate a proper brain icon shape using Path2D and bezier curves
    const generateBrainShape = () => {
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const brainWidth = Math.min(canvas.width * 0.4, 320);
      const brainHeight = Math.min(canvas.height * 0.3, 240);

      brainPoints = [];

      // Create brain path using bezier curves
      const brainPath = new Path2D();
      const scaleX = brainWidth / 600;
      const scaleY = brainHeight / 600;

      // Scale and position the brain path
      const startX = centerX - 300 * scaleX;
      const startY = centerY - 300 * scaleY;

      brainPath.moveTo(startX + 300 * scaleX, startY + 250 * scaleY);
      brainPath.bezierCurveTo(
        startX + 250 * scaleX,
        startY + 100 * scaleY,
        startX + 350 * scaleX,
        startY + 100 * scaleY,
        startX + 300 * scaleX,
        startY + 250 * scaleY
      );
      brainPath.bezierCurveTo(
        startX + 300 * scaleX,
        startY + 300 * scaleY,
        startX + 220 * scaleX,
        startY + 300 * scaleY,
        startX + 250 * scaleX,
        startY + 400 * scaleY
      );
      brainPath.bezierCurveTo(
        startX + 280 * scaleX,
        startY + 500 * scaleY,
        startX + 320 * scaleX,
        startY + 500 * scaleY,
        startX + 350 * scaleX,
        startY + 400 * scaleY
      );
      brainPath.bezierCurveTo(
        startX + 380 * scaleX,
        startY + 300 * scaleY,
        startX + 300 * scaleX,
        startY + 300 * scaleY,
        startX + 300 * scaleX,
        startY + 250 * scaleY
      );

      // Store the brain path for drawing
      brainPoints.brainPath = brainPath;

      // Add circuit-like interior points for right hemisphere only
      for (let i = 0; i < 25; i++) {
        const angle = Math.random() * Math.PI * 2;
        const radius = Math.random() * brainWidth * 0.15;

        const x = centerX + Math.cos(angle) * radius;
        const y = centerY + Math.sin(angle) * radius;

        if (ctx.isPointInPath(brainPath, x, y)) {
          brainPoints.push({
            x,
            y,
            originalX: x,
            originalY: y,
            vx: 0,
            vy: 0,
            connections: [],
            char: binary[i % binary.length],
            alpha: 1,
            pulse: Math.random() * Math.PI * 2,
            size: 2,
          });
        }
      }

      // Create connections between nearby points
      brainPoints.forEach((point, i) => {
        brainPoints.forEach((otherPoint, j) => {
          if (i !== j) {
            const distance = Math.sqrt(
              (point.x - otherPoint.x) ** 2 + (point.y - otherPoint.y) ** 2
            );
            if (distance < 60 && point.connections.length < 3) {
              point.connections.push(j);
            }
          }
        });
      });
    };

    generateBrainShape();

    // Calculate text metrics for force field
    const splashText = "MUN WAI SPACE";
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const fontSize = Math.max(40, Math.min(80, canvas.width / 15));
    ctx.font = `bold ${fontSize}px 'Sora', sans-serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    const textMetrics = ctx.measureText(splashText);
    const textWidth = textMetrics.width;
    const textHeight = fontSize * 1.2;
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

    // Helper function to apply force field to particles
    const applyForceField = (particle) => {
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
            maxRepulsionForce * (1 + penetration / liquidBoundaryThickness);
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

          // Apply liquid damping
          if (particle.vx !== undefined) {
            particle.vx *= 0.92;
            particle.vy *= 0.92;
            particle.vx += normalizedTextDx * repulsionForce;
            particle.vy += normalizedTextDy * repulsionForce;
          }

          // Push particle away if too close
          if (textDistance < forceFieldRadius) {
            const pushDistance = forceFieldRadius - textDistance;
            particle.x += normalizedTextDx * pushDistance;
            particle.y += normalizedTextDy * pushDistance;
          }
        }
      }
    };

    // Helper function to draw text with intro/outro animations
    const drawText = (elapsed) => {
      let textOpacity = 0;
      let textScale = 0.8;

      // Intro animation: fade in and scale up (0-1 second)
      if (elapsed < 1000) {
        const introProgress = elapsed / 1000;
        textOpacity = Math.min(1, introProgress * 1.2);
        textScale = 0.8 + (1 - 0.8) * introProgress;
      }
      // Visible during main animation (1s - 5s)
      else if (elapsed >= 1000 && elapsed < 5000) {
        textOpacity = 1;
        textScale = 1;
      }
      // Outro animation: fade out and scale down (5s - 6s, or during fade out)
      else if (elapsed >= 5000 || fadeOut) {
        const outroStart = 5000;
        const outroProgress = Math.min(1, (elapsed - outroStart) / 1000);
        textOpacity = Math.max(0, 1 - outroProgress);
        textScale = 1 - (1 - 0.8) * outroProgress;
      }

      if (textOpacity > 0.01) {
        ctx.save();
        ctx.translate(textX, textY);
        ctx.scale(textScale, textScale);
        ctx.globalAlpha = textOpacity;

        // Set font
        ctx.font = `bold ${fontSize}px 'Sora', sans-serif`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        // Draw text with glow effect
        // Outer glow (shadow)
        ctx.shadowBlur = 30;
        ctx.shadowColor = isDarkMode
          ? "rgba(0, 255, 231, 0.8)"
          : "rgba(59, 130, 246, 0.8)";
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
        ctx.fillStyle = isDarkMode
          ? "rgba(0, 255, 231, 0.95)"
          : "rgba(59, 130, 246, 0.95)";
        ctx.fillText(splashText, 0, 0);

        // Inner text (solid, no shadow)
        ctx.shadowBlur = 0;
        ctx.shadowColor = "transparent";
        ctx.fillStyle = isDarkMode
          ? "rgba(0, 255, 231, 1)"
          : "rgba(59, 130, 246, 1)";
        ctx.fillText(splashText, 0, 0);

        ctx.restore();
        ctx.globalAlpha = 1;
      }
    };

    // Main animation function
    const animateBrainToExplosionToCalm = (progress) => {
      ctx.fillStyle = isDarkMode ? "#000000" : "#f8fafc";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw text first (before other elements)
      const elapsed = Date.now() - startTime.current;
      drawText(elapsed);

      if (progress < 0.3) {
        // Phase 1: Brain formation (0-30%)
        const phaseProgress = progress / 0.3;
        drawBrainPhase(phaseProgress);
      } else if (progress < 0.7) {
        // Phase 2: Explosion (30-70%)
        const phaseProgress = (progress - 0.3) / 0.4;
        drawExplosionPhase(phaseProgress);
      } else {
        // Phase 3: Calm state (70-100%)
        const phaseProgress = (progress - 0.7) / 0.3;
        drawCalmPhase(phaseProgress);
      }
    };

    const drawBrainPhase = (progress) => {
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      // Draw brain outline with gradient stroke
      if (brainPoints.brainPath) {
        const gradient = ctx.createLinearGradient(
          centerX - 150,
          centerY - 150,
          centerX + 150,
          centerY + 150
        );
        gradient.addColorStop(0, isDarkMode ? "#00ffe7" : "#3b82f6");
        gradient.addColorStop(0.5, isDarkMode ? "#7c3aed" : "#8b5cf6");
        gradient.addColorStop(1, isDarkMode ? "#ec4899" : "#ef4444");

        ctx.strokeStyle = gradient;
        ctx.lineWidth = 3 * progress;
        ctx.stroke(brainPoints.brainPath);
      }

      // Draw and animate brain points
      brainPoints.forEach((point) => {
        point.pulse += 0.1;
        const pulseAlpha = 0.3 + 0.7 * Math.sin(point.pulse);

        // Draw connections
        ctx.strokeStyle = `rgba(${
          isDarkMode ? "0, 255, 231" : "59, 130, 246"
        }, ${0.3 * progress * pulseAlpha})`;
        ctx.lineWidth = 1;
        point.connections.forEach((connectionIndex) => {
          const connectedPoint = brainPoints[connectionIndex];
          if (connectedPoint) {
            ctx.beginPath();
            ctx.moveTo(point.x, point.y);
            ctx.lineTo(connectedPoint.x, connectedPoint.y);
            ctx.stroke();
          }
        });

        // Draw point
        ctx.fillStyle = `rgba(${
          isDarkMode ? "124, 58, 237" : "139, 92, 246"
        }, ${progress * pulseAlpha})`;
        ctx.beginPath();
        ctx.arc(point.x, point.y, point.size * progress, 0, Math.PI * 2);
        ctx.fill();

        // Draw binary character
        ctx.fillStyle = `rgba(${isDarkMode ? "236, 72, 153" : "239, 68, 68"}, ${
          progress * pulseAlpha
        })`;
        ctx.font = `${12 * progress}px monospace`;
        ctx.textAlign = "center";
        ctx.fillText(point.char, point.x, point.y + 4);
      });
    };

    const drawExplosionPhase = (progress) => {
      // Animate points flying outward
      brainPoints.forEach((point) => {
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;

        const angle = Math.atan2(
          point.originalY - centerY,
          point.originalX - centerX
        );
        const distance = 200 * progress;

        point.x = point.originalX + Math.cos(angle) * distance;
        point.y = point.originalY + Math.sin(angle) * distance;

        // Fade out connections during explosion
        const connectionAlpha = Math.max(0, 1 - progress * 2);
        ctx.strokeStyle = `rgba(${
          isDarkMode ? "0, 255, 231" : "59, 130, 246"
        }, ${connectionAlpha * 0.3})`;
        ctx.lineWidth = 1;
        point.connections.forEach((connectionIndex) => {
          const connectedPoint = brainPoints[connectionIndex];
          if (connectedPoint) {
            ctx.beginPath();
            ctx.moveTo(point.x, point.y);
            ctx.lineTo(connectedPoint.x, connectedPoint.y);
            ctx.stroke();
          }
        });

        // Draw exploding point
        point.pulse += 0.15;
        const pulseSize = point.size * (1 + progress * 2);
        const alpha = Math.max(0.1, 1 - progress * 0.8);

        ctx.fillStyle = `rgba(${
          isDarkMode ? "236, 72, 153" : "239, 68, 68"
        }, ${alpha})`;
        ctx.beginPath();
        ctx.arc(point.x, point.y, pulseSize, 0, Math.PI * 2);
        ctx.fill();

        // Create particle trail
        if (Math.random() < 0.3) {
          particles.push({
            x: point.x,
            y: point.y,
            vx: (Math.random() - 0.5) * 4,
            vy: (Math.random() - 0.5) * 4,
            life: 1,
            decay: 0.02,
            size: Math.random() * 3 + 1,
          });
        }
      });

      // Draw and update particles with force field
      particles.forEach((particle, index) => {
        // Apply liquid-like force field
        applyForceField(particle);

        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.life -= particle.decay;

        if (particle.life <= 0) {
          particles.splice(index, 1);
          return;
        }

        ctx.fillStyle = `rgba(${isDarkMode ? "0, 255, 231" : "59, 130, 246"}, ${
          particle.life
        })`;
        ctx.beginPath();
        ctx.arc(
          particle.x,
          particle.y,
          particle.size * particle.life,
          0,
          Math.PI * 2
        );
        ctx.fill();
      });
    };

    const drawCalmPhase = (progress) => {
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      // Gently bring points back towards original positions
      brainPoints.forEach((point) => {
        const returnSpeed = 0.05 * progress;
        point.x += (point.originalX - point.x) * returnSpeed;
        point.y += (point.originalY - point.y) * returnSpeed;

        // Add gentle mouse interaction
        if (mouseRef.current.isInside) {
          const mouseDistance = Math.sqrt(
            (mouseRef.current.x - point.x) ** 2 +
              (mouseRef.current.y - point.y) ** 2
          );
          if (mouseDistance < 100) {
            const repelForce = (100 - mouseDistance) / 100;
            const angle = Math.atan2(
              point.y - mouseRef.current.y,
              point.x - mouseRef.current.x
            );
            point.x += Math.cos(angle) * repelForce * 20;
            point.y += Math.sin(angle) * repelForce * 20;
          }
        }

        // Draw calm connections
        ctx.strokeStyle = `rgba(${
          isDarkMode ? "0, 255, 231" : "59, 130, 246"
        }, 0.4)`;
        ctx.lineWidth = 1;
        point.connections.forEach((connectionIndex) => {
          const connectedPoint = brainPoints[connectionIndex];
          if (connectedPoint) {
            ctx.beginPath();
            ctx.moveTo(point.x, point.y);
            ctx.lineTo(connectedPoint.x, connectedPoint.y);
            ctx.stroke();
          }
        });

        // Draw calm point with gentle pulse
        point.pulse += 0.05;
        const pulseAlpha = 0.6 + 0.4 * Math.sin(point.pulse);

        ctx.fillStyle = `rgba(${
          isDarkMode ? "124, 58, 237" : "139, 92, 246"
        }, ${pulseAlpha})`;
        ctx.beginPath();
        ctx.arc(point.x, point.y, point.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // Draw brain outline in calm state
      if (brainPoints.brainPath && progress > 0.5) {
        const gradient = ctx.createLinearGradient(
          centerX - 150,
          centerY - 150,
          centerX + 150,
          centerY + 150
        );
        gradient.addColorStop(0, isDarkMode ? "#00ffe7" : "#3b82f6");
        gradient.addColorStop(0.5, isDarkMode ? "#7c3aed" : "#8b5cf6");
        gradient.addColorStop(1, isDarkMode ? "#ec4899" : "#ef4444");

        ctx.strokeStyle = gradient;
        ctx.lineWidth = 2;
        ctx.globalAlpha = 0.6;
        ctx.stroke(brainPoints.brainPath);
        ctx.globalAlpha = 1;
      }

      // Continue particle effects in calm state with force field
      particles.forEach((particle, index) => {
        if (Math.random() < 0.1) {
          // Occasionally spawn new gentle particles
          const randomPoint =
            brainPoints[Math.floor(Math.random() * brainPoints.length)];
          if (randomPoint && particles.length < 20) {
            particles.push({
              x: randomPoint.x,
              y: randomPoint.y,
              vx: (Math.random() - 0.5) * 2,
              vy: (Math.random() - 0.5) * 2,
              life: 1,
              decay: 0.01,
              size: Math.random() * 2 + 0.5,
            });
          }
        }

        // Apply liquid-like force field
        applyForceField(particle);

        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.life -= particle.decay;

        if (particle.life <= 0) {
          particles.splice(index, 1);
          return;
        }

        ctx.fillStyle = `rgba(${isDarkMode ? "0, 255, 231" : "59, 130, 246"}, ${
          particle.life * 0.5
        })`;
        ctx.beginPath();
        ctx.arc(
          particle.x,
          particle.y,
          particle.size * particle.life,
          0,
          Math.PI * 2
        );
        ctx.fill();

        // Add gentle rectangular particles
        if (particle.life > 0.5) {
          ctx.save();
          ctx.translate(particle.x, particle.y);
          ctx.rotate(particle.angle || 0);
          ctx.fillRect(
            -particle.width / 2,
            -particle.height / 2,
            particle.width,
            particle.height
          );
          ctx.restore();
        }
      });
    };

    // Animation loop
    const animate = () => {
      const currentTime = Date.now();
      const elapsed = currentTime - startTime.current;

      // Total animation duration: 5 seconds
      animationProgress.current = Math.min(1, elapsed / 5000);

      console.log("Animation progress:", animationProgress.current);

      if (animationProgress.current < 1) {
        animateBrainToExplosionToCalm(animationProgress.current);
        animationId.current = requestAnimationFrame(animate);
      } else {
        console.log("Animation complete, starting text phase");
        // Start text animation phase
        setTextAnimationPhase(1);
        setShowText(true);

        // Continue calm animation during text display
        const calmAnimate = () => {
          // Stop animation if fade-out has started
          if (textAnimationPhase === 2) {
            return;
          }
          animateBrainToExplosionToCalm(1); // Full calm state
          animationId.current = requestAnimationFrame(calmAnimate);
        };
        calmAnimate();

        // Fade out after text animation with longer pause
        setTimeout(() => {
          console.log("Starting fade out");
          setTextAnimationPhase(2);
          setFadeOut(true);
          // Stop the animation loop when fade-out starts
          if (animationId.current) {
            cancelAnimationFrame(animationId.current);
          }
          setTimeout(() => {
            console.log("Splash page complete");
            onComplete();
          }, 1000);
        }, 8000); // 8s total for text animation + pause (increased from 4s)
      }
    };

    // Start animation immediately
    console.log("Starting animation loop");
    animate();

    // Start handwriting animation when text phase begins
    if (textAnimationPhase === 1) {
      animateHandwriting1();
    }

    // Cleanup
    return () => {
      if (animationId.current) {
        cancelAnimationFrame(animationId.current);
      }
    };
  }, [
    isDarkMode,
    onComplete,
    textAnimationPhase,
    animateHandwriting1,
    fadeOut,
  ]);

  return (
    <div
      className={`fixed inset-0 w-screen h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 overflow-hidden transition-opacity duration-1000 z-[9999] ${
        fadeOut ? "opacity-0" : "opacity-100"
      }`}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0 w-full h-full"
        style={{ display: "block" }}
      ></canvas>
      {showText && textAnimationPhase >= 1 && (
        <motion.div
          className="absolute inset-0 flex flex-col items-center justify-center z-10 px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: textAnimationPhase === 2 ? 0 : 1 }}
          transition={{
            delay: textAnimationPhase === 1 ? 0.5 : 0,
            duration: textAnimationPhase === 1 ? 1 : 0.5,
          }}
        >
          {/* SVG handwriting-style stroke paths for three lines:
              Line 1: "Welcome"  (drawn first with handwritingProgress1)
              Line 2: "to"       (starts after line 1 via handwritingProgress2)
              Line 3: "MUN WAI SPACE" (continues handwritingProgress2)
           */}
          <div className="relative w-full max-w-5xl mx-auto">
            <svg
              width="100%"
              height="240"
              viewBox="0 0 1200 240"
              className="text-teal-300 w-full h-auto"
              preserveAspectRatio="xMidYMid meet"
            >
              {/* Line 1: "Welcome" (larger, semi-bold) */}
              <g
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                {/* W */}
                <path
                  d="M260 60 L275 110 L290 80 L305 110 L320 60"
                  strokeDasharray="200"
                  strokeDashoffset={200 * (1 - handwritingProgress1)}
                />
                {/* e */}
                <path
                  d="M340 90 Q340 110 360 110 Q380 110 380 90 Q380 70 360 70 Q340 70 340 90 Z"
                  strokeDasharray="220"
                  strokeDashoffset={220 * (1 - handwritingProgress1)}
                />
                {/* l */}
                <path
                  d="M400 55 L400 115"
                  strokeDasharray="120"
                  strokeDashoffset={120 * (1 - handwritingProgress1)}
                />
                {/* c */}
                <path
                  d="M430 90 Q430 70 450 70 Q470 70 470 90 Q470 110 450 110 Q430 110 430 90 Z"
                  strokeDasharray="220"
                  strokeDashoffset={220 * (1 - handwritingProgress1)}
                />
                {/* o */}
                <path
                  d="M490 90 Q490 70 510 70 Q530 70 530 90 Q530 110 510 110 Q490 110 490 90 Z"
                  strokeDasharray="220"
                  strokeDashoffset={220 * (1 - handwritingProgress1)}
                />
                {/* m */}
                <path
                  d="M550 110 L550 80 Q550 70 565 70 Q580 70 580 80 L580 110 M580 80 Q580 70 595 70 Q610 70 610 80 L610 110"
                  strokeDasharray="260"
                  strokeDashoffset={260 * (1 - handwritingProgress1)}
                />
                {/* e */}
                <path
                  d="M630 90 Q630 110 650 110 Q670 110 670 90 Q670 70 650 70 Q630 70 630 90 Z"
                  strokeDasharray="220"
                  strokeDashoffset={220 * (1 - handwritingProgress1)}
                />
              </g>

              {/* Line 2 & 3 driven by handwritingProgress2 (starts after line 1 finishes) */}
              <g
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                {/* Line 2: "to" (centered under Welcome) */}
                {/* t */}
                <path
                  d="M560 135 L560 175 M545 145 L575 145"
                  strokeDasharray="160"
                  strokeDashoffset={160 * (1 - handwritingProgress2)}
                />
                {/* o */}
                <path
                  d="M595 155 Q595 135 615 135 Q635 135 635 155 Q635 175 615 175 Q595 175 595 155 Z"
                  strokeDasharray="200"
                  strokeDashoffset={200 * (1 - handwritingProgress2)}
                />

                {/* Line 3: "MUN WAI SPACE" (all caps, bolder, wider tracking) */}
                {/* M */}
                <path
                  d="M260 200 L260 240 L280 210 L300 240 L300 200"
                  strokeDasharray="260"
                  strokeDashoffset={260 * (1 - handwritingProgress2)}
                />
                {/* U */}
                <path
                  d="M320 200 L320 230 Q320 245 340 245 Q360 245 360 230 L360 200"
                  strokeDasharray="220"
                  strokeDashoffset={220 * (1 - handwritingProgress2)}
                />
                {/* N */}
                <path
                  d="M380 245 L380 200 L415 245 L415 200"
                  strokeDasharray="260"
                  strokeDashoffset={260 * (1 - handwritingProgress2)}
                />
                {/* space */}
                {/* W */}
                <path
                  d="M455 205 L465 245 L475 215 L485 245 L495 205"
                  strokeDasharray="220"
                  strokeDashoffset={220 * (1 - handwritingProgress2)}
                />
                {/* A */}
                <path
                  d="M515 245 L530 205 L545 245 M522 230 L538 230"
                  strokeDasharray="220"
                  strokeDashoffset={220 * (1 - handwritingProgress2)}
                />
                {/* I */}
                <path
                  d="M565 205 L565 245"
                  strokeDasharray="120"
                  strokeDashoffset={120 * (1 - handwritingProgress2)}
                />
                {/* space */}
                {/* S */}
                <path
                  d="M605 210 Q585 210 585 225 Q585 240 605 240 Q625 240 625 225 Q625 210 605 210"
                  strokeDasharray="260"
                  strokeDashoffset={260 * (1 - handwritingProgress2)}
                />
                {/* P */}
                <path
                  d="M645 245 L645 205 L675 205 Q690 205 690 220 Q690 235 675 235 L645 235"
                  strokeDasharray="260"
                  strokeDashoffset={260 * (1 - handwritingProgress2)}
                />
                {/* A */}
                <path
                  d="M710 245 L725 205 L740 245 M717 230 L733 230"
                  strokeDasharray="220"
                  strokeDashoffset={220 * (1 - handwritingProgress2)}
                />
                {/* C */}
                <path
                  d="M760 225 Q760 205 785 205 Q800 205 805 210 M760 225 Q760 245 785 245 Q800 245 805 240"
                  strokeDasharray="260"
                  strokeDashoffset={260 * (1 - handwritingProgress2)}
                />
                {/* E */}
                <path
                  d="M825 205 L825 245 M825 205 L855 205 M825 225 L850 225 M825 245 L855 245"
                  strokeDasharray="280"
                  strokeDashoffset={280 * (1 - handwritingProgress2)}
                />
              </g>
            </svg>
          </div>
        </motion.div>
      )}
    </div>
  );
}
