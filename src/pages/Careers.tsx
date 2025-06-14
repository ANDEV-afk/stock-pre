import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navigation from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import {
  MapPin,
  Clock,
  DollarSign,
  Users,
  TrendingUp,
  Code,
  BarChart3,
  Shield,
  Briefcase,
  GraduationCap,
  Heart,
  Coffee,
  Zap,
  Upload,
  FileText,
  CheckCircle,
  Send,
  X,
  Building,
  Calendar,
  User,
  Mail,
  Phone,
  Globe,
  Star,
  Award,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface JobPosting {
  id: string;
  title: string;
  department: string;
  location: string;
  type: "Full-time" | "Part-time" | "Contract" | "Intern";
  salary: string;
  experience: string;
  description: string;
  requirements: string[];
  benefits: string[];
  skills: string[];
  posted: string;
  urgent?: boolean;
}

interface Application {
  jobId: string;
  personalInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    linkedin: string;
    portfolio: string;
  };
  experience: string;
  coverLetter: string;
  resume: File | null;
  expectedSalary: string;
  availableDate: string;
}

const Careers = () => {
  const [selectedJob, setSelectedJob] = useState<JobPosting | null>(null);
  const [showApplicationModal, setShowApplicationModal] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState("all");
  const [application, setApplication] = useState<Application>({
    jobId: "",
    personalInfo: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      linkedin: "",
      portfolio: "",
    },
    experience: "",
    coverLetter: "",
    resume: null,
    expectedSalary: "",
    availableDate: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [applicationSubmitted, setApplicationSubmitted] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const departments = [
    { id: "all", label: "All Departments", count: 20 },
    { id: "engineering", label: "Engineering", count: 5 },
    { id: "data", label: "Data Science", count: 3 },
    { id: "product", label: "Product", count: 2 },
    { id: "marketing", label: "Marketing", count: 5 },
    { id: "sales", label: "Sales", count: 4 },
    { id: "design", label: "Design", count: 1 },
  ];

  const jobPostings: JobPosting[] = [
    {
      id: "1",
      title: "Senior Full Stack Developer",
      department: "engineering",
      location: "San Francisco, CA / Remote",
      type: "Full-time",
      salary: "$120k - $180k",
      experience: "5+ years",
      description:
        "Join our engineering team to build next-generation financial technology platforms. You'll work on high-performance trading systems, real-time data processing, and user-facing applications that serve millions of traders worldwide.",
      requirements: [
        "5+ years of full-stack development experience",
        "Proficiency in React, Node.js, TypeScript",
        "Experience with real-time data systems",
        "Knowledge of financial markets (preferred)",
        "Strong problem-solving skills",
      ],
      benefits: [
        "Competitive salary and equity",
        "Health, dental, and vision insurance",
        "Unlimited PTO",
        "Remote work flexibility",
        "Learning and development budget",
      ],
      skills: ["React", "Node.js", "TypeScript", "PostgreSQL", "AWS"],
      posted: "2 days ago",
      urgent: true,
    },
    {
      id: "2",
      title: "AI/ML Engineer - Trading Algorithms",
      department: "data",
      location: "New York, NY / Remote",
      type: "Full-time",
      salary: "$140k - $200k",
      experience: "3+ years",
      description:
        "Design and implement machine learning models for algorithmic trading, market prediction, and risk assessment. Work with massive datasets and cutting-edge AI technologies.",
      requirements: [
        "PhD or MS in Computer Science, Statistics, or related field",
        "3+ years of ML/AI experience",
        "Experience with Python, TensorFlow, PyTorch",
        "Knowledge of financial markets",
        "Strong mathematical background",
      ],
      benefits: [
        "Top-tier compensation package",
        "Research and conference budget",
        "Flexible working hours",
        "State-of-the-art computing resources",
        "Mentorship opportunities",
      ],
      skills: ["Python", "TensorFlow", "PyTorch", "SQL", "Statistics"],
      posted: "1 day ago",
      urgent: true,
    },
    {
      id: "3",
      title: "Product Manager - Trading Platform",
      department: "product",
      location: "San Francisco, CA",
      type: "Full-time",
      salary: "$130k - $170k",
      experience: "4+ years",
      description:
        "Lead product strategy for our flagship trading platform. Drive feature development, user research, and go-to-market strategies for innovative financial products.",
      requirements: [
        "4+ years of product management experience",
        "Experience with fintech or trading platforms",
        "Strong analytical and data-driven mindset",
        "Excellent communication skills",
        "Understanding of user experience design",
      ],
      benefits: [
        "Competitive salary and equity",
        "Product development ownership",
        "Direct impact on user experience",
        "Cross-functional collaboration",
        "Career growth opportunities",
      ],
      skills: [
        "Product Strategy",
        "User Research",
        "Analytics",
        "SQL",
        "Figma",
      ],
      posted: "3 days ago",
    },
    {
      id: "4",
      title: "Data Scientist - Market Analysis",
      department: "data",
      location: "Chicago, IL / Remote",
      type: "Full-time",
      salary: "$110k - $150k",
      experience: "2+ years",
      description:
        "Analyze market trends, build predictive models, and provide data-driven insights to support trading strategies and business decisions.",
      requirements: [
        "MS in Data Science, Statistics, or related field",
        "2+ years of data science experience",
        "Proficiency in Python, R, SQL",
        "Experience with time series analysis",
        "Knowledge of financial markets preferred",
      ],
      benefits: [
        "Competitive compensation",
        "Data and analytics tools access",
        "Remote work options",
        "Professional development",
        "Collaborative environment",
      ],
      skills: ["Python", "R", "SQL", "Tableau", "Statistics"],
      posted: "1 week ago",
    },
    {
      id: "5",
      title: "Senior DevOps Engineer",
      department: "engineering",
      location: "Austin, TX / Remote",
      type: "Full-time",
      salary: "$100k - $140k",
      experience: "4+ years",
      description:
        "Build and maintain scalable infrastructure for high-frequency trading systems. Ensure 99.99% uptime and optimize performance for mission-critical applications.",
      requirements: [
        "4+ years of DevOps/Infrastructure experience",
        "Expertise in AWS, Kubernetes, Docker",
        "Experience with CI/CD pipelines",
        "Knowledge of monitoring and logging tools",
        "Strong automation skills",
      ],
      benefits: [
        "Competitive salary",
        "Infrastructure ownership",
        "Latest technology stack",
        "Remote flexibility",
        "On-call compensation",
      ],
      skills: ["AWS", "Kubernetes", "Docker", "Terraform", "Monitoring"],
      posted: "5 days ago",
    },
    {
      id: "6",
      title: "Frontend Developer - React Specialist",
      department: "engineering",
      location: "Remote",
      type: "Full-time",
      salary: "$90k - $130k",
      experience: "3+ years",
      description:
        "Create beautiful, responsive, and performant user interfaces for trading applications. Work closely with designers and backend engineers to deliver exceptional user experiences.",
      requirements: [
        "3+ years of React development experience",
        "Proficiency in TypeScript, CSS, HTML",
        "Experience with state management (Redux, Context)",
        "Knowledge of modern build tools",
        "Eye for design and user experience",
      ],
      benefits: [
        "100% remote work",
        "Flexible schedule",
        "Modern tech stack",
        "Design collaboration",
        "User impact visibility",
      ],
      skills: ["React", "TypeScript", "CSS", "Redux", "Webpack"],
      posted: "4 days ago",
    },
    // NEW MARKETING POSITIONS
    {
      id: "7",
      title: "Senior Marketing Manager - Digital Growth",
      department: "marketing",
      location: "New York, NY / Remote",
      type: "Full-time",
      salary: "$95k - $135k",
      experience: "4+ years",
      description:
        "Lead digital marketing initiatives to drive user acquisition and engagement for our trading platform. Develop comprehensive marketing strategies across multiple channels including social media, content marketing, and paid advertising.",
      requirements: [
        "4+ years of digital marketing experience",
        "Experience with fintech or financial services marketing",
        "Proficiency in Google Analytics, Facebook Ads, LinkedIn Ads",
        "Strong analytical and data-driven approach",
        "Experience with marketing automation tools",
      ],
      benefits: [
        "Competitive salary and performance bonuses",
        "Marketing budget ownership",
        "Remote work flexibility",
        "Professional development opportunities",
        "Cross-functional collaboration",
      ],
      skills: [
        "Digital Marketing",
        "Google Analytics",
        "Facebook Ads",
        "SEO",
        "Content Strategy",
      ],
      posted: "2 days ago",
      urgent: true,
    },
    {
      id: "8",
      title: "Content Marketing Specialist",
      department: "marketing",
      location: "Remote",
      type: "Full-time",
      salary: "$65k - $85k",
      experience: "2+ years",
      description:
        "Create compelling content that educates and engages our trading community. Develop blog posts, tutorials, whitepapers, and social media content that drives brand awareness and user education.",
      requirements: [
        "2+ years of content marketing experience",
        "Excellent writing and communication skills",
        "Knowledge of financial markets and trading",
        "Experience with SEO and content management systems",
        "Ability to translate complex topics into accessible content",
      ],
      benefits: [
        "Remote-first culture",
        "Creative freedom and ownership",
        "Learning stipend",
        "Flexible working hours",
        "Health and wellness benefits",
      ],
      skills: [
        "Content Writing",
        "SEO",
        "WordPress",
        "Social Media",
        "Video Production",
      ],
      posted: "4 days ago",
    },
    {
      id: "9",
      title: "Marketing Analytics Manager",
      department: "marketing",
      location: "San Francisco, CA / Remote",
      type: "Full-time",
      salary: "$100k - $140k",
      experience: "3+ years",
      description:
        "Drive data-driven marketing decisions by analyzing campaign performance, user behavior, and market trends. Build comprehensive reporting dashboards and provide actionable insights to optimize marketing ROI.",
      requirements: [
        "3+ years of marketing analytics experience",
        "Proficiency in SQL, Python, and data visualization tools",
        "Experience with marketing attribution and funnel analysis",
        "Strong statistical analysis skills",
        "Experience with A/B testing and experimentation",
      ],
      benefits: [
        "Competitive compensation package",
        "Data tools and resources",
        "Professional development budget",
        "Flexible schedule",
        "Stock options",
      ],
      skills: ["SQL", "Python", "Tableau", "Google Analytics", "A/B Testing"],
      posted: "1 week ago",
    },
    {
      id: "10",
      title: "Brand Marketing Director",
      department: "marketing",
      location: "New York, NY",
      type: "Full-time",
      salary: "$140k - $180k",
      experience: "6+ years",
      description:
        "Shape and execute our brand strategy to establish StockVision as the leading trading platform. Lead brand positioning, messaging, and creative campaigns that resonate with traders and investors.",
      requirements: [
        "6+ years of brand marketing experience",
        "Experience in fintech or financial services",
        "Strong creative and strategic thinking",
        "Leadership and team management experience",
        "Experience with brand research and positioning",
      ],
      benefits: [
        "Executive compensation package",
        "Brand strategy ownership",
        "Team leadership opportunities",
        "Creative campaign budget",
        "Industry conference speaking opportunities",
      ],
      skills: [
        "Brand Strategy",
        "Creative Direction",
        "Team Leadership",
        "Campaign Management",
        "Market Research",
      ],
      posted: "3 days ago",
      urgent: true,
    },
    {
      id: "11",
      title: "Performance Marketing Specialist",
      department: "marketing",
      location: "Remote",
      type: "Full-time",
      salary: "$70k - $95k",
      experience: "2+ years",
      description:
        "Optimize paid advertising campaigns across Google, Facebook, LinkedIn, and other platforms to drive qualified user acquisition. Focus on ROI optimization and scaling successful campaigns.",
      requirements: [
        "2+ years of performance marketing experience",
        "Google Ads and Facebook Ads certification",
        "Experience with bid management and optimization",
        "Strong analytical skills and attention to detail",
        "Knowledge of conversion tracking and attribution",
      ],
      benefits: [
        "Performance-based bonuses",
        "Campaign budget management",
        "Remote work flexibility",
        "Marketing tools and software",
        "Career advancement opportunities",
      ],
      skills: [
        "Google Ads",
        "Facebook Ads",
        "PPC",
        "Conversion Optimization",
        "Analytics",
      ],
      posted: "5 days ago",
    },
    // NEW SALES POSITIONS
    {
      id: "12",
      title: "Enterprise Sales Director",
      department: "sales",
      location: "New York, NY",
      type: "Full-time",
      salary: "$120k - $180k + Commission",
      experience: "5+ years",
      description:
        "Lead enterprise sales efforts targeting institutional clients, hedge funds, and professional trading firms. Build and maintain relationships with high-value prospects and manage complex sales cycles.",
      requirements: [
        "5+ years of enterprise B2B sales experience",
        "Experience selling to financial institutions",
        "Proven track record of exceeding sales quotas",
        "Strong presentation and negotiation skills",
        "Knowledge of trading platforms and financial markets",
      ],
      benefits: [
        "Uncapped commission structure",
        "Equity participation",
        "Travel and entertainment budget",
        "Sales enablement tools",
        "Leadership development programs",
      ],
      skills: [
        "Enterprise Sales",
        "B2B Sales",
        "CRM",
        "Presentation",
        "Negotiation",
      ],
      posted: "1 day ago",
      urgent: true,
    },
    {
      id: "13",
      title: "Business Development Manager",
      department: "sales",
      location: "San Francisco, CA / Remote",
      type: "Full-time",
      salary: "$90k - $130k + Commission",
      experience: "3+ years",
      description:
        "Identify and develop strategic partnerships with financial advisors, trading educators, and fintech companies. Drive business growth through channel partnerships and strategic alliances.",
      requirements: [
        "3+ years of business development experience",
        "Experience in fintech or financial services",
        "Strong relationship building skills",
        "Strategic thinking and planning abilities",
        "Experience with partnership agreements",
      ],
      benefits: [
        "Partnership success bonuses",
        "Flexible work arrangements",
        "Conference and networking budgets",
        "Professional development",
        "Stock options",
      ],
      skills: [
        "Business Development",
        "Partnership Management",
        "Strategic Planning",
        "Networking",
        "Contract Negotiation",
      ],
      posted: "6 days ago",
    },
    {
      id: "14",
      title: "Inside Sales Representative",
      department: "sales",
      location: "Austin, TX / Remote",
      type: "Full-time",
      salary: "$55k - $75k + Commission",
      experience: "1+ years",
      description:
        "Generate leads and convert prospects into paying customers through outbound calling, email campaigns, and product demonstrations. Focus on small to mid-size trading businesses and individual traders.",
      requirements: [
        "1+ years of inside sales experience",
        "Excellent communication and phone skills",
        "Experience with CRM systems",
        "Goal-oriented and self-motivated",
        "Interest in financial markets and trading",
      ],
      benefits: [
        "Commission and bonus opportunities",
        "Sales training and mentorship",
        "Career advancement path",
        "Remote work options",
        "Health and dental benefits",
      ],
      skills: [
        "Inside Sales",
        "Cold Calling",
        "CRM",
        "Lead Generation",
        "Product Demos",
      ],
      posted: "3 days ago",
    },
    {
      id: "15",
      title: "Customer Success Manager",
      department: "sales",
      location: "Remote",
      type: "Full-time",
      salary: "$80k - $110k",
      experience: "2+ years",
      description:
        "Ensure customer satisfaction and drive expansion revenue from existing accounts. Help customers maximize value from our platform through onboarding, training, and ongoing support.",
      requirements: [
        "2+ years of customer success experience",
        "Experience with SaaS or fintech products",
        "Strong analytical and problem-solving skills",
        "Excellent communication and presentation skills",
        "Knowledge of trading platforms preferred",
      ],
      benefits: [
        "Customer success bonuses",
        "Professional development opportunities",
        "Remote-first culture",
        "Customer conference attendance",
        "Career growth potential",
      ],
      skills: [
        "Customer Success",
        "Account Management",
        "SaaS",
        "Analytics",
        "Training",
      ],
      posted: "1 week ago",
    },
    // NEW DESIGN POSITION
    {
      id: "16",
      title: "Senior UX/UI Designer - Trading Platform",
      department: "design",
      location: "San Francisco, CA / Remote",
      type: "Full-time",
      salary: "$110k - $150k",
      experience: "4+ years",
      description:
        "Design intuitive and powerful user experiences for our trading platform. Create user-centered designs that make complex financial data accessible and actionable for traders of all levels.",
      requirements: [
        "4+ years of UX/UI design experience",
        "Experience designing fintech or trading applications",
        "Proficiency in Figma, Sketch, and prototyping tools",
        "Strong understanding of user research and testing",
        "Knowledge of accessibility and responsive design",
      ],
      benefits: [
        "Creative freedom and ownership",
        "Design tool budget",
        "User research participation",
        "Conference and workshop attendance",
        "Collaborative design environment",
      ],
      skills: [
        "UX Design",
        "UI Design",
        "Figma",
        "Prototyping",
        "User Research",
      ],
      posted: "2 days ago",
    },
    // ADDITIONAL ENGINEERING POSITIONS
    {
      id: "17",
      title: "Mobile App Developer - React Native",
      department: "engineering",
      location: "Remote",
      type: "Full-time",
      salary: "$100k - $140k",
      experience: "3+ years",
      description:
        "Develop and maintain our mobile trading application using React Native. Ensure optimal performance and user experience across iOS and Android platforms.",
      requirements: [
        "3+ years of React Native development",
        "Experience with iOS and Android deployment",
        "Knowledge of mobile app optimization",
        "Understanding of trading app requirements",
        "Experience with real-time data handling",
      ],
      benefits: [
        "Mobile development focus",
        "Latest device testing budget",
        "Remote work flexibility",
        "Performance optimization challenges",
        "App store visibility",
      ],
      skills: [
        "React Native",
        "iOS",
        "Android",
        "Mobile Development",
        "Real-time Data",
      ],
      posted: "4 days ago",
    },
    {
      id: "18",
      title: "Backend Engineer - Python/Django",
      department: "engineering",
      location: "Chicago, IL / Remote",
      type: "Full-time",
      salary: "$105k - $145k",
      experience: "3+ years",
      description:
        "Build and scale backend services that power our trading platform. Work on high-performance APIs, data processing systems, and trading infrastructure.",
      requirements: [
        "3+ years of Python/Django experience",
        "Experience with high-performance APIs",
        "Knowledge of database optimization",
        "Understanding of trading systems",
        "Experience with microservices architecture",
      ],
      benefits: [
        "Backend technology ownership",
        "Performance optimization challenges",
        "Scalability problem solving",
        "Trading system exposure",
        "Technical mentorship",
      ],
      skills: ["Python", "Django", "PostgreSQL", "Redis", "Microservices"],
      posted: "1 week ago",
    },
    // ADDITIONAL DATA POSITIONS
    {
      id: "19",
      title: "Quantitative Analyst",
      department: "data",
      location: "New York, NY",
      type: "Full-time",
      salary: "$130k - $180k",
      experience: "2+ years",
      description:
        "Develop quantitative models and trading strategies using statistical analysis and machine learning. Work with large datasets to identify market patterns and opportunities.",
      requirements: [
        "MS/PhD in Mathematics, Physics, or Finance",
        "2+ years of quantitative analysis experience",
        "Proficiency in Python, R, and MATLAB",
        "Strong statistical and mathematical background",
        "Experience with financial modeling",
      ],
      benefits: [
        "Quantitative research focus",
        "Access to market data",
        "Research publication opportunities",
        "Conference presentation opportunities",
        "Collaborative research environment",
      ],
      skills: [
        "Quantitative Analysis",
        "Python",
        "R",
        "Statistical Modeling",
        "Financial Mathematics",
      ],
      posted: "3 days ago",
    },
    // ADDITIONAL PRODUCT POSITION
    {
      id: "20",
      title: "Senior Product Designer",
      department: "product",
      location: "San Francisco, CA / Remote",
      type: "Full-time",
      salary: "$120k - $160k",
      experience: "4+ years",
      description:
        "Lead product design initiatives for new features and improvements to our trading platform. Collaborate with product managers and engineers to create exceptional user experiences.",
      requirements: [
        "4+ years of product design experience",
        "Experience with fintech or complex web applications",
        "Strong portfolio demonstrating design process",
        "Experience with design systems",
        "User research and testing experience",
      ],
      benefits: [
        "Design leadership opportunities",
        "Product strategy influence",
        "User research participation",
        "Design system ownership",
        "Cross-functional collaboration",
      ],
      skills: [
        "Product Design",
        "Design Systems",
        "User Research",
        "Prototyping",
        "Collaboration",
      ],
      posted: "5 days ago",
    },
  ];

  const filteredJobs =
    selectedDepartment === "all"
      ? jobPostings
      : jobPostings.filter((job) => job.department === selectedDepartment);

  const getJobTypeColor = (type: string) => {
    switch (type) {
      case "Full-time":
        return "bg-cyber-green/20 text-cyber-green border-cyber-green/30";
      case "Part-time":
        return "bg-cyber-blue/20 text-cyber-blue border-cyber-blue/30";
      case "Contract":
        return "bg-cyber-yellow/20 text-cyber-yellow border-cyber-yellow/30";
      case "Intern":
        return "bg-cyber-purple/20 text-cyber-purple border-cyber-purple/30";
      default:
        return "bg-cyber-blue/20 text-cyber-blue border-cyber-blue/30";
    }
  };

  const handleJobSelect = (job: JobPosting) => {
    setSelectedJob(job);
    setApplication((prev) => ({ ...prev, jobId: job.id }));
  };

  const handleApplyNow = (job: JobPosting) => {
    setSelectedJob(job);
    setApplication((prev) => ({ ...prev, jobId: job.id }));
    setShowApplicationModal(true);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.type === "application/pdf" || file.name.endsWith(".pdf")) {
        setApplication((prev) => ({ ...prev, resume: file }));
      } else {
        alert("Please upload a PDF file for your resume.");
      }
    }
  };

  const triggerFileUpload = () => {
    fileInputRef.current?.click();
  };

  const removeResume = () => {
    setApplication((prev) => ({ ...prev, resume: null }));
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmitApplication = async () => {
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setApplicationSubmitted(true);

    // Reset form after 3 seconds
    setTimeout(() => {
      setApplicationSubmitted(false);
      setShowApplicationModal(false);
      setApplication({
        jobId: "",
        personalInfo: {
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          linkedin: "",
          portfolio: "",
        },
        experience: "",
        coverLetter: "",
        resume: null,
        expectedSalary: "",
        availableDate: "",
      });
    }, 3000);
  };

  const companyBenefits = [
    {
      icon: Heart,
      title: "Health & Wellness",
      description: "Comprehensive health, dental, and vision coverage",
    },
    {
      icon: Coffee,
      title: "Work-Life Balance",
      description: "Flexible hours and unlimited PTO",
    },
    {
      icon: TrendingUp,
      title: "Career Growth",
      description: "Professional development and mentorship programs",
    },
    {
      icon: Zap,
      title: "Innovation",
      description: "Work with cutting-edge technology and tools",
    },
  ];

  return (
    <div className="min-h-screen bg-cyber-black cyber-grid">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyber-blue via-white to-cyber-purple bg-clip-text text-transparent mb-6">
            Join Our Team
          </h1>
          <p className="text-xl text-cyber-blue/90 max-w-3xl mx-auto mb-8">
            Build the future of financial technology with talented individuals
            who are passionate about innovation
          </p>

          {/* Company Benefits */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {companyBenefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white/5 backdrop-blur-md border border-cyber-blue/20 rounded-2xl p-6 text-center"
                >
                  <Icon className="h-8 w-8 text-cyber-blue mx-auto mb-3" />
                  <h3 className="text-white font-semibold mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-white/70 text-sm">{benefit.description}</p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar - Department Filter */}
          <div className="lg:col-span-1">
            <Card className="p-6 bg-white/10 backdrop-blur-md border border-cyber-blue/20 sticky top-8">
              <h3 className="text-white font-semibold mb-4">Departments</h3>
              <div className="space-y-2">
                {departments.map((dept) => (
                  <button
                    key={dept.id}
                    onClick={() => setSelectedDepartment(dept.id)}
                    className={cn(
                      "w-full text-left px-3 py-2 rounded-lg transition-all duration-200",
                      selectedDepartment === dept.id
                        ? "bg-cyber-blue/20 text-cyber-blue"
                        : "text-white/70 hover:bg-white/5 hover:text-white",
                    )}
                  >
                    <div className="flex justify-between items-center">
                      <span>{dept.label}</span>
                      <Badge className="bg-white/10 text-white/70 border-white/20">
                        {dept.count}
                      </Badge>
                    </div>
                  </button>
                ))}
              </div>

              {/* Quick Stats */}
              <div className="mt-8 pt-6 border-t border-white/10">
                <h4 className="text-white font-semibold mb-4">Quick Stats</h4>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-white/70">Open Positions</span>
                    <span className="text-cyber-green font-semibold">12</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/70">Team Size</span>
                    <span className="text-cyber-blue font-semibold">150+</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/70">Global Offices</span>
                    <span className="text-cyber-purple font-semibold">5</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Job Listings */}
            <div className="space-y-6">
              {filteredJobs.map((job, index) => (
                <motion.div
                  key={job.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="p-6 bg-white/10 backdrop-blur-md border border-cyber-blue/20 hover:border-cyber-blue/40 transition-all duration-300 group">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-xl font-bold text-white group-hover:text-cyber-blue transition-colors">
                            {job.title}
                          </h3>
                          {job.urgent && (
                            <Badge className="bg-cyber-red/20 text-cyber-red border-cyber-red/30 animate-pulse">
                              Urgent
                            </Badge>
                          )}
                        </div>

                        <div className="flex flex-wrap items-center gap-4 text-sm text-white/70 mb-3">
                          <div className="flex items-center space-x-1">
                            <Building className="h-4 w-4" />
                            <span className="capitalize">{job.department}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <MapPin className="h-4 w-4" />
                            <span>{job.location}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <DollarSign className="h-4 w-4" />
                            <span>{job.salary}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="h-4 w-4" />
                            <span>{job.posted}</span>
                          </div>
                        </div>

                        <div className="flex items-center space-x-3 mb-4">
                          <Badge className={getJobTypeColor(job.type)}>
                            {job.type}
                          </Badge>
                          <Badge className="bg-white/10 text-white/70 border-white/20">
                            {job.experience}
                          </Badge>
                        </div>

                        <p className="text-white/80 mb-4 line-clamp-2">
                          {job.description}
                        </p>

                        <div className="flex flex-wrap gap-2 mb-4">
                          {job.skills.slice(0, 4).map((skill) => (
                            <Badge
                              key={skill}
                              className="bg-cyber-purple/20 text-cyber-purple border-cyber-purple/30 text-xs"
                            >
                              {skill}
                            </Badge>
                          ))}
                          {job.skills.length > 4 && (
                            <Badge className="bg-white/10 text-white/50 border-white/20 text-xs">
                              +{job.skills.length - 4} more
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <Button
                        variant="outline"
                        onClick={() => handleJobSelect(job)}
                        className="border-cyber-blue/30 text-cyber-blue hover:bg-cyber-blue/10"
                      >
                        View Details
                      </Button>
                      <Button
                        onClick={() => handleApplyNow(job)}
                        className="bg-gradient-to-r from-cyber-green to-cyber-blue hover:from-cyber-green-dark hover:to-cyber-blue-dark text-white"
                      >
                        Apply Now
                      </Button>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Job Details Modal */}
        <AnimatePresence>
          {selectedJob && !showApplicationModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedJob(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-cyber-dark border border-cyber-blue/30 rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-8">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h2 className="text-2xl font-bold text-white mb-2">
                        {selectedJob.title}
                      </h2>
                      <div className="flex items-center space-x-4 text-cyber-blue/80">
                        <span className="capitalize">
                          {selectedJob.department}
                        </span>
                        <span>•</span>
                        <span>{selectedJob.location}</span>
                        <span>•</span>
                        <span>{selectedJob.salary}</span>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedJob(null)}
                      className="text-white/70 hover:text-white"
                    >
                      <X className="h-5 w-5" />
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-6">
                      <div>
                        <h3 className="text-lg font-semibold text-white mb-3">
                          Job Description
                        </h3>
                        <p className="text-white/80 leading-relaxed">
                          {selectedJob.description}
                        </p>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold text-white mb-3">
                          Requirements
                        </h3>
                        <ul className="space-y-2">
                          {selectedJob.requirements.map((req, index) => (
                            <li
                              key={index}
                              className="flex items-start space-x-2"
                            >
                              <CheckCircle className="h-4 w-4 text-cyber-green mt-1 flex-shrink-0" />
                              <span className="text-white/80">{req}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold text-white mb-3">
                          Benefits
                        </h3>
                        <ul className="space-y-2">
                          {selectedJob.benefits.map((benefit, index) => (
                            <li
                              key={index}
                              className="flex items-start space-x-2"
                            >
                              <Star className="h-4 w-4 text-cyber-yellow mt-1 flex-shrink-0" />
                              <span className="text-white/80">{benefit}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="lg:col-span-1">
                      <Card className="p-6 bg-white/5 border border-cyber-blue/20">
                        <h3 className="text-lg font-semibold text-white mb-4">
                          Job Details
                        </h3>
                        <div className="space-y-4">
                          <div>
                            <Label className="text-cyber-blue/70 text-sm">
                              Job Type
                            </Label>
                            <Badge
                              className={cn(
                                "mt-1 block w-fit",
                                getJobTypeColor(selectedJob.type),
                              )}
                            >
                              {selectedJob.type}
                            </Badge>
                          </div>

                          <div>
                            <Label className="text-cyber-blue/70 text-sm">
                              Experience
                            </Label>
                            <p className="text-white mt-1">
                              {selectedJob.experience}
                            </p>
                          </div>

                          <div>
                            <Label className="text-cyber-blue/70 text-sm">
                              Required Skills
                            </Label>
                            <div className="flex flex-wrap gap-2 mt-2">
                              {selectedJob.skills.map((skill) => (
                                <Badge
                                  key={skill}
                                  className="bg-cyber-purple/20 text-cyber-purple border-cyber-purple/30 text-xs"
                                >
                                  {skill}
                                </Badge>
                              ))}
                            </div>
                          </div>

                          <div className="pt-4">
                            <Button
                              onClick={() => handleApplyNow(selectedJob)}
                              className="w-full bg-gradient-to-r from-cyber-green to-cyber-blue hover:from-cyber-green-dark hover:to-cyber-blue-dark text-white"
                            >
                              Apply for this Position
                            </Button>
                          </div>
                        </div>
                      </Card>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Application Modal */}
        <AnimatePresence>
          {showApplicationModal && selectedJob && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setShowApplicationModal(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-cyber-dark border border-cyber-blue/30 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                {applicationSubmitted ? (
                  <div className="p-8 text-center">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-20 h-20 bg-cyber-green/20 rounded-full flex items-center justify-center mx-auto mb-6"
                    >
                      <CheckCircle className="h-10 w-10 text-cyber-green" />
                    </motion.div>
                    <h3 className="text-2xl font-bold text-white mb-4">
                      Application Submitted!
                    </h3>
                    <p className="text-cyber-green/80 mb-6">
                      Thank you for your interest in the {selectedJob.title}{" "}
                      position. We'll review your application and get back to
                      you within 5-7 business days.
                    </p>
                    <div className="bg-white/5 rounded-lg p-4">
                      <p className="text-white/70 text-sm">
                        What's next? Our hiring team will review your
                        application and may reach out for an initial screening
                        call.
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="p-8">
                    <div className="flex justify-between items-center mb-6">
                      <div>
                        <h3 className="text-xl font-bold text-white">
                          Apply for {selectedJob.title}
                        </h3>
                        <p className="text-cyber-blue/80 text-sm">
                          {selectedJob.department} • {selectedJob.location}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setShowApplicationModal(false)}
                        className="text-white/70 hover:text-white"
                      >
                        <X className="h-5 w-5" />
                      </Button>
                    </div>

                    <div className="space-y-6">
                      {/* Personal Information */}
                      <div>
                        <h4 className="text-lg font-semibold text-white mb-4">
                          Personal Information
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label className="text-white text-sm mb-2 block">
                              First Name *
                            </Label>
                            <Input
                              value={application.personalInfo.firstName}
                              onChange={(e) =>
                                setApplication((prev) => ({
                                  ...prev,
                                  personalInfo: {
                                    ...prev.personalInfo,
                                    firstName: e.target.value,
                                  },
                                }))
                              }
                              className="bg-black/50 border-cyber-blue/30 text-white"
                              required
                            />
                          </div>
                          <div>
                            <Label className="text-white text-sm mb-2 block">
                              Last Name *
                            </Label>
                            <Input
                              value={application.personalInfo.lastName}
                              onChange={(e) =>
                                setApplication((prev) => ({
                                  ...prev,
                                  personalInfo: {
                                    ...prev.personalInfo,
                                    lastName: e.target.value,
                                  },
                                }))
                              }
                              className="bg-black/50 border-cyber-blue/30 text-white"
                              required
                            />
                          </div>
                          <div>
                            <Label className="text-white text-sm mb-2 block">
                              Email *
                            </Label>
                            <Input
                              type="email"
                              value={application.personalInfo.email}
                              onChange={(e) =>
                                setApplication((prev) => ({
                                  ...prev,
                                  personalInfo: {
                                    ...prev.personalInfo,
                                    email: e.target.value,
                                  },
                                }))
                              }
                              className="bg-black/50 border-cyber-blue/30 text-white"
                              required
                            />
                          </div>
                          <div>
                            <Label className="text-white text-sm mb-2 block">
                              Phone
                            </Label>
                            <Input
                              value={application.personalInfo.phone}
                              onChange={(e) =>
                                setApplication((prev) => ({
                                  ...prev,
                                  personalInfo: {
                                    ...prev.personalInfo,
                                    phone: e.target.value,
                                  },
                                }))
                              }
                              className="bg-black/50 border-cyber-blue/30 text-white"
                            />
                          </div>
                          <div>
                            <Label className="text-white text-sm mb-2 block">
                              LinkedIn Profile
                            </Label>
                            <Input
                              value={application.personalInfo.linkedin}
                              onChange={(e) =>
                                setApplication((prev) => ({
                                  ...prev,
                                  personalInfo: {
                                    ...prev.personalInfo,
                                    linkedin: e.target.value,
                                  },
                                }))
                              }
                              className="bg-black/50 border-cyber-blue/30 text-white"
                              placeholder="https://linkedin.com/in/yourprofile"
                            />
                          </div>
                          <div>
                            <Label className="text-white text-sm mb-2 block">
                              Portfolio/Website
                            </Label>
                            <Input
                              value={application.personalInfo.portfolio}
                              onChange={(e) =>
                                setApplication((prev) => ({
                                  ...prev,
                                  personalInfo: {
                                    ...prev.personalInfo,
                                    portfolio: e.target.value,
                                  },
                                }))
                              }
                              className="bg-black/50 border-cyber-blue/30 text-white"
                              placeholder="https://yourportfolio.com"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Resume Upload */}
                      <div>
                        <h4 className="text-lg font-semibold text-white mb-4">
                          Resume *
                        </h4>
                        <div className="border-2 border-dashed border-cyber-blue/30 rounded-lg p-6 text-center">
                          {application.resume ? (
                            <div className="flex items-center justify-between bg-cyber-blue/10 rounded-lg p-4">
                              <div className="flex items-center space-x-3">
                                <FileText className="h-8 w-8 text-cyber-blue" />
                                <div className="text-left">
                                  <p className="text-white font-medium">
                                    {application.resume.name}
                                  </p>
                                  <p className="text-cyber-blue/80 text-sm">
                                    {(
                                      application.resume.size /
                                      1024 /
                                      1024
                                    ).toFixed(2)}{" "}
                                    MB
                                  </p>
                                </div>
                              </div>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={removeResume}
                                className="text-cyber-red hover:text-cyber-red-light"
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          ) : (
                            <div>
                              <Upload className="h-12 w-12 text-cyber-blue/60 mx-auto mb-4" />
                              <p className="text-white mb-2">
                                Upload your resume
                              </p>
                              <p className="text-cyber-blue/60 text-sm mb-4">
                                PDF format preferred (Max 10MB)
                              </p>
                              <Button
                                onClick={triggerFileUpload}
                                className="bg-cyber-blue/20 border border-cyber-blue/30 text-cyber-blue hover:bg-cyber-blue/30"
                              >
                                Choose File
                              </Button>
                            </div>
                          )}
                          <input
                            ref={fileInputRef}
                            type="file"
                            accept=".pdf"
                            onChange={handleFileUpload}
                            className="hidden"
                          />
                        </div>
                      </div>

                      {/* Additional Information */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label className="text-white text-sm mb-2 block">
                            Years of Experience
                          </Label>
                          <Input
                            value={application.experience}
                            onChange={(e) =>
                              setApplication((prev) => ({
                                ...prev,
                                experience: e.target.value,
                              }))
                            }
                            className="bg-black/50 border-cyber-blue/30 text-white"
                            placeholder="e.g., 5 years"
                          />
                        </div>
                        <div>
                          <Label className="text-white text-sm mb-2 block">
                            Expected Salary
                          </Label>
                          <Input
                            value={application.expectedSalary}
                            onChange={(e) =>
                              setApplication((prev) => ({
                                ...prev,
                                expectedSalary: e.target.value,
                              }))
                            }
                            className="bg-black/50 border-cyber-blue/30 text-white"
                            placeholder="e.g., $120,000"
                          />
                        </div>
                      </div>

                      <div>
                        <Label className="text-white text-sm mb-2 block">
                          Available Start Date
                        </Label>
                        <Input
                          type="date"
                          value={application.availableDate}
                          onChange={(e) =>
                            setApplication((prev) => ({
                              ...prev,
                              availableDate: e.target.value,
                            }))
                          }
                          className="bg-black/50 border-cyber-blue/30 text-white"
                        />
                      </div>

                      {/* Cover Letter */}
                      <div>
                        <Label className="text-white text-sm mb-2 block">
                          Cover Letter
                        </Label>
                        <Textarea
                          value={application.coverLetter}
                          onChange={(e) =>
                            setApplication((prev) => ({
                              ...prev,
                              coverLetter: e.target.value,
                            }))
                          }
                          className="bg-black/50 border-cyber-blue/30 text-white h-32"
                          placeholder="Tell us why you're interested in this position and what makes you a great fit..."
                        />
                      </div>

                      {/* Submit Button */}
                      <div className="flex justify-end space-x-4">
                        <Button
                          variant="outline"
                          onClick={() => setShowApplicationModal(false)}
                          className="border-cyber-blue/30 text-cyber-blue hover:bg-cyber-blue/10"
                        >
                          Cancel
                        </Button>
                        <Button
                          onClick={handleSubmitApplication}
                          disabled={
                            isSubmitting ||
                            !application.personalInfo.firstName ||
                            !application.personalInfo.lastName ||
                            !application.personalInfo.email ||
                            !application.resume
                          }
                          className="bg-gradient-to-r from-cyber-green to-cyber-blue hover:from-cyber-green-dark hover:to-cyber-blue-dark text-white"
                        >
                          {isSubmitting ? (
                            <div className="flex items-center space-x-2">
                              <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                              <span>Submitting...</span>
                            </div>
                          ) : (
                            <div className="flex items-center space-x-2">
                              <Send className="h-4 w-4" />
                              <span>Submit Application</span>
                            </div>
                          )}
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Careers;
