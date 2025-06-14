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
} from "lucide-react";
import { cn } from "@/lib/utils";

interface WatchlistItem {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
  marketCap: string;
  isStarred: boolean;
  addedAt: Date;
}

interface WatchlistManagerProps {
  className?: string;
}

const WatchlistManager = ({ className }: WatchlistManagerProps) => {
  const [watchlist, setWatchlist] = useState<WatchlistItem[]>([]);
  const [showAddStock, setShowAddStock] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Mock watchlist data
  useEffect(() => {
    const mockWatchlist: WatchlistItem[] = [
      {
        symbol: "AAPL",
        name: "Apple Inc.",
        price: 175.43,
        change: 2.14,
        changePercent: 1.23,
        volume: 64582347,
        marketCap: "2.7T",
        isStarred: true,
        addedAt: new Date(Date.now() - 86400000),
      },
      {
        symbol: "GOOGL",
        name: "Alphabet Inc.",
        price: 138.21,
        change: -1.23,
        changePercent: -0.88,
        volume: 28394756,
        marketCap: "1.8T",
        isStarred: false,
        addedAt: new Date(Date.now() - 172800000),
      },
      {
        symbol: "TSLA",
        name: "Tesla, Inc.",
        price: 242.68,
        change: -3.45,
        changePercent: -1.4,
        volume: 89573829,
        marketCap: "782B",
        isStarred: true,
        addedAt: new Date(Date.now() - 259200000),
      },
      {
        symbol: "NVDA",
        name: "NVIDIA Corporation",
        price: 721.33,
        change: 15.43,
        changePercent: 2.18,
        volume: 45738294,
        marketCap: "1.8T",
        isStarred: false,
        addedAt: new Date(Date.now() - 345600000),
      },
      {
        symbol: "MSFT",
        name: "Microsoft Corporation",
        price: 378.85,
        change: 4.52,
        changePercent: 1.21,
        volume: 32847392,
        marketCap: "2.8T",
        isStarred: true,
        addedAt: new Date(Date.now() - 432000000),
      },
    ];
    setWatchlist(mockWatchlist);
  }, []);

  const handleAddStock = (symbol: string) => {
    const mockStock: WatchlistItem = {
      symbol: symbol.toUpperCase(),
      name: `${symbol.toUpperCase()} Corporation`,
      price: Math.random() * 500 + 50,
      change: (Math.random() - 0.5) * 10,
      changePercent: (Math.random() - 0.5) * 5,
      volume: Math.floor(Math.random() * 100000000),
      marketCap: `${Math.floor(Math.random() * 1000)}B`,
      isStarred: false,
      addedAt: new Date(),
    };

    setWatchlist((prev) => [mockStock, ...prev]);
    setSearchQuery("");
    setShowAddStock(false);
  };

  const handleRemoveStock = (symbol: string) => {
    setWatchlist((prev) => prev.filter((item) => item.symbol !== symbol));
  };

  const toggleStar = (symbol: string) => {
    setWatchlist((prev) =>
      prev.map((item) =>
        item.symbol === symbol ? { ...item, isStarred: !item.isStarred } : item,
      ),
    );
  };

  const filteredWatchlist = watchlist.filter((item) => {
    const matchesSearch =
      item.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.name.toLowerCase().includes(searchQuery.toLowerCase());

    if (selectedCategory === "starred") {
      return matchesSearch && item.isStarred;
    }
    if (selectedCategory === "gainers") {
      return matchesSearch && item.change > 0;
    }
    if (selectedCategory === "losers") {
      return matchesSearch && item.change < 0;
    }

    return matchesSearch;
  });

  const categories = [
    { id: "all", label: "All", count: watchlist.length },
    {
      id: "starred",
      label: "Starred",
      count: watchlist.filter((item) => item.isStarred).length,
    },
    {
      id: "gainers",
      label: "Gainers",
      count: watchlist.filter((item) => item.change > 0).length,
    },
    {
      id: "losers",
      label: "Losers",
      count: watchlist.filter((item) => item.change < 0).length,
    },
  ];

  return (
    <Card
      className={cn(
        "p-6 bg-white/10 backdrop-blur-md border border-cyber-purple/20 shadow-cyber",
        className,
      )}
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-cyber-purple/20 rounded-xl">
            <Eye className="h-5 w-5 text-cyber-purple" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Watchlist</h3>
            <p className="text-sm text-cyber-purple/70">
              {watchlist.length} stocks tracked
            </p>
          </div>
        </div>
        <Button
          size="sm"
          onClick={() => setShowAddStock(true)}
          className="bg-gradient-to-r from-cyber-purple to-cyber-blue hover:from-cyber-purple-dark hover:to-cyber-blue-dark text-white"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Stock
        </Button>
      </div>

      {/* Add Stock Form */}
      <AnimatePresence>
        {showAddStock && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-6 p-4 bg-white/5 border border-cyber-purple/20 rounded-xl"
          >
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-white font-semibold">Add to Watchlist</h4>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setShowAddStock(false)}
                className="text-white/70 hover:text-white"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex space-x-3">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/50" />
                <Input
                  placeholder="Enter stock symbol (e.g., AAPL, GOOGL)"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-white/10 border-cyber-purple/30 text-white placeholder-white/50"
                  onKeyPress={(e) => {
                    if (e.key === "Enter" && searchQuery.trim()) {
                      handleAddStock(searchQuery.trim());
                    }
                  }}
                />
              </div>
              <Button
                onClick={() =>
                  searchQuery.trim() && handleAddStock(searchQuery.trim())
                }
                disabled={!searchQuery.trim()}
                className="bg-cyber-purple hover:bg-cyber-purple-dark text-white"
              >
                Add
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Category Filters */}
      <div className="flex space-x-2 mb-6 overflow-x-auto">
        {categories.map((category) => (
          <Button
            key={category.id}
            variant={selectedCategory === category.id ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory(category.id)}
            className={cn(
              "flex-shrink-0 transition-all duration-200",
              selectedCategory === category.id
                ? "bg-cyber-purple text-white border-cyber-purple"
                : "bg-white/10 text-white/70 border-cyber-purple/30 hover:bg-white/20 hover:border-cyber-purple/50",
            )}
          >
            {category.label}
            {category.count > 0 && (
              <Badge
                variant="secondary"
                className="ml-2 bg-white/20 text-white text-xs"
              >
                {category.count}
              </Badge>
            )}
          </Button>
        ))}
      </div>

      {/* Search Bar */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/50" />
        <Input
          placeholder="Search watchlist..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 bg-white/5 border-cyber-blue/20 text-white placeholder-white/50"
        />
      </div>

      {/* Watchlist Items */}
      <div className="space-y-2">
        {filteredWatchlist.length === 0 ? (
          <div className="text-center py-8 text-white/60">
            <Eye className="h-12 w-12 mx-auto mb-3 opacity-50" />
            <p>No stocks in your watchlist</p>
            <p className="text-sm">Add stocks to track their performance</p>
          </div>
        ) : (
          <div className="space-y-2">
            {filteredWatchlist.map((item, index) => {
              const isPositive = item.change >= 0;

              return (
                <motion.div
                  key={item.symbol}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-center justify-between p-4 bg-white/5 border border-cyber-blue/10 rounded-xl hover:bg-white/10 hover:border-cyber-blue/20 transition-all duration-200 group"
                >
                  <div className="flex items-center space-x-4 flex-1">
                    {/* Star Button */}
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => toggleStar(item.symbol)}
                      className={cn(
                        "p-1 transition-colors",
                        item.isStarred
                          ? "text-cyber-yellow"
                          : "text-white/30 hover:text-cyber-yellow",
                      )}
                    >
                      <Star
                        className={cn(
                          "h-4 w-4",
                          item.isStarred && "fill-current",
                        )}
                      />
                    </Button>

                    {/* Stock Info */}
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="font-semibold text-white">
                          {item.symbol}
                        </span>
                        <Badge
                          variant="outline"
                          className="text-xs border-cyber-blue/30 text-cyber-blue"
                        >
                          {item.marketCap}
                        </Badge>
                      </div>
                      <p className="text-sm text-white/70 mb-1">{item.name}</p>
                      <p className="text-xs text-cyber-blue/60">
                        Vol: {(item.volume / 1000000).toFixed(1)}M
                      </p>
                    </div>

                    {/* Price Info */}
                    <div className="text-right">
                      <p className="font-semibold text-white text-lg">
                        ${item.price.toFixed(2)}
                      </p>
                      <div
                        className={cn(
                          "flex items-center space-x-1 text-sm font-medium",
                          isPositive ? "text-cyber-green" : "text-cyber-red",
                        )}
                      >
                        {isPositive ? (
                          <TrendingUp className="h-3 w-3" />
                        ) : (
                          <TrendingDown className="h-3 w-3" />
                        )}
                        <span>
                          {isPositive ? "+" : ""}
                          {item.change.toFixed(2)} (
                          {item.changePercent.toFixed(2)}%)
                        </span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-cyber-blue hover:text-cyber-blue-light p-2"
                        title="Set Price Alert"
                      >
                        <Bell className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-cyber-purple hover:text-cyber-purple-light p-2"
                        title="View Chart"
                      >
                        <BarChart3 className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleRemoveStock(item.symbol)}
                        className="text-cyber-red hover:text-cyber-red-dark p-2"
                        title="Remove from Watchlist"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="mt-6 p-4 bg-white/5 border border-cyber-blue/10 rounded-xl">
        <h4 className="text-sm font-semibold text-white mb-3">Quick Actions</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          <Button
            size="sm"
            variant="outline"
            className="bg-white/5 border-cyber-green/30 text-cyber-green hover:bg-cyber-green/10"
          >
            <TrendingUp className="h-4 w-4 mr-2" />
            Top Gainers
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="bg-white/5 border-cyber-red/30 text-cyber-red hover:bg-cyber-red/10"
          >
            <TrendingDown className="h-4 w-4 mr-2" />
            Top Losers
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="bg-white/5 border-cyber-blue/30 text-cyber-blue hover:bg-cyber-blue/10"
          >
            <BarChart3 className="h-4 w-4 mr-2" />
            Most Active
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="bg-white/5 border-cyber-purple/30 text-cyber-purple hover:bg-cyber-purple/10"
          >
            <Star className="h-4 w-4 mr-2" />
            Favorites
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default WatchlistManager;
