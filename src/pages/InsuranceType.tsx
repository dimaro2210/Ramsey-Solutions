import { useParams, Link } from "react-router-dom";
import { ShieldCheck, ArrowLeft, CheckCircle } from "lucide-react";

const insuranceData: Record<string, { title: string; tagline: string; description: string; benefits: string[]; cta: string }> = {
  "home-auto": {
    title: "Home & Auto Insurance",
    tagline: "Bundle Your Coverage and Save",
    description: "Protecting your home and your car shouldn't break the bank. When you bundle home and auto insurance together through a RamseyTrusted provider, you get better coverage at a better price.",
    benefits: [
      "Save up to 25% by bundling home and auto policies",
      "One trusted advisor for all your property coverage",
      "Comprehensive protection for your biggest investments",
      "Easy claims process with dedicated support"
    ],
    cta: "Get a Free Quote"
  },
  "term-life": {
    title: "Term Life Insurance",
    tagline: "Protect Your Family's Future",
    description: "Term life insurance is the only type of life insurance we recommend. It's affordable, straightforward, and gives your family the protection they need. A 15- or 20-year term policy with 10-12 times your income in coverage is all you need.",
    benefits: [
      "10-12x your income in coverage",
      "15- or 20-year terms recommended",
      "Affordable monthly premiums",
      "No cash value or investment gimmicks — just pure protection"
    ],
    cta: "Find a Term Life Quote"
  },
  "id-theft": {
    title: "ID Theft Protection",
    tagline: "Guard Your Identity",
    description: "Identity theft is one of the fastest-growing crimes in America. Our trusted providers monitor your personal information and help you recover if your identity is ever stolen.",
    benefits: [
      "24/7 monitoring of your personal information",
      "Up to $1 million in stolen funds restoration",
      "Dark web surveillance",
      "Credit monitoring and alerts"
    ],
    cta: "Protect Your Identity"
  },
  "wills": {
    title: "Wills & Estate Planning",
    tagline: "Plan for What Matters Most",
    description: "Everyone needs a will. It's not just for rich people — it's for anyone who wants to protect their family. Our trusted partners make it easy and affordable to create a legally binding will.",
    benefits: [
      "Create your will in under 20 minutes",
      "Legally binding in all 50 states",
      "Includes medical power of attorney",
      "Affordable estate planning for every budget"
    ],
    cta: "Create Your Will Today"
  },
  "health": {
    title: "Health Insurance",
    tagline: "Coverage You Can Count On",
    description: "Health insurance is a must-have, and the right plan can save you thousands. Whether you're self-employed, between jobs, or looking for better coverage, our trusted advisors will help you find the right fit.",
    benefits: [
      "Compare plans from top providers",
      "Coverage for individuals and families",
      "Help navigating the marketplace",
      "Expert guidance on HSA-eligible plans"
    ],
    cta: "Find Health Coverage"
  },
  "medicare": {
    title: "Medicare",
    tagline: "Navigate Medicare With Confidence",
    description: "Turning 65? Medicare can be confusing, but it doesn't have to be. Our trusted advisors specialize in helping you understand your options and enroll in the right plan.",
    benefits: [
      "Free consultation with a Medicare specialist",
      "Compare Medicare Advantage and Supplement plans",
      "Help with Part D prescription drug coverage",
      "Annual plan reviews to ensure best coverage"
    ],
    cta: "Talk to a Medicare Pro"
  },
  "long-term-care": {
    title: "Long-Term Care Insurance",
    tagline: "Plan Ahead for Your Care Needs",
    description: "Long-term care insurance helps cover the cost of extended medical care that regular health insurance doesn't cover. It protects your savings and gives your family peace of mind.",
    benefits: [
      "Covers nursing home and assisted living costs",
      "Protects your retirement savings",
      "Flexible coverage options",
      "Inflation protection available"
    ],
    cta: "Get Long-Term Care Coverage"
  }
};

export default function InsuranceType() {
  const { type } = useParams<{ type: string }>();
  const data = insuranceData[type || ""] || insuranceData["term-life"];

  return (
    <div className="w-full">
      <section className="bg-gradient-to-br from-blue-50 to-white py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <Link to="/insurance" className="inline-flex items-center text-secondary font-semibold mb-8 hover:underline">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Insurance
          </Link>
          <h1 className="text-4xl md:text-6xl font-black text-primary italic mb-4">{data.title}</h1>
          <p className="text-2xl text-secondary font-bold mb-8">{data.tagline}</p>
          <p className="text-xl text-muted-foreground leading-relaxed">{data.description}</p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-primary mb-10">Why This Coverage Matters</h2>
          <div className="space-y-6">
            {data.benefits.map((benefit, i) => (
              <div key={i} className="flex items-start gap-4 p-6 bg-blue-50 rounded-xl">
                <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                <p className="text-lg text-primary">{benefit}</p>
              </div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link to="/trusted" className="bg-accent text-primary font-bold text-lg px-10 py-4 rounded-xl hover:bg-yellow-300 transition-colors shadow-lg inline-block">
              {data.cta}
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 bg-primary text-white text-center">
        <div className="max-w-3xl mx-auto px-4">
          <ShieldCheck className="w-16 h-16 mx-auto mb-6 text-accent" />
          <h2 className="text-3xl font-bold mb-4">Work With a RamseyTrusted Pro</h2>
          <p className="text-xl text-blue-100 mb-8">Our vetted insurance professionals will help you get the right coverage without overpaying.</p>
          <Link to="/trusted" className="inline-block bg-accent text-primary font-bold text-lg px-10 py-4 rounded-xl hover:bg-yellow-300 transition-colors shadow-lg">
            Find Your Pro
          </Link>
        </div>
      </section>
    </div>
  );
}
