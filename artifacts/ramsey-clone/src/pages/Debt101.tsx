import { Link } from "wouter";
import { ChevronRight } from "lucide-react";

export default function Debt101() {
  const debtTypes = [
    { name: "General Debt", icon: "https://cdn.ramseysolutions.net/media/landing-pages/topic-hub-debt-specific/icon-debt-ball-and-chain.svg" },
    { name: "Credit Card", icon: "https://cdn.ramseysolutions.net/media/landing-pages/topic-hub-debt-specific/icon-debt-credit-card.svg" },
    { name: "Car Loan", icon: "https://cdn.ramseysolutions.net/media/landing-pages/topic-hub-debt-specific/icon-debt-car.svg" },
    { name: "Student Loan", icon: "https://cdn.ramseysolutions.net/media/landing-pages/topic-hub-debt-specific/icon-debt-student-loan.svg" },
    { name: "Medical", icon: "https://cdn.ramseysolutions.net/media/landing-pages/topic-hub-debt-specific/icon-debt-medical.svg" },
  ];

  return (
    <div className="w-full">
      {/* Hero */}
      <section className="bg-gradient-to-b from-primary to-[#005a9c] py-20 text-center relative px-4">
        <div className="max-w-4xl mx-auto">
          <img src="https://cdn.ramseysolutions.net/daveramsey.com/media/landing-pages/debt-101/debt.svg" alt="Debt" className="h-20 mx-auto mb-8 invert brightness-0" />
          <h1 className="text-4xl md:text-5xl font-black text-white italic mb-6 leading-tight">
            "Debt is the biggest thief of your financial future."
          </h1>
          <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
            It’s impossible to build wealth when you’re in a cycle of never-ending debt. Find out how to manage your money the right way and get started on the life you were meant to live.
          </p>
          <button className="bg-accent text-primary font-bold text-lg px-8 py-4 rounded-xl hover:bg-yellow-300 transition-colors shadow-lg">
            Pay Off Debt Now
          </button>
        </div>
      </section>

      {/* Nav Icons */}
      <section className="bg-white border-b border-border shadow-sm relative z-10 -mt-6 mx-4 rounded-xl max-w-6xl sm:mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-5 divide-x divide-y md:divide-y-0 divide-border rounded-xl overflow-hidden">
          {debtTypes.map((debt, i) => (
            <a key={i} href={`#${debt.name.toLowerCase().replace(" ", "-")}`} className="p-6 flex flex-col items-center justify-center hover:bg-gray-50 transition-colors group cursor-pointer text-center">
              <img src={debt.icon} alt={debt.name} className="h-12 w-12 mb-3 group-hover:-translate-y-1 transition-transform" />
              <span className="font-bold text-primary text-sm">{debt.name}</span>
            </a>
          ))}
        </div>
      </section>

      {/* Ask Ramsey Bar */}
      <section className="bg-gray-100 py-12 mt-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-black italic text-primary mb-2">Ask Ramsey a question about debt.</h2>
          <p className="text-muted-foreground mb-6">Powered by AI—built on Ramsey principles.</p>
          <div className="flex shadow-md rounded-full bg-white overflow-hidden border border-border p-1 max-w-2xl mx-auto">
            <input type="text" placeholder="e.g., Should I pay off my car or credit card first?" className="flex-grow px-6 py-3 bg-transparent outline-none text-primary" />
            <button className="bg-primary text-white font-bold px-6 py-3 rounded-full hover:bg-secondary transition-colors">Ask</button>
          </div>
        </div>
      </section>

      {/* General Debt Section Example */}
      <section id="general-debt" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl font-bold text-primary mb-8">General Debt</h2>
            
            <div className="mb-10">
              <div className="flex items-center mb-3">
                <img src="https://cdn.ramseysolutions.net/daveramsey.com/media/landing-pages/topic-hub-debt-specific/icon-article.svg" alt="Article" className="w-8 h-8 mr-3" />
                <h3 className="text-2xl font-bold text-primary">Your Debt Guide</h3>
              </div>
              <p className="text-lg text-muted-foreground mb-4">Find out how to crush your debt fast, just like a snowball rolling downhill.</p>
              <a href="#" className="text-secondary font-bold hover:underline inline-flex items-center">
                How to Get Out of Debt With the Debt Snowball Method <ChevronRight className="w-4 h-4 ml-1" />
              </a>
            </div>

            <div>
              <div className="flex items-center mb-3">
                <img src="https://cdn.ramseysolutions.net/daveramsey.com/media/landing-pages/topic-hub-debt-specific/icon-tools.svg" alt="Tool" className="w-8 h-8 mr-3" />
                <h3 className="text-2xl font-bold text-primary">The Budget Calculator</h3>
              </div>
              <p className="text-lg text-muted-foreground mb-4">Enter your monthly take-home pay and boom—the calculator will use your income to fill out all the expense categories automatically.</p>
              <a href="#" className="text-secondary font-bold hover:underline inline-flex items-center">
                Go to the Budget Calculator <ChevronRight className="w-4 h-4 ml-1" />
              </a>
            </div>
          </div>
          
          <div>
            <img src="https://cdn.ramseysolutions.net/daveramsey.com/media/landing-pages/topic-hub-debt-specific/general-debt-image.png" alt="General Debt" className="w-full rounded-2xl shadow-xl" />
          </div>
        </div>
      </section>
    </div>
  );
}
