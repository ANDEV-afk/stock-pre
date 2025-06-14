import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { demoDataService } from "@/lib/demo-data-service";
import {
  TrendingUp,
  TrendingDown,
  BarChart3,
  Activity,
  Zap,
  RefreshCw,
  Globe,
  Filter,
  Eye,
  Star,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface IndexData {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  type: string;
  volume: number;
  marketCap: string;
}

const IndicesDashboard = () => {
  const [indices, setIndices] = useState<IndexData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [watchlist, setWatchlist] = useState<string[]>(["SPY", "QQQ", "AAPL", "GOOGL"]);

  const fetchIndicesData = async () => {
    setIsLoading(true);
    try {
      console.log("Loading comprehensive global market data...");
      // Use demo data service for consistent experience
      const data = demoDataService.generateIndicesData();
      setIndices(data);
      setLastUpdated(new Date());
    } catch (error) {
      console.log("Generating fallback indices data...");
      // Enhanced fallback with more comprehensive data
      setIndices([
        // US Indices
        { symbol: "SPY", name: "S&P 500 ETF", price: 455.2, change: 3.45, changePercent: 0.76, type: "index", volume: 78934562, marketCap: "12.5T" },
        { symbol: "QQQ", name: "NASDAQ 100 ETF", price: 385.5, change: -2.15, changePercent: -0.56, type: "index", volume: 45678321, marketCap: "8.9T" },
        { symbol: "DIA", name: "Dow Jones ETF", price: 345.8, change: 1.23, changePercent: 0.36, type: "index", volume: 23456789, marketCap: "4.2T" },

        // Global Indices
        { symbol: "EWJ", name: "Japan ETF (Nikkei)", price: 68.45, change: 0.87, changePercent: 1.29, type: "global", volume: 12345678, marketCap: "890B" },
        { symbol: "FXI", name: "China Large-Cap ETF", price: 28.93, change: -0.45, changePercent: -1.53, type: "global", volume: 34567890, marketCap: "567B" },
        { symbol: "EWG", name: "Germany ETF (DAX)", price: 31.78, change: 0.23, changePercent: 0.73, type: "global", volume: 8765432, marketCap: "234B" },

        // Top Stocks
        { symbol: "AAPL", name: "Apple Inc.", price: 175.43, change: 2.14, changePercent: 1.23, type: "stock", volume: 64582347, marketCap: "2.7T" },
        { symbol: "GOOGL", name: "Alphabet Inc.", price: 138.21, change: -1.23, changePercent: -0.88, type: "stock", volume: 28394756, marketCap: "1.8T" },
        { symbol: "MSFT", name: "Microsoft Corp.", price: 378.85, change: 4.52, changePercent: 1.21, type: "stock", volume: 32847392, marketCap: "2.8T" },
        { symbol: "TSLA", name: "Tesla Inc.", price: 242.68, change: -3.45, changePercent: -1.4, type: "stock", volume: 89573829, marketCap: "782B" },
        { symbol: "NVDA", name: "NVIDIA Corp.", price: 721.33, change: 15.43, changePercent: 2.18, type: "stock", volume: 45738294, marketCap: "1.8T" },
      ]);
      setLastUpdated(new Date());
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchIndicesData();
    // Auto-refresh every 30 seconds
    const interval = setInterval(fetchIndicesData, 30000);
    return () => clearInterval(interval);
  }, []);

  const getMarketSentiment = () => {
    const positiveCount = indices.filter((index) => index.change > 0).length;
    const total = indices.length;
    const bullishPercentage = (positiveCount / total) * 100;

    if (bullishPercentage >= 70)
      return { label: "Bullish", color: "text-cyber-green", icon: TrendingUp };
    if (bullishPercentage <= 30)
      return { label: "Bearish", color: "text-cyber-red", icon: TrendingDown };
    return { label: "Neutral", color: "text-cyber-yellow", icon: Activity };
  };

  const sentiment = getMarketSentiment();
  const SentimentIcon = sentiment.icon;

  const getFilteredIndices = () => {
    if (selectedCategory === "all") return indices;
    return indices.filter((index) => index.type === selectedCategory);
  };

  const categories = [
    { id: "all", label: "All", icon: Globe },
    { id: "index", label: "Indices", icon: BarChart3 },
    { id: "stock", label: "Stocks", icon: TrendingUp },
    { id: "global", label: "Global", icon: Globe },
    { id: "sector", label: "Sectors", icon: Activity },
  ];

  const toggleWatchlist = (symbol: string) => {
    setWatchlist(prev =>
      prev.includes(symbol)
        ? prev.filter(s => s !== symbol)
        : [...prev, symbol]
    );
  };

  const filteredIndices = getFilteredIndices();

  if (isLoading) {
    return (
      <Card className="p-8 bg-white/10 backdrop-blur-md border border-cyber-blue/20 shadow-cyber">
        <div className="animate-pulse">
          <div className="h-6 bg-white/20 rounded mb-4 w-1/3"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-20 bg-white/10 rounded"></div>
            ))}
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6 bg-white/10 backdrop-blur-md border border-cyber-blue/20 shadow-cyber">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-cyber-blue/20 rounded-xl">
            <Globe className="h-5 w-5 text-cyber-blue" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Global Markets</h3>
            <div className="flex items-center space-x-4 text-sm">
              <p className="text-cyber-blue/70">
                {indices.length} instruments tracked
              </p>
              <div className="flex items-center space-x-1">
                <SentimentIcon className={cn("h-4 w-4", sentiment.color)} />
                <span className={sentiment.color}>Market {sentiment.label}</span>
              </div>
              {lastUpdated && (
                <span className="text-white/50">
                  Updated {lastUpdated.toLocaleTimeString()}
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            size="sm"
            variant="outline"
            className="border-cyber-purple/30 text-cyber-purple hover:bg-cyber-purple/10"
          >
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button
            size="sm"
            onClick={fetchIndicesData}
            disabled={isLoading}
            className="bg-gradient-to-r from-cyber-blue to-cyber-purple hover:from-cyber-blue-dark hover:to-cyber-purple-dark text-white"
          >
            <RefreshCw className={cn("h-4 w-4 mr-2", isLoading && "animate-spin")} />
            Refresh
          </Button>
        </div>
      </div>

      {/* Category Filters */}
      <div className="flex space-x-2 mb-6 overflow-x-auto">
        {categories.map((category) => {
          const Icon = category.icon;
          const count = category.id === "all" ? indices.length : indices.filter(i => i.type === category.id).length;

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
                  : "bg-white/10 text-white/70 border-cyber-blue/30 hover:bg-white/20 hover:border-cyber-blue/50"
              )}
            >
              <Icon className="h-4 w-4 mr-2" />
              {category.label}
              {count > 0 && (
                <Badge variant="secondary" className="ml-2 bg-white/20 text-white text-xs">
                  {count}
                </Badge>
              )}
            </Button>
          );
        })}
      </div>

      {/* Indices Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {filteredIndices.map((index, i) => {
          const isPositive = index.change >= 0;
          const isInWatchlist = watchlist.includes(index.symbol);

          return (
            <motion.div
              key={index.symbol}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ scale: 1.02, y: -2 }}
              className="p-4 bg-white/5 border border-cyber-blue/10 rounded-xl hover:bg-white/10 hover:border-cyber-blue/20 transition-all duration-200 cursor-pointer group"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="font-bold text-white text-sm">
                      {index.symbol}
                    </span>
                    <Badge
                      variant="outline"
                      className={cn(
                        "text-xs",
                        index.type === "index" && "border-cyber-blue/30 text-cyber-blue",
                        index.type === "stock" && "border-cyber-green/30 text-cyber-green",
                        index.type === "global" && "border-cyber-purple/30 text-cyber-purple",
                        index.type === "sector" && "border-cyber-yellow/30 text-cyber-yellow"
                      )}
                    >
                      {index.type}
                    </Badge>
                  </div>
                  <p className="text-xs text-white/70 line-clamp-1 mb-2">
                    {index.name}
                  </p>
                </div>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => toggleWatchlist(index.symbol)}
                  className={cn(
                    "opacity-0 group-hover:opacity-100 transition-opacity p-1",
                    isInWatchlist ? "text-cyber-yellow" : "text-white/50 hover:text-cyber-yellow"
                  )}
                >
                  {isInWatchlist ? (
                    <Star className="h-3 w-3 fill-current" />
                  ) : (
                    <Eye className="h-3 w-3" />
                  )}
                </Button>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-white">
                    ${index.price.toFixed(2)}
                  </span>
                  <div className={cn(
                    "flex items-center space-x-1 text-xs font-medium",
                    isPositive ? "text-cyber-green" : "text-cyber-red"
                  )}>
                    {isPositive ? (
                      <TrendingUp className="h-3 w-3" />
                    ) : (
                      <TrendingDown className="h-3 w-3" />
                    )}
                    <span>
                      {isPositive ? "+" : ""}{index.changePercent.toFixed(2)}%
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-white/60">
                  <span>${Math.abs(index.change).toFixed(2)}</span>
                  <span>{index.marketCap}</span>
                </div>

                <div className="flex items-center justify-between text-xs text-white/50">
                  <span>Vol: {(index.volume / 1000000).toFixed(1)}M</span>
                  <div className="flex items-center space-x-1">
                    <div className={cn(
                      "w-2 h-2 rounded-full",
                      isPositive ? "bg-cyber-green" : "bg-cyber-red"
                    )}></div>
                    <span className="text-xs">Live</span>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Market Summary */}
      <div className="mt-6 p-4 bg-white/5 border border-cyber-blue/10 rounded-xl">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <p className="text-cyber-green text-2xl font-bold">
              {indices.filter(i => i.change > 0).length}
            </p>
            <p className="text-cyber-green/70 text-sm">Gainers</p>
          </div>
          <div>
            <p className="text-cyber-red text-2xl font-bold">
              {indices.filter(i => i.change < 0).length}
            </p>
            <p className="text-cyber-red/70 text-sm">Losers</p>
          </div>
          <div>
            <p className="text-cyber-blue text-2xl font-bold">
              {indices.filter(i => Math.abs(i.changePercent) > 2).length}
            </p>
            <p className="text-cyber-blue/70 text-sm">High Movement</p>
          </div>
          <div>
            <p className="text-cyber-purple text-2xl font-bold">
              {watchlist.length}
            </p>
            <p className="text-cyber-purple/70 text-sm">In Watchlist</p>
          </div>
        </div>
      </div>
    </Card>
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-cyber-gray-700 rounded-xl w-1/3" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-24 bg-cyber-gray-700 rounded-xl" />
            ))}
          </div>
        </div>
      </Card>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Header */}
      <Card className="dark-card p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">
              Market Indices
            </h2>
            <div className="flex items-center space-x-4 text-sm text-cyber-gray-300">
              <span>
                Market Sentiment:{" "}
                <span className={sentiment.color}>{sentiment.label}</span>
              </span>
              {lastUpdated && (
                <span>Updated: {lastUpdated.toLocaleTimeString()}</span>
              )}
            </div>
          </div>

          <Button
            onClick={fetchIndicesData}
            disabled={isLoading}
            className="bg-cyber-blue hover:bg-cyber-blue-dark text-white glow-blue"
          >
            <RefreshCw
              className={cn("h-4 w-4 mr-2", isLoading && "animate-spin")}
            />
            Refresh
          </Button>
        </div>

        {/* Indices Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {indices.map((index, idx) => {
            const isPositive = index.change >= 0;

            return (
              <motion.div
                key={index.symbol}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.1 }}
                className="neon-border p-4 rounded-xl hover:glow-blue transition-all duration-300 group cursor-pointer"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    {isPositive ? (
                      <TrendingUp className="h-4 w-4 text-cyber-green" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-cyber-red" />
                    )}
                    <span className="text-xs text-cyber-gray-300 font-mono">
                      {index.symbol.replace("^", "")}
                    </span>
                  </div>

                  <div
                    className={cn(
                      "text-xs px-2 py-1 rounded-full font-medium",
                      isPositive
                        ? "bg-cyber-green/20 text-cyber-green"
                        : "bg-cyber-red/20 text-cyber-red",
                    )}
                  >
                    {isPositive ? "+" : ""}
                    {(index.changePercent || 0).toFixed(2)}%
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-sm font-semibold text-white group-hover:text-cyber-blue transition-colors">
                    {index.name}
                  </h3>

                  <div className="space-y-1">
                    <p className="text-lg font-bold text-white">
                      {(index.price || 0).toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </p>

                    <p
                      className={cn(
                        "text-sm font-medium",
                        isPositive ? "text-cyber-green" : "text-cyber-red",
                      )}
                    >
                      {isPositive ? "+" : ""}
                      {(index.change || 0).toFixed(2)}
                    </p>
                  </div>
                </div>

                {/* Mini chart placeholder */}
                <div className="mt-4 h-8 flex items-end space-x-1">
                  {[...Array(12)].map((_, i) => (
                    <div
                      key={i}
                      className={cn(
                        "flex-1 rounded-sm transition-all duration-300",
                        isPositive ? "bg-cyber-green/30" : "bg-cyber-red/30",
                      )}
                      style={{
                        height: `${Math.random() * 100}%`,
                      }}
                    />
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </Card>

      {/* Market Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="dark-card p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-cyber-blue/20 rounded-xl">
              <BarChart3 className="h-6 w-6 text-cyber-blue" />
            </div>
            <h3 className="text-lg font-semibold text-white">
              Market Overview
            </h3>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-cyber-gray-300">Rising Indices</span>
              <span className="text-cyber-green font-semibold">
                {indices.filter((i) => i.change > 0).length}/{indices.length}
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-cyber-gray-300">Avg Change</span>
              <span
                className={cn(
                  "font-semibold",
                  indices.reduce((sum, i) => sum + i.changePercent, 0) /
                    indices.length >
                    0
                    ? "text-cyber-green"
                    : "text-cyber-red",
                )}
              >
                {(
                  indices.reduce((sum, i) => sum + i.changePercent, 0) /
                  indices.length
                ).toFixed(2)}
                %
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-cyber-gray-300">Volatility</span>
              <span className="text-cyber-yellow font-semibold">
                {(indices.find((i) => i.symbol === "VXX")?.price || 0).toFixed(
                  2,
                )}
              </span>
            </div>
          </div>
        </Card>

        <Card className="dark-card p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-cyber-purple/20 rounded-xl">
              <Activity className="h-6 w-6 text-cyber-purple" />
            </div>
            <h3 className="text-lg font-semibold text-white">AI Insights</h3>
          </div>

          <div className="space-y-3 text-sm">
            <p className="text-cyber-gray-300">
              Current market shows{" "}
              <span className={sentiment.color}>
                {sentiment.label.toLowerCase()}
              </span>{" "}
              sentiment with {indices.filter((i) => i.change > 0).length} out of{" "}
              {indices.length} indices in positive territory.
            </p>

            <div className="p-3 bg-cyber-blue/10 rounded-lg border border-cyber-blue/20">
              <p className="text-cyber-blue text-xs">
                💡 AI Prediction: Based on current patterns, expect continued
                {sentiment.label === "Bullish"
                  ? " upward momentum"
                  : sentiment.label === "Bearish"
                    ? " downward pressure"
                    : " sideways movement"}
                in the next session.
              </p>
            </div>
          </div>
        </Card>

        <Card className="dark-card p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-cyber-green/20 rounded-xl">
              <Zap className="h-6 w-6 text-cyber-green" />
            </div>
            <h3 className="text-lg font-semibold text-white">Quick Actions</h3>
          </div>

          <div className="space-y-3">
            <Button className="w-full bg-cyber-blue/20 hover:bg-cyber-blue/30 text-cyber-blue border border-cyber-blue/30">
              Analyze NASDAQ
            </Button>

            <Button className="w-full bg-cyber-purple/20 hover:bg-cyber-purple/30 text-cyber-purple border border-cyber-purple/30">
              S&P 500 Forecast
            </Button>

            <Button className="w-full bg-cyber-green/20 hover:bg-cyber-green/30 text-cyber-green border border-cyber-green/30">
              Set Index Alerts
            </Button>
          </div>
        </Card>
      </div>
    </motion.div>
  );
};

export default IndicesDashboard;