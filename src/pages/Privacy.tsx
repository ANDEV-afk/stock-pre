import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { Shield, Lock, Eye, Users, Database, Globe } from "lucide-react";

const Privacy = () => {
  const sections = [
    {
      title: "Information We Collect",
      icon: Database,
      content: [
        "Account information (name, email, phone number)",
        "Trading preferences and portfolio data",
        "Usage analytics and platform interactions",
        "Device and browser information",
        "Location data (with your consent)",
      ],
    },
    {
      title: "How We Use Your Information",
      icon: Eye,
      content: [
        "Provide and improve our trading platform",
        "Generate personalized AI predictions",
        "Send important account and security notifications",
        "Analyze usage patterns to enhance user experience",
        "Comply with legal and regulatory requirements",
      ],
    },
    {
      title: "Information Sharing",
      icon: Users,
      content: [
        "We never sell your personal data to third parties",
        "Limited sharing with service providers under strict contracts",
        "Legal disclosures when required by law enforcement",
        "Anonymized data for research and development",
        "Your explicit consent for any other sharing",
      ],
    },
    {
      title: "Data Security",
      icon: Shield,
      content: [
        "Bank-grade 256-bit SSL encryption",
        "Multi-factor authentication for all accounts",
        "Regular security audits and penetration testing",
        "Secure cloud infrastructure with AWS/Google Cloud",
        "24/7 monitoring for suspicious activities",
      ],
    },
    {
      title: "Your Privacy Rights",
      icon: Lock,
      content: [
        "Access your personal data at any time",
        "Request correction of inaccurate information",
        "Delete your account and associated data",
        "Opt-out of non-essential communications",
        "Control data sharing preferences",
      ],
    },
    {
      title: "International Compliance",
      icon: Globe,
      content: [
        "GDPR compliance for European users",
        "CCPA compliance for California residents",
        "SOC 2 Type II certified infrastructure",
        "Regular compliance audits and certifications",
        "Transparent privacy practices globally",
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
            Privacy Policy
          </h1>
          <p className="text-xl text-cyber-blue/80 max-w-3xl mx-auto mb-6">
            Your privacy is our priority. Learn how we collect, use, and protect
            your data.
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
              Our Commitment to Privacy
            </h2>
            <p className="text-white/80 leading-relaxed">
              At StockVision, we understand that trust is the foundation of our
              relationship with you. This Privacy Policy explains how we
              collect, use, protect, and share your information when you use our
              AI-powered trading platform. We are committed to maintaining the
              highest standards of data protection and transparency.
            </p>
          </Card>
        </motion.div>

        {/* Privacy Sections */}
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

        {/* Contact Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="mt-16"
        >
          <Card className="p-8 bg-white/10 backdrop-blur-md border border-cyber-purple/20">
            <h2 className="text-2xl font-bold text-white mb-4">
              Questions About Privacy?
            </h2>
            <p className="text-white/80 mb-6">
              If you have any questions about this Privacy Policy or how we
              handle your data, please don't hesitate to contact us. We're here
              to help and ensure your privacy concerns are addressed.
            </p>
            <div className="space-y-2 text-white/80">
              <p>
                <strong>Email:</strong> privacy@stockvision.com
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

export default Privacy;
