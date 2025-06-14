import { ReactNode } from "react";
import { motion } from "framer-motion";
import { useTheme } from "@/contexts/ThemeContext";
import { cn } from "@/lib/utils";

interface AppleCardProps {
  children: ReactNode;
  className?: string;
  gradient?: boolean;
  hover?: boolean;
  onClick?: () => void;
}

const AppleCard = ({
  children,
  className,
  gradient = false,
  hover = true,
  onClick,
}: AppleCardProps) => {
  const { theme } = useTheme();

  return (
    <motion.div
      whileHover={hover ? { y: -5, scale: 1.02 } : {}}
      whileTap={onClick ? { scale: 0.98 } : {}}
      onClick={onClick}
      className={cn(
        "relative overflow-hidden rounded-2xl transition-all duration-300",
        theme === "light"
          ? gradient
            ? "bg-gradient-to-br from-white/80 to-slate-100/80 apple-glass border border-white/20 apple-shadow hover:apple-shadow-lg"
            : "apple-glass border border-white/20 apple-shadow hover:apple-shadow-lg"
          : gradient
            ? "bg-gradient-to-br from-cyber-dark/50 to-cyber-black/50 border border-cyber-blue/20 shadow-cyber hover:shadow-cyber-lg"
            : "bg-cyber-dark/30 border border-cyber-blue/20 shadow-cyber hover:shadow-cyber-lg",
        onClick && "cursor-pointer",
        className,
      )}
    >
      {gradient && theme === "light" && (
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-cyan-500/5" />
      )}
      {gradient && theme === "dark" && (
        <div className="absolute inset-0 bg-gradient-to-br from-cyber-blue/10 via-cyber-purple/10 to-cyber-green/10" />
      )}
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
};

export default AppleCard;
