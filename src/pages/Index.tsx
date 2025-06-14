import { useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "@/contexts/ThemeContext";
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import StockTicker from "@/components/StockTicker";
import MobileAppDownload from "@/components/MobileAppDownload";
import FeatureShowcase from "@/components/FeatureShowcase";
import GlobalAnimatedBackground from "@/components/GlobalAnimatedBackground";
import BackgroundVideoOverlay from "@/components/BackgroundVideoOverlay";
import CommunityLinks from "@/components/CommunityLinks";
import DemoContactModal from "@/components/DemoContactModal";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Brain,
  Clock,
  Shield,
  Users,
  ArrowRight,
  Star,
  CheckCircle,
  Zap,
  TrendingUp,
  BarChart3,
  DollarSign,
  Phone,
  Mail,
} from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  const { theme } = useTheme();
  const [showContactModal, setShowContactModal] = useState(false);

  const benefits = [
    {
      icon: Brain,
      title: "AI-Powered Intelligence",
      description:
        "Our advanced machine learning algorithms analyze thousands of data points to deliver highly accurate stock predictions.",
      features: [
        "LSTM Neural Networks",
        "Pattern Recognition",
        "Market Sentiment Analysis",
      ],
    },
    {
      icon: Clock,
      title: "Real-Time Insights",
      description:
        "Get instant market updates and predictions as they happen, ensuring you never miss a trading opportunity.",
      features: [
        "Live Data Feeds",
        "Instant Notifications",
        "Real-time Analytics",
      ],
    },
    {
      icon: Shield,
      title: "Enterprise Security",
      description:
        "Your financial data is protected with bank-level encryption and industry-leading security protocols.",
      features: [
        "256-bit Encryption",
        "SOC 2 Compliance",
        "Zero-Trust Architecture",
      ],
    },
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Portfolio Manager",
      avatar: "SC",
      rating: 5,
      text: "StockVision has transformed how I approach trading. The AI predictions are incredibly accurate and have improved my returns by 40%.",
    },
    {
      name: "Michael Rodriguez",
      role: "Day Trader",
      avatar: "MR",
      rating: 5,
      text: "The real-time analytics and beautiful interface make this the best trading tool I've ever used. It's like having a crystal ball for the market.",
    },
    {
      name: "Emily Johnson",
      role: "Investment Advisor",
      avatar: "EJ",
      rating: 5,
      text: "My clients love the detailed predictions and reports. StockVision helps me provide better investment advice with confidence.",
    },
  ];

  return (
    <div
      className={theme === "light" ? "bg-white" : ""}
      style={theme === "light" ? { backgroundColor: "#ffffff !important" } : {}}
    >
      <GlobalAnimatedBackground variant="home">
        {theme === "dark" && (
          <BackgroundVideoOverlay variant="financial" opacity={0.08} />
        )}
        <Navigation />

        {/* Hero Section */}
        <HeroSection />

        {/* Stock Ticker - Rolling Animation */}
        <StockTicker />

        {/* Feature Showcase */}
        <FeatureShowcase />

        {/* Mobile App Download */}
        <MobileAppDownload />

        {/* Community Links */}
        <CommunityLinks />

        {/* Benefits Section */}
        <section
          className={`py-24 relative overflow-hidden ${theme === "light" ? "bg-white" : ""}`}
        >
          {/* Enhanced Animated background elements - Only in dark mode */}
          {theme === "dark" && (
            <div className="absolute inset-0 opacity-30">
              <motion.div
                className="absolute top-20 left-10 w-72 h-72 rounded-full blur-3xl bg-cyber-blue/30"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <motion.div
                className="absolute bottom-20 right-10 w-96 h-96 rounded-full blur-3xl bg-cyber-purple/20"
                animate={{
                  scale: [1, 0.8, 1],
                  opacity: [0.2, 0.5, 0.2],
                }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 2,
                }}
              />
              <motion.div
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full blur-3xl bg-cyber-green/15"
                animate={{
                  rotate: 360,
                  scale: [1, 1.3, 1],
                }}
                transition={{
                  rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                  scale: { duration: 6, repeat: Infinity, ease: "easeInOut" },
                }}
              />
            </div>
          )}

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2
                className={`text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent ${
                  theme === "dark"
                    ? "bg-gradient-to-r from-white via-cyber-blue to-cyber-purple"
                    : "bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600"
                }`}
              >
                Why Choose StockVision?
              </h2>
              <p
                className={`text-xl max-w-3xl mx-auto ${
                  theme === "dark" ? "text-cyber-blue/90" : "text-slate-600"
                }`}
              >
                Experience the future of stock trading with our cutting-edge AI
                technology
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon;

                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.2 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.02, y: -4 }}
                    className={`backdrop-blur-md border rounded-3xl p-8 transition-all duration-300 group ${
                      theme === "dark"
                        ? "bg-white/10 border-cyber-blue/20 hover:bg-white/15 hover:border-cyber-blue/40"
                        : "bg-white/70 border-gray-200/50 hover:bg-white/90 hover:border-gray-300/60 shadow-lg hover:shadow-xl"
                    }`}
                  >
                    <div
                      className={`p-4 rounded-2xl w-fit mb-6 transition-all duration-300 ${
                        theme === "dark"
                          ? "bg-gradient-to-br from-cyber-blue to-cyber-purple group-hover:shadow-lg group-hover:shadow-cyber-blue/25"
                          : "bg-gradient-to-br from-blue-500 to-purple-600 group-hover:shadow-lg group-hover:shadow-blue-500/25"
                      }`}
                    >
                      <Icon className="h-8 w-8 text-white" />
                    </div>

                    <h3
                      className={`text-2xl font-bold mb-4 ${
                        theme === "dark" ? "text-white" : "text-gray-900"
                      }`}
                    >
                      {benefit.title}
                    </h3>

                    <p
                      className={`mb-6 leading-relaxed ${
                        theme === "dark"
                          ? "text-cyber-blue/80"
                          : "text-slate-600"
                      }`}
                    >
                      {benefit.description}
                    </p>

                    <ul className="space-y-3">
                      {benefit.features.map((feature, featureIndex) => (
                        <li
                          key={featureIndex}
                          className="flex items-center space-x-3"
                        >
                          <CheckCircle
                            className={`h-5 w-5 flex-shrink-0 ${
                              theme === "dark"
                                ? "text-cyber-green"
                                : "text-green-500"
                            }`}
                          />
                          <span
                            className={
                              theme === "dark"
                                ? "text-white/90"
                                : "text-gray-700"
                            }
                          >
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Statistics Counter Section */}
        <section
          className={`py-16 relative ${theme === "light" ? "bg-white" : ""}`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                {
                  value: "2.5M+",
                  label: "Active Traders",
                  icon: Users,
                  color: "blue",
                },
                {
                  value: "95.7%",
                  label: "Accuracy Rate",
                  icon: TrendingUp,
                  color: "green",
                },
                {
                  value: "$50B+",
                  label: "Volume Traded",
                  icon: DollarSign,
                  color: "yellow",
                },
                {
                  value: "150+",
                  label: "Markets Covered",
                  icon: BarChart3,
                  color: "purple",
                },
              ].map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="text-center"
                  >
                    <motion.div
                      className={`w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center shadow-lg ${
                        theme === "dark"
                          ? stat.color === "blue"
                            ? "bg-gradient-to-br from-cyber-blue to-cyber-blue-dark"
                            : stat.color === "green"
                              ? "bg-gradient-to-br from-cyber-green to-cyber-green-dark"
                              : stat.color === "yellow"
                                ? "bg-gradient-to-br from-cyber-yellow to-cyber-yellow-dark"
                                : "bg-gradient-to-br from-cyber-purple to-cyber-purple-dark"
                          : stat.color === "blue"
                            ? "bg-gradient-to-br from-blue-500 to-blue-600"
                            : stat.color === "green"
                              ? "bg-gradient-to-br from-green-500 to-green-600"
                              : stat.color === "yellow"
                                ? "bg-gradient-to-br from-yellow-500 to-yellow-600"
                                : "bg-gradient-to-br from-purple-500 to-purple-600"
                      }`}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Icon className="h-8 w-8 text-white" />
                    </motion.div>
                    <motion.div
                      className={`text-3xl md:text-4xl font-bold mb-2 ${
                        theme === "dark"
                          ? stat.color === "blue"
                            ? "text-cyber-blue"
                            : stat.color === "green"
                              ? "text-cyber-green"
                              : stat.color === "yellow"
                                ? "text-cyber-yellow"
                                : "text-cyber-purple"
                          : stat.color === "blue"
                            ? "text-blue-600"
                            : stat.color === "green"
                              ? "text-green-600"
                              : stat.color === "yellow"
                                ? "text-yellow-600"
                                : "text-purple-600"
                      }`}
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      transition={{ duration: 0.8, delay: index * 0.1 + 0.3 }}
                      viewport={{ once: true }}
                    >
                      {stat.value}
                    </motion.div>
                    <p
                      className={`font-medium ${
                        theme === "dark" ? "text-white/80" : "text-gray-600"
                      }`}
                    >
                      {stat.label}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section
          className={`py-24 relative overflow-hidden ${theme === "light" ? "bg-white" : ""}`}
        >
          {/* Enhanced Animated background - Only in dark mode */}
          {theme === "dark" && (
            <div className="absolute inset-0 opacity-15">
              <div className="cyber-grid h-full w-full animate-pulse" />
              <motion.div
                className="absolute inset-0"
                style={{
                  backgroundImage: `radial-gradient(circle at 20% 80%, rgba(0, 122, 255, 0.15) 0%, transparent 50%),
                 radial-gradient(circle at 80% 20%, rgba(168, 85, 247, 0.15) 0%, transparent 50%),
                 radial-gradient(circle at 40% 40%, rgba(16, 185, 129, 0.1) 0%, transparent 50%)`,
                }}
                animate={{
                  opacity: [0.1, 0.3, 0.1],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </div>
          )}

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2
                className={`text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent ${
                  theme === "dark"
                    ? "bg-gradient-to-r from-cyber-purple via-white to-cyber-blue"
                    : "bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600"
                }`}
              >
                Trusted by Traders Worldwide
              </h2>
              <p
                className={`text-xl max-w-3xl mx-auto ${
                  theme === "dark" ? "text-cyber-purple/90" : "text-slate-600"
                }`}
              >
                See what our users are saying about their success with
                StockVision
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className={`backdrop-blur-md border rounded-3xl p-8 transition-all duration-300 group ${
                    theme === "dark"
                      ? "bg-white/5 border-cyber-purple/20 hover:bg-white/10 hover:border-cyber-purple/40 hover:shadow-lg hover:shadow-cyber-purple/20"
                      : "bg-white/70 border-purple-200/50 hover:bg-white/90 hover:border-purple-300/60 shadow-lg hover:shadow-xl hover:shadow-purple-500/10"
                  }`}
                >
                  <div className="flex items-center space-x-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${
                          theme === "dark"
                            ? "fill-cyber-green text-cyber-green"
                            : "fill-yellow-400 text-yellow-400"
                        }`}
                      />
                    ))}
                  </div>

                  <p
                    className={`mb-6 leading-relaxed italic ${
                      theme === "dark" ? "text-white/90" : "text-gray-700"
                    }`}
                  >
                    "{testimonial.text}"
                  </p>

                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${
                        theme === "dark"
                          ? "bg-gradient-to-br from-cyber-blue to-cyber-purple group-hover:shadow-lg group-hover:shadow-cyber-blue/25"
                          : "bg-gradient-to-br from-blue-500 to-purple-600 group-hover:shadow-lg group-hover:shadow-blue-500/25"
                      }`}
                    >
                      <span className="text-white font-bold">
                        {testimonial.avatar}
                      </span>
                    </div>
                    <div>
                      <p
                        className={`font-semibold ${
                          theme === "dark" ? "text-white" : "text-gray-900"
                        }`}
                      >
                        {testimonial.name}
                      </p>
                      <p
                        className={`text-sm ${
                          theme === "dark"
                            ? "text-cyber-blue/80"
                            : "text-slate-500"
                        }`}
                      >
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section
          className={`py-24 relative overflow-hidden ${theme === "light" ? "bg-white" : ""}`}
        >
          {/* Enhanced CTA Background - Only in dark mode */}
          {theme === "dark" && (
            <>
              <div className="absolute inset-0 bg-gradient-to-br from-cyber-blue/20 via-cyber-purple/30 to-cyber-green/20" />
              <motion.div
                className="absolute inset-0 opacity-30"
                animate={{
                  background: [
                    "radial-gradient(circle at 0% 0%, rgba(0, 122, 255, 0.3) 0%, transparent 50%)",
                    "radial-gradient(circle at 100% 100%, rgba(168, 85, 247, 0.3) 0%, transparent 50%)",
                    "radial-gradient(circle at 0% 100%, rgba(16, 185, 129, 0.3) 0%, transparent 50%)",
                    "radial-gradient(circle at 100% 0%, rgba(0, 122, 255, 0.3) 0%, transparent 50%)",
                  ],
                }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </>
          )}

          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <motion.h2
                className={`text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent ${
                  theme === "dark"
                    ? "bg-gradient-to-r from-white via-cyber-blue to-white"
                    : "bg-gradient-to-r from-gray-900 via-blue-600 to-gray-900"
                }`}
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                Ready to Transform Your Trading?
              </motion.h2>
              <p
                className={`text-xl mb-8 max-w-2xl mx-auto ${
                  theme === "dark" ? "text-cyber-blue/90" : "text-slate-600"
                }`}
              >
                Join thousands of successful traders who trust StockVision for
                their investment decisions.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/register">
                  <motion.div
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Button
                      size="lg"
                      className={`px-8 py-4 text-lg font-semibold rounded-2xl shadow-lg transition-all duration-300 ${
                        theme === "dark"
                          ? "bg-gradient-to-r from-cyber-green to-cyber-blue hover:from-cyber-green-dark hover:to-cyber-blue-dark text-white hover:shadow-cyber-blue/25"
                          : "bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white hover:shadow-blue-500/25"
                      }`}
                    >
                      <Zap className="mr-2 h-5 w-5" />
                      Start Free Trial
                    </Button>
                  </motion.div>
                </Link>

                <Link to="/markets">
                  <motion.div
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Button
                      variant="outline"
                      size="lg"
                      className={`border-2 px-8 py-4 text-lg font-semibold rounded-2xl transition-all duration-300 ${
                        theme === "dark"
                          ? "border-cyber-blue/50 text-cyber-blue hover:bg-cyber-blue/10 hover:border-cyber-blue"
                          : "border-blue-300 text-blue-600 hover:bg-blue-50 hover:border-blue-400"
                      }`}
                    >
                      Explore Markets
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </motion.div>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Footer */}
        <footer
          className={`border-t py-12 relative ${
            theme === "dark"
              ? "bg-gradient-to-br from-cyber-dark/95 to-cyber-black border-cyber-blue/20 text-white"
              : "bg-white border-gray-200 text-gray-900"
          }`}
        >
          {/* Footer Background Animation - Only in dark mode */}
          {theme === "dark" && (
            <div className="absolute inset-0 opacity-10">
              <motion.div
                className="absolute inset-0"
                animate={{
                  background: [
                    "radial-gradient(circle at 20% 20%, rgba(0, 122, 255, 0.1) 0%, transparent 40%)",
                    "radial-gradient(circle at 80% 80%, rgba(168, 85, 247, 0.1) 0%, transparent 40%)",
                    "radial-gradient(circle at 20% 80%, rgba(16, 185, 129, 0.05) 0%, transparent 40%)",
                  ],
                }}
                transition={{
                  duration: 12,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </div>
          )}

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="col-span-1 md:col-span-2">
                <motion.div
                  className="flex items-center space-x-2 mb-4"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <div
                    className={`p-2 rounded-xl shadow-lg ${
                      theme === "dark"
                        ? "bg-gradient-to-br from-cyber-blue to-cyber-purple shadow-cyber-blue/25"
                        : "bg-gradient-to-br from-blue-500 to-purple-600 shadow-blue-500/25"
                    }`}
                  >
                    <Brain className="h-6 w-6 text-white" />
                  </div>
                  <span
                    className={`text-2xl font-bold bg-clip-text text-transparent ${
                      theme === "dark"
                        ? "bg-gradient-to-r from-cyber-blue to-cyber-purple"
                        : "bg-gradient-to-r from-blue-600 to-purple-600"
                    }`}
                  >
                    StockVision
                  </span>
                </motion.div>
                <p
                  className={`mb-4 max-w-md ${
                    theme === "dark" ? "text-cyber-blue/80" : "text-slate-600"
                  }`}
                >
                  Empowering traders with AI-driven stock predictions and
                  real-time market insights.
                </p>
                <p
                  className={`text-sm ${
                    theme === "dark" ? "text-white/60" : "text-gray-500"
                  }`}
                >
                  © 2024 StockVision. All rights reserved.
                </p>
              </div>

              <div>
                <h4
                  className={`font-semibold mb-4 ${
                    theme === "dark" ? "text-cyber-purple" : "text-purple-600"
                  }`}
                >
                  Product
                </h4>
                <ul
                  className={`space-y-2 ${
                    theme === "dark" ? "text-cyber-blue/80" : "text-slate-600"
                  }`}
                >
                  <li>
                    <Link
                      to="/features"
                      className={`transition-colors duration-300 ${
                        theme === "dark"
                          ? "hover:text-cyber-blue"
                          : "hover:text-blue-600"
                      }`}
                    >
                      Features
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/pricing"
                      className={`transition-colors duration-300 ${
                        theme === "dark"
                          ? "hover:text-cyber-blue"
                          : "hover:text-blue-600"
                      }`}
                    >
                      Pricing
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/support"
                      className={`transition-colors duration-300 ${
                        theme === "dark"
                          ? "hover:text-cyber-blue"
                          : "hover:text-blue-600"
                      }`}
                    >
                      Support
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/about"
                      className={`transition-colors duration-300 ${
                        theme === "dark"
                          ? "hover:text-cyber-blue"
                          : "hover:text-blue-600"
                      }`}
                    >
                      Learn More
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <h4
                  className={`font-semibold mb-4 ${
                    theme === "dark" ? "text-cyber-purple" : "text-purple-600"
                  }`}
                >
                  Company
                </h4>
                <ul
                  className={`space-y-2 ${
                    theme === "dark" ? "text-cyber-blue/80" : "text-slate-600"
                  }`}
                >
                  <li>
                    <Link
                      to="/about"
                      className={`transition-colors duration-300 block py-1 ${
                        theme === "dark"
                          ? "hover:text-cyber-blue"
                          : "hover:text-blue-600"
                      }`}
                      onClick={(e) => {
                        e.preventDefault();
                        window.location.href = "/about";
                      }}
                    >
                      About
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/careers"
                      className={`transition-colors duration-300 block py-1 ${
                        theme === "dark"
                          ? "hover:text-cyber-blue"
                          : "hover:text-blue-600"
                      }`}
                      onClick={(e) => {
                        e.preventDefault();
                        window.location.href = "/careers";
                      }}
                    >
                      Careers
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/privacy"
                      className={`transition-colors duration-300 block py-1 ${
                        theme === "dark"
                          ? "hover:text-cyber-blue"
                          : "hover:text-blue-600"
                      }`}
                      onClick={(e) => {
                        e.preventDefault();
                        window.location.href = "/privacy";
                      }}
                    >
                      Privacy
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/terms"
                      className={`transition-colors duration-300 block py-1 ${
                        theme === "dark"
                          ? "hover:text-cyber-blue"
                          : "hover:text-blue-600"
                      }`}
                      onClick={(e) => {
                        e.preventDefault();
                        window.location.href = "/terms";
                      }}
                    >
                      Terms
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </footer>

        {/* Contact Action Buttons */}
        <div className="fixed bottom-6 right-6 z-40 flex flex-col space-y-3">
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1 }}
          >
            <Button
              onClick={() => setShowContactModal(true)}
              className={`px-4 py-3 rounded-xl shadow-lg transition-all duration-300 ${
                theme === "dark"
                  ? "bg-cyber-blue hover:bg-cyber-blue-dark text-white hover:shadow-cyber-blue/25"
                  : "bg-blue-500 hover:bg-blue-600 text-white hover:shadow-blue-500/25"
              }`}
            >
              <Phone className="h-4 w-4 mr-2" />
              Get in Touch
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.2 }}
          >
            <Button
              onClick={() => {
                const message = `Hello StockVision Sales Team,

I am interested in discussing StockVision for my trading/business needs and would like to learn more about:

- Enterprise pricing plans
- API integration options
- Custom dashboard solutions
- Advanced AI prediction features
- Team collaboration tools

Please contact me to schedule a consultation.

Best regards`;

                const subject = "Sales Inquiry - StockVision Enterprise";
                const mailtoUrl = `mailto:sales@stockvision.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
                window.open(mailtoUrl, "_blank");
              }}
              className={`px-4 py-3 rounded-xl shadow-lg transition-all duration-300 ${
                theme === "dark"
                  ? "bg-cyber-green hover:bg-cyber-green-dark text-white hover:shadow-cyber-green/25"
                  : "bg-green-500 hover:bg-green-600 text-white hover:shadow-green-500/25"
              }`}
            >
              <Mail className="h-4 w-4 mr-2" />
              Contact Sales
            </Button>
          </motion.div>
        </div>

        {/* Contact Modal */}
        <DemoContactModal
          isOpen={showContactModal}
          onClose={() => setShowContactModal(false)}
        />
      </GlobalAnimatedBackground>
    </div>
  );
};

export default Index;
