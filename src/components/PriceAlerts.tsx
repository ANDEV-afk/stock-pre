import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
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
} from "lucide-react";
import { cn } from "@/lib/utils";

interface PriceAlert {
  id: string;
  symbol: string;
  type: "above" | "below" | "volume" | "change";
  value: number;
  currentPrice: number;
  isActive: boolean;
  createdAt: Date;
  triggeredAt?: Date;
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
  });

  // Mock alerts data
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
      },
      {
        id: "2",
        symbol: "TSLA",
        type: "below",
        value: 240,
        currentPrice: 242.68,
        isActive: true,
        createdAt: new Date(Date.now() - 172800000),
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
    };

    setAlerts((prev) => [alert, ...prev]);
    setNewAlert({ symbol: "", type: "above", value: 0 });
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

  const getAlertIcon = (type: string) => {
    switch (type) {
      case "above":
        return TrendingUp;
      case "below":
        return TrendingDown;
      case "volume":
        return Volume2;
      case "change":
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
      default:
        return "text-cyber-blue";
    }
  };

  const activeAlerts = alerts.filter((alert) => alert.isActive);
  const triggeredAlerts = alerts.filter(
    (alert) => !alert.isActive && alert.triggeredAt,
  );

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
            <p className="text-sm text-cyber-blue/70">
              {activeAlerts.length} active alerts
            </p>
          </div>
        </div>
        <Button
          size="sm"
          onClick={() => setShowAddAlert(true)}
          className="bg-gradient-to-r from-cyber-blue to-cyber-purple hover:from-cyber-blue-dark hover:to-cyber-purple-dark text-white"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Alert
        </Button>
      </div>

      {/* Add Alert Form */}
      <AnimatePresence>
        {showAddAlert && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-6 p-4 bg-white/5 border border-cyber-purple/20 rounded-xl"
          >
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-white font-semibold">Create New Alert</h4>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setShowAddAlert(false)}
                className="text-white/70 hover:text-white"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
              <Input
                placeholder="Symbol (e.g., AAPL)"
                value={newAlert.symbol}
                onChange={(e) =>
                  setNewAlert({ ...newAlert, symbol: e.target.value })
                }
                className="bg-white/10 border-cyber-blue/30 text-white placeholder-white/50"
              />

              <select
                value={newAlert.type}
                onChange={(e) =>
                  setNewAlert({ ...newAlert, type: e.target.value as any })
                }
                className="px-3 py-2 bg-white/10 border border-cyber-blue/30 rounded-md text-white"
              >
                <option value="above">Price Above</option>
                <option value="below">Price Below</option>
                <option value="volume">High Volume</option>
                <option value="change">Price Change</option>
              </select>

              <Input
                type="number"
                placeholder="Target Value"
                value={newAlert.value || ""}
                onChange={(e) =>
                  setNewAlert({
                    ...newAlert,
                    value: parseFloat(e.target.value),
                  })
                }
                className="bg-white/10 border-cyber-blue/30 text-white placeholder-white/50"
              />

              <Button
                onClick={handleAddAlert}
                className="bg-cyber-green hover:bg-cyber-green-dark text-white"
              >
                Create Alert
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Active Alerts */}
      <div className="space-y-3">
        <h4 className="text-sm font-semibold text-cyber-blue uppercase tracking-wider">
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
          <div className="space-y-2">
            {activeAlerts.map((alert, index) => {
              const Icon = getAlertIcon(alert.type);
              const colorClass = getAlertColor(alert);

              return (
                <motion.div
                  key={alert.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between p-3 bg-white/5 border border-cyber-blue/10 rounded-xl hover:bg-white/10 hover:border-cyber-blue/20 transition-all duration-200 group"
                >
                  <div className="flex items-center space-x-3">
                    <div
                      className={cn(
                        "p-2 rounded-lg",
                        alert.type === "above"
                          ? "bg-cyber-green/20"
                          : alert.type === "below"
                            ? "bg-cyber-red/20"
                            : "bg-cyber-blue/20",
                      )}
                    >
                      <Icon className={cn("h-4 w-4", colorClass)} />
                    </div>

                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-semibold text-white">
                          {alert.symbol}
                        </span>
                        <Badge
                          variant="outline"
                          className="text-xs border-cyber-blue/30 text-cyber-blue"
                        >
                          {alert.type}
                        </Badge>
                      </div>
                      <p className="text-sm text-white/70">
                        {alert.type === "above"
                          ? "Alert when above"
                          : alert.type === "below"
                            ? "Alert when below"
                            : `${alert.type} alert at`}{" "}
                        ${alert.type.includes("change") ? "%" : "$"}
                        {alert.value}
                      </p>
                      <p className="text-xs text-cyber-blue/60">
                        Current: ${alert.currentPrice.toFixed(2)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => toggleAlert(alert.id)}
                      className="text-white/70 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Edit3 className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleDeleteAlert(alert.id)}
                      className="text-cyber-red hover:text-cyber-red-dark opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>

      {/* Triggered Alerts */}
      {triggeredAlerts.length > 0 && (
        <div className="mt-6 space-y-3">
          <h4 className="text-sm font-semibold text-cyber-green uppercase tracking-wider">
            Recently Triggered
          </h4>

          <div className="space-y-2">
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
                      <div className="flex items-center space-x-2">
                        <span className="font-semibold text-white">
                          {alert.symbol}
                        </span>
                        <Badge className="text-xs bg-cyber-green/20 text-cyber-green border-cyber-green/30">
                          Triggered
                        </Badge>
                      </div>
                      <p className="text-sm text-white/70">
                        Alert triggered at ${alert.value}
                      </p>
                      <p className="text-xs text-cyber-green/60">
                        {alert.triggeredAt?.toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleDeleteAlert(alert.id)}
                    className="text-white/50 hover:text-white"
                  >
                    <X className="h-4 w-4" />
                  </Button>
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
