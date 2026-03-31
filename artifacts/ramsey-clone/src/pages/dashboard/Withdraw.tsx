import { useState } from "react";
import { ArrowUpFromLine, Building2, Wallet, CheckCircle2 } from "lucide-react";

const methods = [
  { id: "bank", label: "Bank Transfer", icon: Building2, desc: "2-5 business days", fee: "Free" },
  { id: "crypto", label: "Crypto Wallet", icon: Wallet, desc: "Network dependent", fee: "Network fee" },
];

export default function Withdraw() {
  const [method, setMethod] = useState("bank");
  const [amount, setAmount] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const availableBalance = 12450.0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseFloat(amount);
    if (!val || val <= 0 || val > availableBalance) return;
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="max-w-lg mx-auto mt-16 text-center">
        <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-10 h-10 text-green-400" />
        </div>
        <h2 className="text-2xl font-bold mb-2">Withdrawal Submitted</h2>
        <p className="text-white/50 mb-2">
          Your withdrawal of <span className="text-white font-semibold">${parseFloat(amount).toLocaleString()}</span> via{" "}
          {methods.find((m) => m.id === method)?.label} is being processed.
        </p>
        <p className="text-white/30 text-sm mb-8">
          Funds will arrive in your account within the estimated timeframe.
        </p>
        <button
          onClick={() => { setSubmitted(false); setAmount(""); }}
          className="px-6 py-3 bg-[#0073B9] hover:bg-[#005a94] rounded-xl font-medium transition-colors"
        >
          Make Another Withdrawal
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold flex items-center gap-3">
          <ArrowUpFromLine className="w-7 h-7 text-orange-400" />
          Withdraw Funds
        </h1>
        <p className="text-white/50 text-sm mt-1">
          Transfer funds from your trading account
        </p>
      </div>

      <div className="bg-[#111827] rounded-2xl border border-white/5 p-5 mb-6 flex items-center justify-between">
        <div>
          <p className="text-white/50 text-sm">Available Balance</p>
          <p className="text-2xl font-bold font-mono text-green-400">
            ${availableBalance.toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-[#111827] rounded-2xl border border-white/5 p-6">
          <label className="block text-sm font-medium text-white/70 mb-3">
            Withdrawal Method
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {methods.map((m) => (
              <button
                key={m.id}
                type="button"
                onClick={() => setMethod(m.id)}
                className={`p-4 rounded-xl border-2 text-left transition-all ${
                  method === m.id
                    ? "border-[#0073B9] bg-[#0073B9]/10"
                    : "border-white/10 hover:border-white/20"
                }`}
              >
                <m.icon className={`w-6 h-6 mb-2 ${method === m.id ? "text-[#0073B9]" : "text-white/40"}`} />
                <p className="font-medium text-sm">{m.label}</p>
                <p className="text-xs text-white/40 mt-0.5">{m.desc}</p>
                <p className="text-xs text-green-400/70 mt-1">{m.fee}</p>
              </button>
            ))}
          </div>
        </div>

        <div className="bg-[#111827] rounded-2xl border border-white/5 p-6">
          <label className="block text-sm font-medium text-white/70 mb-3">
            Amount (USD)
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 text-2xl">$</span>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              min="0"
              max={availableBalance}
              step="0.01"
              className="w-full pl-10 pr-4 py-4 bg-[#0a0e17] rounded-xl border border-white/10 text-2xl font-mono text-white placeholder:text-white/20 outline-none focus:border-[#0073B9] transition-colors"
            />
          </div>
          {parseFloat(amount) > availableBalance && (
            <p className="text-red-400 text-sm mt-2">
              Amount exceeds available balance
            </p>
          )}
          <div className="flex gap-2 mt-3">
            {[25, 50, 75, 100].map((pct) => (
              <button
                key={pct}
                type="button"
                onClick={() => setAmount(((availableBalance * pct) / 100).toFixed(2))}
                className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-sm font-medium transition-colors"
              >
                {pct}%
              </button>
            ))}
          </div>
        </div>

        {method === "bank" && (
          <div className="bg-[#111827] rounded-2xl border border-white/5 p-6 space-y-4">
            <label className="block text-sm font-medium text-white/70">
              Bank Account Details
            </label>
            <input
              placeholder="Account holder name"
              className="w-full px-4 py-3 bg-[#0a0e17] rounded-xl border border-white/10 text-white placeholder:text-white/30 outline-none focus:border-[#0073B9] transition-colors"
            />
            <input
              placeholder="Account number"
              className="w-full px-4 py-3 bg-[#0a0e17] rounded-xl border border-white/10 text-white placeholder:text-white/30 outline-none focus:border-[#0073B9] transition-colors"
            />
            <input
              placeholder="Routing number"
              className="w-full px-4 py-3 bg-[#0a0e17] rounded-xl border border-white/10 text-white placeholder:text-white/30 outline-none focus:border-[#0073B9] transition-colors"
            />
          </div>
        )}

        {method === "crypto" && (
          <div className="bg-[#111827] rounded-2xl border border-white/5 p-6">
            <label className="block text-sm font-medium text-white/70 mb-3">
              Wallet Address
            </label>
            <input
              placeholder="Enter your wallet address"
              className="w-full px-4 py-3 bg-[#0a0e17] rounded-xl border border-white/10 text-white placeholder:text-white/30 outline-none focus:border-[#0073B9] transition-colors"
            />
          </div>
        )}

        <button
          type="submit"
          disabled={!amount || parseFloat(amount) <= 0 || parseFloat(amount) > availableBalance}
          className="w-full py-4 bg-orange-500 hover:bg-orange-600 disabled:bg-white/10 disabled:text-white/30 rounded-xl font-bold text-lg transition-colors"
        >
          Withdraw Funds
        </button>
      </form>
    </div>
  );
}
