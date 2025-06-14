import { useState } from "react";
import { motion } from "framer-motion";
import { getCompanyLogo, LogoData } from "@/lib/company-logos";
import { cn } from "@/lib/utils";

interface CompanyLogoProps {
  symbol: string;
  companyName: string;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  showTooltip?: boolean;
}

const CompanyLogo = ({
  symbol,
  companyName,
  size = "md",
  className,
  showTooltip = true,
}: CompanyLogoProps) => {
  const [imageError, setImageError] = useState(false);
  const logoData = getCompanyLogo(symbol, companyName);

  const sizeClasses = {
    sm: "w-8 h-8 text-xs",
    md: "w-12 h-12 text-sm",
    lg: "w-16 h-16 text-base",
    xl: "w-20 h-20 text-lg",
  };

  const handleImageError = () => {
    setImageError(true);
  };

  const renderLogo = () => {
    if (logoData.type === "url" && !imageError) {
      return (
        <motion.img
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          src={logoData.url}
          alt={`${companyName} logo`}
          onError={handleImageError}
          className={cn(
            "object-contain rounded-lg",
            sizeClasses[size],
            className,
          )}
        />
      );
    }

    // Fallback or designed fallback
    const fallbackData =
      logoData.type === "fallback"
        ? logoData
        : {
            letter: symbol.charAt(0),
            gradient: "from-blue-500 to-purple-600",
            companyName,
          };

    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className={cn(
          `bg-gradient-to-br ${fallbackData.gradient} rounded-lg flex items-center justify-center font-bold text-white shadow-lg`,
          sizeClasses[size],
          className,
        )}
        title={showTooltip ? companyName : undefined}
      >
        {fallbackData.letter}
      </motion.div>
    );
  };

  return (
    <div className="relative group">
      {renderLogo()}

      {showTooltip && (
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-10">
          {companyName}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
        </div>
      )}
    </div>
  );
};

export default CompanyLogo;
