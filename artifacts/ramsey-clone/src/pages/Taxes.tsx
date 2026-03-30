import { Link } from "wouter";

export default function Taxes() {
  return (
    <div className="w-full">
      {/* Promo Banner */}
      <div className="bg-primary text-white text-center py-3 px-4 text-sm font-bold tracking-wide">
        ⏰ File Federal Taxes for $39.95 Through 4/10 <a href="#" className="underline ml-2">Get Started</a>
      </div>

      <section className="bg-[#f2f8fc] pt-16 pb-24 border-b border-border">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-7xl font-black text-primary italic mb-6">
            Taxes—File the Ramsey Way
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-10">
            Learn the best way to file your taxes with confidence—and keep more money in your pocket—with trusted guides, services and tools.
          </p>
          <button className="bg-accent text-primary font-bold text-lg px-8 py-4 rounded-xl hover:bg-yellow-300 transition-colors shadow-lg inline-block">
            Start Filing Now
          </button>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-primary mb-4">Keep More. Grow More. Live More.</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Every year, Americans hand over billions more than they owe in taxes—money that could be paying off debt, building an emergency fund, or growing retirement savings. Your money should work for you, not Uncle Sam.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8 bg-gray-50 rounded-2xl border border-gray-100">
              <div className="text-6xl font-black text-secondary mb-4">$3,000</div>
              <p className="text-lg text-primary font-medium">The average amount people <strong>overpay on taxes</strong> throughout the year (yikes).</p>
            </div>
            <div className="text-center p-8 bg-gray-50 rounded-2xl border border-gray-100">
              <div className="text-6xl font-black text-secondary mb-4">$250</div>
              <p className="text-lg text-primary font-medium">The average amount you could have <strong>back in your budget</strong> each month if you fix your withholdings.</p>
            </div>
            <div className="text-center p-8 bg-gray-50 rounded-2xl border border-gray-100">
              <div className="text-6xl font-black text-secondary mb-4">$54,250</div>
              <p className="text-lg text-primary font-medium">The amount that $250 could <strong>grow to in 10 years</strong> when invested every month.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
