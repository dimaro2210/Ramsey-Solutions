import { useState, useEffect, useCallback } from "react";
import { useAuth } from "@/context/AuthContext";
import { Link } from "react-router-dom";
import { fetchLiveCrypto, fetchLiveStocks, generateChartData, type Asset, MOCK_TRADES } from "@/data/marketData";
import { motion } from "framer-motion";
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

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
};

const stagger = {
  animate: { transition: { staggerChildren: 0.08 } },
};

function LiquidBlob({ className }: { className?: string }) {
  return (
    <div className={`absolute pointer-events-none ${className}`}>
      <div className="w-full h-full rounded-full opacity-30 blur-3xl animate-pulse" style={{
        background: "radial-gradient(circle, rgba(0,115,185,0.4) 0%, rgba(0,53,97,0.1) 70%, transparent 100%)",
        animation: "liquidFloat 6s ease-in-out infinite",
      }} />
    </div>
  );
}

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
      <path d={d} fill="none" stroke={positive ? "#22c55e" : "#ef4444"} strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function PriceTicker({ assets, title, loading }: { assets: Asset[]; title: string; loading: boolean }) {
  return (
    <motion.div {...fadeUp} className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200/60 overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
      <div className="px-5 py-3 border-b border-gray-100 flex items-center justify-between">
        <h3 className="font-semibold text-sm text-[#003561]">{title}</h3>
        <div className="flex items-center gap-2">
          {loading && <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />}
          <Activity className="w-4 h-4 text-gray-300" />
        </div>
      </div>
      <div className="divide-y divide-gray-50">
        {assets.map((a, i) => (
          <motion.div
            key={a.symbol}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05, duration: 0.3 }}
            className="px-5 py-3 flex items-center justify-between hover:bg-gradient-to-r hover:from-blue-50/40 hover:to-transparent transition-all duration-200"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#003561]/10 to-[#0073B9]/10 flex items-center justify-center text-sm font-bold text-[#003561]">
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
          </motion.div>
        ))}
      </div>
    </motion.div>
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
    const c = await fetchLiveCrypto();
    const s = fetchLiveStocks();
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

  const statCards = [
    {
      label: "Total Balance",
      value: `$${portfolioValue.toLocaleString()}`,
      sub: `+$${portfolioChange.toLocaleString()} (${portfolioChangePercent}%)`,
      subColor: "text-green-500",
      icon: <Wallet className="w-5 h-5" />,
      iconBg: "from-[#0073B9]/20 to-[#003561]/10",
      iconColor: "text-[#0073B9]",
      subIcon: <TrendingUp className="w-4 h-4" />,
    },
    {
      label: "Crypto Holdings",
      value: "$78,245.30",
      sub: "+2.4% today",
      subColor: "text-green-500",
      icon: <span className="text-lg">₿</span>,
      iconBg: "from-orange-100 to-orange-50",
      iconColor: "text-orange-600",
      subIcon: <TrendingUp className="w-4 h-4" />,
    },
    {
      label: "Stock Holdings",
      value: "$46,338.12",
      sub: "-0.8% today",
      subColor: "text-red-500",
      icon: <BarChart3 className="w-5 h-5" />,
      iconBg: "from-yellow-100 to-yellow-50",
      iconColor: "text-yellow-600",
      subIcon: <TrendingDown className="w-4 h-4" />,
    },
    {
      label: "Available Cash",
      value: "$12,450.00",
      sub: "Ready to invest",
      subColor: "text-gray-400",
      icon: <DollarSign className="w-5 h-5" />,
      iconBg: "from-green-100 to-green-50",
      iconColor: "text-green-600",
      subIcon: null,
    },
  ];

  return (
    <motion.div initial="initial" animate="animate" variants={stagger}>
      <style>{`
        @keyframes liquidFloat {
          0%, 100% { transform: translate(0, 0) scale(1); border-radius: 40% 60% 50% 50%; }
          33% { transform: translate(10px, -10px) scale(1.05); border-radius: 50% 40% 60% 50%; }
          66% { transform: translate(-5px, 5px) scale(0.95); border-radius: 60% 50% 40% 60%; }
        }
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
      `}</style>

      <motion.div {...fadeUp} className="mb-6">
        <h1 className="text-2xl font-bold text-[#003561]">Welcome back, {user?.firstName}</h1>
        <p className="text-gray-500 text-sm mt-1">Here's your portfolio overview</p>
      </motion.div>

      <motion.div variants={stagger} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {statCards.map((card, i) => (
          <motion.div
            key={card.label}
            variants={fadeUp}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className="relative bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200/60 p-5 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group"
          >
            {i === 0 && <LiquidBlob className="w-32 h-32 -top-10 -right-10" />}
            <div className="flex items-center justify-between mb-3 relative z-10">
              <p className="text-gray-500 text-sm">{card.label}</p>
              <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${card.iconBg} flex items-center justify-center ${card.iconColor} group-hover:scale-110 transition-transform duration-300`}>
                {card.icon}
              </div>
            </div>
            <p className="text-2xl font-bold font-mono text-[#003561] relative z-10">{card.value}</p>
            <p className={`${card.subColor} text-sm mt-1 flex items-center gap-1 relative z-10`}>
              {card.subIcon}{card.sub}
            </p>
          </motion.div>
        ))}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <motion.div {...fadeUp} className="lg:col-span-2 relative bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200/60 p-5 shadow-sm overflow-hidden">
          <LiquidBlob className="w-48 h-48 -bottom-20 -left-20 opacity-20" />
          <div className="flex items-center justify-between mb-4 relative z-10">
            <div>
              <h3 className="font-semibold text-[#003561]">Portfolio Performance</h3>
              <p className="text-gray-400 text-xs mt-0.5">Last 24 hours</p>
            </div>
            <div className="flex gap-1.5">
              {["1D", "1W", "1M", "3M", "1Y"].map((period, i) => (
                <button key={period} className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${i === 0 ? "bg-[#0073B9] text-white shadow-sm" : "text-gray-400 hover:text-[#003561] hover:bg-gray-50"}`}>
                  {period}
                </button>
              ))}
            </div>
          </div>
          <svg viewBox={`0 0 ${chartW} ${chartH + 20}`} className="w-full h-48 relative z-10">
            <defs>
              <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#0073B9" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#0073B9" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path d={gradientPath} fill="url(#chartGrad)" />
            <path d={chartPath} fill="none" stroke="#0073B9" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            <circle
              cx={(chartData.length - 1) / (chartData.length - 1) * chartW}
              cy={chartH - ((chartData[chartData.length - 1].value - chartMin) / chartRange) * chartH}
              r="4"
              fill="#0073B9"
              className="animate-pulse"
            />
          </svg>
        </motion.div>

        <motion.div {...fadeUp} className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200/60 p-5 shadow-sm">
          <h3 className="font-semibold text-sm text-[#003561] mb-3 flex items-center gap-2">
            <PieChart className="w-4 h-4 text-[#0073B9]" />
            Portfolio Allocation
          </h3>
          <div className="flex justify-center mb-4">
            <motion.svg
              viewBox="0 0 100 100"
              className="w-36 h-36"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              {pieSlices.map((s) => (
                <path key={s.label} d={s.path} fill={s.color} stroke="white" strokeWidth="1.5" className="hover:opacity-80 transition-opacity cursor-pointer" />
              ))}
              <circle cx="50" cy="50" r="20" fill="white" />
            </motion.svg>
          </div>
          <div className="space-y-2">
            {ALLOCATION_DATA.map((d, i) => (
              <motion.div
                key={d.label}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.05 }}
                className="flex items-center justify-between text-sm"
              >
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: d.color }} />
                  <span className="text-gray-600">{d.label}</span>
                </div>
                <span className="font-medium text-[#003561]">{d.pct}%</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      <motion.div variants={stagger} className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        {[
          { to: "/dashboard/deposit", icon: <ArrowDownToLine className="w-7 h-7" />, color: "text-green-500", bg: "from-green-50 to-green-100/50", label: "Deposit Funds", desc: "Add money to your account" },
          { to: "/dashboard/withdraw", icon: <ArrowUpFromLine className="w-7 h-7" />, color: "text-orange-500", bg: "from-orange-50 to-orange-100/50", label: "Withdraw Funds", desc: "Transfer to your bank or wallet" },
          { to: "/dashboard/history", icon: <Clock className="w-7 h-7" />, color: "text-[#0073B9]", bg: "from-blue-50 to-blue-100/50", label: "Trading History", desc: "View all past transactions" },
        ].map((action) => (
          <motion.div key={action.to} variants={fadeUp}>
            <Link
              to={action.to}
              className="block bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200/60 p-5 shadow-sm hover:shadow-lg hover:border-[#0073B9]/30 transition-all duration-300 group"
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${action.bg} flex items-center justify-center ${action.color} mb-3 group-hover:scale-110 transition-transform duration-300`}>
                {action.icon}
              </div>
              <p className="font-semibold text-[#003561]">{action.label}</p>
              <p className="text-gray-400 text-xs mt-1">{action.desc}</p>
            </Link>
          </motion.div>
        ))}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <PriceTicker assets={crypto} title="Crypto Markets (Live)" loading={loading} />
        <PriceTicker assets={stocks} title="Stock Markets" loading={loading} />
      </div>

      <motion.div variants={stagger} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div {...fadeUp} className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200/60 overflow-hidden shadow-sm">
          <div className="px-5 py-3 border-b border-gray-100 flex items-center justify-between">
            <h3 className="font-semibold text-sm text-[#003561]">Recent Activity</h3>
            <Link to="/dashboard/history" className="text-xs text-[#0073B9] font-medium hover:underline">View All</Link>
          </div>
          <div className="divide-y divide-gray-50">
            {recentTrades.map((t, i) => (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06 }}
                className="px-5 py-3 flex items-center justify-between hover:bg-gradient-to-r hover:from-blue-50/30 hover:to-transparent transition-all duration-200"
              >
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
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div {...fadeUp} className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200/60 overflow-hidden shadow-sm">
          <div className="px-5 py-3 border-b border-gray-100 flex items-center gap-2">
            <Newspaper className="w-4 h-4 text-gray-400" />
            <h3 className="font-semibold text-sm text-[#003561]">Market News</h3>
          </div>
          <div className="divide-y divide-gray-50">
            {NEWS_ITEMS.map((n, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06 }}
                className="px-5 py-3 hover:bg-gradient-to-r hover:from-blue-50/30 hover:to-transparent transition-all duration-200 cursor-pointer"
              >
                <p className="text-sm font-medium text-[#003561]">{n.title}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-[10px] px-2 py-0.5 bg-gradient-to-r from-blue-50 to-blue-100/50 text-[#0073B9] rounded font-medium">{n.category}</span>
                  <span className="text-xs text-gray-400">{n.time}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
