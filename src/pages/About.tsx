import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import GlobalAnimatedBackground from "@/components/GlobalAnimatedBackground";
import { useTheme } from "@/contexts/ThemeContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Users,
  Target,
  TrendingUp,
  Award,
  Shield,
  Zap,
  ArrowRight,
  Globe,
  BarChart3,
  Heart,
} from "lucide-react";

const About = () => {
  const { theme } = useTheme();
  const stats = [
    { label: "Active Users", value: "50K+", icon: Users },
    { label: "Market Coverage", value: "Global", icon: Globe },
    { label: "Uptime", value: "99.9%", icon: Shield },
    { label: "Data Points", value: "1M+", icon: BarChart3 },
  ];

  const team = [
    {
      name: "Alex Thompson",
      role: "CEO & Founder",
      description: "Former Goldman Sachs analyst with 10+ years in fintech",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400",
    },
    {
      name: "Sarah Chen",
      role: "CTO",
      description: "Ex-Google engineer specializing in AI and machine learning",
      image:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400",
    },
    {
      name: "Marcus Rivera",
      role: "Head of Product",
      description:
        "Product leader from Bloomberg with deep financial expertise",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
    },
  ];

  return (
    <GlobalAnimatedBackground variant="minimal">
      <Navigation />

      <div className="min-h-screen pt-20 pb-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <Badge className="mb-4 bg-cyber-blue/20 text-cyber-blue border-cyber-blue/30">
              About StockVision
            </Badge>
            <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6">
              Democratizing
              <span className="bg-gradient-to-r from-cyber-blue to-cyber-purple bg-clip-text text-transparent">
                {" "}
                Financial Intelligence
              </span>
            </h1>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              We're building the future of stock market analysis with
              cutting-edge AI, real-time data, and intuitive design to empower
              every investor.
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
          >
            {stats.map((stat, index) => (
              <Card
                key={index}
                className="bg-cyber-dark/50 border-cyber-blue/20 text-center p-6"
              >
                <CardContent className="p-0">
                  <div className="p-3 bg-cyber-blue/20 rounded-full w-fit mx-auto mb-4">
                    <stat.icon className="h-6 w-6 text-cyber-blue" />
                  </div>
                  <div className="text-2xl font-bold text-white mb-1">
                    {stat.value}
                  </div>
                  <div className="text-white/60 text-sm">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </motion.div>

          {/* Mission Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="grid lg:grid-cols-2 gap-12 mb-16"
          >
            <div>
              <h2 className="text-3xl font-bold text-white mb-6">
                Our Mission
              </h2>
              <p className="text-white/70 text-lg mb-6">
                We believe that sophisticated financial analysis shouldn't be
                limited to Wall Street. StockVision brings institutional-grade
                tools and insights to individual investors, leveling the playing
                field in financial markets.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Target className="h-5 w-5 text-cyber-green" />
                  <span className="text-white">
                    AI-powered market predictions
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <TrendingUp className="h-5 w-5 text-cyber-blue" />
                  <span className="text-white">Real-time market data</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Shield className="h-5 w-5 text-cyber-purple" />
                  <span className="text-white">Enterprise-grade security</span>
                </div>
              </div>
            </div>
            <Card className="bg-cyber-dark/50 border-cyber-green/20 p-6">
              <CardHeader className="p-0 mb-4">
                <div className="flex items-center space-x-3">
                  <Award className="h-6 w-6 text-cyber-green" />
                  <CardTitle className="text-white">Our Values</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="p-0 space-y-4">
                <div>
                  <h4 className="text-white font-semibold mb-2">
                    Transparency
                  </h4>
                  <p className="text-white/60 text-sm">
                    Clear, honest communication about our methods and
                    limitations.
                  </p>
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-2">Innovation</h4>
                  <p className="text-white/60 text-sm">
                    Constantly pushing the boundaries of financial technology.
                  </p>
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-2">
                    Accessibility
                  </h4>
                  <p className="text-white/60 text-sm">
                    Making powerful tools available to everyone, not just
                    professionals.
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Team Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mb-16"
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">
                Meet Our Team
              </h2>
              <p className="text-white/70 text-lg">
                A diverse group of experts passionate about financial innovation
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {team.map((member, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                >
                  <Card className="bg-cyber-dark/50 border-cyber-blue/20 hover:border-cyber-blue/40 transition-colors p-6 text-center">
                    <CardContent className="p-0">
                      <div className="w-24 h-24 bg-gradient-to-br from-cyber-blue to-cyber-purple rounded-full mx-auto mb-4 flex items-center justify-center">
                        <span className="text-white text-2xl font-bold">
                          {member.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </span>
                      </div>
                      <h3 className="text-white font-semibold text-lg mb-1">
                        {member.name}
                      </h3>
                      <p className="text-cyber-blue text-sm font-medium mb-3">
                        {member.role}
                      </p>
                      <p className="text-white/60 text-sm">
                        {member.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="text-center"
          >
            <Card className="bg-gradient-to-r from-cyber-blue/20 to-cyber-purple/20 border-cyber-blue/30 p-8">
              <CardContent className="p-0">
                <Heart className="h-12 w-12 text-cyber-red mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-white mb-4">
                  Join Our Journey
                </h3>
                <p className="text-white/70 mb-6 max-w-2xl mx-auto">
                  We're always looking for talented individuals who share our
                  passion for democratizing financial technology. Come build the
                  future with us.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    onClick={() => (window.location.href = "/careers")}
                    className="bg-cyber-blue hover:bg-cyber-blue/80 text-white"
                  >
                    View Open Positions
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                  <Button
                    onClick={() =>
                      window.open(
                        "mailto:contact@stockvision.com?subject=General Inquiry&body=Hello, I would like to get in touch regarding your services.",
                        "_blank",
                      )
                    }
                    variant="outline"
                    className="border-cyber-purple/30 text-cyber-purple hover:bg-cyber-purple/10"
                  >
                    Contact Us
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

export default About;
