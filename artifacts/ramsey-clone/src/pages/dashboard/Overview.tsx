import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { getMarketData, generateChartData, type Asset } from "@/data/marketData";
import OnboardingModal from "@/components/OnboardingModal";
import {
  TrendingUp,
  TrendingDown,
  Wallet,
  BarChart3,
  ArrowUpRight,
  ArrowDownRight,
  DollarSign,
  Activity,
} from "lucide-react";

function MiniChart({ positive }: { positive: boolean }) {
  const points = Array.from({ length: 20 }, (_, i) => {
    const base = 50;
    const trend = positive ? i * 1.5 : -i * 1.2;
    const noise = Math.sin(i * 1.2) * 8 + Math.cos(i * 0.7) * 5;
    return base + trend + noise;
  });
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
      <path
        d={d}
        fill="none"
        stroke={positive ? "#22c55e" : "#ef4444"}
        strokeWidth="2"
      />
    </svg>
  );
}

function PriceTicker({ assets, title }: { assets: Asset[]; title: string }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
      <div className="px-5 py-3 border-b border-gray-100 flex items-center justify-between">
        <h3 className="font-semibold text-sm text-[#003561]">{title}</h3>
        <Activity className="w-4 h-4 text-gray-300" />
      </div>
      <div className="divide-y divide-gray-50">
        {assets.map((a) => (
          <div
            key={a.symbol}
            className="px-5 py-3 flex items-center justify-between hover:bg-blue-50/30 transition-colors"
          >
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
                <p
                  className={`text-xs flex items-center justify-end gap-0.5 ${
                    a.change >= 0 ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {a.change >= 0 ? (
                    <ArrowUpRight className="w-3 h-3" />
                  ) : (
                    <ArrowDownRight className="w-3 h-3" />
                  )}
                  {a.changePercent >= 0 ? "+" : ""}
                  {a.changePercent.toFixed(2)}%
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Overview() {
  const { user } = useAuth();
  const [tick, setTick] = useState(0);
  const [chartData] = useState(() => generateChartData(24));
  const [showOnboarding, setShowOnboarding] = useState(() => {
    return !localStorage.getItem("ramsey_onboarding_done");
  });

  useEffect(() => {
    const interval = setInterval(() => setTick((t) => t + 1), 3000);
    return () => clearInterval(interval);
  }, []);

  const handleCloseOnboarding = () => {
    setShowOnboarding(false);
    localStorage.setItem("ramsey_onboarding_done", "true");
  };

  const { crypto, stocks } = getMarketData(tick);

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

  return (
    <div>
      {showOnboarding && <OnboardingModal onClose={handleCloseOnboarding} />}

      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#003561]">
          Welcome back, {user?.firstName}
        </h1>
        <p className="text-gray-500 text-sm mt-1">
          Here's your portfolio overview
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <p className="text-gray-500 text-sm">Total Balance</p>
            <Wallet className="w-5 h-5 text-[#0073B9]" />
          </div>
          <p className="text-2xl font-bold font-mono text-[#003561]">
            ${portfolioValue.toLocaleString()}
          </p>
          <p className="text-green-500 text-sm mt-1 flex items-center gap-1">
            <TrendingUp className="w-4 h-4" />+$
            {portfolioChange.toLocaleString()} ({portfolioChangePercent}%)
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <p className="text-gray-500 text-sm">Crypto Holdings</p>
            <span className="text-lg text-[#0073B9]">₿</span>
          </div>
          <p className="text-2xl font-bold font-mono text-[#003561]">$78,245.30</p>
          <p className="text-green-500 text-sm mt-1 flex items-center gap-1">
            <TrendingUp className="w-4 h-4" />
            +2.4% today
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <p className="text-gray-500 text-sm">Stock Holdings</p>
            <BarChart3 className="w-5 h-5 text-[#FCD214]" />
          </div>
          <p className="text-2xl font-bold font-mono text-[#003561]">$46,338.12</p>
          <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
            <TrendingDown className="w-4 h-4" />
            -0.8% today
          </p>
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

      <div className="bg-white rounded-2xl border border-gray-200 p-5 mb-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-semibold text-[#003561]">Portfolio Performance</h3>
            <p className="text-gray-400 text-xs mt-0.5">Last 24 hours</p>
          </div>
          <div className="flex gap-2">
            {["1D", "1W", "1M", "3M", "1Y"].map((period, i) => (
              <button
                key={period}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  i === 0
                    ? "bg-[#0073B9] text-white"
                    : "text-gray-400 hover:text-[#003561] hover:bg-gray-50"
                }`}
              >
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PriceTicker assets={crypto} title="Crypto Markets" />
        <PriceTicker assets={stocks} title="Stock Markets" />
      </div>
    </div>
  );
}
