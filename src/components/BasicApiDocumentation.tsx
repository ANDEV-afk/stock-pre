import { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Code,
  Copy,
  CheckCircle,
  Book,
  BarChart3,
  TrendingUp,
  DollarSign,
  Bell,
  Activity,
  Key,
  ExternalLink,
  ArrowRight,
  Zap,
  Shield,
  Globe,
  Database,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface BasicEndpoint {
  id: string;
  method: "GET" | "POST" | "PUT" | "DELETE";
  path: string;
  description: string;
  category: string;
  example: string;
}

const BASIC_ENDPOINTS: BasicEndpoint[] = [
  {
    id: "stock-price",
    method: "GET",
    path: "/api/v1/stocks/{symbol}/price",
    description: "Get real-time stock price data",
    category: "Market Data",
    example: `curl -X GET "https://api.stockvision.com/v1/stocks/AAPL/price" \\
  -H "Authorization: Bearer YOUR_API_KEY"`,
  },
  {
    id: "ai-prediction",
    method: "GET",
    path: "/api/v1/predictions/{symbol}",
    description: "Get AI-powered stock predictions",
    category: "AI Analytics",
    example: `curl -X GET "https://api.stockvision.com/v1/predictions/AAPL" \\
  -H "Authorization: Bearer YOUR_API_KEY"`,
  },
  {
    id: "create-alert",
    method: "POST",
    path: "/api/v1/alerts",
    description: "Create personalized price alerts",
    category: "Price Alerts",
    example: `curl -X POST "https://api.stockvision.com/v1/alerts" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{"symbol": "AAPL", "type": "price_above", "value": 180}'`,
  },
  {
    id: "portfolio",
    method: "GET",
    path: "/api/v1/portfolio",
    description: "Get portfolio holdings and performance",
    category: "Portfolio",
    example: `curl -X GET "https://api.stockvision.com/v1/portfolio" \\
  -H "Authorization: Bearer YOUR_API_KEY"`,
  },
  {
    id: "market-data",
    method: "GET",
    path: "/api/v1/markets/movers",
    description: "Get top market movers and trends",
    category: "Market Data",
    example: `curl -X GET "https://api.stockvision.com/v1/markets/movers?type=gainers" \\
  -H "Authorization: Bearer YOUR_API_KEY"`,
  },
  {
    id: "historical-data",
    method: "GET",
    path: "/api/v1/stocks/{symbol}/historical",
    description: "Get historical stock data",
    category: "Market Data",
    example: `curl -X GET "https://api.stockvision.com/v1/stocks/AAPL/historical?from=2024-01-01" \\
  -H "Authorization: Bearer YOUR_API_KEY"`,
  },
];

interface BasicApiDocumentationProps {
  className?: string;
  onViewFullDocs?: () => void;
}

const BasicApiDocumentation = ({
  className,
  onViewFullDocs,
}: BasicApiDocumentationProps) => {
  const [copiedStates, setCopiedStates] = useState<{ [key: string]: boolean }>(
    {},
  );

  const copyToClipboard = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedStates((prev) => ({ ...prev, [id]: true }));
      setTimeout(() => {
        setCopiedStates((prev) => ({ ...prev, [id]: false }));
      }, 2000);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  const getMethodColor = (method: string) => {
    switch (method) {
      case "GET":
        return "bg-cyber-green/20 text-cyber-green border-cyber-green/30";
      case "POST":
        return "bg-cyber-blue/20 text-cyber-blue border-cyber-blue/30";
      case "PUT":
        return "bg-cyber-yellow/20 text-cyber-yellow border-cyber-yellow/30";
      case "DELETE":
        return "bg-cyber-red/20 text-cyber-red border-cyber-red/30";
      default:
        return "bg-cyber-blue/20 text-cyber-blue border-cyber-blue/30";
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Market Data":
        return BarChart3;
      case "AI Analytics":
        return Activity;
      case "Price Alerts":
        return Bell;
      case "Portfolio":
        return DollarSign;
      default:
        return Code;
    }
  };

  const categories = [...new Set(BASIC_ENDPOINTS.map((e) => e.category))];

  return (
    <div className={cn("space-y-8", className)}>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h2 className="text-3xl font-bold bg-gradient-to-r from-cyber-blue via-white to-cyber-purple bg-clip-text text-transparent mb-4">
          Quick Start API Guide
        </h2>
        <p className="text-cyber-blue/90 max-w-2xl mx-auto mb-6">
          Get started with the most commonly used StockVision API endpoints
        </p>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { icon: Zap, label: "99.9% Uptime", color: "cyber-green" },
            { icon: Globe, label: "50+ Markets", color: "cyber-blue" },
            { icon: Database, label: "10M+ Daily", color: "cyber-purple" },
            { icon: Shield, label: "SOC 2", color: "cyber-yellow" },
          ].map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/5 backdrop-blur-md border border-cyber-blue/20 rounded-xl p-4 text-center"
              >
                <Icon className={`h-6 w-6 text-${stat.color} mx-auto mb-2`} />
                <div className={`text-sm font-medium text-${stat.color}`}>
                  {stat.label}
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Categories Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
      >
        {categories.map((category, index) => {
          const Icon = getCategoryIcon(category);
          const count = BASIC_ENDPOINTS.filter(
            (e) => e.category === category,
          ).length;

          return (
            <Card
              key={category}
              className="p-4 bg-white/10 backdrop-blur-md border border-cyber-blue/20 text-center"
            >
              <Icon className="h-8 w-8 text-cyber-blue mx-auto mb-3" />
              <h3 className="text-white font-semibold mb-1">{category}</h3>
              <p className="text-cyber-blue/70 text-sm">{count} endpoints</p>
            </Card>
          );
        })}
      </motion.div>

      {/* Essential Endpoints */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="space-y-6"
      >
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-bold text-white">Essential Endpoints</h3>
          <Button
            onClick={onViewFullDocs}
            className="bg-gradient-to-r from-cyber-purple to-cyber-blue hover:from-cyber-purple-dark hover:to-cyber-blue-dark text-white"
          >
            <Book className="h-4 w-4 mr-2" />
            View Full Documentation
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {BASIC_ENDPOINTS.map((endpoint, index) => {
            const Icon = getCategoryIcon(endpoint.category);

            return (
              <motion.div
                key={endpoint.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-6 bg-white/10 backdrop-blur-md border border-cyber-blue/20 hover:border-cyber-blue/40 transition-all duration-300 h-full">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-cyber-blue/20 rounded-lg">
                        <Icon className="h-5 w-5 text-cyber-blue" />
                      </div>
                      <div>
                        <Badge className={getMethodColor(endpoint.method)}>
                          {endpoint.method}
                        </Badge>
                        <Badge className="ml-2 bg-cyber-purple/20 text-cyber-purple border-cyber-purple/30">
                          {endpoint.category}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <code className="text-cyber-blue bg-black/30 px-2 py-1 rounded text-sm font-mono block mb-2">
                      {endpoint.path}
                    </code>
                    <p className="text-white/80">{endpoint.description}</p>
                  </div>

                  <div className="bg-black/30 rounded-lg p-3 mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-cyber-green text-xs font-semibold">
                        EXAMPLE
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() =>
                          copyToClipboard(endpoint.example, endpoint.id)
                        }
                        className="text-white/70 hover:text-white p-1"
                      >
                        {copiedStates[endpoint.id] ? (
                          <CheckCircle className="h-4 w-4 text-cyber-green" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                    <code className="text-cyber-green text-xs font-mono whitespace-pre-wrap block">
                      {endpoint.example}
                    </code>
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full border-cyber-blue/30 text-cyber-blue hover:bg-cyber-blue/10"
                  >
                    Try in Playground
                  </Button>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Getting Started */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-8"
      >
        <Card className="p-6 bg-white/10 backdrop-blur-md border border-cyber-blue/20">
          <h4 className="text-xl font-bold text-white mb-4 flex items-center">
            <Key className="h-5 w-5 mr-2 text-cyber-blue" />
            Quick Start
          </h4>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-cyber-blue rounded-full flex items-center justify-center text-white text-xs font-bold">
                1
              </div>
              <div>
                <h5 className="text-white font-semibold">Get API Key</h5>
                <p className="text-white/70 text-sm">
                  Sign up and generate your API key from the dashboard
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-cyber-blue rounded-full flex items-center justify-center text-white text-xs font-bold">
                2
              </div>
              <div>
                <h5 className="text-white font-semibold">Make First Request</h5>
                <p className="text-white/70 text-sm">
                  Use any endpoint above to fetch real-time data
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-cyber-blue rounded-full flex items-center justify-center text-white text-xs font-bold">
                3
              </div>
              <div>
                <h5 className="text-white font-semibold">Build Amazing Apps</h5>
                <p className="text-white/70 text-sm">
                  Create trading bots, analytics dashboards, and more
                </p>
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-white/10 backdrop-blur-md border border-cyber-blue/20">
          <h4 className="text-xl font-bold text-white mb-4">Need More?</h4>
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Book className="h-5 w-5 text-cyber-purple" />
              <div>
                <h5 className="text-white font-semibold">Full Documentation</h5>
                <p className="text-white/70 text-sm">
                  Complete API reference with all endpoints
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Code className="h-5 w-5 text-cyber-green" />
              <div>
                <h5 className="text-white font-semibold">SDK Libraries</h5>
                <p className="text-white/70 text-sm">
                  JavaScript, Python, and cURL examples
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Activity className="h-5 w-5 text-cyber-yellow" />
              <div>
                <h5 className="text-white font-semibold">
                  Interactive Playground
                </h5>
                <p className="text-white/70 text-sm">
                  Test endpoints with live data
                </p>
              </div>
            </div>
          </div>

          <Button
            onClick={onViewFullDocs}
            className="w-full mt-6 bg-gradient-to-r from-cyber-green to-cyber-blue hover:from-cyber-green-dark hover:to-cyber-blue-dark text-white"
          >
            <ExternalLink className="h-4 w-4 mr-2" />
            Explore Full Documentation
          </Button>
        </Card>
      </motion.div>

      {/* Response Example */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <Card className="p-6 bg-white/10 backdrop-blur-md border border-cyber-blue/20">
          <h4 className="text-xl font-bold text-white mb-4">
            Example Response
          </h4>
          <div className="bg-black/50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-cyber-green text-sm font-semibold">
                GET /api/v1/stocks/AAPL/price
              </span>
              <Badge className="bg-cyber-green/20 text-cyber-green border-cyber-green/30">
                200 OK
              </Badge>
            </div>
            <code className="text-cyber-green text-sm font-mono whitespace-pre-wrap block">
              {`{
  "symbol": "AAPL",
  "price": 174.55,
  "change": -1.02,
  "change_percent": -0.58,
  "timestamp": "2024-01-15T16:00:00Z",
  "market_status": "open",
  "volume": 45678901,
  "market_cap": "2.89T"
}`}
            </code>
          </div>
        </Card>
      </motion.div>
    </div>
  );
};

export default BasicApiDocumentation;
