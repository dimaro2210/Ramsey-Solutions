import { useState } from "react";
import { ArrowDownToLine, CreditCard, Building2, Wallet, CheckCircle2 } from "lucide-react";

const methods = [
  { id: "bank", label: "Bank Transfer", icon: Building2, desc: "1-3 business days", fee: "Free" },
  { id: "card", label: "Credit/Debit Card", icon: CreditCard, desc: "Instant", fee: "2.5% fee" },
  { id: "crypto", label: "Crypto Transfer", icon: Wallet, desc: "Network dependent", fee: "Network fee" },
];

export default function Deposit() {
  const [method, setMethod] = useState("bank");
  const [amount, setAmount] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || parseFloat(amount) <= 0) return;
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="max-w-lg mx-auto mt-16 text-center">
        <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-10 h-10 text-green-400" />
        </div>
        <h2 className="text-2xl font-bold mb-2">Deposit Submitted</h2>
        <p className="text-white/50 mb-2">
          Your deposit of <span className="text-white font-semibold">${parseFloat(amount).toLocaleString()}</span> via{" "}
          {methods.find((m) => m.id === method)?.label} is being processed.
        </p>
        <p className="text-white/30 text-sm mb-8">
          You'll receive a confirmation once the funds are available.
        </p>
        <button
          onClick={() => { setSubmitted(false); setAmount(""); }}
          className="px-6 py-3 bg-[#0073B9] hover:bg-[#005a94] rounded-xl font-medium transition-colors"
        >
          Make Another Deposit
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold flex items-center gap-3">
          <ArrowDownToLine className="w-7 h-7 text-green-400" />
          Deposit Funds
        </h1>
        <p className="text-white/50 text-sm mt-1">
          Add funds to your trading account
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-[#111827] rounded-2xl border border-white/5 p-6">
          <label className="block text-sm font-medium text-white/70 mb-3">
            Select Deposit Method
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
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
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 text-2xl">
              $
            </span>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              min="0"
              step="0.01"
              className="w-full pl-10 pr-4 py-4 bg-[#0a0e17] rounded-xl border border-white/10 text-2xl font-mono text-white placeholder:text-white/20 outline-none focus:border-[#0073B9] transition-colors"
            />
          </div>
          <div className="flex gap-2 mt-3">
            {[100, 500, 1000, 5000].map((v) => (
              <button
                key={v}
                type="button"
                onClick={() => setAmount(v.toString())}
                className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-sm font-medium transition-colors"
              >
                ${v.toLocaleString()}
              </button>
            ))}
          </div>
        </div>

        <button
          type="submit"
          disabled={!amount || parseFloat(amount) <= 0}
          className="w-full py-4 bg-green-500 hover:bg-green-600 disabled:bg-white/10 disabled:text-white/30 rounded-xl font-bold text-lg transition-colors"
        >
          Deposit Funds
        </button>
      </form>
    </div>
  );
}
