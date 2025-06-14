import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Play,
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
  videoUrl?: string;
}

const VideoTutorials = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedVideo, setSelectedVideo] = useState<VideoTutorial | null>(
    null,
  );
  const [showVideoModal, setShowVideoModal] = useState(false);

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
      title: "Stock Market Fundamentals for Beginners",
      description:
        "Learn the basics of stock trading, market mechanics, and how to get started with confidence.",
      thumbnail:
        "https://images.pexels.com/photos/5849556/pexels-photo-5849556.jpeg",
      duration: "12:34",
      views: "2.3M",
      rating: 4.9,
      level: "Beginner",
      category: "basics",
      instructor: "Sarah Chen, CFA",
      tags: ["stocks", "basics", "investing"],
    },
    {
      id: "2",
      title: "Technical Analysis Mastery: Chart Patterns",
      description:
        "Master candlestick patterns, support/resistance levels, and key technical indicators.",
      thumbnail:
        "https://images.pexels.com/photos/5716001/pexels-photo-5716001.jpeg",
      duration: "24:18",
      views: "1.8M",
      rating: 4.8,
      level: "Intermediate",
      category: "analysis",
      instructor: "Michael Rodriguez",
      tags: ["charts", "patterns", "technical"],
    },
    {
      id: "3",
      title: "AI-Powered Trading: The Future of Finance",
      description:
        "Understand how artificial intelligence is revolutionizing trading and investment strategies.",
      thumbnail:
        "https://images.pexels.com/photos/5849556/pexels-photo-5849556.jpeg",
      duration: "18:45",
      views: "956K",
      rating: 4.7,
      level: "Advanced",
      category: "ai",
      instructor: "Dr. Emily Watson",
      tags: ["AI", "algorithms", "automation"],
    },
    {
      id: "4",
      title: "Risk Management: Protecting Your Portfolio",
      description:
        "Essential risk management techniques to preserve capital and minimize losses.",
      thumbnail:
        "https://images.pexels.com/photos/5716001/pexels-photo-5716001.jpeg",
      duration: "16:22",
      views: "1.2M",
      rating: 4.9,
      level: "Intermediate",
      category: "risk",
      instructor: "James Miller, CFP",
      tags: ["risk", "portfolio", "protection"],
    },
    {
      id: "5",
      title: "Day Trading Strategies That Actually Work",
      description:
        "Proven day trading strategies with real examples and performance metrics.",
      thumbnail:
        "https://images.pexels.com/photos/5849556/pexels-photo-5849556.jpeg",
      duration: "28:17",
      views: "3.1M",
      rating: 4.8,
      level: "Advanced",
      category: "strategy",
      instructor: "Alex Thompson",
      tags: ["daytrading", "strategies", "profits"],
    },
    {
      id: "6",
      title: "Options Trading Explained Simply",
      description:
        "Demystify options trading with clear explanations and practical examples.",
      thumbnail:
        "https://images.pexels.com/photos/5716001/pexels-photo-5716001.jpeg",
      duration: "21:33",
      views: "1.5M",
      rating: 4.6,
      level: "Intermediate",
      category: "basics",
      instructor: "Lisa Chang",
      tags: ["options", "derivatives", "strategy"],
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
  };

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
            Master Trading with Expert Tutorials
          </h2>
          <p className="text-xl text-cyber-blue/90 max-w-3xl mx-auto">
            Learn from industry experts with our comprehensive video library
            covering everything from basics to advanced strategies
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
                    <div className="absolute bottom-3 right-3 px-2 py-1 bg-black/70 backdrop-blur-sm rounded-lg">
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

                    {/* Instructor */}
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
                        <ThumbsUp className="h-4 w-4" />
                        <span>98%</span>
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
              Ready to Start Learning?
            </h3>
            <p className="text-cyber-blue/80 mb-6">
              Get unlimited access to our entire video library with a Pro
              subscription
            </p>
            <Button className="bg-gradient-to-r from-cyber-green to-cyber-blue hover:from-cyber-green-dark hover:to-cyber-blue-dark text-white px-8 py-3 text-lg font-semibold rounded-2xl">
              <Zap className="h-5 w-5 mr-2" />
              Upgrade to Pro
            </Button>
          </div>
        </motion.div>
      </div>

      {/* Video Modal */}
      <AnimatePresence>
        {showVideoModal && selectedVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowVideoModal(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-cyber-dark border border-cyber-blue/30 rounded-3xl overflow-hidden max-w-4xl w-full shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between p-6 border-b border-white/10">
                <h3 className="text-xl font-bold text-white">
                  {selectedVideo.title}
                </h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowVideoModal(false)}
                  className="text-white/70 hover:text-white"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>

              <div className="aspect-video bg-black flex items-center justify-center">
                <div className="text-center text-white/60">
                  <Play className="h-16 w-16 mx-auto mb-4 opacity-50" />
                  <p>Video player would be integrated here</p>
                  <p className="text-sm mt-2">({selectedVideo.duration})</p>
                </div>
              </div>

              <div className="p-6">
                <p className="text-white/80 mb-4">
                  {selectedVideo.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-cyber-blue font-medium">
                    {selectedVideo.instructor}
                  </span>
                  <div className="flex items-center space-x-4 text-sm text-white/60">
                    <span>{selectedVideo.views} views</span>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-cyber-yellow fill-current" />
                      <span>{selectedVideo.rating}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default VideoTutorials;
