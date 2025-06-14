import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Navigation from "@/components/Navigation";
import ProfessionalChart from "@/components/ProfessionalChart";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  TrendingUp,
  TrendingDown,
  Brain,
  Target,
  AlertTriangle,
  CheckCircle,
  Clock,
  BarChart3,
  ArrowRight,
  Star,
  Info,
  Zap,
  Activity,
  Eye,
  Calendar,
  DollarSign,
  Users,
  Lightbulb,
  Shield,
  X,
  Share,
  Bookmark,
  Download,
  RefreshCw,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { TOP_50_COMPANIES } from "@/lib/companies-data";
import CompanyLogo from "@/components/CompanyLogo";
import { usePayment } from "@/contexts/PaymentContext";

interface PredictionData {
  timeframe: "1D" | "1W" | "1M" | "3M" | "6M" | "1Y";
  confidence: number;
  targetPrice: number;
  currentPrice: number;
  potentialReturn: number;
  direction: "bullish" | "bearish" | "neutral";
  reasoning: string[];
  riskLevel: "low" | "medium" | "high";
  aiModel: string;
  lastUpdated: Date;
  accuracy: number;
  signals: {
    technical: number;
    fundamental: number;
    sentiment: number;
    macro: number;
  };
}

interface NewsImpact {
  title: string;
  impact: "positive" | "negative" | "neutral";
  importance: number;
  date: Date;
}

const CompanyPrediction = () => {
  const { symbol } = useParams<{ symbol: string }>();
  const navigate = useNavigate();
  const { isPaid } = usePayment();

  const [selectedTimeframe, setSelectedTimeframe] = useState<
    "1D" | "1W" | "1M" | "3M" | "6M" | "1Y"
  >("1M");
  const [isLoading, setIsLoading] = useState(true);
  const [predictions, setPredictions] = useState<
    Record<string, PredictionData>
  >({});
  const [newsImpacts, setNewsImpacts] = useState<NewsImpact[]>([]);
  const [activeTab, setActiveTab] = useState("prediction");

  // Find company data
  const company = TOP_50_COMPANIES.find(
    (c) => c.symbol === symbol?.toUpperCase(),
  );

  useEffect(() => {
    if (!company) {
      navigate("/markets");
      return;
    }

    // Simulate loading and generate predictions
    setIsLoading(true);

    setTimeout(() => {
      const generatedPredictions = generateAdvancedPredictions(company);
      setPredictions(generatedPredictions);
      setNewsImpacts(generateNewsImpacts(company));
      setIsLoading(false);
    }, 2000);
  }, [company, navigate]);

  const generateAdvancedPredictions = (company: any) => {
    const timeframes: ("1D" | "1W" | "1M" | "3M" | "6M" | "1Y")[] = [
      "1D",
      "1W",
      "1M",
      "3M",
      "6M",
      "1Y",
    ];
    const predictions: Record<string, PredictionData> = {};

    timeframes.forEach((timeframe, index) => {
      const baseMultiplier = {
        "1D": 0.002,
        "1W": 0.01,
        "1M": 0.05,
        "3M": 0.15,
        "6M": 0.25,
        "1Y": 0.45,
      }[timeframe];

      const volatilityFactor = company.beta * baseMultiplier;
      const sectorBias =
        company.sector === "technology"
          ? 0.02
          : company.sector === "finance"
            ? -0.01
            : 0;
      const randomFactor = (Math.random() - 0.5) * 0.1;

      const priceChange =
        company.price * (volatilityFactor + sectorBias + randomFactor);
      const targetPrice = company.price + priceChange;
      const potentialReturn = (priceChange / company.price) * 100;

      const direction =
        potentialReturn > 2
          ? "bullish"
          : potentialReturn < -2
            ? "bearish"
            : "neutral";
      const confidence = Math.min(
        95,
        Math.max(60, 85 - Math.abs(potentialReturn) * 2),
      );

      predictions[timeframe] = {
        timeframe,
        confidence,
        targetPrice,
        currentPrice: company.price,
        potentialReturn,
        direction,
        riskLevel:
          Math.abs(potentialReturn) > 15
            ? "high"
            : Math.abs(potentialReturn) > 7
              ? "medium"
              : "low",
        aiModel: "StockVision AI v3.2",
        lastUpdated: new Date(),
        accuracy: Math.floor(Math.random() * 15) + 80,
        reasoning: generateReasoning(direction, company.sector, timeframe),
        signals: {
          technical: Math.floor(Math.random() * 40) + 60,
          fundamental: Math.floor(Math.random() * 40) + 60,
          sentiment: Math.floor(Math.random() * 40) + 60,
          macro: Math.floor(Math.random() * 40) + 60,
        },
      };
    });

    return predictions;
  };

  const generateReasoning = (
    direction: string,
    sector: string,
    timeframe: string,
  ) => {
    const reasoningBank = {
      bullish: [
        `Strong ${timeframe} technical indicators suggest upward momentum`,
        `Sector rotation favoring ${sector} companies`,
        `Above-average volume supporting price movement`,
        `Key resistance levels successfully broken`,
        `Institutional buying pressure detected`,
        `Positive earnings revision trends`,
        `Strong relative strength vs. market`,
      ],
      bearish: [
        `Technical indicators showing weakness in ${timeframe} timeframe`,
        `Sector headwinds affecting ${sector} performance`,
        `Distribution patterns detected in volume analysis`,
        `Key support levels under pressure`,
        `Institutional selling pressure observed`,
        `Earnings estimates trending downward`,
        `Underperforming relative to market`,
      ],
      neutral: [
        `Mixed signals in ${timeframe} technical analysis`,
        `Consolidation pattern forming`,
        `Awaiting sector-specific catalysts`,
        `Range-bound trading expected`,
        `Low conviction directional signals`,
        `Market uncertainty affecting outlook`,
      ],
    };

    const reasons = reasoningBank[direction as keyof typeof reasoningBank];
    return reasons.slice(0, Math.floor(Math.random() * 3) + 3);
  };

  const generateNewsImpacts = (company: any) => {
    const newsTemplates = [
      {
        title: `${company.name} reports stronger than expected quarterly results`,
        impact: "positive" as const,
        importance: 8,
      },
      {
        title: `Analyst upgrades ${company.symbol} price target`,
        impact: "positive" as const,
        importance: 6,
      },
      {
        title: `${company.name} announces strategic partnership`,
        impact: "positive" as const,
        importance: 7,
      },
      {
        title: `Regulatory concerns raised for ${company.sector} sector`,
        impact: "negative" as const,
        importance: 5,
      },
      {
        title: `${company.name} CEO discusses growth strategy`,
        impact: "neutral" as const,
        importance: 4,
      },
      {
        title: `Market volatility affects ${company.symbol} trading`,
        impact: "negative" as const,
        importance: 3,
      },
    ];

    return newsTemplates.map((template, index) => ({
      ...template,
      date: new Date(Date.now() - index * 24 * 60 * 60 * 1000),
    }));
  };

  if (!company) {
    return <div>Company not found</div>;
  }

  const currentPrediction = predictions[selectedTimeframe];
  const isPositive = currentPrediction?.direction === "bullish";
  const isNegative = currentPrediction?.direction === "bearish";

  const timeframes = [
    { id: "1D", label: "1 Day", shortLabel: "1D" },
    { id: "1W", label: "1 Week", shortLabel: "1W" },
    { id: "1M", label: "1 Month", shortLabel: "1M" },
    { id: "3M", label: "3 Months", shortLabel: "3M" },
    { id: "6M", label: "6 Months", shortLabel: "6M" },
    { id: "1Y", label: "1 Year", shortLabel: "1Y" },
  ] as const;

  return (
    <div className="min-h-screen bg-cyber-black cyber-grid">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate("/markets")}
                className="text-white/70 hover:text-white"
              >
                <ArrowRight className="h-4 w-4 mr-2 rotate-180" />
                Back to Markets
              </Button>
            </div>

            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                className="border-cyber-blue/30 text-cyber-blue hover:bg-cyber-blue/10"
              >
                <Share className="h-4 w-4 mr-2" />
                Share
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="border-cyber-purple/30 text-cyber-purple hover:bg-cyber-purple/10"
              >
                <Bookmark className="h-4 w-4 mr-2" />
                Save
              </Button>
            </div>
          </div>

          <div className="flex items-center space-x-6">
            <CompanyLogo
              symbol={company.symbol}
              companyName={company.name}
              size="xl"
              className="shadow-lg shadow-cyber-blue/25"
            />
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">
                {company.symbol} AI Prediction
              </h1>
              <p className="text-cyber-blue/80 text-lg">{company.name}</p>
              <div className="flex items-center space-x-4 mt-2">
                <Badge className="bg-cyber-blue/20 text-cyber-blue border-cyber-blue/30">
                  {company.sector}
                </Badge>
                <Badge className="bg-cyber-green/20 text-cyber-green border-cyber-green/30">
                  AI Powered
                </Badge>
                <span className="text-white/60 text-sm">
                  Last updated: {new Date().toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Chart and Predictions */}
          <div className="lg:col-span-2 space-y-6">
            {/* Chart */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <ProfessionalChart
                symbol={company.symbol}
                companyName={company.name}
                currentPrice={company.price}
                change={company.change}
                changePercent={company.changePercent}
              />
            </motion.div>

            {/* Prediction Tabs */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Tabs
                value={activeTab}
                onValueChange={setActiveTab}
                className="w-full"
              >
                <TabsList className="grid w-full grid-cols-3 bg-cyber-dark border border-cyber-blue/30">
                  <TabsTrigger
                    value="prediction"
                    className="data-[state=active]:bg-cyber-blue data-[state=active]:text-white"
                  >
                    <Brain className="h-4 w-4 mr-2" />
                    AI Prediction
                  </TabsTrigger>
                  <TabsTrigger
                    value="analysis"
                    className="data-[state=active]:bg-cyber-purple data-[state=active]:text-white"
                  >
                    <BarChart3 className="h-4 w-4 mr-2" />
                    Analysis
                  </TabsTrigger>
                  <TabsTrigger
                    value="signals"
                    className="data-[state=active]:bg-cyber-green data-[state=active]:text-white"
                  >
                    <Activity className="h-4 w-4 mr-2" />
                    Signals
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="prediction" className="mt-6">
                  {isLoading ? (
                    <Card className="p-8 bg-white/5 backdrop-blur-md border border-cyber-blue/20">
                      <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-2 border-cyber-blue border-t-transparent mx-auto mb-4"></div>
                        <p className="text-white">
                          Analyzing market data with AI...
                        </p>
                        <p className="text-cyber-blue/70 text-sm mt-2">
                          Processing {company.symbol} historical patterns
                        </p>
                      </div>
                    </Card>
                  ) : (
                    <div className="space-y-6">
                      {/* Timeframe Selection */}
                      <div className="flex flex-wrap gap-2">
                        {timeframes.map((tf) => (
                          <Button
                            key={tf.id}
                            size="sm"
                            variant={
                              selectedTimeframe === tf.id
                                ? "default"
                                : "outline"
                            }
                            onClick={() => setSelectedTimeframe(tf.id)}
                            className={cn(
                              selectedTimeframe === tf.id
                                ? "bg-cyber-blue text-white"
                                : "border-cyber-blue/30 text-cyber-blue hover:bg-cyber-blue/10",
                            )}
                          >
                            {tf.shortLabel}
                          </Button>
                        ))}
                      </div>

                      {/* Main Prediction Card */}
                      {currentPrediction && (
                        <Card className="p-8 bg-gradient-to-br from-cyber-dark to-cyber-dark/50 border border-cyber-blue/30 shadow-2xl">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* Prediction Overview */}
                            <div>
                              <div className="flex items-center space-x-3 mb-6">
                                <div
                                  className={cn(
                                    "p-3 rounded-xl",
                                    isPositive
                                      ? "bg-cyber-green/20"
                                      : isNegative
                                        ? "bg-cyber-red/20"
                                        : "bg-cyber-blue/20",
                                  )}
                                >
                                  {isPositive ? (
                                    <TrendingUp className="h-8 w-8 text-cyber-green" />
                                  ) : isNegative ? (
                                    <TrendingDown className="h-8 w-8 text-cyber-red" />
                                  ) : (
                                    <Target className="h-8 w-8 text-cyber-blue" />
                                  )}
                                </div>
                                <div>
                                  <h3 className="text-2xl font-bold text-white">
                                    {currentPrediction.direction
                                      .charAt(0)
                                      .toUpperCase() +
                                      currentPrediction.direction.slice(1)}{" "}
                                    Signal
                                  </h3>
                                  <p className="text-cyber-blue/80">
                                    {selectedTimeframe} Prediction
                                  </p>
                                </div>
                              </div>

                              <div className="space-y-4">
                                <div>
                                  <div className="flex justify-between items-center mb-2">
                                    <span className="text-white/80">
                                      Target Price
                                    </span>
                                    <span className="text-2xl font-bold text-white">
                                      $
                                      {currentPrediction.targetPrice.toFixed(2)}
                                    </span>
                                  </div>
                                  <div className="flex justify-between items-center">
                                    <span className="text-white/60 text-sm">
                                      Current: $
                                      {currentPrediction.currentPrice.toFixed(
                                        2,
                                      )}
                                    </span>
                                    <span
                                      className={cn(
                                        "text-sm font-medium",
                                        isPositive
                                          ? "text-cyber-green"
                                          : isNegative
                                            ? "text-cyber-red"
                                            : "text-cyber-blue",
                                      )}
                                    >
                                      {currentPrediction.potentialReturn > 0
                                        ? "+"
                                        : ""}
                                      {currentPrediction.potentialReturn.toFixed(
                                        2,
                                      )}
                                      %
                                    </span>
                                  </div>
                                </div>

                                <div>
                                  <div className="flex justify-between items-center mb-2">
                                    <span className="text-white/80">
                                      Confidence Level
                                    </span>
                                    <span className="text-white font-bold">
                                      {currentPrediction.confidence}%
                                    </span>
                                  </div>
                                  <Progress
                                    value={currentPrediction.confidence}
                                    className="h-2 bg-white/10"
                                  />
                                </div>

                                <div className="flex items-center justify-between">
                                  <span className="text-white/80">
                                    Risk Level
                                  </span>
                                  <Badge
                                    className={cn(
                                      currentPrediction.riskLevel === "low"
                                        ? "bg-cyber-green/20 text-cyber-green border-cyber-green/30"
                                        : currentPrediction.riskLevel ===
                                            "medium"
                                          ? "bg-cyber-yellow/20 text-cyber-yellow border-cyber-yellow/30"
                                          : "bg-cyber-red/20 text-cyber-red border-cyber-red/30",
                                    )}
                                  >
                                    {currentPrediction.riskLevel.toUpperCase()}
                                  </Badge>
                                </div>
                              </div>
                            </div>

                            {/* AI Reasoning */}
                            <div>
                              <h4 className="text-lg font-semibold text-white mb-4 flex items-center">
                                <Lightbulb className="h-5 w-5 mr-2 text-cyber-blue" />
                                AI Reasoning
                              </h4>
                              <div className="space-y-3">
                                {currentPrediction.reasoning.map(
                                  (reason, index) => (
                                    <motion.div
                                      key={index}
                                      initial={{ opacity: 0, x: -20 }}
                                      animate={{ opacity: 1, x: 0 }}
                                      transition={{ delay: index * 0.1 }}
                                      className="flex items-start space-x-3"
                                    >
                                      <CheckCircle className="h-4 w-4 text-cyber-green mt-1 flex-shrink-0" />
                                      <span className="text-white/80 text-sm">
                                        {reason}
                                      </span>
                                    </motion.div>
                                  ),
                                )}
                              </div>

                              <div className="mt-6 p-4 bg-white/5 rounded-xl border border-cyber-blue/20">
                                <div className="flex items-center justify-between mb-2">
                                  <span className="text-white/80 text-sm">
                                    AI Model
                                  </span>
                                  <span className="text-cyber-blue text-sm">
                                    {currentPrediction.aiModel}
                                  </span>
                                </div>
                                <div className="flex items-center justify-between">
                                  <span className="text-white/80 text-sm">
                                    Accuracy Rate
                                  </span>
                                  <span className="text-cyber-green text-sm font-medium">
                                    {currentPrediction.accuracy}%
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Card>
                      )}
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="analysis" className="mt-6">
                  <Card className="p-6 bg-white/5 backdrop-blur-md border border-cyber-purple/20">
                    <h3 className="text-xl font-bold text-white mb-4">
                      Technical Analysis
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="text-lg font-semibold text-white mb-3">
                          Key Metrics
                        </h4>
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-white/70">P/E Ratio</span>
                            <span className="text-white font-medium">
                              {company.pe.toFixed(1)}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-white/70">Beta</span>
                            <span className="text-white font-medium">
                              {company.beta.toFixed(2)}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-white/70">Market Cap</span>
                            <span className="text-white font-medium">
                              {company.marketCap}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-white/70">Volume</span>
                            <span className="text-white font-medium">
                              {(company.volume / 1000000).toFixed(1)}M
                            </span>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-white mb-3">
                          Analyst Ratings
                        </h4>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-white/70">Buy</span>
                            <div className="flex items-center space-x-2">
                              <div className="w-16 h-2 bg-white/10 rounded-full overflow-hidden">
                                <div className="w-3/4 h-full bg-cyber-green"></div>
                              </div>
                              <span className="text-cyber-green text-sm">
                                15
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-white/70">Hold</span>
                            <div className="flex items-center space-x-2">
                              <div className="w-16 h-2 bg-white/10 rounded-full overflow-hidden">
                                <div className="w-1/2 h-full bg-cyber-yellow"></div>
                              </div>
                              <span className="text-cyber-yellow text-sm">
                                8
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-white/70">Sell</span>
                            <div className="flex items-center space-x-2">
                              <div className="w-16 h-2 bg-white/10 rounded-full overflow-hidden">
                                <div className="w-1/4 h-full bg-cyber-red"></div>
                              </div>
                              <span className="text-cyber-red text-sm">3</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                </TabsContent>

                <TabsContent value="signals" className="mt-6">
                  {currentPrediction && (
                    <Card className="p-6 bg-white/5 backdrop-blur-md border border-cyber-green/20">
                      <h3 className="text-xl font-bold text-white mb-6">
                        Signal Strength Analysis
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {Object.entries(currentPrediction.signals).map(
                          ([signal, strength]) => (
                            <motion.div
                              key={signal}
                              initial={{ opacity: 0, scale: 0.9 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{
                                delay:
                                  Object.keys(
                                    currentPrediction.signals,
                                  ).indexOf(signal) * 0.1,
                              }}
                              className="p-4 bg-white/5 rounded-xl border border-white/10"
                            >
                              <div className="flex items-center justify-between mb-3">
                                <span className="text-white capitalize font-medium">
                                  {signal}
                                </span>
                                <span className="text-cyber-blue font-bold">
                                  {strength}%
                                </span>
                              </div>
                              <Progress
                                value={strength}
                                className="h-2 bg-white/10"
                              />
                              <div className="flex justify-between text-xs text-white/60 mt-2">
                                <span>Weak</span>
                                <span>Strong</span>
                              </div>
                            </motion.div>
                          ),
                        )}
                      </div>
                    </Card>
                  )}
                </TabsContent>
              </Tabs>
            </motion.div>
          </div>

          {/* Right Column - News and Additional Info */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card className="p-6 bg-white/5 backdrop-blur-md border border-cyber-blue/20">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center">
                  <Eye className="h-5 w-5 mr-2 text-cyber-blue" />
                  Quick Overview
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-white/70">Current Price</span>
                    <span className="text-xl font-bold text-white">
                      ${company.price.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-white/70">Day Change</span>
                    <span
                      className={cn(
                        "font-medium",
                        company.change >= 0
                          ? "text-cyber-green"
                          : "text-cyber-red",
                      )}
                    >
                      {company.change >= 0 ? "+" : ""}$
                      {company.change.toFixed(2)} (
                      {company.changePercent.toFixed(2)}%)
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-white/70">Sector</span>
                    <Badge className="bg-cyber-purple/20 text-cyber-purple border-cyber-purple/30 capitalize">
                      {company.sector}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-white/70">Country</span>
                    <span className="text-white">{company.country}</span>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* News Impact */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Card className="p-6 bg-white/5 backdrop-blur-md border border-cyber-purple/20">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center">
                  <Calendar className="h-5 w-5 mr-2 text-cyber-purple" />
                  Recent News Impact
                </h3>
                <div className="space-y-3">
                  {newsImpacts.slice(0, 4).map((news, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 + index * 0.1 }}
                      className="p-3 bg-white/5 rounded-lg border border-white/10"
                    >
                      <div className="flex items-start space-x-3">
                        <div
                          className={cn(
                            "w-2 h-2 rounded-full mt-2",
                            news.impact === "positive"
                              ? "bg-cyber-green"
                              : news.impact === "negative"
                                ? "bg-cyber-red"
                                : "bg-cyber-blue",
                          )}
                        ></div>
                        <div className="flex-1">
                          <p className="text-white text-sm font-medium">
                            {news.title}
                          </p>
                          <div className="flex justify-between items-center mt-2">
                            <span className="text-white/60 text-xs">
                              {news.date.toLocaleDateString()}
                            </span>
                            <div className="flex items-center space-x-1">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <div
                                  key={i}
                                  className={cn(
                                    "w-1 h-3 rounded-full",
                                    i < news.importance
                                      ? "bg-cyber-blue"
                                      : "bg-white/20",
                                  )}
                                ></div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </Card>
            </motion.div>

            {/* Upgrade Prompt for Free Users */}
            {!isPaid && (
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 }}
              >
                <Card className="p-6 bg-gradient-to-br from-cyber-green/20 to-cyber-blue/20 border border-cyber-green/30">
                  <div className="text-center">
                    <Shield className="h-12 w-12 text-cyber-green mx-auto mb-4" />
                    <h3 className="text-lg font-bold text-white mb-2">
                      Unlock Advanced Predictions
                    </h3>
                    <p className="text-cyber-blue/80 text-sm mb-4">
                      Get real-time alerts, unlimited predictions, and advanced
                      AI insights
                    </p>
                    <Button
                      onClick={() =>
                        (window.location.href =
                          "/payment?plan=Professional&price=29&billing=monthly&source=prediction")
                      }
                      className="w-full bg-gradient-to-r from-cyber-green to-cyber-blue hover:from-cyber-green-dark hover:to-cyber-blue-dark text-white"
                    >
                      <Zap className="mr-2 h-4 w-4" />
                      Upgrade Now
                    </Button>
                  </div>
                </Card>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyPrediction;
