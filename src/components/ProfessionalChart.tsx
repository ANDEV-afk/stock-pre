import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  TrendingUp,
  TrendingDown,
  Volume2,
  BarChart3,
  Activity,
  Maximize2,
  Settings,
  Info,
  Play,
  Pause,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface CandleData {
  timestamp: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

interface ProfessionalChartProps {
  symbol: string;
  companyName: string;
  currentPrice: number;
  change: number;
  changePercent: number;
  className?: string;
}

const ProfessionalChart: React.FC<ProfessionalChartProps> = ({
  symbol,
  companyName,
  currentPrice,
  change,
  changePercent,
  className,
}) => {
  const [timeframe, setTimeframe] = useState<
    "1D" | "5D" | "1M" | "3M" | "6M" | "1Y"
  >("1M");
  const [chartType, setChartType] = useState<"candlestick" | "line" | "area">(
    "candlestick",
  );
  const [isLive, setIsLive] = useState(true);
  const [candleData, setCandleData] = useState<CandleData[]>([]);
  const [indicators, setIndicators] = useState<string[]>(["volume"]);

  // Generate realistic candlestick data
  const generateCandleData = (days: number) => {
    const data: CandleData[] = [];
    let price = currentPrice - change; // Start from previous price
    const now = Date.now();

    for (let i = days; i >= 0; i--) {
      const timestamp = now - i * 24 * 60 * 60 * 1000;

      // Generate realistic OHLC data
      const volatility = 0.02 + Math.random() * 0.03; // 2-5% volatility
      const direction = Math.random() > 0.5 ? 1 : -1;
      const moveSize = price * volatility * direction;

      const open = price;
      const close = price + moveSize;
      const high = Math.max(open, close) + price * volatility * Math.random();
      const low = Math.min(open, close) - price * volatility * Math.random();
      const volume = 1000000 + Math.random() * 5000000;

      data.push({
        timestamp,
        open,
        high,
        low,
        close,
        volume,
      });

      price = close; // Next candle starts where this one ended
    }

    // Ensure last candle matches current price
    if (data.length > 0) {
      data[data.length - 1].close = currentPrice;
    }

    return data;
  };

  useEffect(() => {
    const days =
      timeframe === "1D"
        ? 1
        : timeframe === "5D"
          ? 5
          : timeframe === "1M"
            ? 30
            : timeframe === "3M"
              ? 90
              : timeframe === "6M"
                ? 180
                : 365;
    setCandleData(generateCandleData(days));
  }, [timeframe, currentPrice]);

  const maxPrice = Math.max(...candleData.map((d) => d.high));
  const minPrice = Math.min(...candleData.map((d) => d.low));
  const priceRange = maxPrice - minPrice;

  const maxVolume = Math.max(...candleData.map((d) => d.volume));

  const isPositive = change >= 0;

  const timeframes = [
    { id: "1D", label: "1D" },
    { id: "5D", label: "5D" },
    { id: "1M", label: "1M" },
    { id: "3M", label: "3M" },
    { id: "6M", label: "6M" },
    { id: "1Y", label: "1Y" },
  ] as const;

  const chartTypes = [
    { id: "candlestick", label: "Candlesticks", icon: BarChart3 },
    { id: "line", label: "Line", icon: TrendingUp },
    { id: "area", label: "Area", icon: Activity },
  ] as const;

  const availableIndicators = [
    { id: "volume", label: "Volume" },
    { id: "sma", label: "SMA" },
    { id: "ema", label: "EMA" },
    { id: "rsi", label: "RSI" },
    { id: "macd", label: "MACD" },
  ];

  return (
    <Card
      className={cn("bg-cyber-dark border border-cyber-blue/30", className)}
    >
      {/* Chart Header */}
      <div className="p-4 border-b border-white/10">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <div>
              <h3 className="text-xl font-bold text-white">{symbol}</h3>
              <p className="text-cyber-blue/80 text-sm">{companyName}</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-2xl font-bold text-white">
                  ₹{currentPrice.toFixed(2)}
                </p>
                <div
                  className={cn(
                    "flex items-center text-sm font-medium",
                    isPositive ? "text-green-400" : "text-red-400",
                  )}
                >
                  {isPositive ? (
                    <TrendingUp className="h-4 w-4 mr-1" />
                  ) : (
                    <TrendingDown className="h-4 w-4 mr-1" />
                  )}
                  {isPositive ? "+" : ""}
                  {change.toFixed(2)} ({changePercent.toFixed(2)}%)
                </div>
              </div>
              <Badge
                className={cn(
                  "text-xs font-semibold",
                  isPositive
                    ? "bg-green-500/20 text-green-400 border-green-500/30"
                    : "bg-red-500/20 text-red-400 border-red-500/30",
                )}
              >
                {isLive ? "LIVE" : "DELAYED"}
              </Badge>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setIsLive(!isLive)}
              className="text-white/70 hover:text-white"
            >
              {isLive ? (
                <Pause className="h-4 w-4" />
              ) : (
                <Play className="h-4 w-4" />
              )}
            </Button>
            <Button
              size="sm"
              variant="ghost"
              className="text-white/70 hover:text-white"
            >
              <Maximize2 className="h-4 w-4" />
            </Button>
            <Button
              size="sm"
              variant="ghost"
              className="text-white/70 hover:text-white"
            >
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Top Controls Row */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-1">
            {timeframes.map((tf) => (
              <Button
                key={tf.id}
                size="sm"
                variant={timeframe === tf.id ? "default" : "ghost"}
                onClick={() => setTimeframe(tf.id)}
                className={cn(
                  "h-8 px-3 text-xs",
                  timeframe === tf.id
                    ? "bg-cyber-blue text-white"
                    : "text-white/70 hover:text-white hover:bg-white/10",
                )}
              >
                {tf.label}
              </Button>
            ))}
          </div>

          <div className="flex items-center space-x-2">
            {chartTypes.map((type) => {
              const Icon = type.icon;
              return (
                <Button
                  key={type.id}
                  size="sm"
                  variant={chartType === type.id ? "default" : "ghost"}
                  onClick={() => setChartType(type.id)}
                  className={cn(
                    "h-8 px-3 text-xs",
                    chartType === type.id
                      ? "bg-cyber-purple text-white"
                      : "text-white/70 hover:text-white hover:bg-white/10",
                  )}
                >
                  <Icon className="h-3 w-3 mr-1" />
                  {type.label}
                </Button>
              );
            })}

            {/* AI Prediction Button */}
            <Button
              size="sm"
              onClick={() => (window.location.href = `/prediction/${symbol}`)}
              className="h-8 px-3 text-xs bg-gradient-to-r from-cyber-green to-cyber-blue hover:from-cyber-green-dark hover:to-cyber-blue-dark text-white"
            >
              <Activity className="h-3 w-3 mr-1" />
              AI Predict
            </Button>
          </div>
        </div>
      </div>

      {/* Chart Area - Responsive Height */}
      <div className="relative h-64 sm:h-80 md:h-96 p-2 sm:p-4">
        <div className="absolute inset-2 sm:inset-4">
          {/* Price Grid Lines */}
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={`price-grid-${i}`}
              className="absolute w-full border-t border-white/5"
              style={{ top: `${(i * 100) / 5}%` }}
            />
          ))}

          {/* Time Grid Lines */}
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={`time-grid-${i}`}
              className="absolute h-full border-l border-white/5"
              style={{ left: `${(i * 100) / 7}%` }}
            />
          ))}

          {/* Price Labels */}
          <div className="absolute -left-12 top-0 h-full flex flex-col justify-between text-xs text-white/60">
            {Array.from({ length: 6 }).map((_, i) => {
              const price = maxPrice - (i * priceRange) / 5;
              return (
                <span key={`price-label-${i}`} className="-mt-2">
                  ₹{price.toFixed(2)}
                </span>
              );
            })}
          </div>

          {/* Chart Rendering */}
          <svg className="w-full h-full">
            <defs>
              <linearGradient
                id="areaGradient"
                x1="0%"
                y1="0%"
                x2="0%"
                y2="100%"
              >
                <stop
                  offset="0%"
                  stopColor={isPositive ? "#10B981" : "#EF4444"}
                  stopOpacity="0.4"
                />
                <stop
                  offset="100%"
                  stopColor={isPositive ? "#10B981" : "#EF4444"}
                  stopOpacity="0.1"
                />
              </linearGradient>
            </defs>

            {chartType === "area"
              ? // Area chart - render once
                (() => {
                  const points = candleData
                    .map((c, i) => {
                      const px = (i / (candleData.length - 1)) * 100;
                      const py = ((maxPrice - c.close) / priceRange) * 100;
                      return `${px},${py}`;
                    })
                    .join(" ");

                  return (
                    <g key="area-chart">
                      <polygon
                        points={`0,100 ${points} 100,100`}
                        fill="url(#areaGradient)"
                      />
                      <polyline
                        points={points}
                        stroke={isPositive ? "#10B981" : "#EF4444"}
                        strokeWidth="2"
                        fill="none"
                      />
                    </g>
                  );
                })()
              : // Candlestick and Line charts - render per data point
                candleData.map((candle, index) => {
                  const x = (index / (candleData.length - 1)) * 100;
                  const openY = ((maxPrice - candle.open) / priceRange) * 100;
                  const closeY = ((maxPrice - candle.close) / priceRange) * 100;
                  const highY = ((maxPrice - candle.high) / priceRange) * 100;
                  const lowY = ((maxPrice - candle.low) / priceRange) * 100;

                  const isGreen = candle.close > candle.open;

                  if (chartType === "candlestick") {
                    return (
                      <g key={`candle-${index}`}>
                        {/* Wick */}
                        <line
                          x1={`${x}%`}
                          y1={`${highY}%`}
                          x2={`${x}%`}
                          y2={`${lowY}%`}
                          stroke={isGreen ? "#10B981" : "#EF4444"}
                          strokeWidth="1"
                        />
                        {/* Body */}
                        <rect
                          x={`${x - 0.4}%`}
                          y={`${Math.min(openY, closeY)}%`}
                          width="0.8%"
                          height={`${Math.abs(closeY - openY)}%`}
                          fill={isGreen ? "#10B981" : "#EF4444"}
                          stroke={isGreen ? "#10B981" : "#EF4444"}
                        />
                      </g>
                    );
                  } else if (chartType === "line") {
                    if (index === 0) return null;
                    const prevCandle = candleData[index - 1];
                    const prevX = ((index - 1) / (candleData.length - 1)) * 100;
                    const prevCloseY =
                      ((maxPrice - prevCandle.close) / priceRange) * 100;

                    return (
                      <line
                        key={`line-${index}`}
                        x1={`${prevX}%`}
                        y1={`${prevCloseY}%`}
                        x2={`${x}%`}
                        y2={`${closeY}%`}
                        stroke="#06B6D4"
                        strokeWidth="2"
                        fill="none"
                      />
                    );
                  }
                  return null;
                })}
          </svg>
        </div>
      </div>

      {/* Volume Chart - Enhanced Responsive Design */}
      {indicators.includes("volume") && (
        <div className="p-2 sm:p-3 md:p-4 border-t border-white/10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2 sm:mb-3 space-y-1 sm:space-y-0">
            <span className="text-white/80 text-xs sm:text-sm md:text-base font-medium">
              Volume
            </span>
            <div className="flex items-center space-x-1 sm:space-x-2">
              <Volume2 className="h-3 w-3 sm:h-4 sm:w-4 text-white/60" />
              <span className="text-white/60 text-xs sm:text-sm">
                {(candleData[candleData.length - 1]?.volume / 1000000).toFixed(
                  1,
                )}
                M
              </span>
              <span className="text-white/40 text-xs hidden sm:inline">
                24h Volume
              </span>
            </div>
          </div>

          {/* Enhanced Responsive Volume Chart Container */}
          <div className="relative overflow-hidden rounded-lg bg-cyber-black/30 h-12 sm:h-16 md:h-20 lg:h-24">
            <svg
              className="w-full h-full"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              {candleData.map((candle, index) => {
                const x = (index / (candleData.length - 1)) * 100;
                const height = (candle.volume / maxVolume) * 100;
                const isGreen = candle.close > candle.open;

                // Enhanced responsive bar width calculation based on data density
                let barWidth;
                if (candleData.length > 100) {
                  barWidth = 0.6; // Very dense data
                } else if (candleData.length > 60) {
                  barWidth = 0.8; // Dense data
                } else if (candleData.length > 30) {
                  barWidth = 1.2; // Medium data
                } else {
                  barWidth = 2.0; // Sparse data
                }

                return (
                  <rect
                    key={`volume-${index}`}
                    x={`${x - barWidth / 2}%`}
                    y={`${100 - height}%`}
                    width={`${barWidth}%`}
                    height={`${height}%`}
                    fill={isGreen ? "#10B981" : "#EF4444"}
                    opacity="0.8"
                    className="hover:opacity-100 transition-opacity cursor-pointer"
                  >
                    <title>
                      Volume: {(candle.volume / 1000000).toFixed(2)}M | Price: $
                      {candle.close.toFixed(2)}
                    </title>
                  </rect>
                );
              })}
            </svg>

            {/* Enhanced Volume Grid Lines */}
            <div className="absolute inset-0 pointer-events-none">
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={`volume-grid-${i}`}
                  className="absolute w-full border-t border-white/5"
                  style={{ top: `${(i * 100) / 3}%` }}
                />
              ))}
            </div>

            {/* Enhanced Volume Scale Labels */}
            <div className="absolute right-0 top-0 h-full flex flex-col justify-between text-xs text-white/40 pr-1 py-1">
              <span className="hidden sm:inline text-xs">
                {(maxVolume / 1000000).toFixed(1)}M
              </span>
              <span className="hidden md:inline text-xs">
                {(maxVolume / 2000000).toFixed(1)}M
              </span>
              <span className="text-xs">0</span>
            </div>

            {/* Mobile Volume Indicator Dots */}
            <div className="absolute bottom-1 left-1 sm:hidden flex space-x-1">
              <div className="w-1 h-1 bg-cyber-green rounded-full opacity-60"></div>
              <div className="w-1 h-1 bg-cyber-red rounded-full opacity-60"></div>
              <span className="text-xs text-white/40 ml-1">Vol</span>
            </div>
          </div>

          {/* Enhanced Volume Summary for Mobile and Tablet */}
          <div className="mt-1 sm:mt-2 flex justify-between items-center text-xs text-white/60 sm:text-xs">
            <div className="flex items-center space-x-2 sm:space-x-4">
              <span className="text-xs sm:text-sm">
                Avg:{" "}
                {(
                  candleData.reduce((acc, c) => acc + c.volume, 0) /
                  candleData.length /
                  1000000
                ).toFixed(1)}
                M
              </span>
              <span className="text-xs sm:text-sm">
                Peak: {(maxVolume / 1000000).toFixed(1)}M
              </span>
            </div>
            <div className="hidden sm:flex items-center space-x-2 text-xs text-white/40">
              <div className="w-2 h-2 bg-cyber-green rounded-full"></div>
              <span>Up</span>
              <div className="w-2 h-2 bg-cyber-red rounded-full"></div>
              <span>Down</span>
            </div>
          </div>
        </div>
      )}

      {/* Chart Footer with Time Intervals */}
      <div className="p-4 border-t border-white/10">
        {/* Inner Time Interval Controls - Matching Image Design */}
        <div className="flex items-center justify-center mb-4">
          <div className="flex items-center space-x-1 bg-white/5 rounded-lg p-1">
            {timeframes.map((tf) => (
              <Button
                key={`bottom-${tf.id}`}
                size="sm"
                variant={timeframe === tf.id ? "default" : "ghost"}
                onClick={() => setTimeframe(tf.id)}
                className={cn(
                  "h-8 px-3 text-xs rounded-md",
                  timeframe === tf.id
                    ? "bg-cyber-blue text-white shadow-lg"
                    : "text-white/70 hover:text-white hover:bg-white/10",
                )}
              >
                {tf.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Market Info */}
        <div className="flex items-center justify-between text-xs text-white/60">
          <div className="flex items-center space-x-4">
            <span>Market Hours: 9:15 AM - 3:30 PM IST</span>
            <span>•</span>
            <span>Data provided by NSE</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span>Live Market</span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ProfessionalChart;
