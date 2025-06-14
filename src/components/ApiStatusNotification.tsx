import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, Wifi, WifiOff, Info, X } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ApiStatusNotificationProps {
  show: boolean;
  type: "offline" | "limited" | "error" | "info";
  message: string;
  onDismiss?: () => void;
}

const ApiStatusNotification: React.FC<ApiStatusNotificationProps> = ({
  show,
  type,
  message,
  onDismiss,
}) => {
  const [isVisible, setIsVisible] = useState(show);

  useEffect(() => {
    setIsVisible(show);
  }, [show]);

  const handleDismiss = () => {
    setIsVisible(false);
    setTimeout(() => onDismiss?.(), 300);
  };

  const getIcon = () => {
    switch (type) {
      case "offline":
        return <WifiOff className="h-5 w-5" />;
      case "limited":
        return <Wifi className="h-5 w-5" />;
      case "error":
        return <AlertTriangle className="h-5 w-5" />;
      case "info":
        return <Info className="h-5 w-5" />;
    }
  };

  const getColors = () => {
    switch (type) {
      case "offline":
        return {
          bg: "bg-cyber-red/10",
          border: "border-cyber-red/30",
          text: "text-cyber-red",
          icon: "text-cyber-red",
        };
      case "limited":
        return {
          bg: "bg-cyber-yellow/10",
          border: "border-cyber-yellow/30",
          text: "text-cyber-yellow",
          icon: "text-cyber-yellow",
        };
      case "error":
        return {
          bg: "bg-cyber-red/10",
          border: "border-cyber-red/30",
          text: "text-cyber-red",
          icon: "text-cyber-red",
        };
      case "info":
        return {
          bg: "bg-cyber-blue/10",
          border: "border-cyber-blue/30",
          text: "text-cyber-blue",
          icon: "text-cyber-blue",
        };
    }
  };

  const colors = getColors();

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -50, scale: 0.95 }}
          transition={{ duration: 0.3 }}
          className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 max-w-md w-full mx-4"
        >
          <Card
            className={cn(
              "p-4 border backdrop-blur-xl",
              colors.bg,
              colors.border,
            )}
          >
            <div className="flex items-start space-x-3">
              <div className={cn("mt-0.5", colors.icon)}>{getIcon()}</div>

              <div className="flex-1 min-w-0">
                <p className={cn("text-sm font-medium", colors.text)}>
                  {type === "offline" && "API Offline"}
                  {type === "limited" && "Limited API Access"}
                  {type === "error" && "API Error"}
                  {type === "info" && "Information"}
                </p>
                <p className="text-xs text-cyber-gray-300 mt-1">{message}</p>
              </div>

              {onDismiss && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleDismiss}
                  className="h-8 w-8 p-0 text-cyber-gray-400 hover:text-white"
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          </Card>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ApiStatusNotification;
