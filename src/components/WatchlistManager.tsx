import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Eye,
  Plus,
  Trash2,
  Star,
  TrendingUp,
  TrendingDown,
  Search,
  X,
  MoreVertical,
  Bell,
  BarChart3,
  Target,
  Activity,
  Zap,
  AlertTriangle,
  RefreshCw,
  Filter,
  Sparkles,
  ChevronDown,
  ChevronUp,
  ArrowUpRight,
  ArrowDownRight,
  Volume2,
  DollarSign,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { TOP_50_COMPANIES, RealCompany } from "@/lib/companies-data";
import { fadeInUp, staggerItem } from "@/lib/animations";
import CompanyLogo from "@/components/CompanyLogo";

interface WatchlistItem extends RealCompany {
  addedAt: Date;
  hasAlert?: boolean;
  alertPrice?: number;
  dayHigh?: number;
  dayLow?: number;
  previousClose?: number;
}

interface WatchlistManagerProps {
  className?: string;
}

const WatchlistManager = ({ className }: WatchlistManagerProps) => {
  const [watchlist, setWatchlist] = useState<WatchlistItem[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<
    "all" | "starred" | "gainers" | "losers" | "alerts"
  >("all");
  const [showAddStock, setShowAddStock] = useState(false);
  const [newStockSymbol, setNewStockSymbol] = useState("");
  const [popularStocks] = useState([
    "AAPL",
    "MSFT",
    "GOOGL",
    "TSLA",
    "NVDA",
    "META",
    "AMZN",
  ]);
  const [isLoading, setIsLoading] = useState(false);

  // Initialize with sample watchlist
  useEffect(() => {
    const sampleWatchlist: WatchlistItem[] = [
      {
        ...TOP_50_COMPANIES.find((c) => c.symbol === "AAPL")!,
        addedAt: new Date(Date.now() - 86400000),
        hasAlert: true,
        alertPrice: 180.0,
        dayHigh: 177.23,
        dayLow: 172.45,
        previousClose: 173.29,
        isWatched: true,
      },
      {
        ...TOP_50_COMPANIES.find((c) => c.symbol === "GOOGL")!,
        addedAt: new Date(Date.now() - 172800000),
        hasAlert: false,
        dayHigh: 140.89,
        dayLow: 136.12,
        previousClose: 139.44,
        isWatched: true,
      },
      {
        ...TOP_50_COMPANIES.find((c) => c.symbol === "TSLA")!,
        addedAt: new Date(Date.now() - 259200000),
        hasAlert: true,
        alertPrice: 240.0,
        dayHigh: 245.67,
        dayLow: 241.23,
        previousClose: 246.13,
        isWatched: true,
      },
      {
        ...TOP_50_COMPANIES.find((c) => c.symbol === "NVDA")!,
        addedAt: new Date(Date.now() - 345600000),
        hasAlert: false,
        dayHigh: 725.89,
        dayLow: 718.45,
        previousClose: 705.9,
        isWatched: true,
      },
      {
        ...TOP_50_COMPANIES.find((c) => c.symbol === "MSFT")!,
        addedAt: new Date(Date.now() - 432000000),
        hasAlert: false,
        dayHigh: 380.23,
        dayLow: 376.45,
        previousClose: 374.33,
        isWatched: true,
      },
    ];

    setWatchlist(sampleWatchlist);
  }, []);

  const handleAddStock = (symbol: string) => {
    const company = TOP_50_COMPANIES.find(
      (c) => c.symbol === symbol.toUpperCase(),
    );
    if (
      !company ||
      watchlist.some((item) => item.symbol === symbol.toUpperCase())
    ) {
      return;
    }

    setIsLoading(true);

    // Simulate API call delay
    setTimeout(() => {
      const newItem: WatchlistItem = {
        ...company,
        addedAt: new Date(),
        dayHigh: company.price * (1 + Math.random() * 0.02),
        dayLow: company.price * (1 - Math.random() * 0.02),
        previousClose: company.price * (1 + (Math.random() - 0.5) * 0.01),
        isWatched: true,
      };

      setWatchlist((prev) => [newItem, ...prev]);
      setNewStockSymbol("");
      setShowAddStock(false);
      setIsLoading(false);
    }, 800);
  };

  const handleRemoveStock = (symbol: string) => {
    setWatchlist((prev) => prev.filter((item) => item.symbol !== symbol));
  };

  const handleToggleStar = (symbol: string) => {
    setWatchlist((prev) =>
      prev.map((item) =>
        item.symbol === symbol ? { ...item, isStarred: !item.isStarred } : item,
      ),
    );
  };

  const handleSetAlert = (symbol: string, price: number) => {
    setWatchlist((prev) =>
      prev.map((item) =>
        item.symbol === symbol
          ? { ...item, hasAlert: true, alertPrice: price }
          : item,
      ),
    );
  };

  const filteredWatchlist = watchlist.filter((item) => {
    const matchesSearch =
      item.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.name.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesFilter = (() => {
      switch (activeFilter) {
        case "starred":
          return item.isStarred;
        case "gainers":
          return item.changePercent > 0;
        case "losers":
          return item.changePercent < 0;
        case "alerts":
          return item.hasAlert;
        default:
          return true;
      }
    })();

    return matchesSearch && matchesFilter;
  });

  const suggestionStocks = TOP_50_COMPANIES.filter(
    (company) =>
      company.symbol.toLowerCase().includes(newStockSymbol.toLowerCase()) ||
      company.name.toLowerCase().includes(newStockSymbol.toLowerCase()),
  ).slice(0, 5);

  const getProximityToDayRange = (item: WatchlistItem) => {
    if (!item.dayHigh || !item.dayLow) return null;

    const range = item.dayHigh - item.dayLow;
    const currentFromLow = item.price - item.dayLow;
    const proximity = (currentFromLow / range) * 100;

    if (proximity >= 90) return { type: "high", label: "Near High" };
    if (proximity <= 10) return { type: "low", label: "Near Low" };
    return null;
  };

  const filterCounts = {
    all: watchlist.length,
    starred: watchlist.filter((item) => item.isStarred).length,
    gainers: watchlist.filter((item) => item.changePercent > 0).length,
    losers: watchlist.filter((item) => item.changePercent < 0).length,
    alerts: watchlist.filter((item) => item.hasAlert).length,
  };

  return (
    <Card
      className={cn(
        "p-6 bg-white/10 backdrop-blur-md border border-cyber-blue/20 shadow-cyber",
        className,
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-cyber-blue/20 rounded-xl">
            <Eye className="h-5 w-5 text-cyber-blue" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Watchlist</h3>
            <div className="flex items-center space-x-2 text-sm text-cyber-blue/70">
              <span>{watchlist.length} stocks</span>
              <span>•</span>
              <span>tracked</span>
              <span>•</span>
              <span>{filterCounts.alerts} alerts</span>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Button
            size="sm"
            variant="outline"
            className="border-cyber-green/30 text-cyber-green hover:bg-cyber-green/10"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button
            size="sm"
            onClick={() => setShowAddStock(true)}
            className="bg-gradient-to-r from-cyber-blue to-cyber-purple hover:from-cyber-blue-dark hover:to-cyber-purple-dark text-white"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Stock
          </Button>
        </div>
      </div>

      {/* Add Stock Modal */}
      <AnimatePresence>
        {showAddStock && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-6 p-4 bg-white/5 border border-cyber-purple/20 rounded-xl"
          >
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-white font-semibold">
                Add Stock to Watchlist
              </h4>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setShowAddStock(false)}
                className="text-white/70 hover:text-white"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/50" />
                <Input
                  placeholder="Search stocks (e.g., AAPL, Apple)"
                  value={newStockSymbol}
                  onChange={(e) => setNewStockSymbol(e.target.value)}
                  className="pl-10 bg-white/10 border-cyber-blue/30 text-white placeholder-white/50"
                />
              </div>

              {/* Popular Stocks */}
              <div>
                <p className="text-sm text-white/70 mb-2">Popular Stocks:</p>
                <div className="flex flex-wrap gap-2">
                  {popularStocks.map((symbol) => (
                    <Button
                      key={symbol}
                      size="sm"
                      variant="outline"
                      onClick={() => handleAddStock(symbol)}
                      disabled={watchlist.some(
                        (item) => item.symbol === symbol,
                      )}
                      className="border-cyber-blue/30 text-cyber-blue hover:bg-cyber-blue/10 disabled:opacity-50"
                    >
                      {symbol}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Search Suggestions */}
              {newStockSymbol && suggestionStocks.length > 0 && (
                <div className="border border-cyber-blue/20 rounded-lg bg-white/5">
                  <p className="text-sm text-white/70 p-3 border-b border-cyber-blue/10">
                    Suggestions:
                  </p>
                  {suggestionStocks.map((stock) => (
                    <button
                      key={stock.symbol}
                      onClick={() => handleAddStock(stock.symbol)}
                      disabled={watchlist.some(
                        (item) => item.symbol === stock.symbol,
                      )}
                      className="w-full p-3 text-left hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed transition-colors border-b border-cyber-blue/5 last:border-b-0"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-white font-medium">
                            {stock.symbol}
                          </div>
                          <div className="text-sm text-white/60 truncate">
                            {stock.name}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-white font-medium">
                            ${stock.price.toFixed(2)}
                          </div>
                          <div
                            className={cn(
                              "text-sm font-medium",
                              stock.changePercent >= 0
                                ? "text-cyber-green"
                                : "text-cyber-red",
                            )}
                          >
                            {stock.changePercent >= 0 ? "+" : ""}
                            {stock.changePercent.toFixed(2)}%
                          </div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Filters */}
      <div className="mb-6">
        <div className="flex items-center space-x-2 mb-4">
          <Button
            size="sm"
            variant={activeFilter === "all" ? "default" : "outline"}
            onClick={() => setActiveFilter("all")}
            className={cn(
              "transition-all duration-200",
              activeFilter === "all"
                ? "bg-cyber-blue text-white"
                : "border-cyber-blue/30 text-cyber-blue hover:bg-cyber-blue/10",
            )}
          >
            All
            <Badge className="ml-2 bg-white/20 text-white text-xs">
              {filterCounts.all}
            </Badge>
          </Button>
          <Button
            size="sm"
            variant={activeFilter === "starred" ? "default" : "outline"}
            onClick={() => setActiveFilter("starred")}
            className={cn(
              "transition-all duration-200",
              activeFilter === "starred"
                ? "bg-cyber-yellow text-white"
                : "border-cyber-yellow/30 text-cyber-yellow hover:bg-cyber-yellow/10",
            )}
          >
            <Star className="h-3 w-3 mr-1" />
            Starred
            <Badge className="ml-2 bg-white/20 text-white text-xs">
              {filterCounts.starred}
            </Badge>
          </Button>
          <Button
            size="sm"
            variant={activeFilter === "gainers" ? "default" : "outline"}
            onClick={() => setActiveFilter("gainers")}
            className={cn(
              "transition-all duration-200",
              activeFilter === "gainers"
                ? "bg-cyber-green text-white"
                : "border-cyber-green/30 text-cyber-green hover:bg-cyber-green/10",
            )}
          >
            <TrendingUp className="h-3 w-3 mr-1" />
            Gainers
            <Badge className="ml-2 bg-white/20 text-white text-xs">
              {filterCounts.gainers}
            </Badge>
          </Button>
          <Button
            size="sm"
            variant={activeFilter === "losers" ? "default" : "outline"}
            onClick={() => setActiveFilter("losers")}
            className={cn(
              "transition-all duration-200",
              activeFilter === "losers"
                ? "bg-cyber-red text-white"
                : "border-cyber-red/30 text-cyber-red hover:bg-cyber-red/10",
            )}
          >
            <TrendingDown className="h-3 w-3 mr-1" />
            Losers
            <Badge className="ml-2 bg-white/20 text-white text-xs">
              {filterCounts.losers}
            </Badge>
          </Button>
          <Button
            size="sm"
            variant={activeFilter === "alerts" ? "default" : "outline"}
            onClick={() => setActiveFilter("alerts")}
            className={cn(
              "transition-all duration-200",
              activeFilter === "alerts"
                ? "bg-cyber-purple text-white"
                : "border-cyber-purple/30 text-cyber-purple hover:bg-cyber-purple/10",
            )}
          >
            <Bell className="h-3 w-3 mr-1" />
            Alerts
            <Badge className="ml-2 bg-white/20 text-white text-xs">
              {filterCounts.alerts}
            </Badge>
          </Button>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/50" />
          <Input
            placeholder="Search watchlist..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-white/10 border-cyber-blue/30 text-white placeholder-white/50"
          />
        </div>
      </div>

      {/* Watchlist Items */}
      <div className="space-y-3">
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center justify-center py-8"
          >
            <div className="animate-spin rounded-full h-8 w-8 border-2 border-cyber-blue border-t-transparent"></div>
            <span className="ml-3 text-white/60">Adding stock...</span>
          </motion.div>
        )}

        {filteredWatchlist.length === 0 && !isLoading ? (
          <div className="text-center py-8 text-white/60">
            <Eye className="h-12 w-12 mx-auto mb-3 opacity-50" />
            <p>No stocks in watchlist</p>
            <p className="text-sm">Add some stocks to start tracking</p>
          </div>
        ) : (
          filteredWatchlist.map((item, index) => {
            const isPositive = item.changePercent >= 0;
            const proximity = getProximityToDayRange(item);

            return (
              <motion.div
                key={item.symbol}
                variants={staggerItem}
                initial="hidden"
                animate="visible"
                transition={{ delay: index * 0.1 }}
                className="p-4 bg-white/5 border border-cyber-blue/10 rounded-xl hover:bg-white/10 hover:border-cyber-blue/20 transition-all duration-200 group"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 flex-1">
                    <div className="relative">
                      <CompanyLogo
                        symbol={item.symbol}
                        companyName={item.name}
                        size="md"
                        className="group-hover:shadow-lg group-hover:shadow-cyber-blue/25 transition-all duration-300"
                      />

                      {/* Sector indicator */}
                      <div className="absolute -top-1 -right-1 w-4 h-4 bg-cyber-green rounded-full flex items-center justify-center text-xs">
                        {item.sector === "technology"
                          ? "💻"
                          : item.sector === "finance"
                            ? "💰"
                            : item.sector === "healthcare"
                              ? "🏥"
                              : item.sector === "consumer"
                                ? "🛍️"
                                : item.sector === "energy"
                                  ? "⚡"
                                  : "🏢"}
                      </div>
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h4 className="font-semibold text-white text-lg">
                          {item.symbol}
                        </h4>

                        {proximity && (
                          <Badge
                            className={cn(
                              "text-xs",
                              proximity.type === "high"
                                ? "bg-cyber-red/20 text-cyber-red border-cyber-red/30"
                                : "bg-cyber-green/20 text-cyber-green border-cyber-green/30",
                            )}
                          >
                            {proximity.label}
                          </Badge>
                        )}

                        {item.hasAlert && (
                          <Badge className="bg-cyber-purple/20 text-cyber-purple border-cyber-purple/30 text-xs">
                            <Bell className="h-3 w-3 mr-1" />
                            Alert: ${item.alertPrice?.toFixed(2)}
                          </Badge>
                        )}
                      </div>

                      <p className="text-sm text-white/70 mb-2 truncate max-w-[200px]">
                        {item.name}
                      </p>

                      <div className="grid grid-cols-2 gap-4 text-xs text-cyber-blue/60">
                        <div>
                          <span className="block">
                            Vol: {(item.volume / 1000000).toFixed(1)}M
                          </span>
                          <span className="block">
                            Beta: {item.beta.toFixed(1)}
                          </span>
                        </div>
                        <div>
                          <span className="block">
                            High: ${item.dayHigh?.toFixed(2) || "N/A"}
                          </span>
                          <span className="block">
                            Low: ${item.dayLow?.toFixed(2) || "N/A"}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      <p className="font-bold text-white text-xl mb-1">
                        ${item.price.toFixed(2)}
                      </p>
                      <div
                        className={cn(
                          "flex items-center justify-end space-x-1 text-sm font-medium mb-1",
                          isPositive ? "text-cyber-green" : "text-cyber-red",
                        )}
                      >
                        {isPositive ? (
                          <ArrowUpRight className="h-3 w-3" />
                        ) : (
                          <ArrowDownRight className="h-3 w-3" />
                        )}
                        <span>
                          {isPositive ? "+" : ""}
                          {item.change.toFixed(2)} (
                          {item.changePercent.toFixed(2)}%)
                        </span>
                      </div>
                      <div className="text-xs text-white/50">
                        Prev: ${item.previousClose?.toFixed(2) || "N/A"}
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity ml-4">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleToggleStar(item.symbol)}
                      className={cn(
                        "p-2",
                        item.isStarred
                          ? "text-cyber-yellow"
                          : "text-white/70 hover:text-cyber-yellow",
                      )}
                      title="Toggle Star"
                    >
                      <Star
                        className={cn(
                          "h-4 w-4",
                          item.isStarred && "fill-current",
                        )}
                      />
                    </Button>

                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() =>
                        handleSetAlert(item.symbol, item.price * 1.05)
                      }
                      className="text-cyber-purple hover:text-cyber-purple-light p-2"
                      title="Price Alerts"
                    >
                      <Bell className="h-4 w-4" />
                    </Button>

                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-cyber-blue hover:text-cyber-blue-light p-2"
                      title="Chart View"
                    >
                      <BarChart3 className="h-4 w-4" />
                    </Button>

                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-cyber-green hover:text-cyber-green-light p-2"
                      title="Add Position"
                    >
                      <Target className="h-4 w-4" />
                    </Button>

                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleRemoveStock(item.symbol)}
                      className="text-cyber-red hover:text-cyber-red-dark p-2"
                      title="Remove"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            );
          })
        )}
      </div>
    </Card>
  );
};

export default WatchlistManager;
