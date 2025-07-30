import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

export default function SplashPage({ onComplete, isDarkMode }) {
  const canvasRef = useRef(null);
  const animationId = useRef(null);
  const [showText, setShowText] = useState(false);
  const [textAnimationPhase, setTextAnimationPhase] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);
  const [handwritingProgress1, setHandwritingProgress1] = useState(0);
  const [handwritingProgress2, setHandwritingProgress2] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Brain-like neural network animation
    const nodes = [];
    const connections = [];
    const nodeCount = 120;
    const maxConnections = 240;

    // Initialize nodes
    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 2 + 1,
        connections: []
      });
    }

    // Create initial connections
    for (let i = 0; i < maxConnections; i++) {
      const nodeA = nodes[Math.floor(Math.random() * nodeCount)];
      const nodeB = nodes[Math.floor(Math.random() * nodeCount)];
      
      if (nodeA !== nodeB && nodeA.connections.length < 4 && nodeB.connections.length < 4) {
        const distance = Math.sqrt(
          Math.pow(nodeA.x - nodeB.x, 2) + Math.pow(nodeA.y - nodeB.y, 2)
        );
        
        if (distance < 150) {
          connections.push({ nodeA, nodeB, strength: Math.random() });
          nodeA.connections.push(nodeB);
          nodeB.connections.push(nodeA);
        }
      }
    }

    let animationProgress = 0;

    const animateBrainToExplosionToCalm = (targetProgress) => {
      // Brain formation phase (0-0.3)
      // Explosion phase (0.3-0.7)  
      // Calm settling phase (0.7-1.0)
      
      animationProgress = targetProgress;
      
      // Clear canvas
      ctx.fillStyle = isDarkMode ? 'rgba(15, 23, 42, 0.1)' : 'rgba(248, 250, 252, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update node positions based on animation phase
      nodes.forEach(node => {
        if (animationProgress < 0.3) {
          // Brain formation - nodes move toward center
          const centerX = canvas.width / 2;
          const centerY = canvas.height / 2;
          const attractionForce = 0.01;
          
          node.vx += (centerX - node.x) * attractionForce;
          node.vy += (centerY - node.y) * attractionForce;
          
          // Add some orbital motion
          const angle = Math.atan2(node.y - centerY, node.x - centerX);
          node.vx += Math.cos(angle + Math.PI/2) * 0.02;
          node.vy += Math.sin(angle + Math.PI/2) * 0.02;
          
        } else if (animationProgress < 0.7) {
          // Explosion phase - rapid expansion
          const explosionForce = (animationProgress - 0.3) * 10;
          const centerX = canvas.width / 2;
          const centerY = canvas.height / 2;
          
          const angle = Math.atan2(node.y - centerY, node.x - centerX);
          node.vx += Math.cos(angle) * explosionForce;
          node.vy += Math.sin(angle) * explosionForce;
          
        } else {
          // Calm phase - gentle floating motion
          node.vx *= 0.98; // Damping
          node.vy *= 0.98;
          
          // Add gentle random motion
          node.vx += (Math.random() - 0.5) * 0.02;
          node.vy += (Math.random() - 0.5) * 0.02;
        }
        
        // Apply velocity
        node.x += node.vx;
        node.y += node.vy;
        
        // Boundary conditions
        if (node.x < 0 || node.x > canvas.width) node.vx *= -0.8;
        if (node.y < 0 || node.y > canvas.height) node.vy *= -0.8;
        
        node.x = Math.max(0, Math.min(canvas.width, node.x));
        node.y = Math.max(0, Math.min(canvas.height, node.y));
      });

      // Draw connections
      ctx.strokeStyle = isDarkMode ? 'rgba(59, 130, 246, 0.3)' : 'rgba(37, 99, 235, 0.3)';
      ctx.lineWidth = 1;
      
      connections.forEach(connection => {
        const { nodeA, nodeB } = connection;
        const distance = Math.sqrt(
          Math.pow(nodeA.x - nodeB.x, 2) + Math.pow(nodeA.y - nodeB.y, 2)
        );
        
        if (distance < 200) {
          const opacity = Math.max(0, 1 - distance / 200);
          ctx.globalAlpha = opacity * (animationProgress > 0.7 ? 0.6 : 1);
          
          ctx.beginPath();
          ctx.moveTo(nodeA.x, nodeA.y);
          ctx.lineTo(nodeB.x, nodeB.y);
          ctx.stroke();
        }
      });

      // Draw nodes
      ctx.globalAlpha = 1;
      nodes.forEach(node => {
        const glowSize = animationProgress > 0.7 ? 2 : 4;
        
        // Glow effect
        const gradient = ctx.createRadialGradient(
          node.x, node.y, 0,
          node.x, node.y, node.radius + glowSize
        );
        gradient.addColorStop(0, isDarkMode ? 'rgba(59, 130, 246, 0.8)' : 'rgba(37, 99, 235, 0.8)');
        gradient.addColorStop(1, 'rgba(59, 130, 246, 0)');
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius + glowSize, 0, Math.PI * 2);
        ctx.fill();
        
        // Core node
        ctx.fillStyle = isDarkMode ? '#3b82f6' : '#2563eb';
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fill();
      });
    };

    const animate = () => {
      animationProgress += 0.005;
      
      if (animationProgress <= 1) {
        animateBrainToExplosionToCalm(animationProgress);
        animationId.current = requestAnimationFrame(animate);
        
        // Trigger text phase when brain settles
        if (animationProgress >= 0.8 && !showText) {
          console.log("Starting text animation phase");
          setShowText(true);
          setTextAnimationPhase(1);
        }
      }
      
      // Start handwriting animation when text appears
      if (showText && textAnimationPhase === 1) {
        const animateHandwriting1 = () => {
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
                const animateHandwriting2 = () => {
                  let progress2 = 0;
                  const duration2 = 4000; // 4 seconds for second text
                  const startTime2 = Date.now();

                  const animate2 = () => {
                    const elapsed2 = Date.now() - startTime2;
                    progress2 = Math.min(1, elapsed2 / duration2);
                    setHandwritingProgress2(progress2);

                    if (progress2 < 1) {
                      requestAnimationFrame(animate2);
                    }
                  };
                  animate2();
                };
                animateHandwriting2();
              }, 800); // 800ms delay between texts
            }
          };
          animate();
        };

        animateHandwriting1();

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
        }, 8000); // 8s total for text animation + pause
      }
    };

    // Start animation immediately
    console.log("Starting animation loop");
    animate();

    // Cleanup
    return () => {
      if (animationId.current) {
        cancelAnimationFrame(animationId.current);
      }
    };
  }, [isDarkMode, onComplete]);

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
          className="absolute inset-0 flex flex-col items-center justify-center z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: textAnimationPhase === 2 ? 0 : 1 }}
          transition={{
            delay: textAnimationPhase === 1 ? 0.5 : 0,
            duration: textAnimationPhase === 1 ? 1 : 0.5,
          }}
        >
          {/* Handwriting Animation for "Welcome to ..." */}
          <div className="relative">
            <svg
              width="600"
              height="120"
              viewBox="0 0 600 120"
              className="text-slate-800 dark:text-white"
            >
              {/* W */}
              <path
                d="M20 40 Q35 80 50 60 Q65 80 80 40"
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
                d="M100 60 Q100 75 115 75 Q130 75 130 60 Q130 45 115 45 Q100 45 100 60 L100 35"
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
                d="M150 95 Q150 85 150 75 L150 35"
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
                d="M180 60 Q180 75 195 75 Q210 75 210 60 Q210 45 195 45 Q180 45 180 60"
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
                d="M230 60 Q230 75 245 75 Q260 75 260 60 Q260 45 245 45 Q230 45 230 60 Z"
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
                d="M280 40 L280 60 Q280 70 290 70 Q300 70 300 60 L300 40
                   M300 60 Q300 70 310 70 Q320 70 320 60 L320 40"
                fill="none"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray="160"
                strokeDashoffset={160 - handwritingProgress1 * 160}
                className="transition-all duration-100"
              />
              {/* e */}
              <path
                d="M340 60 Q340 75 355 75 Q370 75 370 60 Q370 45 355 45 Q340 45 340 60 L340 35"
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
                d="M390 45 L405 45"
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
                d="M420 95 L420 35 M405 55 L435 55"
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
                d="M455 60 Q455 75 470 75 Q485 75 485 60 Q485 45 470 45 Q455 45 455 60 Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray="120"
                strokeDashoffset={120 - handwritingProgress1 * 120}
                className="transition-all duration-100"
              />
              {/* ... */}
              <path
                d="M500 50 L505 50 M510 50 L515 50 M520 50 L525 50"
                fill="none"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
                strokeDasharray="80"
                strokeDashoffset={80 - handwritingProgress1 * 80}
                className="transition-all duration-100"
              />
            </svg>
          </div>

          {/* Handwriting Animation for "Mun Wai's Space" */}
          <div className="relative mt-8">
            <svg
              width="700"
              height="140"
              viewBox="0 0 700 140"
              className="text-blue-600 dark:text-teal-300"
            >
              {/* M */}
              <path
                d="M30 40 L30 90 Q30 100 40 100 Q50 100 50 90 L50 40
                   M50 90 Q50 100 60 100 Q70 100 70 90 L70 40"
                fill="none"
                stroke="currentColor"
                strokeWidth="5"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray="200"
                strokeDashoffset={200 - handwritingProgress2 * 200}
                className="transition-all duration-100"
              />
              {/* u */}
              <path
                d="M90 90 L90 70 Q90 60 100 60 Q110 60 110 70 L110 90"
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
                d="M130 40 L130 90 Q130 100 140 100 Q150 100 150 90 L150 40"
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
                d="M170 65 L185 65"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeDasharray="30"
                strokeDashoffset={30 - handwritingProgress2 * 30}
                className="transition-all duration-100"
              />
              {/* W */}
              <path
                d="M195 40 Q210 90 225 70 Q240 90 255 40"
                fill="none"
                stroke="currentColor"
                strokeWidth="5"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray="180"
                strokeDashoffset={180 - handwritingProgress2 * 180}
                className="transition-all duration-100"
              />
              {/* a */}
              <path
                d="M275 80 Q275 95 290 95 Q305 95 305 80 Q305 65 290 65 Q275 65 275 80 L275 50"
                fill="none"
                stroke="currentColor"
                strokeWidth="5"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray="140"
                strokeDashoffset={140 - handwritingProgress2 * 140}
                className="transition-all duration-100"
              />
              {/* i */}
              <path
                d="M325 80 L325 50 M325 100 L325 95"
                fill="none"
                stroke="currentColor"
                strokeWidth="5"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray="70"
                strokeDashoffset={70 - handwritingProgress2 * 70}
                className="transition-all duration-100"
              />
              {/* ' */}
              <path
                d="M355 95 Q360 85 365 95"
                fill="none"
                stroke="currentColor"
                strokeWidth="5"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray="30"
                strokeDashoffset={30 - handwritingProgress2 * 30}
                className="transition-all duration-100"
              />
              {/* s */}
              <path
                d="M385 80 Q385 95 400 95 Q415 95 415 80 Q415 65 400 65 Q385 65 385 80"
                fill="none"
                stroke="currentColor"
                strokeWidth="5"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray="120"
                strokeDashoffset={120 - handwritingProgress2 * 120}
                className="transition-all duration-100"
              />
              {/* space */}
              <path
                d="M435 65 L450 65"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeDasharray="30"
                strokeDashoffset={30 - handwritingProgress2 * 30}
                className="transition-all duration-100"
              />
              {/* S */}
              <path
                d="M470 80 Q470 95 485 95 Q500 95 500 80 Q500 65 485 65 Q470 65 470 80"
                fill="none"
                stroke="currentColor"
                strokeWidth="5"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray="120"
                strokeDashoffset={120 - handwritingProgress2 * 120}
                className="transition-all duration-100"
              />
              {/* p */}
              <path
                d="M520 90 L520 40 M520 80 Q520 95 535 95 Q550 95 550 80 Q550 65 535 65 Q520 65 520 80"
                fill="none"
                stroke="currentColor"
                strokeWidth="5"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray="160"
                strokeDashoffset={160 - handwritingProgress2 * 160}
                className="transition-all duration-100"
              />
              {/* a */}
              <path
                d="M570 80 Q570 95 585 95 Q600 95 600 80 Q600 65 585 65 Q570 65 570 80 L570 50"
                fill="none"
                stroke="currentColor"
                strokeWidth="5"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray="140"
                strokeDashoffset={140 - handwritingProgress2 * 140}
                className="transition-all duration-100"
              />
              {/* c */}
              <path
                d="M620 80 Q620 95 635 95 Q650 95 650 80 Q650 65 635 65 Q620 65 620 80"
                fill="none"
                stroke="currentColor"
                strokeWidth="5"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray="120"
                strokeDashoffset={120 - handwritingProgress2 * 120}
                className="transition-all duration-100"
              />
              {/* e */}
              <path
                d="M670 80 Q670 95 685 95 Q700 95 700 80 Q700 65 685 65 Q670 65 670 80 L670 55"
                fill="none"
                stroke="currentColor"
                strokeWidth="5"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray="150"
                strokeDashoffset={150 - handwritingProgress2 * 150}
                className="transition-all duration-100"
              />
            </svg>
          </div>
        </motion.div>
      )}
    </div>
  );
}