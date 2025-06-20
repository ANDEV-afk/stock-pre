import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { TrendingUp, BarChart3, Zap, Shield } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "@/contexts/ThemeContext";
import StockSearchBar from "./StockSearchBar";

const HeroSection = () => {
  const containerRef = useRef(null);
  const navigate = useNavigate();
  const { theme } = useTheme();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const handleStockSearch = (symbol: string) => {
    navigate(`/markets?search=${symbol}`);
  };

  const features = [
    {
      icon: TrendingUp,
      title: "AI-Powered Predictions",
      description:
        "Advanced machine learning algorithms analyze market trends and patterns",
    },
    {
      icon: BarChart3,
      title: "Real-Time Analytics",
      description:
        "Live market data and interactive charts for informed decision making",
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description:
        "Get instant predictions and market insights in milliseconds",
    },
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "Bank-level encryption and security for your financial data",
    },
  ];

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden ${theme === "light" ? "bg-white" : ""}`}
      style={theme === "light" ? { backgroundColor: "#ffffff" } : {}}
    >
      {/* Background Elements - Theme dependent */}
      {theme === "dark" ? (
        <>
          <div className="absolute inset-0 bg-gradient-to-br from-cyber-black via-cyber-dark to-cyber-black" />
          {/* Animated Cyber Grid */}
          <div className="absolute inset-0 cyber-grid opacity-20" />
          <motion.div style={{ y, opacity }} className="absolute inset-0">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyber-blue/20 rounded-full blur-3xl animate-pulse" />
            <div
              className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyber-purple/20 rounded-full blur-3xl animate-pulse"
              style={{ animationDelay: "1s" }}
            />
          </motion.div>
        </>
      ) : (
        <div className="absolute inset-0 bg-white" />
      )}

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            {/* Main Headline */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-12"
            >
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
                <span
                  className={
                    theme === "dark"
                      ? "bg-gradient-to-r from-white via-cyber-blue to-white bg-clip-text text-transparent"
                      : "text-gray-900"
                  }
                >
                  Predict the
                </span>
                <br />
                <span
                  className={
                    theme === "dark"
                      ? "bg-gradient-to-r from-cyber-blue via-cyber-purple to-cyber-blue bg-clip-text text-transparent animate-pulse"
                      : "bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent"
                  }
                >
                  Future of Stocks
                </span>
              </h1>

              <p
                className={`text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed mb-8 ${
                  theme === "dark" ? "text-cyber-blue/90" : "text-slate-600"
                }`}
              >
                Harness the power of artificial intelligence to make smarter
                investment decisions. Get accurate stock predictions backed by
                advanced machine learning.
              </p>
            </motion.div>

            {/* Search Bar - Fixed positioning and z-index */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="mb-12 relative z-30"
            >
              <div className="max-w-2xl mx-auto">
                <StockSearchBar
                  onSearch={handleStockSearch}
                  placeholder="Search any stock (e.g., AAPL, TSLA, GOOGL) to get AI predictions..."
                  className="w-full"
                />
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 justify-center mb-16 relative z-20"
            >
              <Link to="/predict">
                <motion.div
                  whileHover={{
                    scale: 1.05,
                    boxShadow:
                      theme === "dark"
                        ? "0 0 30px rgba(0, 122, 255, 0.6)"
                        : "0 10px 30px rgba(59, 130, 246, 0.3)",
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    size="lg"
                    className={
                      theme === "dark"
                        ? "bg-gradient-to-r from-cyber-blue to-cyber-purple hover:from-cyber-blue-dark hover:to-cyber-purple-dark text-white px-8 py-4 text-lg font-semibold rounded-2xl shadow-cyber transition-all duration-300"
                        : "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
                    }
                  >
                    <TrendingUp className="mr-2 h-5 w-5" />
                    Start Predicting
                  </Button>
                </motion.div>
              </Link>

              <Link to="/about">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    variant="outline"
                    size="lg"
                    className={
                      theme === "dark"
                        ? "border-2 border-cyber-blue/30 text-cyber-blue hover:bg-cyber-blue/10 hover:border-cyber-blue/60 px-8 py-4 text-lg font-semibold rounded-2xl transition-all duration-300"
                        : "border-2 border-blue-300 text-blue-600 hover:bg-blue-50 hover:border-blue-400 px-8 py-4 text-lg font-semibold rounded-2xl transition-all duration-300"
                    }
                  >
                    <BarChart3 className="mr-2 h-5 w-5" />
                    Learn More
                  </Button>
                </motion.div>
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20 relative z-10"
            >
              {[
                {
                  value: "95%",
                  label: "Prediction Accuracy",
                  color: theme === "dark" ? "cyber-green" : "green-600",
                },
                {
                  value: "10K+",
                  label: "Active Users",
                  color: theme === "dark" ? "cyber-blue" : "blue-600",
                },
                {
                  value: "1M+",
                  label: "Predictions Made",
                  color: theme === "dark" ? "cyber-purple" : "purple-600",
                },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  className={`text-center p-6 backdrop-blur-md rounded-2xl transition-all duration-300 ${
                    theme === "dark"
                      ? "bg-white/5 border border-cyber-blue/20 hover:bg-white/10 hover:border-cyber-blue/40"
                      : "bg-white/70 border border-gray-200/50 hover:bg-white/90 hover:border-gray-300/60 shadow-lg hover:shadow-xl"
                  }`}
                  whileHover={{ scale: 1.05, y: -4 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                >
                  <div
                    className={`text-4xl md:text-5xl font-bold mb-2 text-${stat.color}`}
                  >
                    {stat.value}
                  </div>
                  <div
                    className={`font-medium ${
                      theme === "dark" ? "text-white/90" : "text-gray-700"
                    }`}
                  >
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Features Grid */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10"
          >
            {features.map((feature, index) => {
              const Icon = feature.icon;

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1 + index * 0.1 }}
                  whileHover={{ scale: 1.02, y: -4 }}
                  className={`backdrop-blur-md rounded-3xl p-8 transition-all duration-300 group ${
                    theme === "dark"
                      ? "bg-white/10 border border-cyber-blue/20 hover:bg-white/15 hover:border-cyber-blue/40"
                      : "bg-white/70 border border-gray-200/50 hover:bg-white/90 hover:border-gray-300/60 shadow-lg hover:shadow-xl"
                  }`}
                >
                  <div
                    className={`p-3 rounded-2xl w-fit mb-6 transition-all duration-300 ${
                      theme === "dark"
                        ? "bg-gradient-to-br from-cyber-blue to-cyber-purple group-hover:shadow-lg group-hover:shadow-cyber-blue/25"
                        : "bg-gradient-to-br from-blue-500 to-purple-600 group-hover:shadow-lg group-hover:shadow-blue-500/25"
                    }`}
                  >
                    <Icon className="h-6 w-6 text-white" />
                  </div>

                  <h3
                    className={`text-xl font-semibold mb-3 ${
                      theme === "dark" ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {feature.title}
                  </h3>

                  <p
                    className={`leading-relaxed ${
                      theme === "dark" ? "text-cyber-blue/80" : "text-slate-600"
                    }`}
                  >
                    {feature.description}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className={`w-6 h-10 border-2 rounded-full flex justify-center ${
            theme === "dark" ? "border-cyber-blue/60" : "border-blue-400/60"
          }`}
        >
          <div
            className={`w-1 h-3 rounded-full mt-2 animate-pulse ${
              theme === "dark" ? "bg-cyber-blue" : "bg-blue-500"
            }`}
          />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default HeroSection;
