import { useState } from "react";
import { X, TrendingUp, Shield, Users, BarChart3, ChevronRight, CheckCircle2 } from "lucide-react";

const slides = [
  {
    icon: TrendingUp,
    iconBg: "bg-[#0073B9]",
    title: "Welcome to Ramsey Invest",
    subtitle: "Your money, growing smarter every day",
    body: "Join thousands of people who have transformed their financial future through smart investing. Our platform has helped investors grow their portfolios by an average of 12% annually — and you don't need any trading experience to get started.",
  },
  {
    icon: Users,
    iconBg: "bg-[#003561]",
    title: "Managed by Experts",
    subtitle: "You don't need to be a trading expert",
    body: "Our team of certified financial advisors and SmartVestor Pros manages your investments using proven strategies built on Ramsey principles. Just deposit your funds, sit back, and watch your money grow. We handle all the research, analysis, and trading for you.",
  },
  {
    icon: Shield,
    iconBg: "bg-green-600",
    title: "Safe & Trusted",
    subtitle: "Your investments are protected",
    body: "Your account is secured with bank-level encryption and SIPC protection up to $500,000. We follow strict compliance standards and never take unnecessary risks with your money. Over 50,000 investors trust Ramsey Invest with their financial future.",
  },
  {
    icon: BarChart3,
    iconBg: "bg-[#FCD214] text-[#003561]",
    title: "Ready to Start?",
    subtitle: "Your dashboard is all set up",
    body: "Explore your personalized dashboard with real-time crypto and stock prices, deposit funds to start investing, and track your portfolio growth over time. The proven Ramsey approach to wealth building starts right here.",
  },
];

export default function OnboardingModal({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState(0);
  const current = slides[step];
  const Icon = current.icon;
  const isLast = step === slides.length - 1;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-300">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center z-10 transition-colors"
        >
          <X className="w-4 h-4 text-gray-500" />
        </button>

        <div className="bg-gradient-to-br from-[#003561] to-[#0073B9] p-8 pb-12 text-center">
          <div className={`w-16 h-16 ${current.iconBg} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg`}>
            <Icon className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-1">{current.title}</h2>
          <p className="text-blue-200 text-sm">{current.subtitle}</p>
        </div>

        <div className="px-8 pt-6 pb-4">
          <p className="text-gray-600 leading-relaxed text-[15px]">{current.body}</p>
        </div>

        <div className="flex items-center justify-between px-8 pb-6 pt-2">
          <div className="flex gap-1.5">
            {slides.map((_, i) => (
              <div
                key={i}
                className={`h-1.5 rounded-full transition-all ${
                  i === step ? "w-6 bg-[#0073B9]" : "w-1.5 bg-gray-200"
                }`}
              />
            ))}
          </div>

          <div className="flex gap-2">
            {step > 0 && (
              <button
                onClick={() => setStep(step - 1)}
                className="px-4 py-2.5 text-sm font-medium text-gray-500 hover:text-gray-700 transition-colors"
              >
                Back
              </button>
            )}
            <button
              onClick={() => {
                if (isLast) {
                  onClose();
                } else {
                  setStep(step + 1);
                }
              }}
              className="flex items-center gap-1.5 px-6 py-2.5 bg-[#0073B9] hover:bg-[#005a94] text-white rounded-xl text-sm font-bold transition-colors"
            >
              {isLast ? (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  Go to Dashboard
                </>
              ) : (
                <>
                  Next
                  <ChevronRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
