import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import {
  FileText,
  Scale,
  AlertTriangle,
  Shield,
  Gavel,
  Users,
} from "lucide-react";

const Terms = () => {
  const sections = [
    {
      title: "Acceptance of Terms",
      icon: FileText,
      content: [
        "By accessing StockVision, you agree to be bound by these Terms of Service",
        "These terms apply to all users, including browsers and registered traders",
        "If you disagree with any part of these terms, you may not use our service",
        "We reserve the right to update these terms at any time with notice",
      ],
    },
    {
      title: "Service Description",
      icon: Users,
      content: [
        "StockVision provides AI-powered stock analysis and trading tools",
        "Our predictions are for informational purposes only, not financial advice",
        "Trading involves substantial risk of loss and is not suitable for all investors",
        "Past performance does not guarantee future results",
        "We do not provide personalized investment recommendations",
      ],
    },
    {
      title: "User Responsibilities",
      icon: Scale,
      content: [
        "You must be at least 18 years old to use our platform",
        "Provide accurate and complete information when creating an account",
        "Keep your login credentials secure and confidential",
        "Comply with all applicable laws and regulations",
        "Use the platform only for lawful purposes",
        "Not attempt to reverse engineer or hack our systems",
      ],
    },
    {
      title: "Investment Risks & Disclaimers",
      icon: AlertTriangle,
      content: [
        "All investments carry risk of substantial losses",
        "AI predictions are based on historical data and may not be accurate",
        "Market conditions can change rapidly and unpredictably",
        "You are solely responsible for your trading decisions",
        "Consult with qualified financial advisors before making investments",
        "StockVision is not liable for any trading losses",
      ],
    },
    {
      title: "Intellectual Property",
      icon: Shield,
      content: [
        "All content and technology on StockVision is our proprietary property",
        "You may not copy, modify, or distribute our AI algorithms",
        "User-generated content remains your property but grants us usage rights",
        "Respect third-party intellectual property rights",
        "Report any suspected IP violations to us immediately",
      ],
    },
    {
      title: "Limitation of Liability",
      icon: Gavel,
      content: [
        "StockVision provides the platform 'as is' without warranties",
        "We are not liable for direct, indirect, or consequential damages",
        "Maximum liability is limited to the amount paid for our services",
        "We do not guarantee uninterrupted or error-free service",
        "Force majeure events release us from liability obligations",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-cyber-black cyber-grid">
      <Navigation />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-cyber-blue via-white to-cyber-purple bg-clip-text text-transparent mb-6">
            Terms of Service
          </h1>
          <p className="text-xl text-cyber-blue/80 max-w-3xl mx-auto mb-6">
            Please read these terms carefully before using the StockVision
            platform.
          </p>
          <p className="text-sm text-white/60">
            Last updated: January 15, 2024
          </p>
        </motion.div>

        {/* Introduction */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-12"
        >
          <Card className="p-8 bg-white/10 backdrop-blur-md border border-cyber-blue/20">
            <h2 className="text-2xl font-bold text-white mb-4">
              Agreement Overview
            </h2>
            <p className="text-white/80 leading-relaxed">
              These Terms of Service ("Terms") govern your use of the
              StockVision platform and services. By creating an account or using
              our platform, you enter into a legally binding agreement with us.
              These terms are designed to protect both you and StockVision while
              ensuring a safe and compliant trading environment.
            </p>
          </Card>
        </motion.div>

        {/* Terms Sections */}
        <div className="space-y-8">
          {sections.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
            >
              <Card className="p-8 bg-white/10 backdrop-blur-md border border-cyber-blue/20 hover:border-cyber-blue/40 transition-all duration-300">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="p-3 bg-cyber-blue/20 rounded-xl">
                    <section.icon className="h-6 w-6 text-cyber-blue" />
                  </div>
                  <h2 className="text-2xl font-bold text-white">
                    {section.title}
                  </h2>
                </div>

                <ul className="space-y-3">
                  {section.content.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-cyber-blue rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-white/80">{item}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Important Notice */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="mt-16"
        >
          <Card className="p-8 bg-gradient-to-r from-red-500/10 to-orange-500/10 border border-red-500/20">
            <div className="flex items-center space-x-3 mb-4">
              <AlertTriangle className="h-6 w-6 text-red-400" />
              <h2 className="text-2xl font-bold text-white">
                Important Risk Disclosure
              </h2>
            </div>
            <p className="text-white/80 mb-4">
              <strong>
                Trading stocks involves substantial risk and may not be suitable
                for all investors.
              </strong>
              You could lose some or all of your investment. Past performance
              does not guarantee future results. Our AI predictions are based on
              historical data and algorithms that may not accurately predict
              future market movements.
            </p>
            <p className="text-white/80">
              Before trading, carefully consider your investment objectives,
              experience level, and risk tolerance. Only invest money you can
              afford to lose. If you have any doubts, consult with an
              independent financial advisor.
            </p>
          </Card>
        </motion.div>

        {/* Contact Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4 }}
          className="mt-8"
        >
          <Card className="p-8 bg-white/10 backdrop-blur-md border border-cyber-purple/20">
            <h2 className="text-2xl font-bold text-white mb-4">
              Questions About These Terms?
            </h2>
            <p className="text-white/80 mb-6">
              If you have any questions about these Terms of Service or need
              clarification on any provision, please contact our legal team.
              We're committed to maintaining transparent and fair terms of
              service.
            </p>
            <div className="space-y-2 text-white/80">
              <p>
                <strong>Email:</strong> legal@stockvision.com
              </p>
              <p>
                <strong>Phone:</strong> +1 (555) 123-4567
              </p>
              <p>
                <strong>Address:</strong> 123 Financial District, New York, NY
                10004
              </p>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Terms;
