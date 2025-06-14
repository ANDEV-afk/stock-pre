import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  MapPin,
  Clock,
  DollarSign,
  Users,
  Rocket,
  Brain,
  Heart,
  Code,
  TrendingUp,
  Shield,
  Coffee,
  Plane,
  Gift,
  GraduationCap,
  ExternalLink,
} from "lucide-react";

const Careers = () => {
  const openPositions = [
    {
      title: "Senior AI/ML Engineer",
      department: "Engineering",
      location: "New York, NY / Remote",
      type: "Full-time",
      salary: "$180k - $250k",
      description:
        "Build and optimize machine learning models for stock prediction and trading algorithms.",
      requirements: [
        "5+ years ML experience",
        "Python/TensorFlow",
        "Financial markets knowledge",
      ],
    },
    {
      title: "Frontend React Developer",
      department: "Engineering",
      location: "San Francisco, CA / Remote",
      type: "Full-time",
      salary: "$140k - $190k",
      description:
        "Create beautiful, responsive user interfaces for our trading platform.",
      requirements: [
        "React/TypeScript expert",
        "Trading UI experience",
        "Performance optimization",
      ],
    },
    {
      title: "Quantitative Researcher",
      department: "Research",
      location: "Chicago, IL / Remote",
      type: "Full-time",
      salary: "$200k - $300k",
      description:
        "Develop and backtest trading strategies using statistical and machine learning methods.",
      requirements: [
        "PhD in Quant Finance/Math",
        "Python/R",
        "Options pricing models",
      ],
    },
    {
      title: "Product Manager - Trading",
      department: "Product",
      location: "New York, NY",
      type: "Full-time",
      salary: "$160k - $220k",
      description:
        "Drive product strategy for our core trading features and user experience.",
      requirements: [
        "5+ years PM experience",
        "Fintech background",
        "User research expertise",
      ],
    },
    {
      title: "DevOps Engineer",
      department: "Engineering",
      location: "Remote",
      type: "Full-time",
      salary: "$130k - $180k",
      description:
        "Scale our infrastructure to handle millions of real-time market data points.",
      requirements: ["Kubernetes/Docker", "AWS/GCP", "High-frequency systems"],
    },
    {
      title: "UX Designer",
      department: "Design",
      location: "San Francisco, CA / Remote",
      type: "Full-time",
      salary: "$120k - $160k",
      description:
        "Design intuitive interfaces that make complex financial data accessible.",
      requirements: [
        "5+ years UX design",
        "Figma/Sketch",
        "Financial products",
      ],
    },
  ];

  const benefits = [
    {
      icon: DollarSign,
      title: "Competitive Salary",
      description: "Top-tier compensation with equity participation",
    },
    {
      icon: Heart,
      title: "Health & Wellness",
      description: "Premium health insurance and mental health support",
    },
    {
      icon: Coffee,
      title: "Flexible Work",
      description: "Remote-first culture with flexible hours",
    },
    {
      icon: GraduationCap,
      title: "Learning Budget",
      description: "$5,000 annual learning and development allowance",
    },
    {
      icon: Plane,
      title: "Unlimited PTO",
      description: "Take the time you need to recharge",
    },
    {
      icon: Gift,
      title: "Stock Options",
      description: "Equity in a fast-growing fintech company",
    },
  ];

  const departments = [
    { name: "Engineering", count: 12, icon: Code },
    { name: "Product", count: 4, icon: Rocket },
    { name: "Research", count: 6, icon: Brain },
    { name: "Design", count: 3, icon: Heart },
    { name: "Operations", count: 5, icon: Shield },
    { name: "Sales", count: 8, icon: TrendingUp },
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
            Join Our Mission
          </h1>
          <p className="text-xl text-cyber-blue/80 max-w-3xl mx-auto mb-8">
            Help us build the future of AI-powered trading. Work with brilliant
            minds to democratize sophisticated financial technology.
          </p>
          <Button
            size="lg"
            className="bg-gradient-to-r from-cyber-blue to-cyber-purple hover:from-cyber-blue-dark hover:to-cyber-purple-dark text-white"
          >
            View Open Positions
          </Button>
        </motion.div>

        {/* Stats */}
        <section className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            <Card className="p-6 bg-white/10 backdrop-blur-md border border-cyber-green/20 text-center">
              <div className="text-3xl font-bold text-cyber-green mb-2">
                150+
              </div>
              <div className="text-white/70">Team Members</div>
            </Card>
            <Card className="p-6 bg-white/10 backdrop-blur-md border border-cyber-blue/20 text-center">
              <div className="text-3xl font-bold text-cyber-blue mb-2">25+</div>
              <div className="text-white/70">Countries</div>
            </Card>
            <Card className="p-6 bg-white/10 backdrop-blur-md border border-cyber-purple/20 text-center">
              <div className="text-3xl font-bold text-cyber-purple mb-2">
                4.9/5
              </div>
              <div className="text-white/70">Glassdoor Rating</div>
            </Card>
            <Card className="p-6 bg-white/10 backdrop-blur-md border border-cyber-yellow/20 text-center">
              <div className="text-3xl font-bold text-cyber-yellow mb-2">
                95%
              </div>
              <div className="text-white/70">Retention Rate</div>
            </Card>
          </motion.div>
        </section>

        {/* Departments */}
        <section className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-white mb-4">Our Teams</h2>
            <p className="text-cyber-blue/80 text-lg">
              Diverse teams working together to revolutionize trading
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {departments.map((dept, index) => (
              <motion.div
                key={dept.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
              >
                <Card className="p-4 bg-white/10 backdrop-blur-md border border-cyber-blue/20 text-center hover:border-cyber-blue/40 transition-all duration-300">
                  <div className="p-3 bg-cyber-blue/20 rounded-xl w-fit mx-auto mb-3">
                    <dept.icon className="h-6 w-6 text-cyber-blue" />
                  </div>
                  <h3 className="text-white font-semibold mb-1">{dept.name}</h3>
                  <p className="text-cyber-blue text-sm">
                    {dept.count} open roles
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Benefits */}
        <section className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-white mb-4">Why Join Us?</h2>
            <p className="text-cyber-blue/80 text-lg">
              We invest in our people with industry-leading benefits and culture
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 + index * 0.1 }}
              >
                <Card className="p-6 bg-white/10 backdrop-blur-md border border-cyber-blue/20 hover:border-cyber-blue/40 transition-all duration-300 h-full">
                  <div className="p-3 bg-cyber-blue/20 rounded-xl w-fit mb-4">
                    <benefit.icon className="h-6 w-6 text-cyber-blue" />
                  </div>
                  <h3 className="text-white font-bold text-lg mb-3">
                    {benefit.title}
                  </h3>
                  <p className="text-white/70">{benefit.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Open Positions */}
        <section>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-white mb-4">
              Open Positions
            </h2>
            <p className="text-cyber-blue/80 text-lg">
              Join our team and help shape the future of trading technology
            </p>
          </motion.div>

          <div className="space-y-6">
            {openPositions.map((position, index) => (
              <motion.div
                key={position.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4 + index * 0.1 }}
              >
                <Card className="p-6 bg-white/10 backdrop-blur-md border border-cyber-blue/20 hover:border-cyber-blue/40 transition-all duration-300">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-xl font-bold text-white">
                          {position.title}
                        </h3>
                        <Badge className="bg-cyber-blue/20 text-cyber-blue border-cyber-blue/30">
                          {position.department}
                        </Badge>
                      </div>

                      <div className="flex flex-wrap items-center gap-4 text-sm text-white/70 mb-3">
                        <div className="flex items-center space-x-1">
                          <MapPin className="h-4 w-4" />
                          <span>{position.location}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="h-4 w-4" />
                          <span>{position.type}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <DollarSign className="h-4 w-4" />
                          <span>{position.salary}</span>
                        </div>
                      </div>

                      <p className="text-white/80 mb-3">
                        {position.description}
                      </p>

                      <div className="flex flex-wrap gap-2">
                        {position.requirements.map((req, reqIndex) => (
                          <Badge
                            key={reqIndex}
                            variant="outline"
                            className="border-cyber-purple/30 text-cyber-purple"
                          >
                            {req}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="mt-4 lg:mt-0 lg:ml-6">
                      <Button className="bg-gradient-to-r from-cyber-green to-cyber-blue hover:from-cyber-green-dark hover:to-cyber-blue-dark text-white">
                        Apply Now
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2 }}
            className="text-center mt-12"
          >
            <Card className="p-8 bg-white/10 backdrop-blur-md border border-cyber-purple/20">
              <h3 className="text-2xl font-bold text-white mb-4">
                Don't See Your Role?
              </h3>
              <p className="text-white/70 mb-6">
                We're always looking for exceptional talent. Send us your resume
                and let us know how you'd like to contribute.
              </p>
              <Button
                size="lg"
                variant="outline"
                className="border-cyber-purple/30 text-cyber-purple hover:bg-cyber-purple/10"
              >
                Send Us Your Resume
              </Button>
            </Card>
          </motion.div>
        </section>
      </div>
    </div>
  );
};

export default Careers;
