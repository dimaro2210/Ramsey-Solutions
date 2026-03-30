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

  const debtSections = [
    {
      id: "general-debt",
      title: "General Debt",
      articleTitle: "Your Debt Guide",
      articleDesc: "Find out how to crush your debt fast, just like a snowball rolling downhill.",
      articleLink: "How to Get Out of Debt With the Debt Snowball Method",
      toolTitle: "The Budget Calculator",
      toolDesc: "Enter your monthly take-home pay and boom—the calculator will use your income to fill out all the expense categories automatically.",
      toolLink: "Go to the Budget Calculator",
      img: "https://cdn.ramseysolutions.net/daveramsey.com/media/landing-pages/topic-hub-debt-specific/general-debt-image.png",
    },
    {
      id: "credit-card",
      title: "Credit Card Debt",
      articleTitle: "Credit Card Payoff Guide",
      articleDesc: "Credit card debt is one of the most common types of debt. Learn the best strategy to pay off your credit cards for good.",
      articleLink: "How to Pay Off Credit Card Debt",
      toolTitle: "Debt Snowball Calculator",
      toolDesc: "Plug in your debts and see how fast you can pay them off using the debt snowball method.",
      toolLink: "Try the Debt Snowball Calculator",
      img: "https://cdn.ramseysolutions.net/daveramsey.com/media/landing-pages/topic-hub-debt-specific/credit-card-debt-image.png",
    },
    {
      id: "car-loan",
      title: "Car Loans",
      articleTitle: "Car Payment Guide",
      articleDesc: "The average car payment is over $700. That's insane. Find out how to ditch your car payment and drive free.",
      articleLink: "Should I Pay Off My Car Early?",
      toolTitle: "Auto Loan Calculator",
      toolDesc: "Crunch the numbers on your car loan and see how much you could save by paying it off early.",
      toolLink: "Use the Auto Loan Calculator",
      img: "https://cdn.ramseysolutions.net/daveramsey.com/media/landing-pages/topic-hub-debt-specific/car-loan-image.png",
    },
    {
      id: "student-loan",
      title: "Student Loans",
      articleTitle: "Student Loan Payoff Guide",
      articleDesc: "Whether you owe $10,000 or $100,000 in student loans, here's the proven way to pay them off.",
      articleLink: "How to Pay Off Student Loans Fast",
      toolTitle: "Student Loan Calculator",
      toolDesc: "See how extra payments can help you crush your student loans faster than you think.",
      toolLink: "Try the Student Loan Calculator",
      img: "https://cdn.ramseysolutions.net/daveramsey.com/media/landing-pages/topic-hub-debt-specific/student-loan-image.png",
    },
    {
      id: "medical",
      title: "Medical Debt",
      articleTitle: "Medical Debt Guide",
      articleDesc: "Medical bills can feel overwhelming, but you can negotiate, set up payment plans, and tackle them head-on.",
      articleLink: "How to Handle Medical Debt",
      toolTitle: "Coverage Checkup",
      toolDesc: "Make sure you have the right health insurance so unexpected medical costs don't destroy your progress.",
      toolLink: "Start Your Coverage Checkup",
      img: "https://cdn.ramseysolutions.net/daveramsey.com/media/landing-pages/topic-hub-debt-specific/medical-debt-image.png",
    },
  ];

  return (
    <div className="w-full">
      <section className="bg-gradient-to-b from-primary to-[#005a9c] py-20 text-center relative px-4">
        <div className="max-w-4xl mx-auto">
          <img src="https://cdn.ramseysolutions.net/daveramsey.com/media/landing-pages/debt-101/debt.svg" alt="Debt" className="h-20 mx-auto mb-8 invert brightness-0" />
          <h1 className="text-4xl md:text-5xl font-black text-white italic mb-6 leading-tight">
            "Debt is the biggest thief of your financial future."
          </h1>
          <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
            It's impossible to build wealth when you're in a cycle of never-ending debt. Find out how to manage your money the right way and get started on the life you were meant to live.
          </p>
          <Link href="/money/everydollar" className="bg-accent text-primary font-bold text-lg px-8 py-4 rounded-xl hover:bg-yellow-300 transition-colors shadow-lg inline-block">
            Pay Off Debt Now
          </Link>
        </div>
      </section>

      <section className="bg-white border-b border-border shadow-sm relative z-10 -mt-6 mx-4 rounded-xl max-w-6xl sm:mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-5 divide-x divide-y md:divide-y-0 divide-border rounded-xl overflow-hidden">
          {debtTypes.map((debt, i) => (
            <a key={i} href={`#${debt.name.toLowerCase().replace(/\s/g, "-")}`} className="p-6 flex flex-col items-center justify-center hover:bg-gray-50 transition-colors group cursor-pointer text-center">
              <img src={debt.icon} alt={debt.name} className="h-12 w-12 mb-3 group-hover:-translate-y-1 transition-transform" />
              <span className="font-bold text-primary text-sm">{debt.name}</span>
            </a>
          ))}
        </div>
      </section>

      <section className="bg-gray-100 py-12 mt-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-black italic text-primary mb-2">Ask Ramsey a question about debt.</h2>
          <p className="text-muted-foreground mb-6">Powered by AI built on Ramsey principles.</p>
          <div className="flex shadow-md rounded-full bg-white overflow-hidden border border-border p-1 max-w-2xl mx-auto">
            <input type="text" placeholder="e.g., Should I pay off my car or credit card first?" className="flex-grow px-6 py-3 bg-transparent outline-none text-primary" />
            <button className="bg-primary text-white font-bold px-6 py-3 rounded-full hover:bg-secondary transition-colors">Ask</button>
          </div>
        </div>
      </section>

      {debtSections.map((section, idx) => (
        <section key={section.id} id={section.id} className={`py-20 ${idx % 2 === 0 ? "bg-white" : "bg-gray-50"}`}>
          <div className={`max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-16 items-center`}>
            <div className={idx % 2 !== 0 ? "md:order-2" : ""}>
              <h2 className="text-4xl font-bold text-primary mb-8">{section.title}</h2>

              <div className="mb-10">
                <div className="flex items-center mb-3">
                  <img src="https://cdn.ramseysolutions.net/daveramsey.com/media/landing-pages/topic-hub-debt-specific/icon-article.svg" alt="Article" className="w-8 h-8 mr-3" />
                  <h3 className="text-2xl font-bold text-primary">{section.articleTitle}</h3>
                </div>
                <p className="text-lg text-muted-foreground mb-4">{section.articleDesc}</p>
                <Link href="/debt/debt-101" className="text-secondary font-bold hover:underline inline-flex items-center">
                  {section.articleLink} <ChevronRight className="w-4 h-4 ml-1" />
                </Link>
              </div>

              <div>
                <div className="flex items-center mb-3">
                  <img src="https://cdn.ramseysolutions.net/daveramsey.com/media/landing-pages/topic-hub-debt-specific/icon-tools.svg" alt="Tool" className="w-8 h-8 mr-3" />
                  <h3 className="text-2xl font-bold text-primary">{section.toolTitle}</h3>
                </div>
                <p className="text-lg text-muted-foreground mb-4">{section.toolDesc}</p>
                <Link href="/money/everydollar" className="text-secondary font-bold hover:underline inline-flex items-center">
                  {section.toolLink} <ChevronRight className="w-4 h-4 ml-1" />
                </Link>
              </div>
            </div>

            <div className={idx % 2 !== 0 ? "md:order-1" : ""}>
              <img src={section.img} alt={section.title} className="w-full rounded-2xl shadow-xl" />
            </div>
          </div>
        </section>
      ))}

      <section className="py-20 bg-primary text-white text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-4xl font-bold mb-6">Ready to Get Out of Debt?</h2>
          <p className="text-xl text-blue-100 mb-10">Start your journey to financial peace with EveryDollar and the debt snowball method.</p>
          <Link href="/money/everydollar" className="inline-block bg-accent text-primary font-bold text-lg px-10 py-4 rounded-xl hover:bg-yellow-300 transition-colors shadow-lg">
            Start Budgeting for Free
          </Link>
        </div>
      </section>
    </div>
  );
}
