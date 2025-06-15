import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  Github,
  Twitter,
  Linkedin,
  Mail,
  ExternalLink,
  Shield,
  FileText,
  HelpCircle,
  MessageCircle,
  Code,
  Zap,
  Globe,
  Cpu,
  Database,
  BarChart3,
  TrendingUp,
  Activity,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface DashboardFooterProps {
  className?: string;
}

const DashboardFooter = ({ className }: DashboardFooterProps) => {
  const currentYear = new Date().getFullYear();
  const appVersion = "v2.1.0";
  const buildNumber = "20241215.1";

  const navigationLinks = [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Markets", href: "/global-markets" },
    { label: "Analysis", href: "/technical-analysis" },
    { label: "News", href: "/news" },
    { label: "API", href: "/api" },
  ];

  const companyLinks = [
    { label: "About Us", href: "/about" },
    { label: "Features", href: "/features" },
    { label: "Pricing", href: "/pricing" },
    { label: "Careers", href: "/careers" },
    { label: "Contact", href: "/contact" },
  ];

  const legalLinks = [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Cookie Policy", href: "/cookies" },
    { label: "Disclaimer", href: "/disclaimer" },
  ];

  const supportLinks = [
    { label: "Help Center", href: "/help", icon: HelpCircle },
    { label: "Community", href: "/community", icon: MessageCircle },
    { label: "API Docs", href: "/api-docs", icon: Code },
    { label: "Status", href: "/status", icon: Activity },
  ];

  const socialLinks = [
    { label: "GitHub", href: "https://github.com", icon: Github },
    { label: "Twitter", href: "https://twitter.com", icon: Twitter },
    { label: "LinkedIn", href: "https://linkedin.com", icon: Linkedin },
    { label: "Email", href: "mailto:support@fusion.trading", icon: Mail },
  ];

  const features = [
    { icon: BarChart3, label: "Real-time Analytics" },
    { icon: TrendingUp, label: "Advanced Charts" },
    { icon: Zap, label: "Lightning Fast" },
    { icon: Shield, label: "Enterprise Security" },
    { icon: Database, label: "Big Data Processing" },
    { icon: Cpu, label: "AI-Powered Insights" },
  ];

  return (
    <motion.footer
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={cn(
        "mt-16 border-t border-cyber-blue/20 bg-gradient-to-b from-black/40 to-black/80 backdrop-blur-xl",
        className,
      )}
    >
      {/* Main Footer Content */}
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2 space-y-6"
          >
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="w-10 h-10 bg-gradient-to-br from-cyber-blue to-cyber-purple rounded-xl flex items-center justify-center">
                    <TrendingUp className="h-6 w-6 text-white" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-cyber-green rounded-full animate-pulse" />
                </div>
                <div>
                  <h3 className="text-xl font-bold bg-gradient-to-r from-cyber-blue via-white to-cyber-purple bg-clip-text text-transparent">
                    Fusion Trading
                  </h3>
                  <p className="text-xs text-cyber-blue/60">
                    Professional Trading Platform
                  </p>
                </div>
              </div>

              <p className="text-sm text-white/70 leading-relaxed max-w-md">
                Advanced trading platform powered by AI and real-time market
                data. Experience institutional-grade analytics with an intuitive
                interface designed for both beginners and professionals.
              </p>

              <div className="flex flex-wrap gap-2">
                {features.map((feature, index) => (
                  <motion.div
                    key={feature.label}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <Badge
                      variant="outline"
                      className="border-cyber-blue/30 text-cyber-blue/80 hover:border-cyber-blue/50 hover:text-cyber-blue transition-all duration-200 cursor-pointer"
                    >
                      <feature.icon className="h-3 w-3 mr-1" />
                      {feature.label}
                    </Badge>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Navigation Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-4"
          >
            <h4 className="font-semibold text-white text-sm">Platform</h4>
            <ul className="space-y-3">
              {navigationLinks.map((link) => (
                <li key={link.label}>
                  <motion.a
                    href={link.href}
                    whileHover={{ x: 4 }}
                    className="text-sm text-white/60 hover:text-cyber-blue transition-colors duration-200 flex items-center group"
                  >
                    {link.label}
                    <ExternalLink className="h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </motion.a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Company Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-4"
          >
            <h4 className="font-semibold text-white text-sm">Company</h4>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <motion.a
                    href={link.href}
                    whileHover={{ x: 4 }}
                    className="text-sm text-white/60 hover:text-cyber-green transition-colors duration-200 flex items-center group"
                  >
                    {link.label}
                    <ExternalLink className="h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </motion.a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Support & Resources */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-4"
          >
            <h4 className="font-semibold text-white text-sm">Support</h4>
            <ul className="space-y-3">
              {supportLinks.map((link) => (
                <li key={link.label}>
                  <motion.a
                    href={link.href}
                    whileHover={{ x: 4 }}
                    className="text-sm text-white/60 hover:text-cyber-purple transition-colors duration-200 flex items-center group"
                  >
                    <link.icon className="h-3 w-3 mr-2 text-white/40 group-hover:text-cyber-purple transition-colors" />
                    {link.label}
                    <ExternalLink className="h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </motion.a>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        <Separator className="my-8 bg-cyber-blue/20" />

        {/* Status Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-6"
        >
          <Card className="p-4 bg-gradient-to-r from-cyber-green/10 to-cyber-blue/10 border border-cyber-green/20 backdrop-blur-sm">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-cyber-green rounded-full animate-pulse" />
                  <span className="text-sm text-cyber-green font-medium">
                    All Systems Operational
                  </span>
                </div>
                <Separator orientation="vertical" className="h-4 bg-white/20" />
                <div className="flex items-center space-x-2">
                  <Globe className="h-4 w-4 text-cyber-blue" />
                  <span className="text-sm text-white/60">99.9% Uptime</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Activity className="h-4 w-4 text-cyber-purple" />
                  <span className="text-sm text-white/60">Real-time Data</span>
                </div>
              </div>
              <div className="flex items-center space-x-4 text-xs text-white/50">
                <span>{appVersion}</span>
                <span>Build: {buildNumber}</span>
                <Badge
                  variant="outline"
                  className="border-cyber-blue/30 text-cyber-blue/60"
                >
                  Production
                </Badge>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Bottom Section */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="flex items-center space-x-4"
          >
            <span className="text-sm text-white/60">Connect with us:</span>
            <div className="flex space-x-3">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 rounded-lg bg-white/5 hover:bg-cyber-blue/20 border border-white/10 hover:border-cyber-blue/30 transition-all duration-200"
                  title={social.label}
                >
                  <social.icon className="h-4 w-4 text-white/60 hover:text-cyber-blue transition-colors" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Legal Links & Copyright */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 }}
            className="text-center lg:text-right space-y-2"
          >
            <div className="flex flex-wrap justify-center lg:justify-end items-center gap-4 text-xs">
              {legalLinks.map((link, index) => (
                <span key={link.label} className="flex items-center">
                  <motion.a
                    href={link.href}
                    whileHover={{ scale: 1.05 }}
                    className="text-white/50 hover:text-cyber-blue transition-colors duration-200"
                  >
                    {link.label}
                  </motion.a>
                  {index < legalLinks.length - 1 && (
                    <span className="mx-2 text-white/30">•</span>
                  )}
                </span>
              ))}
            </div>
            <p className="text-xs text-white/40">
              © {currentYear} Fusion Trading. All rights reserved.
              <span className="block sm:inline sm:ml-2">
                Trading involves risk. Past performance does not guarantee
                future results.
              </span>
            </p>
          </motion.div>
        </div>
      </div>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute top-10 left-10 w-32 h-32 bg-cyber-blue/5 rounded-full blur-xl"
        />
        <motion.div
          animate={{
            x: [0, -80, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
            delay: 5,
          }}
          className="absolute bottom-10 right-10 w-24 h-24 bg-cyber-purple/5 rounded-full blur-xl"
        />
      </div>
    </motion.footer>
  );
};

export default DashboardFooter;
