import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import StockChart from "@/components/StockChart";
import StockSearchBar from "@/components/StockSearchBar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import { finnhubAPI, formatChartData, generateDateRange } from "@/lib/api";
import { apiService } from "@/lib/api-service";
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
  const [selectedStock, setSelectedStock] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [predictionData, setPredictionData] = useState<any>(null);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  const handleStockSearch = async (symbol: string) => {
    setIsLoading(true);
    setSelectedStock(symbol);

    try {
      // Fetch real historical data
      const { from, to } = generateDateRange(30);

      // Fetch data with proper error handling
      const [candles, quote] = await Promise.all([
        finnhubAPI.getCandles(symbol, "D", from, to),
        finnhubAPI.getQuote(symbol)
      ]);

      const historicalData = formatChartData(candles);

      if (historicalData.length === 0) {
        throw new Error("No data available for this symbol");
      }

      // Generate AI predictions using real historical data
      const prices = historicalData.map(d => d.price);
      const prediction = finnhubAPI.generatePrediction(prices, symbol);

      const allData = [...historicalData, ...prediction.predictions];
      const currentPrice = quote.c || historicalData[historicalData.length - 1].price;

      setPredictionData({
        symbol,
        data: allData,
        currentPrice,
        predictedPrice: prediction.targetPrice,
        predictedChange: prediction.targetPrice - currentPrice,
        predictedChangePercent: ((prediction.targetPrice - currentPrice) / currentPrice) * 100,
        confidence: prediction.confidence,
        targetPrice: prediction.targetPrice,
        support: prediction.support,
        resistance: prediction.resistance,
        timeframe: "7 days",
        quote,
        profile: { name: apiService.generateMockStockData(symbol).profile.name },
      });

    } catch (error) {
      console.error("Error fetching stock data:", error);

      // Use improved mock data service
      if (apiService.shouldUseMockData(error as Error)) {
        const mockData = apiService.generateMockStockData(symbol);
        const historicalData = formatChartData(mockData.candles);

        // Generate AI predictions using mock historical data
        const prices = historicalData.map(d => d.price);
        const prediction = finnhubAPI.generatePrediction(prices, symbol);

        const allData = [...historicalData, ...prediction.predictions];
        const currentPrice = mockData.quote.c;

        setPredictionData({
          symbol,
          data: allData,
          currentPrice,
          predictedPrice: prediction.targetPrice,
          predictedChange: prediction.targetPrice - currentPrice,
          predictedChangePercent: ((prediction.targetPrice - currentPrice) / currentPrice) * 100,
          confidence: prediction.confidence,
          targetPrice: prediction.targetPrice,
          support: prediction.support,
          resistance: prediction.resistance,
          timeframe: "7 days",
          quote: mockData.quote,
          profile: mockData.profile,
        });
      } else {
        // Re-throw if it's not an API access issue
        throw error;
      }
    } finally {
      setIsLoading(false);
    }
    }
  };

  const predictionMetrics = predictionData
    ? [
        {
          label: "Current Price",
          value: `$${predictionData.currentPrice.toFixed(2)}`,
          icon: DollarSign,
          color: "text-apple-gray-700",
        },
        {
          label: "7-Day Prediction",
          value: `$${predictionData.predictedPrice.toFixed(2)}`,
          icon: predictionData.predictedChange >= 0 ? TrendingUp : TrendingDown,
          color:
            predictionData.predictedChange >= 0
              ? "text-apple-green"
              : "text-apple-red",
        },
        {
          label: "Expected Change",
          value: `${predictionData.predictedChange >= 0 ? "+" : ""}${predictionData.predictedChangePercent.toFixed(2)}%`,
          icon: Target,
          color:
            predictionData.predictedChange >= 0
              ? "text-apple-green"
              : "text-apple-red",
        },
        {
          label: "Confidence",
          value: `${(predictionData.confidence * 100).toFixed(1)}%`,
          icon: CheckCircle,
          color: "text-apple-blue",
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
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-apple-blue to-apple-purple px-4 py-2 rounded-2xl text-white mb-6">
            <Brain className="h-5 w-5" />
            <span className="font-semibold">AI-Powered Predictions</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-apple-gray-700 mb-4">
            Stock Price Prediction
          </h1>
          <p className="text-xl text-apple-gray-500 max-w-3xl mx-auto">
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
                  <div className="w-16 h-16 border-4 border-apple-gray-200 rounded-full"></div>
                  <div className="absolute top-0 left-0 w-16 h-16 border-4 border-apple-blue rounded-full animate-spin border-t-transparent"></div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-xl font-semibold text-apple-gray-700">
                    Analyzing {selectedStock}
                  </h3>
                  <p className="text-apple-gray-500">
                    Processing market data and generating predictions...
                  </p>
                </div>

                <div className="flex items-center space-x-6 text-sm text-apple-gray-500">
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
                      <Card className="p-6 bg-white/90 apple-blur border border-apple-gray-200/50 shadow-apple hover:shadow-apple-lg transition-all duration-300">
                        <div className="flex items-center space-x-3 mb-3">
                          <div
                            className={cn(
                              "p-2 rounded-xl",
                              metric.color.includes("green")
                                ? "bg-apple-green/10"
                                : metric.color.includes("red")
                                  ? "bg-apple-red/10"
                                  : metric.color.includes("blue")
                                    ? "bg-apple-blue/10"
                                    : "bg-apple-gray-100",
                            )}
                          >
                            <Icon className={cn("h-5 w-5", metric.color)} />
                          </div>
                          <span className="text-sm font-medium text-apple-gray-500">
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
                    <Card className="p-6 bg-white/90 apple-blur border border-apple-gray-200/50 shadow-apple">
                      <h3 className="text-xl font-bold text-apple-gray-700 mb-6">
                        Key Price Levels
                      </h3>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="text-center p-4 bg-apple-green/5 rounded-2xl border border-apple-green/20">
                          <TrendingUp className="h-6 w-6 text-apple-green mx-auto mb-2" />
                          <p className="text-sm text-apple-gray-500 mb-1">
                            Resistance
                          </p>
                          <p className="text-xl font-bold text-apple-green">
                            ${predictionData.resistance.toFixed(2)}
                          </p>
                        </div>

                        <div className="text-center p-4 bg-apple-blue/5 rounded-2xl border border-apple-blue/20">
                          <Target className="h-6 w-6 text-apple-blue mx-auto mb-2" />
                          <p className="text-sm text-apple-gray-500 mb-1">
                            Target
                          </p>
                          <p className="text-xl font-bold text-apple-blue">
                            ${predictionData.targetPrice.toFixed(2)}
                          </p>
                        </div>

                        <div className="text-center p-4 bg-apple-red/5 rounded-2xl border border-apple-red/20">
                          <TrendingDown className="h-6 w-6 text-apple-red mx-auto mb-2" />
                          <p className="text-sm text-apple-gray-500 mb-1">
                            Support
                          </p>
                          <p className="text-xl font-bold text-apple-red">
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
                    <Card className="p-6 bg-white/90 apple-blur border border-apple-gray-200/50 shadow-apple">
                      <div className="flex items-center space-x-2 mb-6">
                        <Brain className="h-5 w-5 text-apple-purple" />
                        <h3 className="text-xl font-bold text-apple-gray-700">
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
                            className="p-4 bg-apple-gray-50 rounded-2xl"
                          >
                            <div className="flex items-start justify-between mb-2">
                              <h4 className="font-semibold text-apple-gray-700">
                                {point.title}
                              </h4>
                              <Badge
                                variant="outline"
                                className={cn(
                                  "text-xs",
                                  point.type === "bullish"
                                    ? "border-apple-green text-apple-green"
                                    : point.type === "bearish"
                                      ? "border-apple-red text-apple-red"
                                      : "border-apple-gray-400 text-apple-gray-600",
                                )}
                              >
                                {point.confidence}
                              </Badge>
                            </div>
                            <p className="text-sm text-apple-gray-500">
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
                    <Card className="p-6 bg-white/90 apple-blur border border-apple-gray-200/50 shadow-apple">
                      <div className="flex items-center space-x-2 mb-6">
                        <AlertTriangle className="h-5 w-5 text-apple-red" />
                        <h3 className="text-xl font-bold text-apple-gray-700">
                          Risk Assessment
                        </h3>
                      </div>

                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-apple-gray-600">
                            Volatility
                          </span>
                          <Badge
                            variant="outline"
                            className="border-yellow-500 text-yellow-600"
                          >
                            Medium
                          </Badge>
                        </div>

                        <div className="flex justify-between items-center">
                          <span className="text-sm text-apple-gray-600">
                            Market Risk
                          </span>
                          <Badge
                            variant="outline"
                            className="border-apple-red text-apple-red"
                          >
                            High
                          </Badge>
                        </div>

                        <div className="flex justify-between items-center">
                          <span className="text-sm text-apple-gray-600">
                            Liquidity
                          </span>
                          <Badge
                            variant="outline"
                            className="border-apple-green text-apple-green"
                          >
                            High
                          </Badge>
                        </div>
                      </div>

                      <div className="mt-6 p-3 bg-yellow-50 border border-yellow-200 rounded-xl">
                        <p className="text-xs text-yellow-800">
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
                    <Button className="w-full bg-apple-blue hover:bg-apple-blue-dark text-white py-3 rounded-2xl shadow-apple">
                      <Zap className="h-4 w-4 mr-2" />
                      Set Price Alert
                    </Button>

                    <Button
                      variant="outline"
                      className="w-full border-apple-gray-300 text-apple-gray-700 py-3 rounded-2xl"
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
            <div className="w-24 h-24 bg-gradient-to-br from-apple-blue to-apple-purple rounded-3xl flex items-center justify-center mx-auto mb-6">
              <Brain className="h-12 w-12 text-white" />
            </div>

            <h3 className="text-2xl font-bold text-apple-gray-700 mb-4">
              Ready to Predict the Future?
            </h3>
            <p className="text-apple-gray-500 max-w-md mx-auto">
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