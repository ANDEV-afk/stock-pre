import { motion } from "framer-motion";
import { useEffect, useState } from "react";

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

  const renderHomeBackground = () => (
    <>
      {/* Primary gradient base */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyber-black via-cyber-dark to-cyber-black" />

      {/* Animated cyber grid */}
      <div className="absolute inset-0 opacity-20">
        <div className="cyber-grid h-full w-full animate-pulse" />
      </div>

      {/* Multiple floating orbs with complex animations */}
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
          left: `${15 + mousePosition.x * 0.02}%`,
          top: `${20 + mousePosition.y * 0.02}%`,
        }}
      />

      <motion.div
        className="absolute w-[500px] h-[500px] bg-cyber-purple/20 rounded-full blur-3xl"
        animate={{
          x: [0, -120, 80, 0],
          y: [0, 90, -40, 0],
          scale: [1, 0.7, 1.2, 1],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 8,
        }}
        style={{
          right: `${10 + mousePosition.x * 0.015}%`,
          bottom: `${15 + mousePosition.y * 0.015}%`,
        }}
      />

      <motion.div
        className="absolute w-[400px] h-[400px] bg-cyber-green/10 rounded-full blur-3xl"
        animate={{
          x: [0, 60, -80, 40, 0],
          y: [0, -50, 70, -30, 0],
          scale: [1, 1.4, 0.9, 1.1, 1],
        }}
        transition={{
          duration: 35,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 15,
        }}
        style={{
          left: `${45 + mousePosition.x * 0.01}%`,
          top: `${35 + mousePosition.y * 0.01}%`,
        }}
      />

      {/* Particle system */}
      {[...Array(30)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-cyber-blue rounded-full opacity-40"
          animate={{
            y: [-20, -(window.innerHeight + 100)],
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: Math.random() * 15 + 8,
            repeat: Infinity,
            delay: Math.random() * 25,
            ease: "linear",
          }}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
        />
      ))}

      {/* Dynamic gradient overlay */}
      <motion.div
        className="absolute inset-0 opacity-20"
        animate={{
          background: [
            `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(0, 122, 255, 0.3) 0%, transparent 50%)`,
            `radial-gradient(circle at ${mousePosition.x + 20}% ${mousePosition.y + 20}%, rgba(168, 85, 247, 0.2) 0%, transparent 50%)`,
            `radial-gradient(circle at ${mousePosition.x - 20}% ${mousePosition.y - 20}%, rgba(16, 185, 129, 0.1) 0%, transparent 50%)`,
          ],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </>
  );

  const renderDashboardBackground = () => (
    <>
      <div className="absolute inset-0 bg-gradient-to-br from-cyber-dark via-cyber-black to-cyber-dark/80" />

      <div className="absolute inset-0 opacity-15">
        <div className="cyber-grid h-full w-full" />
      </div>

      <motion.div
        className="absolute w-96 h-96 bg-cyber-blue/10 rounded-full blur-3xl"
        animate={{
          x: [0, 50, 0],
          y: [0, -30, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          left: `${20 + mousePosition.x * 0.01}%`,
          top: `${30 + mousePosition.y * 0.01}%`,
        }}
      />

      <motion.div
        className="absolute w-80 h-80 bg-cyber-purple/8 rounded-full blur-3xl"
        animate={{
          x: [0, -40, 0],
          y: [0, 50, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 5,
        }}
        style={{
          right: `${25 + mousePosition.x * 0.008}%`,
          bottom: `${20 + mousePosition.y * 0.008}%`,
        }}
      />
    </>
  );

  const renderMarketsBackground = () => (
    <>
      <div className="absolute inset-0 bg-gradient-to-tr from-cyber-black via-cyber-dark to-cyber-purple/10" />

      <div className="absolute inset-0 opacity-10">
        <motion.div
          className="cyber-grid h-full w-full"
          animate={{ opacity: [0.1, 0.3, 0.1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Market data visualization effect */}
      <svg className="absolute inset-0 w-full h-full opacity-10">
        <motion.path
          d="M0,300 Q200,200 400,250 T800,200 Q1000,180 1200,200"
          stroke="url(#marketGradient)"
          strokeWidth="2"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />
        <defs>
          <linearGradient id="marketGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#007AFF" stopOpacity="0.6" />
            <stop offset="50%" stopColor="#34D399" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#A855F7" stopOpacity="0.6" />
          </linearGradient>
        </defs>
      </svg>

      <motion.div
        className="absolute w-72 h-72 bg-cyber-green/12 rounded-full blur-3xl"
        animate={{
          rotate: 360,
          scale: [1, 1.2, 1],
        }}
        transition={{
          rotate: { duration: 40, repeat: Infinity, ease: "linear" },
          scale: { duration: 10, repeat: Infinity, ease: "easeInOut" },
        }}
        style={{
          left: `${30 + mousePosition.x * 0.015}%`,
          top: `${40 + mousePosition.y * 0.015}%`,
        }}
      />
    </>
  );

  const renderMinimalBackground = () => (
    <>
      <div className="absolute inset-0 bg-gradient-to-br from-cyber-dark to-cyber-black" />

      <div className="absolute inset-0 opacity-5">
        <div className="cyber-grid h-full w-full" />
      </div>

      <motion.div
        className="absolute w-96 h-96 bg-cyber-blue/5 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.05, 0.1, 0.05],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          left: `${40 + mousePosition.x * 0.005}%`,
          top: `${50 + mousePosition.y * 0.005}%`,
        }}
      />
    </>
  );

  const renderBackground = () => {
    switch (variant) {
      case "home":
        return renderHomeBackground();
      case "dashboard":
        return renderDashboardBackground();
      case "markets":
        return renderMarketsBackground();
      default:
        return renderMinimalBackground();
    }
  };

  return (
    <div className={`min-h-screen relative overflow-hidden ${className}`}>
      {/* Background Layer */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {renderBackground()}
      </div>

      {/* Content Layer */}
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default GlobalAnimatedBackground;
