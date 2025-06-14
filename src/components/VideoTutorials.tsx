import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Play,
  Pause,
  Clock,
  Users,
  Star,
  BookOpen,
  TrendingUp,
  Shield,
  Brain,
  Target,
  DollarSign,
  BarChart3,
  Zap,
  X,
  ThumbsUp,
  Eye,
  Volume2,
  VolumeX,
  Maximize,
  SkipBack,
  SkipForward,
  Download,
  Share,
  Bookmark,
  Activity,
  CheckCircle,
  Headphones,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface VideoTutorial {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  duration: string;
  views: string;
  rating: number;
  level: "Beginner" | "Intermediate" | "Advanced";
  category: string;
  instructor: string;
  tags: string[];
  videoUrl: string;
  chapters: { title: string; time: string }[];
}

const VideoTutorials = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedVideo, setSelectedVideo] = useState<VideoTutorial | null>(
    null,
  );
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  const categories = [
    { id: "all", label: "All Tutorials", icon: BookOpen },
    { id: "basics", label: "Trading Basics", icon: TrendingUp },
    { id: "analysis", label: "Technical Analysis", icon: BarChart3 },
    { id: "risk", label: "Risk Management", icon: Shield },
    { id: "ai", label: "AI & Algorithms", icon: Brain },
    { id: "strategy", label: "Trading Strategies", icon: Target },
  ];

  const tutorials: VideoTutorial[] = [
    {
      id: "1",
      title: "Stock Market Fundamentals",
      description:
        "Essential concepts every trader needs to know. Learn market basics, chart reading, and portfolio building in digestible segments.",
      thumbnail:
        "https://images.pexels.com/photos/5849556/pexels-photo-5849556.jpeg",
      duration: "45:30",
      views: "2.3M",
      rating: 4.9,
      level: "Beginner",
      category: "basics",
      instructor: "Sarah Chen, CFA",
      tags: ["stocks", "basics", "investing", "portfolio"],
      videoUrl:
        "https://videos.pexels.com/video-files/7652692/7652692-hd_1280_720_25fps.mp4",
      chapters: [
        { title: "Market Overview", time: "0:00" },
        { title: "Reading Charts", time: "12:30" },
        { title: "Portfolio Basics", time: "28:15" },
        { title: "Getting Started", time: "38:45" },
      ],
    },
    {
      id: "2",
      title: "Technical Analysis Essentials",
      description:
        "Master key technical indicators, chart patterns, and analysis techniques used by professional traders daily.",
      thumbnail:
        "https://images.pexels.com/photos/5716001/pexels-photo-5716001.jpeg",
      duration: "52:15",
      views: "1.8M",
      rating: 4.8,
      level: "Intermediate",
      category: "analysis",
      instructor: "Michael Rodriguez",
      tags: ["charts", "patterns", "technical", "indicators"],
      videoUrl:
        "https://videos.pexels.com/video-files/8369984/8369984-sd_426_240_30fps.mp4",
      chapters: [
        { title: "Candlestick Patterns", time: "0:00" },
        { title: "Support & Resistance", time: "18:15" },
        { title: "Moving Averages", time: "32:30" },
        { title: "RSI & MACD", time: "45:10" },
      ],
    },
    {
      id: "3",
      title: "AI Trading Introduction",
      description:
        "Discover how AI and machine learning enhance trading decisions with practical examples and real-world applications.",
      thumbnail:
        "https://images.pexels.com/photos/5849556/pexels-photo-5849556.jpeg",
      duration: "38:45",
      views: "956K",
      rating: 4.7,
      level: "Advanced",
      category: "ai",
      instructor: "Dr. Emily Watson",
      tags: ["AI", "algorithms", "automation", "ML"],
      videoUrl:
        "https://videos.pexels.com/video-files/7578640/7578640-sd_426_226_25fps.mp4",
      chapters: [
        { title: "AI Trading Basics", time: "0:00" },
        { title: "ML Applications", time: "15:20" },
        { title: "Algorithm Setup", time: "28:15" },
        { title: "Testing Strategies", time: "35:30" },
      ],
    },
    {
      id: "4",
      title: "Risk Management Fundamentals",
      description:
        "Protect your capital with proven risk management techniques, position sizing, and portfolio protection strategies.",
      thumbnail:
        "https://images.pexels.com/photos/5716001/pexels-photo-5716001.jpeg",
      duration: "42:15",
      views: "1.2M",
      rating: 4.9,
      level: "Intermediate",
      category: "risk",
      instructor: "James Miller, CFP",
      tags: ["risk", "portfolio", "protection", "strategy"],
      videoUrl:
        "https://videos.pexels.com/video-files/8970369/8970369-sd_360_640_30fps.mp4",
      chapters: [
        { title: "Risk Types", time: "0:00" },
        { title: "Position Sizing", time: "14:45" },
        { title: "Stop-Loss Setup", time: "28:30" },
        { title: "Diversification", time: "38:20" },
      ],
    },
    {
      id: "5",
      title: "Day Trading Strategies",
      description:
        "Professional day trading techniques including scalping, momentum trading, and psychological discipline.",
      thumbnail:
        "https://images.pexels.com/photos/5849556/pexels-photo-5849556.jpeg",
      duration: "58:30",
      views: "3.1M",
      rating: 4.8,
      level: "Advanced",
      category: "strategy",
      instructor: "Alex Thompson",
      tags: ["daytrading", "strategies", "profits", "scalping"],
      videoUrl:
        "https://videos.pexels.com/video-files/7652692/7652692-hd_1280_720_25fps.mp4",
      chapters: [
        { title: "Day Trading Setup", time: "0:00" },
        { title: "Pre-Market Analysis", time: "16:15" },
        { title: "Scalping Techniques", time: "32:30" },
        { title: "Psychology & Discipline", time: "48:20" },
      ],
    },
    {
      id: "6",
      title: "Options Trading Basics",
      description:
        "Understanding options, Greeks, basic strategies, and how to profit from options trading with practical examples.",
      thumbnail:
        "https://images.pexels.com/photos/5716001/pexels-photo-5716001.jpeg",
      duration: "48:20",
      views: "1.5M",
      rating: 4.6,
      level: "Intermediate",
      category: "basics",
      instructor: "Lisa Chang",
      tags: ["options", "derivatives", "strategy", "greeks"],
      videoUrl:
        "https://videos.pexels.com/video-files/8369984/8369984-sd_426_240_30fps.mp4",
      chapters: [
        { title: "Options Basics", time: "0:00" },
        { title: "The Greeks", time: "18:30" },
        { title: "Basic Strategies", time: "32:15" },
        { title: "Trading Psychology", time: "42:55" },
      ],
    },
  ];

  const filteredTutorials =
    selectedCategory === "all"
      ? tutorials
      : tutorials.filter((tutorial) => tutorial.category === selectedCategory);

  const getLevelColor = (level: string) => {
    switch (level) {
      case "Beginner":
        return "bg-cyber-green/20 text-cyber-green border-cyber-green/30";
      case "Intermediate":
        return "bg-cyber-yellow/20 text-cyber-yellow border-cyber-yellow/30";
      case "Advanced":
        return "bg-cyber-red/20 text-cyber-red border-cyber-red/30";
      default:
        return "bg-cyber-blue/20 text-cyber-blue border-cyber-blue/30";
    }
  };

  const playVideo = (tutorial: VideoTutorial) => {
    setSelectedVideo(tutorial);
    setShowVideoModal(true);
    setIsPlaying(false);
    setCurrentTime(0);
  };

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (videoRef.current) {
      const rect = e.currentTarget.getBoundingClientRect();
      const pos = (e.clientX - rect.left) / rect.width;
      videoRef.current.currentTime = pos * duration;
    }
  };

  const formatTime = (time: number) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = Math.floor(time % 60);

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
    }
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const skipTime = (seconds: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime += seconds;
    }
  };

  const changePlaybackRate = () => {
    const rates = [0.5, 0.75, 1, 1.25, 1.5, 2];
    const currentIndex = rates.indexOf(playbackRate);
    const nextRate = rates[(currentIndex + 1) % rates.length];
    setPlaybackRate(nextRate);
    if (videoRef.current) {
      videoRef.current.playbackRate = nextRate;
    }
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      modalRef.current?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const jumpToChapter = (time: string) => {
    if (videoRef.current) {
      const [minutes, seconds] = time.split(":").map(Number);
      videoRef.current.currentTime = minutes * 60 + seconds;
    }
  };

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      const handleEnded = () => setIsPlaying(false);
      const handleFullscreenChange = () => {
        setIsFullscreen(!!document.fullscreenElement);
      };

      video.addEventListener("ended", handleEnded);
      document.addEventListener("fullscreenchange", handleFullscreenChange);

      return () => {
        video.removeEventListener("ended", handleEnded);
        document.removeEventListener(
          "fullscreenchange",
          handleFullscreenChange,
        );
      };
    }
  }, [selectedVideo]);

  return (
    <section className="py-24 bg-gradient-to-br from-cyber-dark via-cyber-black to-cyber-dark relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-20">
        <div
          className="absolute top-10 left-1/4 w-96 h-96 bg-cyber-purple/30 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "0s" }}
        />
        <div
          className="absolute bottom-10 right-1/4 w-80 h-80 bg-cyber-blue/25 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        />
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-cyber-green/20 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "4s" }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyber-blue via-white to-cyber-purple bg-clip-text text-transparent mb-6">
            Master Trading with Full Courses
          </h2>
          <p className="text-xl text-cyber-blue/90 max-w-3xl mx-auto">
            Complete educational video courses from industry experts - from
            beginner basics to advanced professional strategies
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <Button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                variant={
                  selectedCategory === category.id ? "default" : "outline"
                }
                className={cn(
                  "px-6 py-3 rounded-2xl font-semibold transition-all duration-300",
                  selectedCategory === category.id
                    ? "bg-gradient-to-r from-cyber-blue to-cyber-purple text-white shadow-lg shadow-cyber-blue/25"
                    : "border-cyber-blue/30 text-cyber-blue hover:bg-cyber-blue/10 hover:border-cyber-blue/50",
                )}
              >
                <Icon className="h-4 w-4 mr-2" />
                {category.label}
              </Button>
            );
          })}
        </motion.div>

        {/* Video Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="wait">
            {filteredTutorials.map((tutorial, index) => (
              <motion.div
                key={tutorial.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group"
              >
                <Card className="bg-white/10 backdrop-blur-md border border-cyber-blue/20 hover:border-cyber-blue/40 transition-all duration-300 overflow-hidden group-hover:shadow-xl group-hover:shadow-cyber-blue/25">
                  {/* Thumbnail */}
                  <div className="relative aspect-video overflow-hidden">
                    <img
                      src={tutorial.thumbnail}
                      alt={tutorial.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/40 transition-opacity duration-300 group-hover:bg-black/20" />

                    {/* Play Button */}
                    <motion.div
                      className="absolute inset-0 flex items-center justify-center"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Button
                        onClick={() => playVideo(tutorial)}
                        className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md border border-white/30 hover:bg-white/30 transition-all duration-300"
                      >
                        <Play className="h-8 w-8 text-white ml-1" />
                      </Button>
                    </motion.div>

                    {/* Duration Badge */}
                    <div className="absolute bottom-3 right-3 px-3 py-1 bg-black/80 backdrop-blur-sm rounded-lg">
                      <span className="text-white text-sm font-medium flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        {tutorial.duration}
                      </span>
                    </div>

                    {/* Level Badge */}
                    <div className="absolute top-3 left-3">
                      <Badge className={getLevelColor(tutorial.level)}>
                        {tutorial.level}
                      </Badge>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-3 line-clamp-2 group-hover:text-cyber-blue transition-colors duration-300">
                      {tutorial.title}
                    </h3>

                    <p className="text-white/80 text-sm mb-4 line-clamp-3">
                      {tutorial.description}
                    </p>

                    {/* Instructor & Rating */}
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-cyber-blue text-sm font-medium">
                        {tutorial.instructor}
                      </span>
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 text-cyber-yellow fill-current" />
                        <span className="text-cyber-yellow font-medium text-sm">
                          {tutorial.rating}
                        </span>
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="flex items-center justify-between text-white/60 text-sm mb-4">
                      <div className="flex items-center space-x-1">
                        <Eye className="h-4 w-4" />
                        <span>{tutorial.views} views</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <BookOpen className="h-4 w-4" />
                        <span>{tutorial.chapters.length} chapters</span>
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                      {tutorial.tags.slice(0, 3).map((tag) => (
                        <Badge
                          key={tag}
                          className="bg-cyber-purple/20 text-cyber-purple border-cyber-purple/30 text-xs"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Enhanced CTA Section with Pricing Categories */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="bg-white/5 backdrop-blur-md border border-cyber-blue/20 rounded-3xl p-8 max-w-6xl mx-auto">
            <h3 className="text-3xl font-bold text-white mb-4">
              Unlock Premium Trading Education
            </h3>
            <p className="text-cyber-blue/80 mb-8 max-w-3xl mx-auto">
              Choose your learning path and get unlimited access to professional
              trading courses, AI-powered predictions, and exclusive content
            </p>

            {/* Pricing Categories Grid - Basic, Pro, Elite Structure */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {/* Basic Plan */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                whileHover={{ scale: 1.02, y: -4 }}
                className="bg-white/5 border border-cyber-green/20 rounded-2xl p-6 hover:bg-white/10 hover:border-cyber-green/40 transition-all duration-300 group"
              >
                <div className="p-3 bg-cyber-green/20 rounded-xl w-fit mx-auto mb-4 group-hover:shadow-lg group-hover:shadow-cyber-green/25 transition-all duration-300">
                  <TrendingUp className="h-6 w-6 text-cyber-green" />
                </div>
                <h4 className="text-xl font-bold text-white mb-2 text-center">
                  Basic Predictions
                </h4>
                <div className="text-center mb-4">
                  <div className="text-3xl font-bold text-cyber-green mb-1">
                    $9.99
                  </div>
                  <div className="text-sm text-white/60">per month</div>
                </div>
                <ul className="text-sm text-white/80 space-y-2 mb-6">
                  <li>• 50 stock predictions/day</li>
                  <li>• Basic technical analysis</li>
                  <li>• Email alerts</li>
                  <li>• Mobile app access</li>
                  <li>• Community support</li>
                </ul>
                <Button
                  onClick={() =>
                    (window.location.href =
                      "/payment?plan=Basic&price=9.99&billing=monthly&category=predictions&source=video_library")
                  }
                  className="w-full bg-cyber-green hover:bg-cyber-green-dark text-white rounded-xl transition-all duration-300"
                >
                  Start Basic Plan
                </Button>
              </motion.div>

              {/* Pro Plan - Most Popular */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                whileHover={{ scale: 1.02, y: -4 }}
                className="bg-white/5 border border-cyber-blue/30 rounded-2xl p-6 hover:bg-white/10 hover:border-cyber-blue/50 transition-all duration-300 group relative ring-2 ring-cyber-blue/50 scale-105"
              >
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-cyber-blue to-cyber-purple text-white px-3 py-1 rounded-full text-xs font-bold">
                    MOST POPULAR
                  </div>
                </div>
                <div className="p-3 bg-cyber-blue/20 rounded-xl w-fit mx-auto mb-4 group-hover:shadow-lg group-hover:shadow-cyber-blue/25 transition-all duration-300">
                  <BarChart3 className="h-6 w-6 text-cyber-blue" />
                </div>
                <h4 className="text-xl font-bold text-white mb-2 text-center">
                  Pro Predictions
                </h4>
                <div className="text-center mb-4">
                  <div className="text-3xl font-bold text-cyber-blue mb-1">
                    $29.99
                  </div>
                  <div className="text-sm text-white/60">per month</div>
                </div>
                <ul className="text-sm text-white/80 space-y-2 mb-6">
                  <li>• Unlimited AI predictions</li>
                  <li>• Advanced market analysis</li>
                  <li>• Real-time alerts</li>
                  <li>• Full course library access</li>
                  <li>• Priority support</li>
                  <li>• API access</li>
                </ul>
                <Button
                  onClick={() =>
                    (window.location.href =
                      "/payment?plan=Pro&price=29.99&billing=monthly&category=predictions&source=video_library")
                  }
                  className="w-full bg-gradient-to-r from-cyber-blue to-cyber-purple hover:from-cyber-blue-dark hover:to-cyber-purple-dark text-white rounded-xl transition-all duration-300"
                >
                  <Zap className="h-4 w-4 mr-2" />
                  Upgrade to Pro
                </Button>
              </motion.div>

              {/* Elite Plan */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                whileHover={{ scale: 1.02, y: -4 }}
                className="bg-white/5 border border-cyber-purple/20 rounded-2xl p-6 hover:bg-white/10 hover:border-cyber-purple/40 transition-all duration-300 group"
              >
                <div className="p-3 bg-cyber-purple/20 rounded-xl w-fit mx-auto mb-4 group-hover:shadow-lg group-hover:shadow-cyber-purple/25 transition-all duration-300">
                  <Brain className="h-6 w-6 text-cyber-purple" />
                </div>
                <h4 className="text-xl font-bold text-white mb-2 text-center">
                  Elite Predictions
                </h4>
                <div className="text-center mb-4">
                  <div className="text-3xl font-bold text-cyber-purple mb-1">
                    $99.99
                  </div>
                  <div className="text-sm text-white/60">per month</div>
                </div>
                <ul className="text-sm text-white/80 space-y-2 mb-6">
                  <li>• Custom AI model training</li>
                  <li>• Portfolio optimization</li>
                  <li>• 1-on-1 expert consultations</li>
                  <li>• White-label access</li>
                  <li>• Advanced risk modeling</li>
                  <li>• Institutional-grade features</li>
                </ul>
                <Button
                  onClick={() =>
                    (window.location.href =
                      "/payment?plan=Elite&price=99.99&billing=monthly&category=predictions&source=video_library")
                  }
                  className="w-full bg-cyber-purple hover:bg-cyber-purple-dark text-white rounded-xl transition-all duration-300"
                >
                  Get Elite Access
                </Button>
              </motion.div>
            </div>

            {/* Additional Features Section */}
            <div className="bg-gradient-to-r from-cyber-blue/10 to-cyber-purple/10 border border-cyber-blue/20 rounded-2xl p-6 mb-8">
              <h4 className="text-xl font-bold text-white mb-4">
                What's Included in All Plans
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
                <div className="flex items-center space-x-3">
                  <BookOpen className="h-5 w-5 text-cyber-green" />
                  <span className="text-white/80">
                    Full video course library
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <Activity className="h-5 w-5 text-cyber-blue" />
                  <span className="text-white/80">Real-time market data</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Shield className="h-5 w-5 text-cyber-purple" />
                  <span className="text-white/80">Risk management tools</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Users className="h-5 w-5 text-cyber-yellow" />
                  <span className="text-white/80">
                    Trading community access
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <Target className="h-5 w-5 text-cyber-red" />
                  <span className="text-white/80">Portfolio tracking</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Clock className="h-5 w-5 text-cyber-green" />
                  <span className="text-white/80">24/7 market monitoring</span>
                </div>
              </div>
            </div>

            {/* Money Back Guarantee */}
            <div className="flex items-center justify-center space-x-2 text-cyber-green/80 mb-4">
              <CheckCircle className="h-5 w-5" />
              <span className="text-sm">
                30-day money-back guarantee • Cancel anytime
              </span>
            </div>

            {/* Alternative CTA */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => (window.location.href = "/dashboard")}
                variant="outline"
                className="border-cyber-blue/30 text-cyber-blue hover:bg-cyber-blue/10 px-6 py-2"
              >
                <Eye className="h-4 w-4 mr-2" />
                Try Free Demo
              </Button>
              <Button
                onClick={() => (window.location.href = "/support")}
                variant="outline"
                className="border-cyber-purple/30 text-cyber-purple hover:bg-cyber-purple/10 px-6 py-2"
              >
                <Headphones className="h-4 w-4 mr-2" />
                Contact Sales
              </Button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Enhanced Video Modal with Full Course Player */}
      <AnimatePresence>
        {showVideoModal && selectedVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowVideoModal(false)}
          >
            <motion.div
              ref={modalRef}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className={cn(
                "bg-cyber-dark border border-cyber-blue/30 rounded-3xl overflow-hidden shadow-2xl flex",
                isFullscreen
                  ? "w-full h-full rounded-none"
                  : "max-w-7xl w-full h-[90vh]",
              )}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Video Player Section */}
              <div
                className={cn(
                  "flex flex-col",
                  isFullscreen ? "w-full" : "flex-1",
                )}
              >
                <div className="flex items-center justify-between p-4 border-b border-white/10">
                  <h3 className="text-lg font-bold text-white truncate">
                    {selectedVideo.title}
                  </h3>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-white/70 hover:text-white"
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-white/70 hover:text-white"
                    >
                      <Share className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-white/70 hover:text-white"
                    >
                      <Bookmark className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowVideoModal(false)}
                      className="text-white/70 hover:text-white"
                    >
                      <X className="h-5 w-5" />
                    </Button>
                  </div>
                </div>

                {/* Video Container */}
                <div className="flex-1 relative bg-black">
                  <video
                    ref={videoRef}
                    src={selectedVideo.videoUrl}
                    className="w-full h-full object-contain"
                    onTimeUpdate={handleTimeUpdate}
                    onLoadedMetadata={handleLoadedMetadata}
                    preload="metadata"
                    loop
                  />

                  {/* Custom Video Controls */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-4">
                    {/* Progress Bar */}
                    <div
                      className="w-full h-2 bg-white/20 rounded-full mb-4 cursor-pointer"
                      onClick={handleSeek}
                    >
                      <div
                        className="h-full bg-cyber-blue rounded-full transition-all duration-200"
                        style={{
                          width: `${duration > 0 ? (currentTime / duration) * 100 : 0}%`,
                        }}
                      />
                    </div>

                    {/* Control Buttons */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => skipTime(-10)}
                          className="text-white hover:text-cyber-blue"
                        >
                          <SkipBack className="h-5 w-5" />
                        </Button>

                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={togglePlayPause}
                          className="text-white hover:text-cyber-blue"
                        >
                          {isPlaying ? (
                            <Pause className="h-6 w-6" />
                          ) : (
                            <Play className="h-6 w-6" />
                          )}
                        </Button>

                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => skipTime(10)}
                          className="text-white hover:text-cyber-blue"
                        >
                          <SkipForward className="h-5 w-5" />
                        </Button>

                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={toggleMute}
                          className="text-white hover:text-cyber-blue"
                        >
                          {isMuted ? (
                            <VolumeX className="h-5 w-5" />
                          ) : (
                            <Volume2 className="h-5 w-5" />
                          )}
                        </Button>

                        <span className="text-white text-sm">
                          {formatTime(currentTime)} / {formatTime(duration)}
                        </span>

                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={changePlaybackRate}
                          className="text-white hover:text-cyber-blue text-xs"
                        >
                          {playbackRate}x
                        </Button>
                      </div>

                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={toggleFullscreen}
                        className="text-white hover:text-cyber-blue"
                      >
                        <Maximize className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Course Info */}
                <div className="p-4 border-t border-white/10">
                  <p className="text-white/80 text-sm mb-2">
                    {selectedVideo.description}
                  </p>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-cyber-blue font-medium">
                      {selectedVideo.instructor}
                    </span>
                    <div className="flex items-center space-x-4 text-white/60">
                      <span>{selectedVideo.views} views</span>
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 text-cyber-yellow fill-current" />
                        <span>{selectedVideo.rating}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Course Chapters Sidebar */}
              {!isFullscreen && (
                <div className="w-80 bg-cyber-dark/50 border-l border-white/10 flex flex-col">
                  <div className="p-4 border-b border-white/10">
                    <h4 className="text-white font-semibold mb-2">
                      Course Chapters
                    </h4>
                    <p className="text-white/60 text-sm">
                      {selectedVideo.chapters.length} chapters •{" "}
                      {selectedVideo.duration}
                    </p>
                  </div>

                  <div className="flex-1 overflow-y-auto">
                    {selectedVideo.chapters.map((chapter, index) => (
                      <motion.button
                        key={index}
                        onClick={() => jumpToChapter(chapter.time)}
                        className="w-full p-4 text-left border-b border-white/5 hover:bg-white/5 transition-colors"
                        whileHover={{ x: 4 }}
                      >
                        <div className="flex items-start space-x-3">
                          <div className="w-8 h-8 bg-cyber-blue/20 rounded-lg flex items-center justify-center flex-shrink-0">
                            <span className="text-cyber-blue text-sm font-bold">
                              {index + 1}
                            </span>
                          </div>
                          <div className="flex-1">
                            <h5 className="text-white text-sm font-medium mb-1 line-clamp-2">
                              {chapter.title}
                            </h5>
                            <p className="text-white/60 text-xs">
                              {chapter.time}
                            </p>
                          </div>
                        </div>
                      </motion.button>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default VideoTutorials;
