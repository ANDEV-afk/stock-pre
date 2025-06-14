import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import GlobalAnimatedBackground from "@/components/GlobalAnimatedBackground";
import BackgroundVideoOverlay from "@/components/BackgroundVideoOverlay";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  TrendingUp,
  TrendingDown,
  Search,
  Filter,
  Globe,
  MapPin,
  Clock,
  DollarSign,
  BarChart3,
  Activity,
  Star,
  ArrowUpRight,
  ArrowDownRight,
  RefreshCw,
  Eye,
  Plus,
  ChevronDown,
  ChevronUp,
  Calendar,
  Volume2,
  Zap,
  LineChart,
  X,
  CreditCard,
  ThumbsUp,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { usePayment } from "@/contexts/PaymentContext";
import { RealCompany, TOP_50_COMPANIES } from "@/lib/companies-data";
import CompanyLogo from "@/components/CompanyLogo";
import ProfessionalChart from "@/components/ProfessionalChart";

interface TopCompany extends RealCompany {}

interface MarketIndex {
  id: string;
  name: string;
  symbol: string;
  country: string;
  region: string;
  value: number;
  change: number;
  changePercent: number;
  currency: string;
  marketCap: string;
  volume: number;
  isOpen: boolean;
  openTime: string;
  closeTime: string;
  timezone: string;
  lastUpdate: Date;
}

interface TopCompany {
  id: string;
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  marketCap: string;
  volume: number;
  country: string;
  sector: string;
  pe: number;
  dividend: number;
  beta: number;
  isWatched: boolean;
}

const GlobalMarkets = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("all");
  const [selectedSector, setSelectedSector] = useState("all");
  const [sortBy, setSortBy] = useState<
    "marketCap" | "change" | "volume" | "name"
  >("marketCap");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [showFilters, setShowFilters] = useState(false);
  const [showOnlyOpen, setShowOnlyOpen] = useState(false);
  const [watchlist, setWatchlist] = useState<Set<string>>(new Set());
  const [likedStocks, setLikedStocks] = useState<Set<string>>(new Set());
  const [showChartModal, setShowChartModal] = useState(false);
  const [selectedCompanyForChart, setSelectedCompanyForChart] =
    useState<TopCompany | null>(null);
  const [marketCapFilter, setMarketCapFilter] = useState("all");
  const [priceRangeFilter, setPriceRangeFilter] = useState("all");
  const [performanceFilter, setPerformanceFilter] = useState("all");
  const [highlightedCompany, setHighlightedCompany] = useState<string | null>(
    null,
  );

  const [marketIndices, setMarketIndices] = useState<MarketIndex[]>([]);
  const [topCompanies, setTopCompanies] = useState<TopCompany[]>([]);

  // Payment context
  const { isPaid } = usePayment();

  // Handle search parameter from URL (when coming from home page search)
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchParam = urlParams.get("search");
    if (searchParam) {
      setSearchQuery(searchParam);
      setHighlightedCompany(searchParam.toUpperCase());
      // Remove search param from URL after processing
      navigate("/markets", { replace: true });

      // Scroll to highlighted company after a short delay
      setTimeout(() => {
        const element = document.getElementById(
          `company-${searchParam.toUpperCase()}`,
        );
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      }, 1000);

      // Remove highlighting after 5 seconds
      setTimeout(() => {
        setHighlightedCompany(null);
      }, 5000);
    }
  }, [location.search, navigate]);

  const regions = [
    { id: "all", label: "All Regions", count: 0 },
    { id: "north-america", label: "North America", count: 15 },
    { id: "europe", label: "Europe", count: 12 },
    { id: "asia-pacific", label: "Asia Pacific", count: 18 },
    { id: "emerging", label: "Emerging Markets", count: 8 },
  ];

  const sectors = [
    {
      id: "all",
      label: "All Sectors",
      count: 50,
      color: "bg-gray-500",
      icon: "🏢",
    },
    {
      id: "technology",
      label: "Technology",
      count: 12,
      color: "bg-blue-500",
      icon: "💻",
    },
    {
      id: "finance",
      label: "Financial Services",
      count: 8,
      color: "bg-green-500",
      icon: "💰",
    },
    {
      id: "healthcare",
      label: "Healthcare",
      count: 6,
      color: "bg-red-500",
      icon: "🏥",
    },
    {
      id: "consumer",
      label: "Consumer Goods",
      count: 7,
      color: "bg-purple-500",
      icon: "🛍️",
    },
    {
      id: "energy",
      label: "Energy",
      count: 5,
      color: "bg-yellow-500",
      icon: "⚡",
    },
    {
      id: "industrial",
      label: "Industrial",
      count: 4,
      color: "bg-orange-500",
      icon: "🏭",
    },
    {
      id: "telecommunications",
      label: "Telecommunications",
      count: 3,
      color: "bg-cyan-500",
      icon: "📡",
    },
    {
      id: "utilities",
      label: "Utilities",
      count: 2,
      color: "bg-indigo-500",
      icon: "🔧",
    },
    {
      id: "real-estate",
      label: "Real Estate",
      count: 3,
      color: "bg-pink-500",
      icon: "🏠",
    },
  ];

  const marketCapFilters = [
    { id: "all", label: "All Caps" },
    { id: "large", label: "Large Cap (>$10B)" },
    { id: "mid", label: "Mid Cap ($2B-$10B)" },
    { id: "small", label: "Small Cap (<$2B)" },
  ];

  const priceRangeFilters = [
    { id: "all", label: "All Prices" },
    { id: "under50", label: "Under $50" },
    { id: "50to200", label: "$50 - $200" },
    { id: "over200", label: "Over $200" },
  ];

  const performanceFilters = [
    { id: "all", label: "All Performance" },
    { id: "gainers", label: "Top Gainers" },
    { id: "losers", label: "Top Losers" },
    { id: "mostActive", label: "Most Active" },
  ];

  // Mock market indices data
  useEffect(() => {
    const mockIndices: MarketIndex[] = [
      {
        id: "spy",
        name: "S&P 500",
        symbol: "SPY",
        country: "United States",
        region: "north-america",
        value: 4567.23,
        change: 23.45,
        changePercent: 0.52,
        currency: "USD",
        marketCap: "45.2T",
        volume: 89456123,
        isOpen: true,
        openTime: "09:30",
        closeTime: "16:00",
        timezone: "EST",
        lastUpdate: new Date(Date.now() - 300000),
      },
      {
        id: "qqq",
        name: "NASDAQ 100",
        symbol: "QQQ",
        country: "United States",
        region: "north-america",
        value: 389.67,
        change: -2.34,
        changePercent: -0.6,
        currency: "USD",
        marketCap: "15.8T",
        volume: 45678901,
        isOpen: true,
        openTime: "09:30",
        closeTime: "16:00",
        timezone: "EST",
        lastUpdate: new Date(Date.now() - 180000),
      },
      {
        id: "ftse",
        name: "FTSE 100",
        symbol: "UKX",
        country: "United Kingdom",
        region: "europe",
        value: 7456.78,
        change: 12.34,
        changePercent: 0.17,
        currency: "GBP",
        marketCap: "2.1T",
        volume: 12345678,
        isOpen: false,
        openTime: "08:00",
        closeTime: "16:30",
        timezone: "GMT",
        lastUpdate: new Date(Date.now() - 3600000),
      },
      {
        id: "nikkei",
        name: "Nikkei 225",
        symbol: "N225",
        country: "Japan",
        region: "asia-pacific",
        value: 32567.89,
        change: -123.45,
        changePercent: -0.38,
        currency: "JPY",
        marketCap: "4.2T",
        volume: 23456789,
        isOpen: false,
        openTime: "09:00",
        closeTime: "15:00",
        timezone: "JST",
        lastUpdate: new Date(Date.now() - 7200000),
      },
      {
        id: "dax",
        name: "DAX",
        symbol: "DAX",
        country: "Germany",
        region: "europe",
        value: 15234.56,
        change: 45.67,
        changePercent: 0.3,
        currency: "EUR",
        marketCap: "1.8T",
        volume: 8901234,
        isOpen: false,
        openTime: "09:00",
        closeTime: "17:30",
        timezone: "CET",
        lastUpdate: new Date(Date.now() - 5400000),
      },
      {
        id: "hang-seng",
        name: "Hang Seng",
        symbol: "HSI",
        country: "Hong Kong",
        region: "asia-pacific",
        value: 18567.23,
        change: 234.56,
        changePercent: 1.28,
        currency: "HKD",
        marketCap: "3.2T",
        volume: 34567890,
        isOpen: false,
        openTime: "09:30",
        closeTime: "16:00",
        timezone: "HKT",
        lastUpdate: new Date(Date.now() - 9000000),
      },
    ];

    setMarketIndices(mockIndices);
  }, []);

  // Real top 50 companies data
  useEffect(() => {
    setTopCompanies(TOP_50_COMPANIES);
  }, []);

  const filteredIndices = marketIndices.filter((index) => {
    const matchesSearch =
      index.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      index.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
      index.country.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesRegion =
      selectedRegion === "all" || index.region === selectedRegion;
    const matchesOpenStatus = !showOnlyOpen || index.isOpen;

    return matchesSearch && matchesRegion && matchesOpenStatus;
  });

  const filteredCompanies = topCompanies
    .filter((company) => {
      const matchesSearch =
        company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        company.symbol.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesSector =
        selectedSector === "all" || company.sector === selectedSector;

      const matchesMarketCap = (() => {
        if (marketCapFilter === "all") return true;
        const mcValue = parseFloat(company.marketCap.replace(/[^0-9.]/g, ""));
        const isTrillions = company.marketCap.includes("T");
        const isBillions = company.marketCap.includes("B");
        const actualValue = isTrillions
          ? mcValue * 1000
          : isBillions
            ? mcValue
            : mcValue / 1000;

        switch (marketCapFilter) {
          case "large":
            return actualValue >= 10;
          case "mid":
            return actualValue >= 2 && actualValue < 10;
          case "small":
            return actualValue < 2;
          default:
            return true;
        }
      })();

      const matchesPriceRange = (() => {
        if (priceRangeFilter === "all") return true;
        switch (priceRangeFilter) {
          case "under50":
            return company.price < 50;
          case "50to200":
            return company.price >= 50 && company.price <= 200;
          case "over200":
            return company.price > 200;
          default:
            return true;
        }
      })();

      const matchesPerformance = (() => {
        if (performanceFilter === "all") return true;
        switch (performanceFilter) {
          case "gainers":
            return company.changePercent > 0;
          case "losers":
            return company.changePercent < 0;
          case "mostActive":
            return company.volume > 50000000; // Mock high volume threshold
          default:
            return true;
        }
      })();

      return (
        matchesSearch &&
        matchesSector &&
        matchesMarketCap &&
        matchesPriceRange &&
        matchesPerformance
      );
    })
    .sort((a, b) => {
      const aValue =
        sortBy === "marketCap"
          ? parseFloat(a.marketCap.replace(/[^0-9.]/g, ""))
          : sortBy === "change"
            ? a.changePercent
            : sortBy === "volume"
              ? a.volume
              : a.name;

      const bValue =
        sortBy === "marketCap"
          ? parseFloat(b.marketCap.replace(/[^0-9.]/g, ""))
          : sortBy === "change"
            ? b.changePercent
            : sortBy === "volume"
              ? b.volume
              : b.name;

      if (typeof aValue === "string" && typeof bValue === "string") {
        return sortOrder === "asc"
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }

      return sortOrder === "asc"
        ? (aValue as number) - (bValue as number)
        : (bValue as number) - (aValue as number);
    });

  const toggleWatchlist = (companyId: string) => {
    setWatchlist((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(companyId)) {
        newSet.delete(companyId);
      } else {
        newSet.add(companyId);
      }
      return newSet;
    });
  };

  const toggleLike = (companyId: string) => {
    setLikedStocks((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(companyId)) {
        newSet.delete(companyId);
      } else {
        newSet.add(companyId);
      }
      return newSet;
    });
  };

  const addAllToWatchlist = () => {
    const allCompanyIds = filteredCompanies.map((company) => company.id);
    setWatchlist(new Set(allCompanyIds));
  };

  const removeAllFromWatchlist = () => {
    setWatchlist(new Set());
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMinutes = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));

    if (diffMinutes < 60) {
      return `${diffMinutes}m ago`;
    } else {
      return `${diffHours}h ago`;
    }
  };

  const openChart = (company: TopCompany) => {
    setSelectedCompanyForChart(company);
    setShowChartModal(true);
  };

  const generateChartData = (company: TopCompany) => {
    // Generate realistic stock chart data for the last 30 days
    const data = [];
    const basePrice = company.price;
    let currentPrice = basePrice - company.change;

    for (let i = 29; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);

      // Add some realistic price movement
      const volatility = company.beta * 0.02; // Use beta for volatility
      const randomChange = (Math.random() - 0.5) * volatility * currentPrice;
      currentPrice += randomChange;

      data.push({
        date: date.toISOString().split("T")[0],
        price: currentPrice,
        volume:
          Math.floor(Math.random() * company.volume * 0.5) +
          company.volume * 0.5,
      });
    }

    // Ensure the last data point matches current price
    data[data.length - 1].price = company.price;

    return data;
  };

  return (
    <GlobalAnimatedBackground variant="markets" className="bg-cyber-black">
      <BackgroundVideoOverlay variant="abstract" opacity={0.05} />
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-cyber-blue via-white to-cyber-purple bg-clip-text text-transparent mb-6">
            Global Markets
          </h1>
          <p className="text-xl text-cyber-blue/80 max-w-3xl mx-auto mb-8">
            Track major market indices and top companies worldwide in real-time
          </p>

          {/* Search and Filters */}
          <div className="max-w-4xl mx-auto space-y-4">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/50" />
              <Input
                placeholder="Search markets, indices, or companies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-16 py-4 text-lg bg-white/10 border-cyber-blue/30 text-white placeholder-white/50"
              />
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowFilters(!showFilters)}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white/70 hover:text-white"
              >
                <Filter className="h-4 w-4 mr-2" />
                Filters
                {showFilters ? (
                  <ChevronUp className="h-4 w-4 ml-1" />
                ) : (
                  <ChevronDown className="h-4 w-4 ml-1" />
                )}
              </Button>
            </div>

            {/* Filter Panel */}
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="p-4 bg-white/5 border border-cyber-blue/20 rounded-xl"
              >
                <div className="space-y-4">
                  {/* First Row - Basic Filters */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                      <label className="block text-white text-sm font-medium mb-2">
                        Region
                      </label>
                      <select
                        value={selectedRegion}
                        onChange={(e) => setSelectedRegion(e.target.value)}
                        className="w-full px-3 py-2 bg-white/10 border border-cyber-blue/30 rounded-md text-white"
                      >
                        {regions.map((region) => (
                          <option key={region.id} value={region.id}>
                            {region.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-white text-sm font-medium mb-2">
                        Sector
                      </label>
                      <select
                        value={selectedSector}
                        onChange={(e) => setSelectedSector(e.target.value)}
                        className="w-full px-3 py-2 bg-white/10 border border-cyber-blue/30 rounded-md text-white"
                      >
                        {sectors.map((sector) => (
                          <option key={sector.id} value={sector.id}>
                            {sector.icon} {sector.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-white text-sm font-medium mb-2">
                        Market Cap
                      </label>
                      <select
                        value={marketCapFilter}
                        onChange={(e) => setMarketCapFilter(e.target.value)}
                        className="w-full px-3 py-2 bg-white/10 border border-cyber-blue/30 rounded-md text-white"
                      >
                        {marketCapFilters.map((filter) => (
                          <option key={filter.id} value={filter.id}>
                            {filter.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-white text-sm font-medium mb-2">
                        Price Range
                      </label>
                      <select
                        value={priceRangeFilter}
                        onChange={(e) => setPriceRangeFilter(e.target.value)}
                        className="w-full px-3 py-2 bg-white/10 border border-cyber-blue/30 rounded-md text-white"
                      >
                        {priceRangeFilters.map((filter) => (
                          <option key={filter.id} value={filter.id}>
                            {filter.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Second Row - Advanced Filters */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                      <label className="block text-white text-sm font-medium mb-2">
                        Performance
                      </label>
                      <select
                        value={performanceFilter}
                        onChange={(e) => setPerformanceFilter(e.target.value)}
                        className="w-full px-3 py-2 bg-white/10 border border-cyber-blue/30 rounded-md text-white"
                      >
                        {performanceFilters.map((filter) => (
                          <option key={filter.id} value={filter.id}>
                            {filter.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-white text-sm font-medium mb-2">
                        Sort By
                      </label>
                      <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value as any)}
                        className="w-full px-3 py-2 bg-white/10 border border-cyber-blue/30 rounded-md text-white"
                      >
                        <option value="marketCap">Market Cap</option>
                        <option value="change">% Change</option>
                        <option value="volume">Volume</option>
                        <option value="name">Name</option>
                      </select>
                    </div>

                    <div className="flex items-end space-x-2">
                      <Button
                        variant={showOnlyOpen ? "default" : "outline"}
                        size="sm"
                        onClick={() => setShowOnlyOpen(!showOnlyOpen)}
                        className={cn(
                          "flex-1",
                          showOnlyOpen
                            ? "bg-cyber-green text-white"
                            : "border-cyber-blue/30 text-cyber-blue hover:bg-cyber-blue/10",
                        )}
                      >
                        <Activity className="h-4 w-4 mr-2" />
                        Open Only
                      </Button>
                    </div>

                    <div className="flex items-end space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          setSortOrder(sortOrder === "asc" ? "desc" : "asc")
                        }
                        className="border-cyber-purple/30 text-cyber-purple hover:bg-cyber-purple/10 flex-1"
                      >
                        {sortOrder === "asc" ? (
                          <TrendingUp className="h-4 w-4 mr-2" />
                        ) : (
                          <TrendingDown className="h-4 w-4 mr-2" />
                        )}
                        {sortOrder === "asc" ? "Ascending" : "Descending"}
                      </Button>
                    </div>
                  </div>

                  {/* Filter Summary */}
                  <div className="flex items-center space-x-2 text-sm">
                    <span className="text-white/60">Active filters:</span>
                    {selectedRegion !== "all" && (
                      <Badge className="bg-cyber-blue/20 text-cyber-blue border-cyber-blue/30">
                        {regions.find((r) => r.id === selectedRegion)?.label}
                      </Badge>
                    )}
                    {selectedSector !== "all" && (
                      <Badge className="bg-cyber-green/20 text-cyber-green border-cyber-green/30">
                        {sectors.find((s) => s.id === selectedSector)?.icon}{" "}
                        {sectors.find((s) => s.id === selectedSector)?.label}
                      </Badge>
                    )}
                    {marketCapFilter !== "all" && (
                      <Badge className="bg-cyber-purple/20 text-cyber-purple border-cyber-purple/30">
                        {
                          marketCapFilters.find((f) => f.id === marketCapFilter)
                            ?.label
                        }
                      </Badge>
                    )}
                    {priceRangeFilter !== "all" && (
                      <Badge className="bg-cyber-yellow/20 text-cyber-yellow border-cyber-yellow/30">
                        {
                          priceRangeFilters.find(
                            (f) => f.id === priceRangeFilter,
                          )?.label
                        }
                      </Badge>
                    )}
                    {performanceFilter !== "all" && (
                      <Badge className="bg-cyber-red/20 text-cyber-red border-cyber-red/30">
                        {
                          performanceFilters.find(
                            (f) => f.id === performanceFilter,
                          )?.label
                        }
                      </Badge>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Market Indices */}
        <section className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-bold text-white">Major Indices</h2>
              <Button
                size="sm"
                variant="outline"
                className="border-cyber-blue/30 text-cyber-blue hover:bg-cyber-blue/10"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </Button>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredIndices.map((index, i) => {
              const isPositive = index.change >= 0;

              return (
                <motion.div
                  key={index.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Card className="p-6 bg-white/10 backdrop-blur-md border border-cyber-blue/20 hover:border-cyber-blue/40 transition-all duration-300 group">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-cyber-blue to-cyber-purple rounded-xl flex items-center justify-center">
                          <Globe className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-white">
                            {index.name}
                          </h3>
                          <div className="flex items-center space-x-2 text-sm text-white/60">
                            <MapPin className="h-3 w-3" />
                            <span>{index.country}</span>
                            <span>•</span>
                            <span>{index.currency}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        {index.isOpen ? (
                          <Badge className="bg-cyber-green/20 text-cyber-green border-cyber-green/30 text-xs">
                            <Activity className="h-3 w-3 mr-1" />
                            Open
                          </Badge>
                        ) : (
                          <Badge className="bg-cyber-red/20 text-cyber-red border-cyber-red/30 text-xs">
                            <Clock className="h-3 w-3 mr-1" />
                            Closed
                          </Badge>
                        )}
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold text-white">
                          {index.value.toLocaleString()}
                        </span>
                        <div
                          className={cn(
                            "flex items-center space-x-1 text-sm font-medium",
                            isPositive ? "text-cyber-green" : "text-cyber-red",
                          )}
                        >
                          {isPositive ? (
                            <ArrowUpRight className="h-4 w-4" />
                          ) : (
                            <ArrowDownRight className="h-4 w-4" />
                          )}
                          <span>
                            {isPositive ? "+" : ""}
                            {index.change.toFixed(2)} (
                            {index.changePercent.toFixed(2)}%)
                          </span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-sm text-white/60">
                        <div>
                          <span className="block">Market Cap</span>
                          <span className="text-cyber-blue font-medium">
                            {index.marketCap}
                          </span>
                        </div>
                        <div>
                          <span className="block">Volume</span>
                          <span className="text-cyber-blue font-medium">
                            {(index.volume / 1000000).toFixed(1)}M
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-xs text-white/50">
                        <span>
                          Trading: {index.openTime} - {index.closeTime}{" "}
                          {index.timezone}
                        </span>
                        <span>Updated {formatTimeAgo(index.lastUpdate)}</span>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* Top 50 Companies */}
        <section>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-bold text-white">
                Top 50 Companies
              </h2>
              <div className="flex items-center space-x-2">
                <Badge className="bg-cyber-purple/20 text-cyber-purple border-cyber-purple/30">
                  {filteredCompanies.length} companies
                </Badge>
                <div className="flex items-center space-x-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={addAllToWatchlist}
                    className="border-cyber-green/30 text-cyber-green hover:bg-cyber-green/10"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add All to Watchlist
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={removeAllFromWatchlist}
                    className="border-cyber-red/30 text-cyber-red hover:bg-cyber-red/10"
                  >
                    <X className="h-4 w-4 mr-2" />
                    Clear Watchlist
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>

          <Card className="bg-white/10 backdrop-blur-md border border-cyber-blue/20">
            <div className="p-6">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left text-white font-semibold py-3 px-2">
                        Rank
                      </th>
                      <th className="text-left text-white font-semibold py-3 px-2">
                        Company
                      </th>
                      <th className="text-right text-white font-semibold py-3 px-2">
                        Price
                      </th>
                      <th className="text-right text-white font-semibold py-3 px-2">
                        Change
                      </th>
                      <th className="text-right text-white font-semibold py-3 px-2">
                        Market Cap
                      </th>
                      <th className="text-right text-white font-semibold py-3 px-2">
                        P/E
                      </th>
                      <th className="text-right text-white font-semibold py-3 px-2">
                        Volume
                      </th>
                      <th className="text-center text-white font-semibold py-3 px-2">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredCompanies.map((company, index) => {
                      const isPositive = company.change >= 0;
                      const isWatched = watchlist.has(company.id);

                      return (
                        <motion.tr
                          key={company.id}
                          id={`company-${company.symbol}`}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.02 }}
                          className={cn(
                            "border-b border-white/5 hover:bg-white/5 transition-all duration-200 group",
                            highlightedCompany === company.symbol &&
                              "bg-cyber-blue/20 ring-2 ring-cyber-blue/50 animate-pulse",
                          )}
                        >
                          <td className="py-4 px-2">
                            <span className="text-cyber-blue font-medium">
                              #{index + 1}
                            </span>
                          </td>

                          <td className="py-4 px-2">
                            <div className="flex items-center space-x-3">
                              <motion.div
                                whileHover={{ scale: 1.1, rotate: 5 }}
                                transition={{ duration: 0.2 }}
                                className="relative group"
                              >
                                <CompanyLogo
                                  symbol={company.symbol}
                                  companyName={company.name}
                                  size="md"
                                  className="shadow-lg group-hover:shadow-cyber-blue/25 transition-all duration-300"
                                />
                                {/* Sector indicator dot */}
                                <div
                                  className={cn(
                                    "absolute -top-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center text-xs border-2 border-gray-900",
                                    sectors.find((s) => s.id === company.sector)
                                      ?.color || "bg-gray-500",
                                  )}
                                  title={
                                    sectors.find((s) => s.id === company.sector)
                                      ?.label
                                  }
                                >
                                  {
                                    sectors.find((s) => s.id === company.sector)
                                      ?.icon
                                  }
                                </div>
                              </motion.div>
                              <div className="flex-1">
                                <div className="flex items-center space-x-2 mb-1">
                                  <span className="text-white font-semibold text-lg">
                                    {company.symbol}
                                  </span>
                                  {company.dividend > 0 && (
                                    <Badge className="bg-cyan-500/20 text-cyan-400 border-cyan-500/30 text-xs">
                                      <DollarSign className="h-3 w-3 mr-1" />
                                      {company.dividend.toFixed(2)}%
                                    </Badge>
                                  )}
                                </div>
                                <div className="text-sm text-white/80 font-medium truncate max-w-[250px] mb-2">
                                  {company.name}
                                </div>
                                <div className="flex items-center space-x-3 text-xs">
                                  <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    transition={{ duration: 0.2 }}
                                  >
                                    <Badge
                                      className={cn(
                                        "text-xs font-medium border transition-all duration-300 hover:shadow-lg",
                                        sectors
                                          .find((s) => s.id === company.sector)
                                          ?.color?.replace("bg-", "bg-") +
                                          "/20",
                                        "text-white border-white/30",
                                      )}
                                    >
                                      <span className="mr-1">
                                        {
                                          sectors.find(
                                            (s) => s.id === company.sector,
                                          )?.icon
                                        }
                                      </span>
                                      {
                                        sectors.find(
                                          (s) => s.id === company.sector,
                                        )?.label
                                      }
                                    </Badge>
                                  </motion.div>
                                  <div className="flex items-center space-x-1 text-white/50">
                                    <MapPin className="h-3 w-3" />
                                    <span>{company.country}</span>
                                  </div>
                                  <div className="flex items-center space-x-1 text-white/50">
                                    <BarChart3 className="h-3 w-3" />
                                    <span>PE: {company.pe.toFixed(1)}</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </td>

                          <td className="py-4 px-2 text-right">
                            <span className="text-white font-semibold text-lg">
                              ${company.price.toFixed(2)}
                            </span>
                          </td>

                          <td className="py-4 px-2 text-right">
                            <div
                              className={cn(
                                "flex items-center justify-end space-x-1 font-medium",
                                isPositive
                                  ? "text-cyber-green"
                                  : "text-cyber-red",
                              )}
                            >
                              {isPositive ? (
                                <ArrowUpRight className="h-3 w-3" />
                              ) : (
                                <ArrowDownRight className="h-3 w-3" />
                              )}
                              <span>
                                {isPositive ? "+" : ""}
                                {company.change.toFixed(2)}
                              </span>
                            </div>
                            <div
                              className={cn(
                                "text-xs",
                                isPositive
                                  ? "text-cyber-green/60"
                                  : "text-cyber-red/60",
                              )}
                            >
                              ({company.changePercent.toFixed(2)}%)
                            </div>
                          </td>

                          <td className="py-4 px-2 text-right">
                            <span className="text-white font-medium">
                              {company.marketCap}
                            </span>
                          </td>

                          <td className="py-4 px-2 text-right">
                            <span className="text-cyber-blue">
                              {company.pe.toFixed(1)}
                            </span>
                          </td>

                          <td className="py-4 px-2 text-right">
                            <div className="text-white">
                              {(company.volume / 1000000).toFixed(1)}M
                            </div>
                            <div className="flex items-center justify-end text-xs text-white/50">
                              <Volume2 className="h-3 w-3 mr-1" />
                              Beta: {company.beta.toFixed(1)}
                            </div>
                          </td>

                          <td className="py-4 px-2 text-center">
                            <div className="flex items-center justify-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => toggleWatchlist(company.id)}
                                className={cn(
                                  "p-2",
                                  isWatched
                                    ? "text-cyber-yellow"
                                    : "text-white/70 hover:text-cyber-yellow",
                                )}
                                title={
                                  isWatched
                                    ? "Remove from Watchlist"
                                    : "Add to Watchlist"
                                }
                              >
                                <Star
                                  className={cn(
                                    "h-4 w-4",
                                    isWatched && "fill-current",
                                  )}
                                />
                              </Button>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => toggleLike(company.id)}
                                className={cn(
                                  "p-2",
                                  likedStocks.has(company.id)
                                    ? "text-cyber-red"
                                    : "text-white/70 hover:text-cyber-red",
                                )}
                                title={
                                  likedStocks.has(company.id)
                                    ? "Unlike"
                                    : "Like"
                                }
                              >
                                <ThumbsUp
                                  className={cn(
                                    "h-4 w-4",
                                    likedStocks.has(company.id) &&
                                      "fill-current",
                                  )}
                                />
                              </Button>
                              <Button
                                size="sm"
                                variant="ghost"
                                className="text-cyber-blue hover:text-cyber-blue-light p-2"
                                onClick={() => openChart(company)}
                                title="View Chart"
                              >
                                <LineChart className="h-4 w-4" />
                              </Button>
                              <Button
                                size="sm"
                                variant="ghost"
                                className="text-cyber-purple hover:text-cyber-purple-light p-2"
                                onClick={() =>
                                  (window.location.href = `/prediction/${company.symbol}`)
                                }
                                title="AI Prediction"
                              >
                                <Activity className="h-4 w-4" />
                              </Button>
                            </div>
                          </td>
                        </motion.tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </Card>
        </section>

        {/* Chart Modal - Fixed Sizing */}
        {showChartModal && selectedCompanyForChart && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-2 sm:p-4"
            onClick={() => setShowChartModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-cyber-dark border border-cyber-blue/30 rounded-2xl overflow-hidden w-full max-w-6xl h-[90vh] max-h-[800px] shadow-2xl flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header - Fixed Height */}
              <div className="flex items-center justify-between p-4 sm:p-6 border-b border-white/10 bg-cyber-dark/50 backdrop-blur-sm">
                <div className="flex items-center space-x-3">
                  <CompanyLogo
                    symbol={selectedCompanyForChart.symbol}
                    companyName={selectedCompanyForChart.name}
                    size="md"
                  />
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-white">
                      {selectedCompanyForChart.symbol}
                    </h3>
                    <p className="text-cyber-blue/80 text-sm">
                      {selectedCompanyForChart.name}
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowChartModal(false)}
                  className="text-white/70 hover:text-white"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>

              {/* Main Content - Scrollable */}
              <div className="flex-1 overflow-y-auto p-4 sm:p-6">
                {/* Stock Price Info - Compact */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
                  <div className="bg-white/5 rounded-xl p-3">
                    <p className="text-cyber-blue/70 text-xs">Current Price</p>
                    <p className="text-lg font-bold text-white">
                      ${selectedCompanyForChart.price.toFixed(2)}
                    </p>
                  </div>
                  <div className="bg-white/5 rounded-xl p-3">
                    <p className="text-cyber-blue/70 text-xs">Change</p>
                    <p
                      className={`text-sm font-bold ${
                        selectedCompanyForChart.change >= 0
                          ? "text-cyber-green"
                          : "text-cyber-red"
                      }`}
                    >
                      {selectedCompanyForChart.change >= 0 ? "+" : ""}$
                      {selectedCompanyForChart.change.toFixed(2)}
                    </p>
                  </div>
                  <div className="bg-white/5 rounded-xl p-3">
                    <p className="text-cyber-blue/70 text-xs">Change %</p>
                    <p
                      className={`text-sm font-bold ${
                        selectedCompanyForChart.changePercent >= 0
                          ? "text-cyber-green"
                          : "text-cyber-red"
                      }`}
                    >
                      {selectedCompanyForChart.changePercent >= 0 ? "+" : ""}
                      {selectedCompanyForChart.changePercent.toFixed(2)}%
                    </p>
                  </div>
                  <div className="bg-white/5 rounded-xl p-3">
                    <p className="text-cyber-blue/70 text-xs">Market Cap</p>
                    <p className="text-sm font-bold text-white">
                      {selectedCompanyForChart.marketCap}
                    </p>
                  </div>
                </div>

                {/* Professional Trading Chart - Responsive Container */}
                <div className="bg-cyber-black/50 rounded-xl p-2 mb-4">
                  <ProfessionalChart
                    symbol={selectedCompanyForChart.symbol}
                    companyName={selectedCompanyForChart.name}
                    currentPrice={selectedCompanyForChart.price}
                    change={selectedCompanyForChart.change}
                    changePercent={selectedCompanyForChart.changePercent}
                    className="bg-transparent border-0 h-[300px] sm:h-[400px]"
                  />
                </div>
              </div>

              {/* Footer - Action Buttons */}
              <div className="flex justify-center space-x-3 p-4 sm:p-6 border-t border-white/10 bg-cyber-dark/50 backdrop-blur-sm">
                <Button
                  onClick={() => toggleWatchlist(selectedCompanyForChart.id)}
                  className={`px-6 py-3 rounded-2xl font-semibold transition-all duration-300 ${
                    watchlist.has(selectedCompanyForChart.id)
                      ? "bg-cyber-yellow text-black hover:bg-cyber-yellow-dark"
                      : "bg-white/10 border border-cyber-blue/30 text-white hover:bg-white/20"
                  }`}
                >
                  <Star
                    className={`mr-2 h-5 w-5 ${watchlist.has(selectedCompanyForChart.id) ? "fill-current" : ""}`}
                  />
                  {watchlist.has(selectedCompanyForChart.id)
                    ? "Remove from"
                    : "Add to"}{" "}
                  Watchlist
                </Button>
                <Button
                  onClick={() => {
                    // Redirect to AI prediction page
                    window.location.href = `/prediction/${selectedCompanyForChart.symbol}`;
                  }}
                  className="bg-gradient-to-r from-cyber-blue to-cyber-purple hover:from-cyber-blue-dark hover:to-cyber-purple-dark text-white px-6 py-3 rounded-2xl font-semibold transition-all duration-300"
                >
                  <TrendingUp className="mr-2 h-5 w-5" />
                  AI Prediction Analysis
                </Button>
                {!isPaid && (
                  <Button
                    onClick={() =>
                      (window.location.href =
                        "/payment?plan=Professional&price=29&billing=monthly&source=chart_analysis")
                    }
                    className="bg-gradient-to-r from-cyber-green to-cyber-purple hover:from-cyber-green-dark hover:to-cyber-purple-dark text-white px-6 py-3 rounded-2xl font-semibold transition-all duration-300"
                  >
                    <CreditCard className="mr-2 h-5 w-5" />
                    Upgrade for More Features
                  </Button>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </GlobalAnimatedBackground>
  );
};

export default GlobalMarkets;
