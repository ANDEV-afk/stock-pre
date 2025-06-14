import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

interface BackgroundVideoOverlayProps {
  variant?: "financial" | "abstract" | "particles" | "disabled";
  className?: string;
  opacity?: number;
}

const BackgroundVideoOverlay = ({
  variant = "disabled",
  className = "",
  opacity = 0.15,
}: BackgroundVideoOverlayProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isVisible, setIsVisible] = useState(true);

  // Particle system for financial data visualization
  useEffect(() => {
    if (variant === "disabled") return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    let animationId: number;
    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      opacity: number;
      color: string;
      type: "dot" | "line" | "chart";
    }> = [];

    // Initialize particles based on variant
    const initParticles = () => {
      particles.length = 0;
      const particleCount = variant === "particles" ? 150 : 80;

      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 2,
          vy: (Math.random() - 0.5) * 2,
          size: Math.random() * 4 + 1,
          opacity: Math.random() * 0.6 + 0.3,
          color: getParticleColor(),
          type: getParticleType(),
        });
      }
    };

    const getParticleColor = () => {
      const colors = [
        "rgba(0, 122, 255, ",
        "rgba(168, 85, 247, ",
        "rgba(16, 185, 129, ",
        "rgba(255, 214, 0, ",
      ];
      return colors[Math.floor(Math.random() * colors.length)];
    };

    const getParticleType = (): "dot" | "line" | "chart" => {
      if (variant === "financial") {
        const types: ("dot" | "line" | "chart")[] = ["dot", "line", "chart"];
        return types[Math.floor(Math.random() * types.length)];
      }
      return "dot";
    };

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle, index) => {
        // Enhanced rolling motion
        const time = Date.now() * 0.001;
        particle.x += particle.vx + Math.sin(time + index) * 0.5;
        particle.y += particle.vy + Math.cos(time + index) * 0.5;

        // Add spiral effect
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const angle = Math.atan2(particle.y - centerY, particle.x - centerX);
        const distance = Math.sqrt(
          Math.pow(particle.x - centerX, 2) + Math.pow(particle.y - centerY, 2),
        );

        // Gentle spiral motion
        particle.x += Math.cos(angle + time * 0.1) * 0.2;
        particle.y += Math.sin(angle + time * 0.1) * 0.2;

        // Bounce off edges with rolling effect
        if (particle.x <= 0 || particle.x >= canvas.width) {
          particle.vx *= -0.8;
          particle.vy += (Math.random() - 0.5) * 0.5;
        }
        if (particle.y <= 0 || particle.y >= canvas.height) {
          particle.vy *= -0.8;
          particle.vx += (Math.random() - 0.5) * 0.5;
        }

        // Keep particles in bounds
        particle.x = Math.max(0, Math.min(canvas.width, particle.x));
        particle.y = Math.max(0, Math.min(canvas.height, particle.y));

        // Draw particle based on type
        ctx.save();
        ctx.globalAlpha = particle.opacity * opacity;

        switch (particle.type) {
          case "dot":
            ctx.fillStyle = particle.color + particle.opacity + ")";
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            ctx.fill();
            break;

          case "line":
            if (index < particles.length - 1) {
              const nextParticle = particles[index + 1];
              const distance = Math.sqrt(
                Math.pow(particle.x - nextParticle.x, 2) +
                  Math.pow(particle.y - nextParticle.y, 2),
              );

              if (distance < 150) {
                ctx.strokeStyle = particle.color + particle.opacity * 0.3 + ")";
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(particle.x, particle.y);
                ctx.lineTo(nextParticle.x, nextParticle.y);
                ctx.stroke();
              }
            }
            break;

          case "chart":
            // Draw mini chart-like pattern
            ctx.strokeStyle = particle.color + particle.opacity + ")";
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(particle.x - 10, particle.y);
            ctx.lineTo(particle.x - 5, particle.y - 5);
            ctx.lineTo(particle.x, particle.y + 3);
            ctx.lineTo(particle.x + 5, particle.y - 8);
            ctx.lineTo(particle.x + 10, particle.y + 2);
            ctx.stroke();
            break;
        }

        ctx.restore();

        // Randomly change direction occasionally
        if (Math.random() < 0.002) {
          particle.vx += (Math.random() - 0.5) * 0.5;
          particle.vy += (Math.random() - 0.5) * 0.5;
        }

        // Fade in and out
        if (Math.random() < 0.005) {
          particle.opacity = Math.random() * 0.5 + 0.2;
        }
      });

      // Connect nearby particles
      if (variant === "abstract" || variant === "financial") {
        particles.forEach((particle, i) => {
          particles.slice(i + 1).forEach((otherParticle) => {
            const distance = Math.sqrt(
              Math.pow(particle.x - otherParticle.x, 2) +
                Math.pow(particle.y - otherParticle.y, 2),
            );

            if (distance < 100) {
              ctx.save();
              ctx.globalAlpha = (1 - distance / 100) * 0.1 * opacity;
              ctx.strokeStyle = "rgba(0, 122, 255, 1)";
              ctx.lineWidth = 1;
              ctx.beginPath();
              ctx.moveTo(particle.x, particle.y);
              ctx.lineTo(otherParticle.x, otherParticle.y);
              ctx.stroke();
              ctx.restore();
            }
          });
        });
      }

      animationId = requestAnimationFrame(animate);
    };

    initParticles();
    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [variant, opacity]);

  if (variant === "disabled") return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 2 }}
      className={`fixed inset-0 pointer-events-none z-0 ${className}`}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ mixBlendMode: "screen" }}
      />

      {/* Additional overlay effects */}
      {variant === "financial" && (
        <div className="absolute inset-0">
          {/* Scanning line effect */}
          <motion.div
            className="absolute w-full h-px bg-gradient-to-r from-transparent via-cyber-blue to-transparent opacity-30"
            animate={{
              y: [0, window.innerHeight || 800],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "linear",
            }}
          />

          {/* Matrix-style number overlay */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-cyber-green font-mono text-xs opacity-20"
                initial={{
                  x: Math.random() * (window.innerWidth || 1200),
                  y: -50,
                }}
                animate={{
                  y: (window.innerHeight || 800) + 50,
                }}
                transition={{
                  duration: Math.random() * 6 + 6,
                  repeat: Infinity,
                  delay: Math.random() * 3,
                  ease: "linear",
                }}
              >
                {Math.random().toFixed(4)}
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Control overlay */}
      <motion.button
        className="absolute top-4 right-4 p-2 bg-black/30 backdrop-blur-sm rounded-lg text-white/50 hover:text-white/80 transition-colors z-10"
        onClick={() => setIsVisible(!isVisible)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        {isVisible ? "◐" : "○"}
      </motion.button>
    </motion.div>
  );
};

export default BackgroundVideoOverlay;
