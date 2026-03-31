import { useState } from "react";
import {
  ArrowDownToLine,
  CreditCard,
  Building2,
  Wallet,
  CheckCircle2,
  ChevronRight,
  ArrowLeft,
  Copy,
  Shield,
  Clock,
} from "lucide-react";

type Step = "method" | "amount" | "details" | "review" | "success";

const inputClass =
  "w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 text-[#003561] placeholder:text-gray-400 outline-none focus:border-[#0073B9] focus:ring-2 focus:ring-[#0073B9]/10 transition-all";

export default function Deposit() {
  const [step, setStep] = useState<Step>("method");
  const [method, setMethod] = useState("");
  const [amount, setAmount] = useState("");
  const [bankDetails, setBankDetails] = useState({ holderName: "", accountNumber: "", routingNumber: "", bankName: "" });
  const [cardDetails, setCardDetails] = useState({ cardNumber: "", expiry: "", cvv: "", nameOnCard: "", billingZip: "" });
  const [cryptoDetails, setCryptoDetails] = useState({ network: "bitcoin", walletNote: "" });

  const methods = [
    { id: "bank", label: "Bank Transfer (ACH)", icon: Building2, desc: "1-3 business days", fee: "No fees", color: "text-[#003561]" },
    { id: "card", label: "Credit/Debit Card", icon: CreditCard, desc: "Instant deposit", fee: "2.5% processing fee", color: "text-[#0073B9]" },
    { id: "crypto", label: "Crypto Transfer", icon: Wallet, desc: "10-60 minutes", fee: "Network fee only", color: "text-green-600" },
  ];

  const selectedMethod = methods.find((m) => m.id === method);
  const fee = method === "card" ? parseFloat(amount || "0") * 0.025 : 0;
  const total = parseFloat(amount || "0") + fee;

  const goBack = () => {
    const steps: Step[] = ["method", "amount", "details", "review"];
    const idx = steps.indexOf(step);
    if (idx > 0) setStep(steps[idx - 1]);
  };

  const canProceedDetails = () => {
    if (method === "bank") return bankDetails.holderName && bankDetails.accountNumber && bankDetails.routingNumber && bankDetails.bankName;
    if (method === "card") return cardDetails.cardNumber && cardDetails.expiry && cardDetails.cvv && cardDetails.nameOnCard && cardDetails.billingZip;
    if (method === "crypto") return cryptoDetails.network;
    return false;
  };

  if (step === "success") {
    return (
      <div className="max-w-lg mx-auto mt-12 text-center">
        <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-10 h-10 text-green-500" />
        </div>
        <h2 className="text-2xl font-bold text-[#003561] mb-2">Deposit Successful!</h2>
        <p className="text-gray-500 mb-2">
          Your deposit of <span className="text-[#003561] font-semibold">${parseFloat(amount).toLocaleString(undefined, { minimumFractionDigits: 2 })}</span> via{" "}
          {selectedMethod?.label} has been submitted.
        </p>
        {method === "bank" && <p className="text-gray-400 text-sm mb-2">Funds will be available in 1-3 business days.</p>}
        {method === "card" && <p className="text-gray-400 text-sm mb-2">Funds are available immediately in your account.</p>}
        {method === "crypto" && <p className="text-gray-400 text-sm mb-2">Funds will be credited after network confirmation (10-60 min).</p>}
        <p className="text-xs text-gray-400 mb-8">Transaction ID: DEP-{Date.now().toString(36).toUpperCase()}</p>
        <div className="flex gap-3 justify-center">
          <button
            onClick={() => { setStep("method"); setMethod(""); setAmount(""); }}
            className="px-6 py-3 bg-[#0073B9] hover:bg-[#005a94] text-white rounded-xl font-medium transition-colors"
          >
            Make Another Deposit
          </button>
        </div>
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
            <ArrowDownToLine className="w-7 h-7 text-green-500" />
            Deposit Funds
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            {step === "method" && "Choose how you'd like to add funds"}
            {step === "amount" && "Enter the amount to deposit"}
            {step === "details" && `Enter your ${selectedMethod?.label} details`}
            {step === "review" && "Review and confirm your deposit"}
          </p>
        </div>
      </div>

      <div className="flex gap-2 mb-6">
        {["method", "amount", "details", "review"].map((s, i) => (
          <div key={s} className={`h-1.5 flex-1 rounded-full ${
            ["method", "amount", "details", "review"].indexOf(step) >= i ? "bg-[#0073B9]" : "bg-gray-200"
          }`} />
        ))}
      </div>

      {step === "method" && (
        <div className="space-y-3">
          {methods.map((m) => (
            <button
              key={m.id}
              onClick={() => { setMethod(m.id); setStep("amount"); }}
              className={`w-full p-5 rounded-2xl border-2 text-left transition-all flex items-center gap-4 hover:border-[#0073B9] hover:shadow-md bg-white border-gray-200`}
            >
              <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center">
                <m.icon className={`w-6 h-6 ${m.color}`} />
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
          <div className="flex items-center gap-2 text-xs text-gray-400 mt-4 justify-center">
            <Shield className="w-4 h-4" />
            All transactions are encrypted and secure
          </div>
        </div>
      )}

      {step === "amount" && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
            <label className="block text-sm font-medium text-gray-600 mb-3">Deposit Amount (USD)</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-2xl">$</span>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                min="10"
                step="0.01"
                className="w-full pl-10 pr-4 py-4 bg-gray-50 rounded-xl border border-gray-200 text-2xl font-mono text-[#003561] placeholder:text-gray-300 outline-none focus:border-[#0073B9] focus:ring-2 focus:ring-[#0073B9]/10 transition-all"
              />
            </div>
            {method === "card" && parseFloat(amount || "0") > 0 && (
              <div className="mt-4 p-3 bg-blue-50 rounded-lg text-sm">
                <div className="flex justify-between text-gray-500">
                  <span>Processing fee (2.5%)</span>
                  <span>${fee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-semibold text-[#003561] mt-1">
                  <span>You'll be charged</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            )}
            <p className="text-xs text-gray-400 mt-3">Minimum deposit: $10.00</p>
          </div>
          <button
            onClick={() => setStep("details")}
            disabled={!amount || parseFloat(amount) < 10}
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
              <input value={bankDetails.bankName} onChange={(e) => setBankDetails({ ...bankDetails, bankName: e.target.value })} placeholder="e.g. Chase, Bank of America" className={inputClass} />
            </div>
            <div>
              <label className="block text-sm text-gray-500 mb-1.5">Account Holder Name</label>
              <input value={bankDetails.holderName} onChange={(e) => setBankDetails({ ...bankDetails, holderName: e.target.value })} placeholder="Full name on account" className={inputClass} />
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
            <div className="flex items-start gap-2 p-3 bg-blue-50 rounded-lg">
              <Shield className="w-4 h-4 text-[#0073B9] mt-0.5 flex-shrink-0" />
              <p className="text-xs text-gray-500">Your bank details are encrypted with 256-bit SSL and never stored on our servers after verification.</p>
            </div>
          </div>
          <button
            onClick={() => setStep("review")}
            disabled={!canProceedDetails()}
            className="w-full py-4 bg-[#0073B9] hover:bg-[#005a94] disabled:bg-gray-200 disabled:text-gray-400 text-white rounded-xl font-bold text-lg transition-colors flex items-center justify-center gap-2"
          >
            Review Deposit <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      )}

      {step === "details" && method === "card" && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm space-y-4">
            <h3 className="font-semibold text-[#003561]">Card Information</h3>
            <div>
              <label className="block text-sm text-gray-500 mb-1.5">Name on Card</label>
              <input value={cardDetails.nameOnCard} onChange={(e) => setCardDetails({ ...cardDetails, nameOnCard: e.target.value })} placeholder="Full name as shown on card" className={inputClass} />
            </div>
            <div>
              <label className="block text-sm text-gray-500 mb-1.5">Card Number</label>
              <input value={cardDetails.cardNumber} onChange={(e) => setCardDetails({ ...cardDetails, cardNumber: e.target.value })} placeholder="1234 5678 9012 3456" maxLength={19} className={inputClass} />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm text-gray-500 mb-1.5">Expiry</label>
                <input value={cardDetails.expiry} onChange={(e) => setCardDetails({ ...cardDetails, expiry: e.target.value })} placeholder="MM/YY" maxLength={5} className={inputClass} />
              </div>
              <div>
                <label className="block text-sm text-gray-500 mb-1.5">CVV</label>
                <input value={cardDetails.cvv} onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value })} placeholder="123" maxLength={4} type="password" className={inputClass} />
              </div>
              <div>
                <label className="block text-sm text-gray-500 mb-1.5">Billing ZIP</label>
                <input value={cardDetails.billingZip} onChange={(e) => setCardDetails({ ...cardDetails, billingZip: e.target.value })} placeholder="12345" maxLength={5} className={inputClass} />
              </div>
            </div>
            <div className="flex gap-3 items-center pt-2">
              <img src="https://cdn-icons-png.flaticon.com/512/196/196578.png" alt="Visa" className="h-6" />
              <img src="https://cdn-icons-png.flaticon.com/512/196/196561.png" alt="Mastercard" className="h-6" />
              <img src="https://cdn-icons-png.flaticon.com/512/196/196565.png" alt="Amex" className="h-6" />
            </div>
          </div>
          <button
            onClick={() => setStep("review")}
            disabled={!canProceedDetails()}
            className="w-full py-4 bg-[#0073B9] hover:bg-[#005a94] disabled:bg-gray-200 disabled:text-gray-400 text-white rounded-xl font-bold text-lg transition-colors flex items-center justify-center gap-2"
          >
            Review Deposit <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      )}

      {step === "details" && method === "crypto" && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm space-y-4">
            <h3 className="font-semibold text-[#003561]">Select Network</h3>
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
                  className={`p-4 rounded-xl border-2 text-left transition-all ${
                    cryptoDetails.network === n.id
                      ? "border-[#0073B9] bg-[#0073B9]/5"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <span className="text-2xl">{n.icon}</span>
                  <p className="font-medium text-sm text-[#003561] mt-1">{n.label}</p>
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
            <h3 className="font-semibold text-[#003561] mb-3">Deposit Address</h3>
            <p className="text-xs text-gray-400 mb-3">Send exactly ${amount} worth of {cryptoDetails.network.toUpperCase()} to this address:</p>
            <div className="bg-gray-50 rounded-xl p-4 flex items-center gap-3 border border-gray-200">
              <code className="text-sm font-mono text-[#003561] flex-1 break-all">
                {cryptoDetails.network === "bitcoin" && "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh"}
                {cryptoDetails.network === "ethereum" && "0x742d35Cc6634C0532925a3b844Bc9e7595f2bD18"}
                {cryptoDetails.network === "solana" && "7EcDhSYGxXyscszYEp35KHN8vvw3svAuLKTzXwCFLtV"}
                {cryptoDetails.network === "usdt" && "TN3W4H6rK2ce4vX9YnFQHwKENnHjoxb3m9"}
              </code>
              <button className="p-2 hover:bg-gray-200 rounded-lg transition-colors">
                <Copy className="w-4 h-4 text-gray-500" />
              </button>
            </div>
            <div className="flex items-start gap-2 p-3 bg-yellow-50 rounded-lg mt-4">
              <Clock className="w-4 h-4 text-yellow-600 mt-0.5 flex-shrink-0" />
              <p className="text-xs text-yellow-700">Only send {cryptoDetails.network === "usdt" ? "USDT (TRC-20)" : cryptoDetails.network.charAt(0).toUpperCase() + cryptoDetails.network.slice(1)} to this address. Sending other tokens will result in permanent loss.</p>
            </div>
            <div>
              <label className="block text-sm text-gray-500 mt-4 mb-1.5">Note (optional)</label>
              <input
                value={cryptoDetails.walletNote}
                onChange={(e) => setCryptoDetails({ ...cryptoDetails, walletNote: e.target.value })}
                placeholder="Add a note for your reference"
                className={inputClass}
              />
            </div>
          </div>
          <button
            onClick={() => setStep("review")}
            className="w-full py-4 bg-[#0073B9] hover:bg-[#005a94] text-white rounded-xl font-bold text-lg transition-colors flex items-center justify-center gap-2"
          >
            Review Deposit <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      )}

      {step === "review" && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
            <h3 className="font-semibold text-[#003561] mb-4">Deposit Summary</h3>
            <div className="space-y-3">
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-500">Method</span>
                <span className="font-medium text-[#003561]">{selectedMethod?.label}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-500">Deposit Amount</span>
                <span className="font-mono font-medium text-[#003561]">${parseFloat(amount).toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
              </div>
              {method === "card" && (
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-500">Processing Fee (2.5%)</span>
                  <span className="font-mono text-gray-500">${fee.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-500">Estimated Arrival</span>
                <span className="text-[#003561]">{selectedMethod?.desc}</span>
              </div>
              {method === "bank" && (
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-500">Bank</span>
                  <span className="text-[#003561]">{bankDetails.bankName} ****{bankDetails.accountNumber.slice(-4)}</span>
                </div>
              )}
              {method === "card" && (
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-500">Card</span>
                  <span className="text-[#003561]">****{cardDetails.cardNumber.slice(-4)}</span>
                </div>
              )}
              {method === "crypto" && (
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-500">Network</span>
                  <span className="text-[#003561] capitalize">{cryptoDetails.network}</span>
                </div>
              )}
              <div className="flex justify-between py-3 font-bold text-lg">
                <span className="text-[#003561]">Total</span>
                <span className="text-[#003561] font-mono">${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
          <button
            onClick={() => setStep("success")}
            className="w-full py-4 bg-green-500 hover:bg-green-600 text-white rounded-xl font-bold text-lg transition-colors"
          >
            Confirm Deposit
          </button>
          <p className="text-center text-xs text-gray-400">
            By confirming, you agree to our deposit terms and conditions.
          </p>
        </div>
      )}
    </div>
  );
}
