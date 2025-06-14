import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import GlobalAnimatedBackground from "@/components/GlobalAnimatedBackground";
import { useTheme } from "@/contexts/ThemeContext";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Brain,
  TrendingUp,
  Shield,
  Zap,
  Eye,
  Bell,
  BarChart3,
  Globe,
  Smartphone,
  Cloud,
  Lock,
  Users,
  Clock,
  Star,
  CheckCircle,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";

const Features = () => {
  const { theme } = useTheme();
  const coreFeatures = [
    {
      icon: Brain,
      title: "AI-Powered Predictions",
      description:
        "Advanced machine learning algorithms analyze market patterns to deliver highly accurate stock predictions with confidence intervals.",
      benefits: [
        "LSTM Neural Networks",
        "Pattern Recognition",
        "Sentiment Analysis",
        "95%+ Accuracy Rate",
      ],
      color: "cyber-blue",
    },
    {
      icon: TrendingUp,
      title: "Real-Time Analytics",
      description:
        "Get instant market insights with live data feeds, real-time price updates, and lightning-fast analysis.",
      benefits: [
        "Live Market Data",
        "Instant Notifications",
        "Real-time Charts",
        "Sub-second Updates",
      ],
      color: "cyber-green",
    },
    {
      icon: Shield,
      title: "Enterprise Security",
      description:
        "Bank-level security with end-to-end encryption, secure API access, and SOC 2 compliance.",
      benefits: [
        "256-bit Encryption",
        "SOC 2 Compliance",
        "Two-Factor Auth",
        "Secure API Keys",
      ],
      color: "cyber-purple",
    },
  ];

  const tradingFeatures = [
    {
      icon: BarChart3,
      title: "Advanced Charting",
      description:
        "Professional-grade charts with 50+ technical indicators, multiple timeframes, and customizable layouts.",
      features: [
        "50+ Indicators",
        "Multiple Timeframes",
        "Custom Layouts",
        "Drawing Tools",
      ],
    },
    {
      icon: Bell,
      title: "Smart Alerts",
      description:
        "Intelligent price alerts, volume spikes, technical pattern recognition, and custom notifications.",
      features: [
        "Price Alerts",
        "Volume Alerts",
        "Pattern Recognition",
        "Custom Rules",
      ],
    },
    {
      icon: Eye,
      title: "Watchlist Management",
      description:
        "Organize and track your favorite stocks with unlimited watchlists, categories, and sorting options.",
      features: [
        "Unlimited Lists",
        "Categories",
        "Smart Sorting",
        "Quick Actions",
      ],
    },
    {
      icon: Globe,
      title: "Global Markets",
      description:
        "Access to international markets, currency exchange rates, and global economic indicators.",
      features: [
        "50+ Exchanges",
        "Currency Rates",
        "Global Indices",
        "Economic Data",
      ],
    },
  ];

  const platformFeatures = [
    {
      icon: Smartphone,
      title: "Mobile Apps",
      description:
        "Native iOS and Android apps with full feature parity and offline capabilities.",
      availability: "iOS & Android",
    },
    {
      icon: Cloud,
      title: "Cloud Sync",
      description:
        "Seamlessly sync your data across all devices with real-time cloud synchronization.",
      availability: "All Platforms",
    },
    {
      icon: Lock,
      title: "Data Privacy",
      description:
        "Your data stays private with zero-knowledge architecture and GDPR compliance.",
      availability: "Global",
    },
    {
      icon: Users,
      title: "Team Collaboration",
      description:
        "Share insights, collaborate on analysis, and manage team portfolios together.",
      availability: "Enterprise",
    },
  ];

  const apiFeatures = [
    {
      endpoint: "GET /api/predictions/{symbol}",
      description: "Get AI-powered stock predictions with confidence intervals",
      rateLimit: "1000/hour",
    },
    {
      endpoint: "GET /api/realtime/{symbol}",
      description: "Real-time stock prices and market data",
      rateLimit: "Unlimited",
    },
    {
      endpoint: "POST /api/alerts",
      description: "Create and manage custom price alerts",
      rateLimit: "500/hour",
    },
    {
      endpoint: "GET /api/analytics/{symbol}",
      description: "Technical analysis and market indicators",
      rateLimit: "2000/hour",
    },
  ];

  return (
    <div className="min-h-screen bg-cyber-black cyber-grid">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-cyber-blue via-white to-cyber-purple bg-clip-text text-transparent mb-6">
            Powerful Features
          </h1>
          <p className="text-xl text-cyber-blue/80 max-w-3xl mx-auto mb-8">
            Everything you need for professional stock trading and investment
            analysis, powered by cutting-edge AI technology.
          </p>
          <div className="flex justify-center space-x-4">
            <Link to="/register">
              <Button
                size="lg"
                className="bg-gradient-to-r from-cyber-blue to-cyber-purple hover:from-cyber-blue-dark hover:to-cyber-purple-dark text-white"
              >
                <Zap className="mr-2 h-5 w-5" />
                Start Free Trial
              </Button>
            </Link>
            <Link to="/predict">
              <Button
                size="lg"
                variant="outline"
                className="border-cyber-blue/30 text-cyber-blue hover:bg-cyber-blue/10"
              >
                <Eye className="mr-2 h-5 w-5" />
                Try Demo
              </Button>
            </Link>
          </div>
        </motion.div>

        {/* Core Features */}
        <section className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-white mb-4">
              Core Capabilities
            </h2>
            <p className="text-cyber-blue/70 text-lg">
              The foundation of our AI-powered trading platform
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {coreFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                  whileHover={{ scale: 1.02, y: -4 }}
                >
                  <Card className="p-8 bg-white/10 backdrop-blur-md border border-cyber-blue/20 hover:border-cyber-blue/40 transition-all duration-300 h-full group">
                    <div
                      className={`p-4 rounded-2xl w-fit mb-6 bg-${feature.color}/20 group-hover:shadow-lg group-hover:shadow-${feature.color}/25 transition-all duration-300`}
                    >
                      <Icon className={`h-8 w-8 text-${feature.color}`} />
                    </div>

                    <h3 className="text-2xl font-bold text-white mb-4">
                      {feature.title}
                    </h3>
                    <p className="text-cyber-blue/80 mb-6 leading-relaxed">
                      {feature.description}
                    </p>

                    <ul className="space-y-3">
                      {feature.benefits.map((benefit, idx) => (
                        <li key={idx} className="flex items-center space-x-3">
                          <CheckCircle className="h-5 w-5 text-cyber-green flex-shrink-0" />
                          <span className="text-white/90">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* Trading Features */}
        <section className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-white mb-4">
              Trading Tools
            </h2>
            <p className="text-cyber-blue/70 text-lg">
              Professional-grade tools for serious traders
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {tradingFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.15 }}
                >
                  <Card className="p-6 bg-white/5 backdrop-blur-md border border-cyber-purple/20 hover:bg-white/10 hover:border-cyber-purple/40 transition-all duration-300 h-full">
                    <div className="flex items-start space-x-4">
                      <div className="p-3 bg-cyber-purple/20 rounded-xl">
                        <Icon className="h-6 w-6 text-cyber-purple" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-white mb-2">
                          {feature.title}
                        </h3>
                        <p className="text-cyber-blue/80 mb-4">
                          {feature.description}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {feature.features.map((item, idx) => (
                            <Badge
                              key={idx}
                              variant="outline"
                              className="border-cyber-blue/30 text-cyber-blue"
                            >
                              {item}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* Platform Features */}
        <section className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-white mb-4">
              Platform & Integration
            </h2>
            <p className="text-cyber-blue/70 text-lg">
              Seamless experience across all your devices
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {platformFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <Card className="p-6 bg-white/5 backdrop-blur-md border border-cyber-green/20 hover:bg-white/10 hover:border-cyber-green/40 transition-all duration-300 text-center h-full">
                    <div className="p-3 bg-cyber-green/20 rounded-xl w-fit mx-auto mb-4">
                      <Icon className="h-6 w-6 text-cyber-green" />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-cyber-blue/80 text-sm mb-3">
                      {feature.description}
                    </p>
                    <Badge className="bg-cyber-green/20 text-cyber-green border-cyber-green/30">
                      {feature.availability}
                    </Badge>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* API Features */}
        <section className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-white mb-4">
              Developer API
            </h2>
            <p className="text-cyber-blue/70 text-lg">
              Build custom applications with our powerful API
            </p>
          </motion.div>

          <Card className="p-8 bg-white/5 backdrop-blur-md border border-cyber-yellow/20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-bold text-white mb-6">
                  API Endpoints
                </h3>
                <div className="space-y-4">
                  {apiFeatures.map((api, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="p-4 bg-white/5 border border-cyber-blue/10 rounded-lg"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <code className="text-cyber-green font-mono text-sm">
                          {api.endpoint}
                        </code>
                        <Badge
                          variant="outline"
                          className="border-cyber-yellow/30 text-cyber-yellow text-xs"
                        >
                          {api.rateLimit}
                        </Badge>
                      </div>
                      <p className="text-white/70 text-sm">{api.description}</p>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-white mb-6">
                  Getting Started
                </h3>
                <div className="space-y-4">
                  <div className="p-4 bg-cyber-blue/10 border border-cyber-blue/20 rounded-lg">
                    <h4 className="text-white font-semibold mb-2">
                      1. Get API Key
                    </h4>
                    <p className="text-cyber-blue/80 text-sm">
                      Sign up for an account and generate your API key from the
                      dashboard.
                    </p>
                  </div>
                  <div className="p-4 bg-cyber-purple/10 border border-cyber-purple/20 rounded-lg">
                    <h4 className="text-white font-semibold mb-2">
                      2. Make Requests
                    </h4>
                    <p className="text-cyber-purple/80 text-sm">
                      Use RESTful API calls with JSON responses and webhook
                      support.
                    </p>
                  </div>
                  <div className="p-4 bg-cyber-green/10 border border-cyber-green/20 rounded-lg">
                    <h4 className="text-white font-semibold mb-2">
                      3. Scale Up
                    </h4>
                    <p className="text-cyber-green/80 text-sm">
                      Upgrade to higher rate limits and premium features as
                      needed.
                    </p>
                  </div>
                </div>

                <Button className="w-full mt-6 bg-gradient-to-r from-cyber-yellow to-cyber-blue hover:from-cyber-yellow-dark hover:to-cyber-blue-dark text-white">
                  <ArrowRight className="mr-2 h-4 w-4" />
                  View API Documentation
                </Button>
              </div>
            </div>
          </Card>
        </section>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <Card className="p-12 bg-gradient-to-br from-cyber-blue/20 to-cyber-purple/20 border border-cyber-blue/30">
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-cyber-blue/80 text-lg mb-8 max-w-2xl mx-auto">
              Join thousands of traders who trust StockVision for their
              investment decisions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-cyber-blue to-cyber-purple hover:from-cyber-blue-dark hover:to-cyber-purple-dark text-white"
                >
                  <Star className="mr-2 h-5 w-5" />
                  Start Free Trial
                </Button>
              </Link>
              <Link to="/pricing">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-cyber-blue/30 text-cyber-blue hover:bg-cyber-blue/10"
                >
                  View Pricing
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Features;
