import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Navigation from "@/components/Navigation";
import GlobalAnimatedBackground from "@/components/GlobalAnimatedBackground";
import { useTheme } from "@/contexts/ThemeContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  MapPin,
  Clock,
  Users,
  TrendingUp,
  Code,
  Briefcase,
  Heart,
  Rocket,
  Target,
  Star,
  ArrowRight,
  Mail,
  DollarSign,
  Globe,
  Zap,
  Award,
  Coffee,
  Wifi,
  Car,
  Shield,
  GraduationCap,
  X,
  Upload,
  FileText,
  User,
  Phone,
  Send,
} from "lucide-react";

const Careers = () => {
  const { theme } = useTheme();
  const [showApplicationModal, setShowApplicationModal] = useState(false);
  const [selectedPosition, setSelectedPosition] = useState<any>(null);
  const [applicationData, setApplicationData] = useState({
    fullName: "",
    email: "",
    phone: "",
    experience: "",
    coverLetter: "",
    resume: null as File | null,
  });
  const openPositions = [
    {
      id: 1,
      title: "Senior Full Stack Developer",
      department: "Engineering",
      location: "New York, NY / Remote",
      type: "Full-time",
      experience: "5+ years",
      salary: "$120k - $180k",
      skills: ["React", "Node.js", "TypeScript", "Python", "AWS"],
      description:
        "Join our core engineering team to build the next generation of financial technology platforms.",
      urgent: true,
    },
    {
      id: 2,
      title: "Lead Product Manager",
      department: "Product",
      location: "San Francisco, CA",
      type: "Full-time",
      experience: "7+ years",
      salary: "$140k - $200k",
      skills: ["Product Strategy", "Data Analysis", "User Research", "Agile"],
      description:
        "Lead product strategy for our AI-powered trading platform and drive user experience innovations.",
      urgent: false,
    },
    {
      id: 3,
      title: "Senior Data Scientist",
      department: "AI/ML",
      location: "Boston, MA / Remote",
      type: "Full-time",
      experience: "4+ years",
      salary: "$130k - $190k",
      skills: [
        "Python",
        "Machine Learning",
        "TensorFlow",
        "Financial Modeling",
      ],
      description:
        "Develop cutting-edge ML models for stock prediction and market analysis.",
      urgent: true,
    },
    {
      id: 4,
      title: "DevOps Engineer",
      department: "Infrastructure",
      location: "Remote",
      type: "Full-time",
      experience: "3+ years",
      salary: "$100k - $150k",
      skills: ["Kubernetes", "Docker", "AWS", "CI/CD", "Monitoring"],
      description:
        "Scale our infrastructure to handle millions of real-time market data points.",
      urgent: false,
    },
    {
      id: 5,
      title: "UX/UI Designer",
      department: "Design",
      location: "Los Angeles, CA",
      type: "Full-time",
      experience: "4+ years",
      salary: "$90k - $140k",
      skills: ["Figma", "User Research", "Prototyping", "Design Systems"],
      description:
        "Create intuitive and beautiful interfaces for complex financial tools.",
      urgent: false,
    },
    {
      id: 6,
      title: "Financial Analyst",
      department: "Finance",
      location: "Chicago, IL",
      type: "Full-time",
      experience: "2+ years",
      salary: "$80k - $120k",
      skills: ["Financial Modeling", "Excel", "Python", "Risk Analysis"],
      description:
        "Analyze market trends and support our trading algorithm development.",
      urgent: false,
    },
  ];

  const benefits = [
    {
      icon: DollarSign,
      title: "Competitive Salary",
      description: "Top-tier compensation with equity options",
    },
    {
      icon: Shield,
      title: "Health & Wellness",
      description: "Premium health, dental, and vision insurance",
    },
    {
      icon: GraduationCap,
      title: "Learning Budget",
      description: "$3,000 annual budget for courses and conferences",
    },
    {
      icon: Globe,
      title: "Remote Flexibility",
      description: "Work from anywhere with flexible hours",
    },
    {
      icon: Coffee,
      title: "Unlimited PTO",
      description: "Take time when you need it - we trust you",
    },
    {
      icon: Car,
      title: "Commuter Benefits",
      description: "Transit and parking reimbursement",
    },
    {
      icon: Wifi,
      title: "Home Office Setup",
      description: "$2,000 budget for your perfect workspace",
    },
    {
      icon: Award,
      title: "Stock Options",
      description: "Be an owner in our growing company",
    },
  ];

  const values = [
    {
      icon: Rocket,
      title: "Innovation First",
      description:
        "We're building the future of finance with cutting-edge technology",
    },
    {
      icon: Users,
      title: "Team Collaboration",
      description: "Great minds working together to solve complex problems",
    },
    {
      icon: Target,
      title: "Results Driven",
      description: "We focus on impact and deliver meaningful outcomes",
    },
    {
      icon: Heart,
      title: "Work-Life Balance",
      description:
        "Your wellbeing is our priority - sustainable growth matters",
    },
  ];

  const handleApply = (position: any) => {
    setSelectedPosition(position);
    setShowApplicationModal(true);
    setApplicationData({
      fullName: "",
      email: "",
      phone: "",
      experience: "",
      coverLetter: "",
      resume: null,
    });
  };

  const handleSubmitApplication = () => {
    // Create email with form data
    const subject = `Application for ${selectedPosition.title} Position`;
    const body = `Hello StockVision Hiring Team,

I am applying for the ${selectedPosition.title} position in your ${selectedPosition.department} department.

APPLICANT DETAILS:
- Full Name: ${applicationData.fullName}
- Email: ${applicationData.email}
- Phone: ${applicationData.phone}
- Years of Experience: ${applicationData.experience}

POSITION DETAILS:
- Title: ${selectedPosition.title}
- Department: ${selectedPosition.department}
- Location: ${selectedPosition.location}
- Salary Range: ${selectedPosition.salary}

COVER LETTER:
${applicationData.coverLetter}

Please find my resume attached. I look forward to hearing from you.

Best regards,
${applicationData.fullName}`;

    window.open(
      `mailto:careers@stockvision.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`,
      "_blank",
    );
    setShowApplicationModal(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setApplicationData((prev) => ({
        ...prev,
        resume: e.target.files![0],
      }));
    }
  };

  return (
    <GlobalAnimatedBackground variant="minimal">
      <Navigation />

      <div className="min-h-screen pt-20 pb-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <Badge
              className={
                theme === "dark"
                  ? "mb-4 bg-cyber-green/20 text-cyber-green border-cyber-green/30"
                  : "mb-4 bg-green-100 text-green-700 border-green-200"
              }
            >
              Join Our Team
            </Badge>
            <h1
              className={`text-4xl lg:text-6xl font-bold mb-6 ${
                theme === "dark" ? "text-white" : "text-gray-900"
              }`}
            >
              Build the Future of
              <span
                className={
                  theme === "dark"
                    ? "bg-gradient-to-r from-cyber-green to-cyber-blue bg-clip-text text-transparent"
                    : "bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent"
                }
              >
                {" "}
                Financial Technology
              </span>
            </h1>
            <p
              className={`text-xl max-w-3xl mx-auto ${
                theme === "dark" ? "text-white/70" : "text-slate-600"
              }`}
            >
              Join a team of passionate innovators who are democratizing
              financial markets and building tools that empower every investor.
            </p>
          </motion.div>

          {/* Company Values */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-16"
          >
            <h2
              className={`text-3xl font-bold text-center mb-12 ${
                theme === "dark" ? "text-white" : "text-gray-900"
              }`}
            >
              Why Work With Us?
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                >
                  <Card
                    className={`text-center p-6 transition-colors ${
                      theme === "dark"
                        ? "bg-cyber-dark/50 border-cyber-blue/20 hover:border-cyber-blue/40"
                        : "bg-white/70 border-gray-200/50 hover:border-blue-300/60 shadow-lg hover:shadow-xl"
                    }`}
                  >
                    <CardContent className="p-0">
                      <div
                        className={`p-3 rounded-full w-fit mx-auto mb-4 ${
                          theme === "dark" ? "bg-cyber-blue/20" : "bg-blue-100"
                        }`}
                      >
                        <value.icon
                          className={`h-6 w-6 ${
                            theme === "dark"
                              ? "text-cyber-blue"
                              : "text-blue-600"
                          }`}
                        />
                      </div>
                      <h3
                        className={`font-semibold mb-2 ${
                          theme === "dark" ? "text-white" : "text-gray-900"
                        }`}
                      >
                        {value.title}
                      </h3>
                      <p
                        className={`text-sm ${
                          theme === "dark" ? "text-white/60" : "text-slate-600"
                        }`}
                      >
                        {value.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Open Positions */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-16"
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">
                Open Positions
              </h2>
              <p className="text-white/70 text-lg">
                Find your perfect role and help us shape the future of finance
              </p>
            </div>

            <div className="space-y-6">
              {openPositions.map((position, index) => (
                <motion.div
                  key={position.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                >
                  <Card className="bg-cyber-dark/50 border-cyber-blue/20 hover:border-cyber-blue/40 transition-all duration-300 group">
                    <CardContent className="p-6">
                      <div className="flex flex-col lg:flex-row lg:items-center justify-between">
                        <div className="flex-1 mb-4 lg:mb-0">
                          <div className="flex items-center space-x-3 mb-3">
                            <h3 className="text-xl font-bold text-white">
                              {position.title}
                            </h3>
                            {position.urgent && (
                              <Badge className="bg-cyber-red/20 text-cyber-red border-cyber-red/30 text-xs">
                                Urgent
                              </Badge>
                            )}
                          </div>

                          <div className="flex flex-wrap items-center gap-4 text-sm text-white/60 mb-3">
                            <div className="flex items-center space-x-1">
                              <Briefcase className="h-4 w-4" />
                              <span>{position.department}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <MapPin className="h-4 w-4" />
                              <span>{position.location}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Clock className="h-4 w-4" />
                              <span>{position.type}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Star className="h-4 w-4" />
                              <span>{position.experience}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <DollarSign className="h-4 w-4" />
                              <span>{position.salary}</span>
                            </div>
                          </div>

                          <p className="text-white/70 mb-3">
                            {position.description}
                          </p>

                          <div className="flex flex-wrap gap-2">
                            {position.skills.map((skill, skillIndex) => (
                              <Badge
                                key={skillIndex}
                                variant="outline"
                                className="text-xs border-cyber-green/30 text-cyber-green"
                              >
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div className="lg:ml-6">
                          <Button
                            onClick={() => handleApply(position)}
                            className={`w-full lg:w-auto text-white group-hover:scale-105 transition-transform ${
                              theme === "dark"
                                ? "bg-cyber-blue hover:bg-cyber-blue/80"
                                : "bg-blue-500 hover:bg-blue-600"
                            }`}
                          >
                            Apply Now
                            <ArrowRight className="h-4 w-4 ml-2" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Benefits */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mb-16"
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">
                Amazing Benefits
              </h2>
              <p className="text-white/70 text-lg">
                We believe in taking care of our team with comprehensive
                benefits
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 + index * 0.05 }}
                  whileHover={{ y: -5 }}
                >
                  <Card className="bg-cyber-dark/50 border-cyber-green/20 hover:border-cyber-green/40 transition-colors p-4 text-center">
                    <CardContent className="p-0">
                      <div className="p-2 bg-cyber-green/20 rounded-lg w-fit mx-auto mb-3">
                        <benefit.icon className="h-5 w-5 text-cyber-green" />
                      </div>
                      <h4 className="text-white font-semibold text-sm mb-2">
                        {benefit.title}
                      </h4>
                      <p className="text-white/60 text-xs">
                        {benefit.description}
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
            transition={{ delay: 0.8 }}
            className="text-center"
          >
            <Card className="bg-gradient-to-r from-cyber-blue/20 to-cyber-purple/20 border-cyber-blue/30 p-8">
              <CardContent className="p-0">
                <Heart className="h-12 w-12 text-cyber-red mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-white mb-4">
                  Don't See Your Role?
                </h3>
                <p className="text-white/70 mb-6 max-w-2xl mx-auto">
                  We're always looking for exceptional talent. Send us your
                  resume and tell us how you'd like to contribute to our
                  mission.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    onClick={() =>
                      window.open(
                        "mailto:careers@stockvision.com?subject=General Application&body=Hello, I am interested in opportunities at StockVision. Please find my resume attached.",
                        "_blank",
                      )
                    }
                    className="bg-cyber-green hover:bg-cyber-green/80 text-white"
                  >
                    <Mail className="h-4 w-4 mr-2" />
                    Send Your Resume
                  </Button>
                  <Button
                    onClick={() =>
                      window.open(
                        "mailto:contact@stockvision.com?subject=General Inquiry&body=Hello, I would like to learn more about StockVision.",
                        "_blank",
                      )
                    }
                    variant="outline"
                    className="border-cyber-purple/30 text-cyber-purple hover:bg-cyber-purple/10"
                  >
                    Get In Touch
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>

      {/* Job Application Modal */}
      <AnimatePresence>
        {showApplicationModal && selectedPosition && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowApplicationModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className={`w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl p-8 shadow-2xl ${
                theme === "dark"
                  ? "bg-cyber-dark border border-cyber-blue/30"
                  : "bg-white border border-gray-200"
              }`}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div
                    className={`p-3 rounded-xl ${
                      theme === "dark" ? "bg-cyber-blue/20" : "bg-blue-100"
                    }`}
                  >
                    <Briefcase
                      className={`h-6 w-6 ${
                        theme === "dark" ? "text-cyber-blue" : "text-blue-600"
                      }`}
                    />
                  </div>
                  <div>
                    <h3
                      className={`text-2xl font-bold ${
                        theme === "dark" ? "text-white" : "text-gray-900"
                      }`}
                    >
                      Apply for Position
                    </h3>
                    <p
                      className={`text-sm ${
                        theme === "dark"
                          ? "text-cyber-blue/80"
                          : "text-slate-600"
                      }`}
                    >
                      {selectedPosition.title} - {selectedPosition.department}
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowApplicationModal(false)}
                  className={
                    theme === "dark"
                      ? "text-white/70 hover:text-white"
                      : "text-gray-500 hover:text-gray-900"
                  }
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>

              {/* Position Summary */}
              <div
                className={`p-4 rounded-xl mb-6 ${
                  theme === "dark"
                    ? "bg-white/5 border border-cyber-blue/20"
                    : "bg-blue-50 border border-blue-200"
                }`}
              >
                <h4
                  className={`font-semibold mb-2 ${
                    theme === "dark" ? "text-white" : "text-gray-900"
                  }`}
                >
                  Position Details
                </h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <MapPin
                      className={`h-4 w-4 ${
                        theme === "dark" ? "text-cyber-blue" : "text-blue-600"
                      }`}
                    />
                    <span
                      className={
                        theme === "dark" ? "text-white/80" : "text-slate-600"
                      }
                    >
                      {selectedPosition.location}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <DollarSign
                      className={`h-4 w-4 ${
                        theme === "dark" ? "text-cyber-green" : "text-green-600"
                      }`}
                    />
                    <span
                      className={
                        theme === "dark" ? "text-white/80" : "text-slate-600"
                      }
                    >
                      {selectedPosition.salary}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock
                      className={`h-4 w-4 ${
                        theme === "dark"
                          ? "text-cyber-purple"
                          : "text-purple-600"
                      }`}
                    />
                    <span
                      className={
                        theme === "dark" ? "text-white/80" : "text-slate-600"
                      }
                    >
                      {selectedPosition.type}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Star
                      className={`h-4 w-4 ${
                        theme === "dark"
                          ? "text-cyber-yellow"
                          : "text-yellow-600"
                      }`}
                    />
                    <span
                      className={
                        theme === "dark" ? "text-white/80" : "text-slate-600"
                      }
                    >
                      {selectedPosition.experience}
                    </span>
                  </div>
                </div>
              </div>

              {/* Application Form */}
              <div className="space-y-6">
                {/* Personal Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label
                      className={`text-sm font-medium mb-2 block ${
                        theme === "dark" ? "text-white" : "text-gray-900"
                      }`}
                    >
                      <User className="h-4 w-4 inline mr-2" />
                      Full Name *
                    </Label>
                    <Input
                      value={applicationData.fullName}
                      onChange={(e) =>
                        setApplicationData((prev) => ({
                          ...prev,
                          fullName: e.target.value,
                        }))
                      }
                      placeholder="Enter your full name"
                      className={
                        theme === "dark"
                          ? "bg-white/10 border-cyber-blue/30 text-white placeholder:text-white/50"
                          : "bg-white border-gray-300 text-gray-900"
                      }
                    />
                  </div>
                  <div>
                    <Label
                      className={`text-sm font-medium mb-2 block ${
                        theme === "dark" ? "text-white" : "text-gray-900"
                      }`}
                    >
                      <Mail className="h-4 w-4 inline mr-2" />
                      Email Address *
                    </Label>
                    <Input
                      type="email"
                      value={applicationData.email}
                      onChange={(e) =>
                        setApplicationData((prev) => ({
                          ...prev,
                          email: e.target.value,
                        }))
                      }
                      placeholder="your.email@example.com"
                      className={
                        theme === "dark"
                          ? "bg-white/10 border-cyber-blue/30 text-white placeholder:text-white/50"
                          : "bg-white border-gray-300 text-gray-900"
                      }
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label
                      className={`text-sm font-medium mb-2 block ${
                        theme === "dark" ? "text-white" : "text-gray-900"
                      }`}
                    >
                      <Phone className="h-4 w-4 inline mr-2" />
                      Phone Number
                    </Label>
                    <Input
                      value={applicationData.phone}
                      onChange={(e) =>
                        setApplicationData((prev) => ({
                          ...prev,
                          phone: e.target.value,
                        }))
                      }
                      placeholder="+1 (555) 123-4567"
                      className={
                        theme === "dark"
                          ? "bg-white/10 border-cyber-blue/30 text-white placeholder:text-white/50"
                          : "bg-white border-gray-300 text-gray-900"
                      }
                    />
                  </div>
                  <div>
                    <Label
                      className={`text-sm font-medium mb-2 block ${
                        theme === "dark" ? "text-white" : "text-gray-900"
                      }`}
                    >
                      <Star className="h-4 w-4 inline mr-2" />
                      Years of Experience *
                    </Label>
                    <Input
                      value={applicationData.experience}
                      onChange={(e) =>
                        setApplicationData((prev) => ({
                          ...prev,
                          experience: e.target.value,
                        }))
                      }
                      placeholder="e.g., 5 years"
                      className={
                        theme === "dark"
                          ? "bg-white/10 border-cyber-blue/30 text-white placeholder:text-white/50"
                          : "bg-white border-gray-300 text-gray-900"
                      }
                    />
                  </div>
                </div>

                {/* Resume Upload */}
                <div>
                  <Label
                    className={`text-sm font-medium mb-2 block ${
                      theme === "dark" ? "text-white" : "text-gray-900"
                    }`}
                  >
                    <FileText className="h-4 w-4 inline mr-2" />
                    Resume/CV *
                  </Label>
                  <div
                    className={`border-2 border-dashed rounded-xl p-6 text-center transition-colors ${
                      theme === "dark"
                        ? "border-cyber-blue/30 hover:border-cyber-blue/50 bg-white/5"
                        : "border-gray-300 hover:border-blue-400 bg-gray-50"
                    }`}
                  >
                    <Upload
                      className={`h-8 w-8 mx-auto mb-3 ${
                        theme === "dark"
                          ? "text-cyber-blue/60"
                          : "text-gray-400"
                      }`}
                    />
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileChange}
                      className="hidden"
                      id="resume-upload"
                    />
                    <label
                      htmlFor="resume-upload"
                      className={`cursor-pointer text-sm ${
                        theme === "dark" ? "text-white/80" : "text-slate-600"
                      }`}
                    >
                      {applicationData.resume ? (
                        <span
                          className={`font-medium ${
                            theme === "dark"
                              ? "text-cyber-green"
                              : "text-green-600"
                          }`}
                        >
                          ✓ {applicationData.resume.name}
                        </span>
                      ) : (
                        <>
                          <span
                            className={`font-medium ${
                              theme === "dark"
                                ? "text-cyber-blue"
                                : "text-blue-600"
                            }`}
                          >
                            Click to upload
                          </span>{" "}
                          or drag and drop
                          <br />
                          PDF, DOC, DOCX (max. 10MB)
                        </>
                      )}
                    </label>
                  </div>
                </div>

                {/* Cover Letter */}
                <div>
                  <Label
                    className={`text-sm font-medium mb-2 block ${
                      theme === "dark" ? "text-white" : "text-gray-900"
                    }`}
                  >
                    <Mail className="h-4 w-4 inline mr-2" />
                    Cover Letter *
                  </Label>
                  <Textarea
                    value={applicationData.coverLetter}
                    onChange={(e) =>
                      setApplicationData((prev) => ({
                        ...prev,
                        coverLetter: e.target.value,
                      }))
                    }
                    placeholder={`Dear Hiring Manager,

I am excited to apply for the ${selectedPosition.title} position at StockVision. With my experience in...

Please let me know if you need any additional information.

Best regards,
[Your Name]`}
                    rows={6}
                    className={
                      theme === "dark"
                        ? "bg-white/10 border-cyber-blue/30 text-white placeholder:text-white/50 resize-none"
                        : "bg-white border-gray-300 text-gray-900 resize-none"
                    }
                  />
                </div>

                {/* Submit Buttons */}
                <div className="flex space-x-4 pt-4">
                  <Button
                    onClick={handleSubmitApplication}
                    disabled={
                      !applicationData.fullName ||
                      !applicationData.email ||
                      !applicationData.experience ||
                      !applicationData.coverLetter
                    }
                    className={`flex-1 text-white font-semibold py-3 transition-all duration-300 ${
                      theme === "dark"
                        ? "bg-cyber-green hover:bg-cyber-green/80 disabled:bg-gray-600"
                        : "bg-green-500 hover:bg-green-600 disabled:bg-gray-400"
                    }`}
                  >
                    <Send className="h-4 w-4 mr-2" />
                    Submit Application
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setShowApplicationModal(false)}
                    className={`px-6 ${
                      theme === "dark"
                        ? "border-cyber-blue/30 text-cyber-blue hover:bg-cyber-blue/10"
                        : "border-gray-300 text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    Cancel
                  </Button>
                </div>

                <p
                  className={`text-xs text-center ${
                    theme === "dark" ? "text-white/50" : "text-gray-500"
                  }`}
                >
                  * Required fields. Your information will be sent securely to
                  our HR team.
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </GlobalAnimatedBackground>
  );
};

export default Careers;
