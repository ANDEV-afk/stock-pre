import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type TimeInterval =
  | "1m"
  | "5m"
  | "15m"
  | "30m"
  | "1h"
  | "4h"
  | "1d"
  | "1w"
  | "1M"
  | "3M"
  | "6M"
  | "1Y"
  | "2Y"
  | "5Y";

interface TimeIntervalOption {
  value: TimeInterval;
  label: string;
  description: string;
  category: "intraday" | "daily" | "extended";
}

interface TimeIntervalSelectorProps {
  selectedInterval: TimeInterval;
  onIntervalChange: (interval: TimeInterval) => void;
  className?: string;
  compact?: boolean;
}

const TimeIntervalSelector = ({
  selectedInterval,
  onIntervalChange,
  className,
  compact = false,
}: TimeIntervalSelectorProps) => {
  const [activeCategory, setActiveCategory] = useState<
    "intraday" | "daily" | "extended"
  >("daily");

  const intervals: TimeIntervalOption[] = [
    // Intraday intervals
    { value: "1m", label: "1m", description: "1 Minute", category: "intraday" },
    {
      value: "5m",
      label: "5m",
      description: "5 Minutes",
      category: "intraday",
    },
    {
      value: "15m",
      label: "15m",
      description: "15 Minutes",
      category: "intraday",
    },
    {
      value: "30m",
      label: "30m",
      description: "30 Minutes",
      category: "intraday",
    },
    { value: "1h", label: "1h", description: "1 Hour", category: "intraday" },
    { value: "4h", label: "4h", description: "4 Hours", category: "intraday" },

    // Daily intervals
    { value: "1d", label: "1D", description: "1 Day", category: "daily" },
    { value: "1w", label: "1W", description: "1 Week", category: "daily" },
    { value: "1M", label: "1M", description: "1 Month", category: "daily" },

    // Extended intervals
    { value: "3M", label: "3M", description: "3 Months", category: "extended" },
    { value: "6M", label: "6M", description: "6 Months", category: "extended" },
    { value: "1Y", label: "1Y", description: "1 Year", category: "extended" },
    { value: "2Y", label: "2Y", description: "2 Years", category: "extended" },
    { value: "5Y", label: "5Y", description: "5 Years", category: "extended" },
  ];

  const categories = [
    {
      id: "intraday",
      label: "Intraday",
      description: "Real-time & minute data",
    },
    { id: "daily", label: "Daily", description: "Daily & weekly data" },
    {
      id: "extended",
      label: "Long Term",
      description: "Monthly & yearly data",
    },
  ] as const;

  const getFilteredIntervals = () => {
    if (compact) {
      // Show only popular intervals in compact mode
      return intervals.filter((interval) =>
        ["1d", "1w", "1M", "3M", "6M", "1Y"].includes(interval.value),
      );
    }
    return intervals.filter((interval) => interval.category === activeCategory);
  };

  const getSelectedCategory = () => {
    const selected = intervals.find(
      (interval) => interval.value === selectedInterval,
    );
    return selected?.category || "daily";
  };

  if (compact) {
    return (
      <div className={cn("flex flex-wrap gap-1", className)}>
        {getFilteredIntervals().map((interval) => (
          <motion.div
            key={interval.value}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              size="sm"
              variant={
                selectedInterval === interval.value ? "default" : "outline"
              }
              onClick={() => onIntervalChange(interval.value)}
              className={cn(
                "transition-all duration-200",
                selectedInterval === interval.value
                  ? "bg-cyber-blue text-white border-cyber-blue shadow-cyber"
                  : "bg-white/10 text-white/70 border-cyber-blue/30 hover:bg-white/20 hover:border-cyber-blue/50 hover:text-white",
              )}
            >
              {interval.label}
            </Button>
          </motion.div>
        ))}
      </div>
    );
  }

  return (
    <div
      className={cn(
        "bg-white/10 backdrop-blur-md border border-cyber-blue/20 rounded-xl p-4",
        className,
      )}
    >
      <div className="mb-4">
        <h3 className="text-lg font-bold text-white mb-2">Time Interval</h3>
        <p className="text-sm text-cyber-blue/70">
          Select data granularity for chart analysis
        </p>
      </div>

      {/* Category Tabs */}
      <div className="flex space-x-1 mb-4 bg-white/5 rounded-lg p-1">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            className={cn(
              "flex-1 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200",
              activeCategory === category.id
                ? "bg-cyber-blue text-white shadow-sm"
                : "text-white/70 hover:text-white hover:bg-white/10",
            )}
          >
            <div className="text-center">
              <div>{category.label}</div>
              <div className="text-xs opacity-70 mt-1">
                {category.description}
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Interval Buttons */}
      <div className="grid grid-cols-3 gap-2">
        {getFilteredIntervals().map((interval, index) => (
          <motion.div
            key={interval.value}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button
              variant={
                selectedInterval === interval.value ? "default" : "outline"
              }
              onClick={() => onIntervalChange(interval.value)}
              className={cn(
                "w-full h-auto p-3 transition-all duration-200",
                selectedInterval === interval.value
                  ? "bg-gradient-to-r from-cyber-blue to-cyber-purple text-white border-cyber-blue shadow-cyber"
                  : "bg-white/5 text-white/70 border-cyber-blue/20 hover:bg-white/10 hover:border-cyber-blue/40 hover:text-white",
              )}
            >
              <div className="text-center">
                <div className="text-lg font-bold">{interval.label}</div>
                <div className="text-xs opacity-70 mt-1">
                  {interval.description}
                </div>
              </div>
            </Button>
          </motion.div>
        ))}
      </div>

      {/* Info Panel */}
      <div className="mt-4 p-3 bg-cyber-blue/10 border border-cyber-blue/20 rounded-lg">
        <div className="flex items-start space-x-2">
          <div className="w-2 h-2 bg-cyber-blue rounded-full mt-2 flex-shrink-0" />
          <div className="text-sm text-cyber-blue/80">
            <p className="font-medium mb-1">
              Current Selection:{" "}
              {intervals.find((i) => i.value === selectedInterval)?.description}
            </p>
            <p className="text-xs opacity-70">
              {activeCategory === "intraday" &&
                "Intraday data shows real-time price movements with high granularity"}
              {activeCategory === "daily" &&
                "Daily data provides balanced view of short to medium term trends"}
              {activeCategory === "extended" &&
                "Long-term data reveals major trends and historical patterns"}
            </p>
          </div>
        </div>
      </div>

      {/* Quick Presets */}
      <div className="mt-4">
        <h4 className="text-sm font-semibold text-white mb-2">Quick Presets</h4>
        <div className="flex flex-wrap gap-1">
          {[
            { label: "Day Trading", interval: "5m" as TimeInterval },
            { label: "Swing Trading", interval: "1d" as TimeInterval },
            { label: "Long Term", interval: "1M" as TimeInterval },
            { label: "Overview", interval: "1Y" as TimeInterval },
          ].map((preset) => (
            <Button
              key={preset.label}
              size="sm"
              variant="outline"
              onClick={() => {
                const category = intervals.find(
                  (i) => i.value === preset.interval,
                )?.category;
                if (category) setActiveCategory(category);
                onIntervalChange(preset.interval);
              }}
              className="bg-white/5 border-cyber-purple/30 text-cyber-purple hover:bg-cyber-purple/10 hover:border-cyber-purple/50 text-xs"
            >
              {preset.label}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TimeIntervalSelector;
