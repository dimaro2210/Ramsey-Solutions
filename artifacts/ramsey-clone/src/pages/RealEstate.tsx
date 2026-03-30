import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle2 } from "lucide-react";

export default function RealEstate() {
  const [tab, setTab] = useState("Buy");
  const { toast } = useToast();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    toast({ title: "Searching...", description: "Connecting to RamseyTrusted agents in your area." });
  };

  return (
    <div className="w-full">
      {/* Hero Form Section */}
      <section className="bg-[#F5F7F8] py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="mb-6 flex justify-center">
            <img src="https://cdn.ramseysolutions.net/cms/sites/daveramsey-com/tax/taxes/ramseytrusted-logo.webp" alt="RamseyTrusted" className="h-16" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6">
            Know Exactly What to Do Next When Buying or Selling Your Home
          </h1>
          <p className="text-xl text-muted-foreground mb-10">
            Avoid overpaying for or underselling your home with the help of a RamseyTrusted® real estate agent.
          </p>

          <div className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl mx-auto border border-border">
            <div className="flex bg-gray-100 p-1 rounded-xl mb-8">
              {["Buy", "Sell", "Both"].map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={`flex-1 py-3 text-lg font-bold rounded-lg transition-colors ${
                    tab === t ? "bg-white shadow text-primary" : "text-muted-foreground hover:text-primary"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
            <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4">
              <input
                type="text"
                placeholder={`${tab} Zip Code`}
                className="flex-grow px-6 py-4 text-lg border-2 border-gray-200 rounded-xl focus:border-secondary focus:outline-none transition-colors"
                required
              />
              <button type="submit" className="bg-accent text-primary font-bold text-lg px-8 py-4 rounded-xl hover:bg-yellow-300 transition-colors shadow-md">
                Next
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">
              Worried you'll make an expensive buying or selling mistake?
            </h2>
            <p className="text-lg text-muted-foreground mb-6">
              Buying or selling a home is one of the biggest financial decisions you’ll ever make . . . and it can feel nerve-racking. Between house-hunting, showings, paperwork, inspections, and negotiations, there’s a lot to learn and a lot that feels confusing. But you shouldn’t have to feel lost or figure it out on your own.
            </p>
            <p className="text-lg text-muted-foreground">
              That’s why Dave Ramsey created RamseyTrusted—a way to connect you with carefully vetted agents (for free) who’ll guide you through every step to buy or sell your home with confidence.
            </p>
          </div>
          <div className="relative">
            {/* Using an unsplash real estate agent placeholder since original URL wasn't perfectly parsed */}
            {/* real estate agent showing house to happy couple */}
            <img src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80" alt="Agent showing home" className="rounded-2xl shadow-2xl" />
            <div className="absolute -bottom-10 -left-10 bg-white p-6 rounded-2xl shadow-xl border border-border hidden md:block">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8 text-secondary" />
                </div>
                <div>
                  <p className="font-bold text-primary">Matched with an agent</p>
                  <p className="text-sm text-muted-foreground">Response time: &lt; 5 mins</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
