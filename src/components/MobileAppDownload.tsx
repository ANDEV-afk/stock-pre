import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Smartphone,
  Download,
  Star,
  Shield,
  Zap,
  TrendingUp,
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
} from "lucide-react";
import { cn } from "@/lib/utils";

const MobileAppDownload = () => {
  const [currentFeature, setCurrentFeature] = useState(0);

  const appFeatures = [
    {
      title: "Real-time Trading",
      description: "Trade on the go with live market data",
      icon: Activity,
      color: "text-cyber-green",
      bgColor: "bg-cyber-green/20",
    },
    {
      title: "AI Predictions",
      description: "Get instant AI-powered stock predictions",
      icon: Brain,
      color: "text-cyber-purple",
      bgColor: "bg-cyber-purple/20",
    },
    {
      title: "Price Alerts",
      description: "Never miss important price movements",
      icon: Bell,
      color: "text-cyber-blue",
      bgColor: "bg-cyber-blue/20",
    },
    {
      title: "Portfolio Tracking",
      description: "Monitor your investments 24/7",
      icon: BarChart3,
      color: "text-cyber-yellow",
      bgColor: "bg-cyber-yellow/20",
    },
  ];

  const stats = [
    { value: "4.8", label: "App Store Rating", icon: Star },
    { value: "500K+", label: "Downloads", icon: Download },
    { value: "50K+", label: "Active Traders", icon: Users },
    { value: "99.9%", label: "Uptime", icon: Shield },
  ];

  // Auto-cycle through features
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % appFeatures.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="py-24 relative overflow-hidden"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-20">
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 bg-cyber-blue/30 rounded-full blur-3xl"
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
          className="absolute bottom-20 right-10 w-96 h-96 bg-cyber-purple/20 rounded-full blur-3xl"
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-cyber-green to-cyber-blue px-4 py-2 rounded-2xl text-white mb-6 glow-green">
            <Smartphone className="h-5 w-5" />
            <span className="font-semibold">Mobile App</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyber-green via-white to-cyber-blue bg-clip-text text-transparent mb-6">
            Trade Anywhere, Anytime
          </h2>
          <p className="text-xl text-cyber-blue/90 max-w-3xl mx-auto mb-8">
            Download our powerful mobile app and take your trading to the next
            level with advanced features and real-time insights
          </p>
        </motion.div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Mobile Animation */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* Phone Mockup */}
            <div className="relative mx-auto w-80 h-96">
              {/* Phone Frame */}
              <motion.div
                animate={{
                  y: [0, -10, 0],
                  rotateY: [0, 5, 0, -5, 0],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="relative w-full h-full bg-gradient-to-b from-gray-800 to-gray-900 rounded-3xl p-2 shadow-2xl"
              >
                {/* Screen */}
                <div className="w-full h-full bg-cyber-black rounded-2xl overflow-hidden relative">
                  {/* Status Bar */}
                  <div className="flex justify-between items-center px-4 py-2 bg-cyber-dark">
                    <span className="text-white text-xs font-medium">9:41</span>
                    <div className="flex space-x-1">
                      <div className="w-1 h-1 bg-white rounded-full"></div>
                      <div className="w-1 h-1 bg-white rounded-full"></div>
                      <div className="w-1 h-1 bg-white/50 rounded-full"></div>
                    </div>
                  </div>

                  {/* App Content */}
                  <div className="p-4 h-full">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-white font-bold text-lg">
                        StockVision
                      </h3>
                      <div className="w-8 h-8 bg-cyber-green rounded-full flex items-center justify-center">
                        <Bell className="h-4 w-4 text-white" />
                      </div>
                    </div>

                    {/* Portfolio Value */}
                    <motion.div
                      key={currentFeature}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="bg-white/10 rounded-xl p-4 mb-4"
                    >
                      <p className="text-cyber-blue/80 text-xs mb-1">
                        Portfolio Value
                      </p>
                      <p className="text-white font-bold text-xl">
                        $125,432.50
                      </p>
                      <div className="flex items-center space-x-1 text-cyber-green text-xs">
                        <TrendingUp className="h-3 w-3" />
                        <span>+$2,341.20 (1.87%)</span>
                      </div>
                    </motion.div>

                    {/* Feature Showcase */}
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={currentFeature}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.5 }}
                        className={cn(
                          "p-3 rounded-lg mb-4",
                          appFeatures[currentFeature].bgColor,
                        )}
                      >
                        <div className="flex items-center space-x-3">
                          <div
                            className={cn(
                              "p-2 rounded-lg bg-white/20",
                              appFeatures[currentFeature].bgColor,
                            )}
                          >
                            {React.createElement(
                              appFeatures[currentFeature].icon,
                              {
                                className: cn(
                                  "h-4 w-4",
                                  appFeatures[currentFeature].color,
                                ),
                              },
                            )}
                          </div>
                          <div>
                            <h4 className="text-white font-semibold text-sm">
                              {appFeatures[currentFeature].title}
                            </h4>
                            <p className="text-white/70 text-xs">
                              {appFeatures[currentFeature].description}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    </AnimatePresence>

                    {/* Mock Chart */}
                    <div className="bg-white/5 rounded-lg p-3">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-white font-medium text-sm">
                          AAPL
                        </span>
                        <span className="text-cyber-green text-xs">+2.34%</span>
                      </div>
                      <div className="h-16 flex items-end space-x-1">
                        {Array.from({ length: 12 }).map((_, i) => (
                          <motion.div
                            key={i}
                            className="flex-1 bg-cyber-blue/60 rounded-sm"
                            style={{
                              height: `${30 + Math.random() * 40}%`,
                            }}
                            animate={{
                              height: [
                                `${30 + Math.random() * 40}%`,
                                `${30 + Math.random() * 40}%`,
                              ],
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              delay: i * 0.1,
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Phone Highlights */}
                <motion.div
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute -top-2 -right-2 w-4 h-4 bg-cyber-green rounded-full glow-green"
                />
                <motion.div
                  animate={{ opacity: [0.3, 0.8, 0.3] }}
                  transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                  className="absolute -bottom-2 -left-2 w-3 h-3 bg-cyber-blue rounded-full glow-blue"
                />
              </motion.div>

              {/* Floating Elements */}
              <motion.div
                animate={{
                  y: [0, -20, 0],
                  rotate: [0, 5, 0],
                }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute -top-4 -left-4 p-2 bg-cyber-purple/20 backdrop-blur-md rounded-xl border border-cyber-purple/30"
              >
                <Zap className="h-6 w-6 text-cyber-purple" />
              </motion.div>

              <motion.div
                animate={{
                  y: [0, 15, 0],
                  rotate: [0, -5, 0],
                }}
                transition={{ duration: 5, repeat: Infinity, delay: 1 }}
                className="absolute -bottom-4 -right-4 p-2 bg-cyber-green/20 backdrop-blur-md rounded-xl border border-cyber-green/30"
              >
                <DollarSign className="h-6 w-6 text-cyber-green" />
              </motion.div>
            </div>
          </motion.div>

          {/* Right Side - Download Options */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* Feature List */}
            <div className="space-y-4">
              {appFeatures.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={cn(
                      "flex items-center space-x-4 p-4 rounded-xl border transition-all duration-300",
                      currentFeature === index
                        ? "bg-white/10 border-cyber-blue/40"
                        : "bg-white/5 border-white/10 hover:bg-white/10",
                    )}
                  >
                    <div className={cn("p-3 rounded-xl", feature.bgColor)}>
                      <Icon className={cn("h-6 w-6", feature.color)} />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold">
                        {feature.title}
                      </h4>
                      <p className="text-white/70 text-sm">
                        {feature.description}
                      </p>
                    </div>
                    {currentFeature === index && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="ml-auto"
                      >
                        <CheckCircle className="h-5 w-5 text-cyber-green" />
                      </motion.div>
                    )}
                  </motion.div>
                );
              })}
            </div>

            {/* Download Buttons */}
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-white mb-6">
                Download Now
              </h3>

              {/* iOS Download */}
              <motion.div
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  size="lg"
                  className="w-full bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-700 hover:to-gray-800 text-white border border-gray-600 h-16 rounded-2xl group"
                  onClick={() =>
                    window.open("https://apps.apple.com", "_blank")
                  }
                >
                  <div className="flex items-center space-x-4">
                    <Apple className="h-8 w-8" />
                    <div className="text-left">
                      <div className="text-xs text-white/70">
                        Download on the
                      </div>
                      <div className="text-lg font-semibold">App Store</div>
                    </div>
                    <ArrowRight className="h-5 w-5 ml-auto group-hover:translate-x-1 transition-transform" />
                  </div>
                </Button>
              </motion.div>

              {/* Android Download */}
              <motion.div
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  size="lg"
                  className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-500 hover:to-green-600 text-white h-16 rounded-2xl group"
                  onClick={() =>
                    window.open("https://play.google.com", "_blank")
                  }
                >
                  <div className="flex items-center space-x-4">
                    <Play className="h-8 w-8" />
                    <div className="text-left">
                      <div className="text-xs text-white/90">Get it on</div>
                      <div className="text-lg font-semibold">Google Play</div>
                    </div>
                    <ArrowRight className="h-5 w-5 ml-auto group-hover:translate-x-1 transition-transform" />
                  </div>
                </Button>
              </motion.div>

              {/* Web App */}
              <motion.div
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full border-cyber-blue/50 text-cyber-blue hover:bg-cyber-blue/10 h-16 rounded-2xl group"
                  onClick={() => window.open("/dashboard", "_self")}
                >
                  <div className="flex items-center space-x-4">
                    <Chrome className="h-8 w-8" />
                    <div className="text-left">
                      <div className="text-xs text-cyber-blue/70">Try our</div>
                      <div className="text-lg font-semibold">Web App</div>
                    </div>
                    <ArrowRight className="h-5 w-5 ml-auto group-hover:translate-x-1 transition-transform" />
                  </div>
                </Button>
              </motion.div>
            </div>

            {/* App Stats */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    className="text-center p-4 bg-white/5 backdrop-blur-md border border-white/10 rounded-xl"
                  >
                    <Icon className="h-6 w-6 text-cyber-blue mx-auto mb-2" />
                    <div className="text-2xl font-bold text-white">
                      {stat.value}
                    </div>
                    <div className="text-xs text-white/60">{stat.label}</div>
                  </motion.div>
                );
              })}
            </div>

            {/* Security Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="flex items-center justify-center space-x-3 p-4 bg-cyber-green/10 border border-cyber-green/30 rounded-xl"
            >
              <Shield className="h-6 w-6 text-cyber-green" />
              <div>
                <div className="text-white font-semibold text-sm">
                  Bank-Level Security
                </div>
                <div className="text-cyber-green/80 text-xs">
                  256-bit encryption & SOC 2 compliant
                </div>
              </div>
              <Sparkles className="h-5 w-5 text-cyber-green" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default MobileAppDownload;
