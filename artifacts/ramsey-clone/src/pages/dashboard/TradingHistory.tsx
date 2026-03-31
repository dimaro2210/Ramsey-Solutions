import { useState } from "react";
import { History, ArrowUpRight, ArrowDownRight, Filter } from "lucide-react";
import { MOCK_TRADES } from "@/data/marketData";

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
        <h1 className="text-2xl font-bold flex items-center gap-3 text-[#003561]">
          <History className="w-7 h-7 text-[#0073B9]" />
          Trading History
        </h1>
        <p className="text-gray-500 text-sm mt-1">
          View all your past transactions
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
          <p className="text-gray-500 text-sm">Total Volume</p>
          <p className="text-xl font-bold font-mono mt-1 text-[#003561]">
            ${totalVolume.toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </p>
        </div>
        <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
          <p className="text-gray-500 text-sm">Buy Volume</p>
          <p className="text-xl font-bold font-mono mt-1 text-green-600">
            ${buyVolume.toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </p>
        </div>
        <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
          <p className="text-gray-500 text-sm">Sell Volume</p>
          <p className="text-xl font-bold font-mono mt-1 text-red-500">
            ${sellVolume.toLocaleString(undefined, { minimumFractionDigits: 2 })}
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
            {(["all", "buy", "sell"] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors capitalize ${
                  filter === f
                    ? "bg-[#0073B9] text-white"
                    : "text-gray-400 hover:text-[#003561] bg-gray-50"
                }`}
              >
                {f}
              </button>
            ))}
            <div className="w-px bg-gray-200 mx-1" />
            {(["all", "crypto", "stock"] as const).map((f) => (
              <button
                key={f}
                onClick={() => setTypeFilter(f)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors capitalize ${
                  typeFilter === f
                    ? "bg-[#0073B9] text-white"
                    : "text-gray-400 hover:text-[#003561] bg-gray-50"
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
              <tr className="text-gray-400 border-b border-gray-100">
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
            <tbody className="divide-y divide-gray-50">
              {filtered.map((trade) => (
                <tr
                  key={trade.id}
                  className="hover:bg-blue-50/30 transition-colors"
                >
                  <td className="px-5 py-3.5 text-gray-500 whitespace-nowrap">
                    {trade.date}
                  </td>
                  <td className="px-5 py-3.5 font-mono text-xs text-gray-400">
                    {trade.id}
                  </td>
                  <td className="px-5 py-3.5">
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium ${
                        trade.type === "buy"
                          ? "bg-green-50 text-green-600"
                          : "bg-red-50 text-red-500"
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
                      <span className="font-medium text-[#003561]">{trade.asset}</span>
                      <span
                        className={`text-[10px] px-1.5 py-0.5 rounded ${
                          trade.assetType === "crypto"
                            ? "bg-purple-50 text-purple-600"
                            : "bg-blue-50 text-blue-600"
                        }`}
                      >
                        {trade.assetType}
                      </span>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 text-right font-mono text-[#003561]">
                    {trade.quantity}
                  </td>
                  <td className="px-5 py-3.5 text-right font-mono text-[#003561]">
                    ${trade.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </td>
                  <td className="px-5 py-3.5 text-right font-mono font-medium text-[#003561]">
                    ${trade.total.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </td>
                  <td className="px-5 py-3.5 text-center">
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        trade.status === "completed"
                          ? "bg-green-50 text-green-600"
                          : trade.status === "pending"
                            ? "bg-yellow-50 text-yellow-600"
                            : "bg-red-50 text-red-500"
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
            No trades match your filters
          </div>
        )}
      </div>
    </div>
  );
}
