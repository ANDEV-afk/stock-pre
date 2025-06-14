import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  MessageCircle,
  Github,
  Youtube,
  Twitter,
  Headphones,
  Video,
  MessageSquare,
  Users,
  ExternalLink,
  ArrowUpRight,
  X,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";

const CommunityLinks = () => {
  const [showDemoModal, setShowDemoModal] = useState(false);

  const communityPlatforms = [
    {
      name: "Discord",
      description: "Real-time chat",
      icon: MessageCircle,
      color: "bg-indigo-600 hover:bg-indigo-700",
      borderColor: "border-indigo-500/50",
      textColor: "text-indigo-400",
      hoverBg: "hover:bg-indigo-500/10",
      url: "https://discord.gg/stockvision",
      members: "12.5K",
    },
    {
      name: "Twitter",
      description: "Latest updates",
      icon: Twitter,
      color: "bg-blue-600 hover:bg-blue-700",
      borderColor: "border-blue-500/50",
      textColor: "text-blue-400",
      hoverBg: "hover:bg-blue-500/10",
      url: "https://twitter.com/stockvision_ai",
      members: "45K",
    },
    {
      name: "GitHub",
      description: "Open source",
      icon: Github,
      color: "bg-gray-600 hover:bg-gray-700",
      borderColor: "border-gray-500/50",
      textColor: "text-gray-400",
      hoverBg: "hover:bg-gray-500/10",
      url: "https://github.com/stockvision-ai",
      members: "8.2K",
    },
    {
      name: "YouTube",
      description: "Video tutorials",
      icon: Youtube,
      color: "bg-red-600 hover:bg-red-700",
      borderColor: "border-red-500/50",
      textColor: "text-red-400",
      hoverBg: "hover:bg-red-500/10",
      url: "https://youtube.com/@stockvision-ai",
      members: "156K",
    },
  ];

  const actionButtons = [
    {
      title: "Get in Touch",
      description: "Contact our support team",
      icon: Headphones,
      variant: "primary",
      action: () => {
        // Create a comprehensive contact form
        const message = `Hello StockVision Support Team,

I am interested in learning more about your platform and would like to discuss:

- AI-powered stock predictions
- Real-time market data
- Portfolio management tools
- Integration options

Please reach out to me at your earliest convenience.

Best regards`;

        const subject = "General Inquiry - StockVision Platform";
        const mailtoUrl = `mailto:support@stockvision.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
        window.open(mailtoUrl, "_blank");
      },
    },
    {
      title: "Contact Sales",
      description: "Speak with our sales team",
      icon: MessageSquare,
      variant: "secondary",
      action: () => {
        // Create a sales-focused contact form
        const message = `Hello StockVision Sales Team,

I am interested in discussing StockVision for my trading/business needs:

- Company/Organization: [Your Company]
- Trading Volume: [Approximate monthly volume]
- Team Size: [Number of traders/users]
- Key Requirements:
  • Advanced AI predictions
  • Real-time data feeds
  • API integration
  • Custom dashboard solutions

I would like to schedule a call to discuss pricing and implementation.

Looking forward to hearing from you.

Best regards`;

        const subject = "Sales Inquiry - StockVision Enterprise Solutions";
        const mailtoUrl = `mailto:sales@stockvision.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
        window.open(mailtoUrl, "_blank");
      },
    },
    {
      title: "Book a Demo",
      description: "Schedule a personalized demo",
      icon: Video,
      variant: "outline",
      action: () => setShowDemoModal(true),
    },
  ];

  const handleCommunityClick = (platform: any) => {
    // Show demo modal for any community platform
    setShowDemoModal(true);
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <Card className="p-8 bg-white/10 backdrop-blur-md border border-cyber-blue/20 max-w-4xl mx-auto">
          <div className="mb-8">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-cyber-blue via-white to-cyber-purple bg-clip-text text-transparent mb-4">
              Join Our Community
            </h2>
            <p className="text-cyber-blue/80 max-w-2xl mx-auto mb-8">
              Connect with 250K+ traders, share strategies, get real-time
              support, and access exclusive content across all our platforms.
            </p>
          </div>

          {/* Community Platforms - Matching the exact layout from the image */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {communityPlatforms.map((platform, index) => {
              const Icon = platform.icon;
              return (
                <motion.div
                  key={platform.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    className={cn(
                      "bg-black border h-16 w-full flex items-center justify-start space-x-4 px-6",
                      platform.borderColor,
                      platform.textColor,
                      platform.hoverBg,
                      "transition-all duration-300 group",
                    )}
                    onClick={() => handleCommunityClick(platform)}
                  >
                    <Icon className="h-6 w-6 flex-shrink-0" />
                    <div className="text-left flex-1">
                      <div className="font-semibold text-white group-hover:text-white">
                        {platform.name}
                      </div>
                      <div className="text-sm opacity-80">
                        {platform.description}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs opacity-60">
                        {platform.members}
                      </div>
                      <ExternalLink className="h-3 w-3 opacity-60 group-hover:opacity-100" />
                    </div>
                  </Button>
                </motion.div>
              );
            })}
          </div>

          {/* Action Buttons - Exactly as shown in the image */}
          <div className="flex flex-col space-y-3 max-w-md mx-auto">
            {actionButtons.map((button, index) => {
              const Icon = button.icon;
              return (
                <motion.div
                  key={button.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    onClick={button.action}
                    className={cn(
                      "w-full h-12 flex items-center justify-center space-x-3 rounded-xl font-semibold",
                      button.variant === "primary" &&
                        "bg-cyber-blue hover:bg-cyber-blue-dark text-white",
                      button.variant === "secondary" &&
                        "bg-cyber-green hover:bg-cyber-green-dark text-white",
                      button.variant === "outline" &&
                        "bg-black border border-cyber-blue/50 text-cyber-blue hover:bg-cyber-blue/10",
                    )}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{button.title}</span>
                  </Button>
                </motion.div>
              );
            })}
          </div>

          {/* Community Stats */}
          <div className="mt-8 pt-6 border-t border-white/10">
            <div className="grid grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-cyber-blue">250K+</div>
                <div className="text-xs text-white/60">Members</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-cyber-green">2.5K</div>
                <div className="text-xs text-white/60">Online Now</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-cyber-purple">50K+</div>
                <div className="text-xs text-white/60">Discussions</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-cyber-yellow">15K+</div>
                <div className="text-xs text-white/60">Daily Messages</div>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Demo Modal */}
      <AnimatePresence>
        {showDemoModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowDemoModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-cyber-dark border border-cyber-blue/30 rounded-3xl p-8 max-w-2xl w-full shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-cyber-blue/20 rounded-xl">
                    <Video className="h-6 w-6 text-cyber-blue" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">
                      Demo Experience
                    </h3>
                    <p className="text-cyber-blue/80">
                      Explore our platform features
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowDemoModal(false)}
                  className="text-white/70 hover:text-white"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="p-4 bg-white/5 border border-cyber-green/20 rounded-xl cursor-pointer"
                    onClick={() => (window.location.href = "/dashboard")}
                  >
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="p-2 bg-cyber-green/20 rounded-lg">
                        <Zap className="h-5 w-5 text-cyber-green" />
                      </div>
                      <h4 className="font-semibold text-white">
                        Live Trading Demo
                      </h4>
                    </div>
                    <p className="text-sm text-white/70 mb-3">
                      Experience our real-time trading dashboard with live
                      market data and AI predictions.
                    </p>
                    <Button
                      size="sm"
                      className="bg-cyber-green hover:bg-cyber-green-dark text-white w-full"
                    >
                      Try Dashboard
                    </Button>
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="p-4 bg-white/5 border border-cyber-purple/20 rounded-xl cursor-pointer"
                    onClick={() => (window.location.href = "/api")}
                  >
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="p-2 bg-cyber-purple/20 rounded-lg">
                        <Users className="h-5 w-5 text-cyber-purple" />
                      </div>
                      <h4 className="font-semibold text-white">
                        API Playground
                      </h4>
                    </div>
                    <p className="text-sm text-white/70 mb-3">
                      Test our powerful APIs with live data and see integration
                      examples.
                    </p>
                    <Button
                      size="sm"
                      className="bg-cyber-purple hover:bg-cyber-purple-dark text-white w-full"
                    >
                      Explore API
                    </Button>
                  </motion.div>
                </div>

                <div className="p-4 bg-cyber-blue/10 border border-cyber-blue/20 rounded-xl">
                  <h4 className="font-semibold text-white mb-2 flex items-center">
                    <Video className="h-4 w-4 mr-2" />
                    Schedule Personal Demo
                  </h4>
                  <p className="text-sm text-white/70 mb-3">
                    Book a one-on-one demo with our team to see how StockVision
                    can transform your trading experience.
                  </p>
                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      className="bg-cyber-blue hover:bg-cyber-blue-dark text-white flex-1"
                      onClick={() =>
                        window.open(
                          "https://calendly.com/stockvision-demo",
                          "_blank",
                        )
                      }
                    >
                      Book 30min Demo
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-cyber-blue/30 text-cyber-blue hover:bg-cyber-blue/10"
                      onClick={() =>
                        window.open("mailto:demo@stockvision.com", "_blank")
                      }
                    >
                      Email Us
                    </Button>
                  </div>
                </div>

                <div className="text-center pt-4 border-t border-white/10">
                  <p className="text-sm text-white/60 mb-3">
                    Join 250K+ traders who trust StockVision for their trading
                    decisions
                  </p>
                  <div className="flex justify-center space-x-6 text-xs text-white/50">
                    <span>✓ Real-time market data</span>
                    <span>✓ AI-powered predictions</span>
                    <span>✓ Advanced analytics</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default CommunityLinks;
