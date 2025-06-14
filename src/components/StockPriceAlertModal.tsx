import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import {
  Bell,
  TrendingUp,
  TrendingDown,
  Target,
  Volume2,
  Percent,
  X,
  Check,
  Zap,
  AlertTriangle,
  Info,
  Settings,
  Plus,
  Minus,
  DollarSign,
  Clock,
  Mail,
  Smartphone,
  Activity,
  BarChart3,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface StockPriceAlertModalProps {
  symbol: string;
  currentPrice: number;
  companyName: string;
  isOpen: boolean;
  onClose: () => void;
  predictedPrice?: number;
  className?: string;
}

interface AlertFormData {
  type:
    | "above"
    | "below"
    | "volume"
    | "change_percent"
    | "support"
    | "resistance";
  value: number;
  condition: "once" | "recurring";
  notificationMethod: "email" | "push" | "both";
  priority: "low" | "medium" | "high";
  description: string;
  stopLoss?: number;
  takeProfit?: number;
}

const ALERT_TYPES = [
  {
    id: "above",
    label: "Price Above",
    description: "Alert when price goes above target",
    icon: TrendingUp,
    color: "cyber-green",
    placeholder: "Enter target price",
  },
  {
    id: "below",
    label: "Price Below",
    description: "Alert when price goes below target",
    icon: TrendingDown,
    color: "cyber-red",
    placeholder: "Enter target price",
  },
  {
    id: "support",
    label: "Support Break",
    description: "Alert when price breaks below support",
    icon: Target,
    color: "cyber-yellow",
    placeholder: "Enter support level",
  },
  {
    id: "resistance",
    label: "Resistance Break",
    description: "Alert when price breaks above resistance",
    icon: Target,
    color: "cyber-blue",
    placeholder: "Enter resistance level",
  },
  {
    id: "change_percent",
    label: "% Change",
    description: "Alert on significant price change",
    icon: Percent,
    color: "cyber-purple",
    placeholder: "Enter percentage",
  },
  {
    id: "volume",
    label: "High Volume",
    description: "Alert on unusual volume activity",
    icon: Volume2,
    color: "cyber-yellow",
    placeholder: "Enter volume threshold",
  },
] as const;

const StockPriceAlertModal = ({
  symbol,
  currentPrice,
  companyName,
  isOpen,
  onClose,
  predictedPrice,
  className,
}: StockPriceAlertModalProps) => {
  const [formData, setFormData] = useState<AlertFormData>({
    type: "above",
    value: 0,
    condition: "once",
    notificationMethod: "both",
    priority: "medium",
    description: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);

  // Initialize form with suggested values
  useEffect(() => {
    if (isOpen) {
      const suggestedValue = predictedPrice || currentPrice * 1.05;
      setFormData((prev) => ({
        ...prev,
        value: Math.round(suggestedValue * 100) / 100,
        description: `${symbol} price alert`,
      }));
    }
  }, [isOpen, symbol, currentPrice, predictedPrice]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  const handleSubmit = async () => {
    if (!formData.value || formData.value <= 0) {
      toast.error("Please enter a valid target value");
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Create the alert object (in real app, this would be sent to API)
      const alert = {
        id: Date.now().toString(),
        symbol,
        type: formData.type,
        value: formData.value,
        currentPrice,
        condition: formData.condition,
        notificationMethod: formData.notificationMethod,
        priority: formData.priority,
        description: formData.description || getDefaultDescription(),
        stopLoss: formData.stopLoss,
        takeProfit: formData.takeProfit,
        createdAt: new Date(),
        isActive: true,
      };

      // Success notification
      toast.success(`🚨 Alert Created!`, {
        description: `You'll be notified when ${symbol} ${getAlertDescription()}`,
        duration: 4000,
        action: {
          label: "View",
          onClick: () => console.log("View alert:", alert),
        },
      });

      // Store in localStorage for demo purposes
      const existingAlerts = JSON.parse(
        localStorage.getItem("stockAlerts") || "[]",
      );
      existingAlerts.unshift(alert);
      localStorage.setItem("stockAlerts", JSON.stringify(existingAlerts));

      onClose();
    } catch (error) {
      toast.error("Failed to create alert. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const getDefaultDescription = () => {
    const alertType = ALERT_TYPES.find((t) => t.id === formData.type);
    return `${symbol} ${alertType?.label.toLowerCase()} $${formData.value}`;
  };

  const getAlertDescription = () => {
    switch (formData.type) {
      case "above":
        return `goes above $${formData.value}`;
      case "below":
        return `goes below $${formData.value}`;
      case "support":
        return `breaks support at $${formData.value}`;
      case "resistance":
        return `breaks resistance at $${formData.value}`;
      case "change_percent":
        return `changes by ${formData.value}%`;
      case "volume":
        return `volume exceeds ${(formData.value / 1000000).toFixed(1)}M shares`;
      default:
        return `reaches target`;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-cyber-red/20 text-cyber-red border-cyber-red/30";
      case "medium":
        return "bg-cyber-yellow/20 text-cyber-yellow border-cyber-yellow/30";
      case "low":
        return "bg-cyber-blue/20 text-cyber-blue border-cyber-blue/30";
      default:
        return "bg-cyber-blue/20 text-cyber-blue border-cyber-blue/30";
    }
  };

  const getSuggestedValues = () => {
    const suggestions = [];
    const changePercent = 5; // 5% change

    if (formData.type === "above") {
      suggestions.push(
        { label: "+5%", value: currentPrice * 1.05 },
        { label: "+10%", value: currentPrice * 1.1 },
        { label: "+15%", value: currentPrice * 1.15 },
      );
      if (predictedPrice && predictedPrice > currentPrice) {
        suggestions.unshift({ label: "AI Target", value: predictedPrice });
      }
    } else if (formData.type === "below") {
      suggestions.push(
        { label: "-5%", value: currentPrice * 0.95 },
        { label: "-10%", value: currentPrice * 0.9 },
        { label: "-15%", value: currentPrice * 0.85 },
      );
      if (predictedPrice && predictedPrice < currentPrice) {
        suggestions.unshift({ label: "AI Target", value: predictedPrice });
      }
    } else if (formData.type === "change_percent") {
      suggestions.push(
        { label: "5%", value: 5 },
        { label: "10%", value: 10 },
        { label: "15%", value: 15 },
      );
    } else if (formData.type === "volume") {
      const avgVolume = 50000000; // Mock average volume
      suggestions.push(
        { label: "2x Avg", value: avgVolume * 2 },
        { label: "3x Avg", value: avgVolume * 3 },
        { label: "5x Avg", value: avgVolume * 5 },
      );
    }

    return suggestions;
  };

  const selectedAlertType = ALERT_TYPES.find((t) => t.id === formData.type);
  const suggestions = getSuggestedValues();

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className={cn(
            "bg-cyber-dark border border-cyber-blue/30 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto",
            className,
          )}
        >
          <div className="p-8">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  Create Price Alert
                </h3>
                <div className="flex items-center space-x-3">
                  <Badge className="bg-cyber-blue/20 text-cyber-blue border-cyber-blue/30">
                    {symbol}
                  </Badge>
                  <span className="text-white/70">{companyName}</span>
                  <span className="text-cyber-green font-medium">
                    ${currentPrice.toFixed(2)}
                  </span>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="text-white/70 hover:text-white"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            {/* Alert Type Selection */}
            <div className="mb-6">
              <Label className="text-white text-sm mb-3 block">
                Alert Type
              </Label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {ALERT_TYPES.map((type) => {
                  const Icon = type.icon;
                  const isSelected = formData.type === type.id;

                  return (
                    <motion.button
                      key={type.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() =>
                        setFormData((prev) => ({
                          ...prev,
                          type: type.id as any,
                        }))
                      }
                      className={cn(
                        "p-4 border rounded-xl transition-all duration-200 text-left",
                        isSelected
                          ? `border-${type.color}/50 bg-${type.color}/10`
                          : "border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10",
                      )}
                    >
                      <Icon
                        className={cn(
                          "h-5 w-5 mb-2",
                          isSelected ? `text-${type.color}` : "text-white/70",
                        )}
                      />
                      <div
                        className={cn(
                          "font-medium text-sm mb-1",
                          isSelected ? "text-white" : "text-white/80",
                        )}
                      >
                        {type.label}
                      </div>
                      <div className="text-xs text-white/60">
                        {type.description}
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* Target Value */}
            <div className="mb-6">
              <Label className="text-white text-sm mb-3 block">
                {formData.type === "change_percent"
                  ? "Percentage Change %"
                  : formData.type === "volume"
                    ? "Volume Threshold (shares)"
                    : "Target Price ($)"}
              </Label>

              <div className="space-y-3">
                <div className="relative">
                  {(formData.type === "above" ||
                    formData.type === "below" ||
                    formData.type === "support" ||
                    formData.type === "resistance") && (
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/50" />
                  )}
                  {formData.type === "change_percent" && (
                    <Percent className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/50" />
                  )}
                  <Input
                    type="number"
                    step="0.01"
                    placeholder={selectedAlertType?.placeholder}
                    value={formData.value || ""}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        value: parseFloat(e.target.value) || 0,
                      }))
                    }
                    className={cn(
                      "bg-white/10 border-cyber-blue/30 text-white placeholder-white/50",
                      (formData.type === "above" ||
                        formData.type === "below" ||
                        formData.type === "support" ||
                        formData.type === "resistance") &&
                        "pl-10",
                    )}
                  />
                </div>

                {/* Quick Suggestions */}
                {suggestions.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    <span className="text-white/60 text-xs flex items-center">
                      <Zap className="h-3 w-3 mr-1" />
                      Quick select:
                    </span>
                    {suggestions.map((suggestion, index) => (
                      <Button
                        key={index}
                        size="sm"
                        variant="outline"
                        onClick={() =>
                          setFormData((prev) => ({
                            ...prev,
                            value: Math.round(suggestion.value * 100) / 100,
                          }))
                        }
                        className="border-cyber-blue/30 text-cyber-blue hover:bg-cyber-blue/10 text-xs"
                      >
                        {suggestion.label}
                        {formData.type !== "change_percent" &&
                          formData.type !== "volume" && (
                            <span className="ml-1">
                              ${suggestion.value.toFixed(2)}
                            </span>
                          )}
                      </Button>
                    ))}
                  </div>
                )}

                {/* Current vs Target */}
                {(formData.type === "above" || formData.type === "below") &&
                  formData.value > 0 && (
                    <div className="bg-white/5 rounded-lg p-3">
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-white/70">Current Price:</span>
                        <span className="text-white">
                          ${currentPrice.toFixed(2)}
                        </span>
                      </div>
                      <div className="flex justify-between items-center text-sm mt-1">
                        <span className="text-white/70">Target Price:</span>
                        <span
                          className={cn(
                            "font-medium",
                            formData.type === "above"
                              ? "text-cyber-green"
                              : "text-cyber-red",
                          )}
                        >
                          ${formData.value.toFixed(2)}
                        </span>
                      </div>
                      <div className="flex justify-between items-center text-sm mt-1">
                        <span className="text-white/70">Change:</span>
                        <span
                          className={cn(
                            "font-medium",
                            formData.value > currentPrice
                              ? "text-cyber-green"
                              : "text-cyber-red",
                          )}
                        >
                          {(
                            ((formData.value - currentPrice) / currentPrice) *
                            100
                          ).toFixed(2)}
                          %
                        </span>
                      </div>
                    </div>
                  )}
              </div>
            </div>

            {/* Configuration Options */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div>
                <Label className="text-white text-sm mb-2 block">
                  Priority
                </Label>
                <select
                  value={formData.priority}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      priority: e.target.value as any,
                    }))
                  }
                  className="w-full px-3 py-2 bg-white/10 border border-cyber-blue/30 rounded-md text-white"
                >
                  <option value="low">Low Priority</option>
                  <option value="medium">Medium Priority</option>
                  <option value="high">High Priority</option>
                </select>
              </div>

              <div>
                <Label className="text-white text-sm mb-2 block">
                  Condition
                </Label>
                <select
                  value={formData.condition}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      condition: e.target.value as any,
                    }))
                  }
                  className="w-full px-3 py-2 bg-white/10 border border-cyber-blue/30 rounded-md text-white"
                >
                  <option value="once">Trigger Once</option>
                  <option value="recurring">Recurring</option>
                </select>
              </div>

              <div>
                <Label className="text-white text-sm mb-2 block">
                  Notifications
                </Label>
                <select
                  value={formData.notificationMethod}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      notificationMethod: e.target.value as any,
                    }))
                  }
                  className="w-full px-3 py-2 bg-white/10 border border-cyber-blue/30 rounded-md text-white"
                >
                  <option value="email">Email Only</option>
                  <option value="push">Push Only</option>
                  <option value="both">Email + Push</option>
                </select>
              </div>
            </div>

            {/* Advanced Options */}
            <div className="mb-6">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowAdvanced(!showAdvanced)}
                className="text-cyber-blue hover:text-cyber-blue-light"
              >
                <Settings className="h-4 w-4 mr-2" />
                Advanced Options
                <motion.div
                  animate={{ rotate: showAdvanced ? 180 : 0 }}
                  className="ml-2"
                >
                  <Plus className="h-4 w-4" />
                </motion.div>
              </Button>

              <AnimatePresence>
                {showAdvanced && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-4 space-y-4"
                  >
                    <div>
                      <Label className="text-white text-sm mb-2 block">
                        Description (Optional)
                      </Label>
                      <Input
                        placeholder="Custom alert description..."
                        value={formData.description}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            description: e.target.value,
                          }))
                        }
                        className="bg-white/10 border-cyber-blue/30 text-white placeholder-white/50"
                      />
                    </div>

                    {(formData.type === "above" ||
                      formData.type === "below") && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label className="text-white text-sm mb-2 block">
                            Stop Loss (Optional)
                          </Label>
                          <Input
                            type="number"
                            step="0.01"
                            placeholder="Stop loss price"
                            value={formData.stopLoss || ""}
                            onChange={(e) =>
                              setFormData((prev) => ({
                                ...prev,
                                stopLoss:
                                  parseFloat(e.target.value) || undefined,
                              }))
                            }
                            className="bg-white/10 border-cyber-red/30 text-white placeholder-white/50"
                          />
                        </div>
                        <div>
                          <Label className="text-white text-sm mb-2 block">
                            Take Profit (Optional)
                          </Label>
                          <Input
                            type="number"
                            step="0.01"
                            placeholder="Take profit price"
                            value={formData.takeProfit || ""}
                            onChange={(e) =>
                              setFormData((prev) => ({
                                ...prev,
                                takeProfit:
                                  parseFloat(e.target.value) || undefined,
                              }))
                            }
                            className="bg-white/10 border-cyber-green/30 text-white placeholder-white/50"
                          />
                        </div>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Alert Preview */}
            <div className="mb-6 p-4 bg-white/5 border border-cyber-blue/20 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <Info className="h-4 w-4 text-cyber-blue" />
                <span className="text-cyber-blue font-medium text-sm">
                  Alert Preview
                </span>
              </div>
              <p className="text-white/80 text-sm">
                You'll receive a{" "}
                <Badge className={getPriorityColor(formData.priority)}>
                  {formData.priority}
                </Badge>{" "}
                priority notification when <strong>{symbol}</strong>{" "}
                {getAlertDescription()}.
              </p>
              {formData.condition === "recurring" && (
                <p className="text-cyber-blue/80 text-xs mt-1">
                  This alert will trigger multiple times.
                </p>
              )}
            </div>

            <Separator className="mb-6" />

            {/* Action Buttons */}
            <div className="flex space-x-3">
              <Button
                onClick={onClose}
                variant="outline"
                className="flex-1 border-white/20 text-white/70 hover:text-white hover:bg-white/10"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={
                  !formData.value || formData.value <= 0 || isSubmitting
                }
                className="flex-1 bg-gradient-to-r from-cyber-green to-cyber-blue hover:from-cyber-green-dark hover:to-cyber-blue-dark text-white"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                    Creating...
                  </>
                ) : (
                  <>
                    <Bell className="mr-2 h-4 w-4" />
                    Create Alert
                  </>
                )}
              </Button>
            </div>

            {/* Info Footer */}
            <div className="mt-6 p-3 bg-cyber-blue/10 rounded-lg border border-cyber-blue/20">
              <div className="flex items-center space-x-2 mb-1">
                <AlertTriangle className="h-4 w-4 text-cyber-blue" />
                <span className="text-cyber-blue font-medium text-sm">
                  Important
                </span>
              </div>
              <p className="text-cyber-blue/80 text-xs">
                Alerts are monitored in real-time during market hours. You can
                modify or delete this alert anytime from your dashboard.
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default StockPriceAlertModal;
