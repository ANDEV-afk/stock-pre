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
      title: "Complete Stock Market Course for Beginners",
      description:
        "Master the fundamentals of stock trading, market mechanics, portfolio building, and risk management from scratch.",
      thumbnail:
        "https://images.pexels.com/photos/5849556/pexels-photo-5849556.jpeg",
      duration: "2:45:30",
      views: "2.3M",
      rating: 4.9,
      level: "Beginner",
      category: "basics",
      instructor: "Sarah Chen, CFA",
      tags: ["stocks", "basics", "investing", "portfolio"],
      videoUrl:
        "https://videos.pexels.com/video-files/7652692/7652692-hd_1280_720_25fps.mp4",
      chapters: [
        { title: "Introduction to Stock Markets", time: "0:00" },
        { title: "How to Read Stock Charts", time: "25:30" },
        { title: "Building Your First Portfolio", time: "58:15" },
        { title: "Risk Management Basics", time: "1:42:20" },
        { title: "Getting Started with Trading", time: "2:18:45" },
      ],
    },
    {
      id: "2",
      title: "Advanced Technical Analysis Masterclass",
      description:
        "Deep dive into candlestick patterns, support/resistance levels, technical indicators, and advanced chart analysis techniques.",
      thumbnail:
        "https://images.pexels.com/photos/5716001/pexels-photo-5716001.jpeg",
      duration: "3:12:45",
      views: "1.8M",
      rating: 4.8,
      level: "Intermediate",
      category: "analysis",
      instructor: "Michael Rodriguez",
      tags: ["charts", "patterns", "technical", "indicators"],
      videoUrl:
        "https://videos.pexels.com/video-files/8369984/8369984-sd_426_240_30fps.mp4",
      chapters: [
        { title: "Candlestick Pattern Recognition", time: "0:00" },
        { title: "Support and Resistance Levels", time: "42:15" },
        { title: "Moving Averages and Trends", time: "1:28:30" },
        { title: "RSI and MACD Indicators", time: "2:05:10" },
        { title: "Advanced Chart Patterns", time: "2:48:20" },
      ],
    },
    {
      id: "3",
      title: "AI-Powered Trading: Complete Guide",
      description:
        "Learn how artificial intelligence and machine learning are revolutionizing trading strategies and investment decisions.",
      thumbnail:
        "https://images.pexels.com/photos/5849556/pexels-photo-5849556.jpeg",
      duration: "1:58:45",
      views: "956K",
      rating: 4.7,
      level: "Advanced",
      category: "ai",
      instructor: "Dr. Emily Watson",
      tags: ["AI", "algorithms", "automation", "ML"],
      videoUrl:
        "https://videos.pexels.com/video-files/7578640/7578640-sd_426_226_25fps.mp4",
      chapters: [
        { title: "Introduction to AI Trading", time: "0:00" },
        { title: "Machine Learning Basics", time: "32:20" },
        { title: "Building Trading Algorithms", time: "1:08:15" },
        { title: "Backtesting and Optimization", time: "1:35:30" },
      ],
    },
    {
      id: "4",
      title: "Complete Risk Management Course",
      description:
        "Essential risk management techniques, position sizing, stop-loss strategies, and portfolio protection methods.",
      thumbnail:
        "https://images.pexels.com/photos/5716001/pexels-photo-5716001.jpeg",
      duration: "2:22:15",
      views: "1.2M",
      rating: 4.9,
      level: "Intermediate",
      category: "risk",
      instructor: "James Miller, CFP",
      tags: ["risk", "portfolio", "protection", "strategy"],
      videoUrl:
        "https://videos.pexels.com/video-files/8970369/8970369-sd_360_640_30fps.mp4",
      chapters: [
        { title: "Understanding Risk Types", time: "0:00" },
        { title: "Position Sizing Strategies", time: "38:45" },
        { title: "Stop-Loss Techniques", time: "1:12:30" },
        { title: "Portfolio Diversification", time: "1:48:20" },
      ],
    },
    {
      id: "5",
      title: "Professional Day Trading Strategies",
      description:
        "Proven day trading strategies, scalping techniques, momentum trading, and real-world case studies with performance metrics.",
      thumbnail:
        "https://images.pexels.com/photos/5849556/pexels-photo-5849556.jpeg",
      duration: "4:18:30",
      views: "3.1M",
      rating: 4.8,
      level: "Advanced",
      category: "strategy",
      instructor: "Alex Thompson",
      tags: ["daytrading", "strategies", "profits", "scalping"],
      videoUrl:
        "https://videos.pexels.com/video-files/7652692/7652692-hd_1280_720_25fps.mp4",
      chapters: [
        { title: "Day Trading Fundamentals", time: "0:00" },
        { title: "Pre-Market Analysis", time: "52:15" },
        { title: "Scalping Strategies", time: "1:45:30" },
        { title: "Momentum Trading", time: "2:38:45" },
        { title: "Risk Management for Day Traders", time: "3:25:10" },
        { title: "Psychology and Discipline", time: "3:58:20" },
      ],
    },
    {
      id: "6",
      title: "Options Trading Mastery Course",
      description:
        "Complete guide to options trading including strategies, Greeks, spreads, and advanced techniques with real examples.",
      thumbnail:
        "https://images.pexels.com/photos/5716001/pexels-photo-5716001.jpeg",
      duration: "3:45:20",
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
        { title: "Understanding the Greeks", time: "48:30" },
        { title: "Basic Options Strategies", time: "1:35:15" },
        { title: "Advanced Spreads", time: "2:28:40" },
        { title: "Options Trading Psychology", time: "3:12:55" },
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

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="bg-white/5 backdrop-blur-md border border-cyber-blue/20 rounded-3xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">
              Access Full Course Library
            </h3>
            <p className="text-cyber-blue/80 mb-6">
              Get unlimited access to all full-length courses and premium
              content
            </p>
            <Button className="bg-gradient-to-r from-cyber-green to-cyber-blue hover:from-cyber-green-dark hover:to-cyber-blue-dark text-white px-8 py-3 text-lg font-semibold rounded-2xl">
              <Zap className="h-5 w-5 mr-2" />
              Upgrade to Pro
            </Button>
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
