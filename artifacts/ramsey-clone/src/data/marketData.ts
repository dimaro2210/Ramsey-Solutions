export interface Asset {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  icon: string;
  type: "crypto" | "stock";
}

export interface Trade {
  id: string;
  date: string;
  type: "buy" | "sell";
  asset: string;
  assetType: "crypto" | "stock";
  quantity: number;
  price: number;
  total: number;
  status: "completed" | "pending" | "cancelled";
}

export const MOCK_TRADES: Trade[] = [
  { id: "TXN-001", date: "2026-03-31 09:15", type: "buy", asset: "BTC", assetType: "crypto", quantity: 0.05, price: 67432.18, total: 3371.61, status: "completed" },
  { id: "TXN-002", date: "2026-03-30 14:22", type: "sell", asset: "ETH", assetType: "crypto", quantity: 2.0, price: 3521.44, total: 7042.88, status: "completed" },
  { id: "TXN-003", date: "2026-03-30 11:05", type: "buy", asset: "AAPL", assetType: "stock", quantity: 10, price: 189.84, total: 1898.40, status: "completed" },
  { id: "TXN-004", date: "2026-03-29 16:30", type: "buy", asset: "NVDA", assetType: "stock", quantity: 5, price: 875.28, total: 4376.40, status: "completed" },
  { id: "TXN-005", date: "2026-03-29 10:12", type: "sell", asset: "SOL", assetType: "crypto", quantity: 15, price: 178.92, total: 2683.80, status: "completed" },
  { id: "TXN-006", date: "2026-03-28 13:45", type: "buy", asset: "MSFT", assetType: "stock", quantity: 8, price: 422.56, total: 3380.48, status: "completed" },
  { id: "TXN-007", date: "2026-03-28 09:00", type: "buy", asset: "ETH", assetType: "crypto", quantity: 3.5, price: 3480.20, total: 12180.70, status: "completed" },
  { id: "TXN-008", date: "2026-03-27 15:18", type: "sell", asset: "TSLA", assetType: "stock", quantity: 12, price: 251.30, total: 3015.60, status: "completed" },
  { id: "TXN-009", date: "2026-03-27 11:42", type: "buy", asset: "DOGE", assetType: "crypto", quantity: 5000, price: 0.1234, total: 617.00, status: "pending" },
  { id: "TXN-010", date: "2026-03-26 10:30", type: "buy", asset: "BTC", assetType: "crypto", quantity: 0.1, price: 66890.00, total: 6689.00, status: "completed" },
];

const CRYPTO_IDS: Record<string, string> = {
  BTC: "bitcoin",
  ETH: "ethereum",
  SOL: "solana",
  BNB: "binancecoin",
  XRP: "ripple",
  ADA: "cardano",
  DOGE: "dogecoin",
  DOT: "polkadot",
};

const CRYPTO_ICONS: Record<string, string> = {
  BTC: "₿", ETH: "Ξ", SOL: "◎", BNB: "⬡", XRP: "✕", ADA: "₳", DOGE: "Ð", DOT: "●",
};

const CRYPTO_NAMES: Record<string, string> = {
  BTC: "Bitcoin", ETH: "Ethereum", SOL: "Solana", BNB: "BNB",
  XRP: "Ripple", ADA: "Cardano", DOGE: "Dogecoin", DOT: "Polkadot",
};

const STOCK_NAMES: Record<string, string> = {
  AAPL: "Apple Inc.", MSFT: "Microsoft", GOOGL: "Alphabet", AMZN: "Amazon",
  TSLA: "Tesla", NVDA: "NVIDIA", META: "Meta", JPM: "JPMorgan",
};
const STOCK_ICONS: Record<string, string> = {
  AAPL: "", MSFT: "⊞", GOOGL: "G", AMZN: "a", TSLA: "T", NVDA: "N", META: "M", JPM: "J",
};

let cachedCrypto: Asset[] | null = null;
let lastCryptoFetch = 0;

const FALLBACK_CRYPTO: Asset[] = [
  { symbol: "BTC", name: "Bitcoin", price: 67432.18, change: 1243.50, changePercent: 1.88, icon: "₿", type: "crypto" },
  { symbol: "ETH", name: "Ethereum", price: 3521.44, change: -45.22, changePercent: -1.27, icon: "Ξ", type: "crypto" },
  { symbol: "SOL", name: "Solana", price: 178.92, change: 8.34, changePercent: 4.89, icon: "◎", type: "crypto" },
  { symbol: "BNB", name: "BNB", price: 612.30, change: 15.60, changePercent: 2.61, icon: "⬡", type: "crypto" },
  { symbol: "XRP", name: "Ripple", price: 0.5234, change: -0.0121, changePercent: -2.26, icon: "✕", type: "crypto" },
  { symbol: "ADA", name: "Cardano", price: 0.4521, change: 0.0234, changePercent: 5.46, icon: "₳", type: "crypto" },
  { symbol: "DOGE", name: "Dogecoin", price: 0.1234, change: 0.0045, changePercent: 3.79, icon: "Ð", type: "crypto" },
  { symbol: "DOT", name: "Polkadot", price: 7.82, change: -0.15, changePercent: -1.88, icon: "●", type: "crypto" },
];

const BASE_STOCKS: Asset[] = [
  { symbol: "AAPL", name: "Apple Inc.", price: 189.84, change: 2.34, changePercent: 1.25, icon: "", type: "stock" },
  { symbol: "MSFT", name: "Microsoft", price: 422.56, change: 5.67, changePercent: 1.36, icon: "⊞", type: "stock" },
  { symbol: "GOOGL", name: "Alphabet", price: 175.23, change: -1.45, changePercent: -0.82, icon: "G", type: "stock" },
  { symbol: "AMZN", name: "Amazon", price: 185.67, change: 3.21, changePercent: 1.76, icon: "a", type: "stock" },
  { symbol: "TSLA", name: "Tesla", price: 248.92, change: -8.43, changePercent: -3.28, icon: "T", type: "stock" },
  { symbol: "NVDA", name: "NVIDIA", price: 875.28, change: 22.15, changePercent: 2.60, icon: "N", type: "stock" },
  { symbol: "META", name: "Meta", price: 502.14, change: 7.89, changePercent: 1.60, icon: "M", type: "stock" },
  { symbol: "JPM", name: "JPMorgan", price: 198.45, change: 1.23, changePercent: 0.62, icon: "J", type: "stock" },
];

export async function fetchLiveCrypto(): Promise<Asset[]> {
  const now = Date.now();
  if (cachedCrypto && now - lastCryptoFetch < 10000) return cachedCrypto;

  try {
    const ids = Object.values(CRYPTO_IDS).join(",");
    const res = await fetch(
      `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd&include_24hr_change=true`
    );
    if (!res.ok) throw new Error("CoinGecko API error");
    const data = await res.json();

    const assets: Asset[] = Object.entries(CRYPTO_IDS).map(([symbol, id]) => {
      const info = data[id];
      if (!info) {
        const fallback = FALLBACK_CRYPTO.find((f) => f.symbol === symbol)!;
        return fallback;
      }
      const price = info.usd || 0;
      const changePercent = info.usd_24h_change || 0;
      const change = price * (changePercent / 100);
      return {
        symbol,
        name: CRYPTO_NAMES[symbol],
        price: Math.round(price * 100) / 100,
        change: Math.round(change * 100) / 100,
        changePercent: Math.round(changePercent * 100) / 100,
        icon: CRYPTO_ICONS[symbol],
        type: "crypto" as const,
      };
    });

    cachedCrypto = assets;
    lastCryptoFetch = now;
    return assets;
  } catch {
    if (cachedCrypto) return cachedCrypto;
    return FALLBACK_CRYPTO;
  }
}

export function fetchLiveStocks(): Asset[] {
  return BASE_STOCKS.map((s) => {
    const variance = s.price * 0.003;
    const randomChange = (Math.random() - 0.5) * 2 * variance;
    const newPrice = Math.round((s.price + randomChange) * 100) / 100;
    const change = Math.round(randomChange * 100) / 100;
    const changePercent = Math.round((change / s.price) * 10000) / 100;
    return { ...s, price: newPrice, change, changePercent };
  });
}

export function generateChartData(points: number = 24) {
  const data = [];
  let value = 45000 + Math.random() * 5000;
  for (let i = 0; i < points; i++) {
    value += (Math.random() - 0.48) * 800;
    data.push({ time: `${i}:00`, value: Math.round(value * 100) / 100 });
  }
  return data;
}
