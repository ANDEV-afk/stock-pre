import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, TrendingUp, X } from "lucide-react";
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
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="relative"
      >
        {/* Search Input */}
        <div className="relative">
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10">
            <Search className="h-5 w-5 text-apple-gray-400" />
          </div>

          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsOpen(true)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            className="w-full h-14 pl-12 pr-12 bg-white apple-blur border border-apple-gray-200 rounded-2xl text-lg font-medium text-apple-gray-700 placeholder-apple-gray-400 focus:outline-none focus:ring-2 focus:ring-apple-blue focus:border-transparent shadow-apple hover:shadow-apple-lg transition-all duration-300"
          />

          {/* Clear Button */}
          {query && (
            <motion.button
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              onClick={clearSearch}
              className="absolute right-14 top-1/2 transform -translate-y-1/2 p-1 rounded-full hover:bg-apple-gray-100 transition-colors duration-200"
            >
              <X className="h-4 w-4 text-apple-gray-400" />
            </motion.button>
          )}

          {/* Search Button */}
          <Button
            onClick={handleSearch}
            disabled={!query.trim() || isLoading}
            className="absolute right-2 top-2 h-10 px-4 bg-apple-blue hover:bg-apple-blue-dark text-white rounded-xl shadow-apple transition-all duration-200"
          >
            {isLoading ? (
              <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
            ) : (
              <TrendingUp className="h-4 w-4" />
            )}
          </Button>
        </div>

        {/* Suggestions Dropdown */}
        <AnimatePresence>
          {isOpen && suggestions.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full left-0 right-0 mt-2 bg-white apple-blur border border-apple-gray-200 rounded-2xl shadow-apple-lg overflow-hidden z-50"
            >
              {query.length === 0 && (
                <div className="px-4 py-3 border-b border-apple-gray-100">
                  <p className="text-sm font-medium text-apple-gray-600">
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
                    transition={{ delay: index * 0.05 }}
                    onClick={() => handleSelectStock(stock)}
                    className={cn(
                      "w-full px-4 py-4 text-left hover:bg-apple-gray-50 transition-colors duration-200 flex items-center justify-between",
                      selectedIndex === index && "bg-apple-gray-50",
                    )}
                  >
                    <div className="flex-1">
                      <div className="flex items-center space-x-3">
                        <div className="flex-shrink-0">
                          <div className="w-10 h-10 bg-gradient-to-br from-apple-blue to-apple-purple rounded-xl flex items-center justify-center">
                            <span className="text-white font-bold text-sm">
                              {stock.symbol.charAt(0)}
                            </span>
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-lg font-semibold text-apple-gray-700 truncate">
                            {stock.symbol}
                          </p>
                          <p className="text-sm text-apple-gray-500 truncate">
                            {stock.name}
                          </p>
                        </div>
                      </div>
                    </div>

                    {stock.price && (
                      <div className="text-right">
                        <p className="text-lg font-semibold text-apple-gray-700">
                          ${stock.price.toFixed(2)}
                        </p>
                        {stock.change !== undefined && (
                          <p
                            className={cn(
                              "text-sm font-medium",
                              stock.change >= 0
                                ? "text-apple-green"
                                : "text-apple-red",
                            )}
                          >
                            {stock.change >= 0 ? "+" : ""}
                            {stock.change.toFixed(2)}
                          </p>
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
                  <div className="px-4 py-3 border-t border-apple-gray-100">
                    <Button
                      onClick={handleSearch}
                      variant="ghost"
                      className="w-full justify-start text-apple-blue hover:bg-apple-blue/5"
                    >
                      <Search className="h-4 w-4 mr-2" />
                      Search for "{query.toUpperCase()}"
                    </Button>
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
