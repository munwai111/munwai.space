import React, { useState, useEffect } from 'react'

const IntroAnimation = ({ onComplete, isDarkMode }) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [displayedWords, setDisplayedWords] = useState([])
  const [isWritingComplete, setIsWritingComplete] = useState(false)
  const [showClickPrompt, setShowClickPrompt] = useState(false)
  const [showTransition, setShowTransition] = useState(false)

  const words = ['Hello', 'welcome', 'to', 'Mun', "Wai's", 'Professional', 'Space']
  const wordAppearSpeed = 400 // milliseconds per word
  const finalPause = 1500 // pause before showing click prompt
  const transitionDuration = 2000 // transition animation duration

  useEffect(() => {
    if (currentWordIndex < words.length) {
      // Add the current word to displayed words
      const timer = setTimeout(() => {
        setDisplayedWords(prev => [...prev, words[currentWordIndex]])
        setCurrentWordIndex(prev => prev + 1)
      }, wordAppearSpeed)
      
      return () => clearTimeout(timer)
    } else if (!isWritingComplete) {
      // All words written, start final pause before showing click prompt
      setIsWritingComplete(true)
      const timer = setTimeout(() => {
        setShowClickPrompt(true)
      }, finalPause)
      
      return () => clearTimeout(timer)
    }
  }, [currentWordIndex, isWritingComplete])

  const handleClick = () => {
    if (showClickPrompt && !showTransition) {
      setShowTransition(true)
      // Complete the intro after transition
      setTimeout(() => {
        onComplete()
      }, transitionDuration)
    }
  }

  // Dynamic background based on theme
  const backgroundClass = isDarkMode 
    ? 'bg-gradient-to-br from-slate-900 via-indigo-900 to-black' // Space-like: deep space colors
    : 'bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400' // Light grey as requested

  // Dynamic text color based on theme
  const textColor = isDarkMode ? 'text-white' : 'text-gray-800'
  const subtitleColor = isDarkMode ? 'text-blue-200' : 'text-gray-600'
  const promptColor = isDarkMode ? 'text-cyan-300' : 'text-gray-700'

  // Dynamic particle colors based on theme
  const particleColor = isDarkMode ? 'bg-cyan-400/40' : 'bg-gray-500/30' // Space cyan vs grey
  const lineColor = isDarkMode ? 'via-blue-400/30' : 'via-gray-400/40' // Space blue vs grey
  const glowColor = isDarkMode ? 'text-cyan-400/40' : 'text-gray-500/30' // Space cyan vs grey

  return (
    <div 
      className={`
        fixed inset-0 z-50 flex items-center justify-center
        ${backgroundClass}
        transition-all duration-2000 ease-out
        ${showTransition ? 'opacity-0 scale-150' : 'opacity-100 scale-100'}
        ${showClickPrompt ? 'cursor-pointer' : 'cursor-default'}
      `}
      onClick={handleClick}
    >
      {/* Moving Spectrum Background Effect */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Animated spectrum waves */}
        <div className={`
          absolute inset-0 opacity-20
          ${isDarkMode 
            ? 'bg-gradient-to-r from-blue-600/30 via-purple-600/30 to-cyan-600/30' // Space spectrum
            : 'bg-gradient-to-r from-gray-400/20 via-gray-500/20 to-gray-600/20' // Grey spectrum shadows
          }
          transition-all duration-2000 ease-out
          ${showTransition ? 'scale-200 opacity-0' : 'scale-100 opacity-20'}
        `} 
        style={{
          animation: 'spectrumMove 8s ease-in-out infinite'
        }} />
        
        {/* Secondary spectrum layer */}
        <div className={`
          absolute inset-0 opacity-15
          ${isDarkMode 
            ? 'bg-gradient-to-l from-cyan-500/20 via-indigo-500/20 to-purple-500/20' // Space colors
            : 'bg-gradient-to-l from-gray-300/15 via-gray-400/15 to-gray-500/15' // Grey shadows
          }
          transition-all duration-2000 ease-out
          ${showTransition ? 'scale-300 opacity-0' : 'scale-100 opacity-15'}
        `}
        style={{
          animation: 'spectrumMove 12s ease-in-out infinite reverse'
        }} />

        {/* Interactive Background Dots */}
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className={`
              absolute w-1 h-1 ${particleColor} rounded-full
              animate-pulse
              transition-all duration-2000 ease-out
              ${showTransition ? 'scale-0 opacity-0' : 'scale-100 opacity-100'}
            `}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
              transitionDelay: `${Math.random() * 500}ms`
            }}
          />
        ))}
        
        {/* Animated Lines */}
        {[...Array(20)].map((_, i) => (
          <div
            key={`line-${i}`}
            className={`
              absolute bg-gradient-to-r from-transparent ${lineColor} to-transparent
              h-px
              transition-all duration-2000 ease-out
              ${showTransition ? 'scale-0 opacity-0 rotate-180' : 'scale-100 opacity-100 rotate-0'}
            `}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${50 + Math.random() * 100}px`,
              transform: `rotate(${Math.random() * 360}deg)`,
              animation: `float ${3 + Math.random() * 2}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`,
              transitionDelay: `${Math.random() * 300}ms`
            }}
          />
        ))}
      </div>

      {/* Light-Speed Transition Effect */}
      {showTransition && (
        <div className="absolute inset-0 overflow-hidden">
          {/* Light-speed lines */}
          {[...Array(30)].map((_, i) => (
            <div
              key={`speed-line-${i}`}
              className={`
                absolute h-px
                ${isDarkMode ? 'bg-cyan-400' : 'bg-gray-600'}
                animate-lightSpeed
              `}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${200 + Math.random() * 400}px`,
                transform: `rotate(${-45 + Math.random() * 90}deg)`,
                animationDelay: `${Math.random() * 500}ms`,
                animationDuration: '1s'
              }}
            />
          ))}
          
          {/* Warp effect overlay */}
          <div className={`
            absolute inset-0
            ${isDarkMode 
              ? 'bg-gradient-radial from-transparent via-blue-500/10 to-cyan-500/20' 
              : 'bg-gradient-radial from-transparent via-gray-400/10 to-gray-600/20'
            }
            animate-warpEffect
          `} />
        </div>
      )}

      {/* Main Content */}
      <div className={`
        relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto
        transition-all duration-2000 ease-out
        ${showTransition ? 'scale-50 opacity-0 blur-sm' : 'scale-100 opacity-100 blur-0'}
      `}>
        {/* Writing Text */}
        <div className="relative">
          <h1 className={`
            text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl
            font-bold ${textColor}
            leading-tight
            transition-all duration-500 ease-out
            ${isWritingComplete ? 'scale-105' : 'scale-100'}
          `}>
            {displayedWords.map((word, index) => (
              <span 
                key={index}
                className={`
                  inline-block mr-4 opacity-0 animate-fadeInUp
                `}
                style={{
                  animationDelay: `${index * 0.1}s`,
                  animationFillMode: 'forwards'
                }}
              >
                {word}
              </span>
            ))}
            {/* Writing Cursor */}
            {!isWritingComplete && currentWordIndex < words.length && (
              <span className={`inline-block w-1 h-[0.8em] ml-1 animate-pulse ${isDarkMode ? 'bg-cyan-400' : 'bg-gray-600'}`} />
            )}
          </h1>
          
          {/* Glow Effect */}
          <div className={`
            absolute inset-0 text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl
            font-bold ${glowColor}
            transition-opacity duration-1000
            ${isWritingComplete ? 'opacity-100' : 'opacity-0'}
          `}>
            {displayedWords.join(' ')}
          </div>
        </div>

        {/* Subtitle that appears after writing */}
        <div className={`
          mt-8 transition-all duration-1000 ease-out delay-500
          ${isWritingComplete ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
        `}>
          <p className={`text-lg sm:text-xl md:text-2xl ${subtitleColor} font-light`}>
            Explore innovation, creativity, and professional excellence
          </p>
        </div>

        {/* Click Prompt */}
        <div className={`
          mt-12 transition-all duration-1000 ease-out
          ${showClickPrompt ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
        `}>
          <div className={`
            flex flex-col items-center space-y-4
            ${showClickPrompt ? 'animate-pulse' : ''}
          `}>
            {/* Click Icon */}
            <div className={`
              w-16 h-16 rounded-full border-2 
              ${isDarkMode ? 'border-cyan-400 bg-cyan-400/10' : 'border-gray-600 bg-gray-600/10'}
              flex items-center justify-center
              animate-bounce
            `}>
              <svg 
                className={`w-8 h-8 ${isDarkMode ? 'text-cyan-400' : 'text-gray-600'}`}
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.121 2.122" 
                />
              </svg>
            </div>
            
            {/* Click Text */}
            <p className={`
              text-base sm:text-lg md:text-xl ${promptColor} font-medium
              animate-fadeInUp
            `}>
              Click anywhere to enter
            </p>
            
            {/* Animated Dots */}
            <div className="flex space-x-2">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className={`
                    w-2 h-2 rounded-full
                    ${isDarkMode ? 'bg-cyan-400/60' : 'bg-gray-600/60'}
                    animate-pulse
                  `}
                  style={{
                    animationDelay: `${i * 0.2}s`,
                    animationDuration: '1.5s'
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Animated Particles */}
        <div className={`
          absolute inset-0 transition-opacity duration-1000
          ${isWritingComplete ? 'opacity-100' : 'opacity-0'}
        `}>
          {[...Array(30)].map((_, i) => (
            <div
              key={`particle-${i}`}
              className={`absolute w-2 h-2 ${particleColor} rounded-full`}
              style={{
                left: `${20 + Math.random() * 60}%`,
                top: `${20 + Math.random() * 60}%`,
                animation: `float ${2 + Math.random() * 3}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 2}s`
              }}
            />
          ))}
        </div>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(180deg); }
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }
        
        @keyframes fadeInUp {
          0% { 
            opacity: 0; 
            transform: translateY(20px); 
          }
          100% { 
            opacity: 1; 
            transform: translateY(0); 
          }
        }
        
        @keyframes bounce {
          0%, 20%, 53%, 80%, 100% {
            transform: translate3d(0,0,0);
          }
          40%, 43% {
            transform: translate3d(0, -8px, 0);
          }
          70% {
            transform: translate3d(0, -4px, 0);
          }
          90% {
            transform: translate3d(0, -2px, 0);
          }
        }
        
        @keyframes spectrumMove {
          0%, 100% { 
            transform: translateX(-100%) scale(1); 
            opacity: 0.1;
          }
          50% { 
            transform: translateX(100%) scale(1.1); 
            opacity: 0.3;
          }
        }
        
        @keyframes lightSpeed {
          0% { 
            transform: translateX(-200px) scaleX(0);
            opacity: 0;
          }
          20% { 
            transform: translateX(-100px) scaleX(1);
            opacity: 1;
          }
          80% { 
            transform: translateX(100vw) scaleX(1);
            opacity: 1;
          }
          100% { 
            transform: translateX(120vw) scaleX(0);
            opacity: 0;
          }
        }
        
        @keyframes warpEffect {
          0% { 
            transform: scale(1) rotate(0deg);
            opacity: 0;
          }
          50% { 
            transform: scale(1.5) rotate(180deg);
            opacity: 0.3;
          }
          100% { 
            transform: scale(3) rotate(360deg);
            opacity: 0;
          }
        }
        
        .bg-gradient-radial {
          background: radial-gradient(circle, var(--tw-gradient-stops));
        }
      `}</style>
    </div>
  )
}

export default IntroAnimation

