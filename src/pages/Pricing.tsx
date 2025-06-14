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
      name: "Basic",
      monthlyPrice: 9.99,
      annualPrice: 7.99, // 20% discount
      originalMonthlyPrice: 19.99,
      originalAnnualPrice: 15.99,
      description: "Perfect for beginners exploring stock trading",
      icon: Sparkles,
      color: "cyber-green",
      popular: false,
      features: [
        "50 stock predictions per day",
        "Basic technical analysis",
        "Email alerts",
        "Mobile app access",
        "Community support",
        "Basic watchlists",
      ],
      limits: [
        "Limited to 5 watchlists",
        "Basic chart indicators",
        "Community support only",
      ],
      cta: "Start Basic Plan",
      highlight: "Great for beginners",
    },
    {
      name: "Pro",
      monthlyPrice: 29.99,
      annualPrice: 23.99, // 20% discount
      originalMonthlyPrice: 49.99,
      originalAnnualPrice: 39.99,
      description: "For serious traders and active investors",
      icon: Star,
      color: "cyber-blue",
      popular: true,
      features: [
        "Unlimited AI predictions",
        "Advanced market analysis",
        "Real-time alerts",
        "Full course library access",
        "Priority support",
        "API access",
        "Advanced charting tools",
        "Portfolio analytics",
        "Price alert automation",
        "Technical analysis suite",
      ],
      limits: [],
      cta: "Upgrade to Pro",
      highlight: "Most popular choice",
    },
    {
      name: "Elite",
      monthlyPrice: 99.99,
      annualPrice: 79.99, // 20% discount
      originalMonthlyPrice: 149.99,
      originalAnnualPrice: 119.99,
      description: "For professional traders and institutions",
      icon: Crown,
      color: "cyber-purple",
      popular: false,
      features: [
        "Custom AI model training",
        "Portfolio optimization",
        "1-on-1 expert consultations",
        "White-label access",
        "Advanced risk modeling",
        "Institutional-grade features",
        "Dedicated support team",
        "SLA guarantees (99.9% uptime)",
        "Unlimited API access",
        "Advanced integrations",
        "24/7 phone support",
      ],
      limits: [],
      cta: "Get Elite Access",
      highlight: "Premium features",
    },
  ];

  const features = [
    {
      category: "AI & Predictions",
      icon: Brain,
      items: [
        {
          name: "AI-Powered Predictions",
          basic: "Standard",
          pro: "Advanced",
          elite: "Custom Models",
        },
        {
          name: "Confidence Intervals",
          basic: false,
          pro: true,
          elite: true,
        },
        {
          name: "Risk Assessment",
          basic: false,
          pro: true,
          elite: true,
        },
        {
          name: "Sentiment Analysis",
          basic: false,
          pro: true,
          elite: true,
        },
        {
          name: "Custom Model Training",
          basic: false,
          pro: false,
          elite: true,
        },
      ],
    },
    {
      category: "Data & Analytics",
      icon: BarChart3,
      items: [
        {
          name: "Predictions per Day",
          basic: "50",
          pro: "Unlimited",
          elite: "Unlimited",
        },
        {
          name: "Watchlists",
          basic: "5",
          pro: "Unlimited",
          elite: "Unlimited",
        },
        {
          name: "Portfolio Tracking",
          basic: "3",
          pro: "Unlimited",
          elite: "Unlimited",
        },
        {
          name: "Advanced Charts",
          basic: false,
          pro: true,
          elite: true,
        },
        {
          name: "Custom Indicators",
          basic: false,
          pro: true,
          elite: true,
        },
      ],
    },
    {
      category: "Market Data",
      icon: Globe,
      items: [
        {
          name: "Real-time Data",
          basic: "Delayed 15min",
          pro: "Real-time",
          elite: "Real-time",
        },
        {
          name: "Historical Data",
          basic: "1 year",
          pro: "5 years",
          elite: "Unlimited",
        },
        {
          name: "Global Markets",
          basic: "US only",
          pro: "US + Europe",
          elite: "Worldwide",
        },
        {
          name: "After-hours Trading",
          basic: false,
          pro: true,
          elite: true,
        },
        {
          name: "Options Data",
          basic: false,
          pro: true,
          elite: true,
        },
      ],
    },
    {
      category: "Support & Features",
      icon: Users,
      items: [
        {
          name: "Support Level",
          basic: "Community",
          pro: "Priority Email",
          elite: "Dedicated Manager",
        },
        {
          name: "Response Time",
          basic: "48+ hours",
          pro: "4-8 hours",
          elite: "1 hour",
        },
        {
          name: "Phone Support",
          basic: false,
          pro: false,
          elite: true,
        },
        {
          name: "Training Sessions",
          basic: false,
          pro: false,
          elite: true,
        },
        {
          name: "Custom Integrations",
          basic: false,
          pro: false,
          elite: true,
        },
      ],
    },
  ];

  const handlePlanSelect = (planName: string) => {
    setSelectedPlan(planName);

    if (planName === "Basic") {
      // Redirect to payment with Basic plan details
      window.location.href =
        "/payment?plan=Basic&price=9.99&billing=monthly&source=pricing";
    } else if (planName === "Pro") {
      // Redirect to payment with Pro plan details
      window.location.href =
        "/payment?plan=Pro&price=29.99&billing=monthly&source=pricing";
    } else if (planName === "Elite") {
      // Redirect to payment with Elite plan details
      window.location.href =
        "/payment?plan=Elite&price=99.99&billing=monthly&source=pricing";
    }
  };

  const formatPrice = (monthly: number | null, annual: number | null) => {
    if (monthly === null) return "Custom";
    const price = isAnnual ? annual : monthly;
    return `$${price}`;
  };

  const getOriginalPrice = (plan: any) => {
    if (plan.monthlyPrice === null) return null;
    return isAnnual ? plan.originalAnnualPrice : plan.originalMonthlyPrice;
  };

  const getCurrentPrice = (plan: any) => {
    if (plan.monthlyPrice === null) return null;
    return isAnnual ? plan.annualPrice : plan.monthlyPrice;
  };

  const calculateSavings = (plan: any) => {
    if (plan.monthlyPrice === null) return 0;
    const original = getOriginalPrice(plan);
    const current = getCurrentPrice(plan);
    if (!original || !current) return 0;
    return Math.round(((original - current) / original) * 100);
  };

  return (
    <div className="min-h-screen bg-cyber-black cyber-grid">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyber-blue via-white to-cyber-purple bg-clip-text text-transparent mb-6">
            Choose Your Trading Plan
          </h1>
          <p className="text-xl text-cyber-blue/90 max-w-3xl mx-auto mb-8">
            Unlock the power of AI-driven stock predictions and take your
            trading to the next level
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center space-x-4 mb-8">
            <span
              className={cn(
                "text-sm",
                !isAnnual ? "text-white" : "text-white/60",
              )}
            >
              Monthly
            </span>
            <Switch
              checked={isAnnual}
              onCheckedChange={setIsAnnual}
              className="data-[state=checked]:bg-cyber-green"
            />
            <span
              className={cn(
                "text-sm",
                isAnnual ? "text-white" : "text-white/60",
              )}
            >
              Annual
            </span>
            <Badge className="bg-cyber-green/20 text-cyber-green border-cyber-green/30 ml-2">
              Save 20%
            </Badge>
          </div>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
          {plans.map((plan, index) => {
            const Icon = plan.icon;
            const currentPrice = getCurrentPrice(plan);
            const originalPrice = getOriginalPrice(plan);
            const savings = calculateSavings(plan);

            return (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={cn(
                  "relative",
                  plan.popular && "lg:scale-105 lg:z-10",
                )}
              >
                <Card
                  className={cn(
                    "p-8 bg-white/10 backdrop-blur-md border transition-all duration-300 hover:bg-white/15",
                    plan.popular
                      ? "border-cyber-blue bg-cyber-blue/10 ring-2 ring-cyber-blue/50 shadow-lg shadow-cyber-blue/25"
                      : "border-cyber-blue/20 hover:border-cyber-blue/40",
                  )}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-cyber-blue text-white px-4 py-2 text-sm font-semibold shadow-lg">
                        Most Popular
                      </Badge>
                    </div>
                  )}

                  <div className="text-center mb-8">
                    <div
                      className={`inline-flex p-4 rounded-2xl mb-4 bg-${plan.color}/20`}
                    >
                      <Icon className={`h-8 w-8 text-${plan.color}`} />
                    </div>

                    <h3 className="text-2xl font-bold text-white mb-2">
                      {plan.name}
                    </h3>
                    <p className="text-cyber-blue/80 mb-6">
                      {plan.description}
                    </p>

                    <div className="mb-6">
                      <div className="flex items-baseline justify-center mb-2">
                        {originalPrice && originalPrice !== currentPrice && (
                          <span className="text-lg text-white/50 line-through mr-2">
                            ${originalPrice}
                          </span>
                        )}
                        <span className="text-4xl font-bold bg-gradient-to-r from-cyber-blue to-cyber-purple bg-clip-text text-transparent">
                          {formatPrice(plan.monthlyPrice, plan.annualPrice)}
                        </span>
                        {currentPrice && (
                          <span className="text-white/70 ml-1">
                            /{isAnnual ? "year" : "month"}
                          </span>
                        )}
                      </div>

                      {savings > 0 && (
                        <Badge className="bg-cyber-green/20 text-cyber-green border-cyber-green/30">
                          Save {savings}%
                        </Badge>
                      )}
                    </div>

                    <p className="text-sm text-cyber-blue/60 mb-6">
                      {plan.highlight}
                    </p>
                  </div>

                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li
                        key={featureIndex}
                        className="flex items-center space-x-3"
                      >
                        <CheckCircle className="h-5 w-5 text-cyber-green flex-shrink-0" />
                        <span className="text-white/90 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {plan.limits.length > 0 && (
                    <>
                      <Separator className="my-6" />
                      <ul className="space-y-2 mb-8">
                        {plan.limits.map((limit, limitIndex) => (
                          <li
                            key={limitIndex}
                            className="flex items-center space-x-3"
                          >
                            <X className="h-4 w-4 text-red-400 flex-shrink-0" />
                            <span className="text-white/60 text-sm">
                              {limit}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </>
                  )}

                  <Button
                    onClick={() => handlePlanSelect(plan.name)}
                    className={cn(
                      "w-full py-3 rounded-2xl font-semibold transition-all duration-300 hover:scale-105",
                      plan.popular
                        ? "bg-gradient-to-r from-cyber-blue to-cyber-purple hover:from-cyber-blue-dark hover:to-cyber-purple-dark text-white shadow-lg shadow-cyber-blue/25"
                        : `bg-${plan.color}/20 border border-${plan.color}/30 text-${plan.color} hover:bg-${plan.color}/30`,
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
            <p className="text-cyber-blue/80 max-w-2xl mx-auto">
              See exactly what's included in each plan to make the best choice
              for your trading needs
            </p>
          </motion.div>

          <Card className="bg-white/10 backdrop-blur-md border border-cyber-blue/20 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="px-6 py-4 text-left">
                      <span className="text-lg font-bold text-white">
                        Features
                      </span>
                    </th>
                    <th className="px-6 py-4 text-center">
                      <div className="text-lg font-bold text-cyber-green">
                        Basic
                      </div>
                      <div className="text-sm text-gray-500">$9.99/month</div>
                    </th>
                    <th className="px-6 py-4 text-center bg-cyber-blue/10 border-l border-r border-cyber-blue/30">
                      <div className="text-lg font-bold text-cyber-blue flex items-center justify-center gap-2">
                        Pro
                        <Badge className="bg-cyber-blue text-white text-xs">
                          Popular
                        </Badge>
                      </div>
                      <div className="text-sm text-gray-500">$29.99/month</div>
                    </th>
                    <th className="px-6 py-4 text-center">
                      <div className="text-lg font-bold text-cyber-purple">
                        Elite
                      </div>
                      <div className="text-sm text-gray-500">$99.99/month</div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {features.map((category, categoryIndex) => (
                    <React.Fragment key={category.category}>
                      <tr className="border-b border-white/5">
                        <td colSpan={4} className="px-6 py-4">
                          <div className="flex items-center space-x-3">
                            <category.icon className="h-5 w-5 text-cyber-blue" />
                            <span className="font-semibold text-white text-lg">
                              {category.category}
                            </span>
                          </div>
                        </td>
                      </tr>
                      {category.items.map((item, itemIndex) => (
                        <tr
                          key={itemIndex}
                          className="border-b border-white/5 hover:bg-white/5"
                        >
                          <td className="px-6 py-4">
                            <span className="text-white font-medium">
                              {item.name}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-center text-gray-600">
                            {typeof item.basic === "boolean" ? (
                              item.basic ? (
                                <CheckCircle className="h-5 w-5 text-cyber-green mx-auto" />
                              ) : (
                                <X className="h-5 w-5 text-gray-400 mx-auto" />
                              )
                            ) : (
                              <span className="text-sm">{item.basic}</span>
                            )}
                          </td>
                          <td className="px-6 py-4 text-center text-gray-600 bg-cyber-blue/5">
                            {typeof item.pro === "boolean" ? (
                              item.pro ? (
                                <CheckCircle className="h-5 w-5 text-cyber-green mx-auto" />
                              ) : (
                                <X className="h-5 w-5 text-gray-400 mx-auto" />
                              )
                            ) : (
                              <span className="text-sm font-medium text-cyber-blue">
                                {item.pro}
                              </span>
                            )}
                          </td>
                          <td className="px-6 py-4 text-center text-gray-600">
                            {typeof item.elite === "boolean" ? (
                              item.elite ? (
                                <CheckCircle className="h-5 w-5 text-cyber-green mx-auto" />
                              ) : (
                                <X className="h-5 w-5 text-gray-400 mx-auto" />
                              )
                            ) : (
                              <span className="text-sm">{item.elite}</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </section>

        {/* Contact Options */}
        {showContactOptions && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <Card className="bg-cyber-dark border border-cyber-blue/30 p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-white">
                  Contact Our Sales Team
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {contactOptions.map((option, index) => {
                  const Icon = option.icon;
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card className="p-6 bg-white/5 border border-cyber-blue/20 hover:border-cyber-blue/40 transition-all duration-300 group relative">
                        {option.popular && (
                          <Badge className="absolute -top-2 -right-2 bg-cyber-green text-white text-xs">
                            Recommended
                          </Badge>
                        )}

                        <div className="flex items-center space-x-3 mb-4">
                          <div
                            className={`p-3 bg-${option.color}/20 rounded-xl`}
                          >
                            <Icon className={`h-6 w-6 text-${option.color}`} />
                          </div>
                          <div>
                            <h4 className="text-lg font-semibold text-white">
                              {option.title}
                            </h4>
                            <p className="text-cyber-blue/70 text-sm">
                              {option.availability}
                            </p>
                          </div>
                        </div>

                        <p className="text-white/80 mb-4">
                          {option.description}
                        </p>
                        <p className="text-cyber-blue/60 text-sm mb-6">
                          {option.responseTime}
                        </p>

                        <Button
                          onClick={option.action}
                          className={cn(
                            "w-full text-white transition-all duration-300",
                            option.buttonColor,
                          )}
                        >
                          {option.buttonText}
                        </Button>
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
            </Card>
          </motion.div>
        )}

        {/* FAQ Section */}
        <section className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-white mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-cyber-blue/80 max-w-2xl mx-auto">
              Get answers to common questions about our pricing and features
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-6">
              {[
                {
                  question: "Can I switch between plans anytime?",
                  answer:
                    "Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately for upgrades, or at the next billing cycle for downgrades.",
                },
                {
                  question: "Is there a free trial available?",
                  answer:
                    "We offer a 14-day free trial for Pro and Elite plans. No credit card required to start your trial.",
                },
                {
                  question: "What payment methods do you accept?",
                  answer:
                    "We accept all major credit cards, PayPal, and bank transfers for annual plans. Enterprise customers can also pay via wire transfer.",
                },
                {
                  question: "Do you offer refunds?",
                  answer:
                    "Yes, we offer a 30-day money-back guarantee for all paid plans. If you're not satisfied, contact our support team for a full refund.",
                },
                {
                  question: "How accurate are the AI predictions?",
                  answer:
                    "Our AI models achieve 85-92% accuracy across different market conditions. Pro and Elite plans include confidence intervals and risk assessments for each prediction.",
                },
              ].map((faq, index) => (
                <Card
                  key={index}
                  className="p-6 bg-white/10 backdrop-blur-md border border-cyber-blue/20"
                >
                  <h3 className="text-lg font-semibold text-white mb-3">
                    {faq.question}
                  </h3>
                  <p className="text-cyber-blue/80">{faq.answer}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-r from-cyber-blue/20 to-cyber-purple/20 border border-cyber-blue/30 rounded-3xl p-12 max-w-4xl mx-auto"
          >
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Start Trading Smarter?
            </h2>
            <p className="text-cyber-blue/80 text-lg mb-8 max-w-2xl mx-auto">
              Join thousands of successful traders who trust StockVision's AI
              predictions to make better investment decisions.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => handlePlanSelect("Pro")}
                size="lg"
                className="bg-gradient-to-r from-cyber-blue to-cyber-purple hover:from-cyber-blue-dark hover:to-cyber-purple-dark text-white px-8 py-4 text-lg"
              >
                <Star className="mr-2 h-5 w-5" />
                Start Pro Trial
              </Button>
              <Button
                onClick={() => setShowContactOptions(true)}
                variant="outline"
                size="lg"
                className="border-cyber-blue/30 text-cyber-blue hover:bg-cyber-blue/10 px-8 py-4 text-lg"
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                Talk to Sales
              </Button>
            </div>

            <p className="text-cyber-blue/60 text-sm mt-6">
              No credit card required • 30-day money-back guarantee
            </p>
          </motion.div>
        </section>
      </div>
    </div>
  );
};

export default Pricing;
