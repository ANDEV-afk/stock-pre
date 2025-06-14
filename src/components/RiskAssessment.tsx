import { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  AlertTriangle,
  Zap,
  Calendar,
  TrendingUp,
  Activity,
  BarChart3,
  DollarSign,
  Percent,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface RiskMetric {
  id: string;
  label: string;
  value: "Low" | "Medium" | "High";
  description: string;
  impact: number; // 1-5 scale
}

interface RiskAssessmentProps {
  symbol: string;
  onSetPriceAlert?: () => void;
  onAddToWatchlist?: () => void;
  className?: string;
}

const RiskAssessment = ({
  symbol,
  onSetPriceAlert,
  onAddToWatchlist,
  className,
}: RiskAssessmentProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Mock risk data based on symbol
  const getRiskMetrics = (symbol: string): RiskMetric[] => {
    const baseMetrics = [
      {
        id: "volatility",
        label: "Volatility",
        value: "Medium" as const,
        description: "Price fluctuation in recent trading sessions",
        impact: 3,
      },
      {
        id: "market-risk",
        label: "Market Risk",
        value: "High" as const,
        description: "Overall market conditions and systematic risk",
        impact: 4,
      },
      {
        id: "liquidity",
        label: "Liquidity",
        value: "High" as const,
        description: "Ease of buying/selling without affecting price",
        impact: 2,
      },
    ];

    // Customize based on symbol
    if (symbol === "TSLA") {
      baseMetrics[0].value = "High";
      baseMetrics[0].impact = 5;
    } else if (symbol === "AAPL") {
      baseMetrics[0].value = "Low";
      baseMetrics[0].impact = 2;
      baseMetrics[1].value = "Medium";
      baseMetrics[1].impact = 3;
    }

    return baseMetrics;
  };

  const riskMetrics = getRiskMetrics(symbol);

  const getRiskColor = (value: string) => {
    switch (value) {
      case "Low":
        return "bg-cyber-green/20 text-cyber-green border-cyber-green/40";
      case "Medium":
        return "bg-cyber-yellow/20 text-cyber-yellow border-cyber-yellow/40";
      case "High":
        return "bg-cyber-red/20 text-cyber-red border-cyber-red/40";
      default:
        return "bg-cyber-blue/20 text-cyber-blue border-cyber-blue/40";
    }
  };

  const getRiskIcon = (id: string) => {
    switch (id) {
      case "volatility":
        return Activity;
      case "market-risk":
        return TrendingUp;
      case "liquidity":
        return BarChart3;
      default:
        return AlertTriangle;
    }
  };

  const overallRiskScore =
    riskMetrics.reduce((sum, metric) => sum + metric.impact, 0) /
    riskMetrics.length;
  const overallRisk =
    overallRiskScore <= 2 ? "Low" : overallRiskScore <= 3.5 ? "Medium" : "High";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn("", className)}
    >
      <Card className="p-6 bg-gradient-to-br from-gray-900/95 via-gray-800/95 to-gray-900/95 backdrop-blur-xl border border-gray-700/50 shadow-2xl">
        {/* Header */}
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-2 bg-orange-500/20 rounded-lg">
            <AlertTriangle className="h-5 w-5 text-orange-400" />
          </div>
          <h3 className="text-lg font-bold text-white">Risk Assessment</h3>
        </div>

        {/* Risk Metrics */}
        <div className="space-y-4 mb-6">
          {riskMetrics.map((metric, index) => {
            const Icon = getRiskIcon(metric.id);

            return (
              <motion.div
                key={metric.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between group"
              >
                <div className="flex items-center space-x-3">
                  <Icon className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-300 font-medium">
                    {metric.label}
                  </span>
                </div>

                <Badge
                  className={cn(
                    "px-3 py-1 font-medium",
                    getRiskColor(metric.value),
                  )}
                >
                  {metric.value}
                </Badge>
              </motion.div>
            );
          })}
        </div>

        {/* Overall Risk Score */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="p-4 bg-gray-800/50 rounded-lg mb-6 border border-gray-700/30"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-400">Overall Risk</span>
            <Badge
              className={cn("px-3 py-1 font-bold", getRiskColor(overallRisk))}
            >
              {overallRisk}
            </Badge>
          </div>

          {/* Risk Score Bar */}
          <div className="w-full bg-gray-700 rounded-full h-2">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(overallRiskScore / 5) * 100}%` }}
              transition={{ duration: 1, delay: 0.5 }}
              className={cn(
                "h-2 rounded-full transition-all duration-300",
                overallRisk === "Low"
                  ? "bg-cyber-green"
                  : overallRisk === "Medium"
                    ? "bg-cyber-yellow"
                    : "bg-cyber-red",
              )}
            />
          </div>

          <div className="text-xs text-gray-500 mt-2">
            Score: {overallRiskScore.toFixed(1)}/5.0
          </div>
        </motion.div>

        {/* Disclaimer */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-lg mb-6"
        >
          <div className="flex items-start space-x-2">
            <AlertTriangle className="h-4 w-4 text-amber-400 mt-0.5 flex-shrink-0" />
            <div className="text-sm">
              <span className="text-amber-400 font-semibold">Disclaimer:</span>
              <span className="text-amber-200/80 ml-1">
                These predictions are for educational purposes only. Always
                conduct your own research before making investment decisions.
              </span>
            </div>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Button
              onClick={onSetPriceAlert}
              className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-3 rounded-lg transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-blue-500/25"
            >
              <Zap className="h-4 w-4 mr-2" />
              Set Price Alert
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Button
              onClick={onAddToWatchlist}
              variant="outline"
              className="w-full border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white py-3 rounded-lg transition-all duration-300"
            >
              <Calendar className="h-4 w-4 mr-2" />
              Add to Watchlist
            </Button>
          </motion.div>
        </div>

        {/* Additional Risk Details (Expandable) */}
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-6 pt-6 border-t border-gray-700/50"
          >
            <h4 className="text-white font-semibold mb-4">Risk Breakdown</h4>
            <div className="space-y-3">
              {riskMetrics.map((metric) => (
                <div key={metric.id} className="p-3 bg-gray-800/30 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white font-medium">
                      {metric.label}
                    </span>
                    <Badge
                      className={cn("text-xs", getRiskColor(metric.value))}
                    >
                      {metric.value}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-400">{metric.description}</p>

                  {/* Impact Bar */}
                  <div className="mt-2">
                    <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                      <span>Impact Level</span>
                      <span>{metric.impact}/5</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-1">
                      <div
                        className={cn(
                          "h-1 rounded-full",
                          metric.impact <= 2
                            ? "bg-cyber-green"
                            : metric.impact <= 3
                              ? "bg-cyber-yellow"
                              : "bg-cyber-red",
                        )}
                        style={{ width: `${(metric.impact / 5) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Toggle Details Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-4 text-center"
        >
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-gray-400 hover:text-white text-xs"
          >
            {isExpanded ? "Show Less" : "View Details"}
          </Button>
        </motion.div>
      </Card>
    </motion.div>
  );
};

export default RiskAssessment;
