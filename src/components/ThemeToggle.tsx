
import { Moon, Sun, Stars } from "lucide-react";
import { useTheme } from "@/providers/ThemeProvider";
import { motion, AnimatePresence } from "framer-motion";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  // Enhanced button variants with 3D effects
  const buttonVariants = {
    light: { 
      backgroundColor: "#f3f4f6",
      boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
    },
    dark: { 
      backgroundColor: "#1e293b",
      boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -2px rgba(0, 0, 0, 0.2)",
    }
  };

  // Enhanced ray variants with staggered animation
  const rayVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: (i: number) => ({ 
      opacity: 1, 
      scale: 1,
      transition: {
        delay: 0.03 * i,
        type: "spring",
        stiffness: 300,
        damping: 10
      }
    })
  };

  // Enhanced moon variants with 3D rotation
  const moonVariants = {
    hidden: { 
      opacity: 0, 
      x: 20,
      scale: 0.5,
      rotate: -30,
      filter: "blur(10px)"
    },
    visible: { 
      opacity: 1, 
      x: 0,
      scale: 1,
      rotate: 0,
      filter: "blur(0px)",
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 12,
        delay: 0.1
      }
    }
  };
  
  // Enhanced sun variants with glow effect
  const sunVariants = {
    hidden: { 
      opacity: 0, 
      x: -20,
      scale: 0.5,
      rotate: 30,
      filter: "blur(10px)" 
    },
    visible: { 
      opacity: 1, 
      x: 0,
      scale: 1,
      rotate: 0,
      filter: "blur(0px)",
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 12,
        delay: 0.1
      }
    }
  };

  // Star variants for twinkling effect
  const starVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: (i: number) => ({ 
      scale: [0, 1.5, 1],
      opacity: [0, 1, 0.8],
      transition: {
        delay: 0.2 + (i * 0.1),
        duration: 1.5,
        repeat: Infinity,
        repeatType: "reverse" as const,
        ease: "easeInOut"
      }
    })
  };

  return (
    <motion.button
      className="relative p-4 rounded-full transition-all duration-500"
      initial={theme === "light" ? "light" : "dark"}
      animate={theme === "light" ? "light" : "dark"}
      variants={buttonVariants}
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      whileHover={{ scale: 1.1, rotate: theme === "light" ? -5 : 5 }}
      whileTap={{ scale: 0.9 }}
      aria-label="Toggle theme"
      data-testid="theme-toggle"
    >
      <AnimatePresence mode="wait">
        <motion.div 
          key={theme}
          className="relative w-6 h-6"
          initial={{ opacity: 0, rotateY: -90 }}
          animate={{ opacity: 1, rotateY: 0 }}
          exit={{ opacity: 0, rotateY: 90 }}
          transition={{ duration: 0.4, type: "spring" }}
        >
          {/* Sun Icon with rays */}
          {theme === "dark" && (
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={sunVariants}
            >
              <motion.div
                className="absolute inset-0 rounded-full bg-amber-400 opacity-20"
                initial={{ scale: 0 }}
                animate={{ 
                  scale: [1, 1.2, 1], 
                  opacity: [0.2, 0.3, 0.2] 
                }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 2,
                  ease: "easeInOut"
                }}
              />
              <Sun size={24} className="text-amber-400 z-10" />
              
              {/* Enhanced Sun rays with staggered animation */}
              {[...Array(12)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-amber-300 rounded-full"
                  style={{
                    top: `${50 + 20 * Math.sin(Math.PI * 2 * i / 12)}%`,
                    left: `${50 + 20 * Math.cos(Math.PI * 2 * i / 12)}%`,
                  }}
                  custom={i}
                  variants={rayVariants}
                />
              ))}
            </motion.div>
          )}
          
          {/* Moon Icon with stars */}
          {theme === "light" && (
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={moonVariants}
            >
              <motion.div
                className="absolute inset-0 rounded-full bg-indigo-500 opacity-20"
                initial={{ scale: 0 }}
                animate={{ 
                  scale: [1, 1.2, 1], 
                  opacity: [0.2, 0.3, 0.2] 
                }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 2,
                  ease: "easeInOut"
                }}
              />
              <Moon size={24} className="text-indigo-500 z-10" />
              
              {/* Stars around moon with twinkling effect */}
              {[...Array(7)].map((_, i) => {
                const randomSize = 0.6 + Math.random() * 0.8;
                return (
                  <motion.div
                    key={i}
                    className="absolute bg-indigo-200 rounded-full"
                    style={{
                      width: `${randomSize}rem`,
                      height: `${randomSize}rem`,
                      top: `${20 + 60 * Math.random()}%`,
                      left: `${20 + 60 * Math.random()}%`,
                    }}
                    custom={i}
                    variants={starVariants}
                  />
                );
              })}

              {/* Small decorative stars */}
              <Stars 
                size={16}
                className="absolute -top-2 -right-2 text-indigo-300 opacity-70" 
              />
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>
    </motion.button>
  );
}
