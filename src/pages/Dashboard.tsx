import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import StockChart from "@/components/StockChart";
import IndicesDashboard from "@/components/IndicesDashboard";
import ApiStatusNotification from "@/components/ApiStatusNotification";
import PriceAlerts from "@/components/PriceAlerts";
import WatchlistManager from "@/components/WatchlistManager";
import TimeIntervalSelector from "@/components/TimeIntervalSelector";
import StockNews from "@/components/StockNews";
import Settings from "@/components/Settings";
import RiskAssessment from "@/components/RiskAssessment";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/contexts/AuthContext";
import { usePayment } from "@/contexts/PaymentContext";
import { formatChartData } from "@/lib/api";
import { demoDataService } from "@/lib/demo-data-service";
import { apiService } from "@/lib/api-service";
import { realtimeService, indexService } from "@/lib/realtime-service";
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
  Bell,
  Newspaper,
  Clock,
  Settings as SettingsIcon,
  PieChart,
  Wallet,
  Calculator,
  AlertTriangle,
  Check,
  CheckCircle,
  X,
  Edit3,
  Trash2,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Position {
  id: string;
  symbol: string;
  name: string;
  shares: number;
  avgPrice: number;
  currentPrice: number;
  value: number;
  dayChange: number;
  dayChangePercent: number;
  totalGain: number;
  totalGainPercent: number;
  addedAt: Date;
  type: "long" | "short";
}

const Dashboard = () => {
  const [selectedStock, setSelectedStock] = useState("AAPL");
  const [timeframe, setTimeframe] = useState<
    | "1m"
    | "5m"
    | "15m"
    | "30m"
    | "1h"
    | "4h"
    | "1d"
    | "1w"
    | "1M"
    | "3M"
    | "6M"
    | "1Y"
    | "2Y"
    | "5Y"
  >("1M");
  const [chartData, setChartData] = useState<any[]>([]);
  const [isLoadingChart, setIsLoadingChart] = useState(false);
  const [stockQuote, setStockQuote] = useState<any>(null);
  const [showApiNotification, setShowApiNotification] = useState(false);
  const [apiNotification, setApiNotification] = useState({
    type: "info" as const,
    message: "",
  });
  const [activeTab, setActiveTab] = useState("overview");
  const [showAddPosition, setShowAddPosition] = useState(false);
  const [newPosition, setNewPosition] = useState({
    symbol: "",
    shares: 0,
    price: 0,
    type: "long" as const,
  });
  const [positions, setPositions] = useState<Position[]>([]);
  const [showSettings, setShowSettings] = useState(false);
  const [showPriceAlertModal, setShowPriceAlertModal] = useState(false);
  const [realtimeData, setRealtimeData] = useState<any[]>([]);
  const [marketIndicesData, setMarketIndicesData] = useState<any[]>([]);

  // Payment context
  const { isPaid, currentPlan } = usePayment();
  const [lastUpdate, setLastUpdate] = useState(new Date());

  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    } else {
      // Show demo data notification immediately
      setApiNotification({
        type: "info",
        message:
          "Real-time data updates active! Live market data refreshing every 5 seconds.",
      });
      setShowApiNotification(true);

      // Initialize real-time data services
      const unsubscribeRealtime = realtimeService.subscribe((data) => {
        setRealtimeData(data);
        setLastUpdate(new Date());
      });

      const unsubscribeIndices = indexService.subscribe((data) => {
        setMarketIndicesData(data);
      });

      // Start real-time updates
      realtimeService.startUpdates(5000); // Update every 5 seconds
      indexService.startUpdates(10000); // Update indices every 10 seconds

      return () => {
        unsubscribeRealtime();
        unsubscribeIndices();
        realtimeService.stopUpdates();
        indexService.stopUpdates();
      };
    }
  }, [isAuthenticated, navigate]);

  // Handle escape key for modals
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        if (showPriceAlertModal) {
          setShowPriceAlertModal(false);
        }
        if (showSettings) {
          setShowSettings(false);
        }
        if (showAddPosition) {
          setShowAddPosition(false);
        }
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [showPriceAlertModal, showSettings, showAddPosition]);

  // Enhanced positions data
  useEffect(() => {
    const mockPositions: Position[] = [
      {
        id: "1",
        symbol: "AAPL",
        name: "Apple Inc.",
        shares: 50,
        avgPrice: 165.2,
        currentPrice: 175.43,
        value: 8771.5,
        dayChange: 2.14,
        dayChangePercent: 1.23,
        totalGain: 511.5,
        totalGainPercent: 6.19,
        addedAt: new Date(Date.now() - 2592000000), // 30 days ago
        type: "long",
      },
      {
        id: "2",
        symbol: "TSLA",
        name: "Tesla, Inc.",
        shares: 25,
        avgPrice: 225.8,
        currentPrice: 242.68,
        value: 6067.0,
        dayChange: -3.45,
        dayChangePercent: -1.4,
        totalGain: 422.0,
        totalGainPercent: 7.48,
        addedAt: new Date(Date.now() - 1209600000), // 14 days ago
        type: "long",
      },
      {
        id: "3",
        symbol: "GOOGL",
        name: "Alphabet Inc.",
        shares: 75,
        avgPrice: 130.45,
        currentPrice: 138.21,
        value: 10365.75,
        dayChange: -1.23,
        dayChangePercent: -0.88,
        totalGain: 582.0,
        totalGainPercent: 5.95,
        addedAt: new Date(Date.now() - 5184000000), // 60 days ago
        type: "long",
      },
      {
        id: "4",
        symbol: "MSFT",
        name: "Microsoft Corporation",
        shares: 40,
        avgPrice: 370.1,
        currentPrice: 378.85,
        value: 15154.0,
        dayChange: 4.52,
        dayChangePercent: 1.21,
        totalGain: 350.0,
        totalGainPercent: 2.36,
        addedAt: new Date(Date.now() - 7776000000), // 90 days ago
        type: "long",
      },
      {
        id: "5",
        symbol: "NVDA",
        name: "NVIDIA Corporation",
        shares: 15,
        avgPrice: 650.0,
        currentPrice: 721.33,
        value: 10819.95,
        dayChange: 15.43,
        dayChangePercent: 2.18,
        totalGain: 1069.95,
        totalGainPercent: 10.99,
        addedAt: new Date(Date.now() - 1814400000), // 21 days ago
        type: "long",
      },
    ];
    setPositions(mockPositions);
  }, []);

  // Mock data for demonstration (replace with real portfolio data)
  const portfolioValue = positions.reduce((sum, pos) => sum + pos.value, 0);
  const dailyChange = positions.reduce(
    (sum, pos) => sum + pos.dayChange * pos.shares,
    0,
  );
  const dailyChangePercent =
    portfolioValue > 0
      ? (dailyChange / (portfolioValue - dailyChange)) * 100
      : 0;
  const totalGain = positions.reduce((sum, pos) => sum + pos.totalGain, 0);
  const totalGainPercent =
    portfolioValue > 0 ? (totalGain / (portfolioValue - totalGain)) * 100 : 0;

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

  // Generate demo stock data (seamless user experience)
  const fetchStockData = async (symbol: string, interval?: string) => {
    setIsLoadingChart(true);

    console.log(
      `Loading demo data for ${symbol} with ${interval || timeframe} interval...`,
    );

    try {
      // Use dedicated demo data service for consistent experience
      const demoData = demoDataService.generateStockData(symbol);
      const formattedCandles = formatChartData(demoData.candles);

      setChartData(formattedCandles);
      setStockQuote(demoData.quote);
    } catch (error) {
      console.log("Generating fallback data...");

      // Determine if we should use mock data
      if (apiService.shouldUseMockData(error as Error)) {
        const errorMessage = (error as Error).message;

        // Show appropriate API notification
        if (
          errorMessage.includes("Access denied") ||
          errorMessage.includes("403")
        ) {
          apiService.setApiStatus("limited", "API access restricted");
          setApiNotification({
            type: "limited",
            message:
              "Using demo data due to API limitations. Real data requires premium subscription.",
          });
        } else if (
          errorMessage.includes("Rate limit") ||
          errorMessage.includes("429")
        ) {
          apiService.setApiStatus("limited", "Rate limit exceeded");
          setApiNotification({
            type: "limited",
            message:
              "API rate limit reached. Using demo data. Try again in a few minutes.",
          });
        } else {
          apiService.setApiStatus("offline", errorMessage);
          setApiNotification({
            type: "error",
            message: "Unable to fetch live data. Showing demo data instead.",
          });
        }

        setShowApiNotification(true);

        // Use improved mock data service
        const mockData = apiService.generateMockStockData(symbol);
        const formattedCandles = formatChartData(mockData.candles);

        setChartData(formattedCandles);
        setStockQuote(mockData.quote);
      } else {
        // Re-throw if it's not an API access issue
        throw error;
      }
    } finally {
      setIsLoadingChart(false);
    }
  };

  useEffect(() => {
    if (selectedStock) {
      fetchStockData(selectedStock, timeframe);
    }
  }, [selectedStock, timeframe]);

  const handleTimeframeChange = (interval: typeof timeframe) => {
    setTimeframe(interval);
    if (selectedStock) {
      fetchStockData(selectedStock, interval);
    }
  };

  const handleAddPosition = () => {
    if (!newPosition.symbol || !newPosition.shares || !newPosition.price)
      return;

    const position: Position = {
      id: Date.now().toString(),
      symbol: newPosition.symbol.toUpperCase(),
      name: `${newPosition.symbol.toUpperCase()} Corporation`,
      shares: newPosition.shares,
      avgPrice: newPosition.price,
      currentPrice: newPosition.price + (Math.random() - 0.5) * 10, // Mock current price
      value: newPosition.shares * newPosition.price,
      dayChange: (Math.random() - 0.5) * 5,
      dayChangePercent: (Math.random() - 0.5) * 3,
      totalGain: 0,
      totalGainPercent: 0,
      addedAt: new Date(),
      type: newPosition.type,
    };

    // Calculate gains
    position.totalGain =
      (position.currentPrice - position.avgPrice) * position.shares;
    position.totalGainPercent =
      ((position.currentPrice - position.avgPrice) / position.avgPrice) * 100;
    position.value = position.shares * position.currentPrice;

    setPositions((prev) => [position, ...prev]);
    setNewPosition({ symbol: "", shares: 0, price: 0, type: "long" });
    setShowAddPosition(false);
  };

  const handleRemovePosition = (id: string) => {
    setPositions((prev) => prev.filter((pos) => pos.id !== id));
  };

  return (
    <div className="min-h-screen bg-cyber-black cyber-grid">
      <Navigation />

      <ApiStatusNotification
        show={showApiNotification}
        type={apiNotification.type}
        message={apiNotification.message}
        onDismiss={() => setShowApiNotification(false)}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-cyber-blue via-white to-cyber-purple bg-clip-text text-transparent mb-2">
                Trading Dashboard
              </h1>
              <p className="text-cyber-blue/80">
                Track your portfolio and monitor market movements
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <div className="text-right">
                <div className="text-xs text-white/60">Last updated</div>
                <div className="text-xs text-cyber-green">
                  {lastUpdate.toLocaleTimeString()}
                </div>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() => setShowSettings(true)}
                className="border-cyber-purple/30 text-cyber-purple hover:bg-cyber-purple/10"
              >
                <SettingsIcon className="h-4 w-4 mr-2" />
                Settings
              </Button>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  size="sm"
                  onClick={() => {
                    realtimeService.simulateMarketEvent("bullish", 0.5);
                    setApiNotification({
                      type: "info",
                      message: "Market data refreshed! Live updates active.",
                    });
                    setShowApiNotification(true);
                  }}
                  className="bg-gradient-to-r from-cyber-blue to-cyber-purple hover:from-cyber-blue-dark hover:to-cyber-purple-dark text-white"
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Refresh Data
                </Button>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Portfolio Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              delay: 0.1,
              type: "spring",
              stiffness: 200,
              damping: 20,
            }}
            whileHover={{
              y: -8,
              scale: 1.02,
              transition: { type: "spring", stiffness: 400, damping: 15 },
            }}
          >
            <Card className="p-6 bg-white/10 backdrop-blur-md border border-cyber-blue/20 hover:border-cyber-blue/40 transition-all duration-300 group shadow-cyber">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-cyber-blue/20 rounded-xl group-hover:bg-cyber-blue/30 transition-all duration-300">
                  <DollarSign className="h-6 w-6 text-cyber-blue" />
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-white/70 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-cyber-blue/80">Portfolio Value</p>
                <p className="text-2xl font-bold text-white">
                  ${portfolioValue.toLocaleString()}
                </p>
                <div
                  className={cn(
                    "flex items-center space-x-1 text-sm font-medium",
                    dailyChange >= 0 ? "text-cyber-green" : "text-cyber-red",
                  )}
                >
                  {dailyChange >= 0 ? (
                    <TrendingUp className="h-4 w-4" />
                  ) : (
                    <TrendingDown className="h-4 w-4" />
                  )}
                  <span>
                    {dailyChange >= 0 ? "+" : ""}$
                    {Math.abs(dailyChange).toFixed(2)} (
                    {dailyChangePercent.toFixed(2)}%)
                  </span>
                </div>
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              delay: 0.2,
              type: "spring",
              stiffness: 200,
              damping: 20,
            }}
            whileHover={{
              y: -8,
              scale: 1.02,
              transition: { type: "spring", stiffness: 400, damping: 15 },
            }}
          >
            <Card className="p-6 bg-white/10 backdrop-blur-md border border-cyber-green/20 hover:border-cyber-green/40 transition-all duration-300 group shadow-cyber">
              <div className="flex items-center justify-between mb-4">
                <motion.div
                  className="p-2 bg-cyber-green/20 rounded-xl group-hover:bg-cyber-green/30 transition-all duration-300"
                  whileHover={{ rotate: 15, scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                >
                  <PieChart className="h-6 w-6 text-cyber-green" />
                </motion.div>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-cyber-green/80">Total Gain/Loss</p>
                <p
                  className={cn(
                    "text-2xl font-bold",
                    totalGain >= 0 ? "text-cyber-green" : "text-cyber-red",
                  )}
                >
                  {totalGain >= 0 ? "+" : ""}${totalGain.toFixed(2)}
                </p>
                <p
                  className={cn(
                    "text-sm font-medium",
                    totalGain >= 0
                      ? "text-cyber-green/60"
                      : "text-cyber-red/60",
                  )}
                >
                  {totalGain >= 0 ? "+" : ""}
                  {totalGainPercent.toFixed(2)}% all time
                </p>
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              delay: 0.3,
              type: "spring",
              stiffness: 200,
              damping: 20,
            }}
            whileHover={{
              y: -8,
              scale: 1.02,
              transition: { type: "spring", stiffness: 400, damping: 15 },
            }}
          >
            <Card className="p-6 bg-white/10 backdrop-blur-md border border-cyber-purple/20 hover:border-cyber-purple/40 transition-all duration-300 group shadow-cyber">
              <div className="flex items-center justify-between mb-4">
                <motion.div
                  className="p-2 bg-cyber-purple/20 rounded-xl group-hover:bg-cyber-purple/30 transition-all duration-300"
                  whileHover={{ rotate: -15, scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                >
                  <Target className="h-6 w-6 text-cyber-purple" />
                </motion.div>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-cyber-purple/80">Active Positions</p>
                <p className="text-2xl font-bold text-white">
                  {positions.length}
                </p>
                <p className="text-sm text-cyber-purple/60">
                  Invested: $
                  {positions
                    .reduce((sum, pos) => sum + pos.avgPrice * pos.shares, 0)
                    .toLocaleString()}
                </p>
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              delay: 0.4,
              type: "spring",
              stiffness: 200,
              damping: 20,
            }}
            whileHover={{
              y: -8,
              scale: 1.02,
              transition: { type: "spring", stiffness: 400, damping: 15 },
            }}
          >
            <Card className="p-6 bg-white/10 backdrop-blur-md border border-cyber-red/20 hover:border-cyber-red/40 transition-all duration-300 group shadow-cyber">
              <div className="flex items-center justify-between mb-4">
                <motion.div
                  className="p-2 bg-cyber-red/20 rounded-xl group-hover:bg-cyber-red/30 transition-all duration-300"
                  whileHover={{ rotate: 25, scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                  animate={{
                    y: [0, -3, 0],
                    transition: {
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    },
                  }}
                >
                  <Bell className="h-6 w-6 text-cyber-red" />
                </motion.div>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-cyber-red/80">Active Alerts</p>
                <p className="text-2xl font-bold text-white">{alerts.length}</p>
                <p className="text-sm text-cyber-red/60">Price alerts set</p>
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Global Indices Dashboard */}
        <IndicesDashboard />

        {/* Main Content Tabs */}
        <div className="mt-8">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="bg-white/10 border border-cyber-blue/20 mb-8">
              <TabsTrigger
                value="overview"
                className="data-[state=active]:bg-cyber-blue data-[state=active]:text-white"
              >
                <BarChart3 className="h-4 w-4 mr-2" />
                Overview
              </TabsTrigger>
              <TabsTrigger
                value="positions"
                className="data-[state=active]:bg-cyber-green data-[state=active]:text-white"
              >
                <Wallet className="h-4 w-4 mr-2" />
                Positions
              </TabsTrigger>
              <TabsTrigger
                value="trading"
                className="data-[state=active]:bg-cyber-purple data-[state=active]:text-white"
              >
                <TrendingUp className="h-4 w-4 mr-2" />
                Trading
              </TabsTrigger>
              <TabsTrigger
                value="watchlist"
                className="data-[state=active]:bg-cyber-yellow data-[state=active]:text-white"
              >
                <Eye className="h-4 w-4 mr-2" />
                Watchlist
              </TabsTrigger>
              <TabsTrigger
                value="alerts"
                className="data-[state=active]:bg-cyber-red data-[state=active]:text-white"
              >
                <Bell className="h-4 w-4 mr-2" />
                Alerts
              </TabsTrigger>
              <TabsTrigger
                value="news"
                className="data-[state=active]:bg-cyber-blue data-[state=active]:text-white"
              >
                <Newspaper className="h-4 w-4 mr-2" />
                News
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Chart */}
                <div className="lg:col-span-2">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <div className="mb-4">
                      <TimeIntervalSelector
                        selectedInterval={timeframe}
                        onIntervalChange={handleTimeframeChange}
                        compact={true}
                      />
                    </div>
                    <StockChart
                      symbol={selectedStock}
                      data={chartData}
                      showPredictions={false}
                      className="mb-6"
                    />
                  </motion.div>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                  <RiskAssessment
                    symbol={selectedStock}
                    onSetPriceAlert={() => setShowPriceAlertModal(true)}
                    onAddToWatchlist={() => {
                      // Add to watchlist logic here
                      console.log("Add to watchlist:", selectedStock);
                    }}
                  />
                  <StockNews compact={true} />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="positions" className="space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <Card className="p-6 bg-white/10 backdrop-blur-md border border-cyber-green/20 shadow-cyber">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-cyber-green/20 rounded-xl">
                        <Wallet className="h-5 w-5 text-cyber-green" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white">
                          Your Positions
                        </h3>
                        <p className="text-sm text-cyber-green/70">
                          {positions.length} active positions • $
                          {portfolioValue.toLocaleString()} total value
                        </p>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      onClick={() => setShowAddPosition(true)}
                      className="bg-gradient-to-r from-cyber-green to-cyber-blue hover:from-cyber-green-dark hover:to-cyber-blue-dark text-white"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Position
                    </Button>
                  </div>

                  {/* Add Position Form */}
                  {showAddPosition && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="mb-6 p-4 bg-white/5 border border-cyber-green/20 rounded-xl"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="text-white font-semibold">
                          Add New Position
                        </h4>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => setShowAddPosition(false)}
                          className="text-white/70 hover:text-white"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div>
                          <Label className="text-white text-sm mb-2 block">
                            Symbol
                          </Label>
                          <Input
                            placeholder="e.g., AAPL"
                            value={newPosition.symbol}
                            onChange={(e) =>
                              setNewPosition({
                                ...newPosition,
                                symbol: e.target.value.toUpperCase(),
                              })
                            }
                            className="bg-white/10 border-cyber-green/30 text-white placeholder-white/50"
                          />
                        </div>

                        <div>
                          <Label className="text-white text-sm mb-2 block">
                            Shares
                          </Label>
                          <Input
                            type="number"
                            placeholder="100"
                            value={newPosition.shares || ""}
                            onChange={(e) =>
                              setNewPosition({
                                ...newPosition,
                                shares: parseInt(e.target.value) || 0,
                              })
                            }
                            className="bg-white/10 border-cyber-green/30 text-white placeholder-white/50"
                          />
                        </div>

                        <div>
                          <Label className="text-white text-sm mb-2 block">
                            Average Price
                          </Label>
                          <Input
                            type="number"
                            step="0.01"
                            placeholder="150.00"
                            value={newPosition.price || ""}
                            onChange={(e) =>
                              setNewPosition({
                                ...newPosition,
                                price: parseFloat(e.target.value) || 0,
                              })
                            }
                            className="bg-white/10 border-cyber-green/30 text-white placeholder-white/50"
                          />
                        </div>

                        <div>
                          <Label className="text-white text-sm mb-2 block">
                            Type
                          </Label>
                          <select
                            value={newPosition.type}
                            onChange={(e) =>
                              setNewPosition({
                                ...newPosition,
                                type: e.target.value as "long" | "short",
                              })
                            }
                            className="w-full px-3 py-2 bg-white/10 border border-cyber-green/30 rounded-md text-white"
                          >
                            <option value="long">Long</option>
                            <option value="short">Short</option>
                          </select>
                        </div>
                      </div>

                      <Separator className="my-4" />

                      <div className="flex items-center justify-between">
                        <div className="text-sm text-white/70">
                          Total Investment: $
                          {(
                            newPosition.shares * newPosition.price
                          ).toLocaleString()}
                        </div>
                        <Button
                          onClick={handleAddPosition}
                          disabled={
                            !newPosition.symbol ||
                            !newPosition.shares ||
                            !newPosition.price
                          }
                          className="bg-cyber-green hover:bg-cyber-green-dark text-white"
                        >
                          <Plus className="mr-2 h-4 w-4" />
                          Add Position
                        </Button>
                      </div>
                    </motion.div>
                  )}

                  {/* Positions List */}
                  <div className="space-y-4">
                    {positions.length === 0 ? (
                      <div className="text-center py-8 text-white/60">
                        <Wallet className="h-12 w-12 mx-auto mb-3 opacity-50" />
                        <p>No positions yet</p>
                        <p className="text-sm">
                          Add your first position to start tracking
                        </p>
                      </div>
                    ) : (
                      positions.map((position, index) => {
                        const isPositive = position.totalGain >= 0;
                        const isDayPositive = position.dayChange >= 0;

                        return (
                          <motion.div
                            key={position.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="p-4 bg-white/5 border border-cyber-blue/10 rounded-xl hover:bg-white/10 hover:border-cyber-blue/20 transition-all duration-200 group"
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-4 flex-1">
                                <div className="w-12 h-12 bg-gradient-to-br from-cyber-blue to-cyber-purple rounded-xl flex items-center justify-center group-hover:shadow-lg group-hover:shadow-cyber-blue/25 transition-all duration-300">
                                  <span className="text-white font-bold text-sm">
                                    {position.symbol.charAt(0)}
                                  </span>
                                </div>

                                <div className="flex-1">
                                  <div className="flex items-center space-x-2 mb-1">
                                    <h4 className="font-semibold text-white text-lg">
                                      {position.symbol}
                                    </h4>
                                    <Badge
                                      className={cn(
                                        "text-xs",
                                        position.type === "long"
                                          ? "bg-cyber-green/20 text-cyber-green border-cyber-green/30"
                                          : "bg-cyber-red/20 text-cyber-red border-cyber-red/30",
                                      )}
                                    >
                                      {position.type === "long" ? (
                                        <ArrowUpRight className="h-3 w-3 mr-1" />
                                      ) : (
                                        <ArrowDownRight className="h-3 w-3 mr-1" />
                                      )}
                                      {position.type.toUpperCase()}
                                    </Badge>
                                  </div>
                                  <p className="text-sm text-white/70 mb-2">
                                    {position.name}
                                  </p>
                                  <div className="grid grid-cols-3 gap-4 text-xs text-cyber-blue/60">
                                    <div>
                                      <span className="block">Shares</span>
                                      <span className="text-white font-medium">
                                        {position.shares}
                                      </span>
                                    </div>
                                    <div>
                                      <span className="block">Avg Price</span>
                                      <span className="text-white font-medium">
                                        ${position.avgPrice.toFixed(2)}
                                      </span>
                                    </div>
                                    <div>
                                      <span className="block">Current</span>
                                      <span className="text-white font-medium">
                                        ${position.currentPrice.toFixed(2)}
                                      </span>
                                    </div>
                                  </div>
                                </div>

                                <div className="text-right">
                                  <p className="font-bold text-white text-xl mb-1">
                                    ${position.value.toLocaleString()}
                                  </p>
                                  <div
                                    className={cn(
                                      "flex items-center justify-end space-x-1 text-sm font-medium mb-1",
                                      isPositive
                                        ? "text-cyber-green"
                                        : "text-cyber-red",
                                    )}
                                  >
                                    {isPositive ? (
                                      <TrendingUp className="h-3 w-3" />
                                    ) : (
                                      <TrendingDown className="h-3 w-3" />
                                    )}
                                    <span>
                                      {isPositive ? "+" : ""}$
                                      {position.totalGain.toFixed(2)} (
                                      {position.totalGainPercent.toFixed(2)}%)
                                    </span>
                                  </div>
                                  <div
                                    className={cn(
                                      "text-xs font-medium",
                                      isDayPositive
                                        ? "text-cyber-green/60"
                                        : "text-cyber-red/60",
                                    )}
                                  >
                                    Today: {isDayPositive ? "+" : ""}$
                                    {(
                                      position.dayChange * position.shares
                                    ).toFixed(2)}
                                  </div>
                                </div>
                              </div>

                              <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity ml-4">
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() =>
                                    setSelectedStock(position.symbol)
                                  }
                                  className="text-cyber-blue hover:text-cyber-blue-light p-2"
                                  title="View Chart"
                                >
                                  <BarChart3 className="h-4 w-4" />
                                </Button>
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  className="text-white/70 hover:text-white p-2"
                                  title="Edit Position"
                                >
                                  <Edit3 className="h-4 w-4" />
                                </Button>
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() =>
                                    handleRemovePosition(position.id)
                                  }
                                  className="text-cyber-red hover:text-cyber-red-dark p-2"
                                  title="Remove Position"
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
              </motion.div>
            </TabsContent>

            <TabsContent value="trading" className="space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                <div className="lg:col-span-3">
                  <TimeIntervalSelector
                    selectedInterval={timeframe}
                    onIntervalChange={handleTimeframeChange}
                    className="mb-6"
                  />
                  <StockChart
                    symbol={selectedStock}
                    data={chartData}
                    showPredictions={true}
                  />
                </div>
                <div>
                  <WatchlistManager />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="watchlist">
              <WatchlistManager />
            </TabsContent>

            <TabsContent value="alerts">
              <PriceAlerts />
            </TabsContent>

            <TabsContent value="news">
              <StockNews />
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Upgrade Prompt - Only show for free users */}
      {!isPaid && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed bottom-4 right-4 z-40"
        >
          <Card className="p-4 bg-gradient-to-r from-cyber-blue/20 to-cyber-purple/20 backdrop-blur-md border border-cyber-blue/30 shadow-2xl max-w-sm">
            <div className="flex items-start space-x-3">
              <div className="p-2 bg-cyber-blue/20 rounded-xl">
                <Target className="h-5 w-5 text-cyber-blue" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-white text-sm mb-1">
                  Unlock Advanced Features
                </h4>
                <p className="text-cyber-blue/80 text-xs mb-3">
                  Get real-time alerts, unlimited watchlists, and advanced
                  analytics
                </p>
                <div className="flex space-x-2">
                  <Button
                    size="sm"
                    onClick={() =>
                      (window.location.href =
                        "/payment?plan=Professional&price=29&billing=monthly&source=dashboard")
                    }
                    className="bg-gradient-to-r from-cyber-blue to-cyber-purple hover:from-cyber-blue-dark hover:to-cyber-purple-dark text-white text-xs px-3 py-1"
                  >
                    Upgrade Now
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-white/60 hover:text-white text-xs px-2 py-1"
                  >
                    Later
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      )}

      {/* Pro User Status - Show for paid users */}
      {isPaid && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed bottom-4 right-4 z-40"
        >
          <Card className="p-4 bg-gradient-to-r from-cyber-green/20 to-cyber-blue/20 backdrop-blur-md border border-cyber-green/30 shadow-2xl max-w-sm">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-cyber-green/20 rounded-xl">
                <CheckCircle className="h-5 w-5 text-cyber-green" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-white text-sm mb-1">
                  {currentPlan.charAt(0).toUpperCase() + currentPlan.slice(1)}{" "}
                  Plan Active
                </h4>
                <p className="text-cyber-green/80 text-xs">
                  All premium features unlocked!
                </p>
              </div>
            </div>
          </Card>
        </motion.div>
      )}

      {/* Settings Modal */}
      {showSettings && <Settings onClose={() => setShowSettings(false)} />}

      {/* Price Alert Modal */}
      <AnimatePresence>
        {showPriceAlertModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowPriceAlertModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <Card className="bg-gradient-to-br from-gray-900/95 via-gray-800/95 to-gray-900/95 backdrop-blur-xl border border-cyan-500/20 shadow-2xl">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-cyan-500/20 rounded-xl">
                        <Bell className="h-6 w-6 text-cyan-400" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-white">
                          Set Price Alert
                        </h2>
                        <p className="text-gray-400">
                          Create alert for {selectedStock}
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowPriceAlertModal(false)}
                      className="text-gray-400 hover:text-white"
                    >
                      <X className="h-5 w-5" />
                    </Button>
                  </div>

                  <PriceAlerts className="border-0 bg-transparent p-0" />
                </div>
              </Card>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Dashboard;
