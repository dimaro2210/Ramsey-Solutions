export default function SevenBabySteps() {
  const steps = [
    { num: 1, title: "Save $1,000 for your starter emergency fund.", desc: "In this first step, your goal is to save $1,000 as fast as you can. Your emergency fund will cover those unexpected life events you can't plan for.", icon: "https://cdn.ramseysolutions.net/media/landing-pages/7-baby-steps/baby-step-hex-1.svg" },
    { num: 2, title: "Pay off all debt (except the house) using the debt snowball.", desc: "Next, it’s time to pay off the cars, the credit cards and the student loans. List your debts from smallest to largest and attack the smallest one first.", icon: "https://cdn.ramseysolutions.net/media/landing-pages/7-baby-steps/baby-step-hex-2.svg" },
    { num: 3, title: "Save 3-6 months of expenses in a fully funded emergency fund.", desc: "Take that money you were throwing at your debt and build a fully funded emergency fund that covers 3–6 months of your expenses.", icon: "https://cdn.ramseysolutions.net/media/landing-pages/7-baby-steps/baby-step-hex-3.svg" },
    { num: 4, title: "Invest 15% of your household income in retirement.", desc: "Now it's time to build wealth. Invest 15% of your gross household income into good growth-stock mutual funds.", icon: "https://cdn.ramseysolutions.net/media/landing-pages/7-baby-steps/baby-step-hex-4.svg" },
    { num: 5, title: "Save for your children's college fund.", desc: "By this step, you've paid off all debts but the house and have started saving for retirement. Next, start saving for your children's college.", icon: "https://cdn.ramseysolutions.net/media/landing-pages/7-baby-steps/baby-step-hex-5.svg" },
    { num: 6, title: "Pay off your home early.", desc: "Any extra money you have should go toward paying off your mortgage early. Imagine life with no house payment!", icon: "https://cdn.ramseysolutions.net/media/landing-pages/7-baby-steps/baby-step-hex-6.svg" },
    { num: 7, title: "Build wealth and give.", desc: "You know what people with no debt can do? Anything they want! The last step is the most fun. You can live and give like no one else.", icon: "https://cdn.ramseysolutions.net/media/landing-pages/7-baby-steps/baby-step-hex-7.svg" },
  ];

  return (
    <div className="w-full">
      <section className="bg-gradient-to-br from-[#003561] to-[#005a9c] py-20 text-center px-4 text-white">
        <div className="max-w-3xl mx-auto">
          <img src="https://cdn.ramseysolutions.net/media/landing-pages/7-baby-steps/7-baby-steps-h1-palm.svg" alt="The 7 Baby Steps" className="h-20 md:h-28 mx-auto mb-8 invert brightness-0" />
          <p className="text-xl md:text-2xl font-medium mb-10 text-blue-100">
            You can take control of your money! Dave Ramsey’s 7 Baby Steps will show you how to save for emergencies, pay off all your debt for good, and build wealth. It’s not a fairy tale. It works every single time!
          </p>
          <a href="https://www.ramseysolutions.com/dave-ramsey-7-baby-steps" target="_blank" rel="noopener noreferrer" className="bg-accent text-primary font-bold text-xl px-10 py-5 rounded-full hover:bg-yellow-300 transition-colors shadow-xl inline-block">
            Find Out Which Step You're On
          </a>
        </div>
      </section>

      <section className="py-24 bg-[#F5F7F8]">
        <div className="max-w-4xl mx-auto px-4 space-y-8">
          {steps.map((step) => (
            <div key={step.num} className="bg-white rounded-3xl p-8 md:p-12 shadow-md border border-gray-100 flex flex-col md:flex-row gap-8 items-start md:items-center group hover:shadow-xl transition-shadow">
              <div className="flex-shrink-0 relative">
                <img src={step.icon} alt={`Step ${step.num}`} className="w-24 h-24 md:w-32 md:h-32 object-contain group-hover:scale-110 transition-transform duration-500" />
              </div>
              <div>
                <span className="text-sm font-black text-secondary tracking-widest uppercase mb-2 block">Step {step.num}</span>
                <h3 className="text-2xl md:text-3xl font-bold text-primary mb-4">{step.title}</h3>
                <p className="text-lg text-muted-foreground leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
