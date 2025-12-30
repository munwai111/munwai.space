import React, { useState, useEffect, useRef, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Mail,
  Download,
  Linkedin,
  Monitor,
  BarChart3,
  Bot,
  Target,
  Smartphone,
  Menu,
  X,
} from "lucide-react";
import { Button } from "./components/ui/button.jsx";
import ThemeToggle from "./components/ThemeToggle.jsx";
import ResumeSection from "./components/ResumeSection.jsx";
import InteractiveBackground from "./components/InteractiveBackground.jsx";
import ProjectCarousel from "./components/ProjectCarousel.jsx";
import TestimonialCarousel from "./components/TestimonialCarousel.jsx";
import CertificationSection from "./components/CertificationSection.jsx";
import HeroProfile from "./components/HeroProfile.jsx";
import NotificationToast from "./components/NotificationToast.jsx";
import CertificationProgressChart from "./components/CertificationProgressChart.jsx";
import InitialAnimation from "./components/InitialAnimation.jsx";
import TimelineSection from "./components/TimelineSection";
import {
  FloatReveal,
  TypeReveal,
  StaggerReveal,
  StaggerItem,
  SlideReveal,
} from "./components/ScrollReveal.jsx";
import { sendEmail } from "./utils/emailService.js";
import "./App.css";

// Device detection utility
const useDeviceDetection = () => {
  const [deviceInfo, setDeviceInfo] = useState({
    isMobile: false,
    isTablet: false,
    isDesktop: false,
    isTV: false,
    isFoldable: false,
    isFlipPhone: false,
    screenWidth: typeof window !== "undefined" ? window.innerWidth : 1200,
    screenHeight: typeof window !== "undefined" ? window.innerHeight : 800,
    orientation: "landscape",
  });

  useEffect(() => {
    const updateDeviceInfo = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const aspectRatio = width / height;

      setDeviceInfo({
        isMobile: width < 768,
        isTablet: width >= 768 && width < 1024,
        isDesktop: width >= 1024 && width < 1920,
        isTV: width >= 1920,
        isFoldable:
          (width >= 768 && width <= 1024 && aspectRatio > 1.3) ||
          (width >= 320 && width <= 374 && aspectRatio < 0.7),
        isFlipPhone: width >= 280 && width <= 319,
        screenWidth: width,
        screenHeight: height,
        orientation: width > height ? "landscape" : "portrait",
      });
    };

    updateDeviceInfo();
    window.addEventListener("resize", updateDeviceInfo);
    window.addEventListener("orientationchange", updateDeviceInfo);

    return () => {
      window.removeEventListener("resize", updateDeviceInfo);
      window.removeEventListener("orientationchange", updateDeviceInfo);
    };
  }, []);

  return deviceInfo;
};

function App() {
  // Device detection hook
  const deviceInfo = useDeviceDetection();

  // State for initial animation - with timeout fallback
  const [showInitialAnimation, setShowInitialAnimation] = useState(true);

  // Fallback: If animation doesn't complete in 2 seconds, show content anyway
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (showInitialAnimation) {
        setShowInitialAnimation(false);
        window.scrollTo(0, 0);
      }
    }, 2000); // 2 second fallback (reduced from 10 seconds)

    return () => clearTimeout(timeout);
  }, [showInitialAnimation]);

  // State for notification
  const [notification, setNotification] = useState({
    isVisible: false,
    message: "",
  });

  // State for mobile navigation
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // State for form data and errors
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Initialize reCAPTCHA when component mounts
  useEffect(() => {
    const initializeRecaptcha = () => {
      if (window.grecaptcha && window.grecaptcha.render) {
        // Check if reCAPTCHA container exists and hasn't been rendered yet
        const recaptchaContainer = document.querySelector(".g-recaptcha");
        if (recaptchaContainer && !recaptchaContainer.hasChildNodes()) {
          window.grecaptcha.render(recaptchaContainer, {
            sitekey: "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI",
            theme: isDarkMode ? "dark" : "light",
          });
        }
      }
    };

    // Check if reCAPTCHA script is already loaded
    if (window.grecaptcha) {
      initializeRecaptcha();
    } else {
      // Wait for reCAPTCHA script to load
      const checkRecaptcha = setInterval(() => {
        if (window.grecaptcha) {
          clearInterval(checkRecaptcha);
          initializeRecaptcha();
        }
      }, 100);

      // Clear interval after 10 seconds to prevent infinite checking
      setTimeout(() => clearInterval(checkRecaptcha), 10000);
    }
  }, [isDarkMode]);

  // Check for dark mode preference and ensure page starts at top
  useEffect(() => {
    const darkModePreference = localStorage.getItem("darkMode") === "true";
    setIsDarkMode(darkModePreference);
    if (darkModePreference) {
      document.documentElement.classList.add("dark");
    }

    // Always start at the top of the page
    window.scrollTo(0, 0);
  }, []);

  // Function to validate name (alphabetic characters only)
  const validateName = (name) => {
    const nameRegex = /^[a-zA-Z\s]+$/;
    return nameRegex.test(name.trim()) && name.trim().length > 0;
  };

  // Function to validate email
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email.trim());
  };

  // Function to handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (formErrors[name]) {
      setFormErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  // Function to validate and submit form
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const errors = {};

    // Validate name
    if (!formData.name.trim()) {
      errors.name = "Name is required";
    } else if (!validateName(formData.name)) {
      errors.name = "Name can only contain letters and spaces";
    }

    // Validate email
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
      errors.email = "Please enter a valid email address";
    }

    // Validate message
    if (!formData.message.trim()) {
      errors.message = "Message is required";
    }

    setFormErrors(errors);

    // If no errors, submit the form
    if (Object.keys(errors).length === 0) {
      setIsSubmitting(true);

      try {
        // Use the email service to send the message
        const result = await sendEmail(formData);

        setNotification({
          isVisible: true,
          message: result.message,
        });

        if (result.success) {
          // Reset form only on success
          setFormData({
            name: "",
            email: "",
            message: "",
          });
        }
      } catch (error) {
        console.error("Error sending message:", error);
        setNotification({
          isVisible: true,
          message:
            "Failed to open email client. Please contact me directly at l_munwai@yahoo.com",
        });
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  // Function to copy text to clipboard and show notification
  const copyToClipboard = async (text, type) => {
    try {
      await navigator.clipboard.writeText(text);
      setNotification({
        isVisible: true,
        message: `${type} copied to clipboard!`,
      });
    } catch (err) {
      console.error("Failed to copy: ", err);
      setNotification({
        isVisible: true,
        message: `Failed to copy ${type.toLowerCase()}`,
      });
    }
  };

  // Function to download CV
  const downloadCV = () => {
    const link = document.createElement("a");
    link.href = "/Looi_Mun_Wai_Resume.pdf";
    link.download = "Looi_Mun_Wai_Resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Enhanced smooth scroll function with natural inertia
  const smoothScrollTo = (targetId) => {
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      // Calculate the target position
      const targetPosition = targetElement.offsetTop - 80; // 80px offset for header
      const startPosition = window.pageYOffset;
      const distance = targetPosition - startPosition;
      const duration = Math.min(Math.abs(distance) * 0.8, 1500); // Dynamic duration with max 1.5s

      let start = null;

      // Easing function for natural inertia (ease-in-out-cubic)
      const easeInOutCubic = (t) => {
        return t < 0.5
          ? 4 * t * t * t
          : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
      };

      const animation = (currentTime) => {
        if (start === null) start = currentTime;
        const timeElapsed = currentTime - start;
        const progress = Math.min(timeElapsed / duration, 1);
        const ease = easeInOutCubic(progress);

        window.scrollTo(0, startPosition + distance * ease);

        if (progress < 1) {
          requestAnimationFrame(animation);
        }
      };

      requestAnimationFrame(animation);
    }
  };

  // Function to scroll to contact section
  const scrollToContact = () => {
    smoothScrollTo("contact");
  };

  // Function to scroll to specific sections
  const scrollToSection = (sectionId) => {
    smoothScrollTo(sectionId);
  };

  // Function to hide notification
  const hideNotification = () => {
    setNotification({ isVisible: false, message: "" });
  };

  // Function to handle initial animation completion - memoized to prevent animation restart
  const handleInitialAnimationComplete = useCallback(() => {
    // Use requestAnimationFrame to ensure smooth transition
    requestAnimationFrame(() => {
      setShowInitialAnimation(false);
      // Ensure page starts at the top
      window.scrollTo(0, 0);
    });
  }, []); // Empty deps - this function should never change

  // Ref for testimonial section for GSAP animation
  const testimonialRef = useRef(null);
  const testimonialSectionRef = useRef(null);

  // Register GSAP ScrollTrigger plugin
  useEffect(() => {
    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger);
    }
  }, []);

  // Animate testimonial section when timeline finishes
  useEffect(() => {
    if (!testimonialRef.current || !testimonialSectionRef.current) return;

    const testimonialContent = testimonialRef.current;
    let scrollTrigger = null;
    let timelineStartTrigger = null;

    // Set initial state - hidden and slightly below
    gsap.set(testimonialContent, {
      opacity: 0,
      y: 80,
    });

    // Wait a bit for the timeline to initialize, then set up the trigger
    const setupTimer = setTimeout(() => {
      const timelineSection = document.getElementById("learning-journey");
      if (!timelineSection) return;

      // Find the timeline container to get the actual scroll height
      const timelineContainer = timelineSection.querySelector(".relative");
      if (!timelineContainer) return;

      // Get the actual scroll height from the timeline container
      const timelineScrollHeight =
        parseFloat(window.getComputedStyle(timelineContainer).height) || 7885; // Fallback to known height

      // Calculate when to start the fade-in (much earlier) so it completes at timeline end
      // Start animation when we're 92% through the timeline scroll (earlier trigger)
      const fadeInStart = timelineScrollHeight * 0.92;

      // Kill any existing triggers first
      if (scrollTrigger) scrollTrigger.kill();
      if (timelineStartTrigger) timelineStartTrigger.kill();

      // Create ScrollTrigger that starts earlier for smooth transition
      scrollTrigger = ScrollTrigger.create({
        trigger: timelineSection,
        start: "top top",
        end: () => `+=${fadeInStart}`, // Start fade-in at 92% through timeline (earlier)
        onEnter: () => {
          // Animate testimonial section in smoothly, starting much earlier
          gsap.to(testimonialContent, {
            opacity: 1,
            y: 0,
            duration: 0.8, // Shorter duration since we start much earlier
            ease: "power3.out",
          });
        },
        onEnterBack: () => {
          // Keep visible when scrolling back down
          gsap.to(testimonialContent, {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: "power2.out",
          });
        },
        onLeaveBack: () => {
          // Fade out when scrolling back up before reaching fade-in point
          gsap.to(testimonialContent, {
            opacity: 0,
            y: 80,
            duration: 0.6,
            ease: "power2.in",
          });
        },
      });

      // Also set up a trigger for when entering the timeline section from below (scrolling up)
      // This ensures testimonial fades out later (not too early) when scrolling up into timeline
      timelineStartTrigger = ScrollTrigger.create({
        trigger: timelineSection,
        start: "top 60%", // Start fade-out later - when timeline top is 60% down viewport (more visible)
        end: "top bottom", // When timeline top enters viewport bottom
        onEnter: () => {
          // Fade out testimonial when timeline becomes more visible (later trigger)
          gsap.to(testimonialContent, {
            opacity: 0,
            y: 80,
            duration: 0.7, // Slightly longer fade-out
            ease: "power2.in",
          });
        },
        onLeaveBack: () => {
          // Fade back in if we scroll back down before timeline
          gsap.to(testimonialContent, {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: "power2.out",
          });
        },
      });

      // Force refresh ScrollTrigger to ensure triggers are active
      ScrollTrigger.refresh();
    }, 800); // Increased delay to ensure timeline is fully initialized

    // Also refresh on window resize
    const handleResize = () => {
      ScrollTrigger.refresh();
    };
    window.addEventListener("resize", handleResize, { passive: true });

    return () => {
      clearTimeout(setupTimer);
      window.removeEventListener("resize", handleResize);
      if (scrollTrigger) {
        scrollTrigger.kill();
      }
      if (timelineStartTrigger) {
        timelineStartTrigger.kill();
      }
    };
  }, []);

  // Force refresh ScrollTrigger when component updates
  useEffect(() => {
    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 1000);

    return () => {
      clearTimeout(refreshTimer);
    };
  }, []);

  return (
    <div
      className={`min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 transition-colors duration-300 overflow-x-hidden max-w-full ${
        showInitialAnimation ? "overflow-y-hidden" : ""
      }`}
    >
      {/* Initial Animation */}
      {showInitialAnimation && (
        <InitialAnimation onComplete={handleInitialAnimationComplete} />
      )}

      {/* Main Content - Fade in simultaneously with splash page fade out */}
      <div
        className={`transition-opacity duration-1000 ease-in-out ${
          showInitialAnimation
            ? "opacity-0 pointer-events-none"
            : "opacity-100 pointer-events-auto"
        }`}
        style={{
          willChange: showInitialAnimation ? "opacity" : "auto",
          backfaceVisibility: "hidden",
          WebkitBackfaceVisibility: "hidden",
        }}
      >
        <ThemeToggle />

        {/* Navigation */}
        <nav className="fixed top-0 w-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-md z-40 border-b border-slate-200 dark:border-slate-700 transition-colors duration-300">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
            <div className="flex justify-between items-center">
              <h1
                className={`text-slate-800 dark:text-white transition-colors duration-300  ${
                  deviceInfo.isMobile
                    ? "text-lg"
                    : deviceInfo.isTablet
                    ? "text-xl"
                    : "text-xl"
                }`}
              >
                Looi Mun Wai
              </h1>

              {/* Desktop Navigation */}
              <div className="hidden md:flex space-x-4 lg:space-x-8">
                <button
                  onClick={() => scrollToSection("home")}
                  className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300 cursor-pointer text-sm lg:text-base"
                >
                  Home
                </button>
                <button
                  onClick={() => scrollToSection("about")}
                  className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300 cursor-pointer text-sm lg:text-base"
                >
                  About
                </button>
                <button
                  onClick={() => scrollToSection("projects")}
                  className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300 cursor-pointer text-sm lg:text-base"
                >
                  Projects
                </button>
                <button
                  onClick={() => scrollToSection("skills")}
                  className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300 cursor-pointer text-sm lg:text-base"
                >
                  Skills
                </button>
                <button
                  onClick={() => scrollToSection("testimonials")}
                  className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300 cursor-pointer text-sm lg:text-base"
                >
                  Testimonials
                </button>
                <button
                  onClick={() => scrollToSection("contact")}
                  className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300 cursor-pointer text-sm lg:text-base"
                >
                  Contact
                </button>
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300"
                aria-label="Toggle mobile menu"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>

            {/* Mobile Navigation Menu */}
            {isMobileMenuOpen && (
              <div className="md:hidden mt-4 pb-4 border-t border-slate-200 dark:border-slate-700">
                <div className="flex flex-col space-y-3 pt-4">
                  <button
                    onClick={() => {
                      scrollToSection("home");
                      setIsMobileMenuOpen(false);
                    }}
                    className="text-left py-2 px-4 text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-all duration-300 text-base"
                  >
                    Home
                  </button>
                  <button
                    onClick={() => {
                      scrollToSection("about");
                      setIsMobileMenuOpen(false);
                    }}
                    className="text-left py-2 px-4 text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-all duration-300 text-base"
                  >
                    About
                  </button>
                  <button
                    onClick={() => {
                      scrollToSection("projects");
                      setIsMobileMenuOpen(false);
                    }}
                    className="text-left py-2 px-4 text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-all duration-300 text-base"
                  >
                    Projects
                  </button>
                  <button
                    onClick={() => {
                      scrollToSection("skills");
                      setIsMobileMenuOpen(false);
                    }}
                    className="text-left py-2 px-4 text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-all duration-300 text-base"
                  >
                    Skills
                  </button>
                  <button
                    onClick={() => {
                      scrollToSection("testimonials");
                      setIsMobileMenuOpen(false);
                    }}
                    className="text-left py-2 px-4 text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-all duration-300 text-base"
                  >
                    Testimonials
                  </button>
                  <button
                    onClick={() => {
                      scrollToSection("contact");
                      setIsMobileMenuOpen(false);
                    }}
                    className="text-left py-2 px-4 text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-all duration-300 text-base"
                  >
                    Contact
                  </button>
                </div>
              </div>
            )}
          </div>
        </nav>

        {/* Hero Section */}
        <section
          id="home"
          className={`min-h-screen flex items-center justify-center relative overflow-hidden ${
            deviceInfo.isMobile
              ? "pt-16 px-4"
              : deviceInfo.isTablet
              ? "pt-20 px-6"
              : "pt-20 px-6"
          }`}
        >
          {/* Interactive Background */}
          <div className="absolute inset-0">
            <InteractiveBackground />
          </div>

          {/* Hero Content */}
          <div
            className={`mx-auto relative z-10 w-full ${
              deviceInfo.isTV
                ? "max-w-7xl px-8"
                : deviceInfo.isDesktop
                ? "max-w-6xl px-8"
                : deviceInfo.isTablet
                ? "max-w-4xl px-6"
                : "max-w-full px-4"
            }`}
          >
            <div
              className={`items-center w-full ${
                deviceInfo.isMobile || deviceInfo.isFlipPhone
                  ? "flex flex-col gap-8"
                  : deviceInfo.isTablet && deviceInfo.orientation === "portrait"
                  ? "flex flex-col gap-10"
                  : "flex lg:flex-row flex-col gap-12 lg:gap-16 items-center justify-between"
              }`}
            >
              <div
                className={`order-2 lg:order-1 w-full lg:max-w-2xl ${
                  deviceInfo.isMobile || deviceInfo.isFlipPhone
                    ? "text-center"
                    : deviceInfo.isTablet &&
                      deviceInfo.orientation === "portrait"
                    ? "text-center"
                    : "text-center lg:text-left"
                }`}
              >
                <h1
                  className={`text-slate-900 dark:text-white mb-4 transition-colors duration-300 ${
                    deviceInfo.isFlipPhone
                      ? "text-2xl"
                      : deviceInfo.isMobile
                      ? "text-3xl sm:text-4xl"
                      : deviceInfo.isTablet
                      ? "text-4xl sm:text-5xl"
                      : deviceInfo.isTV
                      ? "text-7xl lg:text-8xl"
                      : "text-4xl sm:text-5xl lg:text-6xl"
                  }`}
                >
                  <TypeReveal delay={0.5}>Looi Mun Wai</TypeReveal>
                </h1>
                <p
                  className={`text-slate-600 dark:text-slate-300 mb-2 transition-colors duration-300 ${
                    deviceInfo.isFlipPhone
                      ? "text-sm"
                      : deviceInfo.isMobile
                      ? "text-base sm:text-lg"
                      : deviceInfo.isTablet
                      ? "text-lg sm:text-xl"
                      : deviceInfo.isTV
                      ? "text-2xl sm:text-3xl"
                      : "text-lg sm:text-xl"
                  }`}
                >
                  <TypeReveal delay={0.8}>吕文维</TypeReveal>
                </p>
                <p
                  className={`text-blue-600 dark:text-blue-400 mb-6 transition-colors duration-300 ${
                    deviceInfo.isFlipPhone
                      ? "text-sm leading-tight"
                      : deviceInfo.isMobile
                      ? "text-base sm:text-lg leading-relaxed"
                      : deviceInfo.isTablet
                      ? "text-lg sm:text-xl"
                      : deviceInfo.isTV
                      ? "text-2xl sm:text-3xl"
                      : "text-lg sm:text-xl"
                  }`}
                >
                  <TypeReveal delay={1.0}>
                    Applied Science (Psychology) Graduate | Bridging People,
                    Data & Impact
                  </TypeReveal>
                </p>

                <blockquote
                  className={`font-medium text-slate-700 dark:text-slate-200 mb-6 italic border-l-4 border-blue-500 pl-4 transition-colors duration-300 ${
                    deviceInfo.isFlipPhone
                      ? "text-base"
                      : deviceInfo.isMobile
                      ? "text-lg sm:text-xl"
                      : deviceInfo.isTablet
                      ? "text-xl sm:text-2xl"
                      : deviceInfo.isTV
                      ? "text-3xl sm:text-4xl"
                      : "text-xl sm:text-2xl"
                  }`}
                >
                  <TypeReveal delay={1.3}>
                    "Curiosity-driven. People-focused. Outcome-oriented."
                  </TypeReveal>
                </blockquote>

                <p
                  className={`text-slate-600 dark:text-slate-300 mb-8 transition-colors duration-300 ${
                    deviceInfo.isFlipPhone
                      ? "text-sm leading-relaxed"
                      : deviceInfo.isMobile
                      ? "text-base leading-relaxed"
                      : deviceInfo.isTablet
                      ? "text-lg"
                      : deviceInfo.isTV
                      ? "text-2xl"
                      : "text-lg"
                  }`}
                >
                  <TypeReveal delay={1.6}>
                    I bridge psychology and strategy to empower individuals and
                    organisations—turning human insight into meaningful impact.
                  </TypeReveal>
                </p>

                <div
                  className={`flex gap-4 ${
                    deviceInfo.isMobile || deviceInfo.isFlipPhone
                      ? "flex-col items-center"
                      : deviceInfo.isTablet &&
                        deviceInfo.orientation === "portrait"
                      ? "flex-col sm:flex-row justify-center items-center"
                      : "flex-col sm:flex-row justify-center lg:justify-start items-center sm:items-start"
                  }`}
                >
                  <Button
                    onClick={scrollToContact}
                    className={`bg-blue-600 hover:bg-blue-700 text-white transition-colors duration-300 ${
                      deviceInfo.isFlipPhone
                        ? "px-4 py-2 text-sm"
                        : deviceInfo.isMobile
                        ? "px-6 py-3 text-base"
                        : deviceInfo.isTablet
                        ? "px-8 py-3 text-lg"
                        : deviceInfo.isTV
                        ? "px-12 py-4 text-2xl"
                        : "px-8 py-3 text-lg"
                    }`}
                  >
                    <Mail
                      className={`mr-2 ${
                        deviceInfo.isFlipPhone
                          ? "h-4 w-4"
                          : deviceInfo.isTV
                          ? "h-8 w-8"
                          : "h-5 w-5"
                      }`}
                    />
                    <TypeReveal delay={1.9}>Get In Touch</TypeReveal>
                  </Button>
                  <Button
                    variant="outline"
                    onClick={downloadCV}
                    className={`border-red-500 text-red-600 hover:bg-red-50 dark:border-red-400 dark:text-red-400 dark:hover:bg-red-900/20 transition-colors duration-300 ${
                      deviceInfo.isFlipPhone
                        ? "px-4 py-2 text-sm"
                        : deviceInfo.isMobile
                        ? "px-6 py-3 text-base"
                        : deviceInfo.isTablet
                        ? "px-8 py-3 text-lg"
                        : deviceInfo.isTV
                        ? "px-12 py-4 text-2xl"
                        : "px-8 py-3 text-lg"
                    }`}
                  >
                    <Download
                      className={`mr-2 ${
                        deviceInfo.isFlipPhone
                          ? "h-4 w-4"
                          : deviceInfo.isTV
                          ? "h-8 w-8"
                          : "h-5 w-5"
                      }`}
                    />
                    <TypeReveal delay={2.1}>Download CV</TypeReveal>
                  </Button>
                </div>
              </div>

              {/* Stylistic Hero Subject with Weight Effect */}
              <div
                className={`order-1 lg:order-2 flex justify-center items-center shrink-0 ${
                  deviceInfo.isMobile || deviceInfo.isFlipPhone
                    ? "w-full max-w-[200px] mx-auto mb-8"
                    : deviceInfo.isTablet &&
                      deviceInfo.orientation === "portrait"
                    ? "w-full max-w-[280px] mx-auto mb-8"
                    : "w-auto max-w-[400px] lg:max-w-[450px]"
                }`}
              >
                <HeroProfile deviceInfo={deviceInfo} />
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section
          id="about"
          className="py-16 md:py-24 px-4 md:px-6 bg-white dark:bg-slate-800 transition-colors duration-300"
        >
          <div className="max-w-5xl mx-auto w-full">
            <FloatReveal>
              <div className="text-center mb-16">
                <h2 className="text-4xl font-semibold text-slate-800 dark:text-white mb-6 transition-colors duration-300">
                  <TypeReveal delay={0.2}>About Me</TypeReveal>
                </h2>
                <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-8"></div>
              </div>
            </FloatReveal>
            <StaggerReveal
              staggerDelay={0.15}
              className="prose prose-xl max-w-none text-slate-600 dark:text-slate-300 transition-colors duration-300 leading-relaxed"
            >
              <StaggerItem>
                <p className="mb-8 text-lg">
                  An early-career professional with a strong foundation in
                  psychology, organisational behaviour, communication, and human
                  motivation. With field-tested experience across leadership,
                  cross-cultural collaboration, mentoring, and strategic
                  thinking, bringing a people-first mindset to everything
                  undertaken.
                </p>
              </StaggerItem>
              <StaggerItem>
                <p className="mb-8 text-lg">
                  Curious, driven, and highly reflective, known for the ability
                  to connect with others, adapt quickly, and leave a lasting
                  impression. Values authenticity, personal growth, and creating
                  meaningful experiences—whether through research, storytelling,
                  or systems-level thinking.
                </p>
              </StaggerItem>
              <StaggerItem>
                <p className="text-lg">
                  Currently at a pivotal stage—seeking a full-time opportunity
                  in Melbourne where meaningful contribution, professional
                  growth, and building toward long-term residency and impact can
                  be achieved.
                </p>
              </StaggerItem>
            </StaggerReveal>
          </div>
        </section>

        {/* Projects Section */}
        <section
          id="projects"
          className="py-24 px-6 bg-slate-50 dark:bg-slate-900 transition-colors duration-300"
        >
          <div className="max-w-7xl mx-auto">
            <FloatReveal>
              <ProjectCarousel />
            </FloatReveal>
          </div>
        </section>

        {/* Resume Section */}
        <ResumeSection downloadCV={downloadCV} />

        {/* Technical Skills & Tools Section */}
        <section
          id="skills"
          className="py-20 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 transition-colors duration-300"
        >
          <div className="container mx-auto px-6">
            <FloatReveal>
              <div className="text-center mb-16">
                <h2 className="text-4xl font-semibold text-gray-900 dark:text-white mb-4">
                  <TypeReveal delay={0.2}>Technical Skills & Tools</TypeReveal>
                </h2>
                <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                  Comprehensive technical expertise across design, development,
                  data analysis, and AI tools
                </p>
              </div>
            </FloatReveal>

            <StaggerReveal
              staggerDelay={0.1}
              className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16"
            >
              {/* Development & Design */}
              <StaggerItem>
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 h-full">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mr-3">
                      <Monitor className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      <TypeReveal>Development & Design</TypeReveal>
                    </h3>
                  </div>
                  <div className="space-y-2">
                    {[
                      "React",
                      "JavaScript",
                      "HTML/CSS",
                      "Figma",
                      "Adobe XD",
                      "Photoshop",
                      "Premier Pro",
                      "After Effects",
                      "Canva",
                      "CapCut",
                    ].map((skill) => (
                      <span
                        key={skill}
                        className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm rounded-full mr-2 mb-2"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </StaggerItem>

              {/* Data Analysis */}
              <StaggerItem>
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 h-full">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mr-3">
                      <BarChart3 className="w-6 h-6 text-green-600 dark:text-green-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      <TypeReveal>Data Analysis</TypeReveal>
                    </h3>
                  </div>
                  <div className="space-y-2">
                    {[
                      "SPSS",
                      "R Studio",
                      "Python",
                      "Excel",
                      "VosViewer",
                      "WEKA",
                      "Statistical Analysis",
                      "Data Visualization",
                    ].map((skill) => (
                      <span
                        key={skill}
                        className="inline-block px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-sm rounded-full mr-2 mb-2"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </StaggerItem>

              {/* AI & Productivity */}
              <StaggerItem>
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 h-full">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mr-3">
                      <Bot className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      <TypeReveal>AI & Productivity</TypeReveal>
                    </h3>
                  </div>
                  <div className="space-y-2">
                    {[
                      "ChatGPT",
                      "Claude",
                      "DeepSeek",
                      "Scispace",
                      "Notion",
                      "Microsoft Office Suite",
                      "Google Workspace",
                      "PowerPoint",
                      "Teams",
                      "Meet",
                    ].map((skill) => (
                      <span
                        key={skill}
                        className="inline-block px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 text-sm rounded-full mr-2 mb-2"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </StaggerItem>

              {/* Core Competencies */}
              <StaggerItem>
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 h-full">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center mr-3">
                      <Target className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      <TypeReveal>Core Competencies</TypeReveal>
                    </h3>
                  </div>
                  <div className="space-y-2">
                    {[
                      "Ideation",
                      "Collaboration",
                      "Problem-Solving",
                      "Strategic Thinking",
                      "Cross-Cultural Communication",
                      "Project Management",
                      "Stakeholder Engagement",
                      "Change Management",
                      "Innovation Leadership",
                      "Quality Assurance",
                    ].map((skill) => (
                      <span
                        key={skill}
                        className="inline-block px-3 py-1 bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200 text-sm rounded-full mr-2 mb-2"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </StaggerItem>
            </StaggerReveal>

            {/* Job Applications Section */}
            <FloatReveal delay={0.2}>
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 rounded-xl p-8">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
                  <TypeReveal delay={0.3}>Relevant Job Applications</TypeReveal>
                </h3>
                <StaggerReveal
                  staggerDelay={0.08}
                  className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                  <StaggerItem>
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md h-full">
                      <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                        <TypeReveal>UX/UI Designer</TypeReveal>
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                        <TypeReveal>
                          Design user-centered interfaces and experiences
                        </TypeReveal>
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {[
                          "Figma",
                          "Adobe XD",
                          "Photoshop",
                          "User Research",
                          "Prototyping",
                        ].map((skill) => (
                          <span
                            key={skill}
                            className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs rounded"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </StaggerItem>

                  <StaggerItem>
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md h-full">
                      <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                        <TypeReveal>Data Analyst</TypeReveal>
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                        <TypeReveal>
                          Analyze data to drive business insights
                        </TypeReveal>
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {[
                          "SPSS",
                          "R Studio",
                          "Python",
                          "Excel",
                          "Statistical Analysis",
                        ].map((skill) => (
                          <span
                            key={skill}
                            className="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-xs rounded"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </StaggerItem>

                  <StaggerItem>
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md h-full">
                      <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                        <TypeReveal>AI Prompt Engineer</TypeReveal>
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                        <TypeReveal>
                          Develop and optimize AI prompts for business
                          applications
                        </TypeReveal>
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {[
                          "ChatGPT",
                          "Claude",
                          "DeepSeek",
                          "Prompt Engineering",
                          "AI Strategy",
                        ].map((skill) => (
                          <span
                            key={skill}
                            className="px-2 py-1 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 text-xs rounded"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </StaggerItem>

                  <StaggerItem>
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md h-full">
                      <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                        <TypeReveal>Research Analyst</TypeReveal>
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                        <TypeReveal>
                          Conduct research and analyze behavioral data
                        </TypeReveal>
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {[
                          "SPSS",
                          "VosViewer",
                          "Scispace",
                          "Research Methods",
                          "Data Visualization",
                        ].map((skill) => (
                          <span
                            key={skill}
                            className="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-xs rounded"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </StaggerItem>

                  <StaggerItem>
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md h-full">
                      <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                        <TypeReveal>Project Coordinator</TypeReveal>
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                        <TypeReveal>
                          Manage projects and coordinate cross-functional teams
                        </TypeReveal>
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {[
                          "Notion",
                          "Microsoft Office",
                          "Teams",
                          "Project Management",
                          "Stakeholder Engagement",
                        ].map((skill) => (
                          <span
                            key={skill}
                            className="px-2 py-1 bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200 text-xs rounded"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </StaggerItem>

                  <StaggerItem>
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md h-full">
                      <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                        <TypeReveal>Content Creator</TypeReveal>
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                        <TypeReveal>
                          Create engaging multimedia content and presentations
                        </TypeReveal>
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {[
                          "CapCut",
                          "Canva",
                          "Premier Pro",
                          "After Effects",
                          "Content Strategy",
                        ].map((skill) => (
                          <span
                            key={skill}
                            className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs rounded"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </StaggerItem>
                </StaggerReveal>
              </div>
            </FloatReveal>
          </div>
        </section>

        {/* Skills & Expertise Section */}
        <section className="py-16 px-6 bg-white dark:bg-slate-800 transition-colors duration-300">
          <div className="max-w-6xl mx-auto">
            <FloatReveal>
              <h2 className="text-3xl font-bold text-center text-slate-800 dark:text-white mb-12 transition-colors duration-300">
                <TypeReveal delay={0.2}>Skills & Expertise</TypeReveal>
              </h2>
            </FloatReveal>
            <StaggerReveal
              staggerDelay={0.15}
              className="grid md:grid-cols-3 gap-8"
            >
              <StaggerItem>
                <div className="text-center">
                  <h3 className="text-xl font-semibold text-slate-800 dark:text-white mb-4 transition-colors duration-300">
                    <TypeReveal>Technical Skills</TypeReveal>
                  </h3>
                  <div className="flex flex-wrap justify-center gap-2">
                    {[
                      "UX/UI Design",
                      "Data Analysis",
                      "Research Methods",
                      "AI/GenAI",
                      "Psychology",
                    ].map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm rounded-full transition-colors duration-300"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </StaggerItem>
              <StaggerItem>
                <div className="text-center">
                  <h3 className="text-xl font-semibold text-slate-800 dark:text-white mb-4 transition-colors duration-300">
                    <TypeReveal>Communication</TypeReveal>
                  </h3>
                  <div className="flex flex-wrap justify-center gap-2">
                    {[
                      "Active Listening",
                      "Multilingual",
                      "Presentation",
                      "Writing",
                      "Cross-cultural",
                    ].map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-sm rounded-full transition-colors duration-300"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </StaggerItem>
              <StaggerItem>
                <div className="text-center">
                  <h3 className="text-xl font-semibold text-slate-800 dark:text-white mb-4 transition-colors duration-300">
                    <TypeReveal>Leadership</TypeReveal>
                  </h3>
                  <div className="flex flex-wrap justify-center gap-2">
                    {[
                      "Team Leadership",
                      "Mentoring",
                      "Problem Solving",
                      "Critical Thinking",
                      "Adaptability",
                    ].map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 text-sm rounded-full transition-colors duration-300"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </StaggerItem>
            </StaggerReveal>
          </div>
        </section>

        {/* Learning Journey Timeline Section */}
        <TimelineSection deviceInfo={deviceInfo} />

        {/* Testimonials Section */}
        <section
          ref={testimonialSectionRef}
          id="testimonials"
          className="py-16 px-6 bg-slate-50 dark:bg-slate-900 transition-colors duration-300 relative"
          style={{ position: "relative", minHeight: "400px" }}
        >
          <div ref={testimonialRef} className="max-w-6xl mx-auto">
            <TestimonialCarousel />
          </div>
        </section>

        {/* Enhanced Certifications & Awards */}
        <FloatReveal>
          <CertificationSection />
        </FloatReveal>

        {/* Contact Section */}
        <section
          id="contact"
          className="py-16 px-6 bg-white dark:bg-slate-800 transition-colors duration-300"
        >
          <div className="max-w-4xl mx-auto">
            <FloatReveal>
              <h2 className="text-3xl font-semibold text-center text-slate-800 dark:text-white mb-12 transition-colors duration-300">
                <TypeReveal delay={0.2}>Get In Touch</TypeReveal>
              </h2>
            </FloatReveal>
            <div className="grid md:grid-cols-2 gap-12">
              <SlideReveal direction="left" delay={0.2}>
                <div>
                  <h3 className="text-xl font-semibold text-slate-800 dark:text-white mb-6 transition-colors duration-300">
                    <TypeReveal>Contact Information</TypeReveal>
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <Mail className="w-5 h-5 text-blue-600 dark:text-blue-400 mr-3" />
                      <span
                        className="text-slate-600 dark:text-slate-300 transition-colors duration-300 cursor-pointer hover:text-blue-600 dark:hover:text-blue-400"
                        onClick={() =>
                          copyToClipboard("l_munwai@yahoo.com", "Email")
                        }
                        title="Click to copy email"
                      >
                        l_munwai@yahoo.com
                      </span>
                    </div>
                    <div className="flex items-center">
                      <Smartphone className="w-5 h-5 text-blue-600 dark:text-blue-400 mr-3" />
                      <span
                        className="text-slate-600 dark:text-slate-300 transition-colors duration-300 cursor-pointer hover:text-blue-600 dark:hover:text-blue-400"
                        onClick={() =>
                          copyToClipboard("(+61) 466-000-081", "Phone number")
                        }
                        title="Click to copy phone number"
                      >
                        (+61) 466-000-081
                      </span>
                    </div>
                    <div className="flex items-center">
                      <Linkedin className="w-5 h-5 text-blue-600 dark:text-blue-400 mr-3" />
                      <a
                        href="https://www.linkedin.com/in/mun-wai-looi-086886225"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 dark:text-blue-400 hover:underline transition-colors duration-300"
                      >
                        Let's link up
                      </a>
                    </div>
                  </div>
                </div>
              </SlideReveal>
              <SlideReveal direction="right" delay={0.3}>
                <div>
                  <h3 className="text-xl font-semibold text-slate-800 dark:text-white mb-6 transition-colors duration-300">
                    <TypeReveal>Send a Message</TypeReveal>
                  </h3>
                  <form onSubmit={handleFormSubmit} className="space-y-4">
                    <div>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Your Name"
                        className={`w-full px-4 py-2 border rounded-lg bg-white dark:bg-slate-700 text-slate-800 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-300 ${
                          formErrors.name
                            ? "border-red-500 dark:border-red-400"
                            : "border-slate-300 dark:border-slate-600"
                        }`}
                      />
                      {formErrors.name && (
                        <p className="mt-1 text-sm text-red-500 dark:text-red-400">
                          {formErrors.name}
                        </p>
                      )}
                    </div>
                    <div>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Your Email"
                        className={`w-full px-4 py-2 border rounded-lg bg-white dark:bg-slate-700 text-slate-800 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-300 ${
                          formErrors.email
                            ? "border-red-500 dark:border-red-400"
                            : "border-slate-300 dark:border-slate-600"
                        }`}
                      />
                      {formErrors.email && (
                        <p className="mt-1 text-sm text-red-500 dark:text-red-400">
                          {formErrors.email}
                        </p>
                      )}
                    </div>
                    <div>
                      <textarea
                        rows="4"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Your Message"
                        className={`w-full px-4 py-2 border rounded-lg bg-white dark:bg-slate-700 text-slate-800 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-300 ${
                          formErrors.message
                            ? "border-red-500 dark:border-red-400"
                            : "border-slate-300 dark:border-slate-600"
                        }`}
                      ></textarea>
                      {formErrors.message && (
                        <p className="mt-1 text-sm text-red-500 dark:text-red-400">
                          {formErrors.message}
                        </p>
                      )}
                    </div>

                    {/* Google reCAPTCHA - Temporarily disabled */}
                    {/* <div className="flex justify-center">
                    <div className="g-recaptcha"></div>
                    {formErrors.recaptcha && (
                      <p className="mt-1 text-sm text-red-500 dark:text-red-400">{formErrors.recaptcha}</p>
                    )}
                  </div> */}

                    <Button
                      type="submit"
                      className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white transition-colors duration-300"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Sending..." : "Let's Talk Business"}
                    </Button>
                  </form>
                </div>
              </SlideReveal>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 px-6 bg-slate-800 dark:bg-slate-900 text-white transition-colors duration-300">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-slate-300 dark:text-slate-400 transition-colors duration-300">
              &copy; 2025 Looi Mun Wai. All rights reserved.
            </p>
          </div>
        </footer>

        {/* Notification Toast */}
        <NotificationToast
          message={notification.message}
          isVisible={notification.isVisible}
          onHide={hideNotification}
        />
      </div>
    </div>
  );
}

export default App;
