import { Link } from "wouter";
import { Home, ShieldCheck, FileText, PiggyBank } from "lucide-react";

export default function Trusted() {
  const categories = [
    { title: "Real Estate", link: "/real-estate/residential-real-estate", icon: <Home className="w-12 h-12" /> },
    { title: "Insurance", link: "/insurance", icon: <ShieldCheck className="w-12 h-12" /> },
    { title: "Tax Services", link: "/taxes", icon: <FileText className="w-12 h-12" /> },
    { title: "Investing & Retirement", link: "/retirement/smartvestor", icon: <PiggyBank className="w-12 h-12" /> },
  ];

  return (
    <div className="w-full">
      <section className="bg-gradient-to-b from-gray-50 to-white py-24 px-4 text-center border-b border-border">
        <div className="max-w-5xl mx-auto">
          <img src="https://cdn.ramseysolutions.net/daveramsey.com/media/b2c/ramsey-trusted/global-brand-assets/logos/ramseytrusted-logo/rt-shield-orange.svg" alt="RamseyTrusted" className="h-20 mx-auto mb-12" />
          
          <img src="https://cdn.ramseysolutions.net/cms/sites/daveramsey-com/trusted/optimized/graphic-main-headline-outlines.webp" alt="The pros Dave Ramsey trusts" className="max-w-full mx-auto mb-16 h-24 md:h-32 object-contain" />
          
          <h2 className="text-3xl font-bold text-primary mb-12">Find a Service</h2>

          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map((c, i) => (
              <Link key={i} href={c.link} className="bg-white rounded-2xl p-8 border-2 border-gray-100 shadow-md hover:border-secondary hover:shadow-2xl hover:-translate-y-2 transition-all group flex flex-col items-center justify-center h-56">
                <div className="text-secondary mb-4 group-hover:scale-110 transition-transform">
                  {c.icon}
                </div>
                <span className="font-bold text-primary text-xl">{c.title}</span>
              </Link>
            ))}
          </div>

          <div className="mt-20">
            <Link href="/trusted" className="text-secondary font-bold text-lg hover:underline inline-block border-2 border-secondary px-8 py-3 rounded-full hover:bg-secondary hover:text-white transition-colors">
              Become a RamseyTrusted Pro
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
