import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Bell,
  X,
  TrendingUp,
  TrendingDown,
  Target,
  Volume2,
  AlertTriangle,
  CheckCircle,
  Plus,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { TOP_50_COMPANIES } from "@/lib/companies-data";

interface PriceAlert {
  id: string;
  symbol: string;
  name: string;
  type: "above" | "below" | "breakout" | "support" | "volume" | "movement";
  condition: string;
  targetPrice?: number;
  currentPrice: number;
  progress: number;
  isActive: boolean;
  createdAt: Date;
}

interface PriceAlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedSymbol?: string;
}

const PriceAlertModal = ({
  isOpen,
  onClose,
  selectedSymbol = "AAPL",
}: PriceAlertModalProps) => {
  const [alerts, setAlerts] = useState<PriceAlert[]>([
    {
      id: "1",
      symbol: "AAPL",
      name: "Apple Inc.",
      type: "breakout",
      condition: "Breakout alert for Apple",
      currentPrice: 175.43,
      progress: 97,
      isActive: true,
      createdAt: new Date(),
    },
    {
      id: "2",
      symbol: "TSLA",
      name: "Tesla Inc.",
      type: "support",
      condition: "Support level watch",
      currentPrice: 242.68,
      progress: 0,
      isActive: true,
      createdAt: new Date(),
    },
    {
      id: "3",
      symbol: "MSFT",
      name: "Microsoft Corporation",
      type: "movement",
      condition: "Daily movement alert",
      currentPrice: 378.85,
      progress: 0,
      isActive: false,
      createdAt: new Date(),
    },
    {
      id: "4",
      symbol: "GOOGL",
      name: "Alphabet Inc.",
      type: "volume",
      condition: "High volume activity",
      currentPrice: 138.21,
      progress: 0,
      isActive: true,
      createdAt: new Date(),
    },
  ]);

  const [newAlert, setNewAlert] = useState({
    symbol: selectedSymbol,
    type: "above" as const,
    targetPrice: "",
    condition: "",
  });

  const [showAddForm, setShowAddForm] = useState(false);

  const getAlertIcon = (type: string) => {
    switch (type) {
      case "above":
        return <TrendingUp className="h-4 w-4" />;
      case "below":
        return <TrendingDown className="h-4 w-4" />;
      case "breakout":
        return <Target className="h-4 w-4" />;
      case "support":
        return <AlertTriangle className="h-4 w-4" />;
      case "volume":
        return <Volume2 className="h-4 w-4" />;
      case "movement":
        return <TrendingUp className="h-4 w-4" />;
      default:
        return <Bell className="h-4 w-4" />;
    }
  };

  const getAlertColor = (type: string) => {
    switch (type) {
      case "above":
        return "text-cyber-green border-cyber-green/20 bg-cyber-green/10";
      case "below":
        return "text-cyber-red border-cyber-red/20 bg-cyber-red/10";
      case "breakout":
        return "text-cyber-blue border-cyber-blue/20 bg-cyber-blue/10";
      case "support":
        return "text-cyber-yellow border-cyber-yellow/20 bg-cyber-yellow/10";
      case "volume":
        return "text-cyber-purple border-cyber-purple/20 bg-cyber-purple/10";
      case "movement":
        return "text-cyber-blue border-cyber-blue/20 bg-cyber-blue/10";
      default:
        return "text-white/70 border-white/20 bg-white/10";
    }
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 90) return "bg-cyber-green";
    if (progress >= 70) return "bg-cyber-yellow";
    if (progress >= 40) return "bg-cyber-blue";
    return "bg-white/20";
  };

  const handleAddAlert = () => {
    if (!newAlert.targetPrice || !newAlert.condition) return;

    const company = TOP_50_COMPANIES.find((c) => c.symbol === newAlert.symbol);
    if (!company) return;

    const alert: PriceAlert = {
      id: Date.now().toString(),
      symbol: newAlert.symbol,
      name: company.name,
      type: newAlert.type,
      condition: newAlert.condition,
      targetPrice: parseFloat(newAlert.targetPrice),
      currentPrice: company.price,
      progress: Math.floor(Math.random() * 100),
      isActive: true,
      createdAt: new Date(),
    };

    setAlerts((prev) => [alert, ...prev]);
    setNewAlert({
      symbol: selectedSymbol,
      type: "above",
      targetPrice: "",
      condition: "",
    });
    setShowAddForm(false);
  };

  const handleDeleteAlert = (id: string) => {
    setAlerts((prev) => prev.filter((alert) => alert.id !== id));
  };

  const handleToggleAlert = (id: string) => {
    setAlerts((prev) =>
      prev.map((alert) =>
        alert.id === id ? { ...alert, isActive: !alert.isActive } : alert,
      ),
    );
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          className="w-full max-w-4xl max-h-[90vh] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          <Card className="bg-cyber-dark/95 backdrop-blur-md border-cyber-blue/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-cyber-blue/20 rounded-lg">
                  <Bell className="h-5 w-5 text-cyber-blue" />
                </div>
                <div>
                  <CardTitle className="text-xl text-white">
                    Price Alerts
                  </CardTitle>
                  <p className="text-white/60 text-sm">
                    Manage your active price alerts
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowAddForm(true)}
                  className="border-cyber-blue/30 text-cyber-blue hover:bg-cyber-blue/10"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Alert
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onClose}
                  className="text-white/70 hover:text-white hover:bg-white/10"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </CardHeader>

            <CardContent className="space-y-4 max-h-[60vh] overflow-y-auto">
              {/* Add New Alert Form */}
              <AnimatePresence>
                {showAddForm && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <Card className="bg-cyber-black/50 border-cyber-blue/30">
                      <CardContent className="p-4 space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                          <div>
                            <Label className="text-white/80">Symbol</Label>
                            <select
                              value={newAlert.symbol}
                              onChange={(e) =>
                                setNewAlert((prev) => ({
                                  ...prev,
                                  symbol: e.target.value,
                                }))
                              }
                              className="w-full mt-1 px-3 py-2 bg-cyber-dark border border-cyber-blue/30 rounded-lg text-white focus:border-cyber-blue focus:outline-none"
                            >
                              {TOP_50_COMPANIES.slice(0, 20).map((company) => (
                                <option
                                  key={company.symbol}
                                  value={company.symbol}
                                >
                                  {company.symbol} - {company.name}
                                </option>
                              ))}
                            </select>
                          </div>
                          <div>
                            <Label className="text-white/80">Alert Type</Label>
                            <select
                              value={newAlert.type}
                              onChange={(e) =>
                                setNewAlert((prev) => ({
                                  ...prev,
                                  type: e.target.value as any,
                                }))
                              }
                              className="w-full mt-1 px-3 py-2 bg-cyber-dark border border-cyber-blue/30 rounded-lg text-white focus:border-cyber-blue focus:outline-none"
                            >
                              <option value="above">Price Above</option>
                              <option value="below">Price Below</option>
                              <option value="breakout">Breakout Alert</option>
                              <option value="support">Support Level</option>
                              <option value="volume">Volume Alert</option>
                              <option value="movement">Daily Movement</option>
                            </select>
                          </div>
                          <div>
                            <Label className="text-white/80">
                              Target Price
                            </Label>
                            <Input
                              type="number"
                              step="0.01"
                              value={newAlert.targetPrice}
                              onChange={(e) =>
                                setNewAlert((prev) => ({
                                  ...prev,
                                  targetPrice: e.target.value,
                                }))
                              }
                              placeholder="Enter price..."
                              className="bg-cyber-dark border-cyber-blue/30 text-white focus:border-cyber-blue"
                            />
                          </div>
                          <div>
                            <Label className="text-white/80">Condition</Label>
                            <Input
                              value={newAlert.condition}
                              onChange={(e) =>
                                setNewAlert((prev) => ({
                                  ...prev,
                                  condition: e.target.value,
                                }))
                              }
                              placeholder="Alert description..."
                              className="bg-cyber-dark border-cyber-blue/30 text-white focus:border-cyber-blue"
                            />
                          </div>
                        </div>
                        <div className="flex justify-end space-x-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setShowAddForm(false)}
                            className="text-white/70 hover:text-white"
                          >
                            Cancel
                          </Button>
                          <Button
                            size="sm"
                            onClick={handleAddAlert}
                            className="bg-cyber-blue hover:bg-cyber-blue-dark text-white"
                          >
                            Add Alert
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Active Alerts Header */}
              <div className="flex items-center justify-between">
                <h3 className="text-cyber-blue font-medium flex items-center">
                  ↗ ACTIVE ALERTS
                  <Badge
                    variant="secondary"
                    className="ml-2 bg-cyber-blue/20 text-cyber-blue"
                  >
                    {alerts.filter((a) => a.isActive).length}
                  </Badge>
                </h3>
              </div>

              {/* Alerts List */}
              <div className="space-y-3">
                {alerts.map((alert) => (
                  <motion.div
                    key={alert.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                  >
                    <Card
                      className={cn(
                        "bg-cyber-dark/50 border transition-all duration-200 hover:bg-cyber-dark/70",
                        alert.isActive
                          ? "border-cyber-blue/30"
                          : "border-white/10",
                      )}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3 flex-1">
                            <div
                              className={cn(
                                "p-2 rounded-lg border flex items-center justify-center",
                                getAlertColor(alert.type),
                              )}
                            >
                              {getAlertIcon(alert.type)}
                            </div>

                            <div className="flex-1 min-w-0">
                              <div className="flex items-center space-x-2 mb-1">
                                <h4 className="font-medium text-white text-sm lg:text-base">
                                  {alert.symbol}
                                </h4>
                                <Badge
                                  variant="outline"
                                  className={cn(
                                    "text-xs border",
                                    alert.type === "breakout"
                                      ? "text-cyber-blue border-cyber-blue/30"
                                      : alert.type === "support"
                                        ? "text-cyber-yellow border-cyber-yellow/30"
                                        : alert.type === "volume"
                                          ? "text-cyber-purple border-cyber-purple/30"
                                          : "text-cyber-blue border-cyber-blue/30",
                                  )}
                                >
                                  {alert.type}
                                </Badge>
                                {alert.progress >= 90 && (
                                  <Badge className="bg-cyber-red text-white">
                                    High Priority
                                  </Badge>
                                )}
                              </div>
                              <p className="text-white/60 text-sm">
                                {alert.condition}
                              </p>

                              {/* Progress Bar */}
                              <div className="mt-2">
                                <div className="flex justify-between text-xs text-white/60 mb-1">
                                  <span>Progress to trigger</span>
                                  <span>{alert.progress}%</span>
                                </div>
                                <div className="w-full bg-white/10 rounded-full h-1.5">
                                  <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${alert.progress}%` }}
                                    transition={{
                                      duration: 1,
                                      ease: "easeOut",
                                    }}
                                    className={cn(
                                      "h-1.5 rounded-full",
                                      getProgressColor(alert.progress),
                                    )}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center space-x-2 ml-4">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleToggleAlert(alert.id)}
                              className={cn(
                                "text-xs px-2 py-1",
                                alert.isActive
                                  ? "text-cyber-green hover:text-cyber-green/80"
                                  : "text-white/40 hover:text-white/60",
                              )}
                            >
                              {alert.isActive ? (
                                <>
                                  <CheckCircle className="h-3 w-3 mr-1" />
                                  Active
                                </>
                              ) : (
                                <>
                                  <AlertTriangle className="h-3 w-3 mr-1" />
                                  Paused
                                </>
                              )}
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDeleteAlert(alert.id)}
                              className="text-cyber-red hover:text-cyber-red/80 p-1"
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>

              {alerts.length === 0 && (
                <div className="text-center py-8">
                  <Bell className="h-12 w-12 text-white/20 mx-auto mb-4" />
                  <p className="text-white/60">No active alerts yet</p>
                  <p className="text-white/40 text-sm">
                    Create your first price alert to get started
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default PriceAlertModal;
