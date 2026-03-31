import { useState, useEffect, useCallback } from "react";
import { useAuth } from "@/context/AuthContext";
import { Link } from "react-router-dom";
import { fetchLiveCrypto, fetchLiveStocks, generateChartData, type Asset, MOCK_TRADES } from "@/data/marketData";
import {
  TrendingUp,
  TrendingDown,
  Wallet,
  BarChart3,
  ArrowUpRight,
  ArrowDownRight,
  DollarSign,
  Activity,
  ArrowDownToLine,
  ArrowUpFromLine,
  Clock,
  Newspaper,
  PieChart,
} from "lucide-react";

function MiniChart({ positive }: { positive: boolean }) {
  const [points] = useState(() =>
    Array.from({ length: 20 }, (_, i) => {
      const base = 50;
      const trend = positive ? i * 1.5 : -i * 1.2;
      const noise = Math.sin(i * 1.2) * 8 + Math.cos(i * 0.7) * 5;
      return base + trend + noise;
    })
  );
  const min = Math.min(...points);
  const max = Math.max(...points);
  const range = max - min || 1;
  const h = 40;
  const w = 100;
  const d = points
    .map((p, i) => {
      const x = (i / (points.length - 1)) * w;
      const y = h - ((p - min) / range) * h;
      return `${i === 0 ? "M" : "L"}${x},${y}`;
    })
    .join(" ");

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-24 h-10">
      <path d={d} fill="none" stroke={positive ? "#22c55e" : "#ef4444"} strokeWidth="2" />
    </svg>
  );
}

function PriceTicker({ assets, title, loading }: { assets: Asset[]; title: string; loading: boolean }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
      <div className="px-5 py-3 border-b border-gray-100 flex items-center justify-between">
        <h3 className="font-semibold text-sm text-[#003561]">{title}</h3>
        <div className="flex items-center gap-2">
          {loading && <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />}
          <Activity className="w-4 h-4 text-gray-300" />
        </div>
      </div>
      <div className="divide-y divide-gray-50">
        {assets.map((a) => (
          <div key={a.symbol} className="px-5 py-3 flex items-center justify-between hover:bg-blue-50/30 transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#003561]/5 flex items-center justify-center text-sm font-bold text-[#003561]">
                {a.icon || a.symbol[0]}
              </div>
              <div>
                <p className="font-medium text-sm text-[#003561]">{a.symbol}</p>
                <p className="text-xs text-gray-400">{a.name}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <MiniChart positive={a.change >= 0} />
              <div className="text-right min-w-[80px]">
                <p className="font-mono text-sm font-medium text-[#003561]">
                  ${a.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </p>
                <p className={`text-xs flex items-center justify-end gap-0.5 ${a.change >= 0 ? "text-green-500" : "text-red-500"}`}>
                  {a.change >= 0 ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                  {a.changePercent >= 0 ? "+" : ""}{a.changePercent.toFixed(2)}%
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const NEWS_ITEMS = [
  { title: "Bitcoin Surges Past Key Resistance Level", time: "2h ago", category: "Crypto" },
  { title: "Fed Signals Potential Rate Cut in Q2", time: "4h ago", category: "Markets" },
  { title: "NVIDIA Reports Record AI Chip Revenue", time: "6h ago", category: "Stocks" },
  { title: "Ethereum ETF Approval Expected Soon", time: "8h ago", category: "Crypto" },
  { title: "S&P 500 Hits New All-Time High", time: "12h ago", category: "Markets" },
];

const ALLOCATION_DATA = [
  { label: "Bitcoin", pct: 32, color: "#F7931A" },
  { label: "Ethereum", pct: 18, color: "#627EEA" },
  { label: "US Stocks", pct: 28, color: "#003561" },
  { label: "Other Crypto", pct: 12, color: "#0073B9" },
  { label: "Cash", pct: 10, color: "#22c55e" },
];

export default function Overview() {
  const { user } = useAuth();
  const [crypto, setCrypto] = useState<Asset[]>([]);
  const [stocks, setStocks] = useState<Asset[]>([]);
  const [loading, setLoading] = useState(true);
  const [chartData] = useState(() => generateChartData(24));

  const fetchData = useCallback(async () => {
    const [c, s] = await Promise.all([fetchLiveCrypto(), fetchLiveStocks()]);
    setCrypto(c);
    setStocks(s);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 10000);
    return () => clearInterval(interval);
  }, [fetchData]);

  const portfolioValue = 124583.42;
  const portfolioChange = 2341.18;
  const portfolioChangePercent = 1.91;

  const chartMin = Math.min(...chartData.map((d) => d.value));
  const chartMax = Math.max(...chartData.map((d) => d.value));
  const chartRange = chartMax - chartMin || 1;
  const chartH = 200;
  const chartW = 800;
  const chartPath = chartData
    .map((d, i) => {
      const x = (i / (chartData.length - 1)) * chartW;
      const y = chartH - ((d.value - chartMin) / chartRange) * chartH;
      return `${i === 0 ? "M" : "L"}${x},${y}`;
    })
    .join(" ");
  const gradientPath = `${chartPath} L${chartW},${chartH} L0,${chartH} Z`;

  const recentTrades = MOCK_TRADES.slice(0, 5);

  let cumulAngle = 0;
  const pieSlices = ALLOCATION_DATA.map((d) => {
    const angle = (d.pct / 100) * 360;
    const startAngle = cumulAngle;
    cumulAngle += angle;
    const endAngle = cumulAngle;
    const startRad = ((startAngle - 90) * Math.PI) / 180;
    const endRad = ((endAngle - 90) * Math.PI) / 180;
    const largeArc = angle > 180 ? 1 : 0;
    const x1 = 50 + 40 * Math.cos(startRad);
    const y1 = 50 + 40 * Math.sin(startRad);
    const x2 = 50 + 40 * Math.cos(endRad);
    const y2 = 50 + 40 * Math.sin(endRad);
    return { ...d, path: `M50,50 L${x1},${y1} A40,40 0 ${largeArc},1 ${x2},${y2} Z` };
  });

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#003561]">Welcome back, {user?.firstName}</h1>
        <p className="text-gray-500 text-sm mt-1">Here's your portfolio overview</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <p className="text-gray-500 text-sm">Total Balance</p>
            <Wallet className="w-5 h-5 text-[#0073B9]" />
          </div>
          <p className="text-2xl font-bold font-mono text-[#003561]">${portfolioValue.toLocaleString()}</p>
          <p className="text-green-500 text-sm mt-1 flex items-center gap-1">
            <TrendingUp className="w-4 h-4" />+${portfolioChange.toLocaleString()} ({portfolioChangePercent}%)
          </p>
        </div>
        <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <p className="text-gray-500 text-sm">Crypto Holdings</p>
            <span className="text-lg text-[#0073B9]">₿</span>
          </div>
          <p className="text-2xl font-bold font-mono text-[#003561]">$78,245.30</p>
          <p className="text-green-500 text-sm mt-1 flex items-center gap-1"><TrendingUp className="w-4 h-4" />+2.4% today</p>
        </div>
        <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <p className="text-gray-500 text-sm">Stock Holdings</p>
            <BarChart3 className="w-5 h-5 text-[#FCD214]" />
          </div>
          <p className="text-2xl font-bold font-mono text-[#003561]">$46,338.12</p>
          <p className="text-red-500 text-sm mt-1 flex items-center gap-1"><TrendingDown className="w-4 h-4" />-0.8% today</p>
        </div>
        <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <p className="text-gray-500 text-sm">Available Cash</p>
            <DollarSign className="w-5 h-5 text-green-500" />
          </div>
          <p className="text-2xl font-bold font-mono text-[#003561]">$12,450.00</p>
          <p className="text-gray-400 text-sm mt-1">Ready to invest</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-semibold text-[#003561]">Portfolio Performance</h3>
              <p className="text-gray-400 text-xs mt-0.5">Last 24 hours</p>
            </div>
            <div className="flex gap-2">
              {["1D", "1W", "1M", "3M", "1Y"].map((period, i) => (
                <button key={period} className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${i === 0 ? "bg-[#0073B9] text-white" : "text-gray-400 hover:text-[#003561] hover:bg-gray-50"}`}>
                  {period}
                </button>
              ))}
            </div>
          </div>
          <svg viewBox={`0 0 ${chartW} ${chartH + 20}`} className="w-full h-48">
            <defs>
              <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#0073B9" stopOpacity="0.15" />
                <stop offset="100%" stopColor="#0073B9" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path d={gradientPath} fill="url(#chartGrad)" />
            <path d={chartPath} fill="none" stroke="#0073B9" strokeWidth="2.5" />
          </svg>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
          <h3 className="font-semibold text-sm text-[#003561] mb-3 flex items-center gap-2">
            <PieChart className="w-4 h-4 text-[#0073B9]" />
            Portfolio Allocation
          </h3>
          <div className="flex justify-center mb-4">
            <svg viewBox="0 0 100 100" className="w-36 h-36">
              {pieSlices.map((s) => (
                <path key={s.label} d={s.path} fill={s.color} stroke="white" strokeWidth="1" />
              ))}
              <circle cx="50" cy="50" r="20" fill="white" />
            </svg>
          </div>
          <div className="space-y-2">
            {ALLOCATION_DATA.map((d) => (
              <div key={d.label} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: d.color }} />
                  <span className="text-gray-600">{d.label}</span>
                </div>
                <span className="font-medium text-[#003561]">{d.pct}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <Link to="/dashboard/deposit" className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm hover:border-[#0073B9] transition-colors group">
          <ArrowDownToLine className="w-8 h-8 text-green-500 mb-3 group-hover:scale-110 transition-transform" />
          <p className="font-semibold text-[#003561]">Deposit Funds</p>
          <p className="text-gray-400 text-xs mt-1">Add money to your account</p>
        </Link>
        <Link to="/dashboard/withdraw" className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm hover:border-[#0073B9] transition-colors group">
          <ArrowUpFromLine className="w-8 h-8 text-orange-500 mb-3 group-hover:scale-110 transition-transform" />
          <p className="font-semibold text-[#003561]">Withdraw Funds</p>
          <p className="text-gray-400 text-xs mt-1">Transfer to your bank or wallet</p>
        </Link>
        <Link to="/dashboard/history" className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm hover:border-[#0073B9] transition-colors group">
          <Clock className="w-8 h-8 text-[#0073B9] mb-3 group-hover:scale-110 transition-transform" />
          <p className="font-semibold text-[#003561]">Trading History</p>
          <p className="text-gray-400 text-xs mt-1">View all past transactions</p>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <PriceTicker assets={crypto} title="Crypto Markets (Live)" loading={loading} />
        <PriceTicker assets={stocks} title="Stock Markets (Live)" loading={loading} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
          <div className="px-5 py-3 border-b border-gray-100 flex items-center justify-between">
            <h3 className="font-semibold text-sm text-[#003561]">Recent Activity</h3>
            <Link to="/dashboard/history" className="text-xs text-[#0073B9] font-medium hover:underline">View All</Link>
          </div>
          <div className="divide-y divide-gray-50">
            {recentTrades.map((t) => (
              <div key={t.id} className="px-5 py-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${t.type === "buy" ? "bg-green-50" : "bg-red-50"}`}>
                    {t.type === "buy" ? <ArrowDownRight className="w-4 h-4 text-green-500" /> : <ArrowUpRight className="w-4 h-4 text-red-500" />}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-[#003561]">{t.type === "buy" ? "Bought" : "Sold"} {t.asset}</p>
                    <p className="text-xs text-gray-400">{t.date}</p>
                  </div>
                </div>
                <p className={`font-mono text-sm font-medium ${t.type === "buy" ? "text-green-600" : "text-red-500"}`}>
                  {t.type === "buy" ? "-" : "+"}${t.total.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
          <div className="px-5 py-3 border-b border-gray-100 flex items-center gap-2">
            <Newspaper className="w-4 h-4 text-gray-400" />
            <h3 className="font-semibold text-sm text-[#003561]">Market News</h3>
          </div>
          <div className="divide-y divide-gray-50">
            {NEWS_ITEMS.map((n, i) => (
              <div key={i} className="px-5 py-3 hover:bg-blue-50/30 transition-colors">
                <p className="text-sm font-medium text-[#003561]">{n.title}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-[10px] px-2 py-0.5 bg-blue-50 text-[#0073B9] rounded font-medium">{n.category}</span>
                  <span className="text-xs text-gray-400">{n.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
