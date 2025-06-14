import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Newspaper,
  TrendingUp,
  TrendingDown,
  Globe,
  Clock,
  ExternalLink,
  Filter,
  Bookmark,
  Share,
  Eye,
  Search,
  Zap,
  DollarSign,
  BarChart3,
  AlertCircle,
  ArrowDown,
  Calendar,
  ThumbsUp,
  MessageSquare,
  Star,
  ChevronLeft,
  ChevronRight,
  Rss,
  Bell,
  Download,
  RefreshCw,
  Settings,
  GridIcon,
  List,
} from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface NewsArticle {
  id: string;
  title: string;
  summary: string;
  content: string;
  source: string;
  author: string;
  publishedAt: Date;
  category:
    | "market"
    | "earnings"
    | "analysis"
    | "crypto"
    | "global"
    | "breaking"
    | "tech"
    | "finance"
    | "policy"
    | "commodities"
    | "forex";
  sentiment: "positive" | "negative" | "neutral";
  symbols: string[];
  imageUrl?: string;
  url: string;
  readTime: number;
  isBookmarked: boolean;
  priority: "high" | "medium" | "low";
  views: number;
  likes: number;
  comments: number;
  tags: string[];
}

const News = () => {
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedSentiment, setSelectedSentiment] = useState<string>("all");
  const [selectedTimeframe, setSelectedTimeframe] = useState<string>("today");
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"latest" | "popular" | "trending">(
    "latest",
  );
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const itemsPerPage = 12;

  // Enhanced news data with 50+ articles
  useEffect(() => {
    const generateMockNews = (): NewsArticle[] => {
      const baseArticles = [
        {
          title: "Apple Reaches New All-Time High as iPhone Sales Surge",
          summary:
            "Apple Inc. (AAPL) reached a new all-time high today following strong iPhone 15 sales data from Q4.",
          category: "breaking" as const,
          sentiment: "positive" as const,
          symbols: ["AAPL"],
          source: "MarketWatch",
          author: "Sarah Johnson",
          priority: "high" as const,
          tags: ["iPhone", "sales", "earnings", "Apple"],
        },
        {
          title: "Tesla's New Gigafactory Plans Boost EV Sector",
          summary:
            "Tesla announced plans for three new Gigafactories across Asia, sending EV stocks higher.",
          category: "market" as const,
          sentiment: "positive" as const,
          symbols: ["TSLA", "RIVN", "LCID"],
          source: "Reuters",
          author: "Michael Chen",
          priority: "high" as const,
          tags: ["Tesla", "Gigafactory", "EV", "manufacturing"],
        },
        {
          title: "Federal Reserve Hints at Interest Rate Pause",
          summary:
            "Fed officials suggest a potential pause in rate hikes, boosting tech stocks.",
          category: "policy" as const,
          sentiment: "positive" as const,
          symbols: ["QQQ", "SPY", "GOOGL", "MSFT"],
          source: "Bloomberg",
          author: "David Martinez",
          priority: "high" as const,
          tags: ["Federal Reserve", "interest rates", "monetary policy"],
        },
        {
          title: "NVIDIA Reports Record AI Chip Demand",
          summary:
            "NVIDIA's latest earnings show unprecedented demand for AI chips. Revenue up 206% year-over-year.",
          category: "earnings" as const,
          sentiment: "positive" as const,
          symbols: ["NVDA", "AMD"],
          source: "TechCrunch",
          author: "Lisa Wang",
          priority: "high" as const,
          tags: ["NVIDIA", "AI", "semiconductors", "earnings"],
        },
        {
          title: "Banking Sector Faces Headwinds from Commercial Real Estate",
          summary:
            "Regional banking stocks decline as investors worry about commercial real estate exposure.",
          category: "finance" as const,
          sentiment: "negative" as const,
          symbols: ["KRE", "JPM", "BAC"],
          source: "CNBC",
          author: "Robert Thompson",
          priority: "medium" as const,
          tags: ["banking", "real estate", "risk", "financial sector"],
        },
        {
          title: "Bitcoin Surges Past $45,000 as ETF Approval Hopes Rise",
          summary:
            "Cryptocurrency markets rally as speculation grows around Bitcoin ETF approvals.",
          category: "crypto" as const,
          sentiment: "positive" as const,
          symbols: ["COIN", "MSTR"],
          source: "CoinDesk",
          author: "Alex Rodriguez",
          priority: "medium" as const,
          tags: ["Bitcoin", "cryptocurrency", "ETF", "regulation"],
        },
        {
          title: "Microsoft's AI Partnership Drives Cloud Revenue Growth",
          summary:
            "Microsoft Azure revenue up 27% year-over-year, powered by strong AI services adoption.",
          category: "earnings" as const,
          sentiment: "positive" as const,
          symbols: ["MSFT"],
          source: "The Verge",
          author: "Jennifer Lee",
          priority: "high" as const,
          tags: ["Microsoft", "AI", "cloud computing", "Azure"],
        },
        {
          title: "Amazon Web Services Expands Into Healthcare AI",
          summary:
            "AWS announces new healthcare AI tools, targeting $4 trillion healthcare market.",
          category: "tech" as const,
          sentiment: "positive" as const,
          symbols: ["AMZN"],
          source: "TechCrunch",
          author: "Mark Stevens",
          priority: "high" as const,
          tags: ["Amazon", "healthcare", "AI", "AWS"],
        },
        {
          title: "Google's Quantum Computing Breakthrough Shakes Tech Sector",
          summary:
            "Alphabet's quantum computer achieves 'quantum supremacy' in new benchmark tests.",
          category: "breaking" as const,
          sentiment: "positive" as const,
          symbols: ["GOOGL", "IBM"],
          source: "Nature",
          author: "Dr. Amanda Foster",
          priority: "high" as const,
          tags: ["Google", "quantum computing", "technology", "breakthrough"],
        },
        {
          title: "Walmart's E-commerce Strategy Pays Off in Holiday Quarter",
          summary:
            "Walmart reports 23% increase in online sales, competing effectively with Amazon.",
          category: "earnings" as const,
          sentiment: "positive" as const,
          symbols: ["WMT"],
          source: "Wall Street Journal",
          author: "Robert Chen",
          priority: "medium" as const,
          tags: ["Walmart", "e-commerce", "retail", "holiday sales"],
        },
        {
          title:
            "JPMorgan Chase Beats Earnings Expectations Despite Rate Concerns",
          summary:
            "Largest US bank reports strong Q4 results, net income up 15% year-over-year.",
          category: "earnings" as const,
          sentiment: "positive" as const,
          symbols: ["JPM"],
          source: "Financial Times",
          author: "Patricia Williams",
          priority: "high" as const,
          tags: ["JPMorgan", "banking", "earnings", "finance"],
        },
        {
          title: "Meta Announces Major VR Investment for 2024",
          summary:
            "Meta plans $15 billion investment in VR technology, betting on metaverse future.",
          category: "tech" as const,
          sentiment: "neutral" as const,
          symbols: ["META"],
          source: "Ars Technica",
          author: "Kevin Park",
          priority: "medium" as const,
          tags: ["Meta", "VR", "metaverse", "investment"],
        },
        {
          title: "Netflix Password Sharing Crackdown Boosts Subscriber Growth",
          summary:
            "Streaming giant adds 13.1 million subscribers in Q4 after password sharing restrictions.",
          category: "earnings" as const,
          sentiment: "positive" as const,
          symbols: ["NFLX"],
          source: "Variety",
          author: "Sandra Garcia",
          priority: "medium" as const,
          tags: ["Netflix", "streaming", "subscribers", "password sharing"],
        },
        {
          title: "Oil Prices Surge as OPEC+ Extends Production Cuts",
          summary:
            "Crude oil jumps 4% after OPEC+ announces extended production cuts through Q2 2024.",
          category: "commodities" as const,
          sentiment: "positive" as const,
          symbols: ["XOM", "CVX", "OIL"],
          source: "Reuters",
          author: "Ahmed Hassan",
          priority: "high" as const,
          tags: ["oil", "OPEC", "commodities", "energy"],
        },
        {
          title: "Uber Reports First Full-Year Profit in Company History",
          summary:
            "Ride-sharing company achieves profitability milestone with $1.9 billion net income.",
          category: "earnings" as const,
          sentiment: "positive" as const,
          symbols: ["UBER"],
          source: "Bloomberg",
          author: "Maria Lopez",
          priority: "high" as const,
          tags: ["Uber", "profitability", "ride-sharing", "milestone"],
        },
        {
          title: "Semiconductor Shortage Continues to Impact Auto Industry",
          summary:
            "Ford and GM report production delays due to ongoing chip shortage issues.",
          category: "market" as const,
          sentiment: "negative" as const,
          symbols: ["F", "GM", "TSMC"],
          source: "Automotive News",
          author: "David Kim",
          priority: "medium" as const,
          tags: ["semiconductors", "automotive", "supply chain", "shortage"],
        },
        {
          title: "Palantir Wins $178M Government Contract Extension",
          summary:
            "Data analytics company secures major government contract, stock rises 8%.",
          category: "market" as const,
          sentiment: "positive" as const,
          symbols: ["PLTR"],
          source: "Defense News",
          author: "Colonel James Mitchell",
          priority: "medium" as const,
          tags: ["Palantir", "government", "contract", "defense"],
        },
        {
          title: "Zoom's Hybrid Work Solutions Drive Enterprise Growth",
          summary:
            "Video conferencing company reports 140% growth in enterprise customers.",
          category: "tech" as const,
          sentiment: "positive" as const,
          symbols: ["ZM"],
          source: "Enterprise Tech",
          author: "Rachel Kim",
          priority: "medium" as const,
          tags: ["Zoom", "hybrid work", "enterprise", "communication"],
        },
        {
          title: "Chinese Tech Stocks Rally on Regulatory Relief Hopes",
          summary:
            "Alibaba, Tencent, and other Chinese tech giants surge on easing regulatory concerns.",
          category: "global" as const,
          sentiment: "positive" as const,
          symbols: ["BABA", "TCEHY", "JD"],
          source: "South China Morning Post",
          author: "Li Wei",
          priority: "high" as const,
          tags: ["China", "technology", "regulation", "Asia"],
        },
        {
          title: "European Central Bank Maintains Hawkish Stance on Inflation",
          summary:
            "ECB President signals continued rate hikes to combat persistent inflation.",
          category: "policy" as const,
          sentiment: "negative" as const,
          symbols: ["EWG", "FEZ"],
          source: "Financial Times",
          author: "Hans Mueller",
          priority: "high" as const,
          tags: ["ECB", "inflation", "interest rates", "Europe"],
        },
      ];

      // Generate additional articles to reach 50+
      const additionalCategories = [
        "tech",
        "finance",
        "commodities",
        "forex",
        "global",
        "analysis",
      ];
      const sources = [
        "Financial Times",
        "Wall Street Journal",
        "Forbes",
        "Yahoo Finance",
        "MarketWatch",
        "Benzinga",
      ];
      const authors = [
        "Emma Davis",
        "James Wilson",
        "Sophie Turner",
        "Mark Anderson",
        "Rachel Green",
        "Tom Brown",
      ];

      const generatedArticles = Array.from({ length: 50 }, (_, i) => {
        const category = additionalCategories[i % additionalCategories.length];
        const sentiment = ["positive", "negative", "neutral"][i % 3];
        const source = sources[i % sources.length];
        const author = authors[i % authors.length];

        return {
          title: `Market Update: ${category.charAt(0).toUpperCase() + category.slice(1)} Sector Shows ${sentiment === "positive" ? "Strong Growth" : sentiment === "negative" ? "Decline" : "Mixed Results"}`,
          summary: `Latest developments in the ${category} sector indicate ${sentiment} trends with significant market implications for investors.`,
          category: category as NewsArticle["category"],
          sentiment: sentiment as NewsArticle["sentiment"],
          symbols: [`SYM${i}`, `ETF${i}`],
          source,
          author,
          priority: ["high", "medium", "low"][i % 3] as NewsArticle["priority"],
          tags: [category, "market", "analysis", "investment"],
        };
      });

      const allArticles = [...baseArticles, ...generatedArticles].map(
        (article, index) => ({
          id: `article-${index + 1}`,
          ...article,
          content: `${article.summary} This is the full content of the article with detailed analysis and market implications. The article provides comprehensive coverage of the topic with expert insights and data-driven analysis.`,
          publishedAt: new Date(Date.now() - Math.random() * 86400000 * 7), // Random time within last 7 days
          imageUrl: `https://picsum.photos/400/300?random=${index}`,
          url: "#",
          readTime: Math.floor(Math.random() * 10) + 2,
          isBookmarked: Math.random() > 0.8,
          views: Math.floor(Math.random() * 10000) + 100,
          likes: Math.floor(Math.random() * 500) + 10,
          comments: Math.floor(Math.random() * 100) + 5,
        }),
      );

      return allArticles;
    };

    setNews(generateMockNews());
    setIsLoading(false);
  }, []);

  const categories = [
    { id: "all", label: "All News", icon: Newspaper, color: "cyber-blue" },
    { id: "breaking", label: "Breaking", icon: Zap, color: "cyber-red" },
    { id: "market", label: "Market", icon: TrendingUp, color: "cyber-green" },
    {
      id: "earnings",
      label: "Earnings",
      icon: DollarSign,
      color: "cyber-purple",
    },
    { id: "tech", label: "Technology", icon: BarChart3, color: "cyber-blue" },
    { id: "crypto", label: "Crypto", icon: TrendingUp, color: "cyber-yellow" },
    { id: "global", label: "Global", icon: Globe, color: "cyber-blue" },
    { id: "analysis", label: "Analysis", icon: Eye, color: "cyber-purple" },
    { id: "finance", label: "Finance", icon: DollarSign, color: "cyber-green" },
    { id: "policy", label: "Policy", icon: AlertCircle, color: "cyber-red" },
    {
      id: "commodities",
      label: "Commodities",
      icon: BarChart3,
      color: "cyber-yellow",
    },
    { id: "forex", label: "Forex", icon: Globe, color: "cyber-blue" },
  ];

  const timeframes = [
    { id: "today", label: "Today" },
    { id: "week", label: "This Week" },
    { id: "month", label: "This Month" },
    { id: "all", label: "All Time" },
  ];

  const sentiments = [
    { id: "all", label: "All", color: "cyber-blue" },
    { id: "positive", label: "Positive", color: "cyber-green" },
    { id: "negative", label: "Negative", color: "cyber-red" },
    { id: "neutral", label: "Neutral", color: "cyber-yellow" },
  ];

  const filteredNews = news
    .filter((article) => {
      const matchesSearch =
        searchQuery === "" ||
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.symbols.some((symbol) =>
          symbol.toLowerCase().includes(searchQuery.toLowerCase()),
        ) ||
        article.tags.some((tag) =>
          tag.toLowerCase().includes(searchQuery.toLowerCase()),
        );

      const matchesCategory =
        selectedCategory === "all" || article.category === selectedCategory;
      const matchesSentiment =
        selectedSentiment === "all" || article.sentiment === selectedSentiment;

      const matchesTimeframe = (() => {
        const now = new Date();
        const articleDate = article.publishedAt;

        switch (selectedTimeframe) {
          case "today":
            return articleDate.toDateString() === now.toDateString();
          case "week":
            const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
            return articleDate >= weekAgo;
          case "month":
            const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
            return articleDate >= monthAgo;
          default:
            return true;
        }
      })();

      return (
        matchesSearch && matchesCategory && matchesSentiment && matchesTimeframe
      );
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "popular":
          return b.views - a.views;
        case "trending":
          return b.likes - a.likes;
        default:
          return b.publishedAt.getTime() - a.publishedAt.getTime();
      }
    });

  const totalPages = Math.ceil(filteredNews.length / itemsPerPage);
  const displayedNews = filteredNews.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const formatTimeAgo = (date: Date) => {
    const diff = Date.now() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    return `${minutes}m ago`;
  };

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case "positive":
        return "text-cyber-green";
      case "negative":
        return "text-cyber-red";
      default:
        return "text-cyber-blue";
    }
  };

  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment) {
      case "positive":
        return TrendingUp;
      case "negative":
        return TrendingDown;
      default:
        return Globe;
    }
  };

  const toggleBookmark = (articleId: string) => {
    setNews((prev) =>
      prev.map((article) =>
        article.id === articleId
          ? { ...article, isBookmarked: !article.isBookmarked }
          : article,
      ),
    );
  };

  return (
    <div className="min-h-screen bg-cyber-black cyber-grid">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-cyber-blue via-white to-cyber-purple bg-clip-text text-transparent mb-6">
            Latest Market News
          </h1>
          <p className="text-xl text-cyber-blue/80 max-w-3xl mx-auto mb-8">
            Stay updated with the latest market developments, earnings reports,
            and financial analysis
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-2xl font-bold text-cyber-blue">
                {news.length}
              </div>
              <div className="text-sm text-white/60">Total Articles</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-cyber-green">
                {news.filter((n) => n.category === "breaking").length}
              </div>
              <div className="text-sm text-white/60">Breaking News</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-cyber-purple">
                {
                  news.filter(
                    (n) =>
                      n.publishedAt.toDateString() ===
                      new Date().toDateString(),
                  ).length
                }
              </div>
              <div className="text-sm text-white/60">Today's News</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-cyber-yellow">
                {news.filter((n) => n.isBookmarked).length}
              </div>
              <div className="text-sm text-white/60">Bookmarked</div>
            </div>
          </div>
        </motion.div>

        {/* Search and Controls */}
        <div className="mb-8">
          <Card className="p-6 bg-white/10 backdrop-blur-md border border-cyber-blue/20">
            {/* Search Bar */}
            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/50" />
              <Input
                placeholder="Search news articles, symbols, or topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-white/5 border-cyber-blue/20 text-white placeholder-white/50"
              />
            </div>

            {/* Controls */}
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center space-x-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowFilters(!showFilters)}
                  className="border-cyber-blue/30 text-cyber-blue hover:bg-cyber-blue/10"
                >
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                </Button>

                <div className="flex items-center space-x-2">
                  <Button
                    variant={viewMode === "grid" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                    className="border-cyber-purple/30 text-cyber-purple hover:bg-cyber-purple/10"
                  >
                    <GridIcon className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                    className="border-cyber-purple/30 text-cyber-purple hover:bg-cyber-purple/10"
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="text-sm bg-white/10 border border-cyber-blue/30 rounded-lg px-3 py-1 text-white"
                >
                  <option value="latest">Latest</option>
                  <option value="popular">Most Popular</option>
                  <option value="trending">Trending</option>
                </select>

                <Button
                  variant="outline"
                  size="sm"
                  className="border-cyber-green/30 text-cyber-green hover:bg-cyber-green/10"
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Refresh
                </Button>
              </div>
            </div>

            {/* Filters Panel */}
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="mt-6 pt-6 border-t border-white/10"
              >
                {/* Category Filters */}
                <div className="mb-6">
                  <h3 className="text-white font-semibold mb-3">Categories</h3>
                  <div className="flex flex-wrap gap-2">
                    {categories.map((category) => {
                      const Icon = category.icon;
                      const count =
                        selectedCategory === "all"
                          ? news.length
                          : news.filter((n) => n.category === category.id)
                              .length;

                      return (
                        <Button
                          key={category.id}
                          variant={
                            selectedCategory === category.id
                              ? "default"
                              : "outline"
                          }
                          size="sm"
                          onClick={() => setSelectedCategory(category.id)}
                          className={cn(
                            "transition-all duration-200",
                            selectedCategory === category.id
                              ? `bg-${category.color} text-white border-${category.color}`
                              : `bg-white/10 text-white/70 border-${category.color}/30 hover:bg-${category.color}/10`,
                          )}
                        >
                          <Icon className="h-4 w-4 mr-2" />
                          {category.label}
                          <Badge
                            variant="secondary"
                            className="ml-2 bg-white/20 text-white text-xs"
                          >
                            {count}
                          </Badge>
                        </Button>
                      );
                    })}
                  </div>
                </div>

                {/* Additional Filters */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <h4 className="text-white font-medium mb-2">Sentiment</h4>
                    <div className="flex flex-wrap gap-2">
                      {sentiments.map((sentiment) => (
                        <Button
                          key={sentiment.id}
                          variant={
                            selectedSentiment === sentiment.id
                              ? "default"
                              : "outline"
                          }
                          size="sm"
                          onClick={() => setSelectedSentiment(sentiment.id)}
                          className={cn(
                            "text-xs",
                            selectedSentiment === sentiment.id
                              ? `bg-${sentiment.color} text-white`
                              : `border-${sentiment.color}/30 text-${sentiment.color} hover:bg-${sentiment.color}/10`,
                          )}
                        >
                          {sentiment.label}
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-white font-medium mb-2">Timeframe</h4>
                    <div className="flex flex-wrap gap-2">
                      {timeframes.map((timeframe) => (
                        <Button
                          key={timeframe.id}
                          variant={
                            selectedTimeframe === timeframe.id
                              ? "default"
                              : "outline"
                          }
                          size="sm"
                          onClick={() => setSelectedTimeframe(timeframe.id)}
                          className={cn(
                            "text-xs",
                            selectedTimeframe === timeframe.id
                              ? "bg-cyber-blue text-white"
                              : "border-cyber-blue/30 text-cyber-blue hover:bg-cyber-blue/10",
                          )}
                        >
                          {timeframe.label}
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-white font-medium mb-2">Actions</h4>
                    <div className="flex flex-wrap gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-cyber-yellow/30 text-cyber-yellow hover:bg-cyber-yellow/10 text-xs"
                      >
                        <Bookmark className="h-3 w-3 mr-1" />
                        Bookmarked
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-cyber-green/30 text-cyber-green hover:bg-cyber-green/10 text-xs"
                      >
                        <Rss className="h-3 w-3 mr-1" />
                        Subscribe
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </Card>
        </div>

        {/* News Grid/List */}
        <div className="mb-8">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <Card key={i} className="p-6 bg-white/10 animate-pulse">
                  <div className="h-4 bg-white/10 rounded mb-2" />
                  <div className="h-3 bg-white/5 rounded mb-2" />
                  <div className="h-3 bg-white/5 rounded w-3/4" />
                </Card>
              ))}
            </div>
          ) : displayedNews.length === 0 ? (
            <div className="text-center py-12 text-white/60">
              <Newspaper className="h-16 w-16 mx-auto mb-4 opacity-50" />
              <p className="text-xl mb-2">No articles found</p>
              <p>Try adjusting your search or filters</p>
            </div>
          ) : (
            <div
              className={cn(
                viewMode === "grid"
                  ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                  : "space-y-4",
              )}
            >
              {displayedNews.map((article, index) => {
                const SentimentIcon = getSentimentIcon(article.sentiment);

                return (
                  <motion.div
                    key={article.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Card
                      className={cn(
                        "bg-white/10 backdrop-blur-md border border-cyber-blue/20 hover:bg-white/15 hover:border-cyber-blue/40 transition-all duration-300 cursor-pointer group",
                        viewMode === "list" ? "p-4" : "p-6",
                      )}
                    >
                      <div
                        className={cn(
                          viewMode === "list"
                            ? "flex items-start space-x-4"
                            : "space-y-4",
                        )}
                      >
                        {/* Image */}
                        {viewMode === "grid" && (
                          <div className="aspect-video bg-cyber-blue/20 rounded-lg mb-4 overflow-hidden">
                            <img
                              src={article.imageUrl}
                              alt={article.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}

                        <div className="flex-1">
                          {/* Header */}
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center space-x-2">
                              <Badge
                                className={cn(
                                  "text-xs",
                                  article.category === "breaking"
                                    ? "bg-cyber-red/20 text-cyber-red border-cyber-red/30"
                                    : article.category === "earnings"
                                      ? "bg-cyber-green/20 text-cyber-green border-cyber-green/30"
                                      : article.category === "crypto"
                                        ? "bg-cyber-yellow/20 text-cyber-yellow border-cyber-yellow/30"
                                        : "bg-cyber-blue/20 text-cyber-blue border-cyber-blue/30",
                                )}
                              >
                                {article.category}
                              </Badge>
                              {article.priority === "high" && (
                                <Badge className="bg-cyber-red/20 text-cyber-red border-cyber-red/30 text-xs animate-pulse">
                                  High Priority
                                </Badge>
                              )}
                            </div>

                            <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => toggleBookmark(article.id)}
                                className={cn(
                                  "p-1",
                                  article.isBookmarked
                                    ? "text-cyber-yellow"
                                    : "text-white/70 hover:text-cyber-yellow",
                                )}
                              >
                                <Bookmark
                                  className={cn(
                                    "h-4 w-4",
                                    article.isBookmarked && "fill-current",
                                  )}
                                />
                              </Button>
                              <Button
                                size="sm"
                                variant="ghost"
                                className="text-white/70 hover:text-white p-1"
                              >
                                <Share className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>

                          {/* Title */}
                          <h3
                            className={cn(
                              "font-semibold text-white mb-2 group-hover:text-cyber-blue transition-colors",
                              viewMode === "list" ? "text-lg" : "text-xl",
                            )}
                          >
                            {article.title}
                          </h3>

                          {/* Summary */}
                          <p className="text-white/70 text-sm mb-3 line-clamp-2">
                            {article.summary}
                          </p>

                          {/* Meta */}
                          <div className="flex items-center justify-between text-xs text-white/60">
                            <div className="flex items-center space-x-4">
                              <div className="flex items-center space-x-1">
                                <SentimentIcon
                                  className={cn(
                                    "h-3 w-3",
                                    getSentimentColor(article.sentiment),
                                  )}
                                />
                                <span
                                  className={getSentimentColor(
                                    article.sentiment,
                                  )}
                                >
                                  {article.sentiment}
                                </span>
                              </div>
                              <span>{article.source}</span>
                              <span>{formatTimeAgo(article.publishedAt)}</span>
                              <span>{article.readTime} min read</span>
                            </div>

                            <div className="flex items-center space-x-3">
                              <div className="flex items-center space-x-1">
                                <Eye className="h-3 w-3" />
                                <span>{article.views}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <ThumbsUp className="h-3 w-3" />
                                <span>{article.likes}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <MessageSquare className="h-3 w-3" />
                                <span>{article.comments}</span>
                              </div>
                            </div>
                          </div>

                          {/* Symbols */}
                          <div className="flex items-center space-x-1 mt-3">
                            {article.symbols.slice(0, 3).map((symbol) => (
                              <Badge
                                key={symbol}
                                variant="outline"
                                className="text-xs border-cyber-blue/30 text-cyber-blue"
                              >
                                {symbol}
                              </Badge>
                            ))}
                            {article.symbols.length > 3 && (
                              <Badge
                                variant="outline"
                                className="text-xs border-cyber-blue/30 text-cyber-blue"
                              >
                                +{article.symbols.length - 3}
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center space-x-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="border-cyber-blue/30 text-cyber-blue hover:bg-cyber-blue/10"
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Previous
            </Button>

            <div className="flex items-center space-x-2">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                const page = i + 1;
                return (
                  <Button
                    key={page}
                    variant={currentPage === page ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCurrentPage(page)}
                    className={cn(
                      currentPage === page
                        ? "bg-cyber-blue text-white"
                        : "border-cyber-blue/30 text-cyber-blue hover:bg-cyber-blue/10",
                    )}
                  >
                    {page}
                  </Button>
                );
              })}
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                setCurrentPage((prev) => Math.min(totalPages, prev + 1))
              }
              disabled={currentPage === totalPages}
              className="border-cyber-blue/30 text-cyber-blue hover:bg-cyber-blue/10"
            >
              Next
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default News;
