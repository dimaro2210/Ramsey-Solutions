import { Check } from "lucide-react";

export default function EveryDollar() {
  return (
    <div className="w-full">
      <section className="bg-[#f0faeb] pt-24 pb-32 overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
          <div className="z-10">
            <img src="https://cdn.ramseysolutions.net/daveramsey.com/media/everydollar/2022/microsite/logo-icon.svg" alt="EveryDollar" className="h-12 mb-8" />
            
            <h1 className="text-5xl md:text-7xl font-black text-primary mb-6 leading-tight tracking-tight">
              Find $3,015 in just 15 minutes.*
            </h1>
            
            <p className="text-xl text-primary font-medium mb-8">
              EveryDollar is the budgeting app that helps you find more margin and put it to work to beat debt and build wealth.
            </p>

            <ul className="space-y-4 mb-10">
              {[
                "Plan your money with easy zero-based budgeting",
                "Track your spending and expenses quickly",
                "Manage your money better with the budgeting app made for real life"
              ].map((item, i) => (
                <li key={i} className="flex items-start">
                  <div className="bg-[#8ec63f] rounded-full p-1 mr-4 mt-1 flex-shrink-0">
                    <Check className="w-4 h-4 text-white" strokeWidth={3} />
                  </div>
                  <span className="text-lg text-primary">{item}</span>
                </li>
              ))}
            </ul>

            <a href="https://www.everydollar.com" target="_blank" rel="noopener noreferrer" className="bg-[#8ec63f] text-white font-bold text-xl px-10 py-5 rounded-full hover:bg-[#7ab033] hover:shadow-xl transition-all inline-block hover:-translate-y-1">
              Start for Free
            </a>
            <p className="text-sm text-muted-foreground mt-4 italic">
              *Based on average new users. Your results may vary.
            </p>
          </div>

          <div className="relative z-10 flex justify-center lg:justify-end">
            <div className="bg-white rounded-[2.5rem] shadow-2xl border-8 border-gray-200 p-4 max-w-[280px] w-full">
              <div className="bg-[#f0faeb] rounded-[2rem] p-6 space-y-4">
                <div className="text-center">
                  <p className="text-xs text-muted-foreground font-medium">MARCH 2026</p>
                  <p className="text-2xl font-black text-primary">$0 left to budget</p>
                </div>
                <div className="space-y-3">
                  {[
                    { cat: "Housing", amt: "$1,500", pct: 85 },
                    { cat: "Food", amt: "$600", pct: 70 },
                    { cat: "Transportation", amt: "$450", pct: 60 },
                    { cat: "Savings", amt: "$500", pct: 45 },
                    { cat: "Giving", amt: "$400", pct: 35 },
                  ].map((item, i) => (
                    <div key={i} className="bg-white rounded-xl p-3 shadow-sm">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="font-semibold text-primary">{item.cat}</span>
                        <span className="font-bold text-primary">{item.amt}</span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-2">
                        <div className="bg-[#8ec63f] h-2 rounded-full" style={{ width: `${item.pct}%` }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative background shapes */}
        <div className="absolute top-0 right-0 -mr-40 -mt-40 w-96 h-96 bg-[#8ec63f]/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -ml-40 -mb-40 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-primary mb-6">How EveryDollar Works</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-16">Set up your budget in minutes with a simple, drag-and-drop interface.</p>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: "1", title: "Set Up Your Budget", desc: "Add your income and planned expenses. EveryDollar helps you plan for every dollar before the month begins." },
              { step: "2", title: "Track Your Spending", desc: "Drag and drop transactions into your budget categories. See exactly where your money is going in real time." },
              { step: "3", title: "Hit Your Goals", desc: "Watch your progress as you pay off debt, save for emergencies, and build wealth month after month." }
            ].map((item, i) => (
              <div key={i} className="bg-[#f0faeb] p-10 rounded-2xl border border-[#8ec63f]/20">
                <div className="w-16 h-16 bg-[#8ec63f] text-white rounded-full flex items-center justify-center text-2xl font-black mx-auto mb-6">{item.step}</div>
                <h3 className="text-2xl font-bold text-primary mb-4">{item.title}</h3>
                <p className="text-muted-foreground text-lg">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#f0faeb]">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-primary mb-6">Start Budgeting for Free</h2>
          <p className="text-xl text-muted-foreground mb-10">Join over 10 million people who have used EveryDollar to take control of their money.</p>
          <a href="https://www.everydollar.com" target="_blank" rel="noopener noreferrer" className="bg-[#8ec63f] text-white font-bold text-xl px-12 py-5 rounded-full hover:bg-[#7ab033] hover:shadow-xl transition-all inline-block hover:-translate-y-1">
            Get Started Free
          </a>
        </div>
      </section>
    </div>
  );
}
