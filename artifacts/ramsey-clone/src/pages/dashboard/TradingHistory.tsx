import { useState } from "react";
import { History, ArrowUpRight, ArrowDownRight, Filter } from "lucide-react";
import { MOCK_TRADES, type Trade } from "@/data/marketData";

export default function TradingHistory() {
  const [filter, setFilter] = useState<"all" | "buy" | "sell">("all");
  const [typeFilter, setTypeFilter] = useState<"all" | "crypto" | "stock">("all");

  const filtered = MOCK_TRADES.filter((t) => {
    if (filter !== "all" && t.type !== filter) return false;
    if (typeFilter !== "all" && t.assetType !== typeFilter) return false;
    return true;
  });

  const totalVolume = MOCK_TRADES.reduce((sum, t) => sum + t.total, 0);
  const buyVolume = MOCK_TRADES.filter((t) => t.type === "buy").reduce((s, t) => s + t.total, 0);
  const sellVolume = MOCK_TRADES.filter((t) => t.type === "sell").reduce((s, t) => s + t.total, 0);

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold flex items-center gap-3">
          <History className="w-7 h-7 text-[#0073B9]" />
          Trading History
        </h1>
        <p className="text-white/50 text-sm mt-1">
          View all your past transactions
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-[#111827] rounded-2xl border border-white/5 p-5">
          <p className="text-white/50 text-sm">Total Volume</p>
          <p className="text-xl font-bold font-mono mt-1">
            ${totalVolume.toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </p>
        </div>
        <div className="bg-[#111827] rounded-2xl border border-white/5 p-5">
          <p className="text-white/50 text-sm">Buy Volume</p>
          <p className="text-xl font-bold font-mono mt-1 text-green-400">
            ${buyVolume.toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </p>
        </div>
        <div className="bg-[#111827] rounded-2xl border border-white/5 p-5">
          <p className="text-white/50 text-sm">Sell Volume</p>
          <p className="text-xl font-bold font-mono mt-1 text-red-400">
            ${sellVolume.toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </p>
        </div>
      </div>

      <div className="bg-[#111827] rounded-2xl border border-white/5 overflow-hidden">
        <div className="p-4 border-b border-white/5 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-white/40" />
            <span className="text-sm text-white/50">Filters:</span>
          </div>
          <div className="flex gap-2 flex-wrap">
            {(["all", "buy", "sell"] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors capitalize ${
                  filter === f
                    ? "bg-[#0073B9] text-white"
                    : "text-white/40 hover:text-white bg-white/5"
                }`}
              >
                {f}
              </button>
            ))}
            <div className="w-px bg-white/10 mx-1" />
            {(["all", "crypto", "stock"] as const).map((f) => (
              <button
                key={f}
                onClick={() => setTypeFilter(f)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors capitalize ${
                  typeFilter === f
                    ? "bg-[#0073B9] text-white"
                    : "text-white/40 hover:text-white bg-white/5"
                }`}
              >
                {f === "all" ? "All Types" : f}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-white/40 border-b border-white/5">
                <th className="text-left px-5 py-3 font-medium">Date</th>
                <th className="text-left px-5 py-3 font-medium">ID</th>
                <th className="text-left px-5 py-3 font-medium">Type</th>
                <th className="text-left px-5 py-3 font-medium">Asset</th>
                <th className="text-right px-5 py-3 font-medium">Qty</th>
                <th className="text-right px-5 py-3 font-medium">Price</th>
                <th className="text-right px-5 py-3 font-medium">Total</th>
                <th className="text-center px-5 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filtered.map((trade) => (
                <tr
                  key={trade.id}
                  className="hover:bg-white/[0.02] transition-colors"
                >
                  <td className="px-5 py-3.5 text-white/60 whitespace-nowrap">
                    {trade.date}
                  </td>
                  <td className="px-5 py-3.5 font-mono text-xs text-white/40">
                    {trade.id}
                  </td>
                  <td className="px-5 py-3.5">
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium ${
                        trade.type === "buy"
                          ? "bg-green-500/10 text-green-400"
                          : "bg-red-500/10 text-red-400"
                      }`}
                    >
                      {trade.type === "buy" ? (
                        <ArrowDownRight className="w-3 h-3" />
                      ) : (
                        <ArrowUpRight className="w-3 h-3" />
                      )}
                      {trade.type.toUpperCase()}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{trade.asset}</span>
                      <span
                        className={`text-[10px] px-1.5 py-0.5 rounded ${
                          trade.assetType === "crypto"
                            ? "bg-purple-500/10 text-purple-400"
                            : "bg-blue-500/10 text-blue-400"
                        }`}
                      >
                        {trade.assetType}
                      </span>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 text-right font-mono">
                    {trade.quantity}
                  </td>
                  <td className="px-5 py-3.5 text-right font-mono">
                    ${trade.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </td>
                  <td className="px-5 py-3.5 text-right font-mono font-medium">
                    ${trade.total.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </td>
                  <td className="px-5 py-3.5 text-center">
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        trade.status === "completed"
                          ? "bg-green-500/10 text-green-400"
                          : trade.status === "pending"
                            ? "bg-yellow-500/10 text-yellow-400"
                            : "bg-red-500/10 text-red-400"
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
          <div className="py-12 text-center text-white/30">
            No trades match your filters
          </div>
        )}
      </div>
    </div>
  );
}
