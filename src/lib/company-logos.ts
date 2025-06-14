// Company logos mapping - using high-quality logo URLs
export const COMPANY_LOGOS: Record<string, string> = {
  // Technology Giants
  AAPL: "https://logo.clearbit.com/apple.com",
  MSFT: "https://logo.clearbit.com/microsoft.com",
  GOOGL: "https://logo.clearbit.com/google.com",
  AMZN: "https://logo.clearbit.com/amazon.com",
  NVDA: "https://logo.clearbit.com/nvidia.com",
  TSLA: "https://logo.clearbit.com/tesla.com",
  META: "https://logo.clearbit.com/meta.com",
  NFLX: "https://logo.clearbit.com/netflix.com",
  ORCL: "https://logo.clearbit.com/oracle.com",
  CRM: "https://logo.clearbit.com/salesforce.com",
  ADBE: "https://logo.clearbit.com/adobe.com",
  SHOP: "https://logo.clearbit.com/shopify.com",
  AMD: "https://logo.clearbit.com/amd.com",
  INTC: "https://logo.clearbit.com/intel.com",

  // Financial Services
  JPM: "https://logo.clearbit.com/jpmorganchase.com",
  BAC: "https://logo.clearbit.com/bankofamerica.com",
  WFC: "https://logo.clearbit.com/wellsfargo.com",
  GS: "https://logo.clearbit.com/goldmansachs.com",
  MS: "https://logo.clearbit.com/morganstanley.com",
  V: "https://logo.clearbit.com/visa.com",
  MA: "https://logo.clearbit.com/mastercard.com",
  "BRK.B": "https://logo.clearbit.com/berkshirehathaway.com",

  // Healthcare & Pharmaceuticals
  JNJ: "https://logo.clearbit.com/jnj.com",
  PFE: "https://logo.clearbit.com/pfizer.com",
  ABBV: "https://logo.clearbit.com/abbvie.com",
  MRK: "https://logo.clearbit.com/merck.com",
  LLY: "https://logo.clearbit.com/lilly.com",
  UNH: "https://logo.clearbit.com/unitedhealthgroup.com",

  // Consumer Goods & Retail
  PG: "https://logo.clearbit.com/pg.com",
  KO: "https://logo.clearbit.com/coca-cola.com",
  PEP: "https://logo.clearbit.com/pepsico.com",
  WMT: "https://logo.clearbit.com/walmart.com",
  HD: "https://logo.clearbit.com/homedepot.com",
  DIS: "https://logo.clearbit.com/disney.com",

  // Energy & Industrial
  XOM: "https://logo.clearbit.com/exxonmobil.com",
  CVX: "https://logo.clearbit.com/chevron.com",
  CAT: "https://logo.clearbit.com/caterpillar.com",
  BA: "https://logo.clearbit.com/boeing.com",
  GE: "https://logo.clearbit.com/ge.com",

  // Telecommunications & Utilities
  VZ: "https://logo.clearbit.com/verizon.com",
  T: "https://logo.clearbit.com/att.com",
  NEE: "https://logo.clearbit.com/nexteraenergy.com",

  // International Companies
  ASML: "https://logo.clearbit.com/asml.com",
  SAM: "https://logo.clearbit.com/samsung.com",
  TM: "https://logo.clearbit.com/toyota.com",
  NESN: "https://logo.clearbit.com/nestle.com",

  // Real Estate & Utilities
  AMT: "https://logo.clearbit.com/americantower.com",
  PLD: "https://logo.clearbit.com/prologis.com",
};

// Fallback logo generator for companies without logos
export const generateFallbackLogo = (symbol: string, companyName: string) => {
  const firstLetter = symbol.charAt(0);
  const colors = [
    "from-blue-500 to-purple-600",
    "from-green-500 to-blue-600",
    "from-purple-500 to-pink-600",
    "from-red-500 to-orange-600",
    "from-indigo-500 to-blue-600",
    "from-teal-500 to-green-600",
  ];

  const colorIndex = symbol.charCodeAt(0) % colors.length;

  return {
    type: "fallback" as const,
    letter: firstLetter,
    gradient: colors[colorIndex],
    companyName,
  };
};

// Get logo for a company symbol
export const getCompanyLogo = (symbol: string, companyName: string) => {
  const logoUrl = COMPANY_LOGOS[symbol];

  if (logoUrl) {
    return {
      type: "url" as const,
      url: logoUrl,
      companyName,
    };
  }

  return generateFallbackLogo(symbol, companyName);
};

// Logo component props
export interface LogoData {
  type: "url" | "fallback";
  url?: string;
  letter?: string;
  gradient?: string;
  companyName: string;
}
