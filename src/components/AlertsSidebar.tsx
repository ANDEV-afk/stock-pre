import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Bell,
  TrendingUp,
  TrendingDown,
  Target,
  Volume2,
  AlertTriangle,
  Plus,
  ChevronDown,
  ArrowUpRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Alert {
  id: string;
  symbol: string;
  type: "breakout" | "support" | "movement" | "volume";
  condition: string;
  progress: number;
  priority: "high" | "medium" | "low";
  isActive: boolean;
}

interface AlertsSidebarProps {
  onOpenAlertModal: () => void;
  className?: string;
}

const AlertsSidebar = ({ onOpenAlertModal, className }: AlertsSidebarProps) => {
  const [alerts] = useState<Alert[]>([
    {
      id: "1",
      symbol: "AAPL",
      type: "breakout",
      condition: "Breakout alert for Apple",
      progress: 97,
      priority: "high",
      isActive: true,
    },
    {
      id: "2",
      symbol: "TSLA",
      type: "support",
      condition: "Support level watch",
      progress: 0,
      priority: "medium",
      isActive: true,
    },
    {
      id: "3",
      symbol: "MSFT",
      type: "movement",
      condition: "Daily movement alert",
      progress: 0,
      priority: "low",
      isActive: false,
    },
    {
      id: "4",
      symbol: "GOOGL",
      type: "volume",
      condition: "High volume activity",
      progress: 0,
      priority: "medium",
      isActive: true,
    },
  ]);

  const getAlertIcon = (type: string) => {
    switch (type) {
      case "breakout":
        return <ArrowUpRight className="h-3 w-3" />;
      case "support":
        return <AlertTriangle className="h-3 w-3" />;
      case "movement":
        return <TrendingUp className="h-3 w-3" />;
      case "volume":
        return <Volume2 className="h-3 w-3" />;
      default:
        return <Bell className="h-3 w-3" />;
    }
  };

  const getAlertColor = (type: string) => {
    switch (type) {
      case "breakout":
        return "text-cyber-green border-cyber-green/30 bg-cyber-green/10";
      case "support":
        return "text-cyber-yellow border-cyber-yellow/30 bg-cyber-yellow/10";
      case "movement":
        return "text-cyber-blue border-cyber-blue/30 bg-cyber-blue/10";
      case "volume":
        return "text-cyber-purple border-cyber-purple/30 bg-cyber-purple/10";
      default:
        return "text-white/70 border-white/20 bg-white/10";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "text-cyber-red";
      case "medium":
        return "text-cyber-yellow";
      case "low":
        return "text-cyber-blue";
      default:
        return "text-white/60";
    }
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 90) return "bg-cyber-green";
    if (progress >= 70) return "bg-cyber-yellow";
    if (progress >= 40) return "bg-cyber-blue";
    return "bg-white/20";
  };

  const activeAlerts = alerts.filter((alert) => alert.isActive);

  return (
    <div className={cn("space-y-4", className)}>
      {/* Main Alerts Card - Expanded */}
      <Card className="bg-cyber-dark/50 border-cyber-blue/20">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-cyber-blue/20 rounded-lg">
                <Bell className="h-5 w-5 text-cyber-blue" />
              </div>
              <div>
                <CardTitle className="text-white text-lg font-semibold">
                  Active Alerts
                </CardTitle>
                <p className="text-cyber-blue/80 text-sm">
                  Monitor your trading conditions
                </p>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={onOpenAlertModal}
              className="border-cyber-blue/30 text-cyber-blue hover:bg-cyber-blue/10"
            >
              <Plus className="h-4 w-4 mr-2" />
              New Alert
            </Button>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          {activeAlerts.map((alert, index) => (
            <motion.div
              key={alert.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative"
            >
              <Card className="bg-cyber-black/40 border-cyber-blue/20 hover:border-cyber-blue/40 transition-all duration-300 hover:shadow-lg hover:shadow-cyber-blue/10">
                <div className="p-4 space-y-3">
                  {/* Enhanced Header */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div
                        className={cn(
                          "p-2 rounded-lg",
                          getAlertColor(alert.type),
                        )}
                      >
                        {getAlertIcon(alert.type)}
                      </div>
                      <div>
                        <h4 className="font-semibold text-white text-base">
                          {alert.symbol}
                        </h4>
                        <p className="text-white/60 text-sm capitalize">
                          {alert.type} Alert
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {alert.priority === "high" && (
                        <Badge className="bg-cyber-red/20 text-cyber-red border-cyber-red/30 text-xs">
                          High Priority
                        </Badge>
                      )}
                      <Badge
                        variant="outline"
                        className={cn("text-xs", getAlertColor(alert.type))}
                      >
                        Active
                      </Badge>
                    </div>
                  </div>

                  {/* Enhanced Condition */}
                  <div className="bg-cyber-dark/50 rounded-lg p-3">
                    <div className="flex items-start space-x-2">
                      <Target className="h-4 w-4 text-cyber-blue mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-white font-medium text-sm">
                          Condition
                        </p>
                        <p className="text-white/70 text-sm">
                          {alert.condition}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Enhanced Progress with detailed info */}
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-white/80 font-medium">
                        Progress to Trigger
                      </span>
                      <div className="flex items-center space-x-2">
                        <span className="text-white font-bold">
                          {alert.progress}%
                        </span>
                        {alert.progress >= 90 && (
                          <Badge className="bg-cyber-green/20 text-cyber-green border-cyber-green/30 text-xs animate-pulse">
                            Ready
                          </Badge>
                        )}
                      </div>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${alert.progress}%` }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        className={cn(
                          "h-2 rounded-full relative",
                          getProgressColor(alert.progress),
                        )}
                      >
                        {alert.progress > 0 && (
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/20 rounded-full" />
                        )}
                      </motion.div>
                    </div>

                    {/* Progress milestones */}
                    <div className="flex justify-between text-xs text-white/50">
                      <span>0%</span>
                      <span>25%</span>
                      <span>50%</span>
                      <span>75%</span>
                      <span>100%</span>
                    </div>
                  </div>

                  {/* Action buttons */}
                  <div className="flex space-x-2 pt-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1 border-cyber-blue/30 text-cyber-blue hover:bg-cyber-blue/10"
                    >
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1 border-cyber-red/30 text-cyber-red hover:bg-cyber-red/10"
                    >
                      Pause
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}

          {/* Enhanced Summary Stats */}
          <div className="pt-4 border-t border-white/10">
            <h3 className="text-white font-semibold mb-4">Alert Statistics</h3>
            <div className="grid grid-cols-2 gap-4">
              <Card className="bg-cyber-blue/10 border-cyber-blue/30 p-3">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-cyber-blue/20 rounded-lg">
                    <Bell className="h-4 w-4 text-cyber-blue" />
                  </div>
                  <div>
                    <div className="text-xl font-bold text-cyber-blue">
                      {alerts.filter((a) => a.isActive).length}
                    </div>
                    <div className="text-xs text-white/70">Active Alerts</div>
                  </div>
                </div>
              </Card>

              <Card className="bg-cyber-green/10 border-cyber-green/30 p-3">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-cyber-green/20 rounded-lg">
                    <Target className="h-4 w-4 text-cyber-green" />
                  </div>
                  <div>
                    <div className="text-xl font-bold text-cyber-green">
                      {
                        alerts.filter((a) => a.isActive && a.progress >= 90)
                          .length
                      }
                    </div>
                    <div className="text-xs text-white/70">
                      Ready to Trigger
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="bg-cyber-red/10 border-cyber-red/30 p-3">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-cyber-red/20 rounded-lg">
                    <AlertTriangle className="h-4 w-4 text-cyber-red" />
                  </div>
                  <div>
                    <div className="text-xl font-bold text-cyber-red">
                      {alerts.filter((a) => a.priority === "high").length}
                    </div>
                    <div className="text-xs text-white/70">High Priority</div>
                  </div>
                </div>
              </Card>

              <Card className="bg-cyber-yellow/10 border-cyber-yellow/30 p-3">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-cyber-yellow/20 rounded-lg">
                    <Volume2 className="h-4 w-4 text-cyber-yellow" />
                  </div>
                  <div>
                    <div className="text-xl font-bold text-cyber-yellow">
                      {alerts.filter((a) => !a.isActive).length}
                    </div>
                    <div className="text-xs text-white/70">Paused</div>
                  </div>
                </div>
              </Card>
            </div>
          </div>

          {/* Enhanced Action Buttons */}
          <div className="space-y-2 pt-4">
            <Button
              onClick={onOpenAlertModal}
              className="w-full bg-cyber-blue/20 hover:bg-cyber-blue/30 text-cyber-blue border border-cyber-blue/30"
              variant="outline"
            >
              <Bell className="h-4 w-4 mr-2" />
              Manage All Alerts
            </Button>
            <div className="grid grid-cols-2 gap-2">
              <Button
                variant="outline"
                size="sm"
                className="border-cyber-green/30 text-cyber-green hover:bg-cyber-green/10"
              >
                <Plus className="h-3 w-3 mr-2" />
                Quick Alert
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="border-cyber-purple/30 text-cyber-purple hover:bg-cyber-purple/10"
              >
                <TrendingUp className="h-3 w-3 mr-2" />
                Templates
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Additional Quick Actions Card */}
      <Card className="bg-cyber-dark/50 border-cyber-purple/20">
        <CardHeader className="pb-3">
          <CardTitle className="text-white text-lg font-semibold flex items-center space-x-2">
            <Target className="h-5 w-5 text-cyber-purple" />
            <span>Quick Actions</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button
            variant="outline"
            className="w-full justify-start border-cyber-green/30 text-cyber-green hover:bg-cyber-green/10"
          >
            <TrendingUp className="h-4 w-4 mr-3" />
            Set Breakout Alert
          </Button>
          <Button
            variant="outline"
            className="w-full justify-start border-cyber-red/30 text-cyber-red hover:bg-cyber-red/10"
          >
            <TrendingDown className="h-4 w-4 mr-3" />
            Set Support Alert
          </Button>
          <Button
            variant="outline"
            className="w-full justify-start border-cyber-yellow/30 text-cyber-yellow hover:bg-cyber-yellow/10"
          >
            <Volume2 className="h-4 w-4 mr-3" />
            Set Volume Alert
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default AlertsSidebar;
