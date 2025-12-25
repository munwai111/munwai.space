import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const IntroAnimation = ({ onComplete, isDarkMode }) => {
  const [isExit, setIsExit] = useState(false);

  // The text to display
  const text = "Hello welcome to Mun Wai's Professional Space";
  
  // Split into words for layout safety (wrapping), then characters
  const words = text.split(" ");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05, // Speed of typing
        delayChildren: 0.5,
      },
    },
    exit: {
      opacity: 0,
      scale: 1.1,
      filter: 'blur(10px)',
      transition: { duration: 0.8, ease: "easeInOut" }
    }
  };

  const charVariants = {
    hidden: { 
      opacity: 0,
      display: "none" // Hides spacing until revealed for a cleaner "cursor" feel if we had one, but opacity is smoother for layout
    },
    visible: { 
      opacity: 1,
      display: "inline-block",
      transition: {
        duration: 0.01, // Instant appearance like writing/typing
      }
    },
  };

  const handleInteraction = () => {
    setIsExit(true);
    setTimeout(onComplete, 800);
  };

  // Theme-based colors
  const bgColor = isDarkMode ? 'bg-black' : 'bg-gray-50';
  const textColor = isDarkMode ? 'text-white' : 'text-gray-900';
  const subTextColor = isDarkMode ? 'text-gray-400' : 'text-gray-500';

  return (
    <AnimatePresence>
      {!isExit && (
        <motion.div
          className={`fixed inset-0 z-50 flex flex-col items-center justify-center ${bgColor} overflow-hidden cursor-pointer`}
          onClick={handleInteraction}
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={containerVariants}
        >
           {/* Subtle Background Elements */}
           <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <motion.div 
              className={`absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-20 filter blur-3xl ${isDarkMode ? 'bg-indigo-900' : 'bg-indigo-200'}`}
              animate={{ 
                x: [0, 50, 0], 
                y: [0, -30, 0],
                scale: [1, 1.1, 1] 
              }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            />
            <motion.div 
              className={`absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full opacity-20 filter blur-3xl ${isDarkMode ? 'bg-cyan-900' : 'bg-cyan-200'}`}
              animate={{ 
                x: [0, -40, 0], 
                y: [0, 40, 0],
                scale: [1, 1.2, 1] 
              }}
              transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
            />
          </div>

          <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
            <motion.h1 
              className={`text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-tight ${textColor}`}
            >
              <div className="flex flex-wrap justify-center gap-x-[0.3em] gap-y-2">
                {words.map((word, wIndex) => (
                  <span key={wIndex} className="inline-block whitespace-nowrap">
                    {word.split("").map((char, cIndex) => (
                      <motion.span
                        key={cIndex}
                        variants={charVariants}
                        className="inline-block"
                      >
                        {char}
                      </motion.span>
                    ))}
                  </span>
                ))}
                {/* Blinking Cursor */}
                <motion.span
                  className={`inline-block w-1.5 h-[1em] mb-[-0.1em] align-baseline ${isDarkMode ? 'bg-cyan-400' : 'bg-gray-800'}`}
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                />
              </div>
            </motion.h1>

            <motion.div
              className={`mt-12 text-sm uppercase tracking-[0.3em] ${subTextColor}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 3.5, duration: 1 }} // Delay matches approx time to write text
            >
              Tap anywhere to enter
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default IntroAnimation;
