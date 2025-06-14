import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Users,
  Target,
  Award,
  TrendingUp,
  Globe,
  Shield,
  Zap,
  Brain,
  Heart,
  Lightbulb,
  Rocket,
  Star,
} from "lucide-react";

const About = () => {
  const teamMembers = [
    {
      name: "Sarah Chen",
      role: "CEO & Founder",
      image:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      bio: "Former Goldman Sachs VP with 15+ years in quantitative trading",
    },
    {
      name: "Michael Rodriguez",
      role: "CTO",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      bio: "Ex-Google AI researcher specializing in financial machine learning",
    },
    {
      name: "Emily Watson",
      role: "Head of Product",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      bio: "Former Bloomberg product lead with expertise in trading platforms",
    },
    {
      name: "David Kim",
      role: "Chief Data Scientist",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      bio: "PhD in Quantitative Finance from MIT, published researcher",
    },
  ];

  const milestones = [
    {
      year: "2019",
      title: "Company Founded",
      description: "Started with a vision to democratize AI trading",
    },
    {
      year: "2020",
      title: "Series A Funding",
      description: "$10M raised from leading VCs",
    },
    {
      year: "2021",
      title: "100K Users",
      description: "Reached 100,000 active traders",
    },
    {
      year: "2022",
      title: "AI Breakthrough",
      description: "Launched revolutionary prediction engine",
    },
    {
      year: "2023",
      title: "Global Expansion",
      description: "Expanded to 50+ countries worldwide",
    },
    {
      year: "2024",
      title: "1M+ Users",
      description: "Over 1 million traders using our platform",
    },
  ];

  const values = [
    {
      icon: Shield,
      title: "Trust & Security",
      description:
        "Bank-grade security and transparent algorithms you can trust",
    },
    {
      icon: Lightbulb,
      title: "Innovation",
      description:
        "Cutting-edge AI technology that evolves with market dynamics",
    },
    {
      icon: Heart,
      title: "Community",
      description: "Building a supportive ecosystem for traders of all levels",
    },
    {
      icon: Target,
      title: "Results",
      description: "Focused on delivering real, measurable trading outcomes",
    },
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
            About StockVision
          </h1>
          <p className="text-xl text-cyber-blue/80 max-w-3xl mx-auto">
            We're on a mission to democratize AI-powered trading and make
            sophisticated market analysis accessible to everyone.
          </p>
        </motion.div>

        {/* Mission & Vision */}
        <section className="mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="p-8 bg-white/10 backdrop-blur-md border border-cyber-blue/20 h-full">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="p-3 bg-cyber-blue/20 rounded-xl">
                    <Target className="h-6 w-6 text-cyber-blue" />
                  </div>
                  <h2 className="text-2xl font-bold text-white">Our Mission</h2>
                </div>
                <p className="text-cyber-blue/80 text-lg leading-relaxed">
                  To empower every trader with AI-driven insights that were once
                  exclusive to Wall Street institutions. We believe that
                  sophisticated market analysis should be accessible,
                  affordable, and easy to understand.
                </p>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card className="p-8 bg-white/10 backdrop-blur-md border border-cyber-purple/20 h-full">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="p-3 bg-cyber-purple/20 rounded-xl">
                    <Rocket className="h-6 w-6 text-cyber-purple" />
                  </div>
                  <h2 className="text-2xl font-bold text-white">Our Vision</h2>
                </div>
                <p className="text-cyber-purple/80 text-lg leading-relaxed">
                  To become the world's most trusted platform for AI-powered
                  trading, creating a future where intelligent technology
                  enhances human decision-making in financial markets.
                </p>
              </Card>
            </motion.div>
          </div>
        </section>

        {/* Stats */}
        <section className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            <Card className="p-6 bg-white/10 backdrop-blur-md border border-cyber-green/20 text-center">
              <div className="text-3xl font-bold text-cyber-green mb-2">
                1M+
              </div>
              <div className="text-white/70">Active Traders</div>
            </Card>
            <Card className="p-6 bg-white/10 backdrop-blur-md border border-cyber-blue/20 text-center">
              <div className="text-3xl font-bold text-cyber-blue mb-2">
                $50B+
              </div>
              <div className="text-white/70">Assets Tracked</div>
            </Card>
            <Card className="p-6 bg-white/10 backdrop-blur-md border border-cyber-purple/20 text-center">
              <div className="text-3xl font-bold text-cyber-purple mb-2">
                50+
              </div>
              <div className="text-white/70">Countries</div>
            </Card>
            <Card className="p-6 bg-white/10 backdrop-blur-md border border-cyber-yellow/20 text-center">
              <div className="text-3xl font-bold text-cyber-yellow mb-2">
                99.9%
              </div>
              <div className="text-white/70">Uptime</div>
            </Card>
          </motion.div>
        </section>

        {/* Team */}
        <section className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-white mb-4">
              Meet Our Team
            </h2>
            <p className="text-cyber-blue/80 text-lg">
              Industry veterans and AI experts working together to revolutionize
              trading
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 + index * 0.1 }}
              >
                <Card className="p-6 bg-white/10 backdrop-blur-md border border-cyber-blue/20 text-center hover:border-cyber-blue/40 transition-all duration-300">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                  />
                  <h3 className="text-white font-bold text-lg mb-1">
                    {member.name}
                  </h3>
                  <p className="text-cyber-blue mb-3">{member.role}</p>
                  <p className="text-white/70 text-sm">{member.bio}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Values */}
        <section className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-white mb-4">Our Values</h2>
            <p className="text-cyber-blue/80 text-lg">
              The principles that guide everything we do
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4 + index * 0.1 }}
              >
                <Card className="p-6 bg-white/10 backdrop-blur-md border border-cyber-blue/20 text-center hover:border-cyber-blue/40 transition-all duration-300 h-full">
                  <div className="p-3 bg-cyber-blue/20 rounded-xl w-fit mx-auto mb-4">
                    <value.icon className="h-6 w-6 text-cyber-blue" />
                  </div>
                  <h3 className="text-white font-bold text-lg mb-3">
                    {value.title}
                  </h3>
                  <p className="text-white/70 text-sm">{value.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Timeline */}
        <section>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-white mb-4">Our Journey</h2>
            <p className="text-cyber-blue/80 text-lg">
              Key milestones in our mission to transform trading
            </p>
          </motion.div>

          <div className="relative">
            <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyber-blue to-cyber-purple"></div>

            <div className="space-y-8">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={milestone.year}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.8 + index * 0.2 }}
                  className={cn(
                    "relative flex items-center",
                    index % 2 === 0 ? "md:justify-start" : "md:justify-end",
                  )}
                >
                  <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 w-4 h-4 bg-cyber-blue rounded-full border-4 border-cyber-black"></div>

                  <Card
                    className={cn(
                      "ml-12 md:ml-0 p-6 bg-white/10 backdrop-blur-md border border-cyber-blue/20 max-w-md",
                      index % 2 === 0 ? "md:mr-8" : "md:ml-8",
                    )}
                  >
                    <div className="flex items-center space-x-3 mb-3">
                      <Badge className="bg-cyber-blue/20 text-cyber-blue border-cyber-blue/30">
                        {milestone.year}
                      </Badge>
                      <h3 className="text-white font-bold">
                        {milestone.title}
                      </h3>
                    </div>
                    <p className="text-white/70">{milestone.description}</p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;
