import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
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
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero Section */}
      <HeroSection />

      {/* Benefits Section */}
      <section className="py-24 bg-apple-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-apple-gray-700 mb-6">
              Why Choose StockVision?
            </h2>
            <p className="text-xl text-apple-gray-500 max-w-3xl mx-auto">
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
                  className="bg-white rounded-3xl p-8 shadow-apple hover:shadow-apple-lg transition-all duration-300"
                >
                  <div className="bg-gradient-to-br from-apple-blue to-apple-purple p-4 rounded-2xl w-fit mb-6">
                    <Icon className="h-8 w-8 text-white" />
                  </div>

                  <h3 className="text-2xl font-bold text-apple-gray-700 mb-4">
                    {benefit.title}
                  </h3>

                  <p className="text-apple-gray-500 mb-6 leading-relaxed">
                    {benefit.description}
                  </p>

                  <ul className="space-y-3">
                    {benefit.features.map((feature, featureIndex) => (
                      <li
                        key={featureIndex}
                        className="flex items-center space-x-3"
                      >
                        <CheckCircle className="h-5 w-5 text-apple-green flex-shrink-0" />
                        <span className="text-apple-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-apple-gray-700 mb-6">
              Trusted by Traders Worldwide
            </h2>
            <p className="text-xl text-apple-gray-500 max-w-3xl mx-auto">
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
                className="bg-apple-gray-50 rounded-3xl p-8 hover:shadow-apple transition-all duration-300"
              >
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-5 w-5 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>

                <p className="text-apple-gray-600 mb-6 leading-relaxed italic">
                  "{testimonial.text}"
                </p>

                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-apple-blue to-apple-purple rounded-xl flex items-center justify-center">
                    <span className="text-white font-bold">
                      {testimonial.avatar}
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold text-apple-gray-700">
                      {testimonial.name}
                    </p>
                    <p className="text-sm text-apple-gray-500">
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
      <section className="py-24 bg-apple-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-apple-gray-700 mb-6">
              Choose Your Plan
            </h2>
            <p className="text-xl text-apple-gray-500 max-w-3xl mx-auto">
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
                className={`relative bg-white rounded-3xl p-8 shadow-apple hover:shadow-apple-lg transition-all duration-300 ${
                  plan.popular ? "ring-2 ring-apple-blue scale-105" : ""
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-apple-blue text-white px-4 py-2 rounded-xl text-sm font-semibold">
                      Most Popular
                    </div>
                  </div>
                )}

                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-apple-gray-700 mb-2">
                    {plan.name}
                  </h3>
                  <p className="text-apple-gray-500 mb-4">{plan.description}</p>
                  <div className="mb-4">
                    <span className="text-4xl font-bold text-apple-gray-700">
                      {plan.price}
                    </span>
                    {plan.price !== "Free" && plan.price !== "Custom" && (
                      <span className="text-apple-gray-500">/month</span>
                    )}
                  </div>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li
                      key={featureIndex}
                      className="flex items-center space-x-3"
                    >
                      <CheckCircle className="h-5 w-5 text-apple-green flex-shrink-0" />
                      <span className="text-apple-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link to="/register">
                  <Button
                    className={`w-full py-3 rounded-2xl font-semibold transition-all duration-200 ${
                      plan.popular
                        ? "bg-apple-blue hover:bg-apple-blue-dark text-white shadow-apple"
                        : "bg-apple-gray-100 hover:bg-apple-gray-200 text-apple-gray-700"
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
      <section className="py-24 bg-gradient-to-br from-apple-blue to-apple-purple">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Transform Your Trading?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Join thousands of successful traders who trust StockVision for
              their investment decisions.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register">
                <Button
                  size="lg"
                  className="bg-white text-apple-blue hover:bg-apple-gray-100 px-8 py-4 text-lg font-semibold rounded-2xl shadow-apple-lg transition-all duration-300"
                >
                  <Zap className="mr-2 h-5 w-5" />
                  Start Free Trial
                </Button>
              </Link>

              <Link to="/predict">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-2 border-white text-white hover:bg-white hover:text-apple-blue px-8 py-4 text-lg font-semibold rounded-2xl transition-all duration-300"
                >
                  Try Demo
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-apple-gray-700 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="bg-gradient-to-br from-apple-blue to-apple-purple p-2 rounded-xl">
                  <Brain className="h-6 w-6 text-white" />
                </div>
                <span className="text-2xl font-bold">StockVision</span>
              </div>
              <p className="text-apple-gray-300 mb-4 max-w-md">
                Empowering traders with AI-driven stock predictions and
                real-time market insights.
              </p>
              <p className="text-sm text-apple-gray-400">
                © 2024 StockVision. All rights reserved.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-apple-gray-300">
                <li>
                  <Link
                    to="/features"
                    className="hover:text-white transition-colors"
                  >
                    Features
                  </Link>
                </li>
                <li>
                  <Link
                    to="/pricing"
                    className="hover:text-white transition-colors"
                  >
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link
                    to="/api"
                    className="hover:text-white transition-colors"
                  >
                    API
                  </Link>
                </li>
                <li>
                  <Link
                    to="/support"
                    className="hover:text-white transition-colors"
                  >
                    Support
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-apple-gray-300">
                <li>
                  <Link
                    to="/about"
                    className="hover:text-white transition-colors"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    to="/careers"
                    className="hover:text-white transition-colors"
                  >
                    Careers
                  </Link>
                </li>
                <li>
                  <Link
                    to="/privacy"
                    className="hover:text-white transition-colors"
                  >
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link
                    to="/terms"
                    className="hover:text-white transition-colors"
                  >
                    Terms
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
