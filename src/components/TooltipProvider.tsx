import React from "react";

// Simple wrapper to avoid Radix UI tooltip conflicts for now
const TooltipProvider = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export default TooltipProvider;
