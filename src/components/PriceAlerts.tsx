import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import {
  Bell,
  Plus,
  Trash2,
  TrendingUp,
  TrendingDown,
  Target,
  Volume2,
  AlertTriangle,
  Edit3,
  X,
  Check,
  Clock,
  Zap,
  DollarSign,
  Percent,
  Activity,
  Settings,
  BellRing,
  CheckCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { fadeInUp, staggerItem } from "@/lib/animations";

interface PriceAlert {
  id: string;
  symbol: string;
  type:
    | "above"
    | "below"
    | "volume"
    | "change_percent"
    | "support"
    | "resistance";
  value: number;
  currentPrice: number;
  isActive: boolean;
  createdAt: Date;
  triggeredAt?: Date;
  condition: "once" | "recurring";
  notificationMethod: "email" | "push" | "both";
  description?: string;
  priority: "low" | "medium" | "high";
}

interface PriceAlertsProps {
  className?: string;
}

const PriceAlerts = ({ className }: PriceAlertsProps) => {
  const [alerts, setAlerts] = useState<PriceAlert[]>([]);
  const [showAddAlert, setShowAddAlert] = useState(false);
  const [newAlert, setNewAlert] = useState({
    symbol: "",
    type: "above" as const,
    value: 0,
    condition: "once" as const,
    notificationMethod: "both" as const,
    priority: "medium" as const,
  });
  const [editingAlert, setEditingAlert] = useState<string | null>(null);

  // Alert monitoring and triggering system
  const checkAlertTriggers = useCallback(() => {
    setAlerts((prevAlerts) => {
      return prevAlerts.map((alert) => {
        if (!alert.isActive || alert.triggeredAt) return alert;

        const shouldTrigger = (() => {
          switch (alert.type) {
            case "above":
              return alert.currentPrice >= alert.value;
            case "below":
              return alert.currentPrice <= alert.value;
            case "change_percent":
              const changePercent =
                ((alert.currentPrice - alert.value) / alert.value) * 100;
              return Math.abs(changePercent) >= alert.value;
            case "volume":
              // Mock volume check (in real app, this would be actual volume data)
              const mockVolume = Math.random() * 100000000;
              return mockVolume >= alert.value;
            case "support":
              return alert.currentPrice <= alert.value;
            case "resistance":
              return alert.currentPrice >= alert.value;
            default:
              return false;
          }
        })();

        if (shouldTrigger) {
          // Trigger the alert
          const updatedAlert = {
            ...alert,
            triggeredAt: new Date(),
            isActive: alert.condition === "once" ? false : true,
          };

          // Show notification
          toast.success(`🚨 Alert Triggered: ${alert.symbol}`, {
            description: `${formatAlertDescription(alert)} at $${alert.currentPrice.toFixed(2)}`,
            duration: 5000,
            action: {
              label: "View",
              onClick: () => console.log("View alert:", alert.symbol),
            },
          });

          // Play sound if enabled (in real app, this would check user settings)
          if (typeof window !== "undefined" && "speechSynthesis" in window) {
            const utterance = new SpeechSynthesisUtterance(
              `Alert triggered for ${alert.symbol} at ${alert.currentPrice.toFixed(2)} dollars`,
            );
            utterance.volume = 0.3;
            utterance.rate = 1.2;
            speechSynthesis.speak(utterance);
          }

          return updatedAlert;
        }

        return alert;
      });
    });
  }, []);

  // Price simulation for demo purposes
  const simulatePriceUpdates = useCallback(() => {
    setAlerts((prevAlerts) => {
      return prevAlerts.map((alert) => {
        // Simulate price changes (±2% random walk)
        const change = (Math.random() - 0.5) * 0.04; // ±2%
        const newPrice = alert.currentPrice * (1 + change);

        return {
          ...alert,
          currentPrice: Math.max(newPrice, 0.01), // Prevent negative prices
        };
      });
    });
  }, []);

  // Set up real-time monitoring
  useEffect(() => {
    // Simulate price updates every 5 seconds
    const priceUpdateInterval = setInterval(simulatePriceUpdates, 5000);

    // Check for alert triggers every 2 seconds
    const alertCheckInterval = setInterval(checkAlertTriggers, 2000);

    return () => {
      clearInterval(priceUpdateInterval);
      clearInterval(alertCheckInterval);
    };
  }, [simulatePriceUpdates, checkAlertTriggers]);

  // Handle escape key for closing add alert form
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && showAddAlert) {
        setShowAddAlert(false);
        setNewAlert({
          symbol: "",
          type: "above",
          value: 0,
          condition: "once",
          notificationMethod: "both",
          priority: "medium",
        });
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [showAddAlert]);

  // Mock alerts data with enhanced features
  useEffect(() => {
    const mockAlerts: PriceAlert[] = [
      {
        id: "1",
        symbol: "AAPL",
        type: "above",
        value: 180,
        currentPrice: 175.43,
        isActive: true,
        createdAt: new Date(Date.now() - 86400000),
        condition: "once",
        notificationMethod: "both",
        description: "Breakout alert for Apple",
        priority: "high",
      },
      {
        id: "2",
        symbol: "TSLA",
        type: "below",
        value: 240,
        currentPrice: 242.68,
        isActive: true,
        createdAt: new Date(Date.now() - 172800000),
        condition: "recurring",
        notificationMethod: "push",
        description: "Support level watch",
        priority: "medium",
      },
      {
        id: "3",
        symbol: "NVDA",
        type: "above",
        value: 700,
        currentPrice: 721.33,
        isActive: false,
        createdAt: new Date(Date.now() - 259200000),
        triggeredAt: new Date(Date.now() - 86400000),
        condition: "once",
        notificationMethod: "email",
        description: "New high alert",
        priority: "high",
      },
      {
        id: "4",
        symbol: "MSFT",
        type: "change_percent",
        value: 5,
        currentPrice: 378.85,
        isActive: true,
        createdAt: new Date(Date.now() - 345600000),
        condition: "recurring",
        notificationMethod: "both",
        description: "Daily movement alert",
        priority: "low",
      },
      {
        id: "5",
        symbol: "GOOGL",
        type: "volume",
        value: 50000000,
        currentPrice: 138.21,
        isActive: true,
        createdAt: new Date(Date.now() - 432000000),
        condition: "recurring",
        notificationMethod: "push",
        description: "High volume activity",
        priority: "medium",
      },
    ];
    setAlerts(mockAlerts);
  }, []);

  const handleAddAlert = () => {
    if (!newAlert.symbol || !newAlert.value) return;

    const alert: PriceAlert = {
      id: Date.now().toString(),
      symbol: newAlert.symbol.toUpperCase(),
      type: newAlert.type,
      value: newAlert.value,
      currentPrice: Math.random() * 500 + 50, // Mock current price
      isActive: true,
      createdAt: new Date(),
      condition: newAlert.condition,
      notificationMethod: newAlert.notificationMethod,
      priority: newAlert.priority,
    };

    setAlerts((prev) => [alert, ...prev]);
    setNewAlert({
      symbol: "",
      type: "above",
      value: 0,
      condition: "once",
      notificationMethod: "both",
      priority: "medium",
    });
    setShowAddAlert(false);
  };

  const handleDeleteAlert = (id: string) => {
    setAlerts((prev) => prev.filter((alert) => alert.id !== id));
  };

  const toggleAlert = (id: string) => {
    setAlerts((prev) =>
      prev.map((alert) =>
        alert.id === id ? { ...alert, isActive: !alert.isActive } : alert,
      ),
    );
  };

  const duplicateAlert = (id: string) => {
    const alert = alerts.find((a) => a.id === id);
    if (alert) {
      const newAlert: PriceAlert = {
        ...alert,
        id: Date.now().toString(),
        createdAt: new Date(),
        isActive: true,
        triggeredAt: undefined,
      };
      setAlerts((prev) => [newAlert, ...prev]);
    }
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case "above":
        return TrendingUp;
      case "below":
        return TrendingDown;
      case "volume":
        return Volume2;
      case "change_percent":
        return Percent;
      case "support":
        return Target;
      case "resistance":
        return Target;
      default:
        return Bell;
    }
  };

  const getAlertColor = (alert: PriceAlert) => {
    if (!alert.isActive) return "text-gray-400";

    switch (alert.type) {
      case "above":
        return alert.currentPrice >= alert.value
          ? "text-cyber-green"
          : "text-cyber-blue";
      case "below":
        return alert.currentPrice <= alert.value
          ? "text-cyber-red"
          : "text-cyber-blue";
      case "change_percent":
        return "text-cyber-purple";
      case "volume":
        return "text-cyber-yellow";
      default:
        return "text-cyber-blue";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "text-cyber-red border-cyber-red/30 bg-cyber-red/10";
      case "medium":
        return "text-cyber-yellow border-cyber-yellow/30 bg-cyber-yellow/10";
      case "low":
        return "text-cyber-blue border-cyber-blue/30 bg-cyber-blue/10";
      default:
        return "text-cyber-blue border-cyber-blue/30 bg-cyber-blue/10";
    }
  };

  const getAlertProgress = (alert: PriceAlert) => {
    if (alert.type === "above") {
      return Math.min((alert.currentPrice / alert.value) * 100, 100);
    } else if (alert.type === "below") {
      return Math.max(100 - (alert.currentPrice / alert.value) * 100, 0);
    }
    return 50;
  };

  const formatAlertDescription = (alert: PriceAlert) => {
    switch (alert.type) {
      case "above":
        return `Alert when ${alert.symbol} goes above $${alert.value}`;
      case "below":
        return `Alert when ${alert.symbol} goes below $${alert.value}`;
      case "volume":
        return `Alert when ${alert.symbol} volume exceeds ${(alert.value / 1000000).toFixed(1)}M`;
      case "change_percent":
        return `Alert when ${alert.symbol} changes by ${alert.value}%`;
      case "support":
        return `Alert when ${alert.symbol} breaks support at $${alert.value}`;
      case "resistance":
        return `Alert when ${alert.symbol} breaks resistance at $${alert.value}`;
      default:
        return `${alert.symbol} alert`;
    }
  };

  const activeAlerts = alerts.filter((alert) => alert.isActive);
  const triggeredAlerts = alerts.filter(
    (alert) => !alert.isActive && alert.triggeredAt,
  );

  const alertStats = {
    total: alerts.length,
    active: activeAlerts.length,
    triggered: triggeredAlerts.length,
    high: alerts.filter((a) => a.priority === "high").length,
  };

  return (
    <Card
      className={cn(
        "p-6 bg-white/10 backdrop-blur-md border border-cyber-blue/20 shadow-cyber",
        className,
      )}
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-cyber-blue/20 rounded-xl">
            <Bell className="h-5 w-5 text-cyber-blue" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Price Alerts</h3>
            <div className="flex items-center space-x-4 text-sm text-cyber-blue/70">
              <span>{alertStats.active} active</span>
              <span>{alertStats.triggered} triggered</span>
              <span>{alertStats.high} high priority</span>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            size="sm"
            variant="outline"
            className="border-cyber-purple/30 text-cyber-purple hover:bg-cyber-purple/10"
          >
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Button>
          <Button
            size="sm"
            onClick={() => setShowAddAlert(true)}
            className="bg-gradient-to-r from-cyber-blue to-cyber-purple hover:from-cyber-blue-dark hover:to-cyber-purple-dark text-white"
          >
            <Plus className="h-4 w-4 mr-2" />
            New Alert
          </Button>
        </div>
      </div>

      {/* Add Alert Form */}
      <AnimatePresence>
        {showAddAlert && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="mb-6 p-4 bg-white/5 border border-cyber-purple/20 rounded-xl"
          >
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-white font-semibold">Create New Alert</h4>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => {
                  setShowAddAlert(false);
                  // Reset form when closing
                  setNewAlert({
                    symbol: "",
                    type: "above",
                    value: 0,
                    condition: "once",
                    notificationMethod: "both",
                    priority: "medium",
                  });
                }}
                className="text-white/70 hover:text-white hover:bg-white/10 transition-colors"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-white text-sm mb-2 block">
                    Stock Symbol
                  </Label>
                  <Input
                    placeholder="e.g., AAPL"
                    value={newAlert.symbol}
                    onChange={(e) =>
                      setNewAlert({
                        ...newAlert,
                        symbol: e.target.value.toUpperCase(),
                      })
                    }
                    className="bg-white/10 border-cyber-blue/30 text-white placeholder-white/50"
                  />
                </div>

                <div>
                  <Label className="text-white text-sm mb-2 block">
                    Alert Type
                  </Label>
                  <select
                    value={newAlert.type}
                    onChange={(e) =>
                      setNewAlert({ ...newAlert, type: e.target.value as any })
                    }
                    className="w-full px-3 py-2 bg-white/10 border border-cyber-blue/30 rounded-md text-white"
                  >
                    <option value="above">Price Above</option>
                    <option value="below">Price Below</option>
                    <option value="change_percent">% Change</option>
                    <option value="volume">High Volume</option>
                    <option value="support">Support Break</option>
                    <option value="resistance">Resistance Break</option>
                  </select>
                </div>

                <div>
                  <Label className="text-white text-sm mb-2 block">
                    {newAlert.type === "change_percent"
                      ? "Percentage %"
                      : newAlert.type === "volume"
                        ? "Volume (shares)"
                        : "Price $"}
                  </Label>
                  <Input
                    type="number"
                    placeholder="Enter value"
                    value={newAlert.value || ""}
                    onChange={(e) =>
                      setNewAlert({
                        ...newAlert,
                        value: parseFloat(e.target.value),
                      })
                    }
                    className="bg-white/10 border-cyber-blue/30 text-white placeholder-white/50"
                  />
                </div>

                <div>
                  <Label className="text-white text-sm mb-2 block">
                    Priority
                  </Label>
                  <select
                    value={newAlert.priority}
                    onChange={(e) =>
                      setNewAlert({
                        ...newAlert,
                        priority: e.target.value as any,
                      })
                    }
                    className="w-full px-3 py-2 bg-white/10 border border-cyber-blue/30 rounded-md text-white"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-white text-sm mb-2 block">
                    Condition
                  </Label>
                  <select
                    value={newAlert.condition}
                    onChange={(e) =>
                      setNewAlert({
                        ...newAlert,
                        condition: e.target.value as any,
                      })
                    }
                    className="w-full px-3 py-2 bg-white/10 border border-cyber-blue/30 rounded-md text-white"
                  >
                    <option value="once">Trigger Once</option>
                    <option value="recurring">Recurring</option>
                  </select>
                </div>

                <div>
                  <Label className="text-white text-sm mb-2 block">
                    Notifications
                  </Label>
                  <select
                    value={newAlert.notificationMethod}
                    onChange={(e) =>
                      setNewAlert({
                        ...newAlert,
                        notificationMethod: e.target.value as any,
                      })
                    }
                    className="w-full px-3 py-2 bg-white/10 border border-cyber-blue/30 rounded-md text-white"
                  >
                    <option value="email">Email Only</option>
                    <option value="push">Push Only</option>
                    <option value="both">Email + Push</option>
                  </select>
                </div>
              </div>

              <Separator className="my-4" />

              <Button
                onClick={handleAddAlert}
                className="w-full bg-cyber-green hover:bg-cyber-green-dark text-white"
              >
                <Check className="mr-2 h-4 w-4" />
                Create Alert
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Alert Statistics */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="text-center p-3 bg-white/5 border border-cyber-blue/10 rounded-lg">
          <div className="text-2xl font-bold text-cyber-blue">
            {alertStats.total}
          </div>
          <div className="text-xs text-white/60">Total</div>
        </div>
        <div className="text-center p-3 bg-white/5 border border-cyber-green/10 rounded-lg">
          <div className="text-2xl font-bold text-cyber-green">
            {alertStats.active}
          </div>
          <div className="text-xs text-white/60">Active</div>
        </div>
        <div className="text-center p-3 bg-white/5 border border-cyber-yellow/10 rounded-lg">
          <div className="text-2xl font-bold text-cyber-yellow">
            {alertStats.triggered}
          </div>
          <div className="text-xs text-white/60">Triggered</div>
        </div>
        <div className="text-center p-3 bg-white/5 border border-cyber-red/10 rounded-lg">
          <div className="text-2xl font-bold text-cyber-red">
            {alertStats.high}
          </div>
          <div className="text-xs text-white/60">High Priority</div>
        </div>
      </div>

      {/* Active Alerts */}
      <div className="space-y-4">
        <h4 className="text-sm font-semibold text-cyber-blue uppercase tracking-wider flex items-center">
          <Activity className="h-4 w-4 mr-2" />
          Active Alerts
        </h4>

        {activeAlerts.length === 0 ? (
          <div className="text-center py-8 text-white/60">
            <Bell className="h-12 w-12 mx-auto mb-3 opacity-50" />
            <p>No active alerts</p>
            <p className="text-sm">
              Create your first price alert to get started
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {activeAlerts.map((alert, index) => {
              const Icon = getAlertIcon(alert.type);
              const colorClass = getAlertColor(alert);
              const progress = getAlertProgress(alert);

              return (
                <motion.div
                  key={alert.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-4 bg-white/5 border border-cyber-blue/10 rounded-xl hover:bg-white/10 hover:border-cyber-blue/20 transition-all duration-200 group"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div
                        className={cn(
                          "p-2 rounded-lg",
                          alert.type === "above"
                            ? "bg-cyber-green/20"
                            : alert.type === "below"
                              ? "bg-cyber-red/20"
                              : alert.type === "volume"
                                ? "bg-cyber-yellow/20"
                                : "bg-cyber-blue/20",
                        )}
                      >
                        <Icon className={cn("h-4 w-4", colorClass)} />
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="font-semibold text-white">
                            {alert.symbol}
                          </span>
                          <Badge
                            variant="outline"
                            className="text-xs border-cyber-blue/30 text-cyber-blue"
                          >
                            {alert.type.replace("_", " ")}
                          </Badge>
                          <Badge className={getPriorityColor(alert.priority)}>
                            {alert.priority}
                          </Badge>
                          {alert.condition === "recurring" && (
                            <Badge className="text-xs bg-cyber-purple/20 text-cyber-purple border-cyber-purple/30">
                              <Zap className="h-3 w-3 mr-1" />
                              Recurring
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-white/70 mb-2">
                          {alert.description || formatAlertDescription(alert)}
                        </p>
                        <div className="flex items-center space-x-4 text-xs text-cyber-blue/60">
                          <span>Current: ${alert.currentPrice.toFixed(2)}</span>
                          <span>
                            Target:{" "}
                            {alert.type === "volume"
                              ? `${(alert.value / 1000000).toFixed(1)}M`
                              : alert.type === "change_percent"
                                ? `${alert.value}%`
                                : `$${alert.value}`}
                          </span>
                          <span>
                            Created: {alert.createdAt.toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => duplicateAlert(alert.id)}
                          className="text-cyan-400 hover:text-cyan-300 p-1"
                          title="Duplicate Alert"
                        >
                          <Target className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => setEditingAlert(alert.id)}
                          className="text-white/70 hover:text-white p-1"
                          title="Edit Alert"
                        >
                          <Edit3 className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => toggleAlert(alert.id)}
                          className="text-cyber-yellow hover:text-cyber-yellow-light p-1"
                          title="Pause Alert"
                        >
                          <Clock className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleDeleteAlert(alert.id)}
                          className="text-cyber-red hover:text-cyber-red-dark p-1"
                          title="Delete Alert"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Progress Bar for price-based alerts */}
                  {(alert.type === "above" || alert.type === "below") && (
                    <div className="mb-2">
                      <div className="flex justify-between text-xs text-white/60 mb-1">
                        <span>Progress to trigger</span>
                        <span>{progress.toFixed(1)}%</span>
                      </div>
                      <div className="w-full bg-white/10 rounded-full h-2">
                        <div
                          className={cn(
                            "h-2 rounded-full transition-all duration-300",
                            progress >= 90
                              ? "bg-cyber-green"
                              : progress >= 50
                                ? "bg-cyber-yellow"
                                : "bg-cyber-blue",
                          )}
                          style={{ width: `${Math.max(progress, 5)}%` }}
                        />
                      </div>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        )}
      </div>

      {/* Triggered Alerts */}
      {triggeredAlerts.length > 0 && (
        <div className="mt-8 space-y-4">
          <h4 className="text-sm font-semibold text-cyber-green uppercase tracking-wider flex items-center">
            <Check className="h-4 w-4 mr-2" />
            Recently Triggered
          </h4>

          <div className="space-y-3">
            {triggeredAlerts.slice(0, 3).map((alert, index) => {
              const Icon = getAlertIcon(alert.type);

              return (
                <motion.div
                  key={alert.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between p-3 bg-cyber-green/10 border border-cyber-green/20 rounded-xl"
                >
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-cyber-green/20 rounded-lg">
                      <Icon className="h-4 w-4 text-cyber-green" />
                    </div>

                    <div>
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="font-semibold text-white">
                          {alert.symbol}
                        </span>
                        <Badge className="text-xs bg-cyber-green/20 text-cyber-green border-cyber-green/30">
                          <Check className="h-3 w-3 mr-1" />
                          Triggered
                        </Badge>
                      </div>
                      <p className="text-sm text-white/70 mb-1">
                        {formatAlertDescription(alert)}
                      </p>
                      <p className="text-xs text-cyber-green/60">
                        Triggered: {alert.triggeredAt?.toLocaleDateString()} at{" "}
                        {alert.triggeredAt?.toLocaleTimeString()}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => duplicateAlert(alert.id)}
                      className="text-cyber-blue hover:text-cyber-blue-light p-1"
                      title="Create Similar Alert"
                    >
                      <Target className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleDeleteAlert(alert.id)}
                      className="text-white/50 hover:text-white p-1"
                      title="Remove"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      )}
    </Card>
  );
};

export default PriceAlerts;
