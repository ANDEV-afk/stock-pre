import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import {
  Code,
  Copy,
  CheckCircle,
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
  Key,
  Eye,
  EyeOff,
  Target,
  Info,
  Link,
  Hash,
  Lock,
  Unlock,
  MessageSquare,
  Bell,
  Filter,
  Search,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface APIEndpoint {
  id: string;
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
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
  queryParams?: {
    name: string;
    type: string;
    required: boolean;
    description: string;
    example?: string;
  }[];
  requestBody?: { type: string; description: string; example: string };
  responses: { code: number; description: string; example: string }[];
  examples: {
    request: string;
    response: string;
    description?: string;
  }[];
  sdkExamples?: {
    javascript: string;
    python: string;
    curl: string;
    php?: string;
  };
}

const COMPREHENSIVE_ENDPOINTS: APIEndpoint[] = [
  {
    id: "get-stock-price",
    method: "GET",
    path: "/api/v1/stocks/{symbol}/price",
    description:
      "Get real-time stock price data with comprehensive market information",
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
    ],
    queryParams: [
      {
        name: "interval",
        type: "string",
        required: false,
        description: "Data interval",
        example: "1m, 5m, 15m, 1h, 1d",
      },
      {
        name: "extended",
        type: "boolean",
        required: false,
        description: "Include extended market data",
        example: "true",
      },
      {
        name: "fields",
        type: "string",
        required: false,
        description: "Comma-separated list of fields to include",
        example: "price,volume,change",
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
    responses: [
      {
        code: 200,
        description: "Success - Returns real-time stock price data",
        example: `{
  "symbol": "AAPL",
  "price": 174.55,
  "change": -1.02,
  "change_percent": -0.58,
  "timestamp": "2024-01-15T16:00:00Z",
  "market_status": "open",
  "volume": 45678901,
  "market_cap": "2.89T",
  "day_high": 176.80,
  "day_low": 174.10,
  "52_week_high": 198.23,
  "52_week_low": 124.17,
  "pe_ratio": 28.5,
  "dividend_yield": 0.52,
  "beta": 1.25,
  "earnings_date": "2024-02-01T16:00:00Z"
}`,
      },
      {
        code: 404,
        description: "Stock symbol not found",
        example: `{
  "error": "SYMBOL_NOT_FOUND",
  "message": "Stock symbol not found",
  "code": 404
}`,
      },
      {
        code: 429,
        description: "Rate limit exceeded",
        example: `{
  "error": "RATE_LIMIT_EXCEEDED",
  "message": "Rate limit exceeded",
  "retry_after": 60
}`,
      },
    ],
    examples: [
      {
        request: `curl -X GET "https://api.stockvision.com/v1/stocks/AAPL/price" \\
  -H "Authorization: Bearer sk_live_51abc123..." \\
  -H "Content-Type: application/json"`,
        response: `{
  "symbol": "AAPL",
  "price": 174.55,
  "change": -1.02,
  "change_percent": -0.58,
  "timestamp": "2024-01-15T16:00:00Z",
  "market_status": "open"
}`,
        description: "Basic stock price request",
      },
      {
        request: `curl -X GET "https://api.stockvision.com/v1/stocks/AAPL/price?extended=true&fields=price,volume,change,market_cap" \\
  -H "Authorization: Bearer sk_live_51abc123..."`,
        response: `{
  "symbol": "AAPL",
  "price": 174.55,
  "change": -1.02,
  "change_percent": -0.58,
  "volume": 45678901,
  "market_cap": "2.89T",
  "day_high": 176.80,
  "day_low": 174.10
}`,
        description: "Extended data with specific fields",
      },
    ],
    sdkExamples: {
      javascript: `const stockvision = require('@stockvision/api');
const client = new stockvision.Client('sk_live_51abc123...');

const price = await client.stocks.getPrice('AAPL', {
  extended: true,
  fields: ['price', 'volume', 'change']
});

console.log(price);`,
      python: `import stockvision

client = stockvision.Client('sk_live_51abc123...')

price = client.stocks.get_price('AAPL',
  extended=True,
  fields=['price', 'volume', 'change']
)

print(price)`,
      curl: `curl -X GET "https://api.stockvision.com/v1/stocks/AAPL/price?extended=true" \\
  -H "Authorization: Bearer sk_live_51abc123..." \\
  -H "Content-Type: application/json"`,
    },
  },
  {
    id: "create-price-alert",
    method: "POST",
    path: "/api/v1/alerts",
    description:
      "Create personalized price alerts for stocks with advanced triggering conditions",
    category: "alerts",
    auth: true,
    rateLimit: "50 requests/minute",
    requestBody: {
      type: "application/json",
      description: "Alert configuration object",
      example: `{
  "symbol": "AAPL",
  "type": "price_above",
  "value": 180.00,
  "condition": "once",
  "notification_methods": ["email", "push"],
  "priority": "high",
  "description": "Apple breakout alert",
  "metadata": {
    "stop_loss": 170.00,
    "take_profit": 200.00
  }
}`,
    },
    responses: [
      {
        code: 201,
        description: "Alert created successfully",
        example: `{
  "id": "alert_abc123def456",
  "symbol": "AAPL",
  "type": "price_above",
  "value": 180.00,
  "current_price": 174.55,
  "status": "active",
  "created_at": "2024-01-15T16:00:00Z",
  "condition": "once",
  "notification_methods": ["email", "push"],
  "priority": "high",
  "description": "Apple breakout alert"
}`,
      },
    ],
    examples: [
      {
        request: `curl -X POST "https://api.stockvision.com/v1/alerts" \\
  -H "Authorization: Bearer sk_live_51abc123..." \\
  -H "Content-Type: application/json" \\
  -d '{
    "symbol": "AAPL",
    "type": "price_above",
    "value": 180.00,
    "condition": "once",
    "notification_methods": ["email", "push"],
    "priority": "high"
  }'`,
        response: `{
  "id": "alert_abc123def456",
  "symbol": "AAPL",
  "type": "price_above",
  "value": 180.00,
  "status": "active",
  "created_at": "2024-01-15T16:00:00Z"
}`,
        description: "Create a price breakout alert",
      },
    ],
    sdkExamples: {
      javascript: `const alert = await client.alerts.create({
  symbol: 'AAPL',
  type: 'price_above',
  value: 180.00,
  condition: 'once',
  notificationMethods: ['email', 'push'],
  priority: 'high',
  description: 'Apple breakout alert'
});

console.log('Alert created:', alert.id);`,
      python: `alert = client.alerts.create(
  symbol='AAPL',
  type='price_above',
  value=180.00,
  condition='once',
  notification_methods=['email', 'push'],
  priority='high',
  description='Apple breakout alert'
)

print(f'Alert created: {alert.id}')`,
      curl: `curl -X POST "https://api.stockvision.com/v1/alerts" \\
  -H "Authorization: Bearer sk_live_51abc123..." \\
  -H "Content-Type: application/json" \\
  -d '{"symbol": "AAPL", "type": "price_above", "value": 180.00}'`,
    },
  },
  {
    id: "get-alerts",
    method: "GET",
    path: "/api/v1/alerts",
    description: "Retrieve all user price alerts with filtering and pagination",
    category: "alerts",
    auth: true,
    rateLimit: "100 requests/minute",
    queryParams: [
      {
        name: "status",
        type: "string",
        required: false,
        description: "Filter by alert status",
        example: "active, triggered, paused",
      },
      {
        name: "symbol",
        type: "string",
        required: false,
        description: "Filter by stock symbol",
        example: "AAPL",
      },
      {
        name: "priority",
        type: "string",
        required: false,
        description: "Filter by priority level",
        example: "high, medium, low",
      },
      {
        name: "page",
        type: "number",
        required: false,
        description: "Page number for pagination",
        example: "1",
      },
      {
        name: "limit",
        type: "number",
        required: false,
        description: "Number of alerts per page",
        example: "20",
      },
    ],
    responses: [
      {
        code: 200,
        description: "List of user alerts",
        example: `{
  "alerts": [
    {
      "id": "alert_abc123def456",
      "symbol": "AAPL",
      "type": "price_above",
      "value": 180.00,
      "current_price": 174.55,
      "status": "active",
      "created_at": "2024-01-15T16:00:00Z",
      "priority": "high",
      "description": "Apple breakout alert",
      "progress": 97.1
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 15,
    "pages": 1
  }
}`,
      },
    ],
    examples: [
      {
        request: `curl -X GET "https://api.stockvision.com/v1/alerts?status=active&priority=high" \\
  -H "Authorization: Bearer sk_live_51abc123..."`,
        response: `{
  "alerts": [...],
  "pagination": {...}
}`,
        description: "Get active high-priority alerts",
      },
    ],
    sdkExamples: {
      javascript: `const alerts = await client.alerts.list({
  status: 'active',
  priority: 'high',
  limit: 20
});

alerts.forEach(alert => {
  console.log(\`Alert \$\{alert.id\}: \$\{alert.symbol\} @ \$\{alert.value\}\`);
});`,
      python: `alerts = client.alerts.list(
  status='active',
  priority='high',
  limit=20
)

for alert in alerts:
    print(f'Alert {{alert.id}}: {{alert.symbol}} @ {{alert.value}}')`,
      curl: `curl -X GET "https://api.stockvision.com/v1/alerts?status=active" \\
  -H "Authorization: Bearer sk_live_51abc123..."`,
    },
  },
  {
    id: "ai-prediction",
    method: "GET",
    path: "/api/v1/predictions/{symbol}",
    description:
      "Get AI-powered stock predictions with confidence intervals and reasoning",
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
    ],
    queryParams: [
      {
        name: "timeframe",
        type: "string",
        required: false,
        description: "Prediction timeframe",
        example: "1d, 1w, 1m, 3m, 6m, 1y",
      },
      {
        name: "model",
        type: "string",
        required: false,
        description: "AI model version",
        example: "v3.2, v3.1, legacy",
      },
      {
        name: "include_reasoning",
        type: "boolean",
        required: false,
        description: "Include AI reasoning",
        example: "true",
      },
    ],
    responses: [
      {
        code: 200,
        description: "AI prediction data",
        example: `{
  "symbol": "AAPL",
  "prediction": {
    "target_price": 182.50,
    "direction": "bullish",
    "confidence": 0.85,
    "timeframe": "1w",
    "price_range": {
      "low": 177.30,
      "high": 187.70
    },
    "reasoning": [
      "Strong technical indicators",
      "Positive earnings momentum",
      "Market sentiment analysis"
    ],
    "signals": {
      "technical": 82,
      "fundamental": 78,
      "sentiment": 89,
      "macro": 71
    },
    "risk_factors": [
      "Market volatility",
      "Sector rotation risk"
    ]
  },
  "model": "StockVision AI v3.2",
  "accuracy_rate": 87.3,
  "generated_at": "2024-01-15T16:00:00Z"
}`,
      },
    ],
    examples: [
      {
        request: `curl -X GET "https://api.stockvision.com/v1/predictions/AAPL?timeframe=1w&include_reasoning=true" \\
  -H "Authorization: Bearer sk_live_51abc123..."`,
        response: `{
  "symbol": "AAPL",
  "prediction": {
    "target_price": 182.50,
    "direction": "bullish",
    "confidence": 0.85
  }
}`,
        description: "Get weekly prediction with reasoning",
      },
    ],
    sdkExamples: {
      javascript: `const prediction = await client.predictions.get('AAPL', {
  timeframe: '1w',
  includeReasoning: true
});

console.log(\`Target: \$\${prediction.target_price}\`);
console.log(\`Confidence: \${prediction.confidence * 100}%\`);`,
      python: `prediction = client.predictions.get('AAPL',
  timeframe='1w',
  include_reasoning=True
)

print(f'Target: {{prediction.target_price}}')
print(f'Confidence: {{prediction.confidence * 100}}%')`,
      curl: `curl -X GET "https://api.stockvision.com/v1/predictions/AAPL?timeframe=1w" \\
  -H "Authorization: Bearer sk_live_51abc123..."`,
    },
  },
  {
    id: "create-watchlist",
    method: "POST",
    path: "/api/v1/watchlists",
    description: "Create a custom watchlist with multiple stocks",
    category: "portfolio",
    auth: true,
    rateLimit: "20 requests/minute",
    requestBody: {
      type: "application/json",
      description: "Watchlist configuration",
      example: `{
  "name": "Tech Giants",
  "description": "Large-cap technology stocks",
  "symbols": ["AAPL", "GOOGL", "MSFT", "AMZN"],
  "public": false,
  "alerts_enabled": true,
  "auto_rebalance": false
}`,
    },
    responses: [
      {
        code: 201,
        description: "Watchlist created successfully",
        example: `{
  "id": "watchlist_123abc456def",
  "name": "Tech Giants",
  "description": "Large-cap technology stocks",
  "symbols": ["AAPL", "GOOGL", "MSFT", "AMZN"],
  "public": false,
  "alerts_enabled": true,
  "created_at": "2024-01-15T16:00:00Z",
  "performance": {
    "total_return": 12.5,
    "best_performer": "NVDA",
    "worst_performer": "META"
  }
}`,
      },
    ],
    examples: [
      {
        request: `curl -X POST "https://api.stockvision.com/v1/watchlists" \\
  -H "Authorization: Bearer sk_live_51abc123..." \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "Tech Giants",
    "symbols": ["AAPL", "GOOGL", "MSFT"],
    "alerts_enabled": true
  }'`,
        response: `{
  "id": "watchlist_123abc456def",
  "name": "Tech Giants",
  "symbols": ["AAPL", "GOOGL", "MSFT"],
  "created_at": "2024-01-15T16:00:00Z"
}`,
        description: "Create a technology stocks watchlist",
      },
    ],
    sdkExamples: {
      javascript: `const watchlist = await client.watchlists.create({
  name: 'Tech Giants',
  description: 'Large-cap technology stocks',
  symbols: ['AAPL', 'GOOGL', 'MSFT', 'AMZN'],
  alertsEnabled: true
});

console.log('Watchlist created:', watchlist.id);`,
      python: `watchlist = client.watchlists.create(
  name='Tech Giants',
  description='Large-cap technology stocks',
  symbols=['AAPL', 'GOOGL', 'MSFT', 'AMZN'],
  alerts_enabled=True
)

print(f'Watchlist created: {watchlist.id}')`,
      curl: `curl -X POST "https://api.stockvision.com/v1/watchlists" \\
  -H "Authorization: Bearer sk_live_51abc123..." \\
  -d '{"name": "Tech Giants", "symbols": ["AAPL", "GOOGL"]}'`,
    },
  },
  {
    id: "market-news",
    method: "GET",
    path: "/api/v1/news",
    description:
      "Get market news with sentiment analysis and stock impact scoring",
    category: "market-data",
    auth: true,
    rateLimit: "100 requests/minute",
    queryParams: [
      {
        name: "symbol",
        type: "string",
        required: false,
        description: "Filter by stock symbol",
        example: "AAPL",
      },
      {
        name: "category",
        type: "string",
        required: false,
        description: "News category",
        example: "earnings, mergers, analyst",
      },
      {
        name: "sentiment",
        type: "string",
        required: false,
        description: "Filter by sentiment",
        example: "positive, negative, neutral",
      },
      {
        name: "impact",
        type: "string",
        required: false,
        description: "Filter by impact level",
        example: "high, medium, low",
      },
      {
        name: "limit",
        type: "number",
        required: false,
        description: "Number of articles",
        example: "20",
      },
    ],
    responses: [
      {
        code: 200,
        description: "Market news with analysis",
        example: `{
  "news": [
    {
      "id": "news_abc123",
      "headline": "Apple Reports Record Quarter",
      "summary": "Apple Inc. reported record quarterly earnings...",
      "published_at": "2024-01-15T14:30:00Z",
      "source": "Reuters",
      "sentiment": {
        "score": 0.85,
        "label": "positive"
      },
      "impact": {
        "score": 8.5,
        "level": "high",
        "affected_stocks": ["AAPL"]
      },
      "category": "earnings",
      "url": "https://reuters.com/article/..."
    }
  ],
  "metadata": {
    "total": 150,
    "sentiment_distribution": {
      "positive": 60,
      "neutral": 45,
      "negative": 45
    }
  }
}`,
      },
    ],
    examples: [
      {
        request: `curl -X GET "https://api.stockvision.com/v1/news?symbol=AAPL&impact=high&limit=10" \\
  -H "Authorization: Bearer sk_live_51abc123..."`,
        response: `{
  "news": [...],
  "metadata": {...}
}`,
        description: "Get high-impact news for Apple",
      },
    ],
    sdkExamples: {
      javascript: `const news = await client.news.get({
  symbol: 'AAPL',
  impact: 'high',
  sentiment: 'positive',
  limit: 10
});

news.forEach(article => {
  console.log(\`\$\{article.headline\} - Impact: \$\{article.impact.score\}\`);
});
});`,
      python: `news = client.news.get(
  symbol='AAPL',
  impact='high',
  sentiment='positive',
  limit=10
)

for article in news:
    print(f'{{article.headline}} - Impact: {{article.impact.score}}')
    print(f'{article.headline} - Impact: {article.impact.score}')`,
      curl: `curl -X GET "https://api.stockvision.com/v1/news?symbol=AAPL&impact=high" \\
  -H "Authorization: Bearer sk_live_51abc123..."`,
    },
  },
];

const CATEGORIES = [
  {
    id: "all",
    label: "All Endpoints",
    icon: Book,
    count: COMPREHENSIVE_ENDPOINTS.length,
  },
  {
    id: "market-data",
    label: "Market Data",
    icon: BarChart3,
    count: COMPREHENSIVE_ENDPOINTS.filter((e) => e.category === "market-data")
      .length,
  },
  {
    id: "alerts",
    label: "Price Alerts",
    icon: Bell,
    count: COMPREHENSIVE_ENDPOINTS.filter((e) => e.category === "alerts")
      .length,
  },
  {
    id: "analytics",
    label: "AI Analytics",
    icon: Activity,
    count: COMPREHENSIVE_ENDPOINTS.filter((e) => e.category === "analytics")
      .length,
  },
  {
    id: "portfolio",
    label: "Portfolio",
    icon: DollarSign,
    count: COMPREHENSIVE_ENDPOINTS.filter((e) => e.category === "portfolio")
      .length,
  },
  {
    id: "trading",
    label: "Trading",
    icon: TrendingUp,
    count: COMPREHENSIVE_ENDPOINTS.filter((e) => e.category === "trading")
      .length,
  },
];

interface ApiDocumentationProps {
  className?: string;
}

const ApiDocumentation = ({ className }: ApiDocumentationProps) => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedEndpoint, setSelectedEndpoint] = useState<APIEndpoint | null>(
    null,
  );
  const [copiedStates, setCopiedStates] = useState<{ [key: string]: boolean }>(
    {},
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [activeLanguage, setActiveLanguage] = useState<
    "javascript" | "python" | "curl"
  >("javascript");

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

  const filteredEndpoints = COMPREHENSIVE_ENDPOINTS.filter((endpoint) => {
    const matchesCategory =
      selectedCategory === "all" || endpoint.category === selectedCategory;
    const matchesSearch =
      !searchQuery ||
      endpoint.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      endpoint.path.toLowerCase().includes(searchQuery.toLowerCase()) ||
      endpoint.method.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

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
      case "PATCH":
        return "bg-cyber-purple/20 text-cyber-purple border-cyber-purple/30";
      default:
        return "bg-cyber-blue/20 text-cyber-blue border-cyber-blue/30";
    }
  };

  return (
    <div className={cn("space-y-8", className)}>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h2 className="text-3xl font-bold bg-gradient-to-r from-cyber-blue via-white to-cyber-purple bg-clip-text text-transparent mb-4">
          Complete API Documentation
        </h2>
        <p className="text-cyber-blue/90 max-w-2xl mx-auto">
          Comprehensive documentation for all StockVision API endpoints
          including real-time data, AI predictions, and price alerts
        </p>
      </motion.div>

      {/* Search and Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex flex-col md:flex-row gap-4 items-center justify-between"
      >
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/50" />
          <input
            type="text"
            placeholder="Search endpoints..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white/10 border border-cyber-blue/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-cyber-blue"
          />
        </div>

        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-white/70" />
          <span className="text-white/70 text-sm">Filter by category:</span>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Categories Sidebar */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-1"
        >
          <Card className="p-6 bg-white/10 backdrop-blur-md border border-cyber-blue/20 sticky top-8">
            <h3 className="text-white font-semibold mb-4 flex items-center">
              <Book className="h-5 w-5 mr-2 text-cyber-blue" />
              API Categories
            </h3>
            <div className="space-y-2">
              {CATEGORIES.map((category) => {
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

            <Separator className="my-6" />

            <div className="space-y-3">
              <h4 className="text-white font-medium text-sm">Quick Links</h4>
              <div className="space-y-2 text-sm">
                <a
                  href="#authentication"
                  className="block text-cyber-blue hover:text-cyber-blue-light transition-colors"
                >
                  Authentication Guide
                </a>
                <a
                  href="#rate-limits"
                  className="block text-cyber-blue hover:text-cyber-blue-light transition-colors"
                >
                  Rate Limits
                </a>
                <a
                  href="#webhooks"
                  className="block text-cyber-blue hover:text-cyber-blue-light transition-colors"
                >
                  Webhooks
                </a>
                <a
                  href="#sdk"
                  className="block text-cyber-blue hover:text-cyber-blue-light transition-colors"
                >
                  SDK Libraries
                </a>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Endpoints List */}
        <div className="lg:col-span-3">
          <div className="space-y-4">
            {filteredEndpoints.length === 0 ? (
              <Card className="p-8 bg-white/5 backdrop-blur-md border border-cyber-blue/20 text-center">
                <Search className="h-12 w-12 text-white/50 mx-auto mb-4" />
                <p className="text-white/70">
                  No endpoints found matching your search.
                </p>
                <p className="text-white/50 text-sm mt-2">
                  Try adjusting your search terms or category filter.
                </p>
              </Card>
            ) : (
              filteredEndpoints.map((endpoint, index) => (
                <motion.div
                  key={endpoint.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="p-6 bg-white/10 backdrop-blur-md border border-cyber-blue/20 hover:border-cyber-blue/40 transition-all duration-300">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-3">
                          <Badge className={getMethodColor(endpoint.method)}>
                            {endpoint.method}
                          </Badge>
                          <code className="text-cyber-blue bg-black/30 px-3 py-1 rounded text-sm font-mono">
                            {endpoint.path}
                          </code>
                          {endpoint.auth && (
                            <Badge className="bg-cyber-yellow/20 text-cyber-yellow border-cyber-yellow/30">
                              <Lock className="h-3 w-3 mr-1" />
                              Auth Required
                            </Badge>
                          )}
                        </div>
                        <p className="text-white/80 mb-3">
                          {endpoint.description}
                        </p>
                        <div className="flex items-center space-x-4 text-sm text-white/60">
                          <span className="flex items-center">
                            <Clock className="h-3 w-3 mr-1" />
                            {endpoint.rateLimit}
                          </span>
                          <span className="flex items-center">
                            <Hash className="h-3 w-3 mr-1" />
                            {endpoint.category}
                          </span>
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
                      <div className="flex space-x-2">
                        {endpoint.examples[0] && (
                          <Button
                            size="sm"
                            onClick={() =>
                              copyToClipboard(
                                endpoint.examples[0].request,
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
                                Copy cURL
                              </>
                            )}
                          </Button>
                        )}
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-cyber-purple/30 text-cyber-purple hover:bg-cyber-purple/10"
                        >
                          <Play className="h-4 w-4 mr-2" />
                          Try It
                        </Button>
                      </div>
                    </div>

                    {/* Quick Preview */}
                    {endpoint.examples[0] && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="mt-4 p-3 bg-black/30 rounded-lg border border-white/10"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-cyber-green text-xs font-semibold">
                            EXAMPLE REQUEST
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() =>
                              copyToClipboard(
                                endpoint.examples[0].request,
                                `preview-${endpoint.id}`,
                              )
                            }
                            className="text-white/70 hover:text-white p-1"
                          >
                            {copiedStates[`preview-${endpoint.id}`] ? (
                              <CheckCircle className="h-3 w-3" />
                            ) : (
                              <Copy className="h-3 w-3" />
                            )}
                          </Button>
                        </div>
                        <code className="text-cyber-green text-xs font-mono block overflow-x-auto">
                          {endpoint.examples[0].request.split("\n")[0]}...
                        </code>
                      </motion.div>
                    )}
                  </Card>
                </motion.div>
              ))
            )}
          </div>
        </div>
      </div>

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
              className="bg-cyber-dark border border-cyber-blue/30 rounded-3xl max-w-6xl w-full max-h-[90vh] overflow-y-auto"
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
                      <code className="text-cyber-blue bg-black/30 px-3 py-1 rounded font-mono">
                        {selectedEndpoint.path}
                      </code>
                    </div>
                    <p className="text-white/80 text-lg">
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

                <Tabs defaultValue="overview" className="w-full">
                  <TabsList className="grid w-full grid-cols-4 bg-white/10 backdrop-blur-md border border-cyber-blue/20">
                    <TabsTrigger
                      value="overview"
                      className="data-[state=active]:bg-cyber-blue data-[state=active]:text-white"
                    >
                      <Info className="h-4 w-4 mr-2" />
                      Overview
                    </TabsTrigger>
                    <TabsTrigger
                      value="examples"
                      className="data-[state=active]:bg-cyber-green data-[state=active]:text-white"
                    >
                      <Code className="h-4 w-4 mr-2" />
                      Examples
                    </TabsTrigger>
                    <TabsTrigger
                      value="responses"
                      className="data-[state=active]:bg-cyber-purple data-[state=active]:text-white"
                    >
                      <FileText className="h-4 w-4 mr-2" />
                      Responses
                    </TabsTrigger>
                    <TabsTrigger
                      value="sdk"
                      className="data-[state=active]:bg-cyber-yellow data-[state=active]:text-white"
                    >
                      <Terminal className="h-4 w-4 mr-2" />
                      SDK
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="overview" className="mt-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {/* Parameters */}
                      {(selectedEndpoint.parameters ||
                        selectedEndpoint.queryParams) && (
                        <div>
                          <h4 className="text-lg font-semibold text-white mb-3">
                            Parameters
                          </h4>
                          <div className="space-y-3">
                            {selectedEndpoint.parameters?.map(
                              (param, index) => (
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
                              ),
                            )}
                            {selectedEndpoint.queryParams?.map(
                              (param, index) => (
                                <div
                                  key={`query-${index}`}
                                  className="bg-white/5 rounded-lg p-3"
                                >
                                  <div className="flex items-center space-x-2 mb-1">
                                    <code className="text-cyber-green">
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
                                  {param.example && (
                                    <p className="text-cyber-blue/80 text-xs mt-1">
                                      Example: {param.example}
                                    </p>
                                  )}
                                </div>
                              ),
                            )}
                          </div>
                        </div>
                      )}

                      {/* Request Body */}
                      {selectedEndpoint.requestBody && (
                        <div>
                          <h4 className="text-lg font-semibold text-white mb-3">
                            Request Body
                          </h4>
                          <div className="bg-white/5 rounded-lg p-3">
                            <div className="flex items-center space-x-2 mb-2">
                              <Badge className="bg-cyber-blue/20 text-cyber-blue border-cyber-blue/30">
                                {selectedEndpoint.requestBody.type}
                              </Badge>
                            </div>
                            <p className="text-white/70 text-sm mb-3">
                              {selectedEndpoint.requestBody.description}
                            </p>
                            <div className="bg-black/50 rounded-lg p-3">
                              <code className="text-cyber-green text-sm font-mono whitespace-pre">
                                {selectedEndpoint.requestBody.example}
                              </code>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </TabsContent>

                  <TabsContent value="examples" className="mt-6">
                    <div className="space-y-6">
                      {selectedEndpoint.examples.map((example, index) => (
                        <div
                          key={index}
                          className="border border-cyber-blue/20 rounded-lg p-4"
                        >
                          {example.description && (
                            <h5 className="text-white font-semibold mb-3">
                              {example.description}
                            </h5>
                          )}

                          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                            <div>
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-cyber-blue text-sm font-semibold">
                                  REQUEST
                                </span>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() =>
                                    copyToClipboard(
                                      example.request,
                                      `request-${index}`,
                                    )
                                  }
                                  className="text-white/70 hover:text-white"
                                >
                                  {copiedStates[`request-${index}`] ? (
                                    <CheckCircle className="h-4 w-4" />
                                  ) : (
                                    <Copy className="h-4 w-4" />
                                  )}
                                </Button>
                              </div>
                              <div className="bg-black/50 rounded-lg p-3">
                                <code className="text-cyber-green text-sm font-mono whitespace-pre-wrap">
                                  {example.request}
                                </code>
                              </div>
                            </div>

                            <div>
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-cyber-green text-sm font-semibold">
                                  RESPONSE
                                </span>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() =>
                                    copyToClipboard(
                                      example.response,
                                      `response-${index}`,
                                    )
                                  }
                                  className="text-white/70 hover:text-white"
                                >
                                  {copiedStates[`response-${index}`] ? (
                                    <CheckCircle className="h-4 w-4" />
                                  ) : (
                                    <Copy className="h-4 w-4" />
                                  )}
                                </Button>
                              </div>
                              <div className="bg-black/50 rounded-lg p-3">
                                <code className="text-cyber-green text-sm font-mono whitespace-pre-wrap">
                                  {example.response}
                                </code>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="responses" className="mt-6">
                    <div className="space-y-4">
                      {selectedEndpoint.responses.map((response, index) => (
                        <div
                          key={index}
                          className="border border-cyber-purple/20 rounded-lg p-4"
                        >
                          <div className="flex items-center space-x-3 mb-3">
                            <Badge
                              className={cn(
                                response.code >= 200 && response.code < 300
                                  ? "bg-cyber-green/20 text-cyber-green border-cyber-green/30"
                                  : response.code >= 400
                                    ? "bg-cyber-red/20 text-cyber-red border-cyber-red/30"
                                    : "bg-cyber-blue/20 text-cyber-blue border-cyber-blue/30",
                              )}
                            >
                              {response.code}
                            </Badge>
                            <span className="text-white font-medium">
                              {response.description}
                            </span>
                          </div>
                          <div className="bg-black/50 rounded-lg p-3">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-cyber-purple text-sm font-semibold">
                                EXAMPLE RESPONSE
                              </span>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() =>
                                  copyToClipboard(
                                    response.example,
                                    `resp-${index}`,
                                  )
                                }
                                className="text-white/70 hover:text-white"
                              >
                                {copiedStates[`resp-${index}`] ? (
                                  <CheckCircle className="h-4 w-4" />
                                ) : (
                                  <Copy className="h-4 w-4" />
                                )}
                              </Button>
                            </div>
                            <code className="text-cyber-green text-sm font-mono whitespace-pre-wrap">
                              {response.example}
                            </code>
                          </div>
                        </div>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="sdk" className="mt-6">
                    {selectedEndpoint.sdkExamples && (
                      <div className="space-y-6">
                        <div className="flex space-x-2">
                          <Button
                            size="sm"
                            variant={
                              activeLanguage === "javascript"
                                ? "default"
                                : "outline"
                            }
                            onClick={() => setActiveLanguage("javascript")}
                            className={
                              activeLanguage === "javascript"
                                ? "bg-cyber-yellow text-black"
                                : "border-cyber-yellow/30 text-cyber-yellow hover:bg-cyber-yellow/10"
                            }
                          >
                            JavaScript
                          </Button>
                          <Button
                            size="sm"
                            variant={
                              activeLanguage === "python"
                                ? "default"
                                : "outline"
                            }
                            onClick={() => setActiveLanguage("python")}
                            className={
                              activeLanguage === "python"
                                ? "bg-cyber-blue text-white"
                                : "border-cyber-blue/30 text-cyber-blue hover:bg-cyber-blue/10"
                            }
                          >
                            Python
                          </Button>
                          <Button
                            size="sm"
                            variant={
                              activeLanguage === "curl" ? "default" : "outline"
                            }
                            onClick={() => setActiveLanguage("curl")}
                            className={
                              activeLanguage === "curl"
                                ? "bg-cyber-green text-black"
                                : "border-cyber-green/30 text-cyber-green hover:bg-cyber-green/10"
                            }
                          >
                            cURL
                          </Button>
                        </div>

                        <div className="bg-black/50 rounded-lg p-4">
                          <div className="flex items-center justify-between mb-3">
                            <span className="text-cyber-blue text-sm font-semibold uppercase">
                              {activeLanguage}
                            </span>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() =>
                                copyToClipboard(
                                  selectedEndpoint.sdkExamples![activeLanguage],
                                  `sdk-${activeLanguage}`,
                                )
                              }
                              className="text-white/70 hover:text-white"
                            >
                              {copiedStates[`sdk-${activeLanguage}`] ? (
                                <CheckCircle className="h-4 w-4" />
                              ) : (
                                <Copy className="h-4 w-4" />
                              )}
                            </Button>
                          </div>
                          <code className="text-cyber-green text-sm font-mono whitespace-pre-wrap block">
                            {selectedEndpoint.sdkExamples[activeLanguage]}
                          </code>
                        </div>
                      </div>
                    )}
                  </TabsContent>
                </Tabs>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ApiDocumentation;
