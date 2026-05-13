import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  TrendingUp, Shield, BarChart3, DollarSign, Zap, Lock,
  ChevronDown, ChevronRight, Globe, Layers, Clock, Users,
  Award, CheckCircle2, ArrowRight, Smartphone, PieChart,
  LineChart, Target, Wallet, BadgeCheck
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" }
  })
};

const stats = [
  { value: "$2.4B+", label: "Assets Under Management", icon: DollarSign },
  { value: "150K+", label: "Active Investors", icon: Users },
  { value: "99.9%", label: "Platform Uptime", icon: Zap },
  { value: "24/7", label: "Market Access", icon: Globe },
];

const features = [
  { icon: BarChart3, title: "Real-Time Market Data", desc: "Access live stock prices, crypto charts, and market indicators updated every second. Make informed decisions with institutional-grade data." },
  { icon: Shield, title: "Bank-Grade Security", desc: "256-bit AES encryption, two-factor authentication, and cold storage for digital assets. Your investments are protected around the clock." },
  { icon: PieChart, title: "Diversified Portfolios", desc: "Build balanced portfolios across stocks, crypto, ETFs, and bonds. Our smart allocation tools help minimize risk while maximizing returns." },
  { icon: Zap, title: "Instant Execution", desc: "Lightning-fast order execution with zero slippage. Place market, limit, and stop orders with professional-grade precision." },
  { icon: LineChart, title: "Advanced Analytics", desc: "Technical indicators, AI-powered insights, and performance tracking dashboards. Understand your portfolio at a glance." },
  { icon: Lock, title: "Regulated & Compliant", desc: "Fully licensed and regulated. Your funds are held in segregated accounts with FDIC-insured banking partners." },
];

const howItWorks = [
  { step: "01", title: "Create Your Account", desc: "Sign up in under 2 minutes. No minimum deposit required to get started. Verify your identity and you're ready to invest." },
  { step: "02", title: "Fund Your Account", desc: "Deposit funds securely via bank transfer, crypto wallet, or wire transfer. Multiple funding options for your convenience." },
  { step: "03", title: "Start Investing", desc: "Browse live markets, analyze trends, and place your first trade. Our intuitive platform makes investing accessible to everyone." },
  { step: "04", title: "Grow Your Wealth", desc: "Track your portfolio performance in real-time. Reinvest profits, diversify holdings, and watch your wealth compound over time." },
];

const assetClasses = [
  { icon: TrendingUp, name: "US Stocks", desc: "Apple, Tesla, Amazon, and 5,000+ top companies", color: "bg-blue-50 text-blue-600 border-blue-100" },
  { icon: Globe, name: "Global Markets", desc: "Access international exchanges across 30+ countries", color: "bg-emerald-50 text-emerald-600 border-emerald-100" },
  { icon: Layers, name: "Cryptocurrency", desc: "Bitcoin, Ethereum, Solana, and 100+ digital assets", color: "bg-orange-50 text-orange-600 border-orange-100" },
  { icon: PieChart, name: "ETFs & Index Funds", desc: "Low-cost diversified funds tracking major indices", color: "bg-purple-50 text-purple-600 border-purple-100" },
];

const faqs = [
  { q: "What is the minimum investment amount?", a: "You can start investing with as little as $1000. There's no maximum limit, and you can add funds to your account at any time." },
  { q: "How are my investments protected?", a: "All funds are held in segregated accounts with FDIC-insured banking partners. Digital assets are stored in institutional-grade cold storage with multi-signature security." },
  { q: "What fees do you charge?", a: "We offer competitive, transparent pricing with no hidden fees. Stock trades have zero commission, and crypto trades carry a small 0.5% spread. No account maintenance fees." },
  { q: "Can I withdraw my funds at any time?", a: "Yes, you have full control over your funds. Withdrawals are processed within 1-3 business days depending on your preferred method." },
  { q: "Do I need trading experience?", a: "Not at all. Our platform is designed for both beginners and experienced traders. We provide educational resources, market insights, and an intuitive interface to help you get started." },
  { q: "Is my personal information secure?", a: "Absolutely. We use 256-bit AES encryption for all data transmission, and your personal information is stored on secure, SOC 2 certified servers." },
];

const testimonials = [
  { name: "Michael R.", role: "Investor since 2023", quote: "I've tried several platforms, but Ramsey Invest stands out. The interface is clean, execution is fast, and the analytics tools are genuinely useful.", avatar: "MR" },
  { name: "Sarah K.", role: "First-time Investor", quote: "As someone who knew nothing about investing, this platform made it incredibly easy to start. I've grown my portfolio by 23% in my first year.", avatar: "SK" },
  { name: "David L.", role: "Active Trader", quote: "The real-time data and instant execution are exactly what I need. I moved all my trading here and haven't looked back.", avatar: "DL" },
];

export default function Investing() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="w-full">

      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#001934] via-[#0073B9] to-[#005a94] text-white">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-[#FCD214]/5 blur-3xl" />
          <div className="absolute bottom-[-30%] left-[-15%] w-[800px] h-[800px] rounded-full bg-[#0073B9]/20 blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border border-white/5" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-white/5" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-20 pb-24 md:pt-28 md:pb-32">
          <div className="text-center max-w-4xl mx-auto">
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/10 rounded-full px-5 py-2 mb-8">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-sm font-semibold text-white/90">Markets are open — Start investing today</span>
            </motion.div>

            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-7xl font-black mb-6 leading-[1.1] tracking-tight">
              Invest Smarter.{" "}
              <span className="text-[#FCD214]">Grow Faster.</span>
            </motion.h1>

            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto mb-10 leading-relaxed">
              Access global markets, trade stocks and crypto, and build long-term wealth with Ramsey's trusted investment platform. Professional tools, zero complexity.
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/sign-up" className="w-full sm:w-auto bg-[#FCD214] hover:bg-yellow-300 text-[#0073B9] font-bold text-lg px-10 py-4 rounded-2xl transition-all shadow-lg shadow-yellow-500/20 hover:shadow-xl hover:scale-[1.02] flex items-center justify-center gap-2">
                Open Free Account <ArrowRight className="w-5 h-5" />
              </Link>
              <Link to="/retirement/smartvestor" className="w-full sm:w-auto bg-white/10 hover:bg-white/20 backdrop-blur text-white font-bold text-lg px-10 py-4 rounded-2xl transition-all border border-white/10 flex items-center justify-center gap-2">
                Learn More
              </Link>
            </motion.div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 0.6 }}
              className="flex items-center justify-center gap-6 mt-10 text-sm text-white/50">
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-green-400" /> No minimums</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-green-400" /> Zero commission</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-green-400" /> FDIC insured</span>
            </motion.div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-gray-50 to-transparent" />
      </section>

      {/* STATS BAR */}
      <section className="relative z-10 -mt-10 px-4">
        <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-xl border border-gray-100 p-8 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {stats.map((s, i) => (
            <motion.div key={i} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
              className="text-center">
              <div className="w-12 h-12 rounded-2xl bg-[#0073B9]/10 flex items-center justify-center mx-auto mb-3">
                <s.icon className="w-6 h-6 text-[#0073B9]" />
              </div>
              <p className="text-2xl md:text-3xl font-black text-[#0073B9]">{s.value}</p>
              <p className="text-xs text-gray-400 font-medium mt-1">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* WHY INVEST WITH US */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-sm font-bold text-[#FCD214] bg-[#FCD214]/10 inline-block px-4 py-1.5 rounded-full mb-4 uppercase tracking-wider">Platform Features</p>
            <h2 className="text-3xl md:text-5xl font-black text-[#0073B9] mb-4">Why Invest With Ramsey?</h2>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto">Everything you need to invest with confidence — from real-time data to institutional-grade security.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <motion.div key={i} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
                className="bg-white rounded-2xl p-8 border border-gray-100 hover:border-[#0073B9]/20 hover:shadow-xl transition-all group">
                <div className="w-14 h-14 rounded-2xl bg-[#0073B9]/10 flex items-center justify-center mb-5 group-hover:bg-[#0073B9] group-hover:scale-110 transition-all">
                  <f.icon className="w-7 h-7 text-[#0073B9] group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-xl font-bold text-[#0073B9] mb-3">{f.title}</h3>
                <p className="text-gray-500 leading-relaxed text-sm">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-sm font-bold text-[#FCD214] bg-[#FCD214]/10 inline-block px-4 py-1.5 rounded-full mb-4 uppercase tracking-wider">Getting Started</p>
            <h2 className="text-3xl md:text-5xl font-black text-[#0073B9] mb-4">How It Works</h2>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto">From sign-up to your first trade in four simple steps.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {howItWorks.map((item, i) => (
              <motion.div key={i} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
                className="relative text-center group">
                {i < howItWorks.length - 1 && (
                  <div className="hidden lg:block absolute top-12 left-[60%] w-[80%] h-[2px] bg-gradient-to-r from-[#0073B9]/20 to-transparent" />
                )}
                <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-[#0073B9] to-[#005a94] flex items-center justify-center mx-auto mb-6 shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-transform">
                  <span className="text-3xl font-black text-[#FCD214]">{item.step}</span>
                </div>
                <h3 className="text-lg font-bold text-[#0073B9] mb-3">{item.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ASSET CLASSES */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-sm font-bold text-[#FCD214] bg-[#FCD214]/10 inline-block px-4 py-1.5 rounded-full mb-4 uppercase tracking-wider">Markets</p>
            <h2 className="text-3xl md:text-5xl font-black text-[#0073B9] mb-4">Trade Across Multiple Markets</h2>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto">Diversify your portfolio with access to the world's most popular asset classes.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {assetClasses.map((a, i) => (
              <motion.div key={i} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
                className="bg-white rounded-2xl p-8 border border-gray-100 text-center hover:shadow-xl hover:-translate-y-1 transition-all">
                <div className={`w-16 h-16 rounded-2xl ${a.color} border flex items-center justify-center mx-auto mb-5`}>
                  <a.icon className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-[#0073B9] mb-2">{a.name}</h3>
                <p className="text-sm text-gray-500">{a.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-24 bg-gradient-to-br from-[#001934] via-[#0073B9] to-[#005a94] text-white relative overflow-hidden">
        <div className="absolute inset-0"><div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-[#FCD214]/5 blur-3xl" /></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <p className="text-sm font-bold text-[#FCD214] uppercase tracking-wider mb-4">Testimonials</p>
            <h2 className="text-3xl md:text-5xl font-black mb-4">Trusted by Thousands of Investors</h2>
            <p className="text-lg text-white/60 max-w-2xl mx-auto">See what our community has to say about their investing experience.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <motion.div key={i} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:bg-white/15 transition-colors">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-full bg-[#FCD214] flex items-center justify-center font-black text-[#0073B9] text-lg">{t.avatar}</div>
                  <div>
                    <p className="font-bold text-white">{t.name}</p>
                    <p className="text-xs text-white/50">{t.role}</p>
                  </div>
                </div>
                <p className="text-white/80 leading-relaxed italic">"{t.quote}"</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECURITY */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-sm font-bold text-[#FCD214] bg-[#FCD214]/10 inline-block px-4 py-1.5 rounded-full mb-4 uppercase tracking-wider">Security First</p>
              <h2 className="text-3xl md:text-4xl font-black text-[#0073B9] mb-6">Your Security Is Our Top Priority</h2>
              <p className="text-gray-500 mb-8 leading-relaxed">We employ the same security measures used by the world's largest financial institutions to ensure your assets and personal data remain protected at all times.</p>
              <div className="space-y-5">
                {[
                  { icon: Lock, text: "256-bit AES encryption for all data" },
                  { icon: Shield, text: "Two-factor authentication (2FA)" },
                  { icon: BadgeCheck, text: "SOC 2 Type II certified infrastructure" },
                  { icon: Wallet, text: "Funds held in segregated FDIC-insured accounts" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center flex-shrink-0 border border-green-100">
                      <item.icon className="w-5 h-5 text-green-600" />
                    </div>
                    <p className="font-semibold text-gray-700">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-center">
              <div className="relative">
                <div className="w-72 h-72 md:w-80 md:h-80 rounded-3xl bg-gradient-to-br from-[#0073B9] to-[#001934] flex items-center justify-center shadow-2xl">
                  <Shield className="w-32 h-32 text-[#FCD214]/30" />
                </div>
                <div className="absolute -top-4 -right-4 w-20 h-20 bg-[#FCD214] rounded-2xl flex items-center justify-center shadow-lg">
                  <Lock className="w-8 h-8 text-[#0073B9]" />
                </div>
                <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-lg p-4 border border-gray-100">
                  <p className="text-xs font-bold text-green-600 flex items-center gap-1"><CheckCircle2 className="w-4 h-4" /> Fully Secured</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <p className="text-sm font-bold text-[#FCD214] bg-[#FCD214]/10 inline-block px-4 py-1.5 rounded-full mb-4 uppercase tracking-wider">FAQ</p>
            <h2 className="text-3xl md:text-5xl font-black text-[#0073B9] mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-gray-500">Everything you need to know before you start investing.</p>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:border-[#0073B9]/20 transition-colors">
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-6 text-left">
                  <span className="font-bold text-[#0073B9] pr-4">{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 text-[#0073B9] flex-shrink-0 transition-transform ${openFaq === i ? "rotate-180" : ""}`} />
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-6 -mt-2">
                    <p className="text-gray-500 leading-relaxed">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-24 bg-gradient-to-br from-[#0073B9] to-[#001934] text-white relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[#FCD214]/5 blur-3xl" />
        </div>
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-black mb-6">Ready to Start Building Wealth?</h2>
          <p className="text-lg text-white/60 max-w-2xl mx-auto mb-10 leading-relaxed">
            Join over 150,000 investors who trust Ramsey Invest. Open your free account today and take the first step toward financial freedom.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/sign-up" className="w-full sm:w-auto bg-[#FCD214] hover:bg-yellow-300 text-[#0073B9] font-bold text-lg px-12 py-4 rounded-2xl transition-all shadow-lg shadow-yellow-500/20 hover:shadow-xl hover:scale-[1.02] flex items-center justify-center gap-2">
              Create Free Account <ArrowRight className="w-5 h-5" />
            </Link>
            <Link to="/sign-in" className="w-full sm:w-auto bg-white/10 hover:bg-white/20 backdrop-blur text-white font-bold text-lg px-12 py-4 rounded-2xl transition-all border border-white/10 flex items-center justify-center">
              Sign In
            </Link>
          </div>
          <p className="text-xs text-white/30 mt-8">No minimum deposit • Zero commission on stocks • Cancel anytime</p>
        </div>
      </section>

    </div>
  );
}
