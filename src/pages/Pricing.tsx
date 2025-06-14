import React, { useState } from "react";
import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import {
  CheckCircle,
  X,
  Star,
  Zap,
  Crown,
  Building,
  ArrowRight,
  Sparkles,
  Shield,
  Clock,
  Users,
  BarChart3,
  Brain,
  Globe,
  CreditCard,
  Smartphone,
  Banknote,
  Lock,
  Calendar,
  Phone,
  MessageCircle,
  Mail,
  Video,
  HeadphonesIcon,
} from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

const Pricing = () => {
  const [isAnnual, setIsAnnual] = useState(false);
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<"card" | "upi" | "bank">(
    "card",
  );
  const [showContactOptions, setShowContactOptions] = useState(false);

  const contactOptions = [
    {
      title: "Live Chat",
      description: "Get instant help from our support team",
      availability: "24/7 for Pro+ users",
      responseTime: "Response time: < 2 minutes",
      icon: MessageCircle,
      action: () => {
        // Simulate chat opening
        alert("Live chat feature opening...");
      },
      color: "cyber-blue",
      buttonText: "Start Chat",
      buttonColor: "bg-cyber-blue hover:bg-cyber-blue-dark",
      popular: true,
    },
    {
      title: "Video Call",
      description: "Face-to-face support session",
      availability: "Business hours",
      responseTime: "Response time: Schedule in advance",
      icon: Video,
      action: () =>
        window.open("https://calendly.com/stockvision/video-demo", "_blank"),
      color: "cyber-green",
      buttonText: "Book Call",
      buttonColor: "bg-cyber-green hover:bg-cyber-green-dark",
      popular: false,
    },
    {
      title: "Email Support",
      description: "Send us a detailed message",
      availability: "Response within 4 hours",
      responseTime: "Response time: < 4 hours",
      icon: Mail,
      action: () =>
        window.open(
          "mailto:sales@stockvision.ai?subject=Pricing Inquiry",
          "_blank",
        ),
      color: "cyber-purple",
      buttonText: "Send Email",
      buttonColor: "bg-cyber-purple hover:bg-cyber-purple-dark",
      popular: false,
    },
    {
      title: "Phone Support",
      description: "Talk directly with our experts",
      availability: "Enterprise customers only",
      responseTime: "Response time: < 1 hour",
      icon: Phone,
      action: () => window.open("tel:+1-800-STOCK-AI", "_blank"),
      color: "amber",
      buttonText: "Schedule Call",
      buttonColor: "bg-amber-600 hover:bg-amber-700",
      popular: false,
    },
  ];

  const plans = [
    {
      name: "Starter",
      monthlyPrice: 0,
      annualPrice: 0,
      originalMonthlyPrice: null,
      originalAnnualPrice: null,
      description: "Perfect for beginners exploring stock trading",
      icon: Sparkles,
      color: "cyber-blue",
      popular: false,
      features: [
        "5 stock predictions per day",
        "Basic charts and analytics",
        "Community support",
        "Mobile app access",
        "Email notifications",
        "Basic watchlists",
      ],
      limits: [
        "Limited to 3 watchlists",
        "No real-time alerts",
        "No API access",
        "Community support only",
      ],
      cta: "Get Started Free",
      highlight: "No credit card required",
    },
    {
      name: "Professional",
      monthlyPrice: 29,
      annualPrice: 23.2, // 20% discount
      originalMonthlyPrice: 49,
      originalAnnualPrice: 39.2,
      description: "For serious traders and active investors",
      icon: Star,
      color: "cyber-purple",
      popular: true,
      features: [
        "Unlimited predictions",
        "Advanced AI models",
        "Real-time alerts",
        "Priority support",
        "API access (10K calls/month)",
        "Custom indicators",
        "Advanced charting tools",
        "Portfolio analytics",
        "Price alert automation",
        "Technical analysis suite",
      ],
      limits: [],
      cta: "Start 14-Day Free Trial",
      highlight: "Most popular choice",
    },
    {
      name: "Enterprise",
      monthlyPrice: null,
      annualPrice: null,
      originalMonthlyPrice: null,
      originalAnnualPrice: null,
      description: "For institutions and professional teams",
      icon: Crown,
      color: "cyber-green",
      popular: false,
      features: [
        "White-label solution",
        "Custom AI training",
        "Dedicated support team",
        "SLA guarantees (99.9% uptime)",
        "Unlimited API access",
        "Advanced integrations",
        "Compliance features",
        "Multi-user management",
        "Custom reporting",
        "On-premise deployment",
        "24/7 phone support",
      ],
      limits: [],
      cta: "Contact Sales",
      highlight: "Custom implementation",
    },
  ];

  const features = [
    {
      category: "AI & Predictions",
      icon: Brain,
      items: [
        {
          name: "AI-Powered Predictions",
          starter: "Basic",
          pro: "Advanced",
          enterprise: "Custom Models",
        },
        {
          name: "Confidence Intervals",
          starter: false,
          pro: true,
          enterprise: true,
        },
        {
          name: "Pattern Recognition",
          starter: false,
          pro: true,
          enterprise: true,
        },
        {
          name: "Sentiment Analysis",
          starter: false,
          pro: true,
          enterprise: true,
        },
        {
          name: "Custom AI Training",
          starter: false,
          pro: false,
          enterprise: true,
        },
      ],
    },
    {
      category: "Analytics & Tools",
      icon: BarChart3,
      items: [
        {
          name: "Technical Indicators",
          starter: "5",
          pro: "50+",
          enterprise: "Unlimited",
        },
        {
          name: "Chart Types",
          starter: "3",
          pro: "10+",
          enterprise: "Unlimited",
        },
        {
          name: "Watchlists",
          starter: "3",
          pro: "Unlimited",
          enterprise: "Unlimited",
        },
        {
          name: "Price Alerts",
          starter: false,
          pro: "Unlimited",
          enterprise: "Unlimited",
        },
        {
          name: "Portfolio Analytics",
          starter: false,
          pro: true,
          enterprise: true,
        },
      ],
    },
    {
      category: "Data & Access",
      icon: Globe,
      items: [
        {
          name: "Real-time Data",
          starter: "Delayed 15min",
          pro: "Real-time",
          enterprise: "Real-time",
        },
        {
          name: "Historical Data",
          starter: "1 year",
          pro: "10 years",
          enterprise: "Unlimited",
        },
        {
          name: "Global Markets",
          starter: "US only",
          pro: "Global",
          enterprise: "Global + Custom",
        },
        {
          name: "API Access",
          starter: false,
          pro: "10K/month",
          enterprise: "Unlimited",
        },
        {
          name: "Data Export",
          starter: false,
          pro: "CSV",
          enterprise: "All Formats",
        },
      ],
    },
    {
      category: "Support & Services",
      icon: Users,
      items: [
        {
          name: "Support Type",
          starter: "Community",
          pro: "Email + Chat",
          enterprise: "Dedicated Team",
        },
        {
          name: "Response Time",
          starter: "48+ hours",
          pro: "< 4 hours",
          enterprise: "< 1 hour",
        },
        {
          name: "Training & Onboarding",
          starter: false,
          pro: "Self-service",
          enterprise: "Dedicated",
        },
        {
          name: "Custom Integration",
          starter: false,
          pro: false,
          enterprise: true,
        },
        {
          name: "SLA Guarantee",
          starter: false,
          pro: false,
          enterprise: "99.9%",
        },
      ],
    },
  ];

  const faqs = [
    {
      question: "Can I change plans anytime?",
      answer:
        "Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately, and we'll prorate the billing accordingly.",
    },
    {
      question: "Is there a free trial for paid plans?",
      answer:
        "Yes! The Professional plan comes with a 14-day free trial. No credit card required to start.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept all major credit cards, debit cards, UPI, and bank transfers. All payments are processed securely through Razorpay.",
    },
    {
      question: "Do you offer educational discounts?",
      answer:
        "Yes, we offer 50% discounts for students and educators with valid academic credentials.",
    },
    {
      question: "What's included in API access?",
      answer:
        "API access includes real-time stock data, predictions, technical indicators, and historical data with comprehensive documentation.",
    },
    {
      question: "Can I cancel anytime?",
      answer:
        "Absolutely. You can cancel your subscription at any time with no cancellation fees. Your access continues until the end of your billing period.",
    },
  ];

  const getPrice = (plan: any) => {
    if (plan.monthlyPrice === null) return "Custom";
    if (plan.monthlyPrice === 0) return "Free";
    return isAnnual ? `$${plan.annualPrice}` : `$${plan.monthlyPrice}`;
  };

  const getOriginalPrice = (plan: any) => {
    if (plan.monthlyPrice === null || plan.monthlyPrice === 0) return null;
    return isAnnual ? plan.originalAnnualPrice : plan.originalMonthlyPrice;
  };

  const handleSelectPlan = (planName: string) => {
    if (planName === "Starter") {
      // Redirect to register for free plan
      window.location.href = "/register";
    } else if (planName === "Enterprise") {
      // Show contact options for enterprise
      setShowContactOptions(true);
    } else {
      // Redirect to payment gateway with plan information
      const plan = plans.find((p) => p.name === planName);
      const price = plan
        ? isAnnual
          ? plan.annualPrice
          : plan.monthlyPrice
        : 0;
      const billing = isAnnual ? "annual" : "monthly";
      window.location.href = `/payment?plan=${planName}&price=${price}&billing=${billing}`;
    }
  };

  return (
    <div className="min-h-screen bg-cyber-black cyber-grid">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-cyber-blue via-white to-cyber-purple bg-clip-text text-transparent mb-6">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-cyber-blue/80 max-w-3xl mx-auto mb-8">
            Start free and scale as you grow. No hidden fees, no surprises.
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center space-x-4 mb-12">
            <Label
              htmlFor="billing-toggle"
              className={cn(
                "text-lg font-medium cursor-pointer transition-colors",
                !isAnnual ? "text-white" : "text-white/60",
              )}
            >
              Monthly
            </Label>
            <div className="relative">
              <Switch
                id="billing-toggle"
                checked={isAnnual}
                onCheckedChange={setIsAnnual}
                className="data-[state=checked]:bg-cyber-blue"
              />
            </div>
            <Label
              htmlFor="billing-toggle"
              className={cn(
                "text-lg font-medium cursor-pointer transition-colors",
                isAnnual ? "text-white" : "text-white/60",
              )}
            >
              Annual
            </Label>
            <Badge className="bg-cyber-green/20 text-cyber-green border-cyber-green/30">
              Save 20%
            </Badge>
          </div>
        </motion.div>

        {/* Get in Touch Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16"
        >
          <Card className="p-6 bg-gradient-to-r from-cyber-blue/10 to-cyber-purple/10 border border-cyber-blue/30">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="mb-4 md:mb-0">
                <h3 className="text-2xl font-bold text-white mb-2">
                  Need Help Choosing the Right Plan?
                </h3>
                <p className="text-cyber-blue/80">
                  Get in touch with our sales team for personalized assistance
                </p>
              </div>
              <Button
                onClick={() => setShowContactOptions(true)}
                size="lg"
                className="bg-gradient-to-r from-cyber-blue to-cyber-purple hover:from-cyber-blue-dark hover:to-cyber-purple-dark text-white px-8 py-3 rounded-2xl font-semibold shadow-lg hover:scale-105 transition-all duration-300"
              >
                <HeadphonesIcon className="mr-2 h-5 w-5" />
                Get in Touch
              </Button>
            </div>
          </Card>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {plans.map((plan, index) => {
            const Icon = plan.icon;
            const price = getPrice(plan);
            const originalPrice = getOriginalPrice(plan);

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className={cn(
                  "relative",
                  plan.popular && "md:scale-105 md:z-10",
                )}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-20">
                    <Badge className="bg-gradient-to-r from-cyber-blue to-cyber-purple text-white px-4 py-2 text-sm font-semibold shadow-lg">
                      <Star className="h-4 w-4 mr-1" />
                      Most Popular
                    </Badge>
                  </div>
                )}

                <Card
                  className={cn(
                    "p-8 bg-white/10 backdrop-blur-md border transition-all duration-300 h-full",
                    plan.popular
                      ? "border-cyber-purple bg-cyber-purple/10 shadow-lg shadow-cyber-purple/25"
                      : "border-cyber-blue/20 hover:border-cyber-blue/40",
                  )}
                >
                  <div className="text-center mb-8">
                    <div
                      className={`p-3 bg-${plan.color}/20 rounded-xl w-fit mx-auto mb-4`}
                    >
                      <Icon className={`h-8 w-8 text-${plan.color}`} />
                    </div>

                    <h3 className="text-2xl font-bold text-white mb-2">
                      {plan.name}
                    </h3>
                    <p className="text-cyber-blue/80 mb-4">
                      {plan.description}
                    </p>

                    <div className="mb-4">
                      {originalPrice && (
                        <span className="text-white/50 line-through text-lg mr-2">
                          ${originalPrice}
                        </span>
                      )}
                      <span className="text-4xl font-bold bg-gradient-to-r from-cyber-blue to-cyber-purple bg-clip-text text-transparent">
                        {price}
                      </span>
                      {price !== "Free" && price !== "Custom" && (
                        <span className="text-white/70">
                          /{isAnnual ? "month" : "month"}
                        </span>
                      )}
                    </div>

                    <p className="text-sm text-cyber-blue/60">
                      {plan.highlight}
                    </p>
                  </div>

                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center space-x-3">
                        <CheckCircle className="h-5 w-5 text-cyber-green flex-shrink-0" />
                        <span className="text-white/90">{feature}</span>
                      </li>
                    ))}
                    {plan.limits.map((limit, idx) => (
                      <li key={idx} className="flex items-center space-x-3">
                        <X className="h-5 w-5 text-cyber-red/60 flex-shrink-0" />
                        <span className="text-white/60">{limit}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    onClick={() => handleSelectPlan(plan.name)}
                    className={cn(
                      "w-full py-3 rounded-2xl font-semibold transition-all duration-300 hover:scale-105",
                      plan.popular
                        ? "bg-gradient-to-r from-cyber-blue to-cyber-purple hover:from-cyber-blue-dark hover:to-cyber-purple-dark text-white shadow-lg shadow-cyber-blue/25"
                        : "bg-white/10 hover:bg-white/20 border border-cyber-blue/30 hover:border-cyber-blue/60 text-white",
                    )}
                  >
                    {plan.cta}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Payment Form Modal */}
        {showPaymentForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowPaymentForm(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-cyber-dark border border-cyber-blue/30 rounded-3xl p-8 max-w-md w-full shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-white">
                  Complete Your Purchase
                </h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowPaymentForm(false)}
                  className="text-white/70 hover:text-white"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>

              {/* Plan Summary */}
              <div className="bg-white/5 border border-cyber-blue/20 rounded-2xl p-4 mb-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-white font-semibold">
                      {selectedPlan} Plan
                    </h4>
                    <p className="text-cyber-blue/70 text-sm">
                      {isAnnual ? "Annual billing" : "Monthly billing"}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-white">
                      ${isAnnual ? "23.20" : "29.00"}
                    </p>
                    <p className="text-cyber-green text-sm">
                      {isAnnual ? "Save 20%" : ""}
                    </p>
                  </div>
                </div>
              </div>

              {/* Payment Method Selection */}
              <div className="mb-6">
                <Label className="text-white font-semibold mb-3 block">
                  Payment Method
                </Label>
                <div className="grid grid-cols-3 gap-3">
                  <Button
                    variant={paymentMethod === "card" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setPaymentMethod("card")}
                    className={cn(
                      "flex flex-col items-center p-4 h-auto",
                      paymentMethod === "card"
                        ? "bg-cyber-blue text-white"
                        : "bg-white/10 text-white/70 border-cyber-blue/30",
                    )}
                  >
                    <CreditCard className="h-6 w-6 mb-2" />
                    <span className="text-xs">Card</span>
                  </Button>
                  <Button
                    variant={paymentMethod === "upi" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setPaymentMethod("upi")}
                    className={cn(
                      "flex flex-col items-center p-4 h-auto",
                      paymentMethod === "upi"
                        ? "bg-cyber-blue text-white"
                        : "bg-white/10 text-white/70 border-cyber-blue/30",
                    )}
                  >
                    <Smartphone className="h-6 w-6 mb-2" />
                    <span className="text-xs">UPI</span>
                  </Button>
                  <Button
                    variant={paymentMethod === "bank" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setPaymentMethod("bank")}
                    className={cn(
                      "flex flex-col items-center p-4 h-auto",
                      paymentMethod === "bank"
                        ? "bg-cyber-blue text-white"
                        : "bg-white/10 text-white/70 border-cyber-blue/30",
                    )}
                  >
                    <Banknote className="h-6 w-6 mb-2" />
                    <span className="text-xs">Bank</span>
                  </Button>
                </div>
              </div>

              {/* Payment Form */}
              <div className="space-y-4">
                {paymentMethod === "card" && (
                  <>
                    <div>
                      <Label className="text-white text-sm mb-2 block">
                        Card Number
                      </Label>
                      <Input
                        placeholder="1234 5678 9012 3456"
                        className="bg-white/10 border-cyber-blue/30 text-white placeholder-white/50"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="text-white text-sm mb-2 block">
                          Expiry Date
                        </Label>
                        <Input
                          placeholder="MM/YY"
                          className="bg-white/10 border-cyber-blue/30 text-white placeholder-white/50"
                        />
                      </div>
                      <div>
                        <Label className="text-white text-sm mb-2 block">
                          CVV
                        </Label>
                        <Input
                          placeholder="123"
                          className="bg-white/10 border-cyber-blue/30 text-white placeholder-white/50"
                        />
                      </div>
                    </div>
                    <div>
                      <Label className="text-white text-sm mb-2 block">
                        Cardholder Name
                      </Label>
                      <Input
                        placeholder="John Doe"
                        className="bg-white/10 border-cyber-blue/30 text-white placeholder-white/50"
                      />
                    </div>
                  </>
                )}

                {paymentMethod === "upi" && (
                  <div>
                    <Label className="text-white text-sm mb-2 block">
                      UPI ID
                    </Label>
                    <Input
                      placeholder="yourname@upi"
                      className="bg-white/10 border-cyber-blue/30 text-white placeholder-white/50"
                    />
                  </div>
                )}

                {paymentMethod === "bank" && (
                  <>
                    <div>
                      <Label className="text-white text-sm mb-2 block">
                        Account Number
                      </Label>
                      <Input
                        placeholder="123456789012"
                        className="bg-white/10 border-cyber-blue/30 text-white placeholder-white/50"
                      />
                    </div>
                    <div>
                      <Label className="text-white text-sm mb-2 block">
                        IFSC Code
                      </Label>
                      <Input
                        placeholder="ABCD0123456"
                        className="bg-white/10 border-cyber-blue/30 text-white placeholder-white/50"
                      />
                    </div>
                  </>
                )}
              </div>

              <Separator className="my-6" />

              {/* Security Notice */}
              <div className="flex items-center space-x-2 text-sm text-cyber-green mb-6">
                <Lock className="h-4 w-4" />
                <span>Secured by Razorpay with 256-bit SSL encryption</span>
              </div>

              {/* Complete Payment Button */}
              <Button className="w-full bg-gradient-to-r from-cyber-green to-cyber-blue hover:from-cyber-green-dark hover:to-cyber-blue-dark text-white py-3 rounded-2xl font-semibold shadow-lg">
                <Shield className="mr-2 h-5 w-5" />
                Complete Payment
              </Button>
            </motion.div>
          </motion.div>
        )}

        {/* Contact Options Modal */}
        {showContactOptions && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowContactOptions(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-cyber-dark border border-cyber-blue/30 rounded-3xl p-8 max-w-2xl w-full shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-white">
                  Get in Touch with Our Sales Team
                </h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowContactOptions(false)}
                  className="text-white/70 hover:text-white"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>

              <p className="text-cyber-blue/80 mb-8 text-center">
                Choose your preferred way to connect with us. Our team is ready
                to help you find the perfect plan.
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
                      >
                        <div className="text-center">
                          <div
                            className={`p-3 bg-${option.color}/20 rounded-xl w-fit mx-auto mb-4 group-hover:bg-${option.color}/30 transition-colors`}
                          >
                            <Icon
                              className={`h-8 w-8 text-${option.color === "amber" ? "amber-500" : option.color}`}
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
                              className={`bg-${option.color === "amber" ? "amber" : option.color}/20 text-${option.color === "amber" ? "amber-300" : option.color} border-${option.color === "amber" ? "amber" : option.color}/30`}
                            >
                              {option.availability}
                            </Badge>
                            <p className="text-gray-400 text-sm">
                              {option.responseTime}
                            </p>
                          </div>
                          <Button
                            onClick={option.action}
                            className={`w-full ${option.buttonColor} text-white font-semibold py-3 rounded-xl transition-all duration-300 hover:scale-105`}
                          >
                            {option.buttonText}
                          </Button>
                        </div>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>

              <div className="mt-8 text-center">
                <p className="text-cyber-blue/60 text-sm">
                  Our sales team is available Monday-Friday, 9 AM - 6 PM EST
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Feature Comparison */}
        <section className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-white mb-4">
              Compare All Features
            </h2>
            <p className="text-cyber-blue/70 text-lg">
              Detailed breakdown of what's included in each plan
            </p>
          </motion.div>

          <Card className="p-8 bg-white/5 backdrop-blur-md border border-cyber-blue/20 overflow-x-auto">
            {features.map((category, categoryIndex) => {
              const CategoryIcon = category.icon;
              return (
                <div key={categoryIndex} className="mb-8 last:mb-0">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="p-2 bg-cyber-blue/20 rounded-lg">
                      <CategoryIcon className="h-5 w-5 text-cyber-blue" />
                    </div>
                    <h3 className="text-xl font-bold text-white">
                      {category.category}
                    </h3>
                  </div>

                  <div className="grid grid-cols-4 gap-4 min-w-[600px]">
                    <div className="font-semibold text-cyber-blue/80 pb-4 border-b border-cyber-blue/20">
                      Feature
                    </div>
                    <div className="font-semibold text-center text-cyber-blue/80 pb-4 border-b border-cyber-blue/20">
                      Starter
                    </div>
                    <div className="font-semibold text-center text-cyber-purple/80 pb-4 border-b border-cyber-purple/20">
                      Professional
                    </div>
                    <div className="font-semibold text-center text-cyber-green/80 pb-4 border-b border-cyber-green/20">
                      Enterprise
                    </div>

                    {category.items.map((item, itemIndex) => (
                      <React.Fragment key={itemIndex}>
                        <div className="py-3 text-white font-medium">
                          {item.name}
                        </div>
                        <div className="py-3 text-center">
                          {typeof item.starter === "boolean" ? (
                            item.starter ? (
                              <CheckCircle className="h-5 w-5 text-cyber-green mx-auto" />
                            ) : (
                              <X className="h-5 w-5 text-cyber-red/60 mx-auto" />
                            )
                          ) : (
                            <span className="text-cyber-blue/80">
                              {item.starter}
                            </span>
                          )}
                        </div>
                        <div className="py-3 text-center">
                          {typeof item.pro === "boolean" ? (
                            item.pro ? (
                              <CheckCircle className="h-5 w-5 text-cyber-green mx-auto" />
                            ) : (
                              <X className="h-5 w-5 text-cyber-red/60 mx-auto" />
                            )
                          ) : (
                            <span className="text-cyber-purple/80">
                              {item.pro}
                            </span>
                          )}
                        </div>
                        <div className="py-3 text-center">
                          {typeof item.enterprise === "boolean" ? (
                            item.enterprise ? (
                              <CheckCircle className="h-5 w-5 text-cyber-green mx-auto" />
                            ) : (
                              <X className="h-5 w-5 text-cyber-red/60 mx-auto" />
                            )
                          ) : (
                            <span className="text-cyber-green/80">
                              {item.enterprise}
                            </span>
                          )}
                        </div>
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              );
            })}
          </Card>
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
              Everything you need to know about our pricing
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-6 bg-white/5 backdrop-blur-md border border-cyber-blue/20 hover:bg-white/10 hover:border-cyber-blue/40 transition-all duration-300">
                  <h3 className="text-lg font-bold text-white mb-3">
                    {faq.question}
                  </h3>
                  <p className="text-cyber-blue/80">{faq.answer}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <Card className="p-12 bg-gradient-to-br from-cyber-blue/20 to-cyber-purple/20 border border-cyber-blue/30">
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to Start Trading Smarter?
            </h2>
            <p className="text-cyber-blue/80 text-lg mb-8 max-w-2xl mx-auto">
              Join thousands of successful traders who trust StockVision for
              their investment decisions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-cyber-blue to-cyber-purple hover:from-cyber-blue-dark hover:to-cyber-purple-dark text-white"
                >
                  <Zap className="mr-2 h-5 w-5" />
                  Start Free Trial
                </Button>
              </Link>
              <Link to="/features">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-cyber-blue/30 text-cyber-blue hover:bg-cyber-blue/10"
                >
                  View All Features
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

export default Pricing;
