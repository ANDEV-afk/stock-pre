import { TOP_50_COMPANIES, RealCompany } from "./companies-data";

// Real-time data service for dashboard updates
export class RealtimeDataService {
  private updateInterval: NodeJS.Timeout | null = null;
  private subscribers: Set<(data: RealCompany[]) => void> = new Set();
  private currentData: RealCompany[] = [...TOP_50_COMPANIES];

  constructor() {
    this.initializeData();
  }

  private initializeData() {
    // Initialize with base data
    this.currentData = TOP_50_COMPANIES.map((company) => ({
      ...company,
      // Add some initial realistic variance
      price: company.price * (1 + (Math.random() - 0.5) * 0.02),
      change: (Math.random() - 0.5) * 10,
      changePercent: (Math.random() - 0.5) * 3,
      volume: Math.floor(company.volume * (0.8 + Math.random() * 0.4)),
    }));
  }

  // Start real-time updates
  startUpdates(intervalMs: number = 5000) {
    if (this.updateInterval) {
      this.stopUpdates();
    }

    this.updateInterval = setInterval(() => {
      this.updatePrices();
    }, intervalMs);

    console.log(`🔄 Real-time data updates started (${intervalMs}ms interval)`);
  }

  // Stop real-time updates
  stopUpdates() {
    if (this.updateInterval) {
      clearInterval(this.updateInterval);
      this.updateInterval = null;
      console.log("⏹️ Real-time data updates stopped");
    }
  }

  // Subscribe to data updates
  subscribe(callback: (data: RealCompany[]) => void) {
    this.subscribers.add(callback);

    // Send initial data
    callback([...this.currentData]);

    // Return unsubscribe function
    return () => {
      this.subscribers.delete(callback);
    };
  }

  // Update prices with realistic market movement
  private updatePrices() {
    this.currentData = this.currentData.map((company) => {
      // Market hours simulation (more volatile during market hours)
      const now = new Date();
      const hour = now.getHours();
      const isMarketHours = hour >= 9 && hour <= 16; // 9 AM to 4 PM

      // Base volatility
      let volatility = 0.001; // 0.1% base volatility

      // Increase volatility during market hours
      if (isMarketHours) {
        volatility *= 2;
      }

      // Sector-specific volatility
      const sectorVolatility = {
        technology: 1.5,
        finance: 1.0,
        healthcare: 0.8,
        consumer: 0.9,
        energy: 1.3,
        industrial: 0.7,
        telecommunications: 0.6,
        utilities: 0.5,
        "real-estate": 0.8,
      };

      const sectorMultiplier =
        sectorVolatility[company.sector as keyof typeof sectorVolatility] ||
        1.0;
      volatility *= sectorMultiplier;

      // Beta adjustment (higher beta = more volatile)
      volatility *= company.beta;

      // Generate price change
      const priceChange = (Math.random() - 0.5) * 2 * volatility;
      const newPrice = Math.max(company.price * (1 + priceChange), 0.01);

      // Calculate new metrics
      const change = newPrice - company.price;
      const changePercent = (change / company.price) * 100;

      // Volume variance (±20%)
      const volumeChange = (Math.random() - 0.5) * 0.4;
      const newVolume = Math.floor(company.volume * (1 + volumeChange));

      return {
        ...company,
        price: parseFloat(newPrice.toFixed(2)),
        change: parseFloat(change.toFixed(2)),
        changePercent: parseFloat(changePercent.toFixed(2)),
        volume: newVolume,
      };
    });

    // Notify subscribers
    this.notifySubscribers();
  }

  private notifySubscribers() {
    this.subscribers.forEach((callback) => {
      try {
        callback([...this.currentData]);
      } catch (error) {
        console.error("Error notifying subscriber:", error);
      }
    });
  }

  // Get current data
  getCurrentData(): RealCompany[] {
    return [...this.currentData];
  }

  // Get specific company data
  getCompanyData(symbol: string): RealCompany | undefined {
    return this.currentData.find((company) => company.symbol === symbol);
  }

  // Simulate major market events
  simulateMarketEvent(
    type: "bullish" | "bearish" | "neutral",
    intensity: number = 1,
  ) {
    const multiplier = type === "bullish" ? 1 : type === "bearish" ? -1 : 0;

    this.currentData = this.currentData.map((company) => {
      const eventImpact = Math.random() * 0.05 * intensity * multiplier; // Up to 5% impact
      const newPrice = Math.max(company.price * (1 + eventImpact), 0.01);
      const change = newPrice - company.price;
      const changePercent = (change / company.price) * 100;

      return {
        ...company,
        price: parseFloat(newPrice.toFixed(2)),
        change: parseFloat(change.toFixed(2)),
        changePercent: parseFloat(changePercent.toFixed(2)),
      };
    });

    this.notifySubscribers();
    console.log(`📈 Market event simulated: ${type} (intensity: ${intensity})`);
  }

  // Get market statistics
  getMarketStats() {
    const gainers = this.currentData.filter((c) => c.changePercent > 0);
    const losers = this.currentData.filter((c) => c.changePercent < 0);
    const unchanged = this.currentData.filter((c) => c.changePercent === 0);

    const avgChange =
      this.currentData.reduce((sum, c) => sum + c.changePercent, 0) /
      this.currentData.length;
    const totalVolume = this.currentData.reduce((sum, c) => sum + c.volume, 0);

    return {
      total: this.currentData.length,
      gainers: gainers.length,
      losers: losers.length,
      unchanged: unchanged.length,
      avgChange: parseFloat(avgChange.toFixed(2)),
      totalVolume,
      lastUpdate: new Date(),
    };
  }

  // Cleanup
  destroy() {
    this.stopUpdates();
    this.subscribers.clear();
  }
}

// Singleton instance
export const realtimeService = new RealtimeDataService();

// Market indices real-time data
export interface MarketIndex {
  symbol: string;
  name: string;
  value: number;
  change: number;
  changePercent: number;
  volume: number;
}

export class IndexDataService {
  private indices: MarketIndex[] = [
    {
      symbol: "SPY",
      name: "S&P 500",
      value: 4567.23,
      change: 23.45,
      changePercent: 0.52,
      volume: 89456123,
    },
    {
      symbol: "QQQ",
      name: "NASDAQ 100",
      value: 389.67,
      change: -2.34,
      changePercent: -0.6,
      volume: 45678901,
    },
    {
      symbol: "DIA",
      name: "Dow Jones",
      value: 34567.89,
      change: 123.45,
      changePercent: 0.36,
      volume: 12345678,
    },
    {
      symbol: "IWM",
      name: "Russell 2000",
      value: 1987.65,
      change: -12.34,
      changePercent: -0.62,
      volume: 23456789,
    },
  ];

  private subscribers: Set<(data: MarketIndex[]) => void> = new Set();
  private updateInterval: NodeJS.Timeout | null = null;

  startUpdates(intervalMs: number = 10000) {
    if (this.updateInterval) {
      clearInterval(this.updateInterval);
    }

    this.updateInterval = setInterval(() => {
      this.updateIndices();
    }, intervalMs);
  }

  private updateIndices() {
    this.indices = this.indices.map((index) => {
      const priceChange = (Math.random() - 0.5) * 0.005; // ±0.5% change
      const newValue = Math.max(index.value * (1 + priceChange), 0.01);
      const change = newValue - index.value;
      const changePercent = (change / index.value) * 100;

      return {
        ...index,
        value: parseFloat(newValue.toFixed(2)),
        change: parseFloat(change.toFixed(2)),
        changePercent: parseFloat(changePercent.toFixed(2)),
        volume: Math.floor(index.volume * (0.95 + Math.random() * 0.1)),
      };
    });

    this.subscribers.forEach((callback) => callback([...this.indices]));
  }

  subscribe(callback: (data: MarketIndex[]) => void) {
    this.subscribers.add(callback);
    callback([...this.indices]);

    return () => {
      this.subscribers.delete(callback);
    };
  }

  stopUpdates() {
    if (this.updateInterval) {
      clearInterval(this.updateInterval);
      this.updateInterval = null;
    }
  }

  getCurrentData(): MarketIndex[] {
    return [...this.indices];
  }
}

export const indexService = new IndexDataService();
