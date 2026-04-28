import { useState, useRef, useEffect } from "react";
import {
  ArrowDownToLine,
  Wallet,
  CheckCircle2,
  ChevronRight,
  ArrowLeft,
  Copy,
  Shield,
  UploadCloud,
  Loader2
} from "lucide-react";
import { db } from "@/lib/db";
import { useAuth } from "@/context/AuthContext";

type Step = "amount" | "asset" | "payment" | "success";

const inputClass =
  "w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 text-[#002d72] placeholder:text-gray-400 outline-none focus:border-[#002d72] focus:ring-2 focus:ring-[#002d72]/10 transition-all";

export default function Deposit() {
  const { user } = useAuth();
  const [step, setStep] = useState<Step>("amount");
  const [amount, setAmount] = useState("");
  const [asset, setAsset] = useState<"bitcoin" | "ethereum" | null>(null);
  const [receipt, setReceipt] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [referenceId, setReferenceId] = useState("");
  const [adminSettings, setAdminSettings] = useState({ depositAddresses: { bitcoin: '', ethereum: '' } });

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const loadSettings = async () => {
      const settings = await db.getAdminSettings();
      setAdminSettings(settings);
    };
    loadSettings();
    window.addEventListener('db_updated', loadSettings);
    return () => window.removeEventListener('db_updated', loadSettings);
  }, []);

  const goBack = () => {
    const steps: Step[] = ["amount", "asset", "payment"];
    const idx = steps.indexOf(step);
    if (idx > 0) setStep(steps[idx - 1]);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setReceipt(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const generateAddress = () => {
    return asset === "bitcoin" 
      ? adminSettings.depositAddresses.bitcoin
      : adminSettings.depositAddresses.ethereum;
  };

  const handleSubmit = async () => {
    if (!asset || !receipt || !user?.id) return;
    setIsProcessing(true);

    const newDeposit = await db.addPendingDeposit(user.id, parseFloat(amount), asset, receipt);
    if (newDeposit) {
      setReferenceId(newDeposit.id);
      setIsProcessing(false);
      setStep("success");
    } else {
      setIsProcessing(false);
    }
  };

  const copyAddress = () => {
    navigator.clipboard.writeText(generateAddress());
    // Normally add a toast here
  };

  if (step === "success") {
    return (
      <div className="max-w-lg mx-auto mt-12 text-center animate-in fade-in zoom-in duration-500">
        <div className="w-20 h-20 bg-[#e6f0ff] rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-10 h-10 text-[#002d72]" />
        </div>
        <h2 className="text-2xl font-bold text-[#002d72] mb-2">Deposit Submitted!</h2>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-100 text-yellow-800 text-sm font-medium mb-6">
          <Loader2 className="w-4 h-4 animate-spin" />
          Pending Verification
        </div>
        <p className="text-gray-500 mb-2">
          Your deposit of <span className="text-[#002d72] font-semibold">${parseFloat(amount).toLocaleString(undefined, { minimumFractionDigits: 2 })}</span> via{" "}
          <span className="capitalize">{asset}</span> is under review.
        </p>
        <p className="text-gray-400 text-sm mb-6">Funds will be credited once the transaction and receipt are verified.</p>
        <p className="text-xs text-gray-400 mb-8 font-mono bg-gray-50 py-2 rounded-lg">Ref ID: {referenceId}</p>
        <div className="flex gap-3 justify-center">
          <button
            onClick={() => { setStep("amount"); setAmount(""); setAsset(null); setReceipt(null); }}
            className="px-6 py-3 bg-[#002d72] hover:bg-[#001d4a] text-white rounded-xl font-medium transition-colors"
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
        {step !== "amount" && (
          <button onClick={goBack} className="text-gray-400 hover:text-[#002d72] transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </button>
        )}
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-3 text-[#002d72]">
            <ArrowDownToLine className="w-7 h-7 text-[#002d72]" />
            Deposit Funds
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            {step === "amount" && "Step 1: Enter the amount to deposit"}
            {step === "asset" && "Step 2: Choose your crypto asset"}
            {step === "payment" && "Step 3: Make payment and upload receipt"}
          </p>
        </div>
      </div>

      <div className="flex gap-2 mb-6">
        {["amount", "asset", "payment"].map((s, i) => (
          <div key={s} className={`h-1.5 flex-1 rounded-full transition-colors duration-300 ${
            ["amount", "asset", "payment"].indexOf(step) >= i ? "bg-[#002d72]" : "bg-gray-200"
          }`} />
        ))}
      </div>

      <div className="animate-in slide-in-from-right-4 fade-in duration-300">
        {step === "amount" && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
              <label className="block text-sm font-medium text-[#002d72] mb-3">Deposit Amount (USD)</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-2xl">$</span>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.00"
                  min="1"
                  step="0.01"
                  className="w-full pl-10 pr-4 py-4 bg-gray-50 rounded-xl border border-gray-200 text-2xl font-mono text-[#002d72] placeholder:text-gray-300 outline-none focus:border-[#002d72] focus:ring-2 focus:ring-[#002d72]/10 transition-all"
                />
              </div>
              <p className="text-xs text-gray-400 mt-3">Enter an amount greater than 0.</p>
            </div>
            <button
              onClick={() => setStep("asset")}
              disabled={!amount || parseFloat(amount) <= 0}
              className="w-full py-4 bg-[#002d72] hover:bg-[#001d4a] disabled:bg-gray-200 disabled:text-gray-400 text-white rounded-xl font-bold text-lg transition-colors flex items-center justify-center gap-2"
            >
              Continue <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}

        {step === "asset" && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm space-y-4">
              <h3 className="font-semibold text-[#002d72]">Select Asset</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { id: "bitcoin", label: "Bitcoin (BTC)", icon: "₿" },
                  { id: "ethereum", label: "Ethereum (ETH)", icon: "Ξ" }
                ].map((n) => (
                  <button
                    key={n.id}
                    type="button"
                    onClick={() => setAsset(n.id as any)}
                    className={`p-5 rounded-xl border-2 text-left transition-all flex items-center gap-4 ${
                      asset === n.id
                        ? "border-[#002d72] bg-[#e6f0ff]"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm text-2xl">
                      {n.icon}
                    </div>
                    <div>
                      <p className="font-semibold text-[#002d72]">{n.label}</p>
                      <p className="text-xs text-gray-500 capitalize">{n.id} Network</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
            <button
              onClick={() => setStep("payment")}
              disabled={!asset}
              className="w-full py-4 bg-[#002d72] hover:bg-[#001d4a] disabled:bg-gray-200 disabled:text-gray-400 text-white rounded-xl font-bold text-lg transition-colors flex items-center justify-center gap-2"
            >
              Continue <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}

        {step === "payment" && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
              <div className="text-center mb-6">
                <h3 className="font-semibold text-[#002d72] text-lg">Send {asset === "bitcoin" ? "BTC" : "ETH"}</h3>
                <p className="text-gray-500 text-sm">Transfer exactly <span className="font-semibold">${amount}</span> worth to the address below.</p>
              </div>

              <div className="flex justify-center mb-6">
                <div className="p-4 bg-white border-2 border-gray-100 rounded-2xl shadow-sm">
                  <img 
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${generateAddress()}`} 
                    alt="Wallet QR Code"
                    className="w-48 h-48"
                  />
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-4 flex items-center gap-3 border border-gray-200 mb-6">
                <code className="text-sm font-mono text-[#002d72] flex-1 break-all">
                  {generateAddress()}
                </code>
                <button onClick={copyAddress} className="p-2 hover:bg-[#e6f0ff] rounded-lg transition-colors text-[#002d72]">
                  <Copy className="w-5 h-5" />
                </button>
              </div>

              <div className="border-t border-gray-100 pt-6">
                <h4 className="font-semibold text-[#002d72] mb-3">Upload Payment Receipt</h4>
                <div 
                  onClick={() => fileInputRef.current?.click()}
                  className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors ${
                    receipt ? "border-green-400 bg-green-50" : "border-gray-300 hover:border-[#002d72] hover:bg-gray-50"
                  }`}
                >
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    className="hidden" 
                    accept="image/*,.pdf" 
                    onChange={handleFileUpload}
                  />
                  {receipt ? (
                    <div className="flex flex-col items-center">
                      <CheckCircle2 className="w-10 h-10 text-green-500 mb-2" />
                      <p className="text-green-700 font-medium">Receipt Uploaded Successfully</p>
                      <p className="text-xs text-green-600 mt-1">Click to change file</p>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center">
                      <UploadCloud className="w-10 h-10 text-gray-400 mb-2" />
                      <p className="text-gray-600 font-medium">Drag & drop or click to upload</p>
                      <p className="text-xs text-gray-400 mt-1">Supports JPG, PNG, PDF</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-start gap-2 p-3 bg-[#e6f0ff] rounded-lg mt-6">
                <Shield className="w-5 h-5 text-[#002d72] mt-0.5 flex-shrink-0" />
                <p className="text-xs text-[#002d72]">
                  Verification typically takes 10-60 minutes after network confirmation. Please ensure your receipt clearly shows the transaction details.
                </p>
              </div>
            </div>

            <button
              onClick={handleSubmit}
              disabled={!receipt || isProcessing}
              className="w-full py-4 bg-[#002d72] hover:bg-[#001d4a] disabled:bg-gray-200 disabled:text-gray-400 text-white rounded-xl font-bold text-lg transition-colors flex items-center justify-center gap-2"
            >
              {isProcessing ? (
                <><Loader2 className="w-5 h-5 animate-spin" /> Processing...</>
              ) : (
                "Submit Deposit"
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
