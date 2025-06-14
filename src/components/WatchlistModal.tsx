import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Star,
  X,
  TrendingUp,
  TrendingDown,
  Search,
  Plus,
  Trash2,
  Eye,
  BarChart3,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { TOP_50_COMPANIES, RealCompany } from "@/lib/companies-data";

interface WatchlistItem extends RealCompany {
  addedAt: Date;
  alertsCount: number;
}

interface WatchlistModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedSymbol?: string;
}

const WatchlistModal = ({
  isOpen,
  onClose,
  selectedSymbol,
}: WatchlistModalProps) => {
  const [watchlist, setWatchlist] = useState<WatchlistItem[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);

  // Initialize with some default watchlist items
  useEffect(() => {
    const defaultWatchlist: WatchlistItem[] = [
      {
        ...TOP_50_COMPANIES.find((c) => c.symbol === "AAPL")!,
        addedAt: new Date(),
        alertsCount: 2,
      },
      {
        ...TOP_50_COMPANIES.find((c) => c.symbol === "TSLA")!,
        addedAt: new Date(),
        alertsCount: 1,
      },
      {
        ...TOP_50_COMPANIES.find((c) => c.symbol === "MSFT")!,
        addedAt: new Date(),
        alertsCount: 0,
      },
      {
        ...TOP_50_COMPANIES.find((c) => c.symbol === "NVDA")!,
        addedAt: new Date(),
        alertsCount: 3,
      },
    ];
    setWatchlist(defaultWatchlist);
  }, []);

  const filteredCompanies = TOP_50_COMPANIES.filter(
    (company) =>
      !watchlist.find((w) => w.symbol === company.symbol) &&
      (company.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
        company.name.toLowerCase().includes(searchTerm.toLowerCase())),
  );

  const handleAddToWatchlist = (company: RealCompany) => {
    const newItem: WatchlistItem = {
      ...company,
      addedAt: new Date(),
      alertsCount: 0,
    };
    setWatchlist((prev) => [newItem, ...prev]);
    setSearchTerm("");
  };

  const handleRemoveFromWatchlist = (symbol: string) => {
    setWatchlist((prev) => prev.filter((item) => item.symbol !== symbol));
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(price);
  };

  const formatMarketCap = (marketCap: string) => {
    return marketCap;
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          className="w-full max-w-5xl max-h-[90vh] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          <Card className="bg-cyber-dark/95 backdrop-blur-md border-cyber-blue/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-cyber-green/20 rounded-lg">
                  <Star className="h-5 w-5 text-cyber-green" />
                </div>
                <div>
                  <CardTitle className="text-xl text-white">
                    My Watchlist
                  </CardTitle>
                  <p className="text-white/60 text-sm">
                    Track your favorite stocks and monitor performance
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowAddForm(!showAddForm)}
                  className="border-cyber-green/30 text-cyber-green hover:bg-cyber-green/10"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Stock
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onClose}
                  className="text-white/70 hover:text-white hover:bg-white/10"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </CardHeader>

            <CardContent className="space-y-4 max-h-[60vh] overflow-y-auto">
              {/* Add Stock Form */}
              <AnimatePresence>
                {showAddForm && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <Card className="bg-cyber-black/50 border-cyber-green/30">
                      <CardContent className="p-4">
                        <div className="relative mb-4">
                          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/40" />
                          <Input
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Search stocks by symbol or name..."
                            className="pl-10 bg-cyber-dark border-cyber-green/30 text-white focus:border-cyber-green"
                          />
                        </div>

                        {searchTerm && (
                          <div className="max-h-48 overflow-y-auto space-y-2">
                            {filteredCompanies.slice(0, 10).map((company) => (
                              <motion.div
                                key={company.symbol}
                                whileHover={{ scale: 1.02 }}
                                className="flex items-center justify-between p-3 bg-cyber-dark/50 rounded-lg border border-cyber-green/20 hover:border-cyber-green/40 transition-colors cursor-pointer"
                                onClick={() => handleAddToWatchlist(company)}
                              >
                                <div className="flex items-center space-x-3">
                                  <div className="w-10 h-10 bg-cyber-green/20 rounded-lg flex items-center justify-center">
                                    <span className="text-cyber-green font-semibold text-sm">
                                      {company.symbol.substring(0, 2)}
                                    </span>
                                  </div>
                                  <div>
                                    <h4 className="text-white font-medium">
                                      {company.symbol}
                                    </h4>
                                    <p className="text-white/60 text-sm">
                                      {company.name}
                                    </p>
                                  </div>
                                </div>
                                <div className="text-right">
                                  <p className="text-white font-medium">
                                    {formatPrice(company.price)}
                                  </p>
                                  <p
                                    className={cn(
                                      "text-sm",
                                      company.changePercent >= 0
                                        ? "text-cyber-green"
                                        : "text-cyber-red",
                                    )}
                                  >
                                    {company.changePercent >= 0 ? "+" : ""}
                                    {company.changePercent.toFixed(2)}%
                                  </p>
                                </div>
                              </motion.div>
                            ))}
                            {filteredCompanies.length === 0 && searchTerm && (
                              <p className="text-white/60 text-center py-4">
                                No stocks found matching "{searchTerm}"
                              </p>
                            )}
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Watchlist Header */}
              <div className="flex items-center justify-between">
                <h3 className="text-cyber-green font-medium flex items-center">
                  ⭐ MY WATCHLIST
                  <Badge
                    variant="secondary"
                    className="ml-2 bg-cyber-green/20 text-cyber-green"
                  >
                    {watchlist.length}
                  </Badge>
                </h3>
              </div>

              {/* Watchlist Items */}
              <div className="space-y-3">
                {watchlist.map((item) => (
                  <motion.div
                    key={item.symbol}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                  >
                    <Card className="bg-cyber-dark/50 border-cyber-green/20 hover:border-cyber-green/40 transition-colors">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4 flex-1">
                            <div className="w-12 h-12 bg-cyber-green/20 rounded-lg flex items-center justify-center">
                              <span className="text-cyber-green font-bold">
                                {item.symbol.substring(0, 2)}
                              </span>
                            </div>

                            <div className="flex-1 min-w-0">
                              <div className="flex items-center space-x-2 mb-1">
                                <h4 className="font-semibold text-white text-lg">
                                  {item.symbol}
                                </h4>
                                <Badge
                                  variant="outline"
                                  className="text-xs border-cyber-blue/30 text-cyber-blue"
                                >
                                  {item.sector}
                                </Badge>
                                {item.alertsCount > 0 && (
                                  <Badge className="bg-cyber-purple/20 text-cyber-purple text-xs">
                                    {item.alertsCount} alerts
                                  </Badge>
                                )}
                              </div>
                              <p className="text-white/60 text-sm mb-2">
                                {item.name}
                              </p>

                              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                                <div>
                                  <p className="text-white/60">Price</p>
                                  <p className="text-white font-medium">
                                    {formatPrice(item.price)}
                                  </p>
                                </div>
                                <div>
                                  <p className="text-white/60">Change</p>
                                  <div className="flex items-center space-x-1">
                                    {item.changePercent >= 0 ? (
                                      <TrendingUp className="h-3 w-3 text-cyber-green" />
                                    ) : (
                                      <TrendingDown className="h-3 w-3 text-cyber-red" />
                                    )}
                                    <span
                                      className={cn(
                                        "font-medium",
                                        item.changePercent >= 0
                                          ? "text-cyber-green"
                                          : "text-cyber-red",
                                      )}
                                    >
                                      {item.changePercent >= 0 ? "+" : ""}
                                      {item.changePercent.toFixed(2)}%
                                    </span>
                                  </div>
                                </div>
                                <div>
                                  <p className="text-white/60">Market Cap</p>
                                  <p className="text-white font-medium">
                                    {formatMarketCap(item.marketCap)}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="flex flex-col space-y-2 ml-4">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-cyber-blue hover:text-cyber-blue/80 hover:bg-cyber-blue/10"
                            >
                              <BarChart3 className="h-4 w-4 mr-2" />
                              View Chart
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() =>
                                handleRemoveFromWatchlist(item.symbol)
                              }
                              className="text-cyber-red hover:text-cyber-red/80 hover:bg-cyber-red/10"
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              Remove
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>

              {watchlist.length === 0 && (
                <div className="text-center py-8">
                  <Star className="h-12 w-12 text-white/20 mx-auto mb-4" />
                  <p className="text-white/60">Your watchlist is empty</p>
                  <p className="text-white/40 text-sm">
                    Add stocks to track their performance
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default WatchlistModal;
