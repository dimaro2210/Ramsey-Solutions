import { useToast } from "@/hooks/use-toast";

export default function SmartVestor() {
  const { toast } = useToast();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    toast({ title: "Searching Pros...", description: "Looking up SmartVestor Pros in your area." });
  };

  return (
    <div className="w-full">
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
                placeholder="Zip Code"
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

      <section className="py-20 bg-primary text-white">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl font-bold mb-6">Get Ready to Talk With Your Pros</h2>
            <p className="text-xl text-blue-100 mb-8">
              Finding a pro doesn’t have to be intimidating! Once you share your info on the SmartVestor Pro request form, your pros will start reaching out to you. This interview guide can help you be ready. It comes with:
            </p>
            <ul className="space-y-4 mb-8 text-lg font-medium">
              <li className="flex items-center"><span className="w-2 h-2 bg-accent rounded-full mr-3"></span>Questions to ask the pros</li>
              <li className="flex items-center"><span className="w-2 h-2 bg-accent rounded-full mr-3"></span>Space for notes and contact info</li>
              <li className="flex items-center"><span className="w-2 h-2 bg-accent rounded-full mr-3"></span>A place to rank each pro</li>
            </ul>
            <button className="bg-white text-primary font-bold text-lg px-8 py-4 rounded-xl hover:bg-gray-100 transition-colors shadow-lg">
              Download Your Free Guide
            </button>
          </div>
          <div className="flex justify-center">
            <img src="https://cdn.ramseysolutions.net/cms/sites/daveramsey-com/smartvestor/home/interview-guide.webp" alt="Interview Guide" className="max-w-md w-full drop-shadow-2xl rounded-lg" />
          </div>
        </div>
      </section>
    </div>
  );
}
