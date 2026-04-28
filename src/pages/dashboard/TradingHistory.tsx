import { useState, useEffect } from "react";
import { History, ArrowUpRight, ArrowDownRight, Filter } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { db, Trade } from "@/lib/db";

export default function TradingHistory() {
  const { user: authUser } = useAuth();
  const [trades, setTrades] = useState<Trade[]>([]);
  const [filter, setFilter] = useState<"all" | "open" | "closed">("all");

  useEffect(() => {
    const loadData = async () => {
      if (authUser?.id) {
        const userTrades = await db.getTrades(authUser.id);
        setTrades(userTrades);
      }
    };
    loadData();
    window.addEventListener("db_updated", loadData);
    return () => window.removeEventListener("db_updated", loadData);
  }, [authUser?.id]);

  const filtered = trades.filter((t) => {
    if (filter !== "all" && t.status !== filter) return false;
    return true;
  });

  const totalVolume = trades.reduce((sum, t) => sum + t.amountUsd * t.leverage, 0);
  const totalEarned = trades.filter(t => t.status === "closed").reduce((sum, t) => sum + (t.finalProfit || 0), 0);

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold flex items-center gap-3 text-[#0073B9]">
          <History className="w-7 h-7 text-[#0073B9]" />
          Trading History
        </h1>
        <p className="text-gray-500 text-sm mt-1">
          View all your past and active transactions
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
          <p className="text-gray-500 text-sm">Total Trades</p>
          <p className="text-xl font-bold font-mono mt-1 text-[#0073B9]">{trades.length}</p>
        </div>
        <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
          <p className="text-gray-500 text-sm">Total Earned</p>
          <p className={`text-xl font-bold font-mono mt-1 ${totalEarned >= 0 ? 'text-green-600' : 'text-red-500'}`}>
            {totalEarned >= 0 ? "+" : "-"}${Math.abs(totalEarned).toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
        <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-500">Filters:</span>
          </div>
          <div className="flex gap-2 flex-wrap">
            {(["all", "open", "closed"] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors capitalize ${
                  filter === f
                    ? "bg-[#0073B9] text-white"
                    : "text-gray-400 hover:text-[#0073B9] bg-gray-50"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-gray-400 border-b border-gray-100 bg-gray-50/50">
                <th className="text-left px-5 py-3 font-medium">Date Placed</th>
                <th className="text-left px-5 py-3 font-medium">Trade ID</th>
                <th className="text-left px-5 py-3 font-medium">Position</th>
                <th className="text-left px-5 py-3 font-medium">Asset</th>
                <th className="text-right px-5 py-3 font-medium">Entry Price</th>
                <th className="text-right px-5 py-3 font-medium">Volume (Lev.)</th>
                <th className="text-right px-5 py-3 font-medium">Earned Profit</th>
                <th className="text-center px-5 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.sort((a, b) => b.placedAt - a.placedAt).map((trade) => (
                <tr
                  key={trade.id}
                  className="hover:bg-blue-50/30 transition-colors"
                >
                  <td className="px-5 py-3.5 text-gray-500 whitespace-nowrap">
                    {new Date(trade.placedAt).toLocaleString()}
                  </td>
                  <td className="px-5 py-3.5 font-mono text-xs text-gray-400">
                    {trade.id}
                  </td>
                  <td className="px-5 py-3.5">
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium ${
                        trade.positionType === "LONG"
                          ? "bg-green-50 text-green-600"
                          : "bg-red-50 text-red-500"
                      }`}
                    >
                      {trade.positionType === "LONG" ? (
                        <ArrowUpRight className="w-3 h-3" />
                      ) : (
                        <ArrowDownRight className="w-3 h-3" />
                      )}
                      {trade.positionType}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className="font-bold text-[#0073B9]">{trade.assetTicker}</span>
                  </td>
                  <td className="px-5 py-3.5 text-right font-mono text-[#0073B9]">
                    ${trade.entryPrice.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </td>
                  <td className="px-5 py-3.5 text-right font-mono text-[#0073B9]">
                    ${trade.amountUsd.toLocaleString()} <span className="text-gray-400 text-xs">({trade.leverage}x)</span>
                  </td>
                  <td className="px-5 py-3.5 text-right font-mono font-medium">
                    {trade.status === 'closed' ? (
                      <span className={trade.finalProfit! >= 0 ? "text-green-600" : "text-red-500"}>
                        {trade.finalProfit! >= 0 ? "+" : "-"}${Math.abs(trade.finalProfit!).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                      </span>
                    ) : (
                      <span className="text-gray-400 italic">Unrealized</span>
                    )}
                  </td>
                  <td className="px-5 py-3.5 text-center">
                    <span
                      className={`text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full ${
                        trade.status === "closed"
                          ? "bg-gray-100 text-gray-600"
                          : "bg-[#0073B9]/10 text-[#0073B9] border border-[#0073B9]/20"
                      }`}
                    >
                      {trade.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filtered.length === 0 && (
          <div className="py-12 text-center text-gray-400">
            No trades found.
          </div>
        )}
      </div>
    </div>
  );
}

