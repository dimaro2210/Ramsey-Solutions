import { useState, useEffect, useCallback, useMemo } from "react";
import { TrendingUp, Wallet, ArrowDownToLine, ArrowUpFromLine, History, ChevronRight, ArrowUpRight, Play, Clock, ArrowDown, ArrowUp, Activity, DollarSign, Bell, BarChart3, Newspaper } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { fetchLiveStocks, generateChartData, fetchMarketNews, type Asset, type NewsItem } from "@/data/marketData";
import { Link } from "react-router-dom";
import { db, Trade, PendingDeposit, PendingWithdrawal, Notification, User } from "@/lib/db";

function timeAgo(ts: number): string {
  const diff = Date.now() - ts;
  const seconds = Math.floor(diff / 1000);
  if (seconds < 60) return 'Just now';
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} min ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hr ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

export default function Overview() {
  const { user: authUser } = useAuth();
  const [user, setUser] = useState<User | null>(null);
  const [stocks, setStocks] = useState<Asset[]>([]);
  const [trades, setTrades] = useState<Trade[]>([]);
  const [deposits, setDeposits] = useState<PendingDeposit[]>([]);
  const [withdrawals, setWithdrawals] = useState<PendingWithdrawal[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [chartData] = useState(() => generateChartData(24));
  const [activeMonth, setActiveMonth] = useState("Apr");

  const loadAllData = useCallback(async () => {
    if (!authUser?.id) return;
    const [dbUser, dbTrades, dbDeposits, dbWithdrawals, dbNotifs] = await Promise.all([
      db.getUser(authUser.id),
      db.getTrades(authUser.id),
      db.getPendingDeposits(authUser.id),
      db.getPendingWithdrawals(authUser.id),
      db.getNotifications(authUser.id)
    ]);
    if (dbUser) setUser(dbUser);
    setTrades(dbTrades);
    setDeposits(dbDeposits);
    setWithdrawals(dbWithdrawals);
    setNotifications(dbNotifs);
  }, [authUser?.id]);

  const fetchData = useCallback(async () => {
    const [liveStocks, marketNews] = await Promise.all([
      fetchLiveStocks(),
      fetchMarketNews()
    ]);
    setStocks(liveStocks);
    setNews(marketNews);
    setLoading(false);
  }, []);

  useEffect(() => {
    if (authUser?.id) {
      loadAllData();
      fetchData();
      db.autoCloseExpiredTrades();
      const interval = setInterval(() => { fetchData(); db.autoCloseExpiredTrades(); }, 10000);
      window.addEventListener('db_updated', loadAllData);
      return () => { clearInterval(interval); window.removeEventListener('db_updated', loadAllData); };
    }
  }, [fetchData, loadAllData, authUser?.id]);

  const openTrades = trades.filter(t => t.status === 'open');
  const closedTrades = trades.filter(t => t.status === 'closed');
  const totalEarned = closedTrades.reduce((s, t) => s + (t.finalProfit || 0), 0);
  const totalBalance = user?.balance || 0;
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct"];

  // Chart path
  const chartPath = (() => {
    const pts = chartData.map((d, i) => {
      const x = (i / (chartData.length - 1)) * 460 + 20;
      const minVal = Math.min(...chartData.map(c => c.value));
      const maxVal = Math.max(...chartData.map(c => c.value));
      const y = 140 - ((d.value - minVal) / (maxVal - minVal)) * 100 + 20;
      return `${x},${y}`;
    });
    return `M${pts.join(" L")}`;
  })();
  const chartFillPath = chartPath + " L480,160 L20,160 Z";

  // Recent trades
  const recentTrades = [...trades].sort((a, b) => b.placedAt - a.placedAt).slice(0, 5);

  // Market Movers Marquee stocks
  const marqueeStocks = [...stocks, ...stocks];
  // Recent Activities — aggregate trades, deposits, and notifications
  const recentActivities = useMemo(() => {
    const items: { id: string; icon: 'trade' | 'deposit' | 'withdraw' | 'notification'; color: string; title: string; description: string; timestamp: number }[] = [];

    trades.slice(0, 5).forEach(t => {
      items.push({
        id: `trade-${t.id}`,
        icon: 'trade',
        color: t.positionType === 'LONG' ? 'bg-blue-500' : 'bg-orange-500',
        title: t.status === 'closed' ? `Closed ${t.assetTicker} Trade` : `Opened ${t.positionType} on ${t.assetTicker}`,
        description: t.status === 'closed'
          ? `${(t.finalProfit || 0) >= 0 ? 'Profit' : 'Loss'}: $${Math.abs(t.finalProfit || 0).toFixed(2)}`
          : `$${t.amountUsd.toLocaleString()} • ${t.strategy}`,
        timestamp: t.closedAt || t.placedAt,
      });
    });

    deposits.slice(0, 3).forEach(d => {
      items.push({
        id: `dep-${d.id}`,
        icon: 'deposit',
        color: d.status === 'approved' ? 'bg-green-500' : d.status === 'rejected' ? 'bg-red-500' : 'bg-yellow-500',
        title: `Deposit ${d.status === 'approved' ? 'Approved' : d.status === 'rejected' ? 'Rejected' : 'Pending'}`,
        description: `$${d.amount.toLocaleString()} via ${d.asset}`,
        timestamp: d.createdAt,
      });
    });

    withdrawals.slice(0, 3).forEach(w => {
      items.push({
        id: `wth-${w.id}`,
        icon: 'withdraw',
        color: w.status === 'approved' ? 'bg-green-500' : w.status === 'rejected' ? 'bg-red-500' : 'bg-yellow-500',
        title: `Withdrawal ${w.status === 'approved' ? 'Approved' : w.status === 'rejected' ? 'Rejected' : 'Pending'}`,
        description: `$${w.amount.toLocaleString()} to ${w.network}`,
        timestamp: w.createdAt,
      });
    });

    notifications.slice(0, 3).forEach(n => {
      items.push({
        id: `notif-${n.id}`,
        icon: 'notification',
        color: n.type === 'success' ? 'bg-emerald-500' : n.type === 'warning' ? 'bg-amber-500' : 'bg-sky-500',
        title: n.title,
        description: n.message.length > 60 ? n.message.slice(0, 57) + '...' : n.message,
        timestamp: n.createdAt,
      });
    });

    return items.sort((a, b) => b.timestamp - a.timestamp).slice(0, 6);
  }, [trades, deposits, withdrawals, notifications]);

  return (
    <div className="flex flex-col gap-8 w-full pb-10">
      
      {/* Row 1: Overview Chart + Action Cards */}
      <div className="flex flex-col lg:flex-row gap-6">
        
        {/* Overview Card */}
        <div className="flex-[2] bg-[#0073B9] rounded-[30px] p-8 text-white relative overflow-hidden shadow-xl flex flex-col min-h-[360px]">
          <div className="flex items-center justify-between mb-2 relative z-10">
            <h2 className="text-lg font-bold text-white/90">Overview</h2>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur px-3 py-1.5 rounded-xl border border-white/10 text-xs font-medium">
              Monthly
              <ChevronRight className="w-3 h-3 rotate-90" />
            </div>
          </div>
          <div className="flex items-center gap-3 mb-1 relative z-10">
            <div className="w-3 h-3 rounded-full bg-[#FCD214] border-2 border-white/50"></div>
            <span className="text-3xl font-black tabular-nums">${totalBalance.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
          </div>
          <p className="text-[10px] text-white/50 font-bold uppercase tracking-wider mb-4 relative z-10 ml-6">Total Balance</p>
          <div className="flex-1 relative z-0 -mx-2">
            <svg viewBox="0 0 500 170" className="w-full h-full" preserveAspectRatio="none">
              <defs>
                <linearGradient id="overviewGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#FCD214" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#FCD214" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path d={chartFillPath} fill="url(#overviewGrad)" />
              <path d={chartPath} fill="none" stroke="#FCD214" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div className="flex justify-between mt-2 relative z-10">
            {months.map((m) => (
              <button key={m} onClick={() => setActiveMonth(m)}
                className={`text-[10px] font-bold px-2 py-1 rounded-lg transition-all ${activeMonth === m ? "bg-[#FCD214] text-[#0073B9]" : "text-white/40 hover:text-white/80"}`}>
                {m}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-4 mt-6 bg-white/10 backdrop-blur-xl rounded-2xl p-5 border border-white/10 relative z-10">
            <div>
              <p className="text-[9px] text-white/50 font-bold uppercase tracking-wider">Active Positions</p>
              <p className="text-lg font-black text-white mt-0.5">{openTrades.length}</p>
              <p className="text-[9px] text-white/40 font-medium">Currently Open</p>
            </div>
            <div>
              <p className="text-[9px] text-white/50 font-bold uppercase tracking-wider">Total Trades</p>
              <p className="text-lg font-black text-[#FCD214] mt-0.5">{trades.length}</p>
              <p className="text-[9px] text-white/40 font-medium">All Time</p>
            </div>
          </div>
        </div>

        {/* Right Colored Cards */}
        <div className="flex-1 flex flex-col gap-6 min-w-[260px]">
          <Link to="/dashboard/live-trading" className="flex-1 bg-gradient-to-br from-[#0073B9] to-[#005a94] rounded-[30px] p-6 text-white flex flex-col justify-between relative overflow-hidden group cursor-pointer hover:scale-[1.02] transition-transform shadow-xl">
            <div className="flex items-center justify-between z-10">
              <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center backdrop-blur-sm border border-white/10">
                <ArrowUpRight className="w-6 h-6 text-white" />
              </div>
              <div className="text-right">
                <p className="text-white/60 text-[10px] font-bold uppercase">Market Engine</p>
                <p className="text-xs font-black text-green-400">Live Trading</p>
              </div>
            </div>
            <div className="z-10 mt-4">
              <h3 className="font-black text-2xl text-white">Stock Markets</h3>
              <p className="text-[10px] text-white/60 font-medium">Trade global stocks instantly</p>
            </div>
            <div className="absolute -right-8 -top-8 w-40 h-40 bg-white/5 rounded-full"></div>
          </Link>
          
          <div className="flex-1 bg-gradient-to-br from-[#0073B9] to-[#002040] rounded-[30px] p-6 text-white flex flex-col justify-between relative overflow-hidden group cursor-pointer hover:scale-[1.02] transition-transform shadow-xl">
            <div className="flex items-center justify-between z-10">
              <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center backdrop-blur-sm border border-white/10">
                <BarChart3 className="w-6 h-6 text-[#FCD214]" />
              </div>
              <div className="px-3 py-1 bg-[#FCD214]/10 rounded-lg text-[10px] font-bold text-[#FCD214] border border-[#FCD214]/20">PROFITS</div>
            </div>
            <div className="z-10 mt-4">
              <p className="text-white/60 text-[10px] font-bold uppercase">Trade Profits</p>
              <h3 className={`font-black text-3xl mt-1 ${totalEarned >= 0 ? 'text-white' : 'text-red-400'}`}>
                {totalEarned >= 0 ? '+' : '-'}${Math.abs(totalEarned).toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </h3>
              <p className="text-[10px] text-white/40 font-medium">From settled trades</p>
            </div>
            {/* Play button removed */}
            <div className="absolute -right-8 -bottom-8 w-40 h-40 bg-white/5 rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Row 2: Market Movers — Marquee Loop */}
      <div className="w-full">
        {/* Added py-4 to give shadows enough room before getting clipped */}
        <div className="relative w-full overflow-hidden hide-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0 py-4">
          <div className="flex w-max animate-marquee gap-6">
            {marqueeStocks.map((stock, i) => {
              const isPositive = stock.change >= 0;
              return (
                <Link key={i} to="/dashboard/live-trading"
                  className="bg-white rounded-[24px] p-6 pt-12 shadow-lg border border-gray-100 flex flex-col items-center text-center group hover:-translate-y-1 hover:shadow-xl transition-all cursor-pointer relative mt-8 w-[240px] flex-shrink-0">
                  {/* Decorative background circle */}
                  <div className="absolute top-0 right-0 w-32 h-32 rounded-bl-[100px] rounded-tr-[24px] bg-gradient-to-br from-[#0073B9]/5 to-[#0073B9]/5" />
                  
                  {/* Centered Logo at Top Edge (Clean single layer) */}
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-16 h-16 rounded-2xl bg-white flex items-center justify-center overflow-hidden border border-gray-100 shadow-sm group-hover:scale-110 transition-transform z-20">
                    {stock.icon && stock.icon.startsWith('http') ? (
                      <img src={stock.icon} alt={stock.symbol} className="w-10 h-10 object-contain" />
                    ) : (
                      <span className="font-black text-[#0073B9] text-xl">{stock.symbol[0]}</span>
                    )}
                  </div>

                  {/* Ticker & Name */}
                  <h4 className="font-black text-[#0073B9] text-lg tracking-wide relative z-10">{stock.symbol}</h4>
                  <p className="text-[11px] text-gray-400 font-medium mb-4 relative z-10">{stock.name}</p>

                  {/* Price */}
                  <p className="text-2xl font-black text-[#0073B9] tabular-nums mb-1 relative z-10">
                    ${stock.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </p>

                  {/* Change Badge */}
                  <div className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold mb-2 relative z-10 ${isPositive ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-500'}`}>
                    {isPositive ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
                    {isPositive ? '+' : ''}{stock.changePercent.toFixed(2)}%
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* Row 3: Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {[
          { title: "Account Funding", color: "text-green-600 bg-green-50", to: "/dashboard/deposit", icon: <ArrowDownToLine className="w-5 h-5"/> },
          { title: "Withdraw Funds", color: "text-[#0073B9] bg-[#0073B9]/10", to: "/dashboard/withdraw", icon: <ArrowUpFromLine className="w-5 h-5"/> },
          { title: "Order History", color: "text-[#0073B9] bg-[#0073B9]/10", to: "/dashboard/history", icon: <History className="w-5 h-5"/> }
        ].map((action, i) => (
          <Link key={i} to={action.to} className="flex items-center gap-4 p-4 bg-white rounded-[20px] border border-gray-100 hover:border-gray-200 hover:shadow-sm transition-all group">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${action.color} group-hover:scale-105 transition-transform`}>
              {action.icon}
            </div>
            <div>
              <h4 className="font-bold text-[#0073B9] text-sm group-hover:text-blue-600 transition-colors">{action.title}</h4>
            </div>
          </Link>
        ))}
      </div>

      {/* Row 4: Recent Activities + Recent Trades side by side */}
      <div className="flex flex-col lg:flex-row gap-6">

        {/* Recent Activities */}
        <div className="flex-1 bg-white rounded-[24px] p-8 shadow-sm border border-gray-100/80">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gray-50 flex items-center justify-center border border-gray-100">
                <Activity className="w-5 h-5 text-[#0073B9]" />
              </div>
              <div>
                <h3 className="font-black text-[#0073B9] text-lg">Recent Activities</h3>
                <p className="text-[11px] text-gray-400 font-medium">Your latest transactions & alerts</p>
              </div>
            </div>
            <Link to="/dashboard/notifications" className="text-xs text-[#0073B9] font-bold bg-[#0073B9]/5 hover:bg-[#0073B9]/10 px-4 py-2 rounded-xl transition-colors">View All</Link>
          </div>
          <div className="space-y-4">
            {recentActivities.length === 0 ? (
              <div className="text-center py-10">
                <Activity className="w-8 h-8 text-gray-200 mx-auto mb-2" />
                <p className="text-sm text-gray-400">No recent activity</p>
              </div>
            ) : (
              recentActivities.map((a, idx) => {
                const styleMap: Record<string, { bg: string, border: string, color: string }> = {
                  'bg-green-500': { bg: 'bg-green-50', border: 'border-green-100', color: 'text-green-600' },
                  'bg-blue-500': { bg: 'bg-blue-50', border: 'border-blue-100', color: 'text-blue-600' },
                  'bg-orange-500': { bg: 'bg-orange-50', border: 'border-orange-100', color: 'text-orange-600' },
                  'bg-teal-500': { bg: 'bg-teal-50', border: 'border-teal-100', color: 'text-teal-600' },
                  'bg-sky-500': { bg: 'bg-sky-50', border: 'border-sky-100', color: 'text-sky-600' },
                };
                const style = styleMap[a.color] || { bg: 'bg-gray-50', border: 'border-gray-100', color: 'text-gray-600' };

                return (
                  <div key={a.id} className="relative pl-6">
                    {/* Timeline vertical line */}
                    {idx !== recentActivities.length - 1 && (
                      <div className="absolute left-1.5 top-8 bottom-[-16px] w-[2px] bg-gray-100 rounded-full" />
                    )}
                    {/* Timeline dot */}
                    <div className="absolute left-0 top-3 w-3.5 h-3.5 rounded-full border-[3px] border-white shadow-sm z-10" style={{ backgroundColor: a.color.includes('green') ? '#22c55e' : a.color.includes('blue') ? '#3b82f6' : a.color.includes('orange') ? '#f97316' : a.color.includes('teal') ? '#14b8a6' : a.color.includes('sky') ? '#0ea5e9' : '#0073B9' }} />

                    <div className="flex items-center gap-4 p-4 rounded-2xl hover:bg-gray-50/80 transition-colors border border-transparent hover:border-gray-100">
                      <div className={`w-11 h-11 rounded-xl ${style.bg} ${style.border} border flex-shrink-0 flex items-center justify-center`}>
                        {a.icon === 'trade' && <BarChart3 className={`w-5 h-5 ${style.color}`} />}
                        {a.icon === 'deposit' && <DollarSign className={`w-5 h-5 ${style.color}`} />}
                        {a.icon === 'withdraw' && <ArrowUpFromLine className={`w-5 h-5 ${style.color}`} />}
                        {a.icon === 'notification' && <Bell className={`w-5 h-5 ${style.color}`} />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-black text-[#0073B9] truncate mb-0.5">{a.title}</p>
                        <p className="text-xs text-gray-500 font-medium truncate">{a.description}</p>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <span className="text-[10px] font-bold text-[#0073B9] bg-[#0073B9]/5 px-3 py-1.5 rounded-lg inline-block">{timeAgo(a.timestamp)}</span>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>

      {/* Row 5: Mobile Only Headlines & Market Feed */}
      <div className="xl:hidden flex flex-col gap-6 mt-6">
        
        {/* Latest Headlines */}
        <div className="bg-white rounded-[24px] p-6 shadow-sm border border-gray-100/80">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-black text-[#0073B9] flex items-center gap-2">
               <Newspaper className="w-4 h-4 text-[#0073B9]" />
               Latest Headlines
            </h3>
            <button className="text-[10px] font-bold text-[#0073B9] hover:underline">More</button>
          </div>
          <div className="space-y-4">
            {news.slice(0, 3).map((n) => (
              <a 
                key={n.id} 
                href={n.url} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="block group cursor-pointer border-b border-gray-50 last:border-0 pb-3 last:pb-0"
              >
                <p className="text-xs font-bold text-[#0073B9] leading-snug group-hover:text-blue-600 transition-colors">{n.title}</p>
                <p className="text-[10px] text-gray-400 font-medium mt-1">{timeAgo(n.timestamp)}</p>
              </a>
            ))}
            {news.length === 0 && (
              <div className="animate-pulse space-y-4">
                {[1, 2, 3].map(i => (
                  <div key={i} className="h-10 bg-gray-50 rounded-lg w-full" />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Market Feed */}
        <div className="bg-white rounded-[24px] p-6 shadow-sm border border-gray-100/80">
          <div className="flex items-center justify-between mb-5">
             <h2 className="text-sm font-black text-[#0073B9] flex items-center gap-2">
                <Activity className="w-4 h-4 text-[#0073B9]" />
                Market Feed
             </h2>
             <Link to="/dashboard/live-trading" className="text-[10px] font-bold text-[#0073B9] hover:underline">View All</Link>
          </div>
          <div className="space-y-1">
            {stocks.slice(0, 5).map((asset) => (
               <div key={asset.symbol} className="flex items-center gap-3 py-3 border-b border-gray-50 last:border-0">
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden flex-shrink-0 border-2 border-white shadow-sm">
                    {asset.icon && asset.icon.startsWith('http') ? (
                      <img src={asset.icon} alt={asset.symbol} className="w-6 h-6 object-contain" />
                    ) : (
                      <span className="font-black text-[#0073B9] text-xs">{asset.symbol[0]}</span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-[#0073B9] truncate">{asset.name}</p>
                    <p className="text-[9px] text-gray-400 font-medium">
                      {asset.change >= 0 ? "Price Rising" : "Price Falling"}
                    </p>
                  </div>
                  <div className={`text-[10px] font-black px-2 py-1 rounded-lg ${asset.change >= 0 ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                    {asset.change >= 0 ? '+' : ''}{asset.changePercent.toFixed(1)}%
                  </div>
               </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}

