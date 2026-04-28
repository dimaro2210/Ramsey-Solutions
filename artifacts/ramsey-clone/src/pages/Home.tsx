import { Link, useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { ChevronRight, ChevronLeft } from "lucide-react";

type HeroCard = { title: string; href: string; icon: string; external?: boolean };

export default function Home() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const heroCards: HeroCard[] = [
    { title: "Get Out of Debt", href: "/debt/debt-101", icon: "https://cdn.ramseysolutions.net/media/homepage/2025/02-testing/digmktg-35509/icon-get-out-debt-2x.png" },
    { title: "Buy/Sell Real Estate", href: "/real-estate/residential-real-estate", icon: "https://cdn.ramseysolutions.net/media/homepage/2025/02-testing/digmktg-35509/icon-real-estate-2x.png" },
    { title: "Create a Budget", href: "/money/everydollar", icon: "https://cdn.ramseysolutions.net/media/homepage/2025/02-testing/digmktg-35509/icon-create-budget-2x.png" },
    { title: "File Your Taxes", href: "/taxes", icon: "https://cdn.ramseysolutions.net/media/homepage/2025/02-testing/digmktg-35509/icon-taxes-2x.png" },
    { title: "Start Investing", href: "/retirement/smartvestor", icon: "https://cdn.ramseysolutions.net/media/homepage/2025/02-testing/digmktg-35509/icon-investing-2x.png" },
    { title: "Plan for Retirement", href: "/retirement/smartvestor", icon: "https://cdn.ramseysolutions.net/media/homepage/2025/02-testing/digmktg-35509/icon-retirement-2x.png" },
    { title: "Find Your Insurance", href: "/insurance", icon: "https://cdn.ramseysolutions.net/media/homepage/2025/02-testing/digmktg-35509/icon-insurance-2x.png" },
    { title: "Shop the Store", href: "https://store.ramseysolutions.com", icon: "https://cdn.ramseysolutions.net/media/homepage/2025/02-testing/digmktg-35509/icon-store-2x.png", external: true }
  ];

  const babySteps = [
    { num: 1, title: "Save $1,000 for your starter emergency fund.", img: "https://cdn.ramseysolutions.net/media/homepage/2025/02-testing/digmktg-33066/baby-step-1.png" },
    { num: 2, title: "Pay off all debt (except the house) using the debt snowball.", img: "https://cdn.ramseysolutions.net/media/homepage/2025/02-testing/digmktg-33066/baby-step-2.png" },
    { num: 3, title: "Save 3–6 months of expenses in a fully funded emergency fund.", img: "https://cdn.ramseysolutions.net/media/homepage/2025/02-testing/digmktg-33066/baby-step-3.png" },
    { num: 4, title: "Invest 15% of your household income in retirement.", img: "https://cdn.ramseysolutions.net/media/homepage/2025/02-testing/digmktg-33066/baby-step-4.png" },
    { num: 5, title: "Save for your children's college fund.", img: "https://cdn.ramseysolutions.net/media/homepage/2025/02-testing/digmktg-33066/baby-step-5.png" },
    { num: 6, title: "Pay off your home early.", img: "https://cdn.ramseysolutions.net/media/homepage/2025/02-testing/digmktg-33066/baby-step-6.png" },
    { num: 7, title: "Build wealth and give.", img: "https://cdn.ramseysolutions.net/media/homepage/2025/02-testing/digmktg-33066/baby-step-7.png" }
  ];

  const testimonials = [
    { name: "Genelle & Felipe O.", quote: "Budgeting gives you a true picture of your finances—of your life—so you can pick what you can do and plan all the good stuff.", img: "https://cdn.ramseysolutions.net/media/homepage/2025/03-testimonials/genelle-and-felipe.png" },
    { name: "Francisco & Brishithe T.", quote: "Now, we talk more about our money, we make decisions together, and it’s not stressful anymore.", img: "https://cdn.ramseysolutions.net/media/homepage/2025/03-testimonials/franciscoand-brishithe.png" },
    { name: "Caleb & Christiana", quote: "I cried the first time we finished a month and actually had money left over. That had never happened before.", img: "https://cdn.ramseysolutions.net/media/homepage/2025/03-testimonials/christina-and-caleb.png" },
    { name: "Jessica C.", quote: "I paid off $121,000 in 28 months. I feel strong! The burden is gone!", img: "https://cdn.ramseysolutions.net/daveramsey.com/media/landing-pages/debt-101/2025-update/jessicac.png" },
    { name: "Jerry & Brenna C.", quote: "We're not stressed anymore. Our journey's in our hands now. We get to choose what we want to do.", img: "https://cdn.ramseysolutions.net/daveramsey.com/media/landing-pages/debt-101/2025-update/jerryandbrennac.png" },
    { name: "Mark & Ashley M.", quote: "There's freedom on the other side of debt. You don't have to live like everyone else. I wanted something different for my family.", img: "https://cdn.ramseysolutions.net/daveramsey.com/media/landing-pages/debt-101/2025-update/markandashleym.png" }
  ];

  return (
    <div className="w-full">
      {/* SECTION 1 - HERO */}
      <section className="relative overflow-hidden text-white hero-section">
        <style>{`
          .hero-section {
            background:
              url('/hero/bg-buckets-mobile.jpg') top center / 115% no-repeat,
              linear-gradient(#001934, #001934);
          }
          @media (min-width: 600px) {
            .hero-section {
              background:
                url('/hero/bg-personalities-desktop-tablet-v2.jpg') top center / cover no-repeat,
                linear-gradient(#0073B9, #0073B9);
            }
          }
          @media (min-width: 1200px) {
            .hero-section {
              background:
                url('/hero/bg-personalities-desktop-large-v2.jpg') top center / cover no-repeat,
                linear-gradient(#0073B9, #0073B9);
            }
          }
        `}</style>

        <div className="max-w-7xl mx-auto relative z-10 pt-8 sm:pt-10 md:pt-14 pb-6 px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-6 md:mb-10">
            <h1 className="mb-3 md:mb-5">
              <picture>
                <source
                  srcSet="/hero/h1-live-like-no-one-else-desktop-large-tablet.svg"
                  media="(min-width: 600px)"
                  type="image/svg+xml"
                />
                <img
                  src="/hero/h1-live-like-no-one-else-mobile-2.svg"
                  alt="Live Like No One Else"
                  className="mx-auto w-[270px] md:max-w-[547px] md:w-[60%]"
                />
              </picture>
            </h1>
            <p className="text-base md:text-lg text-white/90 font-normal max-w-xl mx-auto px-2">
              Get expert advice, free tools and proven plans to help you manage your finances, work and relationships.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5">
            {heroCards.map((card, idx) => {
              const cls = "bg-white rounded-2xl p-4 sm:p-5 md:p-6 flex flex-col items-center justify-center text-center shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 group cursor-pointer";
              const inner = (<>
                <img src={card.icon} alt={card.title} className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 object-contain mb-2 md:mb-4 group-hover:scale-110 transition-transform duration-300" />
                <span className="font-bold text-primary text-sm sm:text-base md:text-lg leading-tight">{card.title}</span>
              </>);
              return card.external ? (
                <a key={idx} href={card.href} target="_blank" rel="noopener noreferrer" className={cls}>{inner}</a>
              ) : (
                <Link key={idx} to={card.href} className={cls}>{inner}</Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 2 - ASK RAMSEY */}
      <section className="relative overflow-hidden text-white ask-ramsey-section">
        <style>{`
          .ask-ramsey-section {
            background:
              url('/hero/personalities-and-bottom-gradient-02.png') top center / 175% auto no-repeat,
              url('/hero/mobile-gradient.png') top center / cover no-repeat,
              linear-gradient(#001934, #001934);
          }
          @media (min-width: 600px) {
            .ask-ramsey-section {
              background:
                url('/hero/personalities-and-bottom-gradient-02.png') top center / 130% auto no-repeat,
                url('/hero/desktop-gradient.png') top center / cover no-repeat,
                linear-gradient(#001934, #001934);
            }
          }
          @media (min-width: 1200px) {
            .ask-ramsey-section {
              background:
                url('/hero/personalities-and-bottom-gradient-02.png') top center / 1440px auto no-repeat,
                url('/hero/desktop-gradient.png') top center / cover no-repeat,
                linear-gradient(#001934, #001934);
            }
          }
        `}</style>

        <div className="min-h-[200px] sm:min-h-[280px] md:min-h-[350px] lg:min-h-[450px]"></div>

        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 pt-8 pb-12 md:pb-16" style={{ background: 'linear-gradient(to bottom, transparent, #0073B9 20%)' }}>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight mb-3 md:mb-4 text-white">
            Ask Ramsey,<br/>Get Advice
          </h2>
          <p className="text-sm md:text-base text-white/80 mb-6 md:mb-8 max-w-md mx-auto">
            Get AI-powered money advice built on the same principles you trust from The Ramsey Show.
          </p>
          <form className="max-w-lg mx-auto relative" onSubmit={(e) => { e.preventDefault(); if (searchQuery.trim()) navigate(`/askramsey?q=${encodeURIComponent(searchQuery.trim())}`); }}>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="How do I start getting out of d..."
              className="w-full py-3 px-5 pr-14 rounded-full bg-white text-gray-800 text-base placeholder:text-gray-400 outline-none border-2 border-transparent focus:border-[#0073B9]"
            />
            <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center text-[#0073B9]">
              <ChevronRight className="w-6 h-6" />
            </button>
          </form>
        </div>
      </section>

      {/* SECTION 3 - JOIN THE MILLIONS */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-primary">Join the Millions Who Have Transformed Their Money</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-16">
            Over three decades ago, Dave Ramsey turned around his money struggles and sparked a movement that’s helped millions improve their finances—and their future.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8 text-left">
            {[
              { stat: "30 Years", text: "of guiding families to hope." },
              { stat: "10 Million+", text: "lives changed and counting." },
              { stat: "1 Proven Plan", text: "for taking control of your money." }
            ].map((item, idx) => (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                key={idx} 
                className="bg-white p-8 rounded-2xl shadow-md border border-border/50 hover:shadow-xl transition-shadow"
              >
                <div className="text-4xl font-black text-secondary mb-4">{item.stat}</div>
                <p className="text-lg font-semibold text-primary">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4 - BABY STEPS */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary">The Proven Plan That Works</h2>
              <p className="text-lg text-muted-foreground max-w-2xl">
                You work too hard to live paycheck to paycheck. Whether you’re struggling with debt or building your savings, the 7 Baby Steps will help you take control of your money for good.
              </p>
            </div>
            <Link to="/dave-ramsey-7-baby-steps" className="mt-6 md:mt-0 font-bold text-secondary hover:underline inline-flex items-center text-lg">
              Explore All Steps <ChevronRight className="ml-1 w-5 h-5" />
            </Link>
          </div>

          <div className="flex overflow-x-auto pb-8 -mx-4 px-4 sm:mx-0 sm:px-0 gap-6 hide-scrollbar snap-x">
            {babySteps.map((step) => (
              <Link 
                to="/dave-ramsey-7-baby-steps"
                key={step.num} 
                className="flex-none w-[300px] snap-center bg-gray-50 rounded-2xl border border-gray-200 overflow-hidden hover:shadow-xl hover:border-secondary/50 transition-all group"
              >
                <div className="h-40 bg-blue-100 flex items-center justify-center p-6 relative overflow-hidden">
                  <div className="absolute inset-0 bg-primary/5 group-hover:bg-primary/10 transition-colors z-10"></div>
                  <img src={step.img} alt={`Baby Step ${step.num}`} className="h-full object-contain relative z-20 group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-6">
                  <div className="text-sm font-bold text-secondary uppercase tracking-wider mb-2">Baby Step {step.num}</div>
                  <h3 className="text-lg font-bold text-primary leading-tight">{step.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5 - ASSESSMENT QUIZ */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-gray-100 border-y border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-primary mb-6">Find Out Which Baby Step You're On</h2>
          <p className="text-xl text-muted-foreground mb-12">
            Answer a few questions and get a free, customized money plan that fits your life and goals.
          </p>
          
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              "I try to stay on top of things, but saving money is hard.",
              "I am often stressed about money because of my debt.",
              "I know I could manage my money better with the right plan.",
              "I feel on track with my money but need help with investing."
            ].map((text, i) => (
              <Link key={i} to="/dave-ramsey-7-baby-steps" className="bg-white p-6 rounded-xl shadow border-2 border-transparent hover:border-secondary hover:shadow-lg transition-all text-left group flex items-start">
                <div className="w-8 h-8 rounded-full bg-blue-50 text-secondary flex items-center justify-center font-bold mr-4 shrink-0 group-hover:bg-secondary group-hover:text-white transition-colors">
                  {String.fromCharCode(65 + i)}
                </div>
                <span className="font-semibold text-primary text-lg">{text}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 6 - SMALL STEPS */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Small Steps That Lead to Big Wins</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              You don’t have to walk the Baby Steps alone. From expert advice to life-changing tools, we’ll show you how to live like no one else.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "The Ramsey Show", desc: "Watch Ramsey experts answer questions from real people.", link: "/shows/the-ramsey-show", img: "https://cdn.ramseysolutions.net/media/homepage/2025/04-assets/trs.png" },
              { title: "EveryDollar", desc: "Get the budgeting app built on Dave Ramsey’s plan.", link: "/money/everydollar", img: "https://cdn.ramseysolutions.net/media/homepage/2025/04-assets/e$.png" },
              { title: "Coverage Checkup", desc: "Get an insurance action plan built to cover your needs.", link: "/insurance", img: "https://cdn.ramseysolutions.net/media/homepage/2025/04-assets/cc.png" },
            ].map((item, i) => (
              <Link key={i} to={item.link} className="flex flex-col bg-gray-50 rounded-2xl overflow-hidden hover:shadow-xl transition-shadow border border-border group">
                <div className="h-48 overflow-hidden bg-gray-200">
                  <img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-8 flex flex-col flex-grow">
                  <h3 className="text-2xl font-bold text-primary mb-3">{item.title}</h3>
                  <p className="text-muted-foreground flex-grow">{item.desc}</p>
                  <span className="font-bold text-secondary mt-6 flex items-center group-hover:translate-x-2 transition-transform">
                    Learn More <ChevronRight className="w-4 h-4 ml-1" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 7 - TRUSTED PROS */}
      <section className="py-20 bg-primary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1 flex justify-center">
            <img src="https://cdn.ramseysolutions.net/media/homepage/2025/04-assets/trusted-image-shield.png" alt="Ramsey Trusted" className="max-w-md w-full drop-shadow-2xl" />
          </div>
          <div className="order-1 md:order-2">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Access to the Pros We Trust</h2>
            <p className="text-xl text-blue-100 mb-8 leading-relaxed">
              Trust isn’t something that’s gained just once. It’s maintained day in and day out. That’s why each provider in our RamseyTrusted® pros network is vetted by our team of experts.
            </p>
            <Link to="/trusted" className="inline-block bg-accent text-primary font-bold text-lg px-8 py-4 rounded-xl hover:bg-yellow-300 hover:scale-105 transition-all shadow-lg">
              Find a Trusted Pro
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 8 - TESTIMONIALS */}
      <TestimonialCarousel testimonials={testimonials} />
    </div>
  );
}

function TestimonialCarousel({ testimonials }: { testimonials: { name: string; quote: string; img: string }[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const amount = direction === "left" ? -380 : 380;
      scrollRef.current.scrollBy({ left: amount, behavior: "smooth" });
    }
  };
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-primary">Real People. Real Stories. Real Financial Peace.</h2>
      </div>
      <div className="relative max-w-7xl mx-auto px-4">
        <button onClick={() => scroll("left")} className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg border border-gray-200 rounded-full p-3 hover:bg-gray-50 transition-colors" aria-label="Previous testimonial">
          <ChevronLeft className="w-6 h-6 text-primary" />
        </button>
        <button onClick={() => scroll("right")} className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg border border-gray-200 rounded-full p-3 hover:bg-gray-50 transition-colors" aria-label="Next testimonial">
          <ChevronRight className="w-6 h-6 text-primary" />
        </button>
        <div ref={scrollRef} className="flex overflow-x-auto pb-12 px-12 gap-8 hide-scrollbar snap-x scroll-smooth">
          {testimonials.map((t, i) => (
            <div key={i} className="flex-none w-[350px] snap-center bg-gray-50 p-8 rounded-2xl border border-gray-200 flex flex-col items-center text-center">
              <img src={t.img} alt={t.name} className="w-24 h-24 rounded-full object-cover mb-6 border-4 border-white shadow-md" />
              <p className="text-lg italic text-muted-foreground mb-6 flex-grow">"{t.quote}"</p>
              <h4 className="font-bold text-primary">{t.name}</h4>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

