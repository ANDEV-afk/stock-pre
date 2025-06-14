import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, TrendingUp, TrendingDown, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface StockSuggestion {
  symbol: string;
  name: string;
  exchange: string;
  price?: number;
  change?: number;
}

interface StockSearchBarProps {
  onSearch: (symbol: string) => void;
  placeholder?: string;
  className?: string;
  isLoading?: boolean;
}

const StockSearchBar = ({
  onSearch,
  placeholder = "Search stocks (e.g., AAPL, TSLA, GOOGL)",
  className,
  isLoading = false,
}: StockSearchBarProps) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<StockSuggestion[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Popular stocks for suggestions
  const popularStocks: StockSuggestion[] = [
    {
      symbol: "AAPL",
      name: "Apple Inc.",
      exchange: "NASDAQ",
      price: 175.43,
      change: 2.14,
    },
    {
      symbol: "TSLA",
      name: "Tesla, Inc.",
      exchange: "NASDAQ",
      price: 242.68,
      change: -1.23,
    },
    {
      symbol: "GOOGL",
      name: "Alphabet Inc.",
      exchange: "NASDAQ",
      price: 138.21,
      change: 0.87,
    },
    {
      symbol: "MSFT",
      name: "Microsoft Corporation",
      exchange: "NASDAQ",
      price: 378.85,
      change: 1.45,
    },
    {
      symbol: "AMZN",
      name: "Amazon.com, Inc.",
      exchange: "NASDAQ",
      price: 144.78,
      change: -0.65,
    },
    {
      symbol: "NVDA",
      name: "NVIDIA Corporation",
      exchange: "NASDAQ",
      price: 721.33,
      change: 15.43,
    },
    {
      symbol: "META",
      name: "Meta Platforms, Inc.",
      exchange: "NASDAQ",
      price: 303.67,
      change: 4.21,
    },
    {
      symbol: "NFLX",
      name: "Netflix, Inc.",
      exchange: "NASDAQ",
      price: 445.92,
      change: -2.18,
    },
  ];

  // Filter suggestions based on query
  useEffect(() => {
    if (query.length === 0) {
      setSuggestions(popularStocks.slice(0, 6));
    } else {
      const filtered = popularStocks.filter(
        (stock) =>
          stock.symbol.toLowerCase().includes(query.toLowerCase()) ||
          stock.name.toLowerCase().includes(query.toLowerCase()),
      );
      setSuggestions(filtered.slice(0, 6));
    }
    setSelectedIndex(-1);
  }, [query]);

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev < suggestions.length - 1 ? prev + 1 : prev,
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
        break;
      case "Enter":
        e.preventDefault();
        if (selectedIndex >= 0) {
          handleSelectStock(suggestions[selectedIndex]);
        } else if (query.trim()) {
          handleSearch();
        }
        break;
      case "Escape":
        setIsOpen(false);
        inputRef.current?.blur();
        break;
    }
  };

  const handleSearch = () => {
    if (query.trim()) {
      onSearch(query.trim().toUpperCase());
      setIsOpen(false);
      setQuery("");
    }
  };

  const handleSelectStock = (stock: StockSuggestion) => {
    onSearch(stock.symbol);
    setQuery("");
    setIsOpen(false);
  };

  const clearSearch = () => {
    setQuery("");
    inputRef.current?.focus();
  };

  return (
    <div
      ref={containerRef}
      className={cn("relative w-full max-w-2xl", className)}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative"
      >
        {/* Search Input */}
        <motion.div
          className="relative"
          whileFocus={{ scale: 1.02 }}
        >
          <motion.div
            className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10"
            animate={{
              color: isOpen ? "#007aff" : "#6b7280",
              scale: isOpen ? 1.1 : 1
            }}
            transition={{ duration: 0.2 }}
          >
            <Search className="h-5 w-5" />
          </motion.div>

          <motion.input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsOpen(true)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            className="w-full h-16 pl-12 pr-16 bg-white text-black placeholder-gray-400 border-2 border-gray-200 rounded-2xl text-lg font-medium focus:outline-none focus:border-cyber-blue focus:ring-4 focus:ring-cyber-blue/20 shadow-lg hover:shadow-xl transition-all duration-300 backdrop-blur-sm"
            animate={{
              boxShadow: isOpen
                ? "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04), 0 0 20px rgba(0, 122, 255, 0.3)"
                : "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)"
            }}
            transition={{ duration: 0.3 }}
          />

          {/* Clear Button */}
          {query && (
            <motion.button
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              whileHover={{ scale: 1.1, backgroundColor: "#f3f4f6" }}
              whileTap={{ scale: 0.9 }}
              onClick={clearSearch}
              className="absolute right-16 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-all duration-200"
              transition={{ duration: 0.2 }}
            >
              <X className="h-4 w-4 text-gray-600" />
            </motion.button>
          )}

          {/* Search Button */}
          <motion.div
            className="absolute right-2 top-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              onClick={handleSearch}
              disabled={!query.trim() || isLoading}
              className="h-12 px-6 bg-gradient-to-r from-cyber-blue to-cyber-purple hover:from-cyber-blue-dark hover:to-cyber-purple-dark text-white rounded-xl shadow-lg hover:shadow-xl glow-blue transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <motion.div
                  className="h-5 w-5 border-2 border-white border-t-transparent rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
              ) : (
                <motion.div
                  whileHover={{ rotate: 15, scale: 1.1 }}
                  transition={{ duration: 0.2 }}
                >
                  <TrendingUp className="h-5 w-5" />
                </motion.div>
              )}
            </Button>
          </motion.div>
        </div>

        {/* Suggestions Dropdown */}
        <AnimatePresence>
          {isOpen && suggestions.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="absolute top-full left-0 right-0 mt-3 bg-white border-2 border-gray-200 rounded-2xl shadow-2xl backdrop-blur-xl overflow-hidden z-50"
              style={{
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 30px rgba(0, 122, 255, 0.15)"
              }}
            >
              {query.length === 0 && (
                <div className="px-6 py-4 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-gray-100">
                  <p className="text-sm font-semibold text-gray-700 flex items-center">
                    <TrendingUp className="h-4 w-4 mr-2 text-cyber-blue" />
                    Popular Stocks
                  </p>
                </div>
              )}

              <div className="max-h-80 overflow-y-auto">
                {suggestions.map((stock, index) => (
                  <motion.button
                    key={stock.symbol}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    whileHover={{
                      backgroundColor: "#f8fafc",
                      x: 4,
                      transition: { duration: 0.2 }
                    }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => handleSelectStock(stock)}
                    className={cn(
                      "w-full px-6 py-4 text-left transition-all duration-200 flex items-center justify-between border-l-4 border-transparent",
                      selectedIndex === index && "bg-blue-50 border-l-cyber-blue",
                    )}
                  >
                    <div className="flex-1">
                      <div className="flex items-center space-x-4">
                        <div className="flex-shrink-0">
                          <motion.div
                            className="w-12 h-12 bg-gradient-to-br from-cyber-blue to-cyber-purple rounded-xl flex items-center justify-center shadow-lg"
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            transition={{ duration: 0.2 }}
                          >
                            <span className="text-white font-bold text-sm">
                              {stock.symbol.charAt(0)}
                            </span>
                          </motion.div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-lg font-bold text-gray-900 truncate">
                            {stock.symbol}
                          </p>
                          <p className="text-sm text-gray-600 truncate">
                            {stock.name}
                          </p>
                        </div>
                      </div>
                    </div>

                    {stock.price && (
                      <div className="text-right">
                        <p className="text-lg font-bold text-gray-900">
                          ${stock.price.toFixed(2)}
                        </p>
                        {stock.change !== undefined && (
                          <motion.p
                            className={cn(
                              "text-sm font-semibold flex items-center justify-end",
                              stock.change >= 0
                                ? "text-cyber-green"
                                : "text-cyber-red",
                            )}
                            initial={{ scale: 0.8 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: index * 0.05 + 0.1 }}
                          >
                            {stock.change >= 0 ? (
                              <TrendingUp className="h-3 w-3 mr-1" />
                            ) : (
                              <TrendingDown className="h-3 w-3 mr-1" />
                            )}
                            {stock.change >= 0 ? "+" : ""}
                            {stock.change.toFixed(2)}
                          </motion.p>
                        )}
                      </div>
                    )}
                  </motion.button>
                ))}
              </div>

              {query &&
                !suggestions.some(
                  (s) => s.symbol.toLowerCase() === query.toLowerCase(),
                ) && (
                  <div className="px-6 py-4 border-t border-gray-100 bg-gradient-to-r from-gray-50 to-gray-100">
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button
                        onClick={handleSearch}
                        variant="ghost"
                        className="w-full justify-start text-cyber-blue hover:bg-cyber-blue/10 hover:text-cyber-blue-dark transition-all duration-200 rounded-xl py-3"
                      >
                        <Search className="h-4 w-4 mr-2" />
                        Search for "{query.toUpperCase()}"
                      </Button>
                    </motion.div>
                  </div>
                )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default StockSearchBar;