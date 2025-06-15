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
  MoreHorizontal,
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
      condition: "Price above $195",
      progress: 97,
      priority: "high",
      isActive: true,
    },
    {
      id: "2",
      symbol: "TSLA",
      type: "support",
      condition: "Support at $250",
      progress: 45,
      priority: "medium",
      isActive: true,
    },
    {
      id: "3",
      symbol: "MSFT",
      type: "volume",
      condition: "Volume > 50M",
      progress: 12,
      priority: "low",
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
        return "text-cyber-green";
      case "support":
        return "text-cyber-yellow";
      case "movement":
        return "text-cyber-blue";
      case "volume":
        return "text-cyber-purple";
      default:
        return "text-white/70";
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
      {/* Compact Main Alerts Card */}
      <Card className="bg-white/10 backdrop-blur-md border border-cyber-red/20 shadow-cyber">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="p-1.5 bg-cyber-red/20 rounded-lg">
                <Bell className="h-4 w-4 text-cyber-red" />
              </div>
              <div>
                <CardTitle className="text-white text-base font-semibold">
                  Active Alerts
                </CardTitle>
                <p className="text-cyber-red/80 text-xs">
                  {activeAlerts.length} monitoring
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onOpenAlertModal}
              className="text-cyber-red hover:bg-cyber-red/10 h-8 w-8 p-0"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>

        <CardContent className="space-y-3 pt-0">
          {activeAlerts.slice(0, 3).map((alert, index) => (
            <motion.div
              key={alert.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-3 bg-white/5 border border-white/10 rounded-lg hover:border-cyber-red/30 transition-all duration-200"
            >
              {/* Compact Header */}
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <div
                    className={cn("flex-shrink-0", getAlertColor(alert.type))}
                  >
                    {getAlertIcon(alert.type)}
                  </div>
                  <div>
                    <h4 className="font-semibold text-white text-sm">
                      {alert.symbol}
                    </h4>
                    <p className="text-white/60 text-xs">{alert.condition}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-1">
                  {alert.priority === "high" && (
                    <div className="w-2 h-2 bg-cyber-red rounded-full animate-pulse" />
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-white/40 hover:text-white h-6 w-6 p-0"
                  >
                    <MoreHorizontal className="h-3 w-3" />
                  </Button>
                </div>
              </div>

              {/* Compact Progress */}
              <div className="space-y-1">
                <div className="flex justify-between items-center">
                  <span className="text-white/70 text-xs">Progress</span>
                  <span className="text-white font-medium text-xs">
                    {alert.progress}%
                  </span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-1.5 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${alert.progress}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className={cn(
                      "h-1.5 rounded-full",
                      getProgressColor(alert.progress),
                    )}
                  />
                </div>
              </div>
            </motion.div>
          ))}

          {/* Compact Stats Row */}
          <div className="grid grid-cols-3 gap-2 pt-3 border-t border-white/10">
            <div className="text-center">
              <div className="text-cyber-red font-bold text-sm">
                {activeAlerts.length}
              </div>
              <div className="text-white/60 text-xs">Active</div>
            </div>
            <div className="text-center">
              <div className="text-cyber-green font-bold text-sm">
                {alerts.filter((a) => a.progress >= 90).length}
              </div>
              <div className="text-white/60 text-xs">Ready</div>
            </div>
            <div className="text-center">
              <div className="text-cyber-yellow font-bold text-sm">
                {alerts.filter((a) => a.priority === "high").length}
              </div>
              <div className="text-white/60 text-xs">High</div>
            </div>
          </div>

          {/* Compact Action Button */}
          <Button
            onClick={onOpenAlertModal}
            variant="outline"
            className="w-full border-cyber-red/30 text-cyber-red hover:bg-cyber-red/10"
            size="sm"
          >
            <Bell className="h-3 w-3 mr-2" />
            Manage Alerts
          </Button>
        </CardContent>
      </Card>

      {/* Compact Quick Actions */}
      <Card className="bg-white/10 backdrop-blur-md border border-cyber-purple/20 shadow-cyber">
        <CardHeader className="pb-2">
          <CardTitle className="text-white text-sm font-semibold flex items-center space-x-2">
            <Target className="h-4 w-4 text-cyber-purple" />
            <span>Quick Setup</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 pt-0">
          <div className="grid grid-cols-1 gap-2">
            <Button
              variant="outline"
              size="sm"
              className="justify-start border-cyber-green/30 text-cyber-green hover:bg-cyber-green/10 h-8"
            >
              <TrendingUp className="h-3 w-3 mr-2" />
              <span className="text-xs">Breakout</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="justify-start border-cyber-yellow/30 text-cyber-yellow hover:bg-cyber-yellow/10 h-8"
            >
              <TrendingDown className="h-3 w-3 mr-2" />
              <span className="text-xs">Support</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="justify-start border-cyber-blue/30 text-cyber-blue hover:bg-cyber-blue/10 h-8"
            >
              <Volume2 className="h-3 w-3 mr-2" />
              <span className="text-xs">Volume</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AlertsSidebar;
