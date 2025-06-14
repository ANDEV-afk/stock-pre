// Demo data service for seamless user experience
export class DemoDataService {
  private static instance: DemoDataService;

  private constructor() {}

  static getInstance(): DemoDataService {
    if (!DemoDataService.instance) {
      DemoDataService.instance = new DemoDataService();
    }
    return DemoDataService.instance;
  }

  // Generate realistic stock data for any symbol
  generateStockData(symbol: string) {
    const stockPrices: Record<string, number> = {
      // Tech Giants
      AAPL: 175.43,
      GOOGL: 138.21,
      MSFT: 378.85,
      AMZN: 144.78,
      META: 303.67,

      // Electric & Auto
      TSLA: 242.68,
      F: 12.45,
      GM: 28.67,
      RIVN: 15.23,
      LCID: 4.89,

      // AI & Semiconductors
      NVDA: 721.33,
      AMD: 98.45,
      INTC: 35.67,
      AVGO: 892.34,
      QCOM: 123.45,

      // Streaming & Entertainment
      NFLX: 445.92,
      DIS: 89.45,
      PARA: 15.67,
      WBD: 10.23,

      // Finance & Banking
      JPM: 165.78,
      BAC: 32.45,
      WFC: 45.67,
      GS: 387.23,
      MS: 78.9,

      // Healthcare & Biotech
      JNJ: 156.78,
      PFE: 28.45,
      UNH: 523.67,
      ABBV: 145.23,
      BMY: 52.34,

      // Energy
      XOM: 98.76,
      CVX: 145.67,
      COP: 112.34,

      // Retail & Consumer
      WMT: 156.78,
      COST: 567.89,
      TGT: 134.56,
      HD: 345.67,

      // ETFs & Indices
      QQQ: 385.5,
      SPY: 455.2,
      DIA: 345.8,
      IWM: 198.3,
      VXX: 23.45,

      // Crypto Related
      COIN: 89.45,
      MSTR: 456.78,

      // Airlines & Travel
      AAL: 12.34,
      DAL: 45.67,
      UAL: 34.56,

      // Real Estate
      REIT: 78.9,

      // Communications
      VZ: 34.56,
      T: 18.9,

      // Industrial
      CAT: 234.56,
      BA: 187.45,
      GE: 98.76,
    };

    const basePrice = stockPrices[symbol] || this.generateRandomPrice(symbol);
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
      candles: this.generateCandles(basePrice),
      profile: {
        name: this.getCompanyName(symbol),
        ticker: symbol,
        exchange: "NASDAQ",
        currency: "USD",
        country: "US",
      },
    };
  }

  private generateRandomPrice(symbol: string): number {
    // Generate consistent price based on symbol hash
    let hash = 0;
    for (let i = 0; i < symbol.length; i++) {
      const char = symbol.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash = hash & hash; // Convert to 32-bit integer
    }

    // Use hash to generate consistent price between $50-$500
    const price = 50 + Math.abs(hash % 450);
    return price;
  }

  private generateCandles(basePrice: number) {
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
      // Tech Giants
      AAPL: "Apple Inc.",
      GOOGL: "Alphabet Inc.",
      MSFT: "Microsoft Corporation",
      AMZN: "Amazon.com, Inc.",
      META: "Meta Platforms, Inc.",

      // Electric & Auto
      TSLA: "Tesla, Inc.",
      F: "Ford Motor Company",
      GM: "General Motors Company",
      RIVN: "Rivian Automotive, Inc.",
      LCID: "Lucid Group, Inc.",

      // AI & Semiconductors
      NVDA: "NVIDIA Corporation",
      AMD: "Advanced Micro Devices, Inc.",
      INTC: "Intel Corporation",
      AVGO: "Broadcom Inc.",
      QCOM: "QUALCOMM Incorporated",

      // Streaming & Entertainment
      NFLX: "Netflix, Inc.",
      DIS: "The Walt Disney Company",
      PARA: "Paramount Global",
      WBD: "Warner Bros. Discovery, Inc.",

      // Finance & Banking
      JPM: "JPMorgan Chase & Co.",
      BAC: "Bank of America Corporation",
      WFC: "Wells Fargo & Company",
      GS: "The Goldman Sachs Group, Inc.",
      MS: "Morgan Stanley",

      // Healthcare & Biotech
      JNJ: "Johnson & Johnson",
      PFE: "Pfizer Inc.",
      UNH: "UnitedHealth Group Incorporated",
      ABBV: "AbbVie Inc.",
      BMY: "Bristol-Myers Squibb Company",

      // Energy
      XOM: "Exxon Mobil Corporation",
      CVX: "Chevron Corporation",
      COP: "ConocoPhillips",

      // Retail & Consumer
      WMT: "Walmart Inc.",
      COST: "Costco Wholesale Corporation",
      TGT: "Target Corporation",
      HD: "The Home Depot, Inc.",

      // ETFs & Indices
      QQQ: "Invesco QQQ Trust",
      SPY: "SPDR S&P 500 ETF Trust",
      DIA: "SPDR Dow Jones Industrial Average ETF",
      IWM: "iShares Russell 2000 ETF",
      VXX: "iPath Series B S&P 500 VIX Short-Term Futures ETN",

      // Crypto Related
      COIN: "Coinbase Global, Inc.",
      MSTR: "MicroStrategy Incorporated",

      // Airlines & Travel
      AAL: "American Airlines Group Inc.",
      DAL: "Delta Air Lines, Inc.",
      UAL: "United Airlines Holdings, Inc.",

      // Real Estate
      REIT: "Real Estate Investment Trust",

      // Communications
      VZ: "Verizon Communications Inc.",
      T: "AT&T Inc.",

      // Industrial
      CAT: "Caterpillar Inc.",
      BA: "The Boeing Company",
      GE: "General Electric Company",
    };

    return companies[symbol] || `${symbol} Corporation`;
  }

  // Generate indices data
  generateIndicesData() {
    const indices = [
      { symbol: "AAPL", name: "Apple Inc." },
      { symbol: "GOOGL", name: "Alphabet Inc." },
      { symbol: "MSFT", name: "Microsoft Corp." },
      { symbol: "TSLA", name: "Tesla Inc." },
      { symbol: "NVDA", name: "NVIDIA Corp." },
      { symbol: "AMZN", name: "Amazon.com Inc." },
      { symbol: "META", name: "Meta Platforms Inc." },
      { symbol: "NFLX", name: "Netflix Inc." },
      { symbol: "AMD", name: "Advanced Micro Devices" },
      { symbol: "COIN", name: "Coinbase Global Inc." },
    ];

    return indices.map((index) => {
      const stockData = this.generateStockData(index.symbol);
      return {
        symbol: index.symbol,
        name: index.name,
        price: stockData.quote.c,
        change: stockData.quote.d,
        changePercent: stockData.quote.dp,
      };
    });
  }
}

export const demoDataService = DemoDataService.getInstance();
