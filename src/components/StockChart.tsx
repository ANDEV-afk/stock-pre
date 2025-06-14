import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
  Bar,
  BarChart,
  ReferenceLine,
} from "./ChartWrapper";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  TrendingUp,
  TrendingDown,
  Activity,
  BarChart3,
  Volume2,
  Target,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface StockData {
  date: string;
  price: number;
  predicted?: boolean;
  volume?: number;
  high?: number;
  low?: number;
  open?: number;
  close?: number;
}

interface StockChartProps {
  symbol: string;
  data: StockData[];
  isLoading?: boolean;
  showPredictions?: boolean;
  className?: string;
}

const StockChart = ({
  symbol,
  data,
  isLoading = false,
  showPredictions = false,
  className,
}: StockChartProps) => {
  const [timeframe, setTimeframe] = useState("1M");
  const [chartType, setChartType] = useState<"line" | "area" | "candle">(
    "area",
  );
  const [showVolume, setShowVolume] = useState(false);

  const timeframes = [
    { label: "1D", value: "1D" },
    { label: "1W", value: "1W" },
    { label: "1M", value: "1M" },
    { label: "3M", value: "3M" },
    { label: "6M", value: "6M" },
    { label: "1Y", value: "1Y" },
  ];

  // Calculate price change and trend
  const currentPrice = data[data.length - 1]?.price || 0;
  const previousPrice = data[data.length - 2]?.price || 0;
  const priceChange = currentPrice - previousPrice;
  const priceChangePercent = previousPrice
    ? (priceChange / previousPrice) * 100
    : 0;
  const isPositive = priceChange >= 0;

  // Split data into historical and predicted
  const historicalData = data.filter((d) => !d.predicted);
  const predictedData = data.filter((d) => d.predicted);

  // Calculate support and resistance levels
  const prices = historicalData.map((d) => d.price);
  const maxPrice = Math.max(...prices);
  const minPrice = Math.min(...prices);
  const resistance = maxPrice * 0.98; // 2% below high
  const support = minPrice * 1.02; // 2% above low

  // Custom tooltip with enhanced styling
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      const isUp = data.close
        ? data.close >= data.open
        : payload[0].value >= previousPrice;

      return (
        <div className="bg-cyber-dark/95 backdrop-blur-md border border-cyber-blue/30 rounded-xl p-4 shadow-xl">
          <p className="text-sm text-cyber-blue/80 mb-2">{label}</p>

          {data.close ? (
            // Candlestick data
            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <span className="text-xs text-white/60">Open:</span>
                <span className="text-sm font-semibold text-white">
                  ${data.open?.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-white/60">High:</span>
                <span className="text-sm font-semibold text-cyber-green">
                  ${data.high?.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-white/60">Low:</span>
                <span className="text-sm font-semibold text-cyber-red">
                  ${data.low?.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-white/60">Close:</span>
                <span
                  className={cn(
                    "text-lg font-bold",
                    isUp ? "text-cyber-green" : "text-cyber-red",
                  )}
                >
                  ${data.close?.toFixed(2)}
                </span>
              </div>
              {data.volume && (
                <div className="flex justify-between items-center mt-2 pt-2 border-t border-cyber-blue/20">
                  <span className="text-xs text-white/60">Volume:</span>
                  <span className="text-sm text-cyber-blue">
                    {(data.volume / 1000000).toFixed(1)}M
                  </span>
                </div>
              )}
            </div>
          ) : (
            // Regular price data
            <div>
              <div className="flex items-center space-x-2">
                <span
                  className={cn(
                    "text-lg font-bold",
                    isUp ? "text-cyber-green" : "text-cyber-red",
                  )}
                >
                  ${payload[0].value.toFixed(2)}
                </span>
                {isUp ? (
                  <TrendingUp className="h-4 w-4 text-cyber-green" />
                ) : (
                  <TrendingDown className="h-4 w-4 text-cyber-red" />
                )}
              </div>
              {data.predicted && (
                <p className="text-xs text-cyber-purple font-medium mt-1">
                  Predicted Value
                </p>
              )}
            </div>
          )}
        </div>
      );
    }
    return null;
  };

  if (isLoading) {
    return (
      <Card className={cn("p-6", className)}>
        <div className="animate-pulse">
          <div className="h-6 bg-white/10 rounded mb-4 w-1/3" />
          <div className="h-64 bg-white/10 rounded" />
        </div>
      </Card>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={cn("", className)}
    >
      <Card className="p-6 bg-white/10 backdrop-blur-md border border-cyber-blue/20 shadow-cyber">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
          <div className="mb-4 lg:mb-0">
            <div className="flex items-center space-x-3 mb-2">
              <h3 className="text-2xl font-bold text-white">{symbol}</h3>
              <div
                className={cn(
                  "flex items-center space-x-1 px-3 py-1 rounded-xl text-sm font-medium",
                  isPositive
                    ? "bg-cyber-green/20 text-cyber-green border border-cyber-green/30"
                    : "bg-cyber-red/20 text-cyber-red border border-cyber-red/30",
                )}
              >
                {isPositive ? (
                  <TrendingUp className="h-4 w-4" />
                ) : (
                  <TrendingDown className="h-4 w-4" />
                )}
                <span>
                  {isPositive ? "+" : ""}
                  {priceChangePercent.toFixed(2)}%
                </span>
              </div>
            </div>

            <div className="flex items-baseline space-x-3">
              <span className="text-3xl font-bold text-white">
                ${currentPrice.toFixed(2)}
              </span>
              <span
                className={cn(
                  "text-lg font-medium",
                  isPositive ? "text-cyber-green" : "text-cyber-red",
                )}
              >
                {isPositive ? "+" : ""}${Math.abs(priceChange).toFixed(2)}
              </span>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center space-x-4">
            {/* Chart Type Toggle */}
            <div className="flex bg-white/10 rounded-xl p-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setChartType("area")}
                className={cn(
                  "rounded-lg transition-all duration-200",
                  chartType === "area"
                    ? "bg-cyber-green text-white shadow-sm"
                    : "text-white/70 hover:text-white hover:bg-white/10",
                )}
              >
                <Activity className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setChartType("line")}
                className={cn(
                  "rounded-lg transition-all duration-200",
                  chartType === "line"
                    ? "bg-cyber-green text-white shadow-sm"
                    : "text-white/70 hover:text-white hover:bg-white/10",
                )}
              >
                <TrendingUp className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setChartType("candle")}
                className={cn(
                  "rounded-lg transition-all duration-200",
                  chartType === "candle"
                    ? "bg-cyber-green text-white shadow-sm"
                    : "text-white/70 hover:text-white hover:bg-white/10",
                )}
              >
                <BarChart3 className="h-4 w-4" />
              </Button>
            </div>

            {/* Volume Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowVolume(!showVolume)}
              className={cn(
                "rounded-lg transition-all duration-200",
                showVolume
                  ? "bg-cyber-purple text-white"
                  : "text-white/70 hover:text-white hover:bg-white/10",
              )}
            >
              <Volume2 className="h-4 w-4" />
            </Button>

            {/* Timeframe Selector */}
            <div className="flex bg-white/10 rounded-xl p-1 space-x-1">
              {timeframes.map((tf) => (
                <Button
                  key={tf.value}
                  variant="ghost"
                  size="sm"
                  onClick={() => setTimeframe(tf.value)}
                  className={cn(
                    "px-3 py-1 text-xs font-medium rounded-lg transition-all duration-200",
                    timeframe === tf.value
                      ? "bg-cyber-blue text-white shadow-sm"
                      : "text-white/70 hover:text-white hover:bg-white/10",
                  )}
                >
                  {tf.label}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Chart */}
        <div className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            {chartType === "area" ? (
              <AreaChart data={data}>
                <defs>
                  <linearGradient
                    id="priceGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="5%"
                      stopColor={isPositive ? "#10b981" : "#ef4444"}
                      stopOpacity={0.4}
                    />
                    <stop
                      offset="95%"
                      stopColor={isPositive ? "#10b981" : "#ef4444"}
                      stopOpacity={0.05}
                    />
                  </linearGradient>
                  <linearGradient
                    id="predictedGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.05} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="rgba(59, 130, 246, 0.1)"
                  vertical={false}
                />
                <XAxis
                  dataKey="date"
                  stroke="rgba(255, 255, 255, 0.5)"
                  fontSize={12}
                />
                <YAxis stroke="rgba(255, 255, 255, 0.5)" fontSize={12} />
                <Tooltip content={<CustomTooltip />} />

                {/* Support and Resistance Lines */}
                <ReferenceLine
                  y={resistance}
                  stroke="#ef4444"
                  strokeDasharray="8 4"
                  label={{ value: "Resistance", position: "right" }}
                />
                <ReferenceLine
                  y={support}
                  stroke="#10b981"
                  strokeDasharray="8 4"
                  label={{ value: "Support", position: "right" }}
                />

                {/* Historical Data */}
                <Area
                  type="monotone"
                  dataKey="price"
                  stroke={isPositive ? "#10b981" : "#ef4444"}
                  strokeWidth={3}
                  fill="url(#priceGradient)"
                  data={historicalData}
                />

                {/* Predicted Data */}
                {showPredictions && predictedData.length > 0 && (
                  <Area
                    type="monotone"
                    dataKey="price"
                    stroke="#8b5cf6"
                    strokeWidth={3}
                    strokeDasharray="8 4"
                    fill="url(#predictedGradient)"
                    data={predictedData}
                  />
                )}
              </AreaChart>
            ) : chartType === "line" ? (
              <LineChart data={data}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="rgba(59, 130, 246, 0.1)"
                  vertical={false}
                />
                <XAxis
                  dataKey="date"
                  stroke="rgba(255, 255, 255, 0.5)"
                  fontSize={12}
                />
                <YAxis stroke="rgba(255, 255, 255, 0.5)" fontSize={12} />
                <Tooltip content={<CustomTooltip />} />

                {/* Support and Resistance Lines */}
                <ReferenceLine
                  y={resistance}
                  stroke="#ef4444"
                  strokeDasharray="8 4"
                  label={{ value: "Resistance", position: "right" }}
                />
                <ReferenceLine
                  y={support}
                  stroke="#10b981"
                  strokeDasharray="8 4"
                  label={{ value: "Support", position: "right" }}
                />

                {/* Historical Line */}
                <Line
                  type="monotone"
                  dataKey="price"
                  stroke={isPositive ? "#10b981" : "#ef4444"}
                  strokeWidth={3}
                  dot={false}
                  activeDot={{
                    r: 6,
                    fill: isPositive ? "#10b981" : "#ef4444",
                    stroke: "#ffffff",
                    strokeWidth: 2,
                  }}
                  data={historicalData}
                />

                {/* Predicted Line */}
                {showPredictions && predictedData.length > 0 && (
                  <Line
                    type="monotone"
                    dataKey="price"
                    stroke="#8b5cf6"
                    strokeWidth={3}
                    strokeDasharray="8 4"
                    dot={false}
                    activeDot={{
                      r: 6,
                      fill: "#8b5cf6",
                      stroke: "#ffffff",
                      strokeWidth: 2,
                    }}
                    data={predictedData}
                  />
                )}
              </LineChart>
            ) : (
              // Candlestick representation using BarChart
              <BarChart data={historicalData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="rgba(59, 130, 246, 0.1)"
                  vertical={false}
                />
                <XAxis
                  dataKey="date"
                  stroke="rgba(255, 255, 255, 0.5)"
                  fontSize={12}
                />
                <YAxis stroke="rgba(255, 255, 255, 0.5)" fontSize={12} />
                <Tooltip content={<CustomTooltip />} />

                <Bar
                  dataKey="price"
                  fill={isPositive ? "#10b981" : "#ef4444"}
                  radius={[2, 2, 0, 0]}
                />
              </BarChart>
            )}
          </ResponsiveContainer>
        </div>

        {/* Volume Chart */}
        {showVolume && (
          <div className="h-24 mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={historicalData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="rgba(59, 130, 246, 0.1)"
                />
                <XAxis dataKey="date" hide />
                <YAxis stroke="rgba(255, 255, 255, 0.5)" fontSize={10} />
                <Tooltip
                  formatter={(value: any) => [
                    `${(value / 1000000).toFixed(1)}M`,
                    "Volume",
                  ]}
                  labelStyle={{ color: "#ffffff" }}
                  contentStyle={{
                    backgroundColor: "rgba(0, 0, 0, 0.9)",
                    border: "1px solid rgba(59, 130, 246, 0.3)",
                    borderRadius: "8px",
                  }}
                />
                <Bar
                  dataKey="volume"
                  fill="rgba(59, 130, 246, 0.6)"
                  radius={[1, 1, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}

        {/* Legend and Market Data */}
        <div className="flex items-center justify-between mt-6 pt-4 border-t border-cyber-blue/20">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <div
                className={cn(
                  "w-4 h-1 rounded",
                  isPositive ? "bg-cyber-green" : "bg-cyber-red",
                )}
              />
              <span className="text-sm text-white/80">Current Price</span>
            </div>
            {showPredictions && (
              <div className="flex items-center space-x-2">
                <div className="w-4 h-1 bg-cyber-purple rounded border-dashed border border-cyber-purple" />
                <span className="text-sm text-white/80">AI Predictions</span>
              </div>
            )}
            <div className="flex items-center space-x-2">
              <div
                className="w-4 h-1 bg-cyber-red/60 rounded"
                style={{ borderStyle: "dashed" }}
              />
              <span className="text-sm text-white/80">Resistance</span>
            </div>
            <div className="flex items-center space-x-2">
              <div
                className="w-4 h-1 bg-cyber-green/60 rounded"
                style={{ borderStyle: "dashed" }}
              />
              <span className="text-sm text-white/80">Support</span>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="flex items-center space-x-6 text-sm">
            <div className="text-center">
              <div className="text-white/60">24h High</div>
              <div className="text-cyber-green font-semibold">
                ${maxPrice.toFixed(2)}
              </div>
            </div>
            <div className="text-center">
              <div className="text-white/60">24h Low</div>
              <div className="text-cyber-red font-semibold">
                ${minPrice.toFixed(2)}
              </div>
            </div>
            <div className="text-center">
              <div className="text-white/60">Avg Volume</div>
              <div className="text-cyber-blue font-semibold">
                {data.length > 0 && data[0].volume
                  ? `${(data.reduce((acc, d) => acc + (d.volume || 0), 0) / data.length / 1000000).toFixed(1)}M`
                  : "N/A"}
              </div>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default StockChart;
