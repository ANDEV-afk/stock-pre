import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Code,
  Database,
  Key,
  Shield,
  Zap,
  Globe,
  Clock,
  CheckCircle,
  Copy,
  ExternalLink,
  BookOpen,
  Download,
  Terminal,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";

const API = () => {
  const endpoints = [
    {
      method: "GET",
      path: "/api/v1/predictions/{symbol}",
      description: "Get AI-powered stock predictions with confidence intervals",
      params: [
        {
          name: "symbol",
          type: "string",
          required: true,
          description: "Stock ticker symbol (e.g., AAPL)",
        },
        {
          name: "timeframe",
          type: "string",
          required: false,
          description: "Prediction timeframe (1d, 1w, 1m)",
        },
        {
          name: "confidence",
          type: "number",
          required: false,
          description: "Minimum confidence level (0-100)",
        },
      ],
      response: {
        symbol: "AAPL",
        predictions: [
          {
            timeframe: "1d",
            predicted_price: 175.5,
            confidence: 87.3,
            direction: "up",
            change_percent: 2.1,
          },
        ],
        generated_at: "2024-01-15T10:30:00Z",
      },
    },
    {
      method: "GET",
      path: "/api/v1/realtime/{symbol}",
      description: "Get real-time stock price and market data",
      params: [
        {
          name: "symbol",
          type: "string",
          required: true,
          description: "Stock ticker symbol",
        },
        {
          name: "extended_hours",
          type: "boolean",
          required: false,
          description: "Include pre/post market data",
        },
      ],
      response: {
        symbol: "AAPL",
        price: 173.45,
        change: 2.15,
        change_percent: 1.25,
        volume: 45678900,
        timestamp: "2024-01-15T16:00:00Z",
      },
    },
    {
      method: "POST",
      path: "/api/v1/alerts",
      description: "Create price alerts and notifications",
      params: [
        {
          name: "symbol",
          type: "string",
          required: true,
          description: "Stock ticker symbol",
        },
        {
          name: "type",
          type: "string",
          required: true,
          description: "Alert type (above, below, change)",
        },
        {
          name: "value",
          type: "number",
          required: true,
          description: "Target price or percentage",
        },
        {
          name: "webhook_url",
          type: "string",
          required: false,
          description: "Webhook URL for notifications",
        },
      ],
      response: {
        alert_id: "alert_123456",
        symbol: "AAPL",
        type: "above",
        value: 180.0,
        status: "active",
        created_at: "2024-01-15T10:30:00Z",
      },
    },
    {
      method: "GET",
      path: "/api/v1/analytics/{symbol}",
      description: "Get technical analysis and market indicators",
      params: [
        {
          name: "symbol",
          type: "string",
          required: true,
          description: "Stock ticker symbol",
        },
        {
          name: "indicators",
          type: "array",
          required: false,
          description: "Specific indicators to include",
        },
        {
          name: "timeframe",
          type: "string",
          required: false,
          description: "Analysis timeframe",
        },
      ],
      response: {
        symbol: "AAPL",
        indicators: {
          rsi: 68.4,
          macd: {
            signal: 1.23,
            histogram: 0.45,
          },
          moving_averages: {
            sma_20: 170.25,
            ema_50: 168.9,
          },
        },
        sentiment: "bullish",
      },
    },
  ];

  const codeExamples = [
    {
      language: "JavaScript",
      title: "Get Stock Predictions",
      code: `const response = await fetch('https://api.stockvision.com/v1/predictions/AAPL', {
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  }
});

const data = await response.json();
console.log(data.predictions);`,
    },
    {
      language: "Python",
      title: "Create Price Alert",
      code: `import requests

url = "https://api.stockvision.com/v1/alerts"
headers = {
    "Authorization": "Bearer YOUR_API_KEY",
    "Content-Type": "application/json"
}
data = {
    "symbol": "AAPL",
    "type": "above",
    "value": 180.00
}

response = requests.post(url, headers=headers, json=data)
print(response.json())`,
    },
    {
      language: "cURL",
      title: "Get Real-time Data",
      code: `curl -X GET "https://api.stockvision.com/v1/realtime/AAPL" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json"`,
    },
  ];

  const rateLimits = [
    { plan: "Starter", limit: "100 requests/hour", price: "Free" },
    { plan: "Professional", limit: "10,000 requests/hour", price: "$29/month" },
    { plan: "Enterprise", limit: "Unlimited", price: "Custom" },
  ];

  return (
    <div className="min-h-screen bg-cyber-black cyber-grid">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-cyber-blue via-white to-cyber-purple bg-clip-text text-transparent mb-6">
            Powerful API
          </h1>
          <p className="text-xl text-cyber-blue/80 max-w-3xl mx-auto mb-8">
            Build the next generation of trading applications with our
            comprehensive API. Access AI predictions, real-time data, and
            advanced analytics.
          </p>
          <div className="flex justify-center space-x-4">
            <Link to="/register">
              <Button
                size="lg"
                className="bg-gradient-to-r from-cyber-blue to-cyber-purple hover:from-cyber-blue-dark hover:to-cyber-purple-dark text-white"
              >
                <Key className="mr-2 h-5 w-5" />
                Get API Key
              </Button>
            </Link>
            <Button
              size="lg"
              variant="outline"
              className="border-cyber-blue/30 text-cyber-blue hover:bg-cyber-blue/10"
            >
              <BookOpen className="mr-2 h-5 w-5" />
              View Docs
            </Button>
          </div>
        </motion.div>

        {/* Key Features */}
        <section className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-white mb-4">API Features</h2>
            <p className="text-cyber-blue/70 text-lg">
              Built for developers, designed for scale
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Zap,
                title: "Fast & Reliable",
                desc: "Sub-100ms response times with 99.9% uptime",
              },
              {
                icon: Shield,
                title: "Secure",
                desc: "Enterprise-grade security with API key authentication",
              },
              {
                icon: Globe,
                title: "Global Coverage",
                desc: "Access to 50+ exchanges worldwide",
              },
              {
                icon: Database,
                title: "Rich Data",
                desc: "Real-time prices, predictions, and analytics",
              },
            ].map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="p-6 bg-white/10 backdrop-blur-md border border-cyber-blue/20 hover:border-cyber-blue/40 transition-all duration-300 text-center h-full">
                    <div className="p-3 bg-cyber-blue/20 rounded-xl w-fit mx-auto mb-4">
                      <Icon className="h-6 w-6 text-cyber-blue" />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-cyber-blue/80 text-sm">{feature.desc}</p>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* API Endpoints */}
        <section className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-white mb-4">
              API Endpoints
            </h2>
            <p className="text-cyber-blue/70 text-lg">
              Comprehensive REST API for all your trading needs
            </p>
          </motion.div>

          <div className="space-y-8">
            {endpoints.map((endpoint, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
              >
                <Card className="p-8 bg-white/5 backdrop-blur-md border border-cyber-blue/20 hover:border-cyber-blue/40 transition-all duration-300">
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center space-x-4">
                      <Badge
                        className={`${
                          endpoint.method === "GET"
                            ? "bg-cyber-green/20 text-cyber-green border-cyber-green/30"
                            : endpoint.method === "POST"
                              ? "bg-cyber-blue/20 text-cyber-blue border-cyber-blue/30"
                              : "bg-cyber-purple/20 text-cyber-purple border-cyber-purple/30"
                        }`}
                      >
                        {endpoint.method}
                      </Badge>
                      <code className="text-lg font-mono text-cyber-blue">
                        {endpoint.path}
                      </code>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-cyber-blue/30 text-cyber-blue hover:bg-cyber-blue/10"
                    >
                      <Copy className="h-4 w-4 mr-2" />
                      Copy
                    </Button>
                  </div>

                  <p className="text-white/80 mb-6">{endpoint.description}</p>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Parameters */}
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-4">
                        Parameters
                      </h4>
                      <div className="space-y-3">
                        {endpoint.params.map((param, idx) => (
                          <div
                            key={idx}
                            className="p-3 bg-white/5 border border-cyber-blue/10 rounded-lg"
                          >
                            <div className="flex items-center space-x-2 mb-1">
                              <code className="text-cyber-green">
                                {param.name}
                              </code>
                              <Badge
                                variant="outline"
                                className="text-xs border-cyber-blue/30 text-cyber-blue"
                              >
                                {param.type}
                              </Badge>
                              {param.required && (
                                <Badge className="text-xs bg-cyber-red/20 text-cyber-red border-cyber-red/30">
                                  required
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

                    {/* Response */}
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-4">
                        Response
                      </h4>
                      <div className="p-4 bg-cyber-black/50 border border-cyber-blue/20 rounded-lg">
                        <pre className="text-cyber-green text-sm overflow-x-auto">
                          <code>
                            {JSON.stringify(endpoint.response, null, 2)}
                          </code>
                        </pre>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Code Examples */}
        <section className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-white mb-4">
              Code Examples
            </h2>
            <p className="text-cyber-blue/70 text-lg">
              Get started quickly with these examples
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {codeExamples.map((example, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
              >
                <Card className="p-6 bg-white/5 backdrop-blur-md border border-cyber-purple/20 hover:border-cyber-purple/40 transition-all duration-300 h-full">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-bold text-white">
                        {example.title}
                      </h3>
                      <Badge
                        variant="outline"
                        className="border-cyber-purple/30 text-cyber-purple mt-2"
                      >
                        {example.language}
                      </Badge>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-white/70 hover:text-white"
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="p-4 bg-cyber-black/50 border border-cyber-blue/20 rounded-lg">
                    <pre className="text-cyber-green text-sm overflow-x-auto whitespace-pre-wrap">
                      <code>{example.code}</code>
                    </pre>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Rate Limits */}
        <section className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-white mb-4">
              Rate Limits & Pricing
            </h2>
            <p className="text-cyber-blue/70 text-lg">
              Choose the right plan for your usage
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {rateLimits.map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
              >
                <Card className="p-6 bg-white/10 backdrop-blur-md border border-cyber-blue/20 hover:border-cyber-blue/40 transition-all duration-300 text-center">
                  <h3 className="text-xl font-bold text-white mb-2">
                    {plan.plan}
                  </h3>
                  <div className="text-2xl font-bold text-cyber-blue mb-2">
                    {plan.limit}
                  </div>
                  <div className="text-lg text-white/70 mb-4">{plan.price}</div>
                  <Button className="w-full bg-gradient-to-r from-cyber-blue to-cyber-purple hover:from-cyber-blue-dark hover:to-cyber-purple-dark text-white">
                    Get Started
                  </Button>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Getting Started */}
        <section className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-white mb-4">
              Getting Started
            </h2>
            <p className="text-cyber-blue/70 text-lg">
              Start building in minutes
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                title: "Get Your API Key",
                description:
                  "Sign up for an account and generate your API key from the dashboard",
                icon: Key,
              },
              {
                step: "2",
                title: "Make Your First Call",
                description:
                  "Use our REST API with simple HTTP requests and JSON responses",
                icon: Terminal,
              },
              {
                step: "3",
                title: "Scale Your App",
                description:
                  "Upgrade your plan as your application grows and needs more requests",
                icon: Zap,
              },
            ].map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                >
                  <Card className="p-6 bg-white/5 backdrop-blur-md border border-cyber-green/20 hover:border-cyber-green/40 transition-all duration-300 text-center">
                    <div className="w-12 h-12 bg-cyber-green/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-cyber-green font-bold">
                        {step.step}
                      </span>
                    </div>
                    <div className="p-3 bg-cyber-green/20 rounded-xl w-fit mx-auto mb-4">
                      <Icon className="h-6 w-6 text-cyber-green" />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">
                      {step.title}
                    </h3>
                    <p className="text-cyber-blue/80 text-sm">
                      {step.description}
                    </p>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <Card className="p-12 bg-gradient-to-br from-cyber-blue/20 to-cyber-purple/20 border border-cyber-blue/30">
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to Start Building?
            </h2>
            <p className="text-cyber-blue/80 text-lg mb-8 max-w-2xl mx-auto">
              Get your API key today and start building the next generation of
              trading applications.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-cyber-blue to-cyber-purple hover:from-cyber-blue-dark hover:to-cyber-purple-dark text-white"
                >
                  <Key className="mr-2 h-5 w-5" />
                  Get API Key
                </Button>
              </Link>
              <Button
                size="lg"
                variant="outline"
                className="border-cyber-blue/30 text-cyber-blue hover:bg-cyber-blue/10"
              >
                <Download className="mr-2 h-5 w-5" />
                Download SDKs
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default API;
