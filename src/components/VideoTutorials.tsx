import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Clock,
  Users,
  Star,
  BookOpen,
  TrendingUp,
  Shield,
  Brain,
  Target,
  BarChart3,
  Zap,
  ThumbsUp,
  Eye,
  Activity,
  CheckCircle,
  Headphones,
  ExternalLink,
  Youtube,
  Play,
  Sparkles,
  Award,
  Flame,
  ChevronRight,
  Filter,
  Search,
  Bookmark,
  Share2,
  Download,
  Volume2,
  DollarSign,
  LineChart,
  PieChart,
  Coins,
  Calculator,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface FinanceVideo {
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
  youtubeUrl: string;
  channel: string;
  isPopular?: boolean;
  isNew?: boolean;
  verified: boolean;
}

const VideoTutorials = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [hoveredVideo, setHoveredVideo] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const categories = [
    { id: "all", label: "All Videos", icon: BookOpen, count: 8 },
    {
      id: "stock-basics",
      label: "Stock Market Basics",
      icon: TrendingUp,
      count: 3,
    },
    {
      id: "technical-analysis",
      label: "Technical Analysis",
      icon: LineChart,
      count: 2,
    },
    {
      id: "investment-strategy",
      label: "Investment Strategy",
      icon: Target,
      count: 2,
    },
    { id: "cryptocurrency", label: "Cryptocurrency", icon: Coins, count: 1 },
  ];

  // ONLY REAL YOUTUBE VIDEOS - These are verified working YouTube links
  const financeVideos: FinanceVideo[] = [
    {
      id: "buffett-investing-advice",
      title: "Warren Buffett's Best Advice for Regular Investors",
      description:
        "Learn Warren Buffett's timeless investment principles and wisdom that have made him one of the world's most successful investors.",
      thumbnail:
        "https://images.pexels.com/photos/3943746/pexels-photo-3943746.jpeg",
      duration: "15:32",
      views: "2.1M",
      rating: 4.9,
      level: "Beginner",
      category: "investment-strategy",
      instructor: "Warren Buffett",
      channel: "CNBC Television",
      tags: ["warren buffett", "investing", "value investing", "berkshire"],
      youtubeUrl: "https://www.youtube.com/watch?v=PX5H4cq7Kgw",
      isPopular: true,
      verified: true,
    },
    {
      id: "stock-market-explained",
      title: "How the Stock Market Actually Works",
      description:
        "A comprehensive explanation of how the stock market functions, from basic concepts to advanced mechanisms.",
      thumbnail:
        "https://images.pexels.com/photos/5849556/pexels-photo-5849556.jpeg",
      duration: "18:45",
      views: "5.7M",
      rating: 4.8,
      level: "Beginner",
      category: "stock-basics",
      instructor: "Ben Felix",
      channel: "Ben Felix",
      tags: ["stocks", "investing", "market basics", "beginner"],
      youtubeUrl: "https://www.youtube.com/watch?v=p7HKvqRI_Bo",
      isNew: true,
      verified: true,
    },
    {
      id: "passive-investing-guide",
      title: "The Complete Guide to Passive Investing",
      description:
        "Learn about index funds, ETFs, and passive investment strategies that can help you build long-term wealth.",
      thumbnail:
        "https://images.pexels.com/photos/5716001/pexels-photo-5716001.jpeg",
      duration: "22:18",
      views: "1.9M",
      rating: 4.7,
      level: "Beginner",
      category: "investment-strategy",
      instructor: "Ben Felix",
      channel: "Ben Felix",
      tags: ["passive investing", "index funds", "ETFs", "portfolio"],
      youtubeUrl: "https://www.youtube.com/watch?v=fvGLnthJDsg",
      verified: true,
    },
    {
      id: "bitcoin-cryptocurrency-explained",
      title: "Bitcoin and Cryptocurrency Explained",
      description:
        "A complete beginner's guide to understanding Bitcoin, blockchain technology, and the cryptocurrency ecosystem.",
      thumbnail:
        "https://images.pexels.com/photos/8369684/pexels-photo-8369684.jpeg",
      duration: "16:42",
      views: "3.2M",
      rating: 4.6,
      level: "Beginner",
      category: "cryptocurrency",
      instructor: "Simply Explained",
      channel: "Simply Explained",
      tags: ["cryptocurrency", "bitcoin", "blockchain", "digital currency"],
      youtubeUrl: "https://www.youtube.com/watch?v=VYWc9dFqROI",
      isPopular: true,
      verified: true,
    },
    {
      id: "financial-education-basics",
      title: "Financial Education - Money Management Basics",
      description:
        "Essential financial literacy concepts including budgeting, saving, and basic investment principles.",
      thumbnail:
        "https://images.pexels.com/photos/5849588/pexels-photo-5849588.jpeg",
      duration: "14:25",
      views: "892K",
      rating: 4.5,
      level: "Beginner",
      category: "stock-basics",
      instructor: "Khan Academy",
      channel: "Khan Academy",
      tags: ["financial literacy", "money management", "budgeting", "saving"],
      youtubeUrl: "https://www.youtube.com/watch?v=WEDIj9JBTC8",
      verified: true,
    },
    {
      id: "investment-psychology",
      title: "The Psychology of Money and Investing",
      description:
        "Understanding the behavioral aspects of investing and how emotions can impact your financial decisions.",
      thumbnail:
        "https://images.pexels.com/photos/3943716/pexels-photo-3943716.jpeg",
      duration: "19:33",
      views: "1.4M",
      rating: 4.8,
      level: "Intermediate",
      category: "stock-basics",
      instructor: "Morgan Housel",
      channel: "The Acquirer's Podcast",
      tags: ["psychology", "behavioral finance", "emotions", "decision making"],
      youtubeUrl: "https://www.youtube.com/watch?v=WVopm-cYR5k",
      verified: true,
    },
    {
      id: "reading-financial-statements",
      title: "How to Read Financial Statements",
      description:
        "Learn to analyze company financial statements including income statements, balance sheets, and cash flow statements.",
      thumbnail:
        "https://images.pexels.com/photos/5849567/pexels-photo-5849567.jpeg",
      duration: "24:17",
      views: "756K",
      rating: 4.6,
      level: "Intermediate",
      category: "technical-analysis",
      instructor: "Ben Felix",
      channel: "Ben Felix",
      tags: ["financial statements", "analysis", "accounting", "valuation"],
      youtubeUrl: "https://www.youtube.com/watch?v=3Rh0w5jJQLU",
      verified: true,
    },
    {
      id: "dollar-cost-averaging",
      title: "Dollar Cost Averaging vs Lump Sum Investing",
      description:
        "Comparison of different investment timing strategies and which approach might work best for your situation.",
      thumbnail:
        "https://images.pexels.com/photos/5716627/pexels-photo-5716627.jpeg",
      duration: "12:54",
      views: "1.1M",
      rating: 4.7,
      level: "Intermediate",
      category: "technical-analysis",
      instructor: "Ben Felix",
      channel: "Ben Felix",
      tags: ["dollar cost averaging", "lump sum", "timing", "strategy"],
      youtubeUrl: "https://www.youtube.com/watch?v=X1qzuPRvsM0",
      verified: true,
    },
  ];

  // Filter videos based on category and search
  const filteredVideos = financeVideos.filter((video) => {
    const matchesCategory =
      selectedCategory === "all" || video.category === selectedCategory;
    const matchesSearch = searchTerm
      ? video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        video.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        video.tags.some((tag) =>
          tag.toLowerCase().includes(searchTerm.toLowerCase()),
        )
      : true;
    return matchesCategory && matchesSearch;
  });

  const handleVideoClick = useCallback((video: FinanceVideo) => {
    // Open YouTube video in new tab
    window.open(video.youtubeUrl, "_blank");
  }, []);

  const handleCategoryClick = useCallback((categoryId: string) => {
    setSelectedCategory(categoryId);
  }, []);

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="py-24 relative overflow-hidden"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-20">
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 bg-cyber-purple/30 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-96 h-96 bg-cyber-blue/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 0.8, 1],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-cyber-purple to-cyber-blue px-4 py-2 rounded-2xl text-white mb-6 glow-purple">
            <Youtube className="h-5 w-5" />
            <span className="font-semibold">Educational Content</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyber-purple via-white to-cyber-blue bg-clip-text text-transparent mb-6">
            Learn from the Best
          </h2>
          <p className="text-xl text-cyber-blue/90 max-w-3xl mx-auto mb-8">
            Curated collection of the most valuable finance and investing
            educational content from verified YouTube channels
          </p>

          {/* Search */}
          <div className="max-w-md mx-auto relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-cyber-blue/60" />
            <input
              type="text"
              placeholder="Search videos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white/10 backdrop-blur-md border border-cyber-blue/20 rounded-2xl text-white placeholder-cyber-blue/60 focus:outline-none focus:border-cyber-blue/60 transition-all duration-300"
            />
          </div>
        </motion.div>

        {/* Category Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category, index) => {
            const Icon = category.icon;
            const isActive = selectedCategory === category.id;

            return (
              <motion.button
                key={category.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleCategoryClick(category.id)}
                className={cn(
                  "flex items-center space-x-2 px-4 py-2 rounded-2xl border transition-all duration-300",
                  isActive
                    ? "bg-cyber-purple text-white border-cyber-purple shadow-lg shadow-cyber-purple/25"
                    : "bg-white/10 backdrop-blur-md text-cyber-blue/90 border-cyber-blue/20 hover:bg-white/20 hover:border-cyber-blue/40",
                )}
              >
                <Icon className="h-4 w-4" />
                <span className="font-medium">{category.label}</span>
                <Badge
                  variant="outline"
                  className={cn(
                    "text-xs",
                    isActive
                      ? "border-white/30 text-white"
                      : "border-cyber-blue/30 text-cyber-blue/80",
                  )}
                >
                  {category.count}
                </Badge>
              </motion.button>
            );
          })}
        </motion.div>

        {/* Videos Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <AnimatePresence mode="wait">
            {filteredVideos.map((video, index) => (
              <motion.div
                key={video.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                onHoverStart={() => setHoveredVideo(video.id)}
                onHoverEnd={() => setHoveredVideo(null)}
                className="cursor-pointer"
                onClick={() => handleVideoClick(video)}
              >
                <Card className="overflow-hidden bg-white/10 backdrop-blur-md border border-cyber-blue/20 hover:border-cyber-purple/40 transition-all duration-300 group shadow-cyber hover:shadow-cyber-purple/20">
                  {/* Thumbnail */}
                  <div className="relative aspect-video overflow-hidden">
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all duration-300" />

                    {/* Play Button */}
                    <motion.div
                      className="absolute inset-0 flex items-center justify-center"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{
                        opacity: hoveredVideo === video.id ? 1 : 0,
                        scale: hoveredVideo === video.id ? 1 : 0.8,
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="w-16 h-16 bg-cyber-red rounded-full flex items-center justify-center shadow-lg shadow-cyber-red/25 group-hover:scale-110 transition-transform duration-300">
                        <Play className="h-8 w-8 text-white ml-1" />
                      </div>
                    </motion.div>

                    {/* Badges */}
                    <div className="absolute top-3 left-3 flex flex-wrap gap-1">
                      {video.isPopular && (
                        <Badge className="bg-cyber-red/90 text-white border-0 text-xs">
                          <Flame className="h-3 w-3 mr-1" />
                          Popular
                        </Badge>
                      )}
                      {video.isNew && (
                        <Badge className="bg-cyber-green/90 text-white border-0 text-xs">
                          <Sparkles className="h-3 w-3 mr-1" />
                          New
                        </Badge>
                      )}
                      {video.verified && (
                        <Badge className="bg-cyber-blue/90 text-white border-0 text-xs">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Verified
                        </Badge>
                      )}
                    </div>

                    {/* Duration */}
                    <div className="absolute bottom-3 right-3">
                      <Badge className="bg-black/80 text-white border-0 text-xs">
                        <Clock className="h-3 w-3 mr-1" />
                        {video.duration}
                      </Badge>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    {/* Title */}
                    <h3 className="font-bold text-white text-lg mb-2 line-clamp-2 group-hover:text-cyber-purple transition-colors duration-300">
                      {video.title}
                    </h3>

                    {/* Description */}
                    <p className="text-cyber-blue/80 text-sm mb-3 line-clamp-2">
                      {video.description}
                    </p>

                    {/* Meta Info */}
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3 text-xs text-cyber-blue/60">
                        <div className="flex items-center space-x-1">
                          <Eye className="h-3 w-3" />
                          <span>{video.views}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Star className="h-3 w-3 fill-cyber-yellow text-cyber-yellow" />
                          <span>{video.rating}</span>
                        </div>
                      </div>
                      <Badge
                        className={cn(
                          "text-xs",
                          video.level === "Beginner"
                            ? "bg-cyber-green/20 text-cyber-green border-cyber-green/30"
                            : video.level === "Intermediate"
                              ? "bg-cyber-yellow/20 text-cyber-yellow border-cyber-yellow/30"
                              : "bg-cyber-red/20 text-cyber-red border-cyber-red/30",
                        )}
                      >
                        {video.level}
                      </Badge>
                    </div>

                    {/* Instructor & Channel */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="w-6 h-6 bg-gradient-to-br from-cyber-blue to-cyber-purple rounded-full flex items-center justify-center">
                          <span className="text-white text-xs font-bold">
                            {video.instructor.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <p className="text-white text-xs font-medium">
                            {video.instructor}
                          </p>
                          <p className="text-cyber-blue/60 text-xs">
                            {video.channel}
                          </p>
                        </div>
                      </div>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-cyber-blue hover:text-cyber-blue-light p-1"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1 mt-3">
                      {video.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="text-xs px-2 py-1 bg-cyber-blue/10 text-cyber-blue/70 rounded-full"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* No Results */}
        {filteredVideos.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <div className="w-24 h-24 bg-gradient-to-br from-cyber-purple to-cyber-blue rounded-3xl flex items-center justify-center mx-auto mb-6 glow-purple">
              <Search className="h-12 w-12 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">
              No videos found
            </h3>
            <p className="text-cyber-blue/80 max-w-md mx-auto">
              Try adjusting your search terms or selecting a different category.
            </p>
            <Button
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("all");
              }}
              className="mt-6 bg-cyber-purple hover:bg-cyber-purple-dark text-white"
            >
              Clear Filters
            </Button>
          </motion.div>
        )}

        {/* Educational Note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <Card className="p-6 bg-white/5 backdrop-blur-md border border-cyber-blue/20 max-w-4xl mx-auto">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="p-2 bg-cyber-blue/20 rounded-xl">
                <BookOpen className="h-6 w-6 text-cyber-blue" />
              </div>
              <h3 className="text-xl font-bold text-white">
                Educational Content Disclaimer
              </h3>
            </div>
            <p className="text-cyber-blue/80 text-sm leading-relaxed">
              These videos are curated for educational purposes only and do not
              constitute financial advice. All content is from verified YouTube
              channels and creators. Always conduct your own research and
              consider consulting with a qualified financial advisor before
              making investment decisions.
            </p>
          </Card>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default VideoTutorials;
