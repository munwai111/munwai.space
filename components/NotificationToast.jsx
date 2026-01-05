import React, { useState, useEffect } from "react";
import { Check } from "lucide-react";

const NotificationToast = ({ message, isVisible, onHide }) => {
  const [animationPhase, setAnimationPhase] = useState("hidden");

  useEffect(() => {
    if (isVisible) {
      // Phase 1: Slide in from top
      setAnimationPhase("sliding-in");

      // Phase 2: Show checkmark animation after slide-in
      const checkmarkTimer = setTimeout(() => {
        setAnimationPhase("showing-checkmark");
      }, 300);

      // Phase 3: Start fade out
      const fadeTimer = setTimeout(() => {
        setAnimationPhase("fading-out");
      }, 2500);

      // Phase 4: Hide completely
      const hideTimer = setTimeout(() => {
        setAnimationPhase("hidden");
        onHide();
      }, 3000);

      return () => {
        clearTimeout(checkmarkTimer);
        clearTimeout(fadeTimer);
        clearTimeout(hideTimer);
      };
    } else {
      setAnimationPhase("hidden");
    }
  }, [isVisible, onHide]);

  if (animationPhase === "hidden") return null;

  return (
    <div
      className={`
        fixed top-0 left-1/2 z-[100]
        bg-green-500 text-white px-4 py-3 sm:px-6 sm:py-4 md:px-8 md:py-4 rounded-b-xl shadow-2xl
        flex items-center space-x-3 sm:space-x-4 w-[90vw] sm:w-[80vw] md:w-auto md:min-w-[320px] md:max-w-[480px] justify-center
        border border-green-400/40 border-t-0
        transition-all duration-500 ease-out
        text-sm sm:text-base
      `}
      style={{
        transform: `translateX(-50%) ${
          animationPhase === "sliding-in"
            ? "translateY(0) scale(1)"
            : animationPhase === "showing-checkmark"
            ? "translateY(0) scale(1.02)"
            : animationPhase === "fading-out"
            ? "translateY(0) scale(0.98)"
            : "translateY(-100%) scale(0.95)"
        }`,
        opacity:
          animationPhase === "sliding-in" ||
          animationPhase === "showing-checkmark"
            ? 1
            : animationPhase === "fading-out"
            ? 0
            : 0,
      }}
    >
      {/* Animated Checkmark */}
      <div
        className={`
        w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-full border-2 border-white flex items-center justify-center
        transition-all duration-300 ease-out
        ${animationPhase === "showing-checkmark" ? "bg-white" : "bg-white/20"}
      `}
      >
        <Check
          className={`
          w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 transition-all duration-300 ease-out
          ${
            animationPhase === "showing-checkmark"
              ? "text-green-600 scale-100"
              : "text-white/70 scale-80"
          }
        `}
        />
      </div>

      {/* Message */}
      <span className="font-semibold text-center flex-1 leading-tight">
        {message}
      </span>
    </div>
  );
};

export default NotificationToast;
