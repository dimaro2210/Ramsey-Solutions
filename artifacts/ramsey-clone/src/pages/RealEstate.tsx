import { useState } from "react";
import { Link } from "react-router-dom";
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
      <section className="bg-[#F5F7F8] py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="mb-6 flex justify-center">
            <img src="https://cdn.ramseysolutions.net/cms/sites/daveramsey-com/tax/taxes/ramseytrusted-logo.webp" alt="RamseyTrusted" className="h-16" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6">
            Know Exactly What to Do Next When Buying or Selling Your Home
          </h1>
          <p className="text-xl text-muted-foreground mb-10">
            Avoid overpaying for or underselling your home with the help of a RamseyTrusted real estate agent.
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

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">
              Worried you'll make an expensive buying or selling mistake?
            </h2>
            <p className="text-lg text-muted-foreground mb-6">
              Buying or selling a home is one of the biggest financial decisions you'll ever make . . . and it can feel nerve-racking. Between house-hunting, showings, paperwork, inspections, and negotiations, there's a lot to learn and a lot that feels confusing.
            </p>
            <p className="text-lg text-muted-foreground">
              That's why Dave Ramsey created RamseyTrusted — a way to connect you with carefully vetted agents (for free) who'll guide you through every step to buy or sell your home with confidence.
            </p>
          </div>
          <div className="relative">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-12 text-center">
              <img src="https://cdn.ramseysolutions.net/daveramsey.com/media/b2c/ramsey-trusted/global-brand-assets/logos/ramseytrusted-logo/rt-shield-orange.svg" alt="RamseyTrusted" className="h-24 mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-primary mb-4">RamseyTrusted Agents</h3>
              <p className="text-muted-foreground mb-6">Vetted. Trained. Ready to help you win.</p>
              <Link to="/trusted" className="bg-accent text-primary font-bold px-6 py-3 rounded-xl hover:bg-yellow-300 transition-colors shadow inline-block">
                Find an Agent
              </Link>
            </div>
            <div className="absolute -bottom-6 -left-6 bg-white p-5 rounded-2xl shadow-xl border border-border hidden md:block">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6 text-secondary" />
                </div>
                <div>
                  <p className="font-bold text-primary text-sm">Matched with an agent</p>
                  <p className="text-xs text-muted-foreground">Response time: &lt; 5 mins</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-primary text-center mb-16">Why Use a RamseyTrusted Agent?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Vetted by Ramsey", desc: "Every agent goes through a rigorous screening process to make sure they have the heart of a teacher and the skills of a top performer." },
              { title: "Free to You", desc: "There's no cost to get connected with a RamseyTrusted real estate agent. The seller typically pays the agent's commission." },
              { title: "Local Experts", desc: "Your agent knows the local market inside and out. They'll help you navigate every step of the buying or selling process." },
            ].map((item, i) => (
              <div key={i} className="bg-white p-8 rounded-2xl shadow-md border border-gray-100">
                <h3 className="text-2xl font-bold text-primary mb-4">{item.title}</h3>
                <p className="text-lg text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
