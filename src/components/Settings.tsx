import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Settings as SettingsIcon,
  User,
  Bell,
  Palette,
  Shield,
  Monitor,
  Smartphone,
  Mail,
  DollarSign,
  Globe,
  Moon,
  Sun,
  Zap,
  Eye,
  Volume2,
  Vibrate,
  Lock,
  Key,
  Database,
  Download,
  Upload,
  Trash2,
  Save,
  X,
  Check,
  RefreshCw,
  AlertTriangle,
  Info,
  BarChart3,
  TrendingUp,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SettingsProps {
  onClose?: () => void;
  className?: string;
}

interface UserSettings {
  // Profile
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  timezone: string;
  currency: string;

  // Trading Preferences
  defaultOrderType: "market" | "limit" | "stop";
  confirmBeforeTrade: boolean;
  autoRefreshInterval: number;
  showPreMarket: boolean;
  showAfterHours: boolean;
  enablePaperTrading: boolean;

  // Notifications
  emailNotifications: boolean;
  pushNotifications: boolean;
  smsNotifications: boolean;
  priceAlerts: boolean;
  newsAlerts: boolean;
  portfolioUpdates: boolean;
  soundEnabled: boolean;
  vibrationEnabled: boolean;

  // Display
  theme: "light" | "dark" | "auto";
  chartType: "candlestick" | "line" | "area";
  showVolume: boolean;
  showIndicators: boolean;
  compactMode: boolean;
  animationsEnabled: boolean;

  // Privacy & Security
  twoFactorEnabled: boolean;
  sessionTimeout: number;
  dataSharing: boolean;
  analyticsEnabled: boolean;
}

const Settings = ({ onClose, className }: SettingsProps) => {
  const [settings, setSettings] = useState<UserSettings>({
    // Profile
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "+1-555-0123",
    timezone: "America/New_York",
    currency: "USD",

    // Trading Preferences
    defaultOrderType: "market",
    confirmBeforeTrade: true,
    autoRefreshInterval: 30,
    showPreMarket: true,
    showAfterHours: true,
    enablePaperTrading: false,

    // Notifications
    emailNotifications: true,
    pushNotifications: true,
    smsNotifications: false,
    priceAlerts: true,
    newsAlerts: true,
    portfolioUpdates: true,
    soundEnabled: true,
    vibrationEnabled: true,

    // Display
    theme: "dark",
    chartType: "candlestick",
    showVolume: true,
    showIndicators: true,
    compactMode: false,
    animationsEnabled: true,

    // Privacy & Security
    twoFactorEnabled: false,
    sessionTimeout: 30,
    dataSharing: false,
    analyticsEnabled: true,
  });

  const [activeTab, setActiveTab] = useState("profile");
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const updateSetting = <K extends keyof UserSettings>(
    key: K,
    value: UserSettings[K],
  ) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = async () => {
    setIsSaving(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setSaved(true);
    setIsSaving(false);

    // Reset saved state after 3 seconds
    setTimeout(() => setSaved(false), 3000);
  };

  const handleReset = () => {
    // Reset to default values
    setSettings({
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      phone: "+1-555-0123",
      timezone: "America/New_York",
      currency: "USD",
      defaultOrderType: "market",
      confirmBeforeTrade: true,
      autoRefreshInterval: 30,
      showPreMarket: true,
      showAfterHours: true,
      enablePaperTrading: false,
      emailNotifications: true,
      pushNotifications: true,
      smsNotifications: false,
      priceAlerts: true,
      newsAlerts: true,
      portfolioUpdates: true,
      soundEnabled: true,
      vibrationEnabled: true,
      theme: "dark",
      chartType: "candlestick",
      showVolume: true,
      showIndicators: true,
      compactMode: false,
      animationsEnabled: true,
      twoFactorEnabled: false,
      sessionTimeout: 30,
      dataSharing: false,
      analyticsEnabled: true,
    });
  };

  const timezones = [
    { value: "America/New_York", label: "Eastern Time (ET)" },
    { value: "America/Chicago", label: "Central Time (CT)" },
    { value: "America/Denver", label: "Mountain Time (MT)" },
    { value: "America/Los_Angeles", label: "Pacific Time (PT)" },
    { value: "Europe/London", label: "London (GMT)" },
    { value: "Europe/Paris", label: "Paris (CET)" },
    { value: "Asia/Tokyo", label: "Tokyo (JST)" },
    { value: "Asia/Hong_Kong", label: "Hong Kong (HKT)" },
  ];

  const currencies = [
    { value: "USD", label: "US Dollar ($)" },
    { value: "EUR", label: "Euro (€)" },
    { value: "GBP", label: "British Pound (£)" },
    { value: "JPY", label: "Japanese Yen (¥)" },
    { value: "CAD", label: "Canadian Dollar (C$)" },
    { value: "AUD", label: "Australian Dollar (A$)" },
    { value: "CHF", label: "Swiss Franc (CHF)" },
    { value: "CNY", label: "Chinese Yuan (¥)" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={cn(
        "fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4",
        className,
      )}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="w-full max-w-4xl max-h-[90vh] overflow-hidden"
      >
        <Card className="bg-gradient-to-br from-gray-900/95 via-gray-800/95 to-gray-900/95 backdrop-blur-xl border border-cyan-500/20 shadow-2xl">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-700/50">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-cyan-500/20 rounded-xl">
                <SettingsIcon className="h-6 w-6 text-cyan-400" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">Settings</h2>
                <p className="text-gray-400">
                  Customize your trading experience
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              {saved && (
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="flex items-center space-x-2 text-cyber-green"
                >
                  <Check className="h-4 w-4" />
                  <span className="text-sm">Saved!</span>
                </motion.div>
              )}

              <Button
                onClick={handleSave}
                disabled={isSaving}
                className="bg-cyber-green hover:bg-cyber-green-dark text-white"
              >
                {isSaving ? (
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <Save className="h-4 w-4 mr-2" />
                )}
                Save
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="text-gray-400 hover:text-white"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Content */}
          <div className="flex h-[70vh]">
            {/* Sidebar */}
            <div className="w-64 border-r border-gray-700/50 p-4">
              <Tabs
                value={activeTab}
                onValueChange={setActiveTab}
                orientation="vertical"
              >
                <TabsList className="flex flex-col space-y-1 bg-transparent w-full h-auto">
                  <TabsTrigger
                    value="profile"
                    className="w-full justify-start data-[state=active]:bg-cyber-blue/20 data-[state=active]:text-cyber-blue"
                  >
                    <User className="h-4 w-4 mr-3" />
                    Profile
                  </TabsTrigger>
                  <TabsTrigger
                    value="trading"
                    className="w-full justify-start data-[state=active]:bg-cyber-green/20 data-[state=active]:text-cyber-green"
                  >
                    <DollarSign className="h-4 w-4 mr-3" />
                    Trading
                  </TabsTrigger>
                  <TabsTrigger
                    value="notifications"
                    className="w-full justify-start data-[state=active]:bg-cyber-yellow/20 data-[state=active]:text-cyber-yellow"
                  >
                    <Bell className="h-4 w-4 mr-3" />
                    Notifications
                  </TabsTrigger>
                  <TabsTrigger
                    value="display"
                    className="w-full justify-start data-[state=active]:bg-cyber-purple/20 data-[state=active]:text-cyber-purple"
                  >
                    <Palette className="h-4 w-4 mr-3" />
                    Display
                  </TabsTrigger>
                  <TabsTrigger
                    value="security"
                    className="w-full justify-start data-[state=active]:bg-cyber-red/20 data-[state=active]:text-cyber-red"
                  >
                    <Shield className="h-4 w-4 mr-3" />
                    Security
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            {/* Main Content */}
            <div className="flex-1 overflow-y-auto">
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                {/* Profile Settings */}
                <TabsContent value="profile" className="p-6 space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-4">
                      Profile Information
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label className="text-gray-300 mb-2 block">
                          First Name
                        </Label>
                        <Input
                          value={settings.firstName}
                          onChange={(e) =>
                            updateSetting("firstName", e.target.value)
                          }
                          className="bg-gray-800/50 border-gray-600 text-white"
                        />
                      </div>

                      <div>
                        <Label className="text-gray-300 mb-2 block">
                          Last Name
                        </Label>
                        <Input
                          value={settings.lastName}
                          onChange={(e) =>
                            updateSetting("lastName", e.target.value)
                          }
                          className="bg-gray-800/50 border-gray-600 text-white"
                        />
                      </div>

                      <div>
                        <Label className="text-gray-300 mb-2 block">
                          Email
                        </Label>
                        <Input
                          type="email"
                          value={settings.email}
                          onChange={(e) =>
                            updateSetting("email", e.target.value)
                          }
                          className="bg-gray-800/50 border-gray-600 text-white"
                        />
                      </div>

                      <div>
                        <Label className="text-gray-300 mb-2 block">
                          Phone
                        </Label>
                        <Input
                          value={settings.phone}
                          onChange={(e) =>
                            updateSetting("phone", e.target.value)
                          }
                          className="bg-gray-800/50 border-gray-600 text-white"
                        />
                      </div>

                      <div>
                        <Label className="text-gray-300 mb-2 block">
                          Timezone
                        </Label>
                        <select
                          value={settings.timezone}
                          onChange={(e) =>
                            updateSetting("timezone", e.target.value)
                          }
                          className="w-full px-3 py-2 bg-gray-800/50 border border-gray-600 rounded-md text-white"
                        >
                          {timezones.map((tz) => (
                            <option key={tz.value} value={tz.value}>
                              {tz.label}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <Label className="text-gray-300 mb-2 block">
                          Base Currency
                        </Label>
                        <select
                          value={settings.currency}
                          onChange={(e) =>
                            updateSetting("currency", e.target.value)
                          }
                          className="w-full px-3 py-2 bg-gray-800/50 border border-gray-600 rounded-md text-white"
                        >
                          {currencies.map((curr) => (
                            <option key={curr.value} value={curr.value}>
                              {curr.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                {/* Trading Settings */}
                <TabsContent value="trading" className="p-6 space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-4">
                      Trading Preferences
                    </h3>

                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label className="text-gray-300 mb-2 block">
                            Default Order Type
                          </Label>
                          <select
                            value={settings.defaultOrderType}
                            onChange={(e) =>
                              updateSetting(
                                "defaultOrderType",
                                e.target.value as any,
                              )
                            }
                            className="w-full px-3 py-2 bg-gray-800/50 border border-gray-600 rounded-md text-white"
                          >
                            <option value="market">Market Order</option>
                            <option value="limit">Limit Order</option>
                            <option value="stop">Stop Order</option>
                          </select>
                        </div>

                        <div>
                          <Label className="text-gray-300 mb-2 block">
                            Auto Refresh (seconds)
                          </Label>
                          <Input
                            type="number"
                            min="5"
                            max="300"
                            value={settings.autoRefreshInterval}
                            onChange={(e) =>
                              updateSetting(
                                "autoRefreshInterval",
                                parseInt(e.target.value),
                              )
                            }
                            className="bg-gray-800/50 border-gray-600 text-white"
                          />
                        </div>
                      </div>

                      <Separator className="my-4" />

                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <AlertTriangle className="h-4 w-4 text-yellow-400" />
                            <div>
                              <Label className="text-gray-300">
                                Confirm Before Trade
                              </Label>
                              <p className="text-sm text-gray-500">
                                Show confirmation dialog before executing trades
                              </p>
                            </div>
                          </div>
                          <Switch
                            checked={settings.confirmBeforeTrade}
                            onCheckedChange={(checked) =>
                              updateSetting("confirmBeforeTrade", checked)
                            }
                          />
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <Monitor className="h-4 w-4 text-cyan-400" />
                            <div>
                              <Label className="text-gray-300">
                                Show Pre-Market
                              </Label>
                              <p className="text-sm text-gray-500">
                                Display pre-market trading data
                              </p>
                            </div>
                          </div>
                          <Switch
                            checked={settings.showPreMarket}
                            onCheckedChange={(checked) =>
                              updateSetting("showPreMarket", checked)
                            }
                          />
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <Moon className="h-4 w-4 text-purple-400" />
                            <div>
                              <Label className="text-gray-300">
                                Show After Hours
                              </Label>
                              <p className="text-sm text-gray-500">
                                Display after-hours trading data
                              </p>
                            </div>
                          </div>
                          <Switch
                            checked={settings.showAfterHours}
                            onCheckedChange={(checked) =>
                              updateSetting("showAfterHours", checked)
                            }
                          />
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <Zap className="h-4 w-4 text-green-400" />
                            <div>
                              <Label className="text-gray-300">
                                Paper Trading Mode
                              </Label>
                              <p className="text-sm text-gray-500">
                                Practice trading with virtual money
                              </p>
                            </div>
                          </div>
                          <Switch
                            checked={settings.enablePaperTrading}
                            onCheckedChange={(checked) =>
                              updateSetting("enablePaperTrading", checked)
                            }
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                {/* Notification Settings */}
                <TabsContent value="notifications" className="p-6 space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-4">
                      Notification Preferences
                    </h3>

                    <div className="space-y-6">
                      <div>
                        <h4 className="text-lg font-medium text-white mb-3">
                          Notification Methods
                        </h4>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <Mail className="h-4 w-4 text-blue-400" />
                              <div>
                                <Label className="text-gray-300">
                                  Email Notifications
                                </Label>
                                <p className="text-sm text-gray-500">
                                  Receive updates via email
                                </p>
                              </div>
                            </div>
                            <Switch
                              checked={settings.emailNotifications}
                              onCheckedChange={(checked) =>
                                updateSetting("emailNotifications", checked)
                              }
                            />
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <Smartphone className="h-4 w-4 text-green-400" />
                              <div>
                                <Label className="text-gray-300">
                                  Push Notifications
                                </Label>
                                <p className="text-sm text-gray-500">
                                  Browser and mobile push notifications
                                </p>
                              </div>
                            </div>
                            <Switch
                              checked={settings.pushNotifications}
                              onCheckedChange={(checked) =>
                                updateSetting("pushNotifications", checked)
                              }
                            />
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <Volume2 className="h-4 w-4 text-yellow-400" />
                              <div>
                                <Label className="text-gray-300">
                                  Sound Alerts
                                </Label>
                                <p className="text-sm text-gray-500">
                                  Play sound for important alerts
                                </p>
                              </div>
                            </div>
                            <Switch
                              checked={settings.soundEnabled}
                              onCheckedChange={(checked) =>
                                updateSetting("soundEnabled", checked)
                              }
                            />
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <Vibrate className="h-4 w-4 text-purple-400" />
                              <div>
                                <Label className="text-gray-300">
                                  Vibration
                                </Label>
                                <p className="text-sm text-gray-500">
                                  Vibrate for mobile notifications
                                </p>
                              </div>
                            </div>
                            <Switch
                              checked={settings.vibrationEnabled}
                              onCheckedChange={(checked) =>
                                updateSetting("vibrationEnabled", checked)
                              }
                            />
                          </div>
                        </div>
                      </div>

                      <Separator className="my-4" />

                      <div>
                        <h4 className="text-lg font-medium text-white mb-3">
                          Alert Types
                        </h4>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <DollarSign className="h-4 w-4 text-green-400" />
                              <Label className="text-gray-300">
                                Price Alerts
                              </Label>
                            </div>
                            <Switch
                              checked={settings.priceAlerts}
                              onCheckedChange={(checked) =>
                                updateSetting("priceAlerts", checked)
                              }
                            />
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <Globe className="h-4 w-4 text-blue-400" />
                              <Label className="text-gray-300">
                                News Alerts
                              </Label>
                            </div>
                            <Switch
                              checked={settings.newsAlerts}
                              onCheckedChange={(checked) =>
                                updateSetting("newsAlerts", checked)
                              }
                            />
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <Eye className="h-4 w-4 text-purple-400" />
                              <Label className="text-gray-300">
                                Portfolio Updates
                              </Label>
                            </div>
                            <Switch
                              checked={settings.portfolioUpdates}
                              onCheckedChange={(checked) =>
                                updateSetting("portfolioUpdates", checked)
                              }
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                {/* Display Settings */}
                <TabsContent value="display" className="p-6 space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-4">
                      Display Preferences
                    </h3>

                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label className="text-gray-300 mb-2 block">
                            Theme
                          </Label>
                          <select
                            value={settings.theme}
                            onChange={(e) =>
                              updateSetting("theme", e.target.value as any)
                            }
                            className="w-full px-3 py-2 bg-gray-800/50 border border-gray-600 rounded-md text-white"
                          >
                            <option value="light">Light</option>
                            <option value="dark">Dark</option>
                            <option value="auto">Auto</option>
                          </select>
                        </div>

                        <div>
                          <Label className="text-gray-300 mb-2 block">
                            Chart Type
                          </Label>
                          <select
                            value={settings.chartType}
                            onChange={(e) =>
                              updateSetting("chartType", e.target.value as any)
                            }
                            className="w-full px-3 py-2 bg-gray-800/50 border border-gray-600 rounded-md text-white"
                          >
                            <option value="candlestick">Candlestick</option>
                            <option value="line">Line</option>
                            <option value="area">Area</option>
                          </select>
                        </div>
                      </div>

                      <Separator className="my-4" />

                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <BarChart3 className="h-4 w-4 text-cyan-400" />
                            <Label className="text-gray-300">Show Volume</Label>
                          </div>
                          <Switch
                            checked={settings.showVolume}
                            onCheckedChange={(checked) =>
                              updateSetting("showVolume", checked)
                            }
                          />
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <TrendingUp className="h-4 w-4 text-green-400" />
                            <Label className="text-gray-300">
                              Show Indicators
                            </Label>
                          </div>
                          <Switch
                            checked={settings.showIndicators}
                            onCheckedChange={(checked) =>
                              updateSetting("showIndicators", checked)
                            }
                          />
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <Monitor className="h-4 w-4 text-purple-400" />
                            <Label className="text-gray-300">
                              Compact Mode
                            </Label>
                          </div>
                          <Switch
                            checked={settings.compactMode}
                            onCheckedChange={(checked) =>
                              updateSetting("compactMode", checked)
                            }
                          />
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <Zap className="h-4 w-4 text-yellow-400" />
                            <Label className="text-gray-300">Animations</Label>
                          </div>
                          <Switch
                            checked={settings.animationsEnabled}
                            onCheckedChange={(checked) =>
                              updateSetting("animationsEnabled", checked)
                            }
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                {/* Security Settings */}
                <TabsContent value="security" className="p-6 space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-4">
                      Security & Privacy
                    </h3>

                    <div className="space-y-6">
                      <div>
                        <h4 className="text-lg font-medium text-white mb-3">
                          Authentication
                        </h4>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <Lock className="h-4 w-4 text-red-400" />
                              <div>
                                <Label className="text-gray-300">
                                  Two-Factor Authentication
                                </Label>
                                <p className="text-sm text-gray-500">
                                  Add an extra layer of security
                                </p>
                              </div>
                            </div>
                            <Switch
                              checked={settings.twoFactorEnabled}
                              onCheckedChange={(checked) =>
                                updateSetting("twoFactorEnabled", checked)
                              }
                            />
                          </div>

                          <div>
                            <Label className="text-gray-300 mb-2 block">
                              Session Timeout (minutes)
                            </Label>
                            <Input
                              type="number"
                              min="5"
                              max="120"
                              value={settings.sessionTimeout}
                              onChange={(e) =>
                                updateSetting(
                                  "sessionTimeout",
                                  parseInt(e.target.value),
                                )
                              }
                              className="bg-gray-800/50 border-gray-600 text-white w-32"
                            />
                          </div>
                        </div>
                      </div>

                      <Separator className="my-4" />

                      <div>
                        <h4 className="text-lg font-medium text-white mb-3">
                          Privacy
                        </h4>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <Database className="h-4 w-4 text-blue-400" />
                              <div>
                                <Label className="text-gray-300">
                                  Data Sharing
                                </Label>
                                <p className="text-sm text-gray-500">
                                  Share anonymous usage data
                                </p>
                              </div>
                            </div>
                            <Switch
                              checked={settings.dataSharing}
                              onCheckedChange={(checked) =>
                                updateSetting("dataSharing", checked)
                              }
                            />
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <BarChart3 className="h-4 w-4 text-green-400" />
                              <div>
                                <Label className="text-gray-300">
                                  Analytics
                                </Label>
                                <p className="text-sm text-gray-500">
                                  Help improve the platform
                                </p>
                              </div>
                            </div>
                            <Switch
                              checked={settings.analyticsEnabled}
                              onCheckedChange={(checked) =>
                                updateSetting("analyticsEnabled", checked)
                              }
                            />
                          </div>
                        </div>
                      </div>

                      <Separator className="my-4" />

                      <div>
                        <h4 className="text-lg font-medium text-white mb-3">
                          Data Management
                        </h4>
                        <div className="flex space-x-3">
                          <Button
                            variant="outline"
                            className="border-blue-500/50 text-blue-400 hover:bg-blue-500/10"
                          >
                            <Download className="h-4 w-4 mr-2" />
                            Export Data
                          </Button>

                          <Button
                            variant="outline"
                            className="border-green-500/50 text-green-400 hover:bg-green-500/10"
                          >
                            <Upload className="h-4 w-4 mr-2" />
                            Import Settings
                          </Button>

                          <Button
                            variant="outline"
                            className="border-red-500/50 text-red-400 hover:bg-red-500/10"
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Clear All Data
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>

          {/* Footer */}
          <div className="border-t border-gray-700/50 p-4 flex items-center justify-between">
            <Button
              variant="outline"
              onClick={handleReset}
              className="border-gray-600 text-gray-400 hover:bg-gray-800"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Reset to Defaults
            </Button>

            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <Info className="h-4 w-4" />
              <span>Settings are automatically saved to your account</span>
            </div>
          </div>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default Settings;
