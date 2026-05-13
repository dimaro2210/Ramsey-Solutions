import { TrendingUp, ShieldCheck, Zap, ArrowRight, Wallet, Target, Activity, CheckCircle2, ChevronRight, BarChart3, Users, Clock, Globe, Shield } from "lucide-react";
import { Link } from "react-router-dom";

export default function InvestmentGuide() {
  return (
    <div className="max-w-5xl mx-auto pb-20 animate-in fade-in duration-700">
      
      {/* Hero Section */}
      <div className="relative rounded-[40px] overflow-hidden bg-gradient-to-br from-[#0073B9] to-[#004a7c] p-8 md:p-16 mb-12 shadow-2xl">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-white/5 skew-x-12 translate-x-1/2"></div>
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-bold uppercase tracking-widest mb-6">
            <Zap className="w-4 h-4 text-[#FCD214]" />
            Managed Excellence
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white leading-tight mb-6">
            Your Path to Passive <br />
            <span className="text-[#FCD214]">Wealth Starts Here.</span>
          </h1>
          <p className="text-lg text-white/80 leading-relaxed mb-8">
            Stop worrying about market volatility. Our elite trading team uses institutional-grade strategies to grow your capital while you focus on living your life.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link to="/dashboard/deposit" className="px-8 py-4 bg-[#FCD214] text-[#0073B9] rounded-2xl font-black text-lg hover:scale-105 transition-transform flex items-center gap-2">
              Start Investing Now <ArrowRight className="w-5 h-5" />
            </Link>
            <button className="px-8 py-4 bg-white/10 backdrop-blur-md text-white border border-white/20 rounded-2xl font-bold hover:bg-white/20 transition-all">
              Watch Video Guide
            </button>
          </div>
        </div>
      </div>

      {/* The expert advantage */}
      <div className="grid md:grid-cols-3 gap-8 mb-20">
        {[
          { 
            icon: Users, 
            title: "Elite Expertise", 
            desc: "Our traders have decades of collective experience at top financial institutions, specializing in both crypto and stock market cycles.",
            color: "text-blue-600 bg-blue-50"
          },
          { 
            icon: Target, 
            title: "Hands-Free Strategy", 
            desc: "We handle everything—from technical analysis to risk management. You simply fund your account and watch the results.",
            color: "text-amber-600 bg-amber-50"
          },
          { 
            icon: Shield, 
            title: "Safety First", 
            desc: "We prioritize capital preservation above all else. Our multi-layered risk mitigation ensures your principal is always protected.",
            color: "text-emerald-600 bg-emerald-50"
          }
        ].map((item, i) => (
          <div key={i} className="bg-white rounded-[32px] p-8 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${item.color}`}>
              <item.icon className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-black text-[#0073B9] mb-3">{item.title}</h3>
            <p className="text-gray-500 leading-relaxed text-sm">{item.desc}</p>
          </div>
        ))}
      </div>

      {/* How it works - Visual Timeline */}
      <div className="mb-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-black text-[#0073B9] mb-4">The 3-Step Success Path</h2>
          <p className="text-gray-500 max-w-xl mx-auto">We've simplified high-level investing into a process that anyone can follow. No experience required.</p>
        </div>

        <div className="relative space-y-12">
          {/* Connecting line */}
          <div className="absolute left-8 top-8 bottom-8 w-1 bg-gray-100 rounded-full hidden md:block"></div>

          {[
            {
              step: "01",
              title: "Simple Account Funding",
              desc: "Deposit BTC, ETH, USDT, or SOL into your secure dashboard wallet. Our automated system verifies your funds instantly, making them ready for allocation.",
              icon: Wallet,
              bg: "bg-blue-600"
            },
            {
              step: "02",
              title: "Expert Portfolio Allocation",
              desc: "Our trading engine and human experts allocate your capital into high-probability trades. We diversify across multiple asset classes to maximize returns while minimizing risk.",
              icon: Activity,
              bg: "bg-[#0073B9]"
            },
            {
              step: "03",
              title: "Compound Growth & Withdrawal",
              desc: "Profits are credited to your balance daily. You can choose to reinvest to accelerate your compounding growth or withdraw your earnings to your external wallet at any time.",
              icon: TrendingUp,
              bg: "bg-emerald-600"
            }
          ].map((item, i) => (
            <div key={i} className="relative flex flex-col md:flex-row gap-8 items-start">
              <div className={`w-16 h-16 rounded-full ${item.bg} text-white flex items-center justify-center font-black text-xl z-10 shrink-0 shadow-lg`}>
                {item.step}
              </div>
              <div className="bg-white rounded-[32px] p-8 border border-gray-100 shadow-sm flex-1">
                <div className="flex items-center gap-4 mb-4">
                  <item.icon className="w-6 h-6 text-[#0073B9]" />
                  <h3 className="text-2xl font-black text-[#0073B9]">{item.title}</h3>
                </div>
                <p className="text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Trust & Transparency */}
      <div className="bg-gray-50 rounded-[40px] p-8 md:p-16 mb-20 border border-gray-200">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-black text-[#0073B9] mb-6">Transparency is our <br /><span className="text-blue-600">Core Commitment</span></h2>
            <div className="space-y-6">
              {[
                "Real-time P&L tracking from your dashboard",
                "24/7 access to your full trade history",
                "Instant withdrawal requests with no lock-up periods",
                "Dedicated institutional-grade support team"
              ].map((text, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 shrink-0">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <span className="font-bold text-gray-700">{text}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 text-center">
              <p className="text-3xl font-black text-[#0073B9] mb-1">98%</p>
              <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Client Satisfaction</p>
            </div>
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 text-center">
              <p className="text-3xl font-black text-emerald-600 mb-1">15%+</p>
              <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Avg. Monthly Yield</p>
            </div>
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 text-center">
              <p className="text-3xl font-black text-blue-500 mb-1">24/7</p>
              <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Market Monitoring</p>
            </div>
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 text-center">
              <p className="text-3xl font-black text-amber-500 mb-1">0%</p>
              <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Hidden Fees</p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="mb-20">
        <h2 className="text-3xl font-black text-[#0073B9] text-center mb-12">Frequently Asked Questions</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {[
            { q: "Is my capital locked for a specific period?", a: "No. Unlike traditional hedge funds, Ramsey provides full liquidity. You can request a withdrawal at any time." },
            { q: "How much do I need to get started?", a: "You can begin your journey with as little as $1000. There is no maximum limit for investments." },
            { q: "What assets do you trade?", a: "We trade a diversified portfolio of blue-chip stocks, ETFs, and major cryptocurrencies like Bitcoin and Ethereum." },
            { q: "How are profits distributed?", a: "Profits from successful trades are credited to your balance in real-time as trades settle." }
          ].map((faq, i) => (
            <div key={i} className="bg-white p-8 rounded-[32px] border border-gray-100">
              <h4 className="font-black text-[#0073B9] mb-4 flex items-start gap-3">
                <HelpCircle className="w-5 h-5 text-blue-500 shrink-0 mt-1" />
                {faq.q}
              </h4>
              <p className="text-gray-500 text-sm leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Final CTA */}
      <div className="bg-[#0073B9] rounded-[40px] p-12 text-center text-white relative overflow-hidden shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-transparent"></div>
        <div className="relative z-10">
          <h2 className="text-3xl md:text-4xl font-black mb-6">Ready to Experience <br />Financial Freedom?</h2>
          <p className="text-white/70 max-w-xl mx-auto mb-10 text-lg">Join thousands of smart investors who trust Ramsey to grow their wealth through expert-led management.</p>
          <Link to="/dashboard/deposit" className="inline-flex items-center gap-3 px-10 py-5 bg-[#FCD214] text-[#0073B9] rounded-2xl font-black text-xl hover:scale-105 transition-transform shadow-xl">
            Fund Your Account Now <ChevronRight className="w-6 h-6" />
          </Link>
        </div>
      </div>

    </div>
  );
}

function HelpCircle({ className }: { className?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
      <path d="M12 17h.01" />
    </svg>
  );
}
