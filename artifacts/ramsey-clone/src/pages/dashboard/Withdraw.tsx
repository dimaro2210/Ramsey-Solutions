import { useState } from "react";
import {
  ArrowUpFromLine,
  Building2,
  Wallet,
  CheckCircle2,
  ChevronRight,
  ArrowLeft,
  Shield,
  AlertTriangle,
} from "lucide-react";

type Step = "method" | "amount" | "details" | "review" | "confirm2fa" | "success";

const inputClass =
  "w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 text-[#003561] placeholder:text-gray-400 outline-none focus:border-[#0073B9] focus:ring-2 focus:ring-[#0073B9]/10 transition-all";

export default function Withdraw() {
  const [step, setStep] = useState<Step>("method");
  const [method, setMethod] = useState("");
  const [amount, setAmount] = useState("");
  const [bankDetails, setBankDetails] = useState({ holderName: "", accountNumber: "", routingNumber: "", bankName: "", accountType: "checking" });
  const [cryptoDetails, setCryptoDetails] = useState({ network: "bitcoin", walletAddress: "", memo: "" });
  const [verificationCode, setVerificationCode] = useState("");
  const availableBalance = 12450.0;

  const methods = [
    { id: "bank", label: "Bank Transfer (ACH)", icon: Building2, desc: "2-5 business days", fee: "No fees" },
    { id: "crypto", label: "Crypto Wallet", icon: Wallet, desc: "10-60 minutes", fee: "Network fee applied" },
  ];

  const selectedMethod = methods.find((m) => m.id === method);

  const goBack = () => {
    const steps: Step[] = ["method", "amount", "details", "review", "confirm2fa"];
    const idx = steps.indexOf(step);
    if (idx > 0) setStep(steps[idx - 1]);
  };

  const canProceedDetails = () => {
    if (method === "bank") return bankDetails.holderName && bankDetails.accountNumber && bankDetails.routingNumber && bankDetails.bankName;
    if (method === "crypto") return cryptoDetails.walletAddress && cryptoDetails.network;
    return false;
  };

  if (step === "success") {
    return (
      <div className="max-w-lg mx-auto mt-12 text-center">
        <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-10 h-10 text-green-500" />
        </div>
        <h2 className="text-2xl font-bold text-[#003561] mb-2">Withdrawal Submitted!</h2>
        <p className="text-gray-500 mb-2">
          Your withdrawal of <span className="text-[#003561] font-semibold">${parseFloat(amount).toLocaleString(undefined, { minimumFractionDigits: 2 })}</span> via{" "}
          {selectedMethod?.label} has been submitted.
        </p>
        {method === "bank" && <p className="text-gray-400 text-sm mb-2">Funds will arrive in your bank account within 2-5 business days.</p>}
        {method === "crypto" && <p className="text-gray-400 text-sm mb-2">Crypto will be sent to your wallet within 10-60 minutes.</p>}
        <p className="text-xs text-gray-400 mb-8">Transaction ID: WTH-{Date.now().toString(36).toUpperCase()}</p>
        <button
          onClick={() => { setStep("method"); setMethod(""); setAmount(""); setVerificationCode(""); }}
          className="px-6 py-3 bg-[#0073B9] hover:bg-[#005a94] text-white rounded-xl font-medium transition-colors"
        >
          Make Another Withdrawal
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6 flex items-center gap-3">
        {step !== "method" && (
          <button onClick={goBack} className="text-gray-400 hover:text-[#003561] transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </button>
        )}
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-3 text-[#003561]">
            <ArrowUpFromLine className="w-7 h-7 text-orange-500" />
            Withdraw Funds
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            {step === "method" && "Choose your withdrawal method"}
            {step === "amount" && "Enter the amount to withdraw"}
            {step === "details" && `Enter your ${selectedMethod?.label} details`}
            {step === "review" && "Review your withdrawal"}
            {step === "confirm2fa" && "Verify your identity"}
          </p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 p-4 mb-6 flex items-center justify-between shadow-sm">
        <div>
          <p className="text-gray-500 text-sm">Available Balance</p>
          <p className="text-xl font-bold font-mono text-green-600">
            ${availableBalance.toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </p>
        </div>
        <Shield className="w-5 h-5 text-gray-300" />
      </div>

      <div className="flex gap-2 mb-6">
        {["method", "amount", "details", "review", "confirm2fa"].map((s, i) => (
          <div key={s} className={`h-1.5 flex-1 rounded-full ${
            ["method", "amount", "details", "review", "confirm2fa"].indexOf(step) >= i ? "bg-orange-500" : "bg-gray-200"
          }`} />
        ))}
      </div>

      {step === "method" && (
        <div className="space-y-3">
          {methods.map((m) => (
            <button
              key={m.id}
              onClick={() => { setMethod(m.id); setStep("amount"); }}
              className="w-full p-5 rounded-2xl border-2 border-gray-200 text-left transition-all flex items-center gap-4 hover:border-[#0073B9] hover:shadow-md bg-white"
            >
              <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center">
                <m.icon className="w-6 h-6 text-[#003561]" />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-[#003561]">{m.label}</p>
                <p className="text-xs text-gray-400 mt-0.5">{m.desc}</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-green-600 font-medium">{m.fee}</p>
                <ChevronRight className="w-4 h-4 text-gray-300 mt-1 ml-auto" />
              </div>
            </button>
          ))}
        </div>
      )}

      {step === "amount" && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
            <label className="block text-sm font-medium text-gray-600 mb-3">Withdrawal Amount (USD)</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-2xl">$</span>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                min="10"
                max={availableBalance}
                step="0.01"
                className="w-full pl-10 pr-4 py-4 bg-gray-50 rounded-xl border border-gray-200 text-2xl font-mono text-[#003561] placeholder:text-gray-300 outline-none focus:border-[#0073B9] transition-all"
              />
            </div>
            {parseFloat(amount) > availableBalance && (
              <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                <AlertTriangle className="w-4 h-4" />
                Amount exceeds available balance
              </p>
            )}
            <div className="flex gap-2 mt-3">
              {[25, 50, 75, 100].map((pct) => (
                <button
                  key={pct}
                  type="button"
                  onClick={() => setAmount(((availableBalance * pct) / 100).toFixed(2))}
                  className="px-4 py-2 bg-gray-50 hover:bg-orange-50 hover:text-orange-600 border border-gray-200 rounded-lg text-sm font-medium transition-colors text-gray-600"
                >
                  {pct}%
                </button>
              ))}
            </div>
            <p className="text-xs text-gray-400 mt-3">Minimum withdrawal: $10.00</p>
          </div>
          <button
            onClick={() => setStep("details")}
            disabled={!amount || parseFloat(amount) < 10 || parseFloat(amount) > availableBalance}
            className="w-full py-4 bg-[#0073B9] hover:bg-[#005a94] disabled:bg-gray-200 disabled:text-gray-400 text-white rounded-xl font-bold text-lg transition-colors flex items-center justify-center gap-2"
          >
            Continue <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      )}

      {step === "details" && method === "bank" && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm space-y-4">
            <h3 className="font-semibold text-[#003561]">Bank Account Information</h3>
            <div>
              <label className="block text-sm text-gray-500 mb-1.5">Bank Name</label>
              <input value={bankDetails.bankName} onChange={(e) => setBankDetails({ ...bankDetails, bankName: e.target.value })} placeholder="e.g. Chase, Wells Fargo" className={inputClass} />
            </div>
            <div>
              <label className="block text-sm text-gray-500 mb-1.5">Account Holder Name</label>
              <input value={bankDetails.holderName} onChange={(e) => setBankDetails({ ...bankDetails, holderName: e.target.value })} placeholder="Must match your registered name" className={inputClass} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-500 mb-1.5">Routing Number</label>
                <input value={bankDetails.routingNumber} onChange={(e) => setBankDetails({ ...bankDetails, routingNumber: e.target.value })} placeholder="9 digits" maxLength={9} className={inputClass} />
              </div>
              <div>
                <label className="block text-sm text-gray-500 mb-1.5">Account Number</label>
                <input value={bankDetails.accountNumber} onChange={(e) => setBankDetails({ ...bankDetails, accountNumber: e.target.value })} placeholder="Account number" className={inputClass} />
              </div>
            </div>
            <div>
              <label className="block text-sm text-gray-500 mb-1.5">Account Type</label>
              <div className="flex gap-3">
                {["checking", "savings"].map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setBankDetails({ ...bankDetails, accountType: t })}
                    className={`flex-1 py-3 rounded-xl border-2 text-sm font-medium capitalize transition-all ${
                      bankDetails.accountType === t
                        ? "border-[#0073B9] bg-[#0073B9]/5 text-[#0073B9]"
                        : "border-gray-200 text-gray-500 hover:border-gray-300"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <button
            onClick={() => setStep("review")}
            disabled={!canProceedDetails()}
            className="w-full py-4 bg-[#0073B9] hover:bg-[#005a94] disabled:bg-gray-200 disabled:text-gray-400 text-white rounded-xl font-bold text-lg transition-colors flex items-center justify-center gap-2"
          >
            Review Withdrawal <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      )}

      {step === "details" && method === "crypto" && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm space-y-4">
            <h3 className="font-semibold text-[#003561]">Crypto Wallet Details</h3>
            <div>
              <label className="block text-sm text-gray-500 mb-1.5">Select Network</label>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { id: "bitcoin", label: "Bitcoin (BTC)", icon: "₿" },
                  { id: "ethereum", label: "Ethereum (ETH)", icon: "Ξ" },
                  { id: "solana", label: "Solana (SOL)", icon: "◎" },
                  { id: "usdt", label: "USDT (TRC-20)", icon: "$" },
                ].map((n) => (
                  <button
                    key={n.id}
                    type="button"
                    onClick={() => setCryptoDetails({ ...cryptoDetails, network: n.id })}
                    className={`p-3 rounded-xl border-2 text-left transition-all ${
                      cryptoDetails.network === n.id
                        ? "border-[#0073B9] bg-[#0073B9]/5"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <span className="text-xl">{n.icon}</span>
                    <p className="font-medium text-xs text-[#003561] mt-1">{n.label}</p>
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm text-gray-500 mb-1.5">Wallet Address</label>
              <input
                value={cryptoDetails.walletAddress}
                onChange={(e) => setCryptoDetails({ ...cryptoDetails, walletAddress: e.target.value })}
                placeholder="Enter your wallet address"
                className={inputClass}
              />
            </div>
            <div>
              <label className="block text-sm text-gray-500 mb-1.5">Memo/Tag (if required)</label>
              <input
                value={cryptoDetails.memo}
                onChange={(e) => setCryptoDetails({ ...cryptoDetails, memo: e.target.value })}
                placeholder="Optional"
                className={inputClass}
              />
            </div>
            <div className="flex items-start gap-2 p-3 bg-yellow-50 rounded-lg">
              <AlertTriangle className="w-4 h-4 text-yellow-600 mt-0.5 flex-shrink-0" />
              <p className="text-xs text-yellow-700">Double-check your wallet address. Crypto sent to the wrong address cannot be recovered.</p>
            </div>
          </div>
          <button
            onClick={() => setStep("review")}
            disabled={!canProceedDetails()}
            className="w-full py-4 bg-[#0073B9] hover:bg-[#005a94] disabled:bg-gray-200 disabled:text-gray-400 text-white rounded-xl font-bold text-lg transition-colors flex items-center justify-center gap-2"
          >
            Review Withdrawal <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      )}

      {step === "review" && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
            <h3 className="font-semibold text-[#003561] mb-4">Withdrawal Summary</h3>
            <div className="space-y-3">
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-500">Method</span>
                <span className="font-medium text-[#003561]">{selectedMethod?.label}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-500">Amount</span>
                <span className="font-mono font-medium text-[#003561]">${parseFloat(amount).toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-500">Estimated Arrival</span>
                <span className="text-[#003561]">{selectedMethod?.desc}</span>
              </div>
              {method === "bank" && (
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-500">Destination</span>
                  <span className="text-[#003561]">{bankDetails.bankName} ({bankDetails.accountType}) ****{bankDetails.accountNumber.slice(-4)}</span>
                </div>
              )}
              {method === "crypto" && (
                <>
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-500">Network</span>
                    <span className="text-[#003561] capitalize">{cryptoDetails.network}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-500">Wallet</span>
                    <span className="text-[#003561] font-mono text-xs">{cryptoDetails.walletAddress.slice(0, 10)}...{cryptoDetails.walletAddress.slice(-6)}</span>
                  </div>
                </>
              )}
              <div className="flex justify-between py-3 font-bold text-lg">
                <span className="text-[#003561]">Total Withdrawal</span>
                <span className="text-[#003561] font-mono">${parseFloat(amount).toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
              </div>
            </div>
          </div>
          <button
            onClick={() => setStep("confirm2fa")}
            className="w-full py-4 bg-orange-500 hover:bg-orange-600 text-white rounded-xl font-bold text-lg transition-colors"
          >
            Proceed to Verification
          </button>
        </div>
      )}

      {step === "confirm2fa" && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm text-center">
            <Shield className="w-12 h-12 text-[#0073B9] mx-auto mb-4" />
            <h3 className="font-semibold text-[#003561] text-lg mb-2">Verify Your Identity</h3>
            <p className="text-gray-500 text-sm mb-6">
              We've sent a 6-digit verification code to your registered email. Enter it below to confirm the withdrawal.
            </p>
            <div className="max-w-xs mx-auto">
              <input
                type="text"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
                placeholder="000000"
                maxLength={6}
                className="w-full text-center text-3xl font-mono tracking-[0.5em] px-4 py-4 bg-gray-50 rounded-xl border border-gray-200 text-[#003561] placeholder:text-gray-300 outline-none focus:border-[#0073B9] transition-all"
              />
            </div>
            <button className="text-[#0073B9] text-sm font-medium mt-4 hover:underline">
              Resend Code
            </button>
          </div>
          <button
            onClick={() => setStep("success")}
            disabled={verificationCode.length < 6}
            className="w-full py-4 bg-orange-500 hover:bg-orange-600 disabled:bg-gray-200 disabled:text-gray-400 text-white rounded-xl font-bold text-lg transition-colors"
          >
            Confirm Withdrawal
          </button>
        </div>
      )}
    </div>
  );
}
