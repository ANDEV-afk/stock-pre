import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navigation from "@/components/Navigation";
import DemoContactModal from "@/components/DemoContactModal";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  MessageCircle,
  Mail,
  Phone,
  BookOpen,
  Search,
  CheckCircle,
  Clock,
  Users,
  Zap,
  AlertTriangle,
  ExternalLink,
  Send,
  Star,
  ThumbsUp,
  ChevronDown,
  ChevronUp,
  Filter,
  X,
  HelpCircle,
  Lightbulb,
  Shield,
  CreditCard,
  Settings,
  Smartphone,
  Globe,
  Youtube,
  Twitter,
  Github,
  MessageSquare,
  Heart,
  Award,
  Headphones,
  Video,
  FileText,
  Download,
  ArrowRight,
  Calendar,
  UserCheck,
  Eye,
  Share,
} from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

const Support = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedFaq, setExpandedFaq] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showDemoModal, setShowDemoModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const searchSuggestionsData = [
    "How to set up price alerts",
    "API documentation",
    "Cancel subscription",
    "Getting started guide",
    "Technical analysis tools",
    "Portfolio management",
    "Mobile app download",
    "Billing and payments",
    "Data accuracy",
    "Real-time data",
    "Webhook setup",
    "Account security",
    "Password reset",
    "Upgrade plan",
    "Export data",
    "Custom indicators",
    "AI predictions accuracy",
    "Stock screening",
    "Watchlist management",
    "Trading strategies",
  ];

  useEffect(() => {
    if (searchQuery.length > 0) {
      const filtered = searchSuggestionsData.filter((suggestion) =>
        suggestion.toLowerCase().includes(searchQuery.toLowerCase()),
      );
      setSuggestions(filtered.slice(0, 6));
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  }, [searchQuery]);

  const contactOptions = [
    {
      icon: MessageCircle,
      title: "Live Chat",
      description: "Get instant help from our support team",
      availability: "24/7 for Pro+ users",
      responseTime: "< 2 minutes",
      color: "cyber-blue",
      cta: "Start Chat",
      popular: true,
    },
    {
      icon: Video,
      title: "Video Call",
      description: "Face-to-face support session",
      availability: "Business hours",
      responseTime: "Schedule in advance",
      color: "cyber-green",
      cta: "Book Call",
      popular: false,
    },
    {
      icon: Mail,
      title: "Email Support",
      description: "Send us a detailed message",
      availability: "Response within 4 hours",
      responseTime: "< 4 hours",
      color: "cyber-purple",
      cta: "Send Email",
      popular: false,
    },
    {
      icon: Phone,
      title: "Phone Support",
      description: "Talk directly with our experts",
      availability: "Enterprise customers only",
      responseTime: "< 1 hour",
      color: "cyber-yellow",
      cta: "Schedule Call",
      popular: false,
    },
  ];

  const faqCategories = [
    { id: "all", label: "All Topics", icon: HelpCircle },
    { id: "getting-started", label: "Getting Started", icon: Zap },
    { id: "billing", label: "Billing & Plans", icon: CreditCard },
    { id: "technical", label: "Technical", icon: Settings },
    { id: "api", label: "API & Integrations", icon: Globe },
    { id: "mobile", label: "Mobile App", icon: Smartphone },
    { id: "security", label: "Security", icon: Shield },
  ];

  const faqs = [
    {
      id: "faq-1",
      category: "getting-started",
      question: "How do I get started with StockVision?",
      answer:
        "Getting started is easy! Simply sign up for a free account and you can immediately start using our basic features. You'll get 5 free stock predictions per day, access to basic charts, and community support. For advanced AI predictions and real-time data, consider upgrading to a Pro plan.",
      tags: ["signup", "free", "basic"],
      helpful: 45,
      views: 1240,
    },
    {
      id: "faq-2",
      category: "getting-started",
      question: "What's included in the free plan?",
      answer:
        "The free plan includes: 5 stock predictions per day, basic charts and analytics, community support forum access, mobile app access, email notifications, and up to 3 watchlists. It's perfect for beginners who want to explore our platform.",
      tags: ["free plan", "features"],
      helpful: 38,
      views: 892,
    },
    {
      id: "faq-3",
      category: "getting-started",
      question: "How accurate are the AI predictions?",
      answer:
        "Our AI models achieve 85-95% accuracy depending on market conditions, timeframes, and stock volatility. We provide confidence intervals with each prediction to help you make informed decisions. Historical performance shows consistent outperformance of market benchmarks.",
      tags: ["accuracy", "AI", "predictions"],
      helpful: 67,
      views: 2150,
    },
    {
      id: "faq-4",
      category: "billing",
      question: "How can I upgrade my plan?",
      answer:
        "You can upgrade your plan anytime from your account settings under 'Billing & Subscription'. Changes take effect immediately and billing is prorated. You'll get instant access to all premium features upon upgrade.",
      tags: ["upgrade", "billing"],
      helpful: 29,
      views: 743,
    },
    {
      id: "faq-5",
      category: "billing",
      question: "Can I cancel my subscription anytime?",
      answer:
        "Yes, you can cancel anytime with no cancellation fees. Your access continues until the end of your billing period. You can also downgrade to the free plan to keep basic access to the platform.",
      tags: ["cancel", "subscription"],
      helpful: 41,
      views: 1123,
    },
    {
      id: "faq-6",
      category: "billing",
      question: "Do you offer refunds?",
      answer:
        "We offer a 30-day money-back guarantee for all paid plans. If you're not satisfied, contact our support team within 30 days of purchase for a full refund. Enterprise customers have custom refund terms.",
      tags: ["refund", "guarantee"],
      helpful: 33,
      views: 567,
    },
    {
      id: "faq-7",
      category: "api",
      question: "How do I get an API key?",
      answer:
        "API keys are available for Pro and Enterprise plans. Generate your key from the API section in your dashboard under 'Developer Tools'. Each plan has different rate limits and features.",
      tags: ["API", "key", "developer"],
      helpful: 52,
      views: 934,
    },
    {
      id: "faq-8",
      category: "api",
      question: "What are the API rate limits?",
      answer:
        "Pro plans include 10,000 API calls per hour. Enterprise plans have unlimited access with dedicated infrastructure. Free users don't have API access. See our API documentation for detailed limits and best practices.",
      tags: ["API", "limits", "rate"],
      helpful: 28,
      views: 456,
    },
    {
      id: "faq-9",
      category: "technical",
      question: "Do you provide webhooks?",
      answer:
        "Yes, we support webhooks for price alerts, prediction updates, and portfolio changes. Configure them in your alert settings or through our API. Webhooks are available for Pro and Enterprise plans.",
      tags: ["webhooks", "alerts", "API"],
      helpful: 21,
      views: 312,
    },
    {
      id: "faq-10",
      category: "mobile",
      question: "Is there a mobile app?",
      answer:
        "Yes! Our mobile app is available for iOS and Android. Download from the App Store or Google Play. The app includes all features from the web platform plus mobile-specific notifications and widgets.",
      tags: ["mobile", "app", "iOS", "Android"],
      helpful: 76,
      views: 1876,
    },
    {
      id: "faq-11",
      category: "security",
      question: "How secure is my data?",
      answer:
        "We use bank-level 256-bit SSL encryption, SOC 2 compliance, and zero-trust architecture. Your financial data is never stored on our servers - we only display public market data. All personal information is encrypted and protected.",
      tags: ["security", "encryption", "privacy"],
      helpful: 44,
      views: 823,
    },
    {
      id: "faq-12",
      category: "technical",
      question: "What data sources do you use?",
      answer:
        "We aggregate data from multiple premium sources including NYSE, NASDAQ, and major financial data providers. Our AI models process real-time market data, news sentiment, social media trends, and historical patterns for predictions.",
      tags: ["data", "sources", "real-time"],
      helpful: 35,
      views: 678,
    },
  ];

  const filteredFaqs =
    selectedCategory === "all"
      ? faqs
      : faqs.filter((faq) => faq.category === selectedCategory);

  const guides = [
    {
      title: "Getting Started Guide",
      description: "Complete walkthrough for new users",
      readTime: "5 min",
      rating: 4.9,
      icon: "🚀",
      difficulty: "Beginner",
      downloads: 2150,
    },
    {
      title: "API Documentation",
      description: "Comprehensive API reference and examples",
      readTime: "15 min",
      rating: 4.8,
      icon: "📚",
      difficulty: "Advanced",
      downloads: 1240,
    },
    {
      title: "Trading Strategies",
      description: "How to use AI predictions effectively",
      readTime: "10 min",
      rating: 4.7,
      icon: "💡",
      difficulty: "Intermediate",
      downloads: 1890,
    },
    {
      title: "Advanced Analytics",
      description: "Using technical indicators and charts",
      readTime: "12 min",
      rating: 4.8,
      icon: "📊",
      difficulty: "Advanced",
      downloads: 945,
    },
    {
      title: "Portfolio Management",
      description: "Best practices for portfolio tracking",
      readTime: "8 min",
      rating: 4.6,
      icon: "💼",
      difficulty: "Intermediate",
      downloads: 1567,
    },
    {
      title: "Alert Setup Guide",
      description: "Creating and managing price alerts",
      readTime: "6 min",
      rating: 4.9,
      icon: "🔔",
      difficulty: "Beginner",
      downloads: 2340,
    },
    {
      title: "Mobile App Guide",
      description: "Making the most of our mobile features",
      readTime: "7 min",
      rating: 4.7,
      icon: "📱",
      difficulty: "Beginner",
      downloads: 1823,
    },
    {
      title: "Webhook Integration",
      description: "Setting up webhooks for automated trading",
      readTime: "20 min",
      rating: 4.5,
      icon: "🔗",
      difficulty: "Expert",
      downloads: 567,
    },
  ];

  const systemStatus = [
    {
      service: "API Services",
      status: "operational",
      uptime: "99.99%",
      lastIncident: "None",
      responseTime: "< 100ms",
    },
    {
      service: "Real-time Data",
      status: "operational",
      uptime: "99.95%",
      lastIncident: "2 days ago",
      responseTime: "< 50ms",
    },
    {
      service: "AI Predictions",
      status: "operational",
      uptime: "99.98%",
      lastIncident: "None",
      responseTime: "< 200ms",
    },
    {
      service: "Mobile Apps",
      status: "operational",
      uptime: "99.97%",
      lastIncident: "1 week ago",
      responseTime: "< 300ms",
    },
  ];

  const communityStats = {
    totalMembers: 12500,
    onlineNow: 847,
    discussions: 3420,
    helpfulAnswers: 8930,
  };

  const helpResources = [
    {
      title: "Video Tutorials",
      description: "Step-by-step video guides",
      icon: Youtube,
      count: 45,
      color: "cyber-red",
    },
    {
      title: "Knowledge Base",
      description: "Comprehensive documentation",
      icon: FileText,
      count: 127,
      color: "cyber-blue",
    },
    {
      title: "Webinars",
      description: "Live training sessions",
      icon: Video,
      count: 23,
      color: "cyber-green",
    },
    {
      title: "Download Center",
      description: "Tools and resources",
      icon: Download,
      count: 18,
      color: "cyber-purple",
    },
  ];

  const handleSearchSuggestionClick = (suggestion: string) => {
    setSearchQuery(suggestion);
    setShowSuggestions(false);
  };

  const toggleFaq = (faqId: string) => {
    setExpandedFaq(expandedFaq === faqId ? null : faqId);
  };

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
            Support Center
          </h1>
          <p className="text-xl text-cyber-blue/80 max-w-3xl mx-auto mb-8">
            Get help when you need it. Our support team is here to help you
            succeed with StockVision.
          </p>

          {/* Enhanced Search Bar with Suggestions */}
          <div className="max-w-2xl mx-auto relative">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/50 z-10" />
              <Input
                placeholder="Search for help articles, guides, and more..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => searchQuery && setShowSuggestions(true)}
                className="pl-12 pr-20 py-4 text-lg bg-white/10 border-cyber-blue/30 text-white placeholder-white/50"
              />
              {searchQuery && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setSearchQuery("");
                    setShowSuggestions(false);
                  }}
                  className="absolute right-16 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-white"
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
              <Button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-cyber-blue to-cyber-purple">
                <Search className="h-4 w-4" />
              </Button>
            </div>

            {/* Search Suggestions */}
            <AnimatePresence>
              {showSuggestions && searchSuggestions.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute top-full left-0 right-0 mt-2 bg-cyber-dark border border-cyber-blue/30 rounded-xl shadow-xl z-50"
                >
                  {searchSuggestions.map((suggestion, index) => (
                    <motion.button
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      onClick={() => handleSearchSuggestionClick(suggestion)}
                      className="w-full text-left px-4 py-3 hover:bg-white/10 transition-all duration-200 flex items-center space-x-3 first:rounded-t-xl last:rounded-b-xl"
                    >
                      <Search className="h-4 w-4 text-cyber-blue" />
                      <span className="text-white">{suggestion}</span>
                    </motion.button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Contact Options */}
        <section className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-white mb-4">Get in Touch</h2>
            <p className="text-cyber-blue/70 text-lg">
              Choose the best way to reach us
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactOptions.map((option, index) => {
              const Icon = option.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02, y: -4 }}
                  className="relative"
                >
                  {option.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
                      <Badge className="bg-cyber-green text-white border-cyber-green">
                        Most Popular
                      </Badge>
                    </div>
                  )}

                  <Card
                    className={cn(
                      "p-6 bg-white/10 backdrop-blur-md border transition-all duration-300 text-center h-full",
                      option.popular
                        ? "border-cyber-green bg-cyber-green/5"
                        : "border-cyber-blue/20 hover:border-cyber-blue/40",
                    )}
                  >
                    <div
                      className={`p-3 bg-${option.color}/20 rounded-xl w-fit mx-auto mb-4`}
                    >
                      <Icon className={`h-6 w-6 text-${option.color}`} />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">
                      {option.title}
                    </h3>
                    <p className="text-cyber-blue/80 text-sm mb-3">
                      {option.description}
                    </p>
                    <div className="space-y-2 mb-4">
                      <Badge
                        variant="outline"
                        className="border-cyber-blue/30 text-cyber-blue text-xs"
                      >
                        {option.availability}
                      </Badge>
                      <div className="text-xs text-white/60">
                        Response time: {option.responseTime}
                      </div>
                    </div>
                    <Button
                      className={`w-full bg-${option.color}/20 hover:bg-${option.color}/30 text-${option.color} border border-${option.color}/30`}
                    >
                      {option.cta}
                    </Button>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* Help Resources */}
        <section className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-white mb-4">
              Help Resources
            </h2>
            <p className="text-cyber-blue/70 text-lg">
              Everything you need to master StockVision
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {helpResources.map((resource, index) => {
              const Icon = resource.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <Card className="p-6 bg-white/10 backdrop-blur-md border border-cyber-blue/20 hover:border-cyber-blue/40 transition-all duration-300 text-center">
                    <div
                      className={`p-3 bg-${resource.color}/20 rounded-xl w-fit mx-auto mb-4`}
                    >
                      <Icon className={`h-6 w-6 text-${resource.color}`} />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">
                      {resource.title}
                    </h3>
                    <p className="text-cyber-blue/80 text-sm mb-3">
                      {resource.description}
                    </p>
                    <Badge
                      className={`bg-${resource.color}/20 text-${resource.color} border-${resource.color}/30`}
                    >
                      {resource.count} items
                    </Badge>
                  </Card>
                </motion.div>
              );
            })}
          </div>

          {/* Popular Guides */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {guides.map((guide, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-6 bg-white/5 backdrop-blur-md border border-cyber-purple/20 hover:bg-white/10 hover:border-cyber-purple/40 transition-all duration-300 cursor-pointer group">
                  <div className="flex items-start justify-between mb-4">
                    <div className="text-3xl">{guide.icon}</div>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 fill-cyber-yellow text-cyber-yellow" />
                      <span className="text-cyber-yellow text-sm">
                        {guide.rating}
                      </span>
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-cyber-purple transition-colors">
                    {guide.title}
                  </h3>
                  <p className="text-cyber-blue/80 text-sm mb-4">
                    {guide.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Badge
                        variant="outline"
                        className="border-cyber-blue/30 text-cyber-blue text-xs"
                      >
                        <Clock className="h-3 w-3 mr-1" />
                        {guide.readTime}
                      </Badge>
                      <Badge
                        variant="outline"
                        className="border-cyber-purple/30 text-cyber-purple text-xs"
                      >
                        {guide.difficulty}
                      </Badge>
                    </div>
                    <div className="text-xs text-white/60">
                      {guide.downloads} downloads
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Enhanced FAQ Section */}
        <section className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-white mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-cyber-blue/70 text-lg">
              Quick answers to common questions
            </p>
          </motion.div>

          {/* FAQ Categories */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {faqCategories.map((category) => {
              const Icon = category.icon;
              return (
                <Button
                  key={category.id}
                  variant={
                    selectedCategory === category.id ? "default" : "outline"
                  }
                  size="sm"
                  onClick={() => setSelectedCategory(category.id)}
                  className={cn(
                    "transition-all duration-200",
                    selectedCategory === category.id
                      ? "bg-cyber-blue text-white border-cyber-blue"
                      : "bg-white/10 text-white/70 border-cyber-blue/30 hover:bg-white/20 hover:border-cyber-blue/50",
                  )}
                >
                  <Icon className="h-4 w-4 mr-2" />
                  {category.label}
                </Button>
              );
            })}
          </div>

          {/* FAQ Items */}
          <div className="space-y-4">
            {filteredFaqs.map((faq, index) => (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="bg-white/5 backdrop-blur-md border border-cyber-blue/20 hover:bg-white/10 transition-all duration-300">
                  <button
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full p-6 text-left"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h4 className="text-lg font-semibold text-white mb-2">
                          {faq.question}
                        </h4>
                        <div className="flex items-center space-x-4 text-sm text-cyber-blue/60">
                          <div className="flex items-center space-x-1">
                            <ThumbsUp className="h-3 w-3" />
                            <span>{faq.helpful} helpful</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Eye className="h-3 w-3" />
                            <span>{faq.views} views</span>
                          </div>
                        </div>
                      </div>
                      <div className="ml-4">
                        {expandedFaq === faq.id ? (
                          <ChevronUp className="h-5 w-5 text-cyber-blue" />
                        ) : (
                          <ChevronDown className="h-5 w-5 text-cyber-blue" />
                        )}
                      </div>
                    </div>
                  </button>

                  <AnimatePresence>
                    {expandedFaq === faq.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="px-6 pb-6"
                      >
                        <Separator className="mb-4" />
                        <p className="text-cyber-blue/80 mb-4">{faq.answer}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            {faq.tags.map((tag, tagIndex) => (
                              <Badge
                                key={tagIndex}
                                variant="outline"
                                className="text-xs border-cyber-purple/30 text-cyber-purple"
                              >
                                {tag}
                              </Badge>
                            ))}
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button
                              size="sm"
                              variant="ghost"
                              className="text-cyber-green hover:text-cyber-green-light"
                            >
                              <ThumbsUp className="h-3 w-3 mr-1" />
                              Helpful
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="text-cyber-blue hover:text-cyber-blue-light"
                            >
                              <Share className="h-3 w-3 mr-1" />
                              Share
                            </Button>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* System Status */}
        <section className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-white mb-4">
              System Status
            </h2>
            <p className="text-cyber-blue/70 text-lg">
              Real-time status of all StockVision services
            </p>
          </motion.div>

          <Card className="p-8 bg-white/5 backdrop-blur-md border border-cyber-green/20">
            <div className="flex items-center justify-center mb-8">
              <div className="flex items-center space-x-3">
                <div className="w-4 h-4 bg-cyber-green rounded-full animate-pulse"></div>
                <span className="text-xl font-bold text-cyber-green">
                  All Systems Operational
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {systemStatus.map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="p-4 bg-white/5 border border-cyber-green/20 rounded-xl">
                    <div className="flex items-center justify-center mb-2">
                      <div className="w-3 h-3 bg-cyber-green rounded-full mr-2"></div>
                      <span className="text-cyber-green text-sm font-medium">
                        Operational
                      </span>
                    </div>
                    <h4 className="text-white font-semibold mb-2">
                      {service.service}
                    </h4>
                    <div className="space-y-1 text-xs text-cyber-blue/70">
                      <p>{service.uptime} uptime</p>
                      <p>Response: {service.responseTime}</p>
                      <p>Last incident: {service.lastIncident}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </Card>
        </section>

        {/* Still Need Help Section */}
        <section className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-white mb-4">
              Still Need Help?
            </h2>
            <p className="text-cyber-blue/70 text-lg">
              Can't find what you're looking for? We're here to help!
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Contact Form */}
            <Card className="p-8 bg-white/10 backdrop-blur-md border border-cyber-blue/20">
              <h3 className="text-xl font-bold text-white mb-6">
                Send us a Message
              </h3>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-white font-medium mb-2">
                      First Name
                    </label>
                    <Input
                      placeholder="John"
                      className="bg-white/10 border-cyber-blue/30 text-white placeholder-white/50"
                    />
                  </div>
                  <div>
                    <label className="block text-white font-medium mb-2">
                      Last Name
                    </label>
                    <Input
                      placeholder="Doe"
                      className="bg-white/10 border-cyber-blue/30 text-white placeholder-white/50"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-white font-medium mb-2">
                    Email
                  </label>
                  <Input
                    type="email"
                    placeholder="john@example.com"
                    className="bg-white/10 border-cyber-blue/30 text-white placeholder-white/50"
                  />
                </div>

                <div>
                  <label className="block text-white font-medium mb-2">
                    Subject
                  </label>
                  <select className="w-full px-3 py-2 bg-white/10 border border-cyber-blue/30 rounded-md text-white">
                    <option value="">Select a topic</option>
                    <option value="technical">Technical Issue</option>
                    <option value="billing">Billing Question</option>
                    <option value="feature">Feature Request</option>
                    <option value="general">General Inquiry</option>
                    <option value="bug">Bug Report</option>
                    <option value="partnership">Partnership</option>
                  </select>
                </div>

                <div>
                  <label className="block text-white font-medium mb-2">
                    Priority
                  </label>
                  <select className="w-full px-3 py-2 bg-white/10 border border-cyber-blue/30 rounded-md text-white">
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="urgent">Urgent</option>
                  </select>
                </div>

                <div>
                  <label className="block text-white font-medium mb-2">
                    Message
                  </label>
                  <Textarea
                    placeholder="Please describe your issue or question in detail..."
                    rows={6}
                    className="bg-white/10 border-cyber-blue/30 text-white placeholder-white/50"
                  />
                </div>

                <Button className="w-full bg-gradient-to-r from-cyber-blue to-cyber-purple hover:from-cyber-blue-dark hover:to-cyber-purple-dark text-white py-3">
                  <Send className="mr-2 h-4 w-4" />
                  Send Message
                </Button>
              </form>
            </Card>

            {/* Alternative Contact Methods */}
            <div className="space-y-6">
              <Card className="p-6 bg-white/5 backdrop-blur-md border border-cyber-green/20">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="p-3 bg-cyber-green/20 rounded-xl">
                    <Calendar className="h-6 w-6 text-cyber-green" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">
                      Book a Demo
                    </h3>
                    <p className="text-cyber-green/80">
                      30-minute personalized demo
                    </p>
                  </div>
                </div>
                <p className="text-white/70 mb-4">
                  Get a personalized walkthrough of StockVision's features with
                  our product experts.
                </p>
                <Button className="w-full bg-cyber-green hover:bg-cyber-green-dark text-white">
                  <Calendar className="mr-2 h-4 w-4" />
                  Schedule Demo
                </Button>
              </Card>

              <Card className="p-6 bg-white/5 backdrop-blur-md border border-cyber-purple/20">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="p-3 bg-cyber-purple/20 rounded-xl">
                    <UserCheck className="h-6 w-6 text-cyber-purple" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">
                      Account Manager
                    </h3>
                    <p className="text-cyber-purple/80">
                      Enterprise customers only
                    </p>
                  </div>
                </div>
                <p className="text-white/70 mb-4">
                  Get dedicated support from your assigned account manager for
                  enterprise needs.
                </p>
                <Button
                  variant="outline"
                  className="w-full border-cyber-purple/30 text-cyber-purple hover:bg-cyber-purple/10"
                >
                  <UserCheck className="mr-2 h-4 w-4" />
                  Contact Manager
                </Button>
              </Card>

              <Card className="p-6 bg-white/5 backdrop-blur-md border border-cyber-yellow/20">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="p-3 bg-cyber-yellow/20 rounded-xl">
                    <Headphones className="h-6 w-6 text-cyber-yellow" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">
                      Priority Support
                    </h3>
                    <p className="text-cyber-yellow/80">
                      Upgrade for faster response
                    </p>
                  </div>
                </div>
                <p className="text-white/70 mb-4">
                  Get priority support with guaranteed response times and
                  dedicated assistance.
                </p>
                <Link to="/pricing">
                  <Button
                    variant="outline"
                    className="w-full border-cyber-yellow/30 text-cyber-yellow hover:bg-cyber-yellow/10"
                  >
                    <ArrowRight className="mr-2 h-4 w-4" />
                    Upgrade Plan
                  </Button>
                </Link>
              </Card>
            </div>
          </div>
        </section>

        {/* Enhanced Community Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <Card className="p-12 bg-gradient-to-br from-cyber-blue/20 to-cyber-purple/20 border border-cyber-blue/30">
            <div className="mb-8">
              <h2 className="text-4xl font-bold text-white mb-4">
                Join Our Community
              </h2>
              <p className="text-cyber-blue/80 text-lg mb-6 max-w-2xl mx-auto">
                Connect with {communityStats.totalMembers.toLocaleString()}+
                traders, share strategies, and get help from the community.
              </p>

              {/* Community Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="text-center">
                  <div className="text-2xl font-bold text-cyber-blue">
                    {communityStats.totalMembers.toLocaleString()}
                  </div>
                  <div className="text-sm text-white/60">Total Members</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-cyber-green">
                    {communityStats.onlineNow}
                  </div>
                  <div className="text-sm text-white/60">Online Now</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-cyber-purple">
                    {communityStats.discussions.toLocaleString()}
                  </div>
                  <div className="text-sm text-white/60">Discussions</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-cyber-yellow">
                    {communityStats.helpfulAnswers.toLocaleString()}
                  </div>
                  <div className="text-sm text-white/60">Helpful Answers</div>
                </div>
              </div>
            </div>

            {/* Community Platforms */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  className="bg-black border border-indigo-500/50 hover:bg-indigo-600 text-white flex items-center justify-center space-x-2 py-6 w-full"
                  onClick={() =>
                    window.open("https://discord.gg/stockvision", "_blank")
                  }
                >
                  <MessageSquare className="h-5 w-5" />
                  <div>
                    <div className="font-semibold">Discord</div>
                    <div className="text-xs opacity-80">Real-time chat</div>
                  </div>
                </Button>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  className="bg-black border border-blue-500/50 text-blue-400 hover:bg-blue-500/10 flex items-center justify-center space-x-2 py-6 w-full"
                  onClick={() =>
                    window.open("https://twitter.com/stockvision_ai", "_blank")
                  }
                >
                  <Twitter className="h-5 w-5" />
                  <div>
                    <div className="font-semibold">Twitter</div>
                    <div className="text-xs opacity-80">Latest updates</div>
                  </div>
                </Button>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  className="bg-black border border-gray-500/50 text-gray-400 hover:bg-gray-500/10 flex items-center justify-center space-x-2 py-6 w-full"
                  onClick={() =>
                    window.open("https://github.com/stockvision-ai", "_blank")
                  }
                >
                  <Github className="h-5 w-5" />
                  <div>
                    <div className="font-semibold">GitHub</div>
                    <div className="text-xs opacity-80">Open source</div>
                  </div>
                </Button>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  className="bg-black border border-red-500/50 text-red-400 hover:bg-red-500/10 flex items-center justify-center space-x-2 py-6 w-full"
                  onClick={() =>
                    window.open("https://youtube.com/@stockvision-ai", "_blank")
                  }
                >
                  <Youtube className="h-5 w-5" />
                  <div>
                    <div className="font-semibold">YouTube</div>
                    <div className="text-xs opacity-80">Video tutorials</div>
                  </div>
                </Button>
              </motion.div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    size="lg"
                    onClick={() => setShowContactModal(true)}
                    className="bg-gradient-to-r from-cyber-blue to-cyber-purple hover:from-cyber-blue-dark hover:to-cyber-purple-dark text-white"
                  >
                    <Headphones className="mr-2 h-5 w-5" />
                    Get in Touch
                  </Button>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    size="lg"
                    onClick={() => setShowDemoModal(true)}
                    className="bg-gradient-to-r from-cyber-green to-cyber-blue hover:from-cyber-green-dark hover:to-cyber-blue-dark text-white"
                  >
                    <MessageCircle className="mr-2 h-5 w-5" />
                    Contact Sales
                  </Button>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    size="lg"
                    onClick={() => setShowDemoModal(true)}
                    className="bg-black border border-cyber-blue/50 text-cyber-blue hover:bg-cyber-blue/10"
                  >
                    <Video className="mr-2 h-5 w-5" />
                    Book a Demo
                  </Button>
                </motion.div>
              </motion.div>
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Enhanced Contact Options Modal */}
      {showContactModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setShowContactModal(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-cyber-dark border border-cyber-blue/30 rounded-3xl p-8 max-w-2xl w-full shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-white">
                Get in Touch with Our Support Team
              </h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowContactModal(false)}
                className="text-white/70 hover:text-white"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            <p className="text-cyber-blue/80 mb-8 text-center">
              Choose your preferred way to connect with us. Our team is ready to
              help you with any questions.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {contactOptions.map((option, index) => {
                const Icon = option.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="relative"
                  >
                    {option.popular && (
                      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
                        <Badge className="bg-cyber-green text-black px-3 py-1 text-xs font-semibold">
                          Most Popular
                        </Badge>
                      </div>
                    )}
                    <Card
                      className={`p-6 bg-cyber-dark border-2 hover:bg-cyber-dark/80 transition-all duration-300 cursor-pointer group relative ${
                        option.popular
                          ? "border-cyber-green"
                          : "border-gray-600"
                      }`}
                      onClick={() => {
                        if (option.title === "Live Chat") {
                          alert("Live chat feature opening...");
                        } else if (option.title === "Video Call") {
                          window.open(
                            "https://calendly.com/stockvision/video-demo",
                            "_blank",
                          );
                        } else if (option.title === "Email Support") {
                          window.open(
                            "mailto:support@stockvision.ai?subject=Support Request",
                            "_blank",
                          );
                        } else if (option.title === "Phone Support") {
                          window.open("tel:+1-800-STOCK-AI", "_blank");
                        }
                      }}
                    >
                      <div className="text-center">
                        <div
                          className={`p-3 bg-${option.color}/20 rounded-xl w-fit mx-auto mb-4 group-hover:bg-${option.color}/30 transition-colors`}
                        >
                          <Icon
                            className={`h-8 w-8 text-${option.color === "cyber-yellow" ? "amber-500" : option.color}`}
                          />
                        </div>
                        <h4 className="text-xl font-bold text-white mb-2">
                          {option.title}
                        </h4>
                        <p className="text-cyber-blue text-sm mb-4">
                          {option.description}
                        </p>
                        <div className="space-y-2 mb-6">
                          <Badge
                            className={`bg-${option.color === "cyber-yellow" ? "amber" : option.color}/20 text-${option.color === "cyber-yellow" ? "amber-300" : option.color} border-${option.color === "cyber-yellow" ? "amber" : option.color}/30`}
                          >
                            {option.availability}
                          </Badge>
                          <p className="text-gray-400 text-sm">
                            Response time: {option.responseTime}
                          </p>
                        </div>
                        <Button
                          className={`w-full ${
                            option.color === "cyber-blue"
                              ? "bg-cyber-blue hover:bg-cyber-blue-dark"
                              : option.color === "cyber-green"
                                ? "bg-cyber-green hover:bg-cyber-green-dark"
                                : option.color === "cyber-purple"
                                  ? "bg-cyber-purple hover:bg-cyber-purple-dark"
                                  : "bg-amber-600 hover:bg-amber-700"
                          } text-white font-semibold py-3 rounded-xl transition-all duration-300 hover:scale-105`}
                        >
                          {option.cta}
                        </Button>
                      </div>
                    </Card>
                  </motion.div>
                );
              })}
            </div>

            <div className="mt-8 text-center">
              <p className="text-cyber-blue/60 text-sm">
                Our support team is available Monday-Friday, 9 AM - 6 PM EST
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Demo Contact Modal */}
      <DemoContactModal
        isOpen={showDemoModal}
        onClose={() => setShowDemoModal(false)}
      />
    </div>
  );
};

export default Support;
