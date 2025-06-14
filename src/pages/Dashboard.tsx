import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import StockChart from "@/components/StockChart";
import IndicesDashboard from "@/components/IndicesDashboard";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { finnhubAPI, formatChartData, generateDateRange } from "@/lib/api";
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  BarChart3,
  Activity,
  Target,
  Eye,
  Plus,
  MoreHorizontal,
  RefreshCw,
} from "lucide-react";
import { cn } from "@/lib/utils";

const Dashboard = () => {
  const [selectedStock, setSelectedStock] = useState("AAPL");
  const [timeframe, setTimeframe] = useState("1M");
  const [chartData, setChartData] = useState<any[]>([]);
  const [isLoadingChart, setIsLoadingChart] = useState(false);
  const [stockQuote, setStockQuote] = useState<any>(null);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  // Mock data for demonstration (replace with real portfolio data)
  const portfolioValue = 125847.32;
  const dailyChange = 2847.18;
  const dailyChangePercent = 2.31;

  const watchlist = [
    {
      symbol: "AAPL",
      name: "Apple Inc.",
      price: 175.43,
      change: 2.14,
      changePercent: 1.23,
    },
    {
      symbol: "TSLA",
      name: "Tesla, Inc.",
      price: 242.68,
      change: -1.23,
      changePercent: -0.5,
    },
    {
      symbol: "GOOGL",
      name: "Alphabet Inc.",
      price: 138.21,
      change: 0.87,
      changePercent: 0.63,
    },
    {
      symbol: "MSFT",
      name: "Microsoft Corp.",
      price: 378.85,
      change: 1.45,
      changePercent: 0.38,
    },
    {
      symbol: "NVDA",
      name: "NVIDIA Corp.",
      price: 721.33,
      change: 15.43,
      changePercent: 2.18,
    },
  ];

  const positions = [
    {
      symbol: "AAPL",
      shares: 50,
      avgPrice: 165.2,
      currentPrice: 175.43,
      value: 8771.5,
    },
    {
      symbol: "TSLA",
      shares: 25,
      avgPrice: 225.8,
      currentPrice: 242.68,
      value: 6067.0,
    },
    {
      symbol: "GOOGL",
      shares: 75,
      avgPrice: 130.45,
      currentPrice: 138.21,
      value: 10365.75,
    },
    {
      symbol: "MSFT",
      shares: 40,
      avgPrice: 370.1,
      currentPrice: 378.85,
      value: 15154.0,
    },
  ];

  const alerts = [
    {
      symbol: "AAPL",
      type: "target",
      message: "Price target of $180 reached",
      time: "2 min ago",
    },
    {
      symbol: "TSLA",
      type: "support",
      message: "Support level broken at $240",
      time: "15 min ago",
    },
    {
      symbol: "NVDA",
      type: "volume",
      message: "Unusual volume detected",
      time: "1 hour ago",
    },
  ];

  // Fetch real stock data
  const fetchStockData = async (symbol: string) => {
    setIsLoadingChart(true);
    try {
      const { from, to } = generateDateRange(30); // Last 30 days
      const [candles, quote] = await Promise.all([
        finnhubAPI.getCandles(symbol, "D", from, to),
        finnhubAPI.getQuote(symbol),
      ]);

      const formattedData = formatChartData(candles);
      if (formattedData.length > 0) {
        setChartData(formattedData);
        setStockQuote(quote);
      } else {
        throw new Error("No data available");
      }
    } catch (error) {
      console.error("Error fetching stock data:", error);
      // Fallback to mock data with better stock prices
      const stockPrices = {
        AAPL: 175,
        GOOGL: 138,
        MSFT: 379,
        TSLA: 243,
        NVDA: 721,
        AMZN: 145,
      };

      const basePrice = stockPrices[symbol as keyof typeof stockPrices] || 150;
      const mockData = [];

      for (let i = 30; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        const volatility = 0.02;
        const trend = (Math.random() - 0.5) * volatility;
        const price = basePrice * (1 + trend * (i / 30));
        mockData.push({
          date: date.toLocaleDateString(),
          price: parseFloat(price.toFixed(2)),
          predicted: false,
        });
      }
      setChartData(mockData);

      // Mock quote data
      const lastPrice = mockData[mockData.length - 1].price;
      const change = (Math.random() - 0.5) * 5;
      setStockQuote({
        c: lastPrice,
        d: change,
        dp: (change / lastPrice) * 100,
        h: lastPrice * 1.02,
        l: lastPrice * 0.98,
        o: lastPrice * 0.995,
        pc: lastPrice - change,
        t: Date.now() / 1000,
      });
    } finally {
      setIsLoadingChart(false);
    }
  };

  useEffect(() => {
    fetchStockData(selectedStock);
  }, [selectedStock]);

  return (
    <div className="min-h-screen bg-cyber-black cyber-grid">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-apple-gray-700 mb-2">
            Dashboard
          </h1>
          <p className="text-apple-gray-500">
            Track your portfolio and monitor market movements
          </p>
        </motion.div>

        {/* Portfolio Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="p-6 bg-white/90 apple-blur border border-apple-gray-200/50 shadow-apple">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-apple-blue/10 rounded-xl">
                  <DollarSign className="h-6 w-6 text-apple-blue" />
                </div>
                <Button variant="ghost" size="sm">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-apple-gray-500">Portfolio Value</p>
                <p className="text-2xl font-bold text-apple-gray-700">
                  ${portfolioValue.toLocaleString()}
                </p>
                <div
                  className={cn(
                    "flex items-center space-x-1 text-sm font-medium",
                    dailyChange >= 0 ? "text-apple-green" : "text-apple-red",
                  )}
                >
                  {dailyChange >= 0 ? (
                    <TrendingUp className="h-4 w-4" />
                  ) : (
                    <TrendingDown className="h-4 w-4" />
                  )}
                  <span>
                    {dailyChange >= 0 ? "+" : ""}$
                    {Math.abs(dailyChange).toFixed(2)} ({dailyChangePercent}%)
                  </span>
                </div>
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="p-6 bg-white/90 apple-blur border border-apple-gray-200/50 shadow-apple">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-apple-green/10 rounded-xl">
                  <Target className="h-6 w-6 text-apple-green" />
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-apple-gray-500">Active Positions</p>
                <p className="text-2xl font-bold text-apple-gray-700">
                  {positions.length}
                </p>
                <p className="text-sm text-apple-gray-500">
                  Total: $
                  {positions
                    .reduce((sum, pos) => sum + pos.value, 0)
                    .toLocaleString()}
                </p>
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="p-6 bg-white/90 apple-blur border border-apple-gray-200/50 shadow-apple">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-apple-purple/10 rounded-xl">
                  <Eye className="h-6 w-6 text-apple-purple" />
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-apple-gray-500">Watchlist</p>
                <p className="text-2xl font-bold text-apple-gray-700">
                  {watchlist.length}
                </p>
                <p className="text-sm text-apple-gray-500">Securities</p>
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="p-6 bg-white/90 apple-blur border border-apple-gray-200/50 shadow-apple">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-apple-red/10 rounded-xl">
                  <Activity className="h-6 w-6 text-apple-red" />
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-apple-gray-500">Alerts</p>
                <p className="text-2xl font-bold text-apple-gray-700">
                  {alerts.length}
                </p>
                <p className="text-sm text-apple-gray-500">Active</p>
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Indices Dashboard */}
        <IndicesDashboard />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          {/* Main Chart */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <StockChart
                symbol={selectedStock}
                data={chartData}
                showPredictions={false}
                className="mb-6"
              />
            </motion.div>

            {/* Positions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <Card className="p-6 bg-white/90 apple-blur border border-apple-gray-200/50 shadow-apple">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-apple-gray-700">
                    Your Positions
                  </h3>
                  <Button
                    size="sm"
                    className="bg-apple-blue hover:bg-apple-blue-dark text-white"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Position
                  </Button>
                </div>

                <div className="space-y-4">
                  {positions.map((position, index) => {
                    const gain =
                      (position.currentPrice - position.avgPrice) *
                      position.shares;
                    const gainPercent =
                      ((position.currentPrice - position.avgPrice) /
                        position.avgPrice) *
                      100;
                    const isPositive = gain >= 0;

                    return (
                      <motion.div
                        key={position.symbol}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.7 + index * 0.1 }}
                        className="flex items-center justify-between p-4 bg-apple-gray-50 rounded-2xl hover:bg-apple-gray-100 transition-colors duration-200 cursor-pointer"
                        onClick={() => setSelectedStock(position.symbol)}
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 bg-gradient-to-br from-apple-blue to-apple-purple rounded-xl flex items-center justify-center">
                            <span className="text-white font-bold text-sm">
                              {position.symbol.charAt(0)}
                            </span>
                          </div>
                          <div>
                            <p className="font-semibold text-apple-gray-700">
                              {position.symbol}
                            </p>
                            <p className="text-sm text-apple-gray-500">
                              {position.shares} shares @ ${position.avgPrice}
                            </p>
                          </div>
                        </div>

                        <div className="text-right">
                          <p className="font-semibold text-apple-gray-700">
                            ${position.value.toLocaleString()}
                          </p>
                          <p
                            className={cn(
                              "text-sm font-medium",
                              isPositive
                                ? "text-apple-green"
                                : "text-apple-red",
                            )}
                          >
                            {isPositive ? "+" : ""}${Math.abs(gain).toFixed(2)}{" "}
                            ({gainPercent.toFixed(2)}%)
                          </p>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </Card>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Watchlist */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 }}
            >
              <Card className="p-6 bg-white/90 apple-blur border border-apple-gray-200/50 shadow-apple">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-apple-gray-700">
                    Watchlist
                  </h3>
                  <Button size="sm" variant="outline">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>

                <div className="space-y-3">
                  {watchlist.map((stock, index) => {
                    const isPositive = stock.change >= 0;

                    return (
                      <motion.div
                        key={stock.symbol}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.8 + index * 0.05 }}
                        className={cn(
                          "flex items-center justify-between p-3 rounded-xl hover:bg-apple-gray-50 transition-colors duration-200 cursor-pointer",
                          selectedStock === stock.symbol &&
                            "bg-apple-blue/10 border border-apple-blue/20",
                        )}
                        onClick={() => setSelectedStock(stock.symbol)}
                      >
                        <div>
                          <p className="font-semibold text-apple-gray-700">
                            {stock.symbol}
                          </p>
                          <p className="text-sm text-apple-gray-500">
                            {stock.name}
                          </p>
                        </div>

                        <div className="text-right">
                          <p className="font-semibold text-apple-gray-700">
                            ${stock.price}
                          </p>
                          <p
                            className={cn(
                              "text-sm font-medium",
                              isPositive
                                ? "text-apple-green"
                                : "text-apple-red",
                            )}
                          >
                            {isPositive ? "+" : ""}
                            {stock.changePercent}%
                          </p>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </Card>
            </motion.div>

            {/* Alerts */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 }}
            >
              <Card className="p-6 bg-white/90 apple-blur border border-apple-gray-200/50 shadow-apple">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-apple-gray-700">
                    Recent Alerts
                  </h3>
                  <Button size="sm" variant="outline">
                    View All
                  </Button>
                </div>

                <div className="space-y-4">
                  {alerts.map((alert, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.9 + index * 0.1 }}
                      className="flex items-start space-x-3 p-3 bg-apple-gray-50 rounded-xl"
                    >
                      <div className="w-2 h-2 bg-apple-blue rounded-full mt-2 flex-shrink-0" />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-apple-gray-700">
                          {alert.symbol}: {alert.message}
                        </p>
                        <p className="text-xs text-apple-gray-500 mt-1">
                          {alert.time}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
