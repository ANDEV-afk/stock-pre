import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useTheme } from "@/contexts/ThemeContext";

interface GlobalAnimatedBackgroundProps {
  children: React.ReactNode;
  variant?: "home" | "dashboard" | "markets" | "minimal";
  className?: string;
}

const GlobalAnimatedBackground = ({
  children,
  variant = "minimal",
  className = "",
}: GlobalAnimatedBackgroundProps) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { theme } = useTheme();

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const renderBackground = () => {
    // In light mode, render completely clean white background
    if (theme === "light") {
      return (
        <div
          className="absolute inset-0 bg-white"
          style={{ backgroundColor: "#ffffff !important" }}
        />
      );
    }

    // In dark mode, render the full animated background
    return (
      <>
        {/* Dark mode gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-cyber-black via-cyber-dark to-cyber-black" />

        {/* Animated cyber grid */}
        <div className="absolute inset-0 opacity-20">
          <div
            className="cyber-grid h-full w-full animate-pulse"
            style={{
              backgroundImage: `
                linear-gradient(rgba(0, 122, 255, 0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(0, 122, 255, 0.1) 1px, transparent 1px)
              `,
              backgroundSize: "20px 20px",
            }}
          />
        </div>

        {/* Floating orbs */}
        <motion.div
          className="absolute w-[600px] h-[600px] bg-cyber-blue/15 rounded-full blur-3xl"
          animate={{
            x: [0, 100, -50, 0],
            y: [0, -80, 60, 0],
            scale: [1, 1.3, 0.8, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            left: "10%",
            top: "10%",
          }}
        />

        <motion.div
          className="absolute w-[800px] h-[800px] bg-cyber-purple/20 rounded-full blur-3xl"
          animate={{
            x: [0, -120, 80, 0],
            y: [0, 100, -70, 0],
            scale: [1, 0.7, 1.4, 1],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            right: "5%",
            bottom: "15%",
          }}
        />

        <motion.div
          className="absolute w-[500px] h-[500px] bg-cyber-green/10 rounded-full blur-3xl"
          animate={{
            x: [0, 60, -40, 0],
            y: [0, -50, 30, 0],
            scale: [1, 1.1, 0.9, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            left: "45%",
            top: "35%",
          }}
        />

        <motion.div
          className="absolute w-[400px] h-[400px] bg-cyber-yellow/8 rounded-full blur-3xl"
          animate={{
            x: [0, -30, 50, 0],
            y: [0, 40, -60, 0],
            scale: [1, 1.2, 0.8, 1],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            right: "30%",
            top: "20%",
          }}
        />

        {/* Particle system */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-cyber-blue/50 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -100, 0],
                x: [0, Math.random() * 50 - 25, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: Math.random() * 10 + 10,
                repeat: Infinity,
                delay: Math.random() * 5,
              }}
            />
          ))}
        </div>

        {/* Mouse radial gradient overlay */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(0, 122, 255, 0.15) 0%, transparent 50%)`,
          }}
        />
      </>
    );
  };

  return (
    <div
      className={`relative min-h-screen w-full transition-all duration-700 ease-in-out ${className}`}
      style={theme === "light" ? { backgroundColor: "#ffffff" } : {}}
    >
      {/* Background layers */}
      <div className="fixed inset-0 z-0">{renderBackground()}</div>

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default GlobalAnimatedBackground;
