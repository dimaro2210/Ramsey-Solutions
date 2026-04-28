import { useState, useEffect, useMemo, useCallback } from "react";
import { TrendingUp, TrendingDown, ArrowLeft, ArrowUpRight, ArrowDownRight, Zap, Clock, Lock, ChevronRight, BarChart3, X } from "lucide-react";
import { fetchLiveStocks, type Asset } from "@/data/marketData";
import { useAuth } from "@/context/AuthContext";
import { db, Trade } from "@/lib/db";

function generateCandles(count: number, basePrice: number) {
  const candles = [];
  let price = basePrice;
  for (let i = 0; i < count; i++) {
    const open = price + (Math.random() - 0.5) * 4;
    const close = open + (Math.random() - 0.5) * 6;
    const high = Math.max(open, close) + Math.random() * 3;
    const low = Math.min(open, close) - Math.random() * 3;
    candles.push({ open, close, high, low, time: i });
    price = close;
  }
  return candles;
}

type View = "home" | "open-trade" | "closed-trades" | "closed-detail";

export default function LiveTrading() {
  const { user: authUser } = useAuth();
  const [assets, setAssets] = useState<Asset[]>([]);
  const [trades, setTrades] = useState<Trade[]>([]);
  const [view, setView] = useState<View>("home");
  const [selectedClosedTrade, setSelectedClosedTrade] = useState<Trade | null>(null);
  const [livePrice, setLivePrice] = useState(0);
  const [timeframe, setTimeframe] = useState("1H");

  const loadTrades = useCallback(async () => {
    if (authUser?.id) {
      const userTrades = await db.getTrades(authUser.id);
      setTrades(userTrades);
    }
  }, [authUser?.id]);

  useEffect(() => {
    const fetchData = async () => { 
      const liveAssets = await fetchLiveStocks();
      setAssets(liveAssets);
    };
    fetchData();
    loadTrades();
    db.autoCloseExpiredTrades();
    const interval = setInterval(() => { fetchData(); loadTrades(); db.autoCloseExpiredTrades(); }, 30000);
    window.addEventListener("db_updated", loadTrades);
    return () => { clearInterval(interval); window.removeEventListener("db_updated", loadTrades); };
  }, [loadTrades]);

  const openTrades = trades.filter(t => t.status === "open");
  const closedTrades = trades.filter(t => t.status === "closed").sort((a, b) => (b.closedAt || 0) - (a.closedAt || 0));
  const activeTrade = openTrades[0] || null;

  const tradeAsset = useMemo(() => {
    if (!activeTrade) return assets[0] || null;
    return assets.find(a => a.symbol === activeTrade.assetTicker) || { symbol: activeTrade.assetTicker, name: activeTrade.assetTicker, price: activeTrade.entryPrice, change: 0, changePercent: 0, icon: "", type: "stock" as const };
  }, [activeTrade, assets]);

  useEffect(() => { if (tradeAsset) setLivePrice(tradeAsset.price); }, [tradeAsset]);
  useEffect(() => {
    if (view !== "open-trade" || !activeTrade) return;
    const tick = setInterval(() => setLivePrice(p => +(p + (Math.random() - 0.5) * 0.5).toFixed(2)), 1000);
    return () => clearInterval(tick);
  }, [view, activeTrade]);

  const candles = useMemo(() => tradeAsset ? generateCandles(40, tradeAsset.price) : [], [tradeAsset, timeframe]);

  const calcProfit = (trade: Trade) => {
    if (trade.status === "closed") return trade.finalProfit || 0;
    if (trade.profitOverride) return trade.profitOverride;
    const asset = assets.find(a => a.symbol === trade.assetTicker);
    const cur = asset ? asset.price : trade.entryPrice;
    const diff = trade.positionType === "LONG" ? cur - trade.entryPrice : trade.entryPrice - cur;
    let p = (diff / trade.entryPrice) * trade.amountUsd * trade.leverage;
    if (trade.minDispProfit && p < trade.minDispProfit) p = trade.minDispProfit;
    if (trade.maxDispProfit && p > trade.maxDispProfit) p = trade.maxDispProfit;
    return p;
  };

  const formatTime = (ms: number) => {
    const s = Math.max(0, Math.floor(ms / 1000));
    return `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, "0")}`;
  };

  // Chart dimensions
  const cW = 800, cH = 300, pad = { t: 20, r: 20, b: 20, l: 20 };
  const allP = candles.flatMap(c => [c.high, c.low]);
  const minP = allP.length ? Math.min(...allP) - 2 : 0;
  const maxP = allP.length ? Math.max(...allP) + 2 : 100;
  const pR = maxP - minP || 1;
  const candleW = candles.length ? (cW - pad.l - pad.r) / candles.length : 10;
  const sY = (price: number) => pad.t + ((maxP - price) / pR) * (cH - pad.t - pad.b);

  // ── HOME VIEW ──
  if (view === "home") {
    return (
      <div className="flex flex-col gap-8 pb-10">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Open Trade Card */}
          <div onClick={() => setView("open-trade")}
            className="bg-white rounded-[30px] p-8 shadow-xl border-2 border-gray-100 hover:border-[#0073B9] cursor-pointer group transition-all hover:-translate-y-1 relative overflow-hidden">
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-green-500/5 rounded-full transition-all group-hover:scale-150" />
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-6">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-lg shadow-green-500/20">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
                {activeTrade && <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse shadow-lg shadow-green-500/50" />}
              </div>
              <h2 className="text-2xl font-black text-[#0073B9] mb-2">Open Trade</h2>
              <p className="text-sm text-gray-400 font-medium">
                {activeTrade ? `${openTrades.length} active position${openTrades.length > 1 ? "s" : ""} running` : "No active positions right now"}
              </p>
              <div className="flex items-center gap-2 mt-6 text-[#0073B9] font-bold text-sm group-hover:gap-3 transition-all">
                View Details <ChevronRight className="w-4 h-4" />
              </div>
            </div>
          </div>

          {/* Closed Trade Card */}
          <div onClick={() => setView("closed-trades")}
            className="bg-white rounded-[30px] p-8 shadow-xl border-2 border-gray-100 hover:border-[#0073B9] cursor-pointer group transition-all hover:-translate-y-1 relative overflow-hidden">
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-[#0073B9]/5 rounded-full transition-all group-hover:scale-150" />
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-6">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#0073B9] to-[#002040] flex items-center justify-center shadow-lg shadow-[#0073B9]/20">
                  <BarChart3 className="w-8 h-8 text-[#FCD214]" />
                </div>
                <span className="text-xs font-black text-gray-400 bg-gray-100 px-3 py-1.5 rounded-xl">{closedTrades.length} TRADES</span>
              </div>
              <h2 className="text-2xl font-black text-[#0073B9] mb-2">Closed Trades</h2>
              <p className="text-sm text-gray-400 font-medium">
                {closedTrades.length > 0 ? "View all settled trade history" : "No closed trades yet"}
              </p>
              <div className="flex items-center gap-2 mt-6 text-[#0073B9] font-bold text-sm group-hover:gap-3 transition-all">
                View History <ChevronRight className="w-4 h-4" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ── OPEN TRADE VIEW ──
  if (view === "open-trade") {
    return (
      <div className="flex flex-col gap-6 pb-10">
        <button onClick={() => setView("home")} className="flex items-center gap-2 text-[#0073B9] font-bold text-sm hover:gap-3 transition-all w-fit">
          <ArrowLeft className="w-4 h-4" /> Back to Trading Floor
        </button>

        {!activeTrade ? (
          <div className="bg-white rounded-[30px] p-16 shadow-xl border border-gray-100 text-center">
            <div className="w-20 h-20 rounded-full bg-gray-50 flex items-center justify-center mx-auto mb-6 border-2 border-gray-100">
              <Lock className="w-8 h-8 text-gray-300" />
            </div>
            <h2 className="text-2xl font-black text-[#0073B9] mb-3">No Open Trade Available</h2>
            <p className="text-gray-400 max-w-md mx-auto">There are no active trading positions at the moment. Your account manager will open new positions when market conditions are favorable.</p>
          </div>
        ) : (
          <>
            {/* Active trade chart */}
            <div className="bg-white rounded-[30px] p-6 md:p-8 shadow-xl border border-gray-100">
              <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-6">
                <div className="flex items-center gap-4">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-lg ${activeTrade.positionType === "LONG" ? "bg-green-500" : "bg-red-500"}`}>
                    {activeTrade.assetTicker[0]}
                  </div>
                  <div>
                    <h2 className="text-xl font-black text-[#0073B9]">{activeTrade.assetTicker}</h2>
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] font-black px-2 py-0.5 rounded ${activeTrade.positionType === "LONG" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>{activeTrade.positionType}</span>
                      <span className="text-xs text-gray-400 font-bold">LIVE</span>
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    </div>
                  </div>
                </div>
                <div className="text-left md:text-right">
                  <p className="text-3xl font-black text-[#0073B9] tabular-nums">${livePrice.toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
                  <p className={`text-sm font-black ${calcProfit(activeTrade) >= 0 ? "text-green-500" : "text-red-500"}`}>
                    {calcProfit(activeTrade) >= 0 ? "+" : "-"}${Math.abs(calcProfit(activeTrade)).toFixed(2)} P&L
                  </p>
                </div>
              </div>

              <div className="flex gap-2 mb-4">
                {["1M", "5M", "15M", "1H", "4H", "1D"].map(tf => (
                  <button key={tf} onClick={() => setTimeframe(tf)}
                    className={`px-3 py-1.5 rounded-lg text-[10px] font-black transition-all ${timeframe === tf ? "bg-[#0073B9] text-white" : "bg-gray-100 text-gray-500 hover:bg-gray-200"}`}>{tf}</button>
                ))}
              </div>

              <div className="w-full bg-[#0a1628] rounded-2xl p-4 overflow-hidden">
                <svg viewBox={`0 0 ${cW} ${cH}`} className="w-full h-64 md:h-80">
                  {[0.2, 0.4, 0.6, 0.8].map((pct, i) => {
                    const y = pad.t + pct * (cH - pad.t - pad.b);
                    return <line key={i} x1={pad.l} y1={y} x2={cW - pad.r} y2={y} stroke="#1e3a5f" strokeWidth="0.5" strokeDasharray="4,4" />;
                  })}
                  {candles.map((c, i) => {
                    const x = pad.l + i * candleW + candleW / 2;
                    const green = c.close >= c.open;
                    const col = green ? "#22c55e" : "#ef4444";
                    const bT = sY(Math.max(c.open, c.close));
                    const bB = sY(Math.min(c.open, c.close));
                    return (
                      <g key={i}>
                        <line x1={x} y1={sY(c.high)} x2={x} y2={sY(c.low)} stroke={col} strokeWidth="1" />
                        <rect x={x - candleW * 0.35} y={bT} width={candleW * 0.7} height={Math.max(bB - bT, 1)} fill={col} rx="1" opacity="0.9" />
                      </g>
                    );
                  })}
                  <line x1={pad.l} y1={sY(livePrice)} x2={cW - pad.r} y2={sY(livePrice)} stroke="#FCD214" strokeWidth="1" strokeDasharray="6,3" />
                  <rect x={cW - pad.r - 60} y={sY(livePrice) - 10} width="55" height="20" rx="4" fill="#FCD214" />
                  <text x={cW - pad.r - 33} y={sY(livePrice) + 4} textAnchor="middle" fill="#0073B9" fontSize="10" fontWeight="bold" fontFamily="monospace">${livePrice.toFixed(2)}</text>
                </svg>
              </div>

              {/* Trade Details Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                {[
                  { label: "Entry Price", value: `$${activeTrade.entryPrice.toFixed(2)}` },
                  { label: "Leverage", value: `${activeTrade.leverage}x` },
                  { label: "Volume", value: `$${activeTrade.amountUsd.toLocaleString()}` },
                  { label: "Time Left", value: formatTime(activeTrade.expiresAt - Date.now()) },
                ].map((s, i) => (
                  <div key={i} className="bg-gray-50 rounded-2xl p-4 border border-gray-100">
                    <p className="text-[9px] font-black text-gray-400 uppercase mb-1">{s.label}</p>
                    <p className="text-sm font-bold text-[#0073B9] tabular-nums">{s.value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Other open trades if multiple */}
            {openTrades.length > 1 && (
              <div className="space-y-3">
                <h3 className="font-black text-lg text-[#0073B9] px-2">Other Active Positions</h3>
                {openTrades.slice(1).map(t => (
                  <div key={t.id} className="bg-white rounded-2xl p-5 shadow-md border border-gray-100 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white font-black text-sm ${t.positionType === "LONG" ? "bg-green-500" : "bg-red-500"}`}>{t.assetTicker[0]}</div>
                      <div>
                        <p className="font-black text-[#0073B9] text-sm">{t.assetTicker}</p>
                        <p className="text-[10px] text-gray-400">{t.positionType} • {formatTime(t.expiresAt - Date.now())}</p>
                      </div>
                    </div>
                    <p className={`font-black tabular-nums ${calcProfit(t) >= 0 ? "text-green-500" : "text-red-500"}`}>
                      {calcProfit(t) >= 0 ? "+" : "-"}${Math.abs(calcProfit(t)).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    );
  }

  // ── CLOSED TRADES LIST ──
  if (view === "closed-trades") {
    return (
      <div className="flex flex-col gap-6 pb-10">
        <button onClick={() => setView("home")} className="flex items-center gap-2 text-[#0073B9] font-bold text-sm hover:gap-3 transition-all w-fit">
          <ArrowLeft className="w-4 h-4" /> Back to Trading Floor
        </button>
        <h1 className="text-2xl font-black text-[#0073B9]">Closed Trades</h1>

        {closedTrades.length === 0 ? (
          <div className="bg-white rounded-[30px] p-16 shadow-xl border border-gray-100 text-center">
            <div className="w-20 h-20 rounded-full bg-gray-50 flex items-center justify-center mx-auto mb-6 border-2 border-gray-100">
              <BarChart3 className="w-8 h-8 text-gray-300" />
            </div>
            <h2 className="text-xl font-black text-[#0073B9] mb-3">No Closed Trades Yet</h2>
            <p className="text-gray-400">Your settled trades will appear here once positions are closed.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {closedTrades.map(t => (
              <div key={t.id} onClick={() => { setSelectedClosedTrade(t); setView("closed-detail"); }}
                className="bg-white rounded-2xl p-5 shadow-lg border-2 border-gray-100 hover:border-[#0073B9]/30 cursor-pointer transition-all hover:-translate-y-0.5 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white font-black ${t.positionType === "LONG" ? "bg-green-500" : "bg-red-500"}`}>{t.assetTicker[0]}</div>
                  <div>
                    <p className="font-black text-[#0073B9]">{t.assetTicker}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className={`text-[10px] font-black px-1.5 py-0.5 rounded ${t.positionType === "LONG" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>{t.positionType}</span>
                      <span className="text-[10px] text-gray-400">{new Date(t.closedAt!).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className={`font-black tabular-nums ${(t.finalProfit || 0) >= 0 ? "text-green-500" : "text-red-500"}`}>
                      {(t.finalProfit || 0) >= 0 ? "+" : "-"}${Math.abs(t.finalProfit || 0).toFixed(2)}
                    </p>
                    <p className="text-[9px] text-gray-400">Profit</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-300" />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  // ── CLOSED TRADE DETAIL ──
  if (view === "closed-detail" && selectedClosedTrade) {
    const t = selectedClosedTrade;
    const detailCandles = generateCandles(40, t.entryPrice);
    const dAllP = detailCandles.flatMap(c => [c.high, c.low]);
    const dMin = Math.min(...dAllP) - 2, dMax = Math.max(...dAllP) + 2, dR = dMax - dMin || 1;
    const dCW = (cW - pad.l - pad.r) / detailCandles.length;
    const dSY = (p: number) => pad.t + ((dMax - p) / dR) * (cH - pad.t - pad.b);

    return (
      <div className="flex flex-col gap-6 pb-10">
        <button onClick={() => { setView("closed-trades"); setSelectedClosedTrade(null); }} className="flex items-center gap-2 text-[#0073B9] font-bold text-sm hover:gap-3 transition-all w-fit">
          <ArrowLeft className="w-4 h-4" /> Back to Closed Trades
        </button>

        <div className="bg-white rounded-[30px] p-6 md:p-8 shadow-xl border border-gray-100">
          <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-6">
            <div className="flex items-center gap-4">
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-lg ${t.positionType === "LONG" ? "bg-green-500" : "bg-red-500"}`}>{t.assetTicker[0]}</div>
              <div>
                <h2 className="text-xl font-black text-[#0073B9]">{t.assetTicker}</h2>
                <div className="flex items-center gap-2">
                  <span className={`text-[10px] font-black px-2 py-0.5 rounded ${t.positionType === "LONG" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>{t.positionType}</span>
                  <span className="text-[10px] font-black px-2 py-0.5 rounded bg-gray-100 text-gray-600">SETTLED</span>
                </div>
              </div>
            </div>
            <div className="text-left md:text-right">
              <p className={`text-3xl font-black tabular-nums ${(t.finalProfit || 0) >= 0 ? "text-green-500" : "text-red-500"}`}>
                {(t.finalProfit || 0) >= 0 ? "+" : "-"}${Math.abs(t.finalProfit || 0).toFixed(2)}
              </p>
              <p className="text-xs text-gray-400 font-bold">Realized Profit</p>
            </div>
          </div>

          {/* Chart */}
          <div className="w-full bg-[#0a1628] rounded-2xl p-4 overflow-hidden">
            <svg viewBox={`0 0 ${cW} ${cH}`} className="w-full h-64 md:h-72">
              {detailCandles.map((c, i) => {
                const x = pad.l + i * dCW + dCW / 2;
                const green = c.close >= c.open;
                const col = green ? "#22c55e" : "#ef4444";
                const bT = dSY(Math.max(c.open, c.close));
                const bB = dSY(Math.min(c.open, c.close));
                return (
                  <g key={i}>
                    <line x1={x} y1={dSY(c.high)} x2={x} y2={dSY(c.low)} stroke={col} strokeWidth="1" />
                    <rect x={x - dCW * 0.35} y={bT} width={dCW * 0.7} height={Math.max(bB - bT, 1)} fill={col} rx="1" opacity="0.9" />
                  </g>
                );
              })}
              <line x1={pad.l} y1={dSY(t.entryPrice)} x2={cW - pad.r} y2={dSY(t.entryPrice)} stroke="#FCD214" strokeWidth="1" strokeDasharray="6,3" />
            </svg>
          </div>

          {/* Detail Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            {[
              { label: "Entry Price", value: `$${t.entryPrice.toFixed(2)}` },
              { label: "Leverage", value: `${t.leverage}x` },
              { label: "Volume", value: `$${t.amountUsd.toLocaleString()}` },
              { label: "Closed", value: new Date(t.closedAt!).toLocaleDateString() },
            ].map((s, i) => (
              <div key={i} className="bg-gray-50 rounded-2xl p-4 border border-gray-100">
                <p className="text-[9px] font-black text-gray-400 uppercase mb-1">{s.label}</p>
                <p className="text-sm font-bold text-[#0073B9] tabular-nums">{s.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return null;
}

