import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { X, TrendingUp, CheckCircle2, ArrowRight } from "lucide-react";

export default function SmartVestor() {
  const [zipCode, setZipCode] = useState("");
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (zipCode.length >= 5) {
      setShowModal(true);
    }
  };

  return (
    <div className="w-full">
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowModal(false)} />
          <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center z-10 transition-colors"
            >
              <X className="w-4 h-4 text-gray-500" />
            </button>

            <div className="bg-gradient-to-br from-[#003561] to-[#0073B9] p-8 text-center">
              <div className="w-16 h-16 bg-[#FCD214] rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <TrendingUp className="w-8 h-8 text-[#003561]" />
              </div>
              <h2 className="text-2xl font-bold text-white">Great News!</h2>
              <p className="text-blue-200 text-sm mt-1">Investment feature available in your area</p>
            </div>

            <div className="p-8">
              <div className="flex items-center gap-2 mb-4 text-green-600 text-sm font-medium">
                <CheckCircle2 className="w-5 h-5" />
                <span>Ramsey Invest is available in {zipCode}</span>
              </div>

              <p className="text-gray-600 text-sm leading-relaxed mb-6">
                You can start investing today with <strong>Ramsey Invest</strong> — our expert-managed crypto and stock trading platform.
                Join thousands of people growing their wealth with zero trading experience required. Our certified advisors handle everything for you.
              </p>

              <ul className="space-y-2 mb-6">
                {["Expert-managed portfolio", "Crypto & stock investments", "No trading knowledge needed", "Start with as little as $100"].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-gray-600">
                    <CheckCircle2 className="w-4 h-4 text-[#0073B9] flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>

              <button
                onClick={() => { setShowModal(false); navigate("/sign-up"); }}
                className="w-full py-3.5 bg-[#FCD214] hover:bg-yellow-300 text-[#003561] rounded-xl font-bold text-base transition-colors flex items-center justify-center gap-2 shadow-md"
              >
                Sign Up for Ramsey Invest
                <ArrowRight className="w-5 h-5" />
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="w-full py-2 text-gray-400 text-sm mt-3 hover:text-gray-600 transition-colors"
              >
                Maybe later
              </button>
            </div>
          </div>
        </div>
      )}

      <section className="bg-gradient-to-b from-[#f2f8fc] to-white py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <img src="https://cdn.ramseysolutions.net/cms/sites/daveramsey-com/smartvestor/home/sv-logo.svg" alt="SmartVestor" className="h-16 mx-auto mb-8" />
          
          <h1 className="text-4xl md:text-6xl font-black text-primary italic mb-6">
            Invest in Your Future With a SmartVestor Pro
          </h1>
          
          <p className="text-xl text-muted-foreground mb-12">
            SmartVestor connects you to a network of financial advisors, financial planners, wealth advisors and other investment professionals who will treat you like a teammate, not a statistic.
          </p>

          <div className="bg-white rounded-2xl shadow-xl p-8 max-w-xl mx-auto border border-border text-left">
            <h3 className="font-bold text-xl text-primary mb-2">Where are you located?</h3>
            <p className="text-muted-foreground mb-6 text-sm">We'll look for up to five SmartVestor Pros near you.</p>
            
            <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4">
              <input
                type="text"
                value={zipCode}
                onChange={(e) => setZipCode(e.target.value.replace(/\D/g, "").slice(0, 5))}
                placeholder="Zip Code"
                className="flex-grow px-6 py-4 text-lg border-2 border-gray-200 rounded-xl focus:border-secondary focus:outline-none transition-colors"
                required
                minLength={5}
              />
              <button type="submit" className="bg-accent text-primary font-bold text-lg px-8 py-4 rounded-xl hover:bg-yellow-300 transition-colors shadow-md">
                Next
              </button>
            </form>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-primary text-center mb-6">What Is SmartVestor?</h2>
          <p className="text-xl text-muted-foreground text-center max-w-3xl mx-auto mb-16">
            SmartVestor is a free service from Ramsey Solutions that connects you with investing professionals in your area. These pros have been vetted by our team and have the heart of a teacher.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8 rounded-2xl bg-blue-50">
              <div className="w-16 h-16 bg-secondary text-white rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-black">1</div>
              <h3 className="font-bold text-xl text-primary mb-3">Tell Us About Yourself</h3>
              <p className="text-muted-foreground">Enter your zip code and answer a few quick questions about your financial situation and goals.</p>
            </div>
            <div className="text-center p-8 rounded-2xl bg-blue-50">
              <div className="w-16 h-16 bg-secondary text-white rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-black">2</div>
              <h3 className="font-bold text-xl text-primary mb-3">Get Matched With Pros</h3>
              <p className="text-muted-foreground">We'll connect you with up to five SmartVestor Pros near you. They'll reach out to schedule an introductory meeting.</p>
            </div>
            <div className="text-center p-8 rounded-2xl bg-blue-50">
              <div className="w-16 h-16 bg-secondary text-white rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-black">3</div>
              <h3 className="font-bold text-xl text-primary mb-3">Choose the Right Fit</h3>
              <p className="text-muted-foreground">Interview your pros, compare their approaches, and pick the one that feels right for you. No pressure, no obligation.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-primary text-white">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl font-bold mb-6">Get Ready to Talk With Your Pros</h2>
            <p className="text-xl text-blue-100 mb-8">
              Finding a pro doesn't have to be intimidating! Once you share your info on the SmartVestor Pro request form, your pros will start reaching out to you. This interview guide can help you be ready. It comes with:
            </p>
            <ul className="space-y-4 mb-8 text-lg font-medium">
              <li className="flex items-center"><span className="w-2 h-2 bg-accent rounded-full mr-3"></span>Questions to ask the pros</li>
              <li className="flex items-center"><span className="w-2 h-2 bg-accent rounded-full mr-3"></span>Space for notes and contact info</li>
              <li className="flex items-center"><span className="w-2 h-2 bg-accent rounded-full mr-3"></span>A place to rank each pro</li>
            </ul>
            <a href="https://www.ramseysolutions.com/retirement/smartvestor" target="_blank" rel="noopener noreferrer" className="bg-white text-primary font-bold text-lg px-8 py-4 rounded-xl hover:bg-gray-100 transition-colors shadow-lg inline-block">
              Download Your Free Guide
            </a>
          </div>
          <div className="flex justify-center">
            <img src="https://cdn.ramseysolutions.net/cms/sites/daveramsey-com/smartvestor/home/interview-guide.webp" alt="Interview Guide" className="max-w-md w-full drop-shadow-2xl rounded-lg" />
          </div>
        </div>
      </section>
    </div>
  );
}
