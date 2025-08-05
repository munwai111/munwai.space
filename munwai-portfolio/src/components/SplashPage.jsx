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

  // Animation timing
  const startTime = useRef(Date.now());
  const animationProgress = useRef(0);
  const animationId = useRef(null);

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
  }, []);

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

    // Main animation function
    const animateBrainToExplosionToCalm = (progress) => {
      ctx.fillStyle = isDarkMode ? "#000000" : "#f8fafc";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

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
        ctx.strokeStyle = `rgba(${isDarkMode ? "0, 255, 231" : "59, 130, 246"}, ${0.3 * progress * pulseAlpha})`;
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
        ctx.fillStyle = `rgba(${isDarkMode ? "124, 58, 237" : "139, 92, 246"}, ${progress * pulseAlpha})`;
        ctx.beginPath();
        ctx.arc(point.x, point.y, point.size * progress, 0, Math.PI * 2);
        ctx.fill();

        // Draw binary character
        ctx.fillStyle = `rgba(${isDarkMode ? "236, 72, 153" : "239, 68, 68"}, ${progress * pulseAlpha})`;
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

        const angle = Math.atan2(point.originalY - centerY, point.originalX - centerX);
        const distance = 200 * progress;

        point.x = point.originalX + Math.cos(angle) * distance;
        point.y = point.originalY + Math.sin(angle) * distance;

        // Fade out connections during explosion
        const connectionAlpha = Math.max(0, 1 - progress * 2);
        ctx.strokeStyle = `rgba(${isDarkMode ? "0, 255, 231" : "59, 130, 246"}, ${connectionAlpha * 0.3})`;
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

        ctx.fillStyle = `rgba(${isDarkMode ? "236, 72, 153" : "239, 68, 68"}, ${alpha})`;
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

      // Draw and update particles
      particles.forEach((particle, index) => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.life -= particle.decay;

        if (particle.life <= 0) {
          particles.splice(index, 1);
          return;
        }

        ctx.fillStyle = `rgba(${isDarkMode ? "0, 255, 231" : "59, 130, 246"}, ${particle.life})`;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size * particle.life, 0, Math.PI * 2);
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
            (mouseRef.current.x - point.x) ** 2 + (mouseRef.current.y - point.y) ** 2
          );
          if (mouseDistance < 100) {
            const repelForce = (100 - mouseDistance) / 100;
            const angle = Math.atan2(point.y - mouseRef.current.y, point.x - mouseRef.current.x);
            point.x += Math.cos(angle) * repelForce * 20;
            point.y += Math.sin(angle) * repelForce * 20;
          }
        }

        // Draw calm connections
        ctx.strokeStyle = `rgba(${isDarkMode ? "0, 255, 231" : "59, 130, 246"}, 0.4)`;
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

        ctx.fillStyle = `rgba(${isDarkMode ? "124, 58, 237" : "139, 92, 246"}, ${pulseAlpha})`;
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

      // Continue particle effects in calm state
      particles.forEach((particle, index) => {
        if (Math.random() < 0.1) {
          // Occasionally spawn new gentle particles
          const randomPoint = brainPoints[Math.floor(Math.random() * brainPoints.length)];
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

        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.life -= particle.decay;

        if (particle.life <= 0) {
          particles.splice(index, 1);
          return;
        }

        ctx.fillStyle = `rgba(${isDarkMode ? "0, 255, 231" : "59, 130, 246"}, ${particle.life * 0.5})`;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size * particle.life, 0, Math.PI * 2);
        ctx.fill();

        // Add gentle rectangular particles
        if (particle.life > 0.5) {
          ctx.save();
          ctx.translate(particle.x, particle.y);
          ctx.rotate(particle.angle || 0);
          ctx.fillRect(-particle.width / 2, -particle.height / 2, particle.width, particle.height);
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
  }, [isDarkMode, onComplete, textAnimationPhase, animateHandwriting1]);

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
          {/* Handwriting Animation for "Welcome to Mun Wai Space" */}
          <div className="relative w-full max-w-4xl mx-auto">
            <svg
              width="100%"
              height="140"
              viewBox="0 0 1200 140"
              className="text-blue-600 dark:text-teal-300 w-full h-auto max-w-2xl md:max-w-4xl"
              preserveAspectRatio="xMidYMid meet"
            >
              {/* W - Welcome */}
              <path
                d="M30 40 Q45 90 60 70 Q75 90 90 40"
                fill="none"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray="180"
                strokeDashoffset={180 - handwritingProgress1 * 180}
                className="transition-all duration-100"
              />
              {/* e */}
              <path
                d="M110 60 Q110 75 125 75 Q140 75 140 60 Q140 45 125 45 Q110 45 110 60 L110 35"
                fill="none"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray="150"
                strokeDashoffset={150 - handwritingProgress1 * 150}
                className="transition-all duration-100"
              />
              {/* l */}
              <path
                d="M160 95 Q160 85 160 75 L160 35"
                fill="none"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray="80"
                strokeDashoffset={80 - handwritingProgress1 * 80}
                className="transition-all duration-100"
              />
              {/* c */}
              <path
                d="M190 60 Q190 45 205 45 Q220 45 220 60 Q220 75 205 75 Q190 75 190 60"
                fill="none"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray="120"
                strokeDashoffset={120 - handwritingProgress1 * 120}
                className="transition-all duration-100"
              />
              {/* o */}
              <path
                d="M240 60 Q240 45 255 45 Q270 45 270 60 Q270 75 255 75 Q240 75 240 60 Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray="120"
                strokeDashoffset={120 - handwritingProgress1 * 120}
                className="transition-all duration-100"
              />
              {/* m */}
              <path
                d="M290 40 L290 90 Q290 100 300 100 Q310 100 310 90 L310 40 Q310 50 320 50 Q330 50 330 40 L330 90"
                fill="none"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray="200"
                strokeDashoffset={200 - handwritingProgress1 * 200}
                className="transition-all duration-100"
              />
              {/* e */}
              <path
                d="M350 60 Q350 75 365 75 Q380 75 380 60 Q380 45 365 45 Q350 45 350 60 L350 35"
                fill="none"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray="150"
                strokeDashoffset={150 - handwritingProgress1 * 150}
                className="transition-all duration-100"
              />
              {/* space */}
              <path
                d="M400 65 L415 65"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeDasharray="30"
                strokeDashoffset={30 - handwritingProgress1 * 30}
                className="transition-all duration-100"
              />
              {/* t */}
              <path
                d="M435 95 L435 35 M420 55 L450 55"
                fill="none"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray="140"
                strokeDashoffset={140 - handwritingProgress1 * 140}
                className="transition-all duration-100"
              />
              {/* o */}
              <path
                d="M470 60 Q470 45 485 45 Q500 45 500 60 Q500 75 485 75 Q470 75 470 60 Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray="120"
                strokeDashoffset={120 - handwritingProgress1 * 120}
                className="transition-all duration-100"
              />
              {/* space */}
              <path
                d="M520 65 L535 65"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeDasharray="30"
                strokeDashoffset={30 - handwritingProgress1 * 30}
                className="transition-all duration-100"
              />
              {/* M - Mun */}
              <path
                d="M565 40 L565 90 Q565 100 575 100 Q585 100 585 90 L585 40 Q585 50 595 50 Q605 50 605 40 L605 90"
                fill="none"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray="200"
                strokeDashoffset={200 - handwritingProgress1 * 200}
                className="transition-all duration-100"
              />
              {/* u */}
              <path
                d="M625 40 L625 90 Q625 100 635 100 Q645 100 645 90 L645 40"
                fill="none"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray="140"
                strokeDashoffset={140 - handwritingProgress1 * 140}
                className="transition-all duration-100"
              />
              {/* n */}
              <path
                d="M665 40 L665 90 Q665 100 675 100 Q685 100 685 90 L685 40"
                fill="none"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray="140"
                strokeDashoffset={140 - handwritingProgress1 * 140}
                className="transition-all duration-100"
              />
              {/* space */}
              <path
                d="M705 65 L720 65"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeDasharray="30"
                strokeDashoffset={30 - handwritingProgress1 * 30}
                className="transition-all duration-100"
              />
              {/* W - Wai */}
              <path
                d="M740 40 Q755 90 770 70 Q785 90 800 40"
                fill="none"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray="180"
                strokeDashoffset={180 - handwritingProgress1 * 180}
                className="transition-all duration-100"
              />
              {/* a */}
              <path
                d="M820 60 Q820 45 835 45 Q850 45 850 60 Q850 75 835 75 Q820 75 820 60 L820 30"
                fill="none"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray="140"
                strokeDashoffset={140 - handwritingProgress1 * 140}
                className="transition-all duration-100"
              />
              {/* i */}
              <path
                d="M860 60 L860 30 M860 100 L860 95"
                fill="none"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray="70"
                strokeDashoffset={70 - handwritingProgress1 * 70}
                className="transition-all duration-100"
              />
              {/* space */}
              <path
                d="M885 65 L900 65"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeDasharray="30"
                strokeDashoffset={30 - handwritingProgress1 * 30}
                className="transition-all duration-100"
              />
              {/* S - Space */}
              <path
                d="M920 60 Q920 75 935 75 Q950 75 950 60 Q950 45 935 45 Q920 45 920 60"
                fill="none"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray="120"
                strokeDashoffset={120 - handwritingProgress1 * 120}
                className="transition-all duration-100"
              />
              {/* p */}
              <path
                d="M970 95 L970 35 Q970 45 980 45 Q990 45 990 60 Q990 75 980 75 Q970 75 970 60"
                fill="none"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray="140"
                strokeDashoffset={140 - handwritingProgress1 * 140}
                className="transition-all duration-100"
              />
              {/* a */}
              <path
                d="M1010 60 Q1010 45 1025 45 Q1040 45 1040 60 Q1040 75 1025 75 Q1010 75 1010 60 L1010 30"
                fill="none"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray="140"
                strokeDashoffset={140 - handwritingProgress1 * 140}
                className="transition-all duration-100"
              />
              {/* c */}
              <path
                d="M1060 60 Q1060 45 1075 45 Q1090 45 1090 60 Q1090 75 1075 75 Q1060 75 1060 60"
                fill="none"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray="120"
                strokeDashoffset={120 - handwritingProgress1 * 120}
                className="transition-all duration-100"
              />
              {/* e */}
              <path
                d="M1110 60 Q1110 75 1125 75 Q1140 75 1140 60 Q1140 45 1125 45 Q1110 45 1110 60 L1110 35"
                fill="none"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray="150"
                strokeDashoffset={150 - handwritingProgress1 * 150}
                className="transition-all duration-100"
              />
            </svg>
          </div>

          {/* Handwriting Animation for "Professional Portfolio" */}
          <div className="relative mt-8 w-full max-w-4xl mx-auto">
            <svg
              width="100%"
              height="140"
              viewBox="0 0 900 140"
              className="text-blue-600 dark:text-teal-300 w-full h-auto max-w-2xl md:max-w-4xl"
              preserveAspectRatio="xMidYMid meet"
            >
              {/* P - Professional */}
              <path
                d="M30 40 L30 90 Q30 100 40 100 Q50 100 50 90 L50 40"
                fill="none"
                stroke="currentColor"
                strokeWidth="5"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray="140"
                strokeDashoffset={140 - handwritingProgress2 * 140}
                className="transition-all duration-100"
              />
              {/* r */}
              <path
                d="M70 60 Q70 75 85 75 Q100 75 100 60 L100 40"
                fill="none"
                stroke="currentColor"
                strokeWidth="5"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray="120"
                strokeDashoffset={120 - handwritingProgress2 * 120}
                className="transition-all duration-100"
              />
              {/* o */}
              <path
                d="M120 60 Q120 45 135 45 Q150 45 150 60 Q150 75 135 75 Q120 75 120 60 Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="5"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray="120"
                strokeDashoffset={120 - handwritingProgress2 * 120}
                className="transition-all duration-100"
              />
              {/* f */}
              <path
                d="M170 95 L170 35 M155 55 L185 55"
                fill="none"
                stroke="currentColor"
                strokeWidth="5"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray="140"
                strokeDashoffset={140 - handwritingProgress2 * 140}
                className="transition-all duration-100"
              />
              {/* e */}
              <path
                d="M195 60 Q195 75 210 75 Q225 75 225 60 Q225 45 210 45 Q195 45 195 60 L195 35"
                fill="none"
                stroke="currentColor"
                strokeWidth="5"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray="150"
                strokeDashoffset={150 - handwritingProgress2 * 150}
                className="transition-all duration-100"
              />
              {/* s */}
              <path
                d="M245 60 Q245 75 260 75 Q275 75 275 60 Q275 45 260 45 Q245 45 245 60"
                fill="none"
                stroke="currentColor"
                strokeWidth="5"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray="120"
                strokeDashoffset={120 - handwritingProgress2 * 120}
                className="transition-all duration-100"
              />
              {/* s */}
              <path
                d="M295 60 Q295 75 310 75 Q325 75 325 60 Q325 45 310 45 Q295 45 295 60"
                fill="none"
                stroke="currentColor"
                strokeWidth="5"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray="120"
                strokeDashoffset={120 - handwritingProgress2 * 120}
                className="transition-all duration-100"
              />
              {/* i */}
              <path
                d="M345 60 L345 30 M345 100 L345 95"
                fill="none"
                stroke="currentColor"
                strokeWidth="5"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray="70"
                strokeDashoffset={70 - handwritingProgress2 * 70}
                className="transition-all duration-100"
              />
              {/* o */}
              <path
                d="M375 60 Q375 45 390 45 Q405 45 405 60 Q405 75 390 75 Q375 75 375 60 Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="5"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray="120"
                strokeDashoffset={120 - handwritingProgress2 * 120}
                className="transition-all duration-100"
              />
              {/* n */}
              <path
                d="M425 40 L425 90 Q425 100 435 100 Q445 100 445 90 L445 40"
                fill="none"
                stroke="currentColor"
                strokeWidth="5"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray="140"
                strokeDashoffset={140 - handwritingProgress2 * 140}
                className="transition-all duration-100"
              />
              {/* space */}
              <path
                d="M465 65 L480 65"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeDasharray="30"
                strokeDashoffset={30 - handwritingProgress2 * 30}
                className="transition-all duration-100"
              />
              {/* P - Portfolio */}
              <path
                d="M490 40 L490 90 Q490 100 500 100 Q510 100 510 90 L510 40"
                fill="none"
                stroke="currentColor"
                strokeWidth="5"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray="140"
                strokeDashoffset={140 - handwritingProgress2 * 140}
                className="transition-all duration-100"
              />
              {/* o */}
              <path
                d="M530 60 Q530 45 545 45 Q560 45 560 60 Q560 75 545 75 Q530 75 530 60 Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="5"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray="120"
                strokeDashoffset={120 - handwritingProgress2 * 120}
                className="transition-all duration-100"
              />
              {/* r */}
              <path
                d="M580 60 Q580 75 595 75 Q610 75 610 60 L610 40"
                fill="none"
                stroke="currentColor"
                strokeWidth="5"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray="120"
                strokeDashoffset={120 - handwritingProgress2 * 120}
                className="transition-all duration-100"
              />
              {/* t */}
              <path
                d="M630 95 L630 35 M615 55 L645 55"
                fill="none"
                stroke="currentColor"
                strokeWidth="5"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray="140"
                strokeDashoffset={140 - handwritingProgress2 * 140}
                className="transition-all duration-100"
              />
              {/* f */}
              <path
                d="M655 95 L655 35 M640 55 L670 55"
                fill="none"
                stroke="currentColor"
                strokeWidth="5"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray="140"
                strokeDashoffset={140 - handwritingProgress2 * 140}
                className="transition-all duration-100"
              />
              {/* o */}
              <path
                d="M680 60 Q680 45 695 45 Q710 45 710 60 Q710 75 695 75 Q680 75 680 60 Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="5"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray="120"
                strokeDashoffset={120 - handwritingProgress2 * 120}
                className="transition-all duration-100"
              />
              {/* l */}
              <path
                d="M730 95 Q730 85 730 75 L730 35"
                fill="none"
                stroke="currentColor"
                strokeWidth="5"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray="80"
                strokeDashoffset={80 - handwritingProgress2 * 80}
                className="transition-all duration-100"
              />
              {/* i */}
              <path
                d="M760 60 L760 30 M760 100 L760 95"
                fill="none"
                stroke="currentColor"
                strokeWidth="5"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray="70"
                strokeDashoffset={70 - handwritingProgress2 * 70}
                className="transition-all duration-100"
              />
              {/* o */}
              <path
                d="M790 60 Q790 45 805 45 Q820 45 820 60 Q820 75 805 75 Q790 75 790 60 Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="5"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray="120"
                strokeDashoffset={120 - handwritingProgress2 * 120}
                className="transition-all duration-100"
              />
            </svg>
          </div>
        </motion.div>
      )}
    </div>
  );
}