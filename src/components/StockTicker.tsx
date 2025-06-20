import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { TrendingUp, TrendingDown } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { cn } from "@/lib/utils";

interface StockTickerItem {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
}

const StockTicker = () => {
  const { theme } = useTheme();
  const [stockData, setStockData] = useState<StockTickerItem[]>([]);

  // Real-time stock data simulation
  const initialStocks: StockTickerItem[] = [
    {
      symbol: "AAPL",
      name: "Apple Inc.",
      price: 175.43,
      change: 2.14,
      changePercent: 1.23,
    },
    {
      symbol: "TSLA",
      name: "Tesla Inc.",
      price: 242.68,
      change: -5.23,
      changePercent: -2.11,
    },
    {
      symbol: "GOOGL",
      name: "Alphabet Inc.",
      price: 138.21,
      change: 3.87,
      changePercent: 2.88,
    },
    {
      symbol: "MSFT",
      name: "Microsoft Corp.",
      price: 378.85,
      change: 1.45,
      changePercent: 0.38,
    },
    {
      symbol: "AMZN",
      name: "Amazon.com Inc.",
      price: 144.78,
      change: -2.65,
      changePercent: -1.8,
    },
    {
      symbol: "NVDA",
      name: "NVIDIA Corp.",
      price: 721.33,
      change: 15.43,
      changePercent: 2.19,
    },
    {
      symbol: "META",
      name: "Meta Platforms",
      price: 303.67,
      change: 4.21,
      changePercent: 1.41,
    },
    {
      symbol: "NFLX",
      name: "Netflix Inc.",
      price: 445.92,
      change: -8.18,
      changePercent: -1.8,
    },
    {
      symbol: "AMD",
      name: "AMD Inc.",
      price: 112.45,
      change: 2.76,
      changePercent: 2.52,
    },
    {
      symbol: "INTC",
      name: "Intel Corp.",
      price: 43.21,
      change: -0.87,
      changePercent: -1.97,
    },
    {
      symbol: "BABA",
      name: "Alibaba Group",
      price: 89.34,
      change: 1.92,
      changePercent: 2.2,
    },
    {
      symbol: "ORCL",
      name: "Oracle Corp.",
      price: 118.67,
      change: 0.45,
      changePercent: 0.38,
    },
    {
      symbol: "CRM",
      name: "Salesforce Inc.",
      price: 267.89,
      change: 3.21,
      changePercent: 1.21,
    },
    {
      symbol: "ADBE",
      name: "Adobe Inc.",
      price: 456.78,
      change: -2.34,
      changePercent: -0.51,
    },
    {
      symbol: "NOW",
      name: "ServiceNow Inc.",
      price: 689.12,
      change: 12.45,
      changePercent: 1.84,
    },
  ];

  useEffect(() => {
    setStockData(initialStocks);

    // Update prices every 3 seconds with random fluctuations
    const interval = setInterval(() => {
      setStockData((prevData) =>
        prevData.map((stock) => {
          const volatility = 0.005; // 0.5% max change per update
          const randomChange = (Math.random() - 0.5) * volatility * stock.price;
          const newPrice = Math.max(0.01, stock.price + randomChange);
          const change = newPrice - stock.price;
          const changePercent = (change / stock.price) * 100;

          return {
            ...stock,
            price: newPrice,
            change: change,
            changePercent: changePercent,
          };
        }),
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Duplicate the array for seamless looping
  const extendedStockData = [...stockData, ...stockData];

  return (
    <div
      className={`relative overflow-hidden backdrop-blur-md border-y ${
        theme === "dark"
          ? "bg-gradient-to-r from-cyber-dark/95 via-cyber-black/90 to-cyber-dark/95 border-cyber-blue/20"
          : "bg-white/90 border-gray-200"
      }`}
    >
      {/* Background Pattern - Only in dark mode */}
      {theme === "dark" && (
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-cyber-blue/20 to-transparent animate-pulse" />
          <div className="cyber-grid h-full w-full opacity-30" />
        </div>
      )}

      {/* Ticker Content */}
      <div className="relative z-10 py-4">
        <motion.div
          className="flex space-x-12 whitespace-nowrap"
          animate={{
            x: [0, -50 + "%"],
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 30,
              ease: "linear",
            },
          }}
        >
          {extendedStockData.map((stock, index) => {
            const isPositive = stock.change >= 0;

            return (
              <motion.div
                key={`${stock.symbol}-${index}`}
                className={`flex items-center space-x-3 px-6 py-2 backdrop-blur-sm rounded-2xl border transition-all duration-300 group ${
                  theme === "dark"
                    ? "bg-white/5 border-white/10 hover:border-cyber-blue/40"
                    : "bg-white/70 border-gray-200/50 hover:border-gray-300/60"
                }`}
                whileHover={{ scale: 1.05, y: -2 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                {/* Stock Symbol */}
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-cyber-blue to-cyber-purple rounded-lg flex items-center justify-center shadow-lg group-hover:shadow-cyber-blue/25 transition-all duration-300">
                    <span className="text-white font-bold text-xs">
                      {stock.symbol.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <span
                      className={`font-semibold text-sm ${
                        theme === "dark" ? "text-white" : "text-gray-900"
                      }`}
                    >
                      {stock.symbol}
                    </span>
                    <div
                      className={`text-xs truncate max-w-[100px] ${
                        theme === "dark" ? "text-white/60" : "text-gray-500"
                      }`}
                    >
                      {stock.name}
                    </div>
                  </div>
                </div>

                {/* Price */}
                <div className="text-right">
                  <motion.div
                    className={`font-bold text-lg ${
                      theme === "dark" ? "text-white" : "text-gray-900"
                    }`}
                    key={stock.price}
                    initial={{
                      scale: 1.1,
                      color: isPositive ? "#10B981" : "#EF4444",
                    }}
                    animate={{
                      scale: 1,
                      color: theme === "dark" ? "#ffffff" : "#111827",
                    }}
                    transition={{ duration: 0.5 }}
                  >
                    ${stock.price.toFixed(2)}
                  </motion.div>

                  {/* Change */}
                  <motion.div
                    className={cn(
                      "flex items-center justify-end space-x-1 text-xs font-medium",
                      isPositive ? "text-cyber-green" : "text-cyber-red",
                    )}
                    initial={{ scale: 1.2 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    {isPositive ? (
                      <TrendingUp className="h-3 w-3" />
                    ) : (
                      <TrendingDown className="h-3 w-3" />
                    )}
                    <span>
                      {isPositive ? "+" : ""}
                      {stock.change.toFixed(2)}
                    </span>
                    <span
                      className={
                        theme === "dark" ? "text-white/60" : "text-gray-500"
                      }
                    >
                      ({isPositive ? "+" : ""}
                      {stock.changePercent.toFixed(2)}%)
                    </span>
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* Gradient Overlays for seamless effect */}
      <div
        className={`absolute left-0 top-0 bottom-0 w-20 z-20 pointer-events-none ${
          theme === "dark"
            ? "bg-gradient-to-r from-cyber-dark to-transparent"
            : "bg-gradient-to-r from-white to-transparent"
        }`}
      />
      <div
        className={`absolute right-0 top-0 bottom-0 w-20 z-20 pointer-events-none ${
          theme === "dark"
            ? "bg-gradient-to-l from-cyber-dark to-transparent"
            : "bg-gradient-to-l from-white to-transparent"
        }`}
      />

      {/* Live Indicator */}
      <div
        className={`absolute top-1 right-6 flex items-center space-x-2 text-xs z-30 backdrop-blur-sm px-3 py-1 rounded-full border ${
          theme === "dark"
            ? "text-cyber-green bg-cyber-dark/80 border-cyber-green/20"
            : "text-green-600 bg-white/80 border-green-200"
        }`}
      >
        <div
          className={`w-2 h-2 rounded-full animate-pulse ${
            theme === "dark" ? "bg-cyber-green" : "bg-green-500"
          }`}
        />
        <span className="font-medium">LIVE MARKET DATA</span>
      </div>
    </div>
  );
};

export default StockTicker;
