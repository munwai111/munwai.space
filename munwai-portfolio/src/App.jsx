import React, { useState, useEffect } from "react";
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
import SkillProficiencyChart from "./components/SkillProficiencyChart.jsx";
import CertificationProgressChart from "./components/CertificationProgressChart.jsx";
import ProjectDomainChart from "./components/ProjectDomainChart.jsx";
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

  // Check for dark mode preference
  useEffect(() => {
    const darkModePreference = localStorage.getItem("darkMode") === "true";
    setIsDarkMode(darkModePreference);
    if (darkModePreference) {
      document.documentElement.classList.add("dark");
    }
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
    link.href = "/LooiMunWaiResume-2025.pdf";
    link.download = "LooiMunWai-Resume-2025.pdf";
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 transition-colors duration-300">
      <ThemeToggle />

      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-md z-40 border-b border-slate-200 dark:border-slate-700 transition-colors duration-300">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex justify-between items-center">
            <h1
              className={`font-bold text-slate-800 dark:text-white transition-colors duration-300 ${
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
                onClick={() => scrollToSection("resume")}
                className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300 cursor-pointer text-sm lg:text-base"
              >
                Resume
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
                    scrollToSection("resume");
                    setIsMobileMenuOpen(false);
                  }}
                  className="text-left py-2 px-4 text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-all duration-300 text-base"
                >
                  Resume
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
          className={`mx-auto relative z-10 ${
            deviceInfo.isTV
              ? "max-w-8xl"
              : deviceInfo.isDesktop
              ? "max-w-6xl"
              : deviceInfo.isTablet
              ? "max-w-4xl"
              : "max-w-sm"
          }`}
        >
          <div
            className={`items-center ${
              deviceInfo.isMobile || deviceInfo.isFlipPhone
                ? "flex flex-col gap-8"
                : deviceInfo.isTablet && deviceInfo.orientation === "portrait"
                ? "flex flex-col gap-10"
                : "grid lg:grid-cols-2 gap-12"
            }`}
          >
            <div
              className={`order-2 lg:order-1 ${
                deviceInfo.isMobile || deviceInfo.isFlipPhone
                  ? "text-center"
                  : deviceInfo.isTablet && deviceInfo.orientation === "portrait"
                  ? "text-center"
                  : "text-center lg:text-left"
              }`}
            >
              <h1
                className={`font-bold text-slate-900 dark:text-white mb-4 transition-colors duration-300 ${
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
                Looi Mun Wai
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
                吕文维
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
                Early-Career Professional with field-tested skills in GenAI
                Prompt Consultancy, UX/UI Design, Research & Data Analysis |
                UNIQLO GMP 2024 Australia Sole Candidate
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
                "Curiosity-driven. People-focused. Outcome-oriented."
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
                I bridge psychology and strategy to empower individuals and
                organisations—turning human insight into meaningful impact.
              </p>

              <div
                className={`gap-4 ${
                  deviceInfo.isMobile || deviceInfo.isFlipPhone
                    ? "flex flex-col"
                    : deviceInfo.isTablet &&
                      deviceInfo.orientation === "portrait"
                    ? "flex flex-col sm:flex-row justify-center"
                    : "flex flex-col sm:flex-row justify-center lg:justify-start"
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
                  Get In Touch
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
                  Download CV
                </Button>
              </div>
            </div>

            {/* Stylistic Hero Subject with Weight Effect */}
            <div
              className={`order-1 lg:order-2 ${
                deviceInfo.isMobile || deviceInfo.isFlipPhone
                  ? "w-full max-w-xs mx-auto"
                  : deviceInfo.isTablet && deviceInfo.orientation === "portrait"
                  ? "w-full max-w-sm mx-auto"
                  : ""
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
        className="py-24 px-6 bg-white dark:bg-slate-800 transition-colors duration-300"
      >
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-800 dark:text-white mb-6 transition-colors duration-300">
              About Me
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-8"></div>
          </div>
          <div className="prose prose-xl max-w-none text-slate-600 dark:text-slate-300 transition-colors duration-300 leading-relaxed">
            <p className="mb-8 text-lg">
              An early-career professional with a strong foundation in
              psychology, organisational behaviour, communication, and human
              motivation. With field-tested experience across leadership,
              cross-cultural collaboration, mentoring, and strategic thinking,
              bringing a people-first mindset to everything undertaken.
            </p>
            <p className="mb-8 text-lg">
              Curious, driven, and highly reflective, known for the ability to
              connect with others, adapt quickly, and leave a lasting
              impression. Values authenticity, personal growth, and creating
              meaningful experiences—whether through research, storytelling, or
              systems-level thinking.
            </p>
            <p className="text-lg">
              Currently at a pivotal stage—seeking a full-time opportunity in
              Melbourne where meaningful contribution, professional growth, and
              building toward long-term residency and impact can be achieved.
            </p>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section
        id="projects"
        className="py-24 px-6 bg-slate-50 dark:bg-slate-900 transition-colors duration-300"
      >
        <div className="max-w-7xl mx-auto">
          <ProjectCarousel />
          <ProjectDomainChart />
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
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Technical Skills & Tools
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Comprehensive technical expertise across design, development, data
              analysis, and AI tools
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {/* Development & Design */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mr-3">
                  <Monitor className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Development & Design
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

            {/* Data Analysis */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mr-3">
                  <BarChart3 className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Data Analysis
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

            {/* AI & Productivity */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mr-3">
                  <Bot className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  AI & Productivity
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

            {/* Core Competencies */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center mr-3">
                  <Target className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Core Competencies
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
          </div>

          {/* Job Applications Section */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 rounded-xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
              Relevant Job Applications
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  UX/UI Designer
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                  Design user-centered interfaces and experiences
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

              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  Data Analyst
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                  Analyze data to drive business insights
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

              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  AI Prompt Engineer
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                  Develop and optimize AI prompts for business applications
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

              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  Research Analyst
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                  Conduct research and analyze behavioral data
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

              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  Project Coordinator
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                  Manage projects and coordinate cross-functional teams
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

              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  Content Creator
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                  Create engaging multimedia content and presentations
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
            </div>
          </div>
        </div>
      </section>

      {/* Skills & Expertise Section */}
      <section className="py-16 px-6 bg-white dark:bg-slate-800 transition-colors duration-300">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-slate-800 dark:text-white mb-12 transition-colors duration-300">
            Skills & Expertise
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <h3 className="text-xl font-semibold text-slate-800 dark:text-white mb-4 transition-colors duration-300">
                Technical Skills
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
            <div className="text-center">
              <h3 className="text-xl font-semibold text-slate-800 dark:text-white mb-4 transition-colors duration-300">
                Communication
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
            <div className="text-center">
              <h3 className="text-xl font-semibold text-slate-800 dark:text-white mb-4 transition-colors duration-300">
                Leadership
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
          </div>

          {/* Skill Proficiency Chart */}
          <div className="mt-16">
            <SkillProficiencyChart />
          </div>
        </div>
      </section>

      {/* Learning Journey Section */}
      <section className="py-16 px-6 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-800 dark:text-white mb-4 transition-colors duration-300">
              Learning Journey
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
              Continuous professional development through certifications and
              skill building
            </p>
          </div>
          <CertificationProgressChart deviceInfo={deviceInfo} />
        </div>
      </section>

      {/* Testimonials Section */}
      <section
        id="testimonials"
        className="py-16 px-6 bg-slate-50 dark:bg-slate-900 transition-colors duration-300"
      >
        <div className="max-w-6xl mx-auto">
          <TestimonialCarousel />
        </div>
      </section>

      {/* Enhanced Certifications & Awards */}
      <CertificationSection />

      {/* Contact Section */}
      <section
        id="contact"
        className="py-16 px-6 bg-white dark:bg-slate-800 transition-colors duration-300"
      >
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-slate-800 dark:text-white mb-12 transition-colors duration-300">
            Get In Touch
          </h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-xl font-semibold text-slate-800 dark:text-white mb-6 transition-colors duration-300">
                Contact Information
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
                      copyToClipboard("+61466000081", "Phone number")
                    }
                    title="Click to copy phone number"
                  >
                    +61466000081
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
            <div>
              <h3 className="text-xl font-semibold text-slate-800 dark:text-white mb-6 transition-colors duration-300">
                Send a Message
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
  );
}

export default App;
