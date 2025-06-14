import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useTheme } from "@/contexts/ThemeContext";
import { ArrowRight, Zap, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";

const AppleHeroSection = () => {
  const { theme } = useTheme();

  return (
    <section
      className={`relative min-h-screen flex items-center justify-center overflow-hidden ${
        theme === "light" ? "bg-apple-primary" : "bg-cyber-black"
      }`}
    >
      {/* Apple-style floating elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute w-96 h-96 rounded-full opacity-30 blur-3xl"
          style={{
            background:
              theme === "light"
                ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
                : "linear-gradient(135deg, #007aff 0%, #5856d6 100%)",
            left: "10%",
            top: "20%",
          }}
          animate={{
            x: [0, 50, 0],
            y: [0, -30, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.div
          className="absolute w-80 h-80 rounded-full opacity-25 blur-3xl"
          style={{
            background:
              theme === "light"
                ? "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)"
                : "linear-gradient(135deg, #34c759 0%, #00d4ff 100%)",
            right: "15%",
            top: "30%",
          }}
          animate={{
            x: [0, -40, 0],
            y: [0, 40, 0],
            scale: [1, 0.9, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Hero Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <Badge
            className={`inline-flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium ${
              theme === "light"
                ? "bg-gradient-to-r from-emerald-500 to-cyan-500 text-white"
                : "bg-gradient-to-r from-cyber-green to-cyber-blue text-white"
            } shadow-lg`}
          >
            <Zap className="h-4 w-4" />
            <span>Revolutionary Mobile Trading</span>
          </Badge>
        </motion.div>

        {/* Main Heading with Apple-style gradient */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight"
        >
          <span
            className={`${
              theme === "light"
                ? "bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent"
                : "bg-gradient-to-r from-cyber-green via-cyber-blue to-cyber-purple bg-clip-text text-transparent"
            }`}
          >
            The Future
          </span>
          <br />
          <span
            className={`${
              theme === "light"
                ? "bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent"
                : "bg-gradient-to-r from-cyber-blue via-cyber-purple to-cyber-red bg-clip-text text-transparent"
            }`}
          >
            of Trading
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className={`text-xl md:text-2xl mb-12 max-w-4xl mx-auto leading-relaxed ${
            theme === "light" ? "text-slate-600" : "text-white/80"
          }`}
        >
          Experience next-generation trading with real-time AI analysis,
          advanced charting, and institutional-grade execution - all optimized
          for mobile
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Link to="/register">
            <Button
              size="lg"
              className={`group px-8 py-4 text-lg font-semibold rounded-2xl transition-all duration-300 ${
                theme === "light"
                  ? "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg hover:shadow-xl"
                  : "bg-gradient-to-r from-cyber-blue to-cyber-purple hover:from-cyber-blue-dark hover:to-cyber-purple-dark text-white shadow-cyber"
              }`}
            >
              Get Started
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>

          <Link to="/features">
            <Button
              variant="outline"
              size="lg"
              className={`px-8 py-4 text-lg font-semibold rounded-2xl transition-all duration-300 ${
                theme === "light"
                  ? "border-2 border-gray-200 text-slate-700 hover:bg-gray-50 apple-glass"
                  : "border-2 border-cyber-blue/30 text-cyber-blue hover:bg-cyber-blue/10"
              }`}
            >
              <TrendingUp className="mr-2 h-5 w-5" />
              Learn More
            </Button>
          </Link>
        </motion.div>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-16 grid grid-cols-3 gap-8 max-w-2xl mx-auto"
        >
          {[
            { number: "100K+", label: "Active Traders" },
            { number: "99.9%", label: "Uptime" },
            { number: "24/7", label: "Support" },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div
                className={`text-3xl md:text-4xl font-bold mb-2 ${
                  theme === "light"
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
                    : "text-cyber-blue"
                }`}
              >
                {stat.number}
              </div>
              <div
                className={
                  theme === "light" ? "text-slate-500" : "text-white/60"
                }
              >
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div
          className={`w-6 h-10 border-2 rounded-full flex justify-center ${
            theme === "light" ? "border-slate-300" : "border-white/30"
          }`}
        >
          <div
            className={`w-1 h-3 rounded-full mt-2 ${
              theme === "light" ? "bg-slate-400" : "bg-white/50"
            }`}
          />
        </div>
      </motion.div>
    </section>
  );
};

export default AppleHeroSection;
