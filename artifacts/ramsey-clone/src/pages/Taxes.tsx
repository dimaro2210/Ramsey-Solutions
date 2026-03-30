import { Link } from "wouter";
import { ChevronRight, FileText, Calculator, Users, ShieldCheck } from "lucide-react";

export default function Taxes() {
  return (
    <div className="w-full">
      <div className="bg-primary text-white text-center py-3 px-4 text-sm font-bold tracking-wide">
        File Federal Taxes for $39.95 Through 4/10{" "}
        <Link href="/taxes" className="underline ml-2">Get Started</Link>
      </div>

      <section className="bg-[#f2f8fc] pt-16 pb-24 border-b border-border">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-7xl font-black text-primary italic mb-6">
            Taxes — File the Ramsey Way
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-10">
            Learn the best way to file your taxes with confidence — and keep more money in your pocket — with trusted guides, services and tools.
          </p>
          <Link href="/trusted" className="bg-accent text-primary font-bold text-lg px-8 py-4 rounded-xl hover:bg-yellow-300 transition-colors shadow-lg inline-block">
            Start Filing Now
          </Link>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-primary mb-4">Keep More. Grow More. Live More.</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Every year, Americans hand over billions more than they owe in taxes — money that could be paying off debt, building an emergency fund, or growing retirement savings.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8 bg-gray-50 rounded-2xl border border-gray-100">
              <div className="text-6xl font-black text-secondary mb-4">$3,000</div>
              <p className="text-lg text-primary font-medium">The average amount people <strong>overpay on taxes</strong> throughout the year.</p>
            </div>
            <div className="text-center p-8 bg-gray-50 rounded-2xl border border-gray-100">
              <div className="text-6xl font-black text-secondary mb-4">$250</div>
              <p className="text-lg text-primary font-medium">The amount you could have <strong>back in your budget</strong> each month if you fix your withholdings.</p>
            </div>
            <div className="text-center p-8 bg-gray-50 rounded-2xl border border-gray-100">
              <div className="text-6xl font-black text-secondary mb-4">$54,250</div>
              <p className="text-lg text-primary font-medium">The amount that $250 could <strong>grow to in 10 years</strong> when invested every month.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-primary text-center mb-16">File Right. File Smart. File Now.</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: <FileText className="w-10 h-10" />, title: "File Your Taxes", desc: "File federal and state taxes online with confidence. Simple, fast, and affordable.", link: "/taxes" },
              { icon: <Calculator className="w-10 h-10" />, title: "Tax Calculator", desc: "Estimate your federal tax refund or what you might owe. Adjust your withholdings to keep more of your money.", link: "/taxes" },
              { icon: <Users className="w-10 h-10" />, title: "Find a Tax Pro", desc: "Need help? Connect with a RamseyTrusted tax advisor who treats your money like it matters.", link: "/trusted" },
              { icon: <ShieldCheck className="w-10 h-10" />, title: "Tax Resources", desc: "Learn everything from how to file for free to understanding deductions, credits, and withholdings.", link: "/taxes" },
            ].map((card, i) => (
              <Link key={i} href={card.link} className="bg-white p-8 rounded-2xl shadow-md border border-gray-100 hover:shadow-xl hover:border-secondary/50 transition-all group flex flex-col">
                <div className="text-secondary mb-4 group-hover:scale-110 transition-transform">{card.icon}</div>
                <h3 className="text-xl font-bold text-primary mb-3">{card.title}</h3>
                <p className="text-muted-foreground flex-grow">{card.desc}</p>
                <span className="text-secondary font-bold mt-4 flex items-center group-hover:translate-x-1 transition-transform">
                  Learn More <ChevronRight className="w-4 h-4 ml-1" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl font-bold text-primary mb-6">Don't Overpay Uncle Sam</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Most people either get a huge refund (meaning they gave the government a free loan) or they owe a bunch at tax time. Both stink. With the right plan, you can keep more of your money all year long.
            </p>
            <ul className="space-y-4 mb-8">
              {[
                "Adjust your withholdings to keep more of each paycheck",
                "Know which deductions and credits you qualify for",
                "File with confidence using Ramsey-approved services"
              ].map((item, i) => (
                <li key={i} className="flex items-start text-lg text-primary">
                  <div className="w-6 h-6 rounded-full bg-secondary text-white flex items-center justify-center text-sm font-bold mr-3 mt-1 flex-shrink-0">{i + 1}</div>
                  {item}
                </li>
              ))}
            </ul>
            <Link href="/trusted" className="bg-accent text-primary font-bold text-lg px-8 py-4 rounded-xl hover:bg-yellow-300 transition-colors shadow-lg inline-block">
              Find a Tax Pro
            </Link>
          </div>
          <div className="bg-gradient-to-br from-primary to-[#005a9c] rounded-2xl p-12 text-white text-center">
            <h3 className="text-3xl font-bold mb-4">Tax Filing Checklist</h3>
            <ul className="text-left space-y-4 text-lg">
              {[
                "W-2s from all employers",
                "1099s for freelance/contract work",
                "Mortgage interest statement (1098)",
                "Charitable donation receipts",
                "Student loan interest (1098-E)",
                "Health insurance (1095-A/B/C)",
              ].map((item, i) => (
                <li key={i} className="flex items-center">
                  <span className="w-2 h-2 bg-accent rounded-full mr-3 flex-shrink-0"></span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="py-16 bg-primary text-white text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-4xl font-bold mb-6">Ready to File Your Taxes?</h2>
          <p className="text-xl text-blue-100 mb-10">File fast, file right, and keep more of your hard-earned money.</p>
          <Link href="/trusted" className="inline-block bg-accent text-primary font-bold text-lg px-10 py-4 rounded-xl hover:bg-yellow-300 transition-colors shadow-lg">
            Get Started Now
          </Link>
        </div>
      </section>
    </div>
  );
}
