import { useState, useEffect } from "react";
import {
  ArrowUpFromLine,
  Wallet,
  CheckCircle2,
  ChevronRight,
  ArrowLeft,
  Shield,
  AlertTriangle,
  Loader2,
  Activity
} from "lucide-react";
import { db, User } from "@/lib/db";
import { useCryptoPrices } from "@/hooks/useCryptoPrices";
import { useAuth } from "@/context/AuthContext";

type Step = "amount" | "method" | "processing" | "confirm" | "success";

const inputClass =
  "w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 text-[#002d72] placeholder:text-gray-400 outline-none focus:border-[#002d72] focus:ring-2 focus:ring-[#002d72]/10 transition-all";

export default function Withdraw() {
  const { user: authUser } = useAuth();
  const [step, setStep] = useState<Step>("amount");
  const [amount, setAmount] = useState("");
  const [network, setNetwork] = useState<"bitcoin" | "ethereum" | null>(null);
  const [walletAddress, setWalletAddress] = useState("");
  const [transactionId, setTransactionId] = useState("");
  
  const [user, setUser] = useState<User | null>(null);
  const { prices, loading: pricesLoading } = useCryptoPrices();

  useEffect(() => {
    const loadUser = async () => {
      if (authUser?.id) {
        const u = await db.getUser(authUser.id);
        setUser(u);
      }
    };
    loadUser();
  }, [authUser?.id]);

  const totalBalance = user ? user.balance : 0;

  const goBack = () => {
    const steps: Step[] = ["amount", "method", "processing", "confirm"];
    const idx = steps.indexOf(step);
    if (idx > 0) setStep(steps[idx - 1]);
  };

  const handleProcess = () => {
    setStep("processing");
    setTimeout(() => {
      setStep("confirm");
    }, 2000);
  };

  const handleConfirm = async () => {
    if (!user) return;
    
    const withdrawAmount = parseFloat(amount);
    if (withdrawAmount > totalBalance) return;

    // Deduct from user balance (this logic simplifies by just deducting USD balance first, then crypto if needed, but for mock purposes we'll just deduct USD)
    let newBalance = user.balance;
    if (withdrawAmount <= user.balance) {
      newBalance -= withdrawAmount;
    } else {
      // If it exceeds USD balance, we'd normally sell crypto here. For mock, just 0 out USD and leave remainder.
      newBalance = 0;
    }
    
    await db.updateUser(user.id, { balance: newBalance });
    await db.addNotification(user.id, "Withdrawal Successful", `Your withdrawal of $${withdrawAmount} has been processed.`, "success");
    
    setTransactionId(`WTH-${Date.now().toString(36).toUpperCase()}`);
    const updatedUser = await db.getUser(user.id);
    setUser(updatedUser); // Refresh UI
    setStep("success");
  };

  if (step === "success") {
    return (
      <div className="max-w-lg mx-auto mt-12 text-center animate-in fade-in zoom-in duration-500">
        <div className="w-20 h-20 bg-[#e6f0ff] rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-10 h-10 text-[#002d72]" />
        </div>
        <h2 className="text-2xl font-bold text-[#002d72] mb-2">Withdrawal Initiated!</h2>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-[#002d72] text-sm font-medium mb-6">
          <Activity className="w-4 h-4" />
          Pending Settlement
        </div>
        <p className="text-gray-500 mb-2">
          Your withdrawal of <span className="text-[#002d72] font-semibold">${parseFloat(amount).toLocaleString(undefined, { minimumFractionDigits: 2 })}</span> to{" "}
          <span className="capitalize">{network}</span> has been processed.
        </p>
        <p className="text-gray-400 text-sm mb-6">The assets will arrive in your wallet shortly depending on network congestion.</p>
        <p className="text-xs text-gray-400 mb-8 font-mono bg-gray-50 py-2 rounded-lg">Tx ID: {transactionId}</p>
        <button
          onClick={() => { setStep("amount"); setAmount(""); setNetwork(null); setWalletAddress(""); }}
          className="px-6 py-3 bg-[#002d72] hover:bg-[#001d4a] text-white rounded-xl font-medium transition-colors"
        >
          Make Another Withdrawal
        </button>
      </div>
    );
  }

  if (step === "processing") {
    return (
      <div className="max-w-lg mx-auto mt-20 text-center animate-in fade-in duration-500">
        <Loader2 className="w-16 h-16 text-[#002d72] animate-spin mx-auto" />
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6 flex items-center gap-3">
        {step !== "amount" && (
          <button onClick={goBack} className="text-gray-400 hover:text-[#002d72] transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </button>
        )}
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-3 text-[#002d72]">
            <ArrowUpFromLine className="w-7 h-7 text-[#002d72]" />
            Withdraw Funds
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            {step === "amount" && "Step 1: Enter the amount to withdraw"}
            {step === "method" && "Step 2: Choose destination wallet"}
            {step === "confirm" && "Step 3: Review and confirm"}
          </p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 p-4 mb-6 flex items-center justify-between shadow-sm">
        <div>
          <p className="text-gray-500 text-sm">Available Balance</p>
          <p className="text-xl font-bold font-mono text-[#002d72]">
            ${totalBalance.toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </p>
        </div>
        <Shield className="w-5 h-5 text-gray-300" />
      </div>

      <div className="flex gap-2 mb-6">
        {["amount", "method", "confirm"].map((s, i) => {
          const mappedStep = step;
          return (
            <div key={s} className={`h-1.5 flex-1 rounded-full transition-colors duration-300 ${
              ["amount", "method", "confirm"].indexOf(mappedStep) >= i ? "bg-[#002d72]" : "bg-gray-200"
            }`} />
          );
        })}
      </div>

      <div className="animate-in slide-in-from-right-4 fade-in duration-300">
        {step === "amount" && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
              <label className="block text-sm font-medium text-[#002d72] mb-3">Withdrawal Amount (USD)</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-2xl">$</span>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.00"
                  min="1"
                  max={totalBalance}
                  step="0.01"
                  className="w-full pl-10 pr-4 py-4 bg-gray-50 rounded-xl border border-gray-200 text-2xl font-mono text-[#002d72] placeholder:text-gray-300 outline-none focus:border-[#002d72] focus:ring-2 focus:ring-[#002d72]/10 transition-all"
                />
              </div>
              {parseFloat(amount) > totalBalance && (
                <p className="text-red-500 text-sm mt-2 flex items-center gap-1 animate-pulse">
                  <AlertTriangle className="w-4 h-4" />
                  Amount exceeds available balance
                </p>
              )}
              <div className="flex gap-2 mt-4">
                {[25, 50, 75, 100].map((pct) => (
                  <button
                    key={pct}
                    type="button"
                    onClick={() => setAmount(((totalBalance * pct) / 100).toFixed(2))}
                    className="px-4 py-2 bg-gray-50 hover:bg-[#e6f0ff] hover:text-[#002d72] border border-gray-200 rounded-lg text-sm font-medium transition-colors text-gray-600"
                  >
                    {pct}%
                  </button>
                ))}
              </div>
            </div>
            <button
              onClick={() => setStep("method")}
              disabled={!amount || parseFloat(amount) <= 0 || parseFloat(amount) > totalBalance}
              className="w-full py-4 bg-[#002d72] hover:bg-[#001d4a] disabled:bg-gray-200 disabled:text-gray-400 text-white rounded-xl font-bold text-lg transition-colors flex items-center justify-center gap-2"
            >
              Continue <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}

        {step === "method" && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm space-y-4">
              <h3 className="font-semibold text-[#002d72]">Destination Network</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { id: "bitcoin", label: "Bitcoin (BTC)", icon: "₿" },
                  { id: "ethereum", label: "Ethereum (ETH)", icon: "Ξ" }
                ].map((n) => (
                  <button
                    key={n.id}
                    type="button"
                    onClick={() => setNetwork(n.id as any)}
                    className={`p-4 rounded-xl border-2 text-left transition-all flex items-center gap-4 ${
                      network === n.id
                        ? "border-[#002d72] bg-[#e6f0ff]"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm text-xl">
                      {n.icon}
                    </div>
                    <span className="font-medium text-[#002d72]">{n.label}</span>
                  </button>
                ))}
              </div>
              
              <div className="pt-4">
                <label className="block text-sm font-medium text-[#002d72] mb-1.5">Destination Wallet Address</label>
                <div className="relative">
                  <Wallet className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    value={walletAddress}
                    onChange={(e) => setWalletAddress(e.target.value)}
                    placeholder="Paste your wallet address"
                    className="w-full pl-12 pr-4 py-3 bg-gray-50 rounded-xl border border-gray-200 text-[#002d72] placeholder:text-gray-400 outline-none focus:border-[#002d72] transition-all font-mono text-sm"
                  />
                </div>
                {walletAddress.length > 0 && walletAddress.length < 10 && (
                  <p className="text-red-500 text-xs mt-1">Address is too short to be valid.</p>
                )}
              </div>
            </div>

            <button
              onClick={handleProcess}
              disabled={!network || walletAddress.length < 10}
              className="w-full py-4 bg-[#002d72] hover:bg-[#001d4a] disabled:bg-gray-200 disabled:text-gray-400 text-white rounded-xl font-bold text-lg transition-colors flex items-center justify-center gap-2"
            >
              Review Withdrawal <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}

        {step === "confirm" && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
              <h3 className="font-semibold text-[#002d72] mb-4 text-lg">Withdrawal Summary</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-500">Withdrawal Amount</span>
                  <span className="font-mono font-bold text-lg text-[#002d72]">
                    ${parseFloat(amount).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-500">Asset Method</span>
                  <span className="font-medium text-[#002d72] capitalize flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-xs">
                      {network === 'bitcoin' ? '₿' : 'Ξ'}
                    </div>
                    {network} Network
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-500">Destination</span>
                  <span className="text-[#002d72] font-mono text-sm bg-gray-50 px-2 py-1 rounded">
                    {walletAddress.slice(0, 8)}...{walletAddress.slice(-8)}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-500">Network Fee</span>
                  <span className="font-bold text-green-600 bg-green-50 px-2 py-1 rounded">FREE</span>
                </div>
                <div className="flex justify-between items-center py-4">
                  <span className="font-bold text-[#002d72] text-lg">Total Settlement</span>
                  <span className="font-mono font-bold text-xl text-[#002d72]">
                    ${parseFloat(amount).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-2 p-3 bg-yellow-50 rounded-lg mt-6">
                <AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0" />
                <p className="text-xs text-yellow-700 leading-relaxed">
                  Please confirm the destination address is correct. Crypto transfers are irreversible. 
                  Ramsey is not liable for funds sent to incorrect addresses.
                </p>
              </div>
            </div>

            <button
              onClick={handleConfirm}
              className="w-full py-4 bg-[#002d72] hover:bg-[#001d4a] text-white rounded-xl font-bold text-lg transition-colors"
            >
              Confirm & Settle
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
