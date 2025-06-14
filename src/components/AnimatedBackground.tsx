import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface AnimatedBackgroundProps {
  variant?: "primary" | "secondary" | "tertiary" | "minimal";
  className?: string;
}

const AnimatedBackground = ({
  variant = "primary",
  className = "",
}: AnimatedBackgroundProps) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

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

  const renderPrimaryBackground = () => (
    <>
      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyber-black via-cyber-dark to-cyber-black" />

      {/* Animated grid */}
      <div className="absolute inset-0 opacity-30">
        <div className="cyber-grid h-full w-full animate-pulse" />
      </div>

      {/* Floating orbs */}
      <motion.div
        className="absolute w-96 h-96 bg-cyber-blue/20 rounded-full blur-3xl"
        animate={{
          x: [0, 100, 0],
          y: [0, -50, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          left: `${20 + mousePosition.x * 0.02}%`,
          top: `${20 + mousePosition.y * 0.02}%`,
        }}
      />

      <motion.div
        className="absolute w-80 h-80 bg-cyber-purple/25 rounded-full blur-3xl"
        animate={{
          x: [0, -80, 0],
          y: [0, 60, 0],
          scale: [1, 0.8, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 5,
        }}
        style={{
          right: `${15 + mousePosition.x * 0.015}%`,
          bottom: `${25 + mousePosition.y * 0.015}%`,
        }}
      />

      <motion.div
        className="absolute w-64 h-64 bg-cyber-green/15 rounded-full blur-3xl"
        animate={{
          x: [0, 50, -50, 0],
          y: [0, -30, 30, 0],
          scale: [1, 1.3, 0.9, 1],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 10,
        }}
        style={{
          left: `${50 + mousePosition.x * 0.01}%`,
          top: `${40 + mousePosition.y * 0.01}%`,
        }}
      />

      {/* Particle system */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-cyber-blue rounded-full opacity-60"
          animate={{
            y: [-20, -window.innerHeight - 20],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            delay: Math.random() * 20,
            ease: "linear",
          }}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
        />
      ))}

      {/* Scanning lines */}
      <motion.div
        className="absolute inset-0 opacity-10"
        style={{
          background: `linear-gradient(90deg, transparent 0%, rgba(0, 122, 255, 0.3) ${mousePosition.x}%, transparent 100%)`,
        }}
      />
    </>
  );

  const renderSecondaryBackground = () => (
    <>
      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-tr from-cyber-dark via-cyber-black to-cyber-purple/20" />

      {/* Financial data overlay */}
      <div className="absolute inset-0 opacity-5">
        <img
          src="https://images.pexels.com/photos/5849556/pexels-photo-5849556.jpeg"
          alt=""
          className="w-full h-full object-cover mix-blend-overlay"
        />
      </div>

      {/* Geometric shapes */}
      <motion.div
        className="absolute w-32 h-32 border border-cyber-blue/30 rounded-lg"
        animate={{ rotate: 360 }}
        transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
        style={{
          left: `${10 + mousePosition.x * 0.05}%`,
          top: `${10 + mousePosition.y * 0.05}%`,
        }}
      />

      <motion.div
        className="absolute w-24 h-24 border border-cyber-purple/40 rounded-full"
        animate={{ rotate: -360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        style={{
          right: `${20 + mousePosition.x * 0.03}%`,
          top: `${30 + mousePosition.y * 0.03}%`,
        }}
      />

      <motion.div
        className="absolute w-40 h-40 border border-cyber-green/20"
        animate={{
          rotate: 360,
          scale: [1, 1.1, 1],
        }}
        transition={{
          rotate: { duration: 60, repeat: Infinity, ease: "linear" },
          scale: { duration: 8, repeat: Infinity, ease: "easeInOut" },
        }}
        style={{
          left: `${60 + mousePosition.x * 0.02}%`,
          bottom: `${20 + mousePosition.y * 0.02}%`,
        }}
      />
    </>
  );

  const renderTertiaryBackground = () => (
    <>
      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-bl from-cyber-black via-cyber-dark/80 to-cyber-purple/30" />

      {/* Chart pattern overlay */}
      <div className="absolute inset-0 opacity-10">
        <svg
          className="w-full h-full"
          viewBox="0 0 1000 1000"
          preserveAspectRatio="none"
        >
          <motion.path
            d="M0,500 Q250,300 500,400 T1000,300"
            stroke="url(#chartGradient)"
            strokeWidth="2"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
          <defs>
            <linearGradient
              id="chartGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="#007AFF" stopOpacity="0.6" />
              <stop offset="50%" stopColor="#34D399" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#A855F7" stopOpacity="0.6" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Pulsing nodes */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-4 h-4 bg-cyber-blue/60 rounded-full"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.6, 1, 0.6],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: i * 0.3,
            ease: "easeInOut",
          }}
          style={{
            left: `${10 + i * 12}%`,
            top: `${30 + Math.sin(i) * 20}%`,
          }}
        />
      ))}
    </>
  );

  const renderMinimalBackground = () => (
    <>
      {/* Simple gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyber-dark to-cyber-black" />

      {/* Subtle grid */}
      <div className="absolute inset-0 opacity-10">
        <div className="cyber-grid h-full w-full" />
      </div>

      {/* Single floating element */}
      <motion.div
        className="absolute w-96 h-96 bg-cyber-blue/10 rounded-full blur-3xl"
        animate={{
          x: [0, 50, 0],
          y: [0, -30, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          left: `${30 + mousePosition.x * 0.01}%`,
          top: `${40 + mousePosition.y * 0.01}%`,
        }}
      />
    </>
  );

  const renderBackground = () => {
    switch (variant) {
      case "secondary":
        return renderSecondaryBackground();
      case "tertiary":
        return renderTertiaryBackground();
      case "minimal":
        return renderMinimalBackground();
      default:
        return renderPrimaryBackground();
    }
  };

  return (
    <div
      className={`fixed inset-0 overflow-hidden pointer-events-none ${className}`}
    >
      {renderBackground()}
    </div>
  );
};

export default AnimatedBackground;
