import React, { useState, useRef } from "react";
import { Brain, Lightbulb, BarChart3, Target } from "lucide-react";
import profile2 from "../assets/profile2.png";

const HeroProfile = ({ deviceInfo = {} }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const profileRef = useRef(null);

  // Get responsive sizes based on device
  const getResponsiveSizes = () => {
    if (deviceInfo.isFlipPhone) {
      return {
        containerSize: "w-36 h-36",
        imageSize: "w-30 h-30",
        iconSize: "w-5 h-5",
        ringSize: "w-38 h-38",
        outerRingSize: "w-40 h-40",
        ring1Size: "w-36 h-36",
        ring2Size: "w-32 h-32",
        avatarSize: "w-28 h-28",
      };
    } else if (deviceInfo.isMobile) {
      return {
        containerSize: "w-48 h-48 sm:w-56 sm:h-56",
        imageSize: "w-42 h-42 sm:w-48 sm:h-48",
        iconSize: "w-6 h-6",
        ringSize: "w-54 h-54 sm:w-60 sm:h-60",
        outerRingSize: "w-60 h-60 sm:w-70 sm:h-70",
        ring1Size: "w-50 h-50 sm:w-55 sm:h-55",
        ring2Size: "w-44 h-44 sm:w-50 sm:h-50",
        avatarSize: "w-40 h-40 sm:w-50 sm:h-50",
      };
    } else if (deviceInfo.isTablet) {
      return {
        containerSize: "w-64 h-64 md:w-76 md:h-76",
        imageSize: "w-56 h-56 md:w-70 md:h-70",
        iconSize: "w-8 h-8",
        ringSize: "w-70 h-70 md:w-84 md:h-84",
        outerRingSize: "w-76 h-76 md:w-90 md:h-90",
        ring1Size: "w-66 h-66 md:w-80 md:h-80",
        ring2Size: "w-60 h-60 md:w-74 md:h-74",
        avatarSize: "w-58 h-58 md:w-72 md:h-72",
      };
    } else if (deviceInfo.isTV) {
      return {
        containerSize: "w-96 h-96 lg:w-110 lg:h-110",
        imageSize: "w-90 h-90 lg:w-104 lg:h-104",
        iconSize: "w-12 h-12 lg:w-16 lg:h-16",
        ringSize: "w-104 h-104 lg:w-120 lg:h-120",
        outerRingSize: "w-110 h-110 lg:w-128 lg:h-128",
        ring1Size: "w-100 h-100 lg:w-116 lg:h-116",
        ring2Size: "w-94 h-94 lg:w-110 lg:h-110",
        avatarSize: "w-92 h-92 lg:w-108 lg:h-108",
      };
    } else if (deviceInfo.isDesktop) {
      return {
        containerSize: "w-80 h-80 lg:w-96 lg:h-96",
        imageSize: "w-72 h-72 lg:w-88 lg:h-88",
        iconSize: "w-10 h-10 lg:w-12 lg:h-12",
        ringSize: "w-80 h-80 lg:w-96 lg:h-96",
        outerRingSize: "w-80 h-80 lg:w-96 lg:h-96",
        ring1Size: "w-76 h-76 lg:w-92 lg:h-92",
        ring2Size: "w-72 h-72 lg:w-88 lg:h-88",
        avatarSize: "w-64 h-64 lg:w-80 lg:h-80",
      };
    }
    // Default fallback (desktop or safe values)
    return {
      containerSize: "w-80 h-80 lg:w-96 lg:h-96",
      imageSize: "w-72 h-72 lg:w-88 lg:h-88",
      iconSize: "w-10 h-10 lg:w-12 lg:h-12",
      ringSize: "w-80 h-80 lg:w-96 lg:h-96",
      outerRingSize: "w-80 h-80 lg:w-96 lg:h-96",
      ring1Size: "w-76 h-76 lg:w-92 lg:h-92",
      ring2Size: "w-72 h-72 lg:w-88 lg:h-88",
      avatarSize: "w-64 h-64 lg:w-80 lg:h-80",
    };
  };

  const sizes = getResponsiveSizes();

  // Universal event handler for both mouse and touch
  const getEventCoordinates = (e) => {
    // Handle both mouse and touch events
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    return { clientX, clientY };
  };

  const handleInteractionMove = (e) => {
    if (!profileRef.current) return;

    const { clientX, clientY } = getEventCoordinates(e);
    const rect = profileRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // Calculate relative position from center (-1 to 1)
    const relativeX = (clientX - centerX) / (rect.width / 2);
    const relativeY = (clientY - centerY) / (rect.height / 2);

    setMousePosition({ x: relativeX, y: relativeY });
  };

  const handleInteractionStart = (e) => {
    // Prevent default touch behaviors
    if (e.touches) {
      e.preventDefault();
    }
    setIsHovering(true);
    handleInteractionMove(e);
  };

  const handleInteractionEnd = () => {
    setIsHovering(false);
    setMousePosition({ x: 0, y: 0 });
  };

  // Legacy mouse handlers for backward compatibility
  const handleMouseMove = handleInteractionMove;
  const handleMouseEnter = handleInteractionStart;
  const handleMouseLeave = handleInteractionEnd;

  // Calculate weight effect transforms
  const getWeightTransform = (intensity = 1) => {
    if (!isHovering) return "translate(0, 0)";

    const maxTilt = 10 * intensity; // Maximum tilt in degrees
    const maxTranslate = 10 * intensity; // Maximum translation in pixels

    const tiltX = mousePosition.y * maxTilt;
    const tiltY = -mousePosition.x * maxTilt;
    const translateX = mousePosition.x * maxTranslate;
    const translateY = mousePosition.y * maxTranslate;

    return `translate(${translateX}px, ${translateY}px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
  };

  // Calculate shadow effect
  const getShadowStyle = () => {
    if (!isHovering) return {};

    const shadowX = mousePosition.x * 10;
    const shadowY = mousePosition.y * 10;
    const shadowBlur = 20;
    const shadowOpacity = 0.3;

    return {
      boxShadow: `${shadowX}px ${shadowY}px ${shadowBlur}px rgba(0, 0, 0, ${shadowOpacity})`,
    };
  };

  // Calculate ring delays and transforms
  const getRingStyle = (ringIndex) => {
    const baseDelay = ringIndex * 0.1; // Staggered delay for each ring
    const hoverDelay = isHovering ? baseDelay : 0;

    return {
      transform: getWeightTransform(0.3), // Lighter effect for rings
      transition: `transform 0.3s ease-out ${hoverDelay}s, opacity 0.3s ease-out`,
      transitionDelay: isHovering ? `${hoverDelay}s` : "0s",
    };
  };

  return (
    <div className="flex justify-center order-1 lg:order-2">
      <div
        ref={profileRef}
        className={`relative perspective-1000 ${sizes.outerRingSize}`}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleInteractionStart}
        onTouchMove={handleInteractionMove}
        onTouchEnd={handleInteractionEnd}
        onTouchCancel={handleInteractionEnd}
        style={{ perspective: "1000px", touchAction: "none" }}
      >
        {/* Outer Ring - Largest */}
        <div
          className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-blue-500/30 dark:border-blue-400/30 animate-pulse ${sizes.ringSize}`}
          style={getRingStyle(0)}
        ></div>

        {/* Middle Ring */}
        <div
          className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-purple-500/20 dark:border-purple-400/20 animate-pulse ${sizes.ring1Size}`}
          style={{
            animationDelay: "0.5s",
            ...getRingStyle(1),
          }}
        ></div>

        {/* Inner Ring */}
        <div
          className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-500/10 dark:border-cyan-400/10 animate-pulse ${sizes.ring2Size}`}
          style={{
            animationDelay: "1s",
            ...getRingStyle(2),
          }}
        ></div>

        {/* Central Avatar with weight effect */}
        <div
          className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-blue-100/80 to-purple-100/80 dark:from-blue-900/80 dark:to-purple-900/80 backdrop-blur-sm flex items-center justify-center transition-colors duration-300 overflow-hidden ${sizes.avatarSize}`}
          style={{
            transform: getWeightTransform(1),
            transition: "transform 0.3s ease-out, box-shadow 0.3s ease-out",
            transformStyle: "preserve-3d",
            ...getShadowStyle(),
          }}
        >
          <img
            src={profile2}
            alt="Looi Mun Wai - Professional Profile"
            className="w-full h-full object-cover rounded-full filter drop-shadow-lg"
            style={{
              transform: getWeightTransform(0.5),
              transition: "transform 0.3s ease-out",
            }}
          />
        </div>

        {/* Floating Tech Elements with weight effect */}
        <div
          className={`absolute bg-blue-500/20 dark:bg-blue-400/20 rounded-lg flex items-center justify-center animate-bounce transition-colors duration-300 ${
            sizes.iconSize
          } ${
            deviceInfo.isFlipPhone
              ? "top-4 right-4"
              : deviceInfo.isMobile
              ? "top-6 right-6"
              : "top-8 right-8"
          }`}
          style={{
            animationDelay: "0.2s",
            transform: getWeightTransform(0.4),
            transition: "transform 0.3s ease-out",
          }}
        >
          <Brain
            className={`text-blue-600 dark:text-blue-400 ${
              deviceInfo.isFlipPhone
                ? "w-4 h-4"
                : deviceInfo.isMobile
                ? "w-5 h-5"
                : deviceInfo.isTV
                ? "w-10 h-10"
                : "w-6 h-6"
            }`}
          />
        </div>
        <div
          className={`absolute bg-purple-500/20 dark:bg-purple-400/20 rounded-lg flex items-center justify-center animate-bounce transition-colors duration-300 ${
            sizes.iconSize
          } ${
            deviceInfo.isFlipPhone
              ? "bottom-4 left-4"
              : deviceInfo.isMobile
              ? "bottom-6 left-6"
              : "bottom-8 left-8"
          }`}
          style={{
            animationDelay: "0.8s",
            transform: getWeightTransform(0.4),
            transition: "transform 0.3s ease-out",
          }}
        >
          <Lightbulb
            className={`text-purple-600 dark:text-purple-400 ${
              deviceInfo.isFlipPhone
                ? "w-4 h-4"
                : deviceInfo.isMobile
                ? "w-5 h-5"
                : deviceInfo.isTV
                ? "w-10 h-10"
                : "w-6 h-6"
            }`}
          />
        </div>
        <div
          className={`absolute bg-cyan-500/20 dark:bg-cyan-400/20 rounded-full flex items-center justify-center animate-bounce transition-colors duration-300 top-1/2 ${
            deviceInfo.isFlipPhone
              ? "w-8 h-8 left-2"
              : deviceInfo.isMobile
              ? "w-9 h-9 left-3"
              : deviceInfo.isTV
              ? "w-16 h-16 left-6"
              : "w-10 h-10 left-4"
          }`}
          style={{
            animationDelay: "1.2s",
            transform: getWeightTransform(0.3),
            transition: "transform 0.3s ease-out",
          }}
        >
          <BarChart3
            className={`text-cyan-600 dark:text-cyan-400 ${
              deviceInfo.isFlipPhone
                ? "w-4 h-4"
                : deviceInfo.isMobile
                ? "w-4 h-4"
                : deviceInfo.isTV
                ? "w-8 h-8"
                : "w-5 h-5"
            }`}
          />
        </div>
        <div
          className={`absolute bg-green-500/20 dark:bg-green-400/20 rounded-full flex items-center justify-center animate-bounce transition-colors duration-300 top-1/2 ${
            deviceInfo.isFlipPhone
              ? "w-8 h-8 right-2"
              : deviceInfo.isMobile
              ? "w-9 h-9 right-3"
              : deviceInfo.isTV
              ? "w-16 h-16 right-6"
              : "w-10 h-10 right-4"
          }`}
          style={{
            animationDelay: "0.6s",
            transform: getWeightTransform(0.3),
            transition: "transform 0.3s ease-out",
          }}
        >
          <Target
            className={`text-green-600 dark:text-green-400 ${
              deviceInfo.isFlipPhone
                ? "w-4 h-4"
                : deviceInfo.isMobile
                ? "w-4 h-4"
                : deviceInfo.isTV
                ? "w-8 h-8"
                : "w-5 h-5"
            }`}
          />
        </div>
      </div>
    </div>
  );
};

export default HeroProfile;
