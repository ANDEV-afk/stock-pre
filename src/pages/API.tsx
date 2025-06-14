import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navigation from "@/components/Navigation";
import ApiDocumentation from "@/components/ApiDocumentation";
import BasicApiDocumentation from "@/components/BasicApiDocumentation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Code,
  Copy,
  CheckCircle,
  Eye,
  EyeOff,
  Key,
  Book,
  Zap,
  Shield,
  Globe,
  Database,
  BarChart3,
  TrendingUp,
  DollarSign,
  Clock,
  Users,
  Activity,
  Server,
  FileText,
  Play,
  Download,
  ExternalLink,
  Terminal,
  Bookmark,
  Settings,
  AlertCircle,
  Bell,
  Target,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface APIEndpoint {
  id: string;
  method: "GET" | "POST" | "PUT" | "DELETE";
  path: string;
  description: string;
  category: string;
  auth: boolean;
  rateLimit: string;
  parameters?: {
    name: string;
    type: string;
    required: boolean;
    description: string;
  }[];
  headers?: { name: string; value: string; description: string }[];
  response: string;
  example: {
    request: string;
    response: string;
  };
}

const API = () => {
  const [selectedCategory, setSelectedCategory] = useState("market-data");
  const [selectedEndpoint, setSelectedEndpoint] = useState<APIEndpoint | null>(
    null,
  );
  const [apiKey, setApiKey] = useState("sk_live_51abc123def456ghi789jkl...");
  const [showApiKey, setShowApiKey] = useState(false);
  const [copiedStates, setCopiedStates] = useState<{ [key: string]: boolean }>(
    {},
  );
  const [activeTab, setActiveTab] = useState("overview");

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

  const categories = [
    { id: "market-data", label: "Market Data", icon: BarChart3, count: 8 },
    { id: "trading", label: "Trading", icon: TrendingUp, count: 6 },
    { id: "portfolio", label: "Portfolio", icon: DollarSign, count: 5 },
    { id: "analytics", label: "Analytics", icon: Activity, count: 4 },
    { id: "user", label: "User Management", icon: Users, count: 3 },
  ];

  const endpoints: APIEndpoint[] = [
    {
      id: "get-stock-price",
      method: "GET",
      path: "/api/v1/stocks/{symbol}/price",
      description: "Get real-time stock price for a specific symbol",
      category: "market-data",
      auth: true,
      rateLimit: "100 requests/minute",
      parameters: [
        {
          name: "symbol",
          type: "string",
          required: true,
          description: "Stock symbol (e.g., AAPL, TSLA)",
        },
        {
          name: "interval",
          type: "string",
          required: false,
          description: "Data interval: 1m, 5m, 15m, 1h, 1d",
        },
      ],
      headers: [
        {
          name: "Authorization",
          value: "Bearer {api_key}",
          description: "Your API key for authentication",
        },
        {
          name: "Content-Type",
          value: "application/json",
          description: "Content type header",
        },
      ],
      response:
        "Stock price data with timestamp, open, high, low, close, volume",
      example: {
        request: `curl -X GET "https://api.stockvision.com/v1/stocks/AAPL/price" \\
  -H "Authorization: Bearer sk_live_51abc123..." \\
  -H "Content-Type: application/json"`,
        response: `{
  "symbol": "AAPL",
  "price": 174.55,
  "change": -1.02,
  "change_percent": -0.58,
  "timestamp": "2024-01-15T16:00:00Z",
  "market_status": "open",
  "volume": 45678901,
  "market_cap": "2.89T"
}`,
      },
    },
    {
      id: "get-historical-data",
      method: "GET",
      path: "/api/v1/stocks/{symbol}/historical",
      description: "Get historical stock data with customizable time range",
      category: "market-data",
      auth: true,
      rateLimit: "50 requests/minute",
      parameters: [
        {
          name: "symbol",
          type: "string",
          required: true,
          description: "Stock symbol",
        },
        {
          name: "from",
          type: "string",
          required: true,
          description: "Start date (YYYY-MM-DD)",
        },
        {
          name: "to",
          type: "string",
          required: true,
          description: "End date (YYYY-MM-DD)",
        },
        {
          name: "interval",
          type: "string",
          required: false,
          description: "Data interval",
        },
      ],
      response: "Array of historical price data",
      example: {
        request: `curl -X GET "https://api.stockvision.com/v1/stocks/AAPL/historical?from=2024-01-01&to=2024-01-15" \\
  -H "Authorization: Bearer sk_live_51abc123..."`,
        response: `{
  "symbol": "AAPL",
  "data": [
    {
      "date": "2024-01-15",
      "open": 175.20,
      "high": 176.80,
      "low": 174.10,
      "close": 174.55,
      "volume": 45678901
    }
  ],
  "count": 15
}`,
      },
    },
    {
      id: "ai-prediction",
      method: "GET",
      path: "/api/v1/predictions/{symbol}",
      description: "Get AI-powered stock predictions with confidence intervals",
      category: "analytics",
      auth: true,
      rateLimit: "25 requests/minute",
      parameters: [
        {
          name: "symbol",
          type: "string",
          required: true,
          description: "Stock symbol",
        },
        {
          name: "timeframe",
          type: "string",
          required: false,
          description: "Prediction timeframe: 1d, 1w, 1m, 3m",
        },
      ],
      response: "AI prediction data with confidence levels",
      example: {
        request: `curl -X GET "https://api.stockvision.com/v1/predictions/AAPL?timeframe=1w" \\
  -H "Authorization: Bearer sk_live_51abc123..."`,
        response: `{
  "symbol": "AAPL",
  "prediction": {
    "target_price": 182.50,
    "direction": "bullish",
    "confidence": 0.85,
    "timeframe": "1w",
    "reasoning": [
      "Strong technical indicators",
      "Positive earnings momentum",
      "Market sentiment analysis"
    ]
  },
  "generated_at": "2024-01-15T16:00:00Z"
}`,
      },
    },
    {
      id: "place-order",
      method: "POST",
      path: "/api/v1/trading/orders",
      description: "Place a new trading order",
      category: "trading",
      auth: true,
      rateLimit: "10 requests/minute",
      parameters: [
        {
          name: "symbol",
          type: "string",
          required: true,
          description: "Stock symbol",
        },
        {
          name: "side",
          type: "string",
          required: true,
          description: "Order side: buy or sell",
        },
        {
          name: "quantity",
          type: "number",
          required: true,
          description: "Number of shares",
        },
        {
          name: "type",
          type: "string",
          required: true,
          description: "Order type: market, limit, stop",
        },
        {
          name: "price",
          type: "number",
          required: false,
          description: "Limit price (for limit orders)",
        },
      ],
      response: "Order confirmation with order ID",
      example: {
        request: `curl -X POST "https://api.stockvision.com/v1/trading/orders" \\
  -H "Authorization: Bearer sk_live_51abc123..." \\
  -H "Content-Type: application/json" \\
  -d '{
    "symbol": "AAPL",
    "side": "buy",
    "quantity": 10,
    "type": "market"
  }'`,
        response: `{
  "order_id": "ord_abc123def456",
  "status": "filled",
  "symbol": "AAPL",
  "side": "buy",
  "quantity": 10,
  "filled_quantity": 10,
  "average_price": 174.55,
  "total_value": 1745.50,
  "created_at": "2024-01-15T16:00:00Z"
}`,
      },
    },
    {
      id: "get-portfolio",
      method: "GET",
      path: "/api/v1/portfolio",
      description: "Get current portfolio holdings and performance",
      category: "portfolio",
      auth: true,
      rateLimit: "100 requests/minute",
      response: "Portfolio summary with holdings and performance metrics",
      example: {
        request: `curl -X GET "https://api.stockvision.com/v1/portfolio" \\
  -H "Authorization: Bearer sk_live_51abc123..."`,
        response: `{
  "total_value": 125750.30,
  "day_change": 1250.45,
  "day_change_percent": 1.01,
  "holdings": [
    {
      "symbol": "AAPL",
      "quantity": 50,
      "average_cost": 165.20,
      "current_price": 174.55,
      "market_value": 8727.50,
      "unrealized_pnl": 467.50
    }
  ]
}`,
      },
    },
    {
      id: "market-movers",
      method: "GET",
      path: "/api/v1/markets/movers",
      description: "Get top market movers (gainers, losers, most active)",
      category: "market-data",
      auth: true,
      rateLimit: "50 requests/minute",
      parameters: [
        {
          name: "type",
          type: "string",
          required: false,
          description: "Mover type: gainers, losers, active",
        },
        {
          name: "limit",
          type: "number",
          required: false,
          description: "Number of results (max 50)",
        },
      ],
      response: "List of top market movers",
      example: {
        request: `curl -X GET "https://api.stockvision.com/v1/markets/movers?type=gainers&limit=10" \\
  -H "Authorization: Bearer sk_live_51abc123..."`,
        response: `{
  "type": "gainers",
  "data": [
    {
      "symbol": "NVDA",
      "name": "NVIDIA Corporation",
      "price": 721.33,
      "change": 15.43,
      "change_percent": 2.19,
      "volume": 32456789
    }
  ]
}`,
      },
    },
  ];

  const filteredEndpoints =
    selectedCategory === "all"
      ? endpoints
      : endpoints.filter((endpoint) => endpoint.category === selectedCategory);

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

  const generateApiKey = () => {
    const newKey = `sk_live_${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`;
    setApiKey(newKey);
  };

  return (
    <div className="min-h-screen bg-cyber-black cyber-grid">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyber-blue via-white to-cyber-purple bg-clip-text text-transparent mb-6">
            StockVision API
          </h1>
          <p className="text-xl text-cyber-blue/90 max-w-3xl mx-auto mb-8">
            Powerful REST API for real-time market data, AI predictions, and
            automated trading
          </p>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
            {[
              {
                icon: Zap,
                label: "99.9% Uptime",
                value: "SLA Guaranteed",
                color: "cyber-green",
              },
              {
                icon: Globe,
                label: "Global Coverage",
                value: "50+ Markets",
                color: "cyber-blue",
              },
              {
                icon: Database,
                label: "Data Points",
                value: "10M+ Daily",
                color: "cyber-purple",
              },
              {
                icon: Shield,
                label: "Enterprise Security",
                value: "SOC 2 Certified",
                color: "cyber-yellow",
              },
            ].map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white/5 backdrop-blur-md border border-cyber-blue/20 rounded-2xl p-6 text-center"
                >
                  <Icon className={`h-8 w-8 text-${stat.color} mx-auto mb-3`} />
                  <div className={`text-2xl font-bold text-${stat.color} mb-1`}>
                    {stat.value}
                  </div>
                  <div className="text-white/70 text-sm">{stat.label}</div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-8"
        >
          <TabsList className="grid w-full grid-cols-5 bg-white/10 backdrop-blur-md border border-cyber-blue/20">
            <TabsTrigger
              value="overview"
              className="data-[state=active]:bg-cyber-blue data-[state=active]:text-white"
            >
              <Book className="h-4 w-4 mr-2" />
              Overview
            </TabsTrigger>
            <TabsTrigger
              value="documentation"
              className="data-[state=active]:bg-cyber-purple data-[state=active]:text-white"
            >
              <FileText className="h-4 w-4 mr-2" />
              Full Docs
            </TabsTrigger>
            <TabsTrigger
              value="endpoints"
              className="data-[state=active]:bg-cyber-green data-[state=active]:text-white"
            >
              <Code className="h-4 w-4 mr-2" />
              Endpoints
            </TabsTrigger>
            <TabsTrigger
              value="authentication"
              className="data-[state=active]:bg-cyber-yellow data-[state=active]:text-white"
            >
              <Key className="h-4 w-4 mr-2" />
              Authentication
            </TabsTrigger>
            <TabsTrigger
              value="playground"
              className="data-[state=active]:bg-cyber-blue data-[state=active]:text-white"
            >
              <Play className="h-4 w-4 mr-2" />
              Playground
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-8">
            <BasicApiDocumentation
              onViewFullDocs={() => setActiveTab("documentation")}
            />
          </TabsContent>

          {/* Full Documentation Tab */}
          <TabsContent value="documentation" className="space-y-8">
            <ApiDocumentation />
          </TabsContent>

          {/* Endpoints Tab */}
          <TabsContent value="endpoints" className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Category Sidebar */}
              <div className="lg:col-span-1">
                <Card className="p-6 bg-white/10 backdrop-blur-md border border-cyber-blue/20 sticky top-8">
                  <h3 className="text-white font-semibold mb-4">Categories</h3>
                  <div className="space-y-2">
                    {categories.map((category) => {
                      const Icon = category.icon;
                      return (
                        <button
                          key={category.id}
                          onClick={() => setSelectedCategory(category.id)}
                          className={cn(
                            "w-full text-left px-3 py-2 rounded-lg transition-all duration-200 flex items-center justify-between",
                            selectedCategory === category.id
                              ? "bg-cyber-blue/20 text-cyber-blue"
                              : "text-white/70 hover:bg-white/5 hover:text-white",
                          )}
                        >
                          <div className="flex items-center space-x-2">
                            <Icon className="h-4 w-4" />
                            <span>{category.label}</span>
                          </div>
                          <Badge className="bg-white/10 text-white/70 border-white/20">
                            {category.count}
                          </Badge>
                        </button>
                      );
                    })}
                  </div>
                </Card>
              </div>

              {/* Endpoints List */}
              <div className="lg:col-span-3">
                <div className="space-y-4">
                  {filteredEndpoints.map((endpoint, index) => (
                    <motion.div
                      key={endpoint.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card className="p-6 bg-white/10 backdrop-blur-md border border-cyber-blue/20 hover:border-cyber-blue/40 transition-all duration-300">
                        <div className="flex justify-between items-start mb-4">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <Badge
                                className={getMethodColor(endpoint.method)}
                              >
                                {endpoint.method}
                              </Badge>
                              <code className="text-cyber-blue bg-black/30 px-2 py-1 rounded text-sm">
                                {endpoint.path}
                              </code>
                              {endpoint.auth && (
                                <Badge className="bg-cyber-yellow/20 text-cyber-yellow border-cyber-yellow/30">
                                  <Key className="h-3 w-3 mr-1" />
                                  Auth Required
                                </Badge>
                              )}
                            </div>
                            <p className="text-white/80 mb-2">
                              {endpoint.description}
                            </p>
                            <div className="flex items-center space-x-4 text-sm text-white/60">
                              <span>Rate limit: {endpoint.rateLimit}</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex justify-between items-center">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setSelectedEndpoint(endpoint)}
                            className="border-cyber-blue/30 text-cyber-blue hover:bg-cyber-blue/10"
                          >
                            <FileText className="h-4 w-4 mr-2" />
                            View Details
                          </Button>
                          <Button
                            size="sm"
                            onClick={() =>
                              copyToClipboard(
                                endpoint.example.request,
                                `endpoint-${endpoint.id}`,
                              )
                            }
                            className="bg-cyber-green/20 border border-cyber-green/30 text-cyber-green hover:bg-cyber-green/30"
                          >
                            {copiedStates[`endpoint-${endpoint.id}`] ? (
                              <>
                                <CheckCircle className="h-4 w-4 mr-2" />
                                Copied!
                              </>
                            ) : (
                              <>
                                <Copy className="h-4 w-4 mr-2" />
                                Copy Example
                              </>
                            )}
                          </Button>
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Authentication Tab */}
          <TabsContent value="authentication" className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card className="p-8 bg-white/10 backdrop-blur-md border border-cyber-blue/20">
                <h3 className="text-2xl font-bold text-white mb-6">
                  API Key Management
                </h3>

                <div className="space-y-4">
                  <div>
                    <Label className="text-white text-sm mb-2 block">
                      Your API Key
                    </Label>
                    <div className="flex space-x-2">
                      <Input
                        type={showApiKey ? "text" : "password"}
                        value={apiKey}
                        readOnly
                        className="bg-black/50 border-cyber-blue/30 text-white font-mono"
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setShowApiKey(!showApiKey)}
                        className="border-cyber-blue/30 text-cyber-blue hover:bg-cyber-blue/10"
                      >
                        {showApiKey ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => copyToClipboard(apiKey, "api-key")}
                        className="border-cyber-green/30 text-cyber-green hover:bg-cyber-green/10"
                      >
                        {copiedStates["api-key"] ? (
                          <CheckCircle className="h-4 w-4" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>

                  <Button
                    onClick={generateApiKey}
                    className="bg-gradient-to-r from-cyber-blue to-cyber-purple hover:from-cyber-blue-dark hover:to-cyber-purple-dark text-white"
                  >
                    <Key className="h-4 w-4 mr-2" />
                    Generate New Key
                  </Button>
                </div>

                <div className="mt-8 p-4 bg-cyber-yellow/10 rounded-lg border border-cyber-yellow/20">
                  <div className="flex items-center space-x-2 mb-2">
                    <AlertCircle className="h-5 w-5 text-cyber-yellow" />
                    <h4 className="text-cyber-yellow font-semibold">
                      Security Notice
                    </h4>
                  </div>
                  <p className="text-cyber-yellow/80 text-sm">
                    Keep your API key secure and never share it publicly. Use
                    environment variables in production.
                  </p>
                </div>
              </Card>

              <Card className="p-8 bg-white/10 backdrop-blur-md border border-cyber-blue/20">
                <h3 className="text-2xl font-bold text-white mb-6">
                  Authentication Examples
                </h3>

                <div className="space-y-6">
                  <div>
                    <h4 className="text-white font-semibold mb-2">cURL</h4>
                    <div className="bg-black/50 rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <code className="text-cyber-green text-sm font-mono">
                          curl -H "Authorization: Bearer {apiKey}" \<br />
                          &nbsp;&nbsp;"https://api.stockvision.com/v1/stocks/AAPL/price"
                        </code>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() =>
                            copyToClipboard(
                              `curl -H "Authorization: Bearer ${apiKey}" "https://api.stockvision.com/v1/stocks/AAPL/price"`,
                              "curl-auth",
                            )
                          }
                          className="text-white/70 hover:text-white ml-2"
                        >
                          {copiedStates["curl-auth"] ? (
                            <CheckCircle className="h-4 w-4" />
                          ) : (
                            <Copy className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-white font-semibold mb-2">
                      JavaScript
                    </h4>
                    <div className="bg-black/50 rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <code className="text-cyber-green text-sm font-mono">
                          const response = await fetch(
                          <br />
                          &nbsp;&nbsp;'https://api.stockvision.com/v1/stocks/AAPL/price',
                          <br />
                          &nbsp;&nbsp;
                          {`{ headers: { 'Authorization': 'Bearer ${apiKey}' } }`}
                          <br />
                          );
                        </code>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() =>
                            copyToClipboard(
                              `const response = await fetch('https://api.stockvision.com/v1/stocks/AAPL/price', { headers: { 'Authorization': 'Bearer ${apiKey}' } });`,
                              "js-auth",
                            )
                          }
                          className="text-white/70 hover:text-white ml-2"
                        >
                          {copiedStates["js-auth"] ? (
                            <CheckCircle className="h-4 w-4" />
                          ) : (
                            <Copy className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-white font-semibold mb-2">Python</h4>
                    <div className="bg-black/50 rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <code className="text-cyber-green text-sm font-mono">
                          import requests
                          <br />
                          <br />
                          headers = {`{'Authorization': 'Bearer ${apiKey}'}`}
                          <br />
                          response = requests.get(
                          <br />
                          &nbsp;&nbsp;'https://api.stockvision.com/v1/stocks/AAPL/price',
                          <br />
                          &nbsp;&nbsp;headers=headers
                          <br />)
                        </code>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() =>
                            copyToClipboard(
                              `import requests\n\nheaders = {'Authorization': 'Bearer ${apiKey}'}\nresponse = requests.get('https://api.stockvision.com/v1/stocks/AAPL/price', headers=headers)`,
                              "python-auth",
                            )
                          }
                          className="text-white/70 hover:text-white ml-2"
                        >
                          {copiedStates["python-auth"] ? (
                            <CheckCircle className="h-4 w-4" />
                          ) : (
                            <Copy className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>

          {/* Playground Tab */}
          <TabsContent value="playground" className="space-y-8">
            <Card className="p-8 bg-white/10 backdrop-blur-md border border-cyber-blue/20">
              <h3 className="text-2xl font-bold text-white mb-6">
                API Playground & Demo View
              </h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-white font-semibold mb-4">
                    Try Live Requests
                  </h4>
                  <div className="space-y-4">
                    <div>
                      <Label className="text-white text-sm mb-2 block">
                        Endpoint
                      </Label>
                      <select className="w-full px-3 py-2 bg-black/50 border border-cyber-blue/30 rounded-md text-white">
                        <option value="stocks/price">Get Stock Price</option>
                        <option value="stocks/historical">
                          Historical Data
                        </option>
                        <option value="predictions">AI Predictions</option>
                        <option value="portfolio">Portfolio</option>
                        <option value="market-movers">Market Movers</option>
                        <option value="trading/orders">Place Order</option>
                      </select>
                    </div>

                    <div>
                      <Label className="text-white text-sm mb-2 block">
                        Stock Symbol
                      </Label>
                      <Input
                        placeholder="AAPL"
                        className="bg-black/50 border-cyber-blue/30 text-white"
                      />
                    </div>

                    <div>
                      <Label className="text-white text-sm mb-2 block">
                        Request Type
                      </Label>
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-cyber-blue/30 text-cyber-blue hover:bg-cyber-blue/10 flex-1"
                        >
                          <Terminal className="h-4 w-4 mr-2" />
                          Live Request
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-cyber-purple/30 text-cyber-purple hover:bg-cyber-purple/10 flex-1"
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          Demo View
                        </Button>
                      </div>
                    </div>

                    <Button className="w-full bg-gradient-to-r from-cyber-green to-cyber-blue hover:from-cyber-green-dark hover:to-cyber-blue-dark text-white">
                      <Play className="h-4 w-4 mr-2" />
                      Send Request
                    </Button>

                    <div className="mt-6 p-4 bg-cyber-blue/10 rounded-lg border border-cyber-blue/20">
                      <h5 className="text-cyber-blue font-semibold mb-2 flex items-center">
                        <Eye className="h-4 w-4 mr-2" />
                        Demo Features
                      </h5>
                      <ul className="text-white/80 text-sm space-y-1">
                        <li>• Real-time data visualization</li>
                        <li>• Interactive charts and graphs</li>
                        <li>• Sample trading scenarios</li>
                        <li>• API response examples</li>
                        <li>• Performance metrics</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-white font-semibold">Response</h4>
                    <div className="flex items-center space-x-2">
                      <Badge className="bg-cyber-green/20 text-cyber-green border-cyber-green/30">
                        200 OK
                      </Badge>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() =>
                          copyToClipboard(
                            JSON.stringify(
                              {
                                symbol: "AAPL",
                                price: 174.55,
                                change: -1.02,
                                change_percent: -0.58,
                                timestamp: "2024-01-15T16:00:00Z",
                                market_status: "open",
                                volume: 45678901,
                              },
                              null,
                              2,
                            ),
                            "playground-response",
                          )
                        }
                        className="text-white/70 hover:text-white"
                      >
                        {copiedStates["playground-response"] ? (
                          <CheckCircle className="h-4 w-4" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>
                  <div className="bg-black/50 rounded-lg p-4 h-64 overflow-y-auto border border-cyber-blue/20">
                    <code className="text-cyber-green text-sm font-mono whitespace-pre">
                      {JSON.stringify(
                        {
                          symbol: "AAPL",
                          price: 174.55,
                          change: -1.02,
                          change_percent: -0.58,
                          timestamp: "2024-01-15T16:00:00Z",
                          market_status: "open",
                          volume: 45678901,
                          market_cap: "2.89T",
                          day_high: 176.8,
                          day_low: 174.1,
                          "52_week_high": 198.23,
                          "52_week_low": 124.17,
                        },
                        null,
                        2,
                      )}
                    </code>
                  </div>

                  <div className="mt-4 p-4 bg-white/5 rounded-lg">
                    <h5 className="text-cyber-purple font-semibold mb-2">
                      Demo Visualization
                    </h5>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="bg-cyber-green/10 rounded p-3 text-center">
                        <div className="text-cyber-green font-bold text-lg">
                          $174.55
                        </div>
                        <div className="text-white/70">Current Price</div>
                      </div>
                      <div className="bg-cyber-red/10 rounded p-3 text-center">
                        <div className="text-cyber-red font-bold text-lg">
                          -0.58%
                        </div>
                        <div className="text-white/70">Today's Change</div>
                      </div>
                      <div className="bg-cyber-blue/10 rounded p-3 text-center">
                        <div className="text-cyber-blue font-bold text-lg">
                          45.7M
                        </div>
                        <div className="text-white/70">Volume</div>
                      </div>
                      <div className="bg-cyber-purple/10 rounded p-3 text-center">
                        <div className="text-cyber-purple font-bold text-lg">
                          $2.89T
                        </div>
                        <div className="text-white/70">Market Cap</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Interactive Demo Scenarios */}
            <Card className="p-8 bg-white/10 backdrop-blur-md border border-cyber-blue/20">
              <h3 className="text-xl font-bold text-white mb-6">
                Interactive Demo Scenarios
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  {
                    title: "Real-time Trading",
                    description: "Simulate live trading with real market data",
                    icon: Activity,
                    color: "cyber-green",
                  },
                  {
                    title: "Portfolio Analysis",
                    description: "Analyze portfolio performance and metrics",
                    icon: BarChart3,
                    color: "cyber-blue",
                  },
                  {
                    title: "AI Predictions",
                    description: "View AI-powered market predictions",
                    icon: TrendingUp,
                    color: "cyber-purple",
                  },
                ].map((scenario, index) => {
                  const Icon = scenario.icon;
                  return (
                    <motion.div
                      key={index}
                      whileHover={{ scale: 1.05 }}
                      className="bg-white/5 rounded-lg p-6 border border-cyber-blue/20 hover:border-cyber-blue/40 transition-all cursor-pointer"
                    >
                      <Icon className={`h-8 w-8 text-${scenario.color} mb-4`} />
                      <h4 className="text-white font-semibold mb-2">
                        {scenario.title}
                      </h4>
                      <p className="text-white/70 text-sm mb-4">
                        {scenario.description}
                      </p>
                      <Button
                        size="sm"
                        className={`bg-${scenario.color}/20 border border-${scenario.color}/30 text-${scenario.color} hover:bg-${scenario.color}/30`}
                      >
                        <Play className="h-4 w-4 mr-2" />
                        Try Demo
                      </Button>
                    </motion.div>
                  );
                })}
              </div>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Endpoint Details Modal */}
        <AnimatePresence>
          {selectedEndpoint && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedEndpoint(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-cyber-dark border border-cyber-blue/30 rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-8">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <div className="flex items-center space-x-3 mb-2">
                        <Badge
                          className={getMethodColor(selectedEndpoint.method)}
                        >
                          {selectedEndpoint.method}
                        </Badge>
                        <code className="text-cyber-blue bg-black/30 px-2 py-1 rounded">
                          {selectedEndpoint.path}
                        </code>
                      </div>
                      <p className="text-white/80">
                        {selectedEndpoint.description}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedEndpoint(null)}
                      className="text-white/70 hover:text-white"
                    >
                      <X className="h-5 w-5" />
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="space-y-6">
                      {selectedEndpoint.parameters && (
                        <div>
                          <h4 className="text-lg font-semibold text-white mb-3">
                            Parameters
                          </h4>
                          <div className="space-y-3">
                            {selectedEndpoint.parameters.map((param, index) => (
                              <div
                                key={index}
                                className="bg-white/5 rounded-lg p-3"
                              >
                                <div className="flex items-center space-x-2 mb-1">
                                  <code className="text-cyber-blue">
                                    {param.name}
                                  </code>
                                  <Badge className="bg-cyber-purple/20 text-cyber-purple border-cyber-purple/30 text-xs">
                                    {param.type}
                                  </Badge>
                                  {param.required && (
                                    <Badge className="bg-cyber-red/20 text-cyber-red border-cyber-red/30 text-xs">
                                      Required
                                    </Badge>
                                  )}
                                </div>
                                <p className="text-white/70 text-sm">
                                  {param.description}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {selectedEndpoint.headers && (
                        <div>
                          <h4 className="text-lg font-semibold text-white mb-3">
                            Headers
                          </h4>
                          <div className="space-y-3">
                            {selectedEndpoint.headers.map((header, index) => (
                              <div
                                key={index}
                                className="bg-white/5 rounded-lg p-3"
                              >
                                <div className="flex items-center justify-between mb-1">
                                  <code className="text-cyber-blue">
                                    {header.name}
                                  </code>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() =>
                                      copyToClipboard(
                                        header.value,
                                        `header-${index}`,
                                      )
                                    }
                                    className="text-white/70 hover:text-white"
                                  >
                                    {copiedStates[`header-${index}`] ? (
                                      <CheckCircle className="h-3 w-3" />
                                    ) : (
                                      <Copy className="h-3 w-3" />
                                    )}
                                  </Button>
                                </div>
                                <code className="text-cyber-green text-sm">
                                  {header.value}
                                </code>
                                <p className="text-white/70 text-sm mt-1">
                                  {header.description}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="space-y-6">
                      <div>
                        <h4 className="text-lg font-semibold text-white mb-3">
                          Example Request
                        </h4>
                        <div className="bg-black/50 rounded-lg p-4">
                          <div className="flex justify-between items-start mb-2">
                            <span className="text-cyber-blue text-sm font-semibold">
                              cURL
                            </span>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() =>
                                copyToClipboard(
                                  selectedEndpoint.example.request,
                                  "request-example",
                                )
                              }
                              className="text-white/70 hover:text-white"
                            >
                              {copiedStates["request-example"] ? (
                                <CheckCircle className="h-4 w-4" />
                              ) : (
                                <Copy className="h-4 w-4" />
                              )}
                            </Button>
                          </div>
                          <code className="text-cyber-green text-sm font-mono whitespace-pre-wrap">
                            {selectedEndpoint.example.request}
                          </code>
                        </div>
                      </div>

                      <div>
                        <h4 className="text-lg font-semibold text-white mb-3">
                          Example Response
                        </h4>
                        <div className="bg-black/50 rounded-lg p-4">
                          <div className="flex justify-between items-start mb-2">
                            <span className="text-cyber-blue text-sm font-semibold">
                              JSON
                            </span>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() =>
                                copyToClipboard(
                                  selectedEndpoint.example.response,
                                  "response-example",
                                )
                              }
                              className="text-white/70 hover:text-white"
                            >
                              {copiedStates["response-example"] ? (
                                <CheckCircle className="h-4 w-4" />
                              ) : (
                                <Copy className="h-4 w-4" />
                              )}
                            </Button>
                          </div>
                          <code className="text-cyber-green text-sm font-mono whitespace-pre-wrap">
                            {selectedEndpoint.example.response}
                          </code>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default API;
