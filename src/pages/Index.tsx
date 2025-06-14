import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import StockTicker from "@/components/StockTicker";
import VideoTutorials from "@/components/VideoTutorials";
import FeatureShowcase from "@/components/FeatureShowcase";
import GlobalAnimatedBackground from "@/components/GlobalAnimatedBackground";
import BackgroundVideoOverlay from "@/components/BackgroundVideoOverlay";
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
} from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
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

  const pricingPlans = [
    {
      name: "Starter",
      price: "Free",
      description: "Perfect for beginners",
      features: [
        "5 stock predictions per day",
        "Basic charts and analytics",
        "Community support",
        "Mobile app access",
      ],
      cta: "Get Started",
      popular: false,
    },
    {
      name: "Professional",
      price: "$29",
      description: "For serious traders",
      features: [
        "Unlimited predictions",
        "Advanced AI models",
        "Real-time alerts",
        "Priority support",
        "API access",
        "Custom indicators",
      ],
      cta: "Start Free Trial",
      popular: true,
    },
    {
      name: "Enterprise",
      price: "Custom",
      description: "For institutions",
      features: [
        "White-label solution",
        "Custom AI training",
        "Dedicated support",
        "SLA guarantees",
        "Advanced integrations",
        "Compliance features",
      ],
      cta: "Contact Sales",
      popular: false,
    },
  ];

  return (
    <GlobalAnimatedBackground variant="home" className="bg-cyber-black">
      <BackgroundVideoOverlay variant="financial" opacity={0.08} />
      <Navigation />

      {/* Hero Section */}
      <HeroSection />

      {/* Stock Ticker */}
      <StockTicker />

      {/* Feature Showcase Section */}
      <FeatureShowcase />

      {/* Video Tutorials Section */}
      <VideoTutorials />

      {/* Benefits Section */}
      <section className="py-24 relative overflow-hidden">
        {/* Enhanced Animated background elements */}
        <div className="absolute inset-0 opacity-30">
          <motion.div
            className="absolute top-20 left-10 w-72 h-72 bg-cyber-blue/30 rounded-full blur-3xl"
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
            className="absolute bottom-20 right-10 w-96 h-96 bg-cyber-purple/20 rounded-full blur-3xl"
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
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-cyber-green/15 rounded-full blur-3xl"
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

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white via-cyber-blue to-cyber-purple bg-clip-text text-transparent mb-6">
              Why Choose StockVision?
            </h2>
            <p className="text-xl text-cyber-blue/90 max-w-3xl mx-auto">
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
                  className="bg-white/10 backdrop-blur-md border border-cyber-blue/20 rounded-3xl p-8 hover:bg-white/15 hover:border-cyber-blue/40 transition-all duration-300 group"
                >
                  <div className="bg-gradient-to-br from-cyber-blue to-cyber-purple p-4 rounded-2xl w-fit mb-6 group-hover:shadow-lg group-hover:shadow-cyber-blue/25 transition-all duration-300">
                    <Icon className="h-8 w-8 text-white" />
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-4">
                    {benefit.title}
                  </h3>

                  <p className="text-cyber-blue/80 mb-6 leading-relaxed">
                    {benefit.description}
                  </p>

                  <ul className="space-y-3">
                    {benefit.features.map((feature, featureIndex) => (
                      <li
                        key={featureIndex}
                        className="flex items-center space-x-3"
                      >
                        <CheckCircle className="h-5 w-5 text-cyber-green flex-shrink-0" />
                        <span className="text-white/90">{feature}</span>
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
      <section className="py-16 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              {
                value: "2.5M+",
                label: "Active Traders",
                icon: Users,
                color: "cyber-blue",
              },
              {
                value: "95.7%",
                label: "Accuracy Rate",
                icon: TrendingUp,
                color: "cyber-green",
              },
              {
                value: "$50B+",
                label: "Volume Traded",
                icon: DollarSign,
                color: "cyber-yellow",
              },
              {
                value: "150+",
                label: "Markets Covered",
                icon: BarChart3,
                color: "cyber-purple",
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
                    className={`w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-${stat.color} to-${stat.color}-dark rounded-2xl flex items-center justify-center shadow-lg`}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Icon className="h-8 w-8 text-white" />
                  </motion.div>
                  <motion.div
                    className={`text-3xl md:text-4xl font-bold text-${stat.color} mb-2`}
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ duration: 0.8, delay: index * 0.1 + 0.3 }}
                    viewport={{ once: true }}
                  >
                    {stat.value}
                  </motion.div>
                  <p className="text-white/80 font-medium">{stat.label}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 relative overflow-hidden">
        {/* Enhanced Animated background */}
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

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyber-purple via-white to-cyber-blue bg-clip-text text-transparent mb-6">
              Trusted by Traders Worldwide
            </h2>
            <p className="text-xl text-cyber-purple/90 max-w-3xl mx-auto">
              See what our users are saying about their success with StockVision
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
                className="bg-white/5 backdrop-blur-md border border-cyber-purple/20 rounded-3xl p-8 hover:bg-white/10 hover:border-cyber-purple/40 hover:shadow-lg hover:shadow-cyber-purple/20 transition-all duration-300 group"
              >
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-5 w-5 fill-cyber-green text-cyber-green"
                    />
                  ))}
                </div>

                <p className="text-white/90 mb-6 leading-relaxed italic">
                  "{testimonial.text}"
                </p>

                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-cyber-blue to-cyber-purple rounded-xl flex items-center justify-center group-hover:shadow-lg group-hover:shadow-cyber-blue/25 transition-all duration-300">
                    <span className="text-white font-bold">
                      {testimonial.avatar}
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold text-white">
                      {testimonial.name}
                    </p>
                    <p className="text-sm text-cyber-blue/80">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-24 relative overflow-hidden">
        {/* Enhanced Floating elements */}
        <div className="absolute inset-0 opacity-30">
          <motion.div
            className="absolute top-32 left-1/4 w-64 h-64 bg-cyber-blue/20 rounded-full blur-3xl"
            animate={{
              y: [0, -30, 0],
              x: [0, 20, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute bottom-32 right-1/4 w-80 h-80 bg-cyber-purple/15 rounded-full blur-3xl"
            animate={{
              y: [0, 40, 0],
              x: [0, -25, 0],
              scale: [1, 0.9, 1],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 3,
            }}
          />
          <motion.div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-cyber-green/10 rounded-full blur-3xl"
            animate={{
              rotate: 360,
              scale: [1, 1.2, 1],
            }}
            transition={{
              rotate: { duration: 25, repeat: Infinity, ease: "linear" },
              scale: { duration: 8, repeat: Infinity, ease: "easeInOut" },
            }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyber-blue via-white to-cyber-purple bg-clip-text text-transparent mb-6">
              Choose Your Plan
            </h2>
            <p className="text-xl text-cyber-blue/90 max-w-3xl mx-auto">
              Start free and upgrade as your trading needs grow
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`relative bg-white/10 backdrop-blur-md border rounded-3xl p-8 hover:bg-white/15 transition-all duration-300 group ${
                  plan.popular
                    ? "border-cyber-blue bg-cyber-blue/10 ring-2 ring-cyber-blue/50 scale-105 shadow-lg shadow-cyber-blue/25"
                    : "border-cyber-purple/20 hover:border-cyber-purple/40"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-gradient-to-r from-cyber-blue to-cyber-purple text-white px-4 py-2 rounded-xl text-sm font-semibold shadow-lg">
                      Most Popular
                    </div>
                  </div>
                )}

                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {plan.name}
                  </h3>
                  <p className="text-cyber-blue/80 mb-4">{plan.description}</p>
                  <div className="mb-4">
                    <span className="text-4xl font-bold bg-gradient-to-r from-cyber-blue to-cyber-purple bg-clip-text text-transparent">
                      {plan.price}
                    </span>
                    {plan.price !== "Free" && plan.price !== "Custom" && (
                      <span className="text-white/70">/month</span>
                    )}
                  </div>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li
                      key={featureIndex}
                      className="flex items-center space-x-3"
                    >
                      <CheckCircle className="h-5 w-5 text-cyber-green flex-shrink-0" />
                      <span className="text-white/90">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link to="/register">
                  <Button
                    className={`w-full py-3 rounded-2xl font-semibold transition-all duration-300 hover:scale-105 ${
                      plan.popular
                        ? "bg-gradient-to-r from-cyber-blue to-cyber-purple hover:from-cyber-blue-dark hover:to-cyber-purple-dark text-white shadow-lg shadow-cyber-blue/25"
                        : "bg-white/10 hover:bg-white/20 border border-cyber-purple/30 hover:border-cyber-purple/60 text-white"
                    }`}
                  >
                    {plan.cta}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        {/* Enhanced CTA Background */}
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

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.h2
              className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white via-cyber-blue to-white bg-clip-text text-transparent mb-6"
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
            <p className="text-xl text-cyber-blue/90 mb-8 max-w-2xl mx-auto">
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
                    className="bg-gradient-to-r from-cyber-green to-cyber-blue hover:from-cyber-green-dark hover:to-cyber-blue-dark text-white px-8 py-4 text-lg font-semibold rounded-2xl shadow-lg hover:shadow-cyber-blue/25 transition-all duration-300"
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
                    className="border-2 border-cyber-blue/50 text-cyber-blue hover:bg-cyber-blue/10 hover:border-cyber-blue px-8 py-4 text-lg font-semibold rounded-2xl transition-all duration-300"
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
      <footer className="bg-gradient-to-br from-cyber-dark/95 to-cyber-black border-t border-cyber-blue/20 text-white py-12 relative">
        {/* Footer Background Animation */}
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

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <motion.div
                className="flex items-center space-x-2 mb-4"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <div className="bg-gradient-to-br from-cyber-blue to-cyber-purple p-2 rounded-xl shadow-lg shadow-cyber-blue/25">
                  <Brain className="h-6 w-6 text-white" />
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-cyber-blue to-cyber-purple bg-clip-text text-transparent">
                  StockVision
                </span>
              </motion.div>
              <p className="text-cyber-blue/80 mb-4 max-w-md">
                Empowering traders with AI-driven stock predictions and
                real-time market insights.
              </p>
              <p className="text-sm text-white/60">
                © 2024 StockVision. All rights reserved.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-cyber-purple">Product</h4>
              <ul className="space-y-2 text-cyber-blue/80">
                <li>
                  <Link
                    to="/features"
                    className="hover:text-cyber-blue transition-colors duration-300"
                  >
                    Features
                  </Link>
                </li>
                <li>
                  <Link
                    to="/pricing"
                    className="hover:text-cyber-blue transition-colors duration-300"
                  >
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link
                    to="/api"
                    className="hover:text-cyber-blue transition-colors duration-300"
                  >
                    API
                  </Link>
                </li>
                <li>
                  <Link
                    to="/support"
                    className="hover:text-cyber-blue transition-colors duration-300"
                  >
                    Support
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-cyber-purple">Company</h4>
              <ul className="space-y-2 text-cyber-blue/80">
                <li>
                  <Link
                    to="/about"
                    className="hover:text-cyber-blue transition-colors duration-300 block py-1"
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
                    className="hover:text-cyber-blue transition-colors duration-300 block py-1"
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
                    className="hover:text-cyber-blue transition-colors duration-300 block py-1"
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
                    className="hover:text-cyber-blue transition-colors duration-300 block py-1"
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
    </GlobalAnimatedBackground>
  );
};

export default Index;
