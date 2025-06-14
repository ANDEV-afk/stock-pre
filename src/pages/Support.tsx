import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
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
  AlertCircle,
  ExternalLink,
  Send,
  Star,
  ThumbsUp,
} from "lucide-react";
import { Link } from "react-router-dom";

const Support = () => {
  const contactOptions = [
    {
      icon: MessageCircle,
      title: "Live Chat",
      description: "Get instant help from our support team",
      availability: "24/7 for Pro+ users",
      color: "cyber-blue",
      cta: "Start Chat",
    },
    {
      icon: Mail,
      title: "Email Support",
      description: "Send us a detailed message",
      availability: "Response within 4 hours",
      color: "cyber-purple",
      cta: "Send Email",
    },
    {
      icon: Phone,
      title: "Phone Support",
      description: "Talk directly with our experts",
      availability: "Enterprise customers only",
      color: "cyber-green",
      cta: "Schedule Call",
    },
    {
      icon: BookOpen,
      title: "Help Center",
      description: "Browse our comprehensive guides",
      availability: "Available 24/7",
      color: "cyber-yellow",
      cta: "Browse Docs",
    },
  ];

  const faqs = [
    {
      category: "Getting Started",
      questions: [
        {
          q: "How do I get started with StockVision?",
          a: "Simply sign up for a free account and you can immediately start using our basic features. For advanced AI predictions, upgrade to a Pro plan.",
        },
        {
          q: "What's included in the free plan?",
          a: "The free plan includes 5 stock predictions per day, basic charts, community support, and mobile app access.",
        },
        {
          q: "How accurate are the AI predictions?",
          a: "Our AI models achieve 85-95% accuracy depending on market conditions and timeframes. We provide confidence intervals with each prediction.",
        },
      ],
    },
    {
      category: "Account & Billing",
      questions: [
        {
          q: "How can I upgrade my plan?",
          a: "You can upgrade your plan anytime from your account settings. Changes take effect immediately and billing is prorated.",
        },
        {
          q: "Can I cancel my subscription anytime?",
          a: "Yes, you can cancel anytime with no cancellation fees. Your access continues until the end of your billing period.",
        },
        {
          q: "Do you offer refunds?",
          a: "We offer a 30-day money-back guarantee for all paid plans. Contact support for refund requests.",
        },
      ],
    },
    {
      category: "API & Technical",
      questions: [
        {
          q: "How do I get an API key?",
          a: "API keys are available for Pro and Enterprise plans. Generate your key from the API section in your dashboard.",
        },
        {
          q: "What are the API rate limits?",
          a: "Pro plans include 10,000 API calls per hour. Enterprise plans have unlimited access. See our API documentation for details.",
        },
        {
          q: "Do you provide webhooks?",
          a: "Yes, we support webhooks for price alerts, prediction updates, and portfolio changes. Configure them in your alert settings.",
        },
      ],
    },
  ];

  const guides = [
    {
      title: "Getting Started Guide",
      description: "Complete walkthrough for new users",
      readTime: "5 min",
      rating: 4.9,
      icon: "🚀",
    },
    {
      title: "API Documentation",
      description: "Comprehensive API reference and examples",
      readTime: "15 min",
      rating: 4.8,
      icon: "📚",
    },
    {
      title: "Trading Strategies",
      description: "How to use AI predictions effectively",
      readTime: "10 min",
      rating: 4.7,
      icon: "💡",
    },
    {
      title: "Advanced Analytics",
      description: "Using technical indicators and charts",
      readTime: "12 min",
      rating: 4.8,
      icon: "📊",
    },
    {
      title: "Portfolio Management",
      description: "Best practices for portfolio tracking",
      readTime: "8 min",
      rating: 4.6,
      icon: "💼",
    },
    {
      title: "Alert Setup",
      description: "Creating and managing price alerts",
      readTime: "6 min",
      rating: 4.9,
      icon: "🔔",
    },
  ];

  const systemStatus = [
    { service: "API Services", status: "operational", uptime: "99.99%" },
    { service: "Real-time Data", status: "operational", uptime: "99.95%" },
    { service: "AI Predictions", status: "operational", uptime: "99.98%" },
    { service: "Mobile Apps", status: "operational", uptime: "99.97%" },
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
            Support Center
          </h1>
          <p className="text-xl text-cyber-blue/80 max-w-3xl mx-auto mb-8">
            Get help when you need it. Our support team is here to help you
            succeed with StockVision.
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/50" />
            <Input
              placeholder="Search for help articles, guides, and more..."
              className="pl-12 py-4 text-lg bg-white/10 border-cyber-blue/30 text-white placeholder-white/50"
            />
            <Button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-cyber-blue to-cyber-purple">
              <Search className="h-4 w-4" />
            </Button>
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
                >
                  <Card className="p-6 bg-white/10 backdrop-blur-md border border-cyber-blue/20 hover:border-cyber-blue/40 transition-all duration-300 text-center h-full">
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
                    <Badge
                      variant="outline"
                      className="border-cyber-blue/30 text-cyber-blue mb-4"
                    >
                      {option.availability}
                    </Badge>
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

        {/* Quick Help Guides */}
        <section className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-white mb-4">
              Popular Guides
            </h2>
            <p className="text-cyber-blue/70 text-lg">
              Quick answers to common questions
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                    <Badge
                      variant="outline"
                      className="border-cyber-blue/30 text-cyber-blue"
                    >
                      <Clock className="h-3 w-3 mr-1" />
                      {guide.readTime}
                    </Badge>
                    <ExternalLink className="h-4 w-4 text-white/50 group-hover:text-cyber-purple transition-colors" />
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* FAQ */}
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

          <div className="space-y-8">
            {faqs.map((category, categoryIndex) => (
              <motion.div
                key={categoryIndex}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: categoryIndex * 0.2 }}
              >
                <Card className="p-8 bg-white/5 backdrop-blur-md border border-cyber-blue/20">
                  <h3 className="text-2xl font-bold text-white mb-6">
                    {category.category}
                  </h3>
                  <div className="space-y-6">
                    {category.questions.map((faq, faqIndex) => (
                      <div
                        key={faqIndex}
                        className="border-b border-white/10 last:border-b-0 pb-6 last:pb-0"
                      >
                        <h4 className="text-lg font-semibold text-white mb-3 flex items-start space-x-3">
                          <CheckCircle className="h-5 w-5 text-cyber-green flex-shrink-0 mt-0.5" />
                          <span>{faq.q}</span>
                        </h4>
                        <p className="text-cyber-blue/80 ml-8">{faq.a}</p>
                      </div>
                    ))}
                  </div>
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
                    <h4 className="text-white font-semibold mb-1">
                      {service.service}
                    </h4>
                    <p className="text-cyber-blue/70 text-sm">
                      {service.uptime} uptime
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </Card>
        </section>

        {/* Contact Form */}
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
              Send us a message and we'll get back to you soon
            </p>
          </motion.div>

          <div className="max-w-2xl mx-auto">
            <Card className="p-8 bg-white/10 backdrop-blur-md border border-cyber-blue/20">
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
          </div>
        </section>

        {/* Community */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <Card className="p-12 bg-gradient-to-br from-cyber-blue/20 to-cyber-purple/20 border border-cyber-blue/30">
            <h2 className="text-4xl font-bold text-white mb-6">
              Join Our Community
            </h2>
            <p className="text-cyber-blue/80 text-lg mb-8 max-w-2xl mx-auto">
              Connect with other traders, share strategies, and get help from
              the community.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-cyber-blue to-cyber-purple hover:from-cyber-blue-dark hover:to-cyber-purple-dark text-white"
              >
                <Users className="mr-2 h-5 w-5" />
                Join Discord
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-cyber-blue/30 text-cyber-blue hover:bg-cyber-blue/10"
              >
                <ThumbsUp className="mr-2 h-5 w-5" />
                Community Forum
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Support;
