import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { TrendingUp, BarChart3, Zap, Shield } from "lucide-react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

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
    <div ref={containerRef} className="relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-apple-gray-50 to-apple-gray-100" />

      <motion.div style={{ y, opacity }} className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-apple-blue/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-apple-purple/5 rounded-full blur-3xl" />
      </motion.div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            {/* Main Headline */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-8"
            >
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
                <span className="text-apple-gray-700">Predict the</span>
                <br />
                <span className="text-gradient">Future of Stocks</span>
              </h1>

              <p className="text-xl md:text-2xl text-apple-gray-500 max-w-3xl mx-auto leading-relaxed">
                Harness the power of artificial intelligence to make smarter
                investment decisions. Get accurate stock predictions backed by
                advanced machine learning.
              </p>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
            >
              <Link to="/predict">
                <Button
                  size="lg"
                  className="bg-apple-blue hover:bg-apple-blue-dark text-white px-8 py-4 text-lg font-semibold rounded-2xl shadow-apple-lg hover:shadow-apple-xl transition-all duration-300"
                >
                  <TrendingUp className="mr-2 h-5 w-5" />
                  Start Predicting
                </Button>
              </Link>

              <Link to="/dashboard">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-2 border-apple-gray-300 text-apple-gray-700 hover:bg-apple-gray-100 px-8 py-4 text-lg font-semibold rounded-2xl transition-all duration-300"
                >
                  <BarChart3 className="mr-2 h-5 w-5" />
                  View Dashboard
                </Button>
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20"
            >
              {[
                { value: "95%", label: "Prediction Accuracy" },
                { value: "10K+", label: "Active Users" },
                { value: "1M+", label: "Predictions Made" },
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl md:text-5xl font-bold text-apple-blue mb-2">
                    {stat.value}
                  </div>
                  <div className="text-apple-gray-500 font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Features Grid */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
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
                  className="bg-white/80 apple-blur rounded-3xl p-8 shadow-apple hover:shadow-apple-lg transition-all duration-300 border border-apple-gray-200/50"
                >
                  <div className="bg-gradient-to-br from-apple-blue to-apple-purple p-3 rounded-2xl w-fit mb-6">
                    <Icon className="h-6 w-6 text-white" />
                  </div>

                  <h3 className="text-xl font-semibold text-apple-gray-700 mb-3">
                    {feature.title}
                  </h3>

                  <p className="text-apple-gray-500 leading-relaxed">
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
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-apple-gray-400 rounded-full flex justify-center"
        >
          <div className="w-1 h-3 bg-apple-gray-400 rounded-full mt-2" />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default HeroSection;
