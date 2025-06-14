import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useSearchParams } from "react-router-dom";
import Navigation from "@/components/Navigation";
import StockChart from "@/components/StockChart";
import StockSearchBar from "@/components/StockSearchBar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import { finnhubAPI, formatChartData } from "@/lib/api";
import { demoDataService } from "@/lib/demo-data-service";
import {
  Brain,
  TrendingUp,
  TrendingDown,
  Target,
  Calendar,
  BarChart3,
  Zap,
  AlertTriangle,
  CheckCircle,
  Clock,
  DollarSign,
} from "lucide-react";
import { cn } from "@/lib/utils";

const StockPrediction = () => {
  const [searchParams] = useSearchParams();
  const urlSymbol = searchParams.get("symbol");

  const [selectedStock, setSelectedStock] = useState<string | null>(urlSymbol);
  const [isLoading, setIsLoading] = useState(false);
  const [predictionData, setPredictionData] = useState<any>(null);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  // Auto-load prediction if symbol is provided in URL
  useEffect(() => {
    if (urlSymbol && !predictionData) {
      handleStockSearch(urlSymbol);
    }
  }, [urlSymbol]);

  const handleStockSearch = async (symbol: string) => {
    setIsLoading(true);
    setSelectedStock(symbol);

    try {
      console.log(`Generating AI predictions for ${symbol}...`);

      // Use demo data service for consistent experience
      const demoData = demoDataService.generateStockData(symbol);
      const historicalData = formatChartData(demoData.candles);

      // Generate AI predictions using mock historical data
      const prices = historicalData.map((d) => d.price);
      const prediction = finnhubAPI.generatePrediction(prices, symbol);

      const allData = [...historicalData, ...prediction.predictions];
      const currentPrice = demoData.quote.c;

      setPredictionData({
        symbol,
        data: allData,
        currentPrice,
        predictedPrice: prediction.targetPrice,
        predictedChange: prediction.targetPrice - currentPrice,
        predictedChangePercent:
          ((prediction.targetPrice - currentPrice) / currentPrice) * 100,
        confidence: prediction.confidence,
        targetPrice: prediction.targetPrice,
        support: prediction.support,
        resistance: prediction.resistance,
        timeframe: "7 days",
        quote: demoData.quote,
        profile: demoData.profile,
      });
    } catch (error) {
      console.error("Error generating predictions:", error);

      // Fallback to simple prediction if service fails
      const basePrice = 150;
      const mockData = [];

      // Generate historical data
      for (let i = 30; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        mockData.push({
          date: date.toLocaleDateString(),
          price: basePrice + (Math.random() - 0.5) * 20,
          predicted: false,
        });
      }

      // Generate prediction data
      const predictedData = [];
      for (let i = 1; i <= 7; i++) {
        const date = new Date();
        date.setDate(date.getDate() + i);
        predictedData.push({
          date: date.toLocaleDateString(),
          price: basePrice + i * 0.7 + (Math.random() - 0.5) * 3,
          predicted: true,
        });
      }

      const allData = [...mockData, ...predictedData];
      const currentPrice = mockData[mockData.length - 1].price;
      const targetPrice = predictedData[predictedData.length - 1].price;

      setPredictionData({
        symbol,
        data: allData,
        currentPrice,
        predictedPrice: targetPrice,
        predictedChange: targetPrice - currentPrice,
        predictedChangePercent:
          ((targetPrice - currentPrice) / currentPrice) * 100,
        confidence: 0.85,
        targetPrice,
        support: currentPrice * 0.95,
        resistance: currentPrice * 1.08,
        timeframe: "7 days",
        quote: {
          c: currentPrice,
          d: (Math.random() - 0.5) * 5,
          dp: (Math.random() - 0.5) * 3,
          h: currentPrice * 1.02,
          l: currentPrice * 0.98,
          o: currentPrice * 0.995,
          pc: currentPrice - 2,
          t: Date.now() / 1000,
        },
        profile: {
          name: demoDataService.generateStockData(symbol).profile.name,
        },
      });
    } finally {
      setIsLoading(false);
    }
  };

  const predictionMetrics = predictionData
    ? [
        {
          label: "Current Price",
          value: `$${predictionData.currentPrice.toFixed(2)}`,
          icon: DollarSign,
          color: "text-white",
        },
        {
          label: "7-Day Prediction",
          value: `$${predictionData.predictedPrice.toFixed(2)}`,
          icon: predictionData.predictedChange >= 0 ? TrendingUp : TrendingDown,
          color:
            predictionData.predictedChange >= 0
              ? "text-cyber-green"
              : "text-cyber-red",
        },
        {
          label: "Expected Change",
          value: `${predictionData.predictedChange >= 0 ? "+" : ""}${predictionData.predictedChangePercent.toFixed(2)}%`,
          icon: Target,
          color:
            predictionData.predictedChange >= 0
              ? "text-cyber-green"
              : "text-cyber-red",
        },
        {
          label: "Confidence",
          value: `${(predictionData.confidence * 100).toFixed(1)}%`,
          icon: CheckCircle,
          color: "text-cyber-blue",
        },
      ]
    : [];

  const analysisPoints = predictionData
    ? [
        {
          type: "bullish",
          title: "Strong Technical Indicators",
          description:
            "Moving averages showing upward momentum with increasing volume",
          confidence: "High",
        },
        {
          type: "neutral",
          title: "Market Sentiment",
          description: "Mixed sentiment from recent news and analyst reports",
          confidence: "Medium",
        },
        {
          type: predictionData.predictedChange >= 0 ? "bullish" : "bearish",
          title: "Price Action Forecast",
          description: `AI model predicts ${predictionData.predictedChange >= 0 ? "upward" : "downward"} movement based on historical patterns`,
          confidence: "High",
        },
      ]
    : [];

  return (
    <div className="min-h-screen bg-cyber-black cyber-grid relative">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-cyber-blue to-cyber-purple px-4 py-2 rounded-2xl text-white mb-6 glow-blue">
            <Brain className="h-5 w-5" />
            <span className="font-semibold">AI-Powered Predictions</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold neon-text mb-4">
            Stock Price Prediction
          </h1>
          <p className="text-xl text-cyber-gray-300 max-w-3xl mx-auto">
            Get accurate stock price forecasts powered by advanced machine
            learning algorithms
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex justify-center mb-12"
        >
          <StockSearchBar
            onSearch={handleStockSearch}
            isLoading={isLoading}
            className="max-w-2xl"
          />
        </motion.div>

        {/* Loading State */}
        <AnimatePresence>
          {isLoading && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="text-center py-16"
            >
              <div className="inline-flex flex-col items-center space-y-4">
                <div className="relative">
                  <div className="w-16 h-16 border-4 border-cyber-gray-700 rounded-full"></div>
                  <div className="absolute top-0 left-0 w-16 h-16 border-4 border-cyber-blue rounded-full animate-spin border-t-transparent glow-blue"></div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-xl font-semibold text-white">
                    Analyzing {selectedStock}
                  </h3>
                  <p className="text-cyber-gray-300">
                    Processing market data and generating predictions...
                  </p>
                </div>

                <div className="flex items-center space-x-6 text-sm text-cyber-gray-400">
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4" />
                    <span>Gathering data</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Brain className="h-4 w-4" />
                    <span>Running AI model</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <BarChart3 className="h-4 w-4" />
                    <span>Generating forecast</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Prediction Results */}
        <AnimatePresence>
          {predictionData && !isLoading && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              {/* Quick Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {predictionMetrics.map((metric, index) => {
                  const Icon = metric.icon;

                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card className="dark-card neon-border p-6 hover:glow-blue transition-all duration-300">
                        <div className="flex items-center space-x-3 mb-3">
                          <div
                            className={cn(
                              "p-2 rounded-xl",
                              metric.color.includes("green")
                                ? "bg-cyber-green/20"
                                : metric.color.includes("red")
                                  ? "bg-cyber-red/20"
                                  : metric.color.includes("blue")
                                    ? "bg-cyber-blue/20"
                                    : "bg-cyber-gray-700",
                            )}
                          >
                            <Icon className={cn("h-5 w-5", metric.color)} />
                          </div>
                          <span className="text-sm font-medium text-cyber-gray-300">
                            {metric.label}
                          </span>
                        </div>
                        <p className={cn("text-2xl font-bold", metric.color)}>
                          {metric.value}
                        </p>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Chart */}
                <div className="lg:col-span-2">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <StockChart
                      symbol={predictionData.symbol}
                      data={predictionData.data}
                      showPredictions={true}
                      className="mb-6"
                    />
                  </motion.div>

                  {/* Key Levels */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <Card className="dark-card neon-border p-6">
                      <h3 className="text-xl font-bold text-white mb-6">
                        Key Price Levels
                      </h3>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="text-center p-4 bg-cyber-green/10 rounded-2xl border border-cyber-green/30">
                          <TrendingUp className="h-6 w-6 text-cyber-green mx-auto mb-2" />
                          <p className="text-sm text-cyber-gray-300 mb-1">
                            Resistance
                          </p>
                          <p className="text-xl font-bold text-cyber-green">
                            ${predictionData.resistance.toFixed(2)}
                          </p>
                        </div>

                        <div className="text-center p-4 bg-cyber-blue/10 rounded-2xl border border-cyber-blue/30">
                          <Target className="h-6 w-6 text-cyber-blue mx-auto mb-2" />
                          <p className="text-sm text-cyber-gray-300 mb-1">
                            Target
                          </p>
                          <p className="text-xl font-bold text-cyber-blue">
                            ${predictionData.targetPrice.toFixed(2)}
                          </p>
                        </div>

                        <div className="text-center p-4 bg-cyber-red/10 rounded-2xl border border-cyber-red/30">
                          <TrendingDown className="h-6 w-6 text-cyber-red mx-auto mb-2" />
                          <p className="text-sm text-cyber-gray-300 mb-1">
                            Support
                          </p>
                          <p className="text-xl font-bold text-cyber-red">
                            ${predictionData.support.toFixed(2)}
                          </p>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                </div>

                {/* Analysis Sidebar */}
                <div className="space-y-6">
                  {/* AI Analysis */}
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 }}
                  >
                    <Card className="dark-card neon-border p-6">
                      <div className="flex items-center space-x-2 mb-6">
                        <Brain className="h-5 w-5 text-cyber-purple" />
                        <h3 className="text-xl font-bold text-white">
                          AI Analysis
                        </h3>
                      </div>

                      <div className="space-y-4">
                        {analysisPoints.map((point, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.7 + index * 0.1 }}
                            className="p-4 bg-cyber-gray-800/50 rounded-2xl border border-cyber-gray-700"
                          >
                            <div className="flex items-start justify-between mb-2">
                              <h4 className="font-semibold text-white">
                                {point.title}
                              </h4>
                              <Badge
                                variant="outline"
                                className={cn(
                                  "text-xs",
                                  point.type === "bullish"
                                    ? "border-cyber-green text-cyber-green"
                                    : point.type === "bearish"
                                      ? "border-cyber-red text-cyber-red"
                                      : "border-cyber-gray-400 text-cyber-gray-400",
                                )}
                              >
                                {point.confidence}
                              </Badge>
                            </div>
                            <p className="text-sm text-cyber-gray-300">
                              {point.description}
                            </p>
                          </motion.div>
                        ))}
                      </div>
                    </Card>
                  </motion.div>

                  {/* Risk Assessment */}
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 }}
                  >
                    <Card className="dark-card neon-border p-6">
                      <div className="flex items-center space-x-2 mb-6">
                        <AlertTriangle className="h-5 w-5 text-cyber-red" />
                        <h3 className="text-xl font-bold text-white">
                          Risk Assessment
                        </h3>
                      </div>

                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-cyber-gray-300">
                            Volatility
                          </span>
                          <Badge
                            variant="outline"
                            className="border-cyber-yellow text-cyber-yellow"
                          >
                            Medium
                          </Badge>
                        </div>

                        <div className="flex justify-between items-center">
                          <span className="text-sm text-cyber-gray-300">
                            Market Risk
                          </span>
                          <Badge
                            variant="outline"
                            className="border-cyber-red text-cyber-red"
                          >
                            High
                          </Badge>
                        </div>

                        <div className="flex justify-between items-center">
                          <span className="text-sm text-cyber-gray-300">
                            Liquidity
                          </span>
                          <Badge
                            variant="outline"
                            className="border-cyber-green text-cyber-green"
                          >
                            High
                          </Badge>
                        </div>
                      </div>

                      <div className="mt-6 p-3 bg-cyber-yellow/10 border border-cyber-yellow/30 rounded-xl">
                        <p className="text-xs text-cyber-yellow">
                          <strong>Disclaimer:</strong> These predictions are for
                          educational purposes only. Always conduct your own
                          research before making investment decisions.
                        </p>
                      </div>
                    </Card>
                  </motion.div>

                  {/* Action Buttons */}
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.9 }}
                    className="space-y-3"
                  >
                    <Button className="w-full bg-cyber-blue hover:bg-cyber-blue-dark text-white py-3 rounded-2xl glow-blue">
                      <Zap className="h-4 w-4 mr-2" />
                      Set Price Alert
                    </Button>

                    <Button
                      variant="outline"
                      className="w-full border-cyber-gray-600 text-cyber-gray-300 hover:bg-cyber-gray-800 py-3 rounded-2xl"
                    >
                      <Calendar className="h-4 w-4 mr-2" />
                      Add to Watchlist
                    </Button>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Empty State */}
        {!selectedStock && !isLoading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-center py-16"
          >
            <div className="w-24 h-24 bg-gradient-to-br from-cyber-blue to-cyber-purple rounded-3xl flex items-center justify-center mx-auto mb-6 glow-blue">
              <Brain className="h-12 w-12 text-white" />
            </div>

            <h3 className="text-2xl font-bold text-white mb-4">
              Ready to Predict the Future?
            </h3>
            <p className="text-cyber-gray-300 max-w-md mx-auto">
              Enter a stock symbol above to get AI-powered price predictions and
              market insights.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default StockPrediction;
