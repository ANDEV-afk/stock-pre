// Improved API service with comprehensive error handling
export class ApiService {
  private static instance: ApiService;
  private apiStatus: "online" | "limited" | "offline" = "online";
  private lastError: string | null = null;

  private constructor() {}

  static getInstance(): ApiService {
    if (!ApiService.instance) {
      ApiService.instance = new ApiService();
    }
    return ApiService.instance;
  }

  getApiStatus() {
    return {
      status: this.apiStatus,
      lastError: this.lastError,
    };
  }

  setApiStatus(status: "online" | "limited" | "offline", error?: string) {
    this.apiStatus = status;
    this.lastError = error || null;
  }

  // Generate realistic mock data for any stock symbol
  generateMockStockData(symbol: string) {
    const stockPrices: Record<string, number> = {
      AAPL: 175.43,
      GOOGL: 138.21,
      MSFT: 378.85,
      TSLA: 242.68,
      NVDA: 721.33,
      AMZN: 144.78,
      META: 303.67,
      NFLX: 445.92,
      QQQ: 385.5,
      SPY: 455.2,
      DIA: 345.8,
      IWM: 198.3,
      VXX: 23.45,
    };

    const basePrice = stockPrices[symbol] || 100 + Math.random() * 200;
    const change = (Math.random() - 0.5) * 10;
    const changePercent = (change / basePrice) * 100;

    return {
      quote: {
        c: basePrice,
        d: change,
        dp: changePercent,
        h: basePrice * (1 + Math.random() * 0.05),
        l: basePrice * (1 - Math.random() * 0.05),
        o: basePrice * (0.98 + Math.random() * 0.04),
        pc: basePrice - change,
        t: Date.now() / 1000,
      },
      candles: this.generateMockCandles(basePrice),
      profile: {
        name: this.getCompanyName(symbol),
        ticker: symbol,
        exchange: "NASDAQ",
        currency: "USD",
        country: "US",
      },
    };
  }

  private generateMockCandles(basePrice: number) {
    const candles = {
      c: [] as number[],
      h: [] as number[],
      l: [] as number[],
      o: [] as number[],
      t: [] as number[],
      v: [] as number[],
      s: "ok",
    };

    for (let i = 30; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);

      const volatility = 0.02;
      const trend = (Math.random() - 0.5) * volatility;
      const dayPrice = basePrice * (1 + trend * (i / 30));

      const open = dayPrice * (0.99 + Math.random() * 0.02);
      const close = dayPrice * (0.99 + Math.random() * 0.02);
      const high = Math.max(open, close) * (1 + Math.random() * 0.03);
      const low = Math.min(open, close) * (1 - Math.random() * 0.03);

      candles.o.push(parseFloat(open.toFixed(2)));
      candles.h.push(parseFloat(high.toFixed(2)));
      candles.l.push(parseFloat(low.toFixed(2)));
      candles.c.push(parseFloat(close.toFixed(2)));
      candles.t.push(Math.floor(date.getTime() / 1000));
      candles.v.push(Math.floor(Math.random() * 10000000));
    }

    return candles;
  }

  private getCompanyName(symbol: string): string {
    const companies: Record<string, string> = {
      AAPL: "Apple Inc.",
      GOOGL: "Alphabet Inc.",
      MSFT: "Microsoft Corporation",
      TSLA: "Tesla, Inc.",
      NVDA: "NVIDIA Corporation",
      AMZN: "Amazon.com, Inc.",
      META: "Meta Platforms, Inc.",
      NFLX: "Netflix, Inc.",
      QQQ: "Invesco QQQ Trust",
      SPY: "SPDR S&P 500 ETF Trust",
      DIA: "SPDR Dow Jones Industrial Average ETF",
      IWM: "iShares Russell 2000 ETF",
      VXX: "iPath Series B S&P 500 VIX Short-Term Futures ETN",
    };

    return companies[symbol] || `${symbol} Corporation`;
  }

  // Check if we should use mock data
  shouldUseMockData(error?: Error): boolean {
    if (!error) return false;

    const errorMessage = error.message.toLowerCase();

    return (
      errorMessage.includes("access denied") ||
      errorMessage.includes("403") ||
      errorMessage.includes("rate limit") ||
      errorMessage.includes("429") ||
      errorMessage.includes("body stream") ||
      errorMessage.includes("network")
    );
  }
}

export const apiService = ApiService.getInstance();
