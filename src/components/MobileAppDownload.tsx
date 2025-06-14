import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/contexts/ThemeContext";
import {
  Smartphone,
  Download,
  Star,
  Shield,
  Zap,
  TrendingUp,
  TrendingDown,
  Bell,
  Eye,
  Activity,
  BarChart3,
  DollarSign,
  Play,
  Apple,
  Chrome,
  ArrowRight,
  CheckCircle,
  Users,
  Award,
  Sparkles,
  Brain,
  Volume2,
  Settings,
  MoreHorizontal,
  Search,
  Home,
  PieChart,
  Target,
  Wifi,
  Battery,
  Signal,
} from "lucide-react";
import { cn } from "@/lib/utils";

const MobileAppDownload = () => {
  const { theme } = useTheme();
  const [currentFeature, setCurrentFeature] = useState(0);
  const [currentStock, setCurrentStock] = useState(0);
  const [chartData, setChartData] = useState<number[]>([]);
  const [realtimePrice, setRealtimePrice] = useState(243.88);
  const [priceChange, setPriceChange] = useState(0.0);
  const [selectedTimeframe, setSelectedTimeframe] = useState("1M");

  const stocks = [
    {
      symbol: "TSLA",
      name: "Tesla Inc.",
      price: 243.88,
      change: 0.0,
      color: "cyber-green",
    },
    {
      symbol: "AAPL",
      name: "Apple Inc.",
      price: 175.43,
      change: 2.14,
      color: "cyber-blue",
    },
    {
      symbol: "NVDA",
      name: "NVIDIA Corp.",
      price: 721.33,
      change: 15.43,
      color: "cyber-purple",
    },
    {
      symbol: "GOOGL",
      name: "Alphabet Inc.",
      price: 138.21,
      change: -1.23,
      color: "cyber-red",
    },
  ];

  const timeframes = ["1D", "1W", "1M", "3M", "6M", "1Y"];

  const appFeatures = [
    {
      title: "Real-time Trading",
      description: "Execute trades with millisecond precision",
      icon: Activity,
      color: "text-cyber-green",
      bgColor: "bg-cyber-green/20",
    },
    {
      title: "AI Predictions",
      description: "Neural network powered market forecasts",
      icon: Brain,
      color: "text-cyber-purple",
      bgColor: "bg-cyber-purple/20",
    },
    {
      title: "Smart Alerts",
      description: "ML-driven intelligent price notifications",
      icon: Bell,
      color: "text-cyber-blue",
      bgColor: "bg-cyber-blue/20",
    },
    {
      title: "Portfolio Analytics",
      description: "Advanced risk metrics and performance tracking",
      icon: BarChart3,
      color: "text-cyber-yellow",
      bgColor: "bg-cyber-yellow/20",
    },
  ];

  const stats = [
    { value: "4.9", label: "App Store Rating", icon: Star },
    { value: "1M+", label: "Downloads", icon: Download },
    { value: "250K+", label: "Active Traders", icon: Users },
    { value: "99.99%", label: "Uptime", icon: Shield },
  ];

  // Generate realistic chart data
  useEffect(() => {
    const generateChartData = () => {
      const data = [];
      let basePrice = stocks[currentStock].price;
      for (let i = 0; i < 50; i++) {
        const variance = (Math.random() - 0.5) * 10;
        basePrice += variance;
        data.push(Math.max(basePrice, 0));
      }
      return data;
    };

    setChartData(generateChartData());
  }, [currentStock]);

  // Real-time price updates
  useEffect(() => {
    const interval = setInterval(() => {
      const variance = (Math.random() - 0.5) * 2;
      setRealtimePrice((prev) => Math.max(prev + variance, 0));
      setPriceChange((prev) => prev + variance * 0.1);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  // Auto-cycle through features and stocks
  useEffect(() => {
    const featureInterval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % appFeatures.length);
    }, 3000);

    const stockInterval = setInterval(() => {
      setCurrentStock((prev) => (prev + 1) % stocks.length);
    }, 8000);

    return () => {
      clearInterval(featureInterval);
      clearInterval(stockInterval);
    };
  }, []);

  // EXACT Professional Trading Interface Replica
  const AdvancedChart = () => {
    const currentStockData = stocks[currentStock];

    return (
      <div className="bg-gray-950 rounded-xl p-4 mb-4">
        {/* EXACT Header - TSLA with green percentage badge */}
        <div className="flex items-center space-x-2 mb-3">
          <h3 className="text-white font-bold text-xl">
            {currentStockData.symbol}
          </h3>
          <motion.div
            animate={{ scale: [1, 1.005, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="bg-green-500 text-white px-2 py-1 rounded-md text-xs font-bold flex items-center space-x-1"
          >
            <TrendingUp className="h-3 w-3" />
            <span>+0.00%</span>
          </motion.div>
        </div>

        {/* EXACT Price Display */}
        <div className="mb-6">
          <motion.div
            key={Math.floor(realtimePrice * 100)}
            initial={{ scale: 1.002 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.2 }}
            className="text-white font-bold text-3xl mb-1"
          >
            ${realtimePrice.toFixed(2)}
          </motion.div>
          <div className="text-green-400 text-sm font-medium">+$0.00</div>
        </div>

        {/* EXACT Tool Row - Green pulse, chart, volume, sound buttons */}
        <div className="flex items-center justify-between mb-4">
          {/* Left Tools - EXACT MATCH */}
          <div className="flex space-x-2">
            {/* Green pulse/activity button */}
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-9 h-9 bg-green-500 rounded-lg flex items-center justify-center"
            >
              <Activity className="h-4 w-4 text-white" />
            </motion.div>
            {/* Chart button */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-9 h-9 bg-gray-700 rounded-lg flex items-center justify-center"
            >
              <BarChart3 className="h-4 w-4 text-gray-300" />
            </motion.div>
            {/* Volume button */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-9 h-9 bg-gray-700 rounded-lg flex items-center justify-center"
            >
              <Volume2 className="h-4 w-4 text-gray-300" />
            </motion.div>
            {/* Sound/notification button */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-9 h-9 bg-gray-700 rounded-lg flex items-center justify-center"
            >
              <Bell className="h-4 w-4 text-gray-300" />
            </motion.div>
          </div>

          {/* EXACT Time Frames - 1D, 1W, 1M (blue), 3M, 6M, 1Y */}
          <div className="flex space-x-1">
            {timeframes.map((timeframe) => (
              <motion.button
                key={timeframe}
                onClick={() => setSelectedTimeframe(timeframe)}
                whileTap={{ scale: 0.95 }}
                className={cn(
                  "px-3 py-1.5 text-xs font-medium rounded transition-all",
                  selectedTimeframe === timeframe
                    ? "bg-blue-500 text-white"
                    : "bg-gray-700 text-gray-300 hover:bg-gray-600",
                )}
              >
                {timeframe}
              </motion.button>
            ))}
          </div>
        </div>

        {/* EXACT Chart Layout - Blue sidebar + Green chart area */}
        <div className="relative h-40 bg-gray-800 rounded-lg overflow-hidden flex">
          {/* Blue Volume Sidebar - EXACT MATCH */}
          <div className="w-16 bg-blue-600 flex flex-col justify-end p-2 space-y-1">
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                className="w-full bg-blue-300 rounded-sm"
                style={{
                  height: `${8 + Math.random() * 35}%`,
                }}
                animate={{
                  height: [
                    `${8 + Math.random() * 35}%`,
                    `${8 + Math.random() * 35}%`,
                  ],
                  opacity: [0.6, 1, 0.6],
                }}
                transition={{
                  duration: 1.2 + i * 0.08,
                  repeat: Infinity,
                  delay: i * 0.03,
                }}
              />
            ))}
          </div>

          {/* Green Chart Area - EXACT MATCH */}
          <div className="flex-1 bg-green-600 relative overflow-hidden">
            {/* Horizontal dashed grid lines - EXACT */}
            <div className="absolute inset-0">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-full border-t border-green-400 border-dashed opacity-40"
                  style={{ top: `${(i + 1) * 20}%` }}
                />
              ))}
            </div>

            {/* EXACT Chart Line and Fill */}
            <svg className="absolute inset-0 w-full h-full">
              <defs>
                <linearGradient
                  id="professionalGreenGradient"
                  x1="0%"
                  y1="0%"
                  x2="0%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="#10B981" stopOpacity="0.9" />
                  <stop offset="40%" stopColor="#10B981" stopOpacity="0.6" />
                  <stop offset="80%" stopColor="#10B981" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#10B981" stopOpacity="0.1" />
                </linearGradient>
                <filter id="smoothGlow">
                  <feGaussianBlur stdDeviation="1.5" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Professional smooth chart line */}
              <motion.path
                d={`M 0 ${130 - ((chartData[0] - Math.min(...chartData)) / (Math.max(...chartData) - Math.min(...chartData))) * 100} ${chartData
                  .map(
                    (price, index) =>
                      `L ${(index / (chartData.length - 1)) * 250} ${130 - ((price - Math.min(...chartData)) / (Math.max(...chartData) - Math.min(...chartData))) * 100}`,
                  )
                  .join(" ")}`}
                fill="none"
                stroke="#10B981"
                strokeWidth="3"
                filter="url(#smoothGlow)"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2.5, ease: "easeInOut" }}
              />

              {/* Chart fill area */}
              <motion.path
                d={`M 0 160 L 0 ${130 - ((chartData[0] - Math.min(...chartData)) / (Math.max(...chartData) - Math.min(...chartData))) * 100} ${chartData
                  .map(
                    (price, index) =>
                      `L ${(index / (chartData.length - 1)) * 250} ${130 - ((price - Math.min(...chartData)) / (Math.max(...chartData) - Math.min(...chartData))) * 100}`,
                  )
                  .join(" ")} L 250 160 Z`}
                fill="url(#professionalGreenGradient)"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 2.5, delay: 0.4 }}
              />
            </svg>

            {/* EXACT horizontal price line with dashes */}
            <motion.div
              animate={{ opacity: [0.8, 1, 0.8] }}
              transition={{ duration: 1.8, repeat: Infinity }}
              className="absolute w-full border-t-2 border-green-300 border-dashed"
              style={{
                top: `${55 + Math.sin(Date.now() / 1800) * 2}%`,
              }}
            >
              <div className="absolute right-2 -top-4 bg-green-400 text-gray-900 text-xs px-2 py-1 rounded-md font-bold">
                ${realtimePrice.toFixed(2)}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Professional Trading Controls */}
        <div className="flex space-x-2 mt-4">
          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            className="flex-1 bg-green-500 hover:bg-green-600 text-white py-2.5 px-4 rounded-lg text-sm font-bold transition-colors"
          >
            BUY
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2.5 px-4 rounded-lg text-sm font-bold transition-colors"
          >
            SELL
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            className="bg-gray-700 hover:bg-gray-600 text-white p-2.5 rounded-lg transition-colors"
          >
            <MoreHorizontal className="h-4 w-4" />
          </motion.button>
        </div>
      </div>
    );
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className={`py-24 relative overflow-hidden ${theme === "light" ? "bg-white" : ""}`}
    >
      {/* Enhanced Background Elements - Only in dark mode */}
      {theme === "dark" && (
        <div className="absolute inset-0 opacity-20">
          <motion.div
            className="absolute top-20 left-10 w-96 h-96 bg-cyber-blue/30 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute bottom-20 right-10 w-[500px] h-[500px] bg-cyber-purple/20 rounded-full blur-3xl"
            animate={{
              scale: [1, 0.7, 1],
              opacity: [0.1, 0.4, 0.1],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2,
            }}
          />
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div
            className={`inline-flex items-center space-x-2 px-4 py-2 rounded-2xl text-white mb-6 ${
              theme === "dark"
                ? "bg-gradient-to-r from-cyber-green to-cyber-blue glow-green"
                : "bg-gradient-to-r from-green-500 to-blue-600 shadow-lg"
            }`}
          >
            <Smartphone className="h-5 w-5" />
            <span className="font-semibold">Revolutionary Mobile Trading</span>
          </div>

          <h2
            className={`text-4xl md:text-6xl font-bold mb-6 ${
              theme === "dark"
                ? "bg-gradient-to-r from-cyber-green via-white to-cyber-blue bg-clip-text text-transparent"
                : "bg-gradient-to-r from-green-600 via-gray-900 to-blue-600 bg-clip-text text-transparent"
            }`}
          >
            The Future of Trading
            <br />
            <span className="text-3xl md:text-4xl">Is In Your Pocket</span>
          </h2>
          <p
            className={`text-xl max-w-3xl mx-auto mb-8 ${
              theme === "dark" ? "text-cyber-blue/90" : "text-slate-600"
            }`}
          >
            Experience next-generation trading with real-time AI analysis,
            advanced charting, and institutional-grade execution - all optimized
            for mobile
          </p>
        </motion.div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Side - Larger Mobile Animation */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* Enhanced Phone Mockup - Much Larger */}
            <div className="relative mx-auto w-[320px] h-[640px]">
              {/* Phone Frame */}
              <motion.div
                animate={{
                  y: [0, -15, 0],
                  rotateY: [0, 8, 0, -8, 0],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="relative w-full h-full bg-gradient-to-b from-gray-800 via-gray-900 to-black rounded-[40px] p-2 shadow-2xl border border-gray-700"
                style={{
                  boxShadow:
                    "0 0 60px rgba(16, 185, 129, 0.3), inset 0 0 20px rgba(255, 255, 255, 0.1)",
                }}
              >
                {/* Screen */}
                <div className="w-full h-full bg-cyber-black rounded-[35px] overflow-hidden relative">
                  {/* Enhanced Status Bar */}
                  <div className="flex justify-between items-center px-6 py-3 bg-cyber-dark/90 backdrop-blur-md">
                    <div className="flex items-center space-x-1">
                      <Signal className="h-3 w-3 text-white" />
                      <Wifi className="h-3 w-3 text-white" />
                      <span className="text-white text-sm font-medium">
                        9:41
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <motion.div
                        animate={{ opacity: [1, 0.3, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="text-white text-sm"
                      >
                        5G
                      </motion.div>
                      <Battery className="h-3 w-3 text-white" />
                      <div className="w-6 h-3 border border-white rounded-sm">
                        <div className="w-4 h-1 bg-cyber-green rounded-sm m-0.5"></div>
                      </div>
                    </div>
                  </div>

                  {/* App Header */}
                  <div className="px-6 py-4 bg-cyber-dark/50 backdrop-blur-md">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-cyber-blue to-cyber-purple rounded-xl flex items-center justify-center">
                          <TrendingUp className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <h3 className="text-white font-bold text-xl">
                            StockVision
                          </h3>
                          <p className="text-cyber-blue/80 text-sm">
                            Pro Trading
                          </p>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                          className="w-8 h-8 bg-cyber-green/20 rounded-full flex items-center justify-center"
                        >
                          <Search className="h-4 w-4 text-cyber-green" />
                        </motion.div>
                        <div className="w-8 h-8 bg-cyber-blue/20 rounded-full flex items-center justify-center relative">
                          <Bell className="h-4 w-4 text-cyber-blue" />
                          <motion.div
                            animate={{ scale: [1, 1.3, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="absolute -top-1 -right-1 w-3 h-3 bg-cyber-red rounded-full flex items-center justify-center"
                          >
                            <span className="text-white text-xs">3</span>
                          </motion.div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* App Content */}
                  <div className="px-6 py-4 h-full overflow-y-auto">
                    {/* Portfolio Overview */}
                    <motion.div
                      key={currentFeature}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="bg-gradient-to-r from-cyber-blue/20 to-cyber-purple/20 backdrop-blur-md rounded-2xl p-4 mb-4 border border-cyber-blue/30"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="text-cyber-blue/80 text-sm mb-1">
                            Total Portfolio
                          </p>
                          <motion.p
                            key={Math.floor(realtimePrice * 1000)}
                            initial={{ scale: 1.05, color: "#10B981" }}
                            animate={{ scale: 1, color: "#ffffff" }}
                            className="text-white font-bold text-2xl"
                          >
                            $157,432.50
                          </motion.p>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center space-x-1 text-cyber-green text-sm mb-1">
                            <TrendingUp className="h-3 w-3" />
                            <span>+$3,241.20</span>
                          </div>
                          <p className="text-cyber-green/80 text-xs">
                            +2.1% today
                          </p>
                        </div>
                      </div>

                      <div className="flex space-x-2">
                        <div className="flex-1 bg-cyber-green/20 rounded-lg p-2 text-center">
                          <PieChart className="h-4 w-4 text-cyber-green mx-auto mb-1" />
                          <p className="text-cyber-green text-xs">Stocks</p>
                        </div>
                        <div className="flex-1 bg-cyber-blue/20 rounded-lg p-2 text-center">
                          <Target className="h-4 w-4 text-cyber-blue mx-auto mb-1" />
                          <p className="text-cyber-blue text-xs">Options</p>
                        </div>
                        <div className="flex-1 bg-cyber-purple/20 rounded-lg p-2 text-center">
                          <DollarSign className="h-4 w-4 text-cyber-purple mx-auto mb-1" />
                          <p className="text-cyber-purple text-xs">Crypto</p>
                        </div>
                      </div>
                    </motion.div>

                    {/* Revolutionary Chart Component */}
                    <AdvancedChart />

                    {/* Quick Actions */}
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="bg-cyber-green/20 backdrop-blur-md rounded-xl p-3 border border-cyber-green/30"
                      >
                        <div className="flex items-center space-x-2">
                          <Activity className="h-5 w-5 text-cyber-green" />
                          <div>
                            <p className="text-white font-medium text-sm">
                              Quick Buy
                            </p>
                            <p className="text-cyber-green/80 text-xs">
                              Market Order
                            </p>
                          </div>
                        </div>
                      </motion.div>

                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="bg-cyber-purple/20 backdrop-blur-md rounded-xl p-3 border border-cyber-purple/30"
                      >
                        <div className="flex items-center space-x-2">
                          <Brain className="h-5 w-5 text-cyber-purple" />
                          <div>
                            <p className="text-white font-medium text-sm">
                              AI Insights
                            </p>
                            <p className="text-cyber-purple/80 text-xs">
                              Predictions
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    </div>

                    {/* Bottom Navigation */}
                    <div className="flex justify-around py-3 bg-cyber-dark/50 backdrop-blur-md rounded-2xl border border-cyber-blue/20">
                      <motion.div
                        whileTap={{ scale: 0.9 }}
                        className="flex flex-col items-center"
                      >
                        <Home className="h-5 w-5 text-cyber-blue mb-1" />
                        <span className="text-cyber-blue text-xs">Home</span>
                      </motion.div>
                      <motion.div
                        whileTap={{ scale: 0.9 }}
                        className="flex flex-col items-center"
                      >
                        <BarChart3 className="h-5 w-5 text-white/60 mb-1" />
                        <span className="text-white/60 text-xs">Markets</span>
                      </motion.div>
                      <motion.div
                        whileTap={{ scale: 0.9 }}
                        className="flex flex-col items-center"
                      >
                        <Eye className="h-5 w-5 text-white/60 mb-1" />
                        <span className="text-white/60 text-xs">Watchlist</span>
                      </motion.div>
                      <motion.div
                        whileTap={{ scale: 0.9 }}
                        className="flex flex-col items-center"
                      >
                        <Settings className="h-5 w-5 text-white/60 mb-1" />
                        <span className="text-white/60 text-xs">More</span>
                      </motion.div>
                    </div>
                  </div>
                </div>

                {/* Enhanced Phone Highlights */}
                <motion.div
                  animate={{ opacity: [0.5, 1, 0.5], scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute -top-3 -right-3 w-6 h-6 bg-cyber-green rounded-full glow-green"
                />
                <motion.div
                  animate={{ opacity: [0.3, 0.8, 0.3], scale: [1, 1.1, 1] }}
                  transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                  className="absolute -bottom-3 -left-3 w-5 h-5 bg-cyber-blue rounded-full glow-blue"
                />
              </motion.div>

              {/* Enhanced Floating Elements */}
              <motion.div
                animate={{
                  y: [0, -25, 0],
                  rotate: [0, 10, 0],
                  scale: [1, 1.1, 1],
                }}
                transition={{ duration: 5, repeat: Infinity }}
                className="absolute -top-6 -left-6 p-3 bg-cyber-purple/20 backdrop-blur-md rounded-2xl border border-cyber-purple/30"
              >
                <Brain className="h-8 w-8 text-cyber-purple" />
              </motion.div>

              <motion.div
                animate={{
                  y: [0, 20, 0],
                  rotate: [0, -10, 0],
                  scale: [1, 1.2, 1],
                }}
                transition={{ duration: 6, repeat: Infinity, delay: 1 }}
                className="absolute -bottom-6 -right-6 p-3 bg-cyber-green/20 backdrop-blur-md rounded-2xl border border-cyber-green/30"
              >
                <Activity className="h-8 w-8 text-cyber-green" />
              </motion.div>

              <motion.div
                animate={{
                  x: [0, 15, 0],
                  y: [0, -10, 0],
                  rotate: [0, 5, 0],
                }}
                transition={{ duration: 4, repeat: Infinity, delay: 2 }}
                className="absolute top-1/2 -right-8 p-2 bg-cyber-blue/20 backdrop-blur-md rounded-xl border border-cyber-blue/30"
              >
                <TrendingUp className="h-6 w-6 text-cyber-blue" />
              </motion.div>
            </div>
          </motion.div>

          {/* Right Side - Enhanced Download Options */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* Enhanced Feature List */}
            <div className="space-y-4">
              <h3
                className={`text-2xl font-bold mb-6 ${
                  theme === "dark" ? "text-white" : "text-gray-900"
                }`}
              >
                Revolutionary Features
              </h3>
              {appFeatures.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={cn(
                      "flex items-center space-x-4 p-5 rounded-2xl border transition-all duration-300 backdrop-blur-md",
                      currentFeature === index
                        ? theme === "dark"
                          ? "bg-white/15 border-cyber-blue/50 scale-105"
                          : "bg-blue-50 border-blue-200 scale-105"
                        : theme === "dark"
                          ? "bg-white/5 border-white/10 hover:bg-white/10"
                          : "bg-white/70 border-gray-200/50 hover:bg-white/90",
                    )}
                  >
                    <div className={cn("p-4 rounded-2xl", feature.bgColor)}>
                      <Icon className={cn("h-7 w-7", feature.color)} />
                    </div>
                    <div className="flex-1">
                      <h4
                        className={`font-semibold text-lg ${
                          theme === "dark" ? "text-white" : "text-gray-900"
                        }`}
                      >
                        {feature.title}
                      </h4>
                      <p
                        className={
                          theme === "dark" ? "text-white/70" : "text-slate-600"
                        }
                      >
                        {feature.description}
                      </p>
                    </div>
                    {currentFeature === index && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="ml-auto"
                      >
                        <CheckCircle className="h-6 w-6 text-cyber-green" />
                      </motion.div>
                    )}
                  </motion.div>
                );
              })}
            </div>

            {/* Enhanced Download Buttons */}
            <div className="space-y-6">
              <h3
                className={`text-3xl font-bold mb-6 ${
                  theme === "dark" ? "text-white" : "text-gray-900"
                }`}
              >
                Download Now
              </h3>

              {/* iOS Download */}
              <motion.div
                whileHover={{ scale: 1.03, y: -3 }}
                whileTap={{ scale: 0.97 }}
              >
                <Button
                  size="lg"
                  className="w-full bg-gradient-to-r from-gray-800 via-gray-900 to-black hover:from-gray-700 hover:via-gray-800 hover:to-gray-900 text-white border border-gray-600 h-20 rounded-2xl group shadow-2xl"
                  onClick={() =>
                    window.open("https://apps.apple.com", "_blank")
                  }
                >
                  <div className="flex items-center space-x-5">
                    <Apple className="h-10 w-10" />
                    <div className="text-left">
                      <div className="text-sm text-white/70">
                        Download on the
                      </div>
                      <div className="text-2xl font-bold">App Store</div>
                    </div>
                    <ArrowRight className="h-6 w-6 ml-auto group-hover:translate-x-2 transition-transform" />
                  </div>
                </Button>
              </motion.div>

              {/* Android Download */}
              <motion.div
                whileHover={{ scale: 1.03, y: -3 }}
                whileTap={{ scale: 0.97 }}
              >
                <Button
                  size="lg"
                  className="w-full bg-gradient-to-r from-green-600 via-green-700 to-green-800 hover:from-green-500 hover:via-green-600 hover:to-green-700 text-white h-20 rounded-2xl group shadow-2xl"
                  onClick={() =>
                    window.open("https://play.google.com", "_blank")
                  }
                >
                  <div className="flex items-center space-x-5">
                    <Play className="h-10 w-10" />
                    <div className="text-left">
                      <div className="text-sm text-white/90">Get it on</div>
                      <div className="text-2xl font-bold">Google Play</div>
                    </div>
                    <ArrowRight className="h-6 w-6 ml-auto group-hover:translate-x-2 transition-transform" />
                  </div>
                </Button>
              </motion.div>

              {/* Web App */}
              <motion.div
                whileHover={{ scale: 1.03, y: -3 }}
                whileTap={{ scale: 0.97 }}
              >
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full border-2 border-cyber-blue/50 text-cyber-blue hover:bg-cyber-blue/10 h-20 rounded-2xl group bg-cyber-blue/5 backdrop-blur-md"
                  onClick={() => window.open("/dashboard", "_self")}
                >
                  <div className="flex items-center space-x-5">
                    <Chrome className="h-10 w-10" />
                    <div className="text-left">
                      <div className="text-sm text-cyber-blue/70">Try our</div>
                      <div className="text-2xl font-bold">Web Platform</div>
                    </div>
                    <ArrowRight className="h-6 w-6 ml-auto group-hover:translate-x-2 transition-transform" />
                  </div>
                </Button>
              </motion.div>
            </div>

            {/* Enhanced App Stats */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    className={`text-center p-6 backdrop-blur-md border rounded-2xl ${
                      theme === "dark"
                        ? "bg-white/10 border-white/20"
                        : "bg-white/70 border-gray-200/50 shadow-lg"
                    }`}
                  >
                    <Icon
                      className={`h-8 w-8 mx-auto mb-3 ${
                        theme === "dark" ? "text-cyber-blue" : "text-blue-600"
                      }`}
                    />
                    <div
                      className={`text-3xl font-bold mb-1 ${
                        theme === "dark" ? "text-white" : "text-gray-900"
                      }`}
                    >
                      {stat.value}
                    </div>
                    <div
                      className={`text-sm ${
                        theme === "dark" ? "text-white/60" : "text-slate-600"
                      }`}
                    >
                      {stat.label}
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Enhanced Security Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className={`flex items-center justify-center space-x-4 p-6 rounded-2xl backdrop-blur-md ${
                theme === "dark"
                  ? "bg-gradient-to-r from-cyber-green/10 to-cyber-blue/10 border border-cyber-green/30"
                  : "bg-gradient-to-r from-green-50 to-blue-50 border border-green-200"
              }`}
            >
              <Shield
                className={`h-8 w-8 ${
                  theme === "dark" ? "text-cyber-green" : "text-green-600"
                }`}
              />
              <div>
                <div
                  className={`font-bold text-lg ${
                    theme === "dark" ? "text-white" : "text-gray-900"
                  }`}
                >
                  Bank-Level Security
                </div>
                <div
                  className={
                    theme === "dark" ? "text-cyber-green/80" : "text-green-600"
                  }
                >
                  256-bit encryption • SOC 2 compliant • FINRA regulated
                </div>
              </div>
              <Sparkles
                className={`h-6 w-6 ${
                  theme === "dark" ? "text-cyber-green" : "text-green-600"
                }`}
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default MobileAppDownload;
