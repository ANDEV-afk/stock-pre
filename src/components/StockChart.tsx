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
} from "./ChartWrapper";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TrendingUp, TrendingDown, Activity } from "lucide-react";
import { cn } from "@/lib/utils";

interface StockData {
  date: string;
  price: number;
  predicted?: boolean;
  volume?: number;
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
  const [chartType, setChartType] = useState<"line" | "area">("area");

  const timeframes = [
    { label: "1D", value: "1D" },
    { label: "1W", value: "1W" },
    { label: "1M", value: "1M" },
    { label: "3M", value: "3M" },
    { label: "1Y", value: "1Y" },
  ];

  // Calculate price change
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

  // Custom tooltip
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white apple-blur border border-apple-gray-200 rounded-xl p-4 shadow-apple">
          <p className="text-sm text-apple-gray-500">{label}</p>
          <p className="text-lg font-semibold text-apple-gray-700">
            ${payload[0].value.toFixed(2)}
          </p>
          {data.predicted && (
            <p className="text-xs text-apple-purple font-medium">Predicted</p>
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
          <div className="h-6 bg-apple-gray-200 rounded mb-4 w-1/3" />
          <div className="h-64 bg-apple-gray-200 rounded" />
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
      <Card className="p-6 bg-white/90 apple-blur border border-apple-gray-200/50 shadow-apple">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
          <div className="mb-4 lg:mb-0">
            <div className="flex items-center space-x-3 mb-2">
              <h3 className="text-2xl font-bold text-apple-gray-700">
                {symbol}
              </h3>
              <div
                className={cn(
                  "flex items-center space-x-1 px-2 py-1 rounded-lg text-sm font-medium",
                  isPositive
                    ? "bg-apple-green/10 text-apple-green"
                    : "bg-apple-red/10 text-apple-red",
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
              <span className="text-3xl font-bold text-apple-gray-700">
                ${currentPrice.toFixed(2)}
              </span>
              <span
                className={cn(
                  "text-lg font-medium",
                  isPositive ? "text-apple-green" : "text-apple-red",
                )}
              >
                {isPositive ? "+" : ""}${Math.abs(priceChange).toFixed(2)}
              </span>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center space-x-4">
            {/* Chart Type Toggle */}
            <div className="flex bg-apple-gray-100 rounded-lg p-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setChartType("area")}
                className={cn(
                  "rounded-md transition-all duration-200",
                  chartType === "area"
                    ? "bg-white shadow-sm text-apple-blue"
                    : "text-apple-gray-500 hover:text-apple-gray-700",
                )}
              >
                <Activity className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setChartType("line")}
                className={cn(
                  "rounded-md transition-all duration-200",
                  chartType === "line"
                    ? "bg-white shadow-sm text-apple-blue"
                    : "text-apple-gray-500 hover:text-apple-gray-700",
                )}
              >
                <TrendingUp className="h-4 w-4" />
              </Button>
            </div>

            {/* Timeframe Selector */}
            <div className="flex bg-apple-gray-100 rounded-lg p-1 space-x-1">
              {timeframes.map((tf) => (
                <Button
                  key={tf.value}
                  variant="ghost"
                  size="sm"
                  onClick={() => setTimeframe(tf.value)}
                  className={cn(
                    "px-3 py-1 text-xs font-medium rounded-md transition-all duration-200",
                    timeframe === tf.value
                      ? "bg-white shadow-sm text-apple-blue"
                      : "text-apple-gray-500 hover:text-apple-gray-700",
                  )}
                >
                  {tf.label}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Chart */}
        <div className="h-80">
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
                    <stop offset="5%" stopColor="#007aff" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#007aff" stopOpacity={0.05} />
                  </linearGradient>
                  <linearGradient
                    id="predictedGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="5%" stopColor="#5856d6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#5856d6" stopOpacity={0.05} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#e8e8ed"
                  vertical={false}
                />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip content={<CustomTooltip />} />

                {/* Historical Data */}
                <Area
                  type="monotone"
                  dataKey="price"
                  stroke="#007aff"
                  strokeWidth={2}
                  fill="url(#priceGradient)"
                  data={historicalData}
                />

                {/* Predicted Data */}
                {showPredictions && (
                  <Area
                    type="monotone"
                    dataKey="price"
                    stroke="#5856d6"
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    fill="url(#predictedGradient)"
                    data={predictedData}
                  />
                )}
              </AreaChart>
            ) : (
              <LineChart data={data}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#e8e8ed"
                  vertical={false}
                />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip content={<CustomTooltip />} />

                {/* Historical Line */}
                <Line
                  type="monotone"
                  dataKey="price"
                  stroke="#007aff"
                  strokeWidth={3}
                  dot={false}
                  activeDot={{ r: 6, fill: "#007aff" }}
                  data={historicalData}
                />

                {/* Predicted Line */}
                {showPredictions && (
                  <Line
                    type="monotone"
                    dataKey="price"
                    stroke="#5856d6"
                    strokeWidth={3}
                    strokeDasharray="8 4"
                    dot={false}
                    activeDot={{ r: 6, fill: "#5856d6" }}
                    data={predictedData}
                  />
                )}
              </LineChart>
            )}
          </ResponsiveContainer>
        </div>

        {/* Legend */}
        {showPredictions && (
          <div className="flex items-center justify-center space-x-6 mt-4 pt-4 border-t border-apple-gray-200">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-0.5 bg-apple-blue rounded" />
              <span className="text-sm text-apple-gray-600">
                Historical Data
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-0.5 bg-apple-purple rounded border-dashed border border-apple-purple" />
              <span className="text-sm text-apple-gray-600">Predictions</span>
            </div>
          </div>
        )}
      </Card>
    </motion.div>
  );
};

export default StockChart;
