import { ReactNode } from "react";
import { useTheme } from "@/contexts/ThemeContext";
import { cn } from "@/lib/utils";

interface AppleGradientTextProps {
  children: ReactNode;
  variant?: "primary" | "secondary" | "accent" | "rainbow";
  className?: string;
}

const AppleGradientText = ({
  children,
  variant = "primary",
  className,
}: AppleGradientTextProps) => {
  const { theme } = useTheme();

  const getGradientClass = () => {
    if (theme === "light") {
      switch (variant) {
        case "primary":
          return "bg-gradient-to-r from-emerald-500 via-cyan-500 to-blue-500";
        case "secondary":
          return "bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500";
        case "accent":
          return "bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600";
        case "rainbow":
          return "bg-gradient-to-r from-emerald-400 via-cyan-400 via-blue-500 via-purple-500 to-pink-500";
        default:
          return "bg-gradient-to-r from-emerald-500 via-cyan-500 to-blue-500";
      }
    } else {
      switch (variant) {
        case "primary":
          return "bg-gradient-to-r from-cyber-green via-cyber-blue to-cyber-purple";
        case "secondary":
          return "bg-gradient-to-r from-cyber-blue via-cyber-purple to-cyber-red";
        case "accent":
          return "bg-gradient-to-r from-cyber-blue via-white to-cyber-purple";
        case "rainbow":
          return "bg-gradient-to-r from-cyber-green via-cyber-blue via-cyber-purple to-cyber-red";
        default:
          return "bg-gradient-to-r from-cyber-green via-cyber-blue to-cyber-purple";
      }
    }
  };

  return (
    <span
      className={cn(
        "bg-clip-text text-transparent",
        getGradientClass(),
        className,
      )}
    >
      {children}
    </span>
  );
};

export default AppleGradientText;
