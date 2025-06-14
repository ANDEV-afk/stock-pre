import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
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
} from "lucide-react";
import { cn } from "@/lib/utils";

interface NewsArticle {
  id: string;
  title: string;
  summary: string;
  source: string;
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
    | "policy";
  sentiment: "positive" | "negative" | "neutral";
  symbols: string[];
  imageUrl?: string;
  url: string;
  readTime: number;
  isBookmarked: boolean;
  priority: "high" | "medium" | "low";
}

interface StockNewsProps {
  className?: string;
  symbol?: string;
  compact?: boolean;
}

const StockNews = ({ className, symbol, compact = false }: StockNewsProps) => {
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [showAll, setShowAll] = useState(false);
  const [sortBy, setSortBy] = useState<"latest" | "relevance" | "sentiment">(
    "latest",
  );

  // Enhanced mock news data with more articles
  useEffect(() => {
    const mockNews: NewsArticle[] = [
      {
        id: "1",
        title: "Apple Reaches New All-Time High as iPhone Sales Surge",
        summary:
          "Apple Inc. (AAPL) reached a new all-time high today following strong iPhone 15 sales data from Q4. The stock gained 3.2% in early trading, breaking through key resistance levels.",
        source: "MarketWatch",
        publishedAt: new Date(Date.now() - 1800000), // 30 min ago
        category: "breaking",
        sentiment: "positive",
        symbols: ["AAPL"],
        url: "#",
        readTime: 3,
        isBookmarked: false,
        priority: "high",
      },
      {
        id: "2",
        title: "Tesla's New Gigafactory Plans Boost EV Sector",
        summary:
          "Tesla announced plans for three new Gigafactories across Asia, sending EV stocks higher. TSLA up 5%, rivaling stocks also gaining momentum.",
        source: "Reuters",
        publishedAt: new Date(Date.now() - 3600000), // 1 hour ago
        category: "market",
        sentiment: "positive",
        symbols: ["TSLA", "RIVN", "LCID"],
        url: "#",
        readTime: 4,
        isBookmarked: true,
        priority: "high",
      },
      {
        id: "3",
        title: "Federal Reserve Hints at Interest Rate Pause",
        summary:
          "Fed officials suggest a potential pause in rate hikes, boosting tech stocks. NASDAQ futures up 2% in after-hours trading.",
        source: "Bloomberg",
        publishedAt: new Date(Date.now() - 7200000), // 2 hours ago
        category: "global",
        sentiment: "positive",
        symbols: ["QQQ", "SPY", "GOOGL", "MSFT"],
        url: "#",
        readTime: 5,
        isBookmarked: false,
        priority: "high",
      },
      {
        id: "4",
        title: "NVIDIA Reports Record AI Chip Demand",
        summary:
          "NVIDIA's latest earnings show unprecedented demand for AI chips. Revenue up 206% year-over-year, beating all analyst expectations by wide margin.",
        source: "TechCrunch",
        publishedAt: new Date(Date.now() - 10800000), // 3 hours ago
        category: "earnings",
        sentiment: "positive",
        symbols: ["NVDA", "AMD"],
        url: "#",
        readTime: 6,
        isBookmarked: false,
        priority: "high",
      },
      {
        id: "5",
        title: "Market Volatility Increases Amid Banking Sector Concerns",
        summary:
          "Regional banking stocks decline as investors worry about commercial real estate exposure. VIX spikes to highest level this month.",
        source: "CNBC",
        publishedAt: new Date(Date.now() - 14400000), // 4 hours ago
        category: "market",
        sentiment: "negative",
        symbols: ["VXX", "SPY"],
        url: "#",
        readTime: 4,
        isBookmarked: false,
        priority: "medium",
      },
      {
        id: "6",
        title: "Bitcoin Surges Past $45,000 as ETF Approval Hopes Rise",
        summary:
          "Cryptocurrency markets rally as speculation grows around Bitcoin ETF approvals. COIN and MSTR leading crypto-related stock gains.",
        source: "CoinDesk",
        publishedAt: new Date(Date.now() - 18000000), // 5 hours ago
        category: "crypto",
        sentiment: "positive",
        symbols: ["COIN", "MSTR"],
        url: "#",
        readTime: 3,
        isBookmarked: true,
        priority: "medium",
      },
      {
        id: "7",
        title: "Microsoft Azure Cloud Revenue Exceeds Expectations",
        summary:
          "Microsoft's cloud division continues strong growth with Azure revenue up 29% year-over-year. AI integration driving enterprise adoption.",
        source: "Wall Street Journal",
        publishedAt: new Date(Date.now() - 21600000), // 6 hours ago
        category: "tech",
        sentiment: "positive",
        symbols: ["MSFT"],
        url: "#",
        readTime: 5,
        isBookmarked: false,
        priority: "medium",
      },
      {
        id: "8",
        title: "Amazon Web Services Launches New AI Tools",
        summary:
          "AWS introduces advanced machine learning capabilities for enterprise customers. Competition with Microsoft and Google intensifies.",
        source: "Forbes",
        publishedAt: new Date(Date.now() - 25200000), // 7 hours ago
        category: "tech",
        sentiment: "positive",
        symbols: ["AMZN", "GOOGL", "MSFT"],
        url: "#",
        readTime: 4,
        isBookmarked: false,
        priority: "medium",
      },
      {
        id: "9",
        title: "Energy Sector Rally Continues on Oil Price Surge",
        summary:
          "Crude oil prices jump 4% on geopolitical tensions and supply concerns. Energy stocks lead S&P 500 gains for third consecutive day.",
        source: "Financial Times",
        publishedAt: new Date(Date.now() - 28800000), // 8 hours ago
        category: "market",
        sentiment: "positive",
        symbols: ["XOM", "CVX", "SLB"],
        url: "#",
        readTime: 4,
        isBookmarked: false,
        priority: "medium",
      },
      {
        id: "10",
        title: "Pharmaceutical Stocks Rise on Drug Approval News",
        summary:
          "FDA approves breakthrough cancer treatment, boosting biotech sector. Multiple pharmaceutical companies see gains in pre-market trading.",
        source: "BioPharma Dive",
        publishedAt: new Date(Date.now() - 32400000), // 9 hours ago
        category: "finance",
        sentiment: "positive",
        symbols: ["PFE", "JNJ", "MRNA"],
        url: "#",
        readTime: 5,
        isBookmarked: false,
        priority: "low",
      },
      {
        id: "11",
        title: "Retail Sales Data Shows Consumer Strength",
        summary:
          "November retail sales exceed forecasts, signaling robust consumer spending. Retail stocks rally on positive economic indicators.",
        source: "MarketWatch",
        publishedAt: new Date(Date.now() - 36000000), // 10 hours ago
        category: "finance",
        sentiment: "positive",
        symbols: ["WMT", "TGT", "COST"],
        url: "#",
        readTime: 3,
        isBookmarked: false,
        priority: "low",
      },
      {
        id: "12",
        title: "Global Markets Mixed on Central Bank Policy Uncertainty",
        summary:
          "Asian markets close mixed as investors await central bank decisions. European markets open lower on inflation concerns.",
        source: "Reuters",
        publishedAt: new Date(Date.now() - 39600000), // 11 hours ago
        category: "global",
        sentiment: "neutral",
        symbols: ["EFA", "VWO", "FXI"],
        url: "#",
        readTime: 4,
        isBookmarked: false,
        priority: "low",
      },
    ];

    // Filter by symbol if provided
    const filteredNews = symbol
      ? mockNews.filter((article) =>
          article.symbols.includes(symbol.toUpperCase()),
        )
      : mockNews;

    setNews(filteredNews);
    setIsLoading(false);
  }, [symbol]);

  const categories = [
    { id: "all", label: "All News", icon: Newspaper },
    { id: "breaking", label: "Breaking", icon: Zap },
    { id: "market", label: "Market", icon: TrendingUp },
    { id: "earnings", label: "Earnings", icon: DollarSign },
    { id: "tech", label: "Tech", icon: BarChart3 },
    { id: "crypto", label: "Crypto", icon: TrendingUp },
    { id: "global", label: "Global", icon: Globe },
    { id: "analysis", label: "Analysis", icon: Eye },
  ];

  const filteredAndSearchedNews = news
    .filter((article) => {
      const matchesCategory =
        selectedCategory === "all" || article.category === selectedCategory;
      const matchesSearch =
        searchQuery === "" ||
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.symbols.some((symbol) =>
          symbol.toLowerCase().includes(searchQuery.toLowerCase()),
        );
      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "latest":
          return b.publishedAt.getTime() - a.publishedAt.getTime();
        case "relevance":
          return a.priority === "high" ? -1 : b.priority === "high" ? 1 : 0;
        case "sentiment":
          return a.sentiment === "positive"
            ? -1
            : b.sentiment === "positive"
              ? 1
              : 0;
        default:
          return 0;
      }
    });

  const displayedNews = compact
    ? filteredAndSearchedNews.slice(0, 3)
    : showAll
      ? filteredAndSearchedNews
      : filteredAndSearchedNews.slice(0, 6);

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

  const getCategoryBadgeColor = (category: string) => {
    switch (category) {
      case "breaking":
        return "bg-cyber-red/20 text-cyber-red border-cyber-red/30";
      case "earnings":
        return "bg-cyber-green/20 text-cyber-green border-cyber-green/30";
      case "crypto":
        return "bg-cyber-yellow/20 text-cyber-yellow border-cyber-yellow/30";
      case "tech":
        return "bg-cyber-purple/20 text-cyber-purple border-cyber-purple/30";
      case "analysis":
        return "bg-cyber-purple/20 text-cyber-purple border-cyber-purple/30";
      default:
        return "bg-cyber-blue/20 text-cyber-blue border-cyber-blue/30";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "border-l-cyber-red";
      case "medium":
        return "border-l-cyber-yellow";
      default:
        return "border-l-cyber-blue";
    }
  };

  const formatTimeAgo = (date: Date) => {
    const diff = Date.now() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);

    if (minutes < 60) {
      return `${minutes}m ago`;
    } else if (hours < 24) {
      return `${hours}h ago`;
    } else {
      return date.toLocaleDateString();
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

  if (compact) {
    return (
      <Card
        className={cn(
          "p-4 bg-white/10 backdrop-blur-md border border-cyber-blue/20 shadow-cyber",
          className,
        )}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-white flex items-center space-x-2">
            <Newspaper className="h-5 w-5 text-cyber-blue" />
            <span>Latest News</span>
          </h3>
          <Link to="/news">
            <Button
              size="sm"
              variant="outline"
              className="border-cyber-blue/30 text-cyber-blue hover:bg-cyber-blue/10"
            >
              View All ({news.length})
            </Button>
          </Link>
        </div>

        <div className="space-y-3">
          {displayedNews.map((article, index) => {
            const SentimentIcon = getSentimentIcon(article.sentiment);

            return (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={cn(
                  "flex items-start space-x-3 p-3 bg-white/5 border rounded-lg hover:bg-white/10 transition-all duration-200 cursor-pointer border-l-4",
                  "border-cyber-blue/10 hover:border-cyber-blue/20",
                  getPriorityColor(article.priority),
                )}
              >
                <div className="flex-shrink-0 mt-1">
                  <SentimentIcon
                    className={cn(
                      "h-4 w-4",
                      getSentimentColor(article.sentiment),
                    )}
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    {article.priority === "high" && (
                      <AlertCircle className="h-3 w-3 text-cyber-red" />
                    )}
                    <Badge className={getCategoryBadgeColor(article.category)}>
                      {article.category}
                    </Badge>
                  </div>
                  <h4 className="text-sm font-semibold text-white line-clamp-2 mb-1">
                    {article.title}
                  </h4>
                  <div className="flex items-center space-x-2 text-xs text-white/60">
                    <span>{article.source}</span>
                    <span>•</span>
                    <span>{formatTimeAgo(article.publishedAt)}</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </Card>
    );
  }

  return (
    <Card
      className={cn(
        "p-6 bg-white/10 backdrop-blur-md border border-cyber-blue/20 shadow-cyber",
        className,
      )}
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-cyber-blue/20 rounded-xl">
            <Newspaper className="h-5 w-5 text-cyber-blue" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">
              {symbol ? `${symbol} News` : "Market News"}
            </h3>
            <p className="text-sm text-cyber-blue/70">
              {filteredAndSearchedNews.length} articles • Live updates
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="text-sm bg-white/10 border border-cyber-blue/30 rounded-lg px-3 py-1 text-white"
          >
            <option value="latest">Latest</option>
            <option value="relevance">Relevance</option>
            <option value="sentiment">Sentiment</option>
          </select>
          <Button
            size="sm"
            variant="outline"
            className="border-cyber-purple/30 text-cyber-purple hover:bg-cyber-purple/10"
          >
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/50" />
        <Input
          placeholder="Search news articles..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 bg-white/5 border-cyber-blue/20 text-white placeholder-white/50"
        />
      </div>

      {/* Category Filters */}
      <div className="flex space-x-2 mb-6 overflow-x-auto pb-2">
        {categories.map((category) => {
          const Icon = category.icon;
          const count =
            category.id === "all"
              ? news.length
              : news.filter((n) => n.category === category.id).length;

          return (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category.id)}
              className={cn(
                "flex-shrink-0 transition-all duration-200",
                selectedCategory === category.id
                  ? "bg-cyber-blue text-white border-cyber-blue"
                  : "bg-white/10 text-white/70 border-cyber-blue/30 hover:bg-white/20 hover:border-cyber-blue/50",
              )}
            >
              <Icon className="h-4 w-4 mr-2" />
              {category.label}
              {count > 0 && (
                <Badge
                  variant="secondary"
                  className="ml-2 bg-white/20 text-white text-xs"
                >
                  {count}
                </Badge>
              )}
            </Button>
          );
        })}
      </div>

      {/* News Articles */}
      <div className="space-y-4">
        {isLoading ? (
          <div className="space-y-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="h-4 bg-white/10 rounded mb-2" />
                <div className="h-3 bg-white/5 rounded mb-2" />
                <div className="h-3 bg-white/5 rounded w-3/4" />
              </div>
            ))}
          </div>
        ) : filteredAndSearchedNews.length === 0 ? (
          <div className="text-center py-8 text-white/60">
            <Newspaper className="h-12 w-12 mx-auto mb-3 opacity-50" />
            <p>No news articles found</p>
            <p className="text-sm">Try adjusting your search or filters</p>
          </div>
        ) : (
          <div className="space-y-4">
            {displayedNews.map((article, index) => {
              const SentimentIcon = getSentimentIcon(article.sentiment);

              return (
                <motion.div
                  key={article.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={cn(
                    "p-4 bg-white/5 border rounded-xl hover:bg-white/10 transition-all duration-200 cursor-pointer group border-l-4",
                    "border-cyber-blue/10 hover:border-cyber-blue/20",
                    getPriorityColor(article.priority),
                  )}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      {article.priority === "high" && (
                        <AlertCircle className="h-4 w-4 text-cyber-red animate-pulse" />
                      )}
                      <Badge
                        className={getCategoryBadgeColor(article.category)}
                      >
                        {article.category}
                      </Badge>
                      {article.category === "breaking" && (
                        <Badge className="bg-cyber-red/20 text-cyber-red border-cyber-red/30 animate-pulse">
                          LIVE
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
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-white/70 hover:text-white p-1"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <h4 className="text-lg font-semibold text-white mb-2 group-hover:text-cyber-blue transition-colors">
                    {article.title}
                  </h4>

                  <p className="text-white/70 text-sm mb-3 line-clamp-2">
                    {article.summary}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-sm text-white/60">
                      <div className="flex items-center space-x-1">
                        <SentimentIcon
                          className={cn(
                            "h-4 w-4",
                            getSentimentColor(article.sentiment),
                          )}
                        />
                        <span className={getSentimentColor(article.sentiment)}>
                          {article.sentiment}
                        </span>
                      </div>

                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span>{formatTimeAgo(article.publishedAt)}</span>
                      </div>

                      <span>{article.source}</span>
                      <span>{article.readTime} min read</span>
                    </div>

                    <div className="flex items-center space-x-1">
                      {article.symbols.slice(0, 3).map((sym) => (
                        <Badge
                          key={sym}
                          variant="outline"
                          className="text-xs border-cyber-blue/30 text-cyber-blue"
                        >
                          {sym}
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
                </motion.div>
              );
            })}
          </div>
        )}
      </div>

      {/* Load More / Show All */}
      {filteredAndSearchedNews.length > 6 && (
        <div className="mt-6 text-center">
          {!showAll ? (
            <Link to="/news">
              <Button
                variant="outline"
                className="bg-white/10 border-cyber-blue/30 text-cyber-blue hover:bg-cyber-blue/10 hover:border-cyber-blue/50"
              >
                View All {filteredAndSearchedNews.length} Articles
                <ArrowDown className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          ) : (
            <Button
              onClick={() => setShowAll(false)}
              variant="outline"
              className="bg-white/10 border-cyber-blue/30 text-cyber-blue hover:bg-cyber-blue/10 hover:border-cyber-blue/50"
            >
              Show Less
            </Button>
          )}
        </div>
      )}
    </Card>
  );
};

export default StockNews;
