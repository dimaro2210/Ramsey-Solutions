import { Link } from "react-router-dom";
import { ShieldCheck, Home, HeartPulse, UserCircle, Briefcase, Pill, Stethoscope } from "lucide-react";

export default function Insurance() {
  const insurances = [
    { title: "Home & Auto Bundle", icon: <Home className="w-8 h-8" />, slug: "home-auto" },
    { title: "Term Life Insurance", icon: <HeartPulse className="w-8 h-8" />, slug: "term-life" },
    { title: "ID Theft Protection", icon: <UserCircle className="w-8 h-8" />, slug: "id-theft" },
    { title: "Wills", icon: <Briefcase className="w-8 h-8" />, slug: "wills" },
    { title: "Health Insurance", icon: <Stethoscope className="w-8 h-8" />, slug: "health" },
    { title: "Medicare", icon: <Pill className="w-8 h-8" />, slug: "medicare" },
    { title: "Long-Term Care", icon: <ShieldCheck className="w-8 h-8" />, slug: "long-term-care" }
  ];

  return (
    <div className="w-full">
      <section className="bg-gradient-to-br from-blue-50 to-white py-24 text-center px-4 border-b border-border">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-black text-primary italic mb-6">
            You have something to protect
          </h1>
          <h2 className="text-2xl md:text-3xl text-secondary font-bold mb-16">
            RamseyTrusted® pros and providers can help.
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {insurances.map((item, idx) => (
              <Link key={idx} to={`/insurance/${item.slug}`} className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 hover:shadow-xl hover:border-secondary transition-all group flex flex-col items-center justify-center text-center h-48">
                <div className="text-secondary mb-4 group-hover:scale-110 transition-transform bg-blue-50 p-4 rounded-full">
                  {item.icon}
                </div>
                <span className="font-bold text-primary">{item.title}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl font-bold text-primary mb-6">Coverage Checkup</h2>
            <p className="text-xl text-muted-foreground mb-8">Not sure if you have the right coverage? Take our free Coverage Checkup and get a personalized action plan in just 5 minutes.</p>
            <ul className="space-y-4 mb-10">
              {["See where you're covered (and where you're not)", "Get expert recommendations based on your life stage", "Connect with trusted insurance pros"].map((item, i) => (
                <li key={i} className="flex items-center text-lg text-primary">
                  <ShieldCheck className="w-6 h-6 text-secondary mr-3 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <button className="bg-accent text-primary font-bold text-lg px-8 py-4 rounded-xl hover:bg-yellow-300 transition-colors shadow-lg">
              Start Your Free Checkup
            </button>
          </div>
          <div className="flex justify-center">
            <img src="https://cdn.ramseysolutions.net/media/homepage/2025/04-assets/cc.png" alt="Coverage Checkup" className="max-w-md w-full rounded-2xl shadow-xl" />
          </div>
        </div>
      </section>

      <section className="py-20 bg-primary text-white text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-4xl font-bold mb-6">Don't Leave Your Family Unprotected</h2>
          <p className="text-xl text-blue-100 mb-10">The right insurance plan protects everything you've worked for. Our RamseyTrusted pros will help you find the best coverage at the best price.</p>
          <Link to="/trusted" className="inline-block bg-accent text-primary font-bold text-lg px-10 py-4 rounded-xl hover:bg-yellow-300 transition-colors shadow-lg">
            Find a Trusted Pro
          </Link>
        </div>
      </section>
    </div>
  );
}
