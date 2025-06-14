import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import GlobalAnimatedBackground from "@/components/GlobalAnimatedBackground";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Shield,
  Lock,
  Eye,
  Database,
  Settings,
  Users,
  FileText,
  AlertCircle,
  CheckCircle,
  Mail,
} from "lucide-react";

const Privacy = () => {
  const sections = [
    {
      title: "Information We Collect",
      icon: Database,
      content: [
        "Account information (name, email, preferences)",
        "Trading and portfolio data you choose to share",
        "Usage analytics to improve our services",
        "Device and browser information for security",
      ],
    },
    {
      title: "How We Use Your Data",
      icon: Settings,
      content: [
        "Provide personalized stock analysis and recommendations",
        "Send important account and market alerts",
        "Improve our AI algorithms and user experience",
        "Ensure platform security and prevent fraud",
      ],
    },
    {
      title: "Data Protection",
      icon: Shield,
      content: [
        "End-to-end encryption for all sensitive data",
        "Regular security audits and penetration testing",
        "SOC 2 Type II compliance certification",
        "Zero-knowledge architecture for portfolio data",
      ],
    },
    {
      title: "Your Rights",
      icon: Users,
      content: [
        "Access and download your personal data",
        "Request correction of inaccurate information",
        "Delete your account and associated data",
        "Opt-out of non-essential communications",
      ],
    },
  ];

  return (
    <GlobalAnimatedBackground variant="minimal">
      <Navigation />

      <div className="min-h-screen pt-20 pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <Badge className="mb-4 bg-cyber-purple/20 text-cyber-purple border-cyber-purple/30">
              Privacy Policy
            </Badge>
            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Your Privacy
              <span className="bg-gradient-to-r from-cyber-purple to-cyber-blue bg-clip-text text-transparent">
                {" "}
                Matters
              </span>
            </h1>
            <p className="text-xl text-white/70 max-w-2xl mx-auto mb-6">
              We're committed to protecting your personal information and being
              transparent about how we collect, use, and safeguard your data.
            </p>
            <div className="flex items-center justify-center space-x-2 text-cyber-green">
              <CheckCircle className="h-5 w-5" />
              <span className="text-sm">Last updated: December 2024</span>
            </div>
          </motion.div>

          {/* Key Principles */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid md:grid-cols-3 gap-6 mb-12"
          >
            <Card className="bg-cyber-dark/50 border-cyber-blue/20 p-6 text-center">
              <CardContent className="p-0">
                <Lock className="h-8 w-8 text-cyber-blue mx-auto mb-4" />
                <h3 className="text-white font-semibold mb-2">
                  Data Minimization
                </h3>
                <p className="text-white/60 text-sm">
                  We only collect data that's necessary for our services
                </p>
              </CardContent>
            </Card>

            <Card className="bg-cyber-dark/50 border-cyber-green/20 p-6 text-center">
              <CardContent className="p-0">
                <Eye className="h-8 w-8 text-cyber-green mx-auto mb-4" />
                <h3 className="text-white font-semibold mb-2">Transparency</h3>
                <p className="text-white/60 text-sm">
                  Clear communication about our data practices
                </p>
              </CardContent>
            </Card>

            <Card className="bg-cyber-dark/50 border-cyber-purple/20 p-6 text-center">
              <CardContent className="p-0">
                <Shield className="h-8 w-8 text-cyber-purple mx-auto mb-4" />
                <h3 className="text-white font-semibold mb-2">
                  Security First
                </h3>
                <p className="text-white/60 text-sm">
                  Bank-grade encryption and security measures
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Main Sections */}
          <div className="space-y-8 mb-12">
            {sections.map((section, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
              >
                <Card className="bg-cyber-dark/50 border-cyber-blue/20">
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-cyber-blue/20 rounded-lg">
                        <section.icon className="h-5 w-5 text-cyber-blue" />
                      </div>
                      <CardTitle className="text-white">
                        {section.title}
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {section.content.map((item, itemIndex) => (
                        <li
                          key={itemIndex}
                          className="flex items-start space-x-3"
                        >
                          <CheckCircle className="h-4 w-4 text-cyber-green mt-0.5 flex-shrink-0" />
                          <span className="text-white/70">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Data Retention */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mb-12"
          >
            <Card className="bg-gradient-to-r from-cyber-yellow/10 to-cyber-orange/10 border-cyber-yellow/30">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <AlertCircle className="h-6 w-6 text-cyber-yellow" />
                  <CardTitle className="text-white">Data Retention</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-white/70 mb-4">
                  We retain your personal data only as long as necessary for the
                  purposes outlined in this policy:
                </p>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-white font-semibold mb-2">
                      Account Data
                    </h4>
                    <p className="text-white/60 text-sm">
                      Retained while your account is active, plus 7 years for
                      regulatory compliance
                    </p>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-2">
                      Usage Analytics
                    </h4>
                    <p className="text-white/60 text-sm">
                      Anonymized and aggregated data may be retained
                      indefinitely for product improvement
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="text-center"
          >
            <Card className="bg-cyber-dark/50 border-cyber-blue/20 p-8">
              <CardContent className="p-0">
                <Mail className="h-12 w-12 text-cyber-blue mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-white mb-4">
                  Questions About Privacy?
                </h3>
                <p className="text-white/70 mb-6 max-w-2xl mx-auto">
                  Our Data Protection Officer is here to help with any questions
                  about how we handle your data.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button className="bg-cyber-blue hover:bg-cyber-blue/80 text-white">
                    Contact Privacy Team
                  </Button>
                  <Button
                    variant="outline"
                    className="border-cyber-purple/30 text-cyber-purple hover:bg-cyber-purple/10"
                  >
                    <FileText className="h-4 w-4 mr-2" />
                    Download Full Policy
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </GlobalAnimatedBackground>
  );
};

export default Privacy;
