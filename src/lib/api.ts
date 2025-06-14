const FINNHUB_API_KEY = "d15s3mhr01qhqto7p6e0d15s3mhr01qhqto7p6eg";
const FINNHUB_BASE_URL = "https://finnhub.io/api/v1";

// Track API status to avoid repeated failed calls
let apiStatus: 'unknown' | 'limited' | 'full' | 'blocked' = 'unknown';
let lastApiCheck = 0;
const API_CHECK_INTERVAL = 60000; // 1 minute

export interface StockQuote {
  c: number; // Current price
  d: number; // Change
  dp: number; // Percent change
  h: number; // High price
  l: number; // Low price
  o: number; // Open price
  pc: number; // Previous close
  t: number; // Timestamp
}

export interface StockCandle {
  c: number[]; // Close prices
  h: number[]; // High prices
  l: number[]; // Low prices
  o: number[]; // Open prices
  s: string; // Status
  t: number[]; // Timestamps
  v: number[]; // Volumes
}

export interface StockSymbol {
  currency: string;
  description: string;
  displaySymbol: string;
  figi: string;
  mic: string;
  symbol: string;
  type: string;
}

export interface IndexData {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
}

class FinnhubAPI {
  private apiKey: string;
  private baseUrl: string;

  constructor() {
    this.apiKey = FINNHUB_API_KEY;
    this.baseUrl = FINNHUB_BASE_URL;
  }

  // Check if we should skip API calls based on previous failures
  private shouldSkipApi(): boolean {
    const now = Date.now();
    if (now - lastApiCheck < API_CHECK_INTERVAL && (apiStatus === 'blocked' || apiStatus === 'limited')) {
      return true;
    }
    return false;
  }

  // Update API status based on response
  private updateApiStatus(success: boolean, errorCode?: number) {
    lastApiCheck = Date.now();
    if (success) {
      apiStatus = 'full';
    } else if (errorCode === 403) {
      apiStatus = 'blocked';
    } else if (errorCode === 429) {
      apiStatus = 'limited';
    }
  }

  private async makeRequest(
    endpoint: string,
    params: Record<string, string> = {},
  ) {
    // Skip API if we know it's blocked or limited
    if (this.shouldSkipApi()) {
      console.log('Skipping API call due to previous failures, using demo data');
      throw new Error("API access limited - using demo data");
    }

    const url = new URL(`${this.baseUrl}${endpoint}`);
    url.searchParams.append("token", this.apiKey);

    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.append(key, value);
    });

    try {
      const response = await fetch(url.toString());

      if (!response.ok) {
        // Read the response body once and handle different content types
        let errorData;
        const contentType = response.headers.get("content-type");

        try {
          if (contentType && contentType.includes("application/json")) {
            errorData = await response.json();
          } else {
            errorData = await response.text();
          }
        } catch (parseError) {
          errorData = `Response status: ${response.status}`;
        }

        console.log(`Finnhub API error (${response.status}):`, errorData);

        // Update API status based on error
        this.updateApiStatus(false, response.status);

        if (response.status === 403) {
          throw new Error("Access denied - API key may not have permissions for this data");
        } else if (response.status === 429) {
          throw new Error("Rate limit exceeded - too many requests");
        } else {
          throw new Error(`API request failed: ${response.status}`);
        }
      }

      // Success - update API status
      this.updateApiStatus(true);

      // Only read response body if status is ok
      const data = await response.json();
      return data;
    } catch (error) {
      // Don't log network errors as API errors to avoid confusion
      if (error instanceof TypeError && error.message.includes("fetch")) {
        console.error("Network error:", error);
        this.updateApiStatus(false);
        throw new Error("Network connection failed");
      }

      // Log but don't spam console with repeated failures
      if (apiStatus !== 'blocked') {
        console.log("Finnhub API error:", error);
      }
      throw error;
    }
  }
  }

  async getQuote(symbol: string): Promise<StockQuote> {
    try {
      // Try the basic quote endpoint first (most likely to work on free tier)
      const data = await this.makeRequest("/quote", { symbol });

      // Validate response data
      if (!data || typeof data.c === 'undefined' || data.c === 0) {
        throw new Error(`No data available for symbol: ${symbol}`);
      }

      return data;
    } catch (error) {
      // Don't spam console if we already know API is blocked
      if (apiStatus !== 'blocked') {
        console.log(`API unavailable for ${symbol}, using demo data`);
      }
      throw error;
    }
  }
  }

  async getCandles(
    symbol: string,
    resolution: string = "D",
    from: number,
    to: number,
  ): Promise<StockCandle> {
    try {
      const data = await this.makeRequest("/stock/candle", {
        symbol,
        resolution,
        from: from.toString(),
        to: to.toString(),
      });

      // Validate candle data
      if (!data || data.s !== "ok" || !data.t || data.t.length === 0) {
        throw new Error(`No candle data available for symbol: ${symbol}`);
      }

      return data;
    } catch (error) {
      // Don't spam console if we already know API is blocked
      if (apiStatus !== 'blocked') {
        console.log(`Candle data unavailable for ${symbol}, using demo data`);
      }
      throw error;
    }
  }

  async searchSymbol(query: string): Promise<StockSymbol[]> {
    const result = await this.makeRequest("/search", { q: query });
    return result.result || [];
  }

  async getCompanyProfile(symbol: string) {
    return this.makeRequest("/stock/profile2", { symbol });
  }

  async getMarketNews(category: string = "general") {
    return this.makeRequest("/news", { category });
  }

  // Get major indices data - using demo data by default due to API limitations
  async getIndicesData(): Promise<IndexData[]> {
    const indices = [
      { symbol: "AAPL", name: "Apple Inc." },
      { symbol: "GOOGL", name: "Alphabet Inc." },
      { symbol: "MSFT", name: "Microsoft Corp." },
      { symbol: "TSLA", name: "Tesla Inc." },
      { symbol: "NVDA", name: "NVIDIA Corp." },
    ];

    // Use demo data by default to avoid API rate limiting and 403 errors
    console.log('Using demo data for indices dashboard');

    const indicesData: IndexData[] = indices.map(index => {
      const mockPrices = {
        AAPL: 175.43,
        GOOGL: 138.21,
        MSFT: 378.85,
        TSLA: 242.68,
        NVDA: 721.33
      };

      const basePrice = mockPrices[index.symbol as keyof typeof mockPrices] || 100;
      const change = (Math.random() - 0.5) * 10;

      return {
        symbol: index.symbol,
        name: index.name,
        price: basePrice,
        change: change,
        changePercent: (change / basePrice) * 100,
      };
    });

    return indicesData;
  }

  // Generate mock AI predictions (in real app, this would call your ML API)
  generatePrediction(historicalData: number[], symbol: string) {
    const lastPrice = historicalData[historicalData.length - 1];
    const volatility = this.calculateVolatility(historicalData);

    // Simple trend-based prediction (replace with real ML model)
    const trend = this.calculateTrend(historicalData);
    const randomFactor = (Math.random() - 0.5) * 0.02; // ±1% random
    const predictionChange = trend + randomFactor;

    const predictions = [];
    let currentPrice = lastPrice;

    // Generate 7-day predictions
    for (let i = 1; i <= 7; i++) {
      const dailyChange = predictionChange * volatility * (Math.random() - 0.5);
      currentPrice *= 1 + dailyChange;
      predictions.push({
        date: new Date(
          Date.now() + i * 24 * 60 * 60 * 1000,
        ).toLocaleDateString(),
        price: parseFloat(currentPrice.toFixed(2)),
        predicted: true,
      });
    }

    return {
      predictions,
      confidence: Math.min(0.95, 0.7 + (1 - volatility) * 0.25),
      targetPrice: predictions[predictions.length - 1].price,
      support: lastPrice * 0.95,
      resistance: lastPrice * 1.08,
    };
  }

  private calculateVolatility(prices: number[]): number {
    if (prices.length < 2) return 0.02;

    const returns = [];
    for (let i = 1; i < prices.length; i++) {
      returns.push((prices[i] - prices[i - 1]) / prices[i - 1]);
    }

    const mean = returns.reduce((sum, r) => sum + r, 0) / returns.length;
    const variance =
      returns.reduce((sum, r) => sum + Math.pow(r - mean, 2), 0) /
      returns.length;

    return Math.sqrt(variance);
  }

  private calculateTrend(prices: number[]): number {
    if (prices.length < 5) return 0;

    const recent = prices.slice(-5);
    const older = prices.slice(-10, -5);

    const recentAvg = recent.reduce((sum, p) => sum + p, 0) / recent.length;
    const olderAvg = older.reduce((sum, p) => sum + p, 0) / older.length;

    return (recentAvg - olderAvg) / olderAvg;
  }

  // Get current API status for components
  getApiStatus() {
    return {
      status: apiStatus,
      lastCheck: lastApiCheck,
      isBlocked: apiStatus === 'blocked',
      isLimited: apiStatus === 'limited',
    };
  }
}

export const finnhubAPI = new FinnhubAPI();

// Chart data formatting helpers
export const formatChartData = (candles: StockCandle) => {
  if (!candles.t || candles.s !== "ok") return [];

  return candles.t.map((timestamp, index) => ({
    date: new Date(timestamp * 1000).toLocaleDateString(),
    price: candles.c[index],
    volume: candles.v[index],
    high: candles.h[index],
    low: candles.l[index],
    open: candles.o[index],
    predicted: false,
  }));
};

export const generateDateRange = (days: number) => {
  const to = Math.floor(Date.now() / 1000);
  const from = to - days * 24 * 60 * 60;
  return { from, to };
};