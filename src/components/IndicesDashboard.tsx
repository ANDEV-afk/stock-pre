import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { IndexData } from "@/lib/api";
import { demoDataService } from "@/lib/demo-data-service";
import {
  TrendingUp,
  TrendingDown,
  BarChart3,
  Activity,
  Zap,
  RefreshCw,
} from "lucide-react";
import { cn } from "@/lib/utils";

const IndicesDashboard = () => {
  const [indices, setIndices] = useState<IndexData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const fetchIndicesData = async () => {
    setIsLoading(true);
    try {
      console.log("Loading market indices data...");
      // Use demo data service for consistent experience
      const data = demoDataService.generateIndicesData();
      setIndices(data);
      setLastUpdated(new Date());
    } catch (error) {
      console.log("Generating fallback indices data...");
      // Simple fallback if even demo service fails
      setIndices([
        {
          symbol: "AAPL",
          name: "Apple Inc.",
          price: 175.43,
          change: 2.14,
          changePercent: 1.23,
        },
        {
          symbol: "GOOGL",
          name: "Alphabet Inc.",
          price: 138.21,
          change: -1.23,
          changePercent: -0.88,
        },
        {
          symbol: "MSFT",
          name: "Microsoft Corp.",
          price: 378.85,
          change: 4.52,
          changePercent: 1.21,
        },
        {
          symbol: "TSLA",
          name: "Tesla Inc.",
          price: 242.68,
          change: -3.45,
          changePercent: -1.4,
        },
        {
          symbol: "NVDA",
          name: "NVIDIA Corp.",
          price: 721.33,
          change: 15.43,
          changePercent: 2.18,
        },
      ]);
      setLastUpdated(new Date());
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchIndicesData();
    // Auto-refresh every 30 seconds
    const interval = setInterval(fetchIndicesData, 30000);
    return () => clearInterval(interval);
  }, []);

  const getMarketSentiment = () => {
    const positiveCount = indices.filter((index) => index.change > 0).length;
    const total = indices.length;
    const bullishPercentage = (positiveCount / total) * 100;

    if (bullishPercentage >= 70)
      return { label: "Bullish", color: "text-cyber-green" };
    if (bullishPercentage <= 30)
      return { label: "Bearish", color: "text-cyber-red" };
    return { label: "Neutral", color: "text-cyber-yellow" };
  };

  const sentiment = getMarketSentiment();

  if (isLoading) {
    return (
      <Card className="dark-card p-8">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-cyber-gray-700 rounded-xl w-1/3" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-24 bg-cyber-gray-700 rounded-xl" />
            ))}
          </div>
        </div>
      </Card>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Header */}
      <Card className="dark-card p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">
              Market Indices
            </h2>
            <div className="flex items-center space-x-4 text-sm text-cyber-gray-300">
              <span>
                Market Sentiment:{" "}
                <span className={sentiment.color}>{sentiment.label}</span>
              </span>
              {lastUpdated && (
                <span>Updated: {lastUpdated.toLocaleTimeString()}</span>
              )}
            </div>
          </div>

          <Button
            onClick={fetchIndicesData}
            disabled={isLoading}
            className="bg-cyber-blue hover:bg-cyber-blue-dark text-white glow-blue"
          >
            <RefreshCw
              className={cn("h-4 w-4 mr-2", isLoading && "animate-spin")}
            />
            Refresh
          </Button>
        </div>

        {/* Indices Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {indices.map((index, idx) => {
            const isPositive = index.change >= 0;

            return (
              <motion.div
                key={index.symbol}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.1 }}
                className="neon-border p-4 rounded-xl hover:glow-blue transition-all duration-300 group cursor-pointer"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    {isPositive ? (
                      <TrendingUp className="h-4 w-4 text-cyber-green" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-cyber-red" />
                    )}
                    <span className="text-xs text-cyber-gray-300 font-mono">
                      {index.symbol.replace("^", "")}
                    </span>
                  </div>

                  <div
                    className={cn(
                      "text-xs px-2 py-1 rounded-full font-medium",
                      isPositive
                        ? "bg-cyber-green/20 text-cyber-green"
                        : "bg-cyber-red/20 text-cyber-red",
                    )}
                  >
                    {isPositive ? "+" : ""}
                    {(index.changePercent || 0).toFixed(2)}%
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-sm font-semibold text-white group-hover:text-cyber-blue transition-colors">
                    {index.name}
                  </h3>

                  <div className="space-y-1">
                    <p className="text-lg font-bold text-white">
                      {(index.price || 0).toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </p>

                    <p
                      className={cn(
                        "text-sm font-medium",
                        isPositive ? "text-cyber-green" : "text-cyber-red",
                      )}
                    >
                      {isPositive ? "+" : ""}
                      {(index.change || 0).toFixed(2)}
                    </p>
                  </div>
                </div>

                {/* Mini chart placeholder */}
                <div className="mt-4 h-8 flex items-end space-x-1">
                  {[...Array(12)].map((_, i) => (
                    <div
                      key={i}
                      className={cn(
                        "flex-1 rounded-sm transition-all duration-300",
                        isPositive ? "bg-cyber-green/30" : "bg-cyber-red/30",
                      )}
                      style={{
                        height: `${Math.random() * 100}%`,
                      }}
                    />
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </Card>

      {/* Market Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="dark-card p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-cyber-blue/20 rounded-xl">
              <BarChart3 className="h-6 w-6 text-cyber-blue" />
            </div>
            <h3 className="text-lg font-semibold text-white">
              Market Overview
            </h3>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-cyber-gray-300">Rising Indices</span>
              <span className="text-cyber-green font-semibold">
                {indices.filter((i) => i.change > 0).length}/{indices.length}
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-cyber-gray-300">Avg Change</span>
              <span
                className={cn(
                  "font-semibold",
                  indices.reduce((sum, i) => sum + i.changePercent, 0) /
                    indices.length >
                    0
                    ? "text-cyber-green"
                    : "text-cyber-red",
                )}
              >
                {(
                  indices.reduce((sum, i) => sum + i.changePercent, 0) /
                  indices.length
                ).toFixed(2)}
                %
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-cyber-gray-300">Volatility</span>
              <span className="text-cyber-yellow font-semibold">
                {(indices.find((i) => i.symbol === "VXX")?.price || 0).toFixed(
                  2,
                )}
              </span>
            </div>
          </div>
        </Card>

        <Card className="dark-card p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-cyber-purple/20 rounded-xl">
              <Activity className="h-6 w-6 text-cyber-purple" />
            </div>
            <h3 className="text-lg font-semibold text-white">AI Insights</h3>
          </div>

          <div className="space-y-3 text-sm">
            <p className="text-cyber-gray-300">
              Current market shows{" "}
              <span className={sentiment.color}>
                {sentiment.label.toLowerCase()}
              </span>{" "}
              sentiment with {indices.filter((i) => i.change > 0).length} out of{" "}
              {indices.length} indices in positive territory.
            </p>

            <div className="p-3 bg-cyber-blue/10 rounded-lg border border-cyber-blue/20">
              <p className="text-cyber-blue text-xs">
                💡 AI Prediction: Based on current patterns, expect continued
                {sentiment.label === "Bullish"
                  ? " upward momentum"
                  : sentiment.label === "Bearish"
                    ? " downward pressure"
                    : " sideways movement"}
                in the next session.
              </p>
            </div>
          </div>
        </Card>

        <Card className="dark-card p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-cyber-green/20 rounded-xl">
              <Zap className="h-6 w-6 text-cyber-green" />
            </div>
            <h3 className="text-lg font-semibold text-white">Quick Actions</h3>
          </div>

          <div className="space-y-3">
            <Button className="w-full bg-cyber-blue/20 hover:bg-cyber-blue/30 text-cyber-blue border border-cyber-blue/30">
              Analyze NASDAQ
            </Button>

            <Button className="w-full bg-cyber-purple/20 hover:bg-cyber-purple/30 text-cyber-purple border border-cyber-purple/30">
              S&P 500 Forecast
            </Button>

            <Button className="w-full bg-cyber-green/20 hover:bg-cyber-green/30 text-cyber-green border border-cyber-green/30">
              Set Index Alerts
            </Button>
          </div>
        </Card>
      </div>
    </motion.div>
  );
};

export default IndicesDashboard;
